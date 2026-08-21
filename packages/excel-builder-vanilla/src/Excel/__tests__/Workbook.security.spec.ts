import { afterEach, describe, expect, it } from 'vitest';

import { Workbook } from '../Workbook.js';

describe('Workbook prototype pollution protection', () => {
  afterEach(() => {
    delete (Object.prototype as any).top;
    delete (Object.prototype as any).left;
    delete (Object as any).top;
    delete (Object.prototype.toString as any).left;
  });

  it('does not pollute Object.prototype through a __proto__ sheet name', () => {
    const workbook = new Workbook();

    workbook.setPrintTitleTop('__proto__', 5);
    workbook.setPrintTitleLeft('__proto__', 2);

    expect((Object.prototype as any).top).toBeUndefined();
    expect((Object.prototype as any).left).toBeUndefined();
    expect(Object.getPrototypeOf(workbook.printTitles!)).toBeNull();
    expect(Object.getOwnPropertyDescriptor(workbook.printTitles!, '__proto__')?.value).toEqual({ top: 5, left: 'B' });
  });

  it('does not modify inherited constructor or toString objects', () => {
    const workbook = new Workbook();

    workbook.setPrintTitleTop('constructor', 3);
    workbook.setPrintTitleLeft('toString', 2);

    expect((Object as any).top).toBeUndefined();
    expect((Object.prototype.toString as any).left).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(workbook.printTitles!, 'constructor')?.value).toEqual({ top: 3 });
    expect(Object.getOwnPropertyDescriptor(workbook.printTitles!, 'toString')?.value).toEqual({ left: 'B' });
  });
});
