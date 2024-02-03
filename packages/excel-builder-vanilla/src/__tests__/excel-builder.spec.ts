import { describe, expect, test } from 'vitest';

import { Workbook } from '../Excel';
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
});
