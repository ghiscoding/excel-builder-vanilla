import { ExcelColumn, ExcelColumnFormat, ExcelColumnMetadata, ExcelMargin, ExcelStyleInstruction } from '../interfaces';
import { Drawings } from './Drawings';
import { SharedStrings } from './SharedStrings';
import { SheetView } from './SheetView';
import { Table } from './Table';
import { XMLDOM, XMLNode } from './XMLDOM';
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
}
/**
 * This module represents an excel worksheet in its basic form - no tables, charts, etc. Its purpose is
 * to hold data, the data's link to how it should be styled, and any links to other outside resources.
 *
 * @module Excel/Worksheet
 */
export declare class Worksheet {
    name: string;
    id: string;
    _timezoneOffset: number;
    relations: any;
    columnFormats: ExcelColumnFormat[];
    data: (number | string | boolean | Date | null | ExcelColumnMetadata)[][];
    mergedCells: string[][];
    columns: ExcelColumn[];
    sheetProtection: any;
    _headers: [left?: any, center?: any, right?: any];
    _footers: [left?: any, center?: any, right?: any];
    _tables: Table[];
    _drawings: Array<Table | Drawings>;
    _orientation?: string;
    _margin?: ExcelMargin;
    _rowInstructions: any;
    _freezePane: {
        xSplit?: number;
        ySplit?: number;
        cell?: string;
    };
    sharedStrings: SharedStrings | null;
    hyperlinks: never[];
    sheetView: SheetView;
    showZeros: any;
    constructor(config: WorksheetOption);
    initialize(config: any): void;
    /**
     * Returns an object that can be consumed by a Worksheet/Export/Worker
     * @returns {Object}
     */
    exportData(): {
        relations: any;
        columnFormats: ExcelColumnFormat[];
        data: (string | number | boolean | ExcelColumnMetadata | Date | null)[][];
        columns: ExcelColumn[];
        mergedCells: string[][];
        _headers: [left?: any, center?: any, right?: any];
        _footers: [left?: any, center?: any, right?: any];
        _tables: Table[];
        _rowInstructions: any;
        _freezePane: {
            xSplit?: number;
            ySplit?: number;
            cell?: string;
        };
        name: string;
        id: string;
    };
    /**
     * Imports data - to be used while inside of a WorksheetExportWorker.
     * @param {Object} data
     */
    importData(data: any): void;
    setSharedStringCollection(stringCollection: SharedStrings): void;
    addTable(table: Table): void;
    addDrawings(drawings: Drawings): void;
    setRowInstructions(rowIndex: number, instructions: ExcelStyleInstruction): void;
    /**
     * Expects an array length of three.
     *
     * @see Excel/Worksheet compilePageDetailPiece
     * @see <a href='/cookbook/addingHeadersAndFooters.html'>Adding headers and footers to a worksheet</a>
     *
     * @param {Array} headers [left, center, right]
     */
    setHeader(headers: [left: any, center: any, right: any]): void;
    /**
     * Expects an array length of three.
     *
     * @see Excel/Worksheet compilePageDetailPiece
     * @see <a href='/cookbook/addingHeadersAndFooters.html'>Adding headers and footers to a worksheet</a>
     *
     * @param {Array} footers [left, center, right]
     */
    setFooter(footers: [left: any, center: any, right: any]): void;
    /**
     * Turns page header/footer details into the proper format for Excel.
     * @param {type} data
     * @returns {String}
     */
    compilePageDetailPackage(data: any): string;
    /**
     * Turns instructions on page header/footer details into something
     * usable by Excel.
     *
     * @param {type} data
     * @returns {String|@exp;_@call;reduce}
     */
    compilePageDetailPiece(data: string | CharType | any[]): any;
    /**
     * Creates the header node.
     *
     * @todo implement the ability to do even/odd headers
     * @param {XML Doc} doc
     * @returns {XML Node}
     */
    exportHeader(doc: XMLDOM): XMLNode;
    /**
     * Creates the footer node.
     *
     * @todo implement the ability to do even/odd footers
     * @param {XML Doc} doc
     * @returns {XML Node}
     */
    exportFooter(doc: XMLDOM): XMLNode;
    /**
     * This creates some nodes ahead of time, which cuts down on generation time due to
     * most cell definitions being essentially the same, but having multiple nodes that need
     * to be created. Cloning takes less time than creation.
     *
     * @private
     * @param {XML Doc} doc
     * @returns {_L8.Anonym$0._buildCache.Anonym$2}
     */
    _buildCache(doc: XMLDOM): {
        number: XMLNode;
        date: XMLNode;
        string: XMLNode;
        formula: XMLNode;
    };
    /**
     * Runs through the XML document and grabs all of the strings that will
     * be sent to the 'shared strings' document.
     *
     * @returns {Array}
     */
    collectSharedStrings(): string[];
    toXML(): XMLDOM;
    /**
     *
     * @param {XML Doc} doc
     * @returns {XML Node}
     */
    exportColumns(doc: XMLDOM): XMLNode;
    /**
     * Sets the page settings on a worksheet node.
     *
     * @param {XML Doc} doc
     * @param {XML Node} worksheet
     * @returns {undefined}
     */
    exportPageSettings(doc: XMLDOM, worksheet: XMLNode): void;
    /**
     * http://www.schemacentral.com/sc/ooxml/t-ssml_ST_Orientation.html
     *
     * Can be one of 'portrait' or 'landscape'.
     *
     * @param {'default' | 'portrait' | 'landscape'} orientation
     * @returns {undefined}
     */
    setPageOrientation(orientation: 'default' | 'portrait' | 'landscape'): void;
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
    setPageMargin(input: ExcelMargin): void;
    /**
     * Expects an array of column definitions. Each column definition needs to have a width assigned to it.
     *
     * @param {Array} columns
     */
    setColumns(columns: ExcelColumn[]): void;
    /**
     * Expects an array of data to be translated into cells.
     *
     * @param {Array} data Two dimensional array - [ [A1, A2], [B1, B2] ]
     * @see <a href='/cookbook/addingDataToAWorksheet.html'>Adding data to a worksheet</a>
     */
    setData(data: (number | string | boolean | Date | null | ExcelColumnMetadata)[][]): void;
    /**
     * Merge cells in given range
     *
     * @param cell1 - A1, A2...
     * @param cell2 - A2, A3...
     */
    mergeCells(cell1: string, cell2: string): void;
    /**
     * Added frozen pane
     * @param column - column number: 0, 1, 2 ...
     * @param row - row number: 0, 1, 2 ...
     * @param cell - 'A1'
     * @deprecated
     */
    freezePane(column: number, row: number, cell: string): void;
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
    setColumnFormats(columnFormats: ExcelColumnFormat[]): void;
}
export {};
//# sourceMappingURL=Worksheet.d.ts.map