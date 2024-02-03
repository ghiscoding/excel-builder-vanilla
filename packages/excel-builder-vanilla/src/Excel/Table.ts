import { each, isString, uniqueId } from 'lodash';
import { Util } from './Util';
import { XMLDOM } from './XMLDOM';
import { ExcelColumn, ExcelSortState } from '../interfaces';

/**
 * @module Excel/Table
 */
export class Table {
  name = '';
  id = '';
  tableId = '';
  displayName = '';
  dataCellStyle: any = null;
  dataDfxId: number | null = null;
  headerRowBorderDxfId: number | null = null;
  headerRowCellStyle: any = null;
  headerRowCount = 1;
  headerRowDxfId: number | null = null;
  insertRow = false;
  insertRowShift = false;
  ref: any = null;
  tableBorderDxfId: number | null = null;
  totalsRowBorderDxfId: number | null = null;
  totalsRowCellStyle: any = null;
  totalsRowCount = 0;
  totalsRowDxfId: number | null = null;
  tableColumns: any = [];
  autoFilter: any = null;
  sortState: any = null;
  styleInfo: any = {};

  constructor(config?: any) {
    this.initialize(config);
  }

  initialize(config: any) {
    this.displayName = uniqueId('Table');
    this.name = this.displayName;
    this.id = this.name;
    this.tableId = this.id.replace('Table', '');
    Object.assign(this, config);
  }

  setReferenceRange(start: number[], end: number[]) {
    this.ref = [start, end];
  }

  setTableColumns(columns: Array<ExcelColumn | string>) {
    each(columns, column => {
      this.addTableColumn(column);
    });
  }

  /**
   * Expects an object with the following optional properties:
   * name (required)
   * dataCellStyle
   * dataDxfId
   * headerRowCellStyle
   * headerRowDxfId
   * totalsRowCellStyle
   * totalsRowDxfId
   * totalsRowFunction
   * totalsRowLabel
   * columnFormula
   * columnFormulaIsArrayType (boolean)
   * totalFormula
   * totalFormulaIsArrayType (boolean)
   */
  addTableColumn(column: ExcelColumn | string) {
    if (isString(column)) {
      column = {
        name: column,
      };
    }
    if (!column.name) {
      throw new Error('Invalid argument for addTableColumn - minimum requirement is a name property');
    }
    this.tableColumns.push(column);
  }

  /**
   * Expects an object with the following properties:
   * caseSensitive (boolean)
   * dataRange
   * columnSort (assumes true)
   * sortDirection
   * sortRange (defaults to dataRange)
   */
  setSortState(state: ExcelSortState) {
    this.sortState = state;
  }

  toXML() {
    const doc = Util.createXmlDoc(Util.schemas.spreadsheetml, 'table');
    const table = doc.documentElement;
    table.setAttribute('id', this.tableId);
    table.setAttribute('name', this.name);
    table.setAttribute('displayName', this.displayName);
    const s = this.ref[0];
    const e = this.ref[1];
    table.setAttribute('ref', `${Util.positionToLetterRef(s[0], s[1])}:${Util.positionToLetterRef(e[0], e[1])}`);

    /** TOTALS **/
    table.setAttribute('totalsRowCount', this.totalsRowCount);

    /** HEADER **/
    table.setAttribute('headerRowCount', this.headerRowCount);
    if (this.headerRowDxfId) {
      table.setAttribute('headerRowDxfId', this.headerRowDxfId);
    }
    if (this.headerRowBorderDxfId) {
      table.setAttribute('headerRowBorderDxfId', this.headerRowBorderDxfId);
    }

    if (!this.ref) {
      throw new Error('Needs at least a reference range');
    }
    if (!this.autoFilter) {
      this.addAutoFilter(this.ref[0], this.ref[1]);
    }

    table.appendChild(this.exportAutoFilter(doc));

    table.appendChild(this.exportTableColumns(doc));
    table.appendChild(this.exportTableStyleInfo(doc));
    return doc;
  }

  exportTableColumns(doc: XMLDOM) {
    const tableColumns = doc.createElement('tableColumns');
    tableColumns.setAttribute('count', this.tableColumns.length);
    const tcs = this.tableColumns;
    for (let i = 0, l = tcs.length; i < l; i++) {
      const tc = tcs[i];
      const tableColumn = doc.createElement('tableColumn');
      tableColumn.setAttribute('id', String(i + 1));
      tableColumn.setAttribute('name', tc.name);
      tableColumns.appendChild(tableColumn);

      if (tc.totalsRowFunction) {
        tableColumn.setAttribute('totalsRowFunction', tc.totalsRowFunction);
      }
      if (tc.totalsRowLabel) {
        tableColumn.setAttribute('totalsRowLabel', tc.totalsRowLabel);
      }
    }
    return tableColumns;
  }

  exportAutoFilter(doc: XMLDOM) {
    const autoFilter = doc.createElement('autoFilter');
    const s = this.autoFilter[0];
    const e = this.autoFilter[1];
    autoFilter.setAttribute('ref', `${Util.positionToLetterRef(s[0], s[1])}:${Util.positionToLetterRef(e[0], e[1] - this.totalsRowCount)}`);
    return autoFilter;
  }

  exportTableStyleInfo(doc: XMLDOM) {
    const ts = this.styleInfo;
    const tableStyle = doc.createElement('tableStyleInfo');
    tableStyle.setAttribute('name', ts.themeStyle);
    tableStyle.setAttribute('showFirstColumn', ts.showFirstColumn ? '1' : '0');
    tableStyle.setAttribute('showLastColumn', ts.showLastColumn ? '1' : '0');
    tableStyle.setAttribute('showColumnStripes', ts.showColumnStripes ? '1' : '0');
    tableStyle.setAttribute('showRowStripes', ts.showRowStripes ? '1' : '0');
    return tableStyle;
  }

  addAutoFilter(startRef: any, endRef: any) {
    this.autoFilter = [startRef, endRef];
  }
}
