import { XMLDOM } from '../XMLDOM';
/**
 *
 * @param {Object} config
 * @param {Number} config.x The cell column number that the top left of the picture will start in
 * @param {Number} config.y The cell row number that the top left of the picture will start in
 * @param {Number} config.width Width in EMU's
 * @param {Number} config.height Height in EMU's
 * @constructor
 */
export declare class OneCellAnchor {
    x: number | null;
    y: number | null;
    xOff: boolean | null;
    yOff: boolean | null;
    width: number | null;
    height: number | null;
    constructor(config: any);
    setPos(x: number, y: number, xOff?: boolean, yOff?: boolean): void;
    setDimensions(width: number, height: number): void;
    toXML(xmlDoc: XMLDOM, content: any): import('..').XMLNode;
}
//# sourceMappingURL=OneCellAnchor.d.ts.map