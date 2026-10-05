// biome-ignore-all lint/complexity/useLiteralKeys: Bracket access intentionally exercises private members.
import { strFromU8, unzipSync, Zip, ZipDeflate } from 'fflate';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Paths } from '../Excel/Paths.js';
import { SharedStrings } from '../Excel/SharedStrings.js';
import { Workbook } from '../Excel/Workbook.js';
import { XMLDOM } from '../Excel/XMLDOM.js';
import { base64ToUint8Array, createExcelFile } from '../factory.js';
import { createExcelFileStream, nodeExcelStream } from '../streaming.js';

const decode = (bytes: Uint8Array) => Object.fromEntries(Object.entries(unzipSync(bytes)).map(([path, data]) => [path, strFromU8(data)]));
async function consume(stream: AsyncIterable<Uint8Array>) {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const bytes = new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return bytes;
}

afterEach(() => vi.unstubAllGlobals());

describe('export regressions', () => {
  it('keeps shared-string IDs and hyperlink relationships stable across repeated exports', async () => {
    const wb = new Workbook();
    const ws = wb.createWorksheet({ name: 'Repeat' });
    ws.setData([['alpha', 'beta', 'gamma', 'constructor', 'toString', '__proto__']]);
    ws.hyperlinks.push({ cell: 'A1', id: 'link', location: 'https://example.com' });
    wb.addWorksheet(ws);
    const first = await wb.generateFiles();
    expect(await wb.generateFiles()).toEqual(first);
    expect(wb.sharedStrings.stringArray).toEqual(['alpha', 'beta', 'gamma', 'constructor', 'toString', '__proto__']);
    expect(first['/xl/worksheets/sheet1.xml']).toContain('<c t="s" r="F1"><v>5</v></c>');
    expect(Object.keys(ws.relations!.relations)).toEqual(['link']);
    ws.hyperlinks = [];
    await wb.generateFiles();
    expect(Object.keys(ws.relations!.relations)).toEqual([]);
  });

  it('deduplicates direct shared-string insertion and preserves XML ordering', () => {
    const strings = new SharedStrings();
    for (const value of ['__proto__', '', ' a&b ', 'alpha', 'alpha']) {
      strings.addString(value);
    }
    expect(strings.stringArray).toEqual(['__proto__', '', ' a&b ', 'alpha']);
    const original = strings.toXML().toString();
    expect(strings.toXML().toString()).toBe(original);
    expect([...strings.getXmlChunks(1)].join('')).toBe(`${XMLDOM.declaration}\n${original}`);
    const empty = new SharedStrings();
    expect([...empty.getXmlChunks()].join('')).toBe(`${XMLDOM.declaration}\n${empty.toXML()}`);
  });

  it('preserves all worksheet features in direct XML, normal ZIP, and incremental ZIP', async () => {
    const wb = new Workbook();
    const ws = wb.createWorksheet({ name: 'Features' });
    wb.addWorksheet(ws);
    const date = new Date('2026-01-01T00:00:00Z');
    ws['_timezoneOffset'] = 0;
    const metadata = Object.freeze({ type: 'formula', style: 0 });
    ws.setData([
      [
        1,
        true,
        false,
        null,
        date,
        { value: 'IF(A1<2,"<&>","")', metadata },
        ...Array.from({ length: 22 }, (_, i) => ` text ${i} 😀 NS123: `),
      ],
      [],
      [
        { value: 123, metadata: { type: 'date', style: 2 } },
        { value: '0042', metadata: { type: 'text' } },
      ],
    ]);
    ws.setRowInstructions(0, { height: 25, style: 3 });
    ws.setRowInstructions(1, { style: 0 });
    ws.setColumns([{ width: 20, hidden: true }, { bestFit: true }]);
    ws.mergeCells('A2', 'B2');
    ws.setHeader(['A&B <report>', '', '']);
    ws.setFooter(['', '😀', '']);
    ws.setPageMargin({ top: 1, bottom: 1, left: 1, right: 1, header: 0.5, footer: 0.5 });
    ws.setPageOrientation('landscape');
    ws.hyperlinks.push({ cell: 'A1', id: 'hyperlink', location: 'https://example.com?a=1&b=2' });
    const dom = ws.toXML().toString();
    expect([...ws.getXmlChunks(10)].join('')).toBe(`${XMLDOM.declaration}\n${dom}`);
    expect(dom).toContain('r="AB1"');
    expect(dom).toContain('t="b"');
    expect(dom).toContain('r="E1"><v>46023</v>');
    expect(dom).toContain('s="0" r="F1"><f>IF(A1&lt;2,');
    expect(ws.getWorksheetXmlFooter()).toContain('A&amp;B &lt;report&gt;');
    const normal = await createExcelFile(wb, 'Uint8Array');
    const streamed = await consume(nodeExcelStream(wb, { chunkSize: 37 }));
    expect(decode(streamed)).toEqual(decode(normal));
    expect(decode(normal)['xl/sharedStrings.xml']).toContain('NS123:');
    expect(ws.data[0][5]).toEqual({ value: 'IF(A1<2,"<&>","")', metadata });
  });

  it('keeps global Paths unchanged and isolates concurrent workbook relationships', async () => {
    const before = { ...Paths };
    const workbooks = Array.from({ length: 10 }, (_, i) => {
      const wb = new Workbook();
      wb.addWorksheet(wb.createWorksheet({ name: `Sheet${i}` }));
      return wb;
    });
    const files = await Promise.all(workbooks.map(wb => wb.generateFiles()));
    expect({ ...Paths }).toEqual(before);
    for (const file of files) {
      expect(file['/xl/_rels/workbook.xml.rels']).toContain('Target="worksheets/sheet1.xml"');
      expect(file['/xl/_rels/workbook.xml.rels']).toContain('Target="sharedStrings.xml"');
    }
  });

  it('honors custom XML exporters and the original generateFiles override contract', async () => {
    const wb = new Workbook();
    const ws = wb.createWorksheet({ name: 'Custom' });
    wb.addWorksheet(ws);
    const toXML = ws.toXML.bind(ws);
    ws.toXML = () => {
      const doc = toXML();
      doc.documentElement.setAttribute('custom', 'value');
      return doc;
    };
    expect((await wb.generateFiles())['/xl/worksheets/sheet1.xml']).toContain('custom="value"');
    const stringsToXML = wb.sharedStrings.toXML.bind(wb.sharedStrings);
    wb.sharedStrings.toXML = () => {
      const doc = stringsToXML();
      doc.documentElement.setAttribute('custom', 'strings');
      return doc;
    };
    expect((await wb.generateFiles())['/xl/sharedStrings.xml']).toContain('custom="strings"');
    const files = { '/custom.xml': '<custom/>' };
    wb.generateFiles = async () => files;
    expect(decode(await createExcelFile(wb, 'Uint8Array'))).toEqual({ 'custom.xml': '<custom/>' });
    expect(files).toEqual({ '/custom.xml': '<custom/>' });
    expect(decode(await consume(nodeExcelStream(wb)))).toEqual({ 'custom.xml': '<custom/>' });
  });

  it('rejects file generation and media conversion failures through the public promise', async () => {
    const wb = new Workbook();
    wb.addMedia('image', 'broken.png', 'invalid!!!');
    await expect(createExcelFile(wb, 'Uint8Array')).rejects.toThrow('Invalid base64 payload');
    await expect(consume(nodeExcelStream(wb))).rejects.toThrow('Invalid base64 payload');
    vi.spyOn(wb, 'generateFiles').mockRejectedValue(new Error('generation failed'));
    await expect(createExcelFile(wb)).rejects.toThrow('generation failed');
    vi.spyOn(wb, 'generateFiles').mockImplementation(() => {
      throw new Error('synchronous failure');
    });
    await expect(createExcelFile(wb)).rejects.toThrow('synchronous failure');
  });

  it('rejects browser stream reads when export generation fails', async () => {
    vi.stubGlobal('window', { ReadableStream });
    const wb = new Workbook();
    wb.addMedia('image', 'broken.png', 'invalid!!!');

    const stream = createExcelFileStream(wb) as ReadableStream<Uint8Array>;
    const reader = stream.getReader();

    await expect(reader.read()).rejects.toThrow('Invalid base64 payload');
  });

  it.each([
    ['while pushing entry data', '<worksheet/>'],
    ['after finalizing an empty entry', ''],
    ['after finalizing an empty archive', undefined],
  ])('propagates ZIP callback failures %s', async (_stage, content) => {
    const wb = new Workbook();
    const zipError = new Error('simulated ZIP failure');
    const generateEntries = vi.spyOn(wb, 'generateFileEntries').mockImplementation(function* () {
      if (content !== undefined) {
        yield ['/xl/failure.xml', content];
      }
    });
    const add = vi.spyOn(Zip.prototype, 'add').mockImplementation(function () {
      this.ondata(zipError, new Uint8Array(), false);
    });
    const end = vi.spyOn(Zip.prototype, 'end').mockImplementation(function () {
      this.ondata(zipError, new Uint8Array(), true);
    });
    const push = vi.spyOn(ZipDeflate.prototype, 'push').mockImplementation(() => {});

    try {
      await expect(consume(nodeExcelStream(wb))).rejects.toBe(zipError);
    } finally {
      generateEntries.mockRestore();
      add.mockRestore();
      end.mockRestore();
      push.mockRestore();
    }
  });

  it.each(['aGVsbG8=', 'aG Vs\nbG8=', 'data:text/plain;base64,aGVsbG8', 'aGVsbG8'])('decodes normalized media: %s', input => {
    expect(strFromU8(base64ToUint8Array(input))).toBe('hello');
  });

  it('decodes base64url and rejects invalid padding or characters', () => {
    expect(base64ToUint8Array('-_8')).toEqual(new Uint8Array([251, 255]));
    for (const invalid of ['a', 'abc===', 'a!bc', '=abc']) {
      expect(() => base64ToUint8Array(invalid)).toThrow('Invalid base64 payload');
    }
  });

  it.each([0, -1, 1.5, NaN, Infinity])('rejects invalid chunk size %s', chunkSize => {
    expect(() => createExcelFileStream(new Workbook(), { chunkSize })).toThrow('positive safe integer');
  });

  it.each([0, 1, 6, 9] as const)('produces readable incremental archives at compression level %s', async level => {
    const wb = new Workbook();
    const ws = wb.createWorksheet({ name: 'Chunks' });
    ws.setData(Array.from({ length: 500 }, (_, i) => [i, '😀<&>']));
    wb.addWorksheet(ws);
    const chunks: Uint8Array[] = [];
    for await (const chunk of nodeExcelStream(wb, { chunkSize: 7, zipOptions: { level } })) {
      expect(chunk.length).toBeLessThanOrEqual(7);
      expect(chunk.buffer.byteLength).toBe(chunk.length);
      chunks.push(chunk);
    }
    const output = await consume(
      (async function* () {
        yield* chunks;
      })(),
    );
    expect(decode(output)['xl/worksheets/sheet1.xml']).toContain('r="A500"');
  });

  it('does not generate browser output without demand and stops after cancellation', async () => {
    vi.stubGlobal('window', { ReadableStream });
    const wb = new Workbook();
    const ws = wb.createWorksheet({ name: 'Demand' });
    ws.setData(Array.from({ length: 10000 }, (_, i) => [`unique-${i}`]));
    wb.addWorksheet(ws);
    const generate = vi.spyOn(wb, 'generateFileEntries');
    const stream = createExcelFileStream(wb) as ReadableStream<Uint8Array>;
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(generate).not.toHaveBeenCalled();
    const reader = stream.getReader();
    expect((await reader.read()).done).toBe(false);
    expect(wb.sharedStrings.stringArray.length).toBeLessThan(ws.data.length);
    await reader.cancel();
    const count = wb.sharedStrings.stringArray.length;
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(wb.sharedStrings.stringArray.length).toBe(count);
    expect((await reader.read()).done).toBe(true);
  });
});
