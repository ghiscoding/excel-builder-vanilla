# Excel-Builder-Vanilla

## Documentation

📘 [Documentation](https://ghiscoding.gitbook.io/excel-builder-vanilla/) website powered by GitBook

## Live Demo

Available [**Live demo**](https://ghiscoding.github.io/excel-builder-vanilla/) which displays a rough WYSIWYG (What You See Is What You Get) idea of all available options/methods.

## Installation

```sh
npm install excel-builder-vanilla
```

```ts
// ESM - npm install
import { createWorkbook } from 'excel-builder-vanilla';
```

Types omit private implementation members, including underscore-prefixed class members, for compatibility with `@excel-builder-vanilla/types`. Use public methods such as `setHeader()` and `setRowInstructions()` to configure worksheets.

### Basic Usage

```ts
import { downloadExcelFile, Workbook } from 'excel-builder-vanilla';

const originalData = [
  ['Artist', 'Album', 'Price'],
  ['Buckethead', 'Albino Slug', 8.99],
  ['Buckethead', 'Electric Tears', 13.99],
  ['Buckethead', 'Colma', 11.34],
];
const artistWorkbook = new Workbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Artists' });
albumList.setData(originalData);
artistWorkbook.addWorksheet(albumList);

downloadExcelFile(artistWorkbook, 'Artist WB.xlsx');
```

### Large exports and streams

`createExcelFile()` serializes worksheet rows directly and yields periodically during XML generation. It returns a complete `Blob` or `Uint8Array`. Use `createExcelFileStream()` to consume incremental XLSX ZIP output: browsers receive a `ReadableStream<Uint8Array>` and Node receives an async generator.

```ts
import { createExcelFileStream } from 'excel-builder-vanilla';

const output = createExcelFileStream(artistWorkbook, {
  chunkSize: 64 * 1024,
  zipOptions: { level: 1 },
});

if ('getReader' in output) {
  const reader = output.getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      await writeToDestination(value);
    }
  } catch (error) {
    await reader.cancel();
    throw error;
  } finally {
    reader.releaseLock();
  }
} else {
  for await (const chunk of output) await writeToDestination(chunk);
}
```

`writeToDestination` represents your destination's byte-writing function. `chunkSize` limits output bytes per chunk and must be a positive integer. Generation follows reader demand; cancelling the reader or returning from the Node iteration stops export. The workbook retains its input rows and shared strings, and each media payload is decoded before compression. Very wide rows, many unique strings, and large style/drawing collections still affect memory usage. Keep worksheet data and configuration stable until export completes.

Streaming always produces XLSX bytes. The existing `outputType`, `fileFormat`, `mimeType`, and `downloadType` options remain accepted with their previous behavior: they do not alter the stream output or select the environment. Set the filename and MIME type on your destination. Compression defaults to level 6. Level 1 trades some file size for faster export; choose a level using your own data.

### Reuse styles

Create a style once and reuse its ID across cells. Every `createFormat()` call allocates a new format and may allocate nested font, fill, border, and number formats.

```ts
const amountStyle = artistWorkbook.getStyleSheet().createFormat({ format: '0.00' });
albumList.setData([
  [{ value: 8.99, metadata: { style: amountStyle.id } }],
  [{ value: 13.99, metadata: { style: amountStyle.id } }],
]);
```

### Export validation

Normal and streaming ZIP exports reject entry paths containing `.` or `..` segments, empty segments, backslashes, colons, or control characters. A single leading package slash is accepted. This also applies to media filenames and custom `generateFiles()` output; validation happens when exporting, not in `addMedia()`.

XML serialization rejects element and attribute names containing markup delimiters or control characters, including malformed style keys. `XMLNode.setAttribute()` rejects names that would overwrite node members, such as `__proto__`, `children`, or `toString`. Ordinary attribute updates and removal with `null` remain supported. These checks do not validate the full XML/OOXML schema or sanitize custom XML strings supplied by exporters.

## Changelog

[CHANGELOG](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/excel-builder-vanilla/CHANGELOG.md)

## LICENSE

[MIT License](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/LICENSE.md)

## Major Changes

- **version 3.0** - initial release (forked from original `excel-builder` library)
- **version 4.0** - build as ESM-Only and drop CJS (CommonJS) build (aka `require()`)
- **version 5.0** - drop the legacy IIFE build and the use of `window` object (legacy `<script>` loading)
