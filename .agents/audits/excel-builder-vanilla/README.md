# Library audit records

Scope: `packages/excel-builder-vanilla`. These reports, measurements, and diagnostic scripts support the LOC and performance audit. They are outside the library's npm publication allowlist.

- [Original audit](REPORT.md): baseline findings and measurements.
- [Initial implementation](IMPLEMENTATION.md): fixes and before/after measurements.
- [LOC follow-up](LOC-FOLLOWUP.md): readable consolidation and regression checks.

Baseline data is in this directory; `after/` and `loc-pass/` record later implementation stages. Measurements describe the recorded local environment and are historical evidence.

Run scripts from the repository root with an explicit output directory, as documented in the reports, to preserve baseline results. Existing dependencies and a library build are required; browser workloads also require Chromium. Maintained regression tests remain under the library's `src/__tests__` and `src/__browser_tests__` directories and run through Vitest.
