import { ExcelFontStyle, ExcelStyleInstruction } from '../interfaces';
import { XMLDOM } from './XMLDOM';
/**
 * @module Excel/StyleSheet
 */
export declare class StyleSheet {
    id: string;
    cellStyles: {
        name: string;
        xfId: string;
        builtinId: string;
    }[];
    defaultTableStyle: boolean;
    differentialStyles: any[];
    masterCellFormats: any[];
    masterCellStyles: any[];
    fonts: ExcelFontStyle[];
    numberFormatters: any[];
    fills: any[];
    borders: any[];
    tableStyles: any[];
    createSimpleFormatter(type: string): {
        [id: string]: number;
    };
    createFill(fillInstructions: any): any;
    createNumberFormatter(formatInstructions: any): {
        id: number;
        formatCode: any;
    };
    /**
     * alignment: {
     *  horizontal: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_HorizontalAlignment.html
     *  vertical: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_VerticalAlignment.html
     *  @param {Object} styleInstructions
     */
    createFormat(styleInstructions: ExcelStyleInstruction): any;
    createDifferentialStyle(styleInstructions: ExcelStyleInstruction): ExcelStyleInstruction;
    /**
     * Should be an object containing keys that match with one of the keys from this list:
     * http://www.schemacentral.com/sc/ooxml/t-ssml_ST_TableStyleType.html
     *
     * The value should be a reference to a differential format (dxf)
     * @param {Object} instructions
     */
    createTableStyle(instructions: any): void;
    /**
     * All params optional
     * Expects: {
     * top: {},
     * left: {},
     * right: {},
     * bottom: {},
     * diagonal: {},
     * outline: boolean,
     * diagonalUp: boolean,
     * diagonalDown: boolean
     * }
     * Each border should follow:
     * {
     * style: styleString, http://www.schemacentral.com/sc/ooxml/t-ssml_ST_BorderStyle.html
     * color: ARBG color (requires the A, so for example FF006666)
     * }
     * @param {Object} border
     */
    createBorderFormatter(border: any): any;
    /**
     * Supported font styles:
     * bold
     * italic
     * underline (single, double, singleAccounting, doubleAccounting)
     * size
     * color
     * fontName
     * strike (strikethrough)
     * outline (does this actually do anything?)
     * shadow (does this actually do anything?)
     * superscript
     * subscript
     *
     * Color is a future goal - at the moment it's looking a bit complicated
     * @param {Object} instructions
     */
    createFontStyle(instructions: ExcelFontStyle): any;
    exportBorders(doc: XMLDOM): import('./XMLDOM').XMLNode;
    exportBorder(doc: XMLDOM, data: any): import('./XMLDOM').XMLNode;
    exportColor(doc: XMLDOM, color: any): import('./XMLDOM').XMLNode;
    exportMasterCellFormats(doc: XMLDOM): import('./XMLDOM').XMLNode;
    exportMasterCellStyles(doc: XMLDOM): import('./XMLDOM').XMLNode;
    exportCellFormatElement(doc: XMLDOM, styleInstructions: ExcelStyleInstruction): import('./XMLDOM').XMLNode;
    exportAlignment(doc: XMLDOM, alignmentData: any): import('./XMLDOM').XMLNode;
    exportFonts(doc: XMLDOM): import('./XMLDOM').XMLNode;
    exportFont(doc: XMLDOM, fd: any): import('./XMLDOM').XMLNode;
    exportFills(doc: XMLDOM): import('./XMLDOM').XMLNode;
    exportFill(doc: XMLDOM, fd: any): import('./XMLDOM').XMLNode;
    exportGradientFill(doc: XMLDOM, data: any): import('./XMLDOM').XMLNode;
    /**
     * Pattern types: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_PatternType.html
     * @param {XMLDoc} doc
     * @param {Object} data
     */
    exportPatternFill(doc: XMLDOM, data: any): import('./XMLDOM').XMLNode;
    exportNumberFormatters(doc: XMLDOM): import('./XMLDOM').XMLNode;
    exportNumberFormatter(doc: XMLDOM, fd: any): import('./XMLDOM').XMLNode;
    exportCellStyles(doc: XMLDOM): import('./XMLDOM').XMLNode;
    exportDifferentialStyles(doc: XMLDOM): import('./XMLDOM').XMLNode;
    exportDFX(doc: XMLDOM, style: any): import('./XMLDOM').XMLNode;
    exportTableStyles(doc: XMLDOM): import('./XMLDOM').XMLNode;
    exportTableStyle(doc: XMLDOM, style: {
        name: string;
        wholeTable?: number;
        headerRow?: number;
    }): import('./XMLDOM').XMLNode;
    exportProtection(doc: XMLDOM, protectionData: any): import('./XMLDOM').XMLNode;
    toXML(): XMLDOM;
}
//# sourceMappingURL=StyleSheet.d.ts.map