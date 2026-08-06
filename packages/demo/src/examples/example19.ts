import { createWorkbook, downloadExcelFile } from 'excel-builder-vanilla';

export default class Example19 {
  excelExportBtnElm!: HTMLButtonElement;
  portableExportBtnElm!: HTMLButtonElement;

  mount() {
    this.excelExportBtnElm = document.querySelector('#export-custom-function') as HTMLButtonElement;
    this.portableExportBtnElm = document.querySelector('#export-portable-values') as HTMLButtonElement;

    this.excelExportBtnElm.addEventListener('click', this.startExcelProcess.bind(this));
    this.portableExportBtnElm.addEventListener('click', this.startPortableProcess.bind(this));
  }

  unmount() {
    this.excelExportBtnElm.removeEventListener('click', this.startExcelProcess.bind(this));
    this.portableExportBtnElm.removeEventListener('click', this.startPortableProcess.bind(this));
  }

  startExcelProcess() {
    this.exportWorkbook('excel');
  }

  startPortableProcess() {
    this.exportWorkbook('portable');
  }

  exportWorkbook(mode: 'excel' | 'portable') {
    const workbook = createWorkbook();
    const worksheet = workbook.createWorksheet({ name: 'Sales' });
    const taxRate = 0.08;
    const rows = [
      { q1: 120, q2: 150, q3: 170 },
      { q1: 90, q2: 110, q3: 95 },
      { q1: 210, q2: 190, q3: 230 },
    ];

    if (mode === 'excel') {
      // Workbook-level constant used by formulas on the worksheet.
      workbook.addDefinedName('TaxRate', `=${taxRate}`);

      // Workbook-defined custom functions implemented as named LAMBDA formulas.
      workbook.addCustomFunction('CUSTOMSUM', ['values'], 'SUM(values)');
      workbook.addCustomFunction('SAFEAVERAGE', ['values'], 'IF(COUNT(values)=0,0,AVERAGE(values))', {
        comment: 'Average with zero fallback to avoid divide-by-zero issues',
      });

      const excelRows = rows.map((row, idx) => {
        const excelRow = idx + 2;
        return [
          row.q1,
          row.q2,
          row.q3,
          { value: `CUSTOMSUM(A${excelRow}:C${excelRow})`, metadata: { type: 'formula' } },
          { value: `SAFEAVERAGE(A${excelRow}:C${excelRow})`, metadata: { type: 'formula' } },
          { value: `D${excelRow}*TaxRate`, metadata: { type: 'formula' } },
        ];
      });

      worksheet.setData([['Q1', 'Q2', 'Q3', 'Total', 'Average', 'Tax'], ...excelRows]);
    } else {
      // Portable export writes calculated scalar values for suites that don't support Excel LAMBDA custom functions.
      const portableRows = rows.map(row => {
        const total = row.q1 + row.q2 + row.q3;
        const average = total / 3;
        const tax = total * taxRate;
        return [row.q1, row.q2, row.q3, total, average, tax];
      });

      worksheet.setData([['Q1', 'Q2', 'Q3', 'Total', 'Average', 'Tax'], ...portableRows]);
    }

    worksheet.setColumns([{ width: 10 }, { width: 10 }, { width: 10 }, { width: 14 }, { width: 14 }, { width: 12 }]);

    workbook.addWorksheet(worksheet);

    const fileName = mode === 'excel' ? 'Workbook-Custom-Functions-Excel.xlsx' : 'Workbook-Custom-Functions-Portable.xlsx';
    downloadExcelFile(workbook, fileName);
  }
}
