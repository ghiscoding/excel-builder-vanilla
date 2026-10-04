import { strToU8 } from 'fflate';

import { base64ToUint8Array } from './base64.js';

export const isXmlPath = (path: string) => /\.(?:xml|rels)$/.test(path);
export const zipPath = (path: string) => path.replace(/^\//, '');
export const toZipData = (path: string, content: string) => (isXmlPath(path) ? strToU8(content) : base64ToUint8Array(content));
