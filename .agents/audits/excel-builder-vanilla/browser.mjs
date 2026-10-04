import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const outputDir = process.argv.find(arg => arg.startsWith('--output='))?.slice('--output='.length) || here;
fs.mkdirSync(outputDir, { recursive: true });
const pkg = path.resolve(here, '../../../packages/excel-builder-vanilla');
const require = createRequire(path.join(pkg, 'package.json'));
const { build } = await import(pathToFileURL(require.resolve('vite')));
// Self-contained browser bundle, including fflate, without changing the package build.
const output = await build({ configFile: false, root: pkg, logLevel: 'silent', build: {
  lib: { entry: path.join(pkg, 'src/index.ts'), formats: ['es'], fileName: 'audit' },
  write: false, sourcemap: false,
} });
const code = output[0].output.find(item => item.type === 'chunk').code;
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const config of [
    { name: 'numeric-100k', kind: 'numeric', rows: 10000 },
    { name: 'unique-100k', kind: 'unique', rows: 10000 },
    { name: 'stream-100k', kind: 'numeric', rows: 10000, stream: true },
    { name: 'stream-500k', kind: 'numeric', rows: 50000, stream: true },
  ]) {
    const runs = [];
    for (let repetition = 0; repetition < 3; repetition++) {
      const page = await browser.newPage();
      // Import the bundle through a Blob URL to use its public export bindings.
      await page.evaluate(async source => {
        const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
        window.audit = await import(url);
        URL.revokeObjectURL(url);
      }, code);
      const run = await page.evaluate(async c => {
        const { Workbook, createExcelFile, createExcelFileStream } = window.audit;
        function make(rows) {
          const wb = new Workbook();
          const ws = wb.createWorksheet({ name: 'Sheet1' });
          ws.setData(Array.from({ length: rows }, (_, r) => Array.from({ length: 10 }, (_, col) =>
            c.kind === 'unique' ? `value-0-${r}-${col}-<&>` : r * 10 + col)));
          wb.addWorksheet(ws);
          return wb;
        }
        await createExcelFile(make(500), 'Uint8Array');
        const wb = make(c.rows);
        let generateMs;
        const original = wb.generateFiles;
        if (!c.stream) wb.generateFiles = async function () {
          const t = performance.now();
          const result = await original.call(this);
          generateMs = performance.now() - t;
          return result;
        };
        const start = performance.now();
        let firstTimerMs, firstChunkMs, bytes = 0, chunks = 0, firstBackingBytes;
        const timer = new Promise(resolve => setTimeout(() => { firstTimerMs = performance.now() - start; resolve(); }, 0));
        if (c.stream) {
          const reader = createExcelFileStream(wb, { chunkSize: 1024 }).getReader();
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            if (firstChunkMs === undefined) { firstChunkMs = performance.now() - start; firstBackingBytes = value.buffer.byteLength; }
            bytes += value.length;
            chunks++;
          }
        } else {
          bytes = (await createExcelFile(wb, 'Uint8Array')).length;
        }
        const totalMs = performance.now() - start;
        await timer;
        return { totalMs, generateMs, firstTimerMs, firstChunkMs, bytes, chunks, firstBackingBytes };
      }, config);
      runs.push(run);
      await page.close();
    }
    results.push({ config, runs });
    console.log(`${config.name}: ${runs.map(r => r.totalMs.toFixed(1)).join(', ')} ms`);
  }
  // Observe producer behavior with no reader.
  const page = await browser.newPage();
  await page.evaluate(async source => {
    const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    window.audit = await import(url);
    URL.revokeObjectURL(url);
  }, code);
  const probes = await page.evaluate(async () => {
    const Original = window.ReadableStream;
    const stats = { enqueues: 0, bytes: 0, closed: false, generateCalls: 0 };
    window.ReadableStream = class extends Original {
      constructor(source) {
        const wrapped = controller => ({
            enqueue(chunk) { stats.enqueues++; stats.bytes += chunk.length; controller.enqueue(chunk); },
            close() { stats.closed = true; controller.close(); },
            error(error) { controller.error(error); },
        });
        super({
          start: source.start ? controller => source.start(wrapped(controller)) : undefined,
          pull: source.pull ? controller => source.pull(wrapped(controller)) : undefined,
          cancel: source.cancel ? reason => source.cancel(reason) : undefined,
        }, { highWaterMark: 0 });
      }
    };
    // Level 0 isolates queue behavior from compression and produces more than 16 chunks.
    const fake = { generateFiles() { stats.generateCalls++; return Promise.resolve({ '/sheet.xml': 'x'.repeat(1024 * 1024) }); } };
    window.audit.createExcelFileStream(fake, { chunkSize: 1024, zipOptions: { level: 0 } });
    await new Promise(resolve => setTimeout(resolve, 200));
    window.ReadableStream = Original;
    return stats;
  });
  fs.writeFileSync(path.join(outputDir, 'browser-results.json'), JSON.stringify({ browser: browser.version(),
    methodology: 'Fresh page per run, 500-row warmup, bundled browser dependency, three runs; no forced browser GC.', results,
    noReaderProbe: probes }, null, 2) + '\n');
} finally {
  await browser.close();
}
