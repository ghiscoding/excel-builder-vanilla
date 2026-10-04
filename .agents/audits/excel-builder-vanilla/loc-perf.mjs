import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { Chart, Util, Workbook } from '../../../packages/excel-builder-vanilla/dist/index.js';

const outputPath = process.argv[2];
const mode = process.argv[3];
const root = fileURLToPath(new URL('../../..', import.meta.url));
function originalMethods(file, names) {
  const result = spawnSync('git', ['show', `HEAD:packages/excel-builder-vanilla/src/Excel/${file}`], { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr);
  const ast = ts.createSourceFile(file, result.stdout, ts.ScriptTarget.Latest, true);
  const methods = [];
  function visit(node) {
    if (ts.isMethodDeclaration(node) && names.includes(node.name.getText(ast))) methods.push(node.getText(ast));
    else ts.forEachChild(node, visit);
  }
  visit(ast);
  if (methods.length !== names.length) throw new Error('Missing baseline method');
  // These method bodies are unchanged between HEAD and the pre-LOC-pass implementation.
  const code = ts.transpileModule(`class Previous { ${methods.join('\n')} }`, {
    compilerOptions: { target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return new Function('Util', `${code}\nreturn Previous.prototype;`)(Util);
}

if (mode) {
  if (mode === 'before') {
    const methods = originalMethods('Drawing/Chart.ts', ['_createPrimaryChartNode', '_resolveGrouping']);
    Chart.prototype._createPrimaryChartNode = methods._createPrimaryChartNode;
    Chart.prototype._resolveGrouping = methods._resolveGrouping;
    Workbook.prototype.createContentTypes = originalMethods('Workbook.ts', ['createContentTypes']).createContentTypes;
  }
  const charts = ['column', 'bar', 'line', 'pie', 'doughnut', 'scatter'].map(type => new Chart({
    type, stacking: 'stacked', title: 'Revenue <&>', categoriesRange: 'Data!$A$2:$A$10',
    series: [{ name: 'Revenue', valuesRange: 'Data!$B$2:$B$10', scatterXRange: 'Data!$A$2:$A$10', color: '#123456' }],
    axis: { x: { showGridLines: true, title: 'X' }, y: { minimum: 0, maximum: 100, showGridLines: true, title: 'Y' } },
    legend: { show: true, position: 'topRight' }, dataLabels: { showValue: true },
  }));
  const workbook = new Workbook();
  for (const name of ['worksheets', 'tables', 'drawings', 'charts']) workbook[name] = Array.from({ length: 1000 }, () => ({}));
  let checksum = 0;
  function measure(run, count) {
    for (let i = 0; i < 300; i++) checksum += run(i).length;
    global.gc?.();
    const start = performance.now();
    for (let i = 0; i < count; i++) checksum += run(i).length;
    return performance.now() - start;
  }
  const chartMs = measure(i => charts[i % charts.length].toChartSpaceXML().toString(), 6000);
  const contentTypesMs = measure(() => workbook.createContentTypes().toString(), 300);
  console.log(JSON.stringify({ chartMs, contentTypesMs, checksum }));
} else {
  const runs = { before: [], after: [] };
  for (let repetition = 0; repetition < 5; repetition++) {
    for (const variant of repetition % 2 ? ['after', 'before'] : ['before', 'after']) {
      const child = spawnSync(process.execPath, ['--expose-gc', fileURLToPath(import.meta.url), outputPath, variant], {
        cwd: root, encoding: 'utf8', timeout: 120000,
      });
      if (child.status !== 0) throw new Error(child.stderr);
      runs[variant].push(JSON.parse(child.stdout));
    }
  }
  if (new Set([...runs.before, ...runs.after].map(run => run.checksum)).size !== 1) throw new Error('Output checksum changed');
  const median = values => values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
  const medians = Object.fromEntries(Object.entries(runs).map(([variant, values]) => [variant, {
    chartMs: median(values.map(value => value.chartMs)), contentTypesMs: median(values.map(value => value.contentTypesMs)),
  }]));
  fs.writeFileSync(outputPath, JSON.stringify({ node: process.version,
    methodology: 'Five fresh processes per variant, alternating order; restore only changed pre-pass method bodies; 300 warmup calls and GC; serialization plus XML stringification; exclude input construction.',
    workloads: { charts: '6000 charts across six chart types', contentTypes: '300 exports of 4000 part overrides' }, runs, medians }, null, 2) + '\n');
  console.log(JSON.stringify(medians));
}
