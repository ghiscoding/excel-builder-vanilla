import { Util } from '../Util';
import { XMLDOM } from '../XMLDOM';
import { Drawing } from './Drawing';
export declare class Picture extends Drawing {
    media: any;
    id: string;
    pictureId: number;
    fill: any;
    mediaData: any;
    description: string;
    constructor();
    setMedia(mediaRef: any): void;
    setDescription(description: string): void;
    setFillType(type: string): void;
    setFillConfig(config: any): void;
    getMediaType(): keyof typeof Util.schemas;
    getMediaData(): any;
    setRelationshipId(rId: string): void;
    toXML(xmlDoc: XMLDOM): any;
}
//# sourceMappingURL=Picture.d.ts.map