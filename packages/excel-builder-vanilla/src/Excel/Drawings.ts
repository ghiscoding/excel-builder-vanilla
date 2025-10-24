import { uniqueId } from '../utilities/uniqueId.js';
import { Chart } from './Drawing/Chart.js';
import type { Drawing } from './Drawing/Drawing.js';
import { Picture } from './Drawing/Picture.js';
import { RelationshipManager } from './RelationshipManager.js';
import { Util } from './Util.js';

/**
 * @module Excel/Drawings
 */

export class Drawings {
  drawings: Drawing[] = [];
  relations = new RelationshipManager();
  id = uniqueId('Drawings');

  /**
   * Adds a drawing (more likely a subclass of a Drawing) to the 'Drawings' for a particular worksheet.
   *
   * @param {Drawing} drawing
   * @returns {undefined}
   */
  addDrawing(drawing: Drawing) {
    this.drawings.push(drawing);
  }

  getCount() {
    return this.drawings.length;
  }

  toXML() {
    const doc = Util.createXmlDoc(Util.schemas.spreadsheetDrawing, 'xdr:wsDr');
    const drawings = doc.documentElement;
    drawings.setAttribute('xmlns:a', Util.schemas.drawing);
    drawings.setAttribute('xmlns:r', Util.schemas.relationships);
    drawings.setAttribute('xmlns:xdr', Util.schemas.spreadsheetDrawing);

    for (let i = 0, l = this.drawings.length; i < l; i++) {
      const item = this.drawings[i];
      if (item instanceof Picture) {
        let rId = this.relations.getRelationshipId(item.getMediaData());
        if (!rId) {
          rId = this.relations.addRelation(item.getMediaData(), item.getMediaType());
        }
        item.setRelationshipId(rId);
        drawings.appendChild(item.toXML(doc));
      } else if (item instanceof Chart) {
        let rId = this.relations.getRelationshipId(item);
        if (!rId) {
          rId = this.relations.addRelation(item, item.getMediaType());
        }
        item.setRelationshipId(rId);
        drawings.appendChild(item.toXML(doc));
      }
    }
    return doc;
  }
}
