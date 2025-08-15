import { strToU8, zip } from 'fflate';

import type { Workbook } from './Excel/Workbook.js';
import { base64ToUint8Array } from './factory.js';

export interface ExcelFileStreamOptions {
  chunkSize?: number;
  outputType?: 'Uint8Array' | 'Blob';
  fileFormat?: 'xlsx' | 'xls';
  mimeType?: string;
}

/**
 * Async generator that yields zipped Excel file chunks.
 * @param workbook Workbook instance
 * @param options {chunkSize} Number of rows per chunk
 */
export async function* createExcelFileStream(workbook: Workbook, options?: ExcelFileStreamOptions) {
  const chunkSize = options?.chunkSize ?? 1000;
  const files = await workbook.generateFiles();

  // Replace worksheet XML with streamed version
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

    // Use the same path as generateFiles
    const wsPath = `/xl/worksheets/sheet${i + 1}.xml`;
    files[wsPath] = worksheetXml;
  }

  // Convert files to Uint8Array
  const zipObj: { [name: string]: Uint8Array } = {};
  for (const [path, content] of Object.entries(files)) {
    const outPath = path.startsWith('/') ? path.substr(1) : path;
    if (path.indexOf('.xml') !== -1 || path.indexOf('.rel') !== -1) {
      zipObj[outPath] = strToU8(content);
    } else {
      zipObj[outPath] = base64ToUint8Array(content);
    }
  }

  // Zip and yield
  const zipped: Uint8Array = await new Promise((resolve, reject) => {
    zip(zipObj, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

  const outputType = options?.outputType ?? 'Uint8Array';
  if (outputType === 'Uint8Array') {
    yield zipped;
  } else {
    const format = options?.fileFormat ?? 'xlsx';
    let mimeType = options?.mimeType;
    if (mimeType === undefined) {
      mimeType = format === 'xls' ? 'application/vnd.ms-excel' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }
    const arrayBuffer = zipped.buffer.slice(zipped.byteOffset, zipped.byteOffset + zipped.byteLength);
    yield new Blob([arrayBuffer as BlobPart], { type: mimeType });
  }
}
