## Number, Date, etc Formatting

Formatting data is very straightforward. You create a 'formatter' and a style to take advantage of that formatter, then apply that style to any cells that need it.

If you don't know what a 'format' should contain, open Excel and go to the cell formatter.

![](https://github.com/ghiscoding/excel-builder-vanilla/assets/643976/badc2d94-e0be-4c05-9360-cdfc3e654f20)

There you should see a list of different predefined formats - choose or create as you feel necessary.

![](https://github.com/ghiscoding/excel-builder-vanilla/assets/643976/53e74ac0-c7c9-431b-bf1e-3890b819c2fa)

Once you have the format how you'd like, click on the 'Custom' option. This will have the code that youhad selected/setup in the 'Type' box. Just copy and paste that code into the 'format' property.

![](https://github.com/ghiscoding/excel-builder-vanilla/assets/643976/1f3d1229-fb22-4b6b-b8fc-7bceac963d18)

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
