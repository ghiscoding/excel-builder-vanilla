import { strToU8, type ZipOptions, zipSync } from 'fflate';
import type { Workbook } from './Excel/Workbook.js';
import { base64ToUint8Array } from './factory.js';

export interface ExcelFileStreamOptions {
  chunkSize?: number;
  outputType?: 'Blob' | 'Uint8Array' | 'stream';
  fileFormat?: 'xlsx' | 'xls';
  mimeType?: string;
  zipOptions?: ZipOptions;
  downloadType?: 'browser' | 'node';
}

/**
 * Environment-aware streaming Excel file generator.
 * Yields zipped chunks for browser (ReadableStream) or NodeJS (async generator).
 */
export function createExcelFileStream(workbook: Workbook, options?: ExcelFileStreamOptions) {
  const isBrowser = typeof window?.ReadableStream !== 'undefined';
  const isNode = typeof process?.versions?.node !== 'undefined';
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
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Use workbook.generateFiles() to get all required files
      const files = await workbook.generateFiles();
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
      const zipped: Uint8Array = zipSync(zipObj, options?.zipOptions || {});
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
export async function* nodeExcelStream(workbook: Workbook, options?: ExcelFileStreamOptions) {
  const files = await workbook.generateFiles();
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
  const zipped: Uint8Array = zipSync(zipObj, options?.zipOptions || {});
  const chunkByteSize = 64 * 1024; // 64KB per chunk
  let offset = 0;
  while (offset < zipped.length) {
    const chunk = zipped.subarray(offset, offset + chunkByteSize);
    yield chunk;
    offset += chunkByteSize;
    await new Promise(r => setTimeout(r, 0));
  }
}
