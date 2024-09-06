/**
 * @module Excel/SharedStrings
 */
export declare class SharedStrings {
    strings: {
        [key: string]: number;
    };
    stringArray: string[];
    id: string;
    /**
     * Adds a string to the shared string file, and returns the ID of the
     * string which can be used to reference it in worksheets.
     *
     * @param str {String}
     * @return int
     */
    addString(str: string): number;
    exportData(): {
        [key: string]: number;
    };
    toXML(): import('./XMLDOM').XMLDOM;
}
//# sourceMappingURL=SharedStrings.d.ts.map