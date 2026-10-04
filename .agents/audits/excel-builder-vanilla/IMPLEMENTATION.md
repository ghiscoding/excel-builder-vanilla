# Implemented LOC and performance audit recommendations

This report preserves the initial implementation measurements. The subsequent [LOC follow-up](LOC-FOLLOWUP.md) reduces production source to **3,833 physical / 2,920 code-bearing lines**, with separate output parity and performance checks.

**Coverage follow-up, October 4, 2026:** Four targeted unit tests cover the retained worksheet XML cache, XMLNode attribute cloning, browser stream error propagation, and the time-budget yield in `Workbook.generateFiles()`. The complete unit suite now passes **296 tests across 23 files** with **100% line coverage (1,569/1,569)**, **99.75% statement coverage**, **93.16% branch coverage**, and **100% function coverage**. This supersedes the earlier 292-test coverage figures below; the original test logs remain historical records of their runs. See the [follow-up coverage record](loc-pass/coverage-followup.json).

October 3, 2026. Scope: `packages/excel-builder-vanilla`. The [original audit](REPORT.md) and its measurements are preserved as the baseline at revision `6ce5a7537b6ef2bf17997d36bab2eeeaebbc8f67`. Implementation measurements use the modified working tree at that revision. No demo or companion types package was changed. No release was published.

The main result is a smaller export working set and earlier stream output. For 500,000 numeric cells, normal Node export falls from 2,628.6 to 1,423.4 ms, with peak process RSS falling from 761.9 to 346.9 MiB. Node streaming falls from 2,552.2 to 1,256.1 ms and yields its first chunk in 9.7 ms rather than 2,523.3 ms. Browser streaming becomes responsive early; its total duration remains close to baseline in the final run.

## Changes

- Worksheet rows and shared strings now serialize directly into XML batches, avoiding a complete cell node tree during standard export. A shared cell interpreter handles DOM export, row serialization, and string collection consistently. The public `toXML()` APIs still return XMLDOM objects.
- Normal export collects those batches, yields to timers periodically during XML generation, and releases its own XML-string references during conversion. XML namespace cleanup is restricted to custom external DOM exporters so text such as `NS123:` survives unchanged.
- Both stream adapters use one incremental ZIP generator. ZIP entries are processed serially and compression input blocks are capped at 32 KiB. Browser generation starts in `pull()` with a zero high-water mark. Node iteration follows consumer demand. Cancellation or returning from iteration terminates compression. Output chunks respect `chunkSize` and have independent backing buffers.
- Export errors reject the normal promise or stream reader. Media conversion uses a preallocated byte array and indexed copy, preserving data-URL, whitespace, base64url, padding, and malformed-input behavior.
- Shared-string insertion uses an own-key-safe dictionary, deduplicates direct insertion, and preserves ordering across exports. Relationship paths are scoped to each export. Hyperlink IDs and relationship IDs remain stable; removed hyperlinks lose their stale relationships.
- Cell serialization supports references beyond column Z, raw dates, metadata formulas/dates/booleans, style ID 0, row instructions, empty rows, escaped text/formulas/headers, and frozen caller metadata. Worksheet views, protection, columns, tables, drawings, merges, layout, and headers/footers still use the existing metadata exporters.
- Repeated style collection loops, drawing position writers, and chart range references are consolidated. Two-cell anchor endpoints now use their own offsets.
- Nested npm exclusions remove unit tests, browser tests, and snapshots from publication. The README explains streaming, cancellation, memory limits, compression options, and style reuse.

Custom worksheet/shared-string `toXML()` overrides are honored. Streams retain the original `generateFiles()` override contract, including exporters without the new entry API. Normal export leaves a custom exporter's returned file map intact. The module-level `Paths` object and legacy serialization helpers remain available for existing callers.

## API compatibility and observable behavior (October 4 correction)

The implementation initially added `@deprecated` annotations to the stream options `outputType`, `fileFormat`, `mimeType`, and `downloadType`, and called them deprecated in the README. These options were already ignored by the original stream implementation. That fact did not authorize changing the public API guidance: the user requested LOC/performance improvements and authorized implementation, not API retirement. The annotations were not explicitly disclosed in this report. All four new annotations have now been removed from source and generated declarations, and the README has been corrected. The option names, types, and previous runtime behavior are preserved. Existing unrelated deprecations are unchanged.

