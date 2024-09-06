/**
 * Excel Color in ARGB format, for color aren't transparent just use "FF" as prefix.
 * For example if the color you want to add is a blue with HTML color "#0000FF", then the excel color we need to add is "FF0000FF"
 * Online tool: https://www.myfixguide.com/color-converter/
 */
export type ExcelColorStyle = string | {
    theme: number;
};
export interface ExcelAlignmentStyle {
    horizontal?: 'center' | 'fill' | 'general' | 'justify' | 'left' | 'right';
    justifyLastLine?: boolean;
    readingOrder?: string;
    relativeIndent?: boolean;
    shrinkToFit?: boolean;
    textRotation?: string | number;
    vertical?: 'bottom' | 'distributed' | 'center' | 'justify' | 'top';
    wrapText?: boolean;
}
export type ExcelBorderLineStyle = 'continuous' | 'dash' | 'dashDot' | 'dashDotDot' | 'dotted' | 'double' | 'lineStyleNone' | 'medium' | 'slantDashDot' | 'thin' | 'thick';
export interface ExcelBorderStyle {
    bottom?: {
        color?: ExcelColorStyle;
        style?: ExcelBorderLineStyle;
    };
    top?: {
        color?: ExcelColorStyle;
        style?: ExcelBorderLineStyle;
    };
    left?: {
        color?: ExcelColorStyle;
        style?: ExcelBorderLineStyle;
    };
    right?: {
        color?: ExcelColorStyle;
        style?: ExcelBorderLineStyle;
    };
    diagonal?: any;
    outline?: boolean;
    diagonalUp?: boolean;
    diagonalDown?: boolean;
}
export interface ExcelColumn {
    bestFit?: boolean;
    customWidth?: number;
    hidden?: boolean;
    min?: number;
    max?: number;
    width?: number;
}
export type ExcelColumnFormat = 'bestFit' | 'collapsed' | 'customWidth' | 'hidden' | 'max' | 'min' | 'outlineLevel' | 'phonetic' | 'style' | 'width';
export interface ExcelTableColumn {
    name: string;
    dataCellStyle?: any;
    dataDxfId?: number;
    headerRowCellStyle?: ExcelStyleInstruction;
    headerRowDxfId?: number;
    totalsRowCellStyle?: ExcelStyleInstruction;
    totalsRowDxfId?: number;
    totalsRowFunction?: any;
    totalsRowLabel?: string;
    columnFormula?: string;
    columnFormulaIsArrayType?: boolean;
    totalFormula?: string;
    totalFormulaIsArrayType?: boolean;
}
export interface ExcelFillStyle {
    type?: 'gradient' | 'pattern';
    patternType?: string;
    degree?: number;
    fgColor?: ExcelColorStyle;
    start?: ExcelColorStyle;
    end?: {
        pureAt?: number;
        color?: ExcelColorStyle;
    };
}
export interface ExcelFontStyle {
    bold?: boolean;
    color?: ExcelColorStyle;
    fontName?: string;
    italic?: boolean;
    outline?: boolean;
    size?: number;
    shadow?: boolean;
    strike?: boolean;
    subscript?: boolean;
    superscript?: boolean;
    underline?: boolean | 'single' | 'double' | 'singleAccounting' | 'doubleAccounting';
}
export interface ExcelMetadata {
    type?: string;
    style?: number;
}
export interface ExcelColumnMetadata {
    value: any;
    metadata?: ExcelMetadata;
}
export interface ExcelMargin {
    top: number;
    bottom: number;
    left: number;
    right: number;
    header: number;
    footer: number;
}
export interface ExcelSortState {
    caseSensitive?: boolean;
    dataRange?: any;
    columnSort?: boolean;
    sortDirection?: 'ascending' | 'descending';
    sortRange?: any;
}
/** Excel custom formatting that will be applied to a column */
export interface ExcelStyleInstruction {
    id?: number;
    alignment?: ExcelAlignmentStyle;
    border?: ExcelBorderStyle;
    borderId?: number;
    fill?: ExcelFillStyle;
    fillId?: number;
    font?: ExcelFontStyle;
    fontId?: number;
    format?: string;
    height?: number;
    numFmt?: string;
    numFmtId?: number;
    width?: number;
    xfId?: number;
    protection?: {
        locked?: boolean;
        hidden?: boolean;
    };
    /** style id */
    style?: number;
}
//# sourceMappingURL=interfaces.d.ts.map