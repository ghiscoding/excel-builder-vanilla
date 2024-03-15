import { uniqueId } from '../utilities';
import type { Drawings } from './Drawings';
import { Paths } from './Paths';
import { RelationshipManager } from './RelationshipManager';
import { SharedStrings } from './SharedStrings';
import { StyleSheet } from './StyleSheet';
import type { Table } from './Table';
import { Util } from './Util';
import { Worksheet } from './Worksheet';
import { XMLDOM } from './XMLDOM';

/**
 * @module Excel/Workbook
 */
/* globals console: true */
export class Workbook {
  id = uniqueId('Workbook');
  styleSheet = new StyleSheet();
  sharedStrings = new SharedStrings();
  relations = new RelationshipManager();
  worksheets: Worksheet[] = [];
  tables: Table[] = [];
  drawings: Drawings[] = [];
  media: any = {};
  printTitles: any;

  constructor() {
    this.initialize();
  }

  initialize() {
    this.id = uniqueId('Workbook');
    this.styleSheet = new StyleSheet();
    this.sharedStrings = new SharedStrings();
    this.relations = new RelationshipManager();
    this.relations.addRelation(this.styleSheet, 'stylesheet');
    this.relations.addRelation(this.sharedStrings, 'sharedStrings');
  }

  createWorksheet(config?: any) {
    config = Object.assign({}, { name: 'Sheet '.concat(String(this.worksheets.length + 1)) }, config);
    return new Worksheet(config);
  }

  getStyleSheet() {
    return this.styleSheet;
  }

  addTable(table: Table) {
    this.tables.push(table);
  }

  addDrawings(drawings: Drawings) {
    this.drawings.push(drawings);
  }

  /**
   * Set number of rows to repeat for this sheet.
   *
   * @param {String} sheet name
   * @param {int} number of rows to repeat from the top
   * @returns {undefined}
   */
  setPrintTitleTop(inSheet: string, inRowCount: number) {
    if (this.printTitles == null) {
      this.printTitles = {};
    }
    if (this.printTitles[inSheet] == null) {
      this.printTitles[inSheet] = {};
    }
    this.printTitles[inSheet].top = inRowCount;
  }

  /**
   * Set number of rows to repeat for this sheet.
   *
   * @param {String} sheet name
   * @param {int} number of columns to repeat from the left
   * @returns {undefined}
   */
  setPrintTitleLeft(inSheet: string, inRowCount: number) {
    if (this.printTitles == null) {
      this.printTitles = {};
    }
    if (this.printTitles[inSheet] == null) {
      this.printTitles[inSheet] = {};
    }
    //WARN: this does not handle AA, AB, etc.
    this.printTitles[inSheet].left = String.fromCharCode(64 + inRowCount);
  }

