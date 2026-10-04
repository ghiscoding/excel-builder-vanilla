# Project guidance for AI agents

These instructions apply to the entire repository. Follow the user's requested scope and any more specific instructions in a descendant `AGENTS.md`.

## Project map

Excel-Builder-Vanilla is a lightweight TypeScript library for writing Excel workbooks. It is ESM-only and uses `fflate` for ZIP compression. Preserve browser and Node support, tree shaking, and the small runtime dependency footprint.

| Path | Purpose |
| --- | --- |
| `packages/excel-builder-vanilla/src/` | Library implementation and public exports in `index.ts` |
| `src/Excel/` within the library | Workbook, worksheet, styles, shared strings, relationships, XML, charts, and drawings |
| `src/factory.ts` and `src/streaming.ts` within the library | Complete-file export/download and incremental export |
| `packages/excel-builder-vanilla-types/` | Published companion package generated from the library declarations |
| `packages/demo/` | Vite browser examples, assets, and Node export examples |
| `docs/` | User documentation published through GitBook |
| `vitest/` | Unit and browser test configuration and shared setup |
| `.agents/audits/` | Historical audit reports, measurements, and diagnostic scripts |
| `.github/` | CI, release workflows, and contribution templates |

Read `CONTRIBUTING.md`, the relevant package scripts, and the affected code before changing workflows. Consult the corresponding documentation and examples when changing a feature.

## Scope and working tree

- Check Git status before editing. Preserve existing staged, unstaged, and untracked work; do not reset, overwrite, or stage unrelated changes.
- Complete the requested work within its scope. A library-only audit excludes demo and companion-package metrics unless the user asks to extend it. Report any necessary cross-package changes explicitly.
- Prefer a focused fix over unrelated cleanup, dependency upgrades, formatting, or architecture changes.
- Do not commit, publish, deploy, or change release versions unless the user requests those actions.
- Use `rg` for searches. When RTK is available, prefix shell commands with `rtk`; use `rtk proxy <command>` for tools without a dedicated wrapper. Follow any environment-provided RTK instructions.

## Code and compatibility

- Follow `biome.json`: two-space indentation, single quotes, semicolons, LF endings, and `.js` extensions in relative TypeScript imports. Use type-only imports where appropriate.
- Keep changes human readable. Reduce LOC only when behavior, performance, maintainability, and readability are preserved. Do not compress code merely to improve line counts.
- Keep runtime dependencies minimal. Use the existing XML and ZIP utilities where they fit, and avoid browser-only globals in Node execution paths.
- Treat public exports, option signatures, generated types, existing helpers, and custom exporter overrides as compatibility contracts. Preserve observable IDs, ordering, and repeat-export behavior unless a change is explicitly intended and disclosed.
- Performance work does not authorize API retirement. Do not add `@deprecated`, remove options or methods, or introduce breaking changes silently. Obtain agreement on proposed API policy changes and document accepted changes and migration steps.
- A deprecation annotation alone does not establish a removal deadline. Review existing deprecations separately, verify a supported migration path, and reserve public API removals for an explicitly planned major release.
- Describe observable behavior changes, including validation, error propagation, chunk boundaries, cancellation, output content, or timing of generation. Do not call a change behavior-preserving solely because existing tests pass.
- Avoid mutating caller-owned data or metadata during export. Keep export paths scoped to each workbook/export and preserve supported custom `toXML()` and `generateFiles()` overrides.

## Toolchain and builds

Use pnpm from the repository root. `package.json` declares the Node and pnpm requirements and pins the package-manager version; `pnpm-workspace.yaml` owns shared dependency versions. Do not introduce a second lockfile. TypeScript is currently kept on version 6 because of declaration-generator compatibility.

The commands below assume RTK is available; otherwise run the wrapped command directly.

| Task | Command from repository root |
| --- | --- |
| Install locked dependencies | `rtk proxy pnpm install --frozen-lockfile` |
| Check library types | `rtk proxy pnpm exec tsc --noEmit -p packages/excel-builder-vanilla/tsconfig.json` |
| Check demo types | `rtk proxy pnpm exec tsc --noEmit -p packages/demo/tsconfig.json` |
| Check changed source files | `rtk proxy pnpm exec biome check <changed-files>` |
| Build library JavaScript only | `rtk proxy pnpm --filter excel-builder-vanilla exec vite build` |
| Generate library declarations | `rtk proxy pnpm --filter excel-builder-vanilla build:dts` |
| Synchronize companion declarations | `rtk proxy pnpm --filter excel-builder-vanilla copy:types` |
| Build demo | `rtk proxy pnpm build:demo` |
| Start library and demo development | `rtk proxy pnpm dev` |
| Check patch whitespace | `rtk proxy git diff --check` |

