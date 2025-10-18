import { describe, expect, test } from 'vitest';

import { Picture } from '../Excel/Drawing/Picture.js';
import { Drawings } from '../Excel/Drawings.js';
import { Positioning } from '../Excel/Positioning.js';
import { createWorkbook } from '../factory.js';

describe('Drawings', () => {
  test('Drawings', async () => {
    const fruitWorkbook = createWorkbook();
    const berryList = fruitWorkbook.createWorksheet({ name: 'Berry List' });
    const picRef1 = fruitWorkbook.addMedia('image', 'file1.jpeg', new Blob());
    const picRef2 = fruitWorkbook.addMedia('image', 'file2.gif', new Blob());
    const picRef3 = fruitWorkbook.addMedia('image', 'file3.png', new Blob());
    const picRef4 = fruitWorkbook.addMedia('image', 'file4.txt', new Blob());

    expect(picRef1.contentType).toBe('image/jpeg');
    expect(picRef2.contentType).toBe('image/gif');
    expect(picRef3.contentType).toBe('image/png');
    expect(picRef4.contentType).toBe(null);

    const drawings = new Drawings();
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

    strawberryPicture1.setMedia(picRef1);
    drawings.addDrawing(strawberryPicture1);

    const strawberryPicture2 = new Picture();
    strawberryPicture2.createAnchor('absoluteAnchor', {
      x: Positioning.pixelsToEMUs(300),
      y: Positioning.pixelsToEMUs(300),
      width: Positioning.pixelsToEMUs(300),
      height: Positioning.pixelsToEMUs(300),
    });

    strawberryPicture2.setMedia(picRef1);
    drawings.addDrawing(strawberryPicture2);

    const strawberryPicture3 = new Picture();
    strawberryPicture3.createAnchor('oneCellAnchor', {
      x: 1,
      y: 4,
      width: Positioning.pixelsToEMUs(300),
      height: Positioning.pixelsToEMUs(300),
    });

    strawberryPicture3.setMedia(picRef1);
    drawings.addDrawing(strawberryPicture3);

    berryList.addDrawings(drawings);
    fruitWorkbook.addDrawings(drawings);
    fruitWorkbook.addWorksheet(berryList);

    const file = await fruitWorkbook.generateFiles();
    const dwgs = fruitWorkbook.drawings;

    expect(file).toBeTruthy();
    expect(dwgs[0].drawings.length).toBe(3);

    // print titles offset of 2 => left B and top 2
    fruitWorkbook.setPrintTitleLeft('sheet1', 2);
    fruitWorkbook.setPrintTitleTop('sheet1', 2);

    const titles = fruitWorkbook.printTitles;
    expect(titles).toEqual({ sheet1: { left: 'B', top: 2 } });

    const wsXML = fruitWorkbook.toXML();
    expect(wsXML.documentElement.children.length).toBe(2);
  });

  test('toXML with missing relationship', () => {
    const d = new Drawings();
    d.drawings.push({
      getMediaData: () => ({ id: 'media1' }),
      getMediaType: () => 'image',
      setRelationshipId: () => {},
      toXML: () => ({}),
    } as any);
    d.relations = { getRelationshipId: () => null, addRelation: () => 'rId1' } as any;
    expect(() => d.toXML()).not.toThrow();
  });
});
