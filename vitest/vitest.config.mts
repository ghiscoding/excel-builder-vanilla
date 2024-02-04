import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    cache: false,
    clearMocks: true,
    deps: {
      interopDefault: false,
    },
    environment: 'node',
    dangerouslyIgnoreUnhandledErrors: true, // useNx often fails and it's probably going to be removed in next major
    testTimeout: 60000,
    setupFiles: [],
    watch: false,
    coverage: {
      include: ['packages/excel-builder-vanilla/**/*.ts'],
      exclude: [...configDefaults.exclude, '**/interfaces/**', '**/*.d.ts', '**/index.ts'],
      provider: 'v8',
    },
  },
});
