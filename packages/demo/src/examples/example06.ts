import { ExcelBuilder } from 'excel-builder-vanilla';
import { MimeType, downloader } from './demoUtils';
import './example06.scss';

export default class Example {
  exportBtnElm!: HTMLButtonElement;

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

    new ExcelBuilder().createFile(artistWorkbook, { type: 'blob', mimeType: MimeType.xlsx }).then(excelBlob => {
      const downloadOptions = {
        filename: 'Artist WB.xlsx',
        format: 'xlsx',
      };

      // start downloading but add the Blob property only on the start download not on the event itself
      downloader({ ...downloadOptions, blob: excelBlob, data: albumList.data });
    });
  }
}
