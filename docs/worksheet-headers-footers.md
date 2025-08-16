## Adding headers and footers to a worksheet

Headers and footers are there mostly for when the user prints. A good example is the `"3 out of 12"` that you might get on the bottom of some pages, showing that you're looking at page three out of twelve. Giving print titles (such as `"CONFIDENTIAL"` or the name of the organization that this is being printed for) is pretty common practice. The problem with having this data in the worksheet is that you're potentially messing up your cells just in the name of slapping a header in so the person knows what they are looking at when it gets printed.

In office 2007 and up, go to the `View` and change to the `Page Layout` view to see the headers on a worksheet (or add/alter them).

Headers and footers are set with the `setHeader` and `setFooter` methods - each method expects an array with the length of three. Position one is for the leftmost block in the header/footer, the second is the for the center block and the third is for the right block. Each block takes a set of instructions:

A plain string with text
An object with a `text` property and one or all of `bold`, `underline` and `size`. Size will be a number, the rest will be booleans.
An array of items (either text or objects)
Some special codes:

`&P` - The page number that is being printed/looked at (generally the `#` in `"# of 12"`)
`&N` - The total number of pages that will be printed
`&D` - The current date
`&T` - The current time
`&Z` - The path to the folder that the file is in
`&F` - The filename
`&A` - The name of the worksheet

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

albumList.setData(originalData); // <-- Here's the important part

albumList.setHeader([
  'This will be on the left',
  ['In the middle', { text: 'I shall be', bold: true }],
  { text: 'Right, underlined and size of 16', font: 16, underline: true },
]);

albumList.setFooter(['Date of print: &D &T', '&A', 'Page &P of &N']);
artistWorkbook.addWorksheet(albumList);

const data = createExcelFile(artistWorkbook);
downloader('Artist WB.xlsx', data);
```

---

## NodeJS Usage Example

Headers and footers work in NodeJS as well:

```js
import fs from 'node:fs';
import { createWorkbook, createExcelFile } from 'excel-builder-vanilla';

const workbook = createWorkbook();
const sheet = workbook.createWorksheet({ name: 'Demo' });
sheet.setData([
  ['Artist', 'Album', 'Price'],
  ['Buckethead', 'Albino Slug', 8.99],
]);
sheet.setHeader(['Left', 'Center', 'Right']);
sheet.setFooter(['Date: &D', '&A', 'Page &P of &N']);
workbook.addWorksheet(sheet);

const buffer = createExcelFile(workbook);
fs.writeFileSync('output.xlsx', buffer);
```

> **Note:** a Node script can be found in the [packages/demo/node-examples/](https://github.com/ghiscoding/excel-builder-vanilla/tree/main/packages/demo/node-examples/) folder.