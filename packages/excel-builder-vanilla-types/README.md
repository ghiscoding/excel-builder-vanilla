# @excel-builder-vanilla/types

This package contains only the shared types and interfaces of excel-builder-vanilla's package.

A use-case for `@excel-builder-vanilla/types` is when you want to import excel-builder-vanilla's types to create a custom interface without importing the entire excel-builder-vanilla package.

```ts
import type { ExcelStyleInstruction, Worksheet, Workbook } from '@excel-builder-vanilla/types';

export interface ExcelExportOption {
  columnHeaderStyle?: ExcelStyleInstruction;
  customExcelHeader?: (workbook: Workbook, sheet: Worksheet) => void;

  // ....
}
```