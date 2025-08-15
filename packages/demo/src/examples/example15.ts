import { createWorkbook, createExcelFileStream } from 'excel-builder-vanilla';

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
    const ROWS = 100_000;
    const originalData = [['Artist', 'Album', 'Price']];
    for (let i = 0; i < ROWS; i++) {
      originalData.push([`Artist ${i}`, `Album ${i}`, Math.round(Math.random() * 10000) / 100]);
    }

    const artistWorkbook = createWorkbook();
    const albumList = artistWorkbook.createWorksheet({ name: 'Artists' });
    albumList.setData(originalData);
    artistWorkbook.addWorksheet(albumList);

    // Streaming export
    const stream = createExcelFileStream(artistWorkbook, { chunkSize: 1000 });
    const chunks: Uint8Array[] = [];
    let processed = 0;

    for await (const chunk of stream) {
      chunks.push(chunk);
      processed += 1000;
      console.log(`Exported ${Math.min(processed, ROWS)} / ${ROWS} rows...`);
      this.progressElm.textContent = `Exported ${Math.min(processed, ROWS)} / ${ROWS} rows...`;
    }

    // Combine chunks and trigger download
    const blob = new Blob(chunks, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LargeArtistWB.xlsx';
    a.click();
    URL.revokeObjectURL(url);
    this.progressElm.textContent = 'Export complete!';
  }
}
