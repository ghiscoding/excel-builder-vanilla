import { createWorkbook, downloadExcelFile } from 'excel-builder-vanilla';

import './example07.scss';

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

    const blue = 'FF0000FF';
    const header = stylesheet.createFormat({
      font: {
        bold: true,
        color: blue,
      },
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: 'FF00FF00',
      },
    });

    const artistNameFormat = stylesheet.createFormat({
      font: {
        color: 'FFFFFFFF',
      },
      fill: {
        type: 'gradient',
        degree: 180,
        start: 'FF92D050',
        end: { pureAt: 0.8, color: 'FF0070C0' },
      },
    });

    const originalData: any = [
      [
        { value: 'Artist', metadata: { style: header.id } },
        { value: 'Album', metadata: { style: header.id } },
        { value: 'Price', metadata: { style: header.id } },
      ],
      [{ value: 'Buckethead', metadata: { style: artistNameFormat.id } }, 'Albino Slug', 8.99],
      [{ value: 'Buckethead', metadata: { style: artistNameFormat.id } }, 'Electric Tears', 13.99],
      [{ value: 'Buckethead', metadata: { style: artistNameFormat.id } }, 'Colma', 11.34],
      [{ value: 'Crystal Method', metadata: { style: artistNameFormat.id } }, 'Vegas', 10.54],
      [{ value: 'Crystal Method', metadata: { style: artistNameFormat.id } }, 'Tweekend', 10.64],
      [{ value: 'Crystal Method', metadata: { style: artistNameFormat.id } }, 'Divided By Night', 8.99],
    ];

    albumList.setData(originalData);
    albumList.setColumns([{ width: 30 }, { width: 20 }, { width: 10 }]);

    artistWorkbook.addWorksheet(albumList);

    downloadExcelFile(artistWorkbook, 'Artist WB.xlsx');
  }
}
