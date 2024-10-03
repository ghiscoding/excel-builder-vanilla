import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
            return 'excel-builder.mjs';
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
      output: {
        globals: {
          fflate: 'fflate',
        },
      },
    },
  },
  plugins: [
    dts({
      include: ['src'],
      compilerOptions: {
        declaration: true,
        declarationMap: true,
      },
      beforeWriteFile: (filePath, content) => {
        let safeContent = content;
        if (filePath.endsWith('dist/index.d.ts')) {
          if (!safeContent) {
            safeContent = 'export {};';
          }

          const ctsFile = filePath.replace('d.ts', 'd.cts');
          writeFileSync(ctsFile, safeContent);
        }

        return {
          filePath,
          content: safeContent,
        };
      },
    }),
  ],
});
