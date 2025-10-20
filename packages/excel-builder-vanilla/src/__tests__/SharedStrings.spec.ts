import { describe, expect, test } from 'vitest';

import { SharedStrings } from '../Excel/SharedStrings.js';

describe('SharedStrings', () => {
  test('toXML with whitespace string', () => {
    const ss = new SharedStrings();
    ss.stringArray = ['with space'];
    expect(() => ss.toXML()).not.toThrow();
  });
});
