import type { AnchorOption } from './Drawing.js';
import { Util } from '../Util.js';
import type { XMLDOM } from '../XMLDOM.js';

/**
 *
 * @param {Object} config
 * @param {Number} config.x X offset in EMU's
 * @param {Number} config.y Y offset in EMU's
 * @param {Number} config.width Width in EMU's
 * @param {Number} config.height Height in EMU's
 * @constructor
 */
export class AbsoluteAnchor {
  x: number | null = null;
  y: number | null = null;
  width: number | null = null;
  height: number | null = null;

  constructor(config: AnchorOption) {
    if (config) {
      this.setPos(config.x, config.y);
      this.setDimensions(config.width, config.height);
    }
  }

  /**
   * Sets the X and Y offsets.
   *
   * @param {Number} x
   * @param {Number} y
   * @returns {undefined}
   */
  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets the width and height of the image.
   *
   * @param {Number} width
   * @param {Number} height
   * @returns {undefined}
   */
  setDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  toXML(xmlDoc: XMLDOM, content: any) {
    const root = Util.createElement(xmlDoc, 'xdr:absoluteAnchor');
    const pos = Util.createElement(xmlDoc, 'xdr:pos');
    pos.setAttribute('x', this.x);
    pos.setAttribute('y', this.y);
    root.appendChild(pos);

    const dimensions = Util.createElement(xmlDoc, 'xdr:ext');
    dimensions.setAttribute('cx', this.width);
    dimensions.setAttribute('cy', this.height);
    root.appendChild(dimensions);

    root.appendChild(content);

    root.appendChild(Util.createElement(xmlDoc, 'xdr:clientData'));
    return root;
  }
}
