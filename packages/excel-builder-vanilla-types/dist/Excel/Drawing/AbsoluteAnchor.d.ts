import { XMLDOM } from '../XMLDOM';
/**
 *
 * @param {Object} config
 * @param {Number} config.x X offset in EMU's
 * @param {Number} config.y Y offset in EMU's
 * @param {Number} config.width Width in EMU's
 * @param {Number} config.height Height in EMU's
 * @constructor
 */
export declare class AbsoluteAnchor {
    x: number | null;
    y: number | null;
    width: number | null;
    height: number | null;
    constructor(config: any);
    /**
     * Sets the X and Y offsets.
     *
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    setPos(x: number, y: number): void;
    /**
     * Sets the width and height of the image.
     *
     * @param {Number} width
     * @param {Number} height
     * @returns {undefined}
     */
    setDimensions(width: number, height: number): void;
    toXML(xmlDoc: XMLDOM, content: any): import('..').XMLNode;
}
//# sourceMappingURL=AbsoluteAnchor.d.ts.map