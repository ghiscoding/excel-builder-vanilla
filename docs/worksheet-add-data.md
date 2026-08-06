## Adding data to a worksheet

Adding data to a worksheet is very straightforward.

```ts
import { createExcelFile, createWorkbook } from 'excel-builder-vanilla';

const originalData = [
  ['Artist', 'Album', 'Price'],
  ['Buckethead', 'Albino Slug', 8.99],
  ['Buckethead', 'Electric Tears', 13.99],
  ['Buckethead', 'Colma', 11.34],
  ['Crystal Method', 'Vegas', 10.54],
  ['Crystal Method', 'Tweekend', 10.64],
  ['Crystal Method', 'Divided By Night', 8.99],
];

const artistWorkbook = createWorkbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

albumList.setData(originalData); // <-- Here's the important part

artistWorkbook.addWorksheet(albumList);

const data = createExcelFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```

---

## NodeJS Usage Example

You can add data to a worksheet and export in NodeJS:

```js
import fs from 'node:fs';
import { createExcelFile, createWorkbook } from 'excel-builder-vanilla';

const workbook = createWorkbook();
const sheet = workbook.createWorksheet({ name: 'Demo' });
sheet.setData([
  ['Artist', 'Album', 'Price'],
  ['Buckethead', 'Albino Slug', 8.99],
]);
workbook.addWorksheet(sheet);

const buffer = createExcelFile(workbook);
fs.writeFileSync('output.xlsx', buffer);
```

> **Note:** some NodeJS scripts can be found in the [packages/demo/node-examples/](https://github.com/ghiscoding/excel-builder-vanilla/tree/main/packages/demo/node-examples/) folder.

---

## Boolean Values

Boolean values (`true`/`false`) are fully supported and are exported as Excel boolean cells with the proper type attribute. They are displayed as `TRUE` and `FALSE` (uppercase) in Excel.

```ts
const workbook = createWorkbook();
const sheet = workbook.createWorksheet({ name: 'Demo' });

const data = [
  ['Product', 'Active', 'Taxable', 'Price', 'Tax Amount'],
  ['Item A', true, true, 100, { value: 'IF(C2=TRUE,D2*0.075,0)', metadata: { type: 'formula' } }],
  ['Item B', false, false, 50, { value: 'IF(C3=TRUE,D3*0.075,0)', metadata: { type: 'formula' } }],
];

sheet.setData(data);
workbook.addWorksheet(sheet);
```

Boolean values can be used directly in cells and work seamlessly with Excel formulas like `IF()`. For example, `=IF(C2=TRUE,D2*0.075,0)` will correctly evaluate the boolean value and perform conditional calculations.

### Formatting Boolean Cells

You can apply custom formatting to boolean cells using the metadata style property:

```ts
const stylesheet = workbook.getStyleSheet();
const centerFormat = stylesheet.createFormat({
  alignment: { horizontal: 'center' },
});

const data = [
  ['Active'],
  [{ value: true, metadata: { style: centerFormat.id } }],
  [{ value: false, metadata: { style: centerFormat.id } }],
];
```
