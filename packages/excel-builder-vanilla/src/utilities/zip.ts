import { strToU8 } from 'fflate';

import { base64ToUint8Array } from './base64.js';

export const isXmlPath = (path: string) => /\.(?:xml|rels)$/.test(path);
export const zipPath = (path: string) => {
  const entryPath = path.startsWith('/') ? path.slice(1) : path;
  const invalidSegment = entryPath.split('/').some(segment => segment === '' || segment === '.' || segment === '..');
  if (invalidSegment || /[\\:\p{Cc}]/u.test(entryPath)) {
    throw new Error(`Invalid ZIP entry path: ${path}`);
  }
  return entryPath;
};
export const toZipData = (path: string, content: string) => (isXmlPath(path) ? strToU8(content) : base64ToUint8Array(content));
