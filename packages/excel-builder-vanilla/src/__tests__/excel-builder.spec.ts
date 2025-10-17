import { describe, expect, test } from 'vitest';

import { Drawings } from '../Excel/Drawings.js';
import { Pane } from '../Excel/Pane.js';
import { Picture } from '../Excel/Drawing/Picture.js';
import { Positioning } from '../Excel/Positioning.js';
import { StyleSheet } from '../Excel/StyleSheet.js';
import { Table } from '../Excel/Table.js';
import { Workbook } from '../Excel/Workbook.js';
import { Worksheet } from '../Excel/Worksheet.js';
import { createWorkbook } from '../factory.js';
import { RelationshipManager } from '../Excel/RelationshipManager.js';
import { SharedStrings } from '../Excel/SharedStrings.js';
import { SheetView } from '../Excel/SheetView.js';
import { Util } from '../Excel/Util.js';
import { XMLNode } from '../Excel/XMLDOM';

describe('Excel-Builder-Vanilla', () => {
  const originalData = [
    ['Artist', 'Album', 'Price'],
    ['Buckethead', 'Albino Slug', 8.99],
    ['Buckethead', 'Electric Tears', 13.99],
    ['Buckethead', 'Colma', 11.34],
    ['Crystal Method', 'Vegas', 10.54],
    ['Crystal Method', 'Tweekend', 10.64],
    ['Crystal Method', 'Divided By Night', 8.99],
  ];

  test('basic grid', () => {
    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Artists' });
    albumList.setData(originalData);
    artistWorkbook.addWorksheet(albumList);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: 'StyleSheet2',
      borders: [{ bottom: {}, diagonal: {}, left: {}, right: {}, top: {} }],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}],
      fills: [{}, { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' }],
      fonts: [{}],
      masterCellFormats: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 }],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [],
      tableStyles: [],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _footers: [],
      _freezePane: {},
      _headers: [],
      _rowInstructions: {},
      _tables: [],
      id: 'Worksheet2',
      name: 'Artists',
      columnFormats: [],
      columns: [],
      data: [
        ['Artist', 'Album', 'Price'],
        ['Buckethead', 'Albino Slug', 8.99],
        ['Buckethead', 'Electric Tears', 13.99],
        ['Buckethead', 'Colma', 11.34],
        ['Crystal Method', 'Vegas', 10.54],
        ['Crystal Method', 'Tweekend', 10.64],
        ['Crystal Method', 'Divided By Night', 8.99],
      ],
      mergedCells: [],
      relations: { lastId: 1, relations: {} },
    });
  });

  test('Columns Sizing with setColumns()', () => {
    const artistWorkbook = new Workbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Artists' });
    albumList.mergeCells('A1', 'C1');

    const stylesheet = artistWorkbook.getStyleSheet();
    const header = stylesheet.createFormat({
      alignment: {
        horizontal: 'center',
      },
      font: {
        bold: true,
        color: 'FF2b995d',
        size: 13,
      },
    });

    const originalData = [
      [{ value: 'Merged Header', metadata: { style: header.id } }],
      ['Artist', 'Album', 'Price'],
      ['Buckethead', 'Albino Slug', 8.99],
      ['Buckethead', 'Electric Tears', 13.99],
      ['Buckethead', 'Colma', 11.34],
      ['Crystal Method', 'Vegas', 10.54],
      ['Crystal Method', 'Tweekend', 10.64],
      ['Crystal Method', 'Divided By Night', 8.99],
    ];

    albumList.setData(originalData);
    albumList.setColumns([{ width: 30 }, { width: 20, hidden: true }, { width: 10 }]);
    artistWorkbook.addWorksheet(albumList);

    const wsXML = artistWorkbook.worksheets[0].toXML();
    expect(wsXML.documentElement.attributes).toEqual({
      xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'xmlns:mc': 'http://schemas.openxmlformats.org/markup-compatibility/2006',
    });
    expect(wsXML.documentElement.children.length).toBe(5);
    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: expect.stringContaining('StyleSheet'),
      borders: [{ bottom: {}, diagonal: {}, left: {}, right: {}, top: {} }],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}],
      fills: [{}, { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' }],
      fonts: [{}, { id: 1, bold: true, color: 'FF2b995d', size: 13 }],
      masterCellFormats: [
        { borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 },
        { id: 1, alignment: { horizontal: 'center' }, fontId: 1 },
      ],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [],
      tableStyles: [],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _footers: [],
      _freezePane: {},
      _headers: [],
      _rowInstructions: {},
      _tables: [],
      id: expect.stringContaining('Worksheet'),
      name: 'Artists',
      columnFormats: [],
      columns: [{ width: 30 }, { hidden: true, width: 20 }, { width: 10 }],
      data: [
        [{ value: 'Merged Header', metadata: { style: 1 } }],
        ['Artist', 'Album', 'Price'],
        ['Buckethead', 'Albino Slug', 8.99],
        ['Buckethead', 'Electric Tears', 13.99],
        ['Buckethead', 'Colma', 11.34],
        ['Crystal Method', 'Vegas', 10.54],
        ['Crystal Method', 'Tweekend', 10.64],
        ['Crystal Method', 'Divided By Night', 8.99],
      ],
      mergedCells: [['A1', 'C1']],
      relations: { lastId: 1, relations: {} },
    });
  });

  test('Cell Format via createFormat()', () => {
    const artistWorkbook = new Workbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Artists' });
    const boldDXF = artistWorkbook.getStyleSheet().createFormat({
      font: {
        italic: true,
        underline: true,
      },
    });
    albumList.setRowInstructions(1, {
      height: 40,
      style: boldDXF.id,
    });
    albumList.setData(originalData);
    artistWorkbook.addWorksheet(albumList);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: expect.stringContaining('StyleSheet'),
      borders: [{ bottom: {}, diagonal: {}, left: {}, right: {}, top: {} }],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}],
      fills: [{}, { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' }],
      fonts: [{}, { id: 1, italic: true, underline: true }],
      masterCellFormats: [
        { borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 },
        { fontId: 1, id: 1 },
      ],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [],
      tableStyles: [],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _footers: [],
      _freezePane: {},
      _headers: [],
      _rowInstructions: { '1': { height: 40, style: 1 } },
      _tables: [],
      id: expect.stringContaining('Worksheet'),
      name: 'Artists',
      columnFormats: [],
      columns: [],
      data: [
        ['Artist', 'Album', 'Price'],
        ['Buckethead', 'Albino Slug', 8.99],
        ['Buckethead', 'Electric Tears', 13.99],
        ['Buckethead', 'Colma', 11.34],
        ['Crystal Method', 'Vegas', 10.54],
        ['Crystal Method', 'Tweekend', 10.64],
        ['Crystal Method', 'Divided By Night', 8.99],
      ],
      mergedCells: [],
      relations: { lastId: 1, relations: {} },
    });
  });

  test('Cell Format via createFormat()', () => {
    const artistWorkbook = new Workbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Artists' });
    const stylesheet = artistWorkbook.getStyleSheet();

    const red = 'FFFF0000';
    const importantFormatter = stylesheet.createFormat({
      font: {
        bold: true,
        color: red,
      },
      border: {
        bottom: { color: red, style: 'thin' },
        top: { color: red, style: 'thin' },
        left: { color: red, style: 'thin' },
        right: { color: red, style: 'dotted' },
      },
    });

    const themeColor = stylesheet.createFormat({
      // --- Targeted Coverage Tests ---

      font: {
        bold: true,
        color: { theme: 3 },
      },
    });

    const originalData = [
      [
        { value: 'Artist', metadata: { style: importantFormatter.id } },
        { value: 'Album', metadata: { style: themeColor.id } },
        { value: 'Price', metadata: { style: themeColor.id } },
      ],
      ['Buckethead', 'Albino Slug', 8.99],
      ['Buckethead', 'Electric Tears', 13.99],
      ['Buckethead', 'Colma', 11.34],
      ['Crystal Method', 'Vegas', 10.54],
      ['Crystal Method', 'Tweekend', 10.64],
      ['Crystal Method', 'Divided By Night', 8.99],
    ];

    albumList.setData(originalData);
    albumList.setColumns([{ width: 30 }, { width: 20 }, { width: 10 }]);
    artistWorkbook.addWorksheet(albumList);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: expect.stringContaining('StyleSheet'),
      borders: [
        { bottom: {}, diagonal: {}, left: {}, right: {}, top: {} },
        {
          bottom: { color: 'FFFF0000', style: 'thin' },
          diagonal: {},
          id: 1,
          left: { color: 'FFFF0000', style: 'thin' },
          right: { color: 'FFFF0000', style: 'dotted' },
          top: { color: 'FFFF0000', style: 'thin' },
        },
      ],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}],
      fills: [{}, { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' }],
      fonts: [{}, { id: 1, bold: true, color: 'FFFF0000' }, { id: 2, bold: true, color: { theme: 3 } }],
      masterCellFormats: [
        { borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 },
        { borderId: 1, fontId: 1, id: 1 },
        { fontId: 2, id: 2 },
      ],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [],
      tableStyles: [],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _footers: [],
      _freezePane: {},
      _headers: [],
      _rowInstructions: {},
      _tables: [],
      id: expect.stringContaining('Worksheet'),
      name: 'Artists',
      columnFormats: [],
      columns: [{ width: 30 }, { width: 20 }, { width: 10 }],
      data: [
        [
          { metadata: { style: 1 }, value: 'Artist' },
          { metadata: { style: 2 }, value: 'Album' },
          { metadata: { style: 2 }, value: 'Price' },
        ],
        ['Buckethead', 'Albino Slug', 8.99],
        ['Buckethead', 'Electric Tears', 13.99],
        ['Buckethead', 'Colma', 11.34],
        ['Crystal Method', 'Vegas', 10.54],
        ['Crystal Method', 'Tweekend', 10.64],
        ['Crystal Method', 'Divided By Night', 8.99],
      ],
      mergedCells: [],
      relations: { lastId: 1, relations: {} },
    });
  });

  test('Currency Format via createFormat()', () => {
    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });
    const currency = artistWorkbook.getStyleSheet().createFormat({
      format: '$#,##0.00',
    });
    const originalData = [
      ['Artist', 'Album', 'Price'],
      ['Buckethead', 'Albino Slug', { value: 8.99, metadata: { style: currency.id } }],
      ['Buckethead', 'Electric Tears', { value: 13.99, metadata: { style: currency.id } }],
      ['Buckethead', 'Colma', { value: 11.34, metadata: { style: currency.id } }],
      ['Crystal Method', 'Vegas', { value: 10.54, metadata: { style: currency.id } }],
      ['Crystal Method', 'Tweekend', { value: 10.64, metadata: { style: currency.id } }],
      ['Crystal Method', 'Divided By Night', { value: 8.99, metadata: { style: currency.id } }],
    ];
    albumList.setData(originalData);
    artistWorkbook.addWorksheet(albumList);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: expect.stringContaining('StyleSheet'),
      borders: [{ bottom: {}, diagonal: {}, left: {}, right: {}, top: {} }],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}],
      fills: [{}, { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' }],
      fonts: [{}],
      masterCellFormats: [
        { borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 },
        { id: 1, numFmtId: 100 },
      ],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [{ formatCode: '$#,##0.00', id: 100 }],
      tableStyles: [],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _footers: [],
      _freezePane: {},
      _headers: [],
      _rowInstructions: {},
      _tables: [],
      id: expect.stringContaining('Worksheet'),
      name: 'Album List',
      columnFormats: [],
      columns: [],
      data: [
        ['Artist', 'Album', 'Price'],
        ['Buckethead', 'Albino Slug', { metadata: { style: 1 }, value: 8.99 }],
        ['Buckethead', 'Electric Tears', { metadata: { style: 1 }, value: 13.99 }],
        ['Buckethead', 'Colma', { metadata: { style: 1 }, value: 11.34 }],
        ['Crystal Method', 'Vegas', { metadata: { style: 1 }, value: 10.54 }],
        ['Crystal Method', 'Tweekend', { metadata: { style: 1 }, value: 10.64 }],
        ['Crystal Method', 'Divided By Night', { metadata: { style: 1 }, value: 8.99 }],
      ],
      mergedCells: [],
      relations: { lastId: 1, relations: {} },
    });
  });

  test('Date Format via createFormat()', () => {
    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });
    const date = artistWorkbook.getStyleSheet().createSimpleFormatter('date');

    const originalData = [
      ['Artist', 'Album', 'Date Modified'],
      ['Buckethead', 'Albino Slug', { value: new Date(2024, 1, 1), metadata: { type: 'date', style: date.id } }],
      ['Buckethead', 'Electric Tears', { value: new Date(2024, 1, 2), metadata: { type: 'date', style: date.id } }],
      ['Buckethead', 'Colma', { value: new Date(2024, 1, 3), metadata: { type: 'date', style: date.id } }],
      ['Crystal Method', 'Vegas', { value: new Date(2024, 1, 4), metadata: { type: 'date', style: date.id } }],
      ['Crystal Method', 'Tweekend', { value: new Date(2024, 1, 5), metadata: { type: 'date', style: date.id } }],
      ['Crystal Method', 'Divided By Night', { value: new Date(2024, 1, 6), metadata: { type: 'date', style: date.id } }],
    ];
    albumList.setData(originalData);
    artistWorkbook.addWorksheet(albumList);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: expect.stringContaining('StyleSheet'),
      borders: [{ bottom: {}, diagonal: {}, left: {}, right: {}, top: {} }],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}],
      fills: [{}, { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' }],
      fonts: [{}],
      masterCellFormats: [
        { borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 },
        { id: 1, numFmtId: 14 },
      ],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [],
      tableStyles: [],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _footers: [],
      _freezePane: {},
      _headers: [],
      _rowInstructions: {},
      _tables: [],
      id: expect.stringContaining('Worksheet'),
      name: 'Album List',
      columnFormats: [],
      columns: [],
      data: [
        ['Artist', 'Album', 'Date Modified'],
        ['Buckethead', 'Albino Slug', { metadata: { style: 1, type: 'date' }, value: new Date(2024, 1, 1) }],
        ['Buckethead', 'Electric Tears', { metadata: { style: 1, type: 'date' }, value: new Date(2024, 1, 2) }],
        ['Buckethead', 'Colma', { metadata: { style: 1, type: 'date' }, value: new Date(2024, 1, 3) }],
        ['Crystal Method', 'Vegas', { metadata: { style: 1, type: 'date' }, value: new Date(2024, 1, 4) }],
        ['Crystal Method', 'Tweekend', { metadata: { style: 1, type: 'date' }, value: new Date(2024, 1, 5) }],
        ['Crystal Method', 'Divided By Night', { metadata: { style: 1, type: 'date' }, value: new Date(2024, 1, 6) }],
      ],
      mergedCells: [],
      relations: { lastId: 1, relations: {} },
    });

    const wbXML = artistWorkbook.toXML();
    const wsXML = artistWorkbook.worksheets[0].toXML();

    expect(wbXML.documentElement.children.length).toBe(2);
    expect(wbXML.documentElement.attributes).toEqual({
      xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    });
    expect(wsXML.documentElement.children.length).toBe(4);
    expect(wsXML.documentElement.attributes).toEqual({
      xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'xmlns:mc': 'http://schemas.openxmlformats.org/markup-compatibility/2006',
    });
  });

  test('Alignment via createFormat()', () => {
    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });
    const centerAlign = artistWorkbook.getStyleSheet().createFormat({
      alignment: {
        horizontal: 'center',
      },
    });
    const originalData = [
      [
        { value: 'Artist', metadata: { style: centerAlign.id } },
        { value: 'Album', metadata: { style: centerAlign.id } },
        { value: 'Price', metadata: { style: centerAlign.id } },
      ],
      ['Buckethead', 'Albino Slug', 8.99],
      ['Buckethead', 'Electric Tears', 13.99],
      ['Buckethead', 'Colma', 11.34],
      ['Crystal Method', 'Vegas', 10.54],
      ['Crystal Method', 'Tweekend', 10.64],
      ['Crystal Method', 'Divided By Night', 8.99],
    ];
    albumList.setData(originalData);
    albumList.setColumns([{ width: 30 }, { width: 25 }, { width: 12 }]);
    artistWorkbook.addWorksheet(albumList);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: expect.stringContaining('StyleSheet'),
      borders: [{ bottom: {}, diagonal: {}, left: {}, right: {}, top: {} }],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}],
      fills: [{}, { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' }],
      fonts: [{}],
      masterCellFormats: [
        { borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 },
        { id: 1, alignment: { horizontal: 'center' } },
      ],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [],
      tableStyles: [],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _footers: [],
      _freezePane: {},
      _headers: [],
      _rowInstructions: {},
      _tables: [],
      id: expect.stringContaining('Worksheet'),
      name: 'Album List',
      columnFormats: [],
      columns: [{ width: 30 }, { width: 25 }, { width: 12 }],
      data: [
        [
          { metadata: { style: 1 }, value: 'Artist' },
          { metadata: { style: 1 }, value: 'Album' },
          { metadata: { style: 1 }, value: 'Price' },
        ],
        ['Buckethead', 'Albino Slug', 8.99],
        ['Buckethead', 'Electric Tears', 13.99],
        ['Buckethead', 'Colma', 11.34],
        ['Crystal Method', 'Vegas', 10.54],
        ['Crystal Method', 'Tweekend', 10.64],
        ['Crystal Method', 'Divided By Night', 8.99],
      ],
      mergedCells: [],
      relations: { lastId: 1, relations: {} },
    });
  });

  test('Background Fillers createFormat()', () => {
    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });
    const stylesheet = artistWorkbook.getStyleSheet();

    const blue = 'FF0000FF';
    const header = stylesheet.createFormat({
      font: {
        bold: true,
        color: blue,
      },
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: 'FF00FF00',
      },
    });

    const artistNameFormat = stylesheet.createFormat({
      font: {
        color: 'FFFFFFFF',
      },
      fill: {
        type: 'gradient',
        degree: 180,
        start: 'FF92D050',
        end: { pureAt: 0.8, color: 'FF0070C0' },
      },
    });

    const originalData = [
      [
        { value: 'Artist', metadata: { style: header.id } },
        { value: 'Album', metadata: { style: header.id } },
        { value: 'Price', metadata: { style: header.id } },
      ],
      [{ value: 'Buckethead', metadata: { style: artistNameFormat.id } }, 'Albino Slug', 8.99],
      [{ value: 'Buckethead', metadata: { style: artistNameFormat.id } }, 'Electric Tears', 13.99],
      [{ value: 'Buckethead', metadata: { style: artistNameFormat.id } }, 'Colma', 11.34],
      [{ value: 'Crystal Method', metadata: { style: artistNameFormat.id } }, 'Vegas', 10.54],
      [{ value: 'Crystal Method', metadata: { style: artistNameFormat.id } }, 'Tweekend', 10.64],
      [{ value: 'Crystal Method', metadata: { style: artistNameFormat.id } }, 'Divided By Night', 8.99],
    ];

    albumList.setData(originalData);
    albumList.setColumns([{ width: 30 }, { width: 20 }, { width: 10 }]);
    artistWorkbook.addWorksheet(albumList);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: expect.stringContaining('StyleSheet'),
      borders: [{ bottom: {}, diagonal: {}, left: {}, right: {}, top: {} }],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}],
      fills: [
        {},
        { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' },
        { fgColor: 'FF00FF00', id: 2, patternType: 'solid', type: 'pattern' },
        { degree: 180, end: { color: 'FF0070C0', pureAt: 0.8 }, id: 3, start: 'FF92D050', type: 'gradient' },
      ],
      fonts: [{}, { bold: true, color: 'FF0000FF', id: 1 }, { color: 'FFFFFFFF', id: 2 }],
      masterCellFormats: [
        { borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 },
        { id: 1, fillId: 2, fontId: 1 },
        { id: 2, fillId: 3, fontId: 2 },
      ],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [],
      tableStyles: [],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _footers: [],
      _freezePane: {},
      _headers: [],
      _rowInstructions: {},
      _tables: [],
      id: expect.stringContaining('Worksheet'),
      name: 'Album List',
      columnFormats: [],
      columns: [{ width: 30 }, { width: 20 }, { width: 10 }],
      data: [
        [
          { metadata: { style: 1 }, value: 'Artist' },
          { metadata: { style: 1 }, value: 'Album' },
          { metadata: { style: 1 }, value: 'Price' },
        ],
        [{ metadata: { style: 2 }, value: 'Buckethead' }, 'Albino Slug', 8.99],
        [{ metadata: { style: 2 }, value: 'Buckethead' }, 'Electric Tears', 13.99],
        [{ metadata: { style: 2 }, value: 'Buckethead' }, 'Colma', 11.34],
        [{ metadata: { style: 2 }, value: 'Crystal Method' }, 'Vegas', 10.54],
        [{ metadata: { style: 2 }, value: 'Crystal Method' }, 'Tweekend', 10.64],
        [{ metadata: { style: 2 }, value: 'Crystal Method' }, 'Divided By Night', 8.99],
      ],
      mergedCells: [],
      relations: { lastId: 1, relations: {} },
    });
  });

  test('Formulas', () => {
    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

    const originalData = [
      [{ value: 'Artist' }, { value: 'Album' }, { value: 'Price' }, { value: 'Quantity' }, { value: 'Total' }],
      ['Buckethead', 'Albino Slug', 8.99, 5, { value: 'C2+D2', metadata: { type: 'formula' } }],
      ['Buckethead', 'Electric Tears', 13.99, 7, { value: 'C3+D3', metadata: { type: 'formula' } }],
      ['Buckethead', 'Colma', 11.34, 9, { value: 'C4+D4', metadata: { type: 'formula' } }],
      ['Crystal Method', 'Vegas', 10.54, 3, { value: 'C5+D5', metadata: { type: 'formula' } }],
      ['Crystal Method', 'Tweekend', 10.64, 1, { value: 'C6+D6', metadata: { type: 'formula' } }],
      ['Crystal Method', 'Divided By Night', 8.99, 56, { value: 'C7+D7', metadata: { type: 'formula' } }],
    ];

    albumList.setData(originalData);
    albumList.setColumns([{ width: 30 }, { width: 20 }, { width: 10 }]);
    artistWorkbook.addWorksheet(albumList);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: expect.stringContaining('StyleSheet'),
      borders: [{ bottom: {}, diagonal: {}, left: {}, right: {}, top: {} }],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}],
      fills: [{}, { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' }],
      fonts: [{}],
      masterCellFormats: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 }],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [],
      tableStyles: [],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _footers: [],
      _freezePane: {},
      _headers: [],
      _rowInstructions: {},
      _tables: [],
      id: expect.stringContaining('Worksheet'),
      name: 'Album List',
      columnFormats: [],
      columns: [{ width: 30 }, { width: 20 }, { width: 10 }],
      data: [
        [{ value: 'Artist' }, { value: 'Album' }, { value: 'Price' }, { value: 'Quantity' }, { value: 'Total' }],
        ['Buckethead', 'Albino Slug', 8.99, 5, { metadata: { type: 'formula' }, value: 'C2+D2' }],
        ['Buckethead', 'Electric Tears', 13.99, 7, { metadata: { type: 'formula' }, value: 'C3+D3' }],
        ['Buckethead', 'Colma', 11.34, 9, { metadata: { type: 'formula' }, value: 'C4+D4' }],
        ['Crystal Method', 'Vegas', 10.54, 3, { metadata: { type: 'formula' }, value: 'C5+D5' }],
        ['Crystal Method', 'Tweekend', 10.64, 1, { metadata: { type: 'formula' }, value: 'C6+D6' }],
        ['Crystal Method', 'Divided By Night', 8.99, 56, { metadata: { type: 'formula' }, value: 'C7+D7' }],
      ],
      mergedCells: [],
      relations: { lastId: 1, relations: {} },
    });

    const wbXML = artistWorkbook.toXML();
    const wsXML = artistWorkbook.worksheets[0].toXML();

    expect(wbXML.documentElement.children.length).toBe(2);
    expect(wbXML.documentElement.attributes).toEqual({
      xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    });
    expect(wsXML.documentElement.children.length).toBe(4);
    expect(wsXML.documentElement.attributes).toEqual({
      xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'xmlns:mc': 'http://schemas.openxmlformats.org/markup-compatibility/2006',
    });
  });

  test('Tables Themes', () => {
    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });
    const stylesheet = artistWorkbook.getStyleSheet();
    const boldDXF = stylesheet.createDifferentialStyle({ font: { italic: true } });

    stylesheet.createTableStyle({
      name: 'SlightlyOffColorBlue',
      wholeTable: boldDXF.id,
      headerRow: stylesheet.createDifferentialStyle({ alignment: { horizontal: 'center' } }).id,
    });

    const albumTable = new Table();
    albumTable.styleInfo.themeStyle = 'SlightlyOffColorBlue';
    albumTable.setReferenceRange([1, 1], [3, originalData.length]); //X/Y position where the table starts and stops.
    albumTable.setTableColumns(['Artist', 'Album', 'Price']);
    albumList.setData(originalData);
    artistWorkbook.addWorksheet(albumList);
    albumList.addTable(albumTable);
    artistWorkbook.addTable(albumTable);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: expect.stringContaining('StyleSheet'),
      borders: [{ bottom: {}, diagonal: {}, left: {}, right: {}, top: {} }],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}, { font: { italic: true }, id: 1 }, { alignment: { horizontal: 'center' }, id: 2 }],
      fills: [{}, { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' }],
      fonts: [{}],
      masterCellFormats: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 }],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [],
      tableStyles: [{ headerRow: 2, name: 'SlightlyOffColorBlue', wholeTable: 1 }],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _footers: [],
      _freezePane: {},
      _headers: [],
      _rowInstructions: {},
      id: 'Worksheet20',
      name: 'Album List',
      _tables: [
        {
          autoFilter: null,
          dataCellStyle: null,
          dataDfxId: null,
          displayName: 'Table1',
          headerRowBorderDxfId: null,
          headerRowCellStyle: null,
          headerRowCount: 1,
          headerRowDxfId: null,
          id: 'Table1',
          insertRow: false,
          insertRowShift: false,
          name: 'Table1',
          ref: [
            [1, 1],
            [3, 7],
          ],
          sortState: null,
          styleInfo: {
            themeStyle: 'SlightlyOffColorBlue',
          },
          tableBorderDxfId: null,
          tableColumns: [
            {
              name: 'Artist',
            },
            {
              name: 'Album',
            },
            {
              name: 'Price',
            },
          ],
          tableId: '1',
          totalsRowBorderDxfId: null,
          totalsRowCellStyle: null,
          totalsRowCount: 0,
          totalsRowDxfId: null,
        },
      ],
      columnFormats: [],
      columns: [],
      data: [
        ['Artist', 'Album', 'Price'],
        ['Buckethead', 'Albino Slug', 8.99],
        ['Buckethead', 'Electric Tears', 13.99],
        ['Buckethead', 'Colma', 11.34],
        ['Crystal Method', 'Vegas', 10.54],
        ['Crystal Method', 'Tweekend', 10.64],
        ['Crystal Method', 'Divided By Night', 8.99],
      ],
      mergedCells: [],
      relations: {
        lastId: 1,
        relations: {
          Table1: {
            id: expect.stringContaining('rId'),
            object: {
              autoFilter: null,
              dataCellStyle: null,
              dataDfxId: null,
              displayName: 'Table1',
              headerRowBorderDxfId: null,
              headerRowCellStyle: null,
              headerRowCount: 1,
              headerRowDxfId: null,
              id: 'Table1',
              insertRow: false,
              insertRowShift: false,
              name: 'Table1',
              ref: [
                [1, 1],
                [3, 7],
              ],
              sortState: null,
              styleInfo: { themeStyle: 'SlightlyOffColorBlue' },
              tableBorderDxfId: null,
              tableColumns: [{ name: 'Artist' }, { name: 'Album' }, { name: 'Price' }],
              tableId: '1',
              totalsRowBorderDxfId: null,
              totalsRowCellStyle: null,
              totalsRowCount: 0,
              totalsRowDxfId: null,
            },
            schema: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/table',
          },
        },
      },
    });
  });

  test('Tables Summaries', () => {
    const albumTable = new Table();
    const originalData = [
      ['Artist', 'Album', 'Price'],
      ['Buckethead', 'Albino Slug', 8.99],
      ['Buckethead', 'Electric Tears', 13.99],
      ['Buckethead', 'Colma', 11.34],
      ['Crystal Method', 'Vegas', 10.54],
      ['Crystal Method', 'Tweekend', 10.64],
      ['Crystal Method', 'Divided By Night', 8.99],
      ['Highest Price', 'test', { value: `SUBTOTAL(104,${albumTable.name}[Price])`, metadata: { type: 'formula' } }],
    ];
    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

    albumTable.styleInfo.themeStyle = 'TableStyleDark2'; //This is a predefined table style
    albumTable.setReferenceRange([1, 1], [3, originalData.length]);
    albumTable.totalsRowCount = 1;
    albumTable.setTableColumns([
      { name: 'Artist', totalsRowLabel: 'Highest Price' },
      { name: 'Album', totalsRowLabel: 'test' },
      { name: 'Price', totalsRowFunction: 'max' },
    ]);

    albumList.setData(originalData);
    artistWorkbook.addWorksheet(albumList);
    albumList.addTable(albumTable);
    artistWorkbook.addTable(albumTable);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: expect.stringContaining('StyleSheet'),
      borders: [{ bottom: {}, diagonal: {}, left: {}, right: {}, top: {} }],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}],
      fills: [{}, { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' }],
      fonts: [{}],
      masterCellFormats: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 }],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [],
      tableStyles: [],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _footers: [],
      _freezePane: {},
      _headers: [],
      _rowInstructions: {},
      _tables: [
        {
          autoFilter: null,
          dataCellStyle: null,
          dataDfxId: null,
          displayName: 'Table2',
          headerRowBorderDxfId: null,
          headerRowCellStyle: null,
          headerRowCount: 1,
          headerRowDxfId: null,
          id: 'Table2',
          insertRow: false,
          insertRowShift: false,
          name: 'Table2',
          ref: [
            [1, 1],
            [3, 8],
          ],
          sortState: null,
          styleInfo: {
            themeStyle: 'TableStyleDark2',
          },
          tableBorderDxfId: null,
          tableColumns: [
            { name: 'Artist', totalsRowLabel: 'Highest Price' },
            { name: 'Album', totalsRowLabel: 'test' },
            { name: 'Price', totalsRowFunction: 'max' },
          ],
          tableId: '2',
          totalsRowBorderDxfId: null,
          totalsRowCellStyle: null,
          totalsRowCount: 1,
          totalsRowDxfId: null,
        },
      ],
      id: 'Worksheet22',
      name: 'Album List',
      columnFormats: [],
      columns: [],
      data: [
        ['Artist', 'Album', 'Price'],
        ['Buckethead', 'Albino Slug', 8.99],
        ['Buckethead', 'Electric Tears', 13.99],
        ['Buckethead', 'Colma', 11.34],
        ['Crystal Method', 'Vegas', 10.54],
        ['Crystal Method', 'Tweekend', 10.64],
        ['Crystal Method', 'Divided By Night', 8.99],
        ['Highest Price', 'test', { metadata: { type: 'formula' }, value: 'SUBTOTAL(104,Table2[Price])' }],
      ],
      mergedCells: [],
      relations: {
        lastId: 1,
        relations: {
          Table2: {
            id: expect.stringContaining('rId'),
            object: {
              autoFilter: null,
              dataCellStyle: null,
              dataDfxId: null,
              displayName: 'Table2',
              headerRowBorderDxfId: null,
              headerRowCellStyle: null,
              headerRowCount: 1,
              headerRowDxfId: null,
              id: 'Table2',
              insertRow: false,
              insertRowShift: false,
              name: 'Table2',
              ref: [
                [1, 1],
                [3, 8],
              ],
              sortState: null,
              styleInfo: {
                themeStyle: 'TableStyleDark2',
              },
              tableBorderDxfId: null,
              tableColumns: [
                { name: 'Artist', totalsRowLabel: 'Highest Price' },
                { name: 'Album', totalsRowLabel: 'test' },
                { name: 'Price', totalsRowFunction: 'max' },
              ],
              tableId: '2',
              totalsRowBorderDxfId: null,
              totalsRowCellStyle: null,
              totalsRowCount: 1,
              totalsRowDxfId: null,
            },
            schema: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/table',
          },
        },
      },
    });
  });

  test('Headers / Footers', () => {
    const originalData = [
      ['Artist', 'Album', 'Price'],
      ['Buckethead', 'Albino Slug', 8.99],
      ['Buckethead', 'Electric Tears', 13.99],
      ['Buckethead', 'Colma', 11.34],
      ['Crystal Method', 'Vegas', 10.54],
      ['Crystal Method', 'Tweekend', 10.64],
      ['Crystal Method', 'Divided By Night', 8.99],
    ];

    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

    albumList.setData(originalData);

    albumList.setHeader([
      'This will be on the left',
      ['In the middle ', { text: 'I shall be', bold: true }],
      { text: 'Right, underlined and size of 16', font: 16, underline: true },
    ]);

    albumList.setFooter(['Date of print: &D &T', '&A', 'Page &P of &N']);
    artistWorkbook.addWorksheet(albumList);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: expect.stringContaining('StyleSheet'),
      borders: [{ bottom: {}, diagonal: {}, left: {}, right: {}, top: {} }],
      cellStyles: [{ builtinId: '0', name: 'Normal', xfId: '0' }],
      defaultTableStyle: false,
      differentialStyles: [{}],
      fills: [{}, { bgColor: 'FF333333', fgColor: 'FF333333', patternType: 'gray125', type: 'pattern' }],
      fonts: [{}],
      masterCellFormats: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0, xfid: 0 }],
      masterCellStyles: [{ borderId: 0, fillId: 0, fontId: 0, numFmtId: 0 }],
      numberFormatters: [],
      tableStyles: [],
    });
    expect(artistWorkbook.worksheets.length).toBe(1);
    expect(artistWorkbook.worksheets[0].exportData()).toEqual({
      _freezePane: {},
      _headers: [
        'This will be on the left',
        ['In the middle ', { bold: true, text: 'I shall be' }],
        { font: 16, text: 'Right, underlined and size of 16', underline: true },
      ],
      _footers: ['Date of print: &D &T', '&A', 'Page &P of &N'],
      _rowInstructions: {},
      _tables: [],
      id: expect.stringContaining('Worksheet'),
      name: 'Album List',
      columnFormats: [],
      columns: [],
      data: [
        ['Artist', 'Album', 'Price'],
        ['Buckethead', 'Albino Slug', 8.99],
        ['Buckethead', 'Electric Tears', 13.99],
        ['Buckethead', 'Colma', 11.34],
        ['Crystal Method', 'Vegas', 10.54],
        ['Crystal Method', 'Tweekend', 10.64],
        ['Crystal Method', 'Divided By Night', 8.99],
      ],
      mergedCells: [],
      relations: { lastId: 1, relations: {} },
    });

    const wbXML = artistWorkbook.toXML();
    const wsXML = artistWorkbook.worksheets[0].toXML();

    expect(wbXML.documentElement.children.length).toBe(2);
    expect(wbXML.documentElement.attributes).toEqual({
      xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    });
    expect(wsXML.documentElement.children.length).toBe(5);
    expect(wsXML.documentElement.attributes).toEqual({
      xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'xmlns:mc': 'http://schemas.openxmlformats.org/markup-compatibility/2006',
    });
  });

  test('Drawings', async () => {
    const fruitWorkbook = createWorkbook();
    const berryList = fruitWorkbook.createWorksheet({ name: 'Berry List' });
    const picRef1 = fruitWorkbook.addMedia('image', 'file1.jpeg', new Blob());
    const picRef2 = fruitWorkbook.addMedia('image', 'file2.gif', new Blob());
    const picRef3 = fruitWorkbook.addMedia('image', 'file3.png', new Blob());
    const picRef4 = fruitWorkbook.addMedia('image', 'file4.txt', new Blob());

    expect(picRef1.contentType).toBe('image/jpeg');
    expect(picRef2.contentType).toBe('image/gif');
    expect(picRef3.contentType).toBe('image/png');
    expect(picRef4.contentType).toBe(null);

    const drawings = new Drawings();
    const strawberryPicture1 = new Picture();
    strawberryPicture1.createAnchor('twoCellAnchor', {
      from: {
        x: 0,
        y: 0,
      },
      to: {
        x: 3,
        y: 3,
      },
    });

    strawberryPicture1.setMedia(picRef1);
    drawings.addDrawing(strawberryPicture1);

    const strawberryPicture2 = new Picture();
    strawberryPicture2.createAnchor('absoluteAnchor', {
      x: Positioning.pixelsToEMUs(300),
      y: Positioning.pixelsToEMUs(300),
      width: Positioning.pixelsToEMUs(300),
      height: Positioning.pixelsToEMUs(300),
    });

    strawberryPicture2.setMedia(picRef1);
    drawings.addDrawing(strawberryPicture2);

    const strawberryPicture3 = new Picture();
    strawberryPicture3.createAnchor('oneCellAnchor', {
      x: 1,
      y: 4,
      width: Positioning.pixelsToEMUs(300),
      height: Positioning.pixelsToEMUs(300),
    });

    strawberryPicture3.setMedia(picRef1);
    drawings.addDrawing(strawberryPicture3);

    berryList.addDrawings(drawings);
    fruitWorkbook.addDrawings(drawings);
    fruitWorkbook.addWorksheet(berryList);

    const file = await fruitWorkbook.generateFiles();
    const dwgs = fruitWorkbook.drawings;

    expect(file).toBeTruthy();
    expect(dwgs[0].drawings.length).toBe(3);

    // print titles offset of 2 => left B and top 2
    fruitWorkbook.setPrintTitleLeft('sheet1', 2);
    fruitWorkbook.setPrintTitleTop('sheet1', 2);

    const titles = fruitWorkbook.printTitles;
    expect(titles).toEqual({ sheet1: { left: 'B', top: 2 } });

    const wsXML = fruitWorkbook.toXML();
    expect(wsXML.documentElement.children.length).toBe(2);
  });

  describe('Table edge cases', () => {
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
  });

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
          createElement: (name: string) => font,
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
          createElement: (name: string) => fill,
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
        ss.exportTableStyles = doc => {
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
});

