import { exec } from 'child_process';
import { buildSync } from 'esbuild';
import { extname } from 'node:path';

const env = process.env.NODE_ENV;

// Start the compilation process
runCompilation(process.env.LERNA_FILE_CHANGES.split(','));

function runBuild(options) {
  const startTime = new Date().getTime();
  const buildOptions = {
    ...{
      color: true,
      entryPoints: ['./src/index.ts'],
      bundle: true,
      minify: env === 'production',
      format: 'esm',
      target: 'es2021',
      sourcemap: false,
      logLevel: 'error',
      // outfile: env === 'production' ? './dist/excel-builder.min.js' : './dist/excel-builder.js',
      outfile: 'dist/esm/excel-builder.js',
    },
    ...options,
  };
  buildSync(buildOptions);
  const endTime = new Date().getTime();
  console.info(`⚡️ Built in ${endTime - startTime}ms`);
}

async function runCompilation(changedFiles) {
  let tsLogged = false;

  for (const changedFile of changedFiles) {
    const extension = extname(changedFile);

    if (extension === '.ts') {
      if (!tsLogged) {
        console.log('TypeScript file changes detected');
        tsLogged = true;
      }
      runBuild();
      exec('pnpm run build:types', () => {});
    }
  }
}
