/**
 * Excel Color in ARGB format, for color aren't transparent just use "FF" as prefix.
 * For example if the color you want to add is a blue with HTML color "#0000FF", then the excel color we need to add is "FF0000FF"
 * Online tool: https://www.myfixguide.com/color-converter/
 */
export type ExcelColorStyle = string | { theme: number };
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
export type ExcelBorderLine =
  | 'continuous'
  | 'dash'
  | 'dashDot'
  | 'dashDotDot'
  | 'dotted'
  | 'double'
  | 'lineStyleNone'
  | 'medium'
  | 'slantDashDot'
  | 'thin'
  | 'thick';
export interface ExcelBorderStyle {
  bottom?: { color?: ExcelColorStyle; style?: ExcelBorderLine };
  top?: { color?: ExcelColorStyle; style?: ExcelBorderLine };
  left?: { color?: ExcelColorStyle; style?: ExcelBorderLine };
  right?: { color?: ExcelColorStyle; style?: ExcelBorderLine };
  diagonal?: any;
  outline?: boolean;
  diagonalUp?: boolean;
  diagonalDown?: boolean;
}
export interface ExcelColumn {
  name: string;
  dataCellStyle?: any;
  dataDxfId?: number;
  headerRowCellStyle?: ExcelStyleInstruction;
  headerRowDxfId?: number;
  totalsRowCellStyle?: ExcelStyleInstruction;
  totalsRowDxfId?: number;
  totalsRowFunction?: any;
  totalsRowLabel?: string;
  columnFormula?: any;
  columnFormulaIsArrayType?: boolean;
  totalFormula?: any;
  totalFormulaIsArrayType?: boolean;
}
export interface ExcelFillStyle {
  type?: 'gradient' | 'pattern';
  patternType?: string;
  degree?: number;
  fgColor?: ExcelColorStyle;
  start?: ExcelColorStyle;
  end?: { pureAt?: number; color?: ExcelColorStyle };
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

export interface ExcelSortState {
  caseSensitive?: boolean;
  dataRange?: any;
  /* assumes true */
  columnSort?: boolean;
  sortDirection?: any;
  /* defaults to dataRange */
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
