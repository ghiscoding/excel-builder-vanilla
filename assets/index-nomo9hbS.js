var Or=Object.defineProperty;var Nr=(s,t,e)=>t in s?Or(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var V=(s,t,e)=>(Nr(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const Dr=`<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <title>Standalone example 1: Basic Grid</title>
  </head>

  <body>
    <h2>Excel-Builder-Vanilla</h2>
    <h5>Standalone JS (IIFE)</h5>

    <div>
      <div class="mb-2">
        <button class="btn btn-success btn-sm" id="export"><i class="fa fa-download"></i> Excel Export</button>
      </div>

      <div class="row">
        <div class="table-container col-sm-8">
          <table class="table">
            <thead>
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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/fflate@0.8.0/umd/index.js"><\/script>
    <script src="../../../excel-builder-vanilla/dist/excel-builder.iife.js"><\/script>

    <script>
      function downloader(options) {
        // when using IE/Edge, then use different download call
        if (typeof navigator.msSaveOrOpenBlob === 'function') {
          navigator.msSaveOrOpenBlob(options.blob, options.filename);
        } else {
          // this trick will generate a temp <a /> tag
          // the code will then trigger a hidden click for it to start downloading
          const link = document.createElement('a');
          const url = URL.createObjectURL(options.blob);

          if (link && document) {
            link.textContent = 'download';
            link.href = url;
            link.setAttribute('download', options.filename);

            // set the visibility to hidden so there is no effect on your web-layout
            link.style.visibility = 'hidden';

            // this part will append the anchor tag, trigger a click (for download to start) and finally remove the tag once completed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      }

      function exportExcel() {
        const originalData = [
          ['Artist', 'Album', 'Price'],
          ['Buckethead', 'Albino Slug', 8.99],
          ['Buckethead', 'Electric Tears', 13.99],
          ['Buckethead', 'Colma', 11.34],
          ['Crystal Method', 'Vegas', 10.54],
          ['Crystal Method', 'Tweekend', 10.64],
          ['Crystal Method', 'Divided By Night', 8.99],
        ];
        const artistWorkbook = new window.ExcelBuilder.Workbook();
        const albumList = artistWorkbook.createWorksheet({ name: 'Artists' });
        albumList.setData(originalData);
        artistWorkbook.addWorksheet(albumList);

        new window.ExcelBuilder.createExcelFile(artistWorkbook, { type: 'blob' }).then((excelBlob) => {
          const downloadOptions = {
            filename: 'Artist WB.xlsx',
            format: 'xlsx',
          };

          // start downloading but add the Blob property only on the start download not on the event itself
          downloader({ ...downloadOptions, blob: excelBlob, data: albumList.data });
        });
      }

      document.querySelector('button#export').addEventListener('click', () => {
        exportExcel();
      });
    <\/script>
  </body>
</html>
`,Lr=`<div class="example01">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 01: Create Worksheet
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example01.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example01.ts">ts</a>
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">Add data to export.</div>
    </div>
  </div>

  <div>
    <div class="mb-2">
      <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
    </div>

    <div class="row">
      <div class="table-container col-sm-8"></div>
    </div>
  </div>
</div>
`,$r=`<div class="example02">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 02: Sizing/Collapsing Columns
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example02.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example02.ts">ts</a>
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        The column <code>width</code> attribute will set a width. The <code>hidden</code> attribute will hide the column in Excel. The
        example below has the "Artist" column wider and the next column "Album" to be hidden in the exported Excel file.
      </div>
    </div>
  </div>

  <div>
    <div class="mb-2">
      <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
    </div>

    <div class="row">
      <div class="table-container col-sm-8">
        <table class="table">
          <thead>
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
`,Ir=`<div class="example03">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 03: Setting row information
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example03.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example03.ts">ts</a>
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Set different row options via <code>setRowInstructions()</code> method. For example, we changed the row height of the first row and
        change the text style to italic.
      </div>
    </div>
  </div>

  <div>
    <div class="mb-2">
      <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
    </div>

    <div class="row">
      <div class="table-container col-sm-8"></div>
    </div>
  </div>
</div>
`,Mr=`<div class="example04">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 04: Fonts and Colors
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example04.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example04.ts">ts</a>
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Set different fonts and colors via the <code>createFormat()</code> method, we can provide an object with the <code>font</code> and
        <code>border</code> properties.
      </div>
    </div>
  </div>

  <div>
    <div class="mb-2">
      <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
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
`,Pr=`<div class="example05">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 05: Number, Date, etc Formatting
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example05.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example05.ts">ts</a>
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        We can create custom format by using the <code>createFormat()</code> method, in this example we formatted the "Price" column as
        currency and the Modified Date is a Date format.
      </div>
    </div>
  </div>

  <div>
    <div class="mb-2">
      <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
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
`,Rr=`<div class="example06">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 06: Alignment
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example06.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example06.ts">ts</a>
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Set different alignments, in this example we horizontally aligned to the middle all header titles in the exported Excel file.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
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
`,Br=`<div class="example07">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 07: Background Fillers
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example07.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example07.ts">ts</a>
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Set different background filling by using <code>fill</code> property which accepts a wide range of options like background color
        type of gradient or pattern and different colors.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
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
`,Fr=`<div class="example08">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 08: Formulas
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example08.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example08.ts">ts</a>
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        We can set a formula by using the metadata object <code>{ value: 'C2+D2', metadata: { type: 'formula' } }</code>
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
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
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buckethead</td>
            <td>Albino Slug</td>
            <td>8.99</td>
            <td>5</td>
            <td>13.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Electric Tears</td>
            <td>13.99</td>
            <td>7</td>
            <td>20.99</td>
          </tr>
          <tr>
            <td>Buckethead</td>
            <td>Colma</td>
            <td>11.34</td>
            <td>9</td>
            <td>20.34</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Vegas</td>
            <td>10.54</td>
            <td>3</td>
            <td>13.54</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Tweekend</td>
            <td>10.64</td>
            <td>1</td>
            <td>11.64</td>
          </tr>
          <tr>
            <td>Crystal Method</td>
            <td>Divided By Night</td>
            <td>8.99</td>
            <td>56</td>
            <td>64.99</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`,Vr=`<div class="example09">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 09: Tables
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example09.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example09.ts">ts</a>
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Tables are a feature that is apparently new to Office 2007+, with a comparable feature called a <code>list</code> in 2003 and below.
        Basically, by putting data in a table, it gives the user some ways to filter and sort the data through UI. There are also some
        formula benefits. Creating a table takes a few extra steps, mostly because of how a table's definition is really detached from a
        worksheet.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"><span>Artist</span> <span class="fa fa-caret-square-o-down"></span></th>
            <th scope="col"><span>Album</span> <span class="fa fa-caret-square-o-down"></span></th>
            <th scope="col"><span>Price</span> <span class="fa fa-caret-square-o-down"></span></th>
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
`,Wr=`<div class="example10">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 10: Theming Tables
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example10.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example10.ts">ts</a>
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Every once in a while you need a table theme that isn't available from the custom themes. You can use
        <code>createTableStyle()</code> to change style for a section like the header row and/or the whole table.
      </div>
    </div>
  </div>

  <div class="mb-2">
    <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" class="text-center"><span>Artist</span> <span class="fa fa-caret-square-o-down"></span></th>
            <th scope="col" class="text-center"><span>Album</span> <span class="fa fa-caret-square-o-down"></span></th>
            <th scope="col" class="text-center"><span>Price</span> <span class="fa fa-caret-square-o-down"></span></th>
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
`,jr=`<div class="example11">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 11: Tables Summaries
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example11.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example11.ts">ts</a>
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
    <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
  </div>

  <div class="row">
    <div class="table-container col-sm-8">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col"><span>Artist</span> <span class="fa fa-caret-square-o-down"></span></th>
            <th scope="col"><span>Album</span> <span class="fa fa-caret-square-o-down"></span></th>
            <th scope="col"><span>Price</span> <span class="fa fa-caret-square-o-down"></span></th>
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
`,Hr=`<div class="example12">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 12: Worksheet Headers/Footers
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example12.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/demo/src/examples/example12.ts">ts</a>
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
    <button id="export" class="btn btn-success btn-sm"><i class="fa fa-download"></i> Excel Export</button>
  </div>

  <h6 class="mt-4"><code>Header</code></h6>
  <div class="row">
    <div class="table-container col-sm-8">
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
    </div>
  </div>
</div>
`,zr=`<div class="row mb-2">
  <div class="col-md-12 title-desc">
    <h2 class="bd-title">Getting Started</h2>
  </div>
</div>

<div class="content-text">
  <h3>Download</h3>
  <hr />

  <section>
    <h5>GitHub <i class="fa fa-link"></i></h5>
    <p>
      <a href="https://github.com/ghiscoding/excel-builder-vanilla">https://github.com/ghiscoding/excel-builder-vanilla</a>
    </p>
  </section>

  <section>
    <h5>CDN</h5>
    <p>
      <a href="https://www.jsdelivr.com/" target="__blank">jsDelivr</a> graciously provide CDNs for many JavaScript libraries including
      Excel-Builder-Vanilla. Just use the following CDN links.
    </p>
    <p>
      The project now ships its <code>.js</code> files as ESM by default, if you still wish to use the old CommonJS (CJS) format with
      <code>require()</code>, then you will have to use <code>.cjs</code> file extension.
    </p>

    <div style="background: #f7f7f7; padding: 10px">
      <pre>
&lt;!-- (IIFE Standalone Script <span style="color:#d63384">type=&quot;module&quot;</span>) Latest compiled and minified JavaScript --&gt;
&lt;script type=&quot;module&quot; src=&quot;<span style="color:#880000">https://cdn.jsdelivr.net/npm/excel-builder-vanilla@3.0.0/dist/excel-builder.iife.js</span>&quot;&gt;&lt;/script&gt;

&lt;!-- (UMD Files <span style="color:#d63384">.cjs</span> extension) Latest compiled and minified JavaScript --&gt;
&lt;script src=&quot;<span style="color:#880000">https://cdn.jsdelivr.net/npm/excel-builder-vanilla@3.0.0/dist/excel-builder.umd.js</span>&quot;&gt;&lt;/script&gt;</pre>
    </div>

    <quote>
      <b>Note:</b> the <code>excel-builder.iife.js</code> is the only one providing the <code>ExcelBuilder</code> on the
      <code>window</code> object.
    </quote>
    <br />
    <br />
    <quote>
      You can find a Standalone Script (IIFE) example at the location
      <a href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example-standalone-iife.html"
        >examples/example-standalone-iife.html</a
      >
    </quote>
  </section>

  <section>
    <h5>NPM</h5>
    <p>Install and manage Excel-Builder-Vanilla JavaScript using NPM.</p>

    <div style="background: #f7f7f7; padding: 10px">
      <pre>$ npm install excel-builder-vanilla</pre>
    </div>
  </section>

  <h5>CommonJS <code>require()</code> / ESM <code>import from</code></h5>
  <p>The library provides both CommonJS or ESM, see the example below:</p>
  <div style="background: #f7f7f7; padding: 10px">
    <pre>
// CommonJS
const { excelBuilder } = require('excel-builder-vanilla');
excelBuilder('.excel-builder', {/*...*/});

// ESM
import { excelBuilder } from 'excel-builder-vanilla';
excelBuilder('.excel-builder', {/*...*/});
    </pre>
  </div>
</div>
`,hi=`<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand mr-2 d-flex align-items-center" href="https://github.com/ghiscoding/excel-builder-vanilla">
      <img src="./github-mark-white.svg" alt="excel-builder-Vanilla" class="me-2" width="22" />
      <span>Excel Builder Vanilla</span>
    </a>
    <div class="github-button-container">
      <a href="https://github.com/ghiscoding/excel-builder-vanilla">
        <img src="https://img.shields.io/github/stars/ghiscoding/excel-builder-vanilla?style=social" />
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

<div class="container-fluid template-body">
  <div class="panel-wm">
    <section id="panel-left" class="panel-wm-left">
      <ul class="well nav nav-pills nav-stacked">
        <!-- All Example Routes -->
      </ul>
    </section>

    <section class="panel-wm-content"></section>
  </div>
</div>
`;var K="top",Q="bottom",J="right",Y="left",Xe="auto",ce=[K,Q,J,Y],Vt="start",ee="end",ui="clippingParents",Wn="viewport",Ut="popper",pi="reference",Sn=ce.reduce(function(s,t){return s.concat([t+"-"+Vt,t+"-"+ee])},[]),jn=[].concat(ce,[Xe]).reduce(function(s,t){return s.concat([t,t+"-"+Vt,t+"-"+ee])},[]),mi="beforeRead",fi="read",gi="afterRead",bi="beforeMain",vi="main",_i="afterMain",Ei="beforeWrite",yi="write",wi="afterWrite",xi=[mi,fi,gi,bi,vi,_i,Ei,yi,wi];function ft(s){return s?(s.nodeName||"").toLowerCase():null}function Z(s){if(s==null)return window;if(s.toString()!=="[object Window]"){var t=s.ownerDocument;return t&&t.defaultView||window}return s}function Wt(s){var t=Z(s).Element;return s instanceof t||s instanceof Element}function et(s){var t=Z(s).HTMLElement;return s instanceof t||s instanceof HTMLElement}function Hn(s){if(typeof ShadowRoot>"u")return!1;var t=Z(s).ShadowRoot;return s instanceof t||s instanceof ShadowRoot}function qr(s){var t=s.state;Object.keys(t.elements).forEach(function(e){var n=t.styles[e]||{},i=t.attributes[e]||{},r=t.elements[e];!et(r)||!ft(r)||(Object.assign(r.style,n),Object.keys(i).forEach(function(o){var a=i[o];a===!1?r.removeAttribute(o):r.setAttribute(o,a===!0?"":a)}))})}function Kr(s){var t=s.state,e={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,e.popper),t.styles=e,t.elements.arrow&&Object.assign(t.elements.arrow.style,e.arrow),function(){Object.keys(t.elements).forEach(function(n){var i=t.elements[n],r=t.attributes[n]||{},o=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:e[n]),a=o.reduce(function(l,d){return l[d]="",l},{});!et(i)||!ft(i)||(Object.assign(i.style,a),Object.keys(r).forEach(function(l){i.removeAttribute(l)}))})}}const zn={name:"applyStyles",enabled:!0,phase:"write",fn:qr,effect:Kr,requires:["computeStyles"]};function pt(s){return s.split("-")[0]}var Ft=Math.max,je=Math.min,ne=Math.round;function kn(){var s=navigator.userAgentData;return s!=null&&s.brands&&Array.isArray(s.brands)?s.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ai(){return!/^((?!chrome|android).)*safari/i.test(kn())}function se(s,t,e){t===void 0&&(t=!1),e===void 0&&(e=!1);var n=s.getBoundingClientRect(),i=1,r=1;t&&et(s)&&(i=s.offsetWidth>0&&ne(n.width)/s.offsetWidth||1,r=s.offsetHeight>0&&ne(n.height)/s.offsetHeight||1);var o=Wt(s)?Z(s):window,a=o.visualViewport,l=!Ai()&&e,d=(n.left+(l&&a?a.offsetLeft:0))/i,c=(n.top+(l&&a?a.offsetTop:0))/r,g=n.width/i,v=n.height/r;return{width:g,height:v,top:c,right:d+g,bottom:c+v,left:d,x:d,y:c}}function qn(s){var t=se(s),e=s.offsetWidth,n=s.offsetHeight;return Math.abs(t.width-e)<=1&&(e=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:s.offsetLeft,y:s.offsetTop,width:e,height:n}}function Ci(s,t){var e=t.getRootNode&&t.getRootNode();if(s.contains(t))return!0;if(e&&Hn(e)){var n=t;do{if(n&&s.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function _t(s){return Z(s).getComputedStyle(s)}function Yr(s){return["table","td","th"].indexOf(ft(s))>=0}function Nt(s){return((Wt(s)?s.ownerDocument:s.document)||window.document).documentElement}function Ge(s){return ft(s)==="html"?s:s.assignedSlot||s.parentNode||(Hn(s)?s.host:null)||Nt(s)}function Es(s){return!et(s)||_t(s).position==="fixed"?null:s.offsetParent}function Ur(s){var t=/firefox/i.test(kn()),e=/Trident/i.test(kn());if(e&&et(s)){var n=_t(s);if(n.position==="fixed")return null}var i=Ge(s);for(Hn(i)&&(i=i.host);et(i)&&["html","body"].indexOf(ft(i))<0;){var r=_t(i);if(r.transform!=="none"||r.perspective!=="none"||r.contain==="paint"||["transform","perspective"].indexOf(r.willChange)!==-1||t&&r.willChange==="filter"||t&&r.filter&&r.filter!=="none")return i;i=i.parentNode}return null}function ye(s){for(var t=Z(s),e=Es(s);e&&Yr(e)&&_t(e).position==="static";)e=Es(e);return e&&(ft(e)==="html"||ft(e)==="body"&&_t(e).position==="static")?t:e||Ur(s)||t}function Kn(s){return["top","bottom"].indexOf(s)>=0?"x":"y"}function be(s,t,e){return Ft(s,je(t,e))}function Xr(s,t,e){var n=be(s,t,e);return n>e?e:n}function Ti(){return{top:0,right:0,bottom:0,left:0}}function Si(s){return Object.assign({},Ti(),s)}function ki(s,t){return t.reduce(function(e,n){return e[n]=s,e},{})}var Gr=function(t,e){return t=typeof t=="function"?t(Object.assign({},e.rects,{placement:e.placement})):t,Si(typeof t!="number"?t:ki(t,ce))};function Qr(s){var t,e=s.state,n=s.name,i=s.options,r=e.elements.arrow,o=e.modifiersData.popperOffsets,a=pt(e.placement),l=Kn(a),d=[Y,J].indexOf(a)>=0,c=d?"height":"width";if(!(!r||!o)){var g=Gr(i.padding,e),v=qn(r),f=l==="y"?K:Y,_=l==="y"?Q:J,p=e.rects.reference[c]+e.rects.reference[l]-o[l]-e.rects.popper[c],b=o[l]-e.rects.reference[l],E=ye(r),x=E?l==="y"?E.clientHeight||0:E.clientWidth||0:0,C=p/2-b/2,m=g[f],T=x-v[c]-g[_],k=x/2-v[c]/2+C,O=be(m,k,T),S=l;e.modifiersData[n]=(t={},t[S]=O,t.centerOffset=O-k,t)}}function Jr(s){var t=s.state,e=s.options,n=e.element,i=n===void 0?"[data-popper-arrow]":n;i!=null&&(typeof i=="string"&&(i=t.elements.popper.querySelector(i),!i)||Ci(t.elements.popper,i)&&(t.elements.arrow=i))}const Oi={name:"arrow",enabled:!0,phase:"main",fn:Qr,effect:Jr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ie(s){return s.split("-")[1]}var Zr={top:"auto",right:"auto",bottom:"auto",left:"auto"};function to(s,t){var e=s.x,n=s.y,i=t.devicePixelRatio||1;return{x:ne(e*i)/i||0,y:ne(n*i)/i||0}}function ys(s){var t,e=s.popper,n=s.popperRect,i=s.placement,r=s.variation,o=s.offsets,a=s.position,l=s.gpuAcceleration,d=s.adaptive,c=s.roundOffsets,g=s.isFixed,v=o.x,f=v===void 0?0:v,_=o.y,p=_===void 0?0:_,b=typeof c=="function"?c({x:f,y:p}):{x:f,y:p};f=b.x,p=b.y;var E=o.hasOwnProperty("x"),x=o.hasOwnProperty("y"),C=Y,m=K,T=window;if(d){var k=ye(e),O="clientHeight",S="clientWidth";if(k===Z(e)&&(k=Nt(e),_t(k).position!=="static"&&a==="absolute"&&(O="scrollHeight",S="scrollWidth")),k=k,i===K||(i===Y||i===J)&&r===ee){m=Q;var y=g&&k===T&&T.visualViewport?T.visualViewport.height:k[O];p-=y-n.height,p*=l?1:-1}if(i===Y||(i===K||i===Q)&&r===ee){C=J;var N=g&&k===T&&T.visualViewport?T.visualViewport.width:k[S];f-=N-n.width,f*=l?1:-1}}var I=Object.assign({position:a},d&&Zr),L=c===!0?to({x:f,y:p},Z(e)):{x:f,y:p};if(f=L.x,p=L.y,l){var M;return Object.assign({},I,(M={},M[m]=x?"0":"",M[C]=E?"0":"",M.transform=(T.devicePixelRatio||1)<=1?"translate("+f+"px, "+p+"px)":"translate3d("+f+"px, "+p+"px, 0)",M))}return Object.assign({},I,(t={},t[m]=x?p+"px":"",t[C]=E?f+"px":"",t.transform="",t))}function eo(s){var t=s.state,e=s.options,n=e.gpuAcceleration,i=n===void 0?!0:n,r=e.adaptive,o=r===void 0?!0:r,a=e.roundOffsets,l=a===void 0?!0:a,d={placement:pt(t.placement),variation:ie(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,ys(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:o,roundOffsets:l})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,ys(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Yn={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:eo,data:{}};var Oe={passive:!0};function no(s){var t=s.state,e=s.instance,n=s.options,i=n.scroll,r=i===void 0?!0:i,o=n.resize,a=o===void 0?!0:o,l=Z(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return r&&d.forEach(function(c){c.addEventListener("scroll",e.update,Oe)}),a&&l.addEventListener("resize",e.update,Oe),function(){r&&d.forEach(function(c){c.removeEventListener("scroll",e.update,Oe)}),a&&l.removeEventListener("resize",e.update,Oe)}}const Un={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:no,data:{}};var so={left:"right",right:"left",bottom:"top",top:"bottom"};function Re(s){return s.replace(/left|right|bottom|top/g,function(t){return so[t]})}var io={start:"end",end:"start"};function ws(s){return s.replace(/start|end/g,function(t){return io[t]})}function Xn(s){var t=Z(s),e=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:e,scrollTop:n}}function Gn(s){return se(Nt(s)).left+Xn(s).scrollLeft}function ro(s,t){var e=Z(s),n=Nt(s),i=e.visualViewport,r=n.clientWidth,o=n.clientHeight,a=0,l=0;if(i){r=i.width,o=i.height;var d=Ai();(d||!d&&t==="fixed")&&(a=i.offsetLeft,l=i.offsetTop)}return{width:r,height:o,x:a+Gn(s),y:l}}function oo(s){var t,e=Nt(s),n=Xn(s),i=(t=s.ownerDocument)==null?void 0:t.body,r=Ft(e.scrollWidth,e.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),o=Ft(e.scrollHeight,e.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),a=-n.scrollLeft+Gn(s),l=-n.scrollTop;return _t(i||e).direction==="rtl"&&(a+=Ft(e.clientWidth,i?i.clientWidth:0)-r),{width:r,height:o,x:a,y:l}}function Qn(s){var t=_t(s),e=t.overflow,n=t.overflowX,i=t.overflowY;return/auto|scroll|overlay|hidden/.test(e+i+n)}function Ni(s){return["html","body","#document"].indexOf(ft(s))>=0?s.ownerDocument.body:et(s)&&Qn(s)?s:Ni(Ge(s))}function ve(s,t){var e;t===void 0&&(t=[]);var n=Ni(s),i=n===((e=s.ownerDocument)==null?void 0:e.body),r=Z(n),o=i?[r].concat(r.visualViewport||[],Qn(n)?n:[]):n,a=t.concat(o);return i?a:a.concat(ve(Ge(o)))}function On(s){return Object.assign({},s,{left:s.x,top:s.y,right:s.x+s.width,bottom:s.y+s.height})}function ao(s,t){var e=se(s,!1,t==="fixed");return e.top=e.top+s.clientTop,e.left=e.left+s.clientLeft,e.bottom=e.top+s.clientHeight,e.right=e.left+s.clientWidth,e.width=s.clientWidth,e.height=s.clientHeight,e.x=e.left,e.y=e.top,e}function xs(s,t,e){return t===Wn?On(ro(s,e)):Wt(t)?ao(t,e):On(oo(Nt(s)))}function lo(s){var t=ve(Ge(s)),e=["absolute","fixed"].indexOf(_t(s).position)>=0,n=e&&et(s)?ye(s):s;return Wt(n)?t.filter(function(i){return Wt(i)&&Ci(i,n)&&ft(i)!=="body"}):[]}function co(s,t,e,n){var i=t==="clippingParents"?lo(s):[].concat(t),r=[].concat(i,[e]),o=r[0],a=r.reduce(function(l,d){var c=xs(s,d,n);return l.top=Ft(c.top,l.top),l.right=je(c.right,l.right),l.bottom=je(c.bottom,l.bottom),l.left=Ft(c.left,l.left),l},xs(s,o,n));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Di(s){var t=s.reference,e=s.element,n=s.placement,i=n?pt(n):null,r=n?ie(n):null,o=t.x+t.width/2-e.width/2,a=t.y+t.height/2-e.height/2,l;switch(i){case K:l={x:o,y:t.y-e.height};break;case Q:l={x:o,y:t.y+t.height};break;case J:l={x:t.x+t.width,y:a};break;case Y:l={x:t.x-e.width,y:a};break;default:l={x:t.x,y:t.y}}var d=i?Kn(i):null;if(d!=null){var c=d==="y"?"height":"width";switch(r){case Vt:l[d]=l[d]-(t[c]/2-e[c]/2);break;case ee:l[d]=l[d]+(t[c]/2-e[c]/2);break}}return l}function re(s,t){t===void 0&&(t={});var e=t,n=e.placement,i=n===void 0?s.placement:n,r=e.strategy,o=r===void 0?s.strategy:r,a=e.boundary,l=a===void 0?ui:a,d=e.rootBoundary,c=d===void 0?Wn:d,g=e.elementContext,v=g===void 0?Ut:g,f=e.altBoundary,_=f===void 0?!1:f,p=e.padding,b=p===void 0?0:p,E=Si(typeof b!="number"?b:ki(b,ce)),x=v===Ut?pi:Ut,C=s.rects.popper,m=s.elements[_?x:v],T=co(Wt(m)?m:m.contextElement||Nt(s.elements.popper),l,c,o),k=se(s.elements.reference),O=Di({reference:k,element:C,strategy:"absolute",placement:i}),S=On(Object.assign({},C,O)),y=v===Ut?S:k,N={top:T.top-y.top+E.top,bottom:y.bottom-T.bottom+E.bottom,left:T.left-y.left+E.left,right:y.right-T.right+E.right},I=s.modifiersData.offset;if(v===Ut&&I){var L=I[i];Object.keys(N).forEach(function(M){var P=[J,Q].indexOf(M)>=0?1:-1,F=[K,Q].indexOf(M)>=0?"y":"x";N[M]+=L[F]*P})}return N}function ho(s,t){t===void 0&&(t={});var e=t,n=e.placement,i=e.boundary,r=e.rootBoundary,o=e.padding,a=e.flipVariations,l=e.allowedAutoPlacements,d=l===void 0?jn:l,c=ie(n),g=c?a?Sn:Sn.filter(function(_){return ie(_)===c}):ce,v=g.filter(function(_){return d.indexOf(_)>=0});v.length===0&&(v=g);var f=v.reduce(function(_,p){return _[p]=re(s,{placement:p,boundary:i,rootBoundary:r,padding:o})[pt(p)],_},{});return Object.keys(f).sort(function(_,p){return f[_]-f[p]})}function uo(s){if(pt(s)===Xe)return[];var t=Re(s);return[ws(s),t,ws(t)]}function po(s){var t=s.state,e=s.options,n=s.name;if(!t.modifiersData[n]._skip){for(var i=e.mainAxis,r=i===void 0?!0:i,o=e.altAxis,a=o===void 0?!0:o,l=e.fallbackPlacements,d=e.padding,c=e.boundary,g=e.rootBoundary,v=e.altBoundary,f=e.flipVariations,_=f===void 0?!0:f,p=e.allowedAutoPlacements,b=t.options.placement,E=pt(b),x=E===b,C=l||(x||!_?[Re(b)]:uo(b)),m=[b].concat(C).reduce(function(j,R){return j.concat(pt(R)===Xe?ho(t,{placement:R,boundary:c,rootBoundary:g,padding:d,flipVariations:_,allowedAutoPlacements:p}):R)},[]),T=t.rects.reference,k=t.rects.popper,O=new Map,S=!0,y=m[0],N=0;N<m.length;N++){var I=m[N],L=pt(I),M=ie(I)===Vt,P=[K,Q].indexOf(L)>=0,F=P?"width":"height",$=re(t,{placement:I,boundary:c,rootBoundary:g,altBoundary:v,padding:d}),D=P?M?J:Y:M?Q:K;T[F]>k[F]&&(D=Re(D));var z=Re(D),q=[];if(r&&q.push($[L]<=0),a&&q.push($[D]<=0,$[z]<=0),q.every(function(j){return j})){y=I,S=!1;break}O.set(I,q)}if(S)for(var wt=_?3:1,U=function(R){var tt=m.find(function($t){var ct=O.get($t);if(ct)return ct.slice(0,R).every(function(pe){return pe})});if(tt)return y=tt,"break"},at=wt;at>0;at--){var lt=U(at);if(lt==="break")break}t.placement!==y&&(t.modifiersData[n]._skip=!0,t.placement=y,t.reset=!0)}}const Li={name:"flip",enabled:!0,phase:"main",fn:po,requiresIfExists:["offset"],data:{_skip:!1}};function As(s,t,e){return e===void 0&&(e={x:0,y:0}),{top:s.top-t.height-e.y,right:s.right-t.width+e.x,bottom:s.bottom-t.height+e.y,left:s.left-t.width-e.x}}function Cs(s){return[K,J,Q,Y].some(function(t){return s[t]>=0})}function mo(s){var t=s.state,e=s.name,n=t.rects.reference,i=t.rects.popper,r=t.modifiersData.preventOverflow,o=re(t,{elementContext:"reference"}),a=re(t,{altBoundary:!0}),l=As(o,n),d=As(a,i,r),c=Cs(l),g=Cs(d);t.modifiersData[e]={referenceClippingOffsets:l,popperEscapeOffsets:d,isReferenceHidden:c,hasPopperEscaped:g},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":g})}const $i={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:mo};function fo(s,t,e){var n=pt(s),i=[Y,K].indexOf(n)>=0?-1:1,r=typeof e=="function"?e(Object.assign({},t,{placement:s})):e,o=r[0],a=r[1];return o=o||0,a=(a||0)*i,[Y,J].indexOf(n)>=0?{x:a,y:o}:{x:o,y:a}}function go(s){var t=s.state,e=s.options,n=s.name,i=e.offset,r=i===void 0?[0,0]:i,o=jn.reduce(function(c,g){return c[g]=fo(g,t.rects,r),c},{}),a=o[t.placement],l=a.x,d=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=d),t.modifiersData[n]=o}const Ii={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:go};function bo(s){var t=s.state,e=s.name;t.modifiersData[e]=Di({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Jn={name:"popperOffsets",enabled:!0,phase:"read",fn:bo,data:{}};function vo(s){return s==="x"?"y":"x"}function _o(s){var t=s.state,e=s.options,n=s.name,i=e.mainAxis,r=i===void 0?!0:i,o=e.altAxis,a=o===void 0?!1:o,l=e.boundary,d=e.rootBoundary,c=e.altBoundary,g=e.padding,v=e.tether,f=v===void 0?!0:v,_=e.tetherOffset,p=_===void 0?0:_,b=re(t,{boundary:l,rootBoundary:d,padding:g,altBoundary:c}),E=pt(t.placement),x=ie(t.placement),C=!x,m=Kn(E),T=vo(m),k=t.modifiersData.popperOffsets,O=t.rects.reference,S=t.rects.popper,y=typeof p=="function"?p(Object.assign({},t.rects,{placement:t.placement})):p,N=typeof y=="number"?{mainAxis:y,altAxis:y}:Object.assign({mainAxis:0,altAxis:0},y),I=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,L={x:0,y:0};if(k){if(r){var M,P=m==="y"?K:Y,F=m==="y"?Q:J,$=m==="y"?"height":"width",D=k[m],z=D+b[P],q=D-b[F],wt=f?-S[$]/2:0,U=x===Vt?O[$]:S[$],at=x===Vt?-S[$]:-O[$],lt=t.elements.arrow,j=f&&lt?qn(lt):{width:0,height:0},R=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ti(),tt=R[P],$t=R[F],ct=be(0,O[$],j[$]),pe=C?O[$]/2-wt-ct-tt-N.mainAxis:U-ct-tt-N.mainAxis,Te=C?-O[$]/2+wt+ct+$t+N.mainAxis:at+ct+$t+N.mainAxis,zt=t.elements.arrow&&ye(t.elements.arrow),Se=zt?m==="y"?zt.clientTop||0:zt.clientLeft||0:0,qt=(M=I==null?void 0:I[m])!=null?M:0,me=D+pe-qt-Se,Tr=D+Te-qt,us=be(f?je(z,me):z,D,f?Ft(q,Tr):q);k[m]=us,L[m]=us-D}if(a){var ps,Sr=m==="x"?K:Y,kr=m==="x"?Q:J,It=k[T],ke=T==="y"?"height":"width",ms=It+b[Sr],fs=It-b[kr],cn=[K,Y].indexOf(E)!==-1,gs=(ps=I==null?void 0:I[T])!=null?ps:0,bs=cn?ms:It-O[ke]-S[ke]-gs+N.altAxis,vs=cn?It+O[ke]+S[ke]-gs-N.altAxis:fs,_s=f&&cn?Xr(bs,It,vs):be(f?bs:ms,It,f?vs:fs);k[T]=_s,L[T]=_s-It}t.modifiersData[n]=L}}const Mi={name:"preventOverflow",enabled:!0,phase:"main",fn:_o,requiresIfExists:["offset"]};function Eo(s){return{scrollLeft:s.scrollLeft,scrollTop:s.scrollTop}}function yo(s){return s===Z(s)||!et(s)?Xn(s):Eo(s)}function wo(s){var t=s.getBoundingClientRect(),e=ne(t.width)/s.offsetWidth||1,n=ne(t.height)/s.offsetHeight||1;return e!==1||n!==1}function xo(s,t,e){e===void 0&&(e=!1);var n=et(t),i=et(t)&&wo(t),r=Nt(t),o=se(s,i,e),a={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(n||!n&&!e)&&((ft(t)!=="body"||Qn(r))&&(a=yo(t)),et(t)?(l=se(t,!0),l.x+=t.clientLeft,l.y+=t.clientTop):r&&(l.x=Gn(r))),{x:o.left+a.scrollLeft-l.x,y:o.top+a.scrollTop-l.y,width:o.width,height:o.height}}function Ao(s){var t=new Map,e=new Set,n=[];s.forEach(function(r){t.set(r.name,r)});function i(r){e.add(r.name);var o=[].concat(r.requires||[],r.requiresIfExists||[]);o.forEach(function(a){if(!e.has(a)){var l=t.get(a);l&&i(l)}}),n.push(r)}return s.forEach(function(r){e.has(r.name)||i(r)}),n}function Co(s){var t=Ao(s);return xi.reduce(function(e,n){return e.concat(t.filter(function(i){return i.phase===n}))},[])}function To(s){var t;return function(){return t||(t=new Promise(function(e){Promise.resolve().then(function(){t=void 0,e(s())})})),t}}function So(s){var t=s.reduce(function(e,n){var i=e[n.name];return e[n.name]=i?Object.assign({},i,n,{options:Object.assign({},i.options,n.options),data:Object.assign({},i.data,n.data)}):n,e},{});return Object.keys(t).map(function(e){return t[e]})}var Ts={placement:"bottom",modifiers:[],strategy:"absolute"};function Ss(){for(var s=arguments.length,t=new Array(s),e=0;e<s;e++)t[e]=arguments[e];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Qe(s){s===void 0&&(s={});var t=s,e=t.defaultModifiers,n=e===void 0?[]:e,i=t.defaultOptions,r=i===void 0?Ts:i;return function(a,l,d){d===void 0&&(d=r);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},Ts,r),modifiersData:{},elements:{reference:a,popper:l},attributes:{},styles:{}},g=[],v=!1,f={state:c,setOptions:function(E){var x=typeof E=="function"?E(c.options):E;p(),c.options=Object.assign({},r,c.options,x),c.scrollParents={reference:Wt(a)?ve(a):a.contextElement?ve(a.contextElement):[],popper:ve(l)};var C=Co(So([].concat(n,c.options.modifiers)));return c.orderedModifiers=C.filter(function(m){return m.enabled}),_(),f.update()},forceUpdate:function(){if(!v){var E=c.elements,x=E.reference,C=E.popper;if(Ss(x,C)){c.rects={reference:xo(x,ye(C),c.options.strategy==="fixed"),popper:qn(C)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function(N){return c.modifiersData[N.name]=Object.assign({},N.data)});for(var m=0;m<c.orderedModifiers.length;m++){if(c.reset===!0){c.reset=!1,m=-1;continue}var T=c.orderedModifiers[m],k=T.fn,O=T.options,S=O===void 0?{}:O,y=T.name;typeof k=="function"&&(c=k({state:c,options:S,name:y,instance:f})||c)}}}},update:To(function(){return new Promise(function(b){f.forceUpdate(),b(c)})}),destroy:function(){p(),v=!0}};if(!Ss(a,l))return f;f.setOptions(d).then(function(b){!v&&d.onFirstUpdate&&d.onFirstUpdate(b)});function _(){c.orderedModifiers.forEach(function(b){var E=b.name,x=b.options,C=x===void 0?{}:x,m=b.effect;if(typeof m=="function"){var T=m({state:c,name:E,instance:f,options:C}),k=function(){};g.push(T||k)}})}function p(){g.forEach(function(b){return b()}),g=[]}return f}}var ko=Qe(),Oo=[Un,Jn,Yn,zn],No=Qe({defaultModifiers:Oo}),Do=[Un,Jn,Yn,zn,Ii,Li,Mi,Oi,$i],Zn=Qe({defaultModifiers:Do});const Pi=Object.freeze(Object.defineProperty({__proto__:null,afterMain:_i,afterRead:gi,afterWrite:wi,applyStyles:zn,arrow:Oi,auto:Xe,basePlacements:ce,beforeMain:bi,beforeRead:mi,beforeWrite:Ei,bottom:Q,clippingParents:ui,computeStyles:Yn,createPopper:Zn,createPopperBase:ko,createPopperLite:No,detectOverflow:re,end:ee,eventListeners:Un,flip:Li,hide:$i,left:Y,main:vi,modifierPhases:xi,offset:Ii,placements:jn,popper:Ut,popperGenerator:Qe,popperOffsets:Jn,preventOverflow:Mi,read:fi,reference:pi,right:J,start:Vt,top:K,variationPlacements:Sn,viewport:Wn,write:yi},Symbol.toStringTag,{value:"Module"}));/*!
  * Bootstrap v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */const xt=new Map,dn={set(s,t,e){xt.has(s)||xt.set(s,new Map);const n=xt.get(s);if(!n.has(t)&&n.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);return}n.set(t,e)},get(s,t){return xt.has(s)&&xt.get(s).get(t)||null},remove(s,t){if(!xt.has(s))return;const e=xt.get(s);e.delete(t),e.size===0&&xt.delete(s)}},Lo=1e6,$o=1e3,Nn="transitionend",Ri=s=>(s&&window.CSS&&window.CSS.escape&&(s=s.replace(/#([^\s"#']+)/g,(t,e)=>`#${CSS.escape(e)}`)),s),Io=s=>s==null?`${s}`:Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(),Mo=s=>{do s+=Math.floor(Math.random()*Lo);while(document.getElementById(s));return s},Po=s=>{if(!s)return 0;let{transitionDuration:t,transitionDelay:e}=window.getComputedStyle(s);const n=Number.parseFloat(t),i=Number.parseFloat(e);return!n&&!i?0:(t=t.split(",")[0],e=e.split(",")[0],(Number.parseFloat(t)+Number.parseFloat(e))*$o)},Bi=s=>{s.dispatchEvent(new Event(Nn))},bt=s=>!s||typeof s!="object"?!1:(typeof s.jquery<"u"&&(s=s[0]),typeof s.nodeType<"u"),Tt=s=>bt(s)?s.jquery?s[0]:s:typeof s=="string"&&s.length>0?document.querySelector(Ri(s)):null,de=s=>{if(!bt(s)||s.getClientRects().length===0)return!1;const t=getComputedStyle(s).getPropertyValue("visibility")==="visible",e=s.closest("details:not([open])");if(!e)return t;if(e!==s){const n=s.closest("summary");if(n&&n.parentNode!==e||n===null)return!1}return t},St=s=>!s||s.nodeType!==Node.ELEMENT_NODE||s.classList.contains("disabled")?!0:typeof s.disabled<"u"?s.disabled:s.hasAttribute("disabled")&&s.getAttribute("disabled")!=="false",Fi=s=>{if(!document.documentElement.attachShadow)return null;if(typeof s.getRootNode=="function"){const t=s.getRootNode();return t instanceof ShadowRoot?t:null}return s instanceof ShadowRoot?s:s.parentNode?Fi(s.parentNode):null},He=()=>{},we=s=>{s.offsetHeight},Vi=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,hn=[],Ro=s=>{document.readyState==="loading"?(hn.length||document.addEventListener("DOMContentLoaded",()=>{for(const t of hn)t()}),hn.push(s)):s()},nt=()=>document.documentElement.dir==="rtl",it=s=>{Ro(()=>{const t=Vi();if(t){const e=s.NAME,n=t.fn[e];t.fn[e]=s.jQueryInterface,t.fn[e].Constructor=s,t.fn[e].noConflict=()=>(t.fn[e]=n,s.jQueryInterface)}})},X=(s,t=[],e=s)=>typeof s=="function"?s(...t):e,Wi=(s,t,e=!0)=>{if(!e){X(s);return}const i=Po(t)+5;let r=!1;const o=({target:a})=>{a===t&&(r=!0,t.removeEventListener(Nn,o),X(s))};t.addEventListener(Nn,o),setTimeout(()=>{r||Bi(t)},i)},ts=(s,t,e,n)=>{const i=s.length;let r=s.indexOf(t);return r===-1?!e&&n?s[i-1]:s[0]:(r+=e?1:-1,n&&(r=(r+i)%i),s[Math.max(0,Math.min(r,i-1))])},Bo=/[^.]*(?=\..*)\.|.*/,Fo=/\..*/,Vo=/::\d+$/,un={};let ks=1;const ji={mouseenter:"mouseover",mouseleave:"mouseout"},Wo=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function Hi(s,t){return t&&`${t}::${ks++}`||s.uidEvent||ks++}function zi(s){const t=Hi(s);return s.uidEvent=t,un[t]=un[t]||{},un[t]}function jo(s,t){return function e(n){return es(n,{delegateTarget:s}),e.oneOff&&u.off(s,n.type,t),t.apply(s,[n])}}function Ho(s,t,e){return function n(i){const r=s.querySelectorAll(t);for(let{target:o}=i;o&&o!==this;o=o.parentNode)for(const a of r)if(a===o)return es(i,{delegateTarget:o}),n.oneOff&&u.off(s,i.type,t,e),e.apply(o,[i])}}function qi(s,t,e=null){return Object.values(s).find(n=>n.callable===t&&n.delegationSelector===e)}function Ki(s,t,e){const n=typeof t=="string",i=n?e:t||e;let r=Yi(s);return Wo.has(r)||(r=s),[n,i,r]}function Os(s,t,e,n,i){if(typeof t!="string"||!s)return;let[r,o,a]=Ki(t,e,n);t in ji&&(o=(_=>function(p){if(!p.relatedTarget||p.relatedTarget!==p.delegateTarget&&!p.delegateTarget.contains(p.relatedTarget))return _.call(this,p)})(o));const l=zi(s),d=l[a]||(l[a]={}),c=qi(d,o,r?e:null);if(c){c.oneOff=c.oneOff&&i;return}const g=Hi(o,t.replace(Bo,"")),v=r?Ho(s,e,o):jo(s,o);v.delegationSelector=r?e:null,v.callable=o,v.oneOff=i,v.uidEvent=g,d[g]=v,s.addEventListener(a,v,r)}function Dn(s,t,e,n,i){const r=qi(t[e],n,i);r&&(s.removeEventListener(e,r,!!i),delete t[e][r.uidEvent])}function zo(s,t,e,n){const i=t[e]||{};for(const[r,o]of Object.entries(i))r.includes(n)&&Dn(s,t,e,o.callable,o.delegationSelector)}function Yi(s){return s=s.replace(Fo,""),ji[s]||s}const u={on(s,t,e,n){Os(s,t,e,n,!1)},one(s,t,e,n){Os(s,t,e,n,!0)},off(s,t,e,n){if(typeof t!="string"||!s)return;const[i,r,o]=Ki(t,e,n),a=o!==t,l=zi(s),d=l[o]||{},c=t.startsWith(".");if(typeof r<"u"){if(!Object.keys(d).length)return;Dn(s,l,o,r,i?e:null);return}if(c)for(const g of Object.keys(l))zo(s,l,g,t.slice(1));for(const[g,v]of Object.entries(d)){const f=g.replace(Vo,"");(!a||t.includes(f))&&Dn(s,l,o,v.callable,v.delegationSelector)}},trigger(s,t,e){if(typeof t!="string"||!s)return null;const n=Vi(),i=Yi(t),r=t!==i;let o=null,a=!0,l=!0,d=!1;r&&n&&(o=n.Event(t,e),n(s).trigger(o),a=!o.isPropagationStopped(),l=!o.isImmediatePropagationStopped(),d=o.isDefaultPrevented());const c=es(new Event(t,{bubbles:a,cancelable:!0}),e);return d&&c.preventDefault(),l&&s.dispatchEvent(c),c.defaultPrevented&&o&&o.preventDefault(),c}};function es(s,t={}){for(const[e,n]of Object.entries(t))try{s[e]=n}catch{Object.defineProperty(s,e,{configurable:!0,get(){return n}})}return s}function Ns(s){if(s==="true")return!0;if(s==="false")return!1;if(s===Number(s).toString())return Number(s);if(s===""||s==="null")return null;if(typeof s!="string")return s;try{return JSON.parse(decodeURIComponent(s))}catch{return s}}function pn(s){return s.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}const vt={setDataAttribute(s,t,e){s.setAttribute(`data-bs-${pn(t)}`,e)},removeDataAttribute(s,t){s.removeAttribute(`data-bs-${pn(t)}`)},getDataAttributes(s){if(!s)return{};const t={},e=Object.keys(s.dataset).filter(n=>n.startsWith("bs")&&!n.startsWith("bsConfig"));for(const n of e){let i=n.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),t[i]=Ns(s.dataset[n])}return t},getDataAttribute(s,t){return Ns(s.getAttribute(`data-bs-${pn(t)}`))}};class xe{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const n=bt(e)?vt.getDataAttribute(e,"config"):{};return{...this.constructor.Default,...typeof n=="object"?n:{},...bt(e)?vt.getDataAttributes(e):{},...typeof t=="object"?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const[n,i]of Object.entries(e)){const r=t[n],o=bt(r)?"element":Io(r);if(!new RegExp(i).test(o))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`)}}}const qo="5.3.2";class dt extends xe{constructor(t,e){super(),t=Tt(t),t&&(this._element=t,this._config=this._getConfig(e),dn.set(this._element,this.constructor.DATA_KEY,this))}dispose(){dn.remove(this._element,this.constructor.DATA_KEY),u.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,n=!0){Wi(t,e,n)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return dn.get(Tt(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,typeof e=="object"?e:null)}static get VERSION(){return qo}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}}const mn=s=>{let t=s.getAttribute("data-bs-target");if(!t||t==="#"){let e=s.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;e.includes("#")&&!e.startsWith("#")&&(e=`#${e.split("#")[1]}`),t=e&&e!=="#"?Ri(e.trim()):null}return t},A={find(s,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,s))},findOne(s,t=document.documentElement){return Element.prototype.querySelector.call(t,s)},children(s,t){return[].concat(...s.children).filter(e=>e.matches(t))},parents(s,t){const e=[];let n=s.parentNode.closest(t);for(;n;)e.push(n),n=n.parentNode.closest(t);return e},prev(s,t){let e=s.previousElementSibling;for(;e;){if(e.matches(t))return[e];e=e.previousElementSibling}return[]},next(s,t){let e=s.nextElementSibling;for(;e;){if(e.matches(t))return[e];e=e.nextElementSibling}return[]},focusableChildren(s){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(e=>`${e}:not([tabindex^="-"])`).join(",");return this.find(t,s).filter(e=>!St(e)&&de(e))},getSelectorFromElement(s){const t=mn(s);return t&&A.findOne(t)?t:null},getElementFromSelector(s){const t=mn(s);return t?A.findOne(t):null},getMultipleElementsFromSelector(s){const t=mn(s);return t?A.find(t):[]}},Je=(s,t="hide")=>{const e=`click.dismiss${s.EVENT_KEY}`,n=s.NAME;u.on(document,e,`[data-bs-dismiss="${n}"]`,function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),St(this))return;const r=A.getElementFromSelector(this)||this.closest(`.${n}`);s.getOrCreateInstance(r)[t]()})},Ko="alert",Yo="bs.alert",Ui=`.${Yo}`,Uo=`close${Ui}`,Xo=`closed${Ui}`,Go="fade",Qo="show";class Ze extends dt{static get NAME(){return Ko}close(){if(u.trigger(this._element,Uo).defaultPrevented)return;this._element.classList.remove(Qo);const e=this._element.classList.contains(Go);this._queueCallback(()=>this._destroyElement(),this._element,e)}_destroyElement(){this._element.remove(),u.trigger(this._element,Xo),this.dispose()}static jQueryInterface(t){return this.each(function(){const e=Ze.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}Je(Ze,"close");it(Ze);const Jo="button",Zo="bs.button",ta=`.${Zo}`,ea=".data-api",na="active",Ds='[data-bs-toggle="button"]',sa=`click${ta}${ea}`;class tn extends dt{static get NAME(){return Jo}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle(na))}static jQueryInterface(t){return this.each(function(){const e=tn.getOrCreateInstance(this);t==="toggle"&&e[t]()})}}u.on(document,sa,Ds,s=>{s.preventDefault();const t=s.target.closest(Ds);tn.getOrCreateInstance(t).toggle()});it(tn);const ia="swipe",he=".bs.swipe",ra=`touchstart${he}`,oa=`touchmove${he}`,aa=`touchend${he}`,la=`pointerdown${he}`,ca=`pointerup${he}`,da="touch",ha="pen",ua="pointer-event",pa=40,ma={endCallback:null,leftCallback:null,rightCallback:null},fa={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class ze extends xe{constructor(t,e){super(),this._element=t,!(!t||!ze.isSupported())&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return ma}static get DefaultType(){return fa}static get NAME(){return ia}dispose(){u.off(this._element,he)}_start(t){if(!this._supportPointerEvents){this._deltaX=t.touches[0].clientX;return}this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX)}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),X(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=pa)return;const e=t/this._deltaX;this._deltaX=0,e&&X(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(u.on(this._element,la,t=>this._start(t)),u.on(this._element,ca,t=>this._end(t)),this._element.classList.add(ua)):(u.on(this._element,ra,t=>this._start(t)),u.on(this._element,oa,t=>this._move(t)),u.on(this._element,aa,t=>this._end(t)))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&(t.pointerType===ha||t.pointerType===da)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const ga="carousel",ba="bs.carousel",Dt=`.${ba}`,Xi=".data-api",va="ArrowLeft",_a="ArrowRight",Ea=500,fe="next",Kt="prev",Xt="left",Be="right",ya=`slide${Dt}`,fn=`slid${Dt}`,wa=`keydown${Dt}`,xa=`mouseenter${Dt}`,Aa=`mouseleave${Dt}`,Ca=`dragstart${Dt}`,Ta=`load${Dt}${Xi}`,Sa=`click${Dt}${Xi}`,Gi="carousel",Ne="active",ka="slide",Oa="carousel-item-end",Na="carousel-item-start",Da="carousel-item-next",La="carousel-item-prev",Qi=".active",Ji=".carousel-item",$a=Qi+Ji,Ia=".carousel-item img",Ma=".carousel-indicators",Pa="[data-bs-slide], [data-bs-slide-to]",Ra='[data-bs-ride="carousel"]',Ba={[va]:Be,[_a]:Xt},Fa={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},Va={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class Ae extends dt{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=A.findOne(Ma,this._element),this._addEventListeners(),this._config.ride===Gi&&this.cycle()}static get Default(){return Fa}static get DefaultType(){return Va}static get NAME(){return ga}next(){this._slide(fe)}nextWhenVisible(){!document.hidden&&de(this._element)&&this.next()}prev(){this._slide(Kt)}pause(){this._isSliding&&Bi(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){if(this._config.ride){if(this._isSliding){u.one(this._element,fn,()=>this.cycle());return}this.cycle()}}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding){u.one(this._element,fn,()=>this.to(t));return}const n=this._getItemIndex(this._getActive());if(n===t)return;const i=t>n?fe:Kt;this._slide(i,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&u.on(this._element,wa,t=>this._keydown(t)),this._config.pause==="hover"&&(u.on(this._element,xa,()=>this.pause()),u.on(this._element,Aa,()=>this._maybeEnableCycle())),this._config.touch&&ze.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const n of A.find(Ia,this._element))u.on(n,Ca,i=>i.preventDefault());const e={leftCallback:()=>this._slide(this._directionToOrder(Xt)),rightCallback:()=>this._slide(this._directionToOrder(Be)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),Ea+this._config.interval))}};this._swipeHelper=new ze(this._element,e)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=Ba[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=A.findOne(Qi,this._indicatorsElement);e.classList.remove(Ne),e.removeAttribute("aria-current");const n=A.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);n&&(n.classList.add(Ne),n.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const n=this._getActive(),i=t===fe,r=e||ts(this._getItems(),n,i,this._config.wrap);if(r===n)return;const o=this._getItemIndex(r),a=f=>u.trigger(this._element,f,{relatedTarget:r,direction:this._orderToDirection(t),from:this._getItemIndex(n),to:o});if(a(ya).defaultPrevented||!n||!r)return;const d=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=r;const c=i?Na:Oa,g=i?Da:La;r.classList.add(g),we(r),n.classList.add(c),r.classList.add(c);const v=()=>{r.classList.remove(c,g),r.classList.add(Ne),n.classList.remove(Ne,g,c),this._isSliding=!1,a(fn)};this._queueCallback(v,n,this._isAnimated()),d&&this.cycle()}_isAnimated(){return this._element.classList.contains(ka)}_getActive(){return A.findOne($a,this._element)}_getItems(){return A.find(Ji,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return nt()?t===Xt?Kt:fe:t===Xt?fe:Kt}_orderToDirection(t){return nt()?t===Kt?Xt:Be:t===Kt?Be:Xt}static jQueryInterface(t){return this.each(function(){const e=Ae.getOrCreateInstance(this,t);if(typeof t=="number"){e.to(t);return}if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(document,Sa,Pa,function(s){const t=A.getElementFromSelector(this);if(!t||!t.classList.contains(Gi))return;s.preventDefault();const e=Ae.getOrCreateInstance(t),n=this.getAttribute("data-bs-slide-to");if(n){e.to(n),e._maybeEnableCycle();return}if(vt.getDataAttribute(this,"slide")==="next"){e.next(),e._maybeEnableCycle();return}e.prev(),e._maybeEnableCycle()});u.on(window,Ta,()=>{const s=A.find(Ra);for(const t of s)Ae.getOrCreateInstance(t)});it(Ae);const Wa="collapse",ja="bs.collapse",Ce=`.${ja}`,Ha=".data-api",za=`show${Ce}`,qa=`shown${Ce}`,Ka=`hide${Ce}`,Ya=`hidden${Ce}`,Ua=`click${Ce}${Ha}`,gn="show",Zt="collapse",De="collapsing",Xa="collapsed",Ga=`:scope .${Zt} .${Zt}`,Qa="collapse-horizontal",Ja="width",Za="height",tl=".collapse.show, .collapse.collapsing",Ln='[data-bs-toggle="collapse"]',el={parent:null,toggle:!0},nl={parent:"(null|element)",toggle:"boolean"};class _e extends dt{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const n=A.find(Ln);for(const i of n){const r=A.getSelectorFromElement(i),o=A.find(r).filter(a=>a===this._element);r!==null&&o.length&&this._triggerArray.push(i)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return el}static get DefaultType(){return nl}static get NAME(){return Wa}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(tl).filter(a=>a!==this._element).map(a=>_e.getOrCreateInstance(a,{toggle:!1}))),t.length&&t[0]._isTransitioning||u.trigger(this._element,za).defaultPrevented)return;for(const a of t)a.hide();const n=this._getDimension();this._element.classList.remove(Zt),this._element.classList.add(De),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=()=>{this._isTransitioning=!1,this._element.classList.remove(De),this._element.classList.add(Zt,gn),this._element.style[n]="",u.trigger(this._element,qa)},o=`scroll${n[0].toUpperCase()+n.slice(1)}`;this._queueCallback(i,this._element,!0),this._element.style[n]=`${this._element[o]}px`}hide(){if(this._isTransitioning||!this._isShown()||u.trigger(this._element,Ka).defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,we(this._element),this._element.classList.add(De),this._element.classList.remove(Zt,gn);for(const i of this._triggerArray){const r=A.getElementFromSelector(i);r&&!this._isShown(r)&&this._addAriaAndCollapsedClass([i],!1)}this._isTransitioning=!0;const n=()=>{this._isTransitioning=!1,this._element.classList.remove(De),this._element.classList.add(Zt),u.trigger(this._element,Ya)};this._element.style[e]="",this._queueCallback(n,this._element,!0)}_isShown(t=this._element){return t.classList.contains(gn)}_configAfterMerge(t){return t.toggle=!!t.toggle,t.parent=Tt(t.parent),t}_getDimension(){return this._element.classList.contains(Qa)?Ja:Za}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(Ln);for(const e of t){const n=A.getElementFromSelector(e);n&&this._addAriaAndCollapsedClass([e],this._isShown(n))}}_getFirstLevelChildren(t){const e=A.find(Ga,this._config.parent);return A.find(t,this._config.parent).filter(n=>!e.includes(n))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const n of t)n.classList.toggle(Xa,!e),n.setAttribute("aria-expanded",e)}static jQueryInterface(t){const e={};return typeof t=="string"&&/show|hide/.test(t)&&(e.toggle=!1),this.each(function(){const n=_e.getOrCreateInstance(this,e);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t]()}})}}u.on(document,Ua,Ln,function(s){(s.target.tagName==="A"||s.delegateTarget&&s.delegateTarget.tagName==="A")&&s.preventDefault();for(const t of A.getMultipleElementsFromSelector(this))_e.getOrCreateInstance(t,{toggle:!1}).toggle()});it(_e);const Ls="dropdown",sl="bs.dropdown",jt=`.${sl}`,ns=".data-api",il="Escape",$s="Tab",rl="ArrowUp",Is="ArrowDown",ol=2,al=`hide${jt}`,ll=`hidden${jt}`,cl=`show${jt}`,dl=`shown${jt}`,Zi=`click${jt}${ns}`,tr=`keydown${jt}${ns}`,hl=`keyup${jt}${ns}`,Gt="show",ul="dropup",pl="dropend",ml="dropstart",fl="dropup-center",gl="dropdown-center",Rt='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',bl=`${Rt}.${Gt}`,Fe=".dropdown-menu",vl=".navbar",_l=".navbar-nav",El=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",yl=nt()?"top-end":"top-start",wl=nt()?"top-start":"top-end",xl=nt()?"bottom-end":"bottom-start",Al=nt()?"bottom-start":"bottom-end",Cl=nt()?"left-start":"right-start",Tl=nt()?"right-start":"left-start",Sl="top",kl="bottom",Ol={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},Nl={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class mt extends dt{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=A.next(this._element,Fe)[0]||A.prev(this._element,Fe)[0]||A.findOne(Fe,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return Ol}static get DefaultType(){return Nl}static get NAME(){return Ls}toggle(){return this._isShown()?this.hide():this.show()}show(){if(St(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!u.trigger(this._element,cl,t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(_l))for(const n of[].concat(...document.body.children))u.on(n,"mouseover",He);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Gt),this._element.classList.add(Gt),u.trigger(this._element,dl,t)}}hide(){if(St(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){if(!u.trigger(this._element,al,t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const n of[].concat(...document.body.children))u.off(n,"mouseover",He);this._popper&&this._popper.destroy(),this._menu.classList.remove(Gt),this._element.classList.remove(Gt),this._element.setAttribute("aria-expanded","false"),vt.removeDataAttribute(this._menu,"popper"),u.trigger(this._element,ll,t)}}_getConfig(t){if(t=super._getConfig(t),typeof t.reference=="object"&&!bt(t.reference)&&typeof t.reference.getBoundingClientRect!="function")throw new TypeError(`${Ls.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(typeof Pi>"u")throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let t=this._element;this._config.reference==="parent"?t=this._parent:bt(this._config.reference)?t=Tt(this._config.reference):typeof this._config.reference=="object"&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=Zn(t,this._menu,e)}_isShown(){return this._menu.classList.contains(Gt)}_getPlacement(){const t=this._parent;if(t.classList.contains(pl))return Cl;if(t.classList.contains(ml))return Tl;if(t.classList.contains(fl))return Sl;if(t.classList.contains(gl))return kl;const e=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return t.classList.contains(ul)?e?wl:yl:e?Al:xl}_detectNavbar(){return this._element.closest(vl)!==null}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(vt.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,...X(this._config.popperConfig,[t])}}_selectMenuItem({key:t,target:e}){const n=A.find(El,this._menu).filter(i=>de(i));n.length&&ts(n,e,t===Is,!n.includes(e)).focus()}static jQueryInterface(t){return this.each(function(){const e=mt.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}static clearMenus(t){if(t.button===ol||t.type==="keyup"&&t.key!==$s)return;const e=A.find(bl);for(const n of e){const i=mt.getInstance(n);if(!i||i._config.autoClose===!1)continue;const r=t.composedPath(),o=r.includes(i._menu);if(r.includes(i._element)||i._config.autoClose==="inside"&&!o||i._config.autoClose==="outside"&&o||i._menu.contains(t.target)&&(t.type==="keyup"&&t.key===$s||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const a={relatedTarget:i._element};t.type==="click"&&(a.clickEvent=t),i._completeHide(a)}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),n=t.key===il,i=[rl,Is].includes(t.key);if(!i&&!n||e&&!n)return;t.preventDefault();const r=this.matches(Rt)?this:A.prev(this,Rt)[0]||A.next(this,Rt)[0]||A.findOne(Rt,t.delegateTarget.parentNode),o=mt.getOrCreateInstance(r);if(i){t.stopPropagation(),o.show(),o._selectMenuItem(t);return}o._isShown()&&(t.stopPropagation(),o.hide(),r.focus())}}u.on(document,tr,Rt,mt.dataApiKeydownHandler);u.on(document,tr,Fe,mt.dataApiKeydownHandler);u.on(document,Zi,mt.clearMenus);u.on(document,hl,mt.clearMenus);u.on(document,Zi,Rt,function(s){s.preventDefault(),mt.getOrCreateInstance(this).toggle()});it(mt);const er="backdrop",Dl="fade",Ms="show",Ps=`mousedown.bs.${er}`,Ll={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},$l={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class nr extends xe{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return Ll}static get DefaultType(){return $l}static get NAME(){return er}show(t){if(!this._config.isVisible){X(t);return}this._append();const e=this._getElement();this._config.isAnimated&&we(e),e.classList.add(Ms),this._emulateAnimation(()=>{X(t)})}hide(t){if(!this._config.isVisible){X(t);return}this._getElement().classList.remove(Ms),this._emulateAnimation(()=>{this.dispose(),X(t)})}dispose(){this._isAppended&&(u.off(this._element,Ps),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add(Dl),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=Tt(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),u.on(t,Ps,()=>{X(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(t){Wi(t,this._getElement(),this._config.isAnimated)}}const Il="focustrap",Ml="bs.focustrap",qe=`.${Ml}`,Pl=`focusin${qe}`,Rl=`keydown.tab${qe}`,Bl="Tab",Fl="forward",Rs="backward",Vl={autofocus:!0,trapElement:null},Wl={autofocus:"boolean",trapElement:"element"};class sr extends xe{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return Vl}static get DefaultType(){return Wl}static get NAME(){return Il}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),u.off(document,qe),u.on(document,Pl,t=>this._handleFocusin(t)),u.on(document,Rl,t=>this._handleKeydown(t)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,u.off(document,qe))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const n=A.focusableChildren(e);n.length===0?e.focus():this._lastTabNavDirection===Rs?n[n.length-1].focus():n[0].focus()}_handleKeydown(t){t.key===Bl&&(this._lastTabNavDirection=t.shiftKey?Rs:Fl)}}const Bs=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",Fs=".sticky-top",Le="padding-right",Vs="margin-right";class $n{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,Le,e=>e+t),this._setElementAttributes(Bs,Le,e=>e+t),this._setElementAttributes(Fs,Vs,e=>e-t)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,Le),this._resetElementAttributes(Bs,Le),this._resetElementAttributes(Fs,Vs)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,n){const i=this.getWidth(),r=o=>{if(o!==this._element&&window.innerWidth>o.clientWidth+i)return;this._saveInitialAttribute(o,e);const a=window.getComputedStyle(o).getPropertyValue(e);o.style.setProperty(e,`${n(Number.parseFloat(a))}px`)};this._applyManipulationCallback(t,r)}_saveInitialAttribute(t,e){const n=t.style.getPropertyValue(e);n&&vt.setDataAttribute(t,e,n)}_resetElementAttributes(t,e){const n=i=>{const r=vt.getDataAttribute(i,e);if(r===null){i.style.removeProperty(e);return}vt.removeDataAttribute(i,e),i.style.setProperty(e,r)};this._applyManipulationCallback(t,n)}_applyManipulationCallback(t,e){if(bt(t)){e(t);return}for(const n of A.find(t,this._element))e(n)}}const jl="modal",Hl="bs.modal",st=`.${Hl}`,zl=".data-api",ql="Escape",Kl=`hide${st}`,Yl=`hidePrevented${st}`,ir=`hidden${st}`,rr=`show${st}`,Ul=`shown${st}`,Xl=`resize${st}`,Gl=`click.dismiss${st}`,Ql=`mousedown.dismiss${st}`,Jl=`keydown.dismiss${st}`,Zl=`click${st}${zl}`,Ws="modal-open",tc="fade",js="show",bn="modal-static",ec=".modal.show",nc=".modal-dialog",sc=".modal-body",ic='[data-bs-toggle="modal"]',rc={backdrop:!0,focus:!0,keyboard:!0},oc={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class oe extends dt{constructor(t,e){super(t,e),this._dialog=A.findOne(nc,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new $n,this._addEventListeners()}static get Default(){return rc}static get DefaultType(){return oc}static get NAME(){return jl}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||u.trigger(this._element,rr,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(Ws),this._adjustDialog(),this._backdrop.show(()=>this._showElement(t)))}hide(){!this._isShown||this._isTransitioning||u.trigger(this._element,Kl).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(js),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){u.off(window,st),u.off(this._dialog,st),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new nr({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new sr({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=A.findOne(sc,this._dialog);e&&(e.scrollTop=0),we(this._element),this._element.classList.add(js);const n=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,u.trigger(this._element,Ul,{relatedTarget:t})};this._queueCallback(n,this._dialog,this._isAnimated())}_addEventListeners(){u.on(this._element,Jl,t=>{if(t.key===ql){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),u.on(window,Xl,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),u.on(this._element,Ql,t=>{u.one(this._element,Gl,e=>{if(!(this._element!==t.target||this._element!==e.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(Ws),this._resetAdjustments(),this._scrollBar.reset(),u.trigger(this._element,ir)})}_isAnimated(){return this._element.classList.contains(tc)}_triggerBackdropTransition(){if(u.trigger(this._element,Yl).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,n=this._element.style.overflowY;n==="hidden"||this._element.classList.contains(bn)||(e||(this._element.style.overflowY="hidden"),this._element.classList.add(bn),this._queueCallback(()=>{this._element.classList.remove(bn),this._queueCallback(()=>{this._element.style.overflowY=n},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),n=e>0;if(n&&!t){const i=nt()?"paddingLeft":"paddingRight";this._element.style[i]=`${e}px`}if(!n&&t){const i=nt()?"paddingRight":"paddingLeft";this._element.style[i]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each(function(){const n=oe.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t](e)}})}}u.on(document,Zl,ic,function(s){const t=A.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&s.preventDefault(),u.one(t,rr,i=>{i.defaultPrevented||u.one(t,ir,()=>{de(this)&&this.focus()})});const e=A.findOne(ec);e&&oe.getInstance(e).hide(),oe.getOrCreateInstance(t).toggle(this)});Je(oe);it(oe);const ac="offcanvas",lc="bs.offcanvas",yt=`.${lc}`,or=".data-api",cc=`load${yt}${or}`,dc="Escape",Hs="show",zs="showing",qs="hiding",hc="offcanvas-backdrop",ar=".offcanvas.show",uc=`show${yt}`,pc=`shown${yt}`,mc=`hide${yt}`,Ks=`hidePrevented${yt}`,lr=`hidden${yt}`,fc=`resize${yt}`,gc=`click${yt}${or}`,bc=`keydown.dismiss${yt}`,vc='[data-bs-toggle="offcanvas"]',_c={backdrop:!0,keyboard:!0,scroll:!1},Ec={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class kt extends dt{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return _c}static get DefaultType(){return Ec}static get NAME(){return ac}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown||u.trigger(this._element,uc,{relatedTarget:t}).defaultPrevented)return;this._isShown=!0,this._backdrop.show(),this._config.scroll||new $n().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(zs);const n=()=>{(!this._config.scroll||this._config.backdrop)&&this._focustrap.activate(),this._element.classList.add(Hs),this._element.classList.remove(zs),u.trigger(this._element,pc,{relatedTarget:t})};this._queueCallback(n,this._element,!0)}hide(){if(!this._isShown||u.trigger(this._element,mc).defaultPrevented)return;this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(qs),this._backdrop.hide();const e=()=>{this._element.classList.remove(Hs,qs),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new $n().reset(),u.trigger(this._element,lr)};this._queueCallback(e,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=()=>{if(this._config.backdrop==="static"){u.trigger(this._element,Ks);return}this.hide()},e=!!this._config.backdrop;return new nr({className:hc,isVisible:e,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:e?t:null})}_initializeFocusTrap(){return new sr({trapElement:this._element})}_addEventListeners(){u.on(this._element,bc,t=>{if(t.key===dc){if(this._config.keyboard){this.hide();return}u.trigger(this._element,Ks)}})}static jQueryInterface(t){return this.each(function(){const e=kt.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}u.on(document,gc,vc,function(s){const t=A.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&s.preventDefault(),St(this))return;u.one(t,lr,()=>{de(this)&&this.focus()});const e=A.findOne(ar);e&&e!==t&&kt.getInstance(e).hide(),kt.getOrCreateInstance(t).toggle(this)});u.on(window,cc,()=>{for(const s of A.find(ar))kt.getOrCreateInstance(s).show()});u.on(window,fc,()=>{for(const s of A.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(s).position!=="fixed"&&kt.getOrCreateInstance(s).hide()});Je(kt);it(kt);const yc=/^aria-[\w-]*$/i,cr={"*":["class","dir","id","lang","role",yc],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},wc=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),xc=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,Ac=(s,t)=>{const e=s.nodeName.toLowerCase();return t.includes(e)?wc.has(e)?!!xc.test(s.nodeValue):!0:t.filter(n=>n instanceof RegExp).some(n=>n.test(e))};function Cc(s,t,e){if(!s.length)return s;if(e&&typeof e=="function")return e(s);const i=new window.DOMParser().parseFromString(s,"text/html"),r=[].concat(...i.body.querySelectorAll("*"));for(const o of r){const a=o.nodeName.toLowerCase();if(!Object.keys(t).includes(a)){o.remove();continue}const l=[].concat(...o.attributes),d=[].concat(t["*"]||[],t[a]||[]);for(const c of l)Ac(c,d)||o.removeAttribute(c.nodeName)}return i.body.innerHTML}const Tc="TemplateFactory",Sc={allowList:cr,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},kc={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},Oc={entry:"(string|element|function|null)",selector:"(string|element)"};class Nc extends xe{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return Sc}static get DefaultType(){return kc}static get NAME(){return Tc}getContent(){return Object.values(this._config.content).map(t=>this._resolvePossibleFunction(t)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[i,r]of Object.entries(this._config.content))this._setContent(t,r,i);const e=t.children[0],n=this._resolvePossibleFunction(this._config.extraClass);return n&&e.classList.add(...n.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,n]of Object.entries(t))super._typeCheckConfig({selector:e,entry:n},Oc)}_setContent(t,e,n){const i=A.findOne(n,t);if(i){if(e=this._resolvePossibleFunction(e),!e){i.remove();return}if(bt(e)){this._putElementInTemplate(Tt(e),i);return}if(this._config.html){i.innerHTML=this._maybeSanitize(e);return}i.textContent=e}}_maybeSanitize(t){return this._config.sanitize?Cc(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return X(t,[this])}_putElementInTemplate(t,e){if(this._config.html){e.innerHTML="",e.append(t);return}e.textContent=t.textContent}}const Dc="tooltip",Lc=new Set(["sanitize","allowList","sanitizeFn"]),vn="fade",$c="modal",$e="show",Ic=".tooltip-inner",Ys=`.${$c}`,Us="hide.bs.modal",ge="hover",_n="focus",Mc="click",Pc="manual",Rc="hide",Bc="hidden",Fc="show",Vc="shown",Wc="inserted",jc="click",Hc="focusin",zc="focusout",qc="mouseenter",Kc="mouseleave",Yc={AUTO:"auto",TOP:"top",RIGHT:nt()?"left":"right",BOTTOM:"bottom",LEFT:nt()?"right":"left"},Uc={allowList:cr,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},Xc={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class ue extends dt{constructor(t,e){if(typeof Pi>"u")throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return Uc}static get DefaultType(){return Xc}static get NAME(){return Dc}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){if(this._isEnabled){if(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()){this._leave();return}this._enter()}}dispose(){clearTimeout(this._timeout),u.off(this._element.closest(Ys),Us,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!(this._isWithContent()&&this._isEnabled))return;const t=u.trigger(this._element,this.constructor.eventName(Fc)),n=(Fi(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!n)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:r}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(r.append(i),u.trigger(this._element,this.constructor.eventName(Wc))),this._popper=this._createPopper(i),i.classList.add($e),"ontouchstart"in document.documentElement)for(const a of[].concat(...document.body.children))u.on(a,"mouseover",He);const o=()=>{u.trigger(this._element,this.constructor.eventName(Vc)),this._isHovered===!1&&this._leave(),this._isHovered=!1};this._queueCallback(o,this.tip,this._isAnimated())}hide(){if(!this._isShown()||u.trigger(this._element,this.constructor.eventName(Rc)).defaultPrevented)return;if(this._getTipElement().classList.remove($e),"ontouchstart"in document.documentElement)for(const i of[].concat(...document.body.children))u.off(i,"mouseover",He);this._activeTrigger[Mc]=!1,this._activeTrigger[_n]=!1,this._activeTrigger[ge]=!1,this._isHovered=null;const n=()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),u.trigger(this._element,this.constructor.eventName(Bc)))};this._queueCallback(n,this.tip,this._isAnimated())}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(vn,$e),e.classList.add(`bs-${this.constructor.NAME}-auto`);const n=Mo(this.constructor.NAME).toString();return e.setAttribute("id",n),this._isAnimated()&&e.classList.add(vn),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new Nc({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[Ic]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(vn)}_isShown(){return this.tip&&this.tip.classList.contains($e)}_createPopper(t){const e=X(this._config.placement,[this,t,this._element]),n=Yc[e.toUpperCase()];return Zn(this._element,t,this._getPopperConfig(n))}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_resolvePossibleFunction(t){return X(t,[this._element])}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:n=>{this._getTipElement().setAttribute("data-popper-placement",n.state.placement)}}]};return{...e,...X(this._config.popperConfig,[e])}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if(e==="click")u.on(this._element,this.constructor.eventName(jc),this._config.selector,n=>{this._initializeOnDelegatedTarget(n).toggle()});else if(e!==Pc){const n=e===ge?this.constructor.eventName(qc):this.constructor.eventName(Hc),i=e===ge?this.constructor.eventName(Kc):this.constructor.eventName(zc);u.on(this._element,n,this._config.selector,r=>{const o=this._initializeOnDelegatedTarget(r);o._activeTrigger[r.type==="focusin"?_n:ge]=!0,o._enter()}),u.on(this._element,i,this._config.selector,r=>{const o=this._initializeOnDelegatedTarget(r);o._activeTrigger[r.type==="focusout"?_n:ge]=o._element.contains(r.relatedTarget),o._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},u.on(this._element.closest(Ys),Us,this._hideModalHandler)}_fixTitle(){const t=this._element.getAttribute("title");t&&(!this._element.getAttribute("aria-label")&&!this._element.textContent.trim()&&this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"))}_enter(){if(this._isShown()||this._isHovered){this._isHovered=!0;return}this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show)}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=vt.getDataAttributes(this._element);for(const n of Object.keys(e))Lc.has(n)&&delete e[n];return t={...e,...typeof t=="object"&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=t.container===!1?document.body:Tt(t.container),typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),typeof t.title=="number"&&(t.title=t.title.toString()),typeof t.content=="number"&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const[e,n]of Object.entries(this._config))this.constructor.Default[e]!==n&&(t[e]=n);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(t){return this.each(function(){const e=ue.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}it(ue);const Gc="popover",Qc=".popover-header",Jc=".popover-body",Zc={...ue.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},td={...ue.DefaultType,content:"(null|string|element|function)"};class ss extends ue{static get Default(){return Zc}static get DefaultType(){return td}static get NAME(){return Gc}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[Qc]:this._getTitle(),[Jc]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each(function(){const e=ss.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}it(ss);const ed="scrollspy",nd="bs.scrollspy",is=`.${nd}`,sd=".data-api",id=`activate${is}`,Xs=`click${is}`,rd=`load${is}${sd}`,od="dropdown-item",Yt="active",ad='[data-bs-spy="scroll"]',En="[href]",ld=".nav, .list-group",Gs=".nav-link",cd=".nav-item",dd=".list-group-item",hd=`${Gs}, ${cd} > ${Gs}, ${dd}`,ud=".dropdown",pd=".dropdown-toggle",md={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},fd={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class en extends dt{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return md}static get DefaultType(){return fd}static get NAME(){return ed}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(t){return t.target=Tt(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,typeof t.threshold=="string"&&(t.threshold=t.threshold.split(",").map(e=>Number.parseFloat(e))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(u.off(this._config.target,Xs),u.on(this._config.target,Xs,En,t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const n=this._rootElement||window,i=e.offsetTop-this._element.offsetTop;if(n.scrollTo){n.scrollTo({top:i,behavior:"smooth"});return}n.scrollTop=i}}))}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(e=>this._observerCallback(e),t)}_observerCallback(t){const e=o=>this._targetLinks.get(`#${o.target.id}`),n=o=>{this._previousScrollData.visibleEntryTop=o.target.offsetTop,this._process(e(o))},i=(this._rootElement||document.documentElement).scrollTop,r=i>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=i;for(const o of t){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(o));continue}const a=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(r&&a){if(n(o),!i)return;continue}!r&&!a&&n(o)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=A.find(En,this._config.target);for(const e of t){if(!e.hash||St(e))continue;const n=A.findOne(decodeURI(e.hash),this._element);de(n)&&(this._targetLinks.set(decodeURI(e.hash),e),this._observableSections.set(e.hash,n))}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(Yt),this._activateParents(t),u.trigger(this._element,id,{relatedTarget:t}))}_activateParents(t){if(t.classList.contains(od)){A.findOne(pd,t.closest(ud)).classList.add(Yt);return}for(const e of A.parents(t,ld))for(const n of A.prev(e,hd))n.classList.add(Yt)}_clearActiveClass(t){t.classList.remove(Yt);const e=A.find(`${En}.${Yt}`,t);for(const n of e)n.classList.remove(Yt)}static jQueryInterface(t){return this.each(function(){const e=en.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(window,rd,()=>{for(const s of A.find(ad))en.getOrCreateInstance(s)});it(en);const gd="tab",bd="bs.tab",Ht=`.${bd}`,vd=`hide${Ht}`,_d=`hidden${Ht}`,Ed=`show${Ht}`,yd=`shown${Ht}`,wd=`click${Ht}`,xd=`keydown${Ht}`,Ad=`load${Ht}`,Cd="ArrowLeft",Qs="ArrowRight",Td="ArrowUp",Js="ArrowDown",yn="Home",Zs="End",Bt="active",ti="fade",wn="show",Sd="dropdown",dr=".dropdown-toggle",kd=".dropdown-menu",xn=`:not(${dr})`,Od='.list-group, .nav, [role="tablist"]',Nd=".nav-item, .list-group-item",Dd=`.nav-link${xn}, .list-group-item${xn}, [role="tab"]${xn}`,hr='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',An=`${Dd}, ${hr}`,Ld=`.${Bt}[data-bs-toggle="tab"], .${Bt}[data-bs-toggle="pill"], .${Bt}[data-bs-toggle="list"]`;class ae extends dt{constructor(t){super(t),this._parent=this._element.closest(Od),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),u.on(this._element,xd,e=>this._keydown(e)))}static get NAME(){return gd}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),n=e?u.trigger(e,vd,{relatedTarget:t}):null;u.trigger(t,Ed,{relatedTarget:e}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(e,t),this._activate(t,e))}_activate(t,e){if(!t)return;t.classList.add(Bt),this._activate(A.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.add(wn);return}t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),u.trigger(t,yd,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(ti))}_deactivate(t,e){if(!t)return;t.classList.remove(Bt),t.blur(),this._deactivate(A.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.remove(wn);return}t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),u.trigger(t,_d,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(ti))}_keydown(t){if(![Cd,Qs,Td,Js,yn,Zs].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=this._getChildren().filter(i=>!St(i));let n;if([yn,Zs].includes(t.key))n=e[t.key===yn?0:e.length-1];else{const i=[Qs,Js].includes(t.key);n=ts(e,t.target,i,!0)}n&&(n.focus({preventScroll:!0}),ae.getOrCreateInstance(n).show())}_getChildren(){return A.find(An,this._parent)}_getActiveElem(){return this._getChildren().find(t=>this._elemIsActive(t))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const n of e)this._setInitialAttributesOnChild(n)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),n=this._getOuterElement(t);t.setAttribute("aria-selected",e),n!==t&&this._setAttributeIfNotExists(n,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){const e=A.getElementFromSelector(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,e){const n=this._getOuterElement(t);if(!n.classList.contains(Sd))return;const i=(r,o)=>{const a=A.findOne(r,n);a&&a.classList.toggle(o,e)};i(dr,Bt),i(kd,wn),n.setAttribute("aria-expanded",e)}_setAttributeIfNotExists(t,e,n){t.hasAttribute(e)||t.setAttribute(e,n)}_elemIsActive(t){return t.classList.contains(Bt)}_getInnerElement(t){return t.matches(An)?t:A.findOne(An,t)}_getOuterElement(t){return t.closest(Nd)||t}static jQueryInterface(t){return this.each(function(){const e=ae.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(document,wd,hr,function(s){["A","AREA"].includes(this.tagName)&&s.preventDefault(),!St(this)&&ae.getOrCreateInstance(this).show()});u.on(window,Ad,()=>{for(const s of A.find(Ld))ae.getOrCreateInstance(s)});it(ae);const $d="toast",Id="bs.toast",Lt=`.${Id}`,Md=`mouseover${Lt}`,Pd=`mouseout${Lt}`,Rd=`focusin${Lt}`,Bd=`focusout${Lt}`,Fd=`hide${Lt}`,Vd=`hidden${Lt}`,Wd=`show${Lt}`,jd=`shown${Lt}`,Hd="fade",ei="hide",Ie="show",Me="showing",zd={animation:"boolean",autohide:"boolean",delay:"number"},qd={animation:!0,autohide:!0,delay:5e3};class nn extends dt{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return qd}static get DefaultType(){return zd}static get NAME(){return $d}show(){if(u.trigger(this._element,Wd).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(Hd);const e=()=>{this._element.classList.remove(Me),u.trigger(this._element,jd),this._maybeScheduleHide()};this._element.classList.remove(ei),we(this._element),this._element.classList.add(Ie,Me),this._queueCallback(e,this._element,this._config.animation)}hide(){if(!this.isShown()||u.trigger(this._element,Fd).defaultPrevented)return;const e=()=>{this._element.classList.add(ei),this._element.classList.remove(Me,Ie),u.trigger(this._element,Vd)};this._element.classList.add(Me),this._queueCallback(e,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(Ie),super.dispose()}isShown(){return this._element.classList.contains(Ie)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=e;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=e;break}}if(e){this._clearTimeout();return}const n=t.relatedTarget;this._element===n||this._element.contains(n)||this._maybeScheduleHide()}_setListeners(){u.on(this._element,Md,t=>this._onInteraction(t,!0)),u.on(this._element,Pd,t=>this._onInteraction(t,!1)),u.on(this._element,Rd,t=>this._onInteraction(t,!0)),u.on(this._element,Bd,t=>this._onInteraction(t,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each(function(){const e=nn.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}Je(nn);it(nn);var ni={},Kd=function(s,t,e,n,i){var r=new Worker(ni[t]||(ni[t]=URL.createObjectURL(new Blob([s+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return r.onmessage=function(o){var a=o.data,l=a.$e$;if(l){var d=new Error(l[0]);d.code=l[1],d.stack=l[2],i(d,null)}else i(null,a)},r.postMessage(e,n),r},W=Uint8Array,G=Uint16Array,sn=Int32Array,rn=new W([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),on=new W([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),In=new W([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ur=function(s,t){for(var e=new G(31),n=0;n<31;++n)e[n]=t+=1<<s[n-1];for(var i=new sn(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)i[r]=r-e[n]<<5|n;return{b:e,r:i}},pr=ur(rn,2),Yd=pr.b,Ke=pr.r;Yd[28]=258,Ke[258]=28;var Ud=ur(on,0),Mn=Ud.r,Ye=new G(32768);for(var B=0;B<32768;++B){var At=(B&43690)>>1|(B&21845)<<1;At=(At&52428)>>2|(At&13107)<<2,At=(At&61680)>>4|(At&3855)<<4,Ye[B]=((At&65280)>>8|(At&255)<<8)>>1}var te=function(s,t,e){for(var n=s.length,i=0,r=new G(t);i<n;++i)s[i]&&++r[s[i]-1];var o=new G(t);for(i=1;i<t;++i)o[i]=o[i-1]+r[i-1]<<1;var a;if(e){a=new G(1<<t);var l=15-t;for(i=0;i<n;++i)if(s[i])for(var d=i<<4|s[i],c=t-s[i],g=o[s[i]-1]++<<c,v=g|(1<<c)-1;g<=v;++g)a[Ye[g]>>l]=d}else for(a=new G(n),i=0;i<n;++i)s[i]&&(a[i]=Ye[o[s[i]-1]++]>>15-s[i]);return a},Ot=new W(288);for(var B=0;B<144;++B)Ot[B]=8;for(var B=144;B<256;++B)Ot[B]=9;for(var B=256;B<280;++B)Ot[B]=7;for(var B=280;B<288;++B)Ot[B]=8;var Ee=new W(32);for(var B=0;B<32;++B)Ee[B]=5;var mr=te(Ot,9,0),fr=te(Ee,5,0),rs=function(s){return(s+7)/8|0},os=function(s,t,e){return(t==null||t<0)&&(t=0),(e==null||e>s.length)&&(e=s.length),new W(s.subarray(t,e))},Xd=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],le=function(s,t,e){var n=new Error(t||Xd[s]);if(n.code=s,Error.captureStackTrace&&Error.captureStackTrace(n,le),!e)throw n;return n},ut=function(s,t,e){e<<=t&7;var n=t/8|0;s[n]|=e,s[n+1]|=e>>8},Qt=function(s,t,e){e<<=t&7;var n=t/8|0;s[n]|=e,s[n+1]|=e>>8,s[n+2]|=e>>16},Ve=function(s,t){for(var e=[],n=0;n<s.length;++n)s[n]&&e.push({s:n,f:s[n]});var i=e.length,r=e.slice();if(!i)return{t:ls,l:0};if(i==1){var o=new W(e[0].s+1);return o[e[0].s]=1,{t:o,l:1}}e.sort(function(T,k){return T.f-k.f}),e.push({s:-1,f:25001});var a=e[0],l=e[1],d=0,c=1,g=2;for(e[0]={s:-1,f:a.f+l.f,l:a,r:l};c!=i-1;)a=e[e[d].f<e[g].f?d++:g++],l=e[d!=c&&e[d].f<e[g].f?d++:g++],e[c++]={s:-1,f:a.f+l.f,l:a,r:l};for(var v=r[0].s,n=1;n<i;++n)r[n].s>v&&(v=r[n].s);var f=new G(v+1),_=Ue(e[c-1],f,0);if(_>t){var n=0,p=0,b=_-t,E=1<<b;for(r.sort(function(k,O){return f[O.s]-f[k.s]||k.f-O.f});n<i;++n){var x=r[n].s;if(f[x]>t)p+=E-(1<<_-f[x]),f[x]=t;else break}for(p>>=b;p>0;){var C=r[n].s;f[C]<t?p-=1<<t-f[C]++-1:++n}for(;n>=0&&p;--n){var m=r[n].s;f[m]==t&&(--f[m],++p)}_=t}return{t:new W(f),l:_}},Ue=function(s,t,e){return s.s==-1?Math.max(Ue(s.l,t,e+1),Ue(s.r,t,e+1)):t[s.s]=e},Pn=function(s){for(var t=s.length;t&&!s[--t];);for(var e=new G(++t),n=0,i=s[0],r=1,o=function(l){e[n++]=l},a=1;a<=t;++a)if(s[a]==i&&a!=t)++r;else{if(!i&&r>2){for(;r>138;r-=138)o(32754);r>2&&(o(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(o(i),--r;r>6;r-=6)o(8304);r>2&&(o(r-3<<5|8208),r=0)}for(;r--;)o(i);r=1,i=s[a]}return{c:e.subarray(0,n),n:t}},Jt=function(s,t){for(var e=0,n=0;n<t.length;++n)e+=s[n]*t[n];return e},as=function(s,t,e){var n=e.length,i=rs(t+2);s[i]=n&255,s[i+1]=n>>8,s[i+2]=s[i]^255,s[i+3]=s[i+1]^255;for(var r=0;r<n;++r)s[i+r+4]=e[r];return(i+4+n)*8},Rn=function(s,t,e,n,i,r,o,a,l,d,c){ut(t,c++,e),++i[256];for(var g=Ve(i,15),v=g.t,f=g.l,_=Ve(r,15),p=_.t,b=_.l,E=Pn(v),x=E.c,C=E.n,m=Pn(p),T=m.c,k=m.n,O=new G(19),S=0;S<x.length;++S)++O[x[S]&31];for(var S=0;S<T.length;++S)++O[T[S]&31];for(var y=Ve(O,7),N=y.t,I=y.l,L=19;L>4&&!N[In[L-1]];--L);var M=d+5<<3,P=Jt(i,Ot)+Jt(r,Ee)+o,F=Jt(i,v)+Jt(r,p)+o+14+3*L+Jt(O,N)+2*O[16]+3*O[17]+7*O[18];if(l>=0&&M<=P&&M<=F)return as(t,c,s.subarray(l,l+d));var $,D,z,q;if(ut(t,c,1+(F<P)),c+=2,F<P){$=te(v,f,0),D=v,z=te(p,b,0),q=p;var wt=te(N,I,0);ut(t,c,C-257),ut(t,c+5,k-1),ut(t,c+10,L-4),c+=14;for(var S=0;S<L;++S)ut(t,c+3*S,N[In[S]]);c+=3*L;for(var U=[x,T],at=0;at<2;++at)for(var lt=U[at],S=0;S<lt.length;++S){var j=lt[S]&31;ut(t,c,wt[j]),c+=N[j],j>15&&(ut(t,c,lt[S]>>5&127),c+=lt[S]>>12)}}else $=mr,D=Ot,z=fr,q=Ee;for(var S=0;S<a;++S){var R=n[S];if(R>255){var j=R>>18&31;Qt(t,c,$[j+257]),c+=D[j+257],j>7&&(ut(t,c,R>>23&31),c+=rn[j]);var tt=R&31;Qt(t,c,z[tt]),c+=q[tt],tt>3&&(Qt(t,c,R>>5&8191),c+=on[tt])}else Qt(t,c,$[R]),c+=D[R]}return Qt(t,c,$[256]),c+D[256]},gr=new sn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ls=new W(0),br=function(s,t,e,n,i,r){var o=r.z||s.length,a=new W(n+o+5*(1+Math.ceil(o/7e3))+i),l=a.subarray(n,a.length-i),d=r.l,c=(r.r||0)&7;if(t){c&&(l[0]=r.r>>3);for(var g=gr[t-1],v=g>>13,f=g&8191,_=(1<<e)-1,p=r.p||new G(32768),b=r.h||new G(_+1),E=Math.ceil(e/3),x=2*E,C=function(me){return(s[me]^s[me+1]<<E^s[me+2]<<x)&_},m=new sn(25e3),T=new G(288),k=new G(32),O=0,S=0,y=r.i||0,N=0,I=r.w||0,L=0;y+2<o;++y){var M=C(y),P=y&32767,F=b[M];if(p[P]=F,b[M]=P,I<=y){var $=o-y;if((O>7e3||N>24576)&&($>423||!d)){c=Rn(s,l,0,m,T,k,S,N,L,y-L,c),N=O=S=0,L=y;for(var D=0;D<286;++D)T[D]=0;for(var D=0;D<30;++D)k[D]=0}var z=2,q=0,wt=f,U=P-F&32767;if($>2&&M==C(y-U))for(var at=Math.min(v,$)-1,lt=Math.min(32767,y),j=Math.min(258,$);U<=lt&&--wt&&P!=F;){if(s[y+z]==s[y+z-U]){for(var R=0;R<j&&s[y+R]==s[y+R-U];++R);if(R>z){if(z=R,q=U,R>at)break;for(var tt=Math.min(U,R-2),$t=0,D=0;D<tt;++D){var ct=y-U+D&32767,pe=p[ct],Te=ct-pe&32767;Te>$t&&($t=Te,F=ct)}}}P=F,F=p[P],U+=P-F&32767}if(q){m[N++]=268435456|Ke[z]<<18|Mn[q];var zt=Ke[z]&31,Se=Mn[q]&31;S+=rn[zt]+on[Se],++T[257+zt],++k[Se],I=y+z,++O}else m[N++]=s[y],++T[s[y]]}}for(y=Math.max(y,I);y<o;++y)m[N++]=s[y],++T[s[y]];c=Rn(s,l,d,m,T,k,S,N,L,y-L,c),d||(r.r=c&7|l[c/8|0]<<3,c-=7,r.h=b,r.p=p,r.i=y,r.w=I)}else{for(var y=r.w||0;y<o+d;y+=65535){var qt=y+65535;qt>=o&&(l[c/8|0]=d,qt=o),c=as(l,c+1,s.subarray(y,qt))}r.i=o}return os(a,0,n+rs(c)+i)},Gd=function(){for(var s=new Int32Array(256),t=0;t<256;++t){for(var e=t,n=9;--n;)e=(e&1&&-306674912)^e>>>1;s[t]=e}return s}(),Qd=function(){var s=-1;return{p:function(t){for(var e=s,n=0;n<t.length;++n)e=Gd[e&255^t[n]]^e>>>8;s=e},d:function(){return~s}}},vr=function(s,t,e,n,i){if(!i&&(i={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),o=new W(r.length+s.length);o.set(r),o.set(s,r.length),s=o,i.w=r.length}return br(s,t.level==null?6:t.level,t.mem==null?Math.ceil(Math.max(8,Math.min(13,Math.log(s.length)))*1.5):12+t.mem,e,n,i)},cs=function(s,t){var e={};for(var n in s)e[n]=s[n];for(var n in t)e[n]=t[n];return e},si=function(s,t,e){for(var n=s(),i=s.toString(),r=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<n.length;++o){var a=n[o],l=r[o];if(typeof a=="function"){t+=";"+l+"=";var d=a.toString();if(a.prototype)if(d.indexOf("[native code]")!=-1){var c=d.indexOf(" ",8)+1;t+=d.slice(c,d.indexOf("(",c))}else{t+=d;for(var g in a.prototype)t+=";"+l+".prototype."+g+"="+a.prototype[g].toString()}else t+=d}else e[l]=a}return t},Pe=[],Jd=function(s){var t=[];for(var e in s)s[e].buffer&&t.push((s[e]=new s[e].constructor(s[e])).buffer);return t},Zd=function(s,t,e,n){if(!Pe[e]){for(var i="",r={},o=s.length-1,a=0;a<o;++a)i=si(s[a],i,r);Pe[e]={c:si(s[o],i,r),e:r}}var l=cs({},Pe[e].e);return Kd(Pe[e].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",e,l,Jd(l),n)},th=function(){return[W,G,sn,rn,on,In,Ke,Mn,mr,Ot,fr,Ee,Ye,gr,ls,te,ut,Qt,Ve,Ue,Pn,Jt,as,Rn,rs,os,br,vr,ds,_r]},_r=function(s){return postMessage(s,[s.buffer])},eh=function(s,t,e,n,i,r){var o=Zd(e,n,i,function(a,l){o.terminate(),r(a,l)});return o.postMessage([s,t],t.consume?[s.buffer]:[]),function(){o.terminate()}},H=function(s,t,e){for(;e;++t)s[t]=e,e>>>=8};function nh(s,t,e){return e||(e=t,t={}),typeof e!="function"&&le(7),eh(s,t,[th],function(n){return _r(ds(n.data[0],n.data[1]))},0,e)}function ds(s,t){return vr(s,t||{},0,0)}var Er=function(s,t,e,n){for(var i in s){var r=s[i],o=t+i,a=n;Array.isArray(r)&&(a=cs(n,r[1]),r=r[0]),r instanceof W?e[o]=[r,a]:(e[o+="/"]=[new W(0),a],Er(r,o,e,n))}},ii=typeof TextEncoder<"u"&&new TextEncoder,sh=typeof TextDecoder<"u"&&new TextDecoder,ih=0;try{sh.decode(ls,{stream:!0}),ih=1}catch{}function Bn(s,t){if(t){for(var e=new W(s.length),n=0;n<s.length;++n)e[n]=s.charCodeAt(n);return e}if(ii)return ii.encode(s);for(var i=s.length,r=new W(s.length+(s.length>>1)),o=0,a=function(c){r[o++]=c},n=0;n<i;++n){if(o+5>r.length){var l=new W(o+8+(i-n<<1));l.set(r),r=l}var d=s.charCodeAt(n);d<128||t?a(d):d<2048?(a(192|d>>6),a(128|d&63)):d>55295&&d<57344?(d=65536+(d&1047552)|s.charCodeAt(++n)&1023,a(240|d>>18),a(128|d>>12&63),a(128|d>>6&63),a(128|d&63)):(a(224|d>>12),a(128|d>>6&63),a(128|d&63))}return os(r,0,o)}var Fn=function(s){var t=0;if(s)for(var e in s){var n=s[e].length;n>65535&&le(9),t+=n+4}return t},ri=function(s,t,e,n,i,r,o,a){var l=n.length,d=e.extra,c=a&&a.length,g=Fn(d);H(s,t,o!=null?33639248:67324752),t+=4,o!=null&&(s[t++]=20,s[t++]=e.os),s[t]=20,t+=2,s[t++]=e.flag<<1|(r<0&&8),s[t++]=i&&8,s[t++]=e.compression&255,s[t++]=e.compression>>8;var v=new Date(e.mtime==null?Date.now():e.mtime),f=v.getFullYear()-1980;if((f<0||f>119)&&le(10),H(s,t,f<<25|v.getMonth()+1<<21|v.getDate()<<16|v.getHours()<<11|v.getMinutes()<<5|v.getSeconds()>>1),t+=4,r!=-1&&(H(s,t,e.crc),H(s,t+4,r<0?-r-2:r),H(s,t+8,e.size)),H(s,t+12,l),H(s,t+14,g),t+=16,o!=null&&(H(s,t,c),H(s,t+6,e.attrs),H(s,t+10,o),t+=14),s.set(n,t),t+=l,g)for(var _ in d){var p=d[_],b=p.length;H(s,t,+_),H(s,t+2,b),s.set(p,t+4),t+=4+b}return c&&(s.set(a,t),t+=c),t},rh=function(s,t,e,n,i){H(s,t,101010256),H(s,t+8,e),H(s,t+10,e),H(s,t+12,n),H(s,t+16,i)};function oi(s,t,e){e||(e=t,t={}),typeof e!="function"&&le(7);var n={};Er(s,"",n,t);var i=Object.keys(n),r=i.length,o=0,a=0,l=r,d=new Array(r),c=[],g=function(){for(var b=0;b<c.length;++b)c[b]()},v=function(b,E){ai(function(){e(b,E)})};ai(function(){v=e});var f=function(){var b=new W(a+22),E=o,x=a-o;a=0;for(var C=0;C<l;++C){var m=d[C];try{var T=m.c.length;ri(b,a,m,m.f,m.u,T);var k=30+m.f.length+Fn(m.extra),O=a+k;b.set(m.c,O),ri(b,o,m,m.f,m.u,T,a,m.m),o+=16+k+(m.m?m.m.length:0),a=O+T}catch(S){return v(S,null)}}rh(b,o,d.length,x,E),v(null,b)};r||f();for(var _=function(b){var E=i[b],x=n[E],C=x[0],m=x[1],T=Qd(),k=C.length;T.p(C);var O=Bn(E),S=O.length,y=m.comment,N=y&&Bn(y),I=N&&N.length,L=Fn(m.extra),M=m.level==0?0:8,P=function(F,$){if(F)g(),v(F,null);else{var D=$.length;d[b]=cs(m,{size:k,crc:T.d(),c:$,f:O,m:N,u:S!=E.length||N&&y.length!=I,compression:M}),o+=30+S+L+D,a+=76+2*(S+L)+(I||0)+D,--r||f()}};if(S>65535&&P(le(11,0,1),null),!M)P(null,C);else if(k<16e4)try{P(null,ds(C,m))}catch(F){P(F,null)}else c.push(nh(C,m,P))},p=0;p<l;++p)_(p);return g}var ai=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(s){s()},oh=Object.defineProperty,ah=(s,t,e)=>t in s?oh(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,h=(s,t,e)=>(ah(s,typeof t!="symbol"?t+"":t,e),e);const lh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},yr=s=>(typeof s!="string"&&(s=`${s}`),s.replace(/[&<>"']/g,t=>lh[t]));function gt(s){const t=typeof s;return s!=null&&(t==="object"||t==="function")}function ch(s){if(typeof s!="object"||s===null||Object.prototype.toString.call(s)!=="[object Object]")return!1;const t=Object.getPrototypeOf(s);if(t===null)return!0;const e=Object.prototype.hasOwnProperty.call(t,"constructor")&&t.constructor;return typeof e=="function"&&e instanceof e&&Function.prototype.call(e)===Function.prototype.call(s)}function Pt(s){return s!=null&&typeof s.valueOf()=="string"}function dh(s,t){return t.reduce((e,n)=>(s!=null&&s.hasOwnProperty(n)&&(e[n]=s[n]),e),{})}const Cn={};function Et(s="$lodash$"){Cn[s]||(Cn[s]=0);const t=++Cn[s];return s==="$lodash$"?`${t}`:`${s}${t}`}class an{constructor(t,e){h(this,"documentElement"),this.documentElement=this.createElement(e),this.documentElement.setAttribute("xmlns",t)}createElement(t){return new ln({nodeName:t})}createTextNode(t){return new wr(t)}toString(){return this.documentElement.toString()}}h(an,"Node",{Create:s=>{switch(s.type){case"XML":return new ln(s);case"TEXT":return new wr(s.nodeValue);default:return null}}});class wr{constructor(t){h(this,"nodeValue"),this.nodeValue=t}toJSON(){return{nodeValue:this.nodeValue,type:"TEXT"}}toString(){return yr(this.nodeValue)}}class ln{constructor(t){if(h(this,"nodeName",""),h(this,"children"),h(this,"nodeValue"),h(this,"attributes"),h(this,"firstChild"),this.nodeName=t.nodeName,this.children=[],this.nodeValue=t.nodeValue||"",this.attributes={},t.children)for(let e=0,n=t.children.length;e<n;e++)this.appendChild(an.Node.Create(t.children[e]));if(t.attributes)for(const e in t.attributes)t.attributes.hasOwnProperty(e)&&this.setAttribute(e,t.attributes[e])}toString(){let t=`<${this.nodeName}`;for(const n in this.attributes)this.attributes.hasOwnProperty(n)&&(t=`${t} ${n}="${yr(this.attributes[n])}"`);let e="";for(let n=0,i=this.children.length;n<i;n++)e+=this.children[n].toString();return e?t+=`>${e}</${this.nodeName}>`:t+="/>",t}toJSON(){const t=[];for(let e=0,n=this.children.length;e<n;e++)t.push(this.children[e].toJSON());return{nodeName:this.nodeName,children:t,nodeValue:this.nodeValue,attributes:this.attributes,type:"XML"}}setAttribute(t,e){if(e===null){delete this.attributes[t],delete this[t];return}this.attributes[t]=e,this[t]=e}appendChild(t){this.children.push(t),this.firstChild=this.children[0]}cloneNode(t){return new ln(this.toJSON())}}const We=class Mt{static uniqueId(t){return Mt._idSpaces[t]||(Mt._idSpaces[t]=1),Mt._idSpaces[t]++}static createXmlDoc(t,e){return new an(t||null,e)}static createElement(t,e,n){const i=t.createElement(e);n=n||[];let r=n.length;for(;r--;)i.setAttribute(n[r][0],n[r][1]);return i}static setAttributesOnDoc(t,e){for(let[n,i]of Object.entries(e)){if(ch(i))if(i.v!==null&&i.v!==void 0)switch(i.type){case Boolean:i=i.v?"1":"0";break}else i=null;i!=null&&t.setAttribute(n,i)}}static positionToLetterRef(t,e){let n=1,i,r=t,o="";const a="ABCDEFGHIJKLMNOPQRSTUVWXYZ";if(Mt.LETTER_REFS[t])return Mt.LETTER_REFS[t].concat(e);for(;r>0;)r-=Math.pow(26,n-1),i=r%Math.pow(26,n),r-=i,i=i/Math.pow(26,n-1),o=a.charAt(i)+o,n+=1;return Mt.LETTER_REFS[t]=o,o.concat(String(e))}};h(We,"_idSpaces",{}),h(We,"LETTER_REFS",{}),h(We,"schemas",{worksheet:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",sharedStrings:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",stylesheet:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",relationships:"http://schemas.openxmlformats.org/officeDocument/2006/relationships",relationshipPackage:"http://schemas.openxmlformats.org/package/2006/relationships",contentTypes:"http://schemas.openxmlformats.org/package/2006/content-types",spreadsheetml:"http://schemas.openxmlformats.org/spreadsheetml/2006/main",markupCompat:"http://schemas.openxmlformats.org/markup-compatibility/2006",x14ac:"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac",officeDocument:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",package:"http://schemas.openxmlformats.org/package/2006/relationships",table:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/table",spreadsheetDrawing:"http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",drawing:"http://schemas.openxmlformats.org/drawingml/2006/main",drawingRelationship:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",image:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",chart:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",hyperlink:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink"});let w=We;const Ct={};class Vn{constructor(){h(this,"relations",{}),h(this,"lastId",1),Et("rId")}importData(t){this.relations=t.relations,this.lastId=t.lastId}exportData(){return{relations:this.relations,lastId:this.lastId}}addRelation(t,e){return this.relations[t.id]={id:Et("rId"),schema:w.schemas[e],object:t},this.relations[t.id].id}getRelationshipId(t){return this.relations[t.id]?this.relations[t.id].id:null}toXML(){const t=w.createXmlDoc(w.schemas.relationshipPackage,"Relationships"),e=t.documentElement;for(const[n,i]of Object.entries(this.relations)){const r=w.createElement(t,"Relationship",[["Id",i.id],["Type",i.schema],["Target",i.object.target||Ct[n]]]);i.object.targetMode&&r.setAttribute("TargetMode",i.object.targetMode),e.appendChild(r)}return t}}class hh{constructor(){h(this,"state",null),h(this,"xSplit",null),h(this,"ySplit",null),h(this,"activePane","bottomRight"),h(this,"topLeftCell",null),h(this,"_freezePane")}freezePane(t,e,n){this._freezePane={xSplit:t,ySplit:e,cell:n}}exportXML(t){const e=t.createElement("pane");return this.state!==null&&(e.setAttribute("xSplit",this._freezePane.xSplit),e.setAttribute("ySplit",this._freezePane.ySplit),e.setAttribute("topLeftCell",this._freezePane.cell),e.setAttribute("activePane","bottomRight"),e.setAttribute("state","frozen")),e}}class li{constructor(){h(this,"strings",{}),h(this,"stringArray",[]),h(this,"id",Et("SharedStrings"))}addString(t){return this.strings[t]=this.stringArray.length,this.stringArray[this.stringArray.length]=t,this.strings[t]}exportData(){return this.strings}toXML(){const t=w.createXmlDoc(w.schemas.spreadsheetml,"sst"),e=t.documentElement;this.stringArray.reverse();let n=this.stringArray.length;e.setAttribute("count",n),e.setAttribute("uniqueCount",n);const i=t.createElement("si"),r=t.createElement("t");r.appendChild(t.createTextNode("--placeholder--")),i.appendChild(r);const o=this.stringArray;for(;n--;){const a=i.cloneNode(!0);a.firstChild.firstChild.nodeValue=o[n],e.appendChild(a)}return t}}class uh{constructor(t){h(this,"pane"),h(this,"showZeros",null),h(this,"defaultGridColor",null),h(this,"colorId",null),h(this,"rightToLeft",null),h(this,"showFormulas",null),h(this,"showGridLines",null),h(this,"showOutlineSymbols",null),h(this,"showRowColHeaders",null),h(this,"showRuler",null),h(this,"showWhiteSpace",null),h(this,"tabSelected",null),h(this,"topLeftCell",null),h(this,"viewType",null),h(this,"windowProtection",null),h(this,"zoomScale",null),h(this,"zoomScaleNormal",null),h(this,"zoomScalePageLayoutView",null),h(this,"zoomScaleSheetLayoutView",null);const e=t||{};this.pane=e.pane||new hh}freezePane(t,e,n){this.pane.state="frozen",this.pane.xSplit=t,this.pane.ySplit=e,this.pane.topLeftCell=n}exportXML(t){const e=t.createElement("sheetViews"),n=t.createElement("sheetView");return w.setAttributesOnDoc(n,{workbookViewId:0,showZeros:{v:this.showZeros,type:Boolean},defaultGridColor:{v:this.defaultGridColor,type:Boolean},colorId:this.colorId,rightToLeft:{v:this.rightToLeft,type:Boolean},showFormulas:{v:this.showFormulas,type:Boolean},showGridLines:{v:this.showGridLines,type:Boolean},showOutlineSymbols:{v:this.showOutlineSymbols,type:Boolean},showRowColHeaders:{v:this.showRowColHeaders,type:Boolean},showRuler:{v:this.showRuler,type:Boolean},showWhiteSpace:{v:this.showWhiteSpace,type:Boolean},tabSelected:{v:this.tabSelected,type:Boolean},viewType:this.viewType,windowProtection:{v:this.windowProtection,type:Boolean},zoomScale:{v:this.zoomScale,type:Boolean},zoomScaleNormal:this.zoomScaleNormal,zoomScalePageLayoutView:this.zoomScalePageLayoutView,zoomScaleSheetLayoutView:this.zoomScaleSheetLayoutView}),n.appendChild(this.pane.exportXML(t)),e.appendChild(n),e}}class ci{constructor(){h(this,"id",Et("StyleSheet")),h(this,"cellStyles",[{name:"Normal",xfId:"0",builtinId:"0"}]),h(this,"defaultTableStyle",!1),h(this,"differentialStyles",[{}]),h(this,"masterCellFormats",[{numFmtId:0,fontId:0,fillId:0,borderId:0,xfid:0}]),h(this,"masterCellStyles",[{numFmtId:0,fontId:0,fillId:0,borderId:0}]),h(this,"fonts",[{}]),h(this,"numberFormatters",[]),h(this,"fills",[{},{type:"pattern",patternType:"gray125",fgColor:"FF333333",bgColor:"FF333333"}]),h(this,"borders",[{top:{},left:{},right:{},bottom:{},diagonal:{}}]),h(this,"tableStyles",[])}createSimpleFormatter(t){const e={id:this.masterCellFormats.length};switch(t){case"date":e.numFmtId=14;break}return this.masterCellFormats.push(e),e}createFill(t){const e=this.fills.length,n=t;return n.id=e,this.fills.push(n),n}createNumberFormatter(t){const e={id:this.numberFormatters.length+100,formatCode:t};return this.numberFormatters.push(e),e}createFormat(t){const e={id:this.masterCellFormats.length};if(t.protection&&(e.protection=t.protection),t.font&&gt(t.font))e.fontId=this.createFontStyle(t.font).id;else if(t.font){if(Number.isNaN(parseInt(t.font,10)))throw new Error("Passing a non-numeric font id is not supported");e.fontId=t.font}if(t.format&&Pt(t.format))e.numFmtId=this.createNumberFormatter(t.format).id;else if(t.format){if(Number.isNaN(parseInt(t.format,10)))throw new Error("Invalid number formatter id");e.numFmtId=t.format}if(t.border&&gt(t.border))e.borderId=this.createBorderFormatter(t.border).id;else if(t.border){if(Number.isNaN(parseInt(t.border,10)))throw new Error("Passing a non-numeric border id is not supported");e.borderId=t.border}if(t.fill&&gt(t.fill))e.fillId=this.createFill(t.fill).id;else if(t.fill){if(Number.isNaN(parseInt(t.fill,10)))throw new Error("Passing a non-numeric fill id is not supported");e.fillId=t.fill}return t.alignment&&gt(t.alignment)&&(e.alignment=dh(t.alignment,["horizontal","justifyLastLine","readingOrder","relativeIndent","shrinkToFit","textRotation","vertical","wrapText"])),this.masterCellFormats.push(e),e}createDifferentialStyle(t){const e=this.differentialStyles.length,n={id:e};return t.font&&gt(t.font)&&(n.font=t.font),t.border&&gt(t.border)&&(n.border=Object.assign({top:{},left:{},right:{},bottom:{},diagonal:{}},t.border)),t.fill&&gt(t.fill)&&(n.fill=t.fill),t.alignment&&gt(t.alignment)&&(n.alignment=t.alignment),t.format&&Pt(t.format)&&(n.numFmt=t.format),this.differentialStyles[e]=n,n}createTableStyle(t){this.tableStyles.push(t)}createBorderFormatter(t){return t={top:{},left:{},right:{},bottom:{},diagonal:{},id:this.borders.length,...t},this.borders.push(t),t}createFontStyle(t){const e={id:this.fonts.length};return t.bold&&(e.bold=!0),t.italic&&(e.italic=!0),t.superscript&&(e.vertAlign="superscript"),t.subscript&&(e.vertAlign="subscript"),t.underline&&(typeof t.underline=="string"&&["double","singleAccounting","doubleAccounting"].includes(t.underline)?e.underline=t.underline:e.underline=!0),t.strike&&(e.strike=!0),t.outline&&(e.outline=!0),t.shadow&&(e.shadow=!0),t.size&&(e.size=t.size),t.color&&(e.color=t.color),t.fontName&&(e.fontName=t.fontName),this.fonts.push(e),e}exportBorders(t){const e=t.createElement("borders");e.setAttribute("count",this.borders.length);for(let n=0,i=this.borders.length;n<i;n++)e.appendChild(this.exportBorder(t,this.borders[n]));return e}exportBorder(t,e){const n=t.createElement("border"),i=r=>{const o=t.createElement(r);return e[r].style&&o.setAttribute("style",e[r].style),e[r].color&&o.appendChild(this.exportColor(t,e[r].color)),o};return n.appendChild(i("left")),n.appendChild(i("right")),n.appendChild(i("top")),n.appendChild(i("bottom")),n.appendChild(i("diagonal")),n}exportColor(t,e){const n=t.createElement("color");return Pt(e)?(n.setAttribute("rgb",e),n):(e.tint!==void 0&&n.setAttribute("tint",e.tint),e.auto!==void 0&&n.setAttribute("auto",String(!!e.auto)),e.theme!==void 0&&n.setAttribute("theme",e.theme),n)}exportMasterCellFormats(t){const e=w.createElement(t,"cellXfs",[["count",this.masterCellFormats.length]]);for(let n=0,i=this.masterCellFormats.length;n<i;n++){const r=this.masterCellFormats[n];e.appendChild(this.exportCellFormatElement(t,r))}return e}exportMasterCellStyles(t){const e=w.createElement(t,"cellStyleXfs",[["count",this.masterCellStyles.length]]);for(let n=0,i=this.masterCellStyles.length;n<i;n++){const r=this.masterCellStyles[n];e.appendChild(this.exportCellFormatElement(t,r))}return e}exportCellFormatElement(t,e){const n=t.createElement("xf"),i=["applyAlignment","applyBorder","applyFill","applyFont","applyNumberFormat","applyProtection","borderId","fillId","fontId","numFmtId","pivotButton","quotePrefix","xfId"],r=Object.keys(e).filter(a=>i.indexOf(a)!==-1);if(e.alignment){const a=e.alignment;n.appendChild(this.exportAlignment(t,a))}e.protection&&(n.appendChild(this.exportProtection(t,e.protection)),n.setAttribute("applyProtection","1"));let o=r.length;for(;o--;)n.setAttribute(r[o],e[r[o]]);return e.fillId&&n.setAttribute("applyFill","1"),e.fontId&&n.setAttribute("applyFont","1"),e.borderId&&n.setAttribute("applyBorder","1"),e.alignment&&n.setAttribute("applyAlignment","1"),e.numFmtId&&n.setAttribute("applyNumberFormat","1"),e.numFmtId!==void 0&&e.xfId===void 0&&n.setAttribute("xfId","0"),n}exportAlignment(t,e){const n=t.createElement("alignment"),i=Object.keys(e);for(let r=0,o=i.length;r<o;r++)n.setAttribute(i[r],e[i[r]]);return n}exportFonts(t){const e=t.createElement("fonts");e.setAttribute("count",String(this.fonts.length));for(let n=0,i=this.fonts.length;n<i;n++){const r=this.fonts[n];e.appendChild(this.exportFont(t,r))}return e}exportFont(t,e){const n=t.createElement("font");if(e.size){const i=t.createElement("sz");i.setAttribute("val",e.size),n.appendChild(i)}if(e.fontName){const i=t.createElement("name");i.setAttribute("val",e.fontName),n.appendChild(i)}if(e.bold&&n.appendChild(t.createElement("b")),e.italic&&n.appendChild(t.createElement("i")),e.vertAlign){const i=t.createElement("vertAlign");i.setAttribute("val",e.vertAlign),n.appendChild(i)}if(e.underline){const i=t.createElement("u");e.underline!==!0&&i.setAttribute("val",e.underline),n.appendChild(i)}return e.strike&&n.appendChild(t.createElement("strike")),e.shadow&&n.appendChild(t.createElement("shadow")),e.outline&&n.appendChild(t.createElement("outline")),e.color&&n.appendChild(this.exportColor(t,e.color)),n}exportFills(t){const e=t.createElement("fills");e.setAttribute("count",String(this.fills.length));for(let n=0,i=this.fills.length;n<i;n++){const r=this.fills[n];e.appendChild(this.exportFill(t,r))}return e}exportFill(t,e){let n;const i=t.createElement("fill");return e.type==="pattern"?(n=this.exportPatternFill(t,e),i.appendChild(n)):e.type==="gradient"&&(n=this.exportGradientFill(t,e),i.appendChild(n)),i}exportGradientFill(t,e){const n=t.createElement("gradientFill");e.degree?n.setAttribute("degree",e.degree):e.left&&(n.setAttribute("left",e.left),n.setAttribute("right",e.right),n.setAttribute("top",e.top),n.setAttribute("bottom",e.bottom));const i=t.createElement("stop");i.setAttribute("position",e.start.pureAt||0);const r=t.createElement("color");typeof e.start=="string"||e.start.color?r.setAttribute("rgb",e.start.color||e.start):e.start.theme&&r.setAttribute("theme",e.start.theme);const o=t.createElement("stop"),a=t.createElement("color");return o.setAttribute("position",e.end.pureAt||1),typeof e.start=="string"||e.end.color?a.setAttribute("rgb",e.end.color||e.end):e.end.theme&&a.setAttribute("theme",e.end.theme),i.appendChild(r),o.appendChild(a),n.appendChild(i),n.appendChild(o),n}exportPatternFill(t,e){const n=w.createElement(t,"patternFill",[["patternType",e.patternType]]);e.bgColor||(e.bgColor="FFFFFFFF"),e.fgColor||(e.fgColor="FFFFFFFF");const i=t.createElement("bgColor");Pt(e.bgColor)?i.setAttribute("rgb",e.bgColor):e.bgColor.theme?i.setAttribute("theme",e.bgColor.theme):i.setAttribute("rgb",e.bgColor.rbg);const r=t.createElement("fgColor");return Pt(e.fgColor)?r.setAttribute("rgb",e.fgColor):e.fgColor.theme?r.setAttribute("theme",e.fgColor.theme):r.setAttribute("rgb",e.fgColor.rbg),n.appendChild(r),n.appendChild(i),n}exportNumberFormatters(t){const e=t.createElement("numFmts");e.setAttribute("count",String(this.numberFormatters.length));for(let n=0,i=this.numberFormatters.length;n<i;n++){const r=this.numberFormatters[n];e.appendChild(this.exportNumberFormatter(t,r))}return e}exportNumberFormatter(t,e){const n=t.createElement("numFmt");return n.setAttribute("numFmtId",e.id),n.setAttribute("formatCode",e.formatCode),n}exportCellStyles(t){const e=t.createElement("cellStyles");e.setAttribute("count",String(this.cellStyles.length));for(let n=0,i=this.cellStyles.length;n<i;n++){const r=this.cellStyles[n];delete r.id;const o=w.createElement(t,"cellStyle");e.appendChild(o);const a=Object.keys(r);let l=a.length;for(;l--;)o.setAttribute(a[l],r[a[l]])}return e}exportDifferentialStyles(t){const e=t.createElement("dxfs");e.setAttribute("count",String(this.differentialStyles.length));for(let n=0,i=this.differentialStyles.length;n<i;n++){const r=this.differentialStyles[n];e.appendChild(this.exportDFX(t,r))}return e}exportDFX(t,e){const n=t.createElement("dxf");return e.font&&n.appendChild(this.exportFont(t,e.font)),e.fill&&n.appendChild(this.exportFill(t,e.fill)),e.border&&n.appendChild(this.exportBorder(t,e.border)),e.numFmt&&n.appendChild(this.exportNumberFormatter(t,e.numFmt)),e.alignment&&n.appendChild(this.exportAlignment(t,e.alignment)),n}exportTableStyles(t){const e=t.createElement("tableStyles");e.setAttribute("count",String(this.tableStyles.length)),this.defaultTableStyle&&e.setAttribute("defaultTableStyle",String(this.defaultTableStyle));for(let n=0,i=this.tableStyles.length;n<i;n++)e.appendChild(this.exportTableStyle(t,this.tableStyles[n]));return e}exportTableStyle(t,e){const n=t.createElement("tableStyle");n.setAttribute("name",e.name),n.setAttribute("pivot",String(0));let i=0;return Object.entries(e).forEach(([r,o])=>{if(r==="name")return;i++;const a=t.createElement("tableStyleElement");a.setAttribute("type",r),a.setAttribute("dxfId",o),n.appendChild(a)}),n.setAttribute("count",String(i)),n}exportProtection(t,e){const n=t.createElement("protection");for(const i in e)e.hasOwn(i)&&n.setAttribute(i,e[i]);return n}toXML(){const t=w.createXmlDoc(w.schemas.spreadsheetml,"styleSheet"),e=t.documentElement;return e.appendChild(this.exportNumberFormatters(t)),e.appendChild(this.exportFonts(t)),e.appendChild(this.exportFills(t)),e.appendChild(this.exportBorders(t)),e.appendChild(this.exportMasterCellStyles(t)),e.appendChild(this.exportMasterCellFormats(t)),e.appendChild(this.exportCellStyles(t)),e.appendChild(this.exportDifferentialStyles(t)),this.tableStyles.length&&e.appendChild(this.exportTableStyles(t)),t}}class hs{constructor(t){h(this,"name",""),h(this,"id",""),h(this,"tableId",""),h(this,"displayName",""),h(this,"dataCellStyle",null),h(this,"dataDfxId",null),h(this,"headerRowBorderDxfId",null),h(this,"headerRowCellStyle",null),h(this,"headerRowCount",1),h(this,"headerRowDxfId",null),h(this,"insertRow",!1),h(this,"insertRowShift",!1),h(this,"ref",null),h(this,"tableBorderDxfId",null),h(this,"totalsRowBorderDxfId",null),h(this,"totalsRowCellStyle",null),h(this,"totalsRowCount",0),h(this,"totalsRowDxfId",null),h(this,"tableColumns",[]),h(this,"autoFilter",null),h(this,"sortState",null),h(this,"styleInfo",{}),this.initialize(t)}initialize(t){this.displayName=Et("Table"),this.name=this.displayName,this.id=this.name,this.tableId=this.id.replace("Table",""),Object.assign(this,t)}setReferenceRange(t,e){this.ref=[t,e]}setTableColumns(t){t.forEach(e=>{this.addTableColumn(e)})}addTableColumn(t){if(Pt(t)&&(t={name:t}),!t.name)throw new Error("Invalid argument for addTableColumn - minimum requirement is a name property");this.tableColumns.push(t)}setSortState(t){this.sortState=t}toXML(){const t=w.createXmlDoc(w.schemas.spreadsheetml,"table"),e=t.documentElement;e.setAttribute("id",this.tableId),e.setAttribute("name",this.name),e.setAttribute("displayName",this.displayName);const n=this.ref[0],i=this.ref[1];if(e.setAttribute("ref",`${w.positionToLetterRef(n[0],n[1])}:${w.positionToLetterRef(i[0],i[1])}`),e.setAttribute("totalsRowCount",this.totalsRowCount),e.setAttribute("headerRowCount",this.headerRowCount),this.headerRowDxfId&&e.setAttribute("headerRowDxfId",this.headerRowDxfId),this.headerRowBorderDxfId&&e.setAttribute("headerRowBorderDxfId",this.headerRowBorderDxfId),!this.ref)throw new Error("Needs at least a reference range");return this.autoFilter||this.addAutoFilter(this.ref[0],this.ref[1]),e.appendChild(this.exportAutoFilter(t)),e.appendChild(this.exportTableColumns(t)),e.appendChild(this.exportTableStyleInfo(t)),t}exportTableColumns(t){const e=t.createElement("tableColumns");e.setAttribute("count",this.tableColumns.length);const n=this.tableColumns;for(let i=0,r=n.length;i<r;i++){const o=n[i],a=t.createElement("tableColumn");a.setAttribute("id",String(i+1)),a.setAttribute("name",o.name),e.appendChild(a),o.totalsRowFunction&&a.setAttribute("totalsRowFunction",o.totalsRowFunction),o.totalsRowLabel&&a.setAttribute("totalsRowLabel",o.totalsRowLabel)}return e}exportAutoFilter(t){const e=t.createElement("autoFilter"),n=this.autoFilter[0],i=this.autoFilter[1];return e.setAttribute("ref",`${w.positionToLetterRef(n[0],n[1])}:${w.positionToLetterRef(i[0],i[1]-this.totalsRowCount)}`),e}exportTableStyleInfo(t){const e=this.styleInfo,n=t.createElement("tableStyleInfo");return n.setAttribute("name",e.themeStyle),n.setAttribute("showFirstColumn",e.showFirstColumn?"1":"0"),n.setAttribute("showLastColumn",e.showLastColumn?"1":"0"),n.setAttribute("showColumnStripes",e.showColumnStripes?"1":"0"),n.setAttribute("showRowStripes",e.showRowStripes?"1":"0"),n}addAutoFilter(t,e){this.autoFilter=[t,e]}}class ph{constructor(t){h(this,"name",""),h(this,"id",Et("Worksheet")),h(this,"_timezoneOffset"),h(this,"relations",null),h(this,"columnFormats",[]),h(this,"data",[]),h(this,"mergedCells",[]),h(this,"columns",[]),h(this,"sheetProtection",!1),h(this,"_headers",[]),h(this,"_footers",[]),h(this,"_tables",[]),h(this,"_drawings",[]),h(this,"_orientation"),h(this,"_margin"),h(this,"_rowInstructions",{}),h(this,"_freezePane",{}),h(this,"sharedStrings",null),h(this,"hyperlinks",[]),h(this,"sheetView"),h(this,"showZeros",null),this._timezoneOffset=new Date().getTimezoneOffset()*60*1e3,this.sheetView=t.sheetView||new uh,this.initialize(t)}initialize(t){t=t||{},this.name=t.name,this.id=Et("Worksheet"),this._timezoneOffset=new Date().getTimezoneOffset()*60*1e3,t.columns&&this.setColumns(t.columns),this.relations=new Vn}exportData(){return{relations:this.relations.exportData(),columnFormats:this.columnFormats,data:this.data,columns:this.columns,mergedCells:this.mergedCells,_headers:this._headers,_footers:this._footers,_tables:this._tables,_rowInstructions:this._rowInstructions,_freezePane:this._freezePane,name:this.name,id:this.id}}importData(t){this.relations.importData(t.relations),delete t.relations,Object.assign(this,t)}setSharedStringCollection(t){this.sharedStrings=t}addTable(t){this._tables.push(t),this.relations.addRelation(t,"table")}addDrawings(t){this._drawings.push(t),this.relations.addRelation(t,"drawingRelationship")}setRowInstructions(t,e){this._rowInstructions[t]=e}setHeader(t){if(!Array.isArray(t))throw"Invalid argument type - setHeader expects an array of three instructions";this._headers=t}setFooter(t){if(!Array.isArray(t))throw"Invalid argument type - setFooter expects an array of three instructions";this._footers=t}compilePageDetailPackage(t){return t=t||"",["&L",this.compilePageDetailPiece(t[0]||""),"&C",this.compilePageDetailPiece(t[1]||""),"&R",this.compilePageDetailPiece(t[2]||"")].join("")}compilePageDetailPiece(t){if(Pt(t))return'&"-,Regular"'.concat(t);if(gt(t)&&!Array.isArray(t)){let e="";if(t.font||t.bold){const n=t.bold?"Bold":"Regular";e+=`&"${t.font||"-"}`,e+=`,${n}"`}else e+='&"-,Regular"';return t.underline&&(e+="&U"),t.fontSize&&(e+=`&${t.fontSize}`),e+=t.text,e}if(Array.isArray(t))return t.reduce((e,n)=>e.concat(this.compilePageDetailPiece(n)),"")}exportHeader(t){const e=t.createElement("oddHeader");return e.appendChild(t.createTextNode(this.compilePageDetailPackage(this._headers))),e}exportFooter(t){const e=t.createElement("oddFooter");return e.appendChild(t.createTextNode(this.compilePageDetailPackage(this._footers))),e}_buildCache(t){const e=t.createElement("c"),n=t.createElement("v");n.appendChild(t.createTextNode("--temp--")),e.appendChild(n);const i=t.createElement("c"),r=t.createElement("f");r.appendChild(t.createTextNode("--temp--")),i.appendChild(r);const o=t.createElement("c");o.setAttribute("t","s");const a=t.createElement("v");return a.appendChild(t.createTextNode("--temp--")),o.appendChild(a),{number:e,date:e,string:o,formula:i}}collectSharedStrings(){const t=this.data,e={};for(let n=0,i=t.length;n<i;n++){const r=t[n],o=r.length;for(let a=0;a<o;a++){let l=r[a];const d=(l==null?void 0:l.metadata)||{};l&&typeof l=="object"&&(l=l.value),d.type||typeof l=="number"&&(d.type="number"),(d.type==="text"||!d.type)&&typeof e[l]>"u"&&(e[l]=!0)}}return Object.keys(e)}toXML(){var t,e,n;const i=this.data,r=this.columns||[],o=w.createXmlDoc(w.schemas.spreadsheetml,"worksheet"),a=o.documentElement;let l,d,c;a.setAttribute("xmlns:r",w.schemas.relationships),a.setAttribute("xmlns:mc",w.schemas.markupCompat);let g=0;const v=w.createElement(o,"sheetData"),f=this._buildCache(o);for(c=0,d=i.length;c<d;c++){const _=i[c],p=_.length;g=p>g?p:g;const b=o.createElement("row");for(let E=0;E<p;E++){r[E]=r[E]||{};let x=_[E],C;const m=(x==null?void 0:x.metadata)||{};switch(x&&typeof x=="object"&&(x=x.value),m.type||typeof x=="number"&&(m.type="number"),m.type){case"number":C=f.number.cloneNode(!0),C.firstChild.firstChild.nodeValue=x;break;case"date":C=f.date.cloneNode(!0),x instanceof Date&&(x=x.getTime()),C.firstChild.firstChild.nodeValue=25569+(x-this._timezoneOffset)/(60*60*24*1e3);break;case"formula":C=f.formula.cloneNode(!0),C.firstChild.firstChild.nodeValue=x;break;case"text":default:{let T;typeof((t=this.sharedStrings)==null?void 0:t.strings[x])<"u"?T=this.sharedStrings.strings[x]:T=(e=this.sharedStrings)==null?void 0:e.addString(x),C=f.string.cloneNode(!0),C.firstChild.firstChild.nodeValue=T;break}}m.style?C.setAttribute("s",m.style):((n=this._rowInstructions[c])==null?void 0:n.style)!==void 0&&C.setAttribute("s",this._rowInstructions[c].style),C.setAttribute("r",w.positionToLetterRef(E+1,String(c+1))),b.appendChild(C)}if(b.setAttribute("r",c+1),this._rowInstructions[c]){const E=this._rowInstructions[c];E.height!==void 0&&(b.setAttribute("customHeight","1"),b.setAttribute("ht",E.height)),E.style!==void 0&&(b.setAttribute("customFormat","1"),b.setAttribute("s",E.style))}v.appendChild(b)}if(g!==0?a.appendChild(w.createElement(o,"dimension",[["ref",`${w.positionToLetterRef(1,1)}:${w.positionToLetterRef(g,String(i.length))}`]])):a.appendChild(w.createElement(o,"dimension",[["ref",w.positionToLetterRef(1,1)]])),a.appendChild(this.sheetView.exportXML(o)),this.columns.length&&a.appendChild(this.exportColumns(o)),a.appendChild(v),this.sheetProtection&&a.appendChild(this.sheetProtection.exportXML(o)),this.hyperlinks.length>0){const _=o.createElement("hyperlinks"),p=this.hyperlinks;for(l=0,d=p.length;l<d;l++){const b=o.createElement("hyperlink"),E=p[l];b.setAttribute("ref",String(E.cell)),E.id=w.uniqueId("hyperlink"),this.relations.addRelation({id:E.id,target:E.location,targetMode:E.targetMode||"External"},"hyperlink"),b.setAttribute("r:id",this.relations.getRelationshipId(E)),_.appendChild(b)}a.appendChild(_)}if(this.mergedCells.length>0){const _=o.createElement("mergeCells");for(l=0,d=this.mergedCells.length;l<d;l++){const p=o.createElement("mergeCell");p.setAttribute("ref",`${this.mergedCells[l][0]}:${this.mergedCells[l][1]}`),_.appendChild(p)}a.appendChild(_)}if(this.exportPageSettings(o,a),this._headers.length>0||this._footers.length>0){const _=o.createElement("headerFooter");this._headers.length>0&&_.appendChild(this.exportHeader(o)),this._footers.length>0&&_.appendChild(this.exportFooter(o)),a.appendChild(_)}for(l=0,d=this._drawings.length;l<d;l++){const _=o.createElement("drawing");_.setAttribute("r:id",this.relations.getRelationshipId(this._drawings[l])),a.appendChild(_)}if(this._tables.length>0){const _=o.createElement("tableParts");for(_.setAttribute("count",this._tables.length),l=0,d=this._tables.length;l<d;l++){const p=o.createElement("tablePart");p.setAttribute("r:id",this.relations.getRelationshipId(this._tables[l])),_.appendChild(p)}a.appendChild(_)}return o}exportColumns(t){const e=w.createElement(t,"cols");for(let n=0,i=this.columns.length;n<i;n++){const r=this.columns[n],o=w.createElement(t,"col",[["min",r.min||n+1],["max",r.max||n+1]]);r.hidden&&o.setAttribute("hidden",String(1)),r.bestFit&&o.setAttribute("bestFit",String(1)),(r.customWidth||r.width)&&o.setAttribute("customWidth",String(1)),r.width?o.setAttribute("width",r.width):o.setAttribute("width",String(9.140625)),e.appendChild(o)}return e}exportPageSettings(t,e){if(this._margin){let n=.7;const i=this._margin.left?this._margin.left:n,r=this._margin.right?this._margin.right:n,o=this._margin.top?this._margin.top:n,a=this._margin.bottom?this._margin.bottom:n;n=.3;const l=this._margin.header?this._margin.header:n,d=this._margin.footer?this._margin.footer:n;e.appendChild(w.createElement(t,"pageMargins",[["top",o],["bottom",a],["left",i],["right",r],["header",l],["footer",d]]))}this._orientation&&e.appendChild(w.createElement(t,"pageSetup",[["orientation",this._orientation]]))}setPageOrientation(t){this._orientation=t}setPageMargin(t){this._margin=t}setColumns(t){this.columns=t}setData(t){this.data=t}mergeCells(t,e){this.mergedCells.push([t,e])}freezePane(t,e,n){this.sheetView.freezePane(t,e,n)}setColumnFormats(t){this.columnFormats=t}}class xr{constructor(){h(this,"id",Et("Workbook")),h(this,"styleSheet",new ci),h(this,"sharedStrings",new li),h(this,"relations",new Vn),h(this,"worksheets",[]),h(this,"tables",[]),h(this,"drawings",[]),h(this,"media",{}),h(this,"printTitles"),this.initialize()}initialize(){this.id=Et("Workbook"),this.styleSheet=new ci,this.sharedStrings=new li,this.relations=new Vn,this.relations.addRelation(this.styleSheet,"stylesheet"),this.relations.addRelation(this.sharedStrings,"sharedStrings")}createWorksheet(t){return t=Object.assign({},{name:"Sheet ".concat(String(this.worksheets.length+1))},t),new ph(t)}getStyleSheet(){return this.styleSheet}addTable(t){this.tables.push(t)}addDrawings(t){this.drawings.push(t)}setPrintTitleTop(t,e){this.printTitles==null&&(this.printTitles={}),this.printTitles[t]==null&&(this.printTitles[t]={}),this.printTitles[t].top=e}setPrintTitleLeft(t,e){this.printTitles==null&&(this.printTitles={}),this.printTitles[t]==null&&(this.printTitles[t]={}),this.printTitles[t].left=String.fromCharCode(64+e)}addMedia(t,e,n,i){const r=e.split("."),o=r[r.length-1];if(!i)switch(o.toLowerCase()){case"jpeg":case"jpg":i="image/jpeg";break;case"png":i="image/png";break;case"gif":i="image/gif";break;default:i=null;break}return this.media[e]||(this.media[e]={id:e,data:n,fileName:e,contentType:i,extension:o}),this.media[e]}addWorksheet(t){this.relations.addRelation(t,"worksheet"),t.setSharedStringCollection(this.sharedStrings),this.worksheets.push(t)}createContentTypes(){const t=w.createXmlDoc(w.schemas.contentTypes,"Types"),e=t.documentElement;let n,i;e.appendChild(w.createElement(t,"Default",[["Extension","rels"],["ContentType","application/vnd.openxmlformats-package.relationships+xml"]])),e.appendChild(w.createElement(t,"Default",[["Extension","xml"],["ContentType","application/xml"]]));const r={};for(const o in this.media)this.media.hasOwn(o)&&(r[this.media[o].extension]=this.media[o].contentType);for(const o in r)r.hasOwn(o)&&e.appendChild(w.createElement(t,"Default",[["Extension",o],["ContentType",r[o]]]));for(e.appendChild(w.createElement(t,"Override",[["PartName","/xl/workbook.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"]])),e.appendChild(w.createElement(t,"Override",[["PartName","/xl/sharedStrings.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"]])),e.appendChild(w.createElement(t,"Override",[["PartName","/xl/styles.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"]])),n=0,i=this.worksheets.length;n<i;n++)e.appendChild(w.createElement(t,"Override",[["PartName",`/xl/worksheets/sheet${n+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"]]));for(n=0,i=this.tables.length;n<i;n++)e.appendChild(w.createElement(t,"Override",[["PartName",`/xl/tables/table${n+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"]]));for(n=0,i=this.drawings.length;n<i;n++)e.appendChild(w.createElement(t,"Override",[["PartName",`/xl/drawings/drawing${n+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.drawing+xml"]]));return t}toXML(){const t=w.createXmlDoc(w.schemas.spreadsheetml,"workbook"),e=t.documentElement;e.setAttribute("xmlns:r",w.schemas.relationships);const n=31,i=w.createElement(t,"sheets");for(let a=0,l=this.worksheets.length;a<l;a++){const d=t.createElement("sheet");typeof console<"u"&&this.worksheets[a].name.length>n&&console.log(`Microsoft Excel requires work sheet names to be less than ${n+1} characters long, work sheet name "${this.worksheets[a].name}" is ${this.worksheets[a].name.length} characters long`),d.setAttribute("name",this.worksheets[a].name),d.setAttribute("sheetId",a+1),d.setAttribute("r:id",this.relations.getRelationshipId(this.worksheets[a])),i.appendChild(d)}e.appendChild(i);const r=w.createElement(t,"definedNames");let o=0;for(const a in this.printTitles){if(!this.printTitles.hasOwn(a))continue;const l=this.printTitles[a],d=t.createElement("definedName");d.setAttribute("name","_xlnm.Print_Titles"),d.setAttribute("localSheetId",o++);let c="";l.top&&(c+=`${a}!$1:$${l.top}`,l.left&&(c+=",")),l.left&&(c+=`${a}!$A:$${l.left}`),d.appendChild(t.createTextNode(c)),r.appendChild(d)}return e.appendChild(r),t}createWorkbookRelationship(){const t=w.createXmlDoc(w.schemas.relationshipPackage,"Relationships");return t.documentElement.appendChild(w.createElement(t,"Relationship",[["Id","rId1"],["Type",w.schemas.officeDocument],["Target","xl/workbook.xml"]])),t}_generateCorePaths(t){let e,n;for(Ct[this.styleSheet.id]="styles.xml",Ct[this.sharedStrings.id]="sharedStrings.xml",Ct[this.id]="/xl/workbook.xml",e=0,n=this.tables.length;e<n;e++)t[`/xl/tables/table${e+1}.xml`]=this.tables[e].toXML(),Ct[this.tables[e].id]=`/xl/tables/table${e+1}.xml`;for(const i in this.media)if(this.media.hasOwn(i)){const r=this.media[i];t[`/xl/media/${i}`]=r.data,Ct[i]=`/xl/media/${i}`}for(e=0,n=this.drawings.length;e<n;e++)t[`/xl/drawings/drawing${e+1}.xml`]=this.drawings[e].toXML(),Ct[this.drawings[e].id]=`/xl/drawings/drawing${e+1}.xml`,t[`/xl/drawings/_rels/drawing${e+1}.xml.rels`]=this.drawings[e].relations.toXML()}_prepareFilesForPackaging(t){Object.assign(t,{"/[Content_Types].xml":this.createContentTypes(),"/_rels/.rels":this.createWorkbookRelationship(),"/xl/styles.xml":this.styleSheet.toXML(),"/xl/workbook.xml":this.toXML(),"/xl/sharedStrings.xml":this.sharedStrings.toXML(),"/xl/_rels/workbook.xml.rels":this.relations.toXML()});for(const[e,n]of Object.entries(t))if(e.indexOf(".xml")!==-1||e.indexOf(".rels")!==-1){n instanceof an?t[e]=n.toString():t[e]=n.xml||new window.XMLSerializer().serializeToString(n);let i=t[e].replace(/xmlns=""/g,"");i=i.replace(/NS[\d]+:/g,""),i=i.replace(/xmlns:NS[\d]+=""/g,""),t[e]=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
${i}`}}generateFiles(){return new Promise(t=>{const e={};this._generateCorePaths(e);for(let n=0,i=this.worksheets.length;n<i;n++)e[`/xl/worksheets/sheet${n+1}.xml`]=this.worksheets[n].toXML(),Ct[this.worksheets[n].id]=`worksheets/sheet${n+1}.xml`,e[`/xl/worksheets/_rels/sheet${n+1}.xml.rels`]=this.worksheets[n].relations.toXML();return this._prepareFilesForPackaging(e),t(e)})}}function ht(){return new xr}function rt(s,t,e){const n={};return new Promise((i,r)=>{s.generateFiles().then(o=>{for(const[a,l]of Object.entries(o))n[a.substr(1)]=Bn(l);switch(t){case"Uint8Array":return oi(n,e||{},(a,l)=>{if(a){r(a);return}i(l)});case"Blob":default:return oi(n,e||{},(a,l)=>{if(a){r(a);return}i(new Blob([l],{type:"base64"}))})}})})}function Ar(s){const t=document.createElement("table");t.className="table";const e=document.createElement("thead"),n=document.createElement("tbody");return t.appendChild(e),t.appendChild(n),s.forEach((i,r)=>{const o=document.createElement("tr");for(const a of i){let l;r===0?(l=document.createElement("th"),l.setAttribute("scope","col")):l=document.createElement("td"),l.textContent=a,o.appendChild(l),r===0?e.appendChild(o):n.appendChild(o)}}),t}function ot(s){if(typeof navigator.msSaveOrOpenBlob=="function")navigator.msSaveOrOpenBlob(s.blob,s.filename);else{const t=document.createElement("a"),e=URL.createObjectURL(s.blob);t&&document&&(t.textContent="download",t.href=e,t.setAttribute("download",s.filename),t.style.visibility="hidden",document.body.appendChild(t),t.click(),document.body.removeChild(t))}}let Cr=class{constructor(){V(this,"exportBtnElm");V(this,"originalData",[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]])}mount(){document.querySelector(".table-container").appendChild(Ar(this.originalData)),this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=new xr,e=t.createWorksheet({name:"Artists"});e.setData(this.originalData),t.addWorksheet(e),rt(t).then(n=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:n,data:e.data})})}},mh=class{constructor(){V(this,"exportBtnElm");V(this,"originalData",[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]])}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=ht(),e=t.createWorksheet({name:"Album List"});e.setData(this.originalData),e.setColumns([{width:30},{width:20,hidden:!0},{width:10}]),t.addWorksheet(e),rt(t).then(n=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:n,data:e.data})})}},fh=class{constructor(){V(this,"exportBtnElm");V(this,"originalData",[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]])}mount(){document.querySelector(".table-container").appendChild(Ar(this.originalData)),this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=ht(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet().createFormat({font:{italic:!0,underline:!0}});e.setRowInstructions(1,{height:40,style:n.id}),e.setData(this.originalData),t.addWorksheet(e),rt(t).then(i=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:i,data:e.data})})}},gh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=ht(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet(),i="FFFF0000",r=n.createFormat({font:{bold:!0,color:i},border:{bottom:{color:i,style:"thin"},top:{color:i,style:"thin"},left:{color:i,style:"thin"},right:{color:i,style:"dotted"}}}),o=n.createFormat({font:{bold:!0,color:{theme:3}}}),a=[[{value:"Artist",metadata:{style:r.id}},{value:"Album",metadata:{style:o.id}},{value:"Price",metadata:{style:o.id}}],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]];e.setData(a),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),rt(t).then(l=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:l,data:e.data})})}},bh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=ht(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet().createFormat({format:"$#,##0.00"}),i=t.getStyleSheet().createSimpleFormatter("date"),r=[["Artist","Album","Price","Date Modified"],["Buckethead","Albino Slug",{value:8.99,metadata:{style:n.id}},{value:new Date(2024,1,1),metadata:{type:"date",style:i.id}}],["Buckethead","Electric Tears",{value:13.99,metadata:{style:n.id}},{value:new Date(2024,1,2),metadata:{type:"date",style:i.id}}],["Buckethead","Colma",{value:11.34,metadata:{style:n.id}},{value:new Date(2024,1,3),metadata:{type:"date",style:i.id}}],["Crystal Method","Vegas",{value:10.54,metadata:{style:n.id}},{value:new Date(2024,1,4),metadata:{type:"date",style:i.id}}],["Crystal Method","Tweekend",{value:10.64,metadata:{style:n.id}},{value:new Date(2024,1,5),metadata:{type:"date",style:i.id}}],["Crystal Method","Divided By Night",{value:8.99,metadata:{style:n.id}},{value:new Date(2024,1,6),metadata:{type:"date",style:i.id}}]];e.setData(r),e.setColumns([{width:15},{width:15},{width:15},{width:15}]),t.addWorksheet(e),rt(t).then(o=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:o,data:e.data})})}},vh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=ht(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet().createFormat({alignment:{horizontal:"center"}}),i=[[{value:"Artist",metadata:{style:n.id}},{value:"Album",metadata:{style:n.id}},{value:"Price",metadata:{style:n.id}}],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]];e.setData(i),e.setColumns([{width:30},{width:30},{width:30}]),t.addWorksheet(e),rt(t).then(r=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:r,data:e.data})})}},_h=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=ht(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet(),r=n.createFormat({font:{bold:!0,color:"FF0000FF"},fill:{type:"pattern",patternType:"solid",fgColor:"FF00FF00"}}),o=n.createFormat({font:{color:"FFFFFFFF"},fill:{type:"gradient",degree:180,start:"FF92D050",end:{pureAt:.8,color:"FF0070C0"}}}),a=[[{value:"Artist",metadata:{style:r.id}},{value:"Album",metadata:{style:r.id}},{value:"Price",metadata:{style:r.id}}],[{value:"Buckethead",metadata:{style:o.id}},"Albino Slug",8.99],[{value:"Buckethead",metadata:{style:o.id}},"Electric Tears",13.99],[{value:"Buckethead",metadata:{style:o.id}},"Colma",11.34],[{value:"Crystal Method",metadata:{style:o.id}},"Vegas",10.54],[{value:"Crystal Method",metadata:{style:o.id}},"Tweekend",10.64],[{value:"Crystal Method",metadata:{style:o.id}},"Divided By Night",8.99]];e.setData(a),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),rt(t).then(l=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:l,data:e.data})})}},Eh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=ht(),e=t.createWorksheet({name:"Album List"}),n=[[{value:"Artist"},{value:"Album"},{value:"Price"},{value:"Quantity"},{value:"Total"}],["Buckethead","Albino Slug",8.99,5,{value:"C2+D2",metadata:{type:"formula"}}],["Buckethead","Electric Tears",13.99,7,{value:"C3+D3",metadata:{type:"formula"}}],["Buckethead","Colma",11.34,9,{value:"C4+D4",metadata:{type:"formula"}}],["Crystal Method","Vegas",10.54,3,{value:"C5+D5",metadata:{type:"formula"}}],["Crystal Method","Tweekend",10.64,1,{value:"C6+D6",metadata:{type:"formula"}}],["Crystal Method","Divided By Night",8.99,56,{value:"C7+D7",metadata:{type:"formula"}}]];e.setData(n),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),rt(t).then(i=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:i,data:e.data})})}},yh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=ht(),n=e.createWorksheet({name:"Album List"}),i=new hs;i.styleInfo.themeStyle="TableStyleDark2",i.setReferenceRange([1,1],[3,t.length]),i.setTableColumns(["Artist","Album","Price"]),n.setData(t),e.addWorksheet(n),n.addTable(i),e.addTable(i),rt(e).then(r=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:r,data:n.data})})}},wh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=ht(),n=e.createWorksheet({name:"Album List"}),i=e.getStyleSheet(),r=i.createDifferentialStyle({font:{italic:!0}});i.createTableStyle({name:"SlightlyOffColorBlue",wholeTable:r.id,headerRow:i.createDifferentialStyle({alignment:{horizontal:"center"}}).id});const o=new hs;o.styleInfo.themeStyle="SlightlyOffColorBlue",o.setReferenceRange([1,1],[3,t.length]),o.setTableColumns(["Artist","Album","Price"]),n.setData(t),e.addWorksheet(n),n.addTable(o),e.addTable(o),rt(e).then(a=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:a,data:n.data})})}},xh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=new hs,e=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99],["Highest Price","test",{value:`SUBTOTAL(104,${t.name}[Price])`,metadata:{type:"formula"}}]],n=ht(),i=n.createWorksheet({name:"Album List"});t.styleInfo.themeStyle="TableStyleDark2",t.setReferenceRange([1,1],[3,e.length]),t.totalsRowCount=1,t.setTableColumns([{name:"Artist",totalsRowLabel:"Highest Price"},{name:"Album",totalsRowLabel:"test"},{name:"Price",totalsRowFunction:"max"}]),i.setData(e),n.addWorksheet(i),i.addTable(t),n.addTable(t),rt(n).then(r=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:r,data:i.data})})}},Ah=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=ht(),n=e.createWorksheet({name:"Album List"});n.setData(t),n.setHeader(["This will be on the left",["In the middle ",{text:"I shall be",bold:!0}],{text:"Right, underlined and size of 16",font:16,underline:!0}]),n.setFooter(["Date of print: &D &T","&A","Page &P of &N"]),e.addWorksheet(n),rt(e).then(i=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:i,data:n.data})})}};class Ch{}const Tn=[{name:"getting-started",view:"/src/getting-started.html",viewModel:Ch,title:"Getting Started"},{name:"examples",view:"/src/examples/example01.html",viewModel:Cr,title:"Examples"},{name:"documentation",href:"https://ghiscoding.gitbook.io/excel-builder-vanilla/",title:"Documentation"}],di=[{name:"References",routes:[{name:"documentation",href:"https://ghiscoding.gitbook.io/excel-builder-vanilla/",title:"Documentation"}]},{name:"Examples",routes:[{name:"example01",view:"/src/examples/example01.html",viewModel:Cr,title:"01- Create Worksheet"},{name:"example02",view:"/src/examples/example02.html",viewModel:mh,title:"02- Sizing/Collapsing Columns"},{name:"example03",view:"/src/examples/example03.html",viewModel:fh,title:"03- Setting row information"},{name:"example04",view:"/src/examples/example04.html",viewModel:gh,title:"04- Fonts and Colors"},{name:"example05",view:"/src/examples/example05.html",viewModel:bh,title:"05- Number, Date, etc Formatting"},{name:"example06",view:"/src/examples/example06.html",viewModel:vh,title:"06- Alignment"},{name:"example07",view:"/src/examples/example07.html",viewModel:_h,title:"07- Backgroud Fillers"},{name:"example08",view:"/src/examples/example08.html",viewModel:Eh,title:"08- Formulas"},{name:"example09",view:"/src/examples/example09.html",viewModel:yh,title:"09- Tables"},{name:"example10",view:"/src/examples/example10.html",viewModel:wh,title:"10- Theming Tables"},{name:"example11",view:"/src/examples/example11.html",viewModel:xh,title:"11- Theming Summaries"},{name:"example12",view:"/src/examples/example12.html",viewModel:Ah,title:"12- Worksheet Headers/Footers"}]}],Th=Object.assign({"/src/examples/example-standalone-iife.html":Dr,"/src/examples/example01.html":Lr,"/src/examples/example02.html":$r,"/src/examples/example03.html":Ir,"/src/examples/example04.html":Mr,"/src/examples/example05.html":Pr,"/src/examples/example06.html":Rr,"/src/examples/example07.html":Br,"/src/examples/example08.html":Fr,"/src/examples/example09.html":Vr,"/src/examples/example10.html":Wr,"/src/examples/example11.html":jr,"/src/examples/example12.html":Hr,"/src/getting-started.html":zr,"/src/main.html":hi});class Sh{constructor(){V(this,"loading",!0);V(this,"currentModel");V(this,"currentRouter");V(this,"defaultRouteName","getting-started");V(this,"stateBangChar","#/");V(this,"baseUrl",window.location.origin+window.location.pathname);V(this,"viewModelObj",{})}async init(){const t=window.location;document.querySelector("#app").innerHTML=hi;let e=t.hash.replace(this.stateBangChar,"");(!e||e==="/"||e==="#")&&(e=this.defaultRouteName),this.createRouteLinks(),this.loadRoute(e),Array.from(document.querySelectorAll(".panel-wm-left a.nav-link,.navbar-nav a.nav-link")).forEach(n=>{n.id&&e.includes(n.id)&&n.classList.add("active")}),window.onpopstate=()=>{const i=window.location.hash.replace(this.stateBangChar,"");this.removeAllActiveLinks();const r=document.querySelector(`#${i}`);r&&(r.scrollIntoView(),r.classList.add("active")),this.loadRoute(i||this.defaultRouteName,!1)}}createRouteLinks(){var t,e,n;for(const i of Tn){const r=document.createElement("li");r.className="nav-item";const o=document.createElement("a");o.id=i.name,o.className="nav-link",o.textContent=i.title,r.appendChild(o),o.addEventListener("click",this.clickEventListener.bind(this)),(t=document.querySelector(".navbar-nav"))==null||t.appendChild(r)}for(const i of di){const r=document.createElement("li");r.className="m-1";const o=document.createElement("p");o.className="navbar-vertical-label mb-1",o.textContent=i.name,r.appendChild(o),(e=document.querySelector(".nav-pills"))==null||e.appendChild(r);for(const a of i.routes){const l=document.createElement("li");l.className="nav-item";const d=document.createElement("a");d.id=a.name,d.className="nav-link",d.textContent=a.title,d.addEventListener("click",this.clickEventListener.bind(this)),l.appendChild(d),(n=document.querySelector(".nav-pills"))==null||n.appendChild(l)}}}async loadRoute(t,e=!0){var r;const n=document.querySelector(".panel-wm-content");n.textContent="",n.classList.add("cloak");let i=Tn.find(o=>o.name===t);if((i==null?void 0:i.name)==="examples"){const o=document.querySelector(".nav-pills .nav-item a.nav-link:not([href])");o==null||o.classList.add("active")}else for(const o of di){const a=o.routes.find(l=>l.name===t);a&&(i=a)}if(this.currentModel&&this.unmountCurrentVM(this.currentModel,this.currentRouter),i!=null&&i.view){this.currentRouter=i,document.querySelector(".panel-wm-content").innerHTML=Th[i.view];const o=new i.viewModel;this.currentModel=o,window[i.name]=(r=o.mount)==null?void 0:r.call(o),window.onbeforeunload=()=>{var a;n.classList.add("cloak"),(a=o.unmount)==null||a.call(o),this.removeAllActiveLinks(!0),this.unmountAll(),i!=null&&i.name&&delete window[i.name]}}e&&window.history.pushState({},t,`${this.baseUrl}${this.stateBangChar}${t}`),document.title=`Excel-Builder-Vanilla · ${t}`,n.classList.remove("cloak")}async clickEventListener(t){const e=t.target,n=Tn.find(i=>i.name===e.id);if(n!=null&&n.href){window.open(n.href,"_blank");return}this.removeAllActiveLinks(),e.classList.toggle("active"),this.loadRoute(e.id)}removeAllActiveLinks(t=!1){document.querySelectorAll(".panel-wm-left a.nav-link,.navbar-nav a.nav-link").forEach(e=>{e.classList.remove("active"),t&&e.removeEventListener("click",this.clickEventListener.bind(this))})}unmountCurrentVM(t,e){var n;(n=t.unmount)==null||n.call(t),e&&delete window[e.name]}unmountAll(){for(const t of Object.keys(this.viewModelObj)){const e=this.viewModelObj[t];if(typeof(e==null?void 0:e.unmount)=="function"){e==null||e.unmount();for(const n of Object.keys(e))e[n]=null}window[t]=null,this.viewModelObj[t]=null,delete window[t],delete this.viewModelObj[t]}}}const kh=new Sh;kh.init();
