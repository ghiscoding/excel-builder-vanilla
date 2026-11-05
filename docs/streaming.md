# Streaming Export API

Streaming export is designed for large datasets, providing better performance and memory efficiency in both browser and NodeJS environments. The API and features are the same as the regular export, all the features like formulas, alignments, borders, and everything else are all supported.

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

> **Note:** some NodeJS scripts can be found in the [packages/demo/node-examples/](https://github.com/ghiscoding/excel-builder-vanilla/tree/main/packages/demo/node-examples/) folder.

## ZIP compression

`zipOptions` accepts fflate ZIP options, including `level` from 0 through 9. The default is 6. Lower levels can reduce export time at the cost of a larger file; level 0 stores entries without compression. Try level 1 for large exports when speed matters more than file size, and measure with your own data.

```ts
createExcelFileStream(workbook, { zipOptions: { level: 1 } });
downloadExcelFile(workbook, 'export.xlsx', { zipOptions: { level: 1 } });
await createExcelFile(workbook, 'Uint8Array', { zipOptions: { level: 1 } });
```

The following are median total export times and archive sizes from three Node runs per level, using a synthetic worksheet of 100,000 rows × 10 columns (alternating numbers and 100 repeated strings). Sizes are decimal MB. The stream was fully consumed into memory; complete-file output was a `Uint8Array`.

| Level | Stream time | Stream size | Complete-file time | Complete-file size |
| ---: | ---: | ---: | ---: | ---: |
| 0 | 0.66 s | 33.88 MB | 0.91 s | 33.88 MB |
| 1 | 1.18 s | 5.61 MB | 1.42 s | 5.58 MB |
| 3 | 1.28 s | 4.06 MB | 1.52 s | 4.03 MB |
| 6 (default) | 2.42 s | 3.93 MB | 2.72 s | 3.91 MB |
| 9 | 3.95 s | 3.91 MB | 4.42 s | 3.89 MB |

Measured on Linux x64, Intel Core i7-8750H, Node 24.16.0 and fflate 0.8.3, at revision `043dd6aa271e8c6f3c9649675a8e1a45b4d777af` (library 5.3.1). Each sample used a fresh process and a 500-row warmup at the same level. Workbook construction and ZIP validation were excluded from export time. XML generation and compression are interleaved in the streaming path, so these totals do not isolate either phase. Each archive was decompressed and its worksheet XML hash and one million cell count checked across all runs and paths; this was not a test in Excel or LibreOffice. No browser measurements were made. Timing and size vary with data, hardware, and runtime.

To reproduce from the repository root, build the library and run the benchmark. Arguments select rows and sample count; the default is 100,000 rows and three samples. Larger runs require substantially more memory.

```sh
pnpm --filter excel-builder-vanilla exec vite build
node --expose-gc vitest/zip-level-benchmark.mjs 100000 3
```

## Supported Features

All features such as formulas, alignments, borders, styles, and images work with streaming export. The only difference is how the file is delivered.

## See Also

- [Formulas](formulas.md)
- [Alignment](alignment.md)
- [Borders](fonts-and-colors.md)
- [Tables](tables.md)
- [Headers/Footers](worksheet-headers-footers.md)
