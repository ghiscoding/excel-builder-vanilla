import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { prepareDeclarations } from '../declaration-utils.mjs';

describe('Published declarations', () => {
  it('removes private implementation members while preserving public documentation and signatures', () => {
    const declarations = prepareDeclarations(
      `import type { External } from 'external';
//#region source.d.ts
/** Public café 🧪 documentation. */
export declare class Example {
  /** Public member. */
  value: { private: string };
  /** Private field. */
  private hidden: { nested: string };
  private static cache;
  private helper(value: string): void;
  #private;
  /** @private Internal helper. */
  _legacy(): string;
  _undocumented: string;
  /** Public helper. */
  transfer(): { _headers: string[] };
}
//#endregion
interface Options { value: Example; external: External; }
`,
      ['Options'],
    );
    expect(declarations).toContain('/** Public café 🧪 documentation. */');
    expect(declarations).toContain("import type { External } from 'external';");
    expect(declarations).toContain('/** Public member. */');
    expect(declarations).toContain('value: { private: string };');
    expect(declarations).toContain('/** Public helper. */');
    expect(declarations).toContain('transfer(): { _headers: string[] };');
    expect(declarations).toContain('export type { Options };');
    expect(declarations).not.toMatch(
      /Private field|Internal helper|private hidden|private static|private helper|#private|#region|_legacy|_undocumented/,
    );
  });

  it('preserves constructor and protected accessibility and avoids duplicate type exports', () => {
    const declarations = prepareDeclarations(
      `export declare class Example {
  private constructor();
  protected extend(): void;
  private hidden;
}
export interface Options { value: Example; }
`,
      ['Options'],
    );
    expect(declarations).toContain('private constructor();');
    expect(declarations).toContain('protected extend(): void;');
    expect(declarations).not.toContain('hidden');
    expect(declarations).not.toContain('export type { Options }');
  });

  it('fails rather than silently dropping an existing public type', () => {
    expect(() => prepareDeclarations('export declare class Example {}', ['Options'])).toThrow('Missing public declaration type: Options');
    expect(() => prepareDeclarations('export declare class {', [])).toThrow('Invalid declaration bundle');
  });

  it('compiles library and companion values in both directions with all legacy type exports', () => {
    const root = dirname(fileURLToPath(import.meta.url));
    const require = createRequire(import.meta.url);
    const compiler = join(dirname(require.resolve('typescript/package.json')), 'bin/tsc');
    const result = spawnSync(process.execPath, [compiler, '-p', join(root, 'fixtures/tsconfig.json')], { encoding: 'utf8' });
    expect(result.error).toBeUndefined();
    expect(result.stdout + result.stderr).toBe('');
    expect(result.status).toBe(0);
  });
});
