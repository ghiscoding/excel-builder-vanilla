import { Util } from '../Util.js';
import type { XMLDOM } from '../XMLDOM.js';
import type { DualAnchorOption } from './Drawing.js';

export class TwoCellAnchor {
  from: any = { xOff: 0, yOff: 0 };
  to: any = { xOff: 0, yOff: 0 };

  constructor(config: DualAnchorOption) {
    if (config) {
      this.setFrom(config.from.x, config.from.y, config.from.xOff, config.from.yOff);
      this.setTo(config.to.x, config.to.y, config.to.xOff, config.to.yOff);
    }
  }

  setFrom(x: number, y: number, xOff?: boolean, yOff?: boolean) {
    this.from.x = x;
    this.from.y = y;
    if (xOff !== undefined) {
      this.from.xOff = xOff;
    }
    if (yOff !== undefined) {
      this.from.yOff = yOff;
    }
  }

  setTo(x: number, y: number, xOff?: boolean, yOff?: boolean) {
    this.to.x = x;
    this.to.y = y;
    if (xOff !== undefined) {
      this.to.xOff = xOff;
    }
    if (yOff !== undefined) {
      this.to.yOff = yOff;
    }
  }

  toXML(xmlDoc: XMLDOM, content: any) {
    const root = Util.createElement(xmlDoc, 'xdr:twoCellAnchor');

    root.appendChild(Util.createAnchorPosition(xmlDoc, 'xdr:from', this.from));
    root.appendChild(Util.createAnchorPosition(xmlDoc, 'xdr:to', this.to));

    root.appendChild(content);

    root.appendChild(Util.createElement(xmlDoc, 'xdr:clientData'));
    return root;
  }
}
