## Adding data to a worksheet

Adding data to a worksheet is very straightforward.

```ts
import { ExcelBuilder } from 'excel-builder-vanilla';

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
import { createWorkbook, createExcelFile } from 'excel-builder-vanilla';

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