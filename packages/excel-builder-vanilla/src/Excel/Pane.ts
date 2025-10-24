/**
 * @module Excel/Pane
 *
 * https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.pane%28v=office.14%29.aspx
 */

import type { XMLDOM } from './XMLDOM.js';

export class Pane {
  state: null | 'split' | 'frozen' | 'frozenSplit' = null;
  xSplit: number | null = null;
  ySplit: number | null = null;
  activePane = 'bottomRight';
  topLeftCell: number | string | null = null;
  _freezePane!: { xSplit: number; ySplit: number; cell: string };

  freezePane(column: number, row: number, cell: string) {
    this._freezePane = { xSplit: column, ySplit: row, cell };
  }

  exportXML(doc: XMLDOM) {
    const pane = doc.createElement('pane');

    if (this.state !== null) {
      pane.setAttribute('xSplit', this._freezePane.xSplit);
      pane.setAttribute('ySplit', this._freezePane.ySplit);
      pane.setAttribute('topLeftCell', this._freezePane.cell);
      pane.setAttribute('activePane', 'bottomRight');
      pane.setAttribute('state', 'frozen');
    }
    return pane;
  }
}
