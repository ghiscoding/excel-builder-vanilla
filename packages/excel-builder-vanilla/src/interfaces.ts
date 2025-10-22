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

export type ExcelBorderLineStyle =
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
  bottom?: { color?: ExcelColorStyle; style?: ExcelBorderLineStyle };
  top?: { color?: ExcelColorStyle; style?: ExcelBorderLineStyle };
  left?: { color?: ExcelColorStyle; style?: ExcelBorderLineStyle };
  right?: { color?: ExcelColorStyle; style?: ExcelBorderLineStyle };
  diagonal?: any;
  outline?: boolean;
  diagonalUp?: boolean;
  diagonalDown?: boolean;
}

export interface ExcelColumn {
  bestFit?: boolean;
  collapsed?: boolean;
  customWidth?: number;
  hidden?: boolean;
  max?: number;
  min?: number;
  outlineLevel?: number;
  phonetic?: boolean;
  style?: number;
  width?: number;
}

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
  /* assumes true */
  columnSort?: boolean;
  sortDirection?: 'ascending' | 'descending';
  /* defaults to dataRange */
  sortRange?: any;
}

/** Excel custom formatting that will be applied to a column */
export interface ExcelStyleInstruction {
  id?: number;
  alignment?: ExcelAlignmentStyle;
  border?: ExcelBorderStyle | number;
  borderId?: number;
  fill?: ExcelFillStyle | number;
  fillId?: number;
  font?: ExcelFontStyle | number;
  fontId?: number;
  format?: string | number;
  height?: number;
  numFmt?: string;
  numFmtId?: number;
  width?: number;
  xfId?: number;
  protection?: { locked?: boolean; hidden?: boolean };
  /** style id */
  style?: number;
}

// ---------------------------
// Chart related interfaces
// ---------------------------
export type ChartType = 'column' | 'bar' | 'line' | 'pie' | 'scatter';

/** Axis configuration options */
export interface AxisOptions {
  /** Axis title label */
  title?: string;
  /** Explicit minimum value (value axis only; ignored for category axis unless future numeric category support) */
  minimum?: number;
  /** Explicit maximum value (value axis only) */
  maximum?: number;
  /** Show major gridlines */
  showGridLines?: boolean;
}

export interface ChartSeriesRef {
  /** Series display name */
  name: string;
  /** Cell range for series values (e.g. Sheet1!$B$2:$B$5) */
  valuesRange: string;
  /** Hex ARGB or RGB color (e.g. FF0000 or FF0000FF) - currently cosmetic placeholder */
  color?: string;
  /** For scatter charts: X axis values range */
  xValuesRange?: string;
}

export interface ChartOptions {
  /** Chart type (defaults to 'column' if omitted) */
  type?: ChartType;
  /** Chart title shown above plot area */
  title?: string;
  /** Axis configuration (ignored for pie except title for completeness) */
  axis?: {
    /** Category/X axis options */
    x?: AxisOptions;
    /** Value/Y axis options */
    y?: AxisOptions;
  };
  /** Width in EMUs */
  width?: number;
  /** Height in EMUs */
  height?: number;
  /** Categories range (for non-scatter) e.g. Sheet1!$A$2:$A$5 */
  categoriesRange?: string;
  /** Stacking mode for supported chart types (column, bar, line). 'stacked' for cumulative, 'percent' for 100% scaling. Undefined => no stacking */
  stacking?: 'stacked' | 'percent';
  /** Multi-series cell references */
  series?: ChartSeriesRef[];
}
