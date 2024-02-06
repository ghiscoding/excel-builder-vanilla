import { Util } from './Util';
import { RelationshipManager } from './RelationshipManager';
import { uniqueId } from '../utilities';

/**
 * @module Excel/Drawings
 */

export class Drawings {
  drawings: any[] = [];
  relations = new RelationshipManager();
  id = uniqueId('Drawings');

  /**
   * Adds a drawing (more likely a subclass of a Drawing) to the 'Drawings' for a particular worksheet.
   *
   * @param {Drawing} drawing
   * @returns {undefined}
   */
  addDrawing(drawing: any) {
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
      let rId = this.relations.getRelationshipId(this.drawings[i].getMediaData());
      if (!rId) {
        rId = this.relations.addRelation(this.drawings[i].getMediaData(), this.drawings[i].getMediaType()); //chart
      }
      this.drawings[i].setRelationshipId(rId);
      drawings.appendChild(this.drawings[i].toXML(doc));
    }
    return doc;
  }
}
