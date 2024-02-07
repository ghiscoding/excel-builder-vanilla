## Fillers

No, not like what you get in most hotdogs. These are the patterns and colors for a cell fill.

There are two possible types of fill. A pattern fill and a gradient fill. These two types take different instructions.

The pattern fill requires a pattern type (or solid, if one just wants a solid background color). It also requires a foreground and background color. The trick to remember is that a foreground color is for the pattern (or in the case of a solid background, the actual color you want the background to be). The background color is for whatever the pattern goes on top of.

A gradient fill requires a `degree` (or if no degree, a `left`, `right`, `top` and `bottom`). Then, the start and end instructions. The start and end instructions can be simple colors, by which EB will just assume that you want the start color to be pure at 'zero' (i.e. the beginning) and the end color to be pure at the 'one' (i.e. the end). In the example below, I want the end color to be pure 80% into the cell.

**Note:** HTML color requires the `#` prefix to be escaped as `FF`, for example the HTML color `#0000FF` (blue) must be converted to `FF0000FF`

```ts
import { ExcelBuilder } from 'excel-builder-vanilla';

const artistWorkbook = createWorkbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });
const stylesheet = artistWorkbook.getStyleSheet();

const blue = 'FF0000FF';
const header = stylesheet.createFormat({
  font: {
    bold: true,
    color: blue,
  },
  fill: {
    type: 'pattern',
    patternType: 'solid',
    fgColor: 'FF00FF00',
  },
});

const artistNameFormat = stylesheet.createFormat({
  font: {
    color: 'FFFFFFFF',
  },
  fill: {
    type: 'gradient',
    degree: 180,
    start: 'FF92D050',
    end: { pureAt: 0.8, color: 'FF0070C0' },
  },
});

const originalData = [
  [
    { value: 'Artist', metadata: { style: header.id } },
    { value: 'Album', metadata: { style: header.id } },
    { value: 'Price', metadata: { style: header.id } },
  ],
  [{ value: 'Buckethead', metadata: { style: artistNameFormat.id } }, 'Albino Slug', 8.99],
  [{ value: 'Buckethead', metadata: { style: artistNameFormat.id } }, 'Electric Tears', 13.99],
  [{ value: 'Buckethead', metadata: { style: artistNameFormat.id } }, 'Colma', 11.34],
  [{ value: 'Crystal Method', metadata: { style: artistNameFormat.id } }, 'Vegas', 10.54],
  [{ value: 'Crystal Method', metadata: { style: artistNameFormat.id } }, 'Tweekend', 10.64],
  [{ value: 'Crystal Method', metadata: { style: artistNameFormat.id } }, 'Divided By Night', 8.99],
];

albumList.setData(originalData);
albumList.setColumns([{ width: 30 }, { width: 20 }, { width: 10 }]);

artistWorkbook.addWorksheet(albumList);

const data = createExcelFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```
