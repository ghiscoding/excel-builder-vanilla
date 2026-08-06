import { describe, expect, it, vi } from 'vitest';

import { Chart } from '../Drawing/Chart.js';
import { Paths } from '../Paths.js';
import { Workbook } from '../Workbook.js';

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
    expect(wb.printTitles!.Sheet1.top).toBe(5);
    expect(wb.printTitles!.Sheet1.left).toBe('B');
  });

  it('should add media and return correct meta', () => {
    const wb = new Workbook();
    const meta = wb.addMedia('image', 'pic.jpg', 'data');
    expect(meta.fileName).toBe('pic.jpg');
    expect(meta.contentType).toBe('image/jpeg');
    expect(wb.media['pic.jpg']).toBe(meta);
  });

  it('should keep provided contentType and deduplicate existing media records', () => {
    const wb = new Workbook();
    const first = wb.addMedia('image', 'logo.custom', 'data-a', 'image/custom');
    const second = wb.addMedia('image', 'logo.custom', 'data-b', 'image/other');

    expect(first.contentType).toBe('image/custom');
    expect(second).toBe(first);
    expect(wb.media['logo.custom'].data).toBe('data-a');
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

    it('should serialize workbook defined names', () => {
      const wb = new Workbook();
      const ws = wb.createWorksheet({ name: 'Sales' });
      wb.addWorksheet(ws);
      wb.addDefinedName('TaxRate', '=0.08');

      const xml = wb.toXML().toString();
      expect(xml).toContain('<definedNames>');
      expect(xml).toContain('<definedName name="TaxRate">0.08</definedName>');
    });

    it('should serialize sheet-scoped defined names', () => {
      const wb = new Workbook();
      const ws = wb.createWorksheet({ name: 'Data' });
      wb.addWorksheet(ws);
      wb.addDefinedName('LocalRate', '=0.12', 'Data');

      const xml = wb.toXML().toString();
      expect(xml).toContain('<definedName name="LocalRate" localSheetId="0">0.12</definedName>');
    });

    it('should add custom function as Excel-compatible LAMBDA defined name by default', () => {
      const wb = new Workbook();
      wb.addCustomFunction('CUSTOMSUM', ['values'], 'SUM(values)');

      const xml = wb.toXML().toString();
      expect(xml).toContain('<definedName name="CUSTOMSUM">_xlfn.LAMBDA(_xlpm.values,SUM(_xlpm.values))</definedName>');
    });

    it('should support xlfn prefix for custom function definitions', () => {
      const wb = new Workbook();
      wb.addCustomFunction('CUSTOMSUM', ['values'], 'SUM(values)', { autoPrefixXlfn: true });

      const xml = wb.toXML().toString();
      expect(xml).toContain('<definedName name="CUSTOMSUM">_xlfn.LAMBDA(_xlpm.values,SUM(_xlpm.values))</definedName>');
    });

    it('should allow non-prefixed lambda output when autoPrefixXlfn is disabled', () => {
      const wb = new Workbook();
      wb.addCustomFunction('CUSTOMSUM', ['values'], 'SUM(values)', { autoPrefixXlfn: false });

      const xml = wb.toXML().toString();
      expect(xml).toContain('<definedName name="CUSTOMSUM">LAMBDA(values,SUM(values))</definedName>');
    });

    it('should qualify multi-arg lambda bodies without partial arg collisions', () => {
      const wb = new Workbook();
      wb.addCustomFunction('CUSTOMCOMBO', ['value', 'values'], 'SUM(value)+SUM(values)');

      const xml = wb.toXML().toString();
      expect(xml).toContain(
        '<definedName name="CUSTOMCOMBO">_xlfn.LAMBDA(_xlpm.value,_xlpm.values,SUM(_xlpm.value)+SUM(_xlpm.values))</definedName>',
      );
    });

    it('should reject invalid defined names and refersTo values', () => {
      const wb = new Workbook();
      expect(() => wb.addDefinedName('A1', '=1')).toThrow('looks like a cell reference');
      expect(() => wb.addDefinedName('Tax Rate', '=1')).toThrow('is invalid');
      expect(() => wb.addDefinedName('TaxRate', '1')).toThrow("must start with '='");
    });

    it('should reject empty/too-long names and empty refersTo', () => {
      const wb = new Workbook();
      expect(() => wb.addDefinedName('', '=1')).toThrow('non-empty string');
      expect(() => wb.addDefinedName('A'.repeat(256), '=1')).toThrow('too long');
      expect(() => wb.addDefinedName('TaxRate', '')).toThrow('refersTo must be a non-empty string');
    });

    it('should reject invalid numeric scope and allow valid numeric scope', () => {
      const wb = new Workbook();
      const ws = wb.createWorksheet({ name: 'SheetA' });
      wb.addWorksheet(ws);

      expect(() => wb.addDefinedName('ScopedBad', '=1', 99)).not.toThrow();
      expect(() => wb.toXML()).toThrow('scope index "99" is out of range');

      const wb2 = new Workbook();
      const ws2 = wb2.createWorksheet({ name: 'SheetB' });
      wb2.addWorksheet(ws2);
      wb2.addDefinedName('ScopedOk', '=2', 0);
      const xml = wb2.toXML().toString();
      expect(xml).toContain('<definedName name="ScopedOk" localSheetId="0">2</definedName>');
    });

    it('should reject invalid custom function args and body', () => {
      const wb = new Workbook();
      expect(() => wb.addCustomFunction('CUSTOMSUM', [], 'SUM(values)')).toThrow('at least one argument name');
      expect(() => wb.addCustomFunction('CUSTOMSUM', ['values'], '')).toThrow('non-empty formula body');
    });

    it('should serialize custom defined name attributes comment and hidden', () => {
      const wb = new Workbook();
      wb.addDefinedName('INTERNAL_FLAG', '=1', undefined, { comment: 'Internal toggle', hidden: true });

      const xml = wb.toXML().toString();
      expect(xml).toContain('<definedName name="INTERNAL_FLAG" comment="Internal toggle" hidden="1">1</definedName>');
    });

    it('should reject unresolved defined name scope', () => {
      const wb = new Workbook();
      wb.addDefinedName('LocalOnly', '=1', 'MissingSheet');

      expect(() => wb.toXML()).toThrow('scope worksheet "MissingSheet" was not found');
    });

    it('should serialize print titles for top-only and left-only definitions', () => {
      const wb = new Workbook();
      wb.addWorksheet(wb.createWorksheet({ name: 'TopOnly' }));
      wb.addWorksheet(wb.createWorksheet({ name: 'LeftOnly' }));

      wb.setPrintTitleTop('TopOnly', 3);
      wb.setPrintTitleLeft('LeftOnly', 2);

      const xml = wb.toXML().toString();
      expect(xml).toContain('<definedName name="_xlnm.Print_Titles" localSheetId="0">TopOnly!$1:$3</definedName>');
      expect(xml).toContain('<definedName name="_xlnm.Print_Titles" localSheetId="1">LeftOnly!$A:$B</definedName>');
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
          serializeToString(_val: any) {
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

  describe('chart-related branches', () => {
    it('addChart assigns index and target', () => {
      const wb = new Workbook();
      const chart = new Chart({
        type: 'bar',
        title: 'C1',
        series: [{ name: 'S1', valuesRange: 'Sheet!$A$1:$A$1' }],
        categoriesRange: 'Sheet!$A$1:$A$1',
      });
      wb.addChart(chart);
      expect(chart.index).toBe(1);
      expect(chart.target).toBe('../charts/chart1.xml');
    });

    it('_generateCorePaths adds chart XML and path', () => {
      const wb = new Workbook();
      const chart = new Chart({
        type: 'line',
        title: 'LineChart',
        series: [{ name: 'S1', valuesRange: 'Sheet!$A$1:$A$1' }],
        categoriesRange: 'Sheet!$A$1:$A$1',
      });
      wb.addChart(chart);
      const files: any = {};
      wb._generateCorePaths(files);
      expect(files['/xl/charts/chart1.xml']).toBeTruthy();
      expect(Paths[chart.id]).toBe('/xl/charts/chart1.xml');
    });

    it('generateFiles includes worksheet rel file and chart file', async () => {
      const wb = new Workbook();
      const ws = wb.createWorksheet({ name: 'Data' });
      wb.addWorksheet(ws);
      const chart = new Chart({
        type: 'pie',
        title: 'PieChart',
        series: [{ name: 'S1', valuesRange: 'Data!$A$1:$A$1' }],
        categoriesRange: 'Data!$A$1:$A$1',
      });
      wb.addChart(chart);
      const files = await wb.generateFiles();
      expect(files['/xl/worksheets/_rels/sheet1.xml.rels']).toBeTruthy();
      expect(files['/xl/charts/chart1.xml']).toBeTruthy();
    });
  });
});
