# Excel-Builder-Vanilla

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![NPM downloads](https://img.shields.io/npm/dy/excel-builder-vanilla)](https://npmjs.org/package/excel-builder-vanilla)
[![npm](https://img.shields.io/npm/v/excel-builder-vanilla.svg?logo=npm&logoColor=fff&label=npm)](https://www.npmjs.com/package/excel-builder-vanilla)
[![Actions Status](https://github.com/ghiscoding/excel-builder-vanilla/actions/workflows/main.yml/badge.svg)](https://github.com/ghiscoding/excel-builder-vanilla/actions)

## Live Demo

We also have a new [**Live demo**](https://ghiscoding.github.io/excel-builder-vanilla/) for displaying all available options/methods. You can also take a look at the "[Used by](#used-by)" section below to see real world applications taking advantage of this library.

## Documentation

📘 [Documentation](https://ghiscoding.gitbook.io/excel-builder-vanilla/) website powered by GitBook

## Description

Excel-Builder-Vanilla is a fork of the popular [excel-builder.js](https://github.com/stephenliberty/excel-builder.js) library (thanks to @stephenliberty for this great lib). This fork was based on its latest known version. The main difference from the original lib is that we migrated the project to TypeScript and dropped the `Q` and `Lodash` dependencies and we now use native code and this mean there is only 1 external dependency left which is JSZip.

This lib allows you to build an Excel file dynamically.

To get started take a look at the [Live demo](https://ghiscoding.github.io/excel-builder-vanilla/) for all available options and methods that the library offers.

The [Live demo](https://ghiscoding.github.io/excel-builder-vanilla/) website

## Installation

```sh
npm install excel-builder-vanilla
```

## Changelog

[CHANGELOG](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/excel-builder-vanilla/CHANGELOG.md)

## LICENSE

[MIT License](https://github.com/ghiscoding/excel-builder-vanilla/blob/main/LICENSE)

### Used by

This fork was created mostly to drop jQuery, and is used by a few other Open Source libraries that I also maintain:

- [Angular-Slickgrid](https://github.com/ghiscoding/Angular-Slickgrid)
- [Aurelia-Slickgrid](https://github.com/ghiscoding/aurelia-slickgrid)
- [Slickgrid-React](https://github.com/ghiscoding/slickgrid-react)
- [Slickgrid-Universal](https://github.com/ghiscoding/slickgrid-universal)

## Contributions

[![PR](https://img.shields.io/badge/PR-Welcome-1abc9c)](https://github.com/ghiscoding/excel-builder-vanilla/pulls)

[Pull Request](https://github.com/ghiscoding/excel-builder-vanilla/pulls) are welcome, feel free to contribute.

### Development / Contributions

If you wish to contribute to the project, please follow these steps:

**Note**: this project uses [pnpm workspaces](https://pnpm.io/workspaces), you can install pnpm by following their [installation](https://pnpm.io/installation) or simply run `npx pnpm` to run any of the pnpm scripts shown below:

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
2. run the Prettier code formatting npm script (or use step 3)
   - `pnpm run prettier:write`
3. run a full Build (this will also run Prettier format, so you could skip step 2)
   - `pnpm run build`
