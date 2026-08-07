import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    cache: false,
    clearMocks: true,
    include: ['packages/**/__tests__/**/*.spec.ts'],
    exclude: ['packages/**/__browser_tests__/**', ...configDefaults.exclude],
    deps: {
      interopDefault: false,
    },
    environment: 'happy-dom',
    setupFiles: ['./vitest/vitest-pretest.ts'],
    watch: false,
    coverage: {
      include: ['packages/excel-builder-vanilla/**/*.ts'],
      exclude: [
        ...configDefaults.exclude,
        '**/__tests__/**',
        '**/__browser_tests__/**',
        '**/interfaces/**',
        '**/interfaces.ts',
        '**/*.d.ts',
        '**/index.ts',
      ],
      provider: 'v8',
    },
  },
});
