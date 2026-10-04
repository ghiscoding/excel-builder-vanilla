import { strToU8, Zip, ZipDeflate, ZipPassThrough } from 'fflate';

import { Workbook } from './Excel/Workbook.js';
import type { ZipOptions } from './interfaces.js';
import { toZipData, zipPath } from './utilities/zip.js';

export interface ExcelFileStreamOptions {
  /** Maximum output chunk size in bytes (default 64 KiB). */
  chunkSize?: number;
  outputType?: 'Blob' | 'Uint8Array' | 'stream';
  fileFormat?: 'xlsx' | 'xls';
  mimeType?: string;
  zipOptions?: ZipOptions;
  downloadType?: 'browser' | 'node';
}

function chunkSize(options?: ExcelFileStreamOptions) {
  const size = options?.chunkSize ?? 65536;
  if (!Number.isSafeInteger(size) || size <= 0) {
    throw new RangeError('chunkSize must be a positive safe integer.');
  }
  return size;
}

/** Incremental XLSX output. Input rows and shared strings remain owned by the workbook. */
export function createExcelFileStream(workbook: Workbook, options?: ExcelFileStreamOptions) {
  chunkSize(options);
  if (typeof window !== 'undefined' && typeof window.ReadableStream !== 'undefined') {
    const iterator = nodeExcelStream(workbook, options);
    let cancelled = false;
    return new ReadableStream<Uint8Array>(
      {
        async pull(controller) {
          try {
            const { value, done } = await iterator.next();
            if (!cancelled) {
              if (done) {
                controller.close();
              } else {
                controller.enqueue(value);
              }
            }
          } catch (error) {
            if (!cancelled) {
              controller.error(error);
            }
          }
        },
        async cancel() {
          cancelled = true;
          await iterator.return(undefined);
        },
      },
      { highWaterMark: 0 },
    );
  }
  if (typeof process !== 'undefined' && process.versions?.node) {
    return nodeExcelStream(workbook, options);
  }
  throw new Error('Streaming is only supported in browser or NodeJS environments.');
}

async function* entries(workbook: Workbook) {
  if (
    typeof workbook.generateFileEntries === 'function' &&
    (workbook.generateFileEntries !== Workbook.prototype.generateFileEntries || workbook.generateFiles === Workbook.prototype.generateFiles)
  ) {
    yield* workbook.generateFileEntries();
  } else {
    // Preserve support for custom exporters implementing the original generateFiles contract.
    yield* Object.entries(await workbook.generateFiles());
  }
}

function* outputChunks(queue: Uint8Array[], size: number) {
  while (queue.length) {
    const data = queue.shift()!;
    for (let start = 0; start < data.length; start += size) {
      yield data.slice(start, start + size);
    }
  }
}

/** ZIP entries are compressed serially so a slow consumer cannot queue the rest of the workbook. */
export async function* nodeExcelStream(workbook: Workbook, options?: ExcelFileStreamOptions) {
  const size = chunkSize(options);
  const queue: Uint8Array[] = [];
  let failure: Error | undefined;
  const zip = new Zip((error, data) => {
    if (error) {
      failure = error;
    } else if (data.length) {
      queue.push(data);
    }
  });
  let deadline = Date.now() + 8;
  try {
    for await (const [path, content] of entries(workbook)) {
      const entry =
        options?.zipOptions?.level === 0 ? new ZipPassThrough(zipPath(path)) : new ZipDeflate(zipPath(path), options?.zipOptions);
      const { mtime, os, attrs, extra, comment } = options?.zipOptions || {};
      Object.assign(entry, { mtime, os, attrs, extra, comment });
      zip.add(entry);
      const source = typeof content === 'string' ? [toZipData(path, content)] : content;
      for (const piece of source) {
        const bytes = typeof piece === 'string' ? strToU8(piece) : piece;
        // Also bound compression work for large binary entries and custom string exporters.
        for (let offset = 0; offset < bytes.length; offset += 32768) {
          entry.push(bytes.subarray(offset, offset + 32768), false);
          if (failure) {
            throw failure;
          }
          yield* outputChunks(queue, size);
          if (Date.now() >= deadline) {
            await new Promise(resolve => setTimeout(resolve, 0));
            deadline = Date.now() + 8;
          }
        }
      }
      entry.push(new Uint8Array(0), true);
      if (failure) {
        throw failure;
      }
      yield* outputChunks(queue, size);
    }
    zip.end();
    if (failure) {
      throw failure;
    }
    yield* outputChunks(queue, size);
  } finally {
    zip.terminate();
    queue.length = 0;
  }
}
