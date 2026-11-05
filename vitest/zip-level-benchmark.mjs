// Run after building the library: node --expose-gc vitest/zip-level-benchmark.mjs [rows] [samples]

import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { performance } from 'node:perf_hooks';
import { createExcelFile, createExcelFileStream, Workbook } from '../packages/excel-builder-vanilla/dist/index.js';

const require = createRequire(new URL('../packages/excel-builder-vanilla/package.json', import.meta.url));
const { unzipSync } = require('fflate');
const levels = [0, 1, 3, 6, 9];
const [rowsArg = '100000', samplesArg = '3', mode, levelArg] = process.argv.slice(2);
const rows = Number(rowsArg);
const samples = Number(samplesArg);
if (!Number.isSafeInteger(rows) || rows < 1 || !Number.isSafeInteger(samples) || samples < 1) {
  throw new Error('rows and samples must be positive integers');
}

function workbook(count) {
  const wb = new Workbook();
  const sheet = wb.createWorksheet({ name: 'Data' });
  sheet.setData(
    Array.from({ length: count }, (_, row) =>
      Array.from({ length: 10 }, (_, col) => (col % 2 ? `category-${(row + col) % 100}` : row * 10 + col)),
    ),
  );
  wb.addWorksheet(sheet);
  return wb;
}

async function exportFile(wb, path, level) {
  if (path === 'file') {
    return createExcelFile(wb, 'Uint8Array', { zipOptions: { level } });
  }
  const chunks = [];
  for await (const chunk of createExcelFileStream(wb, { zipOptions: { level }, chunkSize: 65536 })) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

if (mode) {
  const level = Number(levelArg);
  await exportFile(workbook(Math.min(rows, 500)), mode, level);
  const wb = workbook(rows);
  global.gc?.();
  const start = performance.now();
  const bytes = await exportFile(wb, mode, level);
  const ms = performance.now() - start;
  const rssMiB = process.resourceUsage().maxRSS / 1024;
  // Decompression and content validation occur outside the timed section.
  const entries = unzipSync(bytes);
  const sheet = entries['xl/worksheets/sheet1.xml'];
  if (!sheet || !entries['xl/workbook.xml']) {
    throw new Error('Missing workbook or worksheet');
  }
  const hash = createHash('sha256').update(sheet).digest('hex');
  const cells = (Buffer.from(sheet).toString().match(/<c\b/g) || []).length;
  if (cells !== rows * 10) {
    throw new Error(`Expected ${rows * 10} cells, got ${cells}`);
  }
  console.log(JSON.stringify({ mode, level, rows, ms, bytes: bytes.length, rssMiB, hash, cells }));
} else {
  let expectedHash;
  for (const path of ['stream', 'file']) {
    for (const level of levels) {
      const runs = [];
      for (let i = 0; i < samples; i++) {
        const child = spawnSync(process.execPath, ['--expose-gc', process.argv[1], String(rows), String(samples), path, String(level)], {
          encoding: 'utf8',
        });
        if (child.status !== 0 || !child.stdout.trim()) {
          throw new Error(
            `Benchmark failed: ${JSON.stringify({ script: process.argv[1], status: child.status, signal: child.signal, stderr: child.stderr, error: child.error })}`,
          );
        }
        const result = JSON.parse(child.stdout.trim());
        expectedHash ??= result.hash;
        if (result.hash !== expectedHash) {
          throw new Error('Worksheet XML differs between runs');
        }
        runs.push(result);
        console.error(`${path} level ${level}, sample ${i + 1}: ${result.ms.toFixed(0)} ms`);
      }
      const sorted = [...runs].sort((a, b) => a.ms - b.ms);
      console.log(JSON.stringify({ mode: path, level, median: sorted[Math.floor(sorted.length / 2)], runs }));
    }
  }
}
