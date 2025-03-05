# Change Log
## Visit the [Excel-Builder-Vanilla](https://github.com/ghiscoding/excel-builder-vanilla) GitHub project or take a look at the [Live Demo](https://ghiscoding.github.io/excel-builder-vanilla)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.1.0](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.14...v3.1.0) (2025-03-05)

### Features

* support inserting pictures in Excel, closes [#83](https://github.com/ghiscoding/excel-builder-vanilla/issues/83) ([16745f6](https://github.com/ghiscoding/excel-builder-vanilla/commit/16745f688aff1801695d2ce324a70bb92c2e8212)) - by @ghiscoding

## [3.0.14](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.13...v3.0.14) (2024-10-13)

### Bug Fixes

* run attw and use correct index file entries ([19c3e99](https://github.com/ghiscoding/excel-builder-vanilla/commit/19c3e99c2963a5dc5849ba2c395ae90f7cf89d03)) - by @ghiscoding

## [3.0.13](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.12...v3.0.13) (2024-10-13)

### Bug Fixes

* type package add back type module ([ce77971](https://github.com/ghiscoding/excel-builder-vanilla/commit/ce77971412e8978873d3e3ef19240a74480d9f0a)) - by @ghiscoding

## [3.0.12](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.11...v3.0.12) (2024-10-11)

### Bug Fixes

* remove tsup, replace with Vite + dts-bundle-generator ([2f8431f](https://github.com/ghiscoding/excel-builder-vanilla/commit/2f8431f27d18d0eaddbf53bdb16f9b649cb9a414)) - by @ghiscoding

## [3.0.11](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.10...v3.0.11) (2024-10-05)

### Bug Fixes

* add missing interfaces export ([fb67ae6](https://github.com/ghiscoding/excel-builder-vanilla/commit/fb67ae6de79ce2f7ae37afcf680b81e195b37eb5)) - by @ghiscoding

## [3.0.10](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.9...v3.0.10) (2024-10-05)

### Bug Fixes

* avoid barrel files, keep only 1 entry file ([c9f34a0](https://github.com/ghiscoding/excel-builder-vanilla/commit/c9f34a092dec3db3dc446f5b4a0f0db1dcec9522)) - by @ghiscoding

## [3.0.9](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.8...v3.0.9) (2024-10-04)

### Bug Fixes

* full CJS/ESM hybrid support with tsup ([c5e5349](https://github.com/ghiscoding/excel-builder-vanilla/commit/c5e53497c2b268dfedccab1018490f5484b3d335)) - by @ghiscoding

## [3.0.8](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.7...v3.0.8) (2024-10-03)

### Bug Fixes

* improve hybrid exports CJS/ESM ([4e5502d](https://github.com/ghiscoding/excel-builder-vanilla/commit/4e5502dae1a837db779457e32d0c436374afab23)) - by @ghiscoding

## [3.0.7](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.6...v3.0.7) (2024-09-06)

### Bug Fixes

* include all d.ts files for types pkg to detect change ([3031593](https://github.com/ghiscoding/excel-builder-vanilla/commit/3031593f19e5b8d231885029367992551d998479)) - by @ghiscoding

## [3.0.6](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.5...v3.0.6) (2024-09-06)

### Bug Fixes

* use `prop in` instead of `.hasOwn(prop)` ([0051d83](https://github.com/ghiscoding/excel-builder-vanilla/commit/0051d833170151e96d90aea0763642c44de51cb0)) - by @ghiscoding
* use `prop in` instead of `.hasOwn(prop)` & add Drawings tests ([35a4c63](https://github.com/ghiscoding/excel-builder-vanilla/commit/35a4c63a1abc6ff5f1ee86827fcff272d7f63352)) - by @ghiscoding

## [3.0.5](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.4...v3.0.5) (2024-09-03)

### Bug Fixes

* remove node from package exports ([c3dfba4](https://github.com/ghiscoding/excel-builder-vanilla/commit/c3dfba40f03b84f26b03b8ac1686e5579e7a987c)) - by @ghiscoding

## [3.0.4](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.3...v3.0.4) (2024-09-03)

### Bug Fixes

* package export not detected as ESM in Vitest ([fa66ea7](https://github.com/ghiscoding/excel-builder-vanilla/commit/fa66ea7a32e467acf6c9fef5509754a97a994936)) - by @ghiscoding

## [3.0.3](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.2...v3.0.3) (2024-08-29)

**Note:** Version bump only for package excel-builder-vanilla-root

## [3.0.2](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.0.1...v3.0.2) (2024-08-29)

### Features

* create `@excel-builder-vanilla/types` package for types only ([8d6841c](https://github.com/ghiscoding/excel-builder-vanilla/commit/8d6841cce1c940399aa2958b6e77cb4dd855ee40)) - by @ghiscoding

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
* add Date type instead of only timestamp [refresh gh-pages] ([8277723](https://github.com/ghiscoding/excel-builder-vanilla/commit/82777235a237a8952875383d427d973712ada1da)) - by @ghiscoding
* migrate from `JSZip` to `fflate` ([dab3928](https://github.com/ghiscoding/excel-builder-vanilla/commit/dab3928c88fe5624acbd76ceb742630a00111fd9)) - by @ghiscoding
* migrate to TypeScript, drop `Q` dependency & add demo ([4a807b8](https://github.com/ghiscoding/excel-builder-vanilla/commit/4a807b8710edc4170c7d732eb3192e584c909805)) - by @ghiscoding
* remove Lodash use native code & migrate to TypeScript ([97fce8a](https://github.com/ghiscoding/excel-builder-vanilla/commit/97fce8aaf31395170496fe3d39af127e942bf18e)) - by @ghiscoding

### Bug Fixes

* Allow spaces to be placed in SharedStrings file ([abf901e](https://github.com/ghiscoding/excel-builder-vanilla/commit/abf901eed1a7eca7baf63298bffa7008a7129c7a)) - by @ghiscoding

### Performance Improvements

* use fflate `zip` (sync) for web worker, instead of `zipAsync` ([518f457](https://github.com/ghiscoding/excel-builder-vanilla/commit/518f45767660bc8b048d4003bfb26189fc0a95d0)) - by @ghiscoding
