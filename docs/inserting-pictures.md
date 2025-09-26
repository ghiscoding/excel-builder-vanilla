## Inserting pictures

Creating pictures in Excel is a bit complicated, mostly due to the many, many different tweaks that can be done in the picture. As of 10/22/2013, options are fairly limited -

- Two-cell anchors - specify which cell the picture starts (at the top left) and which cell it ends at (in the bottom left). Offsets also available by specifying an xOff and yOff on each parameter.
- One-cell anchors - specify which cell the picture starts, and the width/height of the image.
- Absolute anchors - specify the offset of the image, and the width/height of the image.

OpenXML Drawings have an odd (understandable, but still odd) positioning system. Use the `pixelsToEMUs` method available in the `Positioning.js` to turn a pixel amount into EMU's, which is what is needed for any offset specification.

> **Note** Please note that pictures **must be provided as `base64` format**, you can look on the internet on how to do that or if you're using ViteJS then scroll to the end of this document to see a code example of a custom Vite loader plugin.

```ts
import { Drawings, ExcelBuilder, Picture, Positioning } from 'excel-builder-vanilla';
import strawberryImageData from './images/strawberry.jpg?base64'; // using an optional Vite loader plugin

const fruitWorkbook = createWorkbook();
const berryList = fruitWorkbook.createWorksheet({ name: 'Berry List' });
const stylesheet = fruitWorkbook.getStyleSheet();

const drawings = new Drawings();

const picRef = fruitWorkbook.addMedia('image', 'strawberry.jpg', strawberryImageData);

const strawberryPicture1 = new Picture();
strawberryPicture1.createAnchor('twoCellAnchor', {
  from: {
    x: 0,
    y: 0,
  },
  to: {
    x: 3,
    y: 3,
  },
});

strawberryPicture1.setMedia(picRef);
drawings.addDrawing(strawberryPicture1);

const strawberryPicture2 = new Picture();
strawberryPicture2.createAnchor('absoluteAnchor', {
  x: Positioning.pixelsToEMUs(300),
  y: Positioning.pixelsToEMUs(300),
  width: Positioning.pixelsToEMUs(300),
  height: Positioning.pixelsToEMUs(300),
});

strawberryPicture2.setMedia(picRef);
drawings.addDrawing(strawberryPicture2);

const strawberryPicture3 = new Picture();
strawberryPicture3.createAnchor('oneCellAnchor', {
  x: 1,
  y: 4,
  width: Positioning.pixelsToEMUs(300),
  height: Positioning.pixelsToEMUs(300),
});

strawberryPicture3.setMedia(picRef);
drawings.addDrawing(strawberryPicture3);

berryList.addDrawings(drawings);
fruitWorkbook.addDrawings(drawings);
fruitWorkbook.addWorksheet(berryList);

const data = createExcelFile(fruitWorkbook);
downloader('Fruit WB.xlsx', data);
```

### Vite `base64` loader plugin

For loading an image as `base64` with ViteJS, you could do it easily with a custom Vite loader plugin.

> The code shown below was copied from this Stack Overflow [answer](https://stackoverflow.com/a/78012267/1212166)

```ts
import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';

const base64Loader: Plugin = {
  name: 'base64-loader',
  transform(_: any, id: string) {
    const [path, query] = id.split('?');
    if (query !== 'base64') return null;

    const data = readFileSync(path);
    const base64 = data.toString('base64');

    return `export default '${base64}';`;
  },
};

export default defineConfig({
  // ...
  plugins: [base64Loader],
});
```
