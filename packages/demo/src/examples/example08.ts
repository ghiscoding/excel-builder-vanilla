import { createWorkbook, downloadExcelFile } from 'excel-builder-vanilla';

import './example08.scss';

export default class Example {
  exportBtnElm!: HTMLButtonElement;

  mount() {
    this.exportBtnElm = document.querySelector('#export') as HTMLButtonElement;
    this.exportBtnElm.addEventListener('click', this.startProcess.bind(this));
  }

  unmount() {
    // remove event listeners to avoid DOM leaks
    this.exportBtnElm.removeEventListener('click', this.startProcess.bind(this));
  }

  startProcess() {
    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

    const stylesheet = artistWorkbook.getStyleSheet();
    const currencyFormat = stylesheet.createFormat({ format: '$#,##0.00' });

    const originalData = [
      [
        { value: 'Artist' },
        { value: 'Album' },
        { value: 'Price' },
        { value: 'Quantity' },
        { value: 'Taxable' },
        { value: 'Sub-Total' },
        { value: 'Taxes' },
        { value: 'Total' },
      ],
      [
        'Buckethead',
        'Albino Slug',
        { value: 8.99, metadata: { style: currencyFormat.id } },
        5,
        true,
        { value: 'C2*D2', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'IF(E2=TRUE,F2*0.075,0)', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'F2+G2', metadata: { type: 'formula', style: currencyFormat.id } },
      ],
      [
        'Buckethead',
        'Electric Tears',
        { value: 13.99, metadata: { style: currencyFormat.id } },
        7,
        true,
        { value: 'C3*D3', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'IF(E3=TRUE,F3*0.075,0)', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'F3+G3', metadata: { type: 'formula', style: currencyFormat.id } },
      ],
      [
        'Buckethead',
        'Colma',
        { value: 11.34, metadata: { style: currencyFormat.id } },
        9,
        false,
        { value: 'C4*D4', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'IF(E4=TRUE,F4*0.075,0)', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'F4+G4', metadata: { type: 'formula', style: currencyFormat.id } },
      ],
      [
        'Crystal Method',
        'Vegas',
        { value: 10.54, metadata: { style: currencyFormat.id } },
        3,
        true,
        { value: 'C5*D5', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'IF(E5=TRUE,F5*0.075,0)', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'F5+G5', metadata: { type: 'formula', style: currencyFormat.id } },
      ],
      [
        'Crystal Method',
        'Tweekend',
        { value: 10.64, metadata: { style: currencyFormat.id } },
        1,
        false,
        { value: 'C6*D6', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'IF(E6=TRUE,F6*0.075,0)', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'F6+G6', metadata: { type: 'formula', style: currencyFormat.id } },
      ],
      [
        'Crystal Method',
        'Divided By Night',
        { value: 8.99, metadata: { style: currencyFormat.id } },
        56,
        true,
        { value: 'C7*D7', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'IF(E7=TRUE,F7*0.075,0)', metadata: { type: 'formula', style: currencyFormat.id } },
        { value: 'F7+G7', metadata: { type: 'formula', style: currencyFormat.id } },
      ],
    ];

    albumList.setData(originalData);
    albumList.setColumns([{ width: 30 }, { width: 20 }, { width: 10 }]);

    artistWorkbook.addWorksheet(albumList);

    downloadExcelFile(artistWorkbook, 'Artist WB.xlsx');
  }
}
