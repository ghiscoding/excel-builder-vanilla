# Excel-Builder-Vanilla

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/tested%20with-vitest-fcc72b.svg?logo=vitest)](https://vitest.dev/)
[![codecov](https://codecov.io/gh/ghiscoding/excel-builder-vanilla/branch/main/graph/badge.svg)](https://codecov.io/gh/ghiscoding/excel-builder-vanilla)

[![NPM downloads](https://img.shields.io/npm/dy/excel-builder-vanilla)](https://npmjs.org/package/excel-builder-vanilla)
[![npm](https://img.shields.io/npm/v/excel-builder-vanilla.svg?logo=npm&logoColor=fff&label=npm)](https://www.npmjs.com/package/excel-builder-vanilla)
[![Actions Status](https://github.com/ghiscoding/excel-builder-vanilla/actions/workflows/main.yml/badge.svg)](https://github.com/ghiscoding/excel-builder-vanilla/actions)

## Documentation

📘 [Documentation](https://ghiscoding.gitbook.io/excel-builder-vanilla/) website powered by GitBook

## Description

This lib allows you to build and write an Excel file dynamically, it does **not** include any reader capabilities.

## Live Demo

Visit the [**Live demo**](https://ghiscoding.github.io/excel-builder-vanilla/) to get started and see all available options and methods that the library offers.<br>
You can also take a look at the "[Used by](#used-by)" section below to see real world applications taking advantage of this library.

## Project History
Excel-Builder-Vanilla is a fork of the popular [excel-builder.js](https://github.com/stephenliberty/excel-builder.js) project (thanks to @stephenliberty for this great library). The main goal in creating this fork was to modernize the project by removing dependencies that are no longer necessary and replace JSZip by `fflate` which provides an ESM build giving us Tree Shaking. Also, the other goal was to provide an ESM bundle to slowly get away from CommonJS (CJS bundle is offered but we strongly suggest you migrate to the ESM approach)

The modernization steps:
- migrate to TypeScript (giving us Types `d.ts`)
- drop `Q` dependency (we simply use native `Promise`)
- drop `Lodash` dependency (we now use native JS code)
- replace `JSZip` dependency with [`fflate`](https://github.com/101arrowz/fflate) which has an ESM build offers better performance.

This modernization is providing a huge decrease in the final build size and is offering better performance 🚀

## Installation

```sh
npm install excel-builder-vanilla
```

The project offers 3 different bundle types, choose the best for your use case
1. ESM: to `import from` (prefered)
2. CJS: CommonJS to support old Node `require()`... might be removed in the future
3. IIFE: standalone script with `ExcelBuilder` available on the `window` object

```ts
// ESM - npm install
import { createWorksheet } from 'excel-builder-vanilla';

// CJS - npm install
const { createWorksheet } = require('excel-builder-vanilla');

// IIFE - CDN
<script src="https://cdn.jsdelivr.net/npm/excel-builder-vanilla@3.0.0/dist/excel-builder.cjs"></script>
```

## Changelog

[CHANGELOG](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/excel-builder-vanilla/CHANGELOG.md)

## LICENSE

[MIT License](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/LICENSE.md)

### Used by

This fork was created mostly to support Tree Shaking (ESM) and update all its dependencies. It is used by a few other Open Source libraries that I also maintain:

- [Angular-Slickgrid](https://github.com/ghiscoding/Angular-Slickgrid)
- [Aurelia-Slickgrid](https://github.com/ghiscoding/aurelia-slickgrid)
- [Slickgrid-React](https://github.com/ghiscoding/slickgrid-react)
- [Slickgrid-Universal](https://github.com/ghiscoding/slickgrid-universal)

## Contributions

[![PR](https://img.shields.io/badge/PR-Welcome-1abc9c)](https://github.com/ghiscoding/excel-builder-vanilla/pulls)

[Pull Request](https://github.com/ghiscoding/excel-builder-vanilla/pulls) are welcome, feel free to contribute.

### Development / Contributions

If you wish to contribute to the project, please follow these steps:

**Note**: this project uses [pnpm workspaces](https://pnpm.io/workspaces), you can install pnpm by following their [installation](https://pnpm.io/installation) or via `corepack enable` to run any of the pnpm scripts shown below:

1. clone the lib:
   - `git clone https://github.com/ghiscoding/excel-builder-vanilla`
2. install with **pnpm** from the root:
   - `pnpm install` OR `npx pnpm install`
3. run a full TypeScript build
   - `pnpm run build` OR `npx pnpm run build`
4. run in development mode (lib & demo)
   - `pnpm run dev` OR `npx pnpm run dev`

#### Pull Request Contribution

Before submitting a PR (pull request), please make sure that you followed these steps for your PR to succeed:

1. make sure that you already ran `pnpm install`
2. run the Biome lint npm script (or use step 4)
   - `pnpm run biome:lint:write`
3. run the Biome code formatting npm script (or use step 4)
   - `pnpm run biome:format:write`
4. run a full Build (this will also run Biome format, so you could skip step 2)
   - `pnpm run build`
