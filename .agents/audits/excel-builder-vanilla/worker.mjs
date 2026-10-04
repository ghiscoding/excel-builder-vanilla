import { pathToFileURL } from 'node:url';
import { performance } from 'node:perf_hooks';
import { createRequire } from 'node:module';

const [compiled, configJSON] = process.argv.slice(2);
const config = JSON.parse(configJSON);
const lib = await import(pathToFileURL(`${compiled}/index.js`));
const require = createRequire(`${compiled}/package.json`);
const { unzipSync, strFromU8 } = require('fflate');
const { Workbook, XMLNode, Paths } = lib;

function makeWorkbook(c) {
  const wb = new Workbook();
  const sharedStyle = c.kind === 'styled' ? wb.styleSheet.createFormat({ font: { bold: true }, format: '0.00' }).id : undefined;
  for (let s = 0; s < (c.sheets || 1); s++) {
    const ws = wb.createWorksheet({ name: `Sheet${s + 1}` });
    const data = Array.from({ length: c.rows }, (_, r) => Array.from({ length: c.cols }, (_, col) => {
      const n = r * c.cols + col;
      if (c.kind === 'repeated') return `group-${n % 100}`;
      if (c.kind === 'unique') return `value-${s}-${r}-${col}-<&>`;
      if (c.kind === 'styled') return { value: n, metadata: { style: sharedStyle } };
      if (c.kind === 'new-styles') return { value: n, metadata: { style: wb.styleSheet.createFormat({ font: { bold: true }, format: '0.00' }).id } };
      if (c.kind === 'mixed') {
        switch (col % 5) {
          case 0: return n;
          case 1: return `group-${r % 100}`;
          case 2: return r % 2 === 0;
          case 3: return { value: new Date(1704067200000 + r * 86400000), metadata: { type: 'date' } };
          case 4: return { value: `A${r + 1}*2`, metadata: { type: 'formula' } };
        }
      }
      return n;
    }));
    ws.setData(data);
    wb.addWorksheet(ws);
  }
  return wb;
}

if (config.probes) {
  const wb = new Workbook();
  const ws = wb.createWorksheet({ name: 'Repeat' });
  ws.setData([['alpha', 'beta', 'gamma']]);
  ws.hyperlinks.push({ cell: 'A1', id: 'original', location: 'https://example.com' });
  wb.addWorksheet(ws);
  const first = await wb.generateFiles();
  const second = await wb.generateFiles();
  const repeated = {
    sameStrings: first['/xl/sharedStrings.xml'] === second['/xl/sharedStrings.xml'],
    firstStrings: first['/xl/sharedStrings.xml'], secondStrings: second['/xl/sharedStrings.xml'],
    firstRelations: first['/xl/worksheets/_rels/sheet1.xml.rels'], secondRelations: second['/xl/worksheets/_rels/sheet1.xml.rels'],
  };
  const before = Object.keys(Paths).length;
  for (let i = 0; i < 100; i++) await makeWorkbook({ rows: 1, cols: 1 }).generateFiles();
  const pathsGrowth = Object.keys(Paths).length - before;
  const weird = new Workbook();
  const weirdSheet = weird.createWorksheet({ name: 'Names' });
  weirdSheet.setData([['constructor', 'toString', '__proto__']]);
  weird.addWorksheet(weirdSheet);
  const weirdFiles = await weird.generateFiles();
  const serial = makeWorkbook({ rows: 1, cols: 28 });
  serial.worksheets[0].setHeader(['A&B', '', '']);
  const serialRows = serial.worksheets[0].serializeRows([[...Array.from({ length: 27 }, () => 1), { value: 'A1*2', metadata: { type: 'formula', style: 1 } }]]);
  const unhandled = [];
  const onRejection = error => unhandled.push(String(error));
  process.on('unhandledRejection', onRejection);
  const bad = new Workbook();
  bad.addMedia('image', 'bad.png', '! invalid !');
  let settlement = 'pending';
  lib.createExcelFile(bad, 'Uint8Array').then(() => { settlement = 'resolved'; }, () => { settlement = 'rejected'; });
  await new Promise(resolve => setTimeout(resolve, 50));
  process.off('unhandledRejection', onRejection);
  console.log(JSON.stringify({ repeated, pathsGrowthPer100Workbooks: pathsGrowth, inheritedKeys: weirdFiles, serialRows,
    serialFooter: serial.worksheets[0].getWorksheetXmlFooter(), badMedia: { settlement, unhandled } }));
  process.exit(0);
}

