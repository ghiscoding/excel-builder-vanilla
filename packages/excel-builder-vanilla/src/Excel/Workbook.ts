import type { CustomFunctionOptions, WorkbookDefinedName } from '../interfaces.js';
import { uniqueId } from '../utilities/uniqueId.js';
import { isXmlPath } from '../utilities/zip.js';
import type { Chart } from './Drawing/Chart.js';
import type { Drawings } from './Drawings.js';
import { Paths } from './Paths.js';
import { RelationshipManager } from './RelationshipManager.js';
import { SharedStrings } from './SharedStrings.js';
import { StyleSheet } from './StyleSheet.js';
import type { Table } from './Table.js';
import { Util } from './Util.js';
import { Worksheet } from './Worksheet.js';
import { XMLDOM } from './XMLDOM.js';

export interface MediaMeta {
  id: string;
  data: string;
  fileName: string;
  contentType: string | null;
  extension: string;
  rId?: string;
}

/**
 * @module Excel/Workbook
 */
export class Workbook {
  id = uniqueId('Workbook');
  styleSheet = new StyleSheet();
  sharedStrings = new SharedStrings();
  relations = new RelationshipManager();
  worksheets: Worksheet[] = [];
  charts: Chart[] = [];
  tables: Table[] = [];
  drawings: Drawings[] = [];
  media: { [filename: string]: MediaMeta } = Object.create(null);
  printTitles?: Record<string, { top?: number; left?: string }>;
  definedNames: WorkbookDefinedName[] = [];

  /** Creates a workbook with an empty worksheet and style collection. */
  constructor() {
    this.initialize();
  }

  /** Resets workbook state and creates its shared style and string collections. */
  initialize() {
    this.id = uniqueId('Workbook');
    this.styleSheet = new StyleSheet();
    this.sharedStrings = new SharedStrings();
    this.relations = new RelationshipManager();
    this.relations.addRelation(this.styleSheet, 'stylesheet');
    this.relations.addRelation(this.sharedStrings, 'sharedStrings');
    this.definedNames = [];
  }

  /**
   * Validate an Excel defined name/function identifier.
   * Excel names cannot be empty, cannot look like cell refs and cannot contain spaces.
   */
  validateDefinedName(name: string) {
    if (typeof name !== 'string' || !name.trim()) {
      throw new Error('Defined name must be a non-empty string.');
    }
    const candidate = name.trim();
    if (candidate.length > 255) {
      throw new Error(`Defined name "${candidate}" is too long (max 255 chars).`);
    }
    if (!/^[A-Za-z_\\][A-Za-z0-9_.\\]*$/.test(candidate)) {
      throw new Error(
        `Defined name "${candidate}" is invalid. Use letters/numbers/underscore/period and start with a letter, underscore, or backslash.`,
      );
    }
    if (/^[A-Za-z]{1,3}[1-9][0-9]*$/i.test(candidate) || /^R[1-9][0-9]*C[1-9][0-9]*$/i.test(candidate)) {
      throw new Error(`Defined name "${candidate}" is invalid because it looks like a cell reference.`);
    }
  }

  /** Resolve scope into a worksheet localSheetId (0-based). */
  resolveDefinedNameScope(scope?: number | string) {
    if (scope === undefined) {
      return undefined;
    }
    if (typeof scope === 'number') {
      if (!Number.isInteger(scope) || scope < 0 || scope >= this.worksheets.length) {
        throw new Error(`Defined name scope index "${scope}" is out of range.`);
      }
      return scope;
    }

    const index = this.worksheets.findIndex(ws => ws.name === scope);
    if (index < 0) {
      throw new Error(`Defined name scope worksheet "${scope}" was not found.`);
    }
    return index;
  }

  /** Adds a workbook-level or sheet-scoped defined name. */
  addDefinedName(name: string, refersTo: string, scope?: number | string, options?: { comment?: string; hidden?: boolean }) {
    this.validateDefinedName(name);
    if (typeof refersTo !== 'string' || !refersTo.trim()) {
      throw new Error('Defined name refersTo must be a non-empty string.');
    }
    const normalizedRefersTo = refersTo.trim();
    if (!normalizedRefersTo.startsWith('=')) {
      throw new Error(`Defined name refersTo "${refersTo}" must start with '='.`);
    }

    this.definedNames.push({
      name: name.trim(),
      refersTo: normalizedRefersTo,
      scope,
      comment: options?.comment,
      hidden: options?.hidden,
    });
  }

