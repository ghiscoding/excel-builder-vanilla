import type { ExcelColumn, ExcelColumnMetadata, ExcelMargin, ExcelStyleInstruction } from '../interfaces.js';
import { htmlEscape } from '../utilities/escape.js';
import { isObject, isString } from '../utilities/isTypeOf.js';
import { uniqueId } from '../utilities/uniqueId.js';
import type { Drawings } from './Drawings.js';
import { RelationshipManager } from './RelationshipManager.js';
import type { SharedStrings } from './SharedStrings.js';
import { SheetView } from './SheetView.js';
import type { Table } from './Table.js';
import { Util } from './Util.js';
import { XMLDOM, type XMLNode } from './XMLDOM.js';

type Cell = number | string | boolean | Date | null | ExcelColumnMetadata;

interface CharType {
  font?: string;
  bold?: boolean;
  fontSize?: number;
  text?: string;
  underline?: boolean;
}

interface WorksheetOption {
  name?: string;
  sheetView?: SheetView;
  columns?: ExcelColumn[];
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
  relations: RelationshipManager | null = null;
  columnFormats: ExcelColumn[] = [];
  data: (number | string | boolean | Date | null | ExcelColumnMetadata)[][] = [];
  mergedCells: string[][] = [];
  columns: ExcelColumn[] = [];
  sheetProtection: { exportXML: (doc: XMLDOM) => XMLNode } | false = false;
  _headers: [left?: string | CharType | any[], center?: string | CharType | any[], right?: string | CharType | any[]] = [];
  _footers: [left?: string | CharType | any[], center?: string | CharType | any[], right?: string | CharType | any[]] = [];
  _tables: Table[] = [];
  _drawings: Array<Table | Drawings> = [];
  _orientation?: string;
  _margin?: ExcelMargin;
  _rowInstructions: any = {};
  _freezePane: { xSplit?: number; ySplit?: number; cell?: string } = {};
  sharedStrings: SharedStrings | null = null;

  hyperlinks: Array<{ cell: string; id: string; location?: string; targetMode?: string }> = [];
  sheetView: SheetView;

  showZeros: any = null;

  /** Creates a worksheet from its name, columns, and view configuration. */
  constructor(config: WorksheetOption) {
    this._timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    this.sheetView = config.sheetView || new SheetView();

    this.initialize(config);
  }

