import { uniqueId } from '../../utilities/uniqueId.js';
import { AbsoluteAnchor } from './AbsoluteAnchor.js';
import { OneCellAnchor } from './OneCellAnchor.js';
import { TwoCellAnchor } from './TwoCellAnchor.js';
// import { Picture } from './Picture.js';

export interface AnchorOption {
  /** X offset in EMUs (English Metric Units) */
  x: number;
  /** Y offset in EMUs (English Metric Units) */
  y: number;
  /** Optional: X offset as boolean (for cell anchoring) */
  xOff?: boolean;
  /** Optional: Y offset as boolean (for cell anchoring) */
  yOff?: boolean;
  /** Width in EMUs */
  width?: number;
  /** Height in EMUs */
  height?: number;
  /** Reference to parent Drawing instance */
  drawing?: Drawing;
}

export interface DualAnchorOption {
  /** Ending anchor position (AnchorOption) */
  to: AnchorOption;
  /** Starting anchor position (AnchorOption) */
  from: AnchorOption;
  /** Reference to parent Drawing instance */
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
  createAnchor(
    type: 'absoluteAnchor' | 'oneCellAnchor' | 'twoCellAnchor',
    config: Partial<AnchorOption | DualAnchorOption>,
  ): AbsoluteAnchor | OneCellAnchor | TwoCellAnchor {
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
