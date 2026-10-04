import type { BorderInstruction, ExcelFontStyle, ExcelStyleInstruction } from '../interfaces.js';
import { isObject, isString } from '../utilities/isTypeOf.js';
import { pick } from '../utilities/pick.js';
import { uniqueId } from '../utilities/uniqueId.js';
import { Util } from './Util.js';
import type { XMLDOM, XMLNode } from './XMLDOM.js';

/**
 * @module Excel/StyleSheet
 */
export class StyleSheet {
  id = uniqueId('StyleSheet');
  cellStyles = [
    {
      name: 'Normal',
      xfId: '0',
      builtinId: '0',
    },
  ];
  defaultTableStyle = false;
  differentialStyles: any[] = [{}];
  masterCellFormats: any[] = [
    {
      numFmtId: 0,
      fontId: 0,
      fillId: 0,
      borderId: 0,
      xfid: 0,
    },
  ];
  masterCellStyles: any[] = [
    {
      numFmtId: 0,
      fontId: 0,
      fillId: 0,
      borderId: 0,
    },
  ];
  fonts: ExcelFontStyle[] = [{}];
  numberFormatters: any[] = [];
  fills: any[] = [
    {},
    {
      type: 'pattern',
      patternType: 'gray125',
      fgColor: 'FF333333',
      bgColor: 'FF333333',
    },
  ];
  borders: any[] = [
    {
      top: {},
      left: {},
      right: {},
      bottom: {},
      diagonal: {},
    },
  ];
  tableStyles: any[] = [];

  /** Creates a cell format using a built-in formatter such as `date`. */
  createSimpleFormatter(type: string) {
    const sid = this.masterCellFormats.length;
    const style: { [id: string]: number } = {
      id: sid,
    };
    switch (type) {
      case 'date':
        style.numFmtId = 14;
        break;
    }
    this.masterCellFormats.push(style);
    return style;
  }

  /** Registers a fill definition and returns it with its generated style ID. */
  createFill(fillInstructions: any) {
    const id = this.fills.length;
    const fill = fillInstructions;
    fill.id = id;
    this.fills.push(fill);
    return fill;
  }

  /** Registers a custom number format and returns its generated format ID. */
  createNumberFormatter(formatInstructions: any) {
    const id = this.numberFormatters.length + 100;
    const format = {
      id: id,
      formatCode: formatInstructions,
    };
    this.numberFormatters.push(format);
    return format;
  }

  /**
   * Creates a cell format from font, number, border, fill, alignment, and protection instructions.
   * `alignment: {
   *    horizontal: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_HorizontalAlignment.html
   *    vertical: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_VerticalAlignment.html
   *  }`
   * @param {Object} styleInstructions
   */
  createFormat(styleInstructions: ExcelStyleInstruction) {
    const sid = this.masterCellFormats.length;
    const style: any = {
      id: sid,
    };
    if (styleInstructions.protection) {
      style.protection = styleInstructions.protection;
    }
    if (styleInstructions.font && isObject(styleInstructions.font)) {
      style.fontId = this.createFontStyle(styleInstructions.font).id;
    } else if (styleInstructions.font) {
      if (Number.isNaN(Number.parseInt(styleInstructions.font as unknown as string, 10))) {
        throw new Error('Passing a non-numeric font id is not supported');
      }
      style.fontId = styleInstructions.font;
    }

    if (styleInstructions.format && isString(styleInstructions.format)) {
      style.numFmtId = this.createNumberFormatter(styleInstructions.format).id;
    } else if (styleInstructions.format) {
      if (Number.isNaN(Number.parseInt(styleInstructions.format as unknown as string, 10))) {
        throw new Error('Invalid number formatter id');
      }
      style.numFmtId = styleInstructions.format;
    }

    if (styleInstructions.border && isObject(styleInstructions.border)) {
      style.borderId = this.createBorderFormatter(styleInstructions.border).id;
    } else if (styleInstructions.border) {
      if (Number.isNaN(Number.parseInt(styleInstructions.border as unknown as string, 10))) {
        throw new Error('Passing a non-numeric border id is not supported');
      }
      style.borderId = styleInstructions.border;
    }

    if (styleInstructions.fill && isObject(styleInstructions.fill)) {
      style.fillId = this.createFill(styleInstructions.fill).id;
    } else if (styleInstructions.fill) {
      if (Number.isNaN(Number.parseInt(styleInstructions.fill as unknown as string, 10))) {
        throw new Error('Passing a non-numeric fill id is not supported');
      }
      style.fillId = styleInstructions.fill;
    }

    if (styleInstructions.alignment && isObject(styleInstructions.alignment)) {
      style.alignment = pick(styleInstructions.alignment, [
        'horizontal',
        'justifyLastLine',
        'readingOrder',
        'relativeIndent',
        'shrinkToFit',
        'textRotation',
        'vertical',
        'wrapText',
      ]);
    }

    this.masterCellFormats.push(style);
    return style;
  }

