import { ExcelBuilder } from 'excel-builder-vanilla';

import { downloader } from './demoUtils';
import './example02.scss';

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

    albumList.setData(this.originalData);
    albumList.setColumns([{ width: 30 }, { width: 20, hidden: true }, { width: 10 }]);

    artistWorkbook.addWorksheet(albumList);

    new ExcelBuilder().createFile(artistWorkbook, { type: 'blob' }).then(excelBlob => {
      const downloadOptions = {
        filename: 'Artist WB.xlsx',
        format: 'xlsx',
      };

      // start downloading but add the Blob property only on the start download not on the event itself
      downloader({ ...downloadOptions, blob: excelBlob, data: albumList.data });
    });
  }
}
