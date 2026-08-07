import { createExcelFileStream, createWorkbook, type ExcelColumnMetadata } from 'excel-builder-vanilla';

import './example15.scss';

const ROWS = 100_000;

export default class Example {
  exportBtnElm!: HTMLButtonElement;
  progressElm!: HTMLDivElement;

  mount() {
    this.exportBtnElm = document.querySelector('#export') as HTMLButtonElement;
    this.progressElm = document.querySelector('#progress') as HTMLDivElement;
    this.exportBtnElm.addEventListener('click', this.startProcess.bind(this));
  }

  unmount() {
    this.exportBtnElm.removeEventListener('click', this.startProcess.bind(this));
  }

  async startProcess() {
    const originalData: (number | string | boolean | Date | null | ExcelColumnMetadata)[][] = [
      ['Artist', 'Album', { value: 'Price', metadata: {} }],
    ];
    for (let i = 0; i < ROWS; i++) {
      const price = Math.round(Math.random() * 10000) / 100;
      originalData.push([`Artist ${i}`, `Album ${i}`, { value: price, metadata: {} }]);
    }

    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Artists' });

    // Apply currency format for Price column
    const stylesheet = artistWorkbook.getStyleSheet();
    const currencyFormat = stylesheet.createFormat({ format: '$#,##0.00' });

    // Update header to use currency style
    const headerCell = originalData[0][2];
    if (typeof headerCell === 'object' && headerCell !== null && 'metadata' in headerCell && headerCell.metadata) {
      headerCell.metadata.style = currencyFormat.id;
    }

    // Update all rows to use currency style for Price
    for (let i = 1; i < originalData.length; i++) {
      const cell = originalData[i][2];
      if (typeof cell === 'object' && cell !== null && 'metadata' in cell && cell.metadata) {
        cell.metadata.style = currencyFormat.id;
      }
    }

    albumList.setData(originalData);
    albumList.setHeader([
      'This will be on the left',
      ['In the middle ', { text: 'I shall be', bold: true }],
      { text: 'Right, underlined and size of 16', font: 16, underline: true },
    ]);
    albumList.setFooter(['Date of print: &D &T', '&A', 'Page &P of &N']);
    artistWorkbook.addWorksheet(albumList);

    // Streaming export
    const stream = createExcelFileStream(artistWorkbook, { chunkSize: 1000 });
    const chunks: Uint8Array[] = [];
    let processed = 0;

    // Use async iterator for both browser and Node
    for await (const chunk of stream as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
      processed += 1000;
      this.progressElm.textContent = `Exported ${Math.min(processed, ROWS)} / ${ROWS} rows...`;
    }

    // Combine chunks and trigger download
    const blob = new Blob(
      chunks.map(chunk => chunk.slice()),
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LargeArtistWB.xlsx';
    a.click();
    URL.revokeObjectURL(url);
    this.progressElm.textContent = `Export successfully ${ROWS} rows!`;
  }
}
