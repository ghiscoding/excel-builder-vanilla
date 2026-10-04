import { zip } from 'fflate';

import { Workbook } from './Excel/Workbook.js';
import type { ZipOptions } from './interfaces.js';
import { toZipData, zipPath } from './utilities/zip.js';

export { base64ToUint8Array } from './utilities/base64.js';

type InferOutputByType<T extends 'Blob' | 'Uint8Array'> = T extends 'Blob' ? Blob : T extends 'Uint8Array' ? Uint8Array : any;

/**
 * Creates a new workbook.
 */
export function createWorkbook() {
  return new Workbook();
}

/**
 * Turns a Workbook into a downloadable file, you can switch output type a `Blob` or `Uint8Array`,
 * and if nothing is provided then `Blob` is the default output type.
 * @param {Excel/Workbook} workbook - The workbook that is being converted
 * @param {'Uint8Array' | 'Blob'} [outputType='Blob'] - defaults to 'Blob'
 * @param {Object} [options]
 *   - `fileFormat` defaults to "xlsx"
 *   - `mimeType`: a mime type can be provided by the user or auto-detect the mime when undefined (by file extension `.xls`/`.xlsx`)
 *      (user can pass an empty string to completely cancel the mime type altogether)
 *   - `zipOptions` to specify any `fflate` options to modify how the zip will be created.
 * @returns {Promise}
 */
export async function createExcelFile<T extends 'Blob' | 'Uint8Array' = 'Blob'>(
  workbook: Workbook,
  outputType?: T,
  options?: { fileFormat?: 'xls' | 'xlsx'; mimeType?: string; zipOptions?: ZipOptions },
): Promise<InferOutputByType<T>> {
  // Custom exporters may reuse their returned map. Release only our own references.
  const files = { ...(await workbook.generateFiles()) };
  const zipObj: Record<string, Uint8Array> = Object.create(null);
  for (const path of Object.keys(files)) {
    zipObj[zipPath(path)] = toZipData(path, files[path]);
    delete files[path];
  }
  const data = await new Promise<Uint8Array>((resolve, reject) => {
    zip(zipObj, options?.zipOptions || {}, (err, zipped) => (err ? reject(err) : resolve(zipped)));
  });
  if (outputType === 'Uint8Array') {
    return data as InferOutputByType<T>;
  }
  const mimeType =
    options?.mimeType ??
    (options?.fileFormat === 'xls' ? 'application/vnd.ms-excel' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  return new Blob([data as BlobPart], { type: mimeType }) as InferOutputByType<T>;
}

/**
 * Download Excel file, currently only supports a "browser" as `downloadType`
 * but it could be expended in the future to also support other type of platforms like NodeJS for example.
 * @param {Workbook} workbook
 * @param {String} filename - filename (must also include file extension: `.xls` or `.xlsx`)
 * @param {Object} [options]
 *   - `downloadType`: download type ('browser' / 'node'), currently only supports "browser" download as a Blob
 *   - `mimeType`: a mime type can be provided by the user or auto-detect the mime when undefined (by file extension .xls/.xlsx)
 *      (user can pass an empty string to completely cancel the mime type altogether)
 *   - `zipOptions` to specify any `fflate` options to modify how the zip is created.
 */
export function downloadExcelFile(
  workbook: Workbook,
  filename: string,
  options?: { downloadType?: 'browser' | 'node'; mimeType?: string; zipOptions?: ZipOptions },
) {
  if (options?.downloadType === 'node') {
    throw new Error(
      '[Excel-Builder-Vanilla] Please note that `downloadExcelFile()` is currently only supporting the "browser" download type at the moment.',
    );
  }

  // start downloading but add the Blob property only on the download start instead of the event itself
  // Note: we call the Promise with `.then()` for perf reason since `fflate.zip` can use Web Worker but `fflate.zipAsync` cannot
  const fileFormat = filename.match(/.*\.xls$/) ? 'xls' : 'xlsx';
  return createExcelFile(workbook, 'Blob', { ...options, fileFormat }).then(excelBlob => {
    downloadFileToBrowser(filename, excelBlob);
  });
}

/**
 * Download Excel file, currently only supports a "browser" as `downloadType`,
 * but it could be expended in the future to also support other type of platforms like NodeJS for example.
 * @param {String} filename - filename (must also include file extension: `.xls` or `.xlsx`)
 * @param {Blob} data - compressed data object
 */
function downloadFileToBrowser(filename: string, data: Blob) {
  // this trick will generate a temp <a /> tag
  // the code will then trigger a hidden click for it to start downloading
  const link = document.createElement('a');
  const url = URL.createObjectURL(data);

  if (link && document) {
    link.textContent = 'download';
    link.href = url;
    link.setAttribute('download', filename);

    // set the visibility to hidden so there is no effect on your web-layout
    link.style.visibility = 'hidden';

    // this part will append the anchor tag, trigger a click (for download to start) and finally remove the tag once completed
    document.body.appendChild(link);
    link.click();

    // we're done, let's delete the temp DOM element & revoke the URL object
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
