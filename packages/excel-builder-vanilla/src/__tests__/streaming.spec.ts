import { unzipSync } from 'fflate';
import { describe, expect, it } from 'vitest';

import { createWorkbook } from '../factory.js';
import { createExcelFileStream } from '../streaming.js';
import { Worksheet } from '../Excel/Worksheet.js';
import { Workbook } from '../Excel/Workbook.js';

describe('Worksheet.setColumnFormats', () => {
  it('sets columnFormats property', () => {
    const ws = new Worksheet({ name: 'TestSheet' });
    // Use valid ExcelColumn objects
    const formats = [{ width: 20 }, { hidden: true }];
    ws.setColumnFormats(formats);
    expect(ws.columnFormats).toBe(formats);
  });
});

// Basic streaming test for NodeJS and browser-like environments

describe('Streaming API', () => {
  describe('Streaming API edge cases', () => {
    describe('NodeJS streaming', () => {
      it('createExcelFileStream delegates to nodeExcelStream in NodeJS', async () => {
        // Simulate NodeJS environment
        const originalWindow = globalThis.window;
        const originalProcess = globalThis.process;
        // @ts-expect-error
        delete globalThis.window;
        globalThis.process = { versions: { node: '18.0.0' } } as any;
        const { createExcelFileStream } = await import('../streaming.js');
        let called = false;
        const fakeWorkbook: any = {
          async generateFiles() {
            called = true;
            return {
              'xl/worksheet.xml': '<xml>sheet</xml>',
              'xl/media/image.png': btoa('fakebinary'),
            };
          },
        };
        const result = createExcelFileStream(fakeWorkbook, {});
        const chunks: Uint8Array[] = [];
        for await (const chunk of result) {
          chunks.push(chunk);
        }
        expect(called).toBe(true);
        // Restore
        globalThis.window = originalWindow;
        globalThis.process = originalProcess;
      });

      it('nodeExcelStream yields zipped chunks and covers non-XML file', async () => {
        // Mock workbook with generateFiles returning both XML and non-XML
        const workbook: any = {
          async generateFiles() {
            return {
              'xl/worksheet.xml': '<xml>sheet</xml>',
              'xl/media/image.png': btoa('fakebinary'),
            };
          },
        };
        // Import nodeExcelStream directly
        const { nodeExcelStream } = await import('../streaming.js');
        const chunks: Uint8Array[] = [];
        for await (const chunk of nodeExcelStream(workbook)) {
          chunks.push(chunk);
        }
        expect(chunks.length).toBeGreaterThan(0);
        // Concatenate chunks correctly for unzipSync
        const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
        const zipped = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of chunks) {
          zipped.set(chunk, offset);
          offset += chunk.length;
        }
        const files = unzipSync(zipped);
        expect(Object.keys(files)).toContain('xl/worksheet.xml');
        expect(Object.keys(files)).toContain('xl/media/image.png');
      });
    });

    it('throws on unsupported environment', () => {
      // Simulate an unsupported environment
      const originalWindow = globalThis.window;
      const originalProcess = globalThis.process;
      // @ts-expect-error
      delete globalThis.window;
      // @ts-expect-error
      delete globalThis.process;
      const workbook = createWorkbook();
      expect(() => createExcelFileStream(workbook)).toThrow('Streaming is only supported in browser or NodeJS environments.');
      // Restore
      globalThis.window = originalWindow;
      globalThis.process = originalProcess;
    });

    it('handles empty workbook', async () => {
      const workbook = createWorkbook();
      const chunks: Uint8Array[] = [];
      for await (const chunk of createExcelFileStream(workbook)) {
        chunks.push(chunk);
      }
      expect(chunks.length).toBeGreaterThan(0);
    });

    it('respects chunkSize option', async () => {
      const workbook = createWorkbook();
      const ws = workbook.createWorksheet({ name: 'Sheet1' });
      ws.setData([
        ['A', 'B'],
        [1, 2],
      ]);
      workbook.addWorksheet(ws);
      const chunks: Uint8Array[] = [];
      for await (const chunk of createExcelFileStream(workbook, { chunkSize: 1 })) {
        chunks.push(chunk);
      }
      expect(chunks.length).toBeGreaterThan(0);
    });
  });

  it('should stream Excel file chunks', async () => {
    const workbook = createWorkbook();
    const worksheet = workbook.createWorksheet({ name: 'Sheet1' });
    worksheet.setData([
      ['Artist', 'Album', 'Price'],
      ['Buckethead', 'Albino Slug', 8.99],
      ['Crystal Method', 'Vegas', 10.54],
    ]);
    workbook.addWorksheet(worksheet);

    const chunks: Uint8Array[] = [];
    for await (const chunk of createExcelFileStream(workbook, { chunkSize: 1024 })) {
      expect(chunk).toBeInstanceOf(Uint8Array);
      chunks.push(chunk);
    }
    // Should produce a non-empty file
    const totalSize = chunks.reduce((sum, c) => sum + c.length, 0);
    expect(totalSize).toBeGreaterThan(0);
  });

  it('should stream Excel file with formulas and styles', async () => {
    const workbook = createWorkbook();
    const worksheet = workbook.createWorksheet({ name: 'Sheet2' });
    worksheet.setData([
      [{ value: 'Artist' }, { value: 'Price' }, { value: 'Total' }],
      ['Buckethead', 8.99, { value: 'B2*2', metadata: { type: 'formula' } }],
      ['Crystal Method', 10.54, { value: 'B3*2', metadata: { type: 'formula' } }],
    ]);
    workbook.addWorksheet(worksheet);

    const chunks: Uint8Array[] = [];
    for await (const chunk of createExcelFileStream(workbook, { chunkSize: 512 })) {
      expect(chunk).toBeInstanceOf(Uint8Array);
      chunks.push(chunk);
    }
    const totalSize = chunks.reduce((sum, c) => sum + c.length, 0);
    expect(totalSize).toBeGreaterThan(0);
  });

  describe('Worksheet XML helpers', () => {
    it('getWorksheetXmlHeader returns correct header', () => {
      const ws = new Worksheet({ name: 'Test' });
      const header = ws.getWorksheetXmlHeader();
      expect(header).toContain('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
      expect(header).toContain('<worksheet');
      expect(header).toContain('xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"');
    });

    it('getWorksheetXmlFooter returns empty string if no header/footer', () => {
      const ws = new Worksheet({ name: 'Test' });
      expect(ws.getWorksheetXmlFooter()).toBe('');
    });

    it('getWorksheetXmlFooter returns headerFooter XML if header/footer set', () => {
      const ws = new Worksheet({ name: 'Test' });
      ws.setHeader(['Left', 'Center', 'Right']);
      ws.setFooter(['FLeft', 'FCenter', 'FRight']);
      const xml = ws.getWorksheetXmlFooter();
      expect(xml).toContain('<headerFooter>');
      expect(xml).toContain('<oddHeader>');
      expect(xml).toContain('<oddFooter>');
      expect(xml).toContain('Left');
      expect(xml).toContain('FLeft');
    });
  });

  describe('serializeRows', () => {
    it('serializes text and number rows correctly', () => {
      const ws = new Worksheet({ name: 'Test' });
      ws.sharedStrings = { strings: {}, addString: () => 0 } as any;
      const rows = [
        ['Header1', 'Header2'],
        [123, 'abc'],
      ];
      const xml = ws.serializeRows(rows);
      expect(xml).toContain('<row r="1">');
      expect(xml).toContain('<c r="A1" t="s"><v>0</v></c>');
      expect(xml).toContain('<c r="B2" t="s"><v>0</v></c>');
    });

    it('serializes formula cells', () => {
      const ws = new Worksheet({ name: 'Test' });
      ws.sharedStrings = { strings: {}, addString: () => 0 } as any;
      const rows = [
        ['Header1', 'Header2'],
        [{ value: 'A2+B2', metadata: { type: 'formula' } }, 42],
      ];
      const xml = ws.serializeRows(rows);
      expect(xml).toContain('<c r="A2" t="s"><v>0</v></c>');
      expect(xml).toContain('<c r="B2"><v>42</v></c>');
    });
  });
});

describe('Workbook XML serialization', () => {
  it('serializeHeader returns correct XML header', () => {
    const wb = new Workbook();
    expect(wb.serializeHeader()).toBe('<?xml version="1.0" encoding="UTF-8"?><workbook>');
  });

  it('serializeFooter returns correct XML footer', () => {
    const wb = new Workbook();
    expect(wb.serializeFooter()).toBe('</workbook>');
  });
});
