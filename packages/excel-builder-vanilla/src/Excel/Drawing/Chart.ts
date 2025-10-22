import type { ChartOptions } from '../../interfaces.js';
import { Util } from '../Util.js';
import type { XMLDOM, XMLNode } from '../XMLDOM.js';
import { Drawing } from './Drawing.js';

/**
 * Minimal Chart implementation (clustered column) required for Excel to render without repair.
 * This produces 2 parts:
 * 1) Drawing graphicFrame (returned by toXML for inclusion in /xl/drawings/drawingN.xml)
 * 2) Chart part XML (returned by toChartSpaceXML for inclusion in /xl/charts/chartN.xml)
 * Relationships:
 * drawingN.xml.rels -> ../charts/chartN.xml (Type chart)
 */
export class Chart extends Drawing {
  relId: string | null = null; // relationship id from drawing rels
  index: number | null = null; // 1-based index assigned by workbook
  target: string | null = null; // relative target path (../charts/chartN.xml)
  options: ChartOptions;

  constructor(options: ChartOptions) {
    super();
    this.options = options;
  }

  /** RelationshipManager calls this via Drawings */
  setRelationshipId(rId: string) {
    this.relId = rId;
  }

  /** Return relationship type for this drawing */
  getMediaType(): keyof typeof Util.schemas {
    return 'chart';
  }

  /** Creates the graphicFrame container that goes inside an anchor in drawing part */
  private createGraphicFrame(xmlDoc: XMLDOM) {
    const graphicFrame = Util.createElement(xmlDoc, 'xdr:graphicFrame');

    const nvGraphicFramePr = Util.createElement(xmlDoc, 'xdr:nvGraphicFramePr');
    nvGraphicFramePr.appendChild(
      Util.createElement(xmlDoc, 'xdr:cNvPr', [
        ['id', String(this.index || 1)],
        ['name', this.options.title || 'Chart'],
      ]),
    );
    nvGraphicFramePr.appendChild(Util.createElement(xmlDoc, 'xdr:cNvGraphicFramePr'));
    graphicFrame.appendChild(nvGraphicFramePr);

    // basic transform (off + ext) – values are arbitrary but required structure
    const xfrm = Util.createElement(xmlDoc, 'xdr:xfrm');
    xfrm.appendChild(
      Util.createElement(xmlDoc, 'a:off', [
        ['x', '0'],
        ['y', '0'],
      ]),
    );
    xfrm.appendChild(
      Util.createElement(xmlDoc, 'a:ext', [
        ['cx', String(this.options.width || 4000000)],
        ['cy', String(this.options.height || 3000000)],
      ]),
    );
    graphicFrame.appendChild(xfrm);

    const graphic = Util.createElement(xmlDoc, 'a:graphic');
    const graphicData = Util.createElement(xmlDoc, 'a:graphicData', [['uri', 'http://schemas.openxmlformats.org/drawingml/2006/chart']]);
    graphicData.appendChild(
      Util.createElement(xmlDoc, 'c:chart', [
        ['xmlns:c', 'http://schemas.openxmlformats.org/drawingml/2006/chart'],
        ['xmlns:r', Util.schemas.relationships],
        ['r:id', this.relId || ''],
      ]),
    );
    graphic.appendChild(graphicData);
    graphicFrame.appendChild(graphic);

    return graphicFrame;
  }

  /** Drawing part representation (inside an anchor) */
  toXML(xmlDoc: XMLDOM) {
    return this.anchor.toXML(xmlDoc, this.createGraphicFrame(xmlDoc));
  }

  private _nextAxisIdBase(): number {
    // Simple axis id base using index plus a constant offset
    return (this.index || 1) * 1000;
  }

