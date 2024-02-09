import { Workbook, downloadExcelFile } from 'excel-builder-vanilla';

import { buildHtmlTable } from './demoUtils';
import './example01.scss';

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
    const tableContainerElm = document.querySelector('.table-container') as HTMLDivElement;
    tableContainerElm.appendChild(buildHtmlTable(this.originalData));

    this.exportBtnElm = document.querySelector('#export') as HTMLButtonElement;
    this.exportBtnElm.addEventListener('click', this.startProcess.bind(this));
  }

  unmount() {
    // remove event listeners to avoid DOM leaks
    this.exportBtnElm.removeEventListener('click', this.startProcess.bind(this));
  }

  startProcess() {
    const artistWorkbook = new Workbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Artists' });
    albumList.setData(this.originalData);
    artistWorkbook.addWorksheet(albumList);

    downloadExcelFile(artistWorkbook, 'Artist WB.xlsx');
  }
}