  /** Creates a differential style for conditional formatting or table styles. */
  createDifferentialStyle(styleInstructions: ExcelStyleInstruction) {
    const id = this.differentialStyles.length;
    const style: ExcelStyleInstruction = {
      id,
    };
    if (styleInstructions.font && isObject(styleInstructions.font)) {
      style.font = styleInstructions.font;
    }
    if (styleInstructions.border && isObject(styleInstructions.border)) {
      style.border = Object.assign(
        {
          top: {},
          left: {},
          right: {},
          bottom: {},
          diagonal: {},
        },
        styleInstructions.border,
      );
    }
    if (styleInstructions.fill && isObject(styleInstructions.fill)) {
      style.fill = styleInstructions.fill;
    }
    if (styleInstructions.alignment && isObject(styleInstructions.alignment)) {
      style.alignment = styleInstructions.alignment;
    }
    if (styleInstructions.format && isString(styleInstructions.format)) {
      style.numFmt = styleInstructions.format;
    }
    this.differentialStyles[id] = style;
    return style;
  }

  /**
   * Registers a table style whose elements reference differential format IDs.
   * Should be an object containing keys that match with one of the keys from this list:
   * http://www.schemacentral.com/sc/ooxml/t-ssml_ST_TableStyleType.html
   *
   * The value should be a reference to a differential format (dxf)
   * @param {Object} instructions
   */
  createTableStyle(instructions: any) {
    this.tableStyles.push(instructions);
  }

  /**
   * Registers a border definition and returns it with its generated style ID.
   * All params optional. each border should follow:
   * {
   * style: styleString, http://www.schemacentral.com/sc/ooxml/t-ssml_ST_BorderStyle.html
   * color: ARBG color (requires the A, so for example FF006666)
   * }
   * @param {Object} border
   */
  createBorderFormatter(border: BorderInstruction) {
    border = { top: {}, left: {}, right: {}, bottom: {}, diagonal: {}, id: this.borders.length, ...border };
    this.borders.push(border);
    return border;
  }

  /**
   * Registers a font definition and returns it with its generated style ID.
   * Font styles, color is a future goal - at the moment it's looking a bit complicated
   * @param {Object} instructions
   */
  createFontStyle(instructions: ExcelFontStyle) {
    const fontId = this.fonts.length;
    const fontStyle: any = {
      id: fontId,
    };
    if (instructions.bold) {
      fontStyle.bold = true;
    }
    if (instructions.italic) {
      fontStyle.italic = true;
    }
    if (instructions.superscript) {
      fontStyle.vertAlign = 'superscript';
    }
    if (instructions.subscript) {
      fontStyle.vertAlign = 'subscript';
    }
    if (instructions.underline) {
      if (
        typeof instructions.underline === 'string' &&
        ['double', 'singleAccounting', 'doubleAccounting'].includes(instructions.underline)
      ) {
        fontStyle.underline = instructions.underline;
      } else {
        fontStyle.underline = true;
      }
    }
    if (instructions.strike) {
      fontStyle.strike = true;
    }
    if (instructions.outline) {
      fontStyle.outline = true;
    }
    if (instructions.shadow) {
      fontStyle.shadow = true;
    }
    if (instructions.size) {
      fontStyle.size = instructions.size;
    }
    if (instructions.color) {
      fontStyle.color = instructions.color;
    }
    if (instructions.fontName) {
      fontStyle.fontName = instructions.fontName;
    }
    this.fonts.push(fontStyle);
    return fontStyle;
  }

  private exportCollection<T>(doc: XMLDOM, name: string, values: T[], exportItem: (doc: XMLDOM, value: T) => XMLNode) {
    const collection = Util.createElement(doc, name, [['count', values.length]]);
    for (const value of values) {
      collection.appendChild(exportItem.call(this, doc, value));
    }
    return collection;
  }

  /** Creates the OOXML borders collection. */
  exportBorders(doc: XMLDOM) {
    return this.exportCollection(doc, 'borders', this.borders, this.exportBorder);
  }

