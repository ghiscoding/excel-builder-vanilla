import type { ExcelColumn, ExcelColumnFormat, ExcelColumnMetadata, ExcelMargin, ExcelStyleInstruction } from '../interfaces';
import { isObject, isString, uniqueId } from '../utilities';
import type { Drawings } from './Drawings';
import { RelationshipManager } from './RelationshipManager';
import type { SharedStrings } from './SharedStrings';
import { SheetView } from './SheetView';
import type { Table } from './Table';
import { Util } from './Util';
import type { XMLDOM, XMLNode } from './XMLDOM';

interface CharType {
  font?: string;
  bold?: boolean;
  fontSize?: number;
  text?: string;
  underline?: boolean;
}

/**
 * This module represents an excel worksheet in its basic form - no tables, charts, etc. Its purpose is
 * to hold data, the data's link to how it should be styled, and any links to other outside resources.
 *
 * @module Excel/Worksheet
 */
export class Worksheet {
  name = '';
  id = uniqueId('Worksheet');
  _timezoneOffset: number;
  relations: any = null;
  columnFormats: ExcelColumnFormat[] = [];
  data: (number | string | boolean | Date | null | ExcelColumnMetadata)[][] = [];
  mergedCells: string[][] = [];
  columns: ExcelColumn[] = [];
  sheetProtection: any = false;
  _headers: [left?: any, center?: any, right?: any] = [];
  _footers: [left?: any, center?: any, right?: any] = [];
  _tables: Table[] = [];
  _drawings: Array<Table | Drawings> = [];
  _orientation?: string;
  _margin?: ExcelMargin;
  _rowInstructions: any = {};
  _freezePane: { xSplit?: number; ySplit?: number; cell?: number } = {};
  sharedStrings: SharedStrings | null = null;

  hyperlinks = [];
  sheetView: SheetView;

  showZeros: any = null;

  constructor(config: any) {
    this._timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    this.sheetView = config.sheetView || new SheetView();

    this.initialize(config);
  }

  initialize(config: any) {
    config = config || {};
    this.name = config.name;
    this.id = uniqueId('Worksheet');
    this._timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    if (config.columns) {
      this.setColumns(config.columns);
    }

    this.relations = new RelationshipManager();
  }

  /**
   * Returns an object that can be consumed by a Worksheet/Export/Worker
   * @returns {Object}
   */
  exportData() {
    return {
      relations: this.relations.exportData(),
      columnFormats: this.columnFormats,
      data: this.data,
      columns: this.columns,
      mergedCells: this.mergedCells,
      _headers: this._headers,
      _footers: this._footers,
      _tables: this._tables,
      _rowInstructions: this._rowInstructions,
      _freezePane: this._freezePane,
      name: this.name,
      id: this.id,
    };
  }

  /**
   * Imports data - to be used while inside of a WorksheetExportWorker.
   * @param {Object} data
   */
  importData(data: any) {
    this.relations.importData(data.relations);
    delete data.relations;
    Object.assign(this, data);
  }

  setSharedStringCollection(stringCollection: SharedStrings) {
    this.sharedStrings = stringCollection;
  }

  addTable(table: Table) {
    this._tables.push(table);
    this.relations.addRelation(table, 'table');
  }

  addDrawings(table: Table) {
    this._drawings.push(table);
    this.relations.addRelation(table, 'drawingRelationship');
  }

  setRowInstructions(rowIndex: number, instructions: ExcelStyleInstruction) {
    this._rowInstructions[rowIndex] = instructions;
  }

  /**
   * Expects an array length of three.
   *
   * @see Excel/Worksheet compilePageDetailPiece
   * @see <a href='/cookbook/addingHeadersAndFooters.html'>Adding headers and footers to a worksheet</a>
   *
   * @param {Array} headers [left, center, right]
   */
  setHeader(headers: [left: any, center: any, right: any]) {
    if (!Array.isArray(headers)) {
      throw 'Invalid argument type - setHeader expects an array of three instructions';
    }
    this._headers = headers;
  }

