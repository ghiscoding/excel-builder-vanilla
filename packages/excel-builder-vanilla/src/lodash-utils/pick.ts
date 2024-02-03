export function pick(object: any, keys: string[]) {
  return keys.reduce((obj: any, key: string) => {
    if (object?.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}
