import { describe, expect, it } from 'vitest';

import { zipPath } from '../zip.js';

describe('zipPath', () => {
  it('removes a leading package slash from a valid path', () => {
    expect(zipPath('/xl/workbook.xml')).toBe('xl/workbook.xml');
    expect(zipPath('xl/media/é image.png')).toBe('xl/media/é image.png');
  });

  it.each([
    '',
    '/',
    '//absolute.txt',
    './workbook.xml',
    '../outside.txt',
    '/xl/media/../../../outside.png',
    '/xl/media/../../outside.png',
    'xl\\media\\outside.png',
    'C:/outside.txt',
    'xl//workbook.xml',
    'xl/media/\u0000outside.png',
  ])('rejects unsafe ZIP entry path %j', path => {
    expect(() => zipPath(path)).toThrow('Invalid ZIP entry path');
  });
});
