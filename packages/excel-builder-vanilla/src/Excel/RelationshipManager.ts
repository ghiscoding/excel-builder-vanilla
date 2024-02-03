import { Util } from './Util';
import { Paths } from './Paths';
import { uniqueId } from '../lodash-utils';

/**
 * @module Excel/RelationshipManager
 */
export class RelationshipManager {
  relations: {
    [id: string]: {
      id: string;
      schema: string;
      object: any;
      data?: { id: number; schema: string; object: any };
    };
  } = {};
  lastId = 1;

  constructor() {
    uniqueId('rId'); // priming
  }

  importData(data: any) {
    this.relations = data.relations;
    this.lastId = data.lastId;
  }

  exportData() {
    return {
      relations: this.relations,
      lastId: this.lastId,
    };
  }

  addRelation(object: { id: string }, type: keyof typeof Util.schemas) {
    this.relations[object.id] = {
      id: uniqueId('rId'),
      schema: Util.schemas[type],
      object,
    };
    return this.relations[object.id].id;
  }

  getRelationshipId(object: { id: string }) {
    return this.relations[object.id] ? this.relations[object.id].id : null;
  }

  toXML() {
    const doc = Util.createXmlDoc(Util.schemas.relationshipPackage, 'Relationships');
    const relationships = doc.documentElement;

    for (const [id, data] of Object.entries(this.relations)) {
      const relationship = Util.createElement(doc, 'Relationship', [
        ['Id', data.id],
        ['Type', data.schema],
        ['Target', data.object.target || Paths[id]],
      ]);
      if (data.object.targetMode) {
        relationship.setAttribute('TargetMode', data.object.targetMode);
      }
      relationships.appendChild(relationship);
    }
    return doc;
  }
}