describe('Pane edge cases', () => {
  test('Pane with invalid state', () => {
    const pane = new Pane();
    // @ts-expect-error
    pane.state = 'invalid';
    expect(pane.state).toBe('invalid');
  });
});

describe('Worksheet edge cases', () => {
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

describe('Table', () => {
  test('exportTableStyleInfo with missing styleInfo', () => {
    const table = new Table();
    table.styleInfo = {};
    const doc = { createElement: () => ({ setAttribute: () => {} }) };
    expect(() => table.exportTableStyleInfo(doc as any)).not.toThrow();
  });
});

describe('Pane', () => {
  test('exportXML with null _freezePane', () => {
    const pane = new Pane();
    pane.state = 'frozen';
    pane._freezePane = { xSplit: 1, ySplit: 1, cell: 'A1' };
    const doc = { createElement: () => ({ setAttribute: () => {} }) };
    expect(() => pane.exportXML(doc as any)).not.toThrow();
  });
});

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
});

describe('Drawings', () => {
  test('toXML with missing relationship', () => {
    const d = new Drawings();
    d.drawings.push({
      getMediaData: () => ({ id: 'media1' }),
      getMediaType: () => 'image',
      setRelationshipId: () => {},
      toXML: () => ({}),
    } as any);
    d.relations = { getRelationshipId: () => null, addRelation: () => 'rId1' } as any;
    expect(() => d.toXML()).not.toThrow();
  });
});

