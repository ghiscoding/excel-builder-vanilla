import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';

const here = path.dirname(fileURLToPath(import.meta.url));
const outputArg = process.argv.find(arg => arg.startsWith('--output='));
const outputDir = outputArg ? path.resolve(outputArg.slice('--output='.length)) : here;
fs.mkdirSync(outputDir, { recursive: true });
const root = path.resolve(here, '../../..');
const pkg = path.join(root, 'packages/excel-builder-vanilla');
const src = path.join(pkg, 'src');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'excel-lib-audit-'));
const require = createRequire(path.join(pkg, 'package.json'));
const list = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? list(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const files = list(src);
const inventory = [];
const functions = [];
fs.writeFileSync(path.join(temp, 'package.json'), '{"type":"module"}');
fs.symlinkSync(path.join(pkg, 'node_modules'), path.join(temp, 'node_modules'), 'dir');
for (const file of files.filter(f => f.endsWith('.ts'))) {
  const source = fs.readFileSync(file, 'utf8');
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const lines = source.replace(/\r/g, '').split('\n');
  if (lines.at(-1) === '') lines.pop();
  const codeLines = new Set();
  let anyCount = 0;
  // Compiler-parsed token spans handle regexes and multiline template strings.
  function tokens(node) {
    if (node.kind >= ts.SyntaxKind.FirstJSDocNode && node.kind <= ts.SyntaxKind.LastJSDocNode) return;
    const children = node.getChildren(ast);
    if (children.length) { children.forEach(tokens); return; }
    if (node.kind === ts.SyntaxKind.EndOfFileToken || node.kind === ts.SyntaxKind.SyntaxList) return;
    const start = node.getStart(ast), end = node.getEnd();
    if (end <= start) return;
    const from = ast.getLineAndCharacterOfPosition(start).line;
    const to = ast.getLineAndCharacterOfPosition(end - 1).line;
    for (let i = from; i <= to; i++) if (lines[i]?.trim()) codeLines.add(i);
  }
  tokens(ast);
  function visit(node) {
    if (node.kind === ts.SyntaxKind.AnyKeyword) anyCount++;
    if (ts.isFunctionLike(node) && node.body) {
      const from = ast.getLineAndCharacterOfPosition(node.getStart(ast)).line;
      const to = ast.getLineAndCharacterOfPosition(node.end).line;
      functions.push({ file: path.relative(src, file), name: node.name?.getText(ast) || '(anonymous)', line: from + 1, lines: to - from + 1 });
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  const group = file.includes('/__browser_tests__/') ? 'browser tests' : file.includes('/__tests__/') ? 'unit tests'
    : file.endsWith('.d.ts') || file.endsWith('/interfaces.ts') ? 'types' : 'production';
  const blank = lines.filter(l => !l.trim()).length;
  inventory.push({ file: path.relative(src, file), group, physical: lines.length, code: codeLines.size,
    commentOnly: lines.length - blank - codeLines.size, blank, bytes: Buffer.byteLength(source), anyCount });
}
const totals = {};
for (const entry of inventory) {
  const total = totals[entry.group] ||= { files: 0, physical: 0, code: 0, commentOnly: 0, blank: 0, bytes: 0, anyCount: 0 };
  total.files++;
  for (const key of ['physical', 'code', 'commentOnly', 'blank', 'bytes', 'anyCount']) total[key] += entry[key];
}
const tracked = spawnSync('git', ['ls-files', '-z', 'packages/excel-builder-vanilla'], { cwd: root, encoding: 'utf8' }).stdout.split('\0').filter(Boolean);
const ancillary = tracked.filter(f => !files.includes(path.join(root, f)) || !f.endsWith('.ts')).map(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  return { file: path.relative(pkg, path.join(root, file)), physical: content.split('\n').length - (content.endsWith('\n') ? 1 : 0), bytes: Buffer.byteLength(content) };
});
fs.writeFileSync(path.join(outputDir, 'loc.json'), JSON.stringify({ totals, inventory, ancillary,
  largestFunctions: functions.filter(f => !f.file.includes('__')).sort((a,b) => b.lines - a.lines).slice(0, 25) }, null, 2) + '\n');
if (process.argv.includes('--inventory-only')) {
  fs.rmSync(temp, { recursive: true, force: true });
  console.log(JSON.stringify({ totals, ancillary }, null, 2));
  process.exit(0);
}
const { build } = await import(pathToFileURL(require.resolve('vite')));
await build({ configFile: path.join(pkg, 'vite.config.mts'), logLevel: 'silent',
  build: { outDir: temp, emptyOutDir: false } });
const bundle = fs.readFileSync(path.join(temp, 'index.js'));
const revision = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout.trim();
const metadata = { revision, node: process.version, platform: process.platform, arch: process.arch,
  cpu: os.cpus()[0].model, logicalCPUs: os.cpus().length, totalRAMGiB: os.totalmem() / 2 ** 30,
  typescript: ts.version, fflate: JSON.parse(fs.readFileSync(path.join(path.dirname(require.resolve('fflate')), '../package.json'), 'utf8')).version,
  repetitions: 3, warmup: '500 rows per fresh child process',
  build: 'package Vite production config; output redirected to temporary directory',
  bundleBytes: bundle.length, bundleGzipBytes: gzipSync(bundle).length,
  sourceMapBytes: fs.statSync(path.join(temp, 'index.js.map')).size,
  workingTreeChanged: spawnSync('git', ['diff', '--quiet'], { cwd: root }).status !== 0 };
function run(config) {
  const child = spawnSync(process.execPath, ['--expose-gc', path.join(here, 'worker.mjs'), temp, JSON.stringify(config)], {
    cwd: root, encoding: 'utf8', timeout: 180000, maxBuffer: 5 * 1024 * 1024,
  });
  if (child.status !== 0) throw new Error(child.stderr || String(child.error));
  return JSON.parse(child.stdout);
}
const cases = [
  { name: 'numeric-10k', kind: 'numeric', rows: 1000, cols: 10 },
  { name: 'numeric-100k', kind: 'numeric', rows: 10000, cols: 10 },
  { name: 'numeric-500k', kind: 'numeric', rows: 50000, cols: 10 },
  { name: 'repeated-100k', kind: 'repeated', rows: 10000, cols: 10 },
  { name: 'unique-100k', kind: 'unique', rows: 10000, cols: 10 },
  { name: 'mixed-100k', kind: 'mixed', rows: 10000, cols: 10 },
  { name: 'wide-100k', kind: 'numeric', rows: 1000, cols: 100 },
  { name: 'multi-100k', kind: 'numeric', rows: 1000, cols: 10, sheets: 10 },
  { name: 'stream-100k', kind: 'numeric', rows: 10000, cols: 10, stream: true },
  { name: 'stream-500k', kind: 'numeric', rows: 50000, cols: 10, stream: true },
  ...[0, 1, 9].map(level => ({ name: `numeric-100k-level${level}`, kind: 'numeric', rows: 10000, cols: 10, level })),
  { name: 'styled-10k-reused', kind: 'styled', rows: 1000, cols: 10 },
  { name: 'styled-10k-new', kind: 'new-styles', rows: 1000, cols: 10 },
  { name: 'numeric-100k-direct-clone', kind: 'numeric', rows: 10000, cols: 10, directClone: true },
  { name: 'unique-100k-direct-clone', kind: 'unique', rows: 10000, cols: 10, directClone: true },
];
const results = [];
try {
  fs.writeFileSync(path.join(outputDir, 'probes.json'), JSON.stringify(run({ probes: true }), null, 2) + '\n');
  const requestedCases = process.argv.find(arg => arg.startsWith('--cases='))?.slice('--cases='.length).split(',');
  for (const config of cases.filter(config => !requestedCases || requestedCases.includes(config.name))) {
    const runs = Array.from({ length: metadata.repetitions }, () => run(config));
    results.push({ config, runs });
    fs.writeFileSync(path.join(outputDir, 'results.json'), JSON.stringify({ metadata, results }, null, 2) + '\n');
    const times = runs.map(r => r.totalMs).sort((a,b) => a-b);
    console.log(`${config.name}: median ${times[1].toFixed(1)} ms (${times[0].toFixed(1)}–${times[2].toFixed(1)})`);
  }
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
