import { describe, expect, it, test } from 'vitest';

import { Util } from '../Util.js';

describe('utility functions', () => {
  describe('positionToLetterRef', () => {
    it('will give back the appropriate excel cell coordinate on an x/y position', () => {
      expect(Util.positionToLetterRef(1, 1)).toEqual('A1');
      expect(Util.positionToLetterRef(5, 50)).toEqual('E50');
      expect(Util.positionToLetterRef(50, 50)).toEqual('AX50');
    });

    test('positionToLetterRef with x > 26', () => {
      expect(Util.positionToLetterRef(27, 1)).toBe('AA1');
    });
  });
});
