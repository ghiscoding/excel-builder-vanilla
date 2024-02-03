// @ts-ignore
import JSZip from 'jszip/dist/jszip.min.js';

import { Table } from './Excel/Table';
import { Worksheet } from './Excel/Worksheet';
import { Workbook } from './Excel/Workbook';
// import { WorkbookWorker } from './Worker';

// TODO: probably better to export index.ts instead
export { Table, Workbook, Worksheet };

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
   * @param {Excel/Workbook} workbook The workbook that is being converted
   * @param {Object} options - options to modify how the zip is created. See http://stuk.github.io/jszip/#doc_generate_options
   * @returns {Promise}
   */
  createFile(workbook: Workbook, options?: any) {
    const zip = new JSZip();
    return workbook.generateFiles().then(files => {
      for (const [path, content] of Object.entries(files)) {
        const finalPath = path.substr(1);
        if (finalPath.indexOf('.xml') !== -1 || finalPath.indexOf('.rel') !== -1) {
          zip.file(finalPath, content, { base64: false });
        } else {
          zip.file(finalPath, content, { base64: true, binary: true });
        }
      }
      return zip.generateAsync(Object.assign({}, { type: 'base64' }, options));
    });
  }
}
