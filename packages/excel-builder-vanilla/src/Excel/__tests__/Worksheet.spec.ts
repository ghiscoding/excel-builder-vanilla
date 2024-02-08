import { describe, expect, it } from 'vitest';
import { Worksheet } from '../Worksheet';
import { XMLDOM, XMLNode } from '../XMLDOM';

describe('Excel/Worksheet', () => {
  describe('compilePageDetailPiece', () => {
    it('will give back the appropriate string for an instruction object', () => {
      const io = { text: 'Hello there' };
      const text = Worksheet.prototype.compilePageDetailPiece(io);
      const expected = '&"-,Regular"Hello there';
      expect(text).toEqual(expected);
    });

    it('will give back a string with underline instructions when an instruction object has underline set', () => {
      const io = { text: 'Hello there', underline: true };
      const text = Worksheet.prototype.compilePageDetailPiece(io);
      const expected = '&"-,Regular"&UHello there';
      expect(text).toEqual(expected);
    });

    it('will give back a string with bold instructions when an instruction object has bold set', () => {
      const io = { text: 'Hello there', bold: true };
      const text = Worksheet.prototype.compilePageDetailPiece(io);
      const expected = '&"-,Bold"Hello there';
      expect(text).toEqual(expected);
    });

    it('will give back a string with font instructions when an instruction object has a font set', () => {
      const io = { text: 'Hello there', font: 'Arial' };
      const text = Worksheet.prototype.compilePageDetailPiece(io);
      const expected = '&"Arial,Regular"Hello there';
      expect(text).toEqual(expected);
    });

    it('will build each piece of an array of instructions and return the end result', () => {
      const io = [{ text: 'Hello there', font: 'Arial' }, ' - on ', { text: '5/7/9', underline: true }];
      const text = Worksheet.prototype.compilePageDetailPiece(io);
      const expected = '&"Arial,Regular"Hello there&"-,Regular" - on &"-,Regular"&U5/7/9';
      expect(text).toEqual(expected);
    });
  });

  describe('setPageMargin() method', () => {
    it('should call exportPageSettings() and expect updated margins', () => {
      const ws = new Worksheet({ name: 'worksheet1' });

      ws.setPageMargin({ bottom: 120, footer: 21, header: 22, left: 0, right: 33, top: 8 });

      const xmlDom = new XMLDOM('something', 'root');
      const xmlNode = new XMLNode({ nodeName: 'some name' });
      ws.exportPageSettings(xmlDom, xmlNode);
      expect(ws._margin).toEqual({ bottom: 120, footer: 21, header: 22, left: 0, right: 33, top: 8 });
    });
  });

  describe('Orientation', () => {
    it('should call setPageOrientation() and expect updated margins', () => {
      const ws = new Worksheet({ name: 'worksheet1' });

      ws.setPageOrientation('landscape');

      expect(ws._orientation).toBe('landscape');
    });
  });
});
