import { describe, expect, it } from 'vitest';

import { Util } from '../../Util.js';
import { Chart } from '../Chart.js';

function buildChart(opts: any) {
  const chart = new Chart(opts);
  // simulate workbook assigning index to make axis ids stable-ish
  chart.index = 1;
  const xml = chart.toChartSpaceXML().toString();
  return { chart, xml };
}

describe('Chart', () => {
  it('emits barChart node for horizontal bar type (barDir bar)', () => {
    const { xml } = buildChart({
      type: 'bar',
      title: 'Bar Chart',
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4' }],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).toContain('<c:barChart');
    expect(xml).toContain('<c:barDir val="bar"');
    expect(xml).not.toContain('<c:lineChart');
  });

  it('emits lineChart node for line type', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Line Chart',
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4' }],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).toContain('<c:lineChart');
    expect(xml).not.toContain('<c:barChart');
  });
  it('drawing graphicFrame uses default ext when Chart options width/height omitted', () => {
    const chart = new Chart({
      type: 'column',
      title: 'Defaults',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    chart.index = 3;
    chart.setRelationshipId('rId99');
    chart.createAnchor('twoCellAnchor', { from: { x: 1, y: 1, height: 1, width: 1 }, to: { x: 5, y: 20, height: 1, width: 1 } });
    const drawingDoc = Util.createXmlDoc(Util.schemas.spreadsheetDrawing, 'xdr:wsDr');
    const drawingNode = chart.toXML(drawingDoc).toString();
    // Attribute order (cx/cy) isn't guaranteed; accept either order.
    expect(drawingNode).toMatch(/<a:ext (?:cx="4000000" cy="3000000"|cy="3000000" cx="4000000")/);
  });

  it('emits scatterChart with two value axes and no catAx', () => {
    const { xml } = buildChart({
      type: 'scatter',
      title: 'Scatter Chart',
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4', scatterXRange: 'Sheet!$A$2:$A$4' }],
    });
    expect(xml).toContain('<c:scatterChart');
    // Two valAx expected
    const valAxCount = xml.split('<c:valAx').length - 1;
    expect(valAxCount).toBe(2);
    expect(xml).not.toContain('<c:catAx');
  });

  it('includes chart title when provided and sets autoTitleDeleted=0', () => {
    const { xml } = buildChart({
      type: 'column',
      title: 'Custom Title',
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4' }],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).toContain('Custom Title');
    expect(xml).toContain('<c:autoTitleDeleted val="0"');
  });

  it('omits chart title when not provided and sets autoTitleDeleted=1', () => {
    const { xml } = buildChart({
      type: 'column',
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4' }],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).not.toContain('<c:title>');
    expect(xml).toContain('<c:autoTitleDeleted val="1"');
  });

  it('includes axis titles on non-pie charts', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Line',
      axis: { x: { title: 'Months' }, y: { title: 'Values' } },
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4' }],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    // Expect two axis title occurrences plus main chart title (3 total c:title nodes)
    const titleNodeCount = xml.split('<c:title>').length - 1;
    expect(titleNodeCount).toBe(3);
    expect(xml).toContain('Months');
    expect(xml).toContain('Values');
  });

  it('does not include axis titles for pie even if provided', () => {
    const { xml } = buildChart({
      type: 'pie',
      title: 'Pie',
      axis: { x: { title: 'ShouldNotShow' }, y: { title: 'ShouldNotShow' } },
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4' }],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    // Should only have chart-level title
    const titleNodeCount = xml.split('<c:title>').length - 1;
    expect(titleNodeCount).toBe(1);
    expect(xml).not.toContain('ShouldNotShow');
  });

  it('emits multiple series with correct idx/order', () => {
    const { xml } = buildChart({
      type: 'column',
      title: 'Bar',
      series: [
        { name: 'Q1', valuesRange: 'Sheet!$B$2:$B$4' },
        { name: 'Q2', valuesRange: 'Sheet!$C$2:$C$4' },
      ],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    // Two c:ser nodes
    const serCount = xml.split('<c:ser>').length - 1;
    expect(serCount).toBe(2);
    expect(xml).toContain('<c:idx val="0"');
    expect(xml).toContain('<c:idx val="1"');
    expect(xml).toContain('<c:order val="0"');
    expect(xml).toContain('<c:order val="1"');
  });

  it('defaults to column (vertical) when type omitted', () => {
    const { xml } = buildChart({
      title: 'Implicit Column',
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4' }],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).toContain('<c:barChart');
    expect(xml).toContain('<c:barDir val="col"');
  });

  it('omits legend when only one series', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Single',
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4' }],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).not.toContain('<c:legend>');
  });

  it('includes legend when more than one series', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Multi',
      series: [
        { name: 'S1', valuesRange: 'Sheet!$B$2:$B$4' },
        { name: 'S2', valuesRange: 'Sheet!$C$2:$C$4' },
      ],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).toContain('<c:legend>');
  });

  it('generates no implicit series when only title provided', () => {
    const { xml } = buildChart({ title: 'Fallback' });
    expect(xml).not.toContain('<c:ser>');
  });

  it('scatter emits empty numLit xVal when scatterXRange missing', () => {
    const { xml } = buildChart({
      type: 'scatter',
      title: 'Scatter No X Range',
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4' }],
    });
    expect(xml).toContain('<c:numLit>');
    expect(xml).toContain('<c:ptCount val="0"');
  });

  it('chart title overlay value is set to 0', () => {
    const { xml } = buildChart({
      type: 'column',
      title: 'Overlay Check',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).toContain('<c:overlay val="0"');
  });

  it('no axis titles output when not provided', () => {
    const { xml } = buildChart({ type: 'line', series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }], categoriesRange: 'S!$A$2:$A$4' });
    // Only chart title autoDeleted present, no axis title nodes
    const titleNodeCount = xml.split('<c:title>').length - 1;
    expect(titleNodeCount).toBe(0);
  });

  it('scatter axis titles render on both value axes when provided', () => {
    const { xml } = buildChart({
      type: 'scatter',
      title: 'Scatter With Axis Titles',
      axis: { x: { title: 'X Axis' }, y: { title: 'Y Axis' } },
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4', scatterXRange: 'Sheet!$A$2:$A$4' }],
    });
    // Expect 3 title nodes: chart + x axis + y axis
    const titleNodeCount = xml.split('<c:title>').length - 1;
    expect(titleNodeCount).toBe(3);
    expect(xml).toContain('X Axis');
    expect(xml).toContain('Y Axis');
  });

  it('getMediaType returns chart', () => {
    const chart = new Chart({
      type: 'bar',
      series: [{ name: 'S1', valuesRange: 'Sheet!$B$2:$B$4' }],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(chart.getMediaType()).toBe('chart');
  });

  it('bar chart specific attributes present', () => {
    const { xml } = buildChart({
      type: 'bar',
      title: 'Bar Attr',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).toContain('<c:barDir val="bar"');
    expect(xml).toContain('<c:grouping val="clustered"');
    expect(xml).toContain('<c:varyColors val="0"');
  });

  it('column chart specific attributes present', () => {
    const { xml } = buildChart({
      type: 'column',
      title: 'Column Attr',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).toContain('<c:barDir val="col"');
    expect(xml).toContain('<c:grouping val="clustered"');
    expect(xml).toContain('<c:varyColors val="0"');
  });

  it('line chart grouping and varyColors present', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Line Attr',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).toContain('<c:grouping val="standard"');
    expect(xml).toContain('<c:varyColors val="0"');
  });

  it('pie chart varyColors set to 1', () => {
    const { xml } = buildChart({
      type: 'pie',
      title: 'Pie Attr',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).toContain('<c:pieChart');
    expect(xml).toContain('<c:varyColors val="1"');
  });

  it('doughnut chart emits doughnutChart node with holeSize and varyColors 1', () => {
    const { xml } = buildChart({
      type: 'doughnut',
      title: 'Doughnut Attr',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).toContain('<c:doughnutChart');
    expect(xml).toContain('<c:holeSize val="50"');
    expect(xml).toContain('<c:varyColors val="1"');
    // no axes expected
    expect(xml).not.toContain('<c:catAx');
    expect(xml).not.toContain('<c:valAx');
  });

  it('scatter chart style marker and varyColors 0', () => {
    const { xml } = buildChart({
      type: 'scatter',
      title: 'Scatter Attr',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4', scatterXRange: 'S!$A$2:$A$4' }],
    });
    expect(xml).toContain('<c:scatterStyle val="marker"');
    expect(xml).toContain('<c:varyColors val="0"');
  });

  it('axis IDs differ between charts with different index values', () => {
    const chart1 = new Chart({
      type: 'line',
      title: 'C1',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    chart1.index = 1;
    const xml1 = chart1.toChartSpaceXML().toString();
    expect(xml1).toContain('<c:axId val="1001"');
    expect(xml1).toContain('<c:axId val="1002"');

    const chart2 = new Chart({
      type: 'line',
      title: 'C2',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    chart2.index = 2;
    const xml2 = chart2.toChartSpaceXML().toString();
    expect(xml2).toContain('<c:axId val="2001"');
    expect(xml2).toContain('<c:axId val="2002"');
  });

  it('single xAxisTitle only adds chart + x axis title nodes', () => {
    const { xml } = buildChart({
      type: 'column',
      title: 'Bar Single X',
      axis: { x: { title: 'Only X' } },
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    const titleNodeCount = xml.split('<c:title>').length - 1;
    expect(titleNodeCount).toBe(2); // chart + x axis
    expect(xml).toContain('Only X');
  });

  it('single yAxisTitle only adds chart + y axis title nodes', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Line Single Y',
      axis: { y: { title: 'Only Y' } },
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    const titleNodeCount = xml.split('<c:title>').length - 1;
    expect(titleNodeCount).toBe(2); // chart + y axis
    expect(xml).toContain('Only Y');
  });

  it('custom width/height override graphicFrame ext', () => {
    const chart = new Chart({
      type: 'column',
      title: 'Sized',
      width: 5000000,
      height: 1000000,
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    chart.index = 5;
    chart.setRelationshipId('rId50');
    chart.createAnchor('twoCellAnchor', { from: { x: 0, y: 0 }, to: { x: 3, y: 10 } });
    const drawingDoc = Util.createXmlDoc(Util.schemas.spreadsheetDrawing, 'xdr:wsDr');
    const xml = chart.toXML(drawingDoc).toString();
    expect(xml).toMatch(/<a:ext (?:cx="5000000" cy="1000000"|cy="1000000" cx="5000000")/);
  });

  it('legend structure contains legendPos and layout', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Legend Struct',
      series: [
        { name: 'S1', valuesRange: 'S!$B$2:$B$4' },
        { name: 'S2', valuesRange: 'S!$C$2:$C$4' },
      ],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).toContain('<c:legendPos val="r"');
    expect(xml).toContain('<c:layout');
  });

  it('overlay node absent when no title', () => {
    const { xml } = buildChart({
      type: 'bar',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).not.toContain('<c:overlay');
  });

  it('empty series array emits no series and no legend', () => {
    const { xml } = buildChart({ title: 'Empty Series', series: [] });
    expect(xml).not.toContain('<c:ser>');
    expect(xml).not.toContain('<c:legend>');
  });

  it('scatter numLit ptCount is 0 when no categories provided', () => {
    const chart = new Chart({
      type: 'scatter',
      title: 'Zero Scatter',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
    });
    chart.index = 3;
    const xml = chart.toChartSpaceXML().toString();
    expect(xml).toContain('<c:numLit>');
    expect(xml).toContain('<c:ptCount val="0"');
  });

  it('plotVisOnly and printSettings nodes present', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Vis Only',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).toContain('<c:plotVisOnly val="1"');
    expect(xml).toContain('<c:printSettings');
  });

  it('graphicFrame name defaults to "Chart" when title omitted', () => {
    const chart = new Chart({
      type: 'column',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    chart.index = 7;
    chart.setRelationshipId('rId707');
    chart.createAnchor('twoCellAnchor', { from: { x: 0, y: 0 }, to: { x: 2, y: 8 } });
    const drawingDoc = Util.createXmlDoc(Util.schemas.spreadsheetDrawing, 'xdr:wsDr');
    const xml = chart.toXML(drawingDoc).toString();
    // Attribute order isn't guaranteed; accept either order.
    expect(xml).toMatch(/<xdr:cNvPr (?:id="7" name="Chart"|name="Chart" id="7")/);
  });

  it('graphicFrame chart element includes r:id attribute once relationship set', () => {
    const chart = new Chart({
      type: 'line',
      title: 'Has Rel',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    chart.index = 4;
    chart.setRelationshipId('rId404');
    chart.createAnchor('twoCellAnchor', { from: { x: 1, y: 1 }, to: { x: 4, y: 12 } });
    const drawingDoc = Util.createXmlDoc(Util.schemas.spreadsheetDrawing, 'xdr:wsDr');
    const xml = chart.toXML(drawingDoc).toString();
    // Ensure r:id attribute present pointing to relationship id
    expect(xml).toMatch(/<c:chart[^>]*r:id="rId404"/);
  });

  it('axis IDs reflect index multiplier base for higher index value', () => {
    const chart = new Chart({
      type: 'column',
      title: 'Axis Base High',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    chart.index = 5; // expect 5001 & 5002
    const xml = chart.toChartSpaceXML().toString();
    expect(xml).toContain('<c:axId val="5001"');
    expect(xml).toContain('<c:axId val="5002"');
  });

  it('title node includes layout and overlay children when title provided', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Title Layout Overlay',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    // Verify both layout and overlay appear inside title block
    const titleSegment = xml.match(/<c:title>[\s\S]*?<\/c:title>/);
    expect(titleSegment?.[0]).toContain('<c:layout');
    expect(titleSegment?.[0]).toContain('<c:overlay val="0"');
  });

  it('value axis includes min/max when provided', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Axis MinMax',
      axis: { y: { minimum: 0, maximum: 500 } },
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    // Expect c:min and c:max under scaling
    expect(xml).toContain('<c:min val="0"');
    expect(xml).toContain('<c:max val="500"');
  });

  it('value axis omits min when not provided and includes only max when provided', () => {
    const { xml } = buildChart({
      type: 'column',
      title: 'Axis Max Only',
      axis: { y: { maximum: 300 } },
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).not.toContain('<c:min val="');
    expect(xml).toContain('<c:max val="300"');
  });

  // -----------------
  // Series color tests
  // -----------------
  it('applies solidFill color for column series', () => {
    const { xml } = buildChart({
      type: 'column',
      title: 'Colored Column',
      series: [
        { name: 'S1', valuesRange: 'S!$B$2:$B$4', color: 'FFFF0000' },
        { name: 'S2', valuesRange: 'S!$C$2:$C$4' },
      ],
      categoriesRange: 'S!$A$2:$A$4',
    });
    // Expect a:solidFill with srgbClr val="FF0000" (alpha stripped from ARGB FFFF0000)
    expect(xml).toContain('<a:solidFill><a:srgbClr val="FF0000"');
  });

  it('applies stroke color for line series via a:ln', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Colored Line',
      series: [
        { name: 'S1', valuesRange: 'S!$B$2:$B$4', color: '80ABCDEF' }, // ARGB; expect ABCDEF
      ],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).toContain('<a:ln><a:solidFill><a:srgbClr val="ABCDEF"');
  });

  it('applies stroke color for scatter series', () => {
    const { xml } = buildChart({
      type: 'scatter',
      title: 'Colored Scatter',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4', scatterXRange: 'S!$A$2:$A$4', color: 'FF00FF00' }],
    });
    expect(xml).toContain('<a:ln><a:solidFill><a:srgbClr val="00FF00"');
  });

  it('ignores invalid color strings silently', () => {
    const { xml } = buildChart({
      type: 'column',
      title: 'Invalid Color',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4', color: 'GARBAGE' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).not.toContain('<c:spPr>');
  });

  it('does not emit series color styling for pie', () => {
    const { xml } = buildChart({
      type: 'pie',
      title: 'Pie No Series Color',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4', color: 'FF112233' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    // Pie chart series should not contain c:spPr produced by our color logic
    expect(xml).not.toContain('<c:spPr>');
  });

  it('category axis renders majorGridlines when showGridLines true', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Cat Gridlines',
      axis: { x: { showGridLines: true }, y: { showGridLines: true } },
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    // Expect two majorGridlines nodes (one for category axis, one for value axis)
    const gridCount = xml.split('<c:majorGridlines').length - 1;
    expect(gridCount).toBe(2);
  });

  it('no majorGridlines nodes when showGridLines false/undefined', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'No Gridlines',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).not.toContain('<c:majorGridlines');
  });

  it('graphicFrame r:id is empty when relationship not yet set', () => {
    const chart = new Chart({
      type: 'column',
      title: 'No Rel',
      series: [{ name: 'S1', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    chart.index = 9;
    chart.createAnchor('twoCellAnchor', { from: { x: 0, y: 0 }, to: { x: 3, y: 6 } });
    const drawingDoc = Util.createXmlDoc(Util.schemas.spreadsheetDrawing, 'xdr:wsDr');
    const xml = chart.toXML(drawingDoc).toString();
    // r:id attribute present but empty string value
    expect(xml).toMatch(/<c:chart[^>]*r:id=""/);
  });

  // -----------------
  // Data cache tests
  // -----------------
  // Removed data cache tests due to API minimization (no includeDataCache, no fallback arrays)

  // -----------------
  // Stacking tests
  // -----------------
  it('column stacked chart uses grouping stacked and overlap 100', () => {
    const { xml } = buildChart({
      type: 'column',
      stacking: 'stacked',
      title: 'Column Stacked',
      series: [
        { name: 'Q1', valuesRange: 'Sheet!$B$2:$B$4' },
        { name: 'Q2', valuesRange: 'Sheet!$C$2:$C$4' },
      ],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).toContain('<c:grouping val="stacked"');
    expect(xml).toContain('<c:overlap val="100"');
  });

  it('column percent stacked chart uses grouping percentStacked and overlap 100', () => {
    const { xml } = buildChart({
      type: 'column',
      stacking: 'percent',
      title: 'Column % Stacked',
      series: [
        { name: 'Q1', valuesRange: 'Sheet!$B$2:$B$4' },
        { name: 'Q2', valuesRange: 'Sheet!$C$2:$C$4' },
      ],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).toContain('<c:grouping val="percentStacked"');
    expect(xml).toContain('<c:overlap val="100"');
  });

  it('bar stacked chart uses grouping stacked and overlap 100', () => {
    const { xml } = buildChart({
      type: 'bar',
      stacking: 'stacked',
      title: 'Bar Stacked',
      series: [
        { name: 'Q1', valuesRange: 'Sheet!$B$2:$B$4' },
        { name: 'Q2', valuesRange: 'Sheet!$C$2:$C$4' },
      ],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).toContain('<c:grouping val="stacked"');
    expect(xml).toContain('<c:overlap val="100"');
  });

  it('bar percent stacked chart uses grouping percentStacked and overlap 100', () => {
    const { xml } = buildChart({
      type: 'bar',
      stacking: 'percent',
      title: 'Bar % Stacked',
      series: [
        { name: 'Q1', valuesRange: 'Sheet!$B$2:$B$4' },
        { name: 'Q2', valuesRange: 'Sheet!$C$2:$C$4' },
      ],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).toContain('<c:grouping val="percentStacked"');
    expect(xml).toContain('<c:overlap val="100"');
  });

  it('line stacked chart uses grouping stacked (no overlap node)', () => {
    const { xml } = buildChart({
      type: 'line',
      stacking: 'stacked',
      title: 'Line Stacked',
      series: [
        { name: 'Q1', valuesRange: 'Sheet!$B$2:$B$4' },
        { name: 'Q2', valuesRange: 'Sheet!$C$2:$C$4' },
      ],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).toContain('<c:grouping val="stacked"');
    expect(xml).not.toContain('<c:overlap');
  });

  it('line percent stacked chart uses grouping percentStacked (no overlap node)', () => {
    const { xml } = buildChart({
      type: 'line',
      stacking: 'percent',
      title: 'Line % Stacked',
      series: [
        { name: 'Q1', valuesRange: 'Sheet!$B$2:$B$4' },
        { name: 'Q2', valuesRange: 'Sheet!$C$2:$C$4' },
      ],
      categoriesRange: 'Sheet!$A$2:$A$4',
    });
    expect(xml).toContain('<c:grouping val="percentStacked"');
    expect(xml).not.toContain('<c:overlap');
  });

  // -----------------
  // Legend options
  // -----------------
  it('legend.show true forces legend for single series', () => {
    const { xml } = buildChart({
      type: 'column',
      title: 'Force Legend',
      legend: { show: true },
      series: [{ name: 'Only', valuesRange: 'S!$B$2:$B$4' }],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).toContain('<c:legend>');
  });

  it('legend.show false hides legend even for multiple series', () => {
    const { xml } = buildChart({
      type: 'column',
      title: 'Hide Legend',
      legend: { show: false },
      series: [
        { name: 'A', valuesRange: 'S!$B$2:$B$4' },
        { name: 'B', valuesRange: 'S!$C$2:$C$4' },
      ],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).not.toContain('<c:legend>');
  });

  it('legend position maps to topRight', () => {
    const { xml } = buildChart({
      type: 'line',
      title: 'Legend Position',
      legend: { show: true, position: 'topRight' },
      series: [
        { name: 'S1', valuesRange: 'S!$B$2:$B$4' },
        { name: 'S2', valuesRange: 'S!$C$2:$C$4' },
      ],
      categoriesRange: 'S!$A$2:$A$4',
    });
    expect(xml).toMatch(/<c:legend>[\s\S]*?<c:legendPos val="tr"/);
  });

  it('legend overlay true emits overlay val=1', () => {
    const { xml } = buildChart({
      type: 'bar',
      title: 'Legend Overlay',
      legend: { show: true, overlay: true },
      series: [
        { name: 'A', valuesRange: 'S!$B$2:$B$4' },
        { name: 'B', valuesRange: 'S!$C$2:$C$4' },
      ],
      categoriesRange: 'S!$A$2:$A$4',
    });
    const legendSegment = xml.match(/<c:legend>[\s\S]*?<\/c:legend>/)?.[0];
    expect(legendSegment).toContain('<c:overlay val="1"');
  });
});
