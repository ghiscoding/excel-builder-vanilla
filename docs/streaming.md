# Streaming Excel Export

Streaming export is designed for large datasets, providing better performance and memory efficiency in both browser and NodeJS environments. The API and features are the same as the regular export and the features like formulas, alignment, borders, and more are all supported.

## Why Streaming?

Traditional export methods generate the entire Excel file in memory, which can hang the browser or consume excessive resources for large datasets. Streaming solves this by generating and delivering the file in chunks.

## Usage in the Browser

Use `createExcelFileStream` to export data as a stream. You can process chunks and update progress as needed.

```ts
import { createWorkbook, createExcelFileStream } from 'excel-builder-vanilla';

const workbook = createWorkbook();
const worksheet = workbook.createWorksheet({ name: 'Demo' });
worksheet.setData([
  ['Artist', 'Album', 'Price'],
  ['Buckethead', 'Albino Slug', 8.99],
  // ... more rows
]);
workbook.addWorksheet(worksheet);

const stream = createExcelFileStream(workbook, { chunkSize: 1000 });
const chunks: Uint8Array[] = [];
for await (const chunk of stream as AsyncIterable<Uint8Array>) {
  chunks.push(chunk);
  // Optionally update progress bar here
}
const blob = new Blob(chunks, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
const url = URL.createObjectURL(blob);
// Download with anchor tag
```

## Usage in NodeJS

Streaming in NodeJS works similarly, but you can pipe the output directly to a file stream.

```js
import fs from 'node:fs';
import { createWorkbook, createExcelFileStream } from 'excel-builder-vanilla';

const workbook = createWorkbook();
// ... add data and worksheets

const output = fs.createWriteStream('output.xlsx');
for await (const chunk of createExcelFileStream(workbook, { chunkSize: 1000 })) {
  output.write(chunk);
}
output.end();
```

## Supported Features

All features such as formulas, alignment, borders, styles, and images work with streaming export. The only difference is how the file is delivered.

## See Also

- [Formulas](formulas.md)
- [Alignment](alignment.md)
- [Borders](fonts-and-colors.md)
- [Tables](tables.md)
- [Headers/Footers](worksheet-headers-footers.md)
