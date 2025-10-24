## Inserting charts

Add charts to a workbook: add data, build a chart with cell ranges, position it.

### Supported types
`column` (vertical clustered), `bar` (horizontal), `line`, `pie`, `doughnut`, `scatter`

### Core steps
1. Create a workbook & worksheet
2. Add data rows
3. Create a chart (using cell ranges)
4. Call `wb.addChart(chart)`
5. Anchor it (e.g. `twoCellAnchor`)
6. Generate files

{% hint style="info" %}
**Tips** Categories typically populate the X-axis, while series values go on the Y-axis.
{% endhint %}

### Option summary (ChartOptions)
| Option | Purpose | Notes |
|--------|---------|-------|
| type | Chart type | One of: column, bar, line, pie, doughnut, scatter (default: column) |
| title | Chart title | Omit for no title |
| axis.x.title / axis.y.title | Axis labels | Ignored for pie/doughnut |
| axis.x.showGridLines / axis.y.showGridLines | Gridlines toggles | x = vertical lines, y = horizontal lines |
| axis.y.minimum / axis.y.maximum | Value axis bounds | Numbers (e.g. 0, 1) |
| stacking | Stack series | 'stacked' or 'percent' (column / bar / line only) |
| width / height | Size (EMUs) | Usually omit (auto size) |
| categoriesRange | Category labels range | Not used by scatter (use scatterXRange instead) |
| series | Data series | Array of { name, valuesRange, color } |
| series[].scatterXRange | X values (scatter) | Only for scatter charts |
| dataLabels | Point label toggles | { showValue, showCategory, showPercent, showSeriesName } |


### Quick start (multi‑series column chart)
```ts
const wb = createWorkbook();
const ws = wb.createWorksheet({ name: 'Sales' });
wb.addWorksheet(ws);

ws.setData([
  ['Month', 'Q1', 'Q2'],
  ['Jan', 10, 15],
  ['Feb', 20, 25],
  ['Mar', 30, 35],
]);

const chart = new Chart({
  type: 'column',
  title: 'Quarterly Sales',
  axis: { 
    x: { title: 'Month' },  // X-Axis: Horizontal categories (months)
    y: { title: 'Revenue', minimum: 0, showGridLines: true } // Y-Axis: Vertical values (sales amounts)
  },
  series: [
    { name: 'Q1', valuesRange: 'Sales!$B$2:$B$4' },
    { name: 'Q2', valuesRange: 'Sales!$C$2:$C$4' },
  ],
  categoriesRange: 'Sales!$A$2:$A$4',
});
wb.addChart(chart);
chart.createAnchor('twoCellAnchor', { from: { x: 4, y: 1 }, to: { x: 10, y: 16 } });

// (Workbook export depends on your surrounding setup)
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
Position a chart with a two‑cell anchor (start & end grid cells):
```ts
chart.createAnchor('twoCellAnchor', { 
    from: { x: 4, y: 1 }, 
    to: { x: 10, y: 16 } 
});
```
Indices are zero‑based (0 = first column / row).

### Legend
Auto behavior (no `legend` option provided): show legend only when there are 2 or more series.

You can override with the `legend` option:
```ts
legend: {
  show: true,              // force show (even for single series) | false to hide
  position: 'topRight',    // 'right' (default) | 'left' | 'top' | 'bottom' | 'topRight'
  overlay: false,          // true => overlay plot area (no layout space)
}
```
Rules:
- `show: true` forces a legend even for 1 series.
- `show: false` suppresses legend even for multiple series.
- If `show` is undefined, auto mode (2+ series) applies.
- `overlay` emits `<c:overlay val="1">` when true; otherwise `0`.

Note: Pie / Doughnut with multiple series produces multiple pies/rings; legend lists series names.

### Data Labels
Provide high-level toggles for what text appears on each point.

API flags:
```ts
dataLabels: {
  showValue?: boolean;       // numeric value (Y value or slice value)
  showCategory?: boolean;    // category text (Month, Region, etc.)
  showPercent?: boolean;     // percentage (pie/doughnut, or percent-stacked series)
  showSeriesName?: boolean;  // series name (useful with multiple series where value alone is ambiguous)
}
```

Behavior:
- Pick the parts you want (value, percent, category, series name). Omitted = hidden.
- Omit `dataLabels` completely for none.
- Hover tooltips are unchanged (Excel shows full details on hover).

Examples:
1. Value-only on a column chart:
```ts
dataLabels: { showValue: true }
```
2. Percent-only on a pie (concise slice labels):
```ts
dataLabels: { showPercent: true }
```
3. Value + percent on a doughnut:
```ts
dataLabels: { showValue: true, showPercent: true }
```
4. Series name only (multi-line chart where legend is hidden):
```ts
dataLabels: { showSeriesName: true }
```

Full example (pie with percent only):
```ts
new Chart({
  type: 'pie',
  title: 'Share',
  dataLabels: { showPercent: true },
  series: [{ name: '2025', valuesRange: 'Regions!$B$2:$B$6' }],
  categoriesRange: 'Regions!$A$2:$A$6',
});
```

Example (legend will show 2 entries and be placed top-right):
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
  legend: { position: 'topRight' },
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
  axis: { 
    x: { title: 'Month' }, 
    y: { title: 'Revenue', minimum: 0, showGridLines: true } 
  },
  series: [
    { name: 'Q1', valuesRange: 'Sales!$B$2:$B$4' },
    { name: 'Q2', valuesRange: 'Sales!$C$2:$C$4' },
  ],
  categoriesRange: 'Sales!$A$2:$A$4',
});
```

