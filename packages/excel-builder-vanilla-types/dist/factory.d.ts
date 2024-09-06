import { ZipOptions } from 'fflate';
import { Workbook } from './Excel/Workbook';
type InferOutputByType<T extends 'Blob' | 'Uint8Array'> = T extends 'Blob' ? Blob : T extends 'Uint8Array' ? Uint8Array : any;
/**
 * Creates a new workbook.
 */
export declare function createWorkbook(): Workbook;
/**
 * Turns a workbook into a downloadable file, you can between a 'Blob' or 'Uint8Array',
 * and if nothing is provided then 'Blob' will be the default
 * @param {Excel/Workbook} workbook - The workbook that is being converted
 * @param {'Uint8Array' | 'Blob'} [outputType='Blob'] - defaults to 'Blob'
 * @param {Object} [options]
 *   - `fileFormat` defaults to "xlsx"
 *   - `mimeType`: a mime type can be provided by the user or auto-detect the mime when undefined (by file extension .xls/.xlsx)
 *      (user can pass an empty string to completely cancel the mime type altogether)
 *   - `zipOptions` to specify any `fflate` options to modify how the zip is created.
 * @returns {Promise}
 */
export declare function createExcelFile<T extends 'Blob' | 'Uint8Array' = 'Blob'>(workbook: Workbook, outputType?: T, options?: {
    fileFormat?: 'xls' | 'xlsx';
    mimeType?: string;
    zipOptions?: ZipOptions;
}): Promise<InferOutputByType<T>>;
/**
 * Download Excel file, currently only supports a "browser" as `downloadType`
 * but it could be expended in the future to also other type of platform like NodeJS for example.
 * @param {Workbook} workbook
 * @param {String} filename - filename (must also include file extension, xls/xlsx)
 * @param {Object} [options]
 *   - `downloadType`: download type (browser/node), currently only a "browser" download as a Blob
 *   - `mimeType`: a mime type can be provided by the user or auto-detect the mime when undefined (by file extension .xls/.xlsx)
 *      (user can pass an empty string to completely cancel the mime type altogether)
 *   - `zipOptions` to specify any `fflate` options to modify how the zip is created.
 */
export declare function downloadExcelFile(workbook: Workbook, filename: string, options?: {
    downloadType?: 'browser' | 'node';
    mimeType?: string;
    zipOptions?: ZipOptions;
}): Promise<void>;
export {};
//# sourceMappingURL=factory.d.ts.map