## Adding "Summaries" to tables

Basically you need to tell the table what kind of operation the column is expected to do at the end. You also need to tell the table that there will, in fact, be a total row, and you have to make sure the total row is defined in the sheet data. There is a bit of redundancy here, be aware of that.

Basically, there are some things that you have to tell the table, and unfortunately you still need to add it to the data:

totalsRowCount - this will always be "1" if you want a footer. Theoretically, you could get into two row footers, but I don't think MS even supports that yet.
Each column must have a label or function. This is not an option. The label must match the value in the cell. The formula must match the formula type being used. These formula types can be found here and it needs to be matched to a 'function_num' for subtotal (in most cases) which you can find here
So, it causes the code to be a little wordier.

```ts
import { ExcelBuilder, Table } from 'excel-builder-vanilla';

const albumTable = new Table();

const originalData = [
  ['Artist', 'Album', 'Price'],
  ['Buckethead', 'Albino Slug', 8.99],
  ['Buckethead', 'Electric Tears', 13.99],
  ['Buckethead', 'Colma', 11.34],
  ['Crystal Method', 'Vegas', 10.54],
  ['Crystal Method', 'Tweekend', 10.64],
  ['Crystal Method', 'Divided By Night', 8.99],
  ['Highest Price', 'test', { value: 'SUBTOTAL(104,' + albumTable.name + '[Price])', metadata: { type: 'formula' } }],
];

const artistWorkbook = new ExcelBuilder().createWorkbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

albumTable.styleInfo.themeStyle = 'TableStyleDark2'; // This is a predefined table style
albumTable.setReferenceRange([1, 1], [3, originalData.length]);
albumTable.totalsRowCount = 1;

// Table columns are required, even if headerRowCount is zero. The name of the column also must match the
// data in the column cell that is the header - keep this in mind for localization
albumTable.setTableColumns([
  { name: 'Artist', totalsRowLabel: 'Highest Price' },
  { name: 'Album', totalsRowLabel: 'test' },
  { name: 'Price', totalsRowFunction: 'max' },
]);

albumList.setData(originalData);
artistWorkbook.addWorksheet(albumList);

albumList.addTable(albumTable);
artistWorkbook.addTable(albumTable);
const data = new ExcelBuilder().createFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```