  /** Creates an OOXML border element from one border definition. */
  exportBorder(doc: XMLDOM, data: any) {
    const border = doc.createElement('border');
    const borderGenerator = (name: string) => {
      const b = doc.createElement(name);
      if (data[name].style) {
        b.setAttribute('style', data[name].style);
      }
      if (data[name].color) {
        b.appendChild(this.exportColor(doc, data[name].color));
      }
      return b;
    };
    border.appendChild(borderGenerator('left'));
    border.appendChild(borderGenerator('right'));
    border.appendChild(borderGenerator('top'));
    border.appendChild(borderGenerator('bottom'));
    border.appendChild(borderGenerator('diagonal'));
    return border;
  }

  /** Creates an OOXML color element from an RGB, theme, tint, or automatic color. */
  exportColor(doc: XMLDOM, color: any) {
    const colorEl = doc.createElement('color');
    if (isString(color)) {
      colorEl.setAttribute('rgb', color);
      return colorEl;
    }

    if (color.tint !== undefined) {
      colorEl.setAttribute('tint', color.tint);
    }
    if (color.auto !== undefined) {
      colorEl.setAttribute('auto', String(!!color.auto));
    }
    if (color.theme !== undefined) {
      colorEl.setAttribute('theme', color.theme);
    }

    return colorEl;
  }

  /** Creates the OOXML cell formats collection. */
  exportMasterCellFormats(doc: XMLDOM) {
    return this.exportCollection(doc, 'cellXfs', this.masterCellFormats, this.exportCellFormatElement);
  }

  /** Creates the OOXML base cell styles collection. */
  exportMasterCellStyles(doc: XMLDOM) {
    return this.exportCollection(doc, 'cellStyleXfs', this.masterCellStyles, this.exportCellFormatElement);
  }

  /** Creates an OOXML format element from cell style instructions. */
  exportCellFormatElement(doc: XMLDOM, styleInstructions: ExcelStyleInstruction) {
    const xf = doc.createElement('xf');
    const allowed = [
      'applyAlignment',
      'applyBorder',
      'applyFill',
      'applyFont',
      'applyNumberFormat',
      'applyProtection',
      'borderId',
      'fillId',
      'fontId',
      'numFmtId',
      'pivotButton',
      'quotePrefix',
      'xfId',
    ];

    const attributes: any = Object.keys(styleInstructions).filter(key => allowed.indexOf(key) !== -1);
    if (styleInstructions.alignment) {
      const alignmentData = styleInstructions.alignment;
      xf.appendChild(this.exportAlignment(doc, alignmentData));
    }
    if (styleInstructions.protection) {
      xf.appendChild(this.exportProtection(doc, styleInstructions.protection));
      xf.setAttribute('applyProtection', '1');
    }
    let a = attributes.length;
    while (a--) {
      xf.setAttribute(attributes[a], styleInstructions[attributes[a] as keyof ExcelStyleInstruction]);
    }
    if (styleInstructions.fillId) {
      xf.setAttribute('applyFill', '1');
    }
    if (styleInstructions.fontId) {
      xf.setAttribute('applyFont', '1');
    }
    if (styleInstructions.borderId) {
      xf.setAttribute('applyBorder', '1');
    }
    if (styleInstructions.alignment) {
      xf.setAttribute('applyAlignment', '1');
    }
    if (styleInstructions.numFmtId) {
      xf.setAttribute('applyNumberFormat', '1');
    }
    if (styleInstructions.numFmtId !== undefined && styleInstructions.xfId === undefined) {
      xf.setAttribute('xfId', '0');
    }
    return xf;
  }

  /** Creates an OOXML alignment element from the supplied alignment properties. */
  exportAlignment(doc: XMLDOM, alignmentData: any) {
    const alignment = doc.createElement('alignment');
    const someKeys = Object.keys(alignmentData);
    for (let i = 0, l = someKeys.length; i < l; i++) {
      alignment.setAttribute(someKeys[i], alignmentData[someKeys[i]]);
    }
    return alignment;
  }

  /** Creates the OOXML fonts collection. */
  exportFonts(doc: XMLDOM) {
    return this.exportCollection(doc, 'fonts', this.fonts, this.exportFont);
  }

