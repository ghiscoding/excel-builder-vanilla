import { ExcelBuilder } from 'excel-builder-vanilla';
import { downloader } from './demoUtils';
import './example05.scss';

export default class Example {
  exportBtnElm!: HTMLButtonElement;
  originalData = [
    ['Artist', 'Album', 'Price'],
    ['Buckethead', 'Albino Slug', 8.99],
    ['Buckethead', 'Electric Tears', 13.99],
    ['Buckethead', 'Colma', 11.34],
    ['Crystal Method', 'Vegas', 10.54],
    ['Crystal Method', 'Tweekend', 10.64],
    ['Crystal Method', 'Divided By Night', 8.99],
  ];

  mount() {
    this.exportBtnElm = document.querySelector('#export') as HTMLButtonElement;
    this.exportBtnElm.addEventListener('click', this.createExcelStruct.bind(this));
  }

  unmount() {
    // remove event listeners to avoid DOM leaks
    this.exportBtnElm.removeEventListener('click', this.createExcelStruct.bind(this));
  }

  createExcelStruct() {
    const artistWorkbook = new ExcelBuilder().createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });
    const currency = artistWorkbook.getStyleSheet().createFormat({
      format: '$#,##0.00',
    });

    // or by using
    // const currencyFormat = artistWorkbook.getStyleSheet().createNumberFormatter('$#,##0.00');
    // const currency = artistWorkbook.getStyleSheet().createFormat({format: currencyFormat.id});

    const originalData = [
      ['Artist', 'Album', 'Price'],
      ['Buckethead', 'Albino Slug', { value: 8.99, metadata: { style: currency.id } }],
      ['Buckethead', 'Electric Tears', { value: 13.99, metadata: { style: currency.id } }],
      ['Buckethead', 'Colma', { value: 11.34, metadata: { style: currency.id } }],
      ['Crystal Method', 'Vegas', { value: 10.54, metadata: { style: currency.id } }],
      ['Crystal Method', 'Tweekend', { value: 10.64, metadata: { style: currency.id } }],
      ['Crystal Method', 'Divided By Night', { value: 8.99, metadata: { style: currency.id } }],
    ];

    albumList.setData(originalData);
    artistWorkbook.addWorksheet(albumList);

    new ExcelBuilder().createFile(artistWorkbook).then(excelBlob => {
      const downloadOptions = {
        filename: 'Artist WB.xlsx',
        format: 'xlsx',
      };

      // start downloading but add the Blob property only on the start download not on the event itself
      downloader({ ...downloadOptions, blob: excelBlob, data: albumList.data });
    });
  }
}
