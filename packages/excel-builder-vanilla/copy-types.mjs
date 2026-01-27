import { writeFileSync } from 'node:fs';
import { copyfiles } from 'native-copyfiles';

// copy all types (d.ts) files with same folder structures
const source = 'dist/**/*.d.ts';
const destination = '../excel-builder-vanilla-types';
copyfiles(source, destination, { stat: true }, err => {
  if (err) {
    console.error(err);
  } else {
    // all good, next step, create JS entry file
    writeFileSync(`${destination}/dist/index.js`, `'use strict';`);
  }
});
