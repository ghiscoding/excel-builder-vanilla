**LOC and performance audit — `packages/excel-builder-vanilla`, October 3, 2026**

Audited revision: `6ce5a7537b6ef2bf17997d36bab2eeeaebbc8f67`, package version 5.2.5. This report preserves the **baseline before implementation**. The completed changes and final measurements are in [IMPLEMENTATION.md](IMPLEMENTATION.md).

Scope covers the library's production modules, types, tests, build configuration, and publication contents. Other packages are excluded from the census and workloads. Production source was not modified for these baseline measurements. The files in this audit directory contain the measurements, diagnostic scripts, and recommendations.

The library is relatively small: **2,970 code-bearing lines across 26 production modules**. Its principal performance costs are full XML trees, serialization, compression, and media decoding. The current streaming API retains the complete archive and blocks before the first chunk. Removing a small amount of duplication will improve maintenance, but reducing export memory and browser stalls requires changes to the serialization pipeline.

**Code inventory**

| Category | Files | Physical lines | Code-bearing lines | Comment-only lines | Blank lines |
| --- | ---: | ---: | ---: | ---: | ---: |
| Production modules under `src` | 26 | 3,912 | 2,970 | 583 | 359 |
| Dedicated type files | 2 | 389 | 202 | 162 | 25 |
| Unit tests | 22 | 4,348 | 3,829 | 111 | 408 |
| Browser tests | 1 | 298 | 265 | 1 | 32 |
| Total TypeScript under `src` | 51 | 8,947 | 7,266 | 857 | 824 |

The entire tracked package contains **61 files and 10,652 physical lines**. The remaining 1,705 lines are a 1,246-line snapshot, 308 lines of Markdown, and 151 lines of build/configuration files. Generated `dist`, dependencies, and this audit are excluded. Counts use TypeScript parser token spans: a nonblank line containing a token is counted as code, including mixed code/comment lines. Production-module counts include inline type declarations and exports; they are not a count of executable statements. Details are in [loc.json](loc.json).

| Largest production files | Physical lines | Code-bearing lines | Share of production code |
| --- | ---: | ---: | ---: |
| `Excel/StyleSheet.ts` | 681 | 597 | 20.1% |
| `Excel/Worksheet.ts` | 735 | 507 | 17.1% |
| `Excel/Workbook.ts` | 505 | 410 | 13.8% |
| `Excel/Drawing/Chart.ts` | 439 | 364 | 12.3% |
| Combined | 2,360 | 1,878 | 63.2% |

`Worksheet.toXML()` is the largest method at 198 physical lines. The next largest methods are `Workbook.createContentTypes()` (88), `Chart.toChartSpaceXML()` (81), and `Workbook.toXML()` (75). There are 86 explicit `any` annotations in production modules, including 25 in StyleSheet, 23 in Worksheet, and 9 in XMLDOM. These concentrate the maintenance risk around the same code that handles serialization.

**Node measurements**

Hardware: Intel Core i7-8750H, 12 logical CPUs, 15.46 GiB RAM; Linux x64; Node 24.16.0; fflate 0.8.3; TypeScript 6.0.3. The harness builds the package with its own Vite production configuration into a temporary directory. Each measurement uses a fresh child process, a small 500-row warmup, a fresh workbook, and explicit GC before export. Three runs per workload, run sequentially. Table values are medians; the elapsed range is the minimum–maximum of those three runs.

Export time excludes constructing the input workbook. Peak RSS is the process high-water mark through export, including runtime, startup, warmup, ZIP workers, and input data; it is **not** isolated library heap or a GC-normalized allocation count. The script also records heap and RSS at phase boundaries. All Node benchmark archives were unzipped after timing and checked for the expected number of cells. These checks establish archive readability and cell counts, not complete Excel compatibility.

