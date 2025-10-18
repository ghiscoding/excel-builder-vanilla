import { describe, expect, test } from 'vitest';

import { StyleSheet } from '../Excel/StyleSheet.js';
import { XMLNode } from '../Excel/XMLDOM.js';

describe('StyleSheet', () => {
  test('createFormat with empty object', () => {
    const ss = new StyleSheet();
    const fmt = ss.createSimpleFormatter('date');
    expect(fmt).toBeDefined();
  });

  test('createFill with minimal object', () => {
    const ss = new StyleSheet();
    const fill = ss.createFill({ type: 'pattern', patternType: 'solid', fgColor: 'FF000000', bgColor: 'FFFFFFFF' });
    expect(fill).toBeDefined();
  });

  test('createDifferentialStyle with border', () => {
    const ss = new StyleSheet();
    const style = ss.createDifferentialStyle({ border: { top: { style: 'thin', color: 'FF000000' } } });
    expect(style).toHaveProperty('border');
    const border = style.border as any;
    expect(border.top).toHaveProperty('style', 'thin');
    expect(border.top).toHaveProperty('color', 'FF000000');
  });

  test('createDifferentialStyle with fill', () => {
    const ss = new StyleSheet();
    const style = ss.createDifferentialStyle({ fill: { type: 'pattern', patternType: 'solid', fgColor: 'FF000000' } });
    expect(style).toHaveProperty('fill');
    expect(style.fill).toHaveProperty('type', 'pattern');
    expect(style.fill).toHaveProperty('patternType', 'solid');
    expect(style.fill).toHaveProperty('fgColor', 'FF000000');
  });

  test('createDifferentialStyle with format', () => {
    const ss = new StyleSheet();
    const style = ss.createDifferentialStyle({ format: 'General' });
    expect(style).toHaveProperty('numFmt', 'General');
  });

  test('exportTableStyles with defaultTableStyle', () => {
    const ss = new StyleSheet();
    ss.tableStyles.push({ name: 'TestStyle', wholeTable: 1 });
    ss.defaultTableStyle = true;
    const doc = { createElement: () => ({ setAttribute: () => {}, appendChild: () => {} }), documentElement: {} };
    expect(() => ss.exportTableStyles(doc as any)).not.toThrow();
  });

  test('exportProtection with custom data', () => {
    const ss = new StyleSheet();
    const doc = { createElement: () => ({ setAttribute: () => {} }) };
    const protection = ss.exportProtection(doc as any, { locked: true, hidden: false });
    expect(protection).toBeDefined();
  });

  describe('StyleSheet.createFontStyle()', () => {
    test('createFontStyle superscript', () => {
      const ss = new StyleSheet();
      const result = ss.createFontStyle({ superscript: true });
      expect(result).toHaveProperty('vertAlign', 'superscript');
    });

    test('createFontStyle subscript', () => {
      const ss = new StyleSheet();
      const result = ss.createFontStyle({ subscript: true });
      expect(result).toHaveProperty('vertAlign', 'subscript');
    });

    test('createFontStyle underline string values', () => {
      const ss = new StyleSheet();
      const underlineTypes = ['double', 'singleAccounting', 'doubleAccounting'];
      underlineTypes.forEach(type => {
        const result = ss.createFontStyle({ underline: type as any });
        expect(result).toHaveProperty('underline', type);
      });
    });

    test('createFontStyle strike', () => {
      const ss = new StyleSheet();
      const result = ss.createFontStyle({ strike: true });
      expect(result).toHaveProperty('strike', true);
    });

    test('createFontStyle outline', () => {
      const ss = new StyleSheet();
      const result = ss.createFontStyle({ outline: true });
      expect(result).toHaveProperty('outline', true);
    });

    test('createFontStyle shadow', () => {
      const ss = new StyleSheet();
      const result = ss.createFontStyle({ shadow: true });
      expect(result).toHaveProperty('shadow', true);
    });

    test('createFontStyle fontName', () => {
      const ss = new StyleSheet();
      const result = ss.createFontStyle({ fontName: 'Arial' });
      expect(result).toHaveProperty('fontName', 'Arial');
    });
  });

  describe('StyleSheet.createFormat()', () => {
    test('createFormat with protection', () => {
      const ss = new StyleSheet();
      const result = ss.createFormat({ protection: { locked: true, hidden: false } });
      expect(result).toHaveProperty('protection');
    });

    test('createFormat with font', () => {
      const ss = new StyleSheet();
      const result = ss.createFormat({ font: { bold: true, color: 'FF000000' } });
      expect(result).toHaveProperty('fontId');
      expect(typeof result.fontId).toBe('number');
    });

    test('createFormat with format', () => {
      const ss = new StyleSheet();
      const result = ss.createFormat({ format: 'General' });
      expect(result).toHaveProperty('numFmtId');
      expect(typeof result.numFmtId).toBe('number');
    });

    test('createFormat with border', () => {
      const ss = new StyleSheet();
      const result = ss.createFormat({ border: { top: { style: 'thin', color: 'FF000000' } } });
      expect(result).toHaveProperty('borderId');
      expect(typeof result.borderId).toBe('number');
    });

    test('createFormat with fill', () => {
      const ss = new StyleSheet();
      const result = ss.createFormat({ fill: { type: 'pattern', patternType: 'solid', fgColor: 'FF000000' } });
      expect(result).toHaveProperty('fillId');
      expect(typeof result.fillId).toBe('number');
    });

    test('createFormat with font as numeric id', () => {
      const ss = new StyleSheet();
      const result = ss.createFormat({ font: 1 });
      expect(result).toHaveProperty('fontId', 1);
    });

    test('createFormat with format as numeric id', () => {
      const ss = new StyleSheet();
      const result = ss.createFormat({ format: 101 });
      expect(result).toHaveProperty('numFmtId', 101);
    });

    test('createFormat with border as numeric id', () => {
      const ss = new StyleSheet();
      const result = ss.createFormat({ border: 2 });
      expect(result).toHaveProperty('borderId', 2);
    });

    test('createFormat with fill as numeric id', () => {
      const ss = new StyleSheet();
      const result = ss.createFormat({ fill: 3 });
      expect(result).toHaveProperty('fillId', 3);
    });

    test('createFormat throws for non-numeric font id', () => {
      const ss = new StyleSheet();
      expect(() => ss.createFormat({ font: 'not-a-number' as any })).toThrow('Passing a non-numeric font id is not supported');
    });

    test('createFormat throws for non-numeric format id', () => {
      const ss = new StyleSheet();
      expect(() => ss.createFormat({ format: {} as any })).toThrow('Invalid number formatter id');
    });

    test('createFormat throws for non-numeric border id', () => {
      const ss = new StyleSheet();
      expect(() => ss.createFormat({ border: 'not-a-number' as any })).toThrow('Passing a non-numeric border id is not supported');
    });

    test('createFormat throws for non-numeric fill id', () => {
      const ss = new StyleSheet();
      expect(() => ss.createFormat({ fill: 'not-a-number' as any })).toThrow('Passing a non-numeric fill id is not supported');
    });
  });

  describe('StyleSheet.exportBorder()', () => {
    test('exportBorder with style and color', () => {
      const ss = new StyleSheet();
      // Manual mock functions
      const setAttributeCalls: any[] = [];
      const setAttributeMock = (...args: any[]) => {
        setAttributeCalls.push(args);
      };
      const appendChildCalls: any[] = [];
      const appendChildMock = (...args: any[]) => {
        appendChildCalls.push(args);
      };
      const doc = {
        createElement: (name: string) => ({
          name,
          setAttribute: setAttributeMock,
          appendChild: appendChildMock,
        }),
      } as any;
      const borderData = {
        left: { style: 'thin', color: 'FF000000' },
        right: {},
        top: {},
        bottom: {},
        diagonal: {},
      };
      ss.exportBorder(doc, borderData);
      // Check that setAttribute and appendChild were called for left side
      expect(setAttributeCalls.some(call => call[0] === 'style' && call[1] === 'thin')).toBe(true);
      expect(appendChildCalls.length).toBeGreaterThan(0);
    });
  });

  describe('StyleSheet.exportColor()', () => {
    test('exportColor with tint', () => {
      const ss = new StyleSheet();
      const setAttributeCalls: any[] = [];
      const colorEl = { setAttribute: (...args: any[]) => setAttributeCalls.push(args) };
      const doc = { createElement: () => colorEl } as any;
      ss.exportColor(doc, { tint: 0.5 });
      expect(setAttributeCalls).toContainEqual(['tint', 0.5]);
    });

    test('exportColor with auto', () => {
      const ss = new StyleSheet();
      const setAttributeCalls: any[] = [];
      const colorEl = { setAttribute: (...args: any[]) => setAttributeCalls.push(args) };
      const doc = { createElement: () => colorEl } as any;
      ss.exportColor(doc, { auto: true });
      expect(setAttributeCalls).toContainEqual(['auto', 'true']);
    });

    test('exportColor with theme', () => {
      const ss = new StyleSheet();
      const setAttributeCalls: any[] = [];
      const colorEl = { setAttribute: (...args: any[]) => setAttributeCalls.push(args) };
      const doc = { createElement: () => colorEl } as any;
      ss.exportColor(doc, { theme: 7 });
      expect(setAttributeCalls).toContainEqual(['theme', 7]);
    });
  });

  describe('StyleSheet.exportCellFormatElement()', () => {
    test('exportCellFormatElement with alignment and protection', () => {
      const ss = new StyleSheet();
      const appendChildCalls: any[] = [];
      const setAttributeCalls: any[] = [];
      const xf = {
        appendChild: (...args: any[]) => appendChildCalls.push(args),
        setAttribute: (...args: any[]) => setAttributeCalls.push(args),
      };
      const doc = { createElement: () => xf } as any;
      ss.exportCellFormatElement(doc, {
        alignment: { horizontal: 'center' },
        protection: { locked: true },
        fillId: 1,
        fontId: 2,
        borderId: 3,
        numFmtId: 4,
      } as any);
      expect(appendChildCalls.length).toBeGreaterThanOrEqual(2); // alignment + protection
      expect(setAttributeCalls).toContainEqual(['applyProtection', '1']);
      expect(setAttributeCalls).toContainEqual(['applyFill', '1']);
      expect(setAttributeCalls).toContainEqual(['applyFont', '1']);
      expect(setAttributeCalls).toContainEqual(['applyBorder', '1']);
      expect(setAttributeCalls).toContainEqual(['applyAlignment', '1']);
      expect(setAttributeCalls).toContainEqual(['applyNumberFormat', '1']);
    });
  });

  describe('StyleSheet.exportFont()', () => {
    test('exportFont with all properties', () => {
      const ss = new StyleSheet();
      const appendChildCalls: any[] = [];
      const setAttributeCalls: any[] = [];
      const font = {
        appendChild: (...args: any[]) => appendChildCalls.push(args),
        setAttribute: (...args: any[]) => setAttributeCalls.push(args),
      };
      const doc = {
        createElement: () => font,
      } as any;
      const fd = {
        size: 12,
        fontName: 'Arial',
        bold: true,
        italic: true,
        vertAlign: 'superscript',
        underline: 'double',
        strike: true,
        shadow: true,
        outline: true,
        color: 'FF000000',
      };
      ss.exportFont(doc, fd);
      // Check that setAttribute and appendChild were called for all properties
      expect(setAttributeCalls).toContainEqual(['val', 12]); // size
      expect(setAttributeCalls).toContainEqual(['val', 'Arial']); // fontName
      expect(setAttributeCalls).toContainEqual(['val', 'superscript']); // vertAlign
      expect(setAttributeCalls).toContainEqual(['val', 'double']); // underline
      expect(appendChildCalls.length).toBeGreaterThanOrEqual(8); // bold, italic, vertAlign, underline, strike, shadow, outline, color
    });
  });

  describe('StyleSheet.exportFill()', () => {
    test('exportFill with gradient type', () => {
      const ss = new StyleSheet();
      const appendChildCalls: any[] = [];
      const setAttributeCalls: any[] = [];
      const fill = {
        appendChild: (...args: any[]) => appendChildCalls.push(args),
        setAttribute: (...args: any[]) => setAttributeCalls.push(args),
      };
      const doc = {
        createElement: () => fill,
      } as any;
      const fd = {
        type: 'gradient',
        degree: 45,
        start: { pureAt: 0, color: 'FF0000FF' },
        end: { pureAt: 1, color: 'FF00FF00' },
      };
      ss.exportFill(doc, fd);
      // Check that appendChild and setAttribute were called for gradient fill
      expect(appendChildCalls.length).toBeGreaterThanOrEqual(1);
      expect(setAttributeCalls.some(call => call[0] === 'degree' && call[1] === 45)).toBe(true);
    });
  });

  describe('StyleSheet.exportGradientFill()', () => {
    test('exportGradientFill with left/right/top/bottom', () => {
      const ss = new StyleSheet();
      const setAttributeCalls: any[] = [];
      const appendChildCalls: any[] = [];
      const fillDef = {
        setAttribute: (...args: any[]) => setAttributeCalls.push(args),
        appendChild: (...args: any[]) => appendChildCalls.push(args),
      };
      const colorEl = {
        setAttribute: (...args: any[]) => setAttributeCalls.push(args),
        appendChild: (...args: any[]) => appendChildCalls.push(args),
      };
      const doc = {
        createElement: (name: string) => (name === 'gradientFill' ? fillDef : colorEl),
      } as any;
      ss.exportGradientFill(doc, {
        left: 1,
        right: 2,
        top: 3,
        bottom: 4,
        start: { pureAt: 0, color: 'FF0000FF' },
        end: { pureAt: 1, color: 'FF00FF00' },
      });
      expect(setAttributeCalls).toContainEqual(['left', 1]);
      expect(setAttributeCalls).toContainEqual(['right', 2]);
      expect(setAttributeCalls).toContainEqual(['top', 3]);
      expect(setAttributeCalls).toContainEqual(['bottom', 4]);
    });

    test('exportGradientFill with start.theme', () => {
      const ss = new StyleSheet();
      const setAttributeCalls: any[] = [];
      const appendChildCalls: any[] = [];
      const fillDef = {
        setAttribute: (...args: any[]) => setAttributeCalls.push(args),
        appendChild: (...args: any[]) => appendChildCalls.push(args),
      };
      const colorEl = {
        setAttribute: (...args: any[]) => setAttributeCalls.push(args),
        appendChild: (...args: any[]) => appendChildCalls.push(args),
      };
      const doc = {
        createElement: (name: string) => (name === 'gradientFill' ? fillDef : colorEl),
      } as any;
      ss.exportGradientFill(doc, {
        degree: 45,
        start: { theme: 5 },
        end: { pureAt: 1, color: 'FF00FF00' },
      });
      expect(setAttributeCalls).toContainEqual(['theme', 5]);
    });

    test('exportGradientFill with end.theme', () => {
      const ss = new StyleSheet();
      const setAttributeCalls: any[] = [];
      const appendChildCalls: any[] = [];
      const fillDef = {
        setAttribute: (...args: any[]) => setAttributeCalls.push(args),
        appendChild: (...args: any[]) => appendChildCalls.push(args),
      };
      const colorEl = {
        setAttribute: (...args: any[]) => setAttributeCalls.push(args),
        appendChild: (...args: any[]) => appendChildCalls.push(args),
      };
      const doc = {
        createElement: (name: string) => (name === 'gradientFill' ? fillDef : colorEl),
      } as any;
      ss.exportGradientFill(doc, {
        degree: 45,
        start: { pureAt: 0, color: 'FF0000FF' },
        end: { theme: 6 },
      });
      expect(setAttributeCalls).toContainEqual(['theme', 6]);
    });
  });

  describe('StyleSheet.exportPatternFill()', () => {
    test('exportPatternFill sets default bgColor and fgColor', () => {
      const ss = new StyleSheet();
      const setAttributeCalls: any[] = [];
      const bgColor = { setAttribute: (...args: any[]) => setAttributeCalls.push(['bg', ...args]) };
      const fgColor = { setAttribute: (...args: any[]) => setAttributeCalls.push(['fg', ...args]) };
      const fillDef = { appendChild: () => {}, setAttribute: () => {} };
      const doc = {
        createElement: (name: string) => (name === 'bgColor' ? bgColor : name === 'fgColor' ? fgColor : fillDef),
      } as any;
      ss.exportPatternFill(doc, { patternType: 'solid' });
      expect(setAttributeCalls).toContainEqual(['bg', 'rgb', 'FFFFFFFF']);
      expect(setAttributeCalls).toContainEqual(['fg', 'rgb', 'FFFFFFFF']);
    });

    test('exportPatternFill bgColor.theme and rbg', () => {
      const ss = new StyleSheet();
      const setAttributeCalls: any[] = [];
      const bgColor = { setAttribute: (...args: any[]) => setAttributeCalls.push(['bg', ...args]) };
      const fgColor = { setAttribute: () => {} };
      const fillDef = { appendChild: () => {}, setAttribute: () => {} };
      const doc = {
        createElement: (name: string) => (name === 'bgColor' ? bgColor : name === 'fgColor' ? fgColor : fillDef),
      } as any;
      ss.exportPatternFill(doc, { patternType: 'solid', bgColor: { theme: 2 } });
      ss.exportPatternFill(doc, { patternType: 'solid', bgColor: { rbg: 'FF123456' } });
      expect(setAttributeCalls).toContainEqual(['bg', 'theme', 2]);
      expect(setAttributeCalls).toContainEqual(['bg', 'rgb', 'FF123456']);
    });

    test('exportPatternFill fgColor.theme and rbg', () => {
      const ss = new StyleSheet();
      const setAttributeCalls: any[] = [];
      const bgColor = { setAttribute: () => {} };
      const fgColor = { setAttribute: (...args: any[]) => setAttributeCalls.push(['fg', ...args]) };
      const fillDef = { appendChild: () => {}, setAttribute: () => {} };
      const doc = {
        createElement: (name: string) => (name === 'bgColor' ? bgColor : name === 'fgColor' ? fgColor : fillDef),
      } as any;
      ss.exportPatternFill(doc, { patternType: 'solid', fgColor: { theme: 3 } });
      ss.exportPatternFill(doc, { patternType: 'solid', fgColor: { rbg: 'FF654321' } });
      expect(setAttributeCalls).toContainEqual(['fg', 'theme', 3]);
      expect(setAttributeCalls).toContainEqual(['fg', 'rgb', 'FF654321']);
    });
  });

  describe('StyleSheet.exportNumberFormatters()', () => {
    test('exportNumberFormatters with numberFormatters', () => {
      const ss = new StyleSheet();
      ss.numberFormatters = [
        { id: 100, formatCode: 'General' },
        { id: 101, formatCode: 'Currency' },
      ];
      const appendChildCalls: any[] = [];
      const formatters = {
        appendChild: (...args: any[]) => appendChildCalls.push(args),
        setAttribute: () => {},
      };
      const doc = { createElement: () => formatters } as any;
      ss.exportNumberFormatters(doc);
      expect(appendChildCalls.length).toBe(2);
    });
  });

  describe('StyleSheet.exportDFX()', () => {
    test('exportDFX with all properties', () => {
      const ss = new StyleSheet();
      const appendChildCalls: any[] = [];
      const dxf = {
        appendChild: (...args: any[]) => appendChildCalls.push(args),
        setAttribute: () => {},
      };
      const doc = { createElement: () => dxf } as any;
      const style = {
        font: { bold: true },
        fill: { type: 'pattern', patternType: 'solid' },
        border: {
          top: { style: 'thin' },
          left: {},
          right: {},
          bottom: {},
          diagonal: {},
        },
        numFmt: { id: 100, formatCode: 'General' },
        alignment: { horizontal: 'center' },
      };
      ss.exportDFX(doc, style);
      // Check that appendChild was called for all properties
      expect(appendChildCalls.length).toBeGreaterThanOrEqual(5);
    });

    test('StyleSheet.toXML with tableStyles present', () => {
      const ss = new StyleSheet();
      ss.tableStyles = [{ name: 'TestTableStyle', wholeTable: 1 }];
      const mockNode = new XMLNode({ nodeName: 'tableStyles' });
      let called = false;
      ss.exportTableStyles = () => {
        called = true;
        return mockNode;
      };
      const xml = ss.toXML();
      // The returned XML doc should contain our mockNode appended
      const children = xml.documentElement.children;
      expect(called).toBe(true);
      expect(children).toContain(mockNode);
    });
  });
});
