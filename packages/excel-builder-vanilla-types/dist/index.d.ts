export { A as AbsoluteAnchor, C as Chart, D as Drawing, a as Drawings, k as ExcelAlignmentStyle, l as ExcelBorderLineStyle, m as ExcelBorderStyle, E as ExcelColorStyle, n as ExcelColumn, o as ExcelColumnFormat, t as ExcelColumnMetadata, q as ExcelFillStyle, r as ExcelFontStyle, u as ExcelMargin, s as ExcelMetadata, v as ExcelSortState, w as ExcelStyleInstruction, p as ExcelTableColumn, O as OneCellAnchor, b as Pane, P as Picture, R as RelationshipManager, S as SharedStrings, c as SheetView, d as StyleSheet, e as Table, T as TwoCellAnchor, U as Util, W as Workbook, f as Worksheet, X as XMLDOM, g as XMLNode, i as createExcelFile, h as createWorkbook, j as downloadExcelFile } from './factory-DYFe0uas.js';
import 'fflate';

/**
 * This is mostly a global spot where all of the relationship managers can get and set
 * path information from/to.
 * @module Excel/Paths
 */
declare const Paths: {
    [path: string]: string;
};

/**
 * Converts pixel sizes to 'EMU's, which is what Open XML uses.
 *
 * @todo clean this up. Code borrowed from http://polymathprogrammer.com/2009/10/22/english-metric-units-and-open-xml/,
 * but not sure that it's going to be as accurate as it needs to be.
 *
 * @param int pixels
 * @returns int
 */
declare class Positioning {
    static pixelsToEMUs(pixels: number): number;
}

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @since 0.1.0
 * @category String
 * @param {string} [str=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @see escapeRegExp, unescape
 * @example
 *
 * escape('fred, barney, & pebbles')
 * // => 'fred, barney, &amp; pebbles'
 */
declare const htmlEscape: (str: string) => string;

declare function isObject(value: unknown): value is object;
declare function isPlainObject(value: unknown): boolean;
declare function isString(value: any): value is string;

declare function pick(object: any, keys: string[]): any;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @since 0.1.0
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @see random
 * @example
 *
 * uniqueId('contact_')
 * // => 'contact_104'
 *
 * uniqueId()
 * // => '105'
 */
declare function uniqueId(prefix?: string): string;

export { Paths, Positioning, htmlEscape, isObject, isPlainObject, isString, pick, uniqueId };
