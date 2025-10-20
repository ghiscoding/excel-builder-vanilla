# Change Log
## Visit the [Excel-Builder-Vanilla](https://github.com/ghiscoding/excel-builder-vanilla) GitHub project or take a look at the [Live Demo](https://ghiscoding.github.io/excel-builder-vanilla)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.1.3](https://github.com/ghiscoding/excel-builder-vanilla/compare/v4.1.2...v4.1.3) (2025-10-20)

### Bug Fixes

* add missing `columns` prop in WorksheetOption ([ddd4bf6](https://github.com/ghiscoding/excel-builder-vanilla/commit/ddd4bf6e6fa363be8177d219271ea2dd7c78760b)) - by @ghiscoding
* check ref instance before any other code in toXML() fn ([3f483b5](https://github.com/ghiscoding/excel-builder-vanilla/commit/3f483b5c9179368edcd17b29ca463dfdf45d792c)) - by @ghiscoding
* use the correct variable `yOff` w/assigning to same `to.yOff` var ([81ad4ca](https://github.com/ghiscoding/excel-builder-vanilla/commit/81ad4ca837f4bc12f2b46b9a9075b1cacc3188ff)) - by @ghiscoding

## [4.1.2](https://github.com/ghiscoding/excel-builder-vanilla/compare/v4.1.1...v4.1.2) (2025-10-18)

### Bug Fixes

* ExcelStyleInstruction props can also be numbers ([d9c0987](https://github.com/ghiscoding/excel-builder-vanilla/commit/d9c09877bf5bfdf088618805b402e450a1251d58)) - by @ghiscoding

## [4.1.1](https://github.com/ghiscoding/excel-builder-vanilla/compare/v4.1.0...v4.1.1) (2025-09-27)

### Bug Fixes

* **deps:** update all dependencies ([0bc0321](https://github.com/ghiscoding/excel-builder-vanilla/commit/0bc032173074ff274d40d78f5f38bb1dfdefda91)) - by @ghiscoding
* publish with OIDC ([5fe08ff](https://github.com/ghiscoding/excel-builder-vanilla/commit/5fe08ff3e8be2ff6325c36cac01db03e57ebee95)) - by @ghiscoding

## [4.1.0](https://github.com/ghiscoding/excel-builder-vanilla/compare/v4.0.1...v4.1.0) (2025-08-16)

### Features

* export streaming ([3a887ae](https://github.com/ghiscoding/excel-builder-vanilla/commit/3a887ae3b13f3579dd3d54bc9bb2a16ea18f761a)) - by @ghiscoding

### Bug Fixes

* **deps:** update all non-major dependencies ([b1b9354](https://github.com/ghiscoding/excel-builder-vanilla/commit/b1b9354946a3ad6fb0acfa72caf4ed90050e8a69)) - by @renovate-bot

## [4.0.1](https://github.com/ghiscoding/excel-builder-vanilla/compare/v4.0.0...v4.0.1) (2025-04-21)

### Bug Fixes

* use correct export entry ([d33190f](https://github.com/ghiscoding/excel-builder-vanilla/commit/d33190f5a72cc9495ea1ec8dcf393fbe2190f5db)) - by @ghiscoding

## [4.0.0](https://github.com/ghiscoding/excel-builder-vanilla/compare/v3.1.0...v4.0.0) (2025-04-12)

### ⚠ BREAKING CHANGES

* build as ESM-Only, drop CJS

### Features

* build as ESM-Only, drop CJS ([ee22a7b](https://github.com/ghiscoding/excel-builder-vanilla/commit/ee22a7bfa6f3cec1c324aca85dd97b2fb2aef027)) - by @ghiscoding

### Bug Fixes

* **deps:** update all non-major dependencies ([53504a7](https://github.com/ghiscoding/excel-builder-vanilla/commit/53504a739e8f86378d83d547c6173a65e4b0c322)) - by @renovate-bot

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
