import fs from 'node:fs';
import path from 'node:path';
import { createExcelFileStream, createWorkbook } from 'excel-builder-vanilla';

// Build data array (same as browser example)
const ROWS = 1000;
const dataArray = [];

// Add header row at row 0, merged and styled
const workbook = createWorkbook();
const worksheet = workbook.createWorksheet({ name: 'Demo Streaming' });

// Create a format for the header row
const stylesheet = workbook.getStyleSheet();
const headerFormat = stylesheet.createFormat({
  alignment: { horizontal: 'center' },
  font: { bold: true, color: 'FF2b995d', size: 13 },
});

dataArray.push([{ value: 'NodeJS Streaming Output', metadata: { style: headerFormat.id } }]);
dataArray.push(['ID', 'Name', 'Score']);
for (let i = 1; i <= ROWS; i++) {
  dataArray.push([i, `User ${i}`, Math.floor(Math.random() * 100)]);
}
dataArray.push(['', 'Total', { value: `SUM(C2:C${ROWS + 2})`, metadata: { type: 'formula' } }]);

worksheet.setData(dataArray);
worksheet.mergeCells('A1', 'C1');
workbook.addWorksheet(worksheet);

// Ensure temp folder exists
const tempDir = path.resolve(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}
const outputPath = path.join(tempDir, 'node-streaming-example15.xlsx');
const output = fs.createWriteStream(outputPath);

(async () => {
  for await (const chunk of createExcelFileStream(workbook, {
    zipOptions: {},
    outputType: 'Uint8Array',
    fileFormat: 'xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    downloadType: 'node',
  })) {
    output.write(chunk);
  }
  output.end();
  console.log(`Excel file written to ${outputPath}`);
})();
