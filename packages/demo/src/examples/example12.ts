import { createExcelFile, createWorkbook } from 'excel-builder-vanilla';

import { downloader } from './demoUtils';
import './example12.scss';

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
    const originalData = [
      ['Artist', 'Album', 'Price'],
      ['Buckethead', 'Albino Slug', 8.99],
      ['Buckethead', 'Electric Tears', 13.99],
      ['Buckethead', 'Colma', 11.34],
      ['Crystal Method', 'Vegas', 10.54],
      ['Crystal Method', 'Tweekend', 10.64],
      ['Crystal Method', 'Divided By Night', 8.99],
    ];

    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

    albumList.setData(originalData);

    albumList.setHeader([
      'This will be on the left',
      ['In the middle ', { text: 'I shall be', bold: true }],
      { text: 'Right, underlined and size of 16', font: 16, underline: true },
    ]);

    albumList.setFooter(['Date of print: &D &T', '&A', 'Page &P of &N']);
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
