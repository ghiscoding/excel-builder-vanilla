import { describe, expect, test } from 'vitest';

import { SheetView } from '../Excel/SheetView.js';

describe('SheetView', () => {
  test('exportXML with all options', () => {
    const sv = new (SheetView as any)();
    sv.pane = { exportXML: () => ({}) };
    sv.showZeros = true;
    sv.defaultGridColor = true;
    sv.colorId = 1;
    sv.rightToLeft = true;
    sv.showFormulas = true;
    sv.showGridLines = true;
    sv.showOutlineSymbols = true;
    sv.showRowColHeaders = true;
    sv.showRuler = true;
    sv.showWhiteSpace = true;
    sv.tabSelected = true;
    sv.viewType = 'normal';
    sv.windowProtection = true;
    sv.zoomScale = true;
    sv.zoomScaleNormal = 100;
    sv.zoomScalePageLayoutView = 100;
    sv.zoomScaleSheetLayoutView = 100;
    const doc = { createElement: () => ({ appendChild: () => {}, setAttribute: () => {} }) };
    expect(() => sv.exportXML(doc)).not.toThrow();
  });
});