| Workload | Cells | Export median (range), ms | XML generation, ms | Peak RSS, MiB | ZIP bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| Numeric, 1,000 × 10 | 10,000 | 121.7 (121.6–130.6) | 28.5 | 165.8 | 32,016 |
| Numeric, 10,000 × 10 | 100,000 | 508.6 (504.1–523.1) | 241.6 | 301.2 | 299,079 |
| Numeric, 50,000 × 10 | 500,000 | 2,628.6 (2,625.0–2,677.0) | 1,567.8 | 761.9 | 1,479,121 |
| Repeated strings, 100 distinct | 100,000 | 519.1 (504.1–547.5) | 318.2 | 311.3 | 274,584 |
| Unique strings with XML escaping | 100,000 | 855.1 (849.8–900.3) | 604.0 | 421.5 | 546,439 |
| Numbers, text, booleans, dates, formulas | 100,000 | 542.7 (527.5–548.0) | 295.0 | 297.3 | 420,235 |
| Wide numeric, 1,000 × 100 | 100,000 | 391.8 (384.7–395.9) | 193.4 | 291.5 | 282,984 |
| Ten sheets, each 1,000 × 10 | 100,000 | 425.2 (407.2–446.3) | 226.2 | 409.9 | 302,043 |
| Node stream, 10,000 × 10 | 100,000 | 470.9 (466.7–486.1) | 253.7 | 279.6 | 299,079 |
| Node stream, 50,000 × 10 | 500,000 | 2,552.2 (2,550.2–2,552.3) | 1,499.8 | 763.5 | 1,479,121 |

The numeric export scales approximately linearly over the measured 100,000–500,000-cell range: five times the cells costs 5.17 times the total time. There is no demonstrated quadratic main cell loop. The large allocation multiplier is more concerning: the 500,000-cell dataset starts with about 11.5 MiB of JS heap, reaches about 382 MiB at the worksheet-tree boundary, and produces only 15.6 MiB of uncompressed ZIP entries. Peak process RSS reaches about 762 MiB.

For 100,000 numeric cells, worksheet-tree construction takes approximately 110 ms and serialization/packaging 132 ms. At 500,000 cells, those medians rise to 523 ms and 1,087 ms. Packaging includes shared-string/style tree creation, XML stringification, cleanup scans, and any GC during the call. These are nested phase measurements; do not add them to `generateFiles()` or assume independently calculated medians sum exactly. Raw runs are in [results.json](results.json).

**Browser responsiveness and streaming**

Chromium 151.0.7922.34, headless, fresh page per run, three runs after a 500-row warmup. A self-contained Vite browser bundle includes fflate. No forced browser GC. The first-timer metric is the delay of a zero-delay timer queued immediately before export, rather than a continuous maximum-lag measurement.

| Workload | Export median, ms | First queued timer, ms | First output chunk, ms |
| --- | ---: | ---: | ---: |
| Normal numeric, 100,000 cells | 465.5 | 240.6 | — |
| Normal unique strings, 100,000 cells | 739.4 | 487.1 | — |
| Stream numeric, 100,000 cells | 444.6 | 444.4 | 444.3 |
| Stream numeric, 500,000 cells | 2,125.2 | 2,053.3 | 2,053.0 |

Both APIs call synchronous `generateFiles()` despite its Promise return type. The normal API subsequently uses fflate's asynchronous ZIP function; the stream calls `zipSync()`. In the installed fflate implementation, asynchronous ZIP offloads sufficiently large compressed entries to workers, while small entries are compressed synchronously. Thus returning a Promise does not make the XML work nonblocking.

The browser stream produced five chunks for a 299,079-byte archive despite `chunkSize: 1024`, because the implementation hardcodes 64 KiB. Each chunk's backing buffer is the entire archive. In a separate 1 MiB, level-0 probe with **no reader**, the stream still enqueued 17 chunks totaling 1,048,692 bytes and closed within the observation period. The producer runs inside `start()`, does not consult demand, and has no cancellation handler. The Node generator respects demand for yielding chunks, but generation and compression already completed before its first yield. See [browser-results.json](browser-results.json).

Only `zipOptions` is consumed from the stream options. `chunkSize`, `outputType`, `fileFormat`, `mimeType`, and `downloadType` currently have no effect. Clarify these contracts when consolidating the stream adapters. Browser heap usage was not measured.

**Prioritized findings**

