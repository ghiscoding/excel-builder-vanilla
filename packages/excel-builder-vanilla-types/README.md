# @excel-builder-vanilla/types

This package contains only the shared types and interfaces of `excel-builder-vanilla`'s package.

A simple use-case for `@excel-builder-vanilla/types` is when you want to only import `excel-builder-vanilla`'s types in order to create custom interfaces without importing the entire `excel-builder-vanilla` package. This was mainly created so that I can use it to create some interfaces in my data grid project (Slickgrid-Universal) as potential grid options without installing the Excel-Builder-Vanilla library because that is an optional plugin in my data grid project. So importing only the types is much smaller for users who might never install the Excel Export plugin.

```ts
import type { ExcelStyleInstruction, Worksheet, Workbook } from '@excel-builder-vanilla/types';

export interface ExcelExportOption {
  columnHeaderStyle?: ExcelStyleInstruction;
  customExcelHeader?: (workbook: Workbook, sheet: Worksheet) => void;

  // ....
}
```
