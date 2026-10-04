# Security audit: `packages/excel-builder-vanilla`

Date: 2026-10-04  
Audited revision: `8123ba6b277bc18f2a1d835f2a837154cb3515b2`  
Scope: library production source and production dependencies. Demo and companion packages excluded.

## Reassessment

The findings justify small boundary checks, but the original blanket “Moderate” ratings and remediation breadth overstated what was demonstrated. These are conditional hardening issues: an attacker must control filenames, XML/style names, or selected object keys. No host filesystem write, spreadsheet code execution, or global prototype pollution was demonstrated.

The first patch duplicated ZIP checks in `addMedia()`, checked XML names at construction and serialization, allocated a Set per XML node with WeakMap tracking, and added style allowlists. Those allowlists omitted `indent`, previously supported by direct/differential alignment export. That approach was unnecessarily broad and introduced compatibility risk.

## Findings and final fixes

### ZIP paths: conditional risk during downstream extraction

`addMedia()` feeds filenames into `/xl/media/${fileName}`. The original ZIP helper only removed the leading slash. The initial probe produced `xl/media/../../escape.png`: this escapes the media directory but resolves inside the extraction root. An additional parent segment (`xl/media/../../../escape.png`) is required to escape that root. Filesystem impact requires a downstream extractor that fails to constrain paths; this library does not extract archives.

**Fix:** validate paths once in `utilities/zip.ts`, shared by normal and streaming ZIP exports. Reject empty, dot, and parent segments, backslashes, colons, and control characters. Retain the accepted single leading package slash. Tests cover actual media export and custom exporter overrides through both export APIs.

**Behavior change:** unsafe paths throw during ZIP export, not in `addMedia()`. Safe relative subpaths remain accepted; there is no additional basename-only restriction.

### XML names: conditional document-structure injection

Attribute values and ordinary cell text are escaped, but names were interpolated verbatim. The protection key `a="1"/><evil b` generated `<protection a="1"/><evil b="x"/>`. This demonstrated XML structure injection through caller-controlled names, not execution in a spreadsheet application.

**Fix:** a small shared guard checks element and attribute names during `XMLNode.toString()`, including directly modified attribute dictionaries. It rejects markup delimiters, XML whitespace, and control characters. It intentionally does not implement the full XML Name or OOXML schema grammar. No style allowlists are added, preserving existing alignment attributes and namespaced/Unicode names.

`setAttribute()` also rejects collisions with node members before assigning or deleting a mirrored attribute, including `__proto__`, `children`, and `toString`. Ordinary attribute aliases, updates, and removal with `null` remain supported. No WeakMap, per-node tracking Set, or repeated construction-time XML validation is needed.

**Behavior change:** unsafe XML names throw during serialization; reserved attribute names throw in `setAttribute()`. The first patch silently omitted unsupported style keys; the final patch preserves safe names and rejects injection attempts. This is a deliberate validation change. Custom XML strings or custom serializers remain caller-controlled and are not sanitized.

### `pick()`: local prototype manipulation

Selecting a JSON object's own `__proto__` key previously changed the returned object's prototype. Global `Object.prototype` was not modified. Direct `object.hasOwnProperty()` calls also failed on null-prototype objects or shadowed methods.

**Fix:** filter requested own keys with `Object.prototype.hasOwnProperty.call()` and construct the result using `Object.fromEntries()`. This preserves a normal result prototype and copies `__proto__` as an own data property. Missing, inherited, and absent-input properties are omitted.

## LOC and scope

Physical line deltas against the audited revision, including comments and blank lines:

| Category | Initial security patch | Simplified patch |
| --- | ---: | ---: |
| Production source | +68 | +15 |
| Tests (including new files) | +110 | +141 |

Production growth is reduced by 53 lines (78%); only `XMLDOM.ts`, `pick.ts`, and `zip.ts` change at runtime. Additional test lines exercise reserved names, direct attribute mutation, Unicode/namespaced names, attribute updates/removal, legitimate alignment attributes, and export boundary behavior. Documentation is excluded from these counts.

No API removal, deprecation, dependency change, or generated declaration change is introduced. Validation changes are documented in the package README and relevant user guides.

## Validation

- Original audit baseline: 23 unit test files / 299 tests passed.
- Initial remediation: 25 files / 314 tests passed.
- Simplified patch: 25 files / 328 tests passed; 100% lines (1610/1610), statements, and functions; 93.77% branches.
- Library TypeScript check, changed-file Biome check, JavaScript build, and patch whitespace checks passed.
- The original audit's production dependency advisory check reported no known vulnerabilities; direct production dependency `fflate` was resolved to 0.8.3. This is historical audit evidence, not a guarantee of vulnerability absence.

## Limits

No fresh performance benchmark, Excel/LibreOffice application test, downstream extraction test, fuzzing, or dedicated SAST run was performed for this simplification. Removing per-node tracking allocations and duplicate checks reduces work introduced by the first patch, but timing improvements are not claimed. XML checks do not sanitize arbitrary custom exporter output or make all workbook configuration safe for untrusted input.
