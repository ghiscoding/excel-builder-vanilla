import { htmlEscape } from '../utilities/escape.js';
import { uniqueId } from '../utilities/uniqueId.js';
import { Util } from './Util.js';
import { XMLDOM } from './XMLDOM.js';

/**
 * @module Excel/SharedStrings
 */
export class SharedStrings {
  strings: { [key: string]: number } = Object.create(null);
  stringArray: string[] = [];
  id = uniqueId('SharedStrings');

  /**
   * Adds a string to the shared string file, and returns the ID of the
   * string which can be used to reference it in worksheets.
   *
   * @param str {String}
   * @return int
   */
  addString(str: string) {
    str = String(str);
    if (Object.prototype.hasOwnProperty.call(this.strings, str)) return this.strings[str];
    this.strings[str] = this.stringArray.length;
    this.stringArray[this.stringArray.length] = str;
    return this.strings[str];
  }

  exportData() {
    return this.strings;
  }

  toXML() {
    const doc = Util.createXmlDoc(Util.schemas.spreadsheetml, 'sst');
    const sharedStringTable = doc.documentElement;
    const l = this.stringArray.length;
    sharedStringTable.setAttribute('count', l);
    sharedStringTable.setAttribute('uniqueCount', l);

    const template = doc.createElement('si');
    const templateValue = doc.createElement('t');
    templateValue.appendChild(doc.createTextNode('--placeholder--'));
    template.appendChild(templateValue);
    const strings = this.stringArray;

    for (let i = 0; i < l; i++) {
      const clone = template.cloneNode(true);
      if (typeof strings[i] === 'string' && /\s/u.test(strings[i])) {
        clone.firstChild!.setAttribute('xml:space', 'preserve');
      }
      clone.firstChild!.firstChild!.nodeValue = strings[i];
      sharedStringTable.appendChild(clone);
    }

    return doc;
  }

  /** Serialize without allocating an XML node tree for every unique string. */
  *getXmlChunks(chunkSize = 32768) {
    const header = `${XMLDOM.declaration}\n<sst xmlns="${Util.schemas.spreadsheetml}" count="${this.stringArray.length}" uniqueCount="${this.stringArray.length}"`;
    if (!this.stringArray.length) {
      yield `${header}/>`;
      return;
    }
    yield `${header}>`;
    let chunk = '';
    for (const value of this.stringArray) {
      const space = /\s/u.test(value) ? ' xml:space="preserve"' : '';
      const content = htmlEscape(value);
      chunk += `<si><t${space}${content ? `>${content}</t>` : '/>'}</si>`;
      if (chunk.length >= chunkSize) {
        yield chunk;
        chunk = '';
      }
    }
    if (chunk) yield chunk;
    yield '</sst>';
  }
}
