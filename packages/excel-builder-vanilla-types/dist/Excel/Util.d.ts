import { XMLDOM, XMLNode } from './XMLDOM';
/**
 * @module Excel/Util
 */
export declare class Util {
    static _idSpaces: {
        [space: string]: number;
    };
    /**
     * Returns a number based on a namespace. So, running with 'Picture' will return 1. Run again, you will get 2. Run with 'Foo', you'll get 1.
     * @param {String} space
     * @returns {Number}
     */
    static uniqueId(space: string): number;
    /**
     * Attempts to create an XML document. After some investigation, using the 'fake' document
     * is significantly faster than creating an actual XML document, so we're going to go with
     * that. Besides, it just makes it easier to port to node.
     *
     * Takes a namespace to start the xml file in, as well as the root element
     * of the xml file.
     *
     * @param {type} ns
     * @param {type} base
     * @returns {@new;XMLDOM}
     */
    static createXmlDoc(ns: string, base: string): XMLDOM;
    /**
     * Creates an xml node (element). Used to simplify some calls, as IE is
     * very particular about namespaces and such.
     *
     * @param {XMLDOM} doc An xml document (actual DOM or fake DOM, not a string)
     * @param {type} name The name of the element
     * @param {type} attributes
     * @returns {XML Node}
     */
    static createElement(doc: XMLDOM, name: string, attributes?: any): XMLNode;
    /**
     * This is sort of slow, but it's a huge convenience method for the code. It probably shouldn't be used
     * in high repetition areas.
     *
     * @param {XMLDoc} doc
     * @param {Object} attrs
     */
    static setAttributesOnDoc(doc: XMLNode, attrs: {
        [key: string]: any;
    }): void;
    static LETTER_REFS: any;
    static positionToLetterRef(x: number, y: number | string): any;
    static schemas: {
        worksheet: string;
        sharedStrings: string;
        stylesheet: string;
        relationships: string;
        relationshipPackage: string;
        contentTypes: string;
        spreadsheetml: string;
        markupCompat: string;
        x14ac: string;
        officeDocument: string;
        package: string;
        table: string;
        spreadsheetDrawing: string;
        drawing: string;
        drawingRelationship: string;
        image: string;
        chart: string;
        hyperlink: string;
    };
}
//# sourceMappingURL=Util.d.ts.map