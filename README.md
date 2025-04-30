# Excel-Builder-Vanilla

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/tested%20with-vitest-fcc72b.svg?logo=vitest)](https://vitest.dev/)
[![codecov](https://codecov.io/gh/ghiscoding/excel-builder-vanilla/branch/main/graph/badge.svg)](https://codecov.io/gh/ghiscoding/excel-builder-vanilla)
[![Actions Status](https://github.com/ghiscoding/excel-builder-vanilla/actions/workflows/main.yml/badge.svg)](https://github.com/ghiscoding/excel-builder-vanilla/actions)

[![NPM downloads](https://img.shields.io/npm/dy/excel-builder-vanilla)](https://npmjs.org/package/excel-builder-vanilla)
[![npm](https://img.shields.io/npm/v/excel-builder-vanilla.svg?logo=npm&logoColor=fff&label=npm)](https://www.npmjs.com/package/excel-builder-vanilla)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/excel-builder-vanilla?color=success&label=gzip)](https://bundlephobia.com/result?p=excel-builder-vanilla)

## Documentation

📘 [Documentation](https://ghiscoding.gitbook.io/excel-builder-vanilla/) website powered by GitBook (_previous project docs were pulled from [web archive](http://web.archive.org/web/20160907052007/http://excelbuilderjs.com)_)

## Description

This lib allows you to build and write an Excel file dynamically, it does **not** include any reader capabilities making the library super lightweight for its main goal of strictly exporting to Excel.

### Comparison to similar libraries

Excel-buider-vanilla is at the minimum 8x times smaller than the most popular libraries (we used `Bundlephobia` to compare), excel-builder-vanilla is 16.5Kb gzip while [XLSX](https://bundlephobia.com/package/xlsx) is 136Kb and [ExcelJS](https://bundlephobia.com/package/exceljs) is 251Kb gzip. The reason as to why it's much smaller is very simple and relates these 2 major differences: 
- excel-builder-vanilla is ESM-Only (tree shakable) and all other libraries are only offering CJS (CommonJS) increasing their download/install size (not tree shakable)
- excel-builder-vanilla only offers Excel export (writing) but without any reading capabilities

## Live Demo

Visit the [**Live demo**](https://ghiscoding.github.io/excel-builder-vanilla/) to get started and see all available options and methods that the library offers (all the demos are WYSIWYG (what you is what you'll get, UI vs Export)).<br>
You can also take a look at the "[Used by](#used-by)" section below to see real world applications taking advantage of this library.

## Changelog

[CHANGELOG](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/excel-builder-vanilla/CHANGELOG.md)

## LICENSE

[MIT License](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/LICENSE.md)

## Project History
Excel-Builder-Vanilla is a fork of the popular [excel-builder.js](https://github.com/stephenliberty/excel-builder.js) project (thanks to @stephenliberty for this great library). The main goal of creating this fork was to modernize the project by removing old dependencies that are no longer necessary and also replace `JSZip` by `fflate` which provides an ESM build and is indirectly giving us better Tree Shaking. The other goal was also to provide an ESM build

The modernization steps:
- migrate to TypeScript (which is giving us TS Types `d.ts`)
- drop `Q` dependency (we now simply use native `Promise`)
- drop `Lodash` dependency (we now use native JS code)
- replace `JSZip` dependency with [`fflate`](https://github.com/101arrowz/fflate) which has an ESM build and offers better performance.
- bump version to `v3.0.0` as a `major` release (_the original project version was in the `2.x` range._)
  - note that the changelog did not exists prior to `v3.0.0`

The project now requires only 1 small dependency which is [fflate](https://github.com/101arrowz/fflate).

### Summary

This modernization is providing a huge decrease in the final build size, with only 1 dependency, and also offers better performance 🚀

## Installation

[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https:///pr.new/ghiscoding/excel-builder-vanilla)

```sh
npm install excel-builder-vanilla
```

The project offers 3 different build types, choose the best one depending on your use case
1. **ESM**: to `import from` (_**preferred**_)
2. **IIFE**: standalone script which provides `ExcelBuilder` on the `window` object

```ts
// ESM (preferred) - npm install
import { createWorksheet } from 'excel-builder-vanilla';

// IIFE - CDN
<script src="https://cdn.jsdelivr.net/npm/excel-builder-vanilla@3.0.1/dist/excel-builder.iife.js"></script>
<script>
  const worksheet = ExcelBuilder.createWorksheet(); // or window.ExcelBuilder.createWorksheet();
</script>
```

### CSP (Content Security Policy)
Please note that since we use `fflate` (which creates and compresses the Excel file before sending it to the browser), you might get some CSP errors because of its use of Web Workers. For that reason, you might need to adjust your CSP rules by adding `worker-src 'self' blob:;`

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self';
  worker-src 'self' blob:;" />
```

### Used by

This fork was created mostly to support Tree Shaking (ESM), to provide TS Types and finally to update all project dependencies. It is used by a few other Open Source libraries that I also maintain and require Excel export:

- [Angular-Slickgrid](https://github.com/ghiscoding/Angular-Slickgrid)
- [Aurelia-Slickgrid](https://github.com/ghiscoding/aurelia-slickgrid)
- [Slickgrid-React](https://github.com/ghiscoding/slickgrid-react)
- [Slickgrid-Universal](https://github.com/ghiscoding/slickgrid-universal)

## Contributions

[![PR](https://img.shields.io/badge/PR-Welcome-1abc9c)](https://github.com/ghiscoding/excel-builder-vanilla/pulls)

[Pull Request](https://github.com/ghiscoding/excel-builder-vanilla/pulls) are welcome, feel free to contribute.

### Development / Contributions

If you wish to contribute to the project, please follow the steps below:

**Note**: this project uses [pnpm workspaces](https://pnpm.io/workspaces), you can install pnpm by following their [installation](https://pnpm.io/installation) or use NodeJS `corepack enable` to run any of the pnpm scripts shown below:

1. clone the lib:
   - `git clone https://github.com/ghiscoding/excel-builder-vanilla`
2. install it with **pnpm** from the project root:
   - `pnpm install` OR `npx pnpm install`
3. run a full TypeScript build
   - `pnpm run build` OR `npx pnpm run build`
4. run in development mode (lib & demo)
   - `pnpm run dev` OR `npx pnpm run dev`

#### Pull Request Contribution

Before submitting a PR (pull request), please make sure that you followed these steps for a better chance of a successfull PR:

1. make sure that you have already executed `pnpm install`
2. run the Biome lint npm script (or simply use step 4)
   - `pnpm run biome:lint:write`
3. run the Biome code formatting npm script (or simply use step 4)
   - `pnpm run biome:format:write`
4. run a full Build (this will also run Biome lint/format, so you could skip step 2)
   - `pnpm run build`

### Packages

| Package Name | NPM downloads | Size (gzip) | Changes | Description |
| -------------| ------- | ----------- | ------- | ----------- |
| [excel-builder-vanilla](https://github.com/ghiscoding/excel-builder-vanilla/tree/main/packages/excel-builder-vanilla) | [![NPM downloads](https://img.shields.io/npm/dm/excel-builder-vanilla)](https://npmjs.org/package/excel-builder-vanilla) | [![npm bundle size](https://img.shields.io/bundlephobia/minzip/excel-builder-vanilla?color=success&label=gzip)](https://bundlephobia.com/result?p=excel-builder-vanilla) | [changelog](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/excel-builder-vanilla/CHANGELOG.md) | `excel-builder-vanilla` library package |
| [excel-builder-vanilla-types](https://github.com/ghiscoding/excel-builder-vanilla/tree/main/packages/excel-builder-vanilla-types) | [![NPM downloads](https://img.shields.io/npm/dm/@excel-builder-vanilla/types)](https://npmjs.org/package/@excel-builder-vanilla/types) | [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@excel-builder-vanilla/types?color=success&label=gzip)](https://bundlephobia.com/result?p=@excel-builder-vanilla/types) | [changelog](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/excel-builder-vanilla-types/CHANGELOG.md) | `excel-builder-vanilla` dts types only package.

## Sponsors

<div>
  <span>
    <a href="https://github.com/wundergraph" class="Link" title="Wundergraph" target="_blank"><img src="https://avatars.githubusercontent.com/u/64281914" class="avatar" width="50" height="50" valign="middle" /></a>
  </span>
  &nbsp;
  <span>
    <a href="https://github.com/johnsoncodehk" class="Link" title="johnsoncodehk (Volar)" target="_blank"><img src="https://avatars.githubusercontent.com/u/16279759" class="avatar avatar-user" width="50" height="50" valign="middle" /></a>
  </span>
   &nbsp;
  <span>
    <a href="https://github.com/kevinburkett" class="Link" title="kevinburkett" target="_blank"><img class="circle avatar-user" src="https://avatars.githubusercontent.com/u/48218815?s=52&amp;v=4" class="avatar avatar-user" width="45" height="45" valign="middle" /></a>
  </span>
  &nbsp;
  <span>
    <a href="https://github.com/anton-gustafsson" class="Link" title="anton-gustafsson" target="_blank"><img src="https://avatars.githubusercontent.com/u/22906905?s=52&v=4" class="avatar avatar-user" width="50" height="50" valign="middle" /></a>
  </span>
  &nbsp;
  <span>
    <a href="https://github.com/gibson552" class="Link" title="gibson552" target="_blank"><img src="https://avatars.githubusercontent.com/u/84058359?s=52&v=4" class="avatar avatar-user" width="50" height="50" valign="middle" /></a>
  </span>
</div>
