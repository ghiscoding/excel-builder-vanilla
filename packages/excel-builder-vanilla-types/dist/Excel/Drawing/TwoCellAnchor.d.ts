import { XMLDOM } from '../XMLDOM';
export declare class TwoCellAnchor {
    from: any;
    to: any;
    constructor(config: any);
    setFrom(x: number, y: number, xOff?: boolean, yOff?: boolean): void;
    setTo(x: number, y: number, xOff?: boolean, yOff?: boolean): void;
    toXML(xmlDoc: XMLDOM, content: any): import('..').XMLNode;
}
//# sourceMappingURL=TwoCellAnchor.d.ts.map