Notes:
- Stacking applies only to column, bar, line.
- Percent stacking rescales each category to 100%.

---

## Chart Type Examples

Below are small, focused snippets for each type. They assume you already created a workbook (`wb`) and worksheet (`ws`) with matching ranges.

#### Column
```ts
const col = new Chart({
  type: 'column',
  title: 'Monthly Revenue',
  axis: { 
    x: { title: 'Month' },     // X-Axis: Horizontal categories (months)
    y: { title: 'Amount', minimum: 0, showGridLines: true } // Y-Axis: Vertical values (revenue)
  },
  series: [
  { name: 'Q1', valuesRange: 'Sales!$B$2:$B$13', color: 'FF3366CC' },
  { name: 'Q2', valuesRange: 'Sales!$C$2:$C$13', color: 'FFFF9933' },
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
  series: [{ name: 'Q1', valuesRange: 'Sales!$B$2:$B$13', color: 'FF99CC00' }],
  categoriesRange: 'Sales!$A$2:$A$13',
  dataLabels: { showValue: true },
});
wb.addChart(line);
```

#### Pie (single series for one pie)
```ts
const pie = new Chart({
  type: 'pie',
  title: 'Share by Region',
  dataLabels: { showValue: true, showPercent: true },
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
    color: 'FFFF0000', // ARGB stroke color (opaque red)
  }],
  dataLabels: { showValue: true }, // shows Y values at each point
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
  axis: { 
    x: { title: 'Month' }, 
    y: { title: 'Percent', minimum: 0, maximum: 1, showGridLines: true } },
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
  axis: { 
    x: { title: 'Month' }, 
    y: { title: 'Percent', minimum: 0, maximum: 1 } 
  },
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

### Series Colors
Format: opaque ARGB `FFRRGGBB` (examples: `FFFF9933` = orange, `FF3366CC` = blue).

Effects:
- Column / Bar: fill color
- Line / Scatter: stroke color
- Pie / Doughnut: ignored (Excel auto colors slices)

Notes:
- Alpha (anything other than `FF`) is ignored; colors are always rendered fully opaque.
- Invalid strings are ignored silently.
- Theme colors are not supported; supply an ARGB hex.

### Cell Range Cheat Sheet
| Want | Pattern | Example |
|------|---------|---------|
| 3 category labels | Sheet!$A$2:$A$4 | `Sales!$A$2:$A$4` |
| Series values | Sheet!$B$2:$B$4 | `Sales!$B$2:$B$4` |
| Scatter X values | Sheet!$A$2:$A$21 | `Runs!$A$2:$A$21` |
| Scatter Y values | Sheet!$B$2:$B$21 | `Runs!$B$2:$B$21` |

Tips:
- Always use absolute refs (`$A$1`) so range stays stable.
- Category and each series range must have the same number of rows.
