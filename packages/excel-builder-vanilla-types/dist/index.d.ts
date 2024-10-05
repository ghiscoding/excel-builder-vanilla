import { ZipOptions } from 'fflate';

type XMLNodeOption = {
    attributes?: {
        [key: string]: any;
    };
    children?: XMLNode[];
    nodeName: string;
    nodeValue?: string;
    type?: string;
};
declare class XMLDOM {
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
declare class XMLNode {
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

/**
 *
 * @param {Object} config
 * @param {Number} config.x X offset in EMU's
 * @param {Number} config.y Y offset in EMU's
 * @param {Number} config.width Width in EMU's
 * @param {Number} config.height Height in EMU's
 * @constructor
 */
declare class AbsoluteAnchor {
    x: number | null;
    y: number | null;
    width: number | null;
    height: number | null;
    constructor(config: any);
    /**
     * Sets the X and Y offsets.
     *
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    setPos(x: number, y: number): void;
    /**
     * Sets the width and height of the image.
     *
     * @param {Number} width
     * @param {Number} height
     * @returns {undefined}
     */
    setDimensions(width: number, height: number): void;
    toXML(xmlDoc: XMLDOM, content: any): XMLNode;
}

declare class Chart {
}

/**
 *
 * @param {Object} config
 * @param {Number} config.x The cell column number that the top left of the picture will start in
 * @param {Number} config.y The cell row number that the top left of the picture will start in
 * @param {Number} config.width Width in EMU's
 * @param {Number} config.height Height in EMU's
 * @constructor
 */
declare class OneCellAnchor {
    x: number | null;
    y: number | null;
    xOff: boolean | null;
    yOff: boolean | null;
    width: number | null;
    height: number | null;
    constructor(config: any);
    setPos(x: number, y: number, xOff?: boolean, yOff?: boolean): void;
    setDimensions(width: number, height: number): void;
    toXML(xmlDoc: XMLDOM, content: any): XMLNode;
}

declare class TwoCellAnchor {
    from: any;
    to: any;
    constructor(config: any);
    setFrom(x: number, y: number, xOff?: boolean, yOff?: boolean): void;
    setTo(x: number, y: number, xOff?: boolean, yOff?: boolean): void;
    toXML(xmlDoc: XMLDOM, content: any): XMLNode;
}

/**
 * This is mostly a global spot where all of the relationship managers can get and set
 * path information from/to.
 * @module Excel/Drawing
 */
declare class Drawing {
    anchor: any;
    id: string;
    get AbsoluteAnchor(): typeof AbsoluteAnchor;
    get Chart(): typeof Chart;
    get OneCellAnchor(): typeof OneCellAnchor;
    get TwoCellAnchor(): typeof TwoCellAnchor;
    /**
     *
     * @param {String} type Can be 'absoluteAnchor', 'oneCellAnchor', or 'twoCellAnchor'.
     * @param {Object} config Shorthand - pass the created anchor coords that can normally be used to construct it.
     * @returns {Anchor}
     */
    createAnchor(type: string, config: any): any;
}

/**
 * @module Excel/Util
 */
declare class Util {
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

declare class Picture extends Drawing {
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

/**
 * @module Excel/RelationshipManager
 */
declare class RelationshipManager {
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
    toXML(): XMLDOM;
}

/**
 * @module Excel/Drawings
 */
declare class Drawings {
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
    toXML(): XMLDOM;
}

declare class Pane {
    state: null | 'split' | 'frozen' | 'frozenSplit';
    xSplit: number | null;
    ySplit: number | null;
    activePane: string;
    topLeftCell: number | string | null;
    _freezePane: {
        xSplit: number;
        ySplit: number;
        cell: string;
    };
    freezePane(column: number, row: number, cell: string): void;
    exportXML(doc: XMLDOM): XMLNode;
}

/**
 * This is mostly a global spot where all of the relationship managers can get and set
 * path information from/to.
 * @module Excel/Paths
 */
declare const Paths: {
    [path: string]: string;
};

/**
 * Converts pixel sizes to 'EMU's, which is what Open XML uses.
 *
 * @todo clean this up. Code borrowed from http://polymathprogrammer.com/2009/10/22/english-metric-units-and-open-xml/,
 * but not sure that it's going to be as accurate as it needs to be.
 *
 * @param int pixels
 * @returns int
 */
declare class Positioning {
    static pixelsToEMUs(pixels: number): number;
}

/**
 * @module Excel/SharedStrings
 */
declare class SharedStrings {
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
    toXML(): XMLDOM;
}

interface SheetViewOption {
    pane?: Pane;
}
/**
 * @module Excel/SheetView
 * https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.sheetview%28v=office.14%29.aspx
 *
 */
declare class SheetView {
    pane: Pane;
    showZeros: null;
    defaultGridColor: null;
    colorId: null;
    rightToLeft: null;
    showFormulas: null;
    showGridLines: null;
    showOutlineSymbols: null;
    showRowColHeaders: null;
    showRuler: null;
    showWhiteSpace: null;
    tabSelected: null;
    topLeftCell: null;
    viewType: null;
    windowProtection: null;
    zoomScale: null;
    zoomScaleNormal: null;
    zoomScalePageLayoutView: null;
    zoomScaleSheetLayoutView: null;
    constructor(config?: SheetViewOption);
    /**
     * Added froze pane
     * @param column - column number: 0, 1, 2 ...
     * @param row - row number: 0, 1, 2 ...
     * @param cell - 'A1'
     * @deprecated
     */
    freezePane(column: number, row: number, cell: string): void;
    exportXML(doc: XMLDOM): XMLNode;
}

/**
 * Excel Color in ARGB format, for color aren't transparent just use "FF" as prefix.
 * For example if the color you want to add is a blue with HTML color "#0000FF", then the excel color we need to add is "FF0000FF"
 * Online tool: https://www.myfixguide.com/color-converter/
 */
type ExcelColorStyle = string | {
    theme: number;
};
interface ExcelAlignmentStyle {
    horizontal?: 'center' | 'fill' | 'general' | 'justify' | 'left' | 'right';
    justifyLastLine?: boolean;
    readingOrder?: string;
    relativeIndent?: boolean;
    shrinkToFit?: boolean;
    textRotation?: string | number;
    vertical?: 'bottom' | 'distributed' | 'center' | 'justify' | 'top';
    wrapText?: boolean;
}
type ExcelBorderLineStyle = 'continuous' | 'dash' | 'dashDot' | 'dashDotDot' | 'dotted' | 'double' | 'lineStyleNone' | 'medium' | 'slantDashDot' | 'thin' | 'thick';
interface ExcelBorderStyle {
    bottom?: {
        color?: ExcelColorStyle;
        style?: ExcelBorderLineStyle;
    };
    top?: {
        color?: ExcelColorStyle;
        style?: ExcelBorderLineStyle;
    };
    left?: {
        color?: ExcelColorStyle;
        style?: ExcelBorderLineStyle;
    };
    right?: {
        color?: ExcelColorStyle;
        style?: ExcelBorderLineStyle;
    };
    diagonal?: any;
    outline?: boolean;
    diagonalUp?: boolean;
    diagonalDown?: boolean;
}
interface ExcelColumn {
    bestFit?: boolean;
    customWidth?: number;
    hidden?: boolean;
    min?: number;
    max?: number;
    width?: number;
}
type ExcelColumnFormat = 'bestFit' | 'collapsed' | 'customWidth' | 'hidden' | 'max' | 'min' | 'outlineLevel' | 'phonetic' | 'style' | 'width';
interface ExcelTableColumn {
    name: string;
    dataCellStyle?: any;
    dataDxfId?: number;
    headerRowCellStyle?: ExcelStyleInstruction;
    headerRowDxfId?: number;
    totalsRowCellStyle?: ExcelStyleInstruction;
    totalsRowDxfId?: number;
    totalsRowFunction?: any;
    totalsRowLabel?: string;
    columnFormula?: string;
    columnFormulaIsArrayType?: boolean;
    totalFormula?: string;
    totalFormulaIsArrayType?: boolean;
}
interface ExcelFillStyle {
    type?: 'gradient' | 'pattern';
    patternType?: string;
    degree?: number;
    fgColor?: ExcelColorStyle;
    start?: ExcelColorStyle;
    end?: {
        pureAt?: number;
        color?: ExcelColorStyle;
    };
}
interface ExcelFontStyle {
    bold?: boolean;
    color?: ExcelColorStyle;
    fontName?: string;
    italic?: boolean;
    outline?: boolean;
    size?: number;
    shadow?: boolean;
    strike?: boolean;
    subscript?: boolean;
    superscript?: boolean;
    underline?: boolean | 'single' | 'double' | 'singleAccounting' | 'doubleAccounting';
}
interface ExcelMetadata {
    type?: string;
    style?: number;
}
interface ExcelColumnMetadata {
    value: any;
    metadata?: ExcelMetadata;
}
interface ExcelMargin {
    top: number;
    bottom: number;
    left: number;
    right: number;
    header: number;
    footer: number;
}
interface ExcelSortState {
    caseSensitive?: boolean;
    dataRange?: any;
    columnSort?: boolean;
    sortDirection?: 'ascending' | 'descending';
    sortRange?: any;
}
/** Excel custom formatting that will be applied to a column */
interface ExcelStyleInstruction {
    id?: number;
    alignment?: ExcelAlignmentStyle;
    border?: ExcelBorderStyle;
    borderId?: number;
    fill?: ExcelFillStyle;
    fillId?: number;
    font?: ExcelFontStyle;
    fontId?: number;
    format?: string;
    height?: number;
    numFmt?: string;
    numFmtId?: number;
    width?: number;
    xfId?: number;
    protection?: {
        locked?: boolean;
        hidden?: boolean;
    };
    /** style id */
    style?: number;
}

/**
 * @module Excel/StyleSheet
 */
declare class StyleSheet {
    id: string;
    cellStyles: {
        name: string;
        xfId: string;
        builtinId: string;
    }[];
    defaultTableStyle: boolean;
    differentialStyles: any[];
    masterCellFormats: any[];
    masterCellStyles: any[];
    fonts: ExcelFontStyle[];
    numberFormatters: any[];
    fills: any[];
    borders: any[];
    tableStyles: any[];
    createSimpleFormatter(type: string): {
        [id: string]: number;
    };
    createFill(fillInstructions: any): any;
    createNumberFormatter(formatInstructions: any): {
        id: number;
        formatCode: any;
    };
    /**
     * alignment: {
     *  horizontal: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_HorizontalAlignment.html
     *  vertical: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_VerticalAlignment.html
     *  @param {Object} styleInstructions
     */
    createFormat(styleInstructions: ExcelStyleInstruction): any;
    createDifferentialStyle(styleInstructions: ExcelStyleInstruction): ExcelStyleInstruction;
    /**
     * Should be an object containing keys that match with one of the keys from this list:
     * http://www.schemacentral.com/sc/ooxml/t-ssml_ST_TableStyleType.html
     *
     * The value should be a reference to a differential format (dxf)
     * @param {Object} instructions
     */
    createTableStyle(instructions: any): void;
    /**
     * All params optional
     * Expects: {
     * top: {},
     * left: {},
     * right: {},
     * bottom: {},
     * diagonal: {},
     * outline: boolean,
     * diagonalUp: boolean,
     * diagonalDown: boolean
     * }
     * Each border should follow:
     * {
     * style: styleString, http://www.schemacentral.com/sc/ooxml/t-ssml_ST_BorderStyle.html
     * color: ARBG color (requires the A, so for example FF006666)
     * }
     * @param {Object} border
     */
    createBorderFormatter(border: any): any;
    /**
     * Supported font styles:
     * bold
     * italic
     * underline (single, double, singleAccounting, doubleAccounting)
     * size
     * color
     * fontName
     * strike (strikethrough)
     * outline (does this actually do anything?)
     * shadow (does this actually do anything?)
     * superscript
     * subscript
     *
     * Color is a future goal - at the moment it's looking a bit complicated
     * @param {Object} instructions
     */
    createFontStyle(instructions: ExcelFontStyle): any;
    exportBorders(doc: XMLDOM): XMLNode;
    exportBorder(doc: XMLDOM, data: any): XMLNode;
    exportColor(doc: XMLDOM, color: any): XMLNode;
    exportMasterCellFormats(doc: XMLDOM): XMLNode;
    exportMasterCellStyles(doc: XMLDOM): XMLNode;
    exportCellFormatElement(doc: XMLDOM, styleInstructions: ExcelStyleInstruction): XMLNode;
    exportAlignment(doc: XMLDOM, alignmentData: any): XMLNode;
    exportFonts(doc: XMLDOM): XMLNode;
    exportFont(doc: XMLDOM, fd: any): XMLNode;
    exportFills(doc: XMLDOM): XMLNode;
    exportFill(doc: XMLDOM, fd: any): XMLNode;
    exportGradientFill(doc: XMLDOM, data: any): XMLNode;
    /**
     * Pattern types: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_PatternType.html
     * @param {XMLDoc} doc
     * @param {Object} data
     */
    exportPatternFill(doc: XMLDOM, data: any): XMLNode;
    exportNumberFormatters(doc: XMLDOM): XMLNode;
    exportNumberFormatter(doc: XMLDOM, fd: any): XMLNode;
    exportCellStyles(doc: XMLDOM): XMLNode;
    exportDifferentialStyles(doc: XMLDOM): XMLNode;
    exportDFX(doc: XMLDOM, style: any): XMLNode;
    exportTableStyles(doc: XMLDOM): XMLNode;
    exportTableStyle(doc: XMLDOM, style: {
        name: string;
        wholeTable?: number;
        headerRow?: number;
    }): XMLNode;
    exportProtection(doc: XMLDOM, protectionData: any): XMLNode;
    toXML(): XMLDOM;
}

/**
 * @module Excel/Table
 */
declare class Table {
    name: string;
    id: string;
    tableId: string;
    displayName: string;
    dataCellStyle: any;
    dataDfxId: number | null;
    headerRowBorderDxfId: number | null;
    headerRowCellStyle: any;
    headerRowCount: number;
    headerRowDxfId: number | null;
    insertRow: boolean;
    insertRowShift: boolean;
    ref: any;
    tableBorderDxfId: number | null;
    totalsRowBorderDxfId: number | null;
    totalsRowCellStyle: any;
    totalsRowCount: number;
    totalsRowDxfId: number | null;
    tableColumns: any;
    autoFilter: any;
    sortState: any;
    styleInfo: any;
    constructor(config?: any);
    initialize(config: any): void;
    setReferenceRange(start: number[], end: number[]): void;
    setTableColumns(columns: Array<ExcelTableColumn | string>): void;
    /**
     * Expects an object with the following optional properties:
     * name (required)
     * dataCellStyle
     * dataDxfId
     * headerRowCellStyle
     * headerRowDxfId
     * totalsRowCellStyle
     * totalsRowDxfId
     * totalsRowFunction
     * totalsRowLabel
     * columnFormula
     * columnFormulaIsArrayType (boolean)
     * totalFormula
     * totalFormulaIsArrayType (boolean)
     */
    addTableColumn(column: ExcelTableColumn | string): void;
    /**
     * Expects an object with the following properties:
     * caseSensitive (boolean)
     * dataRange
     * columnSort (assumes true)
     * sortDirection
     * sortRange (defaults to dataRange)
     */
    setSortState(state: ExcelSortState): void;
    toXML(): XMLDOM;
    exportTableColumns(doc: XMLDOM): XMLNode;
    exportAutoFilter(doc: XMLDOM): XMLNode;
    exportTableStyleInfo(doc: XMLDOM): XMLNode;
    addAutoFilter(startRef: any, endRef: any): void;
}

interface CharType {
    font?: string;
    bold?: boolean;
    fontSize?: number;
    text?: string;
    underline?: boolean;
}
interface WorksheetOption {
    name?: string;
    sheetView?: SheetView;
}
/**
 * This module represents an excel worksheet in its basic form - no tables, charts, etc. Its purpose is
 * to hold data, the data's link to how it should be styled, and any links to other outside resources.
 *
 * @module Excel/Worksheet
 */
declare class Worksheet {
    name: string;
    id: string;
    _timezoneOffset: number;
    relations: any;
    columnFormats: ExcelColumnFormat[];
    data: (number | string | boolean | Date | null | ExcelColumnMetadata)[][];
    mergedCells: string[][];
    columns: ExcelColumn[];
    sheetProtection: any;
    _headers: [left?: any, center?: any, right?: any];
    _footers: [left?: any, center?: any, right?: any];
    _tables: Table[];
    _drawings: Array<Table | Drawings>;
    _orientation?: string;
    _margin?: ExcelMargin;
    _rowInstructions: any;
    _freezePane: {
        xSplit?: number;
        ySplit?: number;
        cell?: string;
    };
    sharedStrings: SharedStrings | null;
    hyperlinks: never[];
    sheetView: SheetView;
    showZeros: any;
    constructor(config: WorksheetOption);
    initialize(config: any): void;
    /**
     * Returns an object that can be consumed by a Worksheet/Export/Worker
     * @returns {Object}
     */
    exportData(): {
        relations: any;
        columnFormats: ExcelColumnFormat[];
        data: (string | number | boolean | ExcelColumnMetadata | Date | null)[][];
        columns: ExcelColumn[];
        mergedCells: string[][];
        _headers: [left?: any, center?: any, right?: any];
        _footers: [left?: any, center?: any, right?: any];
        _tables: Table[];
        _rowInstructions: any;
        _freezePane: {
            xSplit?: number;
            ySplit?: number;
            cell?: string;
        };
        name: string;
        id: string;
    };
    /**
     * Imports data - to be used while inside of a WorksheetExportWorker.
     * @param {Object} data
     */
    importData(data: any): void;
    setSharedStringCollection(stringCollection: SharedStrings): void;
    addTable(table: Table): void;
    addDrawings(drawings: Drawings): void;
    setRowInstructions(rowIndex: number, instructions: ExcelStyleInstruction): void;
    /**
     * Expects an array length of three.
     *
     * @see Excel/Worksheet compilePageDetailPiece
     * @see <a href='/cookbook/addingHeadersAndFooters.html'>Adding headers and footers to a worksheet</a>
     *
     * @param {Array} headers [left, center, right]
     */
    setHeader(headers: [left: any, center: any, right: any]): void;
    /**
     * Expects an array length of three.
     *
     * @see Excel/Worksheet compilePageDetailPiece
     * @see <a href='/cookbook/addingHeadersAndFooters.html'>Adding headers and footers to a worksheet</a>
     *
     * @param {Array} footers [left, center, right]
     */
    setFooter(footers: [left: any, center: any, right: any]): void;
    /**
     * Turns page header/footer details into the proper format for Excel.
     * @param {type} data
     * @returns {String}
     */
    compilePageDetailPackage(data: any): string;
    /**
     * Turns instructions on page header/footer details into something
     * usable by Excel.
     *
     * @param {type} data
     * @returns {String|@exp;_@call;reduce}
     */
    compilePageDetailPiece(data: string | CharType | any[]): any;
    /**
     * Creates the header node.
     *
     * @todo implement the ability to do even/odd headers
     * @param {XML Doc} doc
     * @returns {XML Node}
     */
    exportHeader(doc: XMLDOM): XMLNode;
    /**
     * Creates the footer node.
     *
     * @todo implement the ability to do even/odd footers
     * @param {XML Doc} doc
     * @returns {XML Node}
     */
    exportFooter(doc: XMLDOM): XMLNode;
    /**
     * This creates some nodes ahead of time, which cuts down on generation time due to
     * most cell definitions being essentially the same, but having multiple nodes that need
     * to be created. Cloning takes less time than creation.
     *
     * @private
     * @param {XML Doc} doc
     * @returns {_L8.Anonym$0._buildCache.Anonym$2}
     */
    _buildCache(doc: XMLDOM): {
        number: XMLNode;
        date: XMLNode;
        string: XMLNode;
        formula: XMLNode;
    };
    /**
     * Runs through the XML document and grabs all of the strings that will
     * be sent to the 'shared strings' document.
     *
     * @returns {Array}
     */
    collectSharedStrings(): string[];
    toXML(): XMLDOM;
    /**
     *
     * @param {XML Doc} doc
     * @returns {XML Node}
     */
    exportColumns(doc: XMLDOM): XMLNode;
    /**
     * Sets the page settings on a worksheet node.
     *
     * @param {XML Doc} doc
     * @param {XML Node} worksheet
     * @returns {undefined}
     */
    exportPageSettings(doc: XMLDOM, worksheet: XMLNode): void;
    /**
     * http://www.schemacentral.com/sc/ooxml/t-ssml_ST_Orientation.html
     *
     * Can be one of 'portrait' or 'landscape'.
     *
     * @param {'default' | 'portrait' | 'landscape'} orientation
     * @returns {undefined}
     */
    setPageOrientation(orientation: 'default' | 'portrait' | 'landscape'): void;
    /**
     * Set page details in inches.
     * use this structure:
     * {
     *   top: 0.7
     *   , bottom: 0.7
     *   , left: 0.7
     *   , right: 0.7
     *   , header: 0.3
     *   , footer: 0.3
     * }
     *
     * @returns {undefined}
     */
    setPageMargin(input: ExcelMargin): void;
    /**
     * Expects an array of column definitions. Each column definition needs to have a width assigned to it.
     *
     * @param {Array} columns
     */
    setColumns(columns: ExcelColumn[]): void;
    /**
     * Expects an array of data to be translated into cells.
     *
     * @param {Array} data Two dimensional array - [ [A1, A2], [B1, B2] ]
     * @see <a href='/cookbook/addingDataToAWorksheet.html'>Adding data to a worksheet</a>
     */
    setData(data: (number | string | boolean | Date | null | ExcelColumnMetadata)[][]): void;
    /**
     * Merge cells in given range
     *
     * @param cell1 - A1, A2...
     * @param cell2 - A2, A3...
     */
    mergeCells(cell1: string, cell2: string): void;
    /**
     * Added frozen pane
     * @param column - column number: 0, 1, 2 ...
     * @param row - row number: 0, 1, 2 ...
     * @param cell - 'A1'
     * @deprecated
     */
    freezePane(column: number, row: number, cell: string): void;
    /**
     * Expects an array containing an object full of column format definitions.
     * http://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.column.aspx
     * bestFit
     * collapsed
     * customWidth
     * hidden
     * max
     * min
     * outlineLevel
     * phonetic
     * style
     * width
     * @param {Array} columnFormats
     */
    setColumnFormats(columnFormats: ExcelColumnFormat[]): void;
}

/**
 * @module Excel/Workbook
 */
declare class Workbook {
    id: string;
    styleSheet: StyleSheet;
    sharedStrings: SharedStrings;
    relations: RelationshipManager;
    worksheets: Worksheet[];
    tables: Table[];
    drawings: Drawings[];
    media: any;
    printTitles: any;
    constructor();
    initialize(): void;
    createWorksheet(config?: any): Worksheet;
    getStyleSheet(): StyleSheet;
    addTable(table: Table): void;
    addDrawings(drawings: Drawings): void;
    /**
     * Set number of rows to repeat for this sheet.
     *
     * @param {String} sheet name
     * @param {int} number of rows to repeat from the top
     * @returns {undefined}
     */
    setPrintTitleTop(inSheet: string, inRowCount: number): void;
    /**
     * Set number of rows to repeat for this sheet.
     *
     * @param {String} sheet name
     * @param {int} number of columns to repeat from the left
     * @returns {undefined}
     */
    setPrintTitleLeft(inSheet: string, inRowCount: number): void;
    addMedia(_type: string, fileName: string, fileData: any, contentType?: string | null): any;
    addWorksheet(worksheet: Worksheet): void;
    createContentTypes(): XMLDOM;
    toXML(): XMLDOM;
    createWorkbookRelationship(): XMLDOM;
    _generateCorePaths(files: any): void;
    _prepareFilesForPackaging(files: {
        [path: string]: XMLDOM | string;
    }): void;
    generateFiles(): Promise<{
        [path: string]: string;
    }>;
}

type InferOutputByType<T extends 'Blob' | 'Uint8Array'> = T extends 'Blob' ? Blob : T extends 'Uint8Array' ? Uint8Array : any;
/**
 * Creates a new workbook.
 */
declare function createWorkbook(): Workbook;
/**
 * Turns a workbook into a downloadable file, you can between a 'Blob' or 'Uint8Array',
 * and if nothing is provided then 'Blob' will be the default
 * @param {Excel/Workbook} workbook - The workbook that is being converted
 * @param {'Uint8Array' | 'Blob'} [outputType='Blob'] - defaults to 'Blob'
 * @param {Object} [options]
 *   - `fileFormat` defaults to "xlsx"
 *   - `mimeType`: a mime type can be provided by the user or auto-detect the mime when undefined (by file extension .xls/.xlsx)
 *      (user can pass an empty string to completely cancel the mime type altogether)
 *   - `zipOptions` to specify any `fflate` options to modify how the zip is created.
 * @returns {Promise}
 */
declare function createExcelFile<T extends 'Blob' | 'Uint8Array' = 'Blob'>(workbook: Workbook, outputType?: T, options?: {
    fileFormat?: 'xls' | 'xlsx';
    mimeType?: string;
    zipOptions?: ZipOptions;
}): Promise<InferOutputByType<T>>;
/**
 * Download Excel file, currently only supports a "browser" as `downloadType`
 * but it could be expended in the future to also other type of platform like NodeJS for example.
 * @param {Workbook} workbook
 * @param {String} filename - filename (must also include file extension, xls/xlsx)
 * @param {Object} [options]
 *   - `downloadType`: download type (browser/node), currently only a "browser" download as a Blob
 *   - `mimeType`: a mime type can be provided by the user or auto-detect the mime when undefined (by file extension .xls/.xlsx)
 *      (user can pass an empty string to completely cancel the mime type altogether)
 *   - `zipOptions` to specify any `fflate` options to modify how the zip is created.
 */
declare function downloadExcelFile(workbook: Workbook, filename: string, options?: {
    downloadType?: 'browser' | 'node';
    mimeType?: string;
    zipOptions?: ZipOptions;
}): Promise<void>;

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @since 0.1.0
 * @category String
 * @param {string} [str=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @see escapeRegExp, unescape
 * @example
 *
 * escape('fred, barney, & pebbles')
 * // => 'fred, barney, &amp; pebbles'
 */
declare const htmlEscape: (str: string) => string;

declare function isObject(value: unknown): value is object;
declare function isPlainObject(value: unknown): boolean;
declare function isString(value: any): value is string;

declare function pick(object: any, keys: string[]): any;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @since 0.1.0
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @see random
 * @example
 *
 * uniqueId('contact_')
 * // => 'contact_104'
 *
 * uniqueId()
 * // => '105'
 */
declare function uniqueId(prefix?: string): string;

export { AbsoluteAnchor, Chart, Drawing, Drawings, OneCellAnchor, Pane, Paths, Picture, Positioning, RelationshipManager, SharedStrings, SheetView, StyleSheet, Table, TwoCellAnchor, Util, Workbook, Worksheet, XMLDOM, XMLNode, createExcelFile, createWorkbook, downloadExcelFile, htmlEscape, isObject, isPlainObject, isString, pick, uniqueId };
