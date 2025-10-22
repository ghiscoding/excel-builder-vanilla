## Inserting charts

Add charts to a workbook: create data, create a chart, add it, position it. That's all—just practical usage.

### Supported types
`column` (vertical clustered), `bar` (horizontal), `line`, `pie`, `scatter`

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
| type | `column` | `bar` | `line` | `pie` | `scatter` | Defaults to `column` |
| title | Chart title | Omit for none |
| xAxisTitle | X axis label | Ignored for pie |
| yAxisTitle | Y axis label | Ignored for pie |
| width / height | Size override | Defaults used if omitted |
| categoriesRange | Category labels range | Skip for scatter when using `xValuesRange` |
| series | Array of `{ name, valuesRange }` | 2+ series => legend |
| series[].xValuesRange | Scatter X values range | Only for scatter |
| sheetName | Name used when building range strings | Optional (used for convenience or clarity) |


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
  xAxisTitle: 'Month',
  yAxisTitle: 'Revenue',
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

### Horizontal bar chart
```ts
const barChart = new Chart({
  type: 'bar',
  title: 'Revenue (Horizontal Bar)',
  series: [
    { name: 'Q1', valuesRange: 'Sales!$B$2:$B$4' },
    { name: 'Q2', valuesRange: 'Sales!$C$2:$C$4' },
  ],
  categoriesRange: 'Sales!$A$2:$A$4',
});
wb.addChart(barChart);
```

### Line chart (with axis titles)
```ts
const lineChart = new Chart({
  type: 'line',
  title: 'Revenue Trend',
  xAxisTitle: 'Month',
  yAxisTitle: 'Total',
  series: [{ name: 'Q1', valuesRange: 'Sales!$B$2:$B$13' }],
  categoriesRange: 'Sales!$A$2:$A$13',
});
wb.addChart(lineChart);
```

### Pie chart
```ts
const pie = new Chart({
  type: 'pie',
  title: 'Share by Region',
  series: [{ name: '2025', valuesRange: 'Regions!$B$2:$B$6' }],
  categoriesRange: 'Regions!$A$2:$A$6',
});
wb.addChart(pie);
```

### Scatter chart
Provide both X and Y value ranges (numeric): (less common, placed last)
```ts
const scatter = new Chart({
  type: 'scatter',
  title: 'Distance vs Speed',
  xAxisTitle: 'Distance',
  yAxisTitle: 'Speed',
  series: [{
    name: 'Run A',
    xValuesRange: 'Runs!$A$2:$A$11',
    valuesRange: 'Runs!$B$2:$B$11',
  }],
});
wb.addChart(scatter);
```


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
- Pie: if you add multiple series you get multiple pies; the legend shows the series names.

Example (legend will show 2 entries):
```ts
new Chart({
  type: 'bar',
  title: 'Year Comparison',
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
  series: [{ name: 'Sales', valuesRange: 'Sales!$B$2:$B$4' }],
  categoriesRange: 'Sales!$A$2:$A$4',
});
wb.addChart(simple);
```

That's it — build your workbook and open in Excel.
