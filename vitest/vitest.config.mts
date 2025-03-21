import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    cache: false,
    clearMocks: true,
    deps: {
      interopDefault: false,
    },
    environment: 'happy-dom',
    setupFiles: ['./vitest/vitest-pretest.ts'],
    watch: false,
    coverage: {
      include: ['packages/excel-builder-vanilla/**/*.ts'],
      exclude: [...configDefaults.exclude, '**/__tests__/**', '**/interfaces/**', '**/interfaces.ts', '**/*.d.ts', '**/index.ts'],
      provider: 'v8',
    },
  },
});
