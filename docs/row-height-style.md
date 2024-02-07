## Setting row information

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
const stylesheet = artistWorkbook.getStyleSheet();

const boldDXF = stylesheet.createDifferentialStyle({
  font: {
    italic: true,
  },
});
albumList.setRowInstructions(1, {
  height: 30,
  style: boldDXF.id,
});
albumList.setData(originalData); //<-- Here's the important part

artistWorkbook.addWorksheet(albumList);

const data = createExcelFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```
