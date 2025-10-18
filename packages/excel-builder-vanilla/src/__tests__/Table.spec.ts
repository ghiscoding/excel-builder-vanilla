import { describe, expect, test } from 'vitest';

import { Table } from '../Excel/Table.js';

describe('Table', () => {
  test('Table with totals row and custom functions', () => {
    const table = new Table();
    table.setTableColumns([
      { name: 'Col1', totalsRowLabel: 'Sum' },
      { name: 'Col2', totalsRowFunction: 'sum' },
    ]);
    table.totalsRowCount = 1;
    table.setReferenceRange([1, 1], [2, 5]);
    expect(table.tableColumns[1].totalsRowFunction).toBe('sum');
    expect(table.totalsRowCount).toBe(1);
  });

  test('Table autoFilter and sortState', () => {
    const table = new Table();
    table.autoFilter = { ref: 'A1:B2' };
    table.sortState = { columnSort: true };
    expect(table.autoFilter.ref).toBe('A1:B2');
    expect(table.sortState.columnSort).toBe(true);
  });

  test('Table error handling for invalid reference', () => {
    const table = new Table();
    expect(() => table.setReferenceRange([1], [2, 3])).not.toThrow();
    // The toXML method throws if ref is not set properly
    table.ref = null;
    expect(() => table.toXML()).toThrow();
  });

  test('exportTableStyleInfo with missing styleInfo', () => {
    const table = new Table();
    table.styleInfo = {};
    const doc = { createElement: () => ({ setAttribute: () => {} }) };
    expect(() => table.exportTableStyleInfo(doc as any)).not.toThrow();
  });
});
