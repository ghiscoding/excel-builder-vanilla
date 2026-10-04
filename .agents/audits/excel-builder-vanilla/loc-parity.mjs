import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [modulePath, outputPath] = process.argv.slice(2);
const { Chart, Workbook, Util } = await import(pathToFileURL(path.resolve(modulePath)));
const charts = [];
for (const type of ['column', 'bar', 'line', 'pie', 'doughnut', 'scatter', 'unknown', undefined]) {
  for (const stacking of [undefined, 'stacked', 'percent']) {
    for (const detailed of [false, true]) {
      const options = {
        type, stacking, title: detailed ? 'Revenue <&> 😀' : undefined,
        series: [{ name: 'Q1 & Q2', valuesRange: 'Data!$B$2:$B$4', scatterXRange: detailed ? 'Data!$A$2:$A$4' : undefined,
          color: detailed ? '#80abcdef' : undefined }],
        categoriesRange: detailed ? 'Data!$A$2:$A$4' : undefined,
        axis: detailed ? { x: { title: 'X', showGridLines: true, minimum: -5, maximum: 5 },
          y: { title: 'Y', showGridLines: true, minimum: 0, maximum: 500 } } : undefined,
        legend: detailed ? { show: true, position: 'topRight', overlay: true } : undefined,
        dataLabels: detailed ? { showValue: true, showPercent: true } : undefined,
      };
      const chart = new Chart(options);
      chart.index = 5;
      charts.push({ options, xml: chart.toChartSpaceXML().toString() });
    }
  }
}
const contentTypes = [];
for (const count of [0, 1, 3]) {
  const workbook = new Workbook();
  for (const collection of ['worksheets', 'tables', 'drawings', 'charts']) {
    for (let i = 0; i < count; i++) workbook[collection].push({});
  }
  if (count) {
    workbook.addMedia('image', 'logo.png', '');
    workbook.addMedia('image', 'photo.jpg', '');
    workbook.addMedia('image', 'custom.bin', '', 'application/octet-stream');
  }
  contentTypes.push({ count, xml: workbook.createContentTypes().toString() });
}
// Direct helper calls also cover the historical fallback for unknown chart types.
const chart = new Chart({ series: [] });
const doc = Util.createXmlDoc(Util.schemas.drawing, 'root');
const fallbacks = ['unknown', 'column', 'bar'].map(type => ({ type,
  xml: chart._createPrimaryChartNode(doc, type, 'stacked').toString() }));
fs.writeFileSync(outputPath, JSON.stringify({ charts, contentTypes, fallbacks }, null, 2) + '\n');
console.log(`${charts.length} charts, ${contentTypes.length} content-type sets, ${fallbacks.length} fallbacks`);
