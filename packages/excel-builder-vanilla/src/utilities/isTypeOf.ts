export function isObject(value: unknown): value is object {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export function isPlainObject(value: unknown) {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }

  const Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor === 'function' && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value);
}

export function isString(value: any): value is string {
  if (value != null && typeof value.valueOf() === 'string') {
    return true;
  }
  return false;
}
