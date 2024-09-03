# Change Log
## Visit the [Excel-Builder-Vanilla](https://github.com/ghiscoding/excel-builder-vanilla) GitHub project or take a look at the [Live Demo](https://ghiscoding.github.io/excel-builder-vanilla)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.5](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.4...v3.0.5) (2024-09-03)

### Bug Fixes

* remove node from package exports ([c3dfba4](https://github.com/ghiscoding/excel-builder-vanilla/commit/c3dfba40f03b84f26b03b8ac1686e5579e7a987c)) - by @ghiscoding

## [3.0.4](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.3...v3.0.4) (2024-09-03)

### Bug Fixes

* package export not detected as ESM in Vitest ([fa66ea7](https://github.com/ghiscoding/excel-builder-vanilla/commit/fa66ea7a32e467acf6c9fef5509754a97a994936)) - by @ghiscoding

## [3.0.3](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.2...v3.0.3) (2024-08-29)

**Note:** Version bump only for package excel-builder-vanilla

## [3.0.2](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.1...v3.0.2) (2024-08-29)

**Note:** Version bump only for package excel-builder-vanilla

## [3.0.1](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.0...v3.0.1) (2024-02-11)

### Bug Fixes

* add missing ExcelMetadata interface ([8a32a73](https://github.com/ghiscoding/excel-builder-vanilla/commit/8a32a73ea002c5139c0cb002f59728c3c48dd15f)) - by @ghiscoding
* add tests folder to npm publish ignore ([006e9f8](https://github.com/ghiscoding/excel-builder-vanilla/commit/006e9f8f8fd859e70e6f8a4d904e0572b01e45ea)) - by @ghiscoding
* check input type before calling string match on it ([9361aa6](https://github.com/ghiscoding/excel-builder-vanilla/commit/9361aa653c67af863d9ce2e75b2ec51027a094c8)) - by @ghiscoding

## 3.0.0 (2024-02-10)

### ⚠ BREAKING CHANGES

* migrate from `JSZip` to `fflate`
* remove Lodash use native code & migrate to TypeScript
* migrate to TypeScript, drop `Q` dependency & add demo

### Features

* add `downloadExcelFile()` method for easier browser download ([ec41114](https://github.com/ghiscoding/excel-builder-vanilla/commit/ec41114e080a9330d28820b31fc8887d89f1bfb6)) - by @ghiscoding
* add Date type instead of only timestamp ([0aab2b4](https://github.com/ghiscoding/excel-builder-vanilla/commit/0aab2b4c175e49511e1f511f088c12aecbc262d5)) - by @ghiscoding
* migrate from `JSZip` to `fflate` ([dab3928](https://github.com/ghiscoding/excel-builder-vanilla/commit/dab3928c88fe5624acbd76ceb742630a00111fd9)) - by @ghiscoding
* migrate to TypeScript, drop `Q` dependency & add demo ([4a807b8](https://github.com/ghiscoding/excel-builder-vanilla/commit/4a807b8710edc4170c7d732eb3192e584c909805)) - by @ghiscoding
* remove Lodash use native code & migrate to TypeScript ([97fce8a](https://github.com/ghiscoding/excel-builder-vanilla/commit/97fce8aaf31395170496fe3d39af127e942bf18e)) - by @ghiscoding

### Bug Fixes

* Allow spaces to be placed in SharedStrings file ([abf901e](https://github.com/ghiscoding/excel-builder-vanilla/commit/abf901eed1a7eca7baf63298bffa7008a7129c7a)) - by @ghiscoding

### Performance Improvements

* use fflate `zip` (sync) for web worker, instead of `zipAsync` ([518f457](https://github.com/ghiscoding/excel-builder-vanilla/commit/518f45767660bc8b048d4003bfb26189fc0a95d0)) - by @ghiscoding
