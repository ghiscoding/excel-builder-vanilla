# LOC follow-up: readable consolidation with regression checks

October 3, 2026. This follow-up applies the constraint to reduce LOC only where behavior and readability are preserved. Production edits are limited to `Excel/Drawing/Chart.ts` and `Excel/Workbook.ts` in `packages/excel-builder-vanilla`.

## Retained changes

- Combine the duplicate pie/doughnut and bar/column chart branches. Each branch keeps the same chart-specific elements and XML ordering.
- Share stacked/percent grouping logic between line, bar, and column charts while retaining their default grouping and the unknown-type fallback.
- Use one local `appendOverride(partName, contentType)` helper for content-type XML nodes. Paths and MIME types stay explicit at every call site; collection loops retain their original iteration order.

All public methods and signatures remain available. No constructor ID sequencing, legacy helpers, row serialization, streaming behavior, or style semantics were changed. No generic XML framework or compacted formatting was introduced. Biome formatting/checking passes.

## LOC change

Production TypeScript only, excluding tests, dedicated types, generated files, and audit scripts:

| Metric | Original audit | Before this follow-up | Current | Follow-up delta | Total delta |
| --- | ---: | ---: | ---: | ---: | ---: |
| Physical lines | 3,912 | 3,881 | 3,833 | -48 | -79 |
| Code-bearing lines | 2,970 | 2,966 | 2,920 | -46 | -50 |

Chart removes 21 physical / 19 code-bearing lines; Workbook removes 27 physical / 27 code-bearing lines. Counts use the same TypeScript parser method as the original audit. See [before census](loc-pass/before-loc.json) and [current census](loc-pass/loc.json).

## Regression checks

- **292 existing unit tests pass**, with no new permanent tests needed for this refactor. [Results](loc-pass/tests.txt).
- **Three library-only Chromium regression tests pass**, including normal/stream ZIP entry equality, XML parsing, demand/cancellation, and invalid media rejection. [Results](loc-pass/browser-tests.txt).
- A direct before/after comparison produces **byte-identical XML for 48 chart configurations, three content-type sets, and three chart fallback cases**. The matrix includes all six chart types, default/stacked/percent grouping, titles, colors, labels, legends, scatter ranges, axis limits, and media MIME declarations. [Before](loc-pass/before-xml.json), [after](loc-pass/after-xml.json), [comparison generator](loc-parity.mjs).
- TypeScript no-emit checking, Vite production build, declaration generation, Biome, and whitespace validation pass.
- Coverage is 98.96% statements, 92.8% branches, 99.55% functions, and 99.29% lines. [Coverage summary](loc-pass/coverage/coverage-summary.json).

The targeted benchmark restores only the three edited methods to their pre-pass bodies for the before variant; all other optimized library code is shared. Those method bodies were unchanged between the original audited revision and the pre-pass implementation. Five fresh Node processes per variant run in alternating order, with 300 warmup calls and explicit GC before timing. Input setup is excluded; XML construction and stringification are included.

| Targeted workload | Before median, ms | After median, ms |
| --- | ---: | ---: |
| 6,000 chart serializations across six chart types | 122.0 | 116.0 |
| 300 content-type exports, each with 4,000 part overrides | 770.7 | 727.9 |

No measured performance regression appears in these workloads. The ranges overlap and local scheduling varies, so these checks do not establish a guaranteed speedup or guarantee behavior for every possible custom exporter. Whole-workbook serialization/compression benchmarks from the [initial implementation report](IMPLEMENTATION.md) remain historical evidence; they were not rerun for this narrowly scoped pass. [Raw targeted timings and methodology](loc-pass/performance.json), [benchmark script](loc-perf.mjs).

The before/after XML comparison uses the freshly built library. To regenerate current output and timings from the repository root:

```sh
rtk proxy pnpm --filter excel-builder-vanilla exec vite build
rtk proxy node .agents/audits/excel-builder-vanilla/loc-parity.mjs packages/excel-builder-vanilla/dist/index.js .agents/audits/excel-builder-vanilla/loc-pass/after-xml.json
rtk proxy node .agents/audits/excel-builder-vanilla/loc-perf.mjs .agents/audits/excel-builder-vanilla/loc-pass/performance.json
```

The benchmark currently reads the pre-pass method bodies from the audited `HEAD`; preserve that revision when reproducing the before variant after committing or changing branches.
