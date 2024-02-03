import { Util } from './Util';
import { Pane } from './Pane';
import { XMLDOM } from './XMLDOM';

/**
 * @module Excel/SheetView
 * https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.sheetview%28v=office.14%29.aspx
 *
 */
export class SheetView {
  pane: Pane;
  showZeros = null; //Default
  defaultGridColor = null;
  colorId = null;
  rightToLeft = null;
  showFormulas = null;
  showGridLines = null;
  showOutlineSymbols = null;
  showRowColHeaders = null;
  showRuler = null;
  showWhiteSpace = null;
  tabSelected = null;
  topLeftCell = null;
  viewType = null; //http://www.datypic.com/sc/ooxml/t-ssml_ST_SheetViewType.html
  windowProtection = null;
  zoomScale = null;
  zoomScaleNormal = null;
  zoomScalePageLayoutView = null;
  zoomScaleSheetLayoutView = null;

  constructor(config?: any) {
    const conf = config || {};
    this.pane = conf.pane || new Pane();
  }

  /**
   * Added froze pane
   * @param column - column number: 0, 1, 2 ...
   * @param row - row number: 0, 1, 2 ...
   * @param cell - 'A1'
   * @deprecated
   */
  freezePane(column: number, row: number, cell: number | string) {
    this.pane.state = 'frozen';
    this.pane.xSplit = column;
    this.pane.ySplit = row;
    this.pane.topLeftCell = cell;
  }

  exportXML(doc: XMLDOM) {
    const sheetViews = doc.createElement('sheetViews');
    const sheetView = doc.createElement('sheetView');

    Util.setAttributesOnDoc(sheetView, {
      //TODO apparent you can add 'book views'.. investigate what these are
      workbookViewId: 0,
      showZeros: { v: this.showZeros, type: Boolean },
      defaultGridColor: { v: this.defaultGridColor, type: Boolean },
      //TODO: I have no idea what this even is :\
      colorId: this.colorId,
      rightToLeft: { v: this.rightToLeft, type: Boolean },
      showFormulas: { v: this.showFormulas, type: Boolean },
      showGridLines: { v: this.showGridLines, type: Boolean },
      showOutlineSymbols: { v: this.showOutlineSymbols, type: Boolean },
      showRowColHeaders: { v: this.showRowColHeaders, type: Boolean },
      showRuler: { v: this.showRuler, type: Boolean },
      showWhiteSpace: { v: this.showWhiteSpace, type: Boolean },
      tabSelected: { v: this.tabSelected, type: Boolean },
      viewType: this.viewType,
      windowProtection: { v: this.windowProtection, type: Boolean },
      zoomScale: { v: this.zoomScale, type: Boolean },
      zoomScaleNormal: this.zoomScaleNormal,
      zoomScalePageLayoutView: this.zoomScalePageLayoutView,
      zoomScaleSheetLayoutView: this.zoomScaleSheetLayoutView,
    });

    sheetView.appendChild(this.pane.exportXML(doc));

    sheetViews.appendChild(sheetView);
    return sheetViews;
  }
}