if (config.directClone) {
  // Diagnostic experiment only: bypass the temporary toJSON tree; production source is unchanged.
  XMLNode.prototype.cloneNode = function () {
    const copy = new XMLNode({ nodeName: this.nodeName, nodeValue: this.nodeValue });
    for (const key of Object.keys(this.attributes)) copy.setAttribute(key, this.attributes[key]);
    for (const child of this.children) {
      copy.appendChild(child instanceof XMLNode ? child.cloneNode(true) : new child.constructor(child.nodeValue));
    }
    return copy;
  };
}

// Same-type small warmup, then a fresh workbook for the measurement.
await lib.createExcelFile(makeWorkbook({ ...config, rows: Math.min(config.rows, 500), sheets: 1 }), 'Uint8Array');
global.gc?.();
const setupStart = performance.now();
const wb = makeWorkbook(config);
const setupMs = performance.now() - setupStart;
global.gc?.();
const memoryStart = process.memoryUsage();
const phases = {};
const memorySnapshots = { start: memoryStart };
function wrap(object, key, label) {
  const original = object[key];
  object[key] = function (...args) {
    const start = performance.now();
    const result = original.apply(this, args);
    const record = () => {
      phases[label] = (phases[label] || 0) + performance.now() - start;
      memorySnapshots[label] = process.memoryUsage();
    };
    if (result?.then) return result.then(value => { record(); return value; });
    record();
    return result;
  };
}
function wrapChunks(object, key, label) {
  const original = object[key];
  if (!original) return;
  object[key] = function* (...args) {
    const iterator = original.apply(this, args);
    try {
      while (true) {
        const start = performance.now();
        const item = iterator.next();
        phases[label] = (phases[label] || 0) + performance.now() - start;
        if (item.done) break;
        yield item.value;
      }
    } finally {
      iterator.return?.();
      memorySnapshots[label] = process.memoryUsage();
    }
  };
}
wb.worksheets.forEach(ws => wrap(ws, 'toXML', 'worksheetTreesMs'));
wb.worksheets.forEach(ws => wrapChunks(ws, 'getXmlChunks', 'worksheetSerializationMs'));
wrapChunks(wb.sharedStrings, 'getXmlChunks', 'sharedStringsSerializationMs');
wrap(wb.sharedStrings, 'toXML', 'sharedStringsTreeMs');
wrap(wb.styleSheet, 'toXML', 'styleTreeMs');
wrap(wb, '_prepareFilesForPackaging', 'serializeAndPackageMs');
if (!config.stream) wrap(wb, 'generateFiles', 'generateFilesMs');
let firstTimerMs;
const start = performance.now();
const timer = new Promise(resolve => setTimeout(() => { firstTimerMs = performance.now() - start; resolve(); }, 0));
let zipped, firstChunkMs, chunks = 0, firstBackingBytes;
const zipOptions = { level: config.level ?? 6 };
if (config.stream) {
  const parts = [];
  for await (const part of lib.createExcelFileStream(wb, { zipOptions, chunkSize: 1024 })) {
    if (firstChunkMs === undefined) { firstChunkMs = performance.now() - start; firstBackingBytes = part.buffer.byteLength; }
    chunks++;
    parts.push(part);
  }
  zipped = Buffer.concat(parts);
} else {
  zipped = await lib.createExcelFile(wb, 'Uint8Array', { zipOptions });
}
const totalMs = performance.now() - start;
const memoryEnd = process.memoryUsage();
const peakRSSMiB = process.resourceUsage().maxRSS / 1024;
await timer;
// Validate ZIP output outside the timed section; this is not an Excel compatibility check.
const files = unzipSync(zipped);
let cells = 0, rawBytes = 0;
for (const [name, bytes] of Object.entries(files)) {
  rawBytes += bytes.length;
  if (/^xl\/worksheets\/sheet\d+\.xml$/.test(name)) cells += (strFromU8(bytes).match(/<c\b/g) || []).length;
}
const expectedCells = config.rows * config.cols * (config.sheets || 1);
if (cells !== expectedCells) throw new Error(`Cell count ${cells}, expected ${expectedCells}`);
console.log(JSON.stringify({ config, setupMs, totalMs, firstTimerMs, firstChunkMs, firstBackingBytes, chunks,
  phases, memoryStart, memoryEnd, memorySnapshots, peakRSSMiB, zipBytes: zipped.length, rawBytes, cells,
  sharedStrings: wb.sharedStrings.stringArray.length, styles: wb.styleSheet.masterCellFormats.length }));
