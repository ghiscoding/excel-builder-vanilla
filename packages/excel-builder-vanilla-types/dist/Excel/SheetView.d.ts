import { Pane } from './Pane';
import { XMLDOM } from './XMLDOM';
interface SheetViewOption {
    pane?: Pane;
}
/**
 * @module Excel/SheetView
 * https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.sheetview%28v=office.14%29.aspx
 *
 */
export declare class SheetView {
    pane: Pane;
    showZeros: null;
    defaultGridColor: null;
    colorId: null;
    rightToLeft: null;
    showFormulas: null;
    showGridLines: null;
    showOutlineSymbols: null;
    showRowColHeaders: null;
    showRuler: null;
    showWhiteSpace: null;
    tabSelected: null;
    topLeftCell: null;
    viewType: null;
    windowProtection: null;
    zoomScale: null;
    zoomScaleNormal: null;
    zoomScalePageLayoutView: null;
    zoomScaleSheetLayoutView: null;
    constructor(config?: SheetViewOption);
    /**
     * Added froze pane
     * @param column - column number: 0, 1, 2 ...
     * @param row - row number: 0, 1, 2 ...
     * @param cell - 'A1'
     * @deprecated
     */
    freezePane(column: number, row: number, cell: string): void;
    exportXML(doc: XMLDOM): import('./XMLDOM').XMLNode;
}
export {};
//# sourceMappingURL=SheetView.d.ts.map