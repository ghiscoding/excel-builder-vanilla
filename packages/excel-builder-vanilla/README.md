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
import { createWorksheet } from 'excel-builder-vanilla';
```

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

## Changelog

[CHANGELOG](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/excel-builder-vanilla/CHANGELOG.md)

## LICENSE

[MIT License](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/LICENSE.md)

## Major Changes

- **version 3.0** - initial release (forked from original `excel-builder` library)
- **version 4.0** - build as ESM-Only and drop CJS (CommonJS) build (aka `require()`)
- **version 5.0** - drop the legacy IIFE build and the use of `window` object (legacy `<script>` loading)