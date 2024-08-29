import { writeFile } from 'node:fs';
import copyfiles from 'copyfiles';

// copy all types (d.ts) files with same folder structures
const source = 'dist/**/*.d.ts';
const destination = '../excel-builder-vanilla-types';
copyfiles([source, destination], {}, err => {
  if (err) {
    console.error(err);
  } else {
    // all good, next step, create JS entry file
    const content = `'use strict';`;
    writeFile(`${destination}/dist/excel-builder.js`, content, err => {
      if (err) {
        console.error(err);
      }
    });
  }
});
