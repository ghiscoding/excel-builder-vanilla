var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=`<div class="example01">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 01: Create Worksheet
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example01.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example01.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">Add data to export.</div>
    </div>
  </div>

  <div>
    <div class="mb-2">
      <button id="export" type="button" class="btn btn-success btn-sm">
        <i class="fa fa-download"></i>
        Excel Export
      </button>
    </div>

    <div class="row">
      <div class="table-container col-sm-8">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Artist</th>
              <th scope="col">Album</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Buckethead</td>
              <td>Albino Slug</td>
              <td>8.99</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Electric Tears</td>
              <td>13.99</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Colma</td>
              <td>11.34</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Vegas</td>
              <td>10.54</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Tweekend</td>
              <td>10.64</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Divided By Night</td>
              <td>8.99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
`,r=`<div class="example02">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 02: Sizing/Collapsing Columns
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example02.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example02.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        The column <code>width</code>
        attribute will set a width. The <code>hidden</code>
        attribute will hide the column in Excel. The example below has the "Artist" column wider and the next column "Album" to be hidden in
        the exported Excel file.
      </div>
    </div>
  </div>

  <div>
    <div class="mb-2">
      <button id="export" type="button" class="btn btn-success btn-sm">
        <i class="fa fa-download"></i>
        Excel Export
      </button>
    </div>

    <div class="row">
      <div class="table-container col-sm-8">
        <table class="table">
          <thead>
            <tr>
              <th colspan="3" class="text-center">Merged Header</th>
            </tr>
            <tr>
              <th scope="col">Artist</th>
              <th scope="col">Album (hidden column)</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Buckethead</td>
              <td>Albino Slug</td>
              <td>8.99</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Electric Tears</td>
              <td>13.99</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Colma</td>
              <td>11.34</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Vegas</td>
              <td>10.54</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Tweekend</td>
              <td>10.64</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Divided By Night</td>
              <td>8.99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
`,i=`<div class="example03">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 03: Setting row information
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example03.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example03.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Set different row options via <code>setRowInstructions()</code>
        method. For example, we changed the row height of the first row and change the text style to italic.
      </div>
    </div>
  </div>

  <div>
    <div class="mb-2">
      <button id="export" type="button" class="btn btn-success btn-sm">
        <i class="fa fa-download"></i>
        Excel Export
      </button>
    </div>

    <div class="row">
      <div class="table-container col-sm-8">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Artist</th>
              <th scope="col">Album</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Buckethead</td>
              <td>Albino Slug</td>
              <td>8.99</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Electric Tears</td>
              <td>13.99</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Colma</td>
              <td>11.34</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Vegas</td>
              <td>10.54</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Tweekend</td>
              <td>10.64</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Divided By Night</td>
              <td>8.99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
`,a=`<div class="example04">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 04: Fonts and Colors
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example04.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example04.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Set different fonts and colors via the <code>createFormat()</code>
        method, we can provide an object with the <code>font</code>
        and <code>border</code>
        properties.
      </div>
    </div>
  </div>

  <div>
    <div class="mb-2">
      <button id="export" type="button" class="btn btn-success btn-sm">
        <i class="fa fa-download"></i>
        Excel Export
      </button>
    </div>

    <div class="row">
      <div class="table-container col-sm-8">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Artist</th>
              <th scope="col">Album</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Buckethead</td>
              <td>Albino Slug</td>
              <td class="text-end">8.99</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Electric Tears</td>
              <td class="text-end">13.99</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Colma</td>
              <td class="text-end">11.34</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Vegas</td>
              <td class="text-end">10.54</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Tweekend</td>
              <td class="text-end">10.64</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Divided By Night</td>
              <td class="text-end">8.99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
`,o=`<div class="example05">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 05: Number, Date, etc Formatting
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example05.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example05.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        We can create custom format by using the <code>createFormat()</code>
        method, in this example we formatted the "Price" column as currency and the Modified Date is a Date format.
      </div>
    </div>
  </div>

  <div>
    <div class="mb-2">
      <button id="export" type="button" class="btn btn-success btn-sm">
        <i class="fa fa-download"></i>
        Excel Export
      </button>
    </div>

    <div class="row">
      <div class="table-container col-sm-8">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Artist</th>
              <th scope="col">Album</th>
              <th scope="col">Price</th>
              <th scope="col">Date Modified</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Buckethead</td>
              <td>Albino Slug</td>
              <td class="text-end">$8.99</td>
              <td>2024-02-01</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Electric Tears</td>
              <td class="text-end">$13.99</td>
              <td>2024-02-02</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Colma</td>
              <td class="text-end">$11.34</td>
              <td>2024-02-03</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Vegas</td>
              <td class="text-end">$10.54</td>
              <td>2024-02-04</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Tweekend</td>
              <td class="text-end">$10.64</td>
              <td>2024-02-05</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Divided By Night</td>
              <td class="text-end">$8.99</td>
              <td>2024-02-06</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
`,s=`<div class="example06">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 06: Alignment
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example06.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example06.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Set different alignments, in this example we horizontally aligned to the middle all header titles in the exported Excel file.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Excel Export
    </button>
  </div>

  <div class="row">
    <div class="table-container col-sm-9">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" class="text-center">Artist</th>
            <th scope="col" class="text-center">Album</th>
            <th scope="col" class="text-center">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buckethead</td>
            <td>Albino Slug</td>
            <td class="text-end">8.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Electric Tears</td>
            <td class="text-end">13.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Colma</td>
            <td class="text-end">11.34</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Vegas</td>
            <td class="text-end">10.54</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Tweekend</td>
            <td class="text-end">10.64</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Divided By Night</td>
            <td class="text-end">8.99</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`,c=`<div class="example07">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 07: Background Fillers
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example07.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example07.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Set different background filling by using <code>fill</code>
        property which accepts a wide range of options like background color type of gradient or pattern and different colors.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Excel Export
    </button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Artist</th>
            <th scope="col">Album</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buckethead</td>
            <td>Albino Slug</td>
            <td class="text-end">8.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Electric Tears</td>
            <td class="text-end">13.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Colma</td>
            <td class="text-end">11.34</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Vegas</td>
            <td class="text-end">10.54</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Tweekend</td>
            <td class="text-end">10.64</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Divided By Night</td>
            <td class="text-end">8.99</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`,l=`<div class="example08">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 08: Formulas
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example08.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example08.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        We can set a formula by using the metadata object
        <code>&#123; value: &#39;C2+D2&#39;, metadata: &#123; type: &#39;formula&#39; &#125; &#125;</code>
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Excel Export
    </button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Artist</th>
            <th scope="col">Album</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Taxable</th>
            <th scope="col">Sub-Total</th>
            <th scope="col">Taxes</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buckethead</td>
            <td>Albino Slug</td>
            <td class="currency">$8.99</td>
            <td>5</td>
            <td>Yes</td>
            <td class="currency">$44.95</td>
            <td class="currency">$3.37</td>
            <td class="currency">$48.32</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Electric Tears</td>
            <td class="currency">$13.99</td>
            <td>7</td>
            <td>Yes</td>
            <td class="currency">$97.93</td>
            <td class="currency">$7.34</td>
            <td class="currency">$105.27</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Colma</td>
            <td class="currency">$11.34</td>
            <td>9</td>
            <td>No</td>
            <td class="currency">$102.06</td>
            <td class="currency">$0.00</td>
            <td class="currency">$102.06</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Vegas</td>
            <td class="currency">$10.54</td>
            <td>3</td>
            <td>Yes</td>
            <td class="currency">$31.62</td>
            <td class="currency">$2.37</td>
            <td class="currency">$33.99</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Tweekend</td>
            <td class="currency">$10.64</td>
            <td>1</td>
            <td>No</td>
            <td class="currency">$10.64</td>
            <td class="currency">$0.00</td>
            <td class="currency">$10.64</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Divided By Night</td>
            <td class="currency">$8.99</td>
            <td>56</td>
            <td>Yes</td>
            <td class="currency">$503.44</td>
            <td class="currency">$37.76</td>
            <td class="currency">$541.20</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`,u=`<div class="example09">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 09: Tables
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example09.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example09.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Tables are a feature that is apparently new to Office 2007+, with a comparable feature called a <code>list</code>
        in 2003 and below. Basically, by putting data in a table, it gives the user some ways to filter and sort the data through UI. There
        are also some formula benefits. Creating a table takes a few extra steps, mostly because of how a table's definition is really
        detached from a worksheet.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Excel Export
    </button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">
              <span>Artist</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col">
              <span>Album</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col">
              <span>Price</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buckethead</td>
            <td>Albino Slug</td>
            <td>8.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Electric Tears</td>
            <td>13.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Colma</td>
            <td>11.34</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Vegas</td>
            <td>10.54</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Tweekend</td>
            <td>10.64</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Divided By Night</td>
            <td>8.99</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`,d=`<div class="example10">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 10: Theming Tables
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example10.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example10.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Every once in a while you need a table theme that isn't available from the custom themes. You can use
        <code>createTableStyle()</code>
        to change style for a section like the header row and/or the whole table.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Excel Export
    </button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" class="text-center">
              <span>Artist</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col" class="text-center">
              <span>Album</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col" class="text-center">
              <span>Price</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buckethead</td>
            <td>Albino Slug</td>
            <td>8.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Electric Tears</td>
            <td>13.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Colma</td>
            <td>11.34</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Vegas</td>
            <td>10.54</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Tweekend</td>
            <td>10.64</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Divided By Night</td>
            <td>8.99</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`,f=`<div class="example11">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 11: Tables Summaries
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example11.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example11.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Adding "Summaries" to tables Basically you need to tell the table what kind of operation the column is expected to do at the end.
        You also need to tell the table that there will, in fact, be a total row, and you have to make sure the total row is defined in the
        sheet data.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Excel Export
    </button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">
              <span>Artist</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col">
              <span>Album</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col">
              <span>Price</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buckethead</td>
            <td>Albino Slug</td>
            <td>8.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Electric Tears</td>
            <td>13.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Colma</td>
            <td>11.34</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Vegas</td>
            <td>10.54</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Tweekend</td>
            <td>10.64</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Divided By Night</td>
            <td>8.99</td>
          </tr>
          <tr>
            <td>Highest Price</td>
            <td>test</td>
            <td>13.99</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`,p=`<div class="example12">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 12: Worksheet Headers/Footers
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example12.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example12.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Headers and footers are there mostly for when the user prints. A good example is the "3 out of 12" that you might get on the bottom
        of some pages, showing that you're looking at page three out of twelve. Giving print titles (such as 'CONFIDENTIAL' or the name of
        the organization that this is being printed for) is pretty common practice. The problem with having this data in the worksheet is
        that you're potentially messing up your cells just in the name of slapping a header in so the person knows what they are looking at
        when it gets printed.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Excel Export
    </button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <h6 class="mt-4"><code>Header</code></h6>
      <table class="table table-bordered header">
        <thead>
          <tr>
            <th scope="col">This will be on the left</th>
            <th scope="col">In the middle <strong>I shall be</strong></th>
            <th scope="col">Right, underlined and size of 16</th>
          </tr>
        </thead>
      </table>

      <h6 class="mt-4"><code>Body</code></h6>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Artist</th>
            <th scope="col">Album</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buckethead</td>
            <td>Albino Slug</td>
            <td>8.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Electric Tears</td>
            <td>13.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Colma</td>
            <td>11.34</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Vegas</td>
            <td>10.54</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Tweekend</td>
            <td>10.64</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Divided By Night</td>
            <td>8.99</td>
          </tr>
          <tr>
            <td>Highest Price</td>
            <td>test</td>
            <td>13.99</td>
          </tr>
        </tbody>
      </table>

      <h6 class="mt-4"><code>Footer</code></h6>
      <table class="table table-bordered footer">
        <thead>
          <tr>
            <th scope="col-4">Date of print: 2025-01-01 08:22:03 PM</th>
            <th scope="col-4">Album List</th>
            <th scope="col-4">Page 1 of 1</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</div>
`,m=`<div class="example13">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 13: Pictures with 2 cell anchors
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example13.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example13.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        You can insert pictures/images in Excel but it must be provided in <code>base64</code>
        format.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Excel Export
    </button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"><span>A</span></th>
            <th scope="col"><span>B</span></th>
            <th scope="col"><span>C</span></th>
            <th scope="col"><span>D</span></th>
            <th scope="col"><span>E</span></th>
            <th scope="col"><span>F</span></th>
            <th scope="col"><span>G</span></th>
            <th scope="col"><span>H</span></th>
          </tr>
          <tr>
            <th scope="col" class="table-col">
              <span>Artist</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col" class="table-col">
              <span>Album</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col" class="table-col">
              <span>Price</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="table-cell">Buckethead</td>
            <td class="table-cell">Albino Slug</td>
            <td class="table-cell text-right">8.99</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class="table-cell">Buckethead</td>
            <td class="table-cell">Electric Tears</td>
            <td class="table-cell text-right">13.99</td>
            <td></td>
            <td></td>
            <td colspan="2" rowspan="5"><img id="pic1" src="" height="150" width="150" alt="some images"></td>
          </tr>
          <tr>
            <td class="table-cell">Buckethead</td>
            <td class="table-cell">Colma</td>
            <td class="table-cell text-right">11.34</td>
          </tr>
          <tr>
            <td class="table-cell">Crystal Method</td>
            <td class="table-cell">Vegas</td>
            <td class="table-cell text-right">10.54</td>
          </tr>
          <tr>
            <td class="table-cell">Crystal Method</td>
            <td class="table-cell">Tweekend</td>
            <td class="table-cell text-right">10.64</td>
          </tr>
          <tr>
            <td class="table-cell">Crystal Method</td>
            <td class="table-cell">Divided By Night</td>
            <td class="table-cell text-right">8.99</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`,h=`<div class="example14">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 14: Pictures with one/two/absolute cell anchors
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example14.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example14.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        You can insert pictures/images in Excel but it must be provided in <code>base64</code>&nbsp;format. There are multiple type of
        anchors that you can use: <code>oneCellAnchor</code>&nbsp; / <code>twoCellAnchor</code>&nbsp;/ <code>absoluteAnchor</code>
        cell anchors.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Excel Export
    </button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">A</th>
            <th scope="col">B</th>
            <th scope="col">C</th>
            <th scope="col">D</th>
            <th scope="col">E</th>
            <th scope="col">F</th>
            <th scope="col">G</th>
            <th scope="col">H</th>
            <th scope="col">I</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td colspan="3" rowspan="3"><img id="pic1" src="" height="150" width="150" alt="some images"></td>
          </tr>
          <tr>
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td></td>
            <td colspan="4" rowspan="5"><img id="pic2" src="" height="250" width="250" alt="some images"></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>6</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>7</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>8</td>
            <td></td>
            <td colspan="4" rowspan="5"><img id="pic3" src="" height="250" width="250" alt="some images"></td>
            <td></td>
          </tr>
          <tr>
            <td>9</td>
            <td></td>
          </tr>
          <tr>
            <td>10</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>11</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>12</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`,g=`<div class="example15">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 15: Streaming Excel Export <small>(100,000 rows)</small>
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example15.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example15.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        For large datasets, streaming export is significantly more performant and memory-efficient compared to non-streaming export. This
        example demonstrates streaming using <code>createExcelFileStream</code>. The export also includes Header &amp; Footer. Export
        progress is shown below.
      </div>
    </div>
  </div>
  <div class="mb-2">
    <button id="export" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Stream Excel Export
    </button>
    <div id="progress" style="margin-top:10px; font-weight:bold;"></div>
  </div>

  <div class="table-container col-sm-8">
    <h6 class="mt-4"><code>Header</code></h6>
    <table class="table table-bordered header">
      <thead>
        <tr>
          <th scope="col">This will be on the left</th>
          <th scope="col">In the middle <strong>I shall be</strong></th>
          <th scope="col">Right, underlined and size of 16</th>
        </tr>
      </thead>
    </table>

    <h6 class="mt-4"><code>Body</code></h6>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Artist</th>
          <th scope="col">Album</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Artist 1</td>
          <td>Album 1</td>
          <td>$8.99</td>
        </tr>
        <tr>
          <td>Artist 2</td>
          <td>Album 2</td>
          <td>$13.99</td>
        </tr>
        <tr>
          <td>Artist 3</td>
          <td>Album 3</td>
          <td>$11.34</td>
        </tr>
        <tr>
          <td>Artist 4</td>
          <td>Album 4</td>
          <td>$10.54</td>
        </tr>
        <tr>
          <td>Artist 5</td>
          <td>Album 5</td>
          <td>$10.64</td>
        </tr>
        <tr>
          <td>Artist 6</td>
          <td>Album 6</td>
          <td>$8.99</td>
        </tr>
        <tr>
          <td>Artist 7</td>
          <td>Album 7</td>
          <td>$9.99</td>
        </tr>
        <tr>
          <td>Artist 8</td>
          <td>Album 8</td>
          <td>$12.49</td>
        </tr>
        <tr>
          <td>Artist 9</td>
          <td>Album 9</td>
          <td>$7.99</td>
        </tr>
        <tr>
          <td>Artist 10</td>
          <td>Album 10</td>
          <td>$15.00</td>
        </tr>
        <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
      </tbody>
    </table>

    <h6 class="mt-4"><code>Footer</code></h6>
    <table class="table table-bordered footer">
      <thead>
        <tr>
          <th scope="col-4">Date of print: 2025-01-01 08:22:03 PM</th>
          <th scope="col-4">Album List</th>
          <th scope="col-4">Page 1 of 1</th>
        </tr>
      </thead>
    </table>
  </div>
</div>
`,_=`<section>
  <h2 class="bd-title">
    Example 16: Streaming Features Demo <small>(50,000 rows)</small>
    <span class="float-end links">
      Code <span class="fa fa-link"></span>
      <span class="small">
        <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example16.html"
          >html</a
        >
        |
        <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example16.ts"
          >ts</a
        >
      </span>
    </span>
  </h2>
  <div class="subtitle">
    This demo showcases merged features: merged header, row height, styles, fonts, colors, borders, number/date formatting alignment and
    formulas (from Example 02-08 but using Streaming Export).
  </div>

  <button id="export" type="button" class="btn btn-success btn-sm">
    <i class="fa fa-download"></i>
    Stream Excel Export
  </button>
  <div
    id="progress"
    class="progress"
    role="progressbar"
    aria-label="Streaming Export Progress"
    aria-valuenow="0"
    aria-valuemin="0"
    aria-valuemax="100"
    style="height: 20px"
  >
    <div class="progress-bar" style="width: 0%">0%</div>
  </div>
  <h3>Excel Output Preview</h3>
  <div class="table-container col-sm-8">
    <table id="excel-preview" class="excel-preview example02 example04">
      <thead>
        <tr>
          <th colspan="5" style="color:#2b995d; font-size:20px; font-weight:bold; border:none; text-align:center;">Merged Header</th>
        </tr>
        <tr>
          <th style="color:red; border:1px solid red; border-right:1px dashed red; font-weight:bold;">Artist</th>
          <th style="font-weight:bold;">Album (hidden column)</th>
          <th style="font-weight:bold;">Price</th>
          <th style="font-weight:bold;">Quantity</th>
          <th style="font-weight:bold;">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr style="height:40px;">
          <td style="text-align:center;">Artist 1</td>
          <td>Album 1</td>
          <td style="text-align:right;">$8.99</td>
          <td style="text-align:center;">5</td>
          <td style="text-align:right;">$44.95</td>
        </tr>
        <tr>
          <td style="text-align:center;">Artist 2</td>
          <td>Album 2</td>
          <td style="text-align:right;">$13.99</td>
          <td style="text-align:center;">7</td>
          <td style="text-align:right;">$97.93</td>
        </tr>
        <tr>
          <td style="text-align:center;">Artist 3</td>
          <td>Album 3</td>
          <td style="text-align:right;">$11.34</td>
          <td style="text-align:center;">9</td>
          <td style="text-align:right;">$102.06</td>
        </tr>
        <tr>
          <td style="text-align:center;">Artist 4</td>
          <td>Album 4</td>
          <td style="text-align:right;">$10.54</td>
          <td style="text-align:center;">3</td>
          <td style="text-align:right;">$31.62</td>
        </tr>
        <tr>
          <td style="text-align:center;">Artist 5</td>
          <td>Album 5</td>
          <td style="text-align:right;">$10.64</td>
          <td style="text-align:center;">1</td>
          <td style="text-align:right;">$10.64</td>
        </tr>
        <tr>
          <td style="text-align:center;">Artist 6</td>
          <td>Album 6</td>
          <td style="text-align:right;">$8.99</td>
          <td style="text-align:center;">56</td>
          <td style="text-align:right;">$503.44</td>
        </tr>
        <tr>
          <td style="text-align:center;">Artist 7</td>
          <td>Album 7</td>
          <td style="text-align:right;">$9.99</td>
          <td style="text-align:center;">2</td>
          <td style="text-align:right;">$19.98</td>
        </tr>
        <tr>
          <td style="text-align:center;">Artist 8</td>
          <td>Album 8</td>
          <td style="text-align:right;">$12.49</td>
          <td style="text-align:center;">4</td>
          <td style="text-align:right;">$49.96</td>
        </tr>
        <tr>
          <td style="text-align:center;">Artist 9</td>
          <td>Album 9</td>
          <td style="text-align:right;">$7.99</td>
          <td style="text-align:center;">8</td>
          <td style="text-align:right;">$63.92</td>
        </tr>
        <tr>
          <td style="text-align:center;">Artist 10</td>
          <td>Album 10</td>
          <td style="text-align:right;">$15.00</td>
          <td style="text-align:center;">3</td>
          <td style="text-align:right;">$45.00</td>
        </tr>
        <tr>
          <td style="text-align:center;">...</td>
          <td>...</td>
          <td style="text-align:right;">...</td>
          <td style="text-align:center;">...</td>
          <td style="text-align:right;">...</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
`,v=`<div class="example17">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 17: Streaming Export with Images
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example17.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example17.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Streaming Excel export with images using the new Streaming API. Images must be provided in <code>base64</code>
        format.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Streaming Excel Export
    </button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"><span>A</span></th>
            <th scope="col"><span>B</span></th>
            <th scope="col"><span>C</span></th>
            <th scope="col"><span>D</span></th>
            <th scope="col"><span>E</span></th>
            <th scope="col"><span>F</span></th>
            <th scope="col"><span>G</span></th>
            <th scope="col"><span>H</span></th>
          </tr>
          <tr>
            <th scope="col" class="table-col">
              <span>Artist</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col" class="table-col">
              <span>Album</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col" class="table-col">
              <span>Price</span>
              <span class="fa fa-caret-square-o-down"></span>
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="table-cell">Buckethead</td>
            <td class="table-cell">Albino Slug</td>
            <td class="table-cell text-right">8.99</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class="table-cell">Buckethead</td>
            <td class="table-cell">Electric Tears</td>
            <td class="table-cell text-right">13.99</td>
            <td></td>
            <td></td>
            <td colspan="2" rowspan="5"><img id="pic1" src="" height="150" width="150" alt="some images"></td>
          </tr>
          <tr>
            <td class="table-cell">Buckethead</td>
            <td class="table-cell">Colma</td>
            <td class="table-cell text-right">11.34</td>
          </tr>
          <tr>
            <td class="table-cell">Crystal Method</td>
            <td class="table-cell">Vegas</td>
            <td class="table-cell text-right">10.54</td>
          </tr>
          <tr>
            <td class="table-cell">Crystal Method</td>
            <td class="table-cell">Tweekend</td>
            <td class="table-cell text-right">10.64</td>
          </tr>
          <tr>
            <td class="table-cell">Crystal Method</td>
            <td class="table-cell">Divided By Night</td>
            <td class="table-cell text-right">8.99</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`,y=`<div class="example18">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 18: Create Charts
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example18.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example18.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Create multiple chart types (column, bar, line, pie, doughnut, scatter + stacked & percent stacked variants) and export them to an
        Excel file.
      </div>
    </div>
  </div>

  <div>
    <div class="mb-2">
      <button id="export-chart" type="button" class="btn btn-success btn-sm">
        <i class="fa fa-download"></i>
        Excel Export
      </button>
    </div>
    <div class="row">
      <div class="table-container col-sm-6">
        <div class="screenshot-wrapper mt-2">
          <h5 class="mb-2">Excel Preview (single sheet example)</h5>
          <p class="small text-muted mt-1">
            This screenshot shows one chart sheet only. The exported workbook includes every chart listed on the right.
          </p>
          <img id="chart-screenshot" alt="Chart" class="img-fluid rounded border" style="max-width:100%;height:auto;">
        </div>
      </div>
      <div class="col-sm-5 offset-sm-1 mt-2">
        <h5>Charts Created:</h5>
        <ul class="chart-list small mb-3">
          <li>Column</li>
          <li>Bar</li>
          <li>Line</li>
          <li>Pie</li>
          <li>Doughnut</li>
          <li>Scatter</li>
          <li>Column Stacked</li>
          <li>Bar Stacked</li>
          <li>Line Stacked</li>
          <li>Column % Stacked</li>
          <li>Bar % Stacked</li>
          <li>Line % Stacked</li>
        </ul>
        <p class="small text-muted">Each item becomes a worksheet with its own data table and chart.</p>
      </div>
    </div>
  </div>
</div>
`,b=`<div class="example19">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 19: Workbook Custom Functions (LAMBDA)
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a
              target="_blank"
              href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example19.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example19.ts"
              >ts</a
            >
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Define workbook names and Excel-native custom functions so formulas like
        <code>CUSTOMSUM(A2:C2)</code>
        evaluate in Excel 365 without #NAME?.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export-custom-function" type="button" class="btn btn-success btn-sm">
      <i class="fa fa-download"></i>
      Export For Excel (Custom Functions)
    </button>
    <button id="export-portable-values" type="button" class="btn btn-outline-secondary btn-sm ms-2">
      <i class="fa fa-download"></i>
      Export Portable (Excel &lt;2019/LibreOffice/OpenOffice)
    </button>
  </div>

  <div class="row">
    <div class="table-container col-sm-10">
      <h5 class="mb-2">Custom Function Logic</h5>
      <div class="card mb-3">
        <div class="card-body py-2">
          <pre class="mb-0"><code>TaxRate = 0.08
CUSTOMSUM(values) = SUM(values)
SAFEAVERAGE(values) = IF(COUNT(values)=0,0,AVERAGE(values))</code></pre>
        </div>
      </div>

      <h5 class="mb-2">1) Formula Text Exported To Excel</h5>
      <table class="table table-bordered table-sm">
        <thead>
          <tr>
            <th scope="col">Q1</th>
            <th scope="col">Q2</th>
            <th scope="col">Q3</th>
            <th scope="col">Total Formula</th>
            <th scope="col">Average Formula</th>
            <th scope="col">Tax Formula</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>120</td>
            <td>150</td>
            <td>170</td>
            <td>CUSTOMSUM(A2:C2)</td>
            <td>SAFEAVERAGE(A2:C2)</td>
            <td>D2*TaxRate</td>
          </tr>
          <tr>
            <td>90</td>
            <td>110</td>
            <td>95</td>
            <td>CUSTOMSUM(A3:C3)</td>
            <td>SAFEAVERAGE(A3:C3)</td>
            <td>D3*TaxRate</td>
          </tr>
          <tr>
            <td>210</td>
            <td>190</td>
            <td>230</td>
            <td>CUSTOMSUM(A4:C4)</td>
            <td>SAFEAVERAGE(A4:C4)</td>
            <td>D4*TaxRate</td>
          </tr>
        </tbody>
      </table>

      <h5 class="mb-2 mt-3">2) Expected Calculated Results In Excel</h5>
      <table class="table table-bordered table-sm">
        <thead>
          <tr>
            <th scope="col">Q1</th>
            <th scope="col">Q2</th>
            <th scope="col">Q3</th>
            <th scope="col">Total</th>
            <th scope="col">Average</th>
            <th scope="col">Tax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>120</td>
            <td>150</td>
            <td>170</td>
            <td>440</td>
            <td>146.6666667</td>
            <td>35.2</td>
          </tr>
          <tr>
            <td>90</td>
            <td>110</td>
            <td>95</td>
            <td>295</td>
            <td>98.33333333</td>
            <td>23.6</td>
          </tr>
          <tr>
            <td>210</td>
            <td>190</td>
            <td>230</td>
            <td>630</td>
            <td>210</td>
            <td>50.4</td>
          </tr>
        </tbody>
      </table>

      <p class="small text-muted mt-2 mb-0">
        Use the Excel export for native custom-function formulas (Excel 365+). Use the portable export to write precomputed values for Excel
        2019 or lower and suites that do not support Excel LAMBDA custom functions.
      </p>
    </div>
  </div>
</div>
`,x=`<div class="row mb-2">
  <div class="col-md-12 title-desc">
    <h2 class="bd-title">Getting Started</h2>
  </div>
</div>

<div class="content-text">
  <h3>Download</h3>
  <hr>

  <section>
    <h5>GitHub <i class="fa fa-link"></i></h5>
    <p><a href="https://github.com/ghiscoding/excel-builder-vanilla">https://github.com/ghiscoding/excel-builder-vanilla</a></p>
  </section>

  <section>
    <h5>CDN</h5>
    <p>
      <a href="https://www.jsdelivr.com/" target="__blank">jsDelivr</a>
      graciously provide CDNs for many JavaScript libraries including Excel-Builder-Vanilla. Just use the following CDN links.
    </p>

    <div style="background: #f7f7f7; padding: 10px">
      <pre>
&lt;script <span style="color:#207eb1">type</span>=&quot;<span style="color:#f06605">module</span>&quot;&gt;
  // ESM Module import
  <span style="color:#cf222e">import</span> excelBuilderVanilla <span style="color:#cf222e">from</span> <span style="color:#0a3069">'https://cdn.jsdelivr.net/npm/excel-builder-vanilla@5.0.0/+esm'</span>;
&lt;/script&gt;
</pre>
    </div>
  </section>

  <section>
    <h5>NPM</h5>
    <p>Install and manage Excel-Builder-Vanilla JavaScript using NPM.</p>

    <div style="background: #f7f7f7; padding: 10px">
      <pre>$ npm install excel-builder-vanilla</pre>
    </div>
  </section>

  <h5>ESM <code>import from</code></h5>
  <p>The library provides both CommonJS or ESM, see the example below:</p>
  <div style="background: #f7f7f7; padding: 10px">
    <pre>
// ESM
<span style="color:#cf222e">import</span> { createWorkbook } <span style="color:#cf222e">from</span> <span style="color:#00265f">'excel-builder-vanilla'</span>;

// use it
const artistWorkbook = <span style="color:#ce8601">createWorksheet</span>(); // or new Workbook();
const albumList = <span style="color:#009db2">artistWorkbook</span>.<span style="color:#ce8601">createWorksheet</span>({ <span style="color:#003c44">name</span>: <span style="color:#aa8202">'Artists'</span> })</span>;
<span style="color:#009db2">albumList</span>.<span style="color:#ce8601">setData</span>(this.originalData);
</pre>

    <h5>Legacy Versions</h5>
    <p>
      The project now ships as ESM-Only, if you still wish to use the legacy <code>&lt;script&gt;</code> standalone IIFE Script on the
      <code>window</code>
      object, then use the previous 4.x version.
    </p>
  </div>
</div>
`,S=`<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand mr-2 d-flex align-items-center" href="https://github.com/ghiscoding/excel-builder-vanilla">
      <img src="./github-mark-white.svg" alt="excel-builder-Vanilla" class="me-2" width="22">
      <span>Excel Builder Vanilla</span>
    </a>
    <div class="github-button-container">
      <a href="https://github.com/ghiscoding/excel-builder-vanilla">
        <img src="https://img.shields.io/github/stars/ghiscoding/excel-builder-vanilla?style=social" alt="GitHub stars">
      </a>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-target="#navbarContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse justify-content-end me-2">
      <ul class="navbar-nav"></ul>
    </div>
  </div>
</nav>

<div class="template-body">
  <div class="panel-wm">
    <section id="panel-left" class="panel-wm-left">
      <ul class="well nav nav-pills nav-stacked"><!-- All Example Routes --></ul>
    </section>

    <section class="panel-wm-content"></section>
  </div>
</div>
`,C=`bottom`,w=`right`,T=`left`,E=`auto`,D=[`top`,C,w,T],O=`start`,k=`clippingParents`,A=`viewport`,j=`popper`,M=`reference`,N=D.reduce(function(e,t){return e.concat([t+`-`+O,t+`-end`])},[]),P=[].concat(D,[E]).reduce(function(e,t){return e.concat([t,t+`-`+O,t+`-end`])},[]),F=`beforeRead`,ee=`read`,I=`afterRead`,te=`beforeMain`,ne=`main`,re=`afterMain`,L=`beforeWrite`,ie=`write`,ae=`afterWrite`,oe=[F,ee,I,te,ne,re,L,ie,ae];function R(e){return e?(e.nodeName||``).toLowerCase():null}function z(e){if(e==null)return window;if(e.toString()!==`[object Window]`){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function se(e){return e instanceof z(e).Element||e instanceof Element}function B(e){return e instanceof z(e).HTMLElement||e instanceof HTMLElement}function ce(e){return typeof ShadowRoot>`u`?!1:e instanceof z(e).ShadowRoot||e instanceof ShadowRoot}function le(e){var t=e.state;Object.keys(t.elements).forEach(function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},i=t.elements[e];!B(i)||!R(i)||(Object.assign(i.style,n),Object.keys(r).forEach(function(e){var t=r[e];t===!1?i.removeAttribute(e):i.setAttribute(e,t===!0?``:t)}))})}function ue(e){var t=e.state,n={popper:{position:t.options.strategy,left:`0`,top:`0`,margin:`0`},arrow:{position:`absolute`},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(e){var r=t.elements[e],i=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce(function(e,t){return e[t]=``,e},{});!B(r)||!R(r)||(Object.assign(r.style,a),Object.keys(i).forEach(function(e){r.removeAttribute(e)}))})}}var de={name:`applyStyles`,enabled:!0,phase:`write`,fn:le,effect:ue,requires:[`computeStyles`]};function fe(e){return e.split(`-`)[0]}var pe=Math.max,me=Math.min,he=Math.round;function ge(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(e){return e.brand+`/`+e.version}).join(` `):navigator.userAgent}function _e(){return!/^((?!chrome|android).)*safari/i.test(ge())}function ve(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),i=1,a=1;t&&B(e)&&(i=e.offsetWidth>0&&he(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&he(r.height)/e.offsetHeight||1);var o=(se(e)?z(e):window).visualViewport,s=!_e()&&n,c=(r.left+(s&&o?o.offsetLeft:0))/i,l=(r.top+(s&&o?o.offsetTop:0))/a,u=r.width/i,d=r.height/a;return{width:u,height:d,top:l,right:c+u,bottom:l+d,left:c,x:c,y:l}}function ye(e){var t=ve(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function be(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&ce(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function V(e){return z(e).getComputedStyle(e)}function xe(e){return[`table`,`td`,`th`].indexOf(R(e))>=0}function Se(e){return((se(e)?e.ownerDocument:e.document)||window.document).documentElement}function Ce(e){return R(e)===`html`?e:e.assignedSlot||e.parentNode||(ce(e)?e.host:null)||Se(e)}function we(e){return!B(e)||V(e).position===`fixed`?null:e.offsetParent}function Te(e){var t=/firefox/i.test(ge());if(/Trident/i.test(ge())&&B(e)&&V(e).position===`fixed`)return null;var n=Ce(e);for(ce(n)&&(n=n.host);B(n)&&[`html`,`body`].indexOf(R(n))<0;){var r=V(n);if(r.transform!==`none`||r.perspective!==`none`||r.contain===`paint`||[`transform`,`perspective`].indexOf(r.willChange)!==-1||t&&r.willChange===`filter`||t&&r.filter&&r.filter!==`none`)return n;n=n.parentNode}return null}function Ee(e){for(var t=z(e),n=we(e);n&&xe(n)&&V(n).position===`static`;)n=we(n);return n&&(R(n)===`html`||R(n)===`body`&&V(n).position===`static`)?t:n||Te(e)||t}function De(e){return[`top`,`bottom`].indexOf(e)>=0?`x`:`y`}function Oe(e,t,n){return pe(e,me(t,n))}function ke(e,t,n){var r=Oe(e,t,n);return r>n?n:r}function Ae(){return{top:0,right:0,bottom:0,left:0}}function je(e){return Object.assign({},Ae(),e)}function Me(e,t){return t.reduce(function(t,n){return t[n]=e,t},{})}var Ne=function(e,t){return e=typeof e==`function`?e(Object.assign({},t.rects,{placement:t.placement})):e,je(typeof e==`number`?Me(e,D):e)};function Pe(e){var t,n=e.state,r=e.name,i=e.options,a=n.elements.arrow,o=n.modifiersData.popperOffsets,s=fe(n.placement),c=De(s),l=[`left`,`right`].indexOf(s)>=0?`height`:`width`;if(!(!a||!o)){var u=Ne(i.padding,n),d=ye(a),f=c===`y`?`top`:T,p=c===`y`?C:w,m=n.rects.reference[l]+n.rects.reference[c]-o[c]-n.rects.popper[l],h=o[c]-n.rects.reference[c],g=Ee(a),_=g?c===`y`?g.clientHeight||0:g.clientWidth||0:0,v=m/2-h/2,y=u[f],b=_-d[l]-u[p],x=_/2-d[l]/2+v,S=Oe(y,x,b),E=c;n.modifiersData[r]=(t={},t[E]=S,t.centerOffset=S-x,t)}}function Fe(e){var t=e.state,n=e.options.element,r=n===void 0?`[data-popper-arrow]`:n;r!=null&&(typeof r==`string`&&(r=t.elements.popper.querySelector(r),!r)||be(t.elements.popper,r)&&(t.elements.arrow=r))}var Ie={name:`arrow`,enabled:!0,phase:`main`,fn:Pe,effect:Fe,requires:[`popperOffsets`],requiresIfExists:[`preventOverflow`]};function Le(e){return e.split(`-`)[1]}var Re={top:`auto`,right:`auto`,bottom:`auto`,left:`auto`};function ze(e,t){var n=e.x,r=e.y,i=t.devicePixelRatio||1;return{x:he(n*i)/i||0,y:he(r*i)/i||0}}function Be(e){var t,n=e.popper,r=e.popperRect,i=e.placement,a=e.variation,o=e.offsets,s=e.position,c=e.gpuAcceleration,l=e.adaptive,u=e.roundOffsets,d=e.isFixed,f=o.x,p=f===void 0?0:f,m=o.y,h=m===void 0?0:m,g=typeof u==`function`?u({x:p,y:h}):{x:p,y:h};p=g.x,h=g.y;var _=o.hasOwnProperty(`x`),v=o.hasOwnProperty(`y`),y=T,b=`top`,x=window;if(l){var S=Ee(n),E=`clientHeight`,D=`clientWidth`;if(S===z(n)&&(S=Se(n),V(S).position!==`static`&&s===`absolute`&&(E=`scrollHeight`,D=`scrollWidth`)),S=S,i===`top`||(i===`left`||i===`right`)&&a===`end`){b=C;var O=d&&S===x&&x.visualViewport?x.visualViewport.height:S[E];h-=O-r.height,h*=c?1:-1}if(i===`left`||(i===`top`||i===`bottom`)&&a===`end`){y=w;var k=d&&S===x&&x.visualViewport?x.visualViewport.width:S[D];p-=k-r.width,p*=c?1:-1}}var A=Object.assign({position:s},l&&Re),j=u===!0?ze({x:p,y:h},z(n)):{x:p,y:h};if(p=j.x,h=j.y,c){var M;return Object.assign({},A,(M={},M[b]=v?`0`:``,M[y]=_?`0`:``,M.transform=(x.devicePixelRatio||1)<=1?`translate(`+p+`px, `+h+`px)`:`translate3d(`+p+`px, `+h+`px, 0)`,M))}return Object.assign({},A,(t={},t[b]=v?h+`px`:``,t[y]=_?p+`px`:``,t.transform=``,t))}function Ve(e){var t=e.state,n=e.options,r=n.gpuAcceleration,i=r===void 0||r,a=n.adaptive,o=a===void 0||a,s=n.roundOffsets,c=s===void 0||s,l={placement:fe(t.placement),variation:Le(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i,isFixed:t.options.strategy===`fixed`};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Be(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:o,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Be(Object.assign({},l,{offsets:t.modifiersData.arrow,position:`absolute`,adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}var He={name:`computeStyles`,enabled:!0,phase:`beforeWrite`,fn:Ve,data:{}},Ue={passive:!0};function We(e){var t=e.state,n=e.instance,r=e.options,i=r.scroll,a=i===void 0||i,o=r.resize,s=o===void 0||o,c=z(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&l.forEach(function(e){e.addEventListener(`scroll`,n.update,Ue)}),s&&c.addEventListener(`resize`,n.update,Ue),function(){a&&l.forEach(function(e){e.removeEventListener(`scroll`,n.update,Ue)}),s&&c.removeEventListener(`resize`,n.update,Ue)}}var Ge={name:`eventListeners`,enabled:!0,phase:`write`,fn:function(){},effect:We,data:{}},Ke={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function qe(e){return e.replace(/left|right|bottom|top/g,function(e){return Ke[e]})}var Je={start:`end`,end:`start`};function Ye(e){return e.replace(/start|end/g,function(e){return Je[e]})}function Xe(e){var t=z(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Ze(e){return ve(Se(e)).left+Xe(e).scrollLeft}function Qe(e,t){var n=z(e),r=Se(e),i=n.visualViewport,a=r.clientWidth,o=r.clientHeight,s=0,c=0;if(i){a=i.width,o=i.height;var l=_e();(l||!l&&t===`fixed`)&&(s=i.offsetLeft,c=i.offsetTop)}return{width:a,height:o,x:s+Ze(e),y:c}}function $e(e){var t=Se(e),n=Xe(e),r=e.ownerDocument?.body,i=pe(t.scrollWidth,t.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),a=pe(t.scrollHeight,t.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0),o=-n.scrollLeft+Ze(e),s=-n.scrollTop;return V(r||t).direction===`rtl`&&(o+=pe(t.clientWidth,r?r.clientWidth:0)-i),{width:i,height:a,x:o,y:s}}function et(e){var t=V(e),n=t.overflow,r=t.overflowX,i=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+i+r)}function tt(e){return[`html`,`body`,`#document`].indexOf(R(e))>=0?e.ownerDocument.body:B(e)&&et(e)?e:tt(Ce(e))}function nt(e,t){t===void 0&&(t=[]);var n=tt(e),r=n===e.ownerDocument?.body,i=z(n),a=r?[i].concat(i.visualViewport||[],et(n)?n:[]):n,o=t.concat(a);return r?o:o.concat(nt(Ce(a)))}function rt(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function it(e,t){var n=ve(e,!1,t===`fixed`);return n.top+=e.clientTop,n.left+=e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function at(e,t,n){return t===`viewport`?rt(Qe(e,n)):se(t)?it(t,n):rt($e(Se(e)))}function ot(e){var t=nt(Ce(e)),n=[`absolute`,`fixed`].indexOf(V(e).position)>=0&&B(e)?Ee(e):e;return se(n)?t.filter(function(e){return se(e)&&be(e,n)&&R(e)!==`body`}):[]}function st(e,t,n,r){var i=t===`clippingParents`?ot(e):[].concat(t),a=[].concat(i,[n]),o=a[0],s=a.reduce(function(t,n){var i=at(e,n,r);return t.top=pe(i.top,t.top),t.right=me(i.right,t.right),t.bottom=me(i.bottom,t.bottom),t.left=pe(i.left,t.left),t},at(e,o,r));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function ct(e){var t=e.reference,n=e.element,r=e.placement,i=r?fe(r):null,a=r?Le(r):null,o=t.x+t.width/2-n.width/2,s=t.y+t.height/2-n.height/2,c;switch(i){case`top`:c={x:o,y:t.y-n.height};break;case C:c={x:o,y:t.y+t.height};break;case w:c={x:t.x+t.width,y:s};break;case T:c={x:t.x-n.width,y:s};break;default:c={x:t.x,y:t.y}}var l=i?De(i):null;if(l!=null){var u=l===`y`?`height`:`width`;switch(a){case O:c[l]=c[l]-(t[u]/2-n[u]/2);break;case`end`:c[l]=c[l]+(t[u]/2-n[u]/2)}}return c}function lt(e,t){t===void 0&&(t={});var n=t,r=n.placement,i=r===void 0?e.placement:r,a=n.strategy,o=a===void 0?e.strategy:a,s=n.boundary,c=s===void 0?k:s,l=n.rootBoundary,u=l===void 0?A:l,d=n.elementContext,f=d===void 0?j:d,p=n.altBoundary,m=p!==void 0&&p,h=n.padding,g=h===void 0?0:h,_=je(typeof g==`number`?Me(g,D):g),v=f===`popper`?M:j,y=e.rects.popper,b=e.elements[m?v:f],x=st(se(b)?b:b.contextElement||Se(e.elements.popper),c,u,o),S=ve(e.elements.reference),C=ct({reference:S,element:y,strategy:`absolute`,placement:i}),w=rt(Object.assign({},y,C)),T=f===`popper`?w:S,E={top:x.top-T.top+_.top,bottom:T.bottom-x.bottom+_.bottom,left:x.left-T.left+_.left,right:T.right-x.right+_.right},O=e.modifiersData.offset;if(f===`popper`&&O){var N=O[i];Object.keys(E).forEach(function(e){var t=[`right`,`bottom`].indexOf(e)>=0?1:-1,n=[`top`,`bottom`].indexOf(e)>=0?`y`:`x`;E[e]+=N[n]*t})}return E}function ut(e,t){t===void 0&&(t={});var n=t,r=n.placement,i=n.boundary,a=n.rootBoundary,o=n.padding,s=n.flipVariations,c=n.allowedAutoPlacements,l=c===void 0?P:c,u=Le(r),d=u?s?N:N.filter(function(e){return Le(e)===u}):D,f=d.filter(function(e){return l.indexOf(e)>=0});f.length===0&&(f=d);var p=f.reduce(function(t,n){return t[n]=lt(e,{placement:n,boundary:i,rootBoundary:a,padding:o})[fe(n)],t},{});return Object.keys(p).sort(function(e,t){return p[e]-p[t]})}function dt(e){if(fe(e)===`auto`)return[];var t=qe(e);return[Ye(e),t,Ye(t)]}function ft(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var i=n.mainAxis,a=i===void 0||i,o=n.altAxis,s=o===void 0||o,c=n.fallbackPlacements,l=n.padding,u=n.boundary,d=n.rootBoundary,f=n.altBoundary,p=n.flipVariations,m=p===void 0||p,h=n.allowedAutoPlacements,g=t.options.placement,_=fe(g)===g,v=c||(_||!m?[qe(g)]:dt(g)),y=[g].concat(v).reduce(function(e,n){return e.concat(fe(n)===`auto`?ut(t,{placement:n,boundary:u,rootBoundary:d,padding:l,flipVariations:m,allowedAutoPlacements:h}):n)},[]),b=t.rects.reference,x=t.rects.popper,S=new Map,E=!0,D=y[0],k=0;k<y.length;k++){var A=y[k],j=fe(A),M=Le(A)===O,N=[`top`,C].indexOf(j)>=0,P=N?`width`:`height`,F=lt(t,{placement:A,boundary:u,rootBoundary:d,altBoundary:f,padding:l}),ee=N?M?w:T:M?C:`top`;b[P]>x[P]&&(ee=qe(ee));var I=qe(ee),te=[];if(a&&te.push(F[j]<=0),s&&te.push(F[ee]<=0,F[I]<=0),te.every(function(e){return e})){D=A,E=!1;break}S.set(A,te)}if(E)for(var ne=m?3:1,re=function(e){var t=y.find(function(t){var n=S.get(t);if(n)return n.slice(0,e).every(function(e){return e})});if(t)return D=t,`break`},L=ne;L>0&&re(L)!==`break`;L--);t.placement!==D&&(t.modifiersData[r]._skip=!0,t.placement=D,t.reset=!0)}}var pt={name:`flip`,enabled:!0,phase:`main`,fn:ft,requiresIfExists:[`offset`],data:{_skip:!1}};function mt(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ht(e){return[`top`,w,C,T].some(function(t){return e[t]>=0})}function gt(e){var t=e.state,n=e.name,r=t.rects.reference,i=t.rects.popper,a=t.modifiersData.preventOverflow,o=lt(t,{elementContext:`reference`}),s=lt(t,{altBoundary:!0}),c=mt(o,r),l=mt(s,i,a),u=ht(c),d=ht(l);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:l,isReferenceHidden:u,hasPopperEscaped:d},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":d})}var _t={name:`hide`,enabled:!0,phase:`main`,requiresIfExists:[`preventOverflow`],fn:gt};function vt(e,t,n){var r=fe(e),i=[`left`,`top`].indexOf(r)>=0?-1:1,a=typeof n==`function`?n(Object.assign({},t,{placement:e})):n,o=a[0],s=a[1];return o||=0,s=(s||0)*i,[`left`,`right`].indexOf(r)>=0?{x:s,y:o}:{x:o,y:s}}function yt(e){var t=e.state,n=e.options,r=e.name,i=n.offset,a=i===void 0?[0,0]:i,o=P.reduce(function(e,n){return e[n]=vt(n,t.rects,a),e},{}),s=o[t.placement],c=s.x,l=s.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=l),t.modifiersData[r]=o}var bt={name:`offset`,enabled:!0,phase:`main`,requires:[`popperOffsets`],fn:yt};function xt(e){var t=e.state,n=e.name;t.modifiersData[n]=ct({reference:t.rects.reference,element:t.rects.popper,strategy:`absolute`,placement:t.placement})}var St={name:`popperOffsets`,enabled:!0,phase:`read`,fn:xt,data:{}};function Ct(e){return e===`x`?`y`:`x`}function wt(e){var t=e.state,n=e.options,r=e.name,i=n.mainAxis,a=i===void 0||i,o=n.altAxis,s=o!==void 0&&o,c=n.boundary,l=n.rootBoundary,u=n.altBoundary,d=n.padding,f=n.tether,p=f===void 0||f,m=n.tetherOffset,h=m===void 0?0:m,g=lt(t,{boundary:c,rootBoundary:l,padding:d,altBoundary:u}),_=fe(t.placement),v=Le(t.placement),y=!v,b=De(_),x=Ct(b),S=t.modifiersData.popperOffsets,E=t.rects.reference,D=t.rects.popper,O=typeof h==`function`?h(Object.assign({},t.rects,{placement:t.placement})):h,k=typeof O==`number`?{mainAxis:O,altAxis:O}:Object.assign({mainAxis:0,altAxis:0},O),A=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,j={x:0,y:0};if(S){if(a){var M=b===`y`?`top`:T,N=b===`y`?C:w,P=b===`y`?`height`:`width`,F=S[b],ee=F+g[M],I=F-g[N],te=p?-D[P]/2:0,ne=v===`start`?E[P]:D[P],re=v===`start`?-D[P]:-E[P],L=t.elements.arrow,ie=p&&L?ye(L):{width:0,height:0},ae=t.modifiersData[`arrow#persistent`]?t.modifiersData[`arrow#persistent`].padding:Ae(),oe=ae[M],R=ae[N],z=Oe(0,E[P],ie[P]),se=y?E[P]/2-te-z-oe-k.mainAxis:ne-z-oe-k.mainAxis,B=y?-E[P]/2+te+z+R+k.mainAxis:re+z+R+k.mainAxis,ce=t.elements.arrow&&Ee(t.elements.arrow),le=ce?b===`y`?ce.clientTop||0:ce.clientLeft||0:0,ue=A?.[b]??0,de=F+se-ue-le,he=F+B-ue,ge=Oe(p?me(ee,de):ee,F,p?pe(I,he):I);S[b]=ge,j[b]=ge-F}if(s){var _e=b===`x`?`top`:T,ve=b===`x`?C:w,be=S[x],V=x===`y`?`height`:`width`,xe=be+g[_e],Se=be-g[ve],Ce=[`top`,T].indexOf(_)!==-1,we=A?.[x]??0,Te=Ce?xe:be-E[V]-D[V]-we+k.altAxis,je=Ce?be+E[V]+D[V]-we-k.altAxis:Se,Me=p&&Ce?ke(Te,be,je):Oe(p?Te:xe,be,p?je:Se);S[x]=Me,j[x]=Me-be}t.modifiersData[r]=j}}var Tt={name:`preventOverflow`,enabled:!0,phase:`main`,fn:wt,requiresIfExists:[`offset`]};function Et(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Dt(e){return e===z(e)||!B(e)?Xe(e):Et(e)}function Ot(e){var t=e.getBoundingClientRect(),n=he(t.width)/e.offsetWidth||1,r=he(t.height)/e.offsetHeight||1;return n!==1||r!==1}function kt(e,t,n){n===void 0&&(n=!1);var r=B(t),i=B(t)&&Ot(t),a=Se(t),o=ve(e,i,n),s={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((R(t)!==`body`||et(a))&&(s=Dt(t)),B(t)?(c=ve(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):a&&(c.x=Ze(a))),{x:o.left+s.scrollLeft-c.x,y:o.top+s.scrollTop-c.y,width:o.width,height:o.height}}function At(e){var t=new Map,n=new Set,r=[];e.forEach(function(e){t.set(e.name,e)});function i(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach(function(e){if(!n.has(e)){var r=t.get(e);r&&i(r)}}),r.push(e)}return e.forEach(function(e){n.has(e.name)||i(e)}),r}function jt(e){var t=At(e);return oe.reduce(function(e,n){return e.concat(t.filter(function(e){return e.phase===n}))},[])}function Mt(e){var t;return function(){return t||=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})}),t}}function Nt(e){var t=e.reduce(function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e},{});return Object.keys(t).map(function(e){return t[e]})}var Pt={placement:`bottom`,modifiers:[],strategy:`absolute`};function Ft(){return![...arguments].some(function(e){return!(e&&typeof e.getBoundingClientRect==`function`)})}function It(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,i=t.defaultOptions,a=i===void 0?Pt:i;return function(e,t,n){n===void 0&&(n=a);var i={placement:`bottom`,orderedModifiers:[],options:Object.assign({},Pt,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},o=[],s=!1,c={state:i,setOptions:function(n){var o=typeof n==`function`?n(i.options):n;u(),i.options=Object.assign({},a,i.options,o),i.scrollParents={reference:se(e)?nt(e):e.contextElement?nt(e.contextElement):[],popper:nt(t)};var s=jt(Nt([].concat(r,i.options.modifiers)));return i.orderedModifiers=s.filter(function(e){return e.enabled}),l(),c.update()},forceUpdate:function(){if(!s){var e=i.elements,t=e.reference,n=e.popper;if(Ft(t,n)){i.rects={reference:kt(t,Ee(n),i.options.strategy===`fixed`),popper:ye(n)},i.reset=!1,i.placement=i.options.placement,i.orderedModifiers.forEach(function(e){return i.modifiersData[e.name]=Object.assign({},e.data)});for(var r=0;r<i.orderedModifiers.length;r++){if(i.reset===!0){i.reset=!1,r=-1;continue}var a=i.orderedModifiers[r],o=a.fn,l=a.options,u=l===void 0?{}:l,d=a.name;typeof o==`function`&&(i=o({state:i,options:u,name:d,instance:c})||i)}}}},update:Mt(function(){return new Promise(function(e){c.forceUpdate(),e(i)})}),destroy:function(){u(),s=!0}};if(!Ft(e,t))return c;c.setOptions(n).then(function(e){!s&&n.onFirstUpdate&&n.onFirstUpdate(e)});function l(){i.orderedModifiers.forEach(function(e){var t=e.name,n=e.options,r=n===void 0?{}:n,a=e.effect;if(typeof a==`function`){var s=a({state:i,name:t,instance:c,options:r});o.push(s||function(){})}})}function u(){o.forEach(function(e){return e()}),o=[]}return c}}var Lt=It(),Rt=It({defaultModifiers:[Ge,St,He,de]}),zt=It({defaultModifiers:[Ge,St,He,de,bt,pt,Tt,Ie,_t]}),Bt=t({afterMain:()=>re,afterRead:()=>I,afterWrite:()=>ae,applyStyles:()=>de,arrow:()=>Ie,auto:()=>E,basePlacements:()=>D,beforeMain:()=>te,beforeRead:()=>F,beforeWrite:()=>L,bottom:()=>C,clippingParents:()=>k,computeStyles:()=>He,createPopper:()=>zt,createPopperBase:()=>Lt,createPopperLite:()=>Rt,detectOverflow:()=>lt,end:()=>`end`,eventListeners:()=>Ge,flip:()=>pt,hide:()=>_t,left:()=>T,main:()=>ne,modifierPhases:()=>oe,offset:()=>bt,placements:()=>P,popper:()=>j,popperGenerator:()=>It,popperOffsets:()=>St,preventOverflow:()=>Tt,read:()=>ee,reference:()=>M,right:()=>w,start:()=>O,top:()=>`top`,variationPlacements:()=>N,viewport:()=>A,write:()=>ie}),Vt=new Map,Ht={set(e,t,n){Vt.has(e)||Vt.set(e,new Map);let r=Vt.get(e);if(!r.has(t)&&r.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);return}r.set(t,n)},get(e,t){return Vt.has(e)&&Vt.get(e).get(t)||null},remove(e,t){if(!Vt.has(e))return;let n=Vt.get(e);n.delete(t),n.size===0&&Vt.delete(e)}},Ut=1e6,Wt=1e3,Gt=`transitionend`,Kt=e=>(e&&window.CSS&&window.CSS.escape&&(e=e.replace(/#([^\s"#']+)/g,(e,t)=>`#${CSS.escape(t)}`)),e),qt=e=>e==null?`${e}`:Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(),Jt=e=>{do e+=Math.floor(Math.random()*Ut);while(document.getElementById(e));return e},Yt=e=>{if(!e)return 0;let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e);return!Number.parseFloat(t)&&!Number.parseFloat(n)?0:(t=t.split(`,`)[0],n=n.split(`,`)[0],(Number.parseFloat(t)+Number.parseFloat(n))*Wt)},Xt=e=>{e.dispatchEvent(new Event(Gt))},Zt=e=>!e||typeof e!=`object`?!1:(e.jquery!==void 0&&(e=e[0]),e.nodeType!==void 0),Qt=e=>Zt(e)?e.jquery?e[0]:e:typeof e==`string`&&e.length>0?document.querySelector(Kt(e)):null,$t=e=>{if(!Zt(e)||e.getClientRects().length===0)return!1;let t=getComputedStyle(e).getPropertyValue(`visibility`)===`visible`,n=e.closest(`details:not([open])`);if(!n)return t;if(n!==e){let t=e.closest(`summary`);if(t&&t.parentNode!==n||t===null)return!1}return t},en=e=>!e||e.nodeType!==Node.ELEMENT_NODE||e.classList.contains(`disabled`)?!0:e.disabled===void 0?e.hasAttribute(`disabled`)&&e.getAttribute(`disabled`)!==`false`:e.disabled,tn=e=>{if(!document.documentElement.attachShadow)return null;if(typeof e.getRootNode==`function`){let t=e.getRootNode();return t instanceof ShadowRoot?t:null}return e instanceof ShadowRoot?e:e.parentNode?tn(e.parentNode):null},nn=()=>{},rn=e=>{e.offsetHeight},an=()=>window.jQuery&&!document.body.hasAttribute(`data-bs-no-jquery`)?window.jQuery:null,on=[],sn=e=>{document.readyState===`loading`?(on.length||document.addEventListener(`DOMContentLoaded`,()=>{for(let e of on)e()}),on.push(e)):e()},H=()=>document.documentElement.dir===`rtl`,cn=e=>{sn(()=>{let t=an();if(t){let n=e.NAME,r=t.fn[n];t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=r,e.jQueryInterface)}})},U=(e,t=[],n=e)=>typeof e==`function`?e.call(...t):n,ln=(e,t,n=!0)=>{if(!n){U(e);return}let r=Yt(t)+5,i=!1,a=({target:n})=>{n===t&&(i=!0,t.removeEventListener(Gt,a),U(e))};t.addEventListener(Gt,a),setTimeout(()=>{i||Xt(t)},r)},un=(e,t,n,r)=>{let i=e.length,a=e.indexOf(t);return a===-1?!n&&r?e[i-1]:e[0]:(a+=n?1:-1,r&&(a=(a+i)%i),e[Math.max(0,Math.min(a,i-1))])},dn=/[^.]*(?=\..*)\.|.*/,fn=/\..*/,pn=/::\d+$/,mn={},hn=1,gn={mouseenter:`mouseover`,mouseleave:`mouseout`},_n=new Set(`click.dblclick.mouseup.mousedown.contextmenu.mousewheel.DOMMouseScroll.mouseover.mouseout.mousemove.selectstart.selectend.keydown.keypress.keyup.orientationchange.touchstart.touchmove.touchend.touchcancel.pointerdown.pointermove.pointerup.pointerleave.pointercancel.gesturestart.gesturechange.gestureend.focus.blur.change.reset.select.submit.focusin.focusout.load.unload.beforeunload.resize.move.DOMContentLoaded.readystatechange.error.abort.scroll`.split(`.`));function vn(e,t){return t&&`${t}::${hn++}`||e.uidEvent||hn++}function yn(e){let t=vn(e);return e.uidEvent=t,mn[t]=mn[t]||{},mn[t]}function bn(e,t){return function n(r){return On(r,{delegateTarget:e}),n.oneOff&&W.off(e,r.type,t),t.apply(e,[r])}}function xn(e,t,n){return function r(i){let a=e.querySelectorAll(t);for(let{target:o}=i;o&&o!==this;o=o.parentNode)for(let s of a)if(s===o)return On(i,{delegateTarget:o}),r.oneOff&&W.off(e,i.type,t,n),n.apply(o,[i])}}function Sn(e,t,n=null){return Object.values(e).find(e=>e.callable===t&&e.delegationSelector===n)}function Cn(e,t,n){let r=typeof t==`string`,i=r?n:t||n,a=Dn(e);return _n.has(a)||(a=e),[r,i,a]}function wn(e,t,n,r,i){if(typeof t!=`string`||!e)return;let[a,o,s]=Cn(t,n,r);t in gn&&(o=(e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)})(o));let c=yn(e),l=c[s]||(c[s]={}),u=Sn(l,o,a?n:null);if(u){u.oneOff=u.oneOff&&i;return}let d=vn(o,t.replace(dn,``)),f=a?xn(e,n,o):bn(e,o);f.delegationSelector=a?n:null,f.callable=o,f.oneOff=i,f.uidEvent=d,l[d]=f,e.addEventListener(s,f,a)}function Tn(e,t,n,r,i){let a=Sn(t[n],r,i);a&&(e.removeEventListener(n,a,!!i),delete t[n][a.uidEvent])}function En(e,t,n,r){let i=t[n]||{};for(let[a,o]of Object.entries(i))a.includes(r)&&Tn(e,t,n,o.callable,o.delegationSelector)}function Dn(e){return e=e.replace(fn,``),gn[e]||e}var W={on(e,t,n,r){wn(e,t,n,r,!1)},one(e,t,n,r){wn(e,t,n,r,!0)},off(e,t,n,r){if(typeof t!=`string`||!e)return;let[i,a,o]=Cn(t,n,r),s=o!==t,c=yn(e),l=c[o]||{},u=t.startsWith(`.`);if(a!==void 0){if(!Object.keys(l).length)return;Tn(e,c,o,a,i?n:null);return}if(u)for(let n of Object.keys(c))En(e,c,n,t.slice(1));for(let[n,r]of Object.entries(l)){let i=n.replace(pn,``);(!s||t.includes(i))&&Tn(e,c,o,r.callable,r.delegationSelector)}},trigger(e,t,n){if(typeof t!=`string`||!e)return null;let r=an(),i=t!==Dn(t),a=null,o=!0,s=!0,c=!1;i&&r&&(a=r.Event(t,n),r(e).trigger(a),o=!a.isPropagationStopped(),s=!a.isImmediatePropagationStopped(),c=a.isDefaultPrevented());let l=On(new Event(t,{bubbles:o,cancelable:!0}),n);return c&&l.preventDefault(),s&&e.dispatchEvent(l),l.defaultPrevented&&a&&a.preventDefault(),l}};function On(e,t={}){for(let[n,r]of Object.entries(t))try{e[n]=r}catch{Object.defineProperty(e,n,{configurable:!0,get(){return r}})}return e}function kn(e){if(e===`true`)return!0;if(e===`false`)return!1;if(e===Number(e).toString())return Number(e);if(e===``||e===`null`)return null;if(typeof e!=`string`)return e;try{return JSON.parse(decodeURIComponent(e))}catch{return e}}function An(e){return e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}var jn={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${An(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${An(t)}`)},getDataAttributes(e){if(!e)return{};let t={},n=Object.keys(e.dataset).filter(e=>e.startsWith(`bs`)&&!e.startsWith(`bsConfig`));for(let r of n){let n=r.replace(/^bs/,``);n=n.charAt(0).toLowerCase()+n.slice(1),t[n]=kn(e.dataset[r])}return t},getDataAttribute(e,t){return kn(e.getAttribute(`data-bs-${An(t)}`))}},Mn=class{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw Error(`You have to implement the static method "NAME", for each component!`)}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(e,t){let n=Zt(t)?jn.getDataAttribute(t,`config`):{};return{...this.constructor.Default,...typeof n==`object`?n:{},...Zt(t)?jn.getDataAttributes(t):{},...typeof e==`object`?e:{}}}_typeCheckConfig(e,t=this.constructor.DefaultType){for(let[n,r]of Object.entries(t)){let t=e[n],i=Zt(t)?`element`:qt(t);if(!new RegExp(r).test(i))throw TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${i}" but expected type "${r}".`)}}},Nn=`5.3.8`,Pn=class extends Mn{constructor(e,t){super(),e=Qt(e),e&&(this._element=e,this._config=this._getConfig(t),Ht.set(this._element,this.constructor.DATA_KEY,this))}dispose(){Ht.remove(this._element,this.constructor.DATA_KEY),W.off(this._element,this.constructor.EVENT_KEY);for(let e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,n=!0){ln(e,t,n)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(e){return Ht.get(Qt(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,typeof t==`object`?t:null)}static get VERSION(){return Nn}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}},Fn=e=>{let t=e.getAttribute(`data-bs-target`);if(!t||t===`#`){let n=e.getAttribute(`href`);if(!n||!n.includes(`#`)&&!n.startsWith(`.`))return null;n.includes(`#`)&&!n.startsWith(`#`)&&(n=`#${n.split(`#`)[1]}`),t=n&&n!==`#`?n.trim():null}return t?t.split(`,`).map(e=>Kt(e)).join(`,`):null},G={find(e,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,e))},findOne(e,t=document.documentElement){return Element.prototype.querySelector.call(t,e)},children(e,t){return[].concat(...e.children).filter(e=>e.matches(t))},parents(e,t){let n=[],r=e.parentNode.closest(t);for(;r;)n.push(r),r=r.parentNode.closest(t);return n},prev(e,t){let n=e.previousElementSibling;for(;n;){if(n.matches(t))return[n];n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling;for(;n;){if(n.matches(t))return[n];n=n.nextElementSibling}return[]},focusableChildren(e){let t=[`a`,`button`,`input`,`textarea`,`select`,`details`,`[tabindex]`,`[contenteditable="true"]`].map(e=>`${e}:not([tabindex^="-"])`).join(`,`);return this.find(t,e).filter(e=>!en(e)&&$t(e))},getSelectorFromElement(e){let t=Fn(e);return t&&G.findOne(t)?t:null},getElementFromSelector(e){let t=Fn(e);return t?G.findOne(t):null},getMultipleElementsFromSelector(e){let t=Fn(e);return t?G.find(t):[]}},In=(e,t=`hide`)=>{let n=`click.dismiss${e.EVENT_KEY}`,r=e.NAME;W.on(document,n,`[data-bs-dismiss="${r}"]`,function(n){if([`A`,`AREA`].includes(this.tagName)&&n.preventDefault(),en(this))return;let i=G.getElementFromSelector(this)||this.closest(`.${r}`);e.getOrCreateInstance(i)[t]()})},Ln=`alert`,Rn=`.bs.alert`,zn=`close${Rn}`,Bn=`closed${Rn}`,Vn=`fade`,Hn=`show`,Un=class e extends Pn{static get NAME(){return Ln}close(){if(W.trigger(this._element,zn).defaultPrevented)return;this._element.classList.remove(Hn);let e=this._element.classList.contains(Vn);this._queueCallback(()=>this._destroyElement(),this._element,e)}_destroyElement(){this._element.remove(),W.trigger(this._element,Bn),this.dispose()}static jQueryInterface(t){return this.each(function(){let n=e.getOrCreateInstance(this);if(typeof t==`string`){if(n[t]===void 0||t.startsWith(`_`)||t===`constructor`)throw TypeError(`No method named "${t}"`);n[t](this)}})}};In(Un,`close`),cn(Un);var Wn=`button`,Gn=`.bs.button`,Kn=`.data-api`,qn=`active`,Jn=`[data-bs-toggle="button"]`,Yn=`click${Gn}${Kn}`,Xn=class e extends Pn{static get NAME(){return Wn}toggle(){this._element.setAttribute(`aria-pressed`,this._element.classList.toggle(qn))}static jQueryInterface(t){return this.each(function(){let n=e.getOrCreateInstance(this);t===`toggle`&&n[t]()})}};W.on(document,Yn,Jn,e=>{e.preventDefault();let t=e.target.closest(Jn);Xn.getOrCreateInstance(t).toggle()}),cn(Xn);var Zn=`swipe`,Qn=`.bs.swipe`,$n=`touchstart${Qn}`,er=`touchmove${Qn}`,tr=`touchend${Qn}`,nr=`pointerdown${Qn}`,rr=`pointerup${Qn}`,ir=`touch`,ar=`pen`,or=`pointer-event`,sr=40,cr={endCallback:null,leftCallback:null,rightCallback:null},lr={endCallback:`(function|null)`,leftCallback:`(function|null)`,rightCallback:`(function|null)`},ur=class e extends Mn{constructor(t,n){super(),this._element=t,!(!t||!e.isSupported())&&(this._config=this._getConfig(n),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return cr}static get DefaultType(){return lr}static get NAME(){return Zn}dispose(){W.off(this._element,Qn)}_start(e){if(!this._supportPointerEvents){this._deltaX=e.touches[0].clientX;return}this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX)}_end(e){this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX-this._deltaX),this._handleSwipe(),U(this._config.endCallback)}_move(e){this._deltaX=e.touches&&e.touches.length>1?0:e.touches[0].clientX-this._deltaX}_handleSwipe(){let e=Math.abs(this._deltaX);if(e<=sr)return;let t=e/this._deltaX;this._deltaX=0,t&&U(t>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(W.on(this._element,nr,e=>this._start(e)),W.on(this._element,rr,e=>this._end(e)),this._element.classList.add(or)):(W.on(this._element,$n,e=>this._start(e)),W.on(this._element,er,e=>this._move(e)),W.on(this._element,tr,e=>this._end(e)))}_eventIsPointerPenTouch(e){return this._supportPointerEvents&&(e.pointerType===ar||e.pointerType===ir)}static isSupported(){return`ontouchstart`in document.documentElement||navigator.maxTouchPoints>0}},dr=`carousel`,fr=`.bs.carousel`,pr=`.data-api`,mr=`ArrowLeft`,hr=`ArrowRight`,gr=500,_r=`next`,vr=`prev`,yr=`left`,br=`right`,xr=`slide${fr}`,Sr=`slid${fr}`,Cr=`keydown${fr}`,wr=`mouseenter${fr}`,Tr=`mouseleave${fr}`,Er=`dragstart${fr}`,Dr=`load${fr}${pr}`,Or=`click${fr}${pr}`,kr=`carousel`,Ar=`active`,jr=`slide`,Mr=`carousel-item-end`,Nr=`carousel-item-start`,Pr=`carousel-item-next`,Fr=`carousel-item-prev`,Ir=`.active`,Lr=`.carousel-item`,Rr=`.active.carousel-item`,zr=`.carousel-item img`,Br=`.carousel-indicators`,Vr=`[data-bs-slide], [data-bs-slide-to]`,Hr=`[data-bs-ride="carousel"]`,Ur={[mr]:br,[hr]:yr},Wr={interval:5e3,keyboard:!0,pause:`hover`,ride:!1,touch:!0,wrap:!0},Gr={interval:`(number|boolean)`,keyboard:`boolean`,pause:`(string|boolean)`,ride:`(boolean|string)`,touch:`boolean`,wrap:`boolean`},Kr=class e extends Pn{constructor(e,t){super(e,t),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=G.findOne(Br,this._element),this._addEventListeners(),this._config.ride===kr&&this.cycle()}static get Default(){return Wr}static get DefaultType(){return Gr}static get NAME(){return dr}next(){this._slide(_r)}nextWhenVisible(){!document.hidden&&$t(this._element)&&this.next()}prev(){this._slide(vr)}pause(){this._isSliding&&Xt(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){if(this._config.ride){if(this._isSliding){W.one(this._element,Sr,()=>this.cycle());return}this.cycle()}}to(e){let t=this._getItems();if(e>t.length-1||e<0)return;if(this._isSliding){W.one(this._element,Sr,()=>this.to(e));return}let n=this._getItemIndex(this._getActive());if(n===e)return;let r=e>n?_r:vr;this._slide(r,t[e])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(e){return e.defaultInterval=e.interval,e}_addEventListeners(){this._config.keyboard&&W.on(this._element,Cr,e=>this._keydown(e)),this._config.pause===`hover`&&(W.on(this._element,wr,()=>this.pause()),W.on(this._element,Tr,()=>this._maybeEnableCycle())),this._config.touch&&ur.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(let e of G.find(zr,this._element))W.on(e,Er,e=>e.preventDefault());let e={leftCallback:()=>this._slide(this._directionToOrder(yr)),rightCallback:()=>this._slide(this._directionToOrder(br)),endCallback:()=>{this._config.pause===`hover`&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),gr+this._config.interval))}};this._swipeHelper=new ur(this._element,e)}_keydown(e){if(/input|textarea/i.test(e.target.tagName))return;let t=Ur[e.key];t&&(e.preventDefault(),this._slide(this._directionToOrder(t)))}_getItemIndex(e){return this._getItems().indexOf(e)}_setActiveIndicatorElement(e){if(!this._indicatorsElement)return;let t=G.findOne(Ir,this._indicatorsElement);t.classList.remove(Ar),t.removeAttribute(`aria-current`);let n=G.findOne(`[data-bs-slide-to="${e}"]`,this._indicatorsElement);n&&(n.classList.add(Ar),n.setAttribute(`aria-current`,`true`))}_updateInterval(){let e=this._activeElement||this._getActive();if(!e)return;let t=Number.parseInt(e.getAttribute(`data-bs-interval`),10);this._config.interval=t||this._config.defaultInterval}_slide(e,t=null){if(this._isSliding)return;let n=this._getActive(),r=e===_r,i=t||un(this._getItems(),n,r,this._config.wrap);if(i===n)return;let a=this._getItemIndex(i),o=t=>W.trigger(this._element,t,{relatedTarget:i,direction:this._orderToDirection(e),from:this._getItemIndex(n),to:a});if(o(xr).defaultPrevented||!n||!i)return;let s=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(a),this._activeElement=i;let c=r?Nr:Mr,l=r?Pr:Fr;i.classList.add(l),rn(i),n.classList.add(c),i.classList.add(c),this._queueCallback(()=>{i.classList.remove(c,l),i.classList.add(Ar),n.classList.remove(Ar,l,c),this._isSliding=!1,o(Sr)},n,this._isAnimated()),s&&this.cycle()}_isAnimated(){return this._element.classList.contains(jr)}_getActive(){return G.findOne(Rr,this._element)}_getItems(){return G.find(Lr,this._element)}_clearInterval(){this._interval&&=(clearInterval(this._interval),null)}_directionToOrder(e){return H()?e===yr?vr:_r:e===yr?_r:vr}_orderToDirection(e){return H()?e===vr?yr:br:e===vr?br:yr}static jQueryInterface(t){return this.each(function(){let n=e.getOrCreateInstance(this,t);if(typeof t==`number`){n.to(t);return}if(typeof t==`string`){if(n[t]===void 0||t.startsWith(`_`)||t===`constructor`)throw TypeError(`No method named "${t}"`);n[t]()}})}};W.on(document,Or,Vr,function(e){let t=G.getElementFromSelector(this);if(!t||!t.classList.contains(kr))return;e.preventDefault();let n=Kr.getOrCreateInstance(t),r=this.getAttribute(`data-bs-slide-to`);if(r){n.to(r),n._maybeEnableCycle();return}if(jn.getDataAttribute(this,`slide`)===`next`){n.next(),n._maybeEnableCycle();return}n.prev(),n._maybeEnableCycle()}),W.on(window,Dr,()=>{let e=G.find(Hr);for(let t of e)Kr.getOrCreateInstance(t)}),cn(Kr);var qr=`collapse`,Jr=`.bs.collapse`,Yr=`.data-api`,Xr=`show${Jr}`,Zr=`shown${Jr}`,Qr=`hide${Jr}`,$r=`hidden${Jr}`,ei=`click${Jr}${Yr}`,ti=`show`,ni=`collapse`,ri=`collapsing`,ii=`collapsed`,ai=`:scope .${ni} .${ni}`,oi=`collapse-horizontal`,si=`width`,ci=`height`,li=`.collapse.show, .collapse.collapsing`,ui=`[data-bs-toggle="collapse"]`,di={parent:null,toggle:!0},fi={parent:`(null|element)`,toggle:`boolean`},pi=class e extends Pn{constructor(e,t){super(e,t),this._isTransitioning=!1,this._triggerArray=[];let n=G.find(ui);for(let e of n){let t=G.getSelectorFromElement(e),n=G.find(t).filter(e=>e===this._element);t!==null&&n.length&&this._triggerArray.push(e)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return di}static get DefaultType(){return fi}static get NAME(){return qr}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(li).filter(e=>e!==this._element).map(t=>e.getOrCreateInstance(t,{toggle:!1}))),t.length&&t[0]._isTransitioning||W.trigger(this._element,Xr).defaultPrevented)return;for(let e of t)e.hide();let n=this._getDimension();this._element.classList.remove(ni),this._element.classList.add(ri),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;let r=()=>{this._isTransitioning=!1,this._element.classList.remove(ri),this._element.classList.add(ni,ti),this._element.style[n]=``,W.trigger(this._element,Zr)},i=`scroll${n[0].toUpperCase()+n.slice(1)}`;this._queueCallback(r,this._element,!0),this._element.style[n]=`${this._element[i]}px`}hide(){if(this._isTransitioning||!this._isShown()||W.trigger(this._element,Qr).defaultPrevented)return;let e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,rn(this._element),this._element.classList.add(ri),this._element.classList.remove(ni,ti);for(let e of this._triggerArray){let t=G.getElementFromSelector(e);t&&!this._isShown(t)&&this._addAriaAndCollapsedClass([e],!1)}this._isTransitioning=!0;let t=()=>{this._isTransitioning=!1,this._element.classList.remove(ri),this._element.classList.add(ni),W.trigger(this._element,$r)};this._element.style[e]=``,this._queueCallback(t,this._element,!0)}_isShown(e=this._element){return e.classList.contains(ti)}_configAfterMerge(e){return e.toggle=!!e.toggle,e.parent=Qt(e.parent),e}_getDimension(){return this._element.classList.contains(oi)?si:ci}_initializeChildren(){if(!this._config.parent)return;let e=this._getFirstLevelChildren(ui);for(let t of e){let e=G.getElementFromSelector(t);e&&this._addAriaAndCollapsedClass([t],this._isShown(e))}}_getFirstLevelChildren(e){let t=G.find(ai,this._config.parent);return G.find(e,this._config.parent).filter(e=>!t.includes(e))}_addAriaAndCollapsedClass(e,t){if(e.length)for(let n of e)n.classList.toggle(ii,!t),n.setAttribute(`aria-expanded`,t)}static jQueryInterface(t){let n={};return typeof t==`string`&&/show|hide/.test(t)&&(n.toggle=!1),this.each(function(){let r=e.getOrCreateInstance(this,n);if(typeof t==`string`){if(r[t]===void 0)throw TypeError(`No method named "${t}"`);r[t]()}})}};W.on(document,ei,ui,function(e){(e.target.tagName===`A`||e.delegateTarget&&e.delegateTarget.tagName===`A`)&&e.preventDefault();for(let e of G.getMultipleElementsFromSelector(this))pi.getOrCreateInstance(e,{toggle:!1}).toggle()}),cn(pi);var mi=`dropdown`,hi=`.bs.dropdown`,gi=`.data-api`,_i=`Escape`,vi=`Tab`,yi=`ArrowUp`,bi=`ArrowDown`,xi=2,Si=`hide${hi}`,Ci=`hidden${hi}`,wi=`show${hi}`,Ti=`shown${hi}`,Ei=`click${hi}${gi}`,Di=`keydown${hi}${gi}`,Oi=`keyup${hi}${gi}`,ki=`show`,Ai=`dropup`,ji=`dropend`,Mi=`dropstart`,Ni=`dropup-center`,Pi=`dropdown-center`,Fi=`[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)`,Ii=`${Fi}.${ki}`,Li=`.dropdown-menu`,Ri=`.navbar`,zi=`.navbar-nav`,Bi=`.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)`,Vi=H()?`top-end`:`top-start`,Hi=H()?`top-start`:`top-end`,Ui=H()?`bottom-end`:`bottom-start`,Wi=H()?`bottom-start`:`bottom-end`,Gi=H()?`left-start`:`right-start`,Ki=H()?`right-start`:`left-start`,qi=`top`,Ji=`bottom`,Yi={autoClose:!0,boundary:`clippingParents`,display:`dynamic`,offset:[0,2],popperConfig:null,reference:`toggle`},Xi={autoClose:`(boolean|string)`,boundary:`(string|element)`,display:`string`,offset:`(array|string|function)`,popperConfig:`(null|object|function)`,reference:`(string|element|object)`},Zi=class e extends Pn{constructor(e,t){super(e,t),this._popper=null,this._parent=this._element.parentNode,this._menu=G.next(this._element,Li)[0]||G.prev(this._element,Li)[0]||G.findOne(Li,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return Yi}static get DefaultType(){return Xi}static get NAME(){return mi}toggle(){return this._isShown()?this.hide():this.show()}show(){if(en(this._element)||this._isShown())return;let e={relatedTarget:this._element};if(!W.trigger(this._element,wi,e).defaultPrevented){if(this._createPopper(),`ontouchstart`in document.documentElement&&!this._parent.closest(zi))for(let e of[].concat(...document.body.children))W.on(e,`mouseover`,nn);this._element.focus(),this._element.setAttribute(`aria-expanded`,!0),this._menu.classList.add(ki),this._element.classList.add(ki),W.trigger(this._element,Ti,e)}}hide(){if(en(this._element)||!this._isShown())return;let e={relatedTarget:this._element};this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(e){if(!W.trigger(this._element,Si,e).defaultPrevented){if(`ontouchstart`in document.documentElement)for(let e of[].concat(...document.body.children))W.off(e,`mouseover`,nn);this._popper&&this._popper.destroy(),this._menu.classList.remove(ki),this._element.classList.remove(ki),this._element.setAttribute(`aria-expanded`,`false`),jn.removeDataAttribute(this._menu,`popper`),W.trigger(this._element,Ci,e)}}_getConfig(e){if(e=super._getConfig(e),typeof e.reference==`object`&&!Zt(e.reference)&&typeof e.reference.getBoundingClientRect!=`function`)throw TypeError(`${mi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return e}_createPopper(){if(Bt===void 0)throw TypeError(`Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)`);let e=this._element;this._config.reference===`parent`?e=this._parent:Zt(this._config.reference)?e=Qt(this._config.reference):typeof this._config.reference==`object`&&(e=this._config.reference);let t=this._getPopperConfig();this._popper=zt(e,this._menu,t)}_isShown(){return this._menu.classList.contains(ki)}_getPlacement(){let e=this._parent;if(e.classList.contains(ji))return Gi;if(e.classList.contains(Mi))return Ki;if(e.classList.contains(Ni))return qi;if(e.classList.contains(Pi))return Ji;let t=getComputedStyle(this._menu).getPropertyValue(`--bs-position`).trim()===`end`;return e.classList.contains(Ai)?t?Hi:Vi:t?Wi:Ui}_detectNavbar(){return this._element.closest(Ri)!==null}_getOffset(){let{offset:e}=this._config;return typeof e==`string`?e.split(`,`).map(e=>Number.parseInt(e,10)):typeof e==`function`?t=>e(t,this._element):e}_getPopperConfig(){let e={placement:this._getPlacement(),modifiers:[{name:`preventOverflow`,options:{boundary:this._config.boundary}},{name:`offset`,options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display===`static`)&&(jn.setDataAttribute(this._menu,`popper`,`static`),e.modifiers=[{name:`applyStyles`,enabled:!1}]),{...e,...U(this._config.popperConfig,[void 0,e])}}_selectMenuItem({key:e,target:t}){let n=G.find(Bi,this._menu).filter(e=>$t(e));n.length&&un(n,t,e===bi,!n.includes(t)).focus()}static jQueryInterface(t){return this.each(function(){let n=e.getOrCreateInstance(this,t);if(typeof t==`string`){if(n[t]===void 0)throw TypeError(`No method named "${t}"`);n[t]()}})}static clearMenus(t){if(t.button===xi||t.type===`keyup`&&t.key!==vi)return;let n=G.find(Ii);for(let r of n){let n=e.getInstance(r);if(!n||n._config.autoClose===!1)continue;let i=t.composedPath(),a=i.includes(n._menu);if(i.includes(n._element)||n._config.autoClose===`inside`&&!a||n._config.autoClose===`outside`&&a||n._menu.contains(t.target)&&(t.type===`keyup`&&t.key===vi||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;let o={relatedTarget:n._element};t.type===`click`&&(o.clickEvent=t),n._completeHide(o)}}static dataApiKeydownHandler(t){let n=/input|textarea/i.test(t.target.tagName),r=t.key===_i,i=[yi,bi].includes(t.key);if(!i&&!r||n&&!r)return;t.preventDefault();let a=this.matches(Fi)?this:G.prev(this,Fi)[0]||G.next(this,Fi)[0]||G.findOne(Fi,t.delegateTarget.parentNode),o=e.getOrCreateInstance(a);if(i){t.stopPropagation(),o.show(),o._selectMenuItem(t);return}o._isShown()&&(t.stopPropagation(),o.hide(),a.focus())}};W.on(document,Di,Fi,Zi.dataApiKeydownHandler),W.on(document,Di,Li,Zi.dataApiKeydownHandler),W.on(document,Ei,Zi.clearMenus),W.on(document,Oi,Zi.clearMenus),W.on(document,Ei,Fi,function(e){e.preventDefault(),Zi.getOrCreateInstance(this).toggle()}),cn(Zi);var Qi=`backdrop`,$i=`fade`,ea=`show`,ta=`mousedown.bs.${Qi}`,na={className:`modal-backdrop`,clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:`body`},ra={className:`string`,clickCallback:`(function|null)`,isAnimated:`boolean`,isVisible:`boolean`,rootElement:`(element|string)`},ia=class extends Mn{constructor(e){super(),this._config=this._getConfig(e),this._isAppended=!1,this._element=null}static get Default(){return na}static get DefaultType(){return ra}static get NAME(){return Qi}show(e){if(!this._config.isVisible){U(e);return}this._append();let t=this._getElement();this._config.isAnimated&&rn(t),t.classList.add(ea),this._emulateAnimation(()=>{U(e)})}hide(e){if(!this._config.isVisible){U(e);return}this._getElement().classList.remove(ea),this._emulateAnimation(()=>{this.dispose(),U(e)})}dispose(){this._isAppended&&=(W.off(this._element,ta),this._element.remove(),!1)}_getElement(){if(!this._element){let e=document.createElement(`div`);e.className=this._config.className,this._config.isAnimated&&e.classList.add($i),this._element=e}return this._element}_configAfterMerge(e){return e.rootElement=Qt(e.rootElement),e}_append(){if(this._isAppended)return;let e=this._getElement();this._config.rootElement.append(e),W.on(e,ta,()=>{U(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(e){ln(e,this._getElement(),this._config.isAnimated)}},aa=`focustrap`,oa=`.bs.focustrap`,sa=`focusin${oa}`,ca=`keydown.tab${oa}`,la=`Tab`,ua=`forward`,da=`backward`,fa={autofocus:!0,trapElement:null},pa={autofocus:`boolean`,trapElement:`element`},ma=class extends Mn{constructor(e){super(),this._config=this._getConfig(e),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return fa}static get DefaultType(){return pa}static get NAME(){return aa}activate(){this._isActive||=(this._config.autofocus&&this._config.trapElement.focus(),W.off(document,oa),W.on(document,sa,e=>this._handleFocusin(e)),W.on(document,ca,e=>this._handleKeydown(e)),!0)}deactivate(){this._isActive&&(this._isActive=!1,W.off(document,oa))}_handleFocusin(e){let{trapElement:t}=this._config;if(e.target===document||e.target===t||t.contains(e.target))return;let n=G.focusableChildren(t);n.length===0?t.focus():this._lastTabNavDirection===da?n[n.length-1].focus():n[0].focus()}_handleKeydown(e){e.key===la&&(this._lastTabNavDirection=e.shiftKey?da:ua)}},ha=`.fixed-top, .fixed-bottom, .is-fixed, .sticky-top`,ga=`.sticky-top`,_a=`padding-right`,va=`margin-right`,ya=class{constructor(){this._element=document.body}getWidth(){let e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}hide(){let e=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,_a,t=>t+e),this._setElementAttributes(ha,_a,t=>t+e),this._setElementAttributes(ga,va,t=>t-e)}reset(){this._resetElementAttributes(this._element,`overflow`),this._resetElementAttributes(this._element,_a),this._resetElementAttributes(ha,_a),this._resetElementAttributes(ga,va)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,`overflow`),this._element.style.overflow=`hidden`}_setElementAttributes(e,t,n){let r=this.getWidth();this._applyManipulationCallback(e,e=>{if(e!==this._element&&window.innerWidth>e.clientWidth+r)return;this._saveInitialAttribute(e,t);let i=window.getComputedStyle(e).getPropertyValue(t);e.style.setProperty(t,`${n(Number.parseFloat(i))}px`)})}_saveInitialAttribute(e,t){let n=e.style.getPropertyValue(t);n&&jn.setDataAttribute(e,t,n)}_resetElementAttributes(e,t){this._applyManipulationCallback(e,e=>{let n=jn.getDataAttribute(e,t);if(n===null){e.style.removeProperty(t);return}jn.removeDataAttribute(e,t),e.style.setProperty(t,n)})}_applyManipulationCallback(e,t){if(Zt(e)){t(e);return}for(let n of G.find(e,this._element))t(n)}},ba=`modal`,xa=`.bs.modal`,Sa=`.data-api`,Ca=`Escape`,wa=`hide${xa}`,Ta=`hidePrevented${xa}`,Ea=`hidden${xa}`,Da=`show${xa}`,Oa=`shown${xa}`,ka=`resize${xa}`,Aa=`click.dismiss${xa}`,ja=`mousedown.dismiss${xa}`,Ma=`keydown.dismiss${xa}`,Na=`click${xa}${Sa}`,Pa=`modal-open`,Fa=`fade`,Ia=`show`,La=`modal-static`,Ra=`.modal.show`,za=`.modal-dialog`,Ba=`.modal-body`,Va=`[data-bs-toggle="modal"]`,Ha={backdrop:!0,focus:!0,keyboard:!0},Ua={backdrop:`(boolean|string)`,focus:`boolean`,keyboard:`boolean`},Wa=class e extends Pn{constructor(e,t){super(e,t),this._dialog=G.findOne(za,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new ya,this._addEventListeners()}static get Default(){return Ha}static get DefaultType(){return Ua}static get NAME(){return ba}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){this._isShown||this._isTransitioning||W.trigger(this._element,Da,{relatedTarget:e}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(Pa),this._adjustDialog(),this._backdrop.show(()=>this._showElement(e)))}hide(){!this._isShown||this._isTransitioning||W.trigger(this._element,wa).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(Ia),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){W.off(window,xa),W.off(this._dialog,xa),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new ia({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new ma({trapElement:this._element})}_showElement(e){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display=`block`,this._element.removeAttribute(`aria-hidden`),this._element.setAttribute(`aria-modal`,!0),this._element.setAttribute(`role`,`dialog`),this._element.scrollTop=0;let t=G.findOne(Ba,this._dialog);t&&(t.scrollTop=0),rn(this._element),this._element.classList.add(Ia),this._queueCallback(()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,W.trigger(this._element,Oa,{relatedTarget:e})},this._dialog,this._isAnimated())}_addEventListeners(){W.on(this._element,Ma,e=>{if(e.key===Ca){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),W.on(window,ka,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),W.on(this._element,ja,e=>{W.one(this._element,Aa,t=>{if(this._element===e.target&&this._element===t.target){if(this._config.backdrop===`static`){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display=`none`,this._element.setAttribute(`aria-hidden`,!0),this._element.removeAttribute(`aria-modal`),this._element.removeAttribute(`role`),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(Pa),this._resetAdjustments(),this._scrollBar.reset(),W.trigger(this._element,Ea)})}_isAnimated(){return this._element.classList.contains(Fa)}_triggerBackdropTransition(){if(W.trigger(this._element,Ta).defaultPrevented)return;let e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._element.style.overflowY;t===`hidden`||this._element.classList.contains(La)||(e||(this._element.style.overflowY=`hidden`),this._element.classList.add(La),this._queueCallback(()=>{this._element.classList.remove(La),this._queueCallback(()=>{this._element.style.overflowY=t},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){let e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._scrollBar.getWidth(),n=t>0;if(n&&!e){let e=H()?`paddingLeft`:`paddingRight`;this._element.style[e]=`${t}px`}if(!n&&e){let e=H()?`paddingRight`:`paddingLeft`;this._element.style[e]=`${t}px`}}_resetAdjustments(){this._element.style.paddingLeft=``,this._element.style.paddingRight=``}static jQueryInterface(t,n){return this.each(function(){let r=e.getOrCreateInstance(this,t);if(typeof t==`string`){if(r[t]===void 0)throw TypeError(`No method named "${t}"`);r[t](n)}})}};W.on(document,Na,Va,function(e){let t=G.getElementFromSelector(this);[`A`,`AREA`].includes(this.tagName)&&e.preventDefault(),W.one(t,Da,e=>{e.defaultPrevented||W.one(t,Ea,()=>{$t(this)&&this.focus()})});let n=G.findOne(Ra);n&&Wa.getInstance(n).hide(),Wa.getOrCreateInstance(t).toggle(this)}),In(Wa),cn(Wa);var Ga=`offcanvas`,Ka=`.bs.offcanvas`,qa=`.data-api`,Ja=`load${Ka}${qa}`,Ya=`Escape`,Xa=`show`,Za=`showing`,Qa=`hiding`,$a=`offcanvas-backdrop`,eo=`.offcanvas.show`,to=`show${Ka}`,no=`shown${Ka}`,ro=`hide${Ka}`,io=`hidePrevented${Ka}`,ao=`hidden${Ka}`,oo=`resize${Ka}`,so=`click${Ka}${qa}`,co=`keydown.dismiss${Ka}`,lo=`[data-bs-toggle="offcanvas"]`,uo={backdrop:!0,keyboard:!0,scroll:!1},fo={backdrop:`(boolean|string)`,keyboard:`boolean`,scroll:`boolean`},po=class e extends Pn{constructor(e,t){super(e,t),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return uo}static get DefaultType(){return fo}static get NAME(){return Ga}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){this._isShown||W.trigger(this._element,to,{relatedTarget:e}).defaultPrevented||(this._isShown=!0,this._backdrop.show(),this._config.scroll||new ya().hide(),this._element.setAttribute(`aria-modal`,!0),this._element.setAttribute(`role`,`dialog`),this._element.classList.add(Za),this._queueCallback(()=>{(!this._config.scroll||this._config.backdrop)&&this._focustrap.activate(),this._element.classList.add(Xa),this._element.classList.remove(Za),W.trigger(this._element,no,{relatedTarget:e})},this._element,!0))}hide(){!this._isShown||W.trigger(this._element,ro).defaultPrevented||(this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(Qa),this._backdrop.hide(),this._queueCallback(()=>{this._element.classList.remove(Xa,Qa),this._element.removeAttribute(`aria-modal`),this._element.removeAttribute(`role`),this._config.scroll||new ya().reset(),W.trigger(this._element,ao)},this._element,!0))}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){let e=()=>{if(this._config.backdrop===`static`){W.trigger(this._element,io);return}this.hide()},t=!!this._config.backdrop;return new ia({className:$a,isVisible:t,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:t?e:null})}_initializeFocusTrap(){return new ma({trapElement:this._element})}_addEventListeners(){W.on(this._element,co,e=>{if(e.key===Ya){if(this._config.keyboard){this.hide();return}W.trigger(this._element,io)}})}static jQueryInterface(t){return this.each(function(){let n=e.getOrCreateInstance(this,t);if(typeof t==`string`){if(n[t]===void 0||t.startsWith(`_`)||t===`constructor`)throw TypeError(`No method named "${t}"`);n[t](this)}})}};W.on(document,so,lo,function(e){let t=G.getElementFromSelector(this);if([`A`,`AREA`].includes(this.tagName)&&e.preventDefault(),en(this))return;W.one(t,ao,()=>{$t(this)&&this.focus()});let n=G.findOne(eo);n&&n!==t&&po.getInstance(n).hide(),po.getOrCreateInstance(t).toggle(this)}),W.on(window,Ja,()=>{for(let e of G.find(eo))po.getOrCreateInstance(e).show()}),W.on(window,oo,()=>{for(let e of G.find(`[aria-modal][class*=show][class*=offcanvas-]`))getComputedStyle(e).position!==`fixed`&&po.getOrCreateInstance(e).hide()}),In(po),cn(po);var mo={"*":[`class`,`dir`,`id`,`lang`,`role`,/^aria-[\w-]*$/i],a:[`target`,`href`,`title`,`rel`],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:[`src`,`srcset`,`alt`,`title`,`width`,`height`],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},ho=new Set([`background`,`cite`,`href`,`itemtype`,`longdesc`,`poster`,`src`,`xlink:href`]),go=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,_o=(e,t)=>{let n=e.nodeName.toLowerCase();return t.includes(n)?!ho.has(n)||!!go.test(e.nodeValue):t.filter(e=>e instanceof RegExp).some(e=>e.test(n))};function vo(e,t,n){if(!e.length)return e;if(n&&typeof n==`function`)return n(e);let r=new window.DOMParser().parseFromString(e,`text/html`),i=[].concat(...r.body.querySelectorAll(`*`));for(let e of i){let n=e.nodeName.toLowerCase();if(!Object.keys(t).includes(n)){e.remove();continue}let r=[].concat(...e.attributes),i=[].concat(t[`*`]||[],t[n]||[]);for(let t of r)_o(t,i)||e.removeAttribute(t.nodeName)}return r.body.innerHTML}var yo=`TemplateFactory`,bo={allowList:mo,content:{},extraClass:``,html:!1,sanitize:!0,sanitizeFn:null,template:`<div></div>`},xo={allowList:`object`,content:`object`,extraClass:`(string|function)`,html:`boolean`,sanitize:`boolean`,sanitizeFn:`(null|function)`,template:`string`},So={entry:`(string|element|function|null)`,selector:`(string|element)`},Co=class extends Mn{constructor(e){super(),this._config=this._getConfig(e)}static get Default(){return bo}static get DefaultType(){return xo}static get NAME(){return yo}getContent(){return Object.values(this._config.content).map(e=>this._resolvePossibleFunction(e)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(e){return this._checkContent(e),this._config.content={...this._config.content,...e},this}toHtml(){let e=document.createElement(`div`);e.innerHTML=this._maybeSanitize(this._config.template);for(let[t,n]of Object.entries(this._config.content))this._setContent(e,n,t);let t=e.children[0],n=this._resolvePossibleFunction(this._config.extraClass);return n&&t.classList.add(...n.split(` `)),t}_typeCheckConfig(e){super._typeCheckConfig(e),this._checkContent(e.content)}_checkContent(e){for(let[t,n]of Object.entries(e))super._typeCheckConfig({selector:t,entry:n},So)}_setContent(e,t,n){let r=G.findOne(n,e);if(r){if(t=this._resolvePossibleFunction(t),!t){r.remove();return}if(Zt(t)){this._putElementInTemplate(Qt(t),r);return}if(this._config.html){r.innerHTML=this._maybeSanitize(t);return}r.textContent=t}}_maybeSanitize(e){return this._config.sanitize?vo(e,this._config.allowList,this._config.sanitizeFn):e}_resolvePossibleFunction(e){return U(e,[void 0,this])}_putElementInTemplate(e,t){if(this._config.html){t.innerHTML=``,t.append(e);return}t.textContent=e.textContent}},wo=`tooltip`,To=new Set([`sanitize`,`allowList`,`sanitizeFn`]),Eo=`fade`,Do=`modal`,Oo=`show`,ko=`.tooltip-inner`,Ao=`.${Do}`,jo=`hide.bs.modal`,Mo=`hover`,No=`focus`,Po=`click`,Fo=`manual`,Io=`hide`,Lo=`hidden`,Ro=`show`,zo=`shown`,Bo=`inserted`,Vo=`click`,Ho=`focusin`,Uo=`focusout`,Wo=`mouseenter`,Go=`mouseleave`,Ko={AUTO:`auto`,TOP:`top`,RIGHT:H()?`left`:`right`,BOTTOM:`bottom`,LEFT:H()?`right`:`left`},qo={allowList:mo,animation:!0,boundary:`clippingParents`,container:!1,customClass:``,delay:0,fallbackPlacements:[`top`,`right`,`bottom`,`left`],html:!1,offset:[0,6],placement:`top`,popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:`<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>`,title:``,trigger:`hover focus`},Jo={allowList:`object`,animation:`boolean`,boundary:`(string|element)`,container:`(string|element|boolean)`,customClass:`(string|function)`,delay:`(number|object)`,fallbackPlacements:`array`,html:`boolean`,offset:`(array|string|function)`,placement:`(string|function)`,popperConfig:`(null|object|function)`,sanitize:`boolean`,sanitizeFn:`(null|function)`,selector:`(string|boolean)`,template:`string`,title:`(string|element|function)`,trigger:`string`},Yo=class e extends Pn{constructor(e,t){if(Bt===void 0)throw TypeError(`Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)`);super(e,t),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return qo}static get DefaultType(){return Jo}static get NAME(){return wo}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){if(this._isEnabled){if(this._isShown()){this._leave();return}this._enter()}}dispose(){clearTimeout(this._timeout),W.off(this._element.closest(Ao),jo,this._hideModalHandler),this._element.getAttribute(`data-bs-original-title`)&&this._element.setAttribute(`title`,this._element.getAttribute(`data-bs-original-title`)),this._disposePopper(),super.dispose()}show(){if(this._element.style.display===`none`)throw Error(`Please use show on visible elements`);if(!(this._isWithContent()&&this._isEnabled))return;let e=W.trigger(this._element,this.constructor.eventName(Ro)),t=(tn(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(e.defaultPrevented||!t)return;this._disposePopper();let n=this._getTipElement();this._element.setAttribute(`aria-describedby`,n.getAttribute(`id`));let{container:r}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(r.append(n),W.trigger(this._element,this.constructor.eventName(Bo))),this._popper=this._createPopper(n),n.classList.add(Oo),`ontouchstart`in document.documentElement)for(let e of[].concat(...document.body.children))W.on(e,`mouseover`,nn);this._queueCallback(()=>{W.trigger(this._element,this.constructor.eventName(zo)),this._isHovered===!1&&this._leave(),this._isHovered=!1},this.tip,this._isAnimated())}hide(){if(!(!this._isShown()||W.trigger(this._element,this.constructor.eventName(Io)).defaultPrevented)){if(this._getTipElement().classList.remove(Oo),`ontouchstart`in document.documentElement)for(let e of[].concat(...document.body.children))W.off(e,`mouseover`,nn);this._activeTrigger[Po]=!1,this._activeTrigger[No]=!1,this._activeTrigger[Mo]=!1,this._isHovered=null,this._queueCallback(()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute(`aria-describedby`),W.trigger(this._element,this.constructor.eventName(Lo)))},this.tip,this._isAnimated())}}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||=this._createTipElement(this._newContent||this._getContentForTemplate()),this.tip}_createTipElement(e){let t=this._getTemplateFactory(e).toHtml();if(!t)return null;t.classList.remove(Eo,Oo),t.classList.add(`bs-${this.constructor.NAME}-auto`);let n=Jt(this.constructor.NAME).toString();return t.setAttribute(`id`,n),this._isAnimated()&&t.classList.add(Eo),t}setContent(e){this._newContent=e,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(e){return this._templateFactory?this._templateFactory.changeContent(e):this._templateFactory=new Co({...this._config,content:e,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[ko]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute(`data-bs-original-title`)}_initializeOnDelegatedTarget(e){return this.constructor.getOrCreateInstance(e.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(Eo)}_isShown(){return this.tip&&this.tip.classList.contains(Oo)}_createPopper(e){let t=Ko[U(this._config.placement,[this,e,this._element]).toUpperCase()];return zt(this._element,e,this._getPopperConfig(t))}_getOffset(){let{offset:e}=this._config;return typeof e==`string`?e.split(`,`).map(e=>Number.parseInt(e,10)):typeof e==`function`?t=>e(t,this._element):e}_resolvePossibleFunction(e){return U(e,[this._element,this._element])}_getPopperConfig(e){let t={placement:e,modifiers:[{name:`flip`,options:{fallbackPlacements:this._config.fallbackPlacements}},{name:`offset`,options:{offset:this._getOffset()}},{name:`preventOverflow`,options:{boundary:this._config.boundary}},{name:`arrow`,options:{element:`.${this.constructor.NAME}-arrow`}},{name:`preSetPlacement`,enabled:!0,phase:`beforeMain`,fn:e=>{this._getTipElement().setAttribute(`data-popper-placement`,e.state.placement)}}]};return{...t,...U(this._config.popperConfig,[void 0,t])}}_setListeners(){let e=this._config.trigger.split(` `);for(let t of e)if(t===`click`)W.on(this._element,this.constructor.eventName(Vo),this._config.selector,e=>{let t=this._initializeOnDelegatedTarget(e);t._activeTrigger[Po]=!(t._isShown()&&t._activeTrigger[Po]),t.toggle()});else if(t!==Fo){let e=t===Mo?this.constructor.eventName(Wo):this.constructor.eventName(Ho),n=t===Mo?this.constructor.eventName(Go):this.constructor.eventName(Uo);W.on(this._element,e,this._config.selector,e=>{let t=this._initializeOnDelegatedTarget(e);t._activeTrigger[e.type===`focusin`?No:Mo]=!0,t._enter()}),W.on(this._element,n,this._config.selector,e=>{let t=this._initializeOnDelegatedTarget(e);t._activeTrigger[e.type===`focusout`?No:Mo]=t._element.contains(e.relatedTarget),t._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},W.on(this._element.closest(Ao),jo,this._hideModalHandler)}_fixTitle(){let e=this._element.getAttribute(`title`);e&&(!this._element.getAttribute(`aria-label`)&&!this._element.textContent.trim()&&this._element.setAttribute(`aria-label`,e),this._element.setAttribute(`data-bs-original-title`,e),this._element.removeAttribute(`title`))}_enter(){if(this._isShown()||this._isHovered){this._isHovered=!0;return}this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show)}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(e,t){clearTimeout(this._timeout),this._timeout=setTimeout(e,t)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(e){let t=jn.getDataAttributes(this._element);for(let e of Object.keys(t))To.has(e)&&delete t[e];return e={...t,...typeof e==`object`&&e?e:{}},e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e.container=e.container===!1?document.body:Qt(e.container),typeof e.delay==`number`&&(e.delay={show:e.delay,hide:e.delay}),typeof e.title==`number`&&(e.title=e.title.toString()),typeof e.content==`number`&&(e.content=e.content.toString()),e}_getDelegateConfig(){let e={};for(let[t,n]of Object.entries(this._config))this.constructor.Default[t]!==n&&(e[t]=n);return e.selector=!1,e.trigger=`manual`,e}_disposePopper(){this._popper&&=(this._popper.destroy(),null),this.tip&&=(this.tip.remove(),null)}static jQueryInterface(t){return this.each(function(){let n=e.getOrCreateInstance(this,t);if(typeof t==`string`){if(n[t]===void 0)throw TypeError(`No method named "${t}"`);n[t]()}})}};cn(Yo);var Xo=`popover`,Zo=`.popover-header`,Qo=`.popover-body`,$o={...Yo.Default,content:``,offset:[0,8],placement:`right`,template:`<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>`,trigger:`click`},es={...Yo.DefaultType,content:`(null|string|element|function)`};cn(class e extends Yo{static get Default(){return $o}static get DefaultType(){return es}static get NAME(){return Xo}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[Zo]:this._getTitle(),[Qo]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each(function(){let n=e.getOrCreateInstance(this,t);if(typeof t==`string`){if(n[t]===void 0)throw TypeError(`No method named "${t}"`);n[t]()}})}});var ts=`scrollspy`,ns=`.bs.scrollspy`,rs=`.data-api`,is=`activate${ns}`,as=`click${ns}`,os=`load${ns}${rs}`,ss=`dropdown-item`,cs=`active`,ls=`[data-bs-spy="scroll"]`,us=`[href]`,ds=`.nav, .list-group`,fs=`.nav-link`,ps=`${fs}, .nav-item > ${fs}, .list-group-item`,ms=`.dropdown`,hs=`.dropdown-toggle`,gs={offset:null,rootMargin:`0px 0px -25%`,smoothScroll:!1,target:null,threshold:[.1,.5,1]},_s={offset:`(number|null)`,rootMargin:`string`,smoothScroll:`boolean`,target:`element`,threshold:`array`},vs=class e extends Pn{constructor(e,t){super(e,t),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY===`visible`?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return gs}static get DefaultType(){return _s}static get NAME(){return ts}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(let e of this._observableSections.values())this._observer.observe(e)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(e){return e.target=Qt(e.target)||document.body,e.rootMargin=e.offset?`${e.offset}px 0px -30%`:e.rootMargin,typeof e.threshold==`string`&&(e.threshold=e.threshold.split(`,`).map(e=>Number.parseFloat(e))),e}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(W.off(this._config.target,as),W.on(this._config.target,as,us,e=>{let t=this._observableSections.get(e.target.hash);if(t){e.preventDefault();let n=this._rootElement||window,r=t.offsetTop-this._element.offsetTop;if(n.scrollTo){n.scrollTo({top:r,behavior:`smooth`});return}n.scrollTop=r}}))}_getNewObserver(){let e={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(e=>this._observerCallback(e),e)}_observerCallback(e){let t=e=>this._targetLinks.get(`#${e.target.id}`),n=e=>{this._previousScrollData.visibleEntryTop=e.target.offsetTop,this._process(t(e))},r=(this._rootElement||document.documentElement).scrollTop,i=r>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=r;for(let a of e){if(!a.isIntersecting){this._activeTarget=null,this._clearActiveClass(t(a));continue}let e=a.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(i&&e){if(n(a),!r)return;continue}!i&&!e&&n(a)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;let e=G.find(us,this._config.target);for(let t of e){if(!t.hash||en(t))continue;let e=G.findOne(decodeURI(t.hash),this._element);$t(e)&&(this._targetLinks.set(decodeURI(t.hash),t),this._observableSections.set(t.hash,e))}}_process(e){this._activeTarget!==e&&(this._clearActiveClass(this._config.target),this._activeTarget=e,e.classList.add(cs),this._activateParents(e),W.trigger(this._element,is,{relatedTarget:e}))}_activateParents(e){if(e.classList.contains(ss)){G.findOne(hs,e.closest(ms)).classList.add(cs);return}for(let t of G.parents(e,ds))for(let e of G.prev(t,ps))e.classList.add(cs)}_clearActiveClass(e){e.classList.remove(cs);let t=G.find(`${us}.${cs}`,e);for(let e of t)e.classList.remove(cs)}static jQueryInterface(t){return this.each(function(){let n=e.getOrCreateInstance(this,t);if(typeof t==`string`){if(n[t]===void 0||t.startsWith(`_`)||t===`constructor`)throw TypeError(`No method named "${t}"`);n[t]()}})}};W.on(window,os,()=>{for(let e of G.find(ls))vs.getOrCreateInstance(e)}),cn(vs);var ys=`tab`,bs=`.bs.tab`,xs=`hide${bs}`,Ss=`hidden${bs}`,Cs=`show${bs}`,ws=`shown${bs}`,Ts=`click${bs}`,Es=`keydown${bs}`,Ds=`load${bs}`,Os=`ArrowLeft`,ks=`ArrowRight`,As=`ArrowUp`,js=`ArrowDown`,Ms=`Home`,Ns=`End`,Ps=`active`,Fs=`fade`,Is=`show`,Ls=`dropdown`,Rs=`.dropdown-toggle`,zs=`.dropdown-menu`,Bs=`:not(${Rs})`,Vs=`.list-group, .nav, [role="tablist"]`,Hs=`.nav-item, .list-group-item`,Us=`.nav-link${Bs}, .list-group-item${Bs}, [role="tab"]${Bs}`,Ws=`[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]`,Gs=`${Us}, ${Ws}`,Ks=`.${Ps}[data-bs-toggle="tab"], .${Ps}[data-bs-toggle="pill"], .${Ps}[data-bs-toggle="list"]`,qs=class e extends Pn{constructor(e){super(e),this._parent=this._element.closest(Vs),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),W.on(this._element,Es,e=>this._keydown(e)))}static get NAME(){return ys}show(){let e=this._element;if(this._elemIsActive(e))return;let t=this._getActiveElem(),n=t?W.trigger(t,xs,{relatedTarget:e}):null;W.trigger(e,Cs,{relatedTarget:t}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(t,e),this._activate(e,t))}_activate(e,t){e&&(e.classList.add(Ps),this._activate(G.getElementFromSelector(e)),this._queueCallback(()=>{if(e.getAttribute(`role`)!==`tab`){e.classList.add(Is);return}e.removeAttribute(`tabindex`),e.setAttribute(`aria-selected`,!0),this._toggleDropDown(e,!0),W.trigger(e,ws,{relatedTarget:t})},e,e.classList.contains(Fs)))}_deactivate(e,t){e&&(e.classList.remove(Ps),e.blur(),this._deactivate(G.getElementFromSelector(e)),this._queueCallback(()=>{if(e.getAttribute(`role`)!==`tab`){e.classList.remove(Is);return}e.setAttribute(`aria-selected`,!1),e.setAttribute(`tabindex`,`-1`),this._toggleDropDown(e,!1),W.trigger(e,Ss,{relatedTarget:t})},e,e.classList.contains(Fs)))}_keydown(t){if(![Os,ks,As,js,Ms,Ns].includes(t.key))return;t.stopPropagation(),t.preventDefault();let n=this._getChildren().filter(e=>!en(e)),r;if([Ms,Ns].includes(t.key))r=n[t.key===Ms?0:n.length-1];else{let e=[ks,js].includes(t.key);r=un(n,t.target,e,!0)}r&&(r.focus({preventScroll:!0}),e.getOrCreateInstance(r).show())}_getChildren(){return G.find(Gs,this._parent)}_getActiveElem(){return this._getChildren().find(e=>this._elemIsActive(e))||null}_setInitialAttributes(e,t){this._setAttributeIfNotExists(e,`role`,`tablist`);for(let e of t)this._setInitialAttributesOnChild(e)}_setInitialAttributesOnChild(e){e=this._getInnerElement(e);let t=this._elemIsActive(e),n=this._getOuterElement(e);e.setAttribute(`aria-selected`,t),n!==e&&this._setAttributeIfNotExists(n,`role`,`presentation`),t||e.setAttribute(`tabindex`,`-1`),this._setAttributeIfNotExists(e,`role`,`tab`),this._setInitialAttributesOnTargetPanel(e)}_setInitialAttributesOnTargetPanel(e){let t=G.getElementFromSelector(e);t&&(this._setAttributeIfNotExists(t,`role`,`tabpanel`),e.id&&this._setAttributeIfNotExists(t,`aria-labelledby`,`${e.id}`))}_toggleDropDown(e,t){let n=this._getOuterElement(e);if(!n.classList.contains(Ls))return;let r=(e,r)=>{let i=G.findOne(e,n);i&&i.classList.toggle(r,t)};r(Rs,Ps),r(zs,Is),n.setAttribute(`aria-expanded`,t)}_setAttributeIfNotExists(e,t,n){e.hasAttribute(t)||e.setAttribute(t,n)}_elemIsActive(e){return e.classList.contains(Ps)}_getInnerElement(e){return e.matches(Gs)?e:G.findOne(Gs,e)}_getOuterElement(e){return e.closest(Hs)||e}static jQueryInterface(t){return this.each(function(){let n=e.getOrCreateInstance(this);if(typeof t==`string`){if(n[t]===void 0||t.startsWith(`_`)||t===`constructor`)throw TypeError(`No method named "${t}"`);n[t]()}})}};W.on(document,Ts,Ws,function(e){[`A`,`AREA`].includes(this.tagName)&&e.preventDefault(),!en(this)&&qs.getOrCreateInstance(this).show()}),W.on(window,Ds,()=>{for(let e of G.find(Ks))qs.getOrCreateInstance(e)}),cn(qs);var Js=`toast`,Ys=`.bs.toast`,Xs=`mouseover${Ys}`,Zs=`mouseout${Ys}`,Qs=`focusin${Ys}`,$s=`focusout${Ys}`,ec=`hide${Ys}`,tc=`hidden${Ys}`,nc=`show${Ys}`,rc=`shown${Ys}`,ic=`fade`,ac=`hide`,oc=`show`,sc=`showing`,cc={animation:`boolean`,autohide:`boolean`,delay:`number`},lc={animation:!0,autohide:!0,delay:5e3},uc=class e extends Pn{constructor(e,t){super(e,t),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return lc}static get DefaultType(){return cc}static get NAME(){return Js}show(){W.trigger(this._element,nc).defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add(ic),this._element.classList.remove(ac),rn(this._element),this._element.classList.add(oc,sc),this._queueCallback(()=>{this._element.classList.remove(sc),W.trigger(this._element,rc),this._maybeScheduleHide()},this._element,this._config.animation))}hide(){!this.isShown()||W.trigger(this._element,ec).defaultPrevented||(this._element.classList.add(sc),this._queueCallback(()=>{this._element.classList.add(ac),this._element.classList.remove(sc,oc),W.trigger(this._element,tc)},this._element,this._config.animation))}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(oc),super.dispose()}isShown(){return this._element.classList.contains(oc)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(e,t){switch(e.type){case`mouseover`:case`mouseout`:this._hasMouseInteraction=t;break;case`focusin`:case`focusout`:this._hasKeyboardInteraction=t}if(t){this._clearTimeout();return}let n=e.relatedTarget;this._element===n||this._element.contains(n)||this._maybeScheduleHide()}_setListeners(){W.on(this._element,Xs,e=>this._onInteraction(e,!0)),W.on(this._element,Zs,e=>this._onInteraction(e,!1)),W.on(this._element,Qs,e=>this._onInteraction(e,!0)),W.on(this._element,$s,e=>this._onInteraction(e,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each(function(){let n=e.getOrCreateInstance(this,t);if(typeof t==`string`){if(n[t]===void 0)throw TypeError(`No method named "${t}"`);n[t](this)}})}};In(uc),cn(uc);var dc={},fc=(function(e,t,n,r,i){var a=new Worker(dc[t]||(dc[t]=URL.createObjectURL(new Blob([e+`;addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})`],{type:`text/javascript`}))));return a.onmessage=function(e){var t=e.data,n=t.$e$;if(n){var r=Error(n[0]);r.code=n[1],r.stack=n[2],i(r,null)}else i(null,t)},a.postMessage(n,r),a}),K=Uint8Array,q=Uint16Array,pc=Int32Array,mc=new K([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),hc=new K([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),gc=new K([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),_c=function(e,t){for(var n=new q(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var i=new pc(n[30]),r=1;r<30;++r)for(var a=n[r];a<n[r+1];++a)i[a]=a-n[r]<<5|r;return{b:n,r:i}},vc=_c(mc,2),yc=vc.b,bc=vc.r;yc[28]=258,bc[258]=28;var xc=_c(hc,0);xc.b;for(var Sc=xc.r,Cc=new q(32768),J=0;J<32768;++J){var wc=(J&43690)>>1|(J&21845)<<1;wc=(wc&52428)>>2|(wc&13107)<<2,wc=(wc&61680)>>4|(wc&3855)<<4,Cc[J]=((wc&65280)>>8|(wc&255)<<8)>>1}for(var Tc=(function(e,t,n){for(var r=e.length,i=0,a=new q(t);i<r;++i)e[i]&&++a[e[i]-1];var o=new q(t);for(i=1;i<t;++i)o[i]=o[i-1]+a[i-1]<<1;var s;if(n){s=new q(1<<t);var c=15-t;for(i=0;i<r;++i)if(e[i])for(var l=i<<4|e[i],u=t-e[i],d=o[e[i]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)s[Cc[d]>>c]=l}else for(s=new q(r),i=0;i<r;++i)e[i]&&(s[i]=Cc[o[e[i]-1]++]>>15-e[i]);return s}),Ec=new K(288),J=0;J<144;++J)Ec[J]=8;for(var J=144;J<256;++J)Ec[J]=9;for(var J=256;J<280;++J)Ec[J]=7;for(var J=280;J<288;++J)Ec[J]=8;for(var Dc=new K(32),J=0;J<32;++J)Dc[J]=5;var Oc=Tc(Ec,9,0),kc=Tc(Dc,5,0),Ac=function(e){return(e+7)/8|0},jc=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new K(e.subarray(t,n))},Mc=[`unexpected EOF`,`invalid block type`,`invalid length/literal`,`invalid distance`,`stream finished`,`no stream handler`,,`no callback`,`invalid UTF-8 data`,`extra field too long`,`date not in range 1980-2099`,`filename too long`,`stream finishing`,`invalid zip data`],Nc=function(e,t,n){var r=Error(t||Mc[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,Nc),!n)throw r;return r},Pc=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},Fc=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},Ic=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var i=n.length,a=n.slice();if(!i)return{t:Uc,l:0};if(i==1){var o=new K(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(e,t){return e.f-t.f}),n.push({s:-1,f:25001});var s=n[0],c=n[1],l=0,u=1,d=2;for(n[0]={s:-1,f:s.f+c.f,l:s,r:c};u!=i-1;)s=n[n[l].f<n[d].f?l++:d++],c=n[l!=u&&n[l].f<n[d].f?l++:d++],n[u++]={s:-1,f:s.f+c.f,l:s,r:c};for(var f=a[0].s,r=1;r<i;++r)a[r].s>f&&(f=a[r].s);var p=new q(f+1),m=Lc(n[u-1],p,0);if(m>t){var r=0,h=0,g=m-t,_=1<<g;for(a.sort(function(e,t){return p[t.s]-p[e.s]||e.f-t.f});r<i;++r){var v=a[r].s;if(p[v]>t)h+=_-(1<<m-p[v]),p[v]=t;else break}for(h>>=g;h>0;){var y=a[r].s;p[y]<t?h-=1<<t-p[y]++-1:++r}for(;r>=0&&h;--r){var b=a[r].s;p[b]==t&&(--p[b],++h)}m=t}return{t:new K(p),l:m}},Lc=function(e,t,n){return e.s==-1?Math.max(Lc(e.l,t,n+1),Lc(e.r,t,n+1)):t[e.s]=n},Rc=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new q(++t),r=0,i=e[0],a=1,o=function(e){n[r++]=e},s=1;s<=t;++s)if(e[s]==i&&s!=t)++a;else{if(!i&&a>2){for(;a>138;a-=138)o(32754);a>2&&(o(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(o(i),--a;a>6;a-=6)o(8304);a>2&&(o(a-3<<5|8208),a=0)}for(;a--;)o(i);a=1,i=e[s]}return{c:n.subarray(0,r),n:t}},zc=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},Bc=function(e,t,n){var r=n.length,i=Ac(t+2);e[i]=r&255,e[i+1]=r>>8,e[i+2]=e[i]^255,e[i+3]=e[i+1]^255;for(var a=0;a<r;++a)e[i+a+4]=n[a];return(i+4+r)*8},Vc=function(e,t,n,r,i,a,o,s,c,l,u){Pc(t,u++,n),++i[256];for(var d=Ic(i,15),f=d.t,p=d.l,m=Ic(a,15),h=m.t,g=m.l,_=Rc(f),v=_.c,y=_.n,b=Rc(h),x=b.c,S=b.n,C=new q(19),w=0;w<v.length;++w)++C[v[w]&31];for(var w=0;w<x.length;++w)++C[x[w]&31];for(var T=Ic(C,7),E=T.t,D=T.l,O=19;O>4&&!E[gc[O-1]];--O);var k=l+5<<3,A=zc(i,Ec)+zc(a,Dc)+o,j=zc(i,f)+zc(a,h)+o+14+3*O+zc(C,E)+2*C[16]+3*C[17]+7*C[18];if(c>=0&&k<=A&&k<=j)return Bc(t,u,e.subarray(c,c+l));var M,N,P,F;if(Pc(t,u,1+(j<A)),u+=2,j<A){M=Tc(f,p,0),N=f,P=Tc(h,g,0),F=h;var ee=Tc(E,D,0);Pc(t,u,y-257),Pc(t,u+5,S-1),Pc(t,u+10,O-4),u+=14;for(var w=0;w<O;++w)Pc(t,u+3*w,E[gc[w]]);u+=3*O;for(var I=[v,x],te=0;te<2;++te)for(var ne=I[te],w=0;w<ne.length;++w){var re=ne[w]&31;Pc(t,u,ee[re]),u+=E[re],re>15&&(Pc(t,u,ne[w]>>5&127),u+=ne[w]>>12)}}else M=Oc,N=Ec,P=kc,F=Dc;for(var w=0;w<s;++w){var L=r[w];if(L>255){var re=L>>18&31;Fc(t,u,M[re+257]),u+=N[re+257],re>7&&(Pc(t,u,L>>23&31),u+=mc[re]);var ie=L&31;Fc(t,u,P[ie]),u+=F[ie],ie>3&&(Fc(t,u,L>>5&8191),u+=hc[ie])}else Fc(t,u,M[L]),u+=N[L]}return Fc(t,u,M[256]),u+N[256]},Hc=new pc([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Uc=new K(0),Wc=function(e,t,n,r,i,a){var o=a.z||e.length,s=new K(r+o+5*(1+Math.ceil(o/7e3))+i),c=s.subarray(r,s.length-i),l=a.l,u=(a.r||0)&7;if(t){u&&(c[0]=a.r>>3);for(var d=Hc[t-1],f=d>>13,p=d&8191,m=(1<<n)-1,h=a.p||new q(32768),g=a.h||new q(m+1),_=Math.ceil(n/3),v=2*_,y=function(t){return(e[t]^e[t+1]<<_^e[t+2]<<v)&m},b=new pc(25e3),x=new q(288),S=new q(32),C=0,w=0,T=a.i||0,E=0,D=a.w||0,O=0;T+2<o;++T){var k=y(T),A=T&32767,j=g[k];if(h[A]=j,g[k]=A,D<=T){var M=o-T;if((C>7e3||E>24576)&&(M>423||!l)){u=Vc(e,c,0,b,x,S,w,E,O,T-O,u),E=C=w=0,O=T;for(var N=0;N<286;++N)x[N]=0;for(var N=0;N<30;++N)S[N]=0}var P=2,F=0,ee=p,I=A-j&32767;if(M>2&&k==y(T-I))for(var te=Math.min(f,M)-1,ne=Math.min(32767,T),re=Math.min(258,M);I<=ne&&--ee&&A!=j;){if(e[T+P]==e[T+P-I]){for(var L=0;L<re&&e[T+L]==e[T+L-I];++L);if(L>P){if(P=L,F=I,L>te)break;for(var ie=Math.min(I,L-2),ae=0,N=0;N<ie;++N){var oe=T-I+N&32767,R=oe-h[oe]&32767;R>ae&&(ae=R,j=oe)}}}A=j,j=h[A],I+=A-j&32767}if(F){b[E++]=268435456|bc[P]<<18|Sc[F];var z=bc[P]&31,se=Sc[F]&31;w+=mc[z]+hc[se],++x[257+z],++S[se],D=T+P,++C}else b[E++]=e[T],++x[e[T]]}}for(T=Math.max(T,D);T<o;++T)b[E++]=e[T],++x[e[T]];u=Vc(e,c,l,b,x,S,w,E,O,T-O,u),l||(a.r=u&7|c[u/8|0]<<3,u-=7,a.h=g,a.p=h,a.i=T,a.w=D)}else{for(var T=a.w||0;T<o+l;T+=65535){var B=T+65535;B>=o&&(c[u/8|0]=l,B=o),u=Bc(c,u+1,e.subarray(T,B))}a.i=o}return jc(s,0,r+Ac(u)+i)},Gc=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),Kc=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=Gc[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}},qc=function(e,t,n,r,i){if(!i&&(i={l:1},t.dictionary)){var a=t.dictionary.subarray(-32768),o=new K(a.length+e.length);o.set(a),o.set(e,a.length),e=o,i.w=a.length}return Wc(e,t.level==null?6:t.level,t.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,i)},Jc=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n},Yc=function(e,t,n){for(var r=e(),i=e.toString(),a=i.slice(i.indexOf(`[`)+1,i.lastIndexOf(`]`)).replace(/\s+/g,``).split(`,`),o=0;o<r.length;++o){var s=r[o],c=a[o];if(typeof s==`function`){t+=`;`+c+`=`;var l=s.toString();if(s.prototype)if(l.indexOf(`[native code]`)!=-1){var u=l.indexOf(` `,8)+1;t+=l.slice(u,l.indexOf(`(`,u))}else for(var d in t+=l,s.prototype)t+=`;`+c+`.prototype.`+d+`=`+s.prototype[d].toString();else t+=l}else n[c]=s}return t},Xc=[],Zc=function(e){var t=[];for(var n in e)e[n].buffer&&t.push((e[n]=new e[n].constructor(e[n])).buffer);return t},Qc=function(e,t,n,r){if(!Xc[n]){for(var i=``,a={},o=e.length-1,s=0;s<o;++s)i=Yc(e[s],i,a);Xc[n]={c:Yc(e[o],i,a),e:a}}var c=Jc({},Xc[n].e);return fc(Xc[n].c+`;onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=`+t.toString()+`}`,n,c,Zc(c),r)},$c=function(){return[K,q,pc,mc,hc,gc,bc,Sc,Oc,Ec,kc,Dc,Cc,Hc,Uc,Tc,Pc,Fc,Ic,Lc,Rc,zc,Bc,Vc,Ac,jc,Wc,qc,rl,el]},el=function(e){return postMessage(e,[e.buffer])},tl=function(e,t,n,r,i,a){var o=Qc(n,r,i,function(e,t){o.terminate(),a(e,t)});return o.postMessage([e,t],t.consume?[e.buffer]:[]),function(){o.terminate()}},Y=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function nl(e,t,n){return n||(n=t,t={}),typeof n!=`function`&&Nc(7),tl(e,t,[$c],function(e){return el(rl(e.data[0],e.data[1]))},0,n)}function rl(e,t){return qc(e,t||{},0,0)}var il=function(e,t,n,r){for(var i in e){var a=e[i],o=t+i,s=r;Array.isArray(a)&&(s=Jc(r,a[1]),a=a[0]),ArrayBuffer.isView(a)?n[o]=[a,s]:(n[o+=`/`]=[new K(0),s],il(a,o,n,r))}},al=typeof TextEncoder<`u`&&new TextEncoder,ol=typeof TextDecoder<`u`&&new TextDecoder;try{ol.decode(Uc,{stream:!0})}catch{}function sl(e,t){if(t){for(var n=new K(e.length),r=0;r<e.length;++r)n[r]=e.charCodeAt(r);return n}if(al)return al.encode(e);for(var i=e.length,a=new K(e.length+(e.length>>1)),o=0,s=function(e){a[o++]=e},r=0;r<i;++r){if(o+5>a.length){var c=new K(o+8+(i-r<<1));c.set(a),a=c}var l=e.charCodeAt(r);l<128||t?s(l):l<2048?(s(192|l>>6),s(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|e.charCodeAt(++r)&1023,s(240|l>>18),s(128|l>>12&63),s(128|l>>6&63),s(128|l&63)):(s(224|l>>12),s(128|l>>6&63),s(128|l&63))}return jc(a,0,o)}var cl=function(e){var t=0;if(e)for(var n in e){var r=e[n].length;r>65535&&Nc(9),t+=r+4}return t},ll=function(e,t,n,r,i,a,o,s){var c=r.length,l=n.extra,u=s&&s.length,d=cl(l);Y(e,t,o==null?67324752:33639248),t+=4,o!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(a<0&&8),e[t++]=i&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var f=new Date(n.mtime==null?Date.now():n.mtime),p=f.getFullYear()-1980;if((p<0||p>119)&&Nc(10),Y(e,t,p<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),t+=4,a!=-1&&(Y(e,t,n.crc),Y(e,t+4,a<0?-a-2:a),Y(e,t+8,n.size)),Y(e,t+12,c),Y(e,t+14,d),t+=16,o!=null&&(Y(e,t,u),Y(e,t+6,n.attrs),Y(e,t+10,o),t+=14),e.set(r,t),t+=c,d)for(var m in l){var h=l[m],g=h.length;Y(e,t,+m),Y(e,t+2,g),e.set(h,t+4),t+=4+g}return u&&(e.set(s,t),t+=u),t},ul=function(e,t,n,r,i){Y(e,t,101010256),Y(e,t+8,n),Y(e,t+10,n),Y(e,t+12,r),Y(e,t+16,i)};function dl(e,t,n){n||(n=t,t={}),typeof n!=`function`&&Nc(7);var r={};il(e,``,r,t);var i=Object.keys(r),a=i.length,o=0,s=0,c=a,l=Array(a),u=[],d=function(){for(var e=0;e<u.length;++e)u[e]()},f=function(e,t){pl(function(){n(e,t)})};pl(function(){f=n});var p=function(){var e=new K(s+22),t=o,n=s-o;s=0;for(var r=0;r<c;++r){var i=l[r];try{var a=i.c.length;ll(e,s,i,i.f,i.u,a);var u=30+i.f.length+cl(i.extra),d=s+u;e.set(i.c,d),ll(e,o,i,i.f,i.u,a,s,i.m),o+=16+u+(i.m?i.m.length:0),s=d+a}catch(e){return f(e,null)}}ul(e,o,l.length,n,t),f(null,e)};a||p();for(var m=function(e){var t=i[e],n=r[t],c=n[0],m=n[1],h=Kc(),g=c.length;h.p(c);var _=sl(t),v=_.length,y=m.comment,b=y&&sl(y),x=b&&b.length,S=cl(m.extra),C=m.level==0?0:8,w=function(n,r){if(n)d(),f(n,null);else{var i=r.length;l[e]=Jc(m,{size:g,crc:h.d(),c:r,f:_,m:b,u:v!=t.length||b&&y.length!=x,compression:C}),o+=30+v+S+i,s+=76+2*(v+S)+(x||0)+i,--a||p()}};if(v>65535&&w(Nc(11,0,1),null),!C)w(null,c);else if(g<16e4)try{w(null,rl(c,m))}catch(e){w(e,null)}else u.push(nl(c,m,w))},h=0;h<c;++h)m(h);return d}function fl(e,t){t||={};var n={},r=[];il(e,``,n,t);var i=0,a=0;for(var o in n){var s=n[o],c=s[0],l=s[1],u=l.level==0?0:8,d=sl(o),f=d.length,p=l.comment,m=p&&sl(p),h=m&&m.length,g=cl(l.extra);f>65535&&Nc(11);var _=u?rl(c,l):c,v=_.length,y=Kc();y.p(c),r.push(Jc(l,{size:c.length,crc:y.d(),c:_,f:d,m,u:f!=o.length||m&&p.length!=h,o:i,compression:u})),i+=30+f+g+v,a+=76+2*(f+g)+(h||0)+v}for(var b=new K(a+22),x=i,S=a-i,C=0;C<r.length;++C){var d=r[C];ll(b,d.o,d,d.f,d.u,d.c.length);var w=30+d.f.length+cl(d.extra);b.set(d.c,d.o+w),ll(b,i,d,d.f,d.u,d.c.length,d.o,d.m),i+=16+w+(d.m?d.m.length:0)}return ul(b,i,r.length,S,x),b}var pl=typeof queueMicrotask==`function`?queueMicrotask:typeof setTimeout==`function`?setTimeout:function(e){e()};function ml(e){let t=typeof e;return e!=null&&(t===`object`||t===`function`)}function hl(e){if(typeof e!=`object`||!e||Object.prototype.toString.call(e)!==`[object Object]`)return!1;let t=Object.getPrototypeOf(e);if(t===null)return!0;let n=Object.prototype.hasOwnProperty.call(t,`constructor`)&&t.constructor;return typeof n==`function`&&n instanceof n&&Function.prototype.call(n)===Function.prototype.call(e)}function gl(e){return e!=null&&typeof e.valueOf()==`string`}var _l={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},vl=e=>(typeof e!=`string`&&(e=`${e}`),e.replace(/[&<>"']/g,e=>_l[e])),yl=class{documentElement;constructor(e,t){this.documentElement=this.createElement(t),this.documentElement.setAttribute(`xmlns`,e)}createElement(e){return new xl({nodeName:e})}createTextNode(e){return new bl(e)}toString(){return this.documentElement.toString()}static Node={Create:e=>{switch(e.type){case`XML`:return new xl(e);case`TEXT`:return new bl(e.nodeValue);default:return null}}}},bl=class{nodeValue;constructor(e){this.nodeValue=e}toJSON(){return{nodeValue:this.nodeValue,type:`TEXT`}}toString(){return vl(this.nodeValue)}},xl=class e{nodeName;children;nodeValue;attributes;firstChild;constructor(e){if(this.nodeName=e.nodeName,this.children=[],this.nodeValue=e.nodeValue||``,this.attributes={},e.children)for(let t=0,n=e.children.length;t<n;t++)this.appendChild(yl.Node.Create(e.children[t]));if(e.attributes)for(let[t,n]of Object.entries(e.attributes))this.setAttribute(t,n)}toString(){let e=`<${this.nodeName}`;for(let t in this.attributes)this.attributes.hasOwnProperty(t)&&(e=`${e} ${t}="${vl(this.attributes[t])}"`);let t=``;for(let e=0,n=this.children.length;e<n;e++)t+=this.children[e].toString();return e+=t?`>${t}</${this.nodeName}>`:`/>`,e}toJSON(){let e=[];for(let t=0,n=this.children.length;t<n;t++)e.push(this.children[t].toJSON());return{nodeName:this.nodeName,children:e,nodeValue:this.nodeValue,attributes:this.attributes,type:`XML`}}setAttribute(e,t){if(t===null){delete this.attributes[e],delete this[e];return}this.attributes[e]=t,this[e]=t}appendChild(e){this.children.push(e),this.firstChild=this.children[0]}cloneNode(t){return new e(this.toJSON())}},X=class e{static _idSpaces={};static uniqueId(t){return e._idSpaces[t]||(e._idSpaces[t]=1),e._idSpaces[t]++}static createXmlDoc(e,t){return new yl(e||null,t)}static createElement(e,t,n){let r=e.createElement(t);n||=[];let i=n.length;for(;i--;)r.setAttribute(n[i][0],n[i][1]);return r}static setAttributesOnDoc(e,t){for(let[n,r]of Object.entries(t)){if(hl(r))if(r.v!==null&&r.v!==void 0)switch(r.type){case Boolean:r=r.v?`1`:`0`}else r=null;r!=null&&e.setAttribute(n,r)}}static LETTER_REFS={};static positionToLetterRef(t,n){let r=1,i,a=t,o=``;if(e.LETTER_REFS[t])return e.LETTER_REFS[t].concat(n);for(;a>0;)a-=26**(r-1),i=a%26**r,a-=i,i/=26**(r-1),o=`ABCDEFGHIJKLMNOPQRSTUVWXYZ`.charAt(i)+o,r+=1;return e.LETTER_REFS[t]=o,o.concat(String(n))}static schemas={worksheet:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet`,sharedStrings:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings`,stylesheet:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles`,relationships:`http://schemas.openxmlformats.org/officeDocument/2006/relationships`,relationshipPackage:`http://schemas.openxmlformats.org/package/2006/relationships`,contentTypes:`http://schemas.openxmlformats.org/package/2006/content-types`,spreadsheetml:`http://schemas.openxmlformats.org/spreadsheetml/2006/main`,markupCompat:`http://schemas.openxmlformats.org/markup-compatibility/2006`,x14ac:`http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac`,officeDocument:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument`,package:`http://schemas.openxmlformats.org/package/2006/relationships`,table:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/table`,spreadsheetDrawing:`http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing`,drawing:`http://schemas.openxmlformats.org/drawingml/2006/main`,drawingRelationship:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing`,image:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/image`,chart:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart`,hyperlink:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink`}},Sl=class{x=null;y=null;width=null;height=null;constructor(e){e&&(this.setPos(e.x,e.y),this.setDimensions(e.width||0,e.height||0))}setPos(e,t){this.x=e,this.y=t}setDimensions(e,t){this.width=e,this.height=t}toXML(e,t){let n=X.createElement(e,`xdr:absoluteAnchor`),r=X.createElement(e,`xdr:pos`);r.setAttribute(`x`,this.x),r.setAttribute(`y`,this.y),n.appendChild(r);let i=X.createElement(e,`xdr:ext`);return i.setAttribute(`cx`,this.width),i.setAttribute(`cy`,this.height),n.appendChild(i),n.appendChild(t),n.appendChild(X.createElement(e,`xdr:clientData`)),n}},Cl={};function Z(e=`$lodash$`){Cl[e]||(Cl[e]=0);let t=++Cl[e];return e===`$lodash$`?`${t}`:`${e}${t}`}var wl=class{x=null;y=null;xOff=null;yOff=null;width=null;height=null;constructor(e){e&&(this.setPos(e.x,e.y,e.xOff,e.yOff),this.setDimensions(e.width||0,e.height||0))}setPos(e,t,n,r){this.x=e,this.y=t,n!==void 0&&(this.xOff=n),r!==void 0&&(this.yOff=r)}setDimensions(e,t){this.width=e,this.height=t}toXML(e,t){let n=X.createElement(e,`xdr:oneCellAnchor`),r=X.createElement(e,`xdr:from`),i=X.createElement(e,`xdr:col`);i.appendChild(e.createTextNode(String(this.x)));let a=X.createElement(e,`xdr:colOff`);a.appendChild(e.createTextNode(String(this.xOff||0)));let o=X.createElement(e,`xdr:row`);o.appendChild(e.createTextNode(String(this.y)));let s=X.createElement(e,`xdr:rowOff`);s.appendChild(e.createTextNode(String(this.yOff||0))),r.appendChild(i),r.appendChild(a),r.appendChild(o),r.appendChild(s),n.appendChild(r);let c=X.createElement(e,`xdr:ext`);return c.setAttribute(`cx`,String(this.width)),c.setAttribute(`cy`,String(this.height)),n.appendChild(c),n.appendChild(t),n.appendChild(X.createElement(e,`xdr:clientData`)),n}},Tl=class{from={xOff:0,yOff:0};to={xOff:0,yOff:0};constructor(e){e&&(this.setFrom(e.from.x,e.from.y,e.from.xOff,e.from.yOff),this.setTo(e.to.x,e.to.y,e.to.xOff,e.to.yOff))}setFrom(e,t,n,r){this.from.x=e,this.from.y=t,n!==void 0&&(this.from.xOff=n),r!==void 0&&(this.from.yOff=r)}setTo(e,t,n,r){this.to.x=e,this.to.y=t,n!==void 0&&(this.to.xOff=n),r!==void 0&&(this.to.yOff=r)}toXML(e,t){let n=X.createElement(e,`xdr:twoCellAnchor`),r=X.createElement(e,`xdr:from`),i=X.createElement(e,`xdr:col`);i.appendChild(e.createTextNode(this.from.x));let a=X.createElement(e,`xdr:colOff`);a.appendChild(e.createTextNode(this.from.xOff));let o=X.createElement(e,`xdr:row`);o.appendChild(e.createTextNode(this.from.y));let s=X.createElement(e,`xdr:rowOff`);s.appendChild(e.createTextNode(this.from.yOff)),r.appendChild(i),r.appendChild(a),r.appendChild(o),r.appendChild(s);let c=X.createElement(e,`xdr:to`),l=X.createElement(e,`xdr:col`);l.appendChild(e.createTextNode(this.to.x));let u=X.createElement(e,`xdr:colOff`);u.appendChild(e.createTextNode(this.from.xOff));let d=X.createElement(e,`xdr:row`);d.appendChild(e.createTextNode(this.to.y));let f=X.createElement(e,`xdr:rowOff`);return f.appendChild(e.createTextNode(this.from.yOff)),c.appendChild(l),c.appendChild(u),c.appendChild(d),c.appendChild(f),n.appendChild(r),n.appendChild(c),n.appendChild(t),n.appendChild(X.createElement(e,`xdr:clientData`)),n}},El=class{anchor;id=Z(`Drawing`);createAnchor(e,t){switch(t??={},t.drawing=this,e){case`absoluteAnchor`:this.anchor=new Sl(t);break;case`oneCellAnchor`:this.anchor=new wl(t);break;case`twoCellAnchor`:this.anchor=new Tl(t)}return this.anchor}},Dl=class extends El{relId=null;index=null;target=null;options;constructor(e){super(),this.options=e}getMediaType(){return`chart`}setRelationshipId(e){this.relId=e}toXML(e){return this.anchor.toXML(e,this._createGraphicFrame(e))}toChartSpaceXML(){let e=X.createXmlDoc(`http://schemas.openxmlformats.org/drawingml/2006/chart`,`c:chartSpace`),t=e.documentElement;t.setAttribute(`xmlns:c`,`http://schemas.openxmlformats.org/drawingml/2006/chart`),t.setAttribute(`xmlns:a`,X.schemas.drawing),t.setAttribute(`xmlns:r`,X.schemas.relationships);let n=X.createElement(e,`c:chart`);this.options.title?(n.appendChild(this._createTitleNode(e,this.options.title)),n.appendChild(X.createElement(e,`c:autoTitleDeleted`,[[`val`,`0`]]))):n.appendChild(X.createElement(e,`c:autoTitleDeleted`,[[`val`,`1`]]));let r=X.createElement(e,`c:plotArea`),i=this._nextAxisIdBase(),a=i+1,o=i+2,s=this.options.type||`column`,c=this.options.categoriesRange||``,l=this._createPrimaryChartNode(e,s,this.options.stacking),u=this.options.series||[];u.forEach((t,n)=>{l.appendChild(this._createSeriesNode(e,t,n,s,c))});let d=this.options.dataLabels;if(d){let t=X.createElement(e,`c:dLbls`),n=(n,r)=>t.appendChild(X.createElement(e,n,[[`val`,r===!0?`1`:`0`]]));n(`c:showVal`,d.showValue),n(`c:showCatName`,d.showCategory),n(`c:showPercent`,d.showPercent),n(`c:showSerName`,d.showSeriesName),l.appendChild(t)}if(s!==`pie`&&s!==`doughnut`&&(l.appendChild(X.createElement(e,`c:axId`,[[`val`,String(a)]])),l.appendChild(X.createElement(e,`c:axId`,[[`val`,String(o)]]))),r.appendChild(l),s!==`pie`&&s!==`doughnut`){let t=this.options.axis?.x,n=this.options.axis?.y,i=t?.title,c=n?.title;s===`scatter`?(r.appendChild(this._createValueAxis(e,a,o,`b`,i,t)),r.appendChild(this._createValueAxis(e,o,a,`l`,c,n))):(r.appendChild(this._createCategoryAxis(e,a,o,i,t)),r.appendChild(this._createValueAxis(e,o,a,`l`,c,n)))}let f=this.options.legend,p=u.length>1;return(typeof f?.show==`boolean`?f.show:p)&&n.appendChild(this._createLegendNode(e,f)),n.appendChild(r),n.appendChild(X.createElement(e,`c:plotVisOnly`,[[`val`,`1`]])),t.appendChild(n),t.appendChild(X.createElement(e,`c:printSettings`)),e}_createGraphicFrame(e){let t=X.createElement(e,`xdr:graphicFrame`),n=X.createElement(e,`xdr:nvGraphicFramePr`);n.appendChild(X.createElement(e,`xdr:cNvPr`,[[`id`,String(this.index||1)],[`name`,this.options.title||`Chart`]])),n.appendChild(X.createElement(e,`xdr:cNvGraphicFramePr`)),t.appendChild(n);let r=X.createElement(e,`xdr:xfrm`);r.appendChild(X.createElement(e,`a:off`,[[`x`,`0`],[`y`,`0`]])),r.appendChild(X.createElement(e,`a:ext`,[[`cx`,String(this.options.width||4e6)],[`cy`,String(this.options.height||3e6)]])),t.appendChild(r);let i=X.createElement(e,`a:graphic`),a=X.createElement(e,`a:graphicData`,[[`uri`,`http://schemas.openxmlformats.org/drawingml/2006/chart`]]);return a.appendChild(X.createElement(e,`c:chart`,[[`xmlns:c`,`http://schemas.openxmlformats.org/drawingml/2006/chart`],[`xmlns:r`,X.schemas.relationships],[`r:id`,this.relId||``]])),i.appendChild(a),t.appendChild(i),t}_createPrimaryChartNode(e,t,n){let r,i=this._resolveGrouping(t,n);switch(t){case`line`:r=X.createElement(e,`c:lineChart`),r.appendChild(X.createElement(e,`c:grouping`,[[`val`,i]])),r.appendChild(X.createElement(e,`c:varyColors`,[[`val`,`0`]]));break;case`pie`:r=X.createElement(e,`c:pieChart`),r.appendChild(X.createElement(e,`c:grouping`,[[`val`,`clustered`]])),r.appendChild(X.createElement(e,`c:varyColors`,[[`val`,`1`]]));break;case`doughnut`:r=X.createElement(e,`c:doughnutChart`),r.appendChild(X.createElement(e,`c:grouping`,[[`val`,`clustered`]])),r.appendChild(X.createElement(e,`c:varyColors`,[[`val`,`1`]])),r.appendChild(X.createElement(e,`c:holeSize`,[[`val`,`50`]]));break;case`scatter`:r=X.createElement(e,`c:scatterChart`),r.appendChild(X.createElement(e,`c:scatterStyle`,[[`val`,`marker`]])),r.appendChild(X.createElement(e,`c:varyColors`,[[`val`,`0`]]));break;case`bar`:r=X.createElement(e,`c:barChart`),r.appendChild(X.createElement(e,`c:barDir`,[[`val`,`bar`]])),r.appendChild(X.createElement(e,`c:grouping`,[[`val`,i]])),n&&r.appendChild(X.createElement(e,`c:overlap`,[[`val`,`100`]])),r.appendChild(X.createElement(e,`c:varyColors`,[[`val`,`0`]]));break;default:r=X.createElement(e,`c:barChart`),r.appendChild(X.createElement(e,`c:barDir`,[[`val`,`col`]])),r.appendChild(X.createElement(e,`c:grouping`,[[`val`,i]])),n&&r.appendChild(X.createElement(e,`c:overlap`,[[`val`,`100`]])),r.appendChild(X.createElement(e,`c:varyColors`,[[`val`,`0`]]))}return r}_createSeriesNode(e,t,n,r,i){let a=X.createElement(e,`c:ser`),o=String(n);a.appendChild(X.createElement(e,`c:idx`,[[`val`,o]])),a.appendChild(X.createElement(e,`c:order`,[[`val`,o]]));let s=X.createElement(e,`c:tx`),c=X.createElement(e,`c:v`);if(c.appendChild(e.createTextNode(t.name)),s.appendChild(c),a.appendChild(s),r===`scatter`){let n=X.createElement(e,`c:xVal`);if(t.scatterXRange){let r=X.createElement(e,`c:numRef`),i=X.createElement(e,`c:f`);i.appendChild(e.createTextNode(t.scatterXRange)),r.appendChild(i),n.appendChild(r)}else{let t=X.createElement(e,`c:numLit`);t.appendChild(X.createElement(e,`c:ptCount`,[[`val`,`0`]])),n.appendChild(t)}a.appendChild(n);let r=X.createElement(e,`c:yVal`),i=X.createElement(e,`c:numRef`),o=X.createElement(e,`c:f`);o.appendChild(e.createTextNode(t.valuesRange)),i.appendChild(o),r.appendChild(i),a.appendChild(r)}else{if(i){let t=X.createElement(e,`c:cat`),n=X.createElement(e,`c:strRef`),r=X.createElement(e,`c:f`);r.appendChild(e.createTextNode(i)),n.appendChild(r),t.appendChild(n),a.appendChild(t)}if(t.valuesRange){let n=X.createElement(e,`c:val`),r=X.createElement(e,`c:numRef`),i=X.createElement(e,`c:f`);i.appendChild(e.createTextNode(t.valuesRange)),r.appendChild(i),n.appendChild(r),a.appendChild(n)}}return this._applySeriesColor(e,a,r,t.color),a}_applySeriesColor(e,t,n,r){if(!r||typeof r!=`string`)return;let i=r.trim().replace(/^#/,``).toUpperCase();if(/^[0-9A-F]{8}$/.test(i))i=i.slice(2);else if(!/^[0-9A-F]{6}$/.test(i))return;let a=X.createElement(e,`c:spPr`);if(n===`line`||n===`scatter`){let t=X.createElement(e,`a:ln`),n=X.createElement(e,`a:solidFill`);n.appendChild(X.createElement(e,`a:srgbClr`,[[`val`,i]])),t.appendChild(n),a.appendChild(t)}else if(n!==`pie`&&n!==`doughnut`){let t=X.createElement(e,`a:solidFill`);t.appendChild(X.createElement(e,`a:srgbClr`,[[`val`,i]])),a.appendChild(t)}else return;t.appendChild(a)}_createLegendNode(e,t){let n=X.createElement(e,`c:legend`),r={right:`r`,left:`l`,top:`t`,bottom:`b`,topRight:`tr`}[t?.position||`right`]||`r`;return n.appendChild(X.createElement(e,`c:legendPos`,[[`val`,r]])),n.appendChild(X.createElement(e,`c:layout`)),n.appendChild(X.createElement(e,`c:overlay`,[[`val`,t?.overlay?`1`:`0`]])),n}_createTitleNode(e,t){let n=X.createElement(e,`c:title`),r=X.createElement(e,`c:tx`),i=X.createElement(e,`c:rich`);i.appendChild(X.createElement(e,`a:bodyPr`)),i.appendChild(X.createElement(e,`a:lstStyle`));let a=X.createElement(e,`a:p`),o=X.createElement(e,`a:r`),s=X.createElement(e,`a:rPr`,[[`lang`,`en-US`]]);o.appendChild(s);let c=X.createElement(e,`a:t`);return c.appendChild(e.createTextNode(t)),o.appendChild(c),a.appendChild(o),a.appendChild(X.createElement(e,`a:endParaRPr`,[[`lang`,`en-US`]])),i.appendChild(a),r.appendChild(i),n.appendChild(r),n.appendChild(X.createElement(e,`c:layout`)),n.appendChild(X.createElement(e,`c:overlay`,[[`val`,`0`]])),n}_createCategoryAxis(e,t,n,r,i){let a=X.createElement(e,`c:catAx`);a.appendChild(X.createElement(e,`c:axId`,[[`val`,String(t)]]));let o=X.createElement(e,`c:scaling`);return o.appendChild(X.createElement(e,`c:orientation`,[[`val`,`minMax`]])),a.appendChild(o),a.appendChild(X.createElement(e,`c:delete`,[[`val`,`0`]])),a.appendChild(X.createElement(e,`c:axPos`,[[`val`,`b`]])),a.appendChild(X.createElement(e,`c:tickLblPos`,[[`val`,`nextTo`]])),a.appendChild(X.createElement(e,`c:crossAx`,[[`val`,String(n)]])),a.appendChild(X.createElement(e,`c:crosses`,[[`val`,`autoZero`]])),i?.showGridLines&&a.appendChild(X.createElement(e,`c:majorGridlines`)),r&&a.appendChild(this._createTitleNode(e,r)),a}_createValueAxis(e,t,n,r,i,a){let o=X.createElement(e,`c:valAx`);o.appendChild(X.createElement(e,`c:axId`,[[`val`,String(t)]]));let s=X.createElement(e,`c:scaling`);return s.appendChild(X.createElement(e,`c:orientation`,[[`val`,`minMax`]])),typeof a?.minimum==`number`&&s.appendChild(X.createElement(e,`c:min`,[[`val`,String(a.minimum)]])),typeof a?.maximum==`number`&&s.appendChild(X.createElement(e,`c:max`,[[`val`,String(a.maximum)]])),o.appendChild(s),o.appendChild(X.createElement(e,`c:delete`,[[`val`,`0`]])),o.appendChild(X.createElement(e,`c:axPos`,[[`val`,r]])),o.appendChild(X.createElement(e,`c:crossAx`,[[`val`,String(n)]])),o.appendChild(X.createElement(e,`c:crosses`,[[`val`,`autoZero`]])),o.appendChild(X.createElement(e,`c:crossBetween`,[[`val`,`between`]])),a?.showGridLines&&o.appendChild(X.createElement(e,`c:majorGridlines`)),i&&o.appendChild(this._createTitleNode(e,i)),o}_nextAxisIdBase(){return(this.index||1)*1e3}_resolveGrouping(e,t){return e===`pie`||e===`doughnut`?`clustered`:e===`line`?t===`stacked`?`stacked`:t===`percent`?`percentStacked`:`standard`:e===`bar`||e===`column`?t===`stacked`?`stacked`:t===`percent`?`percentStacked`:`clustered`:`standard`}},Ol=class extends El{id=Z(`Picture`);pictureId=X.uniqueId(`Picture`);fill={};mediaData=null;description=``;constructor(){super(),this.id=Z(`Picture`),this.pictureId=X.uniqueId(`Picture`)}setMedia(e){this.mediaData=e}setDescription(e){this.description=e}setFillType(e){this.fill.type=e}setFillConfig(e){Object.assign(this.fill,e)}getMediaType(){return`image`}getMediaData(){return this.mediaData}setRelationshipId(e){this.mediaData.rId=e}toXML(e){let t=X.createElement(e,`xdr:pic`),n=X.createElement(e,`xdr:nvPicPr`),r=X.createElement(e,`xdr:cNvPr`,[[`id`,this.pictureId],[`name`,this.mediaData.fileName],[`descr`,this.description||``]]);n.appendChild(r);let i=X.createElement(e,`xdr:cNvPicPr`);i.appendChild(X.createElement(e,`a:picLocks`,[[`noChangeAspect`,`1`],[`noChangeArrowheads`,`1`]])),n.appendChild(i),t.appendChild(n);let a=X.createElement(e,`xdr:blipFill`);a.appendChild(X.createElement(e,`a:blip`,[[`xmlns:r`,X.schemas.relationships],[`r:embed`,this.mediaData.rId]])),a.appendChild(X.createElement(e,`a:srcRect`));let o=X.createElement(e,`a:stretch`);o.appendChild(X.createElement(e,`a:fillRect`)),a.appendChild(o),t.appendChild(a);let s=X.createElement(e,`xdr:spPr`,[[`bwMode`,`auto`]]),c=X.createElement(e,`a:xfrm`);s.appendChild(c);let l=X.createElement(e,`a:prstGeom`,[[`prst`,`rect`]]);return s.appendChild(l),t.appendChild(s),this.anchor.toXML(e,t)}},kl={},Al=class{relations={};lastId=1;constructor(){Z(`rId`)}importData(e){this.relations=e.relations,this.lastId=e.lastId}exportData(){return{relations:this.relations,lastId:this.lastId}}addRelation(e,t){return this.relations[e.id]={id:Z(`rId`),schema:X.schemas[t],object:e},this.relations[e.id].id}getRelationshipId(e){return this.relations[e.id]?this.relations[e.id].id:null}toXML(){let e=X.createXmlDoc(X.schemas.relationshipPackage,`Relationships`),t=e.documentElement;for(let[n,r]of Object.entries(this.relations)){let i=X.createElement(e,`Relationship`,[[`Id`,r.id],[`Type`,r.schema],[`Target`,r.object.target||kl[n]]]);r.object.targetMode&&i.setAttribute(`TargetMode`,r.object.targetMode),t.appendChild(i)}return e}},jl=class{drawings=[];relations=new Al;id=Z(`Drawings`);addDrawing(e){this.drawings.push(e)}getCount(){return this.drawings.length}toXML(){let e=X.createXmlDoc(X.schemas.spreadsheetDrawing,`xdr:wsDr`),t=e.documentElement;t.setAttribute(`xmlns:a`,X.schemas.drawing),t.setAttribute(`xmlns:r`,X.schemas.relationships),t.setAttribute(`xmlns:xdr`,X.schemas.spreadsheetDrawing);for(let n=0,r=this.drawings.length;n<r;n++){let r=this.drawings[n];if(r instanceof Ol){let n=this.relations.getRelationshipId(r.getMediaData());n||=this.relations.addRelation(r.getMediaData(),r.getMediaType()),r.setRelationshipId(n),t.appendChild(r.toXML(e))}else if(r instanceof Dl){let n=this.relations.getRelationshipId(r);n||=this.relations.addRelation(r,r.getMediaType()),r.setRelationshipId(n),t.appendChild(r.toXML(e))}}return e}},Ml=class{state=null;xSplit=null;ySplit=null;activePane=`bottomRight`;topLeftCell=null;_freezePane;freezePane(e,t,n){this._freezePane={xSplit:e,ySplit:t,cell:n}}exportXML(e){let t=e.createElement(`pane`);return this.state!==null&&(t.setAttribute(`xSplit`,this._freezePane.xSplit),t.setAttribute(`ySplit`,this._freezePane.ySplit),t.setAttribute(`topLeftCell`,this._freezePane.cell),t.setAttribute(`activePane`,`bottomRight`),t.setAttribute(`state`,`frozen`)),t}},Nl=class{static pixelsToEMUs(e){return Math.round(e*914400/96)}},Pl=class{strings={};stringArray=[];id=Z(`SharedStrings`);addString(e){return this.strings[e]=this.stringArray.length,this.stringArray[this.stringArray.length]=e,this.strings[e]}exportData(){return this.strings}toXML(){let e=X.createXmlDoc(X.schemas.spreadsheetml,`sst`),t=e.documentElement;this.stringArray.reverse();let n=this.stringArray.length;t.setAttribute(`count`,n),t.setAttribute(`uniqueCount`,n);let r=e.createElement(`si`),i=e.createElement(`t`);i.appendChild(e.createTextNode(`--placeholder--`)),r.appendChild(i);let a=this.stringArray;for(;n--;){let e=r.cloneNode(!0);typeof a[n]==`string`&&a[n].match(/\s+/)&&e.firstChild.setAttribute(`xml:space`,`preserve`),e.firstChild.firstChild.nodeValue=a[n],t.appendChild(e)}return e}},Fl=class{pane;showZeros=null;defaultGridColor=null;colorId=null;rightToLeft=null;showFormulas=null;showGridLines=null;showOutlineSymbols=null;showRowColHeaders=null;showRuler=null;showWhiteSpace=null;tabSelected=null;topLeftCell=null;viewType=null;windowProtection=null;zoomScale=null;zoomScaleNormal=null;zoomScalePageLayoutView=null;zoomScaleSheetLayoutView=null;constructor(e){let t=e||{};this.pane=t.pane||new Ml}freezePane(e,t,n){this.pane.state=`frozen`,this.pane.xSplit=e,this.pane.ySplit=t,this.pane.topLeftCell=n}exportXML(e){let t=e.createElement(`sheetViews`),n=e.createElement(`sheetView`);return X.setAttributesOnDoc(n,{workbookViewId:0,showZeros:{v:this.showZeros,type:Boolean},defaultGridColor:{v:this.defaultGridColor,type:Boolean},colorId:this.colorId,rightToLeft:{v:this.rightToLeft,type:Boolean},showFormulas:{v:this.showFormulas,type:Boolean},showGridLines:{v:this.showGridLines,type:Boolean},showOutlineSymbols:{v:this.showOutlineSymbols,type:Boolean},showRowColHeaders:{v:this.showRowColHeaders,type:Boolean},showRuler:{v:this.showRuler,type:Boolean},showWhiteSpace:{v:this.showWhiteSpace,type:Boolean},tabSelected:{v:this.tabSelected,type:Boolean},viewType:this.viewType,windowProtection:{v:this.windowProtection,type:Boolean},zoomScale:{v:this.zoomScale,type:Boolean},zoomScaleNormal:this.zoomScaleNormal,zoomScalePageLayoutView:this.zoomScalePageLayoutView,zoomScaleSheetLayoutView:this.zoomScaleSheetLayoutView}),n.appendChild(this.pane.exportXML(e)),t.appendChild(n),t}};function Il(e,t){return t.reduce((t,n)=>(e?.hasOwnProperty(n)&&(t[n]=e[n]),t),{})}var Ll=class{id=Z(`StyleSheet`);cellStyles=[{name:`Normal`,xfId:`0`,builtinId:`0`}];defaultTableStyle=!1;differentialStyles=[{}];masterCellFormats=[{numFmtId:0,fontId:0,fillId:0,borderId:0,xfid:0}];masterCellStyles=[{numFmtId:0,fontId:0,fillId:0,borderId:0}];fonts=[{}];numberFormatters=[];fills=[{},{type:`pattern`,patternType:`gray125`,fgColor:`FF333333`,bgColor:`FF333333`}];borders=[{top:{},left:{},right:{},bottom:{},diagonal:{}}];tableStyles=[];createSimpleFormatter(e){let t={id:this.masterCellFormats.length};return e===`date`&&(t.numFmtId=14),this.masterCellFormats.push(t),t}createFill(e){let t=this.fills.length,n=e;return n.id=t,this.fills.push(n),n}createNumberFormatter(e){let t={id:this.numberFormatters.length+100,formatCode:e};return this.numberFormatters.push(t),t}createFormat(e){let t={id:this.masterCellFormats.length};if(e.protection&&(t.protection=e.protection),e.font&&ml(e.font))t.fontId=this.createFontStyle(e.font).id;else if(e.font){if(Number.isNaN(Number.parseInt(e.font,10)))throw Error(`Passing a non-numeric font id is not supported`);t.fontId=e.font}if(e.format&&gl(e.format))t.numFmtId=this.createNumberFormatter(e.format).id;else if(e.format){if(Number.isNaN(Number.parseInt(e.format,10)))throw Error(`Invalid number formatter id`);t.numFmtId=e.format}if(e.border&&ml(e.border))t.borderId=this.createBorderFormatter(e.border).id;else if(e.border){if(Number.isNaN(Number.parseInt(e.border,10)))throw Error(`Passing a non-numeric border id is not supported`);t.borderId=e.border}if(e.fill&&ml(e.fill))t.fillId=this.createFill(e.fill).id;else if(e.fill){if(Number.isNaN(Number.parseInt(e.fill,10)))throw Error(`Passing a non-numeric fill id is not supported`);t.fillId=e.fill}return e.alignment&&ml(e.alignment)&&(t.alignment=Il(e.alignment,[`horizontal`,`justifyLastLine`,`readingOrder`,`relativeIndent`,`shrinkToFit`,`textRotation`,`vertical`,`wrapText`])),this.masterCellFormats.push(t),t}createDifferentialStyle(e){let t=this.differentialStyles.length,n={id:t};return e.font&&ml(e.font)&&(n.font=e.font),e.border&&ml(e.border)&&(n.border=Object.assign({top:{},left:{},right:{},bottom:{},diagonal:{}},e.border)),e.fill&&ml(e.fill)&&(n.fill=e.fill),e.alignment&&ml(e.alignment)&&(n.alignment=e.alignment),e.format&&gl(e.format)&&(n.numFmt=e.format),this.differentialStyles[t]=n,n}createTableStyle(e){this.tableStyles.push(e)}createBorderFormatter(e){return e={top:{},left:{},right:{},bottom:{},diagonal:{},id:this.borders.length,...e},this.borders.push(e),e}createFontStyle(e){let t={id:this.fonts.length};return e.bold&&(t.bold=!0),e.italic&&(t.italic=!0),e.superscript&&(t.vertAlign=`superscript`),e.subscript&&(t.vertAlign=`subscript`),e.underline&&(t.underline=typeof e.underline==`string`&&[`double`,`singleAccounting`,`doubleAccounting`].includes(e.underline)?e.underline:!0),e.strike&&(t.strike=!0),e.outline&&(t.outline=!0),e.shadow&&(t.shadow=!0),e.size&&(t.size=e.size),e.color&&(t.color=e.color),e.fontName&&(t.fontName=e.fontName),this.fonts.push(t),t}exportBorders(e){let t=e.createElement(`borders`);t.setAttribute(`count`,this.borders.length);for(let n=0,r=this.borders.length;n<r;n++)t.appendChild(this.exportBorder(e,this.borders[n]));return t}exportBorder(e,t){let n=e.createElement(`border`),r=n=>{let r=e.createElement(n);return t[n].style&&r.setAttribute(`style`,t[n].style),t[n].color&&r.appendChild(this.exportColor(e,t[n].color)),r};return n.appendChild(r(`left`)),n.appendChild(r(`right`)),n.appendChild(r(`top`)),n.appendChild(r(`bottom`)),n.appendChild(r(`diagonal`)),n}exportColor(e,t){let n=e.createElement(`color`);return gl(t)?(n.setAttribute(`rgb`,t),n):(t.tint!==void 0&&n.setAttribute(`tint`,t.tint),t.auto!==void 0&&n.setAttribute(`auto`,String(!!t.auto)),t.theme!==void 0&&n.setAttribute(`theme`,t.theme),n)}exportMasterCellFormats(e){let t=X.createElement(e,`cellXfs`,[[`count`,this.masterCellFormats.length]]);for(let n=0,r=this.masterCellFormats.length;n<r;n++){let r=this.masterCellFormats[n];t.appendChild(this.exportCellFormatElement(e,r))}return t}exportMasterCellStyles(e){let t=X.createElement(e,`cellStyleXfs`,[[`count`,this.masterCellStyles.length]]);for(let n=0,r=this.masterCellStyles.length;n<r;n++){let r=this.masterCellStyles[n];t.appendChild(this.exportCellFormatElement(e,r))}return t}exportCellFormatElement(e,t){let n=e.createElement(`xf`),r=[`applyAlignment`,`applyBorder`,`applyFill`,`applyFont`,`applyNumberFormat`,`applyProtection`,`borderId`,`fillId`,`fontId`,`numFmtId`,`pivotButton`,`quotePrefix`,`xfId`],i=Object.keys(t).filter(e=>r.indexOf(e)!==-1);if(t.alignment){let r=t.alignment;n.appendChild(this.exportAlignment(e,r))}t.protection&&(n.appendChild(this.exportProtection(e,t.protection)),n.setAttribute(`applyProtection`,`1`));let a=i.length;for(;a--;)n.setAttribute(i[a],t[i[a]]);return t.fillId&&n.setAttribute(`applyFill`,`1`),t.fontId&&n.setAttribute(`applyFont`,`1`),t.borderId&&n.setAttribute(`applyBorder`,`1`),t.alignment&&n.setAttribute(`applyAlignment`,`1`),t.numFmtId&&n.setAttribute(`applyNumberFormat`,`1`),t.numFmtId!==void 0&&t.xfId===void 0&&n.setAttribute(`xfId`,`0`),n}exportAlignment(e,t){let n=e.createElement(`alignment`),r=Object.keys(t);for(let e=0,i=r.length;e<i;e++)n.setAttribute(r[e],t[r[e]]);return n}exportFonts(e){let t=e.createElement(`fonts`);t.setAttribute(`count`,String(this.fonts.length));for(let n=0,r=this.fonts.length;n<r;n++){let r=this.fonts[n];t.appendChild(this.exportFont(e,r))}return t}exportFont(e,t){let n=e.createElement(`font`);if(t.size){let r=e.createElement(`sz`);r.setAttribute(`val`,t.size),n.appendChild(r)}if(t.fontName){let r=e.createElement(`name`);r.setAttribute(`val`,t.fontName),n.appendChild(r)}if(t.bold&&n.appendChild(e.createElement(`b`)),t.italic&&n.appendChild(e.createElement(`i`)),t.vertAlign){let r=e.createElement(`vertAlign`);r.setAttribute(`val`,t.vertAlign),n.appendChild(r)}if(t.underline){let r=e.createElement(`u`);t.underline!==!0&&r.setAttribute(`val`,t.underline),n.appendChild(r)}return t.strike&&n.appendChild(e.createElement(`strike`)),t.shadow&&n.appendChild(e.createElement(`shadow`)),t.outline&&n.appendChild(e.createElement(`outline`)),t.color&&n.appendChild(this.exportColor(e,t.color)),n}exportFills(e){let t=e.createElement(`fills`);t.setAttribute(`count`,String(this.fills.length));for(let n=0,r=this.fills.length;n<r;n++){let r=this.fills[n];t.appendChild(this.exportFill(e,r))}return t}exportFill(e,t){let n,r=e.createElement(`fill`);return t.type===`pattern`?(n=this.exportPatternFill(e,t),r.appendChild(n)):t.type===`gradient`&&(n=this.exportGradientFill(e,t),r.appendChild(n)),r}exportGradientFill(e,t){let n=e.createElement(`gradientFill`);t.degree?n.setAttribute(`degree`,t.degree):t.left&&(n.setAttribute(`left`,t.left),n.setAttribute(`right`,t.right),n.setAttribute(`top`,t.top),n.setAttribute(`bottom`,t.bottom));let r=e.createElement(`stop`);r.setAttribute(`position`,t.start.pureAt||0);let i=e.createElement(`color`);typeof t.start==`string`||t.start.color?i.setAttribute(`rgb`,t.start.color||t.start):t.start.theme&&i.setAttribute(`theme`,t.start.theme);let a=e.createElement(`stop`),o=e.createElement(`color`);return a.setAttribute(`position`,t.end.pureAt||1),typeof t.start==`string`||t.end.color?o.setAttribute(`rgb`,t.end.color||t.end):t.end.theme&&o.setAttribute(`theme`,t.end.theme),r.appendChild(i),a.appendChild(o),n.appendChild(r),n.appendChild(a),n}exportPatternFill(e,t){let n=X.createElement(e,`patternFill`,[[`patternType`,t.patternType]]);t.bgColor||=`FFFFFFFF`,t.fgColor||=`FFFFFFFF`;let r=e.createElement(`bgColor`);gl(t.bgColor)?r.setAttribute(`rgb`,t.bgColor):t.bgColor.theme?r.setAttribute(`theme`,t.bgColor.theme):r.setAttribute(`rgb`,t.bgColor.rbg);let i=e.createElement(`fgColor`);return gl(t.fgColor)?i.setAttribute(`rgb`,t.fgColor):t.fgColor.theme?i.setAttribute(`theme`,t.fgColor.theme):i.setAttribute(`rgb`,t.fgColor.rbg),n.appendChild(i),n.appendChild(r),n}exportNumberFormatters(e){let t=e.createElement(`numFmts`);t.setAttribute(`count`,String(this.numberFormatters.length));for(let n=0,r=this.numberFormatters.length;n<r;n++){let r=this.numberFormatters[n];t.appendChild(this.exportNumberFormatter(e,r))}return t}exportNumberFormatter(e,t){let n=e.createElement(`numFmt`);return n.setAttribute(`numFmtId`,t.id),n.setAttribute(`formatCode`,t.formatCode),n}exportCellStyles(e){let t=e.createElement(`cellStyles`);t.setAttribute(`count`,String(this.cellStyles.length));for(let n=0,r=this.cellStyles.length;n<r;n++){let r=this.cellStyles[n];delete r.id;let i=X.createElement(e,`cellStyle`);t.appendChild(i);let a=Object.keys(r),o=a.length;for(;o--;)i.setAttribute(a[o],r[a[o]])}return t}exportDifferentialStyles(e){let t=e.createElement(`dxfs`);t.setAttribute(`count`,String(this.differentialStyles.length));for(let n=0,r=this.differentialStyles.length;n<r;n++){let r=this.differentialStyles[n];t.appendChild(this.exportDFX(e,r))}return t}exportDFX(e,t){let n=e.createElement(`dxf`);return t.font&&n.appendChild(this.exportFont(e,t.font)),t.fill&&n.appendChild(this.exportFill(e,t.fill)),t.border&&n.appendChild(this.exportBorder(e,t.border)),t.numFmt&&n.appendChild(this.exportNumberFormatter(e,t.numFmt)),t.alignment&&n.appendChild(this.exportAlignment(e,t.alignment)),n}exportTableStyles(e){let t=e.createElement(`tableStyles`);t.setAttribute(`count`,String(this.tableStyles.length)),this.defaultTableStyle&&t.setAttribute(`defaultTableStyle`,String(this.defaultTableStyle));for(let n=0,r=this.tableStyles.length;n<r;n++)t.appendChild(this.exportTableStyle(e,this.tableStyles[n]));return t}exportTableStyle(e,t){let n=e.createElement(`tableStyle`);n.setAttribute(`name`,t.name),n.setAttribute(`pivot`,`0`);let r=0;return Object.entries(t).forEach(([t,i])=>{if(t===`name`)return;r++;let a=e.createElement(`tableStyleElement`);a.setAttribute(`type`,t),a.setAttribute(`dxfId`,i),n.appendChild(a)}),n.setAttribute(`count`,String(r)),n}exportProtection(e,t){let n=e.createElement(`protection`);for(let e in t)e in t&&n.setAttribute(e,t[e]);return n}toXML(){let e=X.createXmlDoc(X.schemas.spreadsheetml,`styleSheet`),t=e.documentElement;return t.appendChild(this.exportNumberFormatters(e)),t.appendChild(this.exportFonts(e)),t.appendChild(this.exportFills(e)),t.appendChild(this.exportBorders(e)),t.appendChild(this.exportMasterCellStyles(e)),t.appendChild(this.exportMasterCellFormats(e)),t.appendChild(this.exportCellStyles(e)),t.appendChild(this.exportDifferentialStyles(e)),this.tableStyles.length&&t.appendChild(this.exportTableStyles(e)),e}},Rl=class{name=``;id=``;tableId=``;displayName=``;dataCellStyle=null;dataDfxId=null;headerRowBorderDxfId=null;headerRowCellStyle=null;headerRowCount=1;headerRowDxfId=null;insertRow=!1;insertRowShift=!1;ref=null;tableBorderDxfId=null;totalsRowBorderDxfId=null;totalsRowCellStyle=null;totalsRowCount=0;totalsRowDxfId=null;tableColumns=[];autoFilter=null;sortState=null;styleInfo={};constructor(e){this.initialize(e)}initialize(e){this.displayName=Z(`Table`),this.name=this.displayName,this.id=this.name,this.tableId=this.id.replace(`Table`,``),e&&Object.assign(this,e)}setReferenceRange(e,t){this.ref=[e,t]}setTableColumns(e){e.forEach(e=>{this.addTableColumn(e)})}addTableColumn(e){let t=gl(e)?{name:e}:e;if(!t.name)throw Error(`Invalid argument for addTableColumn - minimum requirement is a name property`);this.tableColumns.push(t)}setSortState(e){this.sortState=e}toXML(){if(!this.ref)throw Error(`Needs at least a reference range`);let e=X.createXmlDoc(X.schemas.spreadsheetml,`table`),t=e.documentElement;t.setAttribute(`id`,this.tableId),t.setAttribute(`name`,this.name),t.setAttribute(`displayName`,this.displayName);let n=this.ref[0],r=this.ref[1];return t.setAttribute(`ref`,`${X.positionToLetterRef(n[0],n[1])}:${X.positionToLetterRef(r[0],r[1])}`),t.setAttribute(`totalsRowCount`,String(this.totalsRowCount)),t.setAttribute(`headerRowCount`,String(this.headerRowCount)),this.headerRowDxfId&&t.setAttribute(`headerRowDxfId`,String(this.headerRowDxfId)),this.headerRowBorderDxfId&&t.setAttribute(`headerRowBorderDxfId`,String(this.headerRowBorderDxfId)),this.autoFilter||this.addAutoFilter(this.ref[0],this.ref[1]),t.appendChild(this.exportAutoFilter(e)),t.appendChild(this.exportTableColumns(e)),t.appendChild(this.exportTableStyleInfo(e)),e}exportTableColumns(e){let t=e.createElement(`tableColumns`);t.setAttribute(`count`,String(this.tableColumns.length));for(let n=0,r=this.tableColumns.length;n<r;n++){let r=this.tableColumns[n],i=e.createElement(`tableColumn`);i.setAttribute(`id`,String(n+1)),i.setAttribute(`name`,r.name),r.totalsRowFunction&&i.setAttribute(`totalsRowFunction`,r.totalsRowFunction),r.totalsRowLabel&&i.setAttribute(`totalsRowLabel`,r.totalsRowLabel),t.appendChild(i)}return t}exportAutoFilter(e){let t=e.createElement(`autoFilter`);if(this.autoFilter){let e=this.autoFilter[0],n=this.autoFilter[1];t.setAttribute(`ref`,`${X.positionToLetterRef(e[0],e[1])}:${X.positionToLetterRef(n[0],n[1]-this.totalsRowCount)}`)}return t}exportTableStyleInfo(e){let t=this.styleInfo,n=e.createElement(`tableStyleInfo`);return n.setAttribute(`name`,t.themeStyle??``),n.setAttribute(`showFirstColumn`,t.showFirstColumn?`1`:`0`),n.setAttribute(`showLastColumn`,t.showLastColumn?`1`:`0`),n.setAttribute(`showColumnStripes`,t.showColumnStripes?`1`:`0`),n.setAttribute(`showRowStripes`,t.showRowStripes?`1`:`0`),n}addAutoFilter(e,t){this.autoFilter=[e,t]}},zl=class{name=``;id=Z(`Worksheet`);_timezoneOffset;relations=null;columnFormats=[];data=[];mergedCells=[];columns=[];sheetProtection=!1;_headers=[];_footers=[];_tables=[];_drawings=[];_orientation;_margin;_rowInstructions={};_freezePane={};sharedStrings=null;hyperlinks=[];sheetView;showZeros=null;constructor(e){this._timezoneOffset=new Date().getTimezoneOffset()*60*1e3,this.sheetView=e.sheetView||new Fl,this.initialize(e)}initialize(e){e||={},this.name=e.name,this.id=Z(`Worksheet`),this._timezoneOffset=new Date().getTimezoneOffset()*60*1e3,e.columns&&this.setColumns(e.columns),this.relations=new Al}exportData(){return{relations:this.relations?.exportData(),columnFormats:this.columnFormats,data:this.data,columns:this.columns,mergedCells:this.mergedCells,_headers:this._headers,_footers:this._footers,_tables:this._tables,_rowInstructions:this._rowInstructions,_freezePane:this._freezePane,name:this.name,id:this.id}}importData(e){this.relations?.importData(e.relations),delete e.relations,Object.assign(this,e)}setSharedStringCollection(e){this.sharedStrings=e}addTable(e){this._tables.push(e),this.relations?.addRelation(e,`table`)}addDrawings(e){this._drawings.push(e),this.relations?.addRelation(e,`drawingRelationship`)}setRowInstructions(e,t){this._rowInstructions[e]=t}setHeader(e){if(!Array.isArray(e))throw Error(`Invalid argument type - setHeader expects an array of three instructions`);this._headers=e}setFooter(e){if(!Array.isArray(e))throw Error(`Invalid argument type - setFooter expects an array of three instructions`);this._footers=e}compilePageDetailPackage(e){return e||=``,[`&L`,this.compilePageDetailPiece(e[0]||``),`&C`,this.compilePageDetailPiece(e[1]||``),`&R`,this.compilePageDetailPiece(e[2]||``)].join(``)}compilePageDetailPiece(e){if(gl(e))return`&"-,Regular"${e}`;if(ml(e)&&!Array.isArray(e)){let t=``;if(e.font||e.bold){let n=e.bold?`Bold`:`Regular`;t+=`&"${e.font||`-`}`,t+=`,${n}"`}else t+=`&"-,Regular"`;return e.underline&&(t+=`&U`),e.fontSize&&(t+=`&${e.fontSize}`),t+=e.text,t}if(Array.isArray(e))return e.reduce((e,t)=>e.concat(this.compilePageDetailPiece(t)),``)}exportHeader(e){let t=e.createElement(`oddHeader`);return t.appendChild(e.createTextNode(this.compilePageDetailPackage(this._headers))),t}exportFooter(e){let t=e.createElement(`oddFooter`);return t.appendChild(e.createTextNode(this.compilePageDetailPackage(this._footers))),t}_buildCache(e){let t=e.createElement(`c`),n=e.createElement(`v`);n.appendChild(e.createTextNode(`--temp--`)),t.appendChild(n);let r=e.createElement(`c`),i=e.createElement(`f`);i.appendChild(e.createTextNode(`--temp--`)),r.appendChild(i);let a=e.createElement(`c`);a.setAttribute(`t`,`s`);let o=e.createElement(`v`);o.appendChild(e.createTextNode(`--temp--`)),a.appendChild(o);let s=e.createElement(`c`);s.setAttribute(`t`,`b`);let c=e.createElement(`v`);return c.appendChild(e.createTextNode(`--temp--`)),s.appendChild(c),{number:t,date:t,string:a,formula:r,boolean:s}}collectSharedStrings(){let e=this.data,t=0,n={};for(let r=0,i=e.length;r<i;r++){let i=e[r],a=i.length;t=a>t?a:t;for(let e=0;e<a;e++){let t=i[e],r=t?.metadata||{};t&&typeof t==`object`&&(t=t.value),r.type||(typeof t==`number`?r.type=`number`:typeof t==`boolean`&&(r.type=`boolean`)),(r.type===`text`||!r.type)&&n[t]===void 0&&(n[t]=!0)}}return Object.keys(n)}toXML(){let e=this.data,t=this.columns||[],n=X.createXmlDoc(X.schemas.spreadsheetml,`worksheet`),r=n.documentElement,i,a,o;r.setAttribute(`xmlns:r`,X.schemas.relationships),r.setAttribute(`xmlns:mc`,X.schemas.markupCompat);let s=0,c=X.createElement(n,`sheetData`),l=this._buildCache(n);for(o=0,a=e.length;o<a;o++){let r=e[o],i=r.length;s=i>s?i:s;let a=n.createElement(`row`);for(let e=0;e<i;e++){t[e]=t[e]||{};let n=r[e],i,s=n?.metadata||{};switch(n&&typeof n==`object`&&(n=n.value),s.type||(typeof n==`number`?s.type=`number`:typeof n==`boolean`&&(s.type=`boolean`)),s.type){case`number`:i=l.number.cloneNode(!0),i.firstChild.firstChild.nodeValue=n;break;case`date`:i=l.date.cloneNode(!0),n instanceof Date&&(n=n.getTime()),i.firstChild.firstChild.nodeValue=25569+(n-this._timezoneOffset)/864e5;break;case`boolean`:i=l.boolean.cloneNode(!0),i.firstChild.firstChild.nodeValue=n?`1`:`0`;break;case`formula`:i=l.formula.cloneNode(!0),i.firstChild.firstChild.nodeValue=n;break;default:{let e;e=this.sharedStrings?.strings[n]===void 0?this.sharedStrings?.addString(n):this.sharedStrings.strings[n],i=l.string.cloneNode(!0),i.firstChild.firstChild.nodeValue=e;break}}s.style?i.setAttribute(`s`,s.style):this._rowInstructions[o]?.style!==void 0&&i.setAttribute(`s`,this._rowInstructions[o].style),i.setAttribute(`r`,X.positionToLetterRef(e+1,String(o+1))),a.appendChild(i)}if(a.setAttribute(`r`,o+1),this._rowInstructions[o]){let e=this._rowInstructions[o];e.height!==void 0&&(a.setAttribute(`customHeight`,`1`),a.setAttribute(`ht`,e.height)),e.style!==void 0&&(a.setAttribute(`customFormat`,`1`),a.setAttribute(`s`,e.style))}c.appendChild(a)}if(s===0?r.appendChild(X.createElement(n,`dimension`,[[`ref`,X.positionToLetterRef(1,1)]])):r.appendChild(X.createElement(n,`dimension`,[[`ref`,`${X.positionToLetterRef(1,1)}:${X.positionToLetterRef(s,String(e.length))}`]])),r.appendChild(this.sheetView.exportXML(n)),this.columns.length&&r.appendChild(this.exportColumns(n)),r.appendChild(c),this.sheetProtection&&r.appendChild(this.sheetProtection.exportXML(n)),this.hyperlinks.length>0){let e=n.createElement(`hyperlinks`),t=this.hyperlinks;for(i=0,a=t.length;i<a;i++){let r=n.createElement(`hyperlink`),a=t[i];r.setAttribute(`ref`,String(a.cell)),a.id=X.uniqueId(`hyperlink`),this.relations&&(this.relations.addRelation({id:a.id,target:a.location,targetMode:a.targetMode||`External`},`hyperlink`),r.setAttribute(`r:id`,this.relations.getRelationshipId(a))),e.appendChild(r)}r.appendChild(e)}if(this.mergedCells.length>0){let e=n.createElement(`mergeCells`);for(i=0,a=this.mergedCells.length;i<a;i++){let t=n.createElement(`mergeCell`);t.setAttribute(`ref`,`${this.mergedCells[i][0]}:${this.mergedCells[i][1]}`),e.appendChild(t)}r.appendChild(e)}if(this.exportPageSettings(n,r),this._headers.length>0||this._footers.length>0){let e=n.createElement(`headerFooter`);this._headers.length>0&&e.appendChild(this.exportHeader(n)),this._footers.length>0&&e.appendChild(this.exportFooter(n)),r.appendChild(e)}for(i=0,a=this._drawings.length;i<a;i++){let e=n.createElement(`drawing`);this.relations&&e.setAttribute(`r:id`,this.relations.getRelationshipId(this._drawings[i])),r.appendChild(e)}if(this._tables.length>0){let e=n.createElement(`tableParts`);for(e.setAttribute(`count`,this._tables.length),i=0,a=this._tables.length;i<a;i++){let t=n.createElement(`tablePart`);this.relations&&t.setAttribute(`r:id`,this.relations.getRelationshipId(this._tables[i])),e.appendChild(t)}r.appendChild(e)}return n}exportColumns(e){let t=X.createElement(e,`cols`);for(let n=0,r=this.columns.length;n<r;n++){let r=this.columns[n],i=X.createElement(e,`col`,[[`min`,r.min||n+1],[`max`,r.max||n+1]]);r.hidden&&i.setAttribute(`hidden`,`1`),r.bestFit&&i.setAttribute(`bestFit`,`1`),(r.customWidth||r.width)&&i.setAttribute(`customWidth`,`1`),r.width?i.setAttribute(`width`,r.width):i.setAttribute(`width`,`9.140625`),t.appendChild(i)}return t}exportPageSettings(e,t){if(this._margin){let n=.7,r=this._margin.left?this._margin.left:n,i=this._margin.right?this._margin.right:n,a=this._margin.top?this._margin.top:n,o=this._margin.bottom?this._margin.bottom:n;n=.3;let s=this._margin.header?this._margin.header:n,c=this._margin.footer?this._margin.footer:n;t.appendChild(X.createElement(e,`pageMargins`,[[`top`,a],[`bottom`,o],[`left`,r],[`right`,i],[`header`,s],[`footer`,c]]))}this._orientation&&t.appendChild(X.createElement(e,`pageSetup`,[[`orientation`,this._orientation]]))}setPageOrientation(e){this._orientation=e}setPageMargin(e){this._margin=e}setColumns(e){this.columns=e}setData(e){this.data=e}mergeCells(e,t){this.mergedCells.push([e,t])}freezePane(e,t,n){this.sheetView.freezePane(e,t,n)}setColumnFormats(e){this.columnFormats=e}getWorksheetXmlHeader(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="${X.schemas.spreadsheetml}"
           xmlns:r="${X.schemas.relationships}"
           xmlns:mc="${X.schemas.markupCompat}">`}getWorksheetXmlFooter(){if(this._headers.length>0||this._footers.length>0){let e=`<headerFooter>`;return this._headers.length>0&&(e+=`<oddHeader>${this.compilePageDetailPackage(this._headers)}</oddHeader>`),this._footers.length>0&&(e+=`<oddFooter>${this.compilePageDetailPackage(this._footers)}</oddFooter>`),e+=`</headerFooter>`,e}return``}serializeRows(e,t=0){let n=``;for(let r=0,i=e.length;r<i;r++){let i=e[r],a=i.length,o=`<row r="${t+r+1}">`;for(let e=0;e<a;e++){let n=i[e],a=typeof n||`text`,s=``,c=` r="${String.fromCharCode(65+e)}${t+r+1}"`;switch(a){case`number`:s=`<c${c}><v>${n}</v></c>`;break;case`boolean`:s=`<c${c} t="b"><v>${n?`1`:`0`}</v></c>`;break;default:{let e;e=this.sharedStrings?.strings[n]===void 0?this.sharedStrings?.addString(n):this.sharedStrings.strings[n],s=`<c${c} t="s"><v>${e}</v></c>`;break}}o+=s}o+=`</row>`,n+=o}return n}},Bl=class{id=Z(`Workbook`);styleSheet=new Ll;sharedStrings=new Pl;relations=new Al;worksheets=[];charts=[];tables=[];drawings=[];media={};printTitles;definedNames=[];constructor(){this.initialize()}initialize(){this.id=Z(`Workbook`),this.styleSheet=new Ll,this.sharedStrings=new Pl,this.relations=new Al,this.relations.addRelation(this.styleSheet,`stylesheet`),this.relations.addRelation(this.sharedStrings,`sharedStrings`),this.definedNames=[]}validateDefinedName(e){if(typeof e!=`string`||!e.trim())throw Error(`Defined name must be a non-empty string.`);let t=e.trim();if(t.length>255)throw Error(`Defined name "${t}" is too long (max 255 chars).`);if(!/^[A-Za-z_\\][A-Za-z0-9_.\\]*$/.test(t))throw Error(`Defined name "${t}" is invalid. Use letters/numbers/underscore/period and start with a letter, underscore, or backslash.`);if(/^[A-Za-z]{1,3}[1-9][0-9]*$/i.test(t)||/^R[1-9][0-9]*C[1-9][0-9]*$/i.test(t))throw Error(`Defined name "${t}" is invalid because it looks like a cell reference.`)}resolveDefinedNameScope(e){if(e===void 0)return;if(typeof e==`number`){if(!Number.isInteger(e)||e<0||e>=this.worksheets.length)throw Error(`Defined name scope index "${e}" is out of range.`);return e}let t=this.worksheets.findIndex(t=>t.name===e);if(t<0)throw Error(`Defined name scope worksheet "${e}" was not found.`);return t}addDefinedName(e,t,n,r){if(this.validateDefinedName(e),typeof t!=`string`||!t.trim())throw Error(`Defined name refersTo must be a non-empty string.`);let i=t.trim();if(!i.startsWith(`=`))throw Error(`Defined name refersTo "${t}" must start with '='.`);this.definedNames.push({name:e.trim(),refersTo:i,scope:n,comment:r?.comment,hidden:r?.hidden})}addCustomFunction(e,t,n,r){if(this.validateDefinedName(e),!Array.isArray(t)||t.length===0||t.some(e=>typeof e!=`string`||!e.trim()))throw Error(`Custom function "${e}" must provide at least one argument name.`);if(typeof n!=`string`||!n.trim())throw Error(`Custom function "${e}" must provide a non-empty formula body.`);let i=r?.autoPrefixXlfn??!0,a=i?`_xlfn.LAMBDA`:`LAMBDA`,o=n.trim().replace(/^=/,``),s=t.map(e=>e.trim()),c=i?s.map(e=>`_xlpm.${e}`):s,l=i?this.qualifyLambdaBodyArgRefs(o,s):o,u=`=${a}(${c.join(`,`)},${l})`;this.addDefinedName(e,u,r?.scope,{comment:r?.comment,hidden:r?.hidden})}qualifyLambdaBodyArgRefs(e,t){let n=[...t].sort((e,t)=>t.length-e.length),r=e;for(let e of n){let t=e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),n=RegExp(`(?<!_xlpm\\.)\\b${t}\\b`,`g`);r=r.replace(n,`_xlpm.${e}`)}return r}createWorksheet(e){return e=Object.assign({},{name:`Sheet ${this.worksheets.length+1}`},e),new zl(e)}getStyleSheet(){return this.styleSheet}addTable(e){this.tables.push(e)}addDrawings(e){this.drawings.push(e)}addChart(e){e.index=this.charts.length+1,e.target=`../charts/chart${e.index}.xml`,this.charts.push(e)}setPrintTitleTop(e,t){this.printTitles??={},this.printTitles[e]??(this.printTitles[e]={}),this.printTitles[e].top=t}setPrintTitleLeft(e,t){this.printTitles??={},this.printTitles[e]??(this.printTitles[e]={}),this.printTitles[e].left=String.fromCharCode(64+t)}addMedia(e,t,n,r){let i=t.split(`.`),a=i[i.length-1];return r||={jpeg:`image/jpeg`,jpg:`image/jpeg`,png:`image/png`,gif:`image/gif`}[a.toLowerCase()]??null,this.media[t]||(this.media[t]={id:t,data:n,fileName:t,contentType:r,extension:a}),this.media[t]}addWorksheet(e){this.relations.addRelation(e,`worksheet`),e.setSharedStringCollection(this.sharedStrings),this.worksheets.push(e)}createContentTypes(){let e=X.createXmlDoc(X.schemas.contentTypes,`Types`),t=e.documentElement,n,r;t.appendChild(X.createElement(e,`Default`,[[`Extension`,`rels`],[`ContentType`,`application/vnd.openxmlformats-package.relationships+xml`]])),t.appendChild(X.createElement(e,`Default`,[[`Extension`,`xml`],[`ContentType`,`application/xml`]]));let i={};for(let e in this.media)i[this.media[e].extension]=this.media[e].contentType;for(let n in i)t.appendChild(X.createElement(e,`Default`,[[`Extension`,n],[`ContentType`,i[n]]]));for(t.appendChild(X.createElement(e,`Override`,[[`PartName`,`/xl/workbook.xml`],[`ContentType`,`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml`]])),t.appendChild(X.createElement(e,`Override`,[[`PartName`,`/xl/sharedStrings.xml`],[`ContentType`,`application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml`]])),t.appendChild(X.createElement(e,`Override`,[[`PartName`,`/xl/styles.xml`],[`ContentType`,`application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml`]])),n=0,r=this.worksheets.length;n<r;n++)t.appendChild(X.createElement(e,`Override`,[[`PartName`,`/xl/worksheets/sheet${n+1}.xml`],[`ContentType`,`application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml`]]));for(n=0,r=this.tables.length;n<r;n++)t.appendChild(X.createElement(e,`Override`,[[`PartName`,`/xl/tables/table${n+1}.xml`],[`ContentType`,`application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml`]]));for(n=0,r=this.drawings.length;n<r;n++)t.appendChild(X.createElement(e,`Override`,[[`PartName`,`/xl/drawings/drawing${n+1}.xml`],[`ContentType`,`application/vnd.openxmlformats-officedocument.drawing+xml`]]));for(n=0,r=this.charts.length;n<r;n++)t.appendChild(X.createElement(e,`Override`,[[`PartName`,`/xl/charts/chart${n+1}.xml`],[`ContentType`,`application/vnd.openxmlformats-officedocument.drawingml.chart+xml`]]));return e}toXML(){let e=X.createXmlDoc(X.schemas.spreadsheetml,`workbook`),t=e.documentElement;t.setAttribute(`xmlns:r`,X.schemas.relationships);let n=X.createElement(e,`sheets`);for(let t=0,r=this.worksheets.length;t<r;t++){let r=e.createElement(`sheet`);typeof console<`u`&&this.worksheets[t].name.length>31&&console.log(`Microsoft Excel requires work sheet names to be less than 32 characters long, work sheet name "${this.worksheets[t].name}" is ${this.worksheets[t].name.length} characters long`),r.setAttribute(`name`,this.worksheets[t].name),r.setAttribute(`sheetId`,t+1),r.setAttribute(`r:id`,this.relations.getRelationshipId(this.worksheets[t])),n.appendChild(r)}t.appendChild(n);let r=X.createElement(e,`definedNames`),i=0,a=this.printTitles||{};for(let t in a){let n=a[t],o=e.createElement(`definedName`);o.setAttribute(`name`,`_xlnm.Print_Titles`);let s=this.worksheets.findIndex(e=>e.name===t);o.setAttribute(`localSheetId`,s>=0?s:i++);let c=``;n.top&&(c+=`${t}!$1:$${n.top}`,n.left&&(c+=`,`)),n.left&&(c+=`${t}!$A:$${n.left}`),o.appendChild(e.createTextNode(c)),r.appendChild(o)}for(let t of this.definedNames){let n=e.createElement(`definedName`);n.setAttribute(`name`,t.name);let i=this.resolveDefinedNameScope(t.scope);i!==void 0&&n.setAttribute(`localSheetId`,i),t.comment&&n.setAttribute(`comment`,t.comment),t.hidden&&n.setAttribute(`hidden`,`1`),n.appendChild(e.createTextNode(t.refersTo.replace(/^=/,``))),r.appendChild(n)}return t.appendChild(r),e}createWorkbookRelationship(){let e=X.createXmlDoc(X.schemas.relationshipPackage,`Relationships`);return e.documentElement.appendChild(X.createElement(e,`Relationship`,[[`Id`,`rId1`],[`Type`,X.schemas.officeDocument],[`Target`,`xl/workbook.xml`]])),e}_generateCorePaths(e){let t,n;for(kl[this.styleSheet.id]=`styles.xml`,kl[this.sharedStrings.id]=`sharedStrings.xml`,kl[this.id]=`/xl/workbook.xml`,t=0,n=this.tables.length;t<n;t++)e[`/xl/tables/table${t+1}.xml`]=this.tables[t].toXML(),kl[this.tables[t].id]=`/xl/tables/table${t+1}.xml`;for(let t in this.media){let n=this.media[t];e[`/xl/media/${t}`]=n.data,kl[t]=`/xl/media/${t}`}for(t=0,n=this.drawings.length;t<n;t++)e[`/xl/drawings/drawing${t+1}.xml`]=this.drawings[t].toXML(),kl[this.drawings[t].id]=`/xl/drawings/drawing${t+1}.xml`,e[`/xl/drawings/_rels/drawing${t+1}.xml.rels`]=this.drawings[t].relations.toXML();for(t=0,n=this.charts.length;t<n;t++)e[`/xl/charts/chart${t+1}.xml`]=this.charts[t].toChartSpaceXML(),kl[this.charts[t].id]=`/xl/charts/chart${t+1}.xml`}_prepareFilesForPackaging(e){Object.assign(e,{"/[Content_Types].xml":this.createContentTypes(),"/_rels/.rels":this.createWorkbookRelationship(),"/xl/styles.xml":this.styleSheet.toXML(),"/xl/workbook.xml":this.toXML(),"/xl/sharedStrings.xml":this.sharedStrings.toXML(),"/xl/_rels/workbook.xml.rels":this.relations.toXML()});for(let[t,n]of Object.entries(e))if(t.indexOf(`.xml`)!==-1||t.indexOf(`.rels`)!==-1){e[t]=n instanceof yl?n.toString():n.xml||new window.XMLSerializer().serializeToString(n);let r=e[t].replace(/xmlns=""/g,``);r=r.replace(/NS[\d]+:/g,``),r=r.replace(/xmlns:NS[\d]+=""/g,``),e[t]=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n${r}`}}generateFiles(){let e={};this._generateCorePaths(e);for(let t=0,n=this.worksheets.length;t<n;t++){let n=this.worksheets[t].toXML();e[`/xl/worksheets/sheet${t+1}.xml`]=n,kl[this.worksheets[t].id]=`worksheets/sheet${t+1}.xml`,e[`/xl/worksheets/_rels/sheet${t+1}.xml.rels`]=this.worksheets[t].relations?.toXML()}return this._prepareFilesForPackaging(e),Promise.resolve(e)}serializeHeader(){return`<?xml version="1.0" encoding="UTF-8"?><workbook>`}serializeFooter(){return`</workbook>`}};function Q(){return new Bl}function Vl(e){let t=e.replace(/^data:[^;]+;base64,/u,``).replace(/\s+/gu,``).replace(/-/g,`+`).replace(/_/g,`/`),n=t+`=`.repeat((4-t.length%4)%4),r=``;try{r=atob(n)}catch{throw Error(`[Excel-Builder-Vanilla] Invalid base64 payload while creating Excel media.`)}return Uint8Array.from(r,e=>e.charCodeAt(0))}function Hl(e,t,n){let r={};return new Promise((i,a)=>{e.generateFiles().then(e=>{for(let[t,n]of Object.entries(e)){let e=t.substr(1);t.indexOf(`.xml`)!==-1||t.indexOf(`.rel`)!==-1?r[e]=sl(n):r[e]=Vl(n)}return dl(r,n?.zipOptions||{},(e,r)=>{if(e){a(e);return}if(t===`Uint8Array`)i(r);else{let e=n?.fileFormat??`xlsx`,t=n?.mimeType;t===void 0&&(t=e===`xls`?`application/vnd.ms-excel`:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`),i(new Blob([r],{type:t}))}})})})}function $(e,t,n){if(n?.downloadType===`node`)throw Error('[Excel-Builder-Vanilla] Please note that `downloadExcelFile()` is currently only supporting the "browser" download type at the moment.');let r=t.match(/.*\.xls$/)?`xls`:`xlsx`;return Hl(e,`Blob`,{...n,fileFormat:r}).then(e=>{Ul(t,e)})}function Ul(e,t){let n=document.createElement(`a`),r=URL.createObjectURL(t);n&&document&&(n.textContent=`download`,n.href=r,n.setAttribute(`download`,e),n.style.visibility=`hidden`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r))}function Wl(e,t){if(typeof window<`u`&&window.ReadableStream!==void 0)return Gl(e,t);if(typeof process<`u`&&process.versions?.node)return Kl(e,t);throw Error(`Streaming is only supported in browser or NodeJS environments.`)}function Gl(e,t){return new ReadableStream({async start(n){let r=await e.generateFiles(),i={};for(let[e,t]of Object.entries(r)){let n=e.startsWith(`/`)?e.substr(1):e;i[n]=e.indexOf(`.xml`)!==-1||e.indexOf(`.rel`)!==-1?sl(String(t)):Vl(String(t))}let a=fl(i,t?.zipOptions||{}),o=65536,s=0;for(;s<a.length;){let e=a.subarray(s,s+o);n.enqueue(e),s+=o,await new Promise(e=>setTimeout(e,0))}n.close()}})}async function*Kl(e,t){let n=await e.generateFiles(),r={};for(let[e,t]of Object.entries(n)){let n=e.startsWith(`/`)?e.substr(1):e;r[n]=e.indexOf(`.xml`)!==-1||e.indexOf(`.rel`)!==-1?sl(String(t)):Vl(String(t))}let i=fl(r,t?.zipOptions||{}),a=65536,o=0;for(;o<i.length;)yield i.subarray(o,o+a),o+=a,await new Promise(e=>setTimeout(e,0))}var ql=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=[[`Artist`,`Album`,`Price`],[`Buckethead`,`Albino Slug`,8.99],[`Buckethead`,`Electric Tears`,13.99],[`Buckethead`,`Colma`,11.34],[`Crystal Method`,`Vegas`,10.54],[`Crystal Method`,`Tweekend`,10.64],[`Crystal Method`,`Divided By Night`,8.99]],t=new Bl,n=t.createWorksheet({name:`Artists`});n.setData(e),t.addWorksheet(n),$(t,`Artist WB.xlsx`)}},Jl=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=Q(),t=e.createWorksheet({name:`Album List`});t.mergeCells(`A1`,`C1`);let n=[[{value:`Merged Header`,metadata:{style:e.getStyleSheet().createFormat({alignment:{horizontal:`center`},font:{bold:!0,color:`FF2b995d`,size:13}}).id}}],[`Artist`,`Album`,`Price`],[`Buckethead`,`Albino Slug`,8.99],[`Buckethead`,`Electric Tears`,13.99],[`Buckethead`,`Colma`,11.34],[`Crystal Method`,`Vegas`,10.54],[`Crystal Method`,`Tweekend`,10.64],[`Crystal Method`,`Divided By Night`,8.99]];t.setData(n),t.setColumns([{width:30},{width:20,hidden:!0},{width:10}]),e.addWorksheet(t),$(e,`Artist WB.xlsx`)}},Yl=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=[[`Artist`,`Album`,`Price`],[`Buckethead`,`Albino Slug`,8.99],[`Buckethead`,`Electric Tears`,13.99],[`Buckethead`,`Colma`,11.34],[`Crystal Method`,`Vegas`,10.54],[`Crystal Method`,`Tweekend`,10.64],[`Crystal Method`,`Divided By Night`,8.99]],t=Q(),n=t.createWorksheet({name:`Album List`}),r=t.getStyleSheet().createFormat({font:{italic:!0,underline:!0}});n.setRowInstructions(1,{height:40,style:r.id}),n.setData(e),t.addWorksheet(n),$(t,`Artist WB.xlsx`)}},Xl=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=Q(),t=e.createWorksheet({name:`Album List`}),n=e.getStyleSheet(),r=`FFFF0000`,i=n.createFormat({font:{bold:!0,color:r},border:{bottom:{color:r,style:`thin`},top:{color:r,style:`thin`},left:{color:r,style:`thin`},right:{color:r,style:`dotted`}}}),a=n.createFormat({font:{bold:!0,color:{theme:3}}}),o=[[{value:`Artist`,metadata:{style:i.id}},{value:`Album`,metadata:{style:a.id}},{value:`Price`,metadata:{style:a.id}}],[`Buckethead`,`Albino Slug`,8.99],[`Buckethead`,`Electric Tears`,13.99],[`Buckethead`,`Colma`,11.34],[`Crystal Method`,`Vegas`,10.54],[`Crystal Method`,`Tweekend`,10.64],[`Crystal Method`,`Divided By Night`,8.99]];t.setData(o),t.setColumns([{width:30},{width:20},{width:10}]),e.addWorksheet(t),$(e,`Artist WB.xlsx`)}},Zl=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=Q(),t=e.createWorksheet({name:`Album List`}),n=e.getStyleSheet().createFormat({format:`$#,##0.00`}),r=e.getStyleSheet().createSimpleFormatter(`date`),i=[[`Artist`,`Album`,`Price`,`Date Modified`],[`Buckethead`,`Albino Slug`,{value:8.99,metadata:{style:n.id}},{value:new Date(2024,1,1),metadata:{type:`date`,style:r.id}}],[`Buckethead`,`Electric Tears`,{value:13.99,metadata:{style:n.id}},{value:new Date(2024,1,2),metadata:{type:`date`,style:r.id}}],[`Buckethead`,`Colma`,{value:11.34,metadata:{style:n.id}},{value:new Date(2024,1,3),metadata:{type:`date`,style:r.id}}],[`Crystal Method`,`Vegas`,{value:10.54,metadata:{style:n.id}},{value:new Date(2024,1,4),metadata:{type:`date`,style:r.id}}],[`Crystal Method`,`Tweekend`,{value:10.64,metadata:{style:n.id}},{value:new Date(2024,1,5),metadata:{type:`date`,style:r.id}}],[`Crystal Method`,`Divided By Night`,{value:8.99,metadata:{style:n.id}},{value:new Date(2024,1,6),metadata:{type:`date`,style:r.id}}]];t.setData(i),t.setColumns([{width:15},{width:15},{width:15},{width:15}]),e.addWorksheet(t),$(e,`Artist WB.xlsx`)}},Ql=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=Q(),t=e.createWorksheet({name:`Album List`}),n=e.getStyleSheet().createFormat({alignment:{horizontal:`center`}}),r=[[{value:`Artist`,metadata:{style:n.id}},{value:`Album`,metadata:{style:n.id}},{value:`Price`,metadata:{style:n.id}}],[`Buckethead`,`Albino Slug`,8.99],[`Buckethead`,`Electric Tears`,13.99],[`Buckethead`,`Colma`,11.34],[`Crystal Method`,`Vegas`,10.54],[`Crystal Method`,`Tweekend`,10.64],[`Crystal Method`,`Divided By Night`,8.99]];t.setData(r),t.setColumns([{width:30},{width:30},{width:30}]),e.addWorksheet(t),$(e,`Artist WB.xlsx`)}},$l=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=Q(),t=e.createWorksheet({name:`Album List`}),n=e.getStyleSheet(),r=n.createFormat({font:{bold:!0,color:`FF0000FF`},fill:{type:`pattern`,patternType:`solid`,fgColor:`FF00FF00`}}),i=n.createFormat({font:{color:`FFFFFFFF`},fill:{type:`gradient`,degree:180,start:`FF92D050`,end:{pureAt:.8,color:`FF0070C0`}}}),a=[[{value:`Artist`,metadata:{style:r.id}},{value:`Album`,metadata:{style:r.id}},{value:`Price`,metadata:{style:r.id}}],[{value:`Buckethead`,metadata:{style:i.id}},`Albino Slug`,8.99],[{value:`Buckethead`,metadata:{style:i.id}},`Electric Tears`,13.99],[{value:`Buckethead`,metadata:{style:i.id}},`Colma`,11.34],[{value:`Crystal Method`,metadata:{style:i.id}},`Vegas`,10.54],[{value:`Crystal Method`,metadata:{style:i.id}},`Tweekend`,10.64],[{value:`Crystal Method`,metadata:{style:i.id}},`Divided By Night`,8.99]];t.setData(a),t.setColumns([{width:30},{width:20},{width:10}]),e.addWorksheet(t),$(e,`Artist WB.xlsx`)}},eu=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=Q(),t=e.createWorksheet({name:`Album List`}),n=e.getStyleSheet().createFormat({format:`$#,##0.00`}),r=[[{value:`Artist`},{value:`Album`},{value:`Price`},{value:`Quantity`},{value:`Taxable`},{value:`Sub-Total`},{value:`Taxes`},{value:`Total`}],[`Buckethead`,`Albino Slug`,{value:8.99,metadata:{style:n.id}},5,!0,{value:`C2*D2`,metadata:{type:`formula`,style:n.id}},{value:`IF(E2=TRUE,F2*0.075,0)`,metadata:{type:`formula`,style:n.id}},{value:`F2+G2`,metadata:{type:`formula`,style:n.id}}],[`Buckethead`,`Electric Tears`,{value:13.99,metadata:{style:n.id}},7,!0,{value:`C3*D3`,metadata:{type:`formula`,style:n.id}},{value:`IF(E3=TRUE,F3*0.075,0)`,metadata:{type:`formula`,style:n.id}},{value:`F3+G3`,metadata:{type:`formula`,style:n.id}}],[`Buckethead`,`Colma`,{value:11.34,metadata:{style:n.id}},9,!1,{value:`C4*D4`,metadata:{type:`formula`,style:n.id}},{value:`IF(E4=TRUE,F4*0.075,0)`,metadata:{type:`formula`,style:n.id}},{value:`F4+G4`,metadata:{type:`formula`,style:n.id}}],[`Crystal Method`,`Vegas`,{value:10.54,metadata:{style:n.id}},3,!0,{value:`C5*D5`,metadata:{type:`formula`,style:n.id}},{value:`IF(E5=TRUE,F5*0.075,0)`,metadata:{type:`formula`,style:n.id}},{value:`F5+G5`,metadata:{type:`formula`,style:n.id}}],[`Crystal Method`,`Tweekend`,{value:10.64,metadata:{style:n.id}},1,!1,{value:`C6*D6`,metadata:{type:`formula`,style:n.id}},{value:`IF(E6=TRUE,F6*0.075,0)`,metadata:{type:`formula`,style:n.id}},{value:`F6+G6`,metadata:{type:`formula`,style:n.id}}],[`Crystal Method`,`Divided By Night`,{value:8.99,metadata:{style:n.id}},56,!0,{value:`C7*D7`,metadata:{type:`formula`,style:n.id}},{value:`IF(E7=TRUE,F7*0.075,0)`,metadata:{type:`formula`,style:n.id}},{value:`F7+G7`,metadata:{type:`formula`,style:n.id}}]];t.setData(r),t.setColumns([{width:30},{width:20},{width:10}]),e.addWorksheet(t),$(e,`Artist WB.xlsx`)}},tu=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=[[`Artist`,`Album`,`Price`],[`Buckethead`,`Albino Slug`,8.99],[`Buckethead`,`Electric Tears`,13.99],[`Buckethead`,`Colma`,11.34],[`Crystal Method`,`Vegas`,10.54],[`Crystal Method`,`Tweekend`,10.64],[`Crystal Method`,`Divided By Night`,8.99]],t=Q(),n=t.createWorksheet({name:`Album List`}),r=new Rl;r.styleInfo.themeStyle=`TableStyleDark2`,r.setReferenceRange([1,1],[3,e.length]),r.setTableColumns([`Artist`,`Album`,`Price`]),n.setData(e),t.addWorksheet(n),n.addTable(r),t.addTable(r),$(t,`Artist WB.xlsx`)}},nu=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=[[`Artist`,`Album`,`Price`],[`Buckethead`,`Albino Slug`,8.99],[`Buckethead`,`Electric Tears`,13.99],[`Buckethead`,`Colma`,11.34],[`Crystal Method`,`Vegas`,10.54],[`Crystal Method`,`Tweekend`,10.64],[`Crystal Method`,`Divided By Night`,8.99]],t=Q(),n=t.createWorksheet({name:`Album List`}),r=t.getStyleSheet(),i=r.createDifferentialStyle({font:{italic:!0}});r.createTableStyle({name:`SlightlyOffColorBlue`,wholeTable:i.id,headerRow:r.createDifferentialStyle({alignment:{horizontal:`center`}}).id});let a=new Rl;a.styleInfo.themeStyle=`SlightlyOffColorBlue`,a.setReferenceRange([1,1],[3,e.length]),a.setTableColumns([`Artist`,`Album`,`Price`]),n.setData(e),t.addWorksheet(n),n.addTable(a),t.addTable(a),$(t,`Artist WB.xlsx`)}},ru=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=new Rl,t=[[`Artist`,`Album`,`Price`],[`Buckethead`,`Albino Slug`,8.99],[`Buckethead`,`Electric Tears`,13.99],[`Buckethead`,`Colma`,11.34],[`Crystal Method`,`Vegas`,10.54],[`Crystal Method`,`Tweekend`,10.64],[`Crystal Method`,`Divided By Night`,8.99],[`Highest Price`,`test`,{value:`SUBTOTAL(104,${e.name}[Price])`,metadata:{type:`formula`}}]],n=Q(),r=n.createWorksheet({name:`Album List`});e.styleInfo.themeStyle=`TableStyleDark2`,e.setReferenceRange([1,1],[3,t.length]),e.totalsRowCount=1,e.setTableColumns([{name:`Artist`,totalsRowLabel:`Highest Price`},{name:`Album`,totalsRowLabel:`test`},{name:`Price`,totalsRowFunction:`max`}]),r.setData(t),n.addWorksheet(r),r.addTable(e),n.addTable(e),$(n,`Artist WB.xlsx`)}},iu=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=[[`Artist`,`Album`,`Price`],[`Buckethead`,`Albino Slug`,8.99],[`Buckethead`,`Electric Tears`,13.99],[`Buckethead`,`Colma`,11.34],[`Crystal Method`,`Vegas`,10.54],[`Crystal Method`,`Tweekend`,10.64],[`Crystal Method`,`Divided By Night`,8.99]],t=Q(),n=t.createWorksheet({name:`Album List`});n.setData(e),n.setHeader([`This will be on the left`,[`In the middle `,{text:`I shall be`,bold:!0}],{text:`Right, underlined and size of 16`,font:16,underline:!0}]),n.setFooter([`Date of print: &D &T`,`&A`,`Page &P of &N`]),t.addWorksheet(n),$(t,`Artist WB.xlsx`)}},au=class{exportBtnElm;githubLogoBase64=`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`;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this)),document.querySelector(`#pic1`).src=`data:image/png;base64,${this.githubLogoBase64}`}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=Q(),t=e.createWorksheet({name:`TestSheet`}),n=[[`Artist`,`Album`,`Price`],[`Buckethead`,`Albino Slug`,8.99],[`Buckethead`,`Electric Tears`,13.99],[`Buckethead`,`Colma`,11.34],[`Crystal Method`,`Vegas`,10.54],[`Crystal Method`,`Tweekend`,10.64],[`Crystal Method`,`Divided By Night`,8.99]],r=new Rl;r.styleInfo.themeStyle=`TableStyleDark2`,r.setReferenceRange([1,1],[3,n.length]),r.setTableColumns([`Artist`,`Album`,`Price`]),t.sheetView.showGridLines=!1,t.setData(n),e.addWorksheet(t),t.addTable(r),e.addTable(r);let i=new jl,a=e.addMedia(`image`,`logo.png`,this.githubLogoBase64),o=new Ol;o.createAnchor(`twoCellAnchor`,{from:{x:5,y:2},to:{x:7,y:8}}),o.setMedia(a),i.addDrawing(o),t.addDrawings(i),e.addDrawings(i),$(e,`Fruits.xlsx`)}},ou=``+new URL(`strawberry-CtbyndmO.jpg`,import.meta.url).href,su=class{exportBtnElm;async fetchImageAsBase64(e){let t=await fetch(e);if(!t.ok)throw Error(`[Example14] Failed to fetch image for export: ${t.status}`);let n=new Uint8Array(await t.arrayBuffer()),r=32768,i=``;for(let e=0;e<n.length;e+=r){let t=n.subarray(e,e+r);i+=String.fromCharCode(...t)}return btoa(i)}mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this)),document.querySelector(`#pic1`).src=ou,document.querySelector(`#pic2`).src=ou,document.querySelector(`#pic3`).src=ou}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}async startProcess(){let e=Q(),t=e.createWorksheet({name:`Berry List`}),n=new jl,r=await this.fetchImageAsBase64(ou),i=e.addMedia(`image`,`strawberry.jpg`,r),a=new Ol;a.createAnchor(`oneCellAnchor`,{}),a.createAnchor(`twoCellAnchor`,{from:{x:0,y:0},to:{x:3,y:5}}),a.setMedia(i),n.addDrawing(a);let o=new Ol;o.createAnchor(`absoluteAnchor`,{x:Nl.pixelsToEMUs(300),y:Nl.pixelsToEMUs(300),width:Nl.pixelsToEMUs(300),height:Nl.pixelsToEMUs(300)}),o.setMedia(i),n.addDrawing(o);let s=new Ol;s.createAnchor(`oneCellAnchor`,{x:1,y:4,width:Nl.pixelsToEMUs(300),height:Nl.pixelsToEMUs(300)}),s.setMedia(i),n.addDrawing(s),t.addDrawings(n),e.addDrawings(n),e.addWorksheet(t),$(e,`Fruits.xlsx`)}},cu=typeof __EXCEL_DEMO_STREAMING_ROWS__==`number`?__EXCEL_DEMO_STREAMING_ROWS__:1e5,lu=class{exportBtnElm;progressElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.progressElm=document.querySelector(`#progress`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}async startProcess(){let e=[[`Artist`,`Album`,{value:`Price`,metadata:{}}]];for(let t=0;t<cu;t++){let n=Math.round(Math.random()*1e4)/100;e.push([`Artist ${t}`,`Album ${t}`,{value:n,metadata:{}}])}let t=Q(),n=t.createWorksheet({name:`Artists`}),r=t.getStyleSheet().createFormat({format:`$#,##0.00`}),i=e[0][2];typeof i==`object`&&i&&`metadata`in i&&i.metadata&&(i.metadata.style=r.id);for(let t=1;t<e.length;t++){let n=e[t][2];typeof n==`object`&&n&&`metadata`in n&&n.metadata&&(n.metadata.style=r.id)}n.setData(e),n.setHeader([`This will be on the left`,[`In the middle `,{text:`I shall be`,bold:!0}],{text:`Right, underlined and size of 16`,font:16,underline:!0}]),n.setFooter([`Date of print: &D &T`,`&A`,`Page &P of &N`]),t.addWorksheet(n);let a=Wl(t,{chunkSize:1e3}),o=[],s=0,c=a.getReader();for(;;){let{done:e,value:t}=await c.read();if(e)break;o.push(t),s+=1e3,this.progressElm.textContent=`Exported ${Math.min(s,cu)} / ${cu} rows...`}let l=new Blob(o.map(e=>e.slice()),{type:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`}),u=URL.createObjectURL(l),d=document.createElement(`a`);d.href=u,d.download=`LargeArtistWB.xlsx`,d.click(),URL.revokeObjectURL(u),this.progressElm.textContent=`Export successfully ${cu} rows!`}},uu=typeof __EXCEL_DEMO_STREAMING_ROWS__==`number`?__EXCEL_DEMO_STREAMING_ROWS__:5e4,du=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}startProcess(){let e=Q(),t=e.createWorksheet({name:`Album List`});t.mergeCells(`A1`,`D1`);let n=e.getStyleSheet(),r=n.createFormat({alignment:{horizontal:`center`},font:{bold:!0,color:`FF2b995d`,size:13}}),i=n.createFormat({font:{italic:!0,underline:!0}});t.setRowInstructions(2,{height:40,style:i.id});let a=`FFFF0000`,o=n.createFormat({font:{bold:!0,color:a},border:{bottom:{color:a,style:`thin`},top:{color:a,style:`thin`},left:{color:a,style:`thin`},right:{color:a,style:`dotted`}}}),s=n.createFormat({font:{bold:!0,color:{theme:3}}}),c=n.createFormat({format:`$#,##0.00`}),l=n.createFormat({alignment:{horizontal:`center`}}),u=[[{value:`Merged Header`,metadata:{style:r.id}},``,``,``,``,``],[{value:`Artist`,metadata:{style:o.id}},{value:`Album`,metadata:{style:s.id}},{value:`Price`,metadata:{style:s.id}},{value:`Quantity`,metadata:{style:s.id}},{value:`Total`,metadata:{style:s.id}}]];async function d(){let e=2e3;for(let t=0;t<uu;t+=e){for(let n=0;n<e&&t+n<uu;n++){let e=t+n,r=`Artist ${e+1}`,i=`Album ${e+1}`,a=Math.round(Math.random()*1e4)/100,o=Math.floor(Math.random()*10)+1,s=e+3;u.push([{value:r,metadata:{style:l.id}},{value:i,metadata:{style:l.id}},{value:a,metadata:{style:c.id}},{value:o,metadata:{style:l.id}},{value:`C${s}*D${s}`,metadata:{type:`formula`,style:c.id}}])}await new Promise(requestAnimationFrame)}}(async()=>{let n=document.querySelector(`#progress`),r=n?n.querySelector(`.progress-bar`):null;n&&r&&(r.style.width=`0%`,r.textContent=``,n.setAttribute(`aria-valuenow`,`0`),await new Promise(e=>setTimeout(e,50))),await d(),t.setData(u),t.setColumns([{width:30},{width:20},{width:10},{width:10},{width:15}]),e.addWorksheet(t);let i=Wl(e,{chunkSize:10}),a=[],o=0,s=uu,c=i.getReader();for(;;){let{done:e,value:t}=await c.read();if(e)break;if(a.push(t),o+=t.length,n&&r){let e=Math.min(o/s*100,100);r.style.width=`${e}%`,n.setAttribute(`aria-valuenow`,e.toString()),r.textContent=`${e.toFixed(1)}%`,r.offsetWidth}await new Promise(e=>setTimeout(e,30))}let l=new Blob(a.map(e=>e.slice()),{type:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`}),f=URL.createObjectURL(l),p=document.createElement(`a`);p.href=f,p.download=`Artist WB - Streaming Features.xlsx`,p.click(),URL.revokeObjectURL(f)})()}},fu=class{exportBtnElm;githubLogoBase64=`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`;mount(){this.exportBtnElm=document.querySelector(`#export`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this)),document.querySelector(`#pic1`).src=`data:image/png;base64,${this.githubLogoBase64}`}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}async startProcess(){let e=Q(),t=e.createWorksheet({name:`TestSheet`}),n=[[`Artist`,`Album`,`Price`],[`Buckethead`,`Albino Slug`,8.99],[`Buckethead`,`Electric Tears`,13.99],[`Buckethead`,`Colma`,11.34],[`Crystal Method`,`Vegas`,10.54],[`Crystal Method`,`Tweekend`,10.64],[`Crystal Method`,`Divided By Night`,8.99]],r=new Rl;r.styleInfo.themeStyle=`TableStyleDark2`,r.setReferenceRange([1,1],[3,n.length]),r.setTableColumns([`Artist`,`Album`,`Price`]),t.sheetView.showGridLines=!1,t.setData(n),e.addWorksheet(t),t.addTable(r),e.addTable(r);let i=new jl,a=e.addMedia(`image`,`logo.png`,this.githubLogoBase64),o=new Ol;o.createAnchor(`twoCellAnchor`,{from:{x:5,y:2},to:{x:7,y:8}}),o.setMedia(a),i.addDrawing(o),t.addDrawings(i),e.addDrawings(i);let s=Wl(e,{chunkSize:1024}),c=[],l=s.getReader();for(;;){let{done:e,value:t}=await l.read();if(e)break;c.push(t)}let u=new Blob(c,{type:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`}),d=URL.createObjectURL(u),f=document.createElement(`a`);f.href=d,f.download=`Fruits-Streaming.xlsx`,f.click(),URL.revokeObjectURL(d)}},pu=``+new URL(`charts-tW3QUS8G.png`,import.meta.url).href,mu=class{exportBtnElm;mount(){this.exportBtnElm=document.querySelector(`#export-chart`),this.exportBtnElm.addEventListener(`click`,this.startProcess.bind(this));let e=document.querySelector(`#chart-screenshot`);e&&(e.src=pu,e.alt=`Exported Excel charts screenshot`,e.loading=`lazy`)}unmount(){this.exportBtnElm.removeEventListener(`click`,this.startProcess.bind(this))}async startProcess(){let e=[`Jan`,`Feb`,`Mar`],t=[120,150,170],n=[180,160,200],r=new Bl,i=(i,a,o)=>{let s=/[\s%]/.test(a)?`'${a}'`:a,c=r.createWorksheet({name:a}),l,u=[];if(i===`scatter`){let e=[10,20,30,40,55,65,80,95],t=[12,18,34,33,50,58,72,90];c.setData([[`X`,`Y`],...e.map((e,n)=>[e,t[n]])]),r.addWorksheet(c);let n=`${s}!$A$2:$A$${e.length+1}`;u=[{name:`Y vs X`,valuesRange:`${s}!$B$2:$B$${t.length+1}`,scatterXRange:n,color:`FFFF3333`}]}else if(i===`doughnut`)c.setData([[`Month`,`Q1`],...e.map((e,n)=>[e,t[n]])]),r.addWorksheet(c),l=`${s}!$A$2:$A$${e.length+1}`,u=[{name:`Q1`,valuesRange:`${s}!$B$2:$B$${e.length+1}`}];else if(i===`pie`)c.setData([[`Month`,`Q1`],...e.map((e,n)=>[e,t[n]])]),r.addWorksheet(c),l=`${s}!$A$2:$A$${e.length+1}`,u=[{name:`Q1`,valuesRange:`${s}!$B$2:$B$${e.length+1}`}];else{c.setData([[`Month`,`Q1`,`Q2`],...e.map((e,r)=>[e,t[r],n[r]])]),r.addWorksheet(c),l=`${s}!$A$2:$A$${e.length+1}`;let i=`${s}!$B$2:$B$${e.length+1}`,a=`${s}!$C$2:$C$${e.length+1}`;u=[{name:`Q1`,valuesRange:i},{name:`Q2`,valuesRange:a}]}let d=new jl,f=(()=>{if(i===`pie`)return{show:!0,position:`topRight`};if(a===`Column`)return{position:`topRight`};if(a===`Bar Stacked`)return{overlay:!0}})(),p=new Dl({type:i,stacking:o,title:`${a} (${i}${o?` ${o}`:``}) Chart`,axis:{x:{title:i===`pie`?void 0:i===`scatter`?`X Values`:`Month`,showGridLines:a.includes(`Line`)&&!a.includes(`Bar`)},y:{title:i===`pie`?void 0:i===`scatter`?`Y Values`:a.includes(`% Stacked`)?`Percent`:`Values`,minimum:a.includes(`Stacked`)?0:void 0,maximum:a.includes(`% Stacked`)?1:void 0,showGridLines:a.includes(`Column`)||a.includes(`Line % Stacked`)}},width:4381500,height:2743200,categoriesRange:l,series:u,legend:f,dataLabels:i===`pie`||i===`doughnut`?{showPercent:!0}:a===`Column`||a===`Bar`||a===`Line`?{showValue:!0}:void 0});p.anchor=p.createAnchor(`twoCellAnchor`,{from:{x:4,y:1},to:{x:14,y:28}}),d.addDrawing(p),c.addDrawings(d),r.addDrawings(d),r.addChart(p)};i(`column`,`Column`),i(`bar`,`Bar`),i(`line`,`Line`),i(`pie`,`Pie`),i(`doughnut`,`Doughnut`),i(`scatter`,`Scatter`),i(`column`,`Column Stacked`,`stacked`),i(`bar`,`Bar Stacked`,`stacked`),i(`line`,`Line Stacked`,`stacked`),i(`column`,`Column % Stacked`,`percent`),i(`bar`,`Bar % Stacked`,`percent`),i(`line`,`Line % Stacked`,`percent`),$(r,`Multiple-Charts.xlsx`)}},hu=class{excelExportBtnElm;portableExportBtnElm;mount(){this.excelExportBtnElm=document.querySelector(`#export-custom-function`),this.portableExportBtnElm=document.querySelector(`#export-portable-values`),this.excelExportBtnElm.addEventListener(`click`,this.startExcelProcess.bind(this)),this.portableExportBtnElm.addEventListener(`click`,this.startPortableProcess.bind(this))}unmount(){this.excelExportBtnElm.removeEventListener(`click`,this.startExcelProcess.bind(this)),this.portableExportBtnElm.removeEventListener(`click`,this.startPortableProcess.bind(this))}startExcelProcess(){this.exportWorkbook(`excel`)}startPortableProcess(){this.exportWorkbook(`portable`)}exportWorkbook(e){let t=Q(),n=t.createWorksheet({name:`Sales`}),r=.08,i=[{q1:120,q2:150,q3:170},{q1:90,q2:110,q3:95},{q1:210,q2:190,q3:230}];if(e===`excel`){t.addDefinedName(`TaxRate`,`=${r}`),t.addCustomFunction(`CUSTOMSUM`,[`values`],`SUM(values)`),t.addCustomFunction(`SAFEAVERAGE`,[`values`],`IF(COUNT(values)=0,0,AVERAGE(values))`,{comment:`Average with zero fallback to avoid divide-by-zero issues`});let e=i.map((e,t)=>{let n=t+2;return[e.q1,e.q2,e.q3,{value:`CUSTOMSUM(A${n}:C${n})`,metadata:{type:`formula`}},{value:`SAFEAVERAGE(A${n}:C${n})`,metadata:{type:`formula`}},{value:`D${n}*TaxRate`,metadata:{type:`formula`}}]});n.setData([[`Q1`,`Q2`,`Q3`,`Total`,`Average`,`Tax`],...e])}else{let e=i.map(e=>{let t=e.q1+e.q2+e.q3,n=t/3,i=t*r;return[e.q1,e.q2,e.q3,t,n,i]});n.setData([[`Q1`,`Q2`,`Q3`,`Total`,`Average`,`Tax`],...e])}n.setColumns([{width:10},{width:10},{width:10},{width:14},{width:14},{width:12}]),t.addWorksheet(n),$(t,e===`excel`?`Workbook-Custom-Functions-Excel.xlsx`:`Workbook-Custom-Functions-Portable.xlsx`)}},gu=[{name:`getting-started`,view:`/src/getting-started.html`,viewModel:class{},title:`Getting Started`},{name:`examples`,view:`/src/examples/example01.html`,viewModel:ql,title:`Examples`},{name:`documentation`,href:`https://ghiscoding.gitbook.io/excel-builder-vanilla/`,title:`📘 Documentation`}],_u=[{name:`References`,routes:[{name:`documentation`,href:`https://ghiscoding.gitbook.io/excel-builder-vanilla/`,title:`📘 Documentation`}]},{name:`Examples`,routes:[{name:`example01`,view:`/src/examples/example01.html`,viewModel:ql,title:`01- Create Worksheet`},{name:`example02`,view:`/src/examples/example02.html`,viewModel:Jl,title:`02- Sizing/Collapsing Columns`},{name:`example03`,view:`/src/examples/example03.html`,viewModel:Yl,title:`03- Setting row information`},{name:`example04`,view:`/src/examples/example04.html`,viewModel:Xl,title:`04- Fonts and Colors`},{name:`example05`,view:`/src/examples/example05.html`,viewModel:Zl,title:`05- Number, Date, etc Formatting`},{name:`example06`,view:`/src/examples/example06.html`,viewModel:Ql,title:`06- Alignment`},{name:`example07`,view:`/src/examples/example07.html`,viewModel:$l,title:`07- Backgroud Fillers`},{name:`example08`,view:`/src/examples/example08.html`,viewModel:eu,title:`08- Formulas`},{name:`example09`,view:`/src/examples/example09.html`,viewModel:tu,title:`09- Tables`},{name:`example10`,view:`/src/examples/example10.html`,viewModel:nu,title:`10- Theming Tables`},{name:`example11`,view:`/src/examples/example11.html`,viewModel:ru,title:`11- Theming Summaries`},{name:`example12`,view:`/src/examples/example12.html`,viewModel:iu,title:`12- Worksheet Headers/Footers`},{name:`example13`,view:`/src/examples/example13.html`,viewModel:au,title:`13- Pictures with 2 anchors`},{name:`example14`,view:`/src/examples/example14.html`,viewModel:su,title:`14- Pictures with different anchors`},{name:`example15`,view:`/src/examples/example15.html`,viewModel:lu,title:`15- Streaming Excel Export`},{name:`example16`,view:`/src/examples/example16.html`,viewModel:du,title:`16- Streaming Features Demo`},{name:`example17`,view:`/src/examples/example17.html`,viewModel:fu,title:`17- Streaming Export with Images`},{name:`example18`,view:`/src/examples/example18.html`,viewModel:mu,title:`18- Charts`},{name:`example19`,view:`/src/examples/example19.html`,viewModel:hu,title:`19- Custom Functions (LAMBDA)`}]}],vu=Object.assign({"/src/examples/example01.html":n,"/src/examples/example02.html":r,"/src/examples/example03.html":i,"/src/examples/example04.html":a,"/src/examples/example05.html":o,"/src/examples/example06.html":s,"/src/examples/example07.html":c,"/src/examples/example08.html":l,"/src/examples/example09.html":u,"/src/examples/example10.html":d,"/src/examples/example11.html":f,"/src/examples/example12.html":p,"/src/examples/example13.html":m,"/src/examples/example14.html":h,"/src/examples/example15.html":g,"/src/examples/example16.html":_,"/src/examples/example17.html":v,"/src/examples/example18.html":y,"/src/examples/example19.html":b,"/src/getting-started.html":x,"/src/main.html":S});new class{loading=!0;currentModel;currentRouter;defaultRouteName=`getting-started`;stateBangChar=`#/`;baseUrl=window.location.origin+window.location.pathname;viewModelObj={};async init(){let e=window.location;document.querySelector(`#app`).innerHTML=S;let t=e.hash.replace(this.stateBangChar,``);(!t||t===`/`||t===`#`)&&(t=this.defaultRouteName),this.createRouteLinks(),this.loadRoute(t),Array.from(document.querySelectorAll(`.panel-wm-left a.nav-link,.navbar-nav a.nav-link`)).forEach(e=>{e.id&&t.includes(e.id)&&e.classList.add(`active`)}),window.onpopstate=()=>{let e=window.location.hash.replace(this.stateBangChar,``);this.removeAllActiveLinks();let t=document.querySelector(`#${e}`);t&&(t.scrollIntoView(),t.classList.add(`active`)),this.loadRoute(e||this.defaultRouteName,!1)}}createRouteLinks(){for(let e of gu){let t=document.createElement(`li`);t.className=`nav-item`;let n=document.createElement(`a`);n.id=e.name,n.className=`nav-link`,n.textContent=e.title,t.appendChild(n),n.addEventListener(`click`,this.clickEventListener.bind(this)),document.querySelector(`.navbar-nav`)?.appendChild(t)}for(let e of _u){let t=document.createElement(`li`);t.className=`m-1`;let n=document.createElement(`p`);n.className=`navbar-vertical-label mb-1`,n.textContent=e.name,t.appendChild(n),document.querySelector(`.nav-pills`)?.appendChild(t);for(let t of e.routes){let e=document.createElement(`li`);e.className=`nav-item`;let n=document.createElement(`a`);n.id=t.name,n.className=`nav-link`,n.textContent=t.title,n.addEventListener(`click`,this.clickEventListener.bind(this)),e.appendChild(n),document.querySelector(`.nav-pills`)?.appendChild(e)}}}async loadRoute(e,t=!0){let n=document.querySelector(`.panel-wm-content`);n.textContent=``,n.classList.add(`cloak`);let r=gu.find(t=>t.name===e);if(r?.name===`examples`)document.querySelector(`.nav-pills .nav-item a.nav-link:not([href])`)?.classList.add(`active`);else for(let t of _u){let n=t.routes.find(t=>t.name===e);n&&(r=n)}if(this.currentModel&&this.unmountCurrentVM(this.currentModel,this.currentRouter),r?.view){this.currentRouter=r,document.querySelector(`.panel-wm-content`).innerHTML=vu[r.view];let e=new r.viewModel;this.currentModel=e,window[r.name]=e.mount?.(),window.onbeforeunload=()=>{n.classList.add(`cloak`),e.unmount?.(),this.removeAllActiveLinks(!0),this.unmountAll(),r?.name&&delete window[r.name]}}t&&window.history.pushState({},e,`${this.baseUrl}${this.stateBangChar}${e}`),document.title=`Excel-Builder-Vanilla · ${e}`,n.classList.remove(`cloak`)}async clickEventListener(e){let t=e.target,n=gu.find(e=>e.name===t.id);if(n?.href){window.open(n.href,`_blank`);return}this.removeAllActiveLinks(),t.classList.toggle(`active`),this.loadRoute(t.id)}removeAllActiveLinks(e=!1){document.querySelectorAll(`.panel-wm-left a.nav-link,.navbar-nav a.nav-link`).forEach(t=>{t.classList.remove(`active`),e&&t.removeEventListener(`click`,this.clickEventListener.bind(this))})}unmountCurrentVM(e,t){e.unmount?.(),t&&delete window[t.name]}unmountAll(){for(let e of Object.keys(this.viewModelObj)){let t=this.viewModelObj[e];if(typeof t?.unmount==`function`){t?.unmount();for(let e of Object.keys(t))t[e]=null}window[e]=null,this.viewModelObj[e]=null,delete window[e],delete this.viewModelObj[e]}}}().init();