Generated declarations come from library source. Do not hand-maintain them as an independent API. When changing public types, generate declarations and synchronize the companion package as appropriate to the requested scope; report generated changes. Preserve any unrelated edits already present there.

`pnpm build:lib` cleans library and companion distribution directories, then builds JavaScript, declarations, and copies types. The root `pnpm build` also cleans workspace outputs and runs repository-wide formatting/lint fixes. Use scoped commands during focused work to avoid collateral changes. For final PR validation, follow `CONTRIBUTING.md` and CI requirements, inspect the resulting diff, and explain any checks that could not be completed.

## Tests and export validation

- Unit tests are `__tests__/**/*.spec.ts`, configured by `vitest/vitest.config.mts` with happy-dom. Run once with `rtk proxy pnpm exec vitest run --config vitest/vitest.config.mts`; add a test-file filter for focused work. Add `--coverage` for full coverage validation.
- Browser tests are library `src/__browser_tests__/**/*.browser.spec.ts`, configured by `vitest/vitest.browser.config.mts` with Playwright Chromium. Run `rtk proxy pnpm exec vitest run --config vitest/vitest.browser.config.mts`. Install Chromium when needed using `rtk proxy pnpm playwright:install`.
- The browser suite includes both library-only regression tests and tests exercising demo examples. Browser tests alias the library to source; the demo's regular build consumes workspace package output.
- Add focused regression coverage for meaningful behavior changes. Do not add tests merely to mirror a refactor or test an annotation/comment change.
- For serialization, media, and streaming changes, inspect the exported ZIP entries and XML/relationships, verify media bytes, and check normal/stream content parity where applicable. A successful download alone does not prove workbook correctness.
- Check reader demand, cancellation, errors, byte chunk limits, compression options, and both Node/browser paths when changing streaming. It produces XLSX bytes; the legacy `outputType`, `fileFormat`, `mimeType`, and `downloadType` stream fields remain accepted and ignored.
- Before updating snapshots, explain the intended output change. Run the complete relevant suite when generated IDs depend on prior tests; do not update snapshots to hide an ordering failure.
- Browser CI uses a reduced streaming row count. For performance regressions, validate representative production-sized data separately and report the actual row/cell count.
- State exactly what was tested. Distinguish XML parsing, ZIP inspection, browser rendering, and spreadsheet-application validation; do not claim Excel or LibreOffice compatibility without checking those applications.

## Performance and LOC audits

Store AI audit notes and evidence under `.agents/audits/<scope>/`, outside published packages. Keep maintained regression tests with source. Consult `.agents/audits/excel-builder-vanilla/README.md` for the existing audit stages and reproduction guidance.

Preserve baseline evidence. Use an explicit new output directory for additional measurements; do not overwrite old results or reinterpret historical counts as current measurements. Record the revision, environment, workload, warmup, repetitions, and timing boundaries. Compare equivalent inputs and compression settings, and verify correctness outside timed sections.

Separate physical LOC, code-bearing LOC, production source, tests, generated declarations, bundle size, and package contents. Label process RSS as process memory, not isolated library heap. Report total export time, responsiveness, first-chunk latency, memory, and output size where relevant. Disclose regressions and uncertainty as well as improvements. Include API and behavior changes in implementation reports.

## Documentation

Update affected user documentation in `docs/` and the relevant README when usage or behavior changes. Keep examples runnable and consistent with the actual API. Use `.agents/` for internal findings and implementation notes, not as the only place to document a user-facing migration.

Do not invent release entries or schedules. Follow the repository's release workflow for version and changelog generation when a release is explicitly requested.

## Pull requests

Return PR titles and descriptions as raw Markdown inside a fenced markdown code block so they can be copied directly.

- Put the title and description in separate fenced `markdown` blocks so each can be copied without extra labels inside the block.
- Use a Conventional Commit PR title under 73 characters, as requested by `.github/pull_request_template.md`.
- Follow the PR template, including the AI / LLM assistance disclosure. Fill in truthful details about the tool and its use; do not invent model information or validation results.
- Lead with the concrete problem and resulting behavior. Explain relevant implementation choices, compatibility effects, migration steps, and validation. Identify material limitations and any tests not run.
- Describe the final diff for a reviewer who has not read the conversation. Omit abandoned approaches unless they explain a necessary tradeoff. Link a related issue using `fixes #123` only when appropriate.
- Keep the scope focused. If several packages must change together, explain why in the template. Check checklist items only when they are satisfied.
