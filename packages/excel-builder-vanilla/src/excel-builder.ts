import { ZipOptions, strToU8, zipSync } from 'fflate';

import { Workbook } from './Excel/Workbook';
// import { WorkbookWorker } from './Worker';

type InferOutputByType<T extends 'Blob' | 'Uint8Array'> = T extends 'Blob' ? Blob : T extends 'Uint8Array' ? Uint8Array : any;

/**
 * @name Excel
 * @public
 * @author Stephen Liberty
 * @requires Excel/Workbook
 * @requires JSZIP
 * @exports excel-builder
 */
export class ExcelBuilder {
  config = {
    forceUIThread: false,
  };

  /**
   * Creates a new workbook.
   */
  createWorkbook() {
    return new Workbook();
  }

  /**
   * Turns a workbook into a downloadable file.
   * @param {Excel/Workbook} workbook - The workbook that is being converted
   * @param {'Uint8Array' | 'Blob'} outputType - defaults to 'Blob'
   * @param {Object} options - fflate options to modify how the zip is created.
   * @returns {Promise}
   */
  createFile<T extends 'Blob' | 'Uint8Array' = 'Blob'>(workbook: Workbook, outputType?: T, options?: ZipOptions) {
    const zipObj: { [name: string]: Uint8Array } = {};

    return workbook.generateFiles().then(files => {
      for (const [path, content] of Object.entries(files)) {
        zipObj[path.substr(1)] = strToU8(content);
      }

      switch (outputType) {
        case 'Uint8Array':
          return zipSync(zipObj, options) as InferOutputByType<T>;
        // biome-ignore lint: prefering to be explicit
        case 'Blob':
        default:
          return new Blob([zipSync(zipObj, options)], { type: 'base64' }) as InferOutputByType<T>;
      }
    });
  }
}