  /**
   * Expects an array length of three.
   *
   * @see Excel/Worksheet compilePageDetailPiece
   * @see <a href='/cookbook/addingHeadersAndFooters.html'>Adding headers and footers to a worksheet</a>
   *
   * @param {Array} footers [left, center, right]
   */
  setFooter(footers: [left: any, center: any, right: any]) {
    if (!Array.isArray(footers)) {
      throw 'Invalid argument type - setFooter expects an array of three instructions';
    }
    this._footers = footers;
  }

  /**
   * Turns page header/footer details into the proper format for Excel.
   * @param {type} data
   * @returns {String}
   */
  compilePageDetailPackage(data: any) {
    data = data || '';
    return [
      '&L',
      this.compilePageDetailPiece(data[0] || ''),
      '&C',
      this.compilePageDetailPiece(data[1] || ''),
      '&R',
      this.compilePageDetailPiece(data[2] || ''),
    ].join('');
  }

  /**
   * Turns instructions on page header/footer details into something
   * usable by Excel.
   *
   * @param {type} data
   * @returns {String|@exp;_@call;reduce}
   */
  compilePageDetailPiece(data: string | CharType | any[]): any {
    if (isString(data)) {
      return '&"-,Regular"'.concat(data);
    }
    if (isObject(data) && !Array.isArray(data)) {
      let string = '';
      if ((data as CharType).font || (data as CharType).bold) {
        const weighting = (data as CharType).bold ? 'Bold' : 'Regular';
        string += `&"${(data as CharType).font || '-'}`;
        string += `,${weighting}"`;
      } else {
        string += '&"-,Regular"';
      }
      if ((data as CharType).underline) {
        string += '&U';
      }
      if ((data as CharType).fontSize) {
        string += `&${(data as CharType).fontSize}`;
      }
      string += (data as CharType).text;

      return string;
    }

    if (Array.isArray(data)) {
      return data.reduce((m, v) => m.concat(this.compilePageDetailPiece(v)), '');
    }
  }

  /**
   * Creates the header node.
   *
   * @todo implement the ability to do even/odd headers
   * @param {XML Doc} doc
   * @returns {XML Node}
   */
  exportHeader(doc: XMLDOM) {
    const oddHeader = doc.createElement('oddHeader');
    oddHeader.appendChild(doc.createTextNode(this.compilePageDetailPackage(this._headers)));
    return oddHeader;
  }

  /**
   * Creates the footer node.
   *
   * @todo implement the ability to do even/odd footers
   * @param {XML Doc} doc
   * @returns {XML Node}
   */
  exportFooter(doc: XMLDOM) {
    const oddFooter = doc.createElement('oddFooter');
    oddFooter.appendChild(doc.createTextNode(this.compilePageDetailPackage(this._footers)));
    return oddFooter;
  }

  /**
   * This creates some nodes ahead of time, which cuts down on generation time due to
   * most cell definitions being essentially the same, but having multiple nodes that need
   * to be created. Cloning takes less time than creation.
   *
   * @private
   * @param {XML Doc} doc
   * @returns {_L8.Anonym$0._buildCache.Anonym$2}
   */
  _buildCache(doc: XMLDOM) {
    const numberNode = doc.createElement('c');
    const value = doc.createElement('v');
    value.appendChild(doc.createTextNode('--temp--'));
    numberNode.appendChild(value);

    const formulaNode = doc.createElement('c');
    const formulaValue = doc.createElement('f');
    formulaValue.appendChild(doc.createTextNode('--temp--'));
    formulaNode.appendChild(formulaValue);

    const stringNode = doc.createElement('c');
    stringNode.setAttribute('t', 's');
    const stringValue = doc.createElement('v');
    stringValue.appendChild(doc.createTextNode('--temp--'));
    stringNode.appendChild(stringValue);

    return {
      number: numberNode,
      date: numberNode,
      string: stringNode,
      formula: formulaNode,
    };
  }

