import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const base64Loader = {
  name: 'base64-loader',
  transform(_: unknown, id: string) {
    const [path, query = ''] = id.split('?');
    const hasBase64Query = query
      .split('&')
      .map(part => part.split('=')[0])
      .includes('base64');
    if (!hasBase64Query) return null;

    return `export default '${readFileSync(path).toString('base64')}'`;
  },
};

const rootDir = fileURLToPath(new URL('..', import.meta.url));

export default defineConfig({
  define: {
    __EXCEL_DEMO_STREAMING_ROWS__: 10,
  },
  plugins: [base64Loader],
  resolve: {
    alias: {
      'excel-builder-vanilla': resolve(rootDir, 'packages/excel-builder-vanilla/src/index.ts'),
    },
  },
  test: {
    name: 'browser',
    include: ['packages/excel-builder-vanilla/src/__browser_tests__/**/*.browser.spec.ts'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    testTimeout: 120_000,
    watch: false,
  },
});