1. **High: replace the buffered streaming pipeline for large exports.** [streaming.ts](../../../packages/excel-builder-vanilla/src/streaming.ts) materializes every XML file, every UTF-8 buffer, and the complete ZIP before output. Node's 500,000-cell stream first yielded at 2,523 ms and used 763.5 MiB peak RSS; it provides no meaningful peak-memory improvement in this workload. Use one shared row serializer and incremental ZIP entries, browser `pull()`/demand handling, and cancellation propagation. Bounded serialization memory will also require consuming or releasing input rows; the current `Worksheet.data` retains the complete input. Browser responsiveness additionally needs worker execution or yielding between bounded units of serialization work. Do not describe archive chunking alone as bounded-memory export.

2. **High: reduce XML-tree lifetime and intermediate representations.** [Worksheet.toXML](../../../packages/excel-builder-vanilla/src/Excel/Worksheet.ts) allocates cell/value/text nodes for each cell, and [Workbook.generateFiles](../../../packages/excel-builder-vanilla/src/Excel/Workbook.ts) retains all sheet trees before packaging. `Object.entries(files)` additionally captures references to all original values while the loop replaces them with strings. Serialize and release each sheet earlier as an intermediate improvement; ultimately write cell XML directly with shared escaping and metadata handling. This is the largest architectural memory opportunity. The existing `serializeRows()` is not yet a safe replacement; see finding 6.

3. **High: make shared strings safe and export repeatable.** [SharedStrings.ts](../../../packages/excel-builder-vanilla/src/Excel/SharedStrings.ts) reverses `stringArray` in place. Exporting the same `['alpha', 'beta', 'gamma']` workbook twice changes the string-table order on the second export while worksheet IDs remain unchanged. Its ordinary-object dictionary also treats inherited names such as `constructor`, `toString`, and `__proto__` as existing entries, producing functions or `[object Object]` where numeric string IDs belong. Use stable iteration and an own-key-safe dictionary/Map. These failures were reproduced in [probes.json](probes.json); fresh workbooks were deliberately used for benchmarks to avoid contaminating measurements with repeated-export defects.

4. **High: propagate export errors.** [factory.ts](../../../packages/excel-builder-vanilla/src/factory.ts) creates an outer Promise but does not connect rejection from the inner `generateFiles().then(...)` chain. Invalid base64 in the conversion callback produces an unhandled rejection while the returned export Promise remains pending. The audit observed both the pending result and the unhandled error. Chain/await file generation and conversion, and wrap only the callback ZIP API as needed. This prevents failed exports from retaining pending consumer work indefinitely.

5. **Medium: remove accumulated export state.** The module-global [Paths](../../../packages/excel-builder-vanilla/src/Excel/Paths.ts) gains entries for unique workbook and sheet IDs without cleanup: 100 discarded one-sheet workbooks added 400 entries in the probe. These are retained path strings, not evidence that entire workbooks leak. [Worksheet.toXML](../../../packages/excel-builder-vanilla/src/Excel/Worksheet.ts) also gives each hyperlink a new ID and adds another relationship on every export; one link produced two relationships after two exports. Prefer workbook-scoped path resolution and stable/rebuilt hyperlink relationships. A blind global reset would be unsafe for overlapping exports.

6. **Medium: consolidate divergent serializers before using them for optimization.** `collectSharedStrings()`, `toXML()`, and `serializeRows()` repeat cell interpretation with different behavior. `serializeRows()` generates `[1` for column 27 instead of `AA1`, treats metadata objects as shared strings, and drops formula/date/style semantics. Its footer helper inserts unescaped header/footer strings; even header control text contains raw ampersands. These helpers are not used by the current streaming exporter. Unify cell interpretation and metadata serialization, with parity checks against full export, rather than routing streaming through these helpers unchanged. The existing test named “serializes formula cells” actually asserts a shared-string cell, demonstrating why coverage alone missed this divergence.

