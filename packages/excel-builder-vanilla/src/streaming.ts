import { strToU8, zipSync } from 'fflate';
import type { Workbook } from './Excel/Workbook.js';
import { base64ToUint8Array } from './factory.js';

export interface ExcelFileStreamOptions {
  chunkSize?: number;
  outputType?: 'Uint8Array' | 'Blob' | 'stream';
  fileFormat?: 'xlsx' | 'xls';
  mimeType?: string;
}

/**
 * Environment-aware streaming Excel file generator.
 * Yields zipped chunks for browser (ReadableStream) or NodeJS (async generator).
 */
export function createExcelFileStream(workbook: Workbook, options?: ExcelFileStreamOptions) {
  const isBrowser = typeof window !== 'undefined' && typeof window.ReadableStream !== 'undefined';
  const isNode = typeof process !== 'undefined' && process.versions?.node;
  if (isBrowser) {
    return browserExcelStream(workbook, options);
  }
  if (isNode) {
    return nodeExcelStream(workbook, options);
  }
  throw new Error('Streaming is only supported in browser or NodeJS environments.');
}

/**
 * Browser: returns a ReadableStream of zipped Excel file chunks.
 */
function browserExcelStream(workbook: Workbook, options?: ExcelFileStreamOptions) {
  const chunkSize = options?.chunkSize ?? 1000;
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const files = await workbook.generateFiles();
      for (let i = 0; i < workbook.worksheets.length; i++) {
        const worksheet = workbook.worksheets[i];
        let worksheetXml = '';
        worksheetXml += worksheet.getWorksheetXmlHeader();
        let rowIndex = 0;
        const totalRows = worksheet.data.length;
        while (rowIndex < totalRows) {
          const rowsChunk = worksheet.data.slice(rowIndex, rowIndex + chunkSize);
          worksheetXml += worksheet.serializeRows(rowsChunk, rowIndex);
          rowIndex += chunkSize;
          await new Promise(r => setTimeout(r, 0));
        }
        worksheetXml += '</sheetData>';
        worksheetXml += worksheet.getWorksheetXmlFooter();
        worksheetXml += '</worksheet>';
        // Ensure footer does NOT include </worksheet> tag, only append it once here
        // If getWorksheetXmlFooter() includes </worksheet>, remove it from that method
        const wsPath = `/xl/worksheets/sheet${i + 1}.xml`;
        files[wsPath] = worksheetXml;
      }
      // Convert files to Uint8Array
      const zipObj: { [name: string]: Uint8Array } = {};
      for (const [path, content] of Object.entries(files)) {
        const outPath = path.startsWith('/') ? path.substr(1) : path;
        if (path.indexOf('.xml') !== -1 || path.indexOf('.rel') !== -1) {
          zipObj[outPath] = strToU8(String(content));
        } else {
          zipObj[outPath] = base64ToUint8Array(String(content));
        }
      }
      // Synchronous zip for browser, split into chunks
      const zipped: Uint8Array = zipSync(zipObj);
      const chunkByteSize = 64 * 1024; // 64KB per chunk
      let offset = 0;
      while (offset < zipped.length) {
        const chunk = zipped.subarray(offset, offset + chunkByteSize);
        controller.enqueue(chunk);
        offset += chunkByteSize;
        await new Promise(r => setTimeout(r, 0));
      }
      controller.close();
    },
  });
  return stream;
}

/**
 * NodeJS: returns an async generator yielding zipped Excel file chunks.
 */
async function* nodeExcelStream(workbook: Workbook, options?: ExcelFileStreamOptions) {
  const chunkSize = options?.chunkSize ?? 1000;
  const files = await workbook.generateFiles();
  for (let i = 0; i < workbook.worksheets.length; i++) {
    const worksheet = workbook.worksheets[i];
    let worksheetXml = '';
    worksheetXml += worksheet.getWorksheetXmlHeader();
    let rowIndex = 0;
    const totalRows = worksheet.data.length;
    while (rowIndex < totalRows) {
      const rowsChunk = worksheet.data.slice(rowIndex, rowIndex + chunkSize);
      worksheetXml += worksheet.serializeRows(rowsChunk, rowIndex);
      rowIndex += chunkSize;
      await new Promise(r => setTimeout(r, 0));
    }
    worksheetXml += '</sheetData>';
    worksheetXml += worksheet.getWorksheetXmlFooter();
    worksheetXml += '</worksheet>';
    // Ensure footer does NOT include </worksheet> tag, only append it once here
    // If getWorksheetXmlFooter() includes </worksheet>, remove it from that method
    const wsPath = `/xl/worksheets/sheet${i + 1}.xml`;
    files[wsPath] = worksheetXml;
  }
  // Convert files to Uint8Array
  const zipObj: { [name: string]: Uint8Array } = {};
  for (const [path, content] of Object.entries(files)) {
    const outPath = path.startsWith('/') ? path.substr(1) : path;
    if (path.indexOf('.xml') !== -1 || path.indexOf('.rel') !== -1) {
      zipObj[outPath] = strToU8(String(content));
    } else {
      zipObj[outPath] = base64ToUint8Array(String(content));
    }
  }
  // Synchronous zip for Node, split into chunks
  const zipped: Uint8Array = zipSync(zipObj);
  const chunkByteSize = 64 * 1024; // 64KB per chunk
  let offset = 0;
  while (offset < zipped.length) {
    const chunk = zipped.subarray(offset, offset + chunkByteSize);
    yield chunk;
    offset += chunkByteSize;
    await new Promise(r => setTimeout(r, 0));
  }
}
