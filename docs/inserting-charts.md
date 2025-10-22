## Inserting charts

Add charts to a workbook: create data, create a chart, add it, position it. That's all—just practical usage.

### Supported types
`column` (vertical clustered), `bar` (horizontal), `line`, `pie`, `doughnut`, `scatter`

### Core steps
1. Create a workbook & worksheet
2. Add data rows
3. Create a chart (using cell ranges)
4. Call `wb.addChart(chart)`
5. Anchor it (e.g. `twoCellAnchor`)
6. Generate files

### Option summary (ChartOptions)
| Option | Purpose | Notes |
|--------|---------|-------|
| type | `column` | `bar` | `line` | `pie` | `doughnut` | `scatter` | Defaults to `column` |
| title | Chart title | Omit for none |
| axis.x.title | X axis label | Ignored for pie |
| axis.y.title | Y axis label | Ignored for pie |
| axis.x.showGridLines | Show vertical gridlines | Category axis (non-pie) |
| axis.y.showGridLines | Show horizontal gridlines | Value axis (non-pie) |
| axis.y.minimum / axis.y.maximum | Force value axis bounds | Optional (numeric) |
| stacking | 'stacked' | 'percent' | Stacks series (column/bar/line) |
| width / height | Size override | Defaults used if omitted |
| categoriesRange | Category labels range | Skip for scatter when using `scatterXRange` |
| series | Array of `{ name, valuesRange }` | 2+ series => legend |
| series[].scatterXRange | Scatter X values range | Only for scatter |


### Quick start (multi‑series column chart)
```ts
const wb = createWorkbook();
const ws = wb.createWorksheet({ name: 'Sales' });
wb.addWorksheet(ws);

ws.addRow(['Month', 'Q1', 'Q2']);
ws.addRow(['Jan', 10, 15]);
ws.addRow(['Feb', 20, 25]);
ws.addRow(['Mar', 30, 35]);

const chart = new Chart({
  type: 'column',
  title: 'Quarterly Sales',
  axis: {
    x: { title: 'Month' },
    y: { title: 'Revenue', minimum: 0, showGridLines: true },
  },
  series: [
    { name: 'Q1', valuesRange: 'Sales!$B$2:$B$4' },
    { name: 'Q2', valuesRange: 'Sales!$C$2:$C$4' },
  ],
  categoriesRange: 'Sales!$A$2:$A$4',
});
wb.addChart(chart);

chart.createAnchor('twoCellAnchor', { from: { x: 4, y: 1 }, to: { x: 10, y: 16 } });
ws.addDrawings(drawings.addDrawing(chart)); // or add drawings first then the chart

await wb.generateFiles();
```

<!-- Detailed per-type examples moved to the bottom section -->


## Resizing (width & height)
```ts
new Chart({
  title: 'Wide Chart',
  width: 6_000_000,
  height: 2_000_000,
  series: [{ name: 'Q1', valuesRange: 'Sales!$B$2:$B$4' }],
  categoriesRange: 'Sales!$A$2:$A$4',
});
```

## Positioning
Use a two-cell anchor:
```ts
chart.createAnchor('twoCellAnchor', { from: { x: 4, y: 1 }, to: { x: 10, y: 16 } });
```
Values are column/row indices (0-based).

### Legend
The legend only appears when the chart has two or more series.

- 1 series: legend is omitted automatically.
- 2+ series: legend lists each `series.name`.

Notes:
- Pie / Doughnut: if you add multiple series you get multiple rings (doughnut) or pies; the legend shows the series names.

Example (legend will show 2 entries):
```ts
new Chart({
  type: 'bar',
  title: 'Year Comparison',
  axis: { x: { title: 'Month' }, y: { title: 'Revenue' } },
  series: [
    { name: '2024', valuesRange: 'Sales!$B$2:$B$5' },
    { name: '2025', valuesRange: 'Sales!$C$2:$C$5' },
  ],
  categoriesRange: 'Sales!$A$2:$A$5',
});
```

### Troubleshooting
| Problem | Cause | Fix |
|---------|-------|-----|
| Missing chart | Not added to workbook | Call `wb.addChart(chart)` |
| No legend | Only one series | Add a second series |
| Axis titles missing | Using pie chart | Pie charts have no axes |
| Wrong data | Typo in range string | Check sheet name & `$A$1` format |

### Minimal example
```ts
const simple = new Chart({
  type: 'bar',
  axis: { y: { minimum: 0 } },
  series: [{ name: 'Sales', valuesRange: 'Sales!$B$2:$B$4' }],
  categoriesRange: 'Sales!$A$2:$A$4',
});
wb.addChart(simple);
```

That's it — build your workbook and open in Excel.

### Stacked & Percent Stacked

Enable stacking on multi-series column, bar, or line charts:
```ts
new Chart({
  type: 'column',
  stacking: 'stacked', // or 'percent'
  axis: { x: { title: 'Month' }, y: { title: 'Revenue', minimum: 0, showGridLines: true } },
  series: [
    { name: 'Q1', valuesRange: 'Sales!$B$2:$B$4' },
    { name: 'Q2', valuesRange: 'Sales!$C$2:$C$4' },
  ],
  categoriesRange: 'Sales!$A$2:$A$4',
});
```

Notes:
- Stacking ignored for: doughnut, pie & scatter
- Percent stacking displays proportional contribution (0–100%).
- Overlap is automatically set for stacked column/bar to align segments.

---

## Chart Type Examples

Below are minimal, focused examples for each supported chart type. They assume you have already created a workbook `wb`, added a worksheet `ws` with suitable data, and added that worksheet to the workbook. Only the chart-specific parts are shown.

