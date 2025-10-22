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

    // Default to vertical column chart if type omitted (Excel naming consistency).
    const type = this.options.type || 'column';
    let primaryChartNode: XMLNode;
    switch (type) {
      case 'line':
        primaryChartNode = Util.createElement(doc, 'c:lineChart');
        primaryChartNode.appendChild(Util.createElement(doc, 'c:grouping', [['val', 'standard']]));
        primaryChartNode.appendChild(Util.createElement(doc, 'c:varyColors', [['val', '0']]));
        break;
      case 'pie':
        primaryChartNode = Util.createElement(doc, 'c:pieChart');
        primaryChartNode.appendChild(Util.createElement(doc, 'c:varyColors', [['val', '1']]));
        break;
      case 'scatter':
        primaryChartNode = Util.createElement(doc, 'c:scatterChart');
        primaryChartNode.appendChild(Util.createElement(doc, 'c:scatterStyle', [['val', 'marker']]));
        primaryChartNode.appendChild(Util.createElement(doc, 'c:varyColors', [['val', '0']]));
        break;
      case 'bar':
        // Horizontal bar chart (Excel's Bar chart)
        primaryChartNode = Util.createElement(doc, 'c:barChart');
        primaryChartNode.appendChild(Util.createElement(doc, 'c:barDir', [['val', 'bar']]));
        primaryChartNode.appendChild(Util.createElement(doc, 'c:grouping', [['val', 'clustered']]));
        primaryChartNode.appendChild(Util.createElement(doc, 'c:varyColors', [['val', '0']]));
        break;
      case 'column':
      default:
        // Vertical column chart (previous 'bar' behavior)
        primaryChartNode = Util.createElement(doc, 'c:barChart');
        primaryChartNode.appendChild(Util.createElement(doc, 'c:barDir', [['val', 'col']]));
        primaryChartNode.appendChild(Util.createElement(doc, 'c:grouping', [['val', 'clustered']]));
        primaryChartNode.appendChild(Util.createElement(doc, 'c:varyColors', [['val', '0']]));
        break;
    }

    // Build series (multi or single fallback)
    const seriesDefs = this.options.series?.length
      ? this.options.series
      : [
          {
            name: this.options.title || 'Series 1',
            valuesRange:
              this.options.values?.length && this.options.sheetName && this.options.categories?.length
                ? `${this.options.sheetName}!$B$2:$B$${this.options.categories.length + 1}`
                : '',
          },
        ];

    const categoriesRange =
      this.options.categoriesRange ||
      (this.options.sheetName && this.options.categories?.length
        ? `${this.options.sheetName}!$A$2:$A$${this.options.categories.length + 1}`
        : '');

    seriesDefs.forEach((s, idx) => {
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
        if (s.xValuesRange) {
          const numRefX = Util.createElement(doc, 'c:numRef');
          const fNodeX = Util.createElement(doc, 'c:f');
          fNodeX.appendChild(doc.createTextNode(s.xValuesRange));
          numRefX.appendChild(fNodeX);
          xVal.appendChild(numRefX);
        } else {
          // fallback generate indices
          const numLitX = Util.createElement(doc, 'c:numLit');
          const count = this.options.categories?.length || 0;
          numLitX.appendChild(Util.createElement(doc, 'c:ptCount', [['val', String(count)]]));
          for (let i = 0; i < count; i++) {
            const pt = Util.createElement(doc, 'c:pt', [['idx', String(i)]]);
            const vNode = Util.createElement(doc, 'c:v');
            vNode.appendChild(doc.createTextNode(String(i)));
            pt.appendChild(vNode);
            numLitX.appendChild(pt);
          }
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

      primaryChartNode.appendChild(ser);
    });

    // Axis IDs (except pie which has no axes)
    if (type !== 'pie') {
      primaryChartNode.appendChild(Util.createElement(doc, 'c:axId', [['val', String(axIdCat)]]));
      primaryChartNode.appendChild(Util.createElement(doc, 'c:axId', [['val', String(axIdVal)]]));
    }
    plotArea.appendChild(primaryChartNode);

    if (type !== 'pie') {
      if (type === 'scatter') {
        // Scatter requires two value axes (X and Y), not a category axis.
        const xValAx = Util.createElement(doc, 'c:valAx');
        xValAx.appendChild(Util.createElement(doc, 'c:axId', [['val', String(axIdCat)]]));
        const xScaling = Util.createElement(doc, 'c:scaling');
        xScaling.appendChild(Util.createElement(doc, 'c:orientation', [['val', 'minMax']]));
        xValAx.appendChild(xScaling);
        xValAx.appendChild(Util.createElement(doc, 'c:delete', [['val', '0']]));
        xValAx.appendChild(Util.createElement(doc, 'c:axPos', [['val', 'b']]));
        xValAx.appendChild(Util.createElement(doc, 'c:crossAx', [['val', String(axIdVal)]]));
        xValAx.appendChild(Util.createElement(doc, 'c:crosses', [['val', 'autoZero']]));
        xValAx.appendChild(Util.createElement(doc, 'c:crossBetween', [['val', 'between']]));
        if (this.options.xAxisTitle) {
          xValAx.appendChild(this._createTitleNode(doc, this.options.xAxisTitle));
        }
        plotArea.appendChild(xValAx);

        const yValAx = Util.createElement(doc, 'c:valAx');
        yValAx.appendChild(Util.createElement(doc, 'c:axId', [['val', String(axIdVal)]]));
        const yScaling = Util.createElement(doc, 'c:scaling');
        yScaling.appendChild(Util.createElement(doc, 'c:orientation', [['val', 'minMax']]));
        yValAx.appendChild(yScaling);
        yValAx.appendChild(Util.createElement(doc, 'c:delete', [['val', '0']]));
        yValAx.appendChild(Util.createElement(doc, 'c:axPos', [['val', 'l']]));
        yValAx.appendChild(Util.createElement(doc, 'c:crossAx', [['val', String(axIdCat)]]));
        yValAx.appendChild(Util.createElement(doc, 'c:crosses', [['val', 'autoZero']]));
        yValAx.appendChild(Util.createElement(doc, 'c:crossBetween', [['val', 'between']]));
        if (this.options.yAxisTitle) {
          yValAx.appendChild(this._createTitleNode(doc, this.options.yAxisTitle));
        }
        plotArea.appendChild(yValAx);
      } else {
        // Non-scatter (bar/line) use category axis + value axis.
        const catAx = Util.createElement(doc, 'c:catAx');
        catAx.appendChild(Util.createElement(doc, 'c:axId', [['val', String(axIdCat)]]));
        const catScaling = Util.createElement(doc, 'c:scaling');
        catScaling.appendChild(Util.createElement(doc, 'c:orientation', [['val', 'minMax']]));
        catAx.appendChild(catScaling);
        catAx.appendChild(Util.createElement(doc, 'c:delete', [['val', '0']]));
        catAx.appendChild(Util.createElement(doc, 'c:axPos', [['val', 'b']]));
        catAx.appendChild(Util.createElement(doc, 'c:tickLblPos', [['val', 'nextTo']]));
        catAx.appendChild(Util.createElement(doc, 'c:crossAx', [['val', String(axIdVal)]]));
        catAx.appendChild(Util.createElement(doc, 'c:crosses', [['val', 'autoZero']]));
        if (this.options.xAxisTitle) {
          catAx.appendChild(this._createTitleNode(doc, this.options.xAxisTitle));
        }
        plotArea.appendChild(catAx);

        const valAx = Util.createElement(doc, 'c:valAx');
        valAx.appendChild(Util.createElement(doc, 'c:axId', [['val', String(axIdVal)]]));
        const valScaling = Util.createElement(doc, 'c:scaling');
        valScaling.appendChild(Util.createElement(doc, 'c:orientation', [['val', 'minMax']]));
        valAx.appendChild(valScaling);
        valAx.appendChild(Util.createElement(doc, 'c:delete', [['val', '0']]));
        valAx.appendChild(Util.createElement(doc, 'c:axPos', [['val', 'l']]));
        valAx.appendChild(Util.createElement(doc, 'c:crossAx', [['val', String(axIdCat)]]));
        valAx.appendChild(Util.createElement(doc, 'c:crosses', [['val', 'autoZero']]));
        valAx.appendChild(Util.createElement(doc, 'c:crossBetween', [['val', 'between']]));
        if (this.options.yAxisTitle) {
          valAx.appendChild(this._createTitleNode(doc, this.options.yAxisTitle));
        }
        plotArea.appendChild(valAx);
      }
    }

    // Legend if multiple series
    if (seriesDefs.length > 1) {
      const legend = Util.createElement(doc, 'c:legend');
      legend.appendChild(Util.createElement(doc, 'c:legendPos', [['val', 'r']]));
      legend.appendChild(Util.createElement(doc, 'c:layout'));
      chart.appendChild(legend);
    }

    chart.appendChild(plotArea);
    chart.appendChild(Util.createElement(doc, 'c:plotVisOnly', [['val', '1']]));
    chartSpace.appendChild(chart);
    chartSpace.appendChild(Util.createElement(doc, 'c:printSettings'));
    return doc;
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
}
