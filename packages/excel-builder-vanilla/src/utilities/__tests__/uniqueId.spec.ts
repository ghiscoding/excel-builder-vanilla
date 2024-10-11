import { describe, expect, it } from 'vitest';

import { uniqueId } from '../uniqueId.js';

describe('uniqueId() method', () => {
  it('should return number starting at 1 when no prefix provided', () => {
    expect(uniqueId()).toBe('1');
    expect(uniqueId()).toBe('2');
    expect(uniqueId('Pre')).toBe('Pre1');
    expect(uniqueId()).toBe('3');
  });

  it('should return prefix + number when different prefix are provided', () => {
    expect(uniqueId('Workbook')).toBe('Workbook1');
    expect(uniqueId('Workbook')).toBe('Workbook2');
    expect(uniqueId('Worksheet')).toBe('Worksheet1');
    expect(uniqueId('Workbook')).toBe('Workbook3');
    expect(uniqueId('Worksheet')).toBe('Worksheet2');
  });
});
