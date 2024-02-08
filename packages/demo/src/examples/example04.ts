import { createWorkbook, downloadExcelFile } from 'excel-builder-vanilla';

import './example04.scss';

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

    const red = 'FFFF0000';
    const importantFormatter = stylesheet.createFormat({
      font: {
        bold: true,
        color: red,
      },
      border: {
        bottom: { color: red, style: 'thin' },
        top: { color: red, style: 'thin' },
        left: { color: red, style: 'thin' },
        right: { color: red, style: 'dotted' },
      },
    });

    const themeColor = stylesheet.createFormat({
      font: {
        bold: true,
        color: { theme: 3 },
      },
    });

    const originalData = [
      [
        { value: 'Artist', metadata: { style: importantFormatter.id } },
        { value: 'Album', metadata: { style: themeColor.id } },
        { value: 'Price', metadata: { style: themeColor.id } },
      ],
      ['Buckethead', 'Albino Slug', 8.99],
      ['Buckethead', 'Electric Tears', 13.99],
      ['Buckethead', 'Colma', 11.34],
      ['Crystal Method', 'Vegas', 10.54],
      ['Crystal Method', 'Tweekend', 10.64],
      ['Crystal Method', 'Divided By Night', 8.99],
    ];

    albumList.setData(originalData);
    albumList.setColumns([{ width: 30 }, { width: 20 }, { width: 10 }]);

    artistWorkbook.addWorksheet(albumList);

    downloadExcelFile(artistWorkbook, 'Artist WB.xlsx');
  }
}
