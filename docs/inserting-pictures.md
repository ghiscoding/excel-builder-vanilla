## Inserting pictures

Creating pictures in Excel is a bit complicated, mostly due to the many, many different tweaks that can be done in the picture. As of 10/22/2013, options are fairly limited -

- Two-cell anchors - specify which cell the picture starts (at the top left) and which cell it ends at (in the bottom left). Offsets also available by specifying an xOff and yOff on each parameter.
- One-cell anchors - specify which cell the picture starts, and the width/height of the image.
- Absolute anchors - specify the offset of the image, and the width/height of the image.

OpenXML Drawings have an odd (understandable, but still odd) positioning system. Use the pixelsToEMUs method available in the Positioning.js to turn a pixel amount into EMU's, which is what is needed for any offset specification.

```ts
import { Drawings, ExcelBuilder, Picture, Positioning } from 'excel-builder-vanilla';
import strawberry from './images/strawberry.jpg.base64';

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

console.log(fruitWorkbook.generateFiles());
const data = createExcelFile(fruitWorkbook);
downloader('Fruit WB.xlsx', data);
```
