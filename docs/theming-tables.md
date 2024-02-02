## Theming Tables

Every once in a while you need a table theme that isn't available from the Custom Themes.

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

const artistWorkbook = new ExcelBuilder().createWorkbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

const stylesheet = artistWorkbook.getStyleSheet();

const boldDXF = stylesheet.createDifferentialStyle({
  font: {
    italic: true,
  },
});

stylesheet.createTableStyle({
  name: 'SlightlyOffColorBlue',
  wholeTable: boldDXF.id,
  headerRow: stylesheet.createDifferentialStyle({
    alignment: { horizontal: 'center' },
  }).id,
});

const albumTable = new Table();
albumTable.styleInfo.themeStyle = 'SlightlyOffColorBlue';
albumTable.setReferenceRange([1, 1], [3, originalData.length]); // X,Y position where the table starts and stops.

// Table columns are required, even if headerRowCount is zero. The name of the column also must match the
// data in the column cell that is the header - keep this in mind for localization
albumTable.setTableColumns(['Artist', 'Album', 'Price']);

albumList.setData(originalData);
artistWorkbook.addWorksheet(albumList);

albumList.addTable(albumTable);
artistWorkbook.addTable(albumTable);
const data = new ExcelBuilder().createFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```