  /** Chart part XML: /xl/charts/chartN.xml */
  toChartSpaceXML(): XMLDOM {
    const doc = Util.createXmlDoc('http://schemas.openxmlformats.org/drawingml/2006/chart', 'c:chartSpace');
    const chartSpace = doc.documentElement;
    chartSpace.setAttribute('xmlns:c', 'http://schemas.openxmlformats.org/drawingml/2006/chart');
    chartSpace.setAttribute('xmlns:a', Util.schemas.drawing);
    chartSpace.setAttribute('xmlns:r', Util.schemas.relationships);

    const chart = Util.createElement(doc, 'c:chart');
    // Title (only if provided). autoTitleDeleted must be 0 or omitted when we set a title.
    if (this.options.title) {
      chart.appendChild(this._createTitleNode(doc, this.options.title));
      chart.appendChild(Util.createElement(doc, 'c:autoTitleDeleted', [['val', '0']]));
    } else {
      chart.appendChild(Util.createElement(doc, 'c:autoTitleDeleted', [['val', '1']]));
    }

    const plotArea = Util.createElement(doc, 'c:plotArea');
    const axisBase = this._nextAxisIdBase();
    const axIdCat = axisBase + 1;
    const axIdVal = axisBase + 2;

    // Default chart type
    const type = this.options.type || 'column';
    // Categories range (shared across all non-scatter series when provided)
    const categoriesRange = this.options.categoriesRange || '';
    const primaryChartNode = this._createPrimaryChartNode(doc, type, this.options.stacking);

    // Lean chart XML (no fallback shorthand or data cache snapshots)

    (this.options.series || []).forEach((s, idx) => {
      const ser = Util.createElement(doc, 'c:ser');
      ser.appendChild(Util.createElement(doc, 'c:idx', [['val', String(idx)]]));
      ser.appendChild(Util.createElement(doc, 'c:order', [['val', String(idx)]]));

      // Series title literal
      const tx = Util.createElement(doc, 'c:tx');
      const txV = Util.createElement(doc, 'c:v');
      txV.appendChild(doc.createTextNode(s.name));
      tx.appendChild(txV);
      ser.appendChild(tx);

      if (type === 'scatter') {
        // Scatter uses xVal & yVal
        const xVal = Util.createElement(doc, 'c:xVal');
        if (s.scatterXRange) {
          const numRefX = Util.createElement(doc, 'c:numRef');
          const fNodeX = Util.createElement(doc, 'c:f');
          fNodeX.appendChild(doc.createTextNode(s.scatterXRange));
          numRefX.appendChild(fNodeX);
          xVal.appendChild(numRefX);
        } else {
          // Minimal empty numLit fallback
          const numLitX = Util.createElement(doc, 'c:numLit');
          numLitX.appendChild(Util.createElement(doc, 'c:ptCount', [['val', '0']]));
          xVal.appendChild(numLitX);
        }
        ser.appendChild(xVal);
        const yVal = Util.createElement(doc, 'c:yVal');
        const numRefY = Util.createElement(doc, 'c:numRef');
        const fNodeY = Util.createElement(doc, 'c:f');
        fNodeY.appendChild(doc.createTextNode(s.valuesRange));
        numRefY.appendChild(fNodeY);
        yVal.appendChild(numRefY);
        ser.appendChild(yVal);
      } else {
        // Categories (shared across all series)
        if (categoriesRange) {
          const cat = Util.createElement(doc, 'c:cat');
          const strRef = Util.createElement(doc, 'c:strRef');
          const fNodeCat = Util.createElement(doc, 'c:f');
          fNodeCat.appendChild(doc.createTextNode(categoriesRange));
          strRef.appendChild(fNodeCat);
          cat.appendChild(strRef);
          ser.appendChild(cat);
        }
        // Values
        if (s.valuesRange) {
          const val = Util.createElement(doc, 'c:val');
          const numRef = Util.createElement(doc, 'c:numRef');
          const fNodeVal = Util.createElement(doc, 'c:f');
          fNodeVal.appendChild(doc.createTextNode(s.valuesRange));
          numRef.appendChild(fNodeVal);
          val.appendChild(numRef);
          ser.appendChild(val);
        }
      }

      // Optional per-series color (basic solid fill / line stroke)
      this._applySeriesColor(doc, ser, type, s.color);

      primaryChartNode.appendChild(ser);
    });

    // Axis IDs (except pie which has no axes)
    if (type !== 'pie' && type !== 'doughnut') {
      primaryChartNode.appendChild(Util.createElement(doc, 'c:axId', [['val', String(axIdCat)]]));
      primaryChartNode.appendChild(Util.createElement(doc, 'c:axId', [['val', String(axIdVal)]]));
    }
    plotArea.appendChild(primaryChartNode);

    if (type !== 'pie' && type !== 'doughnut') {
      const xAxisOpts = this.options.axis?.x;
      const yAxisOpts = this.options.axis?.y;
      const xAxisTitle = xAxisOpts?.title;
      const yAxisTitle = yAxisOpts?.title;
      if (type === 'scatter') {
        plotArea.appendChild(this._createValueAxis(doc, axIdCat, axIdVal, 'b', xAxisTitle, xAxisOpts));
        plotArea.appendChild(this._createValueAxis(doc, axIdVal, axIdCat, 'l', yAxisTitle, yAxisOpts));
      } else {
        plotArea.appendChild(this._createCategoryAxis(doc, axIdCat, axIdVal, xAxisTitle, xAxisOpts));
        plotArea.appendChild(this._createValueAxis(doc, axIdVal, axIdCat, 'l', yAxisTitle, yAxisOpts));
      }
    }

    // Legend logic (configurable)
    const legendOpts = this.options.legend;
    const seriesCount = (this.options.series || []).length;
    const autoShouldShow = seriesCount > 1; // previous behavior
    const effectiveShow = typeof legendOpts?.show === 'boolean' ? legendOpts.show : autoShouldShow;
    if (effectiveShow) {
      const legend = Util.createElement(doc, 'c:legend');
      // Map high-level position to OOXML codes
      const posMap: Record<string, string> = { right: 'r', left: 'l', top: 't', bottom: 'b', topRight: 'tr' };
      const pos = posMap[legendOpts?.position || 'right'] || 'r';
      legend.appendChild(Util.createElement(doc, 'c:legendPos', [['val', pos]]));
      legend.appendChild(Util.createElement(doc, 'c:layout'));
      // Overlay (default 0)
      if (legendOpts?.overlay) {
        legend.appendChild(Util.createElement(doc, 'c:overlay', [['val', '1']]));
      } else {
        legend.appendChild(Util.createElement(doc, 'c:overlay', [['val', '0']]));
      }
      chart.appendChild(legend);
    }

    chart.appendChild(plotArea);
    chart.appendChild(Util.createElement(doc, 'c:plotVisOnly', [['val', '1']]));
    chartSpace.appendChild(chart);
    chartSpace.appendChild(Util.createElement(doc, 'c:printSettings'));
    return doc;
  }
  /** Create the primary chart node based on type and stacking */
  private _createPrimaryChartNode(doc: XMLDOM, type: string, stacking?: 'stacked' | 'percent'): XMLNode {
    let node: XMLNode;
    const groupingValue = this._resolveGrouping(type, stacking);
    switch (type) {
      case 'line': {
        node = Util.createElement(doc, 'c:lineChart');
        node.appendChild(Util.createElement(doc, 'c:grouping', [['val', groupingValue]]));
        node.appendChild(Util.createElement(doc, 'c:varyColors', [['val', '0']]));
        break;
      }
      case 'pie': {
        node = Util.createElement(doc, 'c:pieChart');
        node.appendChild(Util.createElement(doc, 'c:grouping', [['val', 'clustered']]));
        node.appendChild(Util.createElement(doc, 'c:varyColors', [['val', '1']]));
        break;
      }
      case 'doughnut': {
        node = Util.createElement(doc, 'c:doughnutChart');
        node.appendChild(Util.createElement(doc, 'c:grouping', [['val', 'clustered']]));
        node.appendChild(Util.createElement(doc, 'c:varyColors', [['val', '1']]));
        // Add a default holeSize (50%) to visualize doughnut; Excel defaults to 50 if absent but explicit for clarity
        node.appendChild(Util.createElement(doc, 'c:holeSize', [['val', '50']]));
        break;
      }
      case 'scatter': {
        node = Util.createElement(doc, 'c:scatterChart');
        node.appendChild(Util.createElement(doc, 'c:scatterStyle', [['val', 'marker']]));
        node.appendChild(Util.createElement(doc, 'c:varyColors', [['val', '0']]));
        break;
      }
      case 'bar': {
        node = Util.createElement(doc, 'c:barChart');
        node.appendChild(Util.createElement(doc, 'c:barDir', [['val', 'bar']]));
        node.appendChild(Util.createElement(doc, 'c:grouping', [['val', groupingValue]]));
        if (stacking) {
          // Ensure stacked bars/columns align in same category slot
          node.appendChild(Util.createElement(doc, 'c:overlap', [['val', '100']]));
        }
        node.appendChild(Util.createElement(doc, 'c:varyColors', [['val', '0']]));
        break;
      }
      case 'column':
      default: {
        node = Util.createElement(doc, 'c:barChart');
        node.appendChild(Util.createElement(doc, 'c:barDir', [['val', 'col']]));
        node.appendChild(Util.createElement(doc, 'c:grouping', [['val', groupingValue]]));
        if (stacking) {
          node.appendChild(Util.createElement(doc, 'c:overlap', [['val', '100']]));
        }
        node.appendChild(Util.createElement(doc, 'c:varyColors', [['val', '0']]));
        break;
      }
    }
    return node;
  }

