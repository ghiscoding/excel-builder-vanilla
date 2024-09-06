import { Drawings } from './Drawings';
import { RelationshipManager } from './RelationshipManager';
import { SharedStrings } from './SharedStrings';
import { StyleSheet } from './StyleSheet';
import { Table } from './Table';
import { Worksheet } from './Worksheet';
import { XMLDOM } from './XMLDOM';
/**
 * @module Excel/Workbook
 */
export declare class Workbook {
    id: string;
    styleSheet: StyleSheet;
    sharedStrings: SharedStrings;
    relations: RelationshipManager;
    worksheets: Worksheet[];
    tables: Table[];
    drawings: Drawings[];
    media: any;
    printTitles: any;
    constructor();
    initialize(): void;
    createWorksheet(config?: any): Worksheet;
    getStyleSheet(): StyleSheet;
    addTable(table: Table): void;
    addDrawings(drawings: Drawings): void;
    /**
     * Set number of rows to repeat for this sheet.
     *
     * @param {String} sheet name
     * @param {int} number of rows to repeat from the top
     * @returns {undefined}
     */
    setPrintTitleTop(inSheet: string, inRowCount: number): void;
    /**
     * Set number of rows to repeat for this sheet.
     *
     * @param {String} sheet name
     * @param {int} number of columns to repeat from the left
     * @returns {undefined}
     */
    setPrintTitleLeft(inSheet: string, inRowCount: number): void;
    addMedia(_type: string, fileName: string, fileData: any, contentType?: string | null): any;
    addWorksheet(worksheet: Worksheet): void;
    createContentTypes(): XMLDOM;
    toXML(): XMLDOM;
    createWorkbookRelationship(): XMLDOM;
    _generateCorePaths(files: any): void;
    _prepareFilesForPackaging(files: {
        [path: string]: XMLDOM | string;
    }): void;
    generateFiles(): Promise<{
        [path: string]: string;
    }>;
}
//# sourceMappingURL=Workbook.d.ts.map