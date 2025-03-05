import { createWorkbook, downloadExcelFile, Drawings, Picture, Table } from 'excel-builder-vanilla';

import './example13.scss';

export default class Example {
  exportBtnElm!: HTMLButtonElement;
  // GitHub logo, must be in `base64` format
  githubLogoBase64 =
    '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';

  mount() {
    this.exportBtnElm = document.querySelector('#export') as HTMLButtonElement;
    this.exportBtnElm.addEventListener('click', this.startProcess.bind(this));
    document.querySelector<HTMLImageElement>('#pic1')!.src = `data:image/png;base64,${this.githubLogoBase64}`;
  }

  unmount() {
    // remove event listeners to avoid DOM leaks
    this.exportBtnElm.removeEventListener('click', this.startProcess.bind(this));
  }

  startProcess() {
    const workbook = createWorkbook();
    const worksheet = workbook.createWorksheet({ name: 'TestSheet' });

    const originalData = [
      ['Artist', 'Album', 'Price'],
      ['Buckethead', 'Albino Slug', 8.99],
      ['Buckethead', 'Electric Tears', 13.99],
      ['Buckethead', 'Colma', 11.34],
      ['Crystal Method', 'Vegas', 10.54],
      ['Crystal Method', 'Tweekend', 10.64],
      ['Crystal Method', 'Divided By Night', 8.99],
    ];

    const albumTable = new Table();
    albumTable.styleInfo.themeStyle = 'TableStyleDark2';
    albumTable.setReferenceRange([1, 1], [3, originalData.length]);
    albumTable.setTableColumns(['Artist', 'Album', 'Price']);

    // worksheet.sheetView.showGridLines = false;
    worksheet.setData(originalData);
    workbook.addWorksheet(worksheet);

    worksheet.addTable(albumTable);
    workbook.addTable(albumTable);

    const drawings = new Drawings();
    const picRef = workbook.addMedia('image', 'logo.png', this.githubLogoBase64);
    const picture = new Picture();
    picture.createAnchor('twoCellAnchor', {
      from: {
        x: 5,
        y: 2,
      },
      to: {
        x: 7,
        y: 8,
      },
    });

    picture.setMedia(picRef);
    drawings.addDrawing(picture);
    worksheet.addDrawings(drawings);
    workbook.addDrawings(drawings);

    downloadExcelFile(workbook, 'Fruits.xlsx');
  }
}