describe('RelationshipManager', () => {
  test('toXML with targetMode', () => {
    const rm = new RelationshipManager();
    rm.relations = { id1: { id: 'rId1', schema: 'schema', object: { target: 'target', targetMode: 'External' } } } as any;
    expect(() => rm.toXML()).not.toThrow();
  });
});

describe('SharedStrings', () => {
  test('toXML with whitespace string', () => {
    const ss = new SharedStrings();
    ss.stringArray = ['with space'];
    expect(() => ss.toXML()).not.toThrow();
  });
});

describe('SheetView', () => {
  test('exportXML with all options', () => {
    const sv = new (SheetView as any)();
    sv.pane = { exportXML: () => ({}) };
    sv.showZeros = true;
    sv.defaultGridColor = true;
    sv.colorId = 1;
    sv.rightToLeft = true;
    sv.showFormulas = true;
    sv.showGridLines = true;
    sv.showOutlineSymbols = true;
    sv.showRowColHeaders = true;
    sv.showRuler = true;
    sv.showWhiteSpace = true;
    sv.tabSelected = true;
    sv.viewType = 'normal';
    sv.windowProtection = true;
    sv.zoomScale = true;
    sv.zoomScaleNormal = 100;
    sv.zoomScalePageLayoutView = 100;
    sv.zoomScaleSheetLayoutView = 100;
    const doc = { createElement: () => ({ appendChild: () => {}, setAttribute: () => {} }) };
    expect(() => sv.exportXML(doc)).not.toThrow();
  });
});

describe('Util', () => {
  test('positionToLetterRef with x > 26', () => {
    expect(Util.positionToLetterRef(27, 1)).toBe('AA1');
  });
});
