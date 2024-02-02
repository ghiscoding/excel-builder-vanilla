import { buildSync } from 'esbuild';

const buildFormats = ['cjs', 'esm'];

for (const format of buildFormats) {
  const extension = format === 'cjs' ? 'cjs' : 'js';
  // excel-builder.js
  runBuild({
    format,
    outfile: `dist/${format}/excel-builder.${extension}`,
  });

  // finally, create a regular bundle as a standalone which will be accessible as ExcelBuilder from the global window object
  // this file is basically a legacy alternative to import via a <script> tag
  runBuild({
    format,
    globalName: 'ExcelBuilder',
    outfile: `dist/browser/excel-builder.${extension}`,
  });
}

function runBuild(options) {
  const startTime = new Date().getTime();
  const buildOptions = {
    ...{
      color: true,
      entryPoints: ['./src/index.ts'],
      external: ['jszip'],
      bundle: true,
      minify: true,
      target: 'es2021',
      sourcemap: true,
      logLevel: 'error',
    },
    ...options,
  };
  buildSync(buildOptions);
  const endTime = new Date().getTime();
  console.info(`⚡️ Built "${buildOptions.outfile}" in ${endTime - startTime}ms`);
}
