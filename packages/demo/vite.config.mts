import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';

const base64Loader: Plugin = {
  name: 'base64-loader',
  transform(_: any, id: string) {
    const [path, query] = id.split('?');
    if (query !== 'base64') return null;

    const data = readFileSync(path);
    const base64 = data.toString('base64');

    return `export default '${base64}';`;
  },
};

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    cors: true,
    open: true,
    host: 'localhost',
  },
  optimizeDeps: {
    exclude: ['excel-builder-vanilla'],
  },
  plugins: [base64Loader],
});
