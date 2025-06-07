import { strFromU8 } from 'fflate';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createExcelFile, createWorkbook, downloadExcelFile } from '../factory.js';

describe('ExcelExportService', () => {
  describe('with Translater Service', () => {
    beforeEach(() => {
      (navigator as any).__defineGetter__('appName', () => 'Netscape');
    });

    describe('createExcelFile() method', () => {
      it('should return a Blob instance with .xlsx default mime type when calling the method without any type', async () => {
        const workbook = createWorkbook();
        const file = await createExcelFile(workbook);

        expect(file).toBeTruthy();
        expect(file.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        expect(file instanceof Blob).toBeTruthy();
      });

      it('should return a Blob instance with .xls default mime type when calling the method without any type', async () => {
        const workbook = createWorkbook();
        const file = await createExcelFile(workbook, 'Blob', { fileFormat: 'xls' });

        expect(file).toBeTruthy();
        expect(file.type).toBe('application/vnd.ms-excel');
        expect(file instanceof Blob).toBeTruthy();
      });

      it('should return a Blob instance without any mime type when the option mime type is an empty string', async () => {
        const workbook = createWorkbook();
        const file = await createExcelFile(workbook, 'Blob', { fileFormat: 'xls', mimeType: '' });

        expect(file).toBeTruthy();
        expect(file.type).toBe('');
        expect(file instanceof Blob).toBeTruthy();
      });

      it('should return a Uint8Array instance when calling the method without any type', async () => {
        const workbook = createWorkbook();
        const file = await createExcelFile(workbook, 'Uint8Array');
        const output = strFromU8(file);

        expect(file).toBeTruthy();
        expect(file instanceof Uint8Array).toBeTruthy();
        expect(output).includes('workbook.xml');
      });

      it('should return an image as an Uint8Array instance when calling the method that includes an image', async () => {
        const blueSquareBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

        const workbook = createWorkbook();
        vi.spyOn(workbook, 'generateFiles').mockResolvedValueOnce({
          '/xl/drawings/drawing1.xml':
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<xdr:wsDr xmlns="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing"><xdr:twoCellAnchor><xdr:from><xdr:col>5</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>2</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:from><xdr:to><xdr:col>7</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>8</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:to><xdr:pic><xdr:nvPicPr><xdr:cNvPr descr="" name="logo.png" id="2"/><xdr:cNvPicPr><a:picLocks noChangeArrowheads="1" noChangeAspect="1"/></xdr:cNvPicPr></xdr:nvPicPr><xdr:blipFill><a:blip r:embed="rId10" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/><a:srcRect/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr bwMode="auto"><a:xfrm/><a:prstGeom prst="rect"/></xdr:spPr></xdr:pic><xdr:clientData/></xdr:twoCellAnchor></xdr:wsDr>',
          '/xl/media/logo.png': blueSquareBase64,
        });
        const fileUint = await createExcelFile(workbook, 'Uint8Array');
        // const output = base64ToUint8Array(blueSquareBase64);

        expect(fileUint).toBeTruthy();
        expect(fileUint instanceof Uint8Array).toBeTruthy();
        expect(fileUint.length).toBeGreaterThan(500);
      });
    });

    describe('downloadExcelFile() method', () => {
      it('should be able to download Excel file via browser', async () => {
        const createUrlSpy = vi.spyOn(URL, 'createObjectURL');
        const revokeUrlSpy = vi.spyOn(URL, 'revokeObjectURL');
        const anchorSpy = vi.spyOn(document, 'createElement');

        const workbook = createWorkbook();
        await downloadExcelFile(workbook, 'export.xlsx');

        expect(anchorSpy).toHaveBeenCalled();
        expect(createUrlSpy).toHaveBeenCalled();
        expect(revokeUrlSpy).toHaveBeenCalled();
      });

      it('throws when trying different downloadType other than browser', async () => {
        const workbook = createWorkbook();
        expect(() => downloadExcelFile(workbook, 'export.xlsx', { downloadType: 'node' })).toThrow();
      });
    });
  });
});
