import { describe, expect, it } from 'vitest';

import { Util } from '../Util';

describe('utility functions', () => {
  describe('positionToLetterRef', () => {
    it('will give back the appropriate excel cell coordinate on an x/y position', () => {
      expect(Util.positionToLetterRef(1, 1)).toEqual('A1');
      expect(Util.positionToLetterRef(5, 50)).toEqual('E50');
      expect(Util.positionToLetterRef(50, 50)).toEqual('AX50');
    });
  });
});
