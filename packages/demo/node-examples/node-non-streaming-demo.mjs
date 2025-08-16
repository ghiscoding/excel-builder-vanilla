import fs from 'node:fs';
import path from 'node:path';
import { createExcelFile, createWorkbook } from 'excel-builder-vanilla';

// Build data array (same as streaming example)
const ROWS = 1000;
const dataArray = [];

// Add header row at row 0, merged and styled
const workbook = createWorkbook();
const worksheet = workbook.createWorksheet({ name: 'Demo Non-Streaming' });

// Create a format for the header row
const stylesheet = workbook.getStyleSheet();
const headerFormat = stylesheet.createFormat({
  alignment: { horizontal: 'center' },
  font: { bold: true, color: 'FF2b995d', size: 13 },
});

dataArray.push([{ value: 'NodeJS Non-Streaming Output', metadata: { style: headerFormat.id } }]);
dataArray.push(['ID', 'Name', 'Score']);
for (let i = 1; i <= ROWS; i++) {
  dataArray.push([i, `User ${i}`, Math.floor(Math.random() * 100)]);
}
// Add a formula cell for the total score
dataArray.push(['', 'Total', { value: `SUM(C2:C${ROWS + 2})`, metadata: { type: 'formula' } }]);

worksheet.setData(dataArray);
worksheet.mergeCells('A1', 'C1');
workbook.addWorksheet(worksheet);

// Ensure temp folder exists
const tempDir = path.resolve(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}
const outputPath = path.join(tempDir, 'node-non-streaming-example15.xlsx');

(async () => {
  let buffer = await createExcelFile(workbook, {
    outputType: 'Uint8Array',
    fileFormat: 'xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    downloadType: 'node',
  });
  // If buffer is a Blob (browser fallback), convert to ArrayBuffer
  if (buffer instanceof Blob) {
    buffer = new Uint8Array(await buffer.arrayBuffer());
  }
  fs.writeFileSync(outputPath, buffer);
  console.log(`Excel file written to ${outputPath}`);
})();
