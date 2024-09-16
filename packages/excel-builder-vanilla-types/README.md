# @excel-builder-vanilla/types

This package contains only the shared types and interfaces of `excel-builder-vanilla`'s package.

A use-case for `@excel-builder-vanilla/types` is when you want to import `excel-builder-vanilla`'s types in order to create custom interfaces **but** without importing the entire `excel-builder-vanilla` package. This was mainly created so that we can use it in Slickgrid-Universal as potential options in the grid options interface but still keep the Excel Export as an optional install, so importing only the types is much smaller for users who will never install the Excel Export.

```ts
import type { ExcelStyleInstruction, Worksheet, Workbook } from '@excel-builder-vanilla/types';

export interface ExcelExportOption {
  columnHeaderStyle?: ExcelStyleInstruction;
  customExcelHeader?: (workbook: Workbook, sheet: Worksheet) => void;

  // ....
}
```
