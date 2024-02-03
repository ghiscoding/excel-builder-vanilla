import { each, uniqueId } from 'lodash';
import { Util } from './Util';
import { Paths } from './Paths';

/**
 * @module Excel/RelationshipManager
 */
export class RelationshipManager {
  relations: any = {};
  lastId = 1;

  constructor() {
    uniqueId('rId'); //priming
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

  addRelation(object: any, type: keyof typeof Util.schemas) {
    this.relations[object.id] = {
      id: uniqueId('rId'),
      schema: Util.schemas[type],
      object: object,
    };
    return this.relations[object.id].id;
  }

  getRelationshipId(object: any) {
    return this.relations[object.id] ? this.relations[object.id].id : null;
  }

  toXML() {
    const doc = Util.createXmlDoc(Util.schemas.relationshipPackage, 'Relationships');
    const relationships = doc.documentElement;

    each(this.relations, (data, id) => {
      const relationship = Util.createElement(doc, 'Relationship', [
        ['Id', data.id],
        ['Type', data.schema],
        ['Target', data.object.target || Paths[id]],
      ]);
      if (data.object.targetMode) {
        relationship.setAttribute('TargetMode', data.object.targetMode);
      }
      relationships.appendChild(relationship);
    });
    return doc;
  }
}
