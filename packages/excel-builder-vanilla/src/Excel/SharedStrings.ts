import { uniqueId } from '../utilities';
import { Util } from './Util';

/**
 * @module Excel/SharedStrings
 */
export class SharedStrings {
  strings: { [key: string]: number } = {};
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
    this.stringArray.reverse();
    let l = this.stringArray.length;
    sharedStringTable.setAttribute('count', l);
    sharedStringTable.setAttribute('uniqueCount', l);

    const template = doc.createElement('si');
    const templateValue = doc.createElement('t');
    templateValue.appendChild(doc.createTextNode('--placeholder--'));
    template.appendChild(templateValue);
    const strings = this.stringArray;

    while (l--) {
      const clone = template.cloneNode(true);
      clone.firstChild!.firstChild!.nodeValue = strings[l];
      sharedStringTable.appendChild(clone);
    }

    return doc;
  }
}
