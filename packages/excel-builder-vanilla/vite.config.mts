import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'iife'],
      name: 'ExcelBuilder',
      // fileName: format => (format === 'es' ? 'excel-builder.js' : `excel-builder.${format}.js`),
      fileName: format => {
        switch (format) {
          case 'es':
            return 'excel-builder.js';
          case 'cjs':
            return 'excel-builder.cjs';
          default:
            return `excel-builder.${format}.js`;
        }
      },
    },
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      external: ['fflate'],
    },
  },
  plugins: [dts({ include: ['src'] })],
});
