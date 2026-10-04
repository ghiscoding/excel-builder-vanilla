import { strFromU8, unzipSync } from 'fflate';
import { describe, expect, it, vi } from 'vitest';

import { Chart, createExcelFile, createExcelFileStream, Drawings, Picture, Table, Workbook } from '../index.js';

async function collect(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
  }
  const output = new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }
  return output;
}

describe('library export browser regressions', () => {
  it('streams the same worksheet, table, drawing, chart, and media contents as normal export', async () => {
    const wb = new Workbook();
    const ws = wb.createWorksheet({ name: 'Data' });
    ws.setData([
      ['Label', 'Value'],
      ['A&B 😀', 42],
      ['constructor', { value: 'SUM(B2)', metadata: { type: 'formula' } }],
    ]);
    ws.setHeader(['<&>', '', '']);
    ws.hyperlinks.push({ id: 'link', cell: 'A2', location: 'https://example.com?a=1&b=2' });
    wb.addWorksheet(ws);
    const table = new Table();
    table.setReferenceRange([1, 1], [2, 3]);
    table.setTableColumns(['Label', 'Value']);
    wb.addTable(table);
    ws.addTable(table);
    const chart = new Chart({ series: [{ name: 'Values', valuesRange: 'Data!$B$2:$B$3' }], categoriesRange: 'Data!$A$2:$A$3' });
    chart.createAnchor('oneCellAnchor', { x: 3, y: 1, width: 4000000, height: 3000000 });
    wb.addChart(chart);
    const image = new Picture();
    image.setMedia(
      wb.addMedia('image', 'pixel.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='),
    );
    image.createAnchor('oneCellAnchor', { x: 1, y: 1, width: 1000, height: 1000 });
    const drawings = new Drawings();
    drawings.addDrawing(chart);
    drawings.addDrawing(image);
    wb.addDrawings(drawings);
    ws.addDrawings(drawings);
    const normal = unzipSync(await createExcelFile(wb, 'Uint8Array'));
    const streamed = unzipSync(await collect(createExcelFileStream(wb, { chunkSize: 1024 }) as ReadableStream<Uint8Array>));
    expect(Object.keys(streamed)).toEqual(Object.keys(normal));
    for (const [path, content] of Object.entries(normal)) {
      expect(streamed[path]).toEqual(content);
      if (/\.(xml|rels)$/.test(path)) {
        const xml = new DOMParser().parseFromString(strFromU8(content), 'application/xml');
        expect(xml.querySelector('parsererror')).toBeNull();
      }
    }
    expect(strFromU8(streamed['xl/drawings/_rels/drawing1.xml.rels'])).toContain('/xl/media/pixel.png');
  });

  it('starts on reader demand and cancels without generating the remaining rows', async () => {
    const wb = new Workbook();
    const ws = wb.createWorksheet({ name: 'Demand' });
    ws.setData(Array.from({ length: 10000 }, (_, i) => [`text-${i}`]));
    wb.addWorksheet(ws);
    const generate = vi.spyOn(wb, 'generateFileEntries');
    const stream = createExcelFileStream(wb) as ReadableStream<Uint8Array>;
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(generate).not.toHaveBeenCalled();
    const reader = stream.getReader();
    expect((await reader.read()).value?.length).toBeGreaterThan(0);
    expect(wb.sharedStrings.stringArray.length).toBeLessThan(ws.data.length);
    await reader.cancel();
    const count = wb.sharedStrings.stringArray.length;
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(wb.sharedStrings.stringArray.length).toBe(count);
    expect((await reader.read()).done).toBe(true);
  });

  it('rejects invalid media through the reader', async () => {
    const wb = new Workbook();
    wb.addMedia('image', 'broken.png', 'invalid!!!');
    const reader = (createExcelFileStream(wb) as ReadableStream<Uint8Array>).getReader();
    await expect(reader.read()).rejects.toThrow('Invalid base64 payload');
  });
});
