# Excel-Builder-Vanilla

## Documentation

📘 [Documentation](https://ghiscoding.gitbook.io/excel-builder-vanilla/) website powered by GitBook

## Live Demo

Available [**Live demo**](https://ghiscoding.github.io/excel-builder-vanilla/) which displays all available options/methods.

## Installation

```sh
npm install excel-builder-vanilla
```

The project offers 3 different bundle types, choose the best for your use case
1. ESM: to `import from` (preferred)
2. IIFE: standalone script with `ExcelBuilder` available on the `window` object

```ts
// ESM - npm install
import { createWorksheet } from 'excel-builder-vanilla';

// IIFE - CDN
<script src="https://cdn.jsdelivr.net/npm/excel-builder-vanilla@3.0.1/dist/excel-builder.iife.js"></script>
<script>
  const worksheet = ExcelBuilder.createWorksheet();
</script>
```

## Changelog

[CHANGELOG](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/excel-builder-vanilla/CHANGELOG.md)

## LICENSE

[MIT License](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/LICENSE.md)