  /** Creates an OOXML font element from one font definition. */
  exportFont(doc: XMLDOM, fd: any) {
    const font = doc.createElement('font');
    if (fd.size) {
      const size = doc.createElement('sz');
      size.setAttribute('val', fd.size);
      font.appendChild(size);
    }

    if (fd.fontName) {
      const fontName = doc.createElement('name');
      fontName.setAttribute('val', fd.fontName);
      font.appendChild(fontName);
    }

    if (fd.bold) {
      font.appendChild(doc.createElement('b'));
    }
    if (fd.italic) {
      font.appendChild(doc.createElement('i'));
    }
    if (fd.vertAlign) {
      const vertAlign = doc.createElement('vertAlign');
      vertAlign.setAttribute('val', fd.vertAlign);
      font.appendChild(vertAlign);
    }
    if (fd.underline) {
      const u = doc.createElement('u');
      if (fd.underline !== true) {
        u.setAttribute('val', fd.underline);
      }
      font.appendChild(u);
    }
    if (fd.strike) {
      font.appendChild(doc.createElement('strike'));
    }
    if (fd.shadow) {
      font.appendChild(doc.createElement('shadow'));
    }
    if (fd.outline) {
      font.appendChild(doc.createElement('outline'));
    }
    if (fd.color) {
      font.appendChild(this.exportColor(doc, fd.color));
    }
    return font;
  }

  /** Creates the OOXML fills collection. */
  exportFills(doc: XMLDOM) {
    return this.exportCollection(doc, 'fills', this.fills, this.exportFill);
  }

  /** Creates an OOXML fill element from one pattern or gradient definition. */
  exportFill(doc: XMLDOM, fd: any) {
    let fillDef: any;
    const fill = doc.createElement('fill');
    if (fd.type === 'pattern') {
      fillDef = this.exportPatternFill(doc, fd);
      fill.appendChild(fillDef);
    } else if (fd.type === 'gradient') {
      fillDef = this.exportGradientFill(doc, fd);
      fill.appendChild(fillDef);
    }
    return fill;
  }

  /** Creates an OOXML gradient fill from its direction and color stops. */
  exportGradientFill(doc: XMLDOM, data: any) {
    const fillDef = doc.createElement('gradientFill');
    if (data.degree) {
      fillDef.setAttribute('degree', data.degree);
    } else if (data.left) {
      fillDef.setAttribute('left', data.left);
      fillDef.setAttribute('right', data.right);
      fillDef.setAttribute('top', data.top);
      fillDef.setAttribute('bottom', data.bottom);
    }
    const start = doc.createElement('stop');
    start.setAttribute('position', data.start.pureAt || 0);
    const startColor = doc.createElement('color');
    if (typeof data.start === 'string' || data.start.color) {
      startColor.setAttribute('rgb', data.start.color || data.start);
    } else if (data.start.theme) {
      startColor.setAttribute('theme', data.start.theme);
    }

    const end = doc.createElement('stop');
    const endColor = doc.createElement('color');
    end.setAttribute('position', data.end.pureAt || 1);
    if (typeof data.start === 'string' || data.end.color) {
      endColor.setAttribute('rgb', data.end.color || data.end);
    } else if (data.end.theme) {
      endColor.setAttribute('theme', data.end.theme);
    }
    start.appendChild(startColor);
    end.appendChild(endColor);
    fillDef.appendChild(start);
    fillDef.appendChild(end);
    return fillDef;
  }

  /**
   * Creates an OOXML pattern fill from its pattern type and foreground/background colors.
   * Pattern types: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_PatternType.html
   * @param {XMLDoc} doc
   * @param {Object} data
   */
  exportPatternFill(doc: XMLDOM, data: any) {
    const fillDef = Util.createElement(doc, 'patternFill', [['patternType', data.patternType]]);
    if (!data.bgColor) {
      data.bgColor = 'FFFFFFFF';
    }
    if (!data.fgColor) {
      data.fgColor = 'FFFFFFFF';
    }

    const bgColor = doc.createElement('bgColor');
    if (isString(data.bgColor)) {
      bgColor.setAttribute('rgb', data.bgColor);
    } else {
      if (data.bgColor.theme) {
        bgColor.setAttribute('theme', data.bgColor.theme);
      } else {
        bgColor.setAttribute('rgb', data.bgColor.rbg);
      }
    }

    const fgColor = doc.createElement('fgColor');
    if (isString(data.fgColor)) {
      fgColor.setAttribute('rgb', data.fgColor);
    } else {
      if (data.fgColor.theme) {
        fgColor.setAttribute('theme', data.fgColor.theme);
      } else {
        fgColor.setAttribute('rgb', data.fgColor.rbg);
      }
    }
    fillDef.appendChild(fgColor);
    fillDef.appendChild(bgColor);
    return fillDef;
  }

  /** Creates the OOXML custom number formats collection. */
  exportNumberFormatters(doc: XMLDOM) {
    return this.exportCollection(doc, 'numFmts', this.numberFormatters, this.exportNumberFormatter);
  }