  /** Resolve grouping value based on chart type and stacking */
  private _resolveGrouping(type: string, stacking?: 'stacked' | 'percent'): string {
    if (type === 'pie' || type === 'doughnut') return 'clustered'; // required but cosmetic
    if (type === 'line') {
      if (stacking === 'stacked') return 'stacked';
      if (stacking === 'percent') return 'percentStacked';
      return 'standard';
    }
    if (type === 'bar' || type === 'column') {
      if (stacking === 'stacked') return 'stacked';
      if (stacking === 'percent') return 'percentStacked';
      return 'clustered';
    }
    // scatter doesn't use grouping; still return default for structural consistency
    return 'standard';
  }

  /** Create a c:title node with minimal rich text required for Excel to render */
  private _createTitleNode(doc: XMLDOM, text: string): XMLNode {
    const title = Util.createElement(doc, 'c:title');
    const tx = Util.createElement(doc, 'c:tx');
    const rich = Util.createElement(doc, 'c:rich');
    rich.appendChild(Util.createElement(doc, 'a:bodyPr'));
    rich.appendChild(Util.createElement(doc, 'a:lstStyle'));
    const p = Util.createElement(doc, 'a:p');
    const r = Util.createElement(doc, 'a:r');
    const rPr = Util.createElement(doc, 'a:rPr', [['lang', 'en-US']]);
    r.appendChild(rPr);
    const t = Util.createElement(doc, 'a:t');
    t.appendChild(doc.createTextNode(text));
    r.appendChild(t);
    p.appendChild(r);
    p.appendChild(Util.createElement(doc, 'a:endParaRPr', [['lang', 'en-US']]));
    rich.appendChild(p);
    tx.appendChild(rich);
    title.appendChild(tx);
    title.appendChild(Util.createElement(doc, 'c:layout'));
    title.appendChild(Util.createElement(doc, 'c:overlay', [['val', '0']]));
    return title;
  }

