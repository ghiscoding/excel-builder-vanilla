import { describe, expect, it } from 'vitest';

import { pick } from '../pick.js';

describe('pick', () => {
  it('copies an own __proto__ property without changing the result prototype', () => {
    const input = JSON.parse('{"__proto__":{"polluted":true},"value":1}');
    const result = pick(input, ['__proto__', 'value']);

    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.prototype.hasOwnProperty.call(result, '__proto__')).toBe(true);
    expect(Object.getOwnPropertyDescriptor(result, '__proto__')?.value).toEqual({ polluted: true });
    expect(result.value).toBe(1);
  });

  it('reads own properties from null-prototype objects and objects with shadowed hasOwnProperty', () => {
    const nullPrototypeInput = Object.assign(Object.create(null), { value: 1 });
    const shadowedMethodInput = { hasOwnProperty: false, value: 2 };

    expect(pick(nullPrototypeInput, ['value'])).toEqual({ value: 1 });
    expect(pick(shadowedMethodInput, ['value'])).toEqual({ value: 2 });
  });
  it('omits missing and inherited properties and accepts absent input', () => {
    expect(pick({ value: 1 }, ['missing', 'toString'])).toEqual({});
    expect(pick(null, ['value'])).toEqual({});
    expect(pick(undefined, ['value'])).toEqual({});
  });
});
