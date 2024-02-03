import { describe, expect, it } from 'vitest';
import { Worksheet } from '../Worksheet';

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
});