  /** Create a category axis (catAx) */
  private _createCategoryAxis(doc: XMLDOM, axId: number, crossAx: number, title?: string, opts?: { showGridLines?: boolean }): XMLNode {
    const catAx = Util.createElement(doc, 'c:catAx');
    catAx.appendChild(Util.createElement(doc, 'c:axId', [['val', String(axId)]]));
    const scaling = Util.createElement(doc, 'c:scaling');
    scaling.appendChild(Util.createElement(doc, 'c:orientation', [['val', 'minMax']]));
    catAx.appendChild(scaling);
    catAx.appendChild(Util.createElement(doc, 'c:delete', [['val', '0']]));
    catAx.appendChild(Util.createElement(doc, 'c:axPos', [['val', 'b']]));
    catAx.appendChild(Util.createElement(doc, 'c:tickLblPos', [['val', 'nextTo']]));
    catAx.appendChild(Util.createElement(doc, 'c:crossAx', [['val', String(crossAx)]]));
    catAx.appendChild(Util.createElement(doc, 'c:crosses', [['val', 'autoZero']]));
    if (opts?.showGridLines) {
      catAx.appendChild(Util.createElement(doc, 'c:majorGridlines'));
    }
    if (title) catAx.appendChild(this._createTitleNode(doc, title));
    return catAx;
  }

