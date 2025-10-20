import { describe, expect, it, test, vi } from 'vitest';

import { Table } from '../Table';

// Minimal mocks for Util (replace jest.fn with vi.fn)
vi.mock('../Excel/Util', () => ({
  Util: {
    // Mock createXmlDoc to return an object with both documentElement and createElement
    createXmlDoc: (_ns: string, _root: string) => {
      // Mock element with setAttribute and appendChild
      const mockElement = {
        setAttribute: vi.fn(),
        appendChild: vi.fn(),
      };
      return {
        documentElement: mockElement,
        createElement: vi.fn(() => ({
          setAttribute: vi.fn(),
          appendChild: vi.fn(),
        })),
      };
    },
    positionToLetterRef: (_row: number, _col: number) => 'R1C1',
    schemas: { spreadsheetml: 'ns' },
  },
}));

describe('Table', () => {
  it('should generate XML with all attributes and children', () => {
    const t = new Table();
    t.ref = [
      [1, 2],
      [3, 4],
    ];
    t.headerRowCount = 1;
    t.totalsRowCount = 1;
    t.headerRowDxfId = 5;
    t.headerRowBorderDxfId = 6;
    t.tableColumns = [{ name: 'Col1' }];
    t.styleInfo = {
      themeStyle: 'TableStyle',
      showFirstColumn: true,
      showLastColumn: false,
      showColumnStripes: true,
      showRowStripes: false,
    };
    // Should not throw and should call all attribute/child code
    expect(() => t.toXML()).not.toThrow();
  });

  describe('Table', () => {
    it('should initialize with default and config values', () => {
      const t = new Table({ headerRowCount: 2, totalsRowCount: 1 });
      expect(t.headerRowCount).toBe(2);
      expect(t.totalsRowCount).toBe(1);
      expect(t.name).toContain('Table');
      expect(t.displayName).toBe(t.name);
      expect(t.id).toBe(t.name);
      expect(t.tableId).toBe(t.id.replace('Table', ''));
    });

    it('should set reference range', () => {
      const t = new Table();
      t.setReferenceRange([1, 2], [3, 4]);
      expect(t.ref).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it('should add and set table columns', () => {
      const t = new Table();
      t.setTableColumns(['Col1', { name: 'Col2', totalsRowFunction: 'sum' }]);
      expect(t.tableColumns.length).toBe(2);
      expect(t.tableColumns[0].name).toBe('Col1');
      expect(t.tableColumns[1].totalsRowFunction).toBe('sum');
    });

    it('should throw if addTableColumn called without name', () => {
      const t = new Table();
      expect(() => t.addTableColumn({} as any)).toThrow();
    });

    it('should set sort state', () => {
      const t = new Table();
      t.setSortState({ dataRange: [1, 2], sortDirection: 'asc' } as any);
      expect(t.sortState).toEqual({ dataRange: [1, 2], sortDirection: 'asc' });
    });

    it('should add auto filter', () => {
      const t = new Table();
      t.addAutoFilter([1, 2], [3, 4]);
      expect(t.autoFilter).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it('should export table columns with totalsRowFunction and totalsRowLabel', () => {
      const t = new Table();
      t.tableColumns = [{ name: 'Col1', totalsRowFunction: 'sum', totalsRowLabel: 'Total' }, { name: 'Col2' }];
      const doc = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createElement: (_name: string) => ({
          setAttribute: vi.fn(),
          appendChild: vi.fn(),
        }),
      } as any;
      const result = t.exportTableColumns(doc);
      expect(result).toBeDefined();
    });

    it('should export auto filter', () => {
      const t = new Table();
      t.autoFilter = [
        [1, 2],
        [3, 4],
      ];
      t.totalsRowCount = 1;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const doc = { createElement: (_name: string) => ({ setAttribute: vi.fn() }) } as any;
      const result = t.exportAutoFilter(doc);
      expect(result).toBeDefined();
    });

    it('should export table style info', () => {
      const t = new Table();
      t.styleInfo = {
        themeStyle: 'TableStyle',
        showFirstColumn: true,
        showLastColumn: false,
        showColumnStripes: true,
        showRowStripes: false,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const doc = { createElement: (_name: string) => ({ setAttribute: vi.fn() }) } as any;
      const result = t.exportTableStyleInfo(doc);
      expect(result).toBeDefined();
    });

    it('should throw in toXML if ref is missing', () => {
      const t = new Table();
      expect(() => t.toXML()).toThrow('Needs at least a reference range');
    });

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
});
