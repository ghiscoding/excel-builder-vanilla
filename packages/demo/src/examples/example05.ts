import { createExcelFile, createWorkbook } from 'excel-builder-vanilla';

import { downloader } from './demoUtils';
import './example05.scss';

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
    const currency = artistWorkbook.getStyleSheet().createFormat({
      format: '$#,##0.00',
    });

    // or by using
    // const currencyFormat = artistWorkbook.getStyleSheet().createNumberFormatter('$#,##0.00');
    // const currency = artistWorkbook.getStyleSheet().createFormat({format: currencyFormat.id});

    // you can get the Date format directly form Excel-Builder
    const date = artistWorkbook.getStyleSheet().createSimpleFormatter('date');

    const originalData = [
      ['Artist', 'Album', 'Price', 'Date Modified'],
      [
        'Buckethead',
        'Albino Slug',
        { value: 8.99, metadata: { style: currency.id } },
        { value: new Date(2024, 1, 1), metadata: { type: 'date', style: date.id } },
      ],
      [
        'Buckethead',
        'Electric Tears',
        { value: 13.99, metadata: { style: currency.id } },
        { value: new Date(2024, 1, 2), metadata: { type: 'date', style: date.id } },
      ],
      [
        'Buckethead',
        'Colma',
        { value: 11.34, metadata: { style: currency.id } },
        { value: new Date(2024, 1, 3), metadata: { type: 'date', style: date.id } },
      ],
      [
        'Crystal Method',
        'Vegas',
        { value: 10.54, metadata: { style: currency.id } },
        { value: new Date(2024, 1, 4), metadata: { type: 'date', style: date.id } },
      ],
      [
        'Crystal Method',
        'Tweekend',
        { value: 10.64, metadata: { style: currency.id } },
        { value: new Date(2024, 1, 5), metadata: { type: 'date', style: date.id } },
      ],
      [
        'Crystal Method',
        'Divided By Night',
        { value: 8.99, metadata: { style: currency.id } },
        { value: new Date(2024, 1, 6), metadata: { type: 'date', style: date.id } },
      ],
    ];

    albumList.setData(originalData);
    albumList.setColumns([{ width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }]);
    artistWorkbook.addWorksheet(albumList);

    createExcelFile(artistWorkbook).then(excelBlob => {
      const downloadOptions = {
        filename: 'Artist WB.xlsx',
        format: 'xlsx',
      };

      // start downloading but add the Blob property only on the start download not on the event itself
      downloader({ ...downloadOptions, blob: excelBlob, data: albumList.data });
    });
  }
}
