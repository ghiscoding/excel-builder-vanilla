type XMLNodeOption = {
    attributes?: {
        [key: string]: any;
    };
    children?: XMLNode[];
    nodeName: string;
    nodeValue?: string;
    type?: string;
};
export declare class XMLDOM {
    documentElement: XMLNode;
    constructor(ns: string | null, rootNodeName: string);
    createElement(name: string): XMLNode;
    createTextNode(text: string): TextNode;
    toString(): string;
    static Node: {
        Create: (config: any) => XMLNode | TextNode | null;
    };
}
declare class TextNode {
    nodeValue: any;
    constructor(text: string);
    toJSON(): {
        nodeValue: any;
        type: string;
    };
    toString(): string;
}
export declare class XMLNode {
    nodeName: string;
    children: XMLNode[];
    nodeValue: string;
    attributes: {
        [key: string]: any;
    };
    firstChild?: XMLNode;
    constructor(config: XMLNodeOption);
    toString(): string;
    toJSON(): {
        nodeName: string;
        children: any[];
        nodeValue: string;
        attributes: {
            [key: string]: any;
        };
        type: string;
    };
    setAttribute(name: string, val: any): void;
    appendChild(child: any): void;
    cloneNode(_deep?: boolean): XMLNode;
}
export {};
//# sourceMappingURL=XMLDOM.d.ts.map