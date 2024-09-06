import { ExcelSortState, ExcelTableColumn } from '../interfaces';
import { XMLDOM } from './XMLDOM';
/**
 * @module Excel/Table
 */
export declare class Table {
    name: string;
    id: string;
    tableId: string;
    displayName: string;
    dataCellStyle: any;
    dataDfxId: number | null;
    headerRowBorderDxfId: number | null;
    headerRowCellStyle: any;
    headerRowCount: number;
    headerRowDxfId: number | null;
    insertRow: boolean;
    insertRowShift: boolean;
    ref: any;
    tableBorderDxfId: number | null;
    totalsRowBorderDxfId: number | null;
    totalsRowCellStyle: any;
    totalsRowCount: number;
    totalsRowDxfId: number | null;
    tableColumns: any;
    autoFilter: any;
    sortState: any;
    styleInfo: any;
    constructor(config?: any);
    initialize(config: any): void;
    setReferenceRange(start: number[], end: number[]): void;
    setTableColumns(columns: Array<ExcelTableColumn | string>): void;
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
    addTableColumn(column: ExcelTableColumn | string): void;
    /**
     * Expects an object with the following properties:
     * caseSensitive (boolean)
     * dataRange
     * columnSort (assumes true)
     * sortDirection
     * sortRange (defaults to dataRange)
     */
    setSortState(state: ExcelSortState): void;
    toXML(): XMLDOM;
    exportTableColumns(doc: XMLDOM): import('./XMLDOM').XMLNode;
    exportAutoFilter(doc: XMLDOM): import('./XMLDOM').XMLNode;
    exportTableStyleInfo(doc: XMLDOM): import('./XMLDOM').XMLNode;
    addAutoFilter(startRef: any, endRef: any): void;
}
//# sourceMappingURL=Table.d.ts.map