The implementation also changes observable behavior beyond timing and memory usage. These changes must be considered when reviewing compatibility:

- `chunkSize` was previously ignored; output was split at 64 KiB. It now sets the maximum output chunk size, with the same 64 KiB default. Incremental compression may emit smaller chunks. Consumers must not depend on fixed chunk lengths or counts.
- Invalid chunk sizes now throw `RangeError` instead of being ignored. This is a compatibility change for callers passing zero, negative, fractional, infinite, or unsafe integer values.
- Browser generation now starts when a reader requests data, instead of eagerly generating the complete archive. Cancellation and returning from Node iteration stop generation. ZIP bytes and sizes can differ from the previous archive while uncompressed entry content remains equivalent; the measured size difference is recorded below.
- Export failures reject the promise or reader instead of leaving some exports pending. Serialization fixes also affect previously incorrect results: raw dates, style ID 0, escaped text, shared-string deduplication, stale hyperlink removal, and two-cell anchor endpoint offsets. Repeated exports preserve ordering and relationship IDs, and caller metadata is no longer modified during cell interpretation.

These are not claims of complete behavioral equivalence. The optimization should not have been presented without explicitly identifying its compatibility effects. No stream option was removed, and no option removal is proposed by this audit.

### Candidates for a future major release

The four ignored streaming options are reasonable candidates for removal from `ExcelFileStreamOptions` in a future major release: their names suggest capabilities that streaming does not implement. Removing the fields can break TypeScript callers even though their runtime values have no effect. This is a recommendation for separate API review, not an approved or scheduled removal. If accepted, first announce the intent in public documentation and release notes, add descriptive deprecation annotations in a preceding release, and provide migration guidance: omit the ignored fields, set filename/MIME type on the destination, and use the existing environment-selected byte stream. The present LOC/performance work keeps the fields accepted and unmarked.

The library already contains two unrelated `@deprecated` annotations, on `Worksheet.freezePane()` and `SheetView.freezePane()`. Their comments specify neither a replacement nor a removal version. A deprecation annotation alone does not require eventual removal. Review those APIs separately, document and verify a supported migration path, and decide whether retaining the convenience methods is useful. If removal is chosen, treat it as a major-release change and list it explicitly in that release's migration guide. Do not infer that the unannotated `Pane.freezePane()` is a drop-in replacement without checking its initialization and export behavior.

Follow-up validation after the user reported example regressions extended the original library-only scope. Example16 requested 10-byte chunks and waited 30 ms per chunk; honoring that request made downloads take hours. The example now uses the default chunk size without an artificial delay, and reports downloaded bytes while exporting. Its actual 50,000-row Chromium download completed in about 3.4 seconds (1,725,323 bytes). All 25 browser tests passed. Example14's three images appeared in the browser, and its downloaded workbook retained the expected image bytes and drawing relationships; LibreOffice rendered all three images. The reported missing-picture issue remains unresolved because it has not been reproduced in the user's viewing application. Desktop Excel was not tested.

The measurements and LOC tables below remain historical evidence from the initial implementation. The subsequent LOC pass and removal of four comment lines are not included in those counts. The earlier statements about demo/companion-package scope and desktop application validation refer to the initial measurement run; follow-up work is described in this correction.

## Node results

Same hardware and toolchain as the baseline: Intel Core i7-8750H, Linux x64, Node 24.16.0, fflate 0.8.3, TypeScript 6.0.3. Three fresh child processes per workload, each with a 500-row warmup and GC before export; input construction is excluded. The workload processes execute sequentially. Results are medians, with the final elapsed range in parentheses. Local timings vary with system load; these are measurements, not performance guarantees.