7. **Medium: optimize base64-to-byte conversion.** [base64ToUint8Array](../../../packages/excel-builder-vanilla/src/factory.ts) normalizes a string, decodes to a binary string with `atob`, then calls `Uint8Array.from` with a callback for each byte. A preallocated byte array with an indexed copy, retaining normalization and `atob`, reduced median decode time from **99.6 to 4.5 ms for 1 MiB**, and **792.6 to 30.3 ms for 8 MiB**. These are decode-only timings on canonical base64, with byte-for-byte equality checked outside the timer. Preserve the library's error wrapper and add malformed/data-URL/base64url cases before adopting the change. Native Node Buffer decoding measured 0.34 and 2.03 ms respectively, but omits normalization and has different invalid-input behavior; it is not a drop-in portable replacement. Accepting binary input internally could avoid the base64 representation entirely, but changes the media contract and needs compatibility work. See [media-results.json](media-results.json); these are diagnostic implementations, not production changes.

8. **Medium: reuse styles or introduce compatible interning.** [StyleSheet.createFormat](../../../packages/excel-builder-vanilla/src/Excel/StyleSheet.ts) appends a format and nested font/number formats on each call, even when identical. For 10,000 styled numeric cells, reusing one style yielded 2 total formats, 96.2 ms export, and a 33,777-byte ZIP. Creating the same style separately for each cell yielded 10,001 formats, 172.5 ms, and 134,227 bytes. Input setup was only 1.4 versus 2.7 ms; most extra cost appeared in export. Document reuse first; consider internal canonicalization only after addressing mutable objects and externally visible style IDs.

**Compression and cloning experiments**

| ZIP level, 100,000 numeric cells | Export median, ms | ZIP bytes |
| --- | ---: | ---: |
| 0 | 261.9 | 3,081,513 |
| 1 | 392.5 | 331,804 |
| 6, current default | 508.6 | 299,079 |
| 9 | 518.3 | 299,253 |

Level 1 reduced total elapsed time by approximately 23% for an approximately 11% larger archive on this fixture. Level 0 nearly halved elapsed time but made the archive about 10.3 times larger. Level 9 offered no benefit here. This supports workload-specific option guidance, not a universal compression-default change.

An isolated prototype override of `XMLNode.cloneNode()` bypassed the intermediate `toJSON()` tree while retaining node objects. For numeric 100,000-cell exports it measured **510.6 ms versus 508.6 ms** baseline, with overlapping run ranges: no demonstrated total-time improvement. The heap snapshot after worksheet construction fell from approximately 101 to 80 MiB, but this is a single boundary rather than peak live heap. Unique-string export fell from 855.1 to 826.4 ms, again with overlapping ranges. A cloning-only rewrite is a lower priority than the full serialization pipeline and should not be sold as a proven speedup.

**LOC reduction candidates**

These are manually reviewed duplication opportunities, not an automated duplicate-line percentage or a promise of a particular net LOC reduction. New shared helpers and compatibility wrappers also consume lines.

| Area | Concrete consolidation | Expected benefit / constraint |
| --- | --- | --- |
| `factory.ts` and the two stream implementations | One path/content-to-ZIP-entry conversion helper | Removes three copies of XML/media classification; shares error handling. |
| Worksheet cell interpretation | One canonical interpretation of value, metadata, style, and reference | Correctness and serializer parity; the most useful LOC reduction. Avoid allocating a rich intermediate object per cell without measuring it. |
| StyleSheet collection exporters | A small common collection/`count`/child-export helper | Reduces repeated loops across borders, fonts, fills, formats, styles. Keep format-specific rules explicit. |
| OneCellAnchor and TwoCellAnchor | Shared position-node writer | Reduces repetitive `col`, `colOff`, `row`, `rowOff` construction. |
| Chart node creation | Small helpers for literal values, references, and common axis fields | Less repetition across series and axes; keep OOXML ordering visible. |
| Workbook/Worksheet/Picture initialization | Initialize IDs and default objects once | Removes duplicate constructor/field initialization and minor allocation churn; low impact on large sheets. |
| Historical worker/serialization helpers | Review `exportData`, `importData`, `collectSharedStrings`, header/footer helpers, and `setColumnFormats` | No internal production callers for several helpers. Public classes are exported, so “unused internally” is not proof they can be removed. |

