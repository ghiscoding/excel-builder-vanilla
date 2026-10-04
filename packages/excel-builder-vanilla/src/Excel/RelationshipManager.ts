import { uniqueId } from '../utilities/uniqueId.js';
import { Paths } from './Paths.js';
import { Util } from './Util.js';

type Relation = {
  [id: string]: {
    id: string;
    schema: string;
    object: {
      id: string;
      target?: string | null;
      targetMode?: string;
      [key: string]: any;
    };
    data?: {
      id: number;
      schema: string;
      object: any;
    };
  };
};

/**
 * @module Excel/RelationshipManager
 */
export class RelationshipManager {
  relations: Relation = Object.create(null);
  paths?: Record<string, string>;
  lastId = 1;

  /** Creates an empty relationship registry. */
  constructor() {
    uniqueId('rId'); // priming
  }

  /** Restores relationship state previously returned by {@link exportData}. */
  importData(data: { relations: Relation; lastId: number }) {
    this.relations = data.relations;
    this.lastId = data.lastId;
  }

  /** Returns the relationship state for persistence or transfer. */
  exportData() {
    return {
      relations: this.relations,
      lastId: this.lastId,
    };
  }

  /** Adds a relationship for an object and returns its package relationship ID. */
  addRelation(object: { id: string; target?: string | null; targetMode?: string }, type: keyof typeof Util.schemas) {
    this.relations[object.id] = {
      id: this.getRelationshipId(object) || uniqueId('rId'),
      schema: Util.schemas[type],
      object,
    };
    return this.relations[object.id].id;
  }

  /** Returns an object's existing relationship ID, or `null` if none exists. */
  getRelationshipId(object: { id: string; target?: string | null; targetMode?: string }) {
    return Object.prototype.hasOwnProperty.call(this.relations, object.id) ? this.relations[object.id].id : null;
  }

  /** Serializes all registered relationships as an OOXML relationships document. */
  toXML() {
    const doc = Util.createXmlDoc(Util.schemas.relationshipPackage, 'Relationships');
    const relationships = doc.documentElement;

    for (const [id, data] of Object.entries(this.relations)) {
      const relationship = Util.createElement(doc, 'Relationship', [
        ['Id', data.id],
        ['Type', data.schema],
        ['Target', data.object.target || this.paths?.[id] || Paths[id]],
      ]);
      if (data.object.targetMode) {
        relationship.setAttribute('TargetMode', data.object.targetMode);
      }
      relationships.appendChild(relationship);
    }
    return doc;
  }
}