| Workload | Before, ms | After, ms (range) | Peak process RSS, MiB, before → after |
| --- | ---: | ---: | ---: |
| Numeric, 10,000 cells | 121.7 | 110.5 (106.7–127.6) | 165.8 → 159.5 |
| Numeric, 100,000 cells | 508.6 | 364.4 (351.7–364.5) | 301.2 → 159.5 |
| Numeric, 500,000 cells | 2,628.6 | 1,423.4 (1,388.7–1,449.9) | 761.9 → 346.9 |
| Repeated strings, 100,000 cells | 519.1 | 280.0 (278.0–280.7) | 311.3 → 159.5 |
| Unique strings, 100,000 cells | 855.1 | 532.4 (513.8–575.9) | 421.5 → 219.4 |
| Mixed types, 100,000 cells | 542.7 | 333.7 (332.5–338.4) | 297.3 → 159.4 |
| Wide numeric, 100,000 cells | 391.8 | 288.8 (262.8–325.6) | 291.5 → 159.4 |
| Ten sheets, 100,000 cells | 425.2 | 288.1 (274.6–295.6) | 409.9 → 216.5 |
| Node stream, 100,000 cells | 470.9 | 355.4 (341.9–358.3) | 279.6 → 159.4 |
| Node stream, 500,000 cells | 2,552.2 | 1,256.1 (1,225.1–1,258.8) | 763.5 → 159.4 |
| Styled, 10,000 cells, one reused style | 96.2 | 80.5 (79.9–80.6) | 165.6 → 159.4 |
| Styled, 10,000 cells, a style per cell | 172.5 | 204.7 (143.8–209.3) | 166.4 → 159.4 |

Peak RSS is a process high-water mark including runtime startup, warmup, input rows, ZIP workers, and compression. It is **not isolated library heap**. The final harness has an approximately 159 MiB process high-water floor in smaller workloads, so identical values do not establish constant memory usage. The stream benchmark also collects output chunks to verify the archive; a destination that releases chunks need not retain the output.

All timed Node archives were unzipped and checked for the expected cell count outside the timer. Standard numeric, string, mixed, wide, and multi-sheet export ZIP sizes match the baseline fixtures. Incremental archives differ because of ZIP streaming descriptors and block compression: 300,224 versus 299,079 bytes at 100,000 cells, and 1,493,068 versus 1,479,121 bytes at 500,000 cells (about 0.9% larger). Entry content equality is covered separately by regression tests. Raw measurements: [after/results.json](after/results.json).

Creating a format per cell still creates a format per cell. The final styled-per-cell run has substantial variation and no demonstrated speedup over baseline. Reuse is the documented optimization; automatic style interning would change observable IDs and mutable format behavior. Diagnostic clone overrides remain in the raw data, but the optimized hot path no longer depends on cell-node cloning; those variants do not justify a cloning rewrite.

Compression remains configurable, with the default unchanged at level 6:

| Level, numeric 100,000 cells | After export median, ms | ZIP bytes |
| --- | ---: | ---: |
| 0 | 109.2 | 3,081,513 |
| 1 | 212.1 | 331,804 |
| 6 | 364.4 | 299,079 |
| 9 | 362.6 | 299,253 |

## Browser results

Chromium 151.0.7922.34, headless, fresh page per run, three repetitions after a 500-row warmup, with fflate bundled and no forced browser GC. The first-timer metric measures one zero-delay timer queued immediately before export; it is not a maximum event-loop delay bound.

| Workload | Total ms, before → after | First timer ms, before → after | First chunk ms, before → after |
| --- | ---: | ---: | ---: |
| Numeric, 100,000 cells | 465.5 → 344.3 | 240.6 → 8.4 | — |
| Unique strings, 100,000 cells | 739.4 → 626.2 | 487.1 → 8.6 | — |
| Stream, 100,000 cells | 444.6 → 383.0 | 444.4 → 12.2 | 444.3 → 6.7 |
| Stream, 500,000 cells | 2,125.2 → 2,158.5 | 2,053.3 → 13.0 | 2,053.0 → 7.5 |

The no-reader probe now records zero generation calls and zero enqueued bytes, compared with one generation call and 1,048,692 queued bytes at baseline. The 1,024-byte chunk option is honored, and chunks no longer retain the whole archive through their backing buffers. Total browser streaming time is close to baseline, while early output and timer responsiveness improve substantially. Raw measurements: [after/browser-results.json](after/browser-results.json).

## Media, LOC, and distribution

Media decode-only medians fall from 99.6 to 7.2 ms for 1 MiB and from 792.6 to 39.1 ms for 8 MiB (about 20× faster for the larger payload). Input construction and byte equality checks are outside timing. These results concern decoding, not a complete image-heavy workbook. See [after/media-results.json](after/media-results.json).

| Production source metric | Before | After |
| --- | ---: | ---: |
| TypeScript modules | 26 | 28 |
| Physical lines | 3,912 | 3,881 |
| Code-bearing lines | 2,970 | 2,966 |
| Explicit `any` annotations | 86 | 82 |

