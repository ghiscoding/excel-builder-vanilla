## Sizing/Collapsing Columns

Having all of the data showing up is great and all, but without column widths set, Excel just chops everything off. Also, sometimes you want the column to exist, but make it collapsed so it doesn't show.

Width is explained in some of the documentation for spreadsheetml. You have to do some calculation to get the exact widths you want, but generally all I really need is 'about right'.

The method you're looking for is 'setColumns', which takes in an array of column definitions. The 'width' attribute will set a width. The 'hidden' attribute will hide the column.

```ts
import { ExcelBuilder } from 'excel-builder-vanilla';

const artistWorkbook = createWorkbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });
albumList.mergeCells('A1', 'C1');

const stylesheet = artistWorkbook.getStyleSheet();
const header = stylesheet.createFormat({
  alignment: {
    horizontal: 'center',
  },
  font: {
    bold: true,
    color: 'FF2b995d',
    size: 13,
  },
});

const originalData = [
  [{ value: 'Centered Header', metadata: { style: header.id } }],
  ['Artist', 'Album', 'Price'],
  ['Buckethead', 'Albino Slug', 8.99],
  ['Buckethead', 'Electric Tears', 13.99],
  ['Buckethead', 'Colma', 11.34],
  ['Crystal Method', 'Vegas', 10.54],
  ['Crystal Method', 'Tweekend', 10.64],
  ['Crystal Method', 'Divided By Night', 8.99],
];

albumList.setData(originalData);
albumList.setColumns([{ width: 30 }, { width: 20, hidden: true }, { width: 10 }]);

artistWorkbook.addWorksheet(albumList);

const data = createExcelFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```
