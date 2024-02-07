## Fonts and Colors

A plain black and white Excel sheet is a bit boring, especially one that doesn't even have the occasional text font changes. Every workbook comes with a stylesheet - all you need to do is request it via `getStyleSheet()`

```ts
const stylesheet = artistWorkbook.getStyleSheet();
```

Now, first thing first, we need a style.

### Creating a style

```ts
const boldStyle = stylesheet.createFontStyle({
  bold: true,
  size: 14,
});
```

This will give you a style object back, which you can then use on a cell formatter. Pass the ID of the style, not the entire style instance.

```ts
const boldFormatter = stylesheet.createFormat({
  font: boldStyle.id,
});
```

You can reuse this style on multiple cell formats. Alternatively, an easier way might be to just use the createFormat method to also create the style.

```ts
const boldFormatter = stylesheet.createFormat({
  font: {
    bold: true,
    size: 14,
  },
});
```

The downside to this is the lack of a shared font style - you might have ten different 'bold' definitions.

### Colors

There are two different ways to specify a color of something. First is to reference the theme color, second is to reference an ARGB hexidecimal. All of my colors have been solid, opaque colors - so they've started with 'FF' (hex 255).

Colors can be set as a simple string or an object that represents some information about the color. That information might be the tint or it's theme color index.

By default, the theme used is the 'office' theme.

```ts
const red = 'FFFF0000';
const importantFormatter = stylesheet.createFormat({
  font: {
    bold: true,
    color: red,
  },
  border: {
    bottom: { color: red, style: 'thin' },
    top: { color: red, style: 'thin' },
    left: { color: red, style: 'thin' },
    right: { color: red, style: 'thin' },
  },
});

const themeColor = stylesheet.createFormat({
  font: {
    bold: true,
    color: { theme: 2 },
  },
});
```

So, to bring it all together in an example:

```ts
import { ExcelBuilder } from 'excel-builder-vanilla';

const artistWorkbook = createWorkbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });
const stylesheet = artistWorkbook.getStyleSheet();

const red = 'FFFF0000';
const importantFormatter = stylesheet.createFormat({
  font: {
    bold: true,
    color: red,
  },
  border: {
    bottom: { color: red, style: 'thin' },
    top: { color: red, style: 'thin' },
    left: { color: red, style: 'thin' },
    right: { color: red, style: 'thin' },
  },
});

const themeColor = stylesheet.createFormat({
  font: {
    bold: true,
    color: { theme: 3 },
  },
});

const originalData = [
  [
    { value: 'Artist', metadata: { style: importantFormatter.id } },
    { value: 'Album', metadata: { style: themeColor.id } },
    { value: 'Price', metadata: { style: themeColor.id } },
  ],
  ['Buckethead', 'Albino Slug', 8.99],
  ['Buckethead', 'Electric Tears', 13.99],
  ['Buckethead', 'Colma', 11.34],
  ['Crystal Method', 'Vegas', 10.54],
  ['Crystal Method', 'Tweekend', 10.64],
  ['Crystal Method', 'Divided By Night', 8.99],
];

albumList.setData(originalData);
albumList.setColumns([{ width: 30 }, { width: 20 }, { width: 10 }]);

artistWorkbook.addWorksheet(albumList);

const data = createExcelFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```
