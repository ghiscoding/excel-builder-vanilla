import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rolldown } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import { prepareDeclarations } from './declaration-utils.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const bundle = await rolldown({
  cwd: root,
  input: join(root, 'src/index.ts'),
  external: ['fflate'],
  plugins: [dts({ cwd: root, tsconfig: join(root, 'tsconfig.json'), generator: 'tsgo', emitDtsOnly: true, sourcemap: false })],
});
try {
  const { output } = await bundle.generate({ dir: join(root, 'dist'), format: 'es', entryFileNames: '[name].js' });
  if (output.length !== 1 || output[0].type !== 'chunk' || output[0].fileName !== 'index.d.ts') {
    throw new Error('Expected a single index.d.ts declaration bundle');
  }
  const declarations = prepareDeclarations(output[0].code);
  await mkdir(join(root, 'dist'), { recursive: true });
  await writeFile(join(root, 'dist/index.d.ts'), declarations);
} finally {
  await bundle.close();
}
