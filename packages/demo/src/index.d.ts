export type {};

/** Vite image path import, i.e.: `import from "image-path?base64"` */
declare global {
  declare module '*?base64' {
    const value: string;
    export = value;
  }
}
