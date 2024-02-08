import { createWorkbook, downloadExcelFile } from 'excel-builder-vanilla';

import './example06.scss';

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

    const centerAlign = artistWorkbook.getStyleSheet().createFormat({
      alignment: {
        horizontal: 'center',
      },
    });

    const originalData = [
      [
        { value: 'Artist', metadata: { style: centerAlign.id } },
        { value: 'Album', metadata: { style: centerAlign.id } },
        { value: 'Price', metadata: { style: centerAlign.id } },
      ],
      ['Buckethead', 'Albino Slug', 8.99],
      ['Buckethead', 'Electric Tears', 13.99],
      ['Buckethead', 'Colma', 11.34],
      ['Crystal Method', 'Vegas', 10.54],
      ['Crystal Method', 'Tweekend', 10.64],
      ['Crystal Method', 'Divided By Night', 8.99],
    ];

    albumList.setData(originalData);
    albumList.setColumns([{ width: 30 }, { width: 30 }, { width: 30 }]);

    artistWorkbook.addWorksheet(albumList);

    downloadExcelFile(artistWorkbook, 'Artist WB.xlsx');
  }
}
