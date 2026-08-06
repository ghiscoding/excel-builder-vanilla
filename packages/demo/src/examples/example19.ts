import { createWorkbook, downloadExcelFile } from 'excel-builder-vanilla';

export default class Example19 {
  exportBtnElm!: HTMLButtonElement;

  mount() {
    this.exportBtnElm = document.querySelector('#export-custom-function') as HTMLButtonElement;
    this.exportBtnElm.addEventListener('click', this.startProcess.bind(this));
  }

  unmount() {
    this.exportBtnElm.removeEventListener('click', this.startProcess.bind(this));
  }

  startProcess() {
    const workbook = createWorkbook();
    const worksheet = workbook.createWorksheet({ name: 'Sales' });

    // Workbook-level constant used by formulas on the worksheet.
    workbook.addDefinedName('TaxRate', '=0.08');

    // Workbook-defined custom functions implemented as named LAMBDA formulas.
    workbook.addCustomFunction('CUSTOMSUM', ['values'], 'SUM(values)');
    workbook.addCustomFunction('SAFEAVERAGE', ['values'], 'IF(COUNT(values)=0,0,AVERAGE(values))', {
      comment: 'Average with zero fallback to avoid divide-by-zero issues',
      autoPrefixXlfn: true,
    });

    worksheet.setData([
      ['Q1', 'Q2', 'Q3', 'Total', 'Average', 'Tax'],
      [120, 150, 170, { value: 'CUSTOMSUM(A2:C2)', metadata: { type: 'formula' } }, { value: 'SAFEAVERAGE(A2:C2)', metadata: { type: 'formula' } }, { value: 'D2*TaxRate', metadata: { type: 'formula' } }],
      [90, 110, 95, { value: 'CUSTOMSUM(A3:C3)', metadata: { type: 'formula' } }, { value: 'SAFEAVERAGE(A3:C3)', metadata: { type: 'formula' } }, { value: 'D3*TaxRate', metadata: { type: 'formula' } }],
      [210, 190, 230, { value: 'CUSTOMSUM(A4:C4)', metadata: { type: 'formula' } }, { value: 'SAFEAVERAGE(A4:C4)', metadata: { type: 'formula' } }, { value: 'D4*TaxRate', metadata: { type: 'formula' } }],
    ]);

    worksheet.setColumns([{ width: 10 }, { width: 10 }, { width: 10 }, { width: 14 }, { width: 14 }, { width: 12 }]);

    workbook.addWorksheet(worksheet);

    downloadExcelFile(workbook, 'Workbook-Custom-Functions.xlsx');
  }
}
