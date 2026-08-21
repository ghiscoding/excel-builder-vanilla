import { uniqueId } from '../utilities/uniqueId.js';
import type { Drawing } from './Drawing/Drawing.js';
import { RelationshipManager } from './RelationshipManager.js';
import { Util } from './Util.js';
import type { XMLDOM, XMLNode } from './XMLDOM.js';

type RelationshipTarget = Parameters<RelationshipManager['getRelationshipId']>[0];
type RelationshipDrawing = Drawing & {
  getMediaData?: () => RelationshipTarget;
  getMediaType: () => Parameters<RelationshipManager['addRelation']>[1];
  setRelationshipId: (rId: string) => void;
  toXML: (doc: XMLDOM) => XMLNode;
};

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
      const item = this.drawings[i] as Partial<RelationshipDrawing>;
      if (!item.getMediaType || !item.setRelationshipId || !item.toXML) {
        continue;
      }
      const target = (item.getMediaData?.() ?? item) as RelationshipTarget;
      const mediaType = item.getMediaType();
      const rId = this.relations.getRelationshipId(target) || this.relations.addRelation(target, mediaType);
      item.setRelationshipId(rId);
      drawings.appendChild(item.toXML(doc));
    }
    return doc;
  }
}
