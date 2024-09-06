import { AbsoluteAnchor } from './AbsoluteAnchor';
import { Chart } from './Chart';
import { OneCellAnchor } from './OneCellAnchor';
import { TwoCellAnchor } from './TwoCellAnchor';
/**
 * This is mostly a global spot where all of the relationship managers can get and set
 * path information from/to.
 * @module Excel/Drawing
 */
export declare class Drawing {
    anchor: any;
    id: string;
    get AbsoluteAnchor(): typeof AbsoluteAnchor;
    get Chart(): typeof Chart;
    get OneCellAnchor(): typeof OneCellAnchor;
    get TwoCellAnchor(): typeof TwoCellAnchor;
    /**
     *
     * @param {String} type Can be 'absoluteAnchor', 'oneCellAnchor', or 'twoCellAnchor'.
     * @param {Object} config Shorthand - pass the created anchor coords that can normally be used to construct it.
     * @returns {Anchor}
     */
    createAnchor(type: string, config: any): any;
}
//# sourceMappingURL=Drawing.d.ts.map