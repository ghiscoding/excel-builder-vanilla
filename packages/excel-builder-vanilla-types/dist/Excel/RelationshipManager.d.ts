import { Util } from './Util';
/**
 * @module Excel/RelationshipManager
 */
export declare class RelationshipManager {
    relations: {
        [id: string]: {
            id: string;
            schema: string;
            object: any;
            data?: {
                id: number;
                schema: string;
                object: any;
            };
        };
    };
    lastId: number;
    constructor();
    importData(data: any): void;
    exportData(): {
        relations: {
            [id: string]: {
                id: string;
                schema: string;
                object: any;
                data?: {
                    id: number;
                    schema: string;
                    object: any;
                };
            };
        };
        lastId: number;
    };
    addRelation(object: {
        id: string;
    }, type: keyof typeof Util.schemas): string;
    getRelationshipId(object: {
        id: string;
    }): string | null;
    toXML(): import('./XMLDOM').XMLDOM;
}
//# sourceMappingURL=RelationshipManager.d.ts.map