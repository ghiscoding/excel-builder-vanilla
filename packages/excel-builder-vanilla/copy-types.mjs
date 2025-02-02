import { writeFileSync } from 'node:fs';
import { copyfiles } from 'native-copyfiles';

// copy all types (d.ts) files with same folder structures
const source = 'dist/**/*.d.{cts,ts}';
const destination = '../excel-builder-vanilla-types';
copyfiles([source, destination], {}, err => {
  if (err) {
    console.error(err);
  } else {
    // all good, next step, create JS entry file
    writeFileSync(`${destination}/dist/index.cjs`, `'use strict';`);
    writeFileSync(`${destination}/dist/index.mjs`, `'use strict';`);
  }
});
