import { strFromU8 } from 'fflate';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createExcelFile, createWorkbook, downloadExcelFile } from '../factory';

describe('ExcelExportService', () => {
  let mockExcelBlob: Blob;
  let uint: Uint8Array;

  describe('with Translater Service', () => {
    beforeEach(() => {
      (navigator as any).__defineGetter__('appName', () => 'Netscape');
      mockExcelBlob = new Blob(['', ''], { type: 'text/xlsx;charset=utf-8;' });
      uint = new Uint8Array([21, 31]);
    });

    describe('createExcelFile() method', () => {
      it('should return a Blob instance when calling the method without any type', async () => {
        const workbook = createWorkbook();
        const file = await createExcelFile(workbook);

        expect(file).toBeTruthy();
        expect(file instanceof Blob).toBeTruthy();
      });

      it('should return a Uint8Array instance when calling the method without any type', async () => {
        const workbook = createWorkbook();
        const file = await createExcelFile(workbook, 'Uint8Array');
        const output = strFromU8(file);
        // const str = Buffer.from(file.buffer, 'base64').toString();

        expect(file).toBeTruthy();
        expect(file instanceof Uint8Array).toBeTruthy();
        expect(output).includes('workbook.xml');
      });
    });

    describe('downloadExcelFile() method', () => {
      it('should be able to download Excel file via browser', async () => {
        const createUrlSpy = vi.spyOn(URL, 'createObjectURL');
        const revokeUrlSpy = vi.spyOn(URL, 'createObjectURL');
        const anchorSpy = vi.spyOn(document, 'createElement');

        const workbook = createWorkbook();
        await downloadExcelFile(workbook, 'export.xlsx');

        expect(anchorSpy).toHaveBeenCalled();
        expect(createUrlSpy).toHaveBeenCalled();
        expect(revokeUrlSpy).toHaveBeenCalled();
      });

      it('throws when trying different downloadType other than browser', async () => {
        const workbook = createWorkbook();
        const promise = downloadExcelFile(workbook, 'export.xlsx', 'node');

        await expect(promise).rejects.toThrow();
      });
    });
  });
});
