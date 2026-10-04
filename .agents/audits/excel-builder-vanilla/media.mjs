import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { performance } from 'node:perf_hooks';
import assert from 'node:assert/strict';

const here = path.dirname(fileURLToPath(import.meta.url));
const outputDir = process.argv.find(arg => arg.startsWith('--output='))?.slice('--output='.length) || here;
fs.mkdirSync(outputDir, { recursive: true });
const pkg = path.resolve(here, '../../../packages/excel-builder-vanilla');
const require = createRequire(path.join(pkg, 'package.json'));
const { build } = await import(pathToFileURL(require.resolve('vite')));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'excel-media-audit-'));
try {
  fs.writeFileSync(path.join(temp, 'package.json'), '{"type":"module"}');
  fs.symlinkSync(path.join(pkg, 'node_modules'), path.join(temp, 'node_modules'), 'dir');
  await build({ configFile: false, root: pkg, logLevel: 'silent', build: {
    lib: { entry: path.join(pkg, 'src/factory.ts'), formats: ['es'], fileName: () => 'factory.js' },
    outDir: temp, emptyOutDir: false, rollupOptions: { external: ['fflate'] },
  } });
  const { base64ToUint8Array } = await import(pathToFileURL(path.join(temp, 'factory.js')));
  const results = [];
  for (const size of [1024 * 1024, 8 * 1024 * 1024]) {
    const binary = Buffer.alloc(size);
    for (let i = 0; i < size; i++) binary[i] = i % 256;
    const encoded = binary.toString('base64');
    const methods = { library: base64ToUint8Array, nodeBuffer: s => Buffer.from(s, 'base64'), atobLoop: s => {
      const normalized = s.replace(/^data:[^;]+;base64,/u, '').replace(/\s+/gu, '').replace(/-/g, '+').replace(/_/g, '/');
      const decoded = atob(normalized + '='.repeat((4 - normalized.length % 4) % 4));
      const bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) bytes[i] = decoded.charCodeAt(i);
      return bytes;
    } };
    if (typeof Uint8Array.fromBase64 === 'function') methods.typedArrayNative = s => Uint8Array.fromBase64(s);
    for (const [name, decode] of Object.entries(methods)) {
      decode(encoded.slice(0, 4096));
      const times = [];
      for (let i = 0; i < 3; i++) {
        global.gc?.();
        const start = performance.now();
        const decoded = decode(encoded);
        times.push(performance.now() - start);
        assert.deepEqual(Buffer.from(decoded), binary);
      }
      results.push({ size, name, times });
    }
  }
  fs.writeFileSync(path.join(outputDir, 'media-results.json'), JSON.stringify({ node: process.version,
    methodology: 'Decode only; valid canonical base64; input construction and byte equality verification outside timer. Node Buffer omits normalization and strict invalid-input semantics; atobLoop retains normalization and atob validation but not the library error wrapper.', results }, null, 2) + '\n');
  console.log(JSON.stringify(results));
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
