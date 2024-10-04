var Sr=Object.defineProperty;var kr=(n,t,e)=>t in n?Sr(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var V=(n,t,e)=>kr(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const Nr=`<!DOCTYPE html>
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
    <script src="https://cdn.jsdelivr.net/npm/fflate@0.8.2/umd/index.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/excel-builder-vanilla@3.0.1/dist/excel-builder.iife.js"><\/script>

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
`,Or=`<div class="example01">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 01: Create Worksheet
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank"
               href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example01.html">html</a>
            |
            <a target="_blank"
               href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example01.ts">ts</a>
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
</div>`,Dr=`<div class="example02">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 02: Sizing/Collapsing Columns
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example02.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example02.ts">ts</a>
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
`,Lr=`<div class="example03">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 03: Setting row information
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank"
               href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example03.html">html</a>
            |
            <a target="_blank"
               href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example03.ts">ts</a>
          </span>
        </span>
      </h2>
      <div class="demo-subtitle">
        Set different row options via <code>setRowInstructions()</code> method. For example, we changed the row height
        of the first row and change the text style to italic.
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
</div>`,$r=`<div class="example04">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 04: Fonts and Colors
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example04.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example04.ts">ts</a>
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
`,Mr=`<div class="example05">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 05: Number, Date, etc Formatting
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example05.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example05.ts">ts</a>
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
`,Pr=`<div class="example06">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 06: Alignment
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example06.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example06.ts">ts</a>
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
`,Ir=`<div class="example07">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 07: Background Fillers
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example07.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example07.ts">ts</a>
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
`,Rr=`<div class="example08">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 08: Formulas
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example08.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example08.ts">ts</a>
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
`,Br=`<div class="example09">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 09: Tables
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example09.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example09.ts">ts</a>
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
`,Fr=`<div class="example10">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 10: Theming Tables
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example10.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example10.ts">ts</a>
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
`,Vr=`<div class="example11">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 11: Tables Summaries
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example11.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example11.ts">ts</a>
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
`,Wr=`<div class="example12">
  <div class="row">
    <div class="col-md-12 title-desc">
      <h2 class="bd-title">
        Example 12: Worksheet Headers/Footers
        <span class="float-end links">
          Code <span class="fa fa-link"></span>
          <span class="small">
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example12.html"
              >html</a
            >
            |
            <a target="_blank" href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example12.ts">ts</a>
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
`,Hr=`<div class="row mb-2">
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
&lt;!-- (IIFE Standalone Script) Latest compiled and minified JavaScript --&gt;
&lt;script type=&quot;module&quot; src=&quot;<span style="color:#880000">https://cdn.jsdelivr.net/npm/excel-builder-vanilla@3.0.1/dist/excel-builder.iife.js</span>&quot;&gt;&lt;/script&gt;

&lt;!-- (CJS Files <span style="color:#d63384">.cjs</span> extension) Latest compiled and minified JavaScript --&gt;
&lt;script src=&quot;<span style="color:#880000">https://cdn.jsdelivr.net/npm/excel-builder-vanilla@3.0.1/dist/excel-builder.cjs</span>&quot;&gt;&lt;/script&gt;</pre>
    </div>

    <quote>
      <b>Note:</b> the <code>excel-builder.iife.js</code> is the only dist bundle providing the <code>ExcelBuilder</code> on the
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
const { createWorkbook, Workbook } = require('excel-builder-vanilla');

// ESM
import { createWorkbook } from 'excel-builder-vanilla';

// use it
const artistWorkbook = createWorkbook(); // or new Workbook();
const albumList = artistWorkbook.createWorksheet({ name: 'Artists' });
albumList.setData(this.originalData);
</pre>
  </div>
</div>
`,li=`<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
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

<div class="template-body">
  <div class="panel-wm">
    <section id="panel-left" class="panel-wm-left">
      <ul class="well nav nav-pills nav-stacked">
        <!-- All Example Routes -->
      </ul>
    </section>

    <section class="panel-wm-content"></section>
  </div>
</div>
`;var K="top",Q="bottom",J="right",Y="left",Ye="auto",le=[K,Q,J,Y],Ft="start",te="end",ci="clippingParents",Fn="viewport",Yt="popper",di="reference",Cn=le.reduce(function(n,t){return n.concat([t+"-"+Ft,t+"-"+te])},[]),Vn=[].concat(le,[Ye]).reduce(function(n,t){return n.concat([t,t+"-"+Ft,t+"-"+te])},[]),hi="beforeRead",ui="read",pi="afterRead",fi="beforeMain",mi="main",gi="afterMain",bi="beforeWrite",vi="write",_i="afterWrite",Ei=[hi,ui,pi,fi,mi,gi,bi,vi,_i];function ft(n){return n?(n.nodeName||"").toLowerCase():null}function Z(n){if(n==null)return window;if(n.toString()!=="[object Window]"){var t=n.ownerDocument;return t&&t.defaultView||window}return n}function Vt(n){var t=Z(n).Element;return n instanceof t||n instanceof Element}function et(n){var t=Z(n).HTMLElement;return n instanceof t||n instanceof HTMLElement}function Wn(n){if(typeof ShadowRoot>"u")return!1;var t=Z(n).ShadowRoot;return n instanceof t||n instanceof ShadowRoot}function jr(n){var t=n.state;Object.keys(t.elements).forEach(function(e){var s=t.styles[e]||{},i=t.attributes[e]||{},r=t.elements[e];!et(r)||!ft(r)||(Object.assign(r.style,s),Object.keys(i).forEach(function(a){var o=i[a];o===!1?r.removeAttribute(a):r.setAttribute(a,o===!0?"":o)}))})}function zr(n){var t=n.state,e={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,e.popper),t.styles=e,t.elements.arrow&&Object.assign(t.elements.arrow.style,e.arrow),function(){Object.keys(t.elements).forEach(function(s){var i=t.elements[s],r=t.attributes[s]||{},a=Object.keys(t.styles.hasOwnProperty(s)?t.styles[s]:e[s]),o=a.reduce(function(l,d){return l[d]="",l},{});!et(i)||!ft(i)||(Object.assign(i.style,o),Object.keys(r).forEach(function(l){i.removeAttribute(l)}))})}}const Hn={name:"applyStyles",enabled:!0,phase:"write",fn:jr,effect:zr,requires:["computeStyles"]};function ut(n){return n.split("-")[0]}var Bt=Math.max,Ve=Math.min,ee=Math.round;function Tn(){var n=navigator.userAgentData;return n!=null&&n.brands&&Array.isArray(n.brands)?n.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function yi(){return!/^((?!chrome|android).)*safari/i.test(Tn())}function ne(n,t,e){t===void 0&&(t=!1),e===void 0&&(e=!1);var s=n.getBoundingClientRect(),i=1,r=1;t&&et(n)&&(i=n.offsetWidth>0&&ee(s.width)/n.offsetWidth||1,r=n.offsetHeight>0&&ee(s.height)/n.offsetHeight||1);var a=Vt(n)?Z(n):window,o=a.visualViewport,l=!yi()&&e,d=(s.left+(l&&o?o.offsetLeft:0))/i,c=(s.top+(l&&o?o.offsetTop:0))/r,b=s.width/i,v=s.height/r;return{width:b,height:v,top:c,right:d+b,bottom:c+v,left:d,x:d,y:c}}function jn(n){var t=ne(n),e=n.offsetWidth,s=n.offsetHeight;return Math.abs(t.width-e)<=1&&(e=t.width),Math.abs(t.height-s)<=1&&(s=t.height),{x:n.offsetLeft,y:n.offsetTop,width:e,height:s}}function wi(n,t){var e=t.getRootNode&&t.getRootNode();if(n.contains(t))return!0;if(e&&Wn(e)){var s=t;do{if(s&&n.isSameNode(s))return!0;s=s.parentNode||s.host}while(s)}return!1}function vt(n){return Z(n).getComputedStyle(n)}function qr(n){return["table","td","th"].indexOf(ft(n))>=0}function Nt(n){return((Vt(n)?n.ownerDocument:n.document)||window.document).documentElement}function Ue(n){return ft(n)==="html"?n:n.assignedSlot||n.parentNode||(Wn(n)?n.host:null)||Nt(n)}function vs(n){return!et(n)||vt(n).position==="fixed"?null:n.offsetParent}function Kr(n){var t=/firefox/i.test(Tn()),e=/Trident/i.test(Tn());if(e&&et(n)){var s=vt(n);if(s.position==="fixed")return null}var i=Ue(n);for(Wn(i)&&(i=i.host);et(i)&&["html","body"].indexOf(ft(i))<0;){var r=vt(i);if(r.transform!=="none"||r.perspective!=="none"||r.contain==="paint"||["transform","perspective"].indexOf(r.willChange)!==-1||t&&r.willChange==="filter"||t&&r.filter&&r.filter!=="none")return i;i=i.parentNode}return null}function Ee(n){for(var t=Z(n),e=vs(n);e&&qr(e)&&vt(e).position==="static";)e=vs(e);return e&&(ft(e)==="html"||ft(e)==="body"&&vt(e).position==="static")?t:e||Kr(n)||t}function zn(n){return["top","bottom"].indexOf(n)>=0?"x":"y"}function ge(n,t,e){return Bt(n,Ve(t,e))}function Yr(n,t,e){var s=ge(n,t,e);return s>e?e:s}function Ai(){return{top:0,right:0,bottom:0,left:0}}function xi(n){return Object.assign({},Ai(),n)}function Ci(n,t){return t.reduce(function(e,s){return e[s]=n,e},{})}var Ur=function(t,e){return t=typeof t=="function"?t(Object.assign({},e.rects,{placement:e.placement})):t,xi(typeof t!="number"?t:Ci(t,le))};function Xr(n){var t,e=n.state,s=n.name,i=n.options,r=e.elements.arrow,a=e.modifiersData.popperOffsets,o=ut(e.placement),l=zn(o),d=[Y,J].indexOf(o)>=0,c=d?"height":"width";if(!(!r||!a)){var b=Ur(i.padding,e),v=jn(r),p=l==="y"?K:Y,y=l==="y"?Q:J,m=e.rects.reference[c]+e.rects.reference[l]-a[l]-e.rects.popper[c],f=a[l]-e.rects.reference[l],_=Ee(r),C=_?l==="y"?_.clientHeight||0:_.clientWidth||0:0,k=m/2-f/2,g=b[p],T=C-v[c]-b[y],S=C/2-v[c]/2+k,N=ge(g,S,T),x=l;e.modifiersData[s]=(t={},t[x]=N,t.centerOffset=N-S,t)}}function Gr(n){var t=n.state,e=n.options,s=e.element,i=s===void 0?"[data-popper-arrow]":s;i!=null&&(typeof i=="string"&&(i=t.elements.popper.querySelector(i),!i)||wi(t.elements.popper,i)&&(t.elements.arrow=i))}const Ti={name:"arrow",enabled:!0,phase:"main",fn:Xr,effect:Gr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function se(n){return n.split("-")[1]}var Qr={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Jr(n,t){var e=n.x,s=n.y,i=t.devicePixelRatio||1;return{x:ee(e*i)/i||0,y:ee(s*i)/i||0}}function _s(n){var t,e=n.popper,s=n.popperRect,i=n.placement,r=n.variation,a=n.offsets,o=n.position,l=n.gpuAcceleration,d=n.adaptive,c=n.roundOffsets,b=n.isFixed,v=a.x,p=v===void 0?0:v,y=a.y,m=y===void 0?0:y,f=typeof c=="function"?c({x:p,y:m}):{x:p,y:m};p=f.x,m=f.y;var _=a.hasOwnProperty("x"),C=a.hasOwnProperty("y"),k=Y,g=K,T=window;if(d){var S=Ee(e),N="clientHeight",x="clientWidth";if(S===Z(e)&&(S=Nt(e),vt(S).position!=="static"&&o==="absolute"&&(N="scrollHeight",x="scrollWidth")),S=S,i===K||(i===Y||i===J)&&r===te){g=Q;var E=b&&S===T&&T.visualViewport?T.visualViewport.height:S[N];m-=E-s.height,m*=l?1:-1}if(i===Y||(i===K||i===Q)&&r===te){k=J;var O=b&&S===T&&T.visualViewport?T.visualViewport.width:S[x];p-=O-s.width,p*=l?1:-1}}var M=Object.assign({position:o},d&&Qr),L=c===!0?Jr({x:p,y:m},Z(e)):{x:p,y:m};if(p=L.x,m=L.y,l){var P;return Object.assign({},M,(P={},P[g]=C?"0":"",P[k]=_?"0":"",P.transform=(T.devicePixelRatio||1)<=1?"translate("+p+"px, "+m+"px)":"translate3d("+p+"px, "+m+"px, 0)",P))}return Object.assign({},M,(t={},t[g]=C?m+"px":"",t[k]=_?p+"px":"",t.transform="",t))}function Zr(n){var t=n.state,e=n.options,s=e.gpuAcceleration,i=s===void 0?!0:s,r=e.adaptive,a=r===void 0?!0:r,o=e.roundOffsets,l=o===void 0?!0:o,d={placement:ut(t.placement),variation:se(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,_s(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:l})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,_s(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const qn={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Zr,data:{}};var ke={passive:!0};function ta(n){var t=n.state,e=n.instance,s=n.options,i=s.scroll,r=i===void 0?!0:i,a=s.resize,o=a===void 0?!0:a,l=Z(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return r&&d.forEach(function(c){c.addEventListener("scroll",e.update,ke)}),o&&l.addEventListener("resize",e.update,ke),function(){r&&d.forEach(function(c){c.removeEventListener("scroll",e.update,ke)}),o&&l.removeEventListener("resize",e.update,ke)}}const Kn={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:ta,data:{}};var ea={left:"right",right:"left",bottom:"top",top:"bottom"};function Ie(n){return n.replace(/left|right|bottom|top/g,function(t){return ea[t]})}var na={start:"end",end:"start"};function Es(n){return n.replace(/start|end/g,function(t){return na[t]})}function Yn(n){var t=Z(n),e=t.pageXOffset,s=t.pageYOffset;return{scrollLeft:e,scrollTop:s}}function Un(n){return ne(Nt(n)).left+Yn(n).scrollLeft}function sa(n,t){var e=Z(n),s=Nt(n),i=e.visualViewport,r=s.clientWidth,a=s.clientHeight,o=0,l=0;if(i){r=i.width,a=i.height;var d=yi();(d||!d&&t==="fixed")&&(o=i.offsetLeft,l=i.offsetTop)}return{width:r,height:a,x:o+Un(n),y:l}}function ia(n){var t,e=Nt(n),s=Yn(n),i=(t=n.ownerDocument)==null?void 0:t.body,r=Bt(e.scrollWidth,e.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),a=Bt(e.scrollHeight,e.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),o=-s.scrollLeft+Un(n),l=-s.scrollTop;return vt(i||e).direction==="rtl"&&(o+=Bt(e.clientWidth,i?i.clientWidth:0)-r),{width:r,height:a,x:o,y:l}}function Xn(n){var t=vt(n),e=t.overflow,s=t.overflowX,i=t.overflowY;return/auto|scroll|overlay|hidden/.test(e+i+s)}function Si(n){return["html","body","#document"].indexOf(ft(n))>=0?n.ownerDocument.body:et(n)&&Xn(n)?n:Si(Ue(n))}function be(n,t){var e;t===void 0&&(t=[]);var s=Si(n),i=s===((e=n.ownerDocument)==null?void 0:e.body),r=Z(s),a=i?[r].concat(r.visualViewport||[],Xn(s)?s:[]):s,o=t.concat(a);return i?o:o.concat(be(Ue(a)))}function Sn(n){return Object.assign({},n,{left:n.x,top:n.y,right:n.x+n.width,bottom:n.y+n.height})}function ra(n,t){var e=ne(n,!1,t==="fixed");return e.top=e.top+n.clientTop,e.left=e.left+n.clientLeft,e.bottom=e.top+n.clientHeight,e.right=e.left+n.clientWidth,e.width=n.clientWidth,e.height=n.clientHeight,e.x=e.left,e.y=e.top,e}function ys(n,t,e){return t===Fn?Sn(sa(n,e)):Vt(t)?ra(t,e):Sn(ia(Nt(n)))}function aa(n){var t=be(Ue(n)),e=["absolute","fixed"].indexOf(vt(n).position)>=0,s=e&&et(n)?Ee(n):n;return Vt(s)?t.filter(function(i){return Vt(i)&&wi(i,s)&&ft(i)!=="body"}):[]}function oa(n,t,e,s){var i=t==="clippingParents"?aa(n):[].concat(t),r=[].concat(i,[e]),a=r[0],o=r.reduce(function(l,d){var c=ys(n,d,s);return l.top=Bt(c.top,l.top),l.right=Ve(c.right,l.right),l.bottom=Ve(c.bottom,l.bottom),l.left=Bt(c.left,l.left),l},ys(n,a,s));return o.width=o.right-o.left,o.height=o.bottom-o.top,o.x=o.left,o.y=o.top,o}function ki(n){var t=n.reference,e=n.element,s=n.placement,i=s?ut(s):null,r=s?se(s):null,a=t.x+t.width/2-e.width/2,o=t.y+t.height/2-e.height/2,l;switch(i){case K:l={x:a,y:t.y-e.height};break;case Q:l={x:a,y:t.y+t.height};break;case J:l={x:t.x+t.width,y:o};break;case Y:l={x:t.x-e.width,y:o};break;default:l={x:t.x,y:t.y}}var d=i?zn(i):null;if(d!=null){var c=d==="y"?"height":"width";switch(r){case Ft:l[d]=l[d]-(t[c]/2-e[c]/2);break;case te:l[d]=l[d]+(t[c]/2-e[c]/2);break}}return l}function ie(n,t){t===void 0&&(t={});var e=t,s=e.placement,i=s===void 0?n.placement:s,r=e.strategy,a=r===void 0?n.strategy:r,o=e.boundary,l=o===void 0?ci:o,d=e.rootBoundary,c=d===void 0?Fn:d,b=e.elementContext,v=b===void 0?Yt:b,p=e.altBoundary,y=p===void 0?!1:p,m=e.padding,f=m===void 0?0:m,_=xi(typeof f!="number"?f:Ci(f,le)),C=v===Yt?di:Yt,k=n.rects.popper,g=n.elements[y?C:v],T=oa(Vt(g)?g:g.contextElement||Nt(n.elements.popper),l,c,a),S=ne(n.elements.reference),N=ki({reference:S,element:k,strategy:"absolute",placement:i}),x=Sn(Object.assign({},k,N)),E=v===Yt?x:S,O={top:T.top-E.top+_.top,bottom:E.bottom-T.bottom+_.bottom,left:T.left-E.left+_.left,right:E.right-T.right+_.right},M=n.modifiersData.offset;if(v===Yt&&M){var L=M[i];Object.keys(O).forEach(function(P){var I=[J,Q].indexOf(P)>=0?1:-1,F=[K,Q].indexOf(P)>=0?"y":"x";O[P]+=L[F]*I})}return O}function la(n,t){t===void 0&&(t={});var e=t,s=e.placement,i=e.boundary,r=e.rootBoundary,a=e.padding,o=e.flipVariations,l=e.allowedAutoPlacements,d=l===void 0?Vn:l,c=se(s),b=c?o?Cn:Cn.filter(function(y){return se(y)===c}):le,v=b.filter(function(y){return d.indexOf(y)>=0});v.length===0&&(v=b);var p=v.reduce(function(y,m){return y[m]=ie(n,{placement:m,boundary:i,rootBoundary:r,padding:a})[ut(m)],y},{});return Object.keys(p).sort(function(y,m){return p[y]-p[m]})}function ca(n){if(ut(n)===Ye)return[];var t=Ie(n);return[Es(n),t,Es(t)]}function da(n){var t=n.state,e=n.options,s=n.name;if(!t.modifiersData[s]._skip){for(var i=e.mainAxis,r=i===void 0?!0:i,a=e.altAxis,o=a===void 0?!0:a,l=e.fallbackPlacements,d=e.padding,c=e.boundary,b=e.rootBoundary,v=e.altBoundary,p=e.flipVariations,y=p===void 0?!0:p,m=e.allowedAutoPlacements,f=t.options.placement,_=ut(f),C=_===f,k=l||(C||!y?[Ie(f)]:ca(f)),g=[f].concat(k).reduce(function(W,R){return W.concat(ut(R)===Ye?la(t,{placement:R,boundary:c,rootBoundary:b,padding:d,flipVariations:y,allowedAutoPlacements:m}):R)},[]),T=t.rects.reference,S=t.rects.popper,N=new Map,x=!0,E=g[0],O=0;O<g.length;O++){var M=g[O],L=ut(M),P=se(M)===Ft,I=[K,Q].indexOf(L)>=0,F=I?"width":"height",$=ie(t,{placement:M,boundary:c,rootBoundary:b,altBoundary:v,padding:d}),D=I?P?J:Y:P?Q:K;T[F]>S[F]&&(D=Ie(D));var z=Ie(D),q=[];if(r&&q.push($[L]<=0),o&&q.push($[D]<=0,$[z]<=0),q.every(function(W){return W})){E=M,x=!1;break}N.set(M,q)}if(x)for(var yt=y?3:1,U=function(R){var tt=g.find(function(Lt){var lt=N.get(Lt);if(lt)return lt.slice(0,R).every(function(ue){return ue})});if(tt)return E=tt,"break"},at=yt;at>0;at--){var ot=U(at);if(ot==="break")break}t.placement!==E&&(t.modifiersData[s]._skip=!0,t.placement=E,t.reset=!0)}}const Ni={name:"flip",enabled:!0,phase:"main",fn:da,requiresIfExists:["offset"],data:{_skip:!1}};function ws(n,t,e){return e===void 0&&(e={x:0,y:0}),{top:n.top-t.height-e.y,right:n.right-t.width+e.x,bottom:n.bottom-t.height+e.y,left:n.left-t.width-e.x}}function As(n){return[K,J,Q,Y].some(function(t){return n[t]>=0})}function ha(n){var t=n.state,e=n.name,s=t.rects.reference,i=t.rects.popper,r=t.modifiersData.preventOverflow,a=ie(t,{elementContext:"reference"}),o=ie(t,{altBoundary:!0}),l=ws(a,s),d=ws(o,i,r),c=As(l),b=As(d);t.modifiersData[e]={referenceClippingOffsets:l,popperEscapeOffsets:d,isReferenceHidden:c,hasPopperEscaped:b},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":b})}const Oi={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:ha};function ua(n,t,e){var s=ut(n),i=[Y,K].indexOf(s)>=0?-1:1,r=typeof e=="function"?e(Object.assign({},t,{placement:n})):e,a=r[0],o=r[1];return a=a||0,o=(o||0)*i,[Y,J].indexOf(s)>=0?{x:o,y:a}:{x:a,y:o}}function pa(n){var t=n.state,e=n.options,s=n.name,i=e.offset,r=i===void 0?[0,0]:i,a=Vn.reduce(function(c,b){return c[b]=ua(b,t.rects,r),c},{}),o=a[t.placement],l=o.x,d=o.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=d),t.modifiersData[s]=a}const Di={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:pa};function fa(n){var t=n.state,e=n.name;t.modifiersData[e]=ki({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Gn={name:"popperOffsets",enabled:!0,phase:"read",fn:fa,data:{}};function ma(n){return n==="x"?"y":"x"}function ga(n){var t=n.state,e=n.options,s=n.name,i=e.mainAxis,r=i===void 0?!0:i,a=e.altAxis,o=a===void 0?!1:a,l=e.boundary,d=e.rootBoundary,c=e.altBoundary,b=e.padding,v=e.tether,p=v===void 0?!0:v,y=e.tetherOffset,m=y===void 0?0:y,f=ie(t,{boundary:l,rootBoundary:d,padding:b,altBoundary:c}),_=ut(t.placement),C=se(t.placement),k=!C,g=zn(_),T=ma(g),S=t.modifiersData.popperOffsets,N=t.rects.reference,x=t.rects.popper,E=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,O=typeof E=="number"?{mainAxis:E,altAxis:E}:Object.assign({mainAxis:0,altAxis:0},E),M=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,L={x:0,y:0};if(S){if(r){var P,I=g==="y"?K:Y,F=g==="y"?Q:J,$=g==="y"?"height":"width",D=S[g],z=D+f[I],q=D-f[F],yt=p?-x[$]/2:0,U=C===Ft?N[$]:x[$],at=C===Ft?-x[$]:-N[$],ot=t.elements.arrow,W=p&&ot?jn(ot):{width:0,height:0},R=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ai(),tt=R[I],Lt=R[F],lt=ge(0,N[$],W[$]),ue=k?N[$]/2-yt-lt-tt-O.mainAxis:U-lt-tt-O.mainAxis,Ce=k?-N[$]/2+yt+lt+Lt+O.mainAxis:at+lt+Lt+O.mainAxis,jt=t.elements.arrow&&Ee(t.elements.arrow),Te=jt?g==="y"?jt.clientTop||0:jt.clientLeft||0:0,zt=(P=M==null?void 0:M[g])!=null?P:0,pe=D+ue-zt-Te,xr=D+Ce-zt,ds=ge(p?Ve(z,pe):z,D,p?Bt(q,xr):q);S[g]=ds,L[g]=ds-D}if(o){var hs,Cr=g==="x"?K:Y,Tr=g==="x"?Q:J,$t=S[T],Se=T==="y"?"height":"width",us=$t+f[Cr],ps=$t-f[Tr],on=[K,Y].indexOf(_)!==-1,fs=(hs=M==null?void 0:M[T])!=null?hs:0,ms=on?us:$t-N[Se]-x[Se]-fs+O.altAxis,gs=on?$t+N[Se]+x[Se]-fs-O.altAxis:ps,bs=p&&on?Yr(ms,$t,gs):ge(p?ms:us,$t,p?gs:ps);S[T]=bs,L[T]=bs-$t}t.modifiersData[s]=L}}const Li={name:"preventOverflow",enabled:!0,phase:"main",fn:ga,requiresIfExists:["offset"]};function ba(n){return{scrollLeft:n.scrollLeft,scrollTop:n.scrollTop}}function va(n){return n===Z(n)||!et(n)?Yn(n):ba(n)}function _a(n){var t=n.getBoundingClientRect(),e=ee(t.width)/n.offsetWidth||1,s=ee(t.height)/n.offsetHeight||1;return e!==1||s!==1}function Ea(n,t,e){e===void 0&&(e=!1);var s=et(t),i=et(t)&&_a(t),r=Nt(t),a=ne(n,i,e),o={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(s||!s&&!e)&&((ft(t)!=="body"||Xn(r))&&(o=va(t)),et(t)?(l=ne(t,!0),l.x+=t.clientLeft,l.y+=t.clientTop):r&&(l.x=Un(r))),{x:a.left+o.scrollLeft-l.x,y:a.top+o.scrollTop-l.y,width:a.width,height:a.height}}function ya(n){var t=new Map,e=new Set,s=[];n.forEach(function(r){t.set(r.name,r)});function i(r){e.add(r.name);var a=[].concat(r.requires||[],r.requiresIfExists||[]);a.forEach(function(o){if(!e.has(o)){var l=t.get(o);l&&i(l)}}),s.push(r)}return n.forEach(function(r){e.has(r.name)||i(r)}),s}function wa(n){var t=ya(n);return Ei.reduce(function(e,s){return e.concat(t.filter(function(i){return i.phase===s}))},[])}function Aa(n){var t;return function(){return t||(t=new Promise(function(e){Promise.resolve().then(function(){t=void 0,e(n())})})),t}}function xa(n){var t=n.reduce(function(e,s){var i=e[s.name];return e[s.name]=i?Object.assign({},i,s,{options:Object.assign({},i.options,s.options),data:Object.assign({},i.data,s.data)}):s,e},{});return Object.keys(t).map(function(e){return t[e]})}var xs={placement:"bottom",modifiers:[],strategy:"absolute"};function Cs(){for(var n=arguments.length,t=new Array(n),e=0;e<n;e++)t[e]=arguments[e];return!t.some(function(s){return!(s&&typeof s.getBoundingClientRect=="function")})}function Xe(n){n===void 0&&(n={});var t=n,e=t.defaultModifiers,s=e===void 0?[]:e,i=t.defaultOptions,r=i===void 0?xs:i;return function(o,l,d){d===void 0&&(d=r);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},xs,r),modifiersData:{},elements:{reference:o,popper:l},attributes:{},styles:{}},b=[],v=!1,p={state:c,setOptions:function(_){var C=typeof _=="function"?_(c.options):_;m(),c.options=Object.assign({},r,c.options,C),c.scrollParents={reference:Vt(o)?be(o):o.contextElement?be(o.contextElement):[],popper:be(l)};var k=wa(xa([].concat(s,c.options.modifiers)));return c.orderedModifiers=k.filter(function(g){return g.enabled}),y(),p.update()},forceUpdate:function(){if(!v){var _=c.elements,C=_.reference,k=_.popper;if(Cs(C,k)){c.rects={reference:Ea(C,Ee(k),c.options.strategy==="fixed"),popper:jn(k)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function(O){return c.modifiersData[O.name]=Object.assign({},O.data)});for(var g=0;g<c.orderedModifiers.length;g++){if(c.reset===!0){c.reset=!1,g=-1;continue}var T=c.orderedModifiers[g],S=T.fn,N=T.options,x=N===void 0?{}:N,E=T.name;typeof S=="function"&&(c=S({state:c,options:x,name:E,instance:p})||c)}}}},update:Aa(function(){return new Promise(function(f){p.forceUpdate(),f(c)})}),destroy:function(){m(),v=!0}};if(!Cs(o,l))return p;p.setOptions(d).then(function(f){!v&&d.onFirstUpdate&&d.onFirstUpdate(f)});function y(){c.orderedModifiers.forEach(function(f){var _=f.name,C=f.options,k=C===void 0?{}:C,g=f.effect;if(typeof g=="function"){var T=g({state:c,name:_,instance:p,options:k}),S=function(){};b.push(T||S)}})}function m(){b.forEach(function(f){return f()}),b=[]}return p}}var Ca=Xe(),Ta=[Kn,Gn,qn,Hn],Sa=Xe({defaultModifiers:Ta}),ka=[Kn,Gn,qn,Hn,Di,Ni,Li,Ti,Oi],Qn=Xe({defaultModifiers:ka});const $i=Object.freeze(Object.defineProperty({__proto__:null,afterMain:gi,afterRead:pi,afterWrite:_i,applyStyles:Hn,arrow:Ti,auto:Ye,basePlacements:le,beforeMain:fi,beforeRead:hi,beforeWrite:bi,bottom:Q,clippingParents:ci,computeStyles:qn,createPopper:Qn,createPopperBase:Ca,createPopperLite:Sa,detectOverflow:ie,end:te,eventListeners:Kn,flip:Ni,hide:Oi,left:Y,main:mi,modifierPhases:Ei,offset:Di,placements:Vn,popper:Yt,popperGenerator:Xe,popperOffsets:Gn,preventOverflow:Li,read:ui,reference:di,right:J,start:Ft,top:K,variationPlacements:Cn,viewport:Fn,write:vi},Symbol.toStringTag,{value:"Module"}));/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */const wt=new Map,ln={set(n,t,e){wt.has(n)||wt.set(n,new Map);const s=wt.get(n);if(!s.has(t)&&s.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`);return}s.set(t,e)},get(n,t){return wt.has(n)&&wt.get(n).get(t)||null},remove(n,t){if(!wt.has(n))return;const e=wt.get(n);e.delete(t),e.size===0&&wt.delete(n)}},Na=1e6,Oa=1e3,kn="transitionend",Mi=n=>(n&&window.CSS&&window.CSS.escape&&(n=n.replace(/#([^\s"#']+)/g,(t,e)=>`#${CSS.escape(e)}`)),n),Da=n=>n==null?`${n}`:Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase(),La=n=>{do n+=Math.floor(Math.random()*Na);while(document.getElementById(n));return n},$a=n=>{if(!n)return 0;let{transitionDuration:t,transitionDelay:e}=window.getComputedStyle(n);const s=Number.parseFloat(t),i=Number.parseFloat(e);return!s&&!i?0:(t=t.split(",")[0],e=e.split(",")[0],(Number.parseFloat(t)+Number.parseFloat(e))*Oa)},Pi=n=>{n.dispatchEvent(new Event(kn))},gt=n=>!n||typeof n!="object"?!1:(typeof n.jquery<"u"&&(n=n[0]),typeof n.nodeType<"u"),Ct=n=>gt(n)?n.jquery?n[0]:n:typeof n=="string"&&n.length>0?document.querySelector(Mi(n)):null,ce=n=>{if(!gt(n)||n.getClientRects().length===0)return!1;const t=getComputedStyle(n).getPropertyValue("visibility")==="visible",e=n.closest("details:not([open])");if(!e)return t;if(e!==n){const s=n.closest("summary");if(s&&s.parentNode!==e||s===null)return!1}return t},Tt=n=>!n||n.nodeType!==Node.ELEMENT_NODE||n.classList.contains("disabled")?!0:typeof n.disabled<"u"?n.disabled:n.hasAttribute("disabled")&&n.getAttribute("disabled")!=="false",Ii=n=>{if(!document.documentElement.attachShadow)return null;if(typeof n.getRootNode=="function"){const t=n.getRootNode();return t instanceof ShadowRoot?t:null}return n instanceof ShadowRoot?n:n.parentNode?Ii(n.parentNode):null},We=()=>{},ye=n=>{n.offsetHeight},Ri=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,cn=[],Ma=n=>{document.readyState==="loading"?(cn.length||document.addEventListener("DOMContentLoaded",()=>{for(const t of cn)t()}),cn.push(n)):n()},nt=()=>document.documentElement.dir==="rtl",it=n=>{Ma(()=>{const t=Ri();if(t){const e=n.NAME,s=t.fn[e];t.fn[e]=n.jQueryInterface,t.fn[e].Constructor=n,t.fn[e].noConflict=()=>(t.fn[e]=s,n.jQueryInterface)}})},X=(n,t=[],e=n)=>typeof n=="function"?n(...t):e,Bi=(n,t,e=!0)=>{if(!e){X(n);return}const i=$a(t)+5;let r=!1;const a=({target:o})=>{o===t&&(r=!0,t.removeEventListener(kn,a),X(n))};t.addEventListener(kn,a),setTimeout(()=>{r||Pi(t)},i)},Jn=(n,t,e,s)=>{const i=n.length;let r=n.indexOf(t);return r===-1?!e&&s?n[i-1]:n[0]:(r+=e?1:-1,s&&(r=(r+i)%i),n[Math.max(0,Math.min(r,i-1))])},Pa=/[^.]*(?=\..*)\.|.*/,Ia=/\..*/,Ra=/::\d+$/,dn={};let Ts=1;const Fi={mouseenter:"mouseover",mouseleave:"mouseout"},Ba=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function Vi(n,t){return t&&`${t}::${Ts++}`||n.uidEvent||Ts++}function Wi(n){const t=Vi(n);return n.uidEvent=t,dn[t]=dn[t]||{},dn[t]}function Fa(n,t){return function e(s){return Zn(s,{delegateTarget:n}),e.oneOff&&u.off(n,s.type,t),t.apply(n,[s])}}function Va(n,t,e){return function s(i){const r=n.querySelectorAll(t);for(let{target:a}=i;a&&a!==this;a=a.parentNode)for(const o of r)if(o===a)return Zn(i,{delegateTarget:a}),s.oneOff&&u.off(n,i.type,t,e),e.apply(a,[i])}}function Hi(n,t,e=null){return Object.values(n).find(s=>s.callable===t&&s.delegationSelector===e)}function ji(n,t,e){const s=typeof t=="string",i=s?e:t||e;let r=zi(n);return Ba.has(r)||(r=n),[s,i,r]}function Ss(n,t,e,s,i){if(typeof t!="string"||!n)return;let[r,a,o]=ji(t,e,s);t in Fi&&(a=(y=>function(m){if(!m.relatedTarget||m.relatedTarget!==m.delegateTarget&&!m.delegateTarget.contains(m.relatedTarget))return y.call(this,m)})(a));const l=Wi(n),d=l[o]||(l[o]={}),c=Hi(d,a,r?e:null);if(c){c.oneOff=c.oneOff&&i;return}const b=Vi(a,t.replace(Pa,"")),v=r?Va(n,e,a):Fa(n,a);v.delegationSelector=r?e:null,v.callable=a,v.oneOff=i,v.uidEvent=b,d[b]=v,n.addEventListener(o,v,r)}function Nn(n,t,e,s,i){const r=Hi(t[e],s,i);r&&(n.removeEventListener(e,r,!!i),delete t[e][r.uidEvent])}function Wa(n,t,e,s){const i=t[e]||{};for(const[r,a]of Object.entries(i))r.includes(s)&&Nn(n,t,e,a.callable,a.delegationSelector)}function zi(n){return n=n.replace(Ia,""),Fi[n]||n}const u={on(n,t,e,s){Ss(n,t,e,s,!1)},one(n,t,e,s){Ss(n,t,e,s,!0)},off(n,t,e,s){if(typeof t!="string"||!n)return;const[i,r,a]=ji(t,e,s),o=a!==t,l=Wi(n),d=l[a]||{},c=t.startsWith(".");if(typeof r<"u"){if(!Object.keys(d).length)return;Nn(n,l,a,r,i?e:null);return}if(c)for(const b of Object.keys(l))Wa(n,l,b,t.slice(1));for(const[b,v]of Object.entries(d)){const p=b.replace(Ra,"");(!o||t.includes(p))&&Nn(n,l,a,v.callable,v.delegationSelector)}},trigger(n,t,e){if(typeof t!="string"||!n)return null;const s=Ri(),i=zi(t),r=t!==i;let a=null,o=!0,l=!0,d=!1;r&&s&&(a=s.Event(t,e),s(n).trigger(a),o=!a.isPropagationStopped(),l=!a.isImmediatePropagationStopped(),d=a.isDefaultPrevented());const c=Zn(new Event(t,{bubbles:o,cancelable:!0}),e);return d&&c.preventDefault(),l&&n.dispatchEvent(c),c.defaultPrevented&&a&&a.preventDefault(),c}};function Zn(n,t={}){for(const[e,s]of Object.entries(t))try{n[e]=s}catch{Object.defineProperty(n,e,{configurable:!0,get(){return s}})}return n}function ks(n){if(n==="true")return!0;if(n==="false")return!1;if(n===Number(n).toString())return Number(n);if(n===""||n==="null")return null;if(typeof n!="string")return n;try{return JSON.parse(decodeURIComponent(n))}catch{return n}}function hn(n){return n.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}const bt={setDataAttribute(n,t,e){n.setAttribute(`data-bs-${hn(t)}`,e)},removeDataAttribute(n,t){n.removeAttribute(`data-bs-${hn(t)}`)},getDataAttributes(n){if(!n)return{};const t={},e=Object.keys(n.dataset).filter(s=>s.startsWith("bs")&&!s.startsWith("bsConfig"));for(const s of e){let i=s.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),t[i]=ks(n.dataset[s])}return t},getDataAttribute(n,t){return ks(n.getAttribute(`data-bs-${hn(t)}`))}};class we{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const s=gt(e)?bt.getDataAttribute(e,"config"):{};return{...this.constructor.Default,...typeof s=="object"?s:{},...gt(e)?bt.getDataAttributes(e):{},...typeof t=="object"?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const[s,i]of Object.entries(e)){const r=t[s],a=gt(r)?"element":Da(r);if(!new RegExp(i).test(a))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${a}" but expected type "${i}".`)}}}const Ha="5.3.3";class ct extends we{constructor(t,e){super(),t=Ct(t),t&&(this._element=t,this._config=this._getConfig(e),ln.set(this._element,this.constructor.DATA_KEY,this))}dispose(){ln.remove(this._element,this.constructor.DATA_KEY),u.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,s=!0){Bi(t,e,s)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return ln.get(Ct(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,typeof e=="object"?e:null)}static get VERSION(){return Ha}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}}const un=n=>{let t=n.getAttribute("data-bs-target");if(!t||t==="#"){let e=n.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;e.includes("#")&&!e.startsWith("#")&&(e=`#${e.split("#")[1]}`),t=e&&e!=="#"?e.trim():null}return t?t.split(",").map(e=>Mi(e)).join(","):null},A={find(n,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,n))},findOne(n,t=document.documentElement){return Element.prototype.querySelector.call(t,n)},children(n,t){return[].concat(...n.children).filter(e=>e.matches(t))},parents(n,t){const e=[];let s=n.parentNode.closest(t);for(;s;)e.push(s),s=s.parentNode.closest(t);return e},prev(n,t){let e=n.previousElementSibling;for(;e;){if(e.matches(t))return[e];e=e.previousElementSibling}return[]},next(n,t){let e=n.nextElementSibling;for(;e;){if(e.matches(t))return[e];e=e.nextElementSibling}return[]},focusableChildren(n){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(e=>`${e}:not([tabindex^="-"])`).join(",");return this.find(t,n).filter(e=>!Tt(e)&&ce(e))},getSelectorFromElement(n){const t=un(n);return t&&A.findOne(t)?t:null},getElementFromSelector(n){const t=un(n);return t?A.findOne(t):null},getMultipleElementsFromSelector(n){const t=un(n);return t?A.find(t):[]}},Ge=(n,t="hide")=>{const e=`click.dismiss${n.EVENT_KEY}`,s=n.NAME;u.on(document,e,`[data-bs-dismiss="${s}"]`,function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),Tt(this))return;const r=A.getElementFromSelector(this)||this.closest(`.${s}`);n.getOrCreateInstance(r)[t]()})},ja="alert",za="bs.alert",qi=`.${za}`,qa=`close${qi}`,Ka=`closed${qi}`,Ya="fade",Ua="show";class Qe extends ct{static get NAME(){return ja}close(){if(u.trigger(this._element,qa).defaultPrevented)return;this._element.classList.remove(Ua);const e=this._element.classList.contains(Ya);this._queueCallback(()=>this._destroyElement(),this._element,e)}_destroyElement(){this._element.remove(),u.trigger(this._element,Ka),this.dispose()}static jQueryInterface(t){return this.each(function(){const e=Qe.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}Ge(Qe,"close");it(Qe);const Xa="button",Ga="bs.button",Qa=`.${Ga}`,Ja=".data-api",Za="active",Ns='[data-bs-toggle="button"]',to=`click${Qa}${Ja}`;class Je extends ct{static get NAME(){return Xa}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle(Za))}static jQueryInterface(t){return this.each(function(){const e=Je.getOrCreateInstance(this);t==="toggle"&&e[t]()})}}u.on(document,to,Ns,n=>{n.preventDefault();const t=n.target.closest(Ns);Je.getOrCreateInstance(t).toggle()});it(Je);const eo="swipe",de=".bs.swipe",no=`touchstart${de}`,so=`touchmove${de}`,io=`touchend${de}`,ro=`pointerdown${de}`,ao=`pointerup${de}`,oo="touch",lo="pen",co="pointer-event",ho=40,uo={endCallback:null,leftCallback:null,rightCallback:null},po={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class He extends we{constructor(t,e){super(),this._element=t,!(!t||!He.isSupported())&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return uo}static get DefaultType(){return po}static get NAME(){return eo}dispose(){u.off(this._element,de)}_start(t){if(!this._supportPointerEvents){this._deltaX=t.touches[0].clientX;return}this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX)}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),X(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=ho)return;const e=t/this._deltaX;this._deltaX=0,e&&X(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(u.on(this._element,ro,t=>this._start(t)),u.on(this._element,ao,t=>this._end(t)),this._element.classList.add(co)):(u.on(this._element,no,t=>this._start(t)),u.on(this._element,so,t=>this._move(t)),u.on(this._element,io,t=>this._end(t)))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&(t.pointerType===lo||t.pointerType===oo)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const fo="carousel",mo="bs.carousel",Ot=`.${mo}`,Ki=".data-api",go="ArrowLeft",bo="ArrowRight",vo=500,fe="next",qt="prev",Ut="left",Re="right",_o=`slide${Ot}`,pn=`slid${Ot}`,Eo=`keydown${Ot}`,yo=`mouseenter${Ot}`,wo=`mouseleave${Ot}`,Ao=`dragstart${Ot}`,xo=`load${Ot}${Ki}`,Co=`click${Ot}${Ki}`,Yi="carousel",Ne="active",To="slide",So="carousel-item-end",ko="carousel-item-start",No="carousel-item-next",Oo="carousel-item-prev",Ui=".active",Xi=".carousel-item",Do=Ui+Xi,Lo=".carousel-item img",$o=".carousel-indicators",Mo="[data-bs-slide], [data-bs-slide-to]",Po='[data-bs-ride="carousel"]',Io={[go]:Re,[bo]:Ut},Ro={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},Bo={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class Ae extends ct{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=A.findOne($o,this._element),this._addEventListeners(),this._config.ride===Yi&&this.cycle()}static get Default(){return Ro}static get DefaultType(){return Bo}static get NAME(){return fo}next(){this._slide(fe)}nextWhenVisible(){!document.hidden&&ce(this._element)&&this.next()}prev(){this._slide(qt)}pause(){this._isSliding&&Pi(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){if(this._config.ride){if(this._isSliding){u.one(this._element,pn,()=>this.cycle());return}this.cycle()}}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding){u.one(this._element,pn,()=>this.to(t));return}const s=this._getItemIndex(this._getActive());if(s===t)return;const i=t>s?fe:qt;this._slide(i,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&u.on(this._element,Eo,t=>this._keydown(t)),this._config.pause==="hover"&&(u.on(this._element,yo,()=>this.pause()),u.on(this._element,wo,()=>this._maybeEnableCycle())),this._config.touch&&He.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const s of A.find(Lo,this._element))u.on(s,Ao,i=>i.preventDefault());const e={leftCallback:()=>this._slide(this._directionToOrder(Ut)),rightCallback:()=>this._slide(this._directionToOrder(Re)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),vo+this._config.interval))}};this._swipeHelper=new He(this._element,e)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=Io[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=A.findOne(Ui,this._indicatorsElement);e.classList.remove(Ne),e.removeAttribute("aria-current");const s=A.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);s&&(s.classList.add(Ne),s.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const s=this._getActive(),i=t===fe,r=e||Jn(this._getItems(),s,i,this._config.wrap);if(r===s)return;const a=this._getItemIndex(r),o=p=>u.trigger(this._element,p,{relatedTarget:r,direction:this._orderToDirection(t),from:this._getItemIndex(s),to:a});if(o(_o).defaultPrevented||!s||!r)return;const d=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(a),this._activeElement=r;const c=i?ko:So,b=i?No:Oo;r.classList.add(b),ye(r),s.classList.add(c),r.classList.add(c);const v=()=>{r.classList.remove(c,b),r.classList.add(Ne),s.classList.remove(Ne,b,c),this._isSliding=!1,o(pn)};this._queueCallback(v,s,this._isAnimated()),d&&this.cycle()}_isAnimated(){return this._element.classList.contains(To)}_getActive(){return A.findOne(Do,this._element)}_getItems(){return A.find(Xi,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return nt()?t===Ut?qt:fe:t===Ut?fe:qt}_orderToDirection(t){return nt()?t===qt?Ut:Re:t===qt?Re:Ut}static jQueryInterface(t){return this.each(function(){const e=Ae.getOrCreateInstance(this,t);if(typeof t=="number"){e.to(t);return}if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(document,Co,Mo,function(n){const t=A.getElementFromSelector(this);if(!t||!t.classList.contains(Yi))return;n.preventDefault();const e=Ae.getOrCreateInstance(t),s=this.getAttribute("data-bs-slide-to");if(s){e.to(s),e._maybeEnableCycle();return}if(bt.getDataAttribute(this,"slide")==="next"){e.next(),e._maybeEnableCycle();return}e.prev(),e._maybeEnableCycle()});u.on(window,xo,()=>{const n=A.find(Po);for(const t of n)Ae.getOrCreateInstance(t)});it(Ae);const Fo="collapse",Vo="bs.collapse",xe=`.${Vo}`,Wo=".data-api",Ho=`show${xe}`,jo=`shown${xe}`,zo=`hide${xe}`,qo=`hidden${xe}`,Ko=`click${xe}${Wo}`,fn="show",Jt="collapse",Oe="collapsing",Yo="collapsed",Uo=`:scope .${Jt} .${Jt}`,Xo="collapse-horizontal",Go="width",Qo="height",Jo=".collapse.show, .collapse.collapsing",On='[data-bs-toggle="collapse"]',Zo={parent:null,toggle:!0},tl={parent:"(null|element)",toggle:"boolean"};class ve extends ct{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const s=A.find(On);for(const i of s){const r=A.getSelectorFromElement(i),a=A.find(r).filter(o=>o===this._element);r!==null&&a.length&&this._triggerArray.push(i)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return Zo}static get DefaultType(){return tl}static get NAME(){return Fo}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(Jo).filter(o=>o!==this._element).map(o=>ve.getOrCreateInstance(o,{toggle:!1}))),t.length&&t[0]._isTransitioning||u.trigger(this._element,Ho).defaultPrevented)return;for(const o of t)o.hide();const s=this._getDimension();this._element.classList.remove(Jt),this._element.classList.add(Oe),this._element.style[s]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=()=>{this._isTransitioning=!1,this._element.classList.remove(Oe),this._element.classList.add(Jt,fn),this._element.style[s]="",u.trigger(this._element,jo)},a=`scroll${s[0].toUpperCase()+s.slice(1)}`;this._queueCallback(i,this._element,!0),this._element.style[s]=`${this._element[a]}px`}hide(){if(this._isTransitioning||!this._isShown()||u.trigger(this._element,zo).defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,ye(this._element),this._element.classList.add(Oe),this._element.classList.remove(Jt,fn);for(const i of this._triggerArray){const r=A.getElementFromSelector(i);r&&!this._isShown(r)&&this._addAriaAndCollapsedClass([i],!1)}this._isTransitioning=!0;const s=()=>{this._isTransitioning=!1,this._element.classList.remove(Oe),this._element.classList.add(Jt),u.trigger(this._element,qo)};this._element.style[e]="",this._queueCallback(s,this._element,!0)}_isShown(t=this._element){return t.classList.contains(fn)}_configAfterMerge(t){return t.toggle=!!t.toggle,t.parent=Ct(t.parent),t}_getDimension(){return this._element.classList.contains(Xo)?Go:Qo}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(On);for(const e of t){const s=A.getElementFromSelector(e);s&&this._addAriaAndCollapsedClass([e],this._isShown(s))}}_getFirstLevelChildren(t){const e=A.find(Uo,this._config.parent);return A.find(t,this._config.parent).filter(s=>!e.includes(s))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const s of t)s.classList.toggle(Yo,!e),s.setAttribute("aria-expanded",e)}static jQueryInterface(t){const e={};return typeof t=="string"&&/show|hide/.test(t)&&(e.toggle=!1),this.each(function(){const s=ve.getOrCreateInstance(this,e);if(typeof t=="string"){if(typeof s[t]>"u")throw new TypeError(`No method named "${t}"`);s[t]()}})}}u.on(document,Ko,On,function(n){(n.target.tagName==="A"||n.delegateTarget&&n.delegateTarget.tagName==="A")&&n.preventDefault();for(const t of A.getMultipleElementsFromSelector(this))ve.getOrCreateInstance(t,{toggle:!1}).toggle()});it(ve);const Os="dropdown",el="bs.dropdown",Wt=`.${el}`,ts=".data-api",nl="Escape",Ds="Tab",sl="ArrowUp",Ls="ArrowDown",il=2,rl=`hide${Wt}`,al=`hidden${Wt}`,ol=`show${Wt}`,ll=`shown${Wt}`,Gi=`click${Wt}${ts}`,Qi=`keydown${Wt}${ts}`,cl=`keyup${Wt}${ts}`,Xt="show",dl="dropup",hl="dropend",ul="dropstart",pl="dropup-center",fl="dropdown-center",It='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',ml=`${It}.${Xt}`,Be=".dropdown-menu",gl=".navbar",bl=".navbar-nav",vl=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",_l=nt()?"top-end":"top-start",El=nt()?"top-start":"top-end",yl=nt()?"bottom-end":"bottom-start",wl=nt()?"bottom-start":"bottom-end",Al=nt()?"left-start":"right-start",xl=nt()?"right-start":"left-start",Cl="top",Tl="bottom",Sl={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},kl={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class pt extends ct{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=A.next(this._element,Be)[0]||A.prev(this._element,Be)[0]||A.findOne(Be,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return Sl}static get DefaultType(){return kl}static get NAME(){return Os}toggle(){return this._isShown()?this.hide():this.show()}show(){if(Tt(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!u.trigger(this._element,ol,t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(bl))for(const s of[].concat(...document.body.children))u.on(s,"mouseover",We);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Xt),this._element.classList.add(Xt),u.trigger(this._element,ll,t)}}hide(){if(Tt(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){if(!u.trigger(this._element,rl,t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const s of[].concat(...document.body.children))u.off(s,"mouseover",We);this._popper&&this._popper.destroy(),this._menu.classList.remove(Xt),this._element.classList.remove(Xt),this._element.setAttribute("aria-expanded","false"),bt.removeDataAttribute(this._menu,"popper"),u.trigger(this._element,al,t)}}_getConfig(t){if(t=super._getConfig(t),typeof t.reference=="object"&&!gt(t.reference)&&typeof t.reference.getBoundingClientRect!="function")throw new TypeError(`${Os.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(typeof $i>"u")throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let t=this._element;this._config.reference==="parent"?t=this._parent:gt(this._config.reference)?t=Ct(this._config.reference):typeof this._config.reference=="object"&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=Qn(t,this._menu,e)}_isShown(){return this._menu.classList.contains(Xt)}_getPlacement(){const t=this._parent;if(t.classList.contains(hl))return Al;if(t.classList.contains(ul))return xl;if(t.classList.contains(pl))return Cl;if(t.classList.contains(fl))return Tl;const e=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return t.classList.contains(dl)?e?El:_l:e?wl:yl}_detectNavbar(){return this._element.closest(gl)!==null}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(bt.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,...X(this._config.popperConfig,[t])}}_selectMenuItem({key:t,target:e}){const s=A.find(vl,this._menu).filter(i=>ce(i));s.length&&Jn(s,e,t===Ls,!s.includes(e)).focus()}static jQueryInterface(t){return this.each(function(){const e=pt.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}static clearMenus(t){if(t.button===il||t.type==="keyup"&&t.key!==Ds)return;const e=A.find(ml);for(const s of e){const i=pt.getInstance(s);if(!i||i._config.autoClose===!1)continue;const r=t.composedPath(),a=r.includes(i._menu);if(r.includes(i._element)||i._config.autoClose==="inside"&&!a||i._config.autoClose==="outside"&&a||i._menu.contains(t.target)&&(t.type==="keyup"&&t.key===Ds||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const o={relatedTarget:i._element};t.type==="click"&&(o.clickEvent=t),i._completeHide(o)}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),s=t.key===nl,i=[sl,Ls].includes(t.key);if(!i&&!s||e&&!s)return;t.preventDefault();const r=this.matches(It)?this:A.prev(this,It)[0]||A.next(this,It)[0]||A.findOne(It,t.delegateTarget.parentNode),a=pt.getOrCreateInstance(r);if(i){t.stopPropagation(),a.show(),a._selectMenuItem(t);return}a._isShown()&&(t.stopPropagation(),a.hide(),r.focus())}}u.on(document,Qi,It,pt.dataApiKeydownHandler);u.on(document,Qi,Be,pt.dataApiKeydownHandler);u.on(document,Gi,pt.clearMenus);u.on(document,cl,pt.clearMenus);u.on(document,Gi,It,function(n){n.preventDefault(),pt.getOrCreateInstance(this).toggle()});it(pt);const Ji="backdrop",Nl="fade",$s="show",Ms=`mousedown.bs.${Ji}`,Ol={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},Dl={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class Zi extends we{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return Ol}static get DefaultType(){return Dl}static get NAME(){return Ji}show(t){if(!this._config.isVisible){X(t);return}this._append();const e=this._getElement();this._config.isAnimated&&ye(e),e.classList.add($s),this._emulateAnimation(()=>{X(t)})}hide(t){if(!this._config.isVisible){X(t);return}this._getElement().classList.remove($s),this._emulateAnimation(()=>{this.dispose(),X(t)})}dispose(){this._isAppended&&(u.off(this._element,Ms),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add(Nl),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=Ct(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),u.on(t,Ms,()=>{X(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(t){Bi(t,this._getElement(),this._config.isAnimated)}}const Ll="focustrap",$l="bs.focustrap",je=`.${$l}`,Ml=`focusin${je}`,Pl=`keydown.tab${je}`,Il="Tab",Rl="forward",Ps="backward",Bl={autofocus:!0,trapElement:null},Fl={autofocus:"boolean",trapElement:"element"};class tr extends we{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return Bl}static get DefaultType(){return Fl}static get NAME(){return Ll}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),u.off(document,je),u.on(document,Ml,t=>this._handleFocusin(t)),u.on(document,Pl,t=>this._handleKeydown(t)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,u.off(document,je))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const s=A.focusableChildren(e);s.length===0?e.focus():this._lastTabNavDirection===Ps?s[s.length-1].focus():s[0].focus()}_handleKeydown(t){t.key===Il&&(this._lastTabNavDirection=t.shiftKey?Ps:Rl)}}const Is=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",Rs=".sticky-top",De="padding-right",Bs="margin-right";class Dn{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,De,e=>e+t),this._setElementAttributes(Is,De,e=>e+t),this._setElementAttributes(Rs,Bs,e=>e-t)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,De),this._resetElementAttributes(Is,De),this._resetElementAttributes(Rs,Bs)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,s){const i=this.getWidth(),r=a=>{if(a!==this._element&&window.innerWidth>a.clientWidth+i)return;this._saveInitialAttribute(a,e);const o=window.getComputedStyle(a).getPropertyValue(e);a.style.setProperty(e,`${s(Number.parseFloat(o))}px`)};this._applyManipulationCallback(t,r)}_saveInitialAttribute(t,e){const s=t.style.getPropertyValue(e);s&&bt.setDataAttribute(t,e,s)}_resetElementAttributes(t,e){const s=i=>{const r=bt.getDataAttribute(i,e);if(r===null){i.style.removeProperty(e);return}bt.removeDataAttribute(i,e),i.style.setProperty(e,r)};this._applyManipulationCallback(t,s)}_applyManipulationCallback(t,e){if(gt(t)){e(t);return}for(const s of A.find(t,this._element))e(s)}}const Vl="modal",Wl="bs.modal",st=`.${Wl}`,Hl=".data-api",jl="Escape",zl=`hide${st}`,ql=`hidePrevented${st}`,er=`hidden${st}`,nr=`show${st}`,Kl=`shown${st}`,Yl=`resize${st}`,Ul=`click.dismiss${st}`,Xl=`mousedown.dismiss${st}`,Gl=`keydown.dismiss${st}`,Ql=`click${st}${Hl}`,Fs="modal-open",Jl="fade",Vs="show",mn="modal-static",Zl=".modal.show",tc=".modal-dialog",ec=".modal-body",nc='[data-bs-toggle="modal"]',sc={backdrop:!0,focus:!0,keyboard:!0},ic={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class re extends ct{constructor(t,e){super(t,e),this._dialog=A.findOne(tc,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new Dn,this._addEventListeners()}static get Default(){return sc}static get DefaultType(){return ic}static get NAME(){return Vl}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||u.trigger(this._element,nr,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(Fs),this._adjustDialog(),this._backdrop.show(()=>this._showElement(t)))}hide(){!this._isShown||this._isTransitioning||u.trigger(this._element,zl).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(Vs),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){u.off(window,st),u.off(this._dialog,st),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Zi({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new tr({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=A.findOne(ec,this._dialog);e&&(e.scrollTop=0),ye(this._element),this._element.classList.add(Vs);const s=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,u.trigger(this._element,Kl,{relatedTarget:t})};this._queueCallback(s,this._dialog,this._isAnimated())}_addEventListeners(){u.on(this._element,Gl,t=>{if(t.key===jl){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),u.on(window,Yl,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),u.on(this._element,Xl,t=>{u.one(this._element,Ul,e=>{if(!(this._element!==t.target||this._element!==e.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(Fs),this._resetAdjustments(),this._scrollBar.reset(),u.trigger(this._element,er)})}_isAnimated(){return this._element.classList.contains(Jl)}_triggerBackdropTransition(){if(u.trigger(this._element,ql).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,s=this._element.style.overflowY;s==="hidden"||this._element.classList.contains(mn)||(e||(this._element.style.overflowY="hidden"),this._element.classList.add(mn),this._queueCallback(()=>{this._element.classList.remove(mn),this._queueCallback(()=>{this._element.style.overflowY=s},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),s=e>0;if(s&&!t){const i=nt()?"paddingLeft":"paddingRight";this._element.style[i]=`${e}px`}if(!s&&t){const i=nt()?"paddingRight":"paddingLeft";this._element.style[i]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each(function(){const s=re.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof s[t]>"u")throw new TypeError(`No method named "${t}"`);s[t](e)}})}}u.on(document,Ql,nc,function(n){const t=A.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&n.preventDefault(),u.one(t,nr,i=>{i.defaultPrevented||u.one(t,er,()=>{ce(this)&&this.focus()})});const e=A.findOne(Zl);e&&re.getInstance(e).hide(),re.getOrCreateInstance(t).toggle(this)});Ge(re);it(re);const rc="offcanvas",ac="bs.offcanvas",Et=`.${ac}`,sr=".data-api",oc=`load${Et}${sr}`,lc="Escape",Ws="show",Hs="showing",js="hiding",cc="offcanvas-backdrop",ir=".offcanvas.show",dc=`show${Et}`,hc=`shown${Et}`,uc=`hide${Et}`,zs=`hidePrevented${Et}`,rr=`hidden${Et}`,pc=`resize${Et}`,fc=`click${Et}${sr}`,mc=`keydown.dismiss${Et}`,gc='[data-bs-toggle="offcanvas"]',bc={backdrop:!0,keyboard:!0,scroll:!1},vc={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class St extends ct{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return bc}static get DefaultType(){return vc}static get NAME(){return rc}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown||u.trigger(this._element,dc,{relatedTarget:t}).defaultPrevented)return;this._isShown=!0,this._backdrop.show(),this._config.scroll||new Dn().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(Hs);const s=()=>{(!this._config.scroll||this._config.backdrop)&&this._focustrap.activate(),this._element.classList.add(Ws),this._element.classList.remove(Hs),u.trigger(this._element,hc,{relatedTarget:t})};this._queueCallback(s,this._element,!0)}hide(){if(!this._isShown||u.trigger(this._element,uc).defaultPrevented)return;this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(js),this._backdrop.hide();const e=()=>{this._element.classList.remove(Ws,js),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new Dn().reset(),u.trigger(this._element,rr)};this._queueCallback(e,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=()=>{if(this._config.backdrop==="static"){u.trigger(this._element,zs);return}this.hide()},e=!!this._config.backdrop;return new Zi({className:cc,isVisible:e,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:e?t:null})}_initializeFocusTrap(){return new tr({trapElement:this._element})}_addEventListeners(){u.on(this._element,mc,t=>{if(t.key===lc){if(this._config.keyboard){this.hide();return}u.trigger(this._element,zs)}})}static jQueryInterface(t){return this.each(function(){const e=St.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}u.on(document,fc,gc,function(n){const t=A.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&n.preventDefault(),Tt(this))return;u.one(t,rr,()=>{ce(this)&&this.focus()});const e=A.findOne(ir);e&&e!==t&&St.getInstance(e).hide(),St.getOrCreateInstance(t).toggle(this)});u.on(window,oc,()=>{for(const n of A.find(ir))St.getOrCreateInstance(n).show()});u.on(window,pc,()=>{for(const n of A.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(n).position!=="fixed"&&St.getOrCreateInstance(n).hide()});Ge(St);it(St);const _c=/^aria-[\w-]*$/i,ar={"*":["class","dir","id","lang","role",_c],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Ec=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),yc=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,wc=(n,t)=>{const e=n.nodeName.toLowerCase();return t.includes(e)?Ec.has(e)?!!yc.test(n.nodeValue):!0:t.filter(s=>s instanceof RegExp).some(s=>s.test(e))};function Ac(n,t,e){if(!n.length)return n;if(e&&typeof e=="function")return e(n);const i=new window.DOMParser().parseFromString(n,"text/html"),r=[].concat(...i.body.querySelectorAll("*"));for(const a of r){const o=a.nodeName.toLowerCase();if(!Object.keys(t).includes(o)){a.remove();continue}const l=[].concat(...a.attributes),d=[].concat(t["*"]||[],t[o]||[]);for(const c of l)wc(c,d)||a.removeAttribute(c.nodeName)}return i.body.innerHTML}const xc="TemplateFactory",Cc={allowList:ar,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},Tc={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},Sc={entry:"(string|element|function|null)",selector:"(string|element)"};class kc extends we{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return Cc}static get DefaultType(){return Tc}static get NAME(){return xc}getContent(){return Object.values(this._config.content).map(t=>this._resolvePossibleFunction(t)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[i,r]of Object.entries(this._config.content))this._setContent(t,r,i);const e=t.children[0],s=this._resolvePossibleFunction(this._config.extraClass);return s&&e.classList.add(...s.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,s]of Object.entries(t))super._typeCheckConfig({selector:e,entry:s},Sc)}_setContent(t,e,s){const i=A.findOne(s,t);if(i){if(e=this._resolvePossibleFunction(e),!e){i.remove();return}if(gt(e)){this._putElementInTemplate(Ct(e),i);return}if(this._config.html){i.innerHTML=this._maybeSanitize(e);return}i.textContent=e}}_maybeSanitize(t){return this._config.sanitize?Ac(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return X(t,[this])}_putElementInTemplate(t,e){if(this._config.html){e.innerHTML="",e.append(t);return}e.textContent=t.textContent}}const Nc="tooltip",Oc=new Set(["sanitize","allowList","sanitizeFn"]),gn="fade",Dc="modal",Le="show",Lc=".tooltip-inner",qs=`.${Dc}`,Ks="hide.bs.modal",me="hover",bn="focus",$c="click",Mc="manual",Pc="hide",Ic="hidden",Rc="show",Bc="shown",Fc="inserted",Vc="click",Wc="focusin",Hc="focusout",jc="mouseenter",zc="mouseleave",qc={AUTO:"auto",TOP:"top",RIGHT:nt()?"left":"right",BOTTOM:"bottom",LEFT:nt()?"right":"left"},Kc={allowList:ar,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},Yc={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class he extends ct{constructor(t,e){if(typeof $i>"u")throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return Kc}static get DefaultType(){return Yc}static get NAME(){return Nc}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){if(this._isEnabled){if(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()){this._leave();return}this._enter()}}dispose(){clearTimeout(this._timeout),u.off(this._element.closest(qs),Ks,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!(this._isWithContent()&&this._isEnabled))return;const t=u.trigger(this._element,this.constructor.eventName(Rc)),s=(Ii(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!s)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:r}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(r.append(i),u.trigger(this._element,this.constructor.eventName(Fc))),this._popper=this._createPopper(i),i.classList.add(Le),"ontouchstart"in document.documentElement)for(const o of[].concat(...document.body.children))u.on(o,"mouseover",We);const a=()=>{u.trigger(this._element,this.constructor.eventName(Bc)),this._isHovered===!1&&this._leave(),this._isHovered=!1};this._queueCallback(a,this.tip,this._isAnimated())}hide(){if(!this._isShown()||u.trigger(this._element,this.constructor.eventName(Pc)).defaultPrevented)return;if(this._getTipElement().classList.remove(Le),"ontouchstart"in document.documentElement)for(const i of[].concat(...document.body.children))u.off(i,"mouseover",We);this._activeTrigger[$c]=!1,this._activeTrigger[bn]=!1,this._activeTrigger[me]=!1,this._isHovered=null;const s=()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),u.trigger(this._element,this.constructor.eventName(Ic)))};this._queueCallback(s,this.tip,this._isAnimated())}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(gn,Le),e.classList.add(`bs-${this.constructor.NAME}-auto`);const s=La(this.constructor.NAME).toString();return e.setAttribute("id",s),this._isAnimated()&&e.classList.add(gn),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new kc({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[Lc]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(gn)}_isShown(){return this.tip&&this.tip.classList.contains(Le)}_createPopper(t){const e=X(this._config.placement,[this,t,this._element]),s=qc[e.toUpperCase()];return Qn(this._element,t,this._getPopperConfig(s))}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_resolvePossibleFunction(t){return X(t,[this._element])}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:s=>{this._getTipElement().setAttribute("data-popper-placement",s.state.placement)}}]};return{...e,...X(this._config.popperConfig,[e])}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if(e==="click")u.on(this._element,this.constructor.eventName(Vc),this._config.selector,s=>{this._initializeOnDelegatedTarget(s).toggle()});else if(e!==Mc){const s=e===me?this.constructor.eventName(jc):this.constructor.eventName(Wc),i=e===me?this.constructor.eventName(zc):this.constructor.eventName(Hc);u.on(this._element,s,this._config.selector,r=>{const a=this._initializeOnDelegatedTarget(r);a._activeTrigger[r.type==="focusin"?bn:me]=!0,a._enter()}),u.on(this._element,i,this._config.selector,r=>{const a=this._initializeOnDelegatedTarget(r);a._activeTrigger[r.type==="focusout"?bn:me]=a._element.contains(r.relatedTarget),a._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},u.on(this._element.closest(qs),Ks,this._hideModalHandler)}_fixTitle(){const t=this._element.getAttribute("title");t&&(!this._element.getAttribute("aria-label")&&!this._element.textContent.trim()&&this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"))}_enter(){if(this._isShown()||this._isHovered){this._isHovered=!0;return}this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show)}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=bt.getDataAttributes(this._element);for(const s of Object.keys(e))Oc.has(s)&&delete e[s];return t={...e,...typeof t=="object"&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=t.container===!1?document.body:Ct(t.container),typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),typeof t.title=="number"&&(t.title=t.title.toString()),typeof t.content=="number"&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const[e,s]of Object.entries(this._config))this.constructor.Default[e]!==s&&(t[e]=s);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(t){return this.each(function(){const e=he.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}it(he);const Uc="popover",Xc=".popover-header",Gc=".popover-body",Qc={...he.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},Jc={...he.DefaultType,content:"(null|string|element|function)"};class es extends he{static get Default(){return Qc}static get DefaultType(){return Jc}static get NAME(){return Uc}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[Xc]:this._getTitle(),[Gc]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each(function(){const e=es.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}it(es);const Zc="scrollspy",td="bs.scrollspy",ns=`.${td}`,ed=".data-api",nd=`activate${ns}`,Ys=`click${ns}`,sd=`load${ns}${ed}`,id="dropdown-item",Kt="active",rd='[data-bs-spy="scroll"]',vn="[href]",ad=".nav, .list-group",Us=".nav-link",od=".nav-item",ld=".list-group-item",cd=`${Us}, ${od} > ${Us}, ${ld}`,dd=".dropdown",hd=".dropdown-toggle",ud={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},pd={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class Ze extends ct{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return ud}static get DefaultType(){return pd}static get NAME(){return Zc}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(t){return t.target=Ct(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,typeof t.threshold=="string"&&(t.threshold=t.threshold.split(",").map(e=>Number.parseFloat(e))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(u.off(this._config.target,Ys),u.on(this._config.target,Ys,vn,t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const s=this._rootElement||window,i=e.offsetTop-this._element.offsetTop;if(s.scrollTo){s.scrollTo({top:i,behavior:"smooth"});return}s.scrollTop=i}}))}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(e=>this._observerCallback(e),t)}_observerCallback(t){const e=a=>this._targetLinks.get(`#${a.target.id}`),s=a=>{this._previousScrollData.visibleEntryTop=a.target.offsetTop,this._process(e(a))},i=(this._rootElement||document.documentElement).scrollTop,r=i>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=i;for(const a of t){if(!a.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(a));continue}const o=a.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(r&&o){if(s(a),!i)return;continue}!r&&!o&&s(a)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=A.find(vn,this._config.target);for(const e of t){if(!e.hash||Tt(e))continue;const s=A.findOne(decodeURI(e.hash),this._element);ce(s)&&(this._targetLinks.set(decodeURI(e.hash),e),this._observableSections.set(e.hash,s))}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(Kt),this._activateParents(t),u.trigger(this._element,nd,{relatedTarget:t}))}_activateParents(t){if(t.classList.contains(id)){A.findOne(hd,t.closest(dd)).classList.add(Kt);return}for(const e of A.parents(t,ad))for(const s of A.prev(e,cd))s.classList.add(Kt)}_clearActiveClass(t){t.classList.remove(Kt);const e=A.find(`${vn}.${Kt}`,t);for(const s of e)s.classList.remove(Kt)}static jQueryInterface(t){return this.each(function(){const e=Ze.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(window,sd,()=>{for(const n of A.find(rd))Ze.getOrCreateInstance(n)});it(Ze);const fd="tab",md="bs.tab",Ht=`.${md}`,gd=`hide${Ht}`,bd=`hidden${Ht}`,vd=`show${Ht}`,_d=`shown${Ht}`,Ed=`click${Ht}`,yd=`keydown${Ht}`,wd=`load${Ht}`,Ad="ArrowLeft",Xs="ArrowRight",xd="ArrowUp",Gs="ArrowDown",_n="Home",Qs="End",Rt="active",Js="fade",En="show",Cd="dropdown",or=".dropdown-toggle",Td=".dropdown-menu",yn=`:not(${or})`,Sd='.list-group, .nav, [role="tablist"]',kd=".nav-item, .list-group-item",Nd=`.nav-link${yn}, .list-group-item${yn}, [role="tab"]${yn}`,lr='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',wn=`${Nd}, ${lr}`,Od=`.${Rt}[data-bs-toggle="tab"], .${Rt}[data-bs-toggle="pill"], .${Rt}[data-bs-toggle="list"]`;class ae extends ct{constructor(t){super(t),this._parent=this._element.closest(Sd),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),u.on(this._element,yd,e=>this._keydown(e)))}static get NAME(){return fd}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),s=e?u.trigger(e,gd,{relatedTarget:t}):null;u.trigger(t,vd,{relatedTarget:e}).defaultPrevented||s&&s.defaultPrevented||(this._deactivate(e,t),this._activate(t,e))}_activate(t,e){if(!t)return;t.classList.add(Rt),this._activate(A.getElementFromSelector(t));const s=()=>{if(t.getAttribute("role")!=="tab"){t.classList.add(En);return}t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),u.trigger(t,_d,{relatedTarget:e})};this._queueCallback(s,t,t.classList.contains(Js))}_deactivate(t,e){if(!t)return;t.classList.remove(Rt),t.blur(),this._deactivate(A.getElementFromSelector(t));const s=()=>{if(t.getAttribute("role")!=="tab"){t.classList.remove(En);return}t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),u.trigger(t,bd,{relatedTarget:e})};this._queueCallback(s,t,t.classList.contains(Js))}_keydown(t){if(![Ad,Xs,xd,Gs,_n,Qs].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=this._getChildren().filter(i=>!Tt(i));let s;if([_n,Qs].includes(t.key))s=e[t.key===_n?0:e.length-1];else{const i=[Xs,Gs].includes(t.key);s=Jn(e,t.target,i,!0)}s&&(s.focus({preventScroll:!0}),ae.getOrCreateInstance(s).show())}_getChildren(){return A.find(wn,this._parent)}_getActiveElem(){return this._getChildren().find(t=>this._elemIsActive(t))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const s of e)this._setInitialAttributesOnChild(s)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),s=this._getOuterElement(t);t.setAttribute("aria-selected",e),s!==t&&this._setAttributeIfNotExists(s,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){const e=A.getElementFromSelector(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,e){const s=this._getOuterElement(t);if(!s.classList.contains(Cd))return;const i=(r,a)=>{const o=A.findOne(r,s);o&&o.classList.toggle(a,e)};i(or,Rt),i(Td,En),s.setAttribute("aria-expanded",e)}_setAttributeIfNotExists(t,e,s){t.hasAttribute(e)||t.setAttribute(e,s)}_elemIsActive(t){return t.classList.contains(Rt)}_getInnerElement(t){return t.matches(wn)?t:A.findOne(wn,t)}_getOuterElement(t){return t.closest(kd)||t}static jQueryInterface(t){return this.each(function(){const e=ae.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(document,Ed,lr,function(n){["A","AREA"].includes(this.tagName)&&n.preventDefault(),!Tt(this)&&ae.getOrCreateInstance(this).show()});u.on(window,wd,()=>{for(const n of A.find(Od))ae.getOrCreateInstance(n)});it(ae);const Dd="toast",Ld="bs.toast",Dt=`.${Ld}`,$d=`mouseover${Dt}`,Md=`mouseout${Dt}`,Pd=`focusin${Dt}`,Id=`focusout${Dt}`,Rd=`hide${Dt}`,Bd=`hidden${Dt}`,Fd=`show${Dt}`,Vd=`shown${Dt}`,Wd="fade",Zs="hide",$e="show",Me="showing",Hd={animation:"boolean",autohide:"boolean",delay:"number"},jd={animation:!0,autohide:!0,delay:5e3};class tn extends ct{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return jd}static get DefaultType(){return Hd}static get NAME(){return Dd}show(){if(u.trigger(this._element,Fd).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(Wd);const e=()=>{this._element.classList.remove(Me),u.trigger(this._element,Vd),this._maybeScheduleHide()};this._element.classList.remove(Zs),ye(this._element),this._element.classList.add($e,Me),this._queueCallback(e,this._element,this._config.animation)}hide(){if(!this.isShown()||u.trigger(this._element,Rd).defaultPrevented)return;const e=()=>{this._element.classList.add(Zs),this._element.classList.remove(Me,$e),u.trigger(this._element,Bd)};this._element.classList.add(Me),this._queueCallback(e,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove($e),super.dispose()}isShown(){return this._element.classList.contains($e)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=e;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=e;break}}if(e){this._clearTimeout();return}const s=t.relatedTarget;this._element===s||this._element.contains(s)||this._maybeScheduleHide()}_setListeners(){u.on(this._element,$d,t=>this._onInteraction(t,!0)),u.on(this._element,Md,t=>this._onInteraction(t,!1)),u.on(this._element,Pd,t=>this._onInteraction(t,!0)),u.on(this._element,Id,t=>this._onInteraction(t,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each(function(){const e=tn.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}Ge(tn);it(tn);var ti={},zd=function(n,t,e,s,i){var r=new Worker(ti[t]||(ti[t]=URL.createObjectURL(new Blob([n+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return r.onmessage=function(a){var o=a.data,l=o.$e$;if(l){var d=new Error(l[0]);d.code=l[1],d.stack=l[2],i(d,null)}else i(null,o)},r.postMessage(e,s),r},j=Uint8Array,G=Uint16Array,en=Int32Array,nn=new j([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),sn=new j([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ln=new j([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),cr=function(n,t){for(var e=new G(31),s=0;s<31;++s)e[s]=t+=1<<n[s-1];for(var i=new en(e[30]),s=1;s<30;++s)for(var r=e[s];r<e[s+1];++r)i[r]=r-e[s]<<5|s;return{b:e,r:i}},dr=cr(nn,2),qd=dr.b,ze=dr.r;qd[28]=258,ze[258]=28;var Kd=cr(sn,0),$n=Kd.r,qe=new G(32768);for(var B=0;B<32768;++B){var At=(B&43690)>>1|(B&21845)<<1;At=(At&52428)>>2|(At&13107)<<2,At=(At&61680)>>4|(At&3855)<<4,qe[B]=((At&65280)>>8|(At&255)<<8)>>1}var Zt=function(n,t,e){for(var s=n.length,i=0,r=new G(t);i<s;++i)n[i]&&++r[n[i]-1];var a=new G(t);for(i=1;i<t;++i)a[i]=a[i-1]+r[i-1]<<1;var o;if(e){o=new G(1<<t);var l=15-t;for(i=0;i<s;++i)if(n[i])for(var d=i<<4|n[i],c=t-n[i],b=a[n[i]-1]++<<c,v=b|(1<<c)-1;b<=v;++b)o[qe[b]>>l]=d}else for(o=new G(s),i=0;i<s;++i)n[i]&&(o[i]=qe[a[n[i]-1]++]>>15-n[i]);return o},kt=new j(288);for(var B=0;B<144;++B)kt[B]=8;for(var B=144;B<256;++B)kt[B]=9;for(var B=256;B<280;++B)kt[B]=7;for(var B=280;B<288;++B)kt[B]=8;var _e=new j(32);for(var B=0;B<32;++B)_e[B]=5;var hr=Zt(kt,9,0),ur=Zt(_e,5,0),ss=function(n){return(n+7)/8|0},is=function(n,t,e){return(t==null||t<0)&&(t=0),(e==null||e>n.length)&&(e=n.length),new j(n.subarray(t,e))},Yd=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],oe=function(n,t,e){var s=new Error(t||Yd[n]);if(s.code=n,Error.captureStackTrace&&Error.captureStackTrace(s,oe),!e)throw s;return s},ht=function(n,t,e){e<<=t&7;var s=t/8|0;n[s]|=e,n[s+1]|=e>>8},Gt=function(n,t,e){e<<=t&7;var s=t/8|0;n[s]|=e,n[s+1]|=e>>8,n[s+2]|=e>>16},Fe=function(n,t){for(var e=[],s=0;s<n.length;++s)n[s]&&e.push({s,f:n[s]});var i=e.length,r=e.slice();if(!i)return{t:as,l:0};if(i==1){var a=new j(e[0].s+1);return a[e[0].s]=1,{t:a,l:1}}e.sort(function(T,S){return T.f-S.f}),e.push({s:-1,f:25001});var o=e[0],l=e[1],d=0,c=1,b=2;for(e[0]={s:-1,f:o.f+l.f,l:o,r:l};c!=i-1;)o=e[e[d].f<e[b].f?d++:b++],l=e[d!=c&&e[d].f<e[b].f?d++:b++],e[c++]={s:-1,f:o.f+l.f,l:o,r:l};for(var v=r[0].s,s=1;s<i;++s)r[s].s>v&&(v=r[s].s);var p=new G(v+1),y=Ke(e[c-1],p,0);if(y>t){var s=0,m=0,f=y-t,_=1<<f;for(r.sort(function(S,N){return p[N.s]-p[S.s]||S.f-N.f});s<i;++s){var C=r[s].s;if(p[C]>t)m+=_-(1<<y-p[C]),p[C]=t;else break}for(m>>=f;m>0;){var k=r[s].s;p[k]<t?m-=1<<t-p[k]++-1:++s}for(;s>=0&&m;--s){var g=r[s].s;p[g]==t&&(--p[g],++m)}y=t}return{t:new j(p),l:y}},Ke=function(n,t,e){return n.s==-1?Math.max(Ke(n.l,t,e+1),Ke(n.r,t,e+1)):t[n.s]=e},Mn=function(n){for(var t=n.length;t&&!n[--t];);for(var e=new G(++t),s=0,i=n[0],r=1,a=function(l){e[s++]=l},o=1;o<=t;++o)if(n[o]==i&&o!=t)++r;else{if(!i&&r>2){for(;r>138;r-=138)a(32754);r>2&&(a(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(a(i),--r;r>6;r-=6)a(8304);r>2&&(a(r-3<<5|8208),r=0)}for(;r--;)a(i);r=1,i=n[o]}return{c:e.subarray(0,s),n:t}},Qt=function(n,t){for(var e=0,s=0;s<t.length;++s)e+=n[s]*t[s];return e},rs=function(n,t,e){var s=e.length,i=ss(t+2);n[i]=s&255,n[i+1]=s>>8,n[i+2]=n[i]^255,n[i+3]=n[i+1]^255;for(var r=0;r<s;++r)n[i+r+4]=e[r];return(i+4+s)*8},Pn=function(n,t,e,s,i,r,a,o,l,d,c){ht(t,c++,e),++i[256];for(var b=Fe(i,15),v=b.t,p=b.l,y=Fe(r,15),m=y.t,f=y.l,_=Mn(v),C=_.c,k=_.n,g=Mn(m),T=g.c,S=g.n,N=new G(19),x=0;x<C.length;++x)++N[C[x]&31];for(var x=0;x<T.length;++x)++N[T[x]&31];for(var E=Fe(N,7),O=E.t,M=E.l,L=19;L>4&&!O[Ln[L-1]];--L);var P=d+5<<3,I=Qt(i,kt)+Qt(r,_e)+a,F=Qt(i,v)+Qt(r,m)+a+14+3*L+Qt(N,O)+2*N[16]+3*N[17]+7*N[18];if(l>=0&&P<=I&&P<=F)return rs(t,c,n.subarray(l,l+d));var $,D,z,q;if(ht(t,c,1+(F<I)),c+=2,F<I){$=Zt(v,p,0),D=v,z=Zt(m,f,0),q=m;var yt=Zt(O,M,0);ht(t,c,k-257),ht(t,c+5,S-1),ht(t,c+10,L-4),c+=14;for(var x=0;x<L;++x)ht(t,c+3*x,O[Ln[x]]);c+=3*L;for(var U=[C,T],at=0;at<2;++at)for(var ot=U[at],x=0;x<ot.length;++x){var W=ot[x]&31;ht(t,c,yt[W]),c+=O[W],W>15&&(ht(t,c,ot[x]>>5&127),c+=ot[x]>>12)}}else $=hr,D=kt,z=ur,q=_e;for(var x=0;x<o;++x){var R=s[x];if(R>255){var W=R>>18&31;Gt(t,c,$[W+257]),c+=D[W+257],W>7&&(ht(t,c,R>>23&31),c+=nn[W]);var tt=R&31;Gt(t,c,z[tt]),c+=q[tt],tt>3&&(Gt(t,c,R>>5&8191),c+=sn[tt])}else Gt(t,c,$[R]),c+=D[R]}return Gt(t,c,$[256]),c+D[256]},pr=new en([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),as=new j(0),fr=function(n,t,e,s,i,r){var a=r.z||n.length,o=new j(s+a+5*(1+Math.ceil(a/7e3))+i),l=o.subarray(s,o.length-i),d=r.l,c=(r.r||0)&7;if(t){c&&(l[0]=r.r>>3);for(var b=pr[t-1],v=b>>13,p=b&8191,y=(1<<e)-1,m=r.p||new G(32768),f=r.h||new G(y+1),_=Math.ceil(e/3),C=2*_,k=function(pe){return(n[pe]^n[pe+1]<<_^n[pe+2]<<C)&y},g=new en(25e3),T=new G(288),S=new G(32),N=0,x=0,E=r.i||0,O=0,M=r.w||0,L=0;E+2<a;++E){var P=k(E),I=E&32767,F=f[P];if(m[I]=F,f[P]=I,M<=E){var $=a-E;if((N>7e3||O>24576)&&($>423||!d)){c=Pn(n,l,0,g,T,S,x,O,L,E-L,c),O=N=x=0,L=E;for(var D=0;D<286;++D)T[D]=0;for(var D=0;D<30;++D)S[D]=0}var z=2,q=0,yt=p,U=I-F&32767;if($>2&&P==k(E-U))for(var at=Math.min(v,$)-1,ot=Math.min(32767,E),W=Math.min(258,$);U<=ot&&--yt&&I!=F;){if(n[E+z]==n[E+z-U]){for(var R=0;R<W&&n[E+R]==n[E+R-U];++R);if(R>z){if(z=R,q=U,R>at)break;for(var tt=Math.min(U,R-2),Lt=0,D=0;D<tt;++D){var lt=E-U+D&32767,ue=m[lt],Ce=lt-ue&32767;Ce>Lt&&(Lt=Ce,F=lt)}}}I=F,F=m[I],U+=I-F&32767}if(q){g[O++]=268435456|ze[z]<<18|$n[q];var jt=ze[z]&31,Te=$n[q]&31;x+=nn[jt]+sn[Te],++T[257+jt],++S[Te],M=E+z,++N}else g[O++]=n[E],++T[n[E]]}}for(E=Math.max(E,M);E<a;++E)g[O++]=n[E],++T[n[E]];c=Pn(n,l,d,g,T,S,x,O,L,E-L,c),d||(r.r=c&7|l[c/8|0]<<3,c-=7,r.h=f,r.p=m,r.i=E,r.w=M)}else{for(var E=r.w||0;E<a+d;E+=65535){var zt=E+65535;zt>=a&&(l[c/8|0]=d,zt=a),c=rs(l,c+1,n.subarray(E,zt))}r.i=a}return is(o,0,s+ss(c)+i)},Ud=function(){for(var n=new Int32Array(256),t=0;t<256;++t){for(var e=t,s=9;--s;)e=(e&1&&-306674912)^e>>>1;n[t]=e}return n}(),Xd=function(){var n=-1;return{p:function(t){for(var e=n,s=0;s<t.length;++s)e=Ud[e&255^t[s]]^e>>>8;n=e},d:function(){return~n}}},mr=function(n,t,e,s,i){if(!i&&(i={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),a=new j(r.length+n.length);a.set(r),a.set(n,r.length),n=a,i.w=r.length}return fr(n,t.level==null?6:t.level,t.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+t.mem,e,s,i)},os=function(n,t){var e={};for(var s in n)e[s]=n[s];for(var s in t)e[s]=t[s];return e},ei=function(n,t,e){for(var s=n(),i=n.toString(),r=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),a=0;a<s.length;++a){var o=s[a],l=r[a];if(typeof o=="function"){t+=";"+l+"=";var d=o.toString();if(o.prototype)if(d.indexOf("[native code]")!=-1){var c=d.indexOf(" ",8)+1;t+=d.slice(c,d.indexOf("(",c))}else{t+=d;for(var b in o.prototype)t+=";"+l+".prototype."+b+"="+o.prototype[b].toString()}else t+=d}else e[l]=o}return t},Pe=[],Gd=function(n){var t=[];for(var e in n)n[e].buffer&&t.push((n[e]=new n[e].constructor(n[e])).buffer);return t},Qd=function(n,t,e,s){if(!Pe[e]){for(var i="",r={},a=n.length-1,o=0;o<a;++o)i=ei(n[o],i,r);Pe[e]={c:ei(n[a],i,r),e:r}}var l=os({},Pe[e].e);return zd(Pe[e].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",e,l,Gd(l),s)},Jd=function(){return[j,G,en,nn,sn,Ln,ze,$n,hr,kt,ur,_e,qe,pr,as,Zt,ht,Gt,Fe,Ke,Mn,Qt,rs,Pn,ss,is,fr,mr,ls,gr]},gr=function(n){return postMessage(n,[n.buffer])},Zd=function(n,t,e,s,i,r){var a=Qd(e,s,i,function(o,l){a.terminate(),r(o,l)});return a.postMessage([n,t],t.consume?[n.buffer]:[]),function(){a.terminate()}},H=function(n,t,e){for(;e;++t)n[t]=e,e>>>=8};function th(n,t,e){return e||(e=t,t={}),typeof e!="function"&&oe(7),Zd(n,t,[Jd],function(s){return gr(ls(s.data[0],s.data[1]))},0,e)}function ls(n,t){return mr(n,t||{},0,0)}var br=function(n,t,e,s){for(var i in n){var r=n[i],a=t+i,o=s;Array.isArray(r)&&(o=os(s,r[1]),r=r[0]),r instanceof j?e[a]=[r,o]:(e[a+="/"]=[new j(0),o],br(r,a,e,s))}},ni=typeof TextEncoder<"u"&&new TextEncoder,eh=typeof TextDecoder<"u"&&new TextDecoder,nh=0;try{eh.decode(as,{stream:!0}),nh=1}catch{}function In(n,t){var e;if(ni)return ni.encode(n);for(var s=n.length,i=new j(n.length+(n.length>>1)),r=0,a=function(d){i[r++]=d},e=0;e<s;++e){if(r+5>i.length){var o=new j(r+8+(s-e<<1));o.set(i),i=o}var l=n.charCodeAt(e);l<128||t?a(l):l<2048?(a(192|l>>6),a(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|n.charCodeAt(++e)&1023,a(240|l>>18),a(128|l>>12&63),a(128|l>>6&63),a(128|l&63)):(a(224|l>>12),a(128|l>>6&63),a(128|l&63))}return is(i,0,r)}var Rn=function(n){var t=0;if(n)for(var e in n){var s=n[e].length;s>65535&&oe(9),t+=s+4}return t},si=function(n,t,e,s,i,r,a,o){var l=s.length,d=e.extra,c=o&&o.length,b=Rn(d);H(n,t,a!=null?33639248:67324752),t+=4,a!=null&&(n[t++]=20,n[t++]=e.os),n[t]=20,t+=2,n[t++]=e.flag<<1|(r<0&&8),n[t++]=i&&8,n[t++]=e.compression&255,n[t++]=e.compression>>8;var v=new Date(e.mtime==null?Date.now():e.mtime),p=v.getFullYear()-1980;if((p<0||p>119)&&oe(10),H(n,t,p<<25|v.getMonth()+1<<21|v.getDate()<<16|v.getHours()<<11|v.getMinutes()<<5|v.getSeconds()>>1),t+=4,r!=-1&&(H(n,t,e.crc),H(n,t+4,r<0?-r-2:r),H(n,t+8,e.size)),H(n,t+12,l),H(n,t+14,b),t+=16,a!=null&&(H(n,t,c),H(n,t+6,e.attrs),H(n,t+10,a),t+=14),n.set(s,t),t+=l,b)for(var y in d){var m=d[y],f=m.length;H(n,t,+y),H(n,t+2,f),n.set(m,t+4),t+=4+f}return c&&(n.set(o,t),t+=c),t},sh=function(n,t,e,s,i){H(n,t,101010256),H(n,t+8,e),H(n,t+10,e),H(n,t+12,s),H(n,t+16,i)};function ih(n,t,e){e||(e=t,t={}),typeof e!="function"&&oe(7);var s={};br(n,"",s,t);var i=Object.keys(s),r=i.length,a=0,o=0,l=r,d=new Array(r),c=[],b=function(){for(var f=0;f<c.length;++f)c[f]()},v=function(f,_){ii(function(){e(f,_)})};ii(function(){v=e});var p=function(){var f=new j(o+22),_=a,C=o-a;o=0;for(var k=0;k<l;++k){var g=d[k];try{var T=g.c.length;si(f,o,g,g.f,g.u,T);var S=30+g.f.length+Rn(g.extra),N=o+S;f.set(g.c,N),si(f,a,g,g.f,g.u,T,o,g.m),a+=16+S+(g.m?g.m.length:0),o=N+T}catch(x){return v(x,null)}}sh(f,a,d.length,C,_),v(null,f)};r||p();for(var y=function(f){var _=i[f],C=s[_],k=C[0],g=C[1],T=Xd(),S=k.length;T.p(k);var N=In(_),x=N.length,E=g.comment,O=E&&In(E),M=O&&O.length,L=Rn(g.extra),P=g.level==0?0:8,I=function(F,$){if(F)b(),v(F,null);else{var D=$.length;d[f]=os(g,{size:S,crc:T.d(),c:$,f:N,m:O,u:x!=_.length||O&&E.length!=M,compression:P}),a+=30+x+L+D,o+=76+2*(x+L)+(M||0)+D,--r||p()}};if(x>65535&&I(oe(11,0,1),null),!P)I(null,k);else if(S<16e4)try{I(null,ls(k,g))}catch(F){I(F,null)}else c.push(th(k,g,I))},m=0;m<l;++m)y(m);return b}var ii=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(n){n()},rh=Object.defineProperty,ah=(n,t,e)=>t in n?rh(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,h=(n,t,e)=>ah(n,typeof t!="symbol"?t+"":t,e),oh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},vr=n=>(typeof n!="string"&&(n=`${n}`),n.replace(/[&<>"']/g,t=>oh[t]));function mt(n){const t=typeof n;return n!=null&&(t==="object"||t==="function")}function lh(n){if(typeof n!="object"||n===null||Object.prototype.toString.call(n)!=="[object Object]")return!1;const t=Object.getPrototypeOf(n);if(t===null)return!0;const e=Object.prototype.hasOwnProperty.call(t,"constructor")&&t.constructor;return typeof e=="function"&&e instanceof e&&Function.prototype.call(e)===Function.prototype.call(n)}function Pt(n){return n!=null&&typeof n.valueOf()=="string"}function ch(n,t){return t.reduce((e,s)=>(n!=null&&n.hasOwnProperty(s)&&(e[s]=n[s]),e),{})}var An={};function _t(n="$lodash$"){An[n]||(An[n]=0);const t=++An[n];return n==="$lodash$"?`${t}`:`${n}${t}`}var rn=class{constructor(n,t){h(this,"documentElement"),this.documentElement=this.createElement(t),this.documentElement.setAttribute("xmlns",n)}createElement(n){return new Er({nodeName:n})}createTextNode(n){return new _r(n)}toString(){return this.documentElement.toString()}};h(rn,"Node",{Create:n=>{switch(n.type){case"XML":return new Er(n);case"TEXT":return new _r(n.nodeValue);default:return null}}});var _r=class{constructor(n){h(this,"nodeValue"),this.nodeValue=n}toJSON(){return{nodeValue:this.nodeValue,type:"TEXT"}}toString(){return vr(this.nodeValue)}},Er=class yr{constructor(t){if(h(this,"nodeName",""),h(this,"children"),h(this,"nodeValue"),h(this,"attributes"),h(this,"firstChild"),this.nodeName=t.nodeName,this.children=[],this.nodeValue=t.nodeValue||"",this.attributes={},t.children)for(let e=0,s=t.children.length;e<s;e++)this.appendChild(rn.Node.Create(t.children[e]));if(t.attributes)for(const e in t.attributes)t.attributes.hasOwnProperty(e)&&this.setAttribute(e,t.attributes[e])}toString(){let t=`<${this.nodeName}`;for(const s in this.attributes)this.attributes.hasOwnProperty(s)&&(t=`${t} ${s}="${vr(this.attributes[s])}"`);let e="";for(let s=0,i=this.children.length;s<i;s++)e+=this.children[s].toString();return e?t+=`>${e}</${this.nodeName}>`:t+="/>",t}toJSON(){const t=[];for(let e=0,s=this.children.length;e<s;e++)t.push(this.children[e].toJSON());return{nodeName:this.nodeName,children:t,nodeValue:this.nodeValue,attributes:this.attributes,type:"XML"}}setAttribute(t,e){if(e===null){delete this.attributes[t],delete this[t];return}this.attributes[t]=e,this[t]=e}appendChild(t){this.children.push(t),this.firstChild=this.children[0]}cloneNode(t){return new yr(this.toJSON())}},an=class Mt{static uniqueId(t){return Mt._idSpaces[t]||(Mt._idSpaces[t]=1),Mt._idSpaces[t]++}static createXmlDoc(t,e){return new rn(t||null,e)}static createElement(t,e,s){const i=t.createElement(e);s=s||[];let r=s.length;for(;r--;)i.setAttribute(s[r][0],s[r][1]);return i}static setAttributesOnDoc(t,e){for(let[s,i]of Object.entries(e)){if(lh(i))if(i.v!==null&&i.v!==void 0)switch(i.type){case Boolean:i=i.v?"1":"0";break}else i=null;i!=null&&t.setAttribute(s,i)}}static positionToLetterRef(t,e){let s=1,i,r=t,a="";const o="ABCDEFGHIJKLMNOPQRSTUVWXYZ";if(Mt.LETTER_REFS[t])return Mt.LETTER_REFS[t].concat(e);for(;r>0;)r-=Math.pow(26,s-1),i=r%Math.pow(26,s),r-=i,i=i/Math.pow(26,s-1),a=o.charAt(i)+a,s+=1;return Mt.LETTER_REFS[t]=a,a.concat(String(e))}};h(an,"_idSpaces",{});h(an,"LETTER_REFS",{});h(an,"schemas",{worksheet:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",sharedStrings:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",stylesheet:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",relationships:"http://schemas.openxmlformats.org/officeDocument/2006/relationships",relationshipPackage:"http://schemas.openxmlformats.org/package/2006/relationships",contentTypes:"http://schemas.openxmlformats.org/package/2006/content-types",spreadsheetml:"http://schemas.openxmlformats.org/spreadsheetml/2006/main",markupCompat:"http://schemas.openxmlformats.org/markup-compatibility/2006",x14ac:"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac",officeDocument:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",package:"http://schemas.openxmlformats.org/package/2006/relationships",table:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/table",spreadsheetDrawing:"http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",drawing:"http://schemas.openxmlformats.org/drawingml/2006/main",drawingRelationship:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",image:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",chart:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",hyperlink:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink"});var w=an,xt={},Bn=class{constructor(){h(this,"relations",{}),h(this,"lastId",1),_t("rId")}importData(n){this.relations=n.relations,this.lastId=n.lastId}exportData(){return{relations:this.relations,lastId:this.lastId}}addRelation(n,t){return this.relations[n.id]={id:_t("rId"),schema:w.schemas[t],object:n},this.relations[n.id].id}getRelationshipId(n){return this.relations[n.id]?this.relations[n.id].id:null}toXML(){const n=w.createXmlDoc(w.schemas.relationshipPackage,"Relationships"),t=n.documentElement;for(const[e,s]of Object.entries(this.relations)){const i=w.createElement(n,"Relationship",[["Id",s.id],["Type",s.schema],["Target",s.object.target||xt[e]]]);s.object.targetMode&&i.setAttribute("TargetMode",s.object.targetMode),t.appendChild(i)}return n}},dh=class{constructor(){h(this,"state",null),h(this,"xSplit",null),h(this,"ySplit",null),h(this,"activePane","bottomRight"),h(this,"topLeftCell",null),h(this,"_freezePane")}freezePane(n,t,e){this._freezePane={xSplit:n,ySplit:t,cell:e}}exportXML(n){const t=n.createElement("pane");return this.state!==null&&(t.setAttribute("xSplit",this._freezePane.xSplit),t.setAttribute("ySplit",this._freezePane.ySplit),t.setAttribute("topLeftCell",this._freezePane.cell),t.setAttribute("activePane","bottomRight"),t.setAttribute("state","frozen")),t}},ri=class{constructor(){h(this,"strings",{}),h(this,"stringArray",[]),h(this,"id",_t("SharedStrings"))}addString(n){return this.strings[n]=this.stringArray.length,this.stringArray[this.stringArray.length]=n,this.strings[n]}exportData(){return this.strings}toXML(){const n=w.createXmlDoc(w.schemas.spreadsheetml,"sst"),t=n.documentElement;this.stringArray.reverse();let e=this.stringArray.length;t.setAttribute("count",e),t.setAttribute("uniqueCount",e);const s=n.createElement("si"),i=n.createElement("t");i.appendChild(n.createTextNode("--placeholder--")),s.appendChild(i);const r=this.stringArray;for(;e--;){const a=s.cloneNode(!0);typeof r[e]=="string"&&r[e].match(/\s+/)&&a.firstChild.setAttribute("xml:space","preserve"),a.firstChild.firstChild.nodeValue=r[e],t.appendChild(a)}return n}},hh=class{constructor(n){h(this,"pane"),h(this,"showZeros",null),h(this,"defaultGridColor",null),h(this,"colorId",null),h(this,"rightToLeft",null),h(this,"showFormulas",null),h(this,"showGridLines",null),h(this,"showOutlineSymbols",null),h(this,"showRowColHeaders",null),h(this,"showRuler",null),h(this,"showWhiteSpace",null),h(this,"tabSelected",null),h(this,"topLeftCell",null),h(this,"viewType",null),h(this,"windowProtection",null),h(this,"zoomScale",null),h(this,"zoomScaleNormal",null),h(this,"zoomScalePageLayoutView",null),h(this,"zoomScaleSheetLayoutView",null);const t=n||{};this.pane=t.pane||new dh}freezePane(n,t,e){this.pane.state="frozen",this.pane.xSplit=n,this.pane.ySplit=t,this.pane.topLeftCell=e}exportXML(n){const t=n.createElement("sheetViews"),e=n.createElement("sheetView");return w.setAttributesOnDoc(e,{workbookViewId:0,showZeros:{v:this.showZeros,type:Boolean},defaultGridColor:{v:this.defaultGridColor,type:Boolean},colorId:this.colorId,rightToLeft:{v:this.rightToLeft,type:Boolean},showFormulas:{v:this.showFormulas,type:Boolean},showGridLines:{v:this.showGridLines,type:Boolean},showOutlineSymbols:{v:this.showOutlineSymbols,type:Boolean},showRowColHeaders:{v:this.showRowColHeaders,type:Boolean},showRuler:{v:this.showRuler,type:Boolean},showWhiteSpace:{v:this.showWhiteSpace,type:Boolean},tabSelected:{v:this.tabSelected,type:Boolean},viewType:this.viewType,windowProtection:{v:this.windowProtection,type:Boolean},zoomScale:{v:this.zoomScale,type:Boolean},zoomScaleNormal:this.zoomScaleNormal,zoomScalePageLayoutView:this.zoomScalePageLayoutView,zoomScaleSheetLayoutView:this.zoomScaleSheetLayoutView}),e.appendChild(this.pane.exportXML(n)),t.appendChild(e),t}},ai=class{constructor(){h(this,"id",_t("StyleSheet")),h(this,"cellStyles",[{name:"Normal",xfId:"0",builtinId:"0"}]),h(this,"defaultTableStyle",!1),h(this,"differentialStyles",[{}]),h(this,"masterCellFormats",[{numFmtId:0,fontId:0,fillId:0,borderId:0,xfid:0}]),h(this,"masterCellStyles",[{numFmtId:0,fontId:0,fillId:0,borderId:0}]),h(this,"fonts",[{}]),h(this,"numberFormatters",[]),h(this,"fills",[{},{type:"pattern",patternType:"gray125",fgColor:"FF333333",bgColor:"FF333333"}]),h(this,"borders",[{top:{},left:{},right:{},bottom:{},diagonal:{}}]),h(this,"tableStyles",[])}createSimpleFormatter(n){const e={id:this.masterCellFormats.length};switch(n){case"date":e.numFmtId=14;break}return this.masterCellFormats.push(e),e}createFill(n){const t=this.fills.length,e=n;return e.id=t,this.fills.push(e),e}createNumberFormatter(n){const e={id:this.numberFormatters.length+100,formatCode:n};return this.numberFormatters.push(e),e}createFormat(n){const e={id:this.masterCellFormats.length};if(n.protection&&(e.protection=n.protection),n.font&&mt(n.font))e.fontId=this.createFontStyle(n.font).id;else if(n.font){if(Number.isNaN(Number.parseInt(n.font,10)))throw new Error("Passing a non-numeric font id is not supported");e.fontId=n.font}if(n.format&&Pt(n.format))e.numFmtId=this.createNumberFormatter(n.format).id;else if(n.format){if(Number.isNaN(Number.parseInt(n.format,10)))throw new Error("Invalid number formatter id");e.numFmtId=n.format}if(n.border&&mt(n.border))e.borderId=this.createBorderFormatter(n.border).id;else if(n.border){if(Number.isNaN(Number.parseInt(n.border,10)))throw new Error("Passing a non-numeric border id is not supported");e.borderId=n.border}if(n.fill&&mt(n.fill))e.fillId=this.createFill(n.fill).id;else if(n.fill){if(Number.isNaN(Number.parseInt(n.fill,10)))throw new Error("Passing a non-numeric fill id is not supported");e.fillId=n.fill}return n.alignment&&mt(n.alignment)&&(e.alignment=ch(n.alignment,["horizontal","justifyLastLine","readingOrder","relativeIndent","shrinkToFit","textRotation","vertical","wrapText"])),this.masterCellFormats.push(e),e}createDifferentialStyle(n){const t=this.differentialStyles.length,e={id:t};return n.font&&mt(n.font)&&(e.font=n.font),n.border&&mt(n.border)&&(e.border=Object.assign({top:{},left:{},right:{},bottom:{},diagonal:{}},n.border)),n.fill&&mt(n.fill)&&(e.fill=n.fill),n.alignment&&mt(n.alignment)&&(e.alignment=n.alignment),n.format&&Pt(n.format)&&(e.numFmt=n.format),this.differentialStyles[t]=e,e}createTableStyle(n){this.tableStyles.push(n)}createBorderFormatter(n){return n={top:{},left:{},right:{},bottom:{},diagonal:{},id:this.borders.length,...n},this.borders.push(n),n}createFontStyle(n){const e={id:this.fonts.length};return n.bold&&(e.bold=!0),n.italic&&(e.italic=!0),n.superscript&&(e.vertAlign="superscript"),n.subscript&&(e.vertAlign="subscript"),n.underline&&(typeof n.underline=="string"&&["double","singleAccounting","doubleAccounting"].includes(n.underline)?e.underline=n.underline:e.underline=!0),n.strike&&(e.strike=!0),n.outline&&(e.outline=!0),n.shadow&&(e.shadow=!0),n.size&&(e.size=n.size),n.color&&(e.color=n.color),n.fontName&&(e.fontName=n.fontName),this.fonts.push(e),e}exportBorders(n){const t=n.createElement("borders");t.setAttribute("count",this.borders.length);for(let e=0,s=this.borders.length;e<s;e++)t.appendChild(this.exportBorder(n,this.borders[e]));return t}exportBorder(n,t){const e=n.createElement("border"),s=i=>{const r=n.createElement(i);return t[i].style&&r.setAttribute("style",t[i].style),t[i].color&&r.appendChild(this.exportColor(n,t[i].color)),r};return e.appendChild(s("left")),e.appendChild(s("right")),e.appendChild(s("top")),e.appendChild(s("bottom")),e.appendChild(s("diagonal")),e}exportColor(n,t){const e=n.createElement("color");return Pt(t)?(e.setAttribute("rgb",t),e):(t.tint!==void 0&&e.setAttribute("tint",t.tint),t.auto!==void 0&&e.setAttribute("auto",String(!!t.auto)),t.theme!==void 0&&e.setAttribute("theme",t.theme),e)}exportMasterCellFormats(n){const t=w.createElement(n,"cellXfs",[["count",this.masterCellFormats.length]]);for(let e=0,s=this.masterCellFormats.length;e<s;e++){const i=this.masterCellFormats[e];t.appendChild(this.exportCellFormatElement(n,i))}return t}exportMasterCellStyles(n){const t=w.createElement(n,"cellStyleXfs",[["count",this.masterCellStyles.length]]);for(let e=0,s=this.masterCellStyles.length;e<s;e++){const i=this.masterCellStyles[e];t.appendChild(this.exportCellFormatElement(n,i))}return t}exportCellFormatElement(n,t){const e=n.createElement("xf"),s=["applyAlignment","applyBorder","applyFill","applyFont","applyNumberFormat","applyProtection","borderId","fillId","fontId","numFmtId","pivotButton","quotePrefix","xfId"],i=Object.keys(t).filter(a=>s.indexOf(a)!==-1);if(t.alignment){const a=t.alignment;e.appendChild(this.exportAlignment(n,a))}t.protection&&(e.appendChild(this.exportProtection(n,t.protection)),e.setAttribute("applyProtection","1"));let r=i.length;for(;r--;)e.setAttribute(i[r],t[i[r]]);return t.fillId&&e.setAttribute("applyFill","1"),t.fontId&&e.setAttribute("applyFont","1"),t.borderId&&e.setAttribute("applyBorder","1"),t.alignment&&e.setAttribute("applyAlignment","1"),t.numFmtId&&e.setAttribute("applyNumberFormat","1"),t.numFmtId!==void 0&&t.xfId===void 0&&e.setAttribute("xfId","0"),e}exportAlignment(n,t){const e=n.createElement("alignment"),s=Object.keys(t);for(let i=0,r=s.length;i<r;i++)e.setAttribute(s[i],t[s[i]]);return e}exportFonts(n){const t=n.createElement("fonts");t.setAttribute("count",String(this.fonts.length));for(let e=0,s=this.fonts.length;e<s;e++){const i=this.fonts[e];t.appendChild(this.exportFont(n,i))}return t}exportFont(n,t){const e=n.createElement("font");if(t.size){const s=n.createElement("sz");s.setAttribute("val",t.size),e.appendChild(s)}if(t.fontName){const s=n.createElement("name");s.setAttribute("val",t.fontName),e.appendChild(s)}if(t.bold&&e.appendChild(n.createElement("b")),t.italic&&e.appendChild(n.createElement("i")),t.vertAlign){const s=n.createElement("vertAlign");s.setAttribute("val",t.vertAlign),e.appendChild(s)}if(t.underline){const s=n.createElement("u");t.underline!==!0&&s.setAttribute("val",t.underline),e.appendChild(s)}return t.strike&&e.appendChild(n.createElement("strike")),t.shadow&&e.appendChild(n.createElement("shadow")),t.outline&&e.appendChild(n.createElement("outline")),t.color&&e.appendChild(this.exportColor(n,t.color)),e}exportFills(n){const t=n.createElement("fills");t.setAttribute("count",String(this.fills.length));for(let e=0,s=this.fills.length;e<s;e++){const i=this.fills[e];t.appendChild(this.exportFill(n,i))}return t}exportFill(n,t){let e;const s=n.createElement("fill");return t.type==="pattern"?(e=this.exportPatternFill(n,t),s.appendChild(e)):t.type==="gradient"&&(e=this.exportGradientFill(n,t),s.appendChild(e)),s}exportGradientFill(n,t){const e=n.createElement("gradientFill");t.degree?e.setAttribute("degree",t.degree):t.left&&(e.setAttribute("left",t.left),e.setAttribute("right",t.right),e.setAttribute("top",t.top),e.setAttribute("bottom",t.bottom));const s=n.createElement("stop");s.setAttribute("position",t.start.pureAt||0);const i=n.createElement("color");typeof t.start=="string"||t.start.color?i.setAttribute("rgb",t.start.color||t.start):t.start.theme&&i.setAttribute("theme",t.start.theme);const r=n.createElement("stop"),a=n.createElement("color");return r.setAttribute("position",t.end.pureAt||1),typeof t.start=="string"||t.end.color?a.setAttribute("rgb",t.end.color||t.end):t.end.theme&&a.setAttribute("theme",t.end.theme),s.appendChild(i),r.appendChild(a),e.appendChild(s),e.appendChild(r),e}exportPatternFill(n,t){const e=w.createElement(n,"patternFill",[["patternType",t.patternType]]);t.bgColor||(t.bgColor="FFFFFFFF"),t.fgColor||(t.fgColor="FFFFFFFF");const s=n.createElement("bgColor");Pt(t.bgColor)?s.setAttribute("rgb",t.bgColor):t.bgColor.theme?s.setAttribute("theme",t.bgColor.theme):s.setAttribute("rgb",t.bgColor.rbg);const i=n.createElement("fgColor");return Pt(t.fgColor)?i.setAttribute("rgb",t.fgColor):t.fgColor.theme?i.setAttribute("theme",t.fgColor.theme):i.setAttribute("rgb",t.fgColor.rbg),e.appendChild(i),e.appendChild(s),e}exportNumberFormatters(n){const t=n.createElement("numFmts");t.setAttribute("count",String(this.numberFormatters.length));for(let e=0,s=this.numberFormatters.length;e<s;e++){const i=this.numberFormatters[e];t.appendChild(this.exportNumberFormatter(n,i))}return t}exportNumberFormatter(n,t){const e=n.createElement("numFmt");return e.setAttribute("numFmtId",t.id),e.setAttribute("formatCode",t.formatCode),e}exportCellStyles(n){const t=n.createElement("cellStyles");t.setAttribute("count",String(this.cellStyles.length));for(let e=0,s=this.cellStyles.length;e<s;e++){const i=this.cellStyles[e];delete i.id;const r=w.createElement(n,"cellStyle");t.appendChild(r);const a=Object.keys(i);let o=a.length;for(;o--;)r.setAttribute(a[o],i[a[o]])}return t}exportDifferentialStyles(n){const t=n.createElement("dxfs");t.setAttribute("count",String(this.differentialStyles.length));for(let e=0,s=this.differentialStyles.length;e<s;e++){const i=this.differentialStyles[e];t.appendChild(this.exportDFX(n,i))}return t}exportDFX(n,t){const e=n.createElement("dxf");return t.font&&e.appendChild(this.exportFont(n,t.font)),t.fill&&e.appendChild(this.exportFill(n,t.fill)),t.border&&e.appendChild(this.exportBorder(n,t.border)),t.numFmt&&e.appendChild(this.exportNumberFormatter(n,t.numFmt)),t.alignment&&e.appendChild(this.exportAlignment(n,t.alignment)),e}exportTableStyles(n){const t=n.createElement("tableStyles");t.setAttribute("count",String(this.tableStyles.length)),this.defaultTableStyle&&t.setAttribute("defaultTableStyle",String(this.defaultTableStyle));for(let e=0,s=this.tableStyles.length;e<s;e++)t.appendChild(this.exportTableStyle(n,this.tableStyles[e]));return t}exportTableStyle(n,t){const e=n.createElement("tableStyle");e.setAttribute("name",t.name),e.setAttribute("pivot",String(0));let s=0;return Object.entries(t).forEach(([i,r])=>{if(i==="name")return;s++;const a=n.createElement("tableStyleElement");a.setAttribute("type",i),a.setAttribute("dxfId",r),e.appendChild(a)}),e.setAttribute("count",String(s)),e}exportProtection(n,t){const e=n.createElement("protection");for(const s in t)s in t&&e.setAttribute(s,t[s]);return e}toXML(){const n=w.createXmlDoc(w.schemas.spreadsheetml,"styleSheet"),t=n.documentElement;return t.appendChild(this.exportNumberFormatters(n)),t.appendChild(this.exportFonts(n)),t.appendChild(this.exportFills(n)),t.appendChild(this.exportBorders(n)),t.appendChild(this.exportMasterCellStyles(n)),t.appendChild(this.exportMasterCellFormats(n)),t.appendChild(this.exportCellStyles(n)),t.appendChild(this.exportDifferentialStyles(n)),this.tableStyles.length&&t.appendChild(this.exportTableStyles(n)),n}},cs=class{constructor(n){h(this,"name",""),h(this,"id",""),h(this,"tableId",""),h(this,"displayName",""),h(this,"dataCellStyle",null),h(this,"dataDfxId",null),h(this,"headerRowBorderDxfId",null),h(this,"headerRowCellStyle",null),h(this,"headerRowCount",1),h(this,"headerRowDxfId",null),h(this,"insertRow",!1),h(this,"insertRowShift",!1),h(this,"ref",null),h(this,"tableBorderDxfId",null),h(this,"totalsRowBorderDxfId",null),h(this,"totalsRowCellStyle",null),h(this,"totalsRowCount",0),h(this,"totalsRowDxfId",null),h(this,"tableColumns",[]),h(this,"autoFilter",null),h(this,"sortState",null),h(this,"styleInfo",{}),this.initialize(n)}initialize(n){this.displayName=_t("Table"),this.name=this.displayName,this.id=this.name,this.tableId=this.id.replace("Table",""),Object.assign(this,n)}setReferenceRange(n,t){this.ref=[n,t]}setTableColumns(n){n.forEach(t=>{this.addTableColumn(t)})}addTableColumn(n){if(Pt(n)&&(n={name:n}),!n.name)throw new Error("Invalid argument for addTableColumn - minimum requirement is a name property");this.tableColumns.push(n)}setSortState(n){this.sortState=n}toXML(){const n=w.createXmlDoc(w.schemas.spreadsheetml,"table"),t=n.documentElement;t.setAttribute("id",this.tableId),t.setAttribute("name",this.name),t.setAttribute("displayName",this.displayName);const e=this.ref[0],s=this.ref[1];if(t.setAttribute("ref",`${w.positionToLetterRef(e[0],e[1])}:${w.positionToLetterRef(s[0],s[1])}`),t.setAttribute("totalsRowCount",this.totalsRowCount),t.setAttribute("headerRowCount",this.headerRowCount),this.headerRowDxfId&&t.setAttribute("headerRowDxfId",this.headerRowDxfId),this.headerRowBorderDxfId&&t.setAttribute("headerRowBorderDxfId",this.headerRowBorderDxfId),!this.ref)throw new Error("Needs at least a reference range");return this.autoFilter||this.addAutoFilter(this.ref[0],this.ref[1]),t.appendChild(this.exportAutoFilter(n)),t.appendChild(this.exportTableColumns(n)),t.appendChild(this.exportTableStyleInfo(n)),n}exportTableColumns(n){const t=n.createElement("tableColumns");t.setAttribute("count",this.tableColumns.length);const e=this.tableColumns;for(let s=0,i=e.length;s<i;s++){const r=e[s],a=n.createElement("tableColumn");a.setAttribute("id",String(s+1)),a.setAttribute("name",r.name),t.appendChild(a),r.totalsRowFunction&&a.setAttribute("totalsRowFunction",r.totalsRowFunction),r.totalsRowLabel&&a.setAttribute("totalsRowLabel",r.totalsRowLabel)}return t}exportAutoFilter(n){const t=n.createElement("autoFilter"),e=this.autoFilter[0],s=this.autoFilter[1];return t.setAttribute("ref",`${w.positionToLetterRef(e[0],e[1])}:${w.positionToLetterRef(s[0],s[1]-this.totalsRowCount)}`),t}exportTableStyleInfo(n){const t=this.styleInfo,e=n.createElement("tableStyleInfo");return e.setAttribute("name",t.themeStyle),e.setAttribute("showFirstColumn",t.showFirstColumn?"1":"0"),e.setAttribute("showLastColumn",t.showLastColumn?"1":"0"),e.setAttribute("showColumnStripes",t.showColumnStripes?"1":"0"),e.setAttribute("showRowStripes",t.showRowStripes?"1":"0"),e}addAutoFilter(n,t){this.autoFilter=[n,t]}},uh=class{constructor(n){h(this,"name",""),h(this,"id",_t("Worksheet")),h(this,"_timezoneOffset"),h(this,"relations",null),h(this,"columnFormats",[]),h(this,"data",[]),h(this,"mergedCells",[]),h(this,"columns",[]),h(this,"sheetProtection",!1),h(this,"_headers",[]),h(this,"_footers",[]),h(this,"_tables",[]),h(this,"_drawings",[]),h(this,"_orientation"),h(this,"_margin"),h(this,"_rowInstructions",{}),h(this,"_freezePane",{}),h(this,"sharedStrings",null),h(this,"hyperlinks",[]),h(this,"sheetView"),h(this,"showZeros",null),this._timezoneOffset=new Date().getTimezoneOffset()*60*1e3,this.sheetView=n.sheetView||new hh,this.initialize(n)}initialize(n){n=n||{},this.name=n.name,this.id=_t("Worksheet"),this._timezoneOffset=new Date().getTimezoneOffset()*60*1e3,n.columns&&this.setColumns(n.columns),this.relations=new Bn}exportData(){return{relations:this.relations.exportData(),columnFormats:this.columnFormats,data:this.data,columns:this.columns,mergedCells:this.mergedCells,_headers:this._headers,_footers:this._footers,_tables:this._tables,_rowInstructions:this._rowInstructions,_freezePane:this._freezePane,name:this.name,id:this.id}}importData(n){this.relations.importData(n.relations),delete n.relations,Object.assign(this,n)}setSharedStringCollection(n){this.sharedStrings=n}addTable(n){this._tables.push(n),this.relations.addRelation(n,"table")}addDrawings(n){this._drawings.push(n),this.relations.addRelation(n,"drawingRelationship")}setRowInstructions(n,t){this._rowInstructions[n]=t}setHeader(n){if(!Array.isArray(n))throw"Invalid argument type - setHeader expects an array of three instructions";this._headers=n}setFooter(n){if(!Array.isArray(n))throw"Invalid argument type - setFooter expects an array of three instructions";this._footers=n}compilePageDetailPackage(n){return n=n||"",["&L",this.compilePageDetailPiece(n[0]||""),"&C",this.compilePageDetailPiece(n[1]||""),"&R",this.compilePageDetailPiece(n[2]||"")].join("")}compilePageDetailPiece(n){if(Pt(n))return'&"-,Regular"'.concat(n);if(mt(n)&&!Array.isArray(n)){let t="";if(n.font||n.bold){const e=n.bold?"Bold":"Regular";t+=`&"${n.font||"-"}`,t+=`,${e}"`}else t+='&"-,Regular"';return n.underline&&(t+="&U"),n.fontSize&&(t+=`&${n.fontSize}`),t+=n.text,t}if(Array.isArray(n))return n.reduce((t,e)=>t.concat(this.compilePageDetailPiece(e)),"")}exportHeader(n){const t=n.createElement("oddHeader");return t.appendChild(n.createTextNode(this.compilePageDetailPackage(this._headers))),t}exportFooter(n){const t=n.createElement("oddFooter");return t.appendChild(n.createTextNode(this.compilePageDetailPackage(this._footers))),t}_buildCache(n){const t=n.createElement("c"),e=n.createElement("v");e.appendChild(n.createTextNode("--temp--")),t.appendChild(e);const s=n.createElement("c"),i=n.createElement("f");i.appendChild(n.createTextNode("--temp--")),s.appendChild(i);const r=n.createElement("c");r.setAttribute("t","s");const a=n.createElement("v");return a.appendChild(n.createTextNode("--temp--")),r.appendChild(a),{number:t,date:t,string:r,formula:s}}collectSharedStrings(){const n=this.data,t={};for(let e=0,s=n.length;e<s;e++){const i=n[e],r=i.length;for(let a=0;a<r;a++){let o=i[a];const l=(o==null?void 0:o.metadata)||{};o&&typeof o=="object"&&(o=o.value),l.type||typeof o=="number"&&(l.type="number"),(l.type==="text"||!l.type)&&typeof t[o]>"u"&&(t[o]=!0)}}return Object.keys(t)}toXML(){var c,b,v;const n=this.data,t=this.columns||[],e=w.createXmlDoc(w.schemas.spreadsheetml,"worksheet"),s=e.documentElement;let i,r,a;s.setAttribute("xmlns:r",w.schemas.relationships),s.setAttribute("xmlns:mc",w.schemas.markupCompat);let o=0;const l=w.createElement(e,"sheetData"),d=this._buildCache(e);for(a=0,r=n.length;a<r;a++){const p=n[a],y=p.length;o=y>o?y:o;const m=e.createElement("row");for(let f=0;f<y;f++){t[f]=t[f]||{};let _=p[f],C;const k=(_==null?void 0:_.metadata)||{};switch(_&&typeof _=="object"&&(_=_.value),k.type||typeof _=="number"&&(k.type="number"),k.type){case"number":C=d.number.cloneNode(!0),C.firstChild.firstChild.nodeValue=_;break;case"date":C=d.date.cloneNode(!0),_ instanceof Date&&(_=_.getTime()),C.firstChild.firstChild.nodeValue=25569+(_-this._timezoneOffset)/(60*60*24*1e3);break;case"formula":C=d.formula.cloneNode(!0),C.firstChild.firstChild.nodeValue=_;break;case"text":default:{let g;typeof((c=this.sharedStrings)==null?void 0:c.strings[_])<"u"?g=this.sharedStrings.strings[_]:g=(b=this.sharedStrings)==null?void 0:b.addString(_),C=d.string.cloneNode(!0),C.firstChild.firstChild.nodeValue=g;break}}k.style?C.setAttribute("s",k.style):((v=this._rowInstructions[a])==null?void 0:v.style)!==void 0&&C.setAttribute("s",this._rowInstructions[a].style),C.setAttribute("r",w.positionToLetterRef(f+1,String(a+1))),m.appendChild(C)}if(m.setAttribute("r",a+1),this._rowInstructions[a]){const f=this._rowInstructions[a];f.height!==void 0&&(m.setAttribute("customHeight","1"),m.setAttribute("ht",f.height)),f.style!==void 0&&(m.setAttribute("customFormat","1"),m.setAttribute("s",f.style))}l.appendChild(m)}if(o!==0?s.appendChild(w.createElement(e,"dimension",[["ref",`${w.positionToLetterRef(1,1)}:${w.positionToLetterRef(o,String(n.length))}`]])):s.appendChild(w.createElement(e,"dimension",[["ref",w.positionToLetterRef(1,1)]])),s.appendChild(this.sheetView.exportXML(e)),this.columns.length&&s.appendChild(this.exportColumns(e)),s.appendChild(l),this.sheetProtection&&s.appendChild(this.sheetProtection.exportXML(e)),this.hyperlinks.length>0){const p=e.createElement("hyperlinks"),y=this.hyperlinks;for(i=0,r=y.length;i<r;i++){const m=e.createElement("hyperlink"),f=y[i];m.setAttribute("ref",String(f.cell)),f.id=w.uniqueId("hyperlink"),this.relations.addRelation({id:f.id,target:f.location,targetMode:f.targetMode||"External"},"hyperlink"),m.setAttribute("r:id",this.relations.getRelationshipId(f)),p.appendChild(m)}s.appendChild(p)}if(this.mergedCells.length>0){const p=e.createElement("mergeCells");for(i=0,r=this.mergedCells.length;i<r;i++){const y=e.createElement("mergeCell");y.setAttribute("ref",`${this.mergedCells[i][0]}:${this.mergedCells[i][1]}`),p.appendChild(y)}s.appendChild(p)}if(this.exportPageSettings(e,s),this._headers.length>0||this._footers.length>0){const p=e.createElement("headerFooter");this._headers.length>0&&p.appendChild(this.exportHeader(e)),this._footers.length>0&&p.appendChild(this.exportFooter(e)),s.appendChild(p)}for(i=0,r=this._drawings.length;i<r;i++){const p=e.createElement("drawing");p.setAttribute("r:id",this.relations.getRelationshipId(this._drawings[i])),s.appendChild(p)}if(this._tables.length>0){const p=e.createElement("tableParts");for(p.setAttribute("count",this._tables.length),i=0,r=this._tables.length;i<r;i++){const y=e.createElement("tablePart");y.setAttribute("r:id",this.relations.getRelationshipId(this._tables[i])),p.appendChild(y)}s.appendChild(p)}return e}exportColumns(n){const t=w.createElement(n,"cols");for(let e=0,s=this.columns.length;e<s;e++){const i=this.columns[e],r=w.createElement(n,"col",[["min",i.min||e+1],["max",i.max||e+1]]);i.hidden&&r.setAttribute("hidden",String(1)),i.bestFit&&r.setAttribute("bestFit",String(1)),(i.customWidth||i.width)&&r.setAttribute("customWidth",String(1)),i.width?r.setAttribute("width",i.width):r.setAttribute("width",String(9.140625)),t.appendChild(r)}return t}exportPageSettings(n,t){if(this._margin){let e=.7;const s=this._margin.left?this._margin.left:e,i=this._margin.right?this._margin.right:e,r=this._margin.top?this._margin.top:e,a=this._margin.bottom?this._margin.bottom:e;e=.3;const o=this._margin.header?this._margin.header:e,l=this._margin.footer?this._margin.footer:e;t.appendChild(w.createElement(n,"pageMargins",[["top",r],["bottom",a],["left",s],["right",i],["header",o],["footer",l]]))}this._orientation&&t.appendChild(w.createElement(n,"pageSetup",[["orientation",this._orientation]]))}setPageOrientation(n){this._orientation=n}setPageMargin(n){this._margin=n}setColumns(n){this.columns=n}setData(n){this.data=n}mergeCells(n,t){this.mergedCells.push([n,t])}freezePane(n,t,e){this.sheetView.freezePane(n,t,e)}setColumnFormats(n){this.columnFormats=n}},wr=class{constructor(){h(this,"id",_t("Workbook")),h(this,"styleSheet",new ai),h(this,"sharedStrings",new ri),h(this,"relations",new Bn),h(this,"worksheets",[]),h(this,"tables",[]),h(this,"drawings",[]),h(this,"media",{}),h(this,"printTitles"),this.initialize()}initialize(){this.id=_t("Workbook"),this.styleSheet=new ai,this.sharedStrings=new ri,this.relations=new Bn,this.relations.addRelation(this.styleSheet,"stylesheet"),this.relations.addRelation(this.sharedStrings,"sharedStrings")}createWorksheet(n){return n=Object.assign({},{name:"Sheet ".concat(String(this.worksheets.length+1))},n),new uh(n)}getStyleSheet(){return this.styleSheet}addTable(n){this.tables.push(n)}addDrawings(n){this.drawings.push(n)}setPrintTitleTop(n,t){this.printTitles==null&&(this.printTitles={}),this.printTitles[n]==null&&(this.printTitles[n]={}),this.printTitles[n].top=t}setPrintTitleLeft(n,t){this.printTitles==null&&(this.printTitles={}),this.printTitles[n]==null&&(this.printTitles[n]={}),this.printTitles[n].left=String.fromCharCode(64+t)}addMedia(n,t,e,s){const i=t.split("."),r=i[i.length-1];if(!s)switch(r.toLowerCase()){case"jpeg":case"jpg":s="image/jpeg";break;case"png":s="image/png";break;case"gif":s="image/gif";break;default:s=null;break}return this.media[t]||(this.media[t]={id:t,data:e,fileName:t,contentType:s,extension:r}),this.media[t]}addWorksheet(n){this.relations.addRelation(n,"worksheet"),n.setSharedStringCollection(this.sharedStrings),this.worksheets.push(n)}createContentTypes(){const n=w.createXmlDoc(w.schemas.contentTypes,"Types"),t=n.documentElement;let e,s;t.appendChild(w.createElement(n,"Default",[["Extension","rels"],["ContentType","application/vnd.openxmlformats-package.relationships+xml"]])),t.appendChild(w.createElement(n,"Default",[["Extension","xml"],["ContentType","application/xml"]]));const i={};for(const r in this.media)r in this.media&&(i[this.media[r].extension]=this.media[r].contentType);for(const r in i)r in i&&t.appendChild(w.createElement(n,"Default",[["Extension",r],["ContentType",i[r]]]));for(t.appendChild(w.createElement(n,"Override",[["PartName","/xl/workbook.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"]])),t.appendChild(w.createElement(n,"Override",[["PartName","/xl/sharedStrings.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"]])),t.appendChild(w.createElement(n,"Override",[["PartName","/xl/styles.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"]])),e=0,s=this.worksheets.length;e<s;e++)t.appendChild(w.createElement(n,"Override",[["PartName",`/xl/worksheets/sheet${e+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"]]));for(e=0,s=this.tables.length;e<s;e++)t.appendChild(w.createElement(n,"Override",[["PartName",`/xl/tables/table${e+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"]]));for(e=0,s=this.drawings.length;e<s;e++)t.appendChild(w.createElement(n,"Override",[["PartName",`/xl/drawings/drawing${e+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.drawing+xml"]]));return n}toXML(){const n=w.createXmlDoc(w.schemas.spreadsheetml,"workbook"),t=n.documentElement;t.setAttribute("xmlns:r",w.schemas.relationships);const e=31,s=w.createElement(n,"sheets");for(let a=0,o=this.worksheets.length;a<o;a++){const l=n.createElement("sheet");typeof console<"u"&&this.worksheets[a].name.length>e&&console.log(`Microsoft Excel requires work sheet names to be less than ${e+1} characters long, work sheet name "${this.worksheets[a].name}" is ${this.worksheets[a].name.length} characters long`),l.setAttribute("name",this.worksheets[a].name),l.setAttribute("sheetId",a+1),l.setAttribute("r:id",this.relations.getRelationshipId(this.worksheets[a])),s.appendChild(l)}t.appendChild(s);const i=w.createElement(n,"definedNames");let r=0;for(const a in this.printTitles)if(a in this.printTitles){const o=this.printTitles[a],l=n.createElement("definedName");l.setAttribute("name","_xlnm.Print_Titles"),l.setAttribute("localSheetId",r++);let d="";o.top&&(d+=`${a}!$1:$${o.top}`,o.left&&(d+=",")),o.left&&(d+=`${a}!$A:$${o.left}`),l.appendChild(n.createTextNode(d)),i.appendChild(l)}return t.appendChild(i),n}createWorkbookRelationship(){const n=w.createXmlDoc(w.schemas.relationshipPackage,"Relationships");return n.documentElement.appendChild(w.createElement(n,"Relationship",[["Id","rId1"],["Type",w.schemas.officeDocument],["Target","xl/workbook.xml"]])),n}_generateCorePaths(n){let t,e;for(xt[this.styleSheet.id]="styles.xml",xt[this.sharedStrings.id]="sharedStrings.xml",xt[this.id]="/xl/workbook.xml",t=0,e=this.tables.length;t<e;t++)n[`/xl/tables/table${t+1}.xml`]=this.tables[t].toXML(),xt[this.tables[t].id]=`/xl/tables/table${t+1}.xml`;for(const s in this.media)if(s in this.media){const i=this.media[s];n[`/xl/media/${s}`]=i.data,xt[s]=`/xl/media/${s}`}for(t=0,e=this.drawings.length;t<e;t++)n[`/xl/drawings/drawing${t+1}.xml`]=this.drawings[t].toXML(),xt[this.drawings[t].id]=`/xl/drawings/drawing${t+1}.xml`,n[`/xl/drawings/_rels/drawing${t+1}.xml.rels`]=this.drawings[t].relations.toXML()}_prepareFilesForPackaging(n){Object.assign(n,{"/[Content_Types].xml":this.createContentTypes(),"/_rels/.rels":this.createWorkbookRelationship(),"/xl/styles.xml":this.styleSheet.toXML(),"/xl/workbook.xml":this.toXML(),"/xl/sharedStrings.xml":this.sharedStrings.toXML(),"/xl/_rels/workbook.xml.rels":this.relations.toXML()});for(const[t,e]of Object.entries(n))if(t.indexOf(".xml")!==-1||t.indexOf(".rels")!==-1){e instanceof rn?n[t]=e.toString():n[t]=e.xml||new window.XMLSerializer().serializeToString(e);let s=n[t].replace(/xmlns=""/g,"");s=s.replace(/NS[\d]+:/g,""),s=s.replace(/xmlns:NS[\d]+=""/g,""),n[t]=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
${s}`}}generateFiles(){return new Promise(n=>{const t={};this._generateCorePaths(t);for(let e=0,s=this.worksheets.length;e<s;e++)t[`/xl/worksheets/sheet${e+1}.xml`]=this.worksheets[e].toXML(),xt[this.worksheets[e].id]=`worksheets/sheet${e+1}.xml`,t[`/xl/worksheets/_rels/sheet${e+1}.xml.rels`]=this.worksheets[e].relations.toXML();return this._prepareFilesForPackaging(t),n(t)})}};function dt(){return new wr}function ph(n,t,e){const s={};return new Promise((i,r)=>{n.generateFiles().then(a=>{for(const[o,l]of Object.entries(a))s[o.substr(1)]=In(l);return ih(s,(e==null?void 0:e.zipOptions)||{},(o,l)=>{if(o){r(o);return}{const d=(e==null?void 0:e.fileFormat)??"xlsx";let c=e==null?void 0:e.mimeType;c===void 0&&(c=d==="xls"?"application/vnd.ms-excel":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),i(new Blob([l],{type:c}))}})})})}function rt(n,t,e){const s=t.match(/.*\.xls$/)?"xls":"xlsx";return ph(n,"Blob",{...e,fileFormat:s}).then(i=>{fh(t,i)})}function fh(n,t){const e=document.createElement("a"),s=URL.createObjectURL(t);e&&document&&(e.textContent="download",e.href=s,e.setAttribute("download",n),e.style.visibility="hidden",document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(s))}let Ar=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=new wr,s=e.createWorksheet({name:"Artists"});s.setData(t),e.addWorksheet(s),rt(e,"Artist WB.xlsx")}},mh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"});e.mergeCells("A1","C1");const r=[[{value:"Merged Header",metadata:{style:t.getStyleSheet().createFormat({alignment:{horizontal:"center"},font:{bold:!0,color:"FF2b995d",size:13}}).id}}],["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]];e.setData(r),e.setColumns([{width:30},{width:20,hidden:!0},{width:10}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},gh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=dt(),s=e.createWorksheet({name:"Album List"}),i=e.getStyleSheet().createFormat({font:{italic:!0,underline:!0}});s.setRowInstructions(1,{height:40,style:i.id}),s.setData(t),e.addWorksheet(s),rt(e,"Artist WB.xlsx")}},bh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"}),s=t.getStyleSheet(),i="FFFF0000",r=s.createFormat({font:{bold:!0,color:i},border:{bottom:{color:i,style:"thin"},top:{color:i,style:"thin"},left:{color:i,style:"thin"},right:{color:i,style:"dotted"}}}),a=s.createFormat({font:{bold:!0,color:{theme:3}}}),o=[[{value:"Artist",metadata:{style:r.id}},{value:"Album",metadata:{style:a.id}},{value:"Price",metadata:{style:a.id}}],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]];e.setData(o),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},vh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"}),s=t.getStyleSheet().createFormat({format:"$#,##0.00"}),i=t.getStyleSheet().createSimpleFormatter("date"),r=[["Artist","Album","Price","Date Modified"],["Buckethead","Albino Slug",{value:8.99,metadata:{style:s.id}},{value:new Date(2024,1,1),metadata:{type:"date",style:i.id}}],["Buckethead","Electric Tears",{value:13.99,metadata:{style:s.id}},{value:new Date(2024,1,2),metadata:{type:"date",style:i.id}}],["Buckethead","Colma",{value:11.34,metadata:{style:s.id}},{value:new Date(2024,1,3),metadata:{type:"date",style:i.id}}],["Crystal Method","Vegas",{value:10.54,metadata:{style:s.id}},{value:new Date(2024,1,4),metadata:{type:"date",style:i.id}}],["Crystal Method","Tweekend",{value:10.64,metadata:{style:s.id}},{value:new Date(2024,1,5),metadata:{type:"date",style:i.id}}],["Crystal Method","Divided By Night",{value:8.99,metadata:{style:s.id}},{value:new Date(2024,1,6),metadata:{type:"date",style:i.id}}]];e.setData(r),e.setColumns([{width:15},{width:15},{width:15},{width:15}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},_h=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"}),s=t.getStyleSheet().createFormat({alignment:{horizontal:"center"}}),i=[[{value:"Artist",metadata:{style:s.id}},{value:"Album",metadata:{style:s.id}},{value:"Price",metadata:{style:s.id}}],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]];e.setData(i),e.setColumns([{width:30},{width:30},{width:30}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},Eh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"}),s=t.getStyleSheet(),r=s.createFormat({font:{bold:!0,color:"FF0000FF"},fill:{type:"pattern",patternType:"solid",fgColor:"FF00FF00"}}),a=s.createFormat({font:{color:"FFFFFFFF"},fill:{type:"gradient",degree:180,start:"FF92D050",end:{pureAt:.8,color:"FF0070C0"}}}),o=[[{value:"Artist",metadata:{style:r.id}},{value:"Album",metadata:{style:r.id}},{value:"Price",metadata:{style:r.id}}],[{value:"Buckethead",metadata:{style:a.id}},"Albino Slug",8.99],[{value:"Buckethead",metadata:{style:a.id}},"Electric Tears",13.99],[{value:"Buckethead",metadata:{style:a.id}},"Colma",11.34],[{value:"Crystal Method",metadata:{style:a.id}},"Vegas",10.54],[{value:"Crystal Method",metadata:{style:a.id}},"Tweekend",10.64],[{value:"Crystal Method",metadata:{style:a.id}},"Divided By Night",8.99]];e.setData(o),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},yh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"}),s=[[{value:"Artist"},{value:"Album"},{value:"Price"},{value:"Quantity"},{value:"Total"}],["Buckethead","Albino Slug",8.99,5,{value:"C2+D2",metadata:{type:"formula"}}],["Buckethead","Electric Tears",13.99,7,{value:"C3+D3",metadata:{type:"formula"}}],["Buckethead","Colma",11.34,9,{value:"C4+D4",metadata:{type:"formula"}}],["Crystal Method","Vegas",10.54,3,{value:"C5+D5",metadata:{type:"formula"}}],["Crystal Method","Tweekend",10.64,1,{value:"C6+D6",metadata:{type:"formula"}}],["Crystal Method","Divided By Night",8.99,56,{value:"C7+D7",metadata:{type:"formula"}}]];e.setData(s),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},wh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=dt(),s=e.createWorksheet({name:"Album List"}),i=new cs;i.styleInfo.themeStyle="TableStyleDark2",i.setReferenceRange([1,1],[3,t.length]),i.setTableColumns(["Artist","Album","Price"]),s.setData(t),e.addWorksheet(s),s.addTable(i),e.addTable(i),rt(e,"Artist WB.xlsx")}},Ah=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=dt(),s=e.createWorksheet({name:"Album List"}),i=e.getStyleSheet(),r=i.createDifferentialStyle({font:{italic:!0}});i.createTableStyle({name:"SlightlyOffColorBlue",wholeTable:r.id,headerRow:i.createDifferentialStyle({alignment:{horizontal:"center"}}).id});const a=new cs;a.styleInfo.themeStyle="SlightlyOffColorBlue",a.setReferenceRange([1,1],[3,t.length]),a.setTableColumns(["Artist","Album","Price"]),s.setData(t),e.addWorksheet(s),s.addTable(a),e.addTable(a),rt(e,"Artist WB.xlsx")}},xh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=new cs,e=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99],["Highest Price","test",{value:`SUBTOTAL(104,${t.name}[Price])`,metadata:{type:"formula"}}]],s=dt(),i=s.createWorksheet({name:"Album List"});t.styleInfo.themeStyle="TableStyleDark2",t.setReferenceRange([1,1],[3,e.length]),t.totalsRowCount=1,t.setTableColumns([{name:"Artist",totalsRowLabel:"Highest Price"},{name:"Album",totalsRowLabel:"test"},{name:"Price",totalsRowFunction:"max"}]),i.setData(e),s.addWorksheet(i),i.addTable(t),s.addTable(t),rt(s,"Artist WB.xlsx")}},Ch=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=dt(),s=e.createWorksheet({name:"Album List"});s.setData(t),s.setHeader(["This will be on the left",["In the middle ",{text:"I shall be",bold:!0}],{text:"Right, underlined and size of 16",font:16,underline:!0}]),s.setFooter(["Date of print: &D &T","&A","Page &P of &N"]),e.addWorksheet(s),rt(e,"Artist WB.xlsx")}};class Th{}const xn=[{name:"getting-started",view:"/src/getting-started.html",viewModel:Th,title:"Getting Started"},{name:"examples",view:"/src/examples/example01.html",viewModel:Ar,title:"Examples"},{name:"documentation",href:"https://ghiscoding.gitbook.io/excel-builder-vanilla/",title:"📘 Documentation"}],oi=[{name:"References",routes:[{name:"documentation",href:"https://ghiscoding.gitbook.io/excel-builder-vanilla/",title:"📘 Documentation"}]},{name:"Examples",routes:[{name:"example01",view:"/src/examples/example01.html",viewModel:Ar,title:"01- Create Worksheet"},{name:"example02",view:"/src/examples/example02.html",viewModel:mh,title:"02- Sizing/Collapsing Columns"},{name:"example03",view:"/src/examples/example03.html",viewModel:gh,title:"03- Setting row information"},{name:"example04",view:"/src/examples/example04.html",viewModel:bh,title:"04- Fonts and Colors"},{name:"example05",view:"/src/examples/example05.html",viewModel:vh,title:"05- Number, Date, etc Formatting"},{name:"example06",view:"/src/examples/example06.html",viewModel:_h,title:"06- Alignment"},{name:"example07",view:"/src/examples/example07.html",viewModel:Eh,title:"07- Backgroud Fillers"},{name:"example08",view:"/src/examples/example08.html",viewModel:yh,title:"08- Formulas"},{name:"example09",view:"/src/examples/example09.html",viewModel:wh,title:"09- Tables"},{name:"example10",view:"/src/examples/example10.html",viewModel:Ah,title:"10- Theming Tables"},{name:"example11",view:"/src/examples/example11.html",viewModel:xh,title:"11- Theming Summaries"},{name:"example12",view:"/src/examples/example12.html",viewModel:Ch,title:"12- Worksheet Headers/Footers"}]}],Sh=Object.assign({"/src/examples/example-standalone-iife.html":Nr,"/src/examples/example01.html":Or,"/src/examples/example02.html":Dr,"/src/examples/example03.html":Lr,"/src/examples/example04.html":$r,"/src/examples/example05.html":Mr,"/src/examples/example06.html":Pr,"/src/examples/example07.html":Ir,"/src/examples/example08.html":Rr,"/src/examples/example09.html":Br,"/src/examples/example10.html":Fr,"/src/examples/example11.html":Vr,"/src/examples/example12.html":Wr,"/src/getting-started.html":Hr,"/src/main.html":li});class kh{constructor(){V(this,"loading",!0);V(this,"currentModel");V(this,"currentRouter");V(this,"defaultRouteName","getting-started");V(this,"stateBangChar","#/");V(this,"baseUrl",window.location.origin+window.location.pathname);V(this,"viewModelObj",{})}async init(){const t=window.location;document.querySelector("#app").innerHTML=li;let e=t.hash.replace(this.stateBangChar,"");(!e||e==="/"||e==="#")&&(e=this.defaultRouteName),this.createRouteLinks(),this.loadRoute(e),Array.from(document.querySelectorAll(".panel-wm-left a.nav-link,.navbar-nav a.nav-link")).forEach(s=>{s.id&&e.includes(s.id)&&s.classList.add("active")}),window.onpopstate=()=>{const i=window.location.hash.replace(this.stateBangChar,"");this.removeAllActiveLinks();const r=document.querySelector(`#${i}`);r&&(r.scrollIntoView(),r.classList.add("active")),this.loadRoute(i||this.defaultRouteName,!1)}}createRouteLinks(){var t,e,s;for(const i of xn){const r=document.createElement("li");r.className="nav-item";const a=document.createElement("a");a.id=i.name,a.className="nav-link",a.textContent=i.title,r.appendChild(a),a.addEventListener("click",this.clickEventListener.bind(this)),(t=document.querySelector(".navbar-nav"))==null||t.appendChild(r)}for(const i of oi){const r=document.createElement("li");r.className="m-1";const a=document.createElement("p");a.className="navbar-vertical-label mb-1",a.textContent=i.name,r.appendChild(a),(e=document.querySelector(".nav-pills"))==null||e.appendChild(r);for(const o of i.routes){const l=document.createElement("li");l.className="nav-item";const d=document.createElement("a");d.id=o.name,d.className="nav-link",d.textContent=o.title,d.addEventListener("click",this.clickEventListener.bind(this)),l.appendChild(d),(s=document.querySelector(".nav-pills"))==null||s.appendChild(l)}}}async loadRoute(t,e=!0){var r;const s=document.querySelector(".panel-wm-content");s.textContent="",s.classList.add("cloak");let i=xn.find(a=>a.name===t);if((i==null?void 0:i.name)==="examples"){const a=document.querySelector(".nav-pills .nav-item a.nav-link:not([href])");a==null||a.classList.add("active")}else for(const a of oi){const o=a.routes.find(l=>l.name===t);o&&(i=o)}if(this.currentModel&&this.unmountCurrentVM(this.currentModel,this.currentRouter),i!=null&&i.view){this.currentRouter=i,document.querySelector(".panel-wm-content").innerHTML=Sh[i.view];const a=new i.viewModel;this.currentModel=a,window[i.name]=(r=a.mount)==null?void 0:r.call(a),window.onbeforeunload=()=>{var o;s.classList.add("cloak"),(o=a.unmount)==null||o.call(a),this.removeAllActiveLinks(!0),this.unmountAll(),i!=null&&i.name&&delete window[i.name]}}e&&window.history.pushState({},t,`${this.baseUrl}${this.stateBangChar}${t}`),document.title=`Excel-Builder-Vanilla · ${t}`,s.classList.remove("cloak")}async clickEventListener(t){const e=t.target,s=xn.find(i=>i.name===e.id);if(s!=null&&s.href){window.open(s.href,"_blank");return}this.removeAllActiveLinks(),e.classList.toggle("active"),this.loadRoute(e.id)}removeAllActiveLinks(t=!1){document.querySelectorAll(".panel-wm-left a.nav-link,.navbar-nav a.nav-link").forEach(e=>{e.classList.remove("active"),t&&e.removeEventListener("click",this.clickEventListener.bind(this))})}unmountCurrentVM(t,e){var s;(s=t.unmount)==null||s.call(t),e&&delete window[e.name]}unmountAll(){for(const t of Object.keys(this.viewModelObj)){const e=this.viewModelObj[t];if(typeof(e==null?void 0:e.unmount)=="function"){e==null||e.unmount();for(const s of Object.keys(e))e[s]=null}window[t]=null,this.viewModelObj[t]=null,delete window[t],delete this.viewModelObj[t]}}}const Nh=new kh;Nh.init();