Counts use the same TypeScript parser method as the original audit and exclude tests, dedicated types, generated output, and other packages. The two new utilities consolidate media and ZIP entry conversion. Compatibility methods and new streaming behavior account for much of the consolidation savings; this is a modest net LOC reduction, with the larger benefit in correctness and export behavior. See [after/loc.json](after/loc.json).

The final npm dry run contains **37 files, 459,386 bytes unpacked, and 115,791 bytes compressed**, versus 59 files and 817,095 bytes unpacked at baseline. No test or snapshot files remain in the manifest. Unpacked size is approximately 44% smaller. The final dry run includes a fresh package build and declarations; the baseline dry run used the checkout's pre-existing `dist`, as explained in the original report. See [after/package-manifest.json](after/package-manifest.json).

The performance harness's fresh temporary build is 68,358 JS bytes / 17,222 gzip bytes, versus 67,572 / 16,189 at baseline. New streaming and compatibility behavior slightly increases compiled JS size despite the source consolidation. Both figures exclude external fflate and are not a consumer application's tree-shaken bundle.

## Validation and limits

- The initial implementation run passed **292 unit tests** across 23 library test files. Its coverage figures and logs are historical; see the October 4 coverage follow-up above for the current test and coverage results. See [initial test log](after/tests.txt) and [initial coverage summary](after/coverage/coverage-summary.json).
- **Three library-only Chromium regression tests pass**: normal/stream entry equality for worksheet, table, chart, drawing, and media; demand/cancellation; and invalid media rejection. Every XML/relationship entry in the feature fixture is parsed with DOMParser. See [after/browser-tests.txt](after/browser-tests.txt). The demo-dependent browser suite was excluded from this library-only scope.
- TypeScript no-emit checking, Biome checking, Vite production build, declaration generation, npm package dry run, and whitespace validation pass.
- Regression coverage includes repeated exports, inherited string keys, concurrent workbooks, raw dates, formulas, row/cell style ID 0, frozen metadata, columns beyond Z, escaping, custom export overrides, compression levels 0/1/6/9, invalid chunk sizes, chunk backing buffers, and anchor endpoint offsets. [after/probes.json](after/probes.json) confirms no global path growth and rejected rather than pending invalid-media exports.

The workbook still owns all input rows and shared strings. Each media payload is decoded in full before compression. Very wide individual rows, large individual strings, and style/drawing/chart metadata can still create large atomic allocations and synchronous work. XML batches end at row/string boundaries rather than imposing a strict allocation cap. Timer yields are cooperative, not worker isolation, and normal export still returns a complete archive. Custom legacy exporters retain their own allocation and blocking characteristics. Keep workbook data/configuration stable during export; simultaneous mutation or exports of the same workbook are not a supported synchronization contract.

This change does not add an input-row iterator, binary media API, automatic style interning, worker protocol, or removal of public helpers. Duplicate constructor initialization is retained to preserve generated ID sequences. ZIP readability, content parity, and XML parsing were validated; no desktop Excel or LibreOffice application was launched.

## Reproduction

Run from the repository root with installed dependencies and Chromium available. Audit scripts default to the baseline directory, so use `--output` to keep baseline evidence intact:

```sh
rtk proxy node .agents/audits/excel-builder-vanilla/audit.mjs --output=.agents/audits/excel-builder-vanilla/after
rtk proxy node .agents/audits/excel-builder-vanilla/browser.mjs --output=.agents/audits/excel-builder-vanilla/after
rtk proxy node .agents/audits/excel-builder-vanilla/media.mjs --output=.agents/audits/excel-builder-vanilla/after
rtk proxy pnpm exec vitest run --coverage --config vitest/vitest.config.mts packages/excel-builder-vanilla/src
rtk proxy pnpm exec vitest run --config vitest/vitest.browser.config.mts export-regressions.browser.spec.ts
rtk proxy pnpm exec tsc --noEmit -p packages/excel-builder-vanilla/tsconfig.json
rtk proxy pnpm exec biome check packages/excel-builder-vanilla/src
rtk proxy pnpm --filter excel-builder-vanilla exec vite build
rtk proxy pnpm --filter excel-builder-vanilla build:dts
```

Run `rtk proxy npm pack --dry-run --json` from the library package directory after building. The package's broader `build` script also copies types into another package; it was deliberately avoided for this scoped implementation.
