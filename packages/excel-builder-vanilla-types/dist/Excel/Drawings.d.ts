import { Drawing } from './Drawing/Drawing';
import { Picture } from './Drawing/Picture';
import { RelationshipManager } from './RelationshipManager';
/**
 * @module Excel/Drawings
 */
export declare class Drawings {
    drawings: (Drawing | Picture)[];
    relations: RelationshipManager;
    id: string;
    /**
     * Adds a drawing (more likely a subclass of a Drawing) to the 'Drawings' for a particular worksheet.
     *
     * @param {Drawing} drawing
     * @returns {undefined}
     */
    addDrawing(drawing: Drawing): void;
    getCount(): number;
    toXML(): import('./XMLDOM').XMLDOM;
}
//# sourceMappingURL=Drawings.d.ts.map