  /** Create a value axis (valAx) */
  private _createValueAxis(
    doc: XMLDOM,
    axId: number,
    crossAx: number,
    pos: 'l' | 'b',
    title?: string,
    opts?: { minimum?: number; maximum?: number; showGridLines?: boolean },
  ): XMLNode {
    const valAx = Util.createElement(doc, 'c:valAx');
    valAx.appendChild(Util.createElement(doc, 'c:axId', [['val', String(axId)]]));
    const scaling = Util.createElement(doc, 'c:scaling');
    scaling.appendChild(Util.createElement(doc, 'c:orientation', [['val', 'minMax']]));
    if (typeof opts?.minimum === 'number') {
      scaling.appendChild(Util.createElement(doc, 'c:min', [['val', String(opts.minimum)]]));
    }
    if (typeof opts?.maximum === 'number') {
      scaling.appendChild(Util.createElement(doc, 'c:max', [['val', String(opts.maximum)]]));
    }
    valAx.appendChild(scaling);
    valAx.appendChild(Util.createElement(doc, 'c:delete', [['val', '0']]));
    valAx.appendChild(Util.createElement(doc, 'c:axPos', [['val', pos]]));
    valAx.appendChild(Util.createElement(doc, 'c:crossAx', [['val', String(crossAx)]]));
    valAx.appendChild(Util.createElement(doc, 'c:crosses', [['val', 'autoZero']]));
    valAx.appendChild(Util.createElement(doc, 'c:crossBetween', [['val', 'between']]));
    if (opts?.showGridLines) {
      valAx.appendChild(Util.createElement(doc, 'c:majorGridlines'));
    }
    if (title) valAx.appendChild(this._createTitleNode(doc, title));
    return valAx;
  }

  /** Apply a basic series color if provided. Supports RGB (RRGGBB) or ARGB (AARRGGBB); leading # optional. Alpha (if provided) is stripped. */
  private _applySeriesColor(doc: XMLDOM, serNode: XMLNode, type: string, color?: string) {
    if (!color || typeof color !== 'string') return;
    let hex = color.trim().replace(/^#/, '').toUpperCase();
    // Accept 6 (RGB) or 8 (ARGB) hex chars; strip leading alpha if present
    if (/^[0-9A-F]{8}$/.test(hex)) {
      hex = hex.slice(2);
    } else if (!/^[0-9A-F]{6}$/.test(hex)) {
      return; // invalid format; silently ignore
    }
    // Create spPr container
    const spPr = Util.createElement(doc, 'c:spPr');
    if (type === 'line' || type === 'scatter') {
      // For line/scatter charts define stroke color (ln)
      const ln = Util.createElement(doc, 'a:ln');
      const solidFill = Util.createElement(doc, 'a:solidFill');
      solidFill.appendChild(Util.createElement(doc, 'a:srgbClr', [['val', hex]]));
      ln.appendChild(solidFill);
      spPr.appendChild(ln);
    } else if (type !== 'pie' && type !== 'doughnut') {
      // For column/bar (and future types) define a solid fill
      const solidFill = Util.createElement(doc, 'a:solidFill');
      solidFill.appendChild(Util.createElement(doc, 'a:srgbClr', [['val', hex]]));
      spPr.appendChild(solidFill);
    } else {
      // For pie/doughnut omit series-level color (Excel varies slice colors automatically)
      return;
    }
    serNode.appendChild(spPr);
  }
}
