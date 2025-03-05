import type { AnchorOption } from './Drawing.js';
import { Util } from '../Util.js';
import type { XMLDOM } from '../XMLDOM.js';

/**
 *
 * @param {Object} config
 * @param {Number} config.x The cell column number that the top left of the picture will start in
 * @param {Number} config.y The cell row number that the top left of the picture will start in
 * @param {Number} config.width Width in EMU's
 * @param {Number} config.height Height in EMU's
 * @constructor
 */
export class OneCellAnchor {
  x: number | null = null;
  y: number | null = null;
  xOff: boolean | null = null;
  yOff: boolean | null = null;
  width: number | null = null;
  height: number | null = null;

  constructor(config: AnchorOption) {
    if (config) {
      this.setPos(config.x, config.y, config.xOff, config.yOff);
      this.setDimensions(config.width, config.height);
    }
  }

  setPos(x: number, y: number, xOff?: boolean, yOff?: boolean) {
    this.x = x;
    this.y = y;
    if (xOff !== undefined) {
      this.xOff = xOff;
    }
    if (yOff !== undefined) {
      this.yOff = yOff;
    }
  }

  setDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  toXML(xmlDoc: XMLDOM, content: any) {
    const root = Util.createElement(xmlDoc, 'xdr:oneCellAnchor');
    const from = Util.createElement(xmlDoc, 'xdr:from');
    const fromCol = Util.createElement(xmlDoc, 'xdr:col');
    fromCol.appendChild(xmlDoc.createTextNode(String(this.x)));
    const fromColOff = Util.createElement(xmlDoc, 'xdr:colOff');
    fromColOff.appendChild(xmlDoc.createTextNode(String(this.xOff || 0)));
    const fromRow = Util.createElement(xmlDoc, 'xdr:row');
    fromRow.appendChild(xmlDoc.createTextNode(String(this.y)));
    const fromRowOff = Util.createElement(xmlDoc, 'xdr:rowOff');
    fromRowOff.appendChild(xmlDoc.createTextNode(String(this.yOff || 0)));
    from.appendChild(fromCol);
    from.appendChild(fromColOff);
    from.appendChild(fromRow);
    from.appendChild(fromRowOff);

    root.appendChild(from);

    const dimensions = Util.createElement(xmlDoc, 'xdr:ext');
    dimensions.setAttribute('cx', String(this.width));
    dimensions.setAttribute('cy', String(this.height));
    root.appendChild(dimensions);
    root.appendChild(content);

    root.appendChild(Util.createElement(xmlDoc, 'xdr:clientData'));
    return root;
  }
}