  /**
   * Adds a custom workbook function as a named LAMBDA.
   * Example output: CUSTOMSUM -> =LAMBDA(values,SUM(values))
   */
  addCustomFunction(name: string, args: string[], body: string, options?: CustomFunctionOptions) {
    this.validateDefinedName(name);
    if (!Array.isArray(args) || args.length === 0 || args.some(arg => typeof arg !== 'string' || !arg.trim())) {
      throw new Error(`Custom function "${name}" must provide at least one argument name.`);
    }
    if (typeof body !== 'string' || !body.trim()) {
      throw new Error(`Custom function "${name}" must provide a non-empty formula body.`);
    }

    const useExcelCompatibilityPrefixes = options?.autoPrefixXlfn ?? true;
    const lambdaKeyword = useExcelCompatibilityPrefixes ? '_xlfn.LAMBDA' : 'LAMBDA';
    const normalizedBody = body.trim().replace(/^=/, '');
    const normalizedArgs = args.map(arg => arg.trim());
    const lambdaArgs = useExcelCompatibilityPrefixes ? normalizedArgs.map(arg => `_xlpm.${arg}`) : normalizedArgs;
    const lambdaBody = useExcelCompatibilityPrefixes ? this.qualifyLambdaBodyArgRefs(normalizedBody, normalizedArgs) : normalizedBody;
    const refersTo = `=${lambdaKeyword}(${lambdaArgs.join(',')},${lambdaBody})`;
    this.addDefinedName(name, refersTo, options?.scope, {
      comment: options?.comment,
      hidden: options?.hidden,
    });
  }

  /** Qualify LAMBDA argument references with the `_xlpm.` prefix expected in workbook XML. */
  qualifyLambdaBodyArgRefs(formulaBody: string, argNames: string[]) {
    const sortedArgs = [...argNames].sort((a, b) => b.length - a.length);
    let qualifiedBody = formulaBody;
    for (const argName of sortedArgs) {
      const escapedArgName = argName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const argRefRegex = new RegExp(`(?<!_xlpm\\.)\\b${escapedArgName}\\b`, 'g');
      qualifiedBody = qualifiedBody.replace(argRefRegex, `_xlpm.${argName}`);
    }
    return qualifiedBody;
  }

  /** Creates a worksheet with a generated default name when none is supplied. */
  createWorksheet(config?: any) {
    config = Object.assign({}, { name: `Sheet ${this.worksheets.length + 1}` }, config);
    return new Worksheet(config);
  }

  /** Returns the workbook style sheet used to register cell formats. */
  getStyleSheet() {
    return this.styleSheet;
  }

  /** Registers a table with this workbook. */
  addTable(table: Table) {
    this.tables.push(table);
  }

  /** Registers a worksheet drawing collection with this workbook. */
  addDrawings(drawings: Drawings) {
    this.drawings.push(drawings);
  }

  /** Registers a chart and assigns its package index and target path. */
  addChart(chart: Chart) {
    // Assign 1-based index & relative target for drawing relationship
    chart.index = this.charts.length + 1;
    chart.target = `../charts/chart${chart.index}.xml`;
    this.charts.push(chart);
  }

  /**
   * Set number of rows to repeat for this sheet.
   * @param {String} sheet name
   * @param {int} number of rows to repeat from the top
   * @returns {undefined}
   */
  setPrintTitleTop(inSheet: string, inRowCount: number) {
    if (this.printTitles == null) {
      this.printTitles = Object.create(null);
    }
    if (this.printTitles![inSheet] == null) {
      this.printTitles![inSheet] = {};
    }
    this.printTitles![inSheet].top = inRowCount;
  }

  /**
   * Set number of rows to repeat for this sheet.
   * @param {String} sheet name
   * @param {int} number of columns to repeat from the left
   * @returns {undefined}
   */
  setPrintTitleLeft(inSheet: string, inRowCount: number) {
    if (this.printTitles == null) {
      this.printTitles = Object.create(null);
    }
    if (this.printTitles![inSheet] == null) {
      this.printTitles![inSheet] = {};
    }
    // WARN: this does not handle AA, AB, etc.
    this.printTitles![inSheet].left = String.fromCharCode(64 + inRowCount);
  }