#### Column
```ts
const col = new Chart({
  type: 'column',
  title: 'Monthly Revenue',
  axis: { x: { title: 'Month' }, y: { title: 'Amount', minimum: 0, showGridLines: true } },
  series: [
    { name: 'Q1', valuesRange: 'Sales!$B$2:$B$13' },
    { name: 'Q2', valuesRange: 'Sales!$C$2:$C$13' },
  ],
  categoriesRange: 'Sales!$A$2:$A$13',
});
wb.addChart(col);
```

#### Bar (horizontal)
```ts
const bar = new Chart({
  type: 'bar',
  title: 'Monthly Revenue (Horizontal)',
  series: [
    { name: 'Q1', valuesRange: 'Sales!$B$2:$B$7' },
    { name: 'Q2', valuesRange: 'Sales!$C$2:$C$7' },
  ],
  categoriesRange: 'Sales!$A$2:$A$7',
});
wb.addChart(bar);
```

#### Line
```ts
const line = new Chart({
  type: 'line',
  title: 'Trend',
  axis: { x: { title: 'Month' }, y: { title: 'Value', showGridLines: true } },
  series: [{ name: 'Q1', valuesRange: 'Sales!$B$2:$B$13' }],
  categoriesRange: 'Sales!$A$2:$A$13',
});
wb.addChart(line);
```

#### Pie (single series for one pie)
```ts
const pie = new Chart({
  type: 'pie',
  title: 'Share by Region',
  series: [{ name: '2025', valuesRange: 'Regions!$B$2:$B$6' }],
  categoriesRange: 'Regions!$A$2:$A$6',
});
wb.addChart(pie);
```

#### Doughnut (single series for one ring)
```ts
const doughnut = new Chart({
  type: 'doughnut',
  title: 'Share by Category',
  series: [{ name: '2025', valuesRange: 'Categories!$B$2:$B$6' }],
  categoriesRange: 'Categories!$A$2:$A$6',
});
wb.addChart(doughnut);
```

#### Scatter (X/Y numeric ranges)
```ts
const scatter = new Chart({
  type: 'scatter',
  title: 'Distance vs Speed',
  axis: { x: { title: 'Distance' }, y: { title: 'Speed' } },
  series: [{
    name: 'Run A',
  scatterXRange: 'Runs!$A$2:$A$21',
    valuesRange: 'Runs!$B$2:$B$21',
  }],
});
wb.addChart(scatter);
```

#### Column Stacked
```ts
const colStacked = new Chart({
  type: 'column',
  stacking: 'stacked',
  title: 'Stacked Revenue',
  axis: { x: { title: 'Month' }, y: { title: 'Total', minimum: 0, showGridLines: true } },
  series: [
    { name: 'Product A', valuesRange: 'Sales!$B$2:$B$13' },
    { name: 'Product B', valuesRange: 'Sales!$C$2:$C$13' },
  ],
  categoriesRange: 'Sales!$A$2:$A$13',
});
wb.addChart(colStacked);
```

#### Column Percent Stacked
```ts
const colPct = new Chart({
  type: 'column',
  stacking: 'percent',
  title: 'Product Mix %',
  axis: { x: { title: 'Month' }, y: { title: 'Percent', minimum: 0, maximum: 1, showGridLines: true } },
  series: [
    { name: 'Product A', valuesRange: 'Sales!$B$2:$B$13' },
    { name: 'Product B', valuesRange: 'Sales!$C$2:$C$13' },
  ],
  categoriesRange: 'Sales!$A$2:$A$13',
});
wb.addChart(colPct);
```

#### Line Stacked
```ts
const lineStacked = new Chart({
  type: 'line',
  stacking: 'stacked',
  title: 'Cumulative Trend',
  axis: { x: { title: 'Month' }, y: { title: 'Total', minimum: 0 } },
  series: [
    { name: 'North', valuesRange: 'Regions!$B$2:$B$13' },
    { name: 'South', valuesRange: 'Regions!$C$2:$C$13' },
  ],
  categoriesRange: 'Regions!$A$2:$A$13',
});
wb.addChart(lineStacked);
```

#### Line Percent Stacked
```ts
const linePct = new Chart({
  type: 'line',
  stacking: 'percent',
  title: 'Regional Contribution %',
  axis: { x: { title: 'Month' }, y: { title: 'Percent', minimum: 0, maximum: 1 } },
  series: [
    { name: 'North', valuesRange: 'Regions!$B$2:$B$13' },
    { name: 'South', valuesRange: 'Regions!$C$2:$C$13' },
  ],
  categoriesRange: 'Regions!$A$2:$A$13',
});
wb.addChart(linePct);
```

#### Bar Stacked
```ts
const barStacked = new Chart({
  type: 'bar',
  stacking: 'stacked',
  title: 'Stacked Horizontal',
  series: [
    { name: 'Segment A', valuesRange: 'Segments!$B$2:$B$10' },
    { name: 'Segment B', valuesRange: 'Segments!$C$2:$C$10' },
  ],
  categoriesRange: 'Segments!$A$2:$A$10',
});
wb.addChart(barStacked);
```

#### Bar Percent Stacked
```ts
const barPct = new Chart({
  type: 'bar',
  stacking: 'percent',
  title: 'Segment Share %',
  axis: { y: { minimum: 0, maximum: 1 } },
  series: [
    { name: 'Segment A', valuesRange: 'Segments!$B$2:$B$10' },
    { name: 'Segment B', valuesRange: 'Segments!$C$2:$C$10' },
  ],
  categoriesRange: 'Segments!$A$2:$A$10',
});
wb.addChart(barPct);
```

---
End of chart type examples.
