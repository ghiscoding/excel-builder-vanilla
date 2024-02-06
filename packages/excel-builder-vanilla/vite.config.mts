import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
