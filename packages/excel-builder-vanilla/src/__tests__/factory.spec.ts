import { strFromU8, zip } from 'fflate';
import { beforeEach, describe, expect, it, test, vi } from 'vitest';

import { createExcelFile, createWorkbook } from '../factory';

// vi.mock('fflate');

describe('ExcelExportService', () => {
  let mockExcelBlob: Blob;
  let uint: Uint8Array;

  describe('with Translater Service', () => {
    beforeEach(() => {
      // (navigator as any).__defineGetter__('appName', () => 'Netscape');
      // (navigator as any).msSaveOrOpenBlob = undefined as any;
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
  });
});