Keep the ordinary O(1) shared-string lookup approach and the existing column-letter cache, while fixing dictionary correctness. Small utilities such as `pick()` and `Positioning` are not significant measured targets. The large StyleSheet and Chart files mostly describe XML structure; shrinking them with highly generic machinery could reduce readability without helping runtime. Charts, anchors, tables, views, and defined-name code were reviewed, but chart-heavy and very large image/drawing collections were not separately benchmarked end to end.

**Distribution size**

The fresh production JS build is **67,572 bytes**, or **16,189 bytes gzip**, excluding external fflate. Its source map is 193,542 bytes. This is the full library entry, not a consumer application's tree-shaken bundle or complete dependency download size.

`npm pack --dry-run` against the existing checkout lists 59 publication files, 817,095 bytes unpacked, and 148,589 bytes compressed. Of the unpacked contents, **24 test/snapshot files account for 365,215 bytes (44.7%)**. The snapshot alone is 190,235 bytes. `.npmignore` already lists test directory names, but the actual dry run still includes tests under the `src` publication allowlist. Adjust the allowlist or applicable nested exclusions and verify the resulting tarball. Excluding those files would reduce unpacked publication contents to approximately 451,880 bytes, with production content unchanged. This reduces install/package overhead; it is not a measured runtime speedup.

The pack dry run uses the checkout's pre-existing `dist`, whose JS is 67,341 bytes; the fresh build figures above come from a separate temporary build. Do not combine those as if they were the same build. See [package-manifest.json](package-manifest.json). Source maps and distributed source can be retained deliberately for debugging; excluding tests is the clear first size reduction.

**Validation and next implementation order**

The existing library unit suite passes: **22 files, 270 tests; 100% statement/function/line coverage and 93.22% branch coverage** under the repository's existing exclusions and ignore annotations. Results are in [tests.txt](tests.txt) and [coverage-summary.json](coverage/coverage-summary.json). The library's existing browser suite imports demo modules, so it was not run for this package-only audit. The independent Chromium measurements above exercise library exports directly. No Excel or LibreOffice application interoperability check was performed.

Recommended sequence:

1. Correct shared-string ordering/key lookup, promise rejection, and repeated-export relationship growth; add behavioral regression assertions for the reproduced cases.
2. Optimize media conversion and remove tests/snapshots from published contents. These are focused improvements with measurable costs and limited architectural scope.
3. Consolidate cell interpretation and file conversion, then reduce worksheet-tree lifetime. Preserve public API behavior and XML output correctness.
4. Implement incremental generation/compression with demand, cancellation, and an explicit policy for retained input rows; measure first-chunk latency, browser responsiveness, and memory scaling.
5. Apply style reuse/interning and remaining LOC cleanups where workload measurements justify them.

The three-run results are a local baseline, not a statistical performance guarantee. Test inputs are deterministic and synthetic; small gains can reflect JIT, GC, scheduling, or thermal state. Browser and Node absolute timings should not be directly compared as equivalent environments. Future changes should use the same fixtures, output validation, and a before/after comparison on the same machine.

**Reproduction from the repository root**

```sh
rtk proxy node .agents/audits/excel-builder-vanilla/audit.mjs --inventory-only
rtk proxy node .agents/audits/excel-builder-vanilla/audit.mjs
rtk proxy node .agents/audits/excel-builder-vanilla/browser.mjs
rtk proxy node --expose-gc .agents/audits/excel-builder-vanilla/media.mjs
rtk proxy pnpm exec vitest run --config vitest/vitest.config.mts packages/excel-builder-vanilla --coverage --coverage.reportsDirectory=.agents/audits/excel-builder-vanilla/coverage --coverage.reporter=json-summary --coverage.reporter=text
rtk proxy npm pack ./packages/excel-builder-vanilla --dry-run --json --ignore-scripts --cache /tmp/excel-audit-npm-cache
```

The Node audit writes `loc.json`, `results.json`, and `probes.json`; the browser and media scripts write their corresponding results. Temporary builds are removed after successful measurement runs. The tests and pack commands print their results; redirect them to `tests.txt` and `package-manifest.json` to refresh those snapshots. `REPORT.md` is an interpretation of the recorded run and is not automatically regenerated.
