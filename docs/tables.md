## Tables

Tables are a feature that is apparently new to Office 2007+, with a comparable feature called a 'list' in 2003 and below.

Basically, by putting data in a table, it gives the user some ways to filter and sort the data through UI. There are also some formula benefits.

Creating a table takes a few extra steps, mostly because of how a table's definition is really detached from a worksheet.

```ts
import { ExcelBuilder, Table } from 'excel-builder-vanilla';

const originalData = [
  ['Artist', 'Album', 'Price'],
  ['Buckethead', 'Albino Slug', 8.99],
  ['Buckethead', 'Electric Tears', 13.99],
  ['Buckethead', 'Colma', 11.34],
  ['Crystal Method', 'Vegas', 10.54],
  ['Crystal Method', 'Tweekend', 10.64],
  ['Crystal Method', 'Divided By Night', 8.99],
];

// require(['excel-builder.js/excel-builder', 'excel-builder.js/Excel/Table','download'], function (EB, Table, downloader) {
const artistWorkbook = new ExcelBuilder().createWorkbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

const albumTable = new Table();
albumTable.styleInfo.themeStyle = 'TableStyleDark2'; //This is a predefined table style
albumTable.setReferenceRange([1, 1], [3, originalData.length]); //X/Y position where the table starts and stops.

//Table columns are required, even if headerRowCount is zero. The name of the column also must match the
//data in the column cell that is the header - keep this in mind for localization
albumTable.setTableColumns(['Artist', 'Album', 'Price']);

albumList.setData(originalData);
artistWorkbook.addWorksheet(albumList);

albumList.addTable(albumTable);
artistWorkbook.addTable(albumTable);
const data = new ExcelBuilder().createFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```
