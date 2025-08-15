import { createExcelFileStream, createWorkbook } from 'excel-builder-vanilla';

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
    const originalData: (number | string | boolean | Date | null)[][] = [['Artist', 'Album', 'Price']];
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

    if (typeof window !== 'undefined' && stream && typeof stream.getReader === 'function') {
      // Browser: ReadableStream
      const reader = stream.getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        chunks.push(value);
        processed += value.length;
        const rowsExported = Math.floor(processed / (chunks.length > 0 ? chunks[0].length : 1)) * 1000;
        this.progressElm.textContent = `Exported ~${rowsExported} / ${ROWS} rows...`;
      }
    } else {
      // Node/fallback: async generator
      for await (const chunk of stream) {
        chunks.push(chunk);
        processed += 1000;
        this.progressElm.textContent = `Exported ${Math.min(processed, ROWS)} / ${ROWS} rows...`;
      }
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
    this.progressElm.textContent = 'Export complete!';
  }
}
