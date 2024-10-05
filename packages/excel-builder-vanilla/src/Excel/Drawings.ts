import { uniqueId } from '../utilities/uniqueId';
import type { Drawing } from './Drawing/Drawing';
import type { Picture } from './Drawing/Picture';
import { RelationshipManager } from './RelationshipManager';
import { Util } from './Util';

/**
 * @module Excel/Drawings
 */

export class Drawings {
  drawings: (Drawing | Picture)[] = [];
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
      let rId = this.relations.getRelationshipId((this.drawings[i] as Picture).getMediaData());
      if (!rId) {
        rId = this.relations.addRelation((this.drawings[i] as Picture).getMediaData(), (this.drawings[i] as Picture).getMediaType()); //chart
      }
      (this.drawings[i] as Picture).setRelationshipId(rId);
      drawings.appendChild((this.drawings[i] as Picture).toXML(doc));
    }
    return doc;
  }
}