  /** Registers media bytes and returns the workbook media record for the file. */
  addMedia(_type: string, fileName: string, fileData: any, contentType?: string | null) {
    const fileNamePieces = fileName.split('.');
    const extension = fileNamePieces[fileNamePieces.length - 1];
    const mediaTypeMap: Record<string, string> = {
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
    };
    if (!contentType) {
      contentType = mediaTypeMap[extension.toLowerCase()] ?? null;
    }
    if (!this.media[fileName]) {
      this.media[fileName] = {
        id: fileName,
        data: fileData,
        fileName: fileName,
        contentType: contentType,
        extension: extension,
      };
    }
    return this.media[fileName];
  }

  /** Adds a worksheet and connects it to the workbook's shared strings. */
  addWorksheet(worksheet: Worksheet) {
    this.relations.addRelation(worksheet, 'worksheet');
    worksheet.setSharedStringCollection(this.sharedStrings);
    this.worksheets.push(worksheet);
  }

  /** Creates the package content types document for workbook parts. */
  createContentTypes() {
    const doc = Util.createXmlDoc(Util.schemas.contentTypes, 'Types');
    const types = doc.documentElement;
    const appendOverride = (partName: string, contentType: string) => {
      types.appendChild(
        Util.createElement(doc, 'Override', [
          ['PartName', partName],
          ['ContentType', contentType],
        ]),
      );
    };
    let i: number;
    let l: number;

    types.appendChild(
      Util.createElement(doc, 'Default', [
        ['Extension', 'rels'],
        ['ContentType', 'application/vnd.openxmlformats-package.relationships+xml'],
      ]),
    );
    types.appendChild(
      Util.createElement(doc, 'Default', [
        ['Extension', 'xml'],
        ['ContentType', 'application/xml'],
      ]),
    );

    const extensions: Record<string, string | null> = {};
    for (const filename in this.media) {
      extensions[this.media[filename].extension] = this.media[filename].contentType;
    }
    for (const extension in extensions) {
      types.appendChild(
        Util.createElement(doc, 'Default', [
          ['Extension', extension],
          ['ContentType', extensions[extension]],
        ]),
      );
    }

    appendOverride('/xl/workbook.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml');
    appendOverride('/xl/sharedStrings.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml');
    appendOverride('/xl/styles.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml');

    for (i = 0, l = this.worksheets.length; i < l; i++) {
      appendOverride(`/xl/worksheets/sheet${i + 1}.xml`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml');
    }
    for (i = 0, l = this.tables.length; i < l; i++) {
      appendOverride(`/xl/tables/table${i + 1}.xml`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml');
    }

    for (i = 0, l = this.drawings.length; i < l; i++) {
      appendOverride(`/xl/drawings/drawing${i + 1}.xml`, 'application/vnd.openxmlformats-officedocument.drawing+xml');
    }

    for (i = 0, l = this.charts.length; i < l; i++) {
      appendOverride(`/xl/charts/chart${i + 1}.xml`, 'application/vnd.openxmlformats-officedocument.drawingml.chart+xml');
    }

    return doc;
  }

  /** Serializes workbook sheets, defined names, and workbook settings as OOXML. */
  toXML() {
    const doc = Util.createXmlDoc(Util.schemas.spreadsheetml, 'workbook');
    const wb = doc.documentElement;
    wb.setAttribute('xmlns:r', Util.schemas.relationships);

    const maxWorksheetNameLength = 31;
    const sheets = Util.createElement(doc, 'sheets');
    for (let i = 0, l = this.worksheets.length; i < l; i++) {
      const sheet = doc.createElement('sheet');
      // Microsoft Excel (2007, 2013) do not allow worksheet names longer than 31 characters
      // if the worksheet name is longer, Excel displays an "Excel found unreadable content..." popup when opening the file
      if (typeof console !== 'undefined' && this.worksheets[i].name.length > maxWorksheetNameLength) {
        console.log(
          `Microsoft Excel requires work sheet names to be less than ${maxWorksheetNameLength + 1} characters long, work sheet name "${
            this.worksheets[i].name
          }" is ${this.worksheets[i].name.length} characters long`,
        );
      }
      sheet.setAttribute('name', this.worksheets[i].name);
      sheet.setAttribute('sheetId', i + 1);
      sheet.setAttribute('r:id', this.relations.getRelationshipId(this.worksheets[i]));
      sheets.appendChild(sheet);
    }
    wb.appendChild(sheets);

    const definedNames = Util.createElement(doc, 'definedNames');
    let fallbackSheetCounter = 0;
    const printTitles = this.printTitles || {};

    // Existing print title behavior
    for (const name in printTitles) {
      const entry = printTitles[name];
      const definedName = doc.createElement('definedName');
      definedName.setAttribute('name', '_xlnm.Print_Titles');
      const localSheetId = this.worksheets.findIndex(ws => ws.name === name);
      definedName.setAttribute('localSheetId', localSheetId >= 0 ? localSheetId : fallbackSheetCounter++);

      let value = '';
      if (entry.top) {
        value += `${name}!$1:$${entry.top}`;
        if (entry.left) {
          value += ',';
        }
      }
      if (entry.left) {
        value += `${name}!$A:$${entry.left}`;
      }

      definedName.appendChild(doc.createTextNode(value));
      definedNames.appendChild(definedName);
    }

    // User-defined workbook names/functions
    for (const item of this.definedNames) {
      const definedName = doc.createElement('definedName');
      definedName.setAttribute('name', item.name);
      const localSheetId = this.resolveDefinedNameScope(item.scope);
      if (localSheetId !== undefined) {
        definedName.setAttribute('localSheetId', localSheetId);
      }
      if (item.comment) {
        definedName.setAttribute('comment', item.comment);
      }
      if (item.hidden) {
        definedName.setAttribute('hidden', '1');
      }
      // workbook.xml definedName content is stored without a leading '='
      definedName.appendChild(doc.createTextNode(item.refersTo.replace(/^=/, '')));
      definedNames.appendChild(definedName);
    }

    wb.appendChild(definedNames);

    return doc;
  }

  /** Creates the package-level relationship pointing to the workbook part. */
  createWorkbookRelationship() {
    const doc = Util.createXmlDoc(Util.schemas.relationshipPackage, 'Relationships');
    const relationships = doc.documentElement;
    relationships.appendChild(
      Util.createElement(doc, 'Relationship', [
        ['Id', 'rId1'],
        ['Type', Util.schemas.officeDocument],
        ['Target', 'xl/workbook.xml'],
      ]),
    );
    return doc;
  }

  /** Assigns package paths and adds shared workbook parts to the file map. */
  _generateCorePaths(files: any, paths: Record<string, string> = Paths) {
    this.relations.paths = paths;
    for (let i = 0; i < this.worksheets.length; i++) {
      const worksheet = this.worksheets[i];
      paths[worksheet.id] = `worksheets/sheet${i + 1}.xml`;
      if (worksheet.relations) {
        worksheet.relations.paths = paths;
      }
    }
    let i: number;
    let l: number;
    paths[this.styleSheet.id] = 'styles.xml';
    paths[this.sharedStrings.id] = 'sharedStrings.xml';
    paths[this.id] = '/xl/workbook.xml';

    for (i = 0, l = this.tables.length; i < l; i++) {
      files[`/xl/tables/table${i + 1}.xml`] = this.tables[i].toXML();
      paths[this.tables[i].id] = `/xl/tables/table${i + 1}.xml`;
    }

    for (const fileName in this.media) {
      const media = this.media[fileName];
      files[`/xl/media/${fileName}`] = media.data;
      paths[fileName] = `/xl/media/${fileName}`;
    }

    for (i = 0, l = this.drawings.length; i < l; i++) {
      this.drawings[i].relations.paths = paths;
      files[`/xl/drawings/drawing${i + 1}.xml`] = this.drawings[i].toXML();
      paths[this.drawings[i].id] = `/xl/drawings/drawing${i + 1}.xml`;
      files[`/xl/drawings/_rels/drawing${i + 1}.xml.rels`] = this.drawings[i].relations.toXML();
    }

    for (i = 0, l = this.charts.length; i < l; i++) {
      files[`/xl/charts/chart${i + 1}.xml`] = this.charts[i].toChartSpaceXML();
      paths[this.charts[i].id] = `/xl/charts/chart${i + 1}.xml`;
    }
  }

  private packageXml(value: XMLDOM | string): string {
    let content: string;
    if (typeof value === 'string' || value instanceof XMLDOM) {
      content = String(value);
    } else {
      // Compatibility with custom DOM exporters. Our own XML never needs namespace cleanup.
      content = (value as any).xml || new window.XMLSerializer().serializeToString(value as any);
      content = content
        .replace(/xmlns=""/g, '')
        .replace(/NS[\d]+:/g, '')
        .replace(/xmlns:NS[\d]+=""/g, '');
    }
    return content.startsWith('<?xml') ? content : `${XMLDOM.declaration}\n${content}`;
  }

  private *metadataFiles(): Generator<[string, string | Iterable<string>]> {
    yield ['/[Content_Types].xml', this.packageXml(this.createContentTypes())];
    yield ['/_rels/.rels', this.packageXml(this.createWorkbookRelationship())];
    yield ['/xl/styles.xml', this.packageXml(this.styleSheet.toXML())];
    yield ['/xl/workbook.xml', this.packageXml(this.toXML())];
    yield [
      '/xl/sharedStrings.xml',
      this.sharedStrings.toXML !== SharedStrings.prototype.toXML && this.sharedStrings.getXmlChunks === SharedStrings.prototype.getXmlChunks
        ? this.packageXml(this.sharedStrings.toXML())
        : this.sharedStrings.getXmlChunks(),
    ];
    yield ['/xl/_rels/workbook.xml.rels', this.packageXml(this.relations.toXML())];
  }

  /** Adds metadata parts and serializes XML values in the package file map. */
  _prepareFilesForPackaging(files: { [path: string]: XMLDOM | string }) {
    for (const [path, value] of this.metadataFiles()) {
      files[path] = typeof value === 'string' ? value : [...value].join('');
    }
    for (const path of Object.keys(files)) {
      if (isXmlPath(path)) {
        files[path] = this.packageXml(files[path]);
      }
    }
  }

  /** Generate XML entries in order, populating shared strings before writing their table. */
  *generateFileEntries(): Generator<[string, string | Iterable<string>]> {
    const files: Record<string, XMLDOM | string> = Object.create(null);
    // Keep relationship paths local; the exported Paths object remains available to legacy callers.
    this._generateCorePaths(files, Object.create(null));
    for (const path of Object.keys(files)) {
      yield [path, isXmlPath(path) ? this.packageXml(files[path]) : String(files[path])];
      delete files[path];
    }
    for (let i = 0; i < this.worksheets.length; i++) {
      const worksheet = this.worksheets[i];
      yield [
        `/xl/worksheets/sheet${i + 1}.xml`,
        worksheet.toXML !== Worksheet.prototype.toXML && worksheet.getXmlChunks === Worksheet.prototype.getXmlChunks
          ? this.packageXml(worksheet.toXML())
          : worksheet.getXmlChunks(),
      ];
      if (worksheet.relations) {
        yield [`/xl/worksheets/_rels/sheet${i + 1}.xml.rels`, this.packageXml(worksheet.relations.toXML())];
      }
    }
    yield* this.metadataFiles();
  }

  async generateFiles(): Promise<{ [path: string]: string }> {
    const files: Record<string, string> = Object.create(null);
    let deadline = Date.now() + 8;
    for (const [path, content] of this.generateFileEntries()) {
      if (typeof content === 'string') {
        files[path] = content;
      } else {
        const chunks: string[] = [];
        for (const chunk of content) {
          chunks.push(chunk);
          if (Date.now() >= deadline) {
            await new Promise(resolve => setTimeout(resolve, 0));
            deadline = Date.now() + 8;
          }
        }
        files[path] = chunks.join('');
      }
    }
    return files;
  }

  /** Return workbook XML header */
  serializeHeader(): string {
    return '<?xml version="1.0" encoding="UTF-8"?><workbook>';
  }

  /** Return workbook XML footer */
  serializeFooter(): string {
    return '</workbook>';
  }
}
