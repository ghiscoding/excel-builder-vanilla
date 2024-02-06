import { Util } from '../Util';
import { XMLDOM } from '../XMLDOM';

export class TwoCellAnchor {
  from: any = { xOff: 0, yOff: 0 };
  to: any = { xOff: 0, yOff: 0 };

  constructor(config: any) {
    if (config) {
      this.setFrom(config.from.x, config.from.y, config.to.xOff, config.to.yOff);
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
      this.from.yOff = xOff;
    }
  }

  setTo(x: number, y: number, xOff?: boolean, yOff?: boolean) {
    this.to.x = x;
    this.to.y = y;
    if (xOff !== undefined) {
      this.to.xOff = xOff;
    }
    if (yOff !== undefined) {
      this.to.yOff = xOff;
    }
  }

  toXML(xmlDoc: XMLDOM, content: any) {
    const root = Util.createElement(xmlDoc, 'xdr:twoCellAnchor');

    const from = Util.createElement(xmlDoc, 'xdr:from');
    const fromCol = Util.createElement(xmlDoc, 'xdr:col');
    fromCol.appendChild(xmlDoc.createTextNode(this.from.x));
    const fromColOff = Util.createElement(xmlDoc, 'xdr:colOff');
    fromColOff.appendChild(xmlDoc.createTextNode(this.from.xOff));
    const fromRow = Util.createElement(xmlDoc, 'xdr:row');
    fromRow.appendChild(xmlDoc.createTextNode(this.from.y));
    const fromRowOff = Util.createElement(xmlDoc, 'xdr:rowOff');
    fromRowOff.appendChild(xmlDoc.createTextNode(this.from.yOff));

    from.appendChild(fromCol);
    from.appendChild(fromColOff);
    from.appendChild(fromRow);
    from.appendChild(fromRowOff);

    const to = Util.createElement(xmlDoc, 'xdr:to');
    const toCol = Util.createElement(xmlDoc, 'xdr:col');
    toCol.appendChild(xmlDoc.createTextNode(this.to.x));
    const toColOff = Util.createElement(xmlDoc, 'xdr:colOff');
    toColOff.appendChild(xmlDoc.createTextNode(this.from.xOff));
    const toRow = Util.createElement(xmlDoc, 'xdr:row');
    toRow.appendChild(xmlDoc.createTextNode(this.to.y));
    const toRowOff = Util.createElement(xmlDoc, 'xdr:rowOff');
    toRowOff.appendChild(xmlDoc.createTextNode(this.from.yOff));

    to.appendChild(toCol);
    to.appendChild(toColOff);
    to.appendChild(toRow);
    to.appendChild(toRowOff);

    root.appendChild(from);
    root.appendChild(to);

    root.appendChild(content);

    root.appendChild(Util.createElement(xmlDoc, 'xdr:clientData'));
    return root;
  }
}
