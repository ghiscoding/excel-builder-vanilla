import { describe, expect, test } from 'vitest';

import { Table, Workbook } from '../Excel';
import { ExcelBuilder } from '../excel-builder';

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
    // const artistWorkbook = new Workbook();
    const artistWorkbook = new ExcelBuilder().createWorkbook();
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
    albumList.setData(originalData);
    albumList.setColumns([{ width: 30 }, { width: 20, hidden: true }, { width: 10 }]);
    artistWorkbook.addWorksheet(albumList);

    expect(artistWorkbook.getStyleSheet()).toEqual({
      id: 'StyleSheet4',
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
      id: 'Worksheet4',
      name: 'Artists',
      columnFormats: [],
      columns: [{ width: 30 }, { hidden: true, width: 20 }, { width: 10 }],
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
      id: 'StyleSheet6',
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
      id: 'Worksheet6',
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
      id: 'StyleSheet8',
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
      id: 'Worksheet8',
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
    // const artistWorkbook = new Workbook();
    const artistWorkbook = new ExcelBuilder().createWorkbook();
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
      id: 'StyleSheet10',
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
      id: 'Worksheet10',
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

  test('Alignment via createFormat()', () => {
    // const artistWorkbook = new Workbook();
    const artistWorkbook = new ExcelBuilder().createWorkbook();
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
      id: 'StyleSheet12',
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
      id: 'Worksheet12',
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
    // const artistWorkbook = new Workbook();
    const artistWorkbook = new ExcelBuilder().createWorkbook();
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
      id: 'StyleSheet14',
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
      id: 'Worksheet14',
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
    // const artistWorkbook = new Workbook();
    const artistWorkbook = new ExcelBuilder().createWorkbook();
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
      id: 'StyleSheet16',
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
      id: 'Worksheet16',
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
  });

  test('Tables Themes', () => {
    const artistWorkbook = new ExcelBuilder().createWorkbook();
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
      id: 'StyleSheet18',
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
      id: 'Worksheet18',
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
            id: 'rId55',
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
    const artistWorkbook = new ExcelBuilder().createWorkbook();
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
      id: 'StyleSheet20',
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
      id: 'Worksheet20',
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
            id: 'rId62',
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

    const artistWorkbook = new ExcelBuilder().createWorkbook();
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
      id: 'StyleSheet22',
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
      ],
      mergedCells: [],
      relations: { lastId: 1, relations: {} },
    });
  });
});
