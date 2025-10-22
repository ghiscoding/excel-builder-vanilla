import { describe, expect, test } from 'vitest';

import { createWorkbook } from '../../factory.js';
import { Picture } from '../Drawing/Picture.js';
import { Drawings } from '../Drawings.js';
import { Chart } from '../Drawing/Chart.js';
import { Positioning } from '../Positioning.js';

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
    expect(drawings.getCount()).toBe(3);
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

  test('toXML chart branch assigns relationship and appends XML', () => {
    const d = new Drawings();
    const chart = new Chart({
      type: 'bar',
      title: 'ChartRel',
      series: [{ name: 'S1', valuesRange: 'Sheet!$A$1:$A$1' }],
      categoriesRange: 'Sheet!$A$1:$A$1',
    });
    chart.createAnchor('twoCellAnchor', { from: { x: 0, y: 0 }, to: { x: 2, y: 5 } });
    d.addDrawing(chart);
    const xmlDoc = d.toXML();
    expect(chart.relId).toMatch(/^rId\d+$/);
    const xmlStr = xmlDoc.toString();
    expect(xmlStr).toContain('ChartRel');
    expect(xmlStr).toContain('<c:chart '); // chart branch executed
  });
});
