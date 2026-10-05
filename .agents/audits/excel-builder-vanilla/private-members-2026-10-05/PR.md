```markdown
fix(types): use private internals with Rolldown and TypeScript 7
```

```markdown
## Summary

Fix the declaration compatibility regression following #221 by omitting private implementation members from both published packages. Replace `dts-bundle-generator` with Rolldown, upgrade the workspace to TypeScript 7.0.2, and declare underscore-prefixed class members private.

Each package retains one DTS file. Final published packages are smaller than the equally filtered original-generator baseline.

## Why

Private members in separately declared classes prevent assignments between `excel-builder-vanilla` and `@excel-builder-vanilla/types`. The previous generator also blocked TypeScript 7.

The underscore prefix identifies internal members even without `@private` JSDoc. Declaring these members private and omitting them from published types further reduces declaration/package size. Rolldown produced smaller compatible output than Rollup in the comparison.

## Changes

- Use Rolldown 1.2.12 and `rolldown-plugin-dts` 0.28.6 with native `tsgo` declaration generation and explicit source typechecking.
- Convert 24 underscore-prefixed class members to TypeScript `private`, including all ten `@private` Chart methods. All 25 underscore class members are now private.
- Omit private/underscore class members from declarations while preserving constructor/protected accessibility, all 67 top-level exports, 11 previously implicit type exports, and remaining public documentation.
- Synchronize the companion declarations and add strict cross-package/internal-member regression checks.
- Preserve runtime helper names, legacy JavaScript helpers, and worksheet transfer-data keys.
- Update documentation, agent guidance, dependencies, lockfile, and development Node requirements to `^22.18.0 || ^24.11.0 || >=26.0.0`.

Final measurements include source maps, manifests, and README changes. The baseline uses `dts-bundle-generator` with the same private-member filtering.

| Artifact | Baseline bytes | Final bytes | Saving |
| --- | ---: | ---: | ---: |
| Single DTS file | 54,116 | 51,220 | 2,896 |
| Library tarball | 127,512 | 127,381 | 131 |
| Library unpacked | 491,460 | 490,013 | 1,447 |
| Types tarball | 16,639 | 16,093 | 546 |
| Types unpacked | 57,351 | 54,683 | 2,668 |

Runtime JavaScript remains byte-identical. Source maps grow 604 bytes because they embed the modified source; both complete packages shrink.

## Validation

- Full root build passed, including library/demo typechecking and builds. Final source checking, scoped JavaScript rebuild, formatting, and full-package Biome lint passed.
- 332 unit tests passed: 100% statement/function/line coverage and 93.77% branch coverage.
- 25 Chromium browser tests passed.
- Strict TypeScript 7 bidirectional package compatibility, all legacy type aliases, absent underscore class keys, and retained transfer-data keys passed.
- Verified all 25 underscore source members are private and all 67 top-level exports remain present.
- Final declarations exactly match the preceding migration after removing underscore members; remaining signatures/documentation are unchanged.
- Inspected real tarball sizes and declarations; verified runtime JavaScript hashes and patch whitespace.

## Comments

The workspace compiler and both packages change together because the fix requires synchronized declarations.

**TypeScript compatibility change:** consumers directly accessing underscore-prefixed class members must use public configuration/export methods, such as `setHeader()`, `setFooter()`, and `setRowInstructions()`. Runtime names and implementations remain available, and `exportData()` retains its transfer-format keys.

The plugin labels its native `tsgo` integration experimental; the build and compatibility tests exercise this path. Two unused legacy runtime helpers are retained with narrowly scoped unused-member diagnostic suppressions.

Evidence is recorded under `.agents/audits/excel-builder-vanilla/private-members-2026-10-05/`.

## AI / LLM assistance

- AI / LLM assistance used:
  - [ ] No
  - [x] Yes
- If **Yes**:
  - **which tool/model**: Codex (GPT-6).
  - **how was it used**: Compared declaration generators and package sizes, implemented the tooling/private-member changes and regression tests, updated documentation, and ran validation.

## Checklist

- [x] The changes are limited to only one scope (if not please explain why in the comments above).
- [x] Tests were added or updated where appropriate.
- [x] Documentation was updated where appropriate.
```
