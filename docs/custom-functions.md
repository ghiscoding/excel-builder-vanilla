## Workbook Defined Names and Custom Functions

You can now define workbook names and Excel-native custom functions at workbook scope.

This is useful when your worksheet formulas reference app-level function names (for example `CUSTOMSUM(B3:C3)`) and you want the exported file to evaluate in Excel 365 without `#NAME?`.

### Define a workbook name

```ts
import { createWorkbook } from 'excel-builder-vanilla';

const workbook = createWorkbook();
workbook.addDefinedName('TaxRate', '=0.08');
```

Then use it in formulas like `D2*TaxRate`.

### Define a custom function with LAMBDA

```ts
import { createWorkbook } from 'excel-builder-vanilla';

const workbook = createWorkbook();
workbook.addCustomFunction('CUSTOMSUM', ['values'], 'SUM(values)');
```

This creates a workbook defined name equivalent to:

```text
CUSTOMSUM = _xlfn.LAMBDA(_xlpm.values, SUM(_xlpm.values))
```

You can then use formulas such as `CUSTOMSUM(B3:C3)` in worksheet cells.

### Options and compatibility

```ts
workbook.addCustomFunction('SAFEAVERAGE', ['values'], 'IF(COUNT(values)=0,0,AVERAGE(values))', {
  autoPrefixXlfn: true,
  comment: 'Average with fallback',
});
```

Supported options:

- `autoPrefixXlfn` controls whether modern Excel compatibility prefixes are emitted. Default is `true`, which emits `_xlfn.LAMBDA` and `_xlpm.` argument tokens.
- `scope` can scope a defined name/function to a worksheet by index or worksheet name.

### Validation

The library validates these constraints:

- Defined names must be non-empty and valid Excel identifiers.
- Names that look like cell references (for example `A1`, `R1C1`) are rejected.
- `refersTo` values must start with `=`.

### Notes

- Workbook-defined custom functions rely on modern Excel support for `LAMBDA` (Excel 365/Excel for the web).
- Older engines that do not support `LAMBDA` may show `#NAME?` for those custom functions.
