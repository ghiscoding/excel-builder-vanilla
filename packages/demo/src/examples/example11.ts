import { Table, createExcelFile, createWorkbook } from 'excel-builder-vanilla';

import { downloader } from './demoUtils';
import './example11.scss';

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
    const albumTable = new Table();

    const originalData = [
      ['Artist', 'Album', 'Price'],
      ['Buckethead', 'Albino Slug', 8.99],
      ['Buckethead', 'Electric Tears', 13.99],
      ['Buckethead', 'Colma', 11.34],
      ['Crystal Method', 'Vegas', 10.54],
      ['Crystal Method', 'Tweekend', 10.64],
      ['Crystal Method', 'Divided By Night', 8.99],
      ['Highest Price', 'test', { value: `SUBTOTAL(104,${albumTable.name}[Price])`, metadata: { type: 'formula' } }],
    ];

    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

    albumTable.styleInfo.themeStyle = 'TableStyleDark2'; //This is a predefined table style
    albumTable.setReferenceRange([1, 1], [3, originalData.length]);
    albumTable.totalsRowCount = 1;

    //Table columns are required, even if headerRowCount is zero. The name of the column also must match the
    //data in the column cell that is the header - keep this in mind for localization
    albumTable.setTableColumns([
      { name: 'Artist', totalsRowLabel: 'Highest Price' },
      { name: 'Album', totalsRowLabel: 'test' },
      { name: 'Price', totalsRowFunction: 'max' },
    ]);

    albumList.setData(originalData);
    artistWorkbook.addWorksheet(albumList);

    albumList.addTable(albumTable);
    artistWorkbook.addTable(albumTable);

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
