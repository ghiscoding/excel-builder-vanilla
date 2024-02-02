import { Workbook } from '../Excel/Workbook';
import { Table } from '../Excel/Table';

export class Template {
  data: any;
  worksheet: any;
  workbook = new Workbook();
  stylesheet: any;

  columns: any = {};

  predefinedStyles: any = {};

  predefinedFormatters: any;
  table: Table;

  constructor(worksheetConstructorSettings: any) {
    if (worksheetConstructorSettings != null) {
      this.worksheet = this.workbook.createWorksheet(worksheetConstructorSettings);
    } else {
      this.worksheet = this.workbook.createWorksheet();
    }
    this.stylesheet = this.workbook.getStyleSheet();
    this.predefinedFormatters = {
      date: this.stylesheet.createSimpleFormatter('date'),
      currency: this.stylesheet.createFormat({ format: '$ #,##0.00;$ #,##0.00;-', font: { color: 'FFE9F50A' } }),
      header: this.stylesheet.createFormat({
        font: { bold: true, underline: true, color: { theme: 3 } },
        alignment: { horizontal: 'center' },
      }),
    };
    this.workbook.addWorksheet(this.worksheet);
    this.worksheet.setPageOrientation('landscape');
    this.table = new Table();
    this.table.styleInfo.themeStyle = 'TableStyleLight1';
    this.worksheet.addTable(this.table);
    this.workbook.addTable(this.table);
  }

  setHeader(...args: any[]) {
    this.worksheet.setHeader.apply(this.worksheet, args);
  }

  setFooter(...args: any[]) {
    this.worksheet.setFooter.apply(this.worksheet, args);
  }

  prepare() {
    return this.workbook;
  }

  setData(worksheetData: any) {
    this.worksheet.setData(worksheetData);
    this.data = worksheetData;
    this.table.setReferenceRange([1, 1], [this.columns.length, worksheetData.length]);
  }

  setColumns(columns: any) {
    this.columns = columns;
    this.worksheet.setColumns(columns);
    this.table.setTableColumns(columns);
    this.table.setReferenceRange([1, 1], [this.columns.length, this.data.length]);
  }

  getWorksheet() {
    return this.worksheet;
  }
}