  /** Creates an OOXML number format element. */
  exportNumberFormatter(doc: XMLDOM, fd: any) {
    const numFmt = doc.createElement('numFmt');
    numFmt.setAttribute('numFmtId', fd.id);
    numFmt.setAttribute('formatCode', fd.formatCode);
    return numFmt;
  }

  /** Creates the OOXML named cell styles collection. */
  exportCellStyles(doc: XMLDOM) {
    const cellStyles = doc.createElement('cellStyles');
    cellStyles.setAttribute('count', String(this.cellStyles.length));

    for (let i = 0, l = this.cellStyles.length; i < l; i++) {
      const style: any = this.cellStyles[i];
      delete style.id; // Remove internal id
      const record = Util.createElement(doc, 'cellStyle');
      cellStyles.appendChild(record);
      const attributes = Object.keys(style);
      let a = attributes.length;
      while (a--) {
        record.setAttribute(attributes[a], style[attributes[a]]);
      }
    }

    return cellStyles;
  }

  /** Creates the OOXML differential styles collection. */
  exportDifferentialStyles(doc: XMLDOM) {
    return this.exportCollection(doc, 'dxfs', this.differentialStyles, this.exportDFX);
  }

  /** Creates an OOXML differential format element from one style definition. */
  exportDFX(doc: XMLDOM, style: any) {
    const dxf = doc.createElement('dxf');
    if (style.font) {
      dxf.appendChild(this.exportFont(doc, style.font));
    }
    if (style.fill) {
      dxf.appendChild(this.exportFill(doc, style.fill));
    }
    if (style.border) {
      dxf.appendChild(this.exportBorder(doc, style.border));
    }
    if (style.numFmt) {
      dxf.appendChild(this.exportNumberFormatter(doc, style.numFmt));
    }
    if (style.alignment) {
      dxf.appendChild(this.exportAlignment(doc, style.alignment));
    }
    return dxf;
  }

  /** Creates the OOXML table styles collection. */
  exportTableStyles(doc: XMLDOM) {
    const tableStyles = doc.createElement('tableStyles');
    tableStyles.setAttribute('count', String(this.tableStyles.length));
    if (this.defaultTableStyle) {
      tableStyles.setAttribute('defaultTableStyle', String(this.defaultTableStyle));
    }
    for (let i = 0, l = this.tableStyles.length; i < l; i++) {
      tableStyles.appendChild(this.exportTableStyle(doc, this.tableStyles[i]));
    }
    return tableStyles;
  }

  /** Creates an OOXML table style and its differential format references. */
  exportTableStyle(doc: XMLDOM, style: { name: string; wholeTable?: number; headerRow?: number }) {
    const tableStyle = doc.createElement('tableStyle');
    tableStyle.setAttribute('name', style.name);
    tableStyle.setAttribute('pivot', String(0));
    let i = 0;

    Object.entries(style).forEach(([key, value]) => {
      if (key === 'name') {
        return;
      }
      i++;
      const styleEl = doc.createElement('tableStyleElement');
      styleEl.setAttribute('type', key);
      styleEl.setAttribute('dxfId', value);
      tableStyle.appendChild(styleEl);
    });
    tableStyle.setAttribute('count', String(i));
    return tableStyle;
  }

  /** Creates an OOXML protection element from the supplied properties. */
  exportProtection(doc: XMLDOM, protectionData: any) {
    const node = doc.createElement('protection');
    // eslint-disable-next-line no-restricted-syntax
    for (const k in protectionData) {
      if (k in protectionData) {
        node.setAttribute(k, protectionData[k]);
      }
    }
    return node;
  }

  /** Serializes all registered cell, number, border, fill, and table styles. */
  toXML() {
    const doc = Util.createXmlDoc(Util.schemas.spreadsheetml, 'styleSheet');
    const styleSheet = doc.documentElement;
    styleSheet.appendChild(this.exportNumberFormatters(doc));
    styleSheet.appendChild(this.exportFonts(doc));
    styleSheet.appendChild(this.exportFills(doc));
    styleSheet.appendChild(this.exportBorders(doc));
    styleSheet.appendChild(this.exportMasterCellStyles(doc));
    styleSheet.appendChild(this.exportMasterCellFormats(doc));
    styleSheet.appendChild(this.exportCellStyles(doc));
    styleSheet.appendChild(this.exportDifferentialStyles(doc));
    if (this.tableStyles.length) {
      styleSheet.appendChild(this.exportTableStyles(doc));
    }
    return doc;
  }
}
