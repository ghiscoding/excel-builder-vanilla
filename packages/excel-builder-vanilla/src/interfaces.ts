/**
 * Excel Color in ARGB format, for color aren't transparent just use "FF" as prefix.
 * For example if the color you want to add is a blue with HTML color "#0000FF", then the excel color we need to add is "FF0000FF"
 * Online tool: https://www.myfixguide.com/color-converter/
 */
export type ExcelColorStyle = string | { theme: number };

export interface ExcelAlignmentStyle {
  /** Horizontal alignment of cell content */
  horizontal?: 'center' | 'fill' | 'general' | 'justify' | 'left' | 'right';
  /** Justify last line (for justified alignment) */
  justifyLastLine?: boolean;
  /** Reading order (1 = LTR, 2 = RTL) */
  readingOrder?: 1 | 2;
  /** Indent cell content (number of spaces) */
  indent?: number;
  /** Shrink text to fit cell */
  shrinkToFit?: boolean;
  /** Text rotation angle or preset */
  textRotation?: string | number;
  /** Vertical alignment of cell content */
  vertical?: 'bottom' | 'distributed' | 'center' | 'justify' | 'top';
  /** Wrap text within cell */
  wrapText?: boolean;
}

export type ExcelBorderLineStyle =
  | 'continuous'
  | 'dash'
  | 'dashDot'
  | 'dashDotDot'
  | 'dotted'
  | 'double'
  | 'none'
  | 'medium'
  | 'slantDashDot'
  | 'thin'
  | 'thick';

export interface ExcelBorderStyle {
  /** Bottom border configuration */
  bottom?: { color?: ExcelColorStyle; style?: ExcelBorderLineStyle };
  /** Top border configuration */
  top?: { color?: ExcelColorStyle; style?: ExcelBorderLineStyle };
  /** Left border configuration */
  left?: { color?: ExcelColorStyle; style?: ExcelBorderLineStyle };
  /** Right border configuration */
  right?: { color?: ExcelColorStyle; style?: ExcelBorderLineStyle };
  /** Diagonal border configuration */
  diagonal?: { color?: ExcelColorStyle; style?: ExcelBorderLineStyle };
  /** Outline border (all sides) */
  outline?: boolean;
  /** Diagonal up border */
  diagonalUp?: boolean;
  /** Diagonal down border */
  diagonalDown?: boolean;
}

export interface ExcelColumn {
  /** Auto-fit column width to content */
  bestFit?: boolean;
  /** Collapse grouped columns */
  collapsed?: boolean;
  /** Custom column width */
  customWidth?: number;
  /** Hide column from view */
  hidden?: boolean;
  /** Maximum column index for this config */
  max?: number;
  /** Minimum column index for this config */
  min?: number;
  /** Outline level for grouping */
  outlineLevel?: number;
  /** Enable phonetic guide (East Asian languages) */
  phonetic?: boolean;
  /** Style ID for column */
  style?: number;
  /** Column width in Excel units */
  width?: number;
}

export interface ExcelTableColumn {
  /** Column display name */
  name: string;
  /** Style for data cells in this column */
  dataCellStyle?: ExcelStyleInstruction;
  /** Differential style ID for data cells */
  dataDxfId?: number;
  /** Style for header row cell */
  headerRowCellStyle?: ExcelStyleInstruction;
  /** Differential style ID for header row */
  headerRowDxfId?: number;
  /** Style for totals row cell */
  totalsRowCellStyle?: ExcelStyleInstruction;
  /** Differential style ID for totals row */
  totalsRowDxfId?: number;
  /** Function for totals row (e.g. SUM, COUNT) */
  totalsRowFunction?: string;
  /** Label for totals row cell */
  totalsRowLabel?: string;
  /** Formula for column values */
  columnFormula?: string;
  /** Is column formula an array formula? */
  columnFormulaIsArrayType?: boolean;
  /** Formula for totals row */
  totalFormula?: string;
  /** Is totals formula an array formula? */
  totalFormulaIsArrayType?: boolean;
}

export interface ExcelFillStyle {
  /** Fill type: gradient or pattern */
  type?: 'gradient' | 'pattern';
  /** Pattern type (if pattern fill) */
  patternType?: string;
  /** Gradient angle (if gradient fill) */
  degree?: number;
  /** Foreground color for fill */
  fgColor?: ExcelColorStyle;
  /** Gradient start color */
  start?: ExcelColorStyle;
  /** Gradient end color and position */
  end?: { pureAt?: number; color?: ExcelColorStyle };
}

