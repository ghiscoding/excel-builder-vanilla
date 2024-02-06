import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'umd', 'iife'],
      name: 'ExcelBuilder',
      fileName: format => `excel-builder.${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      external: ['fflate'],
    },
  },
  plugins: [dts({ include: ['src'] })],
});
