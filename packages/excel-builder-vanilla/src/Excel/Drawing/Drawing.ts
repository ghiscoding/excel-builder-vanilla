import { uniqueId } from '../../utilities/uniqueId.js';
import { AbsoluteAnchor } from './AbsoluteAnchor.js';
import { OneCellAnchor } from './OneCellAnchor.js';
import { TwoCellAnchor } from './TwoCellAnchor.js';
// import { Picture } from './Picture.js';

export interface AnchorOption {
  /** X offset in EMU's */
  x: number;
  /** Y offset in EMU's */
  y: number;
  xOff?: boolean;
  yOff?: boolean;
  /** Width in EMU's */
  height: number;
  /** Height in EMU's */
  width: number;
  drawing?: Drawing;
}

export interface DualAnchorOption {
  to: AnchorOption;
  from: AnchorOption;
  drawing?: Drawing;
}

/**
 * This is mostly a global spot where all of the relationship managers can get and set
 * path information from/to.
 * @module Excel/Drawing
 */
export class Drawing {
  anchor!: AbsoluteAnchor | OneCellAnchor | TwoCellAnchor;
  id = uniqueId('Drawing');

  /**
   *
   * @param {String} type Can be 'absoluteAnchor', 'oneCellAnchor', or 'twoCellAnchor'.
   * @param {Object} config Shorthand - pass the created anchor coords that can normally be used to construct it.
   * @returns {Anchor}
   */
  // TODO: couldn't get function override working, but hopefully in the future
  // createAnchor(type: 'absoluteAnchor', config: AnchorOption): AbsoluteAnchor;
  // createAnchor(type: 'oneCellAnchor', config: AnchorOption): OneCellAnchor;
  // createAnchor(type: 'twoCellAnchor', config: DualAnchorOption): TwoCellAnchor;
  createAnchor(type: 'absoluteAnchor' | 'oneCellAnchor' | 'twoCellAnchor', config: any): AbsoluteAnchor | OneCellAnchor | TwoCellAnchor {
    config ??= {} as AnchorOption | DualAnchorOption;
    config.drawing = this;
    switch (type) {
      case 'absoluteAnchor':
        this.anchor = new AbsoluteAnchor(config as AnchorOption);
        break;
      case 'oneCellAnchor':
        this.anchor = new OneCellAnchor(config as AnchorOption);
        break;
      case 'twoCellAnchor':
        this.anchor = new TwoCellAnchor(config as DualAnchorOption);
        break;
    }
    return this.anchor;
  }
}