  /**
   * Runs through the XML document and grabs all of the strings that will
   * be sent to the 'shared strings' document.
   *
   * @returns {Array}
   */
  collectSharedStrings() {
    const data = this.data;
    let maxX = 0;
    const strings: any = {};
    for (let row = 0, l = data.length; row < l; row++) {
      const dataRow = data[row];
      const cellCount = dataRow.length;
      maxX = cellCount > maxX ? cellCount : maxX;
      for (let c = 0; c < cellCount; c++) {
        let cellValue = dataRow[c];
        const metadata = (cellValue as ExcelColumnMetadata)?.metadata || {};
        if (cellValue && typeof cellValue === 'object') {
          cellValue = (cellValue as ExcelColumnMetadata).value;
        }

        if (!metadata.type) {
          if (typeof cellValue === 'number') {
            metadata.type = 'number';
          }
        }
        if (metadata.type === 'text' || !metadata.type) {
          if (typeof strings[cellValue as string] === 'undefined') {
            strings[cellValue as string] = true;
          }
        }
      }
    }
    return Object.keys(strings);
  }

  toXML() {
    const data = this.data;
    const columns = this.columns || [];
    const doc = Util.createXmlDoc(Util.schemas.spreadsheetml, 'worksheet');
    const worksheet = doc.documentElement;
    let i: number;
    let l: number;
    let row: number;
    worksheet.setAttribute('xmlns:r', Util.schemas.relationships);
    worksheet.setAttribute('xmlns:mc', Util.schemas.markupCompat);

    let maxX = 0;
    const sheetData = Util.createElement(doc, 'sheetData');

    const cellCache = this._buildCache(doc);

    for (row = 0, l = data.length; row < l; row++) {
      const dataRow = data[row];
      const cellCount = dataRow.length;
      maxX = cellCount > maxX ? cellCount : maxX;
      const rowNode = doc.createElement('row');

      for (let c = 0; c < cellCount; c++) {
        columns[c] = columns[c] || {};
        let cellValue = dataRow[c];
        let cell: any;
        const metadata = (cellValue as ExcelColumnMetadata)?.metadata || {};

        if (cellValue && typeof cellValue === 'object') {
          cellValue = (cellValue as ExcelColumnMetadata).value;
        }

        if (!metadata.type) {
          if (typeof cellValue === 'number') {
            metadata.type = 'number';
          }
        }

        switch (metadata.type) {
          case 'number':
            cell = cellCache.number.cloneNode(true);
            cell.firstChild.firstChild.nodeValue = cellValue;
            break;
          case 'date':
            cell = cellCache.date.cloneNode(true);
            if (cellValue instanceof Date) {
              cellValue = cellValue.getTime();
            }
            cell.firstChild.firstChild.nodeValue = 25569.0 + ((cellValue as number) - this._timezoneOffset) / (60 * 60 * 24 * 1000);
            break;
          case 'formula':
            cell = cellCache.formula.cloneNode(true);
            cell.firstChild.firstChild.nodeValue = cellValue as string;
            break;
          // biome-ignore lint: original implementation
          case 'text':
          /*falls through*/
          default: {
            let id: number | undefined;
            if (typeof this.sharedStrings?.strings[cellValue as string] !== 'undefined') {
              id = this.sharedStrings.strings[cellValue as string];
            } else {
              id = this.sharedStrings?.addString(cellValue as string);
            }
            cell = cellCache.string.cloneNode(true);
            cell.firstChild.firstChild.nodeValue = id;
            break;
          }
        }
        if (metadata.style) {
          cell.setAttribute('s', metadata.style);
        } else if (this._rowInstructions[row]?.style !== undefined) {
          cell.setAttribute('s', this._rowInstructions[row].style);
        }
        cell.setAttribute('r', Util.positionToLetterRef(c + 1, String(row + 1)));
        rowNode.appendChild(cell);
      }
      rowNode.setAttribute('r', row + 1);

      if (this._rowInstructions[row]) {
        const rowInst = this._rowInstructions[row];

        if (rowInst.height !== undefined) {
          rowNode.setAttribute('customHeight', '1');
          rowNode.setAttribute('ht', rowInst.height);
        }

        if (rowInst.style !== undefined) {
          rowNode.setAttribute('customFormat', '1');
          rowNode.setAttribute('s', rowInst.style);
        }
      }

      sheetData.appendChild(rowNode);
    }

    if (maxX !== 0) {
      worksheet.appendChild(
        Util.createElement(doc, 'dimension', [
          ['ref', `${Util.positionToLetterRef(1, 1)}:${Util.positionToLetterRef(maxX, String(data.length))}`],
        ]),
      );
    } else {
      worksheet.appendChild(Util.createElement(doc, 'dimension', [['ref', Util.positionToLetterRef(1, 1)]]));
    }

    worksheet.appendChild(this.sheetView.exportXML(doc));

    if (this.columns.length) {
      worksheet.appendChild(this.exportColumns(doc));
    }
    worksheet.appendChild(sheetData);

    // The spec doesn't say anything about this, but Excel 2013 requires sheetProtection immediately after sheetData
    if (this.sheetProtection) {
      worksheet.appendChild(this.sheetProtection.exportXML(doc));
    }

    /**
     * Doing this a bit differently, as hyperlinks could be as populous as rows. Looping twice would be bad.
     */
    if (this.hyperlinks.length > 0) {
      const hyperlinksEl = doc.createElement('hyperlinks');
      const hyperlinks = this.hyperlinks;
      for (i = 0, l = hyperlinks.length; i < l; i++) {
        const hyperlinkEl = doc.createElement('hyperlink');
        const hyperlink: any = hyperlinks[i];
        hyperlinkEl.setAttribute('ref', String(hyperlink.cell));
        hyperlink.id = Util.uniqueId('hyperlink');
        this.relations.addRelation(
          {
            id: hyperlink.id,
            target: hyperlink.location,
            targetMode: hyperlink.targetMode || 'External',
          },
          'hyperlink',
        );
        hyperlinkEl.setAttribute('r:id', this.relations.getRelationshipId(hyperlink));
        hyperlinksEl.appendChild(hyperlinkEl);
      }
      worksheet.appendChild(hyperlinksEl);
    }

    // 'mergeCells' should be written before 'headerFoot' and 'drawing' due to issue
    // with Microsoft Excel (2007, 2013)
    if (this.mergedCells.length > 0) {
      const mergeCells = doc.createElement('mergeCells');
      for (i = 0, l = this.mergedCells.length; i < l; i++) {
        const mergeCell = doc.createElement('mergeCell');
        mergeCell.setAttribute('ref', `${this.mergedCells[i][0]}:${this.mergedCells[i][1]}`);
        mergeCells.appendChild(mergeCell);
      }
      worksheet.appendChild(mergeCells);
    }

    this.exportPageSettings(doc, worksheet);

    if (this._headers.length > 0 || this._footers.length > 0) {
      const headerFooter = doc.createElement('headerFooter');
      if (this._headers.length > 0) {
        headerFooter.appendChild(this.exportHeader(doc));
      }
      if (this._footers.length > 0) {
        headerFooter.appendChild(this.exportFooter(doc));
      }
      worksheet.appendChild(headerFooter);
    }

    // the 'drawing' element should be written last, after 'headerFooter', 'mergeCells', etc. due
    // to issue with Microsoft Excel (2007, 2013)
    for (i = 0, l = this._drawings.length; i < l; i++) {
      const drawing = doc.createElement('drawing');
      drawing.setAttribute('r:id', this.relations.getRelationshipId(this._drawings[i]));
      worksheet.appendChild(drawing);
    }

    if (this._tables.length > 0) {
      const tables = doc.createElement('tableParts');
      tables.setAttribute('count', this._tables.length);
      for (i = 0, l = this._tables.length; i < l; i++) {
        const table = doc.createElement('tablePart');
        table.setAttribute('r:id', this.relations.getRelationshipId(this._tables[i]));
        tables.appendChild(table);
      }
      worksheet.appendChild(tables);
    }
    return doc;
  }

