## Aligning Values of Cells

Aligning data is very straightforward. You need either horizontal or vertical (or both) keys set with the type of alignment you want.

Horizontal alignment types can be found [here](http://www.datypic.com/sc/ooxml/t-ssml_ST_HorizontalAlignment.html)

Vertical alignment types can be found [here](http://www.datypic.com/sc/ooxml/t-ssml_ST_VerticalAlignment.html)

```ts
import { ExcelBuilder } from 'excel-builder-vanilla';

const artistWorkbook = createWorkbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

const centerAlign = artistWorkbook.getStyleSheet().createFormat({
  alignment: {
    horizontal: 'center',
  },
});

const originalData = [
  [
    { value: 'Artist', metadata: { style: centerAlign.id } },
    { value: 'Album', metadata: { style: centerAlign.id } },
    { value: 'Price', metadata: { style: centerAlign.id } },
  ],
  ['Buckethead', 'Albino Slug', 8.99],
  ['Buckethead', 'Electric Tears', 13.99],
  ['Buckethead', 'Colma', 11.34],
  ['Crystal Method', 'Vegas', 10.54],
  ['Crystal Method', 'Tweekend', 10.64],
  ['Crystal Method', 'Divided By Night', 8.99],
];

albumList.setData(originalData);
albumList.setColumns([{ width: 30 }, { width: 30 }, { width: 30 }]);

artistWorkbook.addWorksheet(albumList);

const data = createExcelFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```
