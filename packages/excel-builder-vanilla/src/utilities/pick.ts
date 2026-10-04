/** Copies the requested own properties from an object into a new object. */
export function pick(object: any, keys: string[]): any {
  const ownKeys = keys.filter(key => object != null && Object.prototype.hasOwnProperty.call(object, key));
  return Object.fromEntries(ownKeys.map(key => [key, object[key]]));
}