  /**
   *
   * @param {XML Doc} doc
   * @returns {XML Node}
   */
  exportColumns(doc: XMLDOM) {
    const cols = Util.createElement(doc, 'cols');
    for (let i = 0, l = this.columns.length; i < l; i++) {
      const cd = this.columns[i];
      const col = Util.createElement(doc, 'col', [
        ['min', cd.min || i + 1],
        ['max', cd.max || i + 1],
      ]);
      if (cd.hidden) {
        col.setAttribute('hidden', String(1));
      }
      if (cd.bestFit) {
        col.setAttribute('bestFit', String(1));
      }
      if (cd.customWidth || cd.width) {
        col.setAttribute('customWidth', String(1));
      }
      if (cd.width) {
        col.setAttribute('width', cd.width);
      } else {
        col.setAttribute('width', String(9.140625));
      }

      cols.appendChild(col);
    }
    return cols;
  }

  /**
   * Sets the page settings on a worksheet node.
   *
   * @param {XML Doc} doc
   * @param {XML Node} worksheet
   * @returns {undefined}
   */
  exportPageSettings(doc: XMLDOM, worksheet: XMLNode) {
    if (this._margin) {
      let defaultVal = 0.7;
      const left = this._margin.left ? this._margin.left : defaultVal;
      const right = this._margin.right ? this._margin.right : defaultVal;
      const top = this._margin.top ? this._margin.top : defaultVal;
      const bottom = this._margin.bottom ? this._margin.bottom : defaultVal;
      defaultVal = 0.3;
      const header = this._margin.header ? this._margin.header : defaultVal;
      const footer = this._margin.footer ? this._margin.footer : defaultVal;

      worksheet.appendChild(
        Util.createElement(doc, 'pageMargins', [
          ['top', top],
          ['bottom', bottom],
          ['left', left],
          ['right', right],
          ['header', header],
          ['footer', footer],
        ]),
      );
    }
    if (this._orientation) {
      worksheet.appendChild(Util.createElement(doc, 'pageSetup', [['orientation', this._orientation]]));
    }
  }

