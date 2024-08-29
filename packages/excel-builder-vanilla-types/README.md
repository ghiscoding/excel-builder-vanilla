# @excel-builder-vanilla/types

This package contains only the shared interfaces and types of excel-builder-vanilla's package.

A use-case for `@excel-builder-vanilla/types` is when you want to import excel-builder-vanilla's to create interfaces as shown below.

```ts
import type { ExcelStyleInstruction, Worksheet, Workbook } from '@excel-builder-vanilla/types';

export interface ExcelExportOption {
  columnHeaderStyle?: ExcelStyleInstruction;
  customExcelHeader?: (workbook: Workbook, sheet: Worksheet) => void;

  // ....
}
```