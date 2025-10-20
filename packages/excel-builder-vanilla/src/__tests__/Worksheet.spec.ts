import { describe, expect, test } from 'vitest';

import { Worksheet } from '../Excel/Worksheet.js';

describe('Worksheet', () => {
  test('getWorksheetXmlHeader and Footer', () => {
    const ws = new Worksheet({ name: 'Test' });
    ws._headers = ['Header'];
    ws._footers = ['Footer'];
    expect(ws.getWorksheetXmlHeader()).toContain('<worksheet');
    expect(ws.getWorksheetXmlFooter()).toContain('<headerFooter>');
  });

  test('serializeRows with sharedStrings', () => {
    const ws = new Worksheet({ name: 'Test' });
    ws.sharedStrings = { strings: {}, addString: () => 0 } as any;
    const xml = ws.serializeRows([['A', 1]]);
    expect(xml).toContain('<row');
  });

  test('setData with empty array', () => {
    const ws = new Worksheet({ name: 'Empty' });
    ws.setData([]);
    expect(ws.data.length).toBe(0);
  });

  test('mergeCells with invalid range', () => {
    const ws = new Worksheet({ name: 'Test' });
    expect(() => ws.mergeCells('A1', 'A0')).not.toThrow();
  });

  test('setColumns with missing width', () => {
    const ws = new Worksheet({ name: 'Test' });
    ws.setColumns([{}]);
    expect(ws.columns[0]).toBeDefined();
  });
});