  /**
   * http://www.schemacentral.com/sc/ooxml/t-ssml_ST_Orientation.html
   *
   * Can be one of 'portrait' or 'landscape'.
   *
   * @param {String} orientation
   * @returns {undefined}
   */
  setPageOrientation(orientation: string) {
    this._orientation = orientation;
  }

  /**
   * Set page details in inches.
   * use this structure:
   * {
   *   top: 0.7
   *   , bottom: 0.7
   *   , left: 0.7
   *   , right: 0.7
   *   , header: 0.3
   *   , footer: 0.3
   * }
   *
   * @returns {undefined}
   */
  setPageMargin(input: ExcelMargin) {
    this._margin = input;
  }

  /**
   * Expects an array of column definitions. Each column definition needs to have a width assigned to it.
   *
   * @param {Array} columns
   */
  setColumns(columns: ExcelColumn[]) {
    this.columns = columns;
  }

  /**
   * Expects an array of data to be translated into cells.
   *
   * @param {Array} data Two dimensional array - [ [A1, A2], [B1, B2] ]
   * @see <a href='/cookbook/addingDataToAWorksheet.html'>Adding data to a worksheet</a>
   */
  setData(data: (number | string | boolean | Date | null | ExcelColumnMetadata)[][]) {
    this.data = data;
  }

  /**
   * Merge cells in given range
   *
   * @param cell1 - A1, A2...
   * @param cell2 - A2, A3...
   */
  mergeCells(cell1: string, cell2: string) {
    this.mergedCells.push([cell1, cell2]);
  }

  /**
   * Added froze pane
   * @param column - column number: 0, 1, 2 ...
   * @param row - row number: 0, 1, 2 ...
   * @param cell - 'A1'
   * @deprecated
   */
  freezePane(column: number, row: number, cell: number) {
    this.sheetView.freezePane(column, row, cell);
  }

  /**
   * Expects an array containing an object full of column format definitions.
   * http://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.column.aspx
   * bestFit
   * collapsed
   * customWidth
   * hidden
   * max
   * min
   * outlineLevel
   * phonetic
   * style
   * width
   * @param {Array} columnFormats
   */
  setColumnFormats(columnFormats: ExcelColumnFormat[]) {
    this.columnFormats = columnFormats;
  }
}
