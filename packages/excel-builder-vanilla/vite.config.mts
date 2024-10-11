import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'iife'],
      name: 'ExcelBuilder',
      fileName: format => {
        switch (format) {
          case 'es':
            return 'index.mjs';
          case 'cjs':
            return 'index.cjs';
          default:
            return `excel-builder.${format}.js`;
        }
      },
    },
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      external: ['fflate'],
      output: {
        globals: {
          fflate: 'fflate',
        },
      },
    },
  },
});
