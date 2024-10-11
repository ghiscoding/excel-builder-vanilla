import { describe, expect, it } from 'vitest';

import { isObject, isPlainObject, isString } from '../isTypeOf.js';

describe('isObject() method', () => {
  it('should return truthy when input is a valid object', () => {
    const output = isObject({ name: 'John', age: 40 });
    expect(output).toBeTruthy();
  });

  it('should return truthy when input is a Date object', () => {
    const output = isObject(new Date());
    expect(output).toBeTruthy();
  });

  it('should return falsy when input is null', () => {
    const output = isObject(null);
    expect(output).toBeFalsy();
  });
});

describe('isPlainObject() method', () => {
  it('should return truthy when input is a valid object', () => {
    const output = isPlainObject({ name: 'John', age: 40 });
    expect(output).toBeTruthy();
  });

  it('should return falsy when input is a Date object', () => {
    const output = isPlainObject(new Date());
    expect(output).toBeFalsy();
  });

  it('should return falsy when input is null', () => {
    const output = isPlainObject(null);
    expect(output).toBeFalsy();
  });
});

describe('isString() method', () => {
  it('should return truthy when input is a valid string', () => {
    const output = isString('John');
    expect(output).toBeTruthy();
  });

  it('should return falsy when input is a Date object', () => {
    const output = isString(new Date());
    expect(output).toBeFalsy();
  });

  it('should return falsy when input is null', () => {
    const output = isString(null);
    expect(output).toBeFalsy();
  });
});
