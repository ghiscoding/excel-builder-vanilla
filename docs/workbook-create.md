## Creating a Workbook

Creating a workbook can be done one of two ways, depending on how you include the EB project.

#### Factory Style

```ts
import { createWorkbook } from 'excel-builder-vanilla';

const workbook = createWorkbook();
```

#### Constructor Style

```ts
import { Workbook } from 'excel-builder-vanilla';

const workbook = new Workbook();
```

This will eventually require you to include the 'excel-builder' module so you can export the workbook, so it's more verbose. However, this is also the best option for creating templates and the like.

Workbooks with no worksheet (i.e. data) will build, but Excel will throw an error while attempting to open it.
