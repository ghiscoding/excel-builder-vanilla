## Number, Date, etc Formatting

Formatting data is very straightforward. You create a 'formatter' and a style to take advantage of that formatter, then apply that style to any cells that need it.

If you don't know what a 'format' should contain, open Excel and go to the cell formatter.

![](https://user-images.githubusercontent.com/643976/496be8b3-dc89-4c6a-b3b2-a87590fa9b28.gif)

There you should see a list of different predefined formats - choose or create as you feel necessary.

![](https://github.com/ghiscoding/slickgrid-universal/assets/643976/51c77ca9-5117-49a9-94a6-31ff69f4c1fa.png)

Once you have the format how you'd like, click on the 'Custom' option. This will have the code that you had selected/setup in the 'Type' box. Just copy and paste that code into the 'format' property.

![](https://github.com/ghiscoding/slickgrid-universal/assets/643976/236fed91-fdfd-4203-840f-2ea1e12b7da6)

```ts
import { ExcelBuilder } from 'excel-builder-vanilla';

const artistWorkbook = new ExcelBuilder().createWorkbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Album List' });

const currency = artistWorkbook.getStyleSheet().createFormat({
  format: '$#,##0.00',
});

const originalData = [
  ['Artist', 'Album', 'Price'],
  ['Buckethead', 'Albino Slug', { value: 8.99, metadata: { style: currency.id } }],
  ['Buckethead', 'Electric Tears', { value: 13.99, metadata: { style: currency.id } }],
  ['Buckethead', 'Colma', { value: 11.34, metadata: { style: currency.id } }],
  ['Crystal Method', 'Vegas', { value: 10.54, metadata: { style: currency.id } }],
  ['Crystal Method', 'Tweekend', { value: 10.64, metadata: { style: currency.id } }],
  ['Crystal Method', 'Divided By Night', { value: 8.99, metadata: { style: currency.id } }],
];

albumList.setData(originalData);
artistWorkbook.addWorksheet(albumList);

const data = new ExcelBuilder().createFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```

Note that the currency formatter could also have been done as follows:

```ts
const currencyFormat = artistWorkbook.getStyleSheet().createNumberFormatter('$#,##0.00');
const currency = artistWorkbook.getStyleSheet().createFormat({ format: currencyFormat.id });
```

This would allow the reuse of the currency number format by multiple formatters.
