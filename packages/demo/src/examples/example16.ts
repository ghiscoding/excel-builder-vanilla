import { createExcelFileStream, createWorkbook, type ExcelColumnMetadata } from 'excel-builder-vanilla';

import './example16.scss';

const ROWS = 50_000;

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

    // Merged header row with style
    albumList.mergeCells('A1', 'D1');
    const stylesheet = artistWorkbook.getStyleSheet();
    const header = stylesheet.createFormat({
      alignment: { horizontal: 'center' },
      font: { bold: true, color: 'FF2b995d', size: 13 },
    });

    // Row height and style
    const boldRow = stylesheet.createFormat({ font: { italic: true, underline: true } });
    albumList.setRowInstructions(2, { height: 40, style: boldRow.id });

    // Fonts, colors, borders
    const red = 'FFFF0000';
    const importantFormatter = stylesheet.createFormat({
      font: { bold: true, color: red },
      border: {
        bottom: { color: red, style: 'thin' },
        top: { color: red, style: 'thin' },
        left: { color: red, style: 'thin' },
        right: { color: red, style: 'dotted' },
      },
    });
    const themeColor = stylesheet.createFormat({ font: { bold: true, color: { theme: 3 } } });

    // Number/date formatting
    const currency = stylesheet.createFormat({ format: '$#,##0.00' });

    // Alignment
    const centerAlign = stylesheet.createFormat({ alignment: { horizontal: 'center' } });

    // Build large random dataset for export only, asynchronously
    const originalData: (number | string | boolean | Date | null | ExcelColumnMetadata)[][] = [
      [{ value: 'Merged Header', metadata: { style: header.id } }, '', '', '', '', ''],
      [
        { value: 'Artist', metadata: { style: importantFormatter.id } },
        { value: 'Album', metadata: { style: themeColor.id } },
        { value: 'Price', metadata: { style: themeColor.id } },
        { value: 'Quantity', metadata: { style: themeColor.id } },
        { value: 'Total', metadata: { style: themeColor.id } },
      ],
    ];

    async function generateDataAsync() {
      const batchSize = 2000;
      for (let i = 0; i < ROWS; i += batchSize) {
        for (let j = 0; j < batchSize && i + j < ROWS; j++) {
          const idx = i + j;
          const artist = `Artist ${idx + 1}`;
          const album = `Album ${idx + 1}`;
          const price = Math.round(Math.random() * 10000) / 100;
          const quantity = Math.floor(Math.random() * 10) + 1;
          const rowNum = idx + 3; // +3 for header rows
          originalData.push([
            { value: artist, metadata: { style: centerAlign.id } },
            { value: album, metadata: { style: centerAlign.id } },
            { value: price, metadata: { style: currency.id } },
            { value: quantity, metadata: { style: centerAlign.id } },
            { value: `C${rowNum}*D${rowNum}`, metadata: { type: 'formula', style: currency.id } },
          ]);
        }
        await new Promise(requestAnimationFrame);
      }
    }

    (async () => {
      // Reset progress bar at the start of export, with a small delay for UI
      const progressElm = document.getElementById('progress') as HTMLDivElement;
      const progressBar = progressElm ? (progressElm.querySelector('.progress-bar') as HTMLDivElement) : null;
      if (progressElm && progressBar) {
        progressBar.style.width = '0%';
        progressBar.textContent = '';
        progressElm.setAttribute('aria-valuenow', '0');
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Generate data asynchronously
      await generateDataAsync();
      albumList.setData(originalData);
      albumList.setColumns([{ width: 30 }, { width: 20 }, { width: 10 }, { width: 10 }, { width: 15 }]);
      artistWorkbook.addWorksheet(albumList);

      // Streaming export with progress bar
      const stream = createExcelFileStream(artistWorkbook, { chunkSize: 10 });
      const chunks: Uint8Array[] = [];
      let processed = 0;
      const totalRows = ROWS;

      for await (const chunk of stream as AsyncIterable<Uint8Array>) {
        chunks.push(chunk);
        processed += chunk.length;
        if (progressElm && progressBar) {
          const percent = Math.min((processed / totalRows) * 100, 100);
          progressBar.style.width = `${percent}%`;
          progressElm.setAttribute('aria-valuenow', percent.toString());
          progressBar.textContent = `${percent.toFixed(1)}%`;
          void progressBar.offsetWidth;
        }
        // Artificial delay for demo purposes ONLY. Remove this in production for best performance.
        // In a real implementation, use: await new Promise(requestAnimationFrame);
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      // Combine chunks and trigger download
      const blob = new Blob(
        chunks.map(chunk => chunk.slice()),
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Artist WB - Streaming Features.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    })();
  }
}
