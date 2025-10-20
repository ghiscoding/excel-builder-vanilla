import { describe, expect, it, vi } from 'vitest';

import { Workbook } from '../Workbook.js';
import { Paths } from '../Paths.js';

describe('Workbook', () => {
  it('should initialize with default properties', () => {
    const wb = new Workbook();
    expect(wb.worksheets).toEqual([]);
    expect(wb.tables).toEqual([]);
    expect(wb.drawings).toEqual([]);
    expect(typeof wb.styleSheet).toBe('object');
    expect(typeof wb.sharedStrings).toBe('object');
    expect(typeof wb.relations).toBe('object');
  });

  it('should create a worksheet with default name', () => {
    const wb = new Workbook();
    const ws = wb.createWorksheet();
    expect(ws.name).toBe('Sheet 1');
  });

  it('should add a worksheet and set sharedStrings', () => {
    const wb = new Workbook();
    const ws = wb.createWorksheet({ name: 'TestSheet' });
    wb.addWorksheet(ws);
    expect(wb.worksheets[0]).toBe(ws);
    expect(ws.sharedStrings).toBe(wb.sharedStrings);
  });

  it('should add a table', () => {
    const wb = new Workbook();
    const table = { id: 't1' } as any;
    wb.addTable(table);
    expect(wb.tables[0]).toBe(table);
  });

  it('should add drawings', () => {
    const wb = new Workbook();
    const drawing = { id: 'd1' } as any;
    wb.addDrawings(drawing);
    expect(wb.drawings[0]).toBe(drawing);
  });

  it('should set print title top and left', () => {
    const wb = new Workbook();
    wb.setPrintTitleTop('Sheet1', 5);
    wb.setPrintTitleLeft('Sheet1', 2);
    expect(wb.printTitles.Sheet1.top).toBe(5);
    expect(wb.printTitles.Sheet1.left).toBe('B');
  });

  it('should add media and return correct meta', () => {
    const wb = new Workbook();
    const meta = wb.addMedia('image', 'pic.jpg', 'data');
    expect(meta.fileName).toBe('pic.jpg');
    expect(meta.contentType).toBe('image/jpeg');
    expect(wb.media['pic.jpg']).toBe(meta);
  });

  it('should serialize header and footer', () => {
    const wb = new Workbook();
    expect(wb.serializeHeader()).toContain('<workbook>');
    expect(wb.serializeFooter()).toContain('</workbook>');
  });

  it('should add Override for each table in createContentTypes', () => {
    const wb = new Workbook();
    wb.tables.push({ id: 't1' } as any);
    const doc = wb.createContentTypes();
    const xmlString = String(doc.documentElement);
    expect(xmlString).toContain('table1.xml');
  });

  describe('toXML', () => {
    it('should log a warning if worksheet name is too long in toXML', () => {
      const wb = new Workbook();
      // Name longer than 31 chars
      const longName = 'A'.repeat(32);
      const ws = wb.createWorksheet({ name: longName });
      wb.addWorksheet(ws);
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      wb.toXML();
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('Microsoft Excel requires work sheet names to be less than 32 characters long'),
      );
      logSpy.mockRestore();
    });
  });

  describe('_generateCorePaths()', () => {
    it('should add table XML and path in _generateCorePaths', async () => {
      const wb = new Workbook();
      const table = { id: 't1', toXML: () => '<table/>' } as any;
      wb.tables.push(table);
      const files: any = {};
      wb._generateCorePaths(files);
      expect(files['/xl/tables/table1.xml']).toBe('<table/>');
      expect(Paths[table.id]).toBe('/xl/tables/table1.xml');
    });
  });

  describe('_prepareFilesForPackaging()', () => {
    it('should use .xml property if present in _prepareFilesForPackaging', () => {
      const wb = new Workbook();
      const files: any = {
        '/xl/test.xml': { xml: '<test/>' },
      };
      wb._prepareFilesForPackaging(files);
      expect(files['/xl/test.xml']).toContain('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
      expect(files['/xl/test.xml']).toContain('<test/>');
    });

    it('should use window.XMLSerializer if .xml property is not present in _prepareFilesForPackaging', () => {
      const wb = new Workbook();
      const files: any = {
        '/xl/test.xml': { foo: 'bar' },
      };
      // Mock window.XMLSerializer
      (globalThis as any).window = {
        XMLSerializer: class {
          serializeToString(val: any) {
            return '<mocked/>';
          }
        },
      };
      wb._prepareFilesForPackaging(files);
      expect(files['/xl/test.xml']).toContain('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
      expect(files['/xl/test.xml']).toContain('<mocked/>');
      delete (globalThis as any).window;
    });
  });
});
