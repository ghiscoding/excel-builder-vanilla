## Creating a worksheet

Worksheets are essentially the entire point of having an Excel document. It holds all of the data in whatever way the user wanted it so that they can display or manipulate at will.

There are two ways of building the worksheet.

### Option #1 - Factory method

```ts
const workbook = ........
const accountSummarySheet = workbook.createWorksheet();
```

### Option #2 - Constructor method

```ts
const workbook = ........
const accountSummarySheet = new Worksheet();
```

Once you've created the worksheet, it must be added to the workbook.

```ts
workbook.addWorksheet(accountSummarySheet);
```

There! Now we've got a worksheet that we can fill with data. Without data, the sheet will error out if you try and open it in Excel. You can continue to add sheets to the workbook like this.

### Giving the worksheet a proper name

'Sheet1' and etc are pretty boring names. Try this instead:

```ts
const accountSummarySheet = new Worksheet({ name: 'Account Summary' });
```

This will set the 'name' of the worksheet to 'Account Summary' so it doesn't show up as just 'Sheet1'. You can pass construction params to the factory pattern as well:

```ts
const accountSummarySheet = workbook.createWorksheet({ name: 'Account Summary' });
```
