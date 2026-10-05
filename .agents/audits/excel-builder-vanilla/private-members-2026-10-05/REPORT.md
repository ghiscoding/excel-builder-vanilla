# Declaration build and private members

TypeScript 7.0.2 and Rolldown now generate one declaration file for each package. Private and underscore-prefixed class members are omitted from both packages, keeping library and companion types compatible. All 67 top-level exports remain.

## Size comparison

Final sizes include package source maps, manifests, and README changes. The baseline is the previous generator with private declaration members filtered. Each comparison row uses the corresponding actual package build.

| Artifact | Previous generator | Final Rolldown build | Change |
| --- | ---: | ---: | ---: |
| DTS file | 54,116 B | 51,220 B | -2,896 B |
| Library package | 127,512 B | 127,381 B | -131 B |
| Types package | 16,639 B | 16,093 B | -546 B |

In the controlled TypeScript 6 comparison, each generator filtered the same private declarations and preserved the same exports:

| Generator | Declaration bytes |
| --- | ---: |
| dts-bundle-generator | 54,116 |
| Rolldown | 54,311 |
| Rollup | 59,001 |

The previous generator produced the smallest declaration file; Rolldown was the smaller alternative than Rollup. The final TypeScript 7 Rolldown build is smaller than the original-generator baseline after converting underscore-prefixed members to private.

All 25 underscore-prefixed class members are private, including the ten Chart methods documented with `@private`. Their runtime names and JavaScript output are unchanged. Source maps grew 604 B because they include the modified source. Worksheet transfer-data keys remain public data fields.

Declaring these class members private changes the published TypeScript API: consumers must use the public configuration and export methods. Both packages carry identical declarations.

## Validation

The full build and Biome checks passed; 332 unit tests and 25 Chromium tests passed. Strict TypeScript 7 compatibility checks verify cross-package assignments, the 11 legacy type aliases, and the absence of underscore class keys. Real package archives and runtime JavaScript were inspected. No commit or release was made.