export interface ExcelFontStyle {
  /** Bold text */
  bold?: boolean;
  /** Font color */
  color?: ExcelColorStyle;
  /** Font family name */
  fontName?: string;
  /** Italic text */
  italic?: boolean;
  /** Outline font effect */
  outline?: boolean;
  /** Font size in points */
  size?: number;
  /** Shadow effect */
  shadow?: boolean;
  /** Strikethrough text */
  strike?: boolean;
  /** Subscript text */
  subscript?: boolean;
  /** Superscript text */
  superscript?: boolean;
  /** Underline style */
  underline?: boolean | 'single' | 'double' | 'singleAccounting' | 'doubleAccounting';
}

export interface ExcelMetadata {
  /** Type of metadata (custom usage) */
  type?: string;
  /** Style ID for metadata */
  style?: number;
}

export interface ExcelColumnMetadata {
  /** Cell value */
  value: string | number | boolean | Date | null;
  /** Optional metadata for the value */
  metadata?: ExcelMetadata;
}

export interface ExcelMargin {
  /** Top margin in inches */
  top: number;
  /** Bottom margin in inches */
  bottom: number;
  /** Left margin in inches */
  left: number;
  /** Right margin in inches */
  right: number;
  /** Header margin in inches */
  header: number;
  /** Footer margin in inches */
  footer: number;
}

export interface ExcelSortState {
  /** Is sort case sensitive? */
  caseSensitive?: boolean;
  /** Data range to sort */
  dataRange?: string;
  /** Sort by column (true) or row (false) */
  columnSort?: boolean;
  /** Sort direction: ascending or descending */
  sortDirection?: 'ascending' | 'descending';
  /** Range to sort (defaults to dataRange) */
  sortRange?: string;
}

/** Excel custom formatting that will be applied to a column */
export interface ExcelStyleInstruction {
  /** Unique style instruction ID (internal use) */
  id?: number;
  /** Cell alignment style (horizontal, vertical, wrap, etc.) */
  alignment?: ExcelAlignmentStyle;
  /** Cell border style or border style ID */
  border?: ExcelBorderStyle | number;
  /** Border style ID (if referencing a shared style) */
  borderId?: number;
  /** Cell fill style (pattern, gradient, color) or fill style ID */
  fill?: ExcelFillStyle | number;
  /** Fill style ID (if referencing a shared style) */
  fillId?: number;
  /** Cell font style (bold, italic, color, etc.) or font style ID */
  font?: ExcelFontStyle | number;
  /** Font style ID (if referencing a shared style) */
  fontId?: number;
  /** Custom cell format string or format ID (e.g., date, currency) */
  format?: string | number;
  /** Row height in points (if set at row level) */
  height?: number;
  /** Number format string (Excel format codes) */
  numFmt?: string;
  /** Number format ID (if referencing a shared format) */
  numFmtId?: number;
  /** Column width in Excel units (if set at column level) */
  width?: number;
  /** Extended format ID (Open XML xfId, for advanced style referencing) */
  xfId?: number;
  /** Cell protection settings (locked, hidden) */
  protection?: { locked?: boolean; hidden?: boolean };
  /** Style ID (if referencing a shared style) */
  style?: number;
}

// ---------------------------
// Chart related interfaces
// ---------------------------
export type ChartType = 'column' | 'bar' | 'line' | 'pie' | 'doughnut' | 'scatter';

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
  /** Cell range for series values (e.g. `Sheet1!$B$2:$B$5`) */
  valuesRange: string;
  /**
   * Optional solid color for the series. Use opaque ARGB `FFRRGGBB` (e.g. FF3366CC).
   * Alpha (other than FF) currently ignored. Theme colors not yet supported for charts.
   */
  color?: string;
  /** Scatter only: per-series X axis numeric range (ignored for non-scatter charts) */
  scatterXRange?: string;
}

/** Legend configuration (minimal) */
export interface LegendOptions {
  /** Force show (true) or hide (false). If undefined, auto: show only when multiple series */
  show?: boolean;
  /** Legend position (defaults to 'right' if omitted) */
  position?: 'right' | 'left' | 'top' | 'bottom' | 'topRight';
  /** Overlay the legend on the plot area (no space reservation) */
  overlay?: boolean;
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
  /** Legend configuration */
  legend?: LegendOptions;
  /** Global data label toggles (applies to the whole chart). If any flag true a <c:dLbls> node is emitted. */
  dataLabels?: {
    /** Show numerical value */
    showValue?: boolean;
    /** Show category text (for non-scatter) */
    showCategory?: boolean;
    /** Show percentage (mainly useful for pie/doughnut or percent stacked) */
    showPercent?: boolean;
    /** Show series name (useful when multiple series and category/value alone is ambiguous) */
    showSeriesName?: boolean;
  };
}
