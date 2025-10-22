import { Chart, Drawings, downloadExcelFile, Workbook } from 'excel-builder-vanilla';

export default class Example18 {
  exportBtnElm!: HTMLButtonElement;

  mount() {
    this.exportBtnElm = document.querySelector('#export-chart') as HTMLButtonElement;
    this.exportBtnElm.addEventListener('click', this.startProcess.bind(this));
  }

  unmount() {
    this.exportBtnElm.removeEventListener('click', this.startProcess.bind(this));
  }

  async startProcess() {
    // Base data (will be duplicated into each chart sheet)
    const months = ['Jan', 'Feb', 'Mar'];
    const q1 = [120, 150, 170];
    const q2 = [180, 160, 200];

    const wb = new Workbook();

    // Helper: create a sheet that includes its own data table & a chart of given type
    const createChartSheetWithLocalData = (
      type: 'column' | 'bar' | 'line' | 'pie' | 'scatter',
      sheetName: string,
      stacking?: 'stacked' | 'percent',
    ) => {
      // Excel range sheet names with spaces or special chars must be quoted (e.g. 'Column Stacked'!$A$1)
      const qSheet = /[\s%]/.test(sheetName) ? `'${sheetName}'` : sheetName;
      const ws = wb.createWorksheet({ name: sheetName });
      let categoriesRange: string | undefined;
      let seriesDefs: { name: string; valuesRange: string; xValuesRange?: string }[] = [];

      if (type === 'scatter') {
        // Provide a richer numeric dataset for scatter (X,Y pairs) with 8 points
        const xVals = [10, 20, 30, 40, 55, 65, 80, 95];
        const yVals = [12, 18, 34, 33, 50, 58, 72, 90];
        ws.setData([['X', 'Y'], ...xVals.map((x, i) => [x, yVals[i]])]);
        wb.addWorksheet(ws);
        const xRange = `${qSheet}!$A$2:$A$${xVals.length + 1}`;
        const yRange = `${qSheet}!$B$2:$B$${yVals.length + 1}`;
        seriesDefs = [{ name: 'Y vs X', valuesRange: yRange, xValuesRange: xRange }];
      } else {
        // Use month/Q1/Q2 table for non-scatter charts
        ws.setData([['Month', 'Q1', 'Q2'], ...months.map((m, i) => [m, q1[i], q2[i]])]);
        wb.addWorksheet(ws);
        categoriesRange = `${qSheet}!$A$2:$A$${months.length + 1}`;
        const q1Range = `${qSheet}!$B$2:$B$${months.length + 1}`;
        const q2Range = `${qSheet}!$C$2:$C$${months.length + 1}`;
        switch (type) {
          case 'pie':
            seriesDefs = [
              { name: 'Q1', valuesRange: q1Range },
              { name: 'Q2', valuesRange: q2Range },
            ];
            break;
          default:
            seriesDefs = [
              { name: 'Q1', valuesRange: q1Range },
              { name: 'Q2', valuesRange: q2Range },
            ];
            break;
        }
      }

      const drawings = new Drawings();
      const chart = new Chart({
        type,
        stacking,
        title: `${sheetName} (${type}${stacking ? ' ' + stacking : ''}) Chart`,
        axis: {
          x: { title: type === 'pie' ? undefined : type === 'scatter' ? 'X Values' : 'Month' },
          y: { title: type === 'pie' ? undefined : type === 'scatter' ? 'Y Values' : 'Values' },
        },
        // Reduced to ~80% of previous size (640x400 -> 512x320)
        width: 512 * 9525,
        height: 320 * 9525,
        categoriesRange,
        series: seriesDefs,
      });

      const anchor = chart.createAnchor('twoCellAnchor', {
        from: { x: 4, y: 1 }, // start Chart at E2 cell
        to: { x: 15, y: 30 }, // end column chosen to preserve approximate chart width
      });
      chart.anchor = anchor;
      drawings.addDrawing(chart);
      ws.addDrawings(drawings);
      wb.addDrawings(drawings);
      wb.addChart(chart);
    };

    // Base chart types
    createChartSheetWithLocalData('column', 'Column'); // vertical column chart
    createChartSheetWithLocalData('bar', 'Bar'); // horizontal bar chart
    createChartSheetWithLocalData('line', 'Line');
    createChartSheetWithLocalData('pie', 'Pie');
    createChartSheetWithLocalData('scatter', 'Scatter');

    // Stacked variants (multi-series required for meaningful stack)
    createChartSheetWithLocalData('column', 'Column Stacked', 'stacked');
    createChartSheetWithLocalData('bar', 'Bar Stacked', 'stacked');
    createChartSheetWithLocalData('line', 'Line Stacked', 'stacked');

    // Percent stacked variants
    createChartSheetWithLocalData('column', 'Column % Stacked', 'percent');
    createChartSheetWithLocalData('bar', 'Bar % Stacked', 'percent');
    createChartSheetWithLocalData('line', 'Line % Stacked', 'percent');

    // Export workbook (chart will be included if supported)
    downloadExcelFile(wb, 'Multiple-Charts.xlsx');
  }
}
