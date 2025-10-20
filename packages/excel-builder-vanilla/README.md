# Excel-Builder-Vanilla

## Documentation

📘 [Documentation](https://ghiscoding.gitbook.io/excel-builder-vanilla/) website powered by GitBook

## Live Demo

Available [**Live demo**](https://ghiscoding.github.io/excel-builder-vanilla/) which displays all available options/methods.

## Installation

```sh
npm install excel-builder-vanilla
```

The project offers 2 different bundle types, choose the best for your use case
1. ESM: to `import from` (preferred)
2. IIFE: standalone script with `ExcelBuilder` available on the `window` object

```ts
// ESM - npm install
import { createWorksheet } from 'excel-builder-vanilla';

// IIFE - CDN
<script src="https://cdn.jsdelivr.net/npm/excel-builder-vanilla@4.0.1/dist/excel-builder.iife.js"></script>
<script>
  const worksheet = ExcelBuilder.createWorksheet();
</script>
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
