## Threading (Using Web Workers)

Since using web workers is an entirely different ball of wax, there's a slight change to how you create the excel files. Please note that this demo will not work with IE, as it runs out of memory at about 50,000 rows of data.

First, some different code:

```ts
import { ExcelBuilder } from 'excel-builder-vanilla';

new ExcelBuilder().createFileAsync(eventWorkbook, {
  success: function (data) {
    downloader('Artist WB.xlsx', data);
    stopSpin();
  },
  error: function (message, filename, lineno) {
    console.log('Error occurred with the message: ', message, ' on line #', lineno, ' in file ', filename);
  },
});
```

Success will be called when the excel sheet has been completely generated. Currently, in Firefox v24, the setup below takes about 15 seconds to load. A bit longer in Chrome [see notes below]. Since this makes use of web workers, the UI isn't frozen for that period of time. The 'data' in the success callback is the raw data that can be sent wherever it needs to go to be downloaded.

```ts
import { ExcelBuilder } from 'excel-builder-vanilla';
import largeset from './largetestdata.json';

spin();

/** Building large data set. Original set is 10,000 records. We're going for 100,000 **/
const testDataOrig = JSON.parse(testData);
testData = [].concat(testDataOrig);
testData = testData.concat(testDataOrig);
testData = testData.concat(testDataOrig);
testData = testData.concat(testDataOrig);
testData = testData.concat(testDataOrig);
testData = testData.concat(testDataOrig);
testData = testData.concat(testDataOrig);
testData = testData.concat(testDataOrig);
testData = testData.concat(testDataOrig);
testData = testData.concat(testDataOrig);
/** DONE **/

const eventWorkbook = new ExcelBuilder().createWorkbook();
const eventList = eventWorkbook.createWorksheet({ name: 'Event List' });
const dateFormat = eventWorkbook.getStyleSheet().createSimpleFormatter('date');
const currencyFormat = eventWorkbook.getStyleSheet().createFormat({
  format: '$#,##0.00',
});
const testDataArray = [];
for (let i = 0, l = testData.length; i < l; i++) {
  testDataArray.push([
    testData[i].id,
    { value: testData[i].startDate, metadata: { type: 'date', style: dateFormat.id } },
    { value: testData[i].endDate, metadata: { type: 'date', style: dateFormat.id } },
    testData[i].name,
    testData[i].location,
    { value: testData[i].price, metadata: { style: currencyFormat.id } },
  ]);
}
console.log(testDataArray.length);
eventList.setData(testDataArray);
eventList.setColumns([{ width: 10 }, { width: 20 }, { width: 20 }, { width: 30 }, { width: 20 }, { width: 10 }]);

eventWorkbook.addWorksheet(eventList);

new ExcelBuilder().createFileAsync(eventWorkbook, {
  success: function (data) {
    downloader('Event WB.xlsx', data);
    stopSpin();
  },
});
```

One of the reasons that I think this code takes longer to load is because Web Workers do not have access to a DOM. So, it can't create the native DOM element to work with and instead has to be run through a small emulator.
