## Formulas

Formulas are the bread and butter of excel. Thankfully they're also ridiculously easy to make (if not very verbose).

```ts
import { ExcelBuilder } from 'excel-builder-vanilla';

const artistWorkbook = new ExcelBuilder().createWorkbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

const originalData = [
  [{ value: 'Artist' }, { value: 'Album' }, { value: 'Price' }, { value: 'Quantity' }, { value: 'Total' }],
  ['Buckethead', 'Albino Slug', 8.99, 5, { value: 'C2+D2', metadata: { type: 'formula' } }],
  ['Buckethead', 'Electric Tears', 13.99, 7, { value: 'C3+D3', metadata: { type: 'formula' } }],
  ['Buckethead', 'Colma', 11.34, 9, { value: 'C4+D4', metadata: { type: 'formula' } }],
  ['Crystal Method', 'Vegas', 10.54, 3, { value: 'C5+D5', metadata: { type: 'formula' } }],
  ['Crystal Method', 'Tweekend', 10.64, 1, { value: 'C6+D6', metadata: { type: 'formula' } }],
  ['Crystal Method', 'Divided By Night', 8.99, 56, { value: 'C7+D7', metadata: { type: 'formula' } }],
];

albumList.setData(originalData);
albumList.setColumns([{ width: 30 }, { width: 20 }, { width: 10 }]);

artistWorkbook.addWorksheet(albumList);

const data = new ExcelBuilder().createFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```

If you want to get the `R1C1` position, you can use the `util.positionToLetterRef(x, y)` method, which accepts the `X` position and the `Y` position, then returns an `R1C1` based off of that.