  /** Initializes worksheet identity, columns, and relationship state. */
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
   * Exports worksheet state for transfer to another worksheet or worker.
   * Returns an object that can be consumed by a Worksheet/Export/Worker
   * @returns {Object}
   */
  exportData() {
    return {
      relations: this.relations?.exportData(),
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
   * Imports worksheet state, including its relationship data.
   * @param {Object} data
   */
  importData(data: any) {
    this.relations?.importData(data.relations);
    delete data.relations;
    Object.assign(this, data);
  }

  /** Sets the shared string table used when worksheet cells are serialized. */
  setSharedStringCollection(stringCollection: SharedStrings) {
    this.sharedStrings = stringCollection;
  }

  /** Adds a table to this worksheet and registers its relationship. */
  addTable(table: Table) {
    this._tables.push(table);
    this.relations?.addRelation(table, 'table');
  }

  /** Adds drawings to this worksheet and registers their relationship. */
  addDrawings(drawings: Drawings) {
    this._drawings.push(drawings);
    this.relations?.addRelation(drawings, 'drawingRelationship');
  }

  /** Sets style and layout instructions for a zero-based row index. */
  setRowInstructions(rowIndex: number, instructions: ExcelStyleInstruction) {
    this._rowInstructions[rowIndex] = instructions;
  }

  /**
   * Sets the left, center, and right print header instructions.
   * Expects an array length of three.
   * @see Excel/Worksheet compilePageDetailPiece
   * @see <a href='/cookbook/addingHeadersAndFooters.html'>Adding headers and footers to a worksheet</a>
   * @param {Array} headers [left, center, right]
   */
  setHeader(headers: [left: any, center: any, right: any]) {
    if (!Array.isArray(headers)) {
      throw new Error('Invalid argument type - setHeader expects an array of three instructions');
    }
    this._headers = headers;
  }

  /**
   * Sets the left, center, and right print footer instructions.
   * Expects an array length of three.
   * @see Excel/Worksheet compilePageDetailPiece
   * @see <a href='/cookbook/addingHeadersAndFooters.html'>Adding headers and footers to a worksheet</a>
   * @param {Array} footers [left, center, right]
   */
  setFooter(footers: [left: any, center: any, right: any]) {
    if (!Array.isArray(footers)) {
      throw new Error('Invalid argument type - setFooter expects an array of three instructions');
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
   * Turns instructions on page header/footer details into something usable by Excel.
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
   * @todo implement the ability to do even/odd footers
   * @param {XML Doc} doc
   * @returns {XML Node}
   */
  exportFooter(doc: XMLDOM) {
    const oddFooter = doc.createElement('oddFooter');
    oddFooter.appendChild(doc.createTextNode(this.compilePageDetailPackage(this._footers)));
    return oddFooter;
  }

  /** Legacy XML cell templates retained for callers of _buildCache(). */
  _buildCache(doc: XMLDOM) {
    const cache = {} as Record<'number' | 'formula' | 'string' | 'boolean', XMLNode>;
    for (const [type, tag, cellType] of [
      ['number', 'v', ''],
      ['formula', 'f', ''],
      ['string', 'v', 's'],
      ['boolean', 'v', 'b'],
    ] as const) {
      const cell = doc.createElement('c');
      if (cellType) {
        cell.setAttribute('t', cellType);
      }
      const value = doc.createElement(tag);
      value.appendChild(doc.createTextNode('--temp--'));
      cell.appendChild(value);
      cache[type] = cell;
    }
    return { ...cache, date: cache.number };
  }

  /**
   * Runs through the XML document and grabs all of the strings that will
   * be sent to the 'shared strings' document.
   * @returns {Array}
   */
  collectSharedStrings() {
    const strings = new Set<string>();
    for (const row of this.data) {
      this.forEachCell(row, -1, (value, type) => {
        if (type === 'text') {
          strings.add(String(value));
        }
      });
    }
    return [...strings];
  }

  /** Interpret cells once for both the DOM compatibility API and direct XML exports. */
  private forEachCell(
    row: Cell[],
    rowIndex: number,
    write: (value: string | number, type: string, style: number | undefined, column: number) => void,
  ) {
    for (let column = 0; column < row.length; column++) {
      const raw = row[column];
      const wrapped = raw !== null && typeof raw === 'object' && !(raw instanceof Date);
      const metadata = wrapped ? (raw as ExcelColumnMetadata).metadata : undefined;
      let value = wrapped ? (raw as ExcelColumnMetadata).value : raw;
      let type = metadata?.type || (value instanceof Date ? 'date' : typeof value);
      switch (type) {
        case 'date':
          value = 25569 + ((value instanceof Date ? value.getTime() : Number(value)) - this._timezoneOffset) / 86400000;
          break;
        case 'boolean':
          value = value ? '1' : '0';
          break;
        case 'number':
        case 'formula':
          break;
        default:
          type = 'text';
          value = String(value);
      }
      write(value as string | number, type, metadata?.style ?? this._rowInstructions[rowIndex]?.style, column);
    }
  }

  private serializeRow(row: Cell[], rowIndex: number): string;
  private serializeRow(row: Cell[], rowIndex: number, doc: XMLDOM): XMLNode;
  private serializeRow(row: Cell[], rowIndex: number, doc?: XMLDOM): string | XMLNode {
    const rowNode = doc?.createElement('row');
    let xml = '';
    this.forEachCell(row, rowIndex, (value, type, style, column) => {
      if (type === 'text') {
        const strings = this.sharedStrings?.strings;
        value =
          strings && Object.prototype.hasOwnProperty.call(strings, value)
            ? strings[value]
            : (this.sharedStrings?.addString(String(value)) as number);
      }
      const tag = type === 'formula' ? 'f' : 'v';
      const cellType = type === 'text' ? 's' : type === 'boolean' ? 'b' : undefined;
      const reference = Util.positionToLetterRef(column + 1, rowIndex + 1);
      if (doc && rowNode) {
        const cell = doc.createElement('c');
        if (cellType) {
          cell.setAttribute('t', cellType);
        }
        if (style !== undefined) {
          cell.setAttribute('s', style);
        }
        cell.setAttribute('r', reference);
        const content = doc.createElement(tag);
        content.appendChild(doc.createTextNode(String(value)));
        cell.appendChild(content);
        rowNode.appendChild(cell);
      } else {
        const typeAttr = cellType ? ` t="${cellType}"` : '';
        const styleAttr = style !== undefined ? ` s="${htmlEscape(String(style))}"` : '';
        const content = value === '' ? `<${tag}/>` : `<${tag}>${htmlEscape(String(value))}</${tag}>`;
        xml += `<c${typeAttr}${styleAttr} r="${reference}">${content}</c>`;
      }
    });
    const instructions = this._rowInstructions[rowIndex];
    const attributes: [string, string | number][] = [['r', rowIndex + 1]];
    if (instructions?.height !== undefined) {
      attributes.push(['customHeight', '1'], ['ht', instructions.height]);
    }
    if (instructions?.style !== undefined) {
      attributes.push(['customFormat', '1'], ['s', instructions.style]);
    }
    if (rowNode) {
      for (const [name, value] of attributes) {
        rowNode.setAttribute(name, value);
      }
      return rowNode;
    }
    const rowAttrs = attributes.map(([name, value]) => ` ${name}="${htmlEscape(String(value))}"`).join('');
    return xml ? `<row${rowAttrs}>${xml}</row>` : `<row${rowAttrs}/>`;
  }

  /** Serializes the worksheet and all of its rows as an OOXML document. */
  toXML() {
    return this.createWorksheetDocument(true);
  }

  private createWorksheetDocument(includeRows: boolean) {
    const doc = Util.createXmlDoc(Util.schemas.spreadsheetml, 'worksheet');
    const worksheet = doc.documentElement;
    let i: number;
    let l: number;
    worksheet.setAttribute('xmlns:r', Util.schemas.relationships);
    worksheet.setAttribute('xmlns:mc', Util.schemas.markupCompat);
    const sheetData = Util.createElement(doc, 'sheetData');
    let maxX = 0;
    for (let row = 0; row < this.data.length; row++) {
      maxX = Math.max(maxX, this.data[row].length);
      if (includeRows) {
        sheetData.appendChild(this.serializeRow(this.data[row], row, doc));
      }
    }
    for (let column = 0; column < maxX; column++) {
      this.columns[column] ||= {};
    }

    if (maxX !== 0) {
      worksheet.appendChild(
        Util.createElement(doc, 'dimension', [
          ['ref', `${Util.positionToLetterRef(1, 1)}:${Util.positionToLetterRef(maxX, String(this.data.length))}`],
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

    // Doing this a bit differently, as hyperlinks could be as populous as rows. Looping twice would be bad.
    if (this.relations) {
      const ids = new Set(this.hyperlinks.map(link => (link.id ||= uniqueId('hyperlink'))));
      for (const [id, relation] of Object.entries(this.relations.relations)) {
        if (relation.schema === Util.schemas.hyperlink && !ids.has(id)) {
          delete this.relations.relations[id];
        }
      }
    }
    if (this.hyperlinks.length > 0) {
      const hyperlinksEl = doc.createElement('hyperlinks');
      const hyperlinks = this.hyperlinks;
      for (i = 0, l = hyperlinks.length; i < l; i++) {
        const hyperlinkEl = doc.createElement('hyperlink');
        const hyperlink: any = hyperlinks[i];
        hyperlinkEl.setAttribute('ref', String(hyperlink.cell));
        hyperlink.id ||= uniqueId('hyperlink');
        if (this.relations) {
          this.relations.addRelation(
            {
              id: hyperlink.id,
              target: hyperlink.location,
              targetMode: hyperlink.targetMode || 'External',
            },
            'hyperlink',
          );
          hyperlinkEl.setAttribute('r:id', this.relations.getRelationshipId(hyperlink));
        }
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
      if (this.relations) {
        drawing.setAttribute('r:id', this.relations.getRelationshipId(this._drawings[i]));
      }
      worksheet.appendChild(drawing);
    }

    if (this._tables.length > 0) {
      const tables = doc.createElement('tableParts');
      tables.setAttribute('count', this._tables.length);
      for (i = 0, l = this._tables.length; i < l; i++) {
        const table = doc.createElement('tablePart');
        if (this.relations) {
          table.setAttribute('r:id', this.relations.getRelationshipId(this._tables[i]));
        }
        tables.appendChild(table);
      }
      worksheet.appendChild(tables);
    }
    return doc;
  }

  /**
   * Creates the OOXML column definitions from this worksheet's column settings.
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
   * Sets the worksheet's printed page orientation.
   * http://www.schemacentral.com/sc/ooxml/t-ssml_ST_Orientation.html
   * Can be one of 'portrait' or 'landscape'.
   * @param {'default' | 'portrait' | 'landscape'} orientation
   * @returns {undefined}
   */
  setPageOrientation(orientation: 'default' | 'portrait' | 'landscape') {
    this._orientation = orientation;
  }

  /**
   * Sets the worksheet's page margins for printing (in inches).
   * use this structure:
   * { top: 0.7, bottom: 0.7, left: 0.7, right: 0.7, header: 0.3, footer: 0.3 }
   * @returns {undefined}
   */
  setPageMargin(input: ExcelMargin) {
    this._margin = input;
  }

  /**
   * Expects an array of column definitions. Each column definition needs to have a width assigned to it.
   * @param {Array} columns
   */
  setColumns(columns: ExcelColumn[]) {
    this.columns = columns;
  }

  /**
   * Expects an array of data to be translated into cells.
   * @param {Array} data Two dimensional array - [ [A1, A2], [B1, B2] ]
   * @see <a href='/cookbook/addingDataToAWorksheet.html'>Adding data to a worksheet</a>
   */
  setData(data: (number | string | boolean | Date | null | ExcelColumnMetadata)[][]) {
    this.data = data;
  }

  /**
   * Merge cells in given range
   * @param cell1 - A1, A2...
   * @param cell2 - A2, A3...
   */
  mergeCells(cell1: string, cell2: string) {
    this.mergedCells.push([cell1, cell2]);
  }

  /**
   * Added frozen pane
   * @param column - column number: 0, 1, 2 ...
   * @param row - row number: 0, 1, 2 ...
   * @param cell - 'A1'
   * @deprecated
   */
  freezePane(column: number, row: number, cell: string) {
    this.sheetView.freezePane(column, row, cell);
  }

  /**
   * Expects an array containing an object full of column format definitions.
   * http://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.column.aspx
   * - bestFit
   * - collapsed
   * - customWidth
   * - hidden
   * - max
   * - min
   * - outlineLevel
   * - phonetic
   * - style
   * - width
   * @param {Array} columnFormats
   */
  setColumnFormats(columnFormats: ExcelColumn[]) {
    this.columnFormats = columnFormats;
  }

  /** Returns worksheet XML header (everything before <sheetData>) */
  getWorksheetXmlHeader(): string {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="${Util.schemas.spreadsheetml}"
           xmlns:r="${Util.schemas.relationships}"
           xmlns:mc="${Util.schemas.markupCompat}">`;
  }

  /** Returns worksheet XML footer (everything after </sheetData>) */
  getWorksheetXmlFooter(): string {
    if (!this._headers.length && !this._footers.length) {
      return '';
    }
    const header = this._headers.length ? `<oddHeader>${htmlEscape(this.compilePageDetailPackage(this._headers))}</oddHeader>` : '';
    const footer = this._footers.length ? `<oddFooter>${htmlEscape(this.compilePageDetailPackage(this._footers))}</oddFooter>` : '';
    return `<headerFooter>${header}${footer}</headerFooter>`;
  }

  /** Serialize rows with the same metadata, references, and escaping as toXML(). */
  serializeRows(rows: Cell[][], startRow = 0): string {
    return rows.map((row, index) => this.serializeRow(row, startRow + index)).join('');
  }

  /** Yield complete rows in bounded batches; input data remains owned by the worksheet. */
  *getXmlChunks(chunkSize = 32768) {
    const xml = this.createWorksheetDocument(false).toString();
    if (!this.data.length) {
      yield `${XMLDOM.declaration}\n${xml}`;
      return;
    }
    const marker = xml.indexOf('<sheetData/>');
    yield `${XMLDOM.declaration}\n${xml.slice(0, marker)}<sheetData>`;
    let chunk = '';
    for (let row = 0; row < this.data.length; row++) {
      chunk += this.serializeRow(this.data[row], row);
      if (chunk.length >= chunkSize) {
        yield chunk;
        chunk = '';
      }
    }
    if (chunk) {
      yield chunk;
    }
    yield `</sheetData>${xml.slice(marker + '<sheetData/>'.length)}`;
  }
}