  addMedia(_type: string, fileName: string, fileData: any, contentType: any) {
    const fileNamePieces = fileName.split('.');
    const extension = fileNamePieces[fileNamePieces.length - 1];
    if (!contentType) {
      switch (extension.toLowerCase()) {
        case 'jpeg':
        case 'jpg':
          contentType = 'image/jpeg';
          break;
        case 'png':
          contentType = 'image/png';
          break;
        case 'gif':
          contentType = 'image/gif';
          break;
        default:
          contentType = null;
          break;
      }
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

  addWorksheet(worksheet: Worksheet) {
    this.relations.addRelation(worksheet, 'worksheet');
    worksheet.setSharedStringCollection(this.sharedStrings);
    this.worksheets.push(worksheet);
  }

  createContentTypes() {
    const doc = Util.createXmlDoc(Util.schemas.contentTypes, 'Types');
    const types = doc.documentElement;
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

    const extensions: any = {};
    for (const filename in this.media) {
      if (this.media.hasOwn(filename)) {
        extensions[this.media[filename].extension] = this.media[filename].contentType;
      }
    }
    for (const extension in extensions) {
      if (extensions.hasOwn(extension)) {
        types.appendChild(
          Util.createElement(doc, 'Default', [
            ['Extension', extension],
            ['ContentType', extensions[extension]],
          ]),
        );
      }
    }

    types.appendChild(
      Util.createElement(doc, 'Override', [
        ['PartName', '/xl/workbook.xml'],
        ['ContentType', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml'],
      ]),
    );
    types.appendChild(
      Util.createElement(doc, 'Override', [
        ['PartName', '/xl/sharedStrings.xml'],
        ['ContentType', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml'],
      ]),
    );
    types.appendChild(
      Util.createElement(doc, 'Override', [
        ['PartName', '/xl/styles.xml'],
        ['ContentType', 'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml'],
      ]),
    );

    for (i = 0, l = this.worksheets.length; i < l; i++) {
      types.appendChild(
        Util.createElement(doc, 'Override', [
          ['PartName', `/xl/worksheets/sheet${i + 1}.xml`],
          ['ContentType', 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml'],
        ]),
      );
    }
    for (i = 0, l = this.tables.length; i < l; i++) {
      types.appendChild(
        Util.createElement(doc, 'Override', [
          ['PartName', `/xl/tables/table${i + 1}.xml`],
          ['ContentType', 'application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml'],
        ]),
      );
    }

    for (i = 0, l = this.drawings.length; i < l; i++) {
      types.appendChild(
        Util.createElement(doc, 'Override', [
          ['PartName', `/xl/drawings/drawing${i + 1}.xml`],
          ['ContentType', 'application/vnd.openxmlformats-officedocument.drawing+xml'],
        ]),
      );
    }

    return doc;
  }

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

    //now to add repeating rows
    const definedNames = Util.createElement(doc, 'definedNames');
    let ctr = 0;
    for (const name in this.printTitles) {
      if (!this.printTitles.hasOwn(name)) {
        continue;
      }
      const entry = this.printTitles[name];
      const definedName = doc.createElement('definedName');
      definedName.setAttribute('name', '_xlnm.Print_Titles');
      definedName.setAttribute('localSheetId', ctr++);

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
    wb.appendChild(definedNames);

    return doc;
  }

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

  _generateCorePaths(files: any) {
    let i: number;
    let l: number;
    Paths[this.styleSheet.id] = 'styles.xml';
    Paths[this.sharedStrings.id] = 'sharedStrings.xml';
    Paths[this.id] = '/xl/workbook.xml';

    for (i = 0, l = this.tables.length; i < l; i++) {
      files[`/xl/tables/table${i + 1}.xml`] = this.tables[i].toXML();
      Paths[this.tables[i].id] = `/xl/tables/table${i + 1}.xml`;
    }

    for (const fileName in this.media) {
      if (this.media.hasOwn(fileName)) {
        const media = this.media[fileName];
        files[`/xl/media/${fileName}`] = media.data;
        Paths[fileName] = `/xl/media/${fileName}`;
      }
    }

    for (i = 0, l = this.drawings.length; i < l; i++) {
      files[`/xl/drawings/drawing${i + 1}.xml`] = this.drawings[i].toXML();
      Paths[this.drawings[i].id] = `/xl/drawings/drawing${i + 1}.xml`;
      files[`/xl/drawings/_rels/drawing${i + 1}.xml.rels`] = this.drawings[i].relations.toXML();
    }
  }

  _prepareFilesForPackaging(files: { [path: string]: XMLDOM | string }) {
    Object.assign(files, {
      '/[Content_Types].xml': this.createContentTypes(),
      '/_rels/.rels': this.createWorkbookRelationship(),
      '/xl/styles.xml': this.styleSheet.toXML(),
      '/xl/workbook.xml': this.toXML(),
      '/xl/sharedStrings.xml': this.sharedStrings.toXML(),
      '/xl/_rels/workbook.xml.rels': this.relations.toXML(),
    });

    for (const [key, value] of Object.entries(files)) {
      if (key.indexOf('.xml') !== -1 || key.indexOf('.rels') !== -1) {
        if (value instanceof XMLDOM) {
          files[key] = value.toString();
        } else {
          files[key] = (value as any).xml || new window.XMLSerializer().serializeToString(value as any);
        }
        let content = (files[key] as string).replace(/xmlns=""/g, '');
        content = content.replace(/NS[\d]+:/g, '');
        content = content.replace(/xmlns:NS[\d]+=""/g, '');
        files[key] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n${content}`;
      }
    }
  }

  generateFiles(): Promise<{ [path: string]: string }> {
    return new Promise(resolve => {
      const files: any = {};
      this._generateCorePaths(files);

      for (let i = 0, l = this.worksheets.length; i < l; i++) {
        files[`/xl/worksheets/sheet${i + 1}.xml`] = this.worksheets[i].toXML();
        Paths[this.worksheets[i].id] = `worksheets/sheet${i + 1}.xml`;
        files[`/xl/worksheets/_rels/sheet${i + 1}.xml.rels`] = this.worksheets[i].relations.toXML();
      }

      this._prepareFilesForPackaging(files);

      return resolve(files);
    });
  }
}
