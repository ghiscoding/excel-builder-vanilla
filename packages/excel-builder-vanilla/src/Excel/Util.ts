import { isPlainObject } from '../utilities/isTypeOf';
import { XMLDOM, type XMLNode } from './XMLDOM';

/**
 * @module Excel/Util
 */

export class Util {
  static _idSpaces: { [space: string]: number } = {};

  /**
   * Returns a number based on a namespace. So, running with 'Picture' will return 1. Run again, you will get 2. Run with 'Foo', you'll get 1.
   * @param {String} space
   * @returns {Number}
   */
  static uniqueId(space: string) {
    if (!Util._idSpaces[space]) {
      Util._idSpaces[space] = 1;
    }
    return Util._idSpaces[space]++;
  }

  /**
   * Attempts to create an XML document. After some investigation, using the 'fake' document
   * is significantly faster than creating an actual XML document, so we're going to go with
   * that. Besides, it just makes it easier to port to node.
   *
   * Takes a namespace to start the xml file in, as well as the root element
   * of the xml file.
   *
   * @param {type} ns
   * @param {type} base
   * @returns {@new;XMLDOM}
   */
  static createXmlDoc(ns: string, base: string) {
    return new XMLDOM(ns || null, base);
  }

  /**
   * Creates an xml node (element). Used to simplify some calls, as IE is
   * very particular about namespaces and such.
   *
   * @param {XMLDOM} doc An xml document (actual DOM or fake DOM, not a string)
   * @param {type} name The name of the element
   * @param {type} attributes
   * @returns {XML Node}
   */
  static createElement(doc: XMLDOM, name: string, attributes?: any) {
    const el = doc.createElement(name);
    attributes = attributes || [];
    let i = attributes.length;
    while (i--) {
      el.setAttribute(attributes[i][0], attributes[i][1]);
    }
    return el;
  }

  /**
   * This is sort of slow, but it's a huge convenience method for the code. It probably shouldn't be used
   * in high repetition areas.
   *
   * @param {XMLDoc} doc
   * @param {Object} attrs
   */
  static setAttributesOnDoc(doc: XMLNode, attrs: { [key: string]: any }) {
    for (let [k, v] of Object.entries(attrs)) {
      if (isPlainObject(v)) {
        if (v.v !== null && v.v !== undefined) {
          switch (v.type) {
            case Boolean:
              v = v.v ? '1' : '0';
              break;
          }
        } else {
          v = null;
        }
      }
      if (v !== null && v !== undefined) {
        doc.setAttribute(k, v);
      }
    }
  }

  static LETTER_REFS: any = {};

  static positionToLetterRef(x: number, y: number | string) {
    let digit = 1;
    let index: number;
    let num = x;
    let string = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (Util.LETTER_REFS[x]) {
      return Util.LETTER_REFS[x].concat(y);
    }
    while (num > 0) {
      num -= Math.pow(26, digit - 1);
      index = num % Math.pow(26, digit);
      num -= index;
      index = index / Math.pow(26, digit - 1);
      string = alphabet.charAt(index) + string;
      digit += 1;
    }
    Util.LETTER_REFS[x] = string;
    return string.concat(String(y));
  }

  static schemas = {
    worksheet: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet',
    sharedStrings: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings',
    stylesheet: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles',
    relationships: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    relationshipPackage: 'http://schemas.openxmlformats.org/package/2006/relationships',
    contentTypes: 'http://schemas.openxmlformats.org/package/2006/content-types',
    spreadsheetml: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
    markupCompat: 'http://schemas.openxmlformats.org/markup-compatibility/2006',
    x14ac: 'http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac',
    officeDocument: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument',
    package: 'http://schemas.openxmlformats.org/package/2006/relationships',
    table: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/table',
    spreadsheetDrawing: 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing',
    drawing: 'http://schemas.openxmlformats.org/drawingml/2006/main',
    drawingRelationship: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing',
    image: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
    chart: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart',
    hyperlink: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink',
  };
}
