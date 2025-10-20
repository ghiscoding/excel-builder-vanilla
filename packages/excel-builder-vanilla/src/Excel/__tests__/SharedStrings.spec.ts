import { describe, expect, test } from 'vitest';

import { SharedStrings } from '../SharedStrings.js';

describe('SharedStrings', () => {
  test('toXML with whitespace string', () => {
    const ss = new SharedStrings();
    ss.stringArray = ['with space'];
    expect(() => ss.toXML()).not.toThrow();
  });

  test('exportData returns strings object', () => {
    const ss = new SharedStrings();
    ss.addString('foo');
    expect(ss.exportData()).toEqual({ foo: 0 });
  });
});
