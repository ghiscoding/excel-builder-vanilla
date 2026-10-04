import { Util } from '../Util.js';
import type { XMLDOM } from '../XMLDOM.js';
import type { AnchorOption } from './Drawing.js';

/**
 * Anchors drawing content to one worksheet cell with a fixed size.
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
      this.setDimensions(config.width || 0, config.height || 0);
    }
  }

  /** Sets the anchor cell and optional offsets within that cell. */
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

  /** Sets the anchored drawing's width and height in EMUs. */
  setDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  /** Serializes the cell position, dimensions, drawing content, and client data. */
  toXML(xmlDoc: XMLDOM, content: any) {
    const root = Util.createElement(xmlDoc, 'xdr:oneCellAnchor');
    root.appendChild(Util.createAnchorPosition(xmlDoc, 'xdr:from', this));

    const dimensions = Util.createElement(xmlDoc, 'xdr:ext');
    dimensions.setAttribute('cx', String(this.width));
    dimensions.setAttribute('cy', String(this.height));
    root.appendChild(dimensions);
    root.appendChild(content);

    root.appendChild(Util.createElement(xmlDoc, 'xdr:clientData'));
    return root;
  }
}
