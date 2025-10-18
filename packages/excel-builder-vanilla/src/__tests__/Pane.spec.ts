import { describe, expect, test } from 'vitest';

import { Pane } from '../Excel/Pane.js';

describe('Pane', () => {
  test('Pane with invalid state', () => {
    const pane = new Pane();
    // @ts-expect-error
    pane.state = 'invalid';
    expect(pane.state).toBe('invalid');
  });

  test('exportXML with null _freezePane', () => {
    const pane = new Pane();
    pane.state = 'frozen';
    pane._freezePane = { xSplit: 1, ySplit: 1, cell: 'A1' };
    const doc = { createElement: () => ({ setAttribute: () => {} }) };
    expect(() => pane.exportXML(doc as any)).not.toThrow();
  });
});
