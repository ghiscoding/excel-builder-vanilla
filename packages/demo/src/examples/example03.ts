import { createWorkbook, downloadExcelFile } from 'excel-builder-vanilla';

import './example03.scss';

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
    // const stylesheet = artistWorkbook.getStyleSheet();

    // TODO: createDifferentialStyle() is causing issue, however the same code works fine with createFormat()
    // const boldDXF = stylesheet.createDifferentialStyle({
    const boldDXF = artistWorkbook.getStyleSheet().createFormat({
      font: {
        italic: true,
        underline: true,
      },
    });

    albumList.setRowInstructions(1, {
      height: 40,
      style: boldDXF.id,
    });
    albumList.setData(originalData);

    artistWorkbook.addWorksheet(albumList);

    downloadExcelFile(artistWorkbook, 'Artist WB.xlsx');
  }
}
