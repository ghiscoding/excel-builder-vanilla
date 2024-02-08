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

    const originalData = [
      [{ value: 'Artist' }, { value: 'Album' }, { value: 'Price' }, { value: 'Quantity' }, { value: 'Total' }],
      ['Buckethead', 'Albino Slug', 8.99, 5, { value: 'C2+D2', metadata: { type: 'formula' } }],
      ['Buckethead', 'Electric Tears', 13.99, 7, { value: 'C3+D3', metadata: { type: 'formula' } }],
      ['Buckethead', 'Colma', 11.34, 9, { value: 'C4+D4', metadata: { type: 'formula' } }],
      ['Crystal Method', 'Vegas', 10.54, 3, { value: 'C5+D5', metadata: { type: 'formula' } }],
      ['Crystal Method', 'Tweekend', 10.64, 1, { value: 'C6+D6', metadata: { type: 'formula' } }],
      ['Crystal Method', 'Divided By Night', 8.99, 56, { value: 'C7+D7', metadata: { type: 'formula' } }],
    ];

    albumList.setData(originalData);
    albumList.setColumns([{ width: 30 }, { width: 20 }, { width: 10 }]);

    artistWorkbook.addWorksheet(albumList);

    downloadExcelFile(artistWorkbook, 'Artist WB.xlsx');
  }
}
