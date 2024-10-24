import { uniqueId } from '../../utilities/uniqueId.js';
import { AbsoluteAnchor } from './AbsoluteAnchor.js';
import { Chart } from './Chart.js';
import { OneCellAnchor } from './OneCellAnchor.js';
import { TwoCellAnchor } from './TwoCellAnchor.js';
// import { Picture } from './Picture.js';

/**
 * This is mostly a global spot where all of the relationship managers can get and set
 * path information from/to.
 * @module Excel/Drawing
 */
export class Drawing {
  anchor: any;
  id = uniqueId('Drawing');

  get AbsoluteAnchor() {
    return AbsoluteAnchor;
  }
  get Chart() {
    return Chart;
  }
  get OneCellAnchor() {
    return OneCellAnchor;
  }
  // get Picture() {
  //   return Picture;
  // }
  get TwoCellAnchor() {
    return TwoCellAnchor;
  }

  /**
   *
   * @param {String} type Can be 'absoluteAnchor', 'oneCellAnchor', or 'twoCellAnchor'.
   * @param {Object} config Shorthand - pass the created anchor coords that can normally be used to construct it.
   * @returns {Anchor}
   */
  createAnchor(type: string, config: any) {
    config = config || {};
    config.drawing = this;
    switch (type) {
      case 'absoluteAnchor':
        this.anchor = new AbsoluteAnchor(config);
        break;
      case 'oneCellAnchor':
        this.anchor = new OneCellAnchor(config);
        break;
      case 'twoCellAnchor':
        this.anchor = new TwoCellAnchor(config);
        break;
    }
    return this.anchor;
  }
}
