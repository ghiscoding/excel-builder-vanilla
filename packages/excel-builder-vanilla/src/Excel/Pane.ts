/**
 * @module Excel/Pane
 *
 * https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.pane%28v=office.14%29.aspx
 */

import type { XMLDOM } from './XMLDOM';

export class Pane {
  /*
    Possible Values:
     null
     split	Split
     frozen	Frozen
     frozenSplit	Frozen Split
     http://www.datypic.com/sc/ooxml/t-ssml_ST_PaneState.html
     */
  state: null | 'split' | 'frozen' | 'frozenSplit' = null;
  xSplit: number | null = null;
  ySplit: number | null = null;
  activePane = 'bottomRight';
  topLeftCell: number | string | null = null;
  _freezePane!: { xSplit: number; ySplit: number; cell: number };

  freezePane(column: number, row: number, cell: number) {
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
