import { ZipOptions, strToU8, zip } from 'fflate';

import { Workbook } from './Excel/Workbook';

type InferOutputByType<T extends 'Blob' | 'Uint8Array'> = T extends 'Blob' ? Blob : T extends 'Uint8Array' ? Uint8Array : any;

/**
 * Creates a new workbook.
 */
export function createWorkbook() {
  return new Workbook();
}

/**
 * Turns a workbook into a downloadable file.
 * @param {Excel/Workbook} workbook - The workbook that is being converted
 * @param {'Uint8Array' | 'Blob'} outputType - defaults to 'Blob'
 * @param {Object} options - fflate options to modify how the zip is created.
 * @returns {Promise}
 */
export function createExcelFile<T extends 'Blob' | 'Uint8Array' = 'Blob'>(
  workbook: Workbook,
  outputType?: T,
  options?: ZipOptions,
): Promise<InferOutputByType<T>> {
  const zipObj: { [name: string]: Uint8Array } = {};

  return new Promise((resolve, reject) => {
    workbook.generateFiles().then(files => {
      for (const [path, content] of Object.entries(files)) {
        zipObj[path.substr(1)] = strToU8(content);
      }

      switch (outputType) {
        case 'Uint8Array':
          return zip(zipObj, options || {}, (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(data as InferOutputByType<T>);
          });
        // biome-ignore lint: prefering to be explicit
        case 'Blob':
        default:
          return zip(zipObj, options || {}, (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(new Blob([data], { type: 'base64' }) as InferOutputByType<T>);
          });
      }
    });
  });
}

/**
 * Download Excel file, currently only supports a "browser" as `downloadType`
 * but it could be expended in the future to also other type of platform like NodeJS for example.
 * @param options
 */
export function downloadExcelFile(workbook: Workbook, filename: string, downloadType: 'browser' | 'node' = 'browser') {
  // start downloading but add the Blob property only on the download start instead of the event itself
  // Note: we call the Promise with `.then()` for perf reason since `fflate.zip` can use Web Worker but `fflate.zipAsync` cannot
  return createExcelFile(workbook).then(excelBlob => {
    downloadFile(filename, excelBlob, downloadType);
  });
}

/**
 * Download Excel file, currently only supports a "browser" as `downloadType`,
 * but it could probably be expended to support other platform in the future like NodeJS for example.
 * @param options
 */
function downloadFile(filename: string, data: Blob, downloadType: 'browser' | 'node' = 'browser') {
  if (downloadType === 'browser') {
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
  } else {
    throw new Error('[Excel-Builder-Vanilla] the `downloadExcelFile()` is only supporting the "browser" download type at the moment.');
  }
}
