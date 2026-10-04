/** Decode media payloads, accepting data URLs, whitespace, and unpadded base64url. */
export function base64ToUint8Array(base64String: string) {
  const base64 = base64String
    .replace(/^data:[^;]+;base64,/u, '')
    .replace(/\s+/gu, '')
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  let decoded: string;
  try {
    decoded = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4));
  } catch {
    throw new Error('[Excel-Builder-Vanilla] Invalid base64 payload while creating Excel media.');
  }
  const bytes = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}
