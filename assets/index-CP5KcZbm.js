var Tr=Object.defineProperty;var Sr=(s,t,e)=>t in s?Tr(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var V=(s,t,e)=>Sr(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const kr=`<!DOCTYPE html>
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
</div>`,Nr=`<div class="example02">
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
`,Dr=`<div class="example03">
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
</div>`,Lr=`<div class="example04">
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
`,$r=`<div class="example05">
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
`,Ir=`<div class="example06">
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
`,Mr=`<div class="example07">
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
`,Pr=`<div class="example08">
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
`,Rr=`<div class="example09">
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
`,Br=`<div class="example10">
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
`,Fr=`<div class="example11">
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
`,Vr=`<div class="example12">
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
`,Wr=`<div class="row mb-2">
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
`,ci=`<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
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
`;var q="top",Q="bottom",J="right",Y="left",Ue="auto",le=[q,Q,J,Y],Ft="start",te="end",di="clippingParents",Vn="viewport",Yt="popper",hi="reference",Tn=le.reduce(function(s,t){return s.concat([t+"-"+Ft,t+"-"+te])},[]),Wn=[].concat(le,[Ue]).reduce(function(s,t){return s.concat([t,t+"-"+Ft,t+"-"+te])},[]),ui="beforeRead",pi="read",mi="afterRead",fi="beforeMain",gi="main",bi="afterMain",vi="beforeWrite",_i="write",Ei="afterWrite",yi=[ui,pi,mi,fi,gi,bi,vi,_i,Ei];function mt(s){return s?(s.nodeName||"").toLowerCase():null}function Z(s){if(s==null)return window;if(s.toString()!=="[object Window]"){var t=s.ownerDocument;return t&&t.defaultView||window}return s}function Vt(s){var t=Z(s).Element;return s instanceof t||s instanceof Element}function et(s){var t=Z(s).HTMLElement;return s instanceof t||s instanceof HTMLElement}function jn(s){if(typeof ShadowRoot>"u")return!1;var t=Z(s).ShadowRoot;return s instanceof t||s instanceof ShadowRoot}function jr(s){var t=s.state;Object.keys(t.elements).forEach(function(e){var n=t.styles[e]||{},i=t.attributes[e]||{},r=t.elements[e];!et(r)||!mt(r)||(Object.assign(r.style,n),Object.keys(i).forEach(function(o){var a=i[o];a===!1?r.removeAttribute(o):r.setAttribute(o,a===!0?"":a)}))})}function Hr(s){var t=s.state,e={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,e.popper),t.styles=e,t.elements.arrow&&Object.assign(t.elements.arrow.style,e.arrow),function(){Object.keys(t.elements).forEach(function(n){var i=t.elements[n],r=t.attributes[n]||{},o=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:e[n]),a=o.reduce(function(l,d){return l[d]="",l},{});!et(i)||!mt(i)||(Object.assign(i.style,a),Object.keys(r).forEach(function(l){i.removeAttribute(l)}))})}}const Hn={name:"applyStyles",enabled:!0,phase:"write",fn:jr,effect:Hr,requires:["computeStyles"]};function ut(s){return s.split("-")[0]}var Bt=Math.max,We=Math.min,ee=Math.round;function Sn(){var s=navigator.userAgentData;return s!=null&&s.brands&&Array.isArray(s.brands)?s.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function wi(){return!/^((?!chrome|android).)*safari/i.test(Sn())}function ne(s,t,e){t===void 0&&(t=!1),e===void 0&&(e=!1);var n=s.getBoundingClientRect(),i=1,r=1;t&&et(s)&&(i=s.offsetWidth>0&&ee(n.width)/s.offsetWidth||1,r=s.offsetHeight>0&&ee(n.height)/s.offsetHeight||1);var o=Vt(s)?Z(s):window,a=o.visualViewport,l=!wi()&&e,d=(n.left+(l&&a?a.offsetLeft:0))/i,c=(n.top+(l&&a?a.offsetTop:0))/r,g=n.width/i,v=n.height/r;return{width:g,height:v,top:c,right:d+g,bottom:c+v,left:d,x:d,y:c}}function zn(s){var t=ne(s),e=s.offsetWidth,n=s.offsetHeight;return Math.abs(t.width-e)<=1&&(e=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:s.offsetLeft,y:s.offsetTop,width:e,height:n}}function Ai(s,t){var e=t.getRootNode&&t.getRootNode();if(s.contains(t))return!0;if(e&&jn(e)){var n=t;do{if(n&&s.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function vt(s){return Z(s).getComputedStyle(s)}function zr(s){return["table","td","th"].indexOf(mt(s))>=0}function Ot(s){return((Vt(s)?s.ownerDocument:s.document)||window.document).documentElement}function Xe(s){return mt(s)==="html"?s:s.assignedSlot||s.parentNode||(jn(s)?s.host:null)||Ot(s)}function _s(s){return!et(s)||vt(s).position==="fixed"?null:s.offsetParent}function Kr(s){var t=/firefox/i.test(Sn()),e=/Trident/i.test(Sn());if(e&&et(s)){var n=vt(s);if(n.position==="fixed")return null}var i=Xe(s);for(jn(i)&&(i=i.host);et(i)&&["html","body"].indexOf(mt(i))<0;){var r=vt(i);if(r.transform!=="none"||r.perspective!=="none"||r.contain==="paint"||["transform","perspective"].indexOf(r.willChange)!==-1||t&&r.willChange==="filter"||t&&r.filter&&r.filter!=="none")return i;i=i.parentNode}return null}function Ee(s){for(var t=Z(s),e=_s(s);e&&zr(e)&&vt(e).position==="static";)e=_s(e);return e&&(mt(e)==="html"||mt(e)==="body"&&vt(e).position==="static")?t:e||Kr(s)||t}function Kn(s){return["top","bottom"].indexOf(s)>=0?"x":"y"}function ge(s,t,e){return Bt(s,We(t,e))}function qr(s,t,e){var n=ge(s,t,e);return n>e?e:n}function xi(){return{top:0,right:0,bottom:0,left:0}}function Ci(s){return Object.assign({},xi(),s)}function Ti(s,t){return t.reduce(function(e,n){return e[n]=s,e},{})}var Yr=function(t,e){return t=typeof t=="function"?t(Object.assign({},e.rects,{placement:e.placement})):t,Ci(typeof t!="number"?t:Ti(t,le))};function Ur(s){var t,e=s.state,n=s.name,i=s.options,r=e.elements.arrow,o=e.modifiersData.popperOffsets,a=ut(e.placement),l=Kn(a),d=[Y,J].indexOf(a)>=0,c=d?"height":"width";if(!(!r||!o)){var g=Yr(i.padding,e),v=zn(r),f=l==="y"?q:Y,_=l==="y"?Q:J,p=e.rects.reference[c]+e.rects.reference[l]-o[l]-e.rects.popper[c],b=o[l]-e.rects.reference[l],E=Ee(r),A=E?l==="y"?E.clientHeight||0:E.clientWidth||0:0,C=p/2-b/2,m=g[f],T=A-v[c]-g[_],k=A/2-v[c]/2+C,O=ge(m,k,T),S=l;e.modifiersData[n]=(t={},t[S]=O,t.centerOffset=O-k,t)}}function Xr(s){var t=s.state,e=s.options,n=e.element,i=n===void 0?"[data-popper-arrow]":n;i!=null&&(typeof i=="string"&&(i=t.elements.popper.querySelector(i),!i)||Ai(t.elements.popper,i)&&(t.elements.arrow=i))}const Si={name:"arrow",enabled:!0,phase:"main",fn:Ur,effect:Xr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function se(s){return s.split("-")[1]}var Gr={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Qr(s,t){var e=s.x,n=s.y,i=t.devicePixelRatio||1;return{x:ee(e*i)/i||0,y:ee(n*i)/i||0}}function Es(s){var t,e=s.popper,n=s.popperRect,i=s.placement,r=s.variation,o=s.offsets,a=s.position,l=s.gpuAcceleration,d=s.adaptive,c=s.roundOffsets,g=s.isFixed,v=o.x,f=v===void 0?0:v,_=o.y,p=_===void 0?0:_,b=typeof c=="function"?c({x:f,y:p}):{x:f,y:p};f=b.x,p=b.y;var E=o.hasOwnProperty("x"),A=o.hasOwnProperty("y"),C=Y,m=q,T=window;if(d){var k=Ee(e),O="clientHeight",S="clientWidth";if(k===Z(e)&&(k=Ot(e),vt(k).position!=="static"&&a==="absolute"&&(O="scrollHeight",S="scrollWidth")),k=k,i===q||(i===Y||i===J)&&r===te){m=Q;var y=g&&k===T&&T.visualViewport?T.visualViewport.height:k[O];p-=y-n.height,p*=l?1:-1}if(i===Y||(i===q||i===Q)&&r===te){C=J;var N=g&&k===T&&T.visualViewport?T.visualViewport.width:k[S];f-=N-n.width,f*=l?1:-1}}var I=Object.assign({position:a},d&&Gr),L=c===!0?Qr({x:f,y:p},Z(e)):{x:f,y:p};if(f=L.x,p=L.y,l){var M;return Object.assign({},I,(M={},M[m]=A?"0":"",M[C]=E?"0":"",M.transform=(T.devicePixelRatio||1)<=1?"translate("+f+"px, "+p+"px)":"translate3d("+f+"px, "+p+"px, 0)",M))}return Object.assign({},I,(t={},t[m]=A?p+"px":"",t[C]=E?f+"px":"",t.transform="",t))}function Jr(s){var t=s.state,e=s.options,n=e.gpuAcceleration,i=n===void 0?!0:n,r=e.adaptive,o=r===void 0?!0:r,a=e.roundOffsets,l=a===void 0?!0:a,d={placement:ut(t.placement),variation:se(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Es(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:o,roundOffsets:l})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Es(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const qn={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Jr,data:{}};var ke={passive:!0};function Zr(s){var t=s.state,e=s.instance,n=s.options,i=n.scroll,r=i===void 0?!0:i,o=n.resize,a=o===void 0?!0:o,l=Z(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return r&&d.forEach(function(c){c.addEventListener("scroll",e.update,ke)}),a&&l.addEventListener("resize",e.update,ke),function(){r&&d.forEach(function(c){c.removeEventListener("scroll",e.update,ke)}),a&&l.removeEventListener("resize",e.update,ke)}}const Yn={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Zr,data:{}};var to={left:"right",right:"left",bottom:"top",top:"bottom"};function Pe(s){return s.replace(/left|right|bottom|top/g,function(t){return to[t]})}var eo={start:"end",end:"start"};function ys(s){return s.replace(/start|end/g,function(t){return eo[t]})}function Un(s){var t=Z(s),e=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:e,scrollTop:n}}function Xn(s){return ne(Ot(s)).left+Un(s).scrollLeft}function no(s,t){var e=Z(s),n=Ot(s),i=e.visualViewport,r=n.clientWidth,o=n.clientHeight,a=0,l=0;if(i){r=i.width,o=i.height;var d=wi();(d||!d&&t==="fixed")&&(a=i.offsetLeft,l=i.offsetTop)}return{width:r,height:o,x:a+Xn(s),y:l}}function so(s){var t,e=Ot(s),n=Un(s),i=(t=s.ownerDocument)==null?void 0:t.body,r=Bt(e.scrollWidth,e.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),o=Bt(e.scrollHeight,e.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),a=-n.scrollLeft+Xn(s),l=-n.scrollTop;return vt(i||e).direction==="rtl"&&(a+=Bt(e.clientWidth,i?i.clientWidth:0)-r),{width:r,height:o,x:a,y:l}}function Gn(s){var t=vt(s),e=t.overflow,n=t.overflowX,i=t.overflowY;return/auto|scroll|overlay|hidden/.test(e+i+n)}function ki(s){return["html","body","#document"].indexOf(mt(s))>=0?s.ownerDocument.body:et(s)&&Gn(s)?s:ki(Xe(s))}function be(s,t){var e;t===void 0&&(t=[]);var n=ki(s),i=n===((e=s.ownerDocument)==null?void 0:e.body),r=Z(n),o=i?[r].concat(r.visualViewport||[],Gn(n)?n:[]):n,a=t.concat(o);return i?a:a.concat(be(Xe(o)))}function kn(s){return Object.assign({},s,{left:s.x,top:s.y,right:s.x+s.width,bottom:s.y+s.height})}function io(s,t){var e=ne(s,!1,t==="fixed");return e.top=e.top+s.clientTop,e.left=e.left+s.clientLeft,e.bottom=e.top+s.clientHeight,e.right=e.left+s.clientWidth,e.width=s.clientWidth,e.height=s.clientHeight,e.x=e.left,e.y=e.top,e}function ws(s,t,e){return t===Vn?kn(no(s,e)):Vt(t)?io(t,e):kn(so(Ot(s)))}function ro(s){var t=be(Xe(s)),e=["absolute","fixed"].indexOf(vt(s).position)>=0,n=e&&et(s)?Ee(s):s;return Vt(n)?t.filter(function(i){return Vt(i)&&Ai(i,n)&&mt(i)!=="body"}):[]}function oo(s,t,e,n){var i=t==="clippingParents"?ro(s):[].concat(t),r=[].concat(i,[e]),o=r[0],a=r.reduce(function(l,d){var c=ws(s,d,n);return l.top=Bt(c.top,l.top),l.right=We(c.right,l.right),l.bottom=We(c.bottom,l.bottom),l.left=Bt(c.left,l.left),l},ws(s,o,n));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Oi(s){var t=s.reference,e=s.element,n=s.placement,i=n?ut(n):null,r=n?se(n):null,o=t.x+t.width/2-e.width/2,a=t.y+t.height/2-e.height/2,l;switch(i){case q:l={x:o,y:t.y-e.height};break;case Q:l={x:o,y:t.y+t.height};break;case J:l={x:t.x+t.width,y:a};break;case Y:l={x:t.x-e.width,y:a};break;default:l={x:t.x,y:t.y}}var d=i?Kn(i):null;if(d!=null){var c=d==="y"?"height":"width";switch(r){case Ft:l[d]=l[d]-(t[c]/2-e[c]/2);break;case te:l[d]=l[d]+(t[c]/2-e[c]/2);break}}return l}function ie(s,t){t===void 0&&(t={});var e=t,n=e.placement,i=n===void 0?s.placement:n,r=e.strategy,o=r===void 0?s.strategy:r,a=e.boundary,l=a===void 0?di:a,d=e.rootBoundary,c=d===void 0?Vn:d,g=e.elementContext,v=g===void 0?Yt:g,f=e.altBoundary,_=f===void 0?!1:f,p=e.padding,b=p===void 0?0:p,E=Ci(typeof b!="number"?b:Ti(b,le)),A=v===Yt?hi:Yt,C=s.rects.popper,m=s.elements[_?A:v],T=oo(Vt(m)?m:m.contextElement||Ot(s.elements.popper),l,c,o),k=ne(s.elements.reference),O=Oi({reference:k,element:C,strategy:"absolute",placement:i}),S=kn(Object.assign({},C,O)),y=v===Yt?S:k,N={top:T.top-y.top+E.top,bottom:y.bottom-T.bottom+E.bottom,left:T.left-y.left+E.left,right:y.right-T.right+E.right},I=s.modifiersData.offset;if(v===Yt&&I){var L=I[i];Object.keys(N).forEach(function(M){var P=[J,Q].indexOf(M)>=0?1:-1,F=[q,Q].indexOf(M)>=0?"y":"x";N[M]+=L[F]*P})}return N}function ao(s,t){t===void 0&&(t={});var e=t,n=e.placement,i=e.boundary,r=e.rootBoundary,o=e.padding,a=e.flipVariations,l=e.allowedAutoPlacements,d=l===void 0?Wn:l,c=se(n),g=c?a?Tn:Tn.filter(function(_){return se(_)===c}):le,v=g.filter(function(_){return d.indexOf(_)>=0});v.length===0&&(v=g);var f=v.reduce(function(_,p){return _[p]=ie(s,{placement:p,boundary:i,rootBoundary:r,padding:o})[ut(p)],_},{});return Object.keys(f).sort(function(_,p){return f[_]-f[p]})}function lo(s){if(ut(s)===Ue)return[];var t=Pe(s);return[ys(s),t,ys(t)]}function co(s){var t=s.state,e=s.options,n=s.name;if(!t.modifiersData[n]._skip){for(var i=e.mainAxis,r=i===void 0?!0:i,o=e.altAxis,a=o===void 0?!0:o,l=e.fallbackPlacements,d=e.padding,c=e.boundary,g=e.rootBoundary,v=e.altBoundary,f=e.flipVariations,_=f===void 0?!0:f,p=e.allowedAutoPlacements,b=t.options.placement,E=ut(b),A=E===b,C=l||(A||!_?[Pe(b)]:lo(b)),m=[b].concat(C).reduce(function(W,R){return W.concat(ut(R)===Ue?ao(t,{placement:R,boundary:c,rootBoundary:g,padding:d,flipVariations:_,allowedAutoPlacements:p}):R)},[]),T=t.rects.reference,k=t.rects.popper,O=new Map,S=!0,y=m[0],N=0;N<m.length;N++){var I=m[N],L=ut(I),M=se(I)===Ft,P=[q,Q].indexOf(L)>=0,F=P?"width":"height",$=ie(t,{placement:I,boundary:c,rootBoundary:g,altBoundary:v,padding:d}),D=P?M?J:Y:M?Q:q;T[F]>k[F]&&(D=Pe(D));var z=Pe(D),K=[];if(r&&K.push($[L]<=0),a&&K.push($[D]<=0,$[z]<=0),K.every(function(W){return W})){y=I,S=!1;break}O.set(I,K)}if(S)for(var yt=_?3:1,U=function(R){var tt=m.find(function(Lt){var lt=O.get(Lt);if(lt)return lt.slice(0,R).every(function(ue){return ue})});if(tt)return y=tt,"break"},ot=yt;ot>0;ot--){var at=U(ot);if(at==="break")break}t.placement!==y&&(t.modifiersData[n]._skip=!0,t.placement=y,t.reset=!0)}}const Ni={name:"flip",enabled:!0,phase:"main",fn:co,requiresIfExists:["offset"],data:{_skip:!1}};function As(s,t,e){return e===void 0&&(e={x:0,y:0}),{top:s.top-t.height-e.y,right:s.right-t.width+e.x,bottom:s.bottom-t.height+e.y,left:s.left-t.width-e.x}}function xs(s){return[q,J,Q,Y].some(function(t){return s[t]>=0})}function ho(s){var t=s.state,e=s.name,n=t.rects.reference,i=t.rects.popper,r=t.modifiersData.preventOverflow,o=ie(t,{elementContext:"reference"}),a=ie(t,{altBoundary:!0}),l=As(o,n),d=As(a,i,r),c=xs(l),g=xs(d);t.modifiersData[e]={referenceClippingOffsets:l,popperEscapeOffsets:d,isReferenceHidden:c,hasPopperEscaped:g},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":g})}const Di={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:ho};function uo(s,t,e){var n=ut(s),i=[Y,q].indexOf(n)>=0?-1:1,r=typeof e=="function"?e(Object.assign({},t,{placement:s})):e,o=r[0],a=r[1];return o=o||0,a=(a||0)*i,[Y,J].indexOf(n)>=0?{x:a,y:o}:{x:o,y:a}}function po(s){var t=s.state,e=s.options,n=s.name,i=e.offset,r=i===void 0?[0,0]:i,o=Wn.reduce(function(c,g){return c[g]=uo(g,t.rects,r),c},{}),a=o[t.placement],l=a.x,d=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=d),t.modifiersData[n]=o}const Li={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:po};function mo(s){var t=s.state,e=s.name;t.modifiersData[e]=Oi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Qn={name:"popperOffsets",enabled:!0,phase:"read",fn:mo,data:{}};function fo(s){return s==="x"?"y":"x"}function go(s){var t=s.state,e=s.options,n=s.name,i=e.mainAxis,r=i===void 0?!0:i,o=e.altAxis,a=o===void 0?!1:o,l=e.boundary,d=e.rootBoundary,c=e.altBoundary,g=e.padding,v=e.tether,f=v===void 0?!0:v,_=e.tetherOffset,p=_===void 0?0:_,b=ie(t,{boundary:l,rootBoundary:d,padding:g,altBoundary:c}),E=ut(t.placement),A=se(t.placement),C=!A,m=Kn(E),T=fo(m),k=t.modifiersData.popperOffsets,O=t.rects.reference,S=t.rects.popper,y=typeof p=="function"?p(Object.assign({},t.rects,{placement:t.placement})):p,N=typeof y=="number"?{mainAxis:y,altAxis:y}:Object.assign({mainAxis:0,altAxis:0},y),I=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,L={x:0,y:0};if(k){if(r){var M,P=m==="y"?q:Y,F=m==="y"?Q:J,$=m==="y"?"height":"width",D=k[m],z=D+b[P],K=D-b[F],yt=f?-S[$]/2:0,U=A===Ft?O[$]:S[$],ot=A===Ft?-S[$]:-O[$],at=t.elements.arrow,W=f&&at?zn(at):{width:0,height:0},R=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:xi(),tt=R[P],Lt=R[F],lt=ge(0,O[$],W[$]),ue=C?O[$]/2-yt-lt-tt-N.mainAxis:U-lt-tt-N.mainAxis,Ce=C?-O[$]/2+yt+lt+Lt+N.mainAxis:ot+lt+Lt+N.mainAxis,Ht=t.elements.arrow&&Ee(t.elements.arrow),Te=Ht?m==="y"?Ht.clientTop||0:Ht.clientLeft||0:0,zt=(M=I==null?void 0:I[m])!=null?M:0,pe=D+ue-zt-Te,Ar=D+Ce-zt,hs=ge(f?We(z,pe):z,D,f?Bt(K,Ar):K);k[m]=hs,L[m]=hs-D}if(a){var us,xr=m==="x"?q:Y,Cr=m==="x"?Q:J,$t=k[T],Se=T==="y"?"height":"width",ps=$t+b[xr],ms=$t-b[Cr],ln=[q,Y].indexOf(E)!==-1,fs=(us=I==null?void 0:I[T])!=null?us:0,gs=ln?ps:$t-O[Se]-S[Se]-fs+N.altAxis,bs=ln?$t+O[Se]+S[Se]-fs-N.altAxis:ms,vs=f&&ln?qr(gs,$t,bs):ge(f?gs:ps,$t,f?bs:ms);k[T]=vs,L[T]=vs-$t}t.modifiersData[n]=L}}const $i={name:"preventOverflow",enabled:!0,phase:"main",fn:go,requiresIfExists:["offset"]};function bo(s){return{scrollLeft:s.scrollLeft,scrollTop:s.scrollTop}}function vo(s){return s===Z(s)||!et(s)?Un(s):bo(s)}function _o(s){var t=s.getBoundingClientRect(),e=ee(t.width)/s.offsetWidth||1,n=ee(t.height)/s.offsetHeight||1;return e!==1||n!==1}function Eo(s,t,e){e===void 0&&(e=!1);var n=et(t),i=et(t)&&_o(t),r=Ot(t),o=ne(s,i,e),a={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(n||!n&&!e)&&((mt(t)!=="body"||Gn(r))&&(a=vo(t)),et(t)?(l=ne(t,!0),l.x+=t.clientLeft,l.y+=t.clientTop):r&&(l.x=Xn(r))),{x:o.left+a.scrollLeft-l.x,y:o.top+a.scrollTop-l.y,width:o.width,height:o.height}}function yo(s){var t=new Map,e=new Set,n=[];s.forEach(function(r){t.set(r.name,r)});function i(r){e.add(r.name);var o=[].concat(r.requires||[],r.requiresIfExists||[]);o.forEach(function(a){if(!e.has(a)){var l=t.get(a);l&&i(l)}}),n.push(r)}return s.forEach(function(r){e.has(r.name)||i(r)}),n}function wo(s){var t=yo(s);return yi.reduce(function(e,n){return e.concat(t.filter(function(i){return i.phase===n}))},[])}function Ao(s){var t;return function(){return t||(t=new Promise(function(e){Promise.resolve().then(function(){t=void 0,e(s())})})),t}}function xo(s){var t=s.reduce(function(e,n){var i=e[n.name];return e[n.name]=i?Object.assign({},i,n,{options:Object.assign({},i.options,n.options),data:Object.assign({},i.data,n.data)}):n,e},{});return Object.keys(t).map(function(e){return t[e]})}var Cs={placement:"bottom",modifiers:[],strategy:"absolute"};function Ts(){for(var s=arguments.length,t=new Array(s),e=0;e<s;e++)t[e]=arguments[e];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Ge(s){s===void 0&&(s={});var t=s,e=t.defaultModifiers,n=e===void 0?[]:e,i=t.defaultOptions,r=i===void 0?Cs:i;return function(a,l,d){d===void 0&&(d=r);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},Cs,r),modifiersData:{},elements:{reference:a,popper:l},attributes:{},styles:{}},g=[],v=!1,f={state:c,setOptions:function(E){var A=typeof E=="function"?E(c.options):E;p(),c.options=Object.assign({},r,c.options,A),c.scrollParents={reference:Vt(a)?be(a):a.contextElement?be(a.contextElement):[],popper:be(l)};var C=wo(xo([].concat(n,c.options.modifiers)));return c.orderedModifiers=C.filter(function(m){return m.enabled}),_(),f.update()},forceUpdate:function(){if(!v){var E=c.elements,A=E.reference,C=E.popper;if(Ts(A,C)){c.rects={reference:Eo(A,Ee(C),c.options.strategy==="fixed"),popper:zn(C)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function(N){return c.modifiersData[N.name]=Object.assign({},N.data)});for(var m=0;m<c.orderedModifiers.length;m++){if(c.reset===!0){c.reset=!1,m=-1;continue}var T=c.orderedModifiers[m],k=T.fn,O=T.options,S=O===void 0?{}:O,y=T.name;typeof k=="function"&&(c=k({state:c,options:S,name:y,instance:f})||c)}}}},update:Ao(function(){return new Promise(function(b){f.forceUpdate(),b(c)})}),destroy:function(){p(),v=!0}};if(!Ts(a,l))return f;f.setOptions(d).then(function(b){!v&&d.onFirstUpdate&&d.onFirstUpdate(b)});function _(){c.orderedModifiers.forEach(function(b){var E=b.name,A=b.options,C=A===void 0?{}:A,m=b.effect;if(typeof m=="function"){var T=m({state:c,name:E,instance:f,options:C}),k=function(){};g.push(T||k)}})}function p(){g.forEach(function(b){return b()}),g=[]}return f}}var Co=Ge(),To=[Yn,Qn,qn,Hn],So=Ge({defaultModifiers:To}),ko=[Yn,Qn,qn,Hn,Li,Ni,$i,Si,Di],Jn=Ge({defaultModifiers:ko});const Ii=Object.freeze(Object.defineProperty({__proto__:null,afterMain:bi,afterRead:mi,afterWrite:Ei,applyStyles:Hn,arrow:Si,auto:Ue,basePlacements:le,beforeMain:fi,beforeRead:ui,beforeWrite:vi,bottom:Q,clippingParents:di,computeStyles:qn,createPopper:Jn,createPopperBase:Co,createPopperLite:So,detectOverflow:ie,end:te,eventListeners:Yn,flip:Ni,hide:Di,left:Y,main:gi,modifierPhases:yi,offset:Li,placements:Wn,popper:Yt,popperGenerator:Ge,popperOffsets:Qn,preventOverflow:$i,read:pi,reference:hi,right:J,start:Ft,top:q,variationPlacements:Tn,viewport:Vn,write:_i},Symbol.toStringTag,{value:"Module"}));/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */const wt=new Map,cn={set(s,t,e){wt.has(s)||wt.set(s,new Map);const n=wt.get(s);if(!n.has(t)&&n.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);return}n.set(t,e)},get(s,t){return wt.has(s)&&wt.get(s).get(t)||null},remove(s,t){if(!wt.has(s))return;const e=wt.get(s);e.delete(t),e.size===0&&wt.delete(s)}},Oo=1e6,No=1e3,On="transitionend",Mi=s=>(s&&window.CSS&&window.CSS.escape&&(s=s.replace(/#([^\s"#']+)/g,(t,e)=>`#${CSS.escape(e)}`)),s),Do=s=>s==null?`${s}`:Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(),Lo=s=>{do s+=Math.floor(Math.random()*Oo);while(document.getElementById(s));return s},$o=s=>{if(!s)return 0;let{transitionDuration:t,transitionDelay:e}=window.getComputedStyle(s);const n=Number.parseFloat(t),i=Number.parseFloat(e);return!n&&!i?0:(t=t.split(",")[0],e=e.split(",")[0],(Number.parseFloat(t)+Number.parseFloat(e))*No)},Pi=s=>{s.dispatchEvent(new Event(On))},gt=s=>!s||typeof s!="object"?!1:(typeof s.jquery<"u"&&(s=s[0]),typeof s.nodeType<"u"),Ct=s=>gt(s)?s.jquery?s[0]:s:typeof s=="string"&&s.length>0?document.querySelector(Mi(s)):null,ce=s=>{if(!gt(s)||s.getClientRects().length===0)return!1;const t=getComputedStyle(s).getPropertyValue("visibility")==="visible",e=s.closest("details:not([open])");if(!e)return t;if(e!==s){const n=s.closest("summary");if(n&&n.parentNode!==e||n===null)return!1}return t},Tt=s=>!s||s.nodeType!==Node.ELEMENT_NODE||s.classList.contains("disabled")?!0:typeof s.disabled<"u"?s.disabled:s.hasAttribute("disabled")&&s.getAttribute("disabled")!=="false",Ri=s=>{if(!document.documentElement.attachShadow)return null;if(typeof s.getRootNode=="function"){const t=s.getRootNode();return t instanceof ShadowRoot?t:null}return s instanceof ShadowRoot?s:s.parentNode?Ri(s.parentNode):null},je=()=>{},ye=s=>{s.offsetHeight},Bi=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,dn=[],Io=s=>{document.readyState==="loading"?(dn.length||document.addEventListener("DOMContentLoaded",()=>{for(const t of dn)t()}),dn.push(s)):s()},nt=()=>document.documentElement.dir==="rtl",it=s=>{Io(()=>{const t=Bi();if(t){const e=s.NAME,n=t.fn[e];t.fn[e]=s.jQueryInterface,t.fn[e].Constructor=s,t.fn[e].noConflict=()=>(t.fn[e]=n,s.jQueryInterface)}})},X=(s,t=[],e=s)=>typeof s=="function"?s(...t):e,Fi=(s,t,e=!0)=>{if(!e){X(s);return}const i=$o(t)+5;let r=!1;const o=({target:a})=>{a===t&&(r=!0,t.removeEventListener(On,o),X(s))};t.addEventListener(On,o),setTimeout(()=>{r||Pi(t)},i)},Zn=(s,t,e,n)=>{const i=s.length;let r=s.indexOf(t);return r===-1?!e&&n?s[i-1]:s[0]:(r+=e?1:-1,n&&(r=(r+i)%i),s[Math.max(0,Math.min(r,i-1))])},Mo=/[^.]*(?=\..*)\.|.*/,Po=/\..*/,Ro=/::\d+$/,hn={};let Ss=1;const Vi={mouseenter:"mouseover",mouseleave:"mouseout"},Bo=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function Wi(s,t){return t&&`${t}::${Ss++}`||s.uidEvent||Ss++}function ji(s){const t=Wi(s);return s.uidEvent=t,hn[t]=hn[t]||{},hn[t]}function Fo(s,t){return function e(n){return ts(n,{delegateTarget:s}),e.oneOff&&u.off(s,n.type,t),t.apply(s,[n])}}function Vo(s,t,e){return function n(i){const r=s.querySelectorAll(t);for(let{target:o}=i;o&&o!==this;o=o.parentNode)for(const a of r)if(a===o)return ts(i,{delegateTarget:o}),n.oneOff&&u.off(s,i.type,t,e),e.apply(o,[i])}}function Hi(s,t,e=null){return Object.values(s).find(n=>n.callable===t&&n.delegationSelector===e)}function zi(s,t,e){const n=typeof t=="string",i=n?e:t||e;let r=Ki(s);return Bo.has(r)||(r=s),[n,i,r]}function ks(s,t,e,n,i){if(typeof t!="string"||!s)return;let[r,o,a]=zi(t,e,n);t in Vi&&(o=(_=>function(p){if(!p.relatedTarget||p.relatedTarget!==p.delegateTarget&&!p.delegateTarget.contains(p.relatedTarget))return _.call(this,p)})(o));const l=ji(s),d=l[a]||(l[a]={}),c=Hi(d,o,r?e:null);if(c){c.oneOff=c.oneOff&&i;return}const g=Wi(o,t.replace(Mo,"")),v=r?Vo(s,e,o):Fo(s,o);v.delegationSelector=r?e:null,v.callable=o,v.oneOff=i,v.uidEvent=g,d[g]=v,s.addEventListener(a,v,r)}function Nn(s,t,e,n,i){const r=Hi(t[e],n,i);r&&(s.removeEventListener(e,r,!!i),delete t[e][r.uidEvent])}function Wo(s,t,e,n){const i=t[e]||{};for(const[r,o]of Object.entries(i))r.includes(n)&&Nn(s,t,e,o.callable,o.delegationSelector)}function Ki(s){return s=s.replace(Po,""),Vi[s]||s}const u={on(s,t,e,n){ks(s,t,e,n,!1)},one(s,t,e,n){ks(s,t,e,n,!0)},off(s,t,e,n){if(typeof t!="string"||!s)return;const[i,r,o]=zi(t,e,n),a=o!==t,l=ji(s),d=l[o]||{},c=t.startsWith(".");if(typeof r<"u"){if(!Object.keys(d).length)return;Nn(s,l,o,r,i?e:null);return}if(c)for(const g of Object.keys(l))Wo(s,l,g,t.slice(1));for(const[g,v]of Object.entries(d)){const f=g.replace(Ro,"");(!a||t.includes(f))&&Nn(s,l,o,v.callable,v.delegationSelector)}},trigger(s,t,e){if(typeof t!="string"||!s)return null;const n=Bi(),i=Ki(t),r=t!==i;let o=null,a=!0,l=!0,d=!1;r&&n&&(o=n.Event(t,e),n(s).trigger(o),a=!o.isPropagationStopped(),l=!o.isImmediatePropagationStopped(),d=o.isDefaultPrevented());const c=ts(new Event(t,{bubbles:a,cancelable:!0}),e);return d&&c.preventDefault(),l&&s.dispatchEvent(c),c.defaultPrevented&&o&&o.preventDefault(),c}};function ts(s,t={}){for(const[e,n]of Object.entries(t))try{s[e]=n}catch{Object.defineProperty(s,e,{configurable:!0,get(){return n}})}return s}function Os(s){if(s==="true")return!0;if(s==="false")return!1;if(s===Number(s).toString())return Number(s);if(s===""||s==="null")return null;if(typeof s!="string")return s;try{return JSON.parse(decodeURIComponent(s))}catch{return s}}function un(s){return s.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}const bt={setDataAttribute(s,t,e){s.setAttribute(`data-bs-${un(t)}`,e)},removeDataAttribute(s,t){s.removeAttribute(`data-bs-${un(t)}`)},getDataAttributes(s){if(!s)return{};const t={},e=Object.keys(s.dataset).filter(n=>n.startsWith("bs")&&!n.startsWith("bsConfig"));for(const n of e){let i=n.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),t[i]=Os(s.dataset[n])}return t},getDataAttribute(s,t){return Os(s.getAttribute(`data-bs-${un(t)}`))}};class we{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const n=gt(e)?bt.getDataAttribute(e,"config"):{};return{...this.constructor.Default,...typeof n=="object"?n:{},...gt(e)?bt.getDataAttributes(e):{},...typeof t=="object"?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const[n,i]of Object.entries(e)){const r=t[n],o=gt(r)?"element":Do(r);if(!new RegExp(i).test(o))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`)}}}const jo="5.3.3";class ct extends we{constructor(t,e){super(),t=Ct(t),t&&(this._element=t,this._config=this._getConfig(e),cn.set(this._element,this.constructor.DATA_KEY,this))}dispose(){cn.remove(this._element,this.constructor.DATA_KEY),u.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,n=!0){Fi(t,e,n)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return cn.get(Ct(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,typeof e=="object"?e:null)}static get VERSION(){return jo}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}}const pn=s=>{let t=s.getAttribute("data-bs-target");if(!t||t==="#"){let e=s.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;e.includes("#")&&!e.startsWith("#")&&(e=`#${e.split("#")[1]}`),t=e&&e!=="#"?e.trim():null}return t?t.split(",").map(e=>Mi(e)).join(","):null},x={find(s,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,s))},findOne(s,t=document.documentElement){return Element.prototype.querySelector.call(t,s)},children(s,t){return[].concat(...s.children).filter(e=>e.matches(t))},parents(s,t){const e=[];let n=s.parentNode.closest(t);for(;n;)e.push(n),n=n.parentNode.closest(t);return e},prev(s,t){let e=s.previousElementSibling;for(;e;){if(e.matches(t))return[e];e=e.previousElementSibling}return[]},next(s,t){let e=s.nextElementSibling;for(;e;){if(e.matches(t))return[e];e=e.nextElementSibling}return[]},focusableChildren(s){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(e=>`${e}:not([tabindex^="-"])`).join(",");return this.find(t,s).filter(e=>!Tt(e)&&ce(e))},getSelectorFromElement(s){const t=pn(s);return t&&x.findOne(t)?t:null},getElementFromSelector(s){const t=pn(s);return t?x.findOne(t):null},getMultipleElementsFromSelector(s){const t=pn(s);return t?x.find(t):[]}},Qe=(s,t="hide")=>{const e=`click.dismiss${s.EVENT_KEY}`,n=s.NAME;u.on(document,e,`[data-bs-dismiss="${n}"]`,function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),Tt(this))return;const r=x.getElementFromSelector(this)||this.closest(`.${n}`);s.getOrCreateInstance(r)[t]()})},Ho="alert",zo="bs.alert",qi=`.${zo}`,Ko=`close${qi}`,qo=`closed${qi}`,Yo="fade",Uo="show";class Je extends ct{static get NAME(){return Ho}close(){if(u.trigger(this._element,Ko).defaultPrevented)return;this._element.classList.remove(Uo);const e=this._element.classList.contains(Yo);this._queueCallback(()=>this._destroyElement(),this._element,e)}_destroyElement(){this._element.remove(),u.trigger(this._element,qo),this.dispose()}static jQueryInterface(t){return this.each(function(){const e=Je.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}Qe(Je,"close");it(Je);const Xo="button",Go="bs.button",Qo=`.${Go}`,Jo=".data-api",Zo="active",Ns='[data-bs-toggle="button"]',ta=`click${Qo}${Jo}`;class Ze extends ct{static get NAME(){return Xo}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle(Zo))}static jQueryInterface(t){return this.each(function(){const e=Ze.getOrCreateInstance(this);t==="toggle"&&e[t]()})}}u.on(document,ta,Ns,s=>{s.preventDefault();const t=s.target.closest(Ns);Ze.getOrCreateInstance(t).toggle()});it(Ze);const ea="swipe",de=".bs.swipe",na=`touchstart${de}`,sa=`touchmove${de}`,ia=`touchend${de}`,ra=`pointerdown${de}`,oa=`pointerup${de}`,aa="touch",la="pen",ca="pointer-event",da=40,ha={endCallback:null,leftCallback:null,rightCallback:null},ua={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class He extends we{constructor(t,e){super(),this._element=t,!(!t||!He.isSupported())&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return ha}static get DefaultType(){return ua}static get NAME(){return ea}dispose(){u.off(this._element,de)}_start(t){if(!this._supportPointerEvents){this._deltaX=t.touches[0].clientX;return}this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX)}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),X(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=da)return;const e=t/this._deltaX;this._deltaX=0,e&&X(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(u.on(this._element,ra,t=>this._start(t)),u.on(this._element,oa,t=>this._end(t)),this._element.classList.add(ca)):(u.on(this._element,na,t=>this._start(t)),u.on(this._element,sa,t=>this._move(t)),u.on(this._element,ia,t=>this._end(t)))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&(t.pointerType===la||t.pointerType===aa)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const pa="carousel",ma="bs.carousel",Nt=`.${ma}`,Yi=".data-api",fa="ArrowLeft",ga="ArrowRight",ba=500,me="next",Kt="prev",Ut="left",Re="right",va=`slide${Nt}`,mn=`slid${Nt}`,_a=`keydown${Nt}`,Ea=`mouseenter${Nt}`,ya=`mouseleave${Nt}`,wa=`dragstart${Nt}`,Aa=`load${Nt}${Yi}`,xa=`click${Nt}${Yi}`,Ui="carousel",Oe="active",Ca="slide",Ta="carousel-item-end",Sa="carousel-item-start",ka="carousel-item-next",Oa="carousel-item-prev",Xi=".active",Gi=".carousel-item",Na=Xi+Gi,Da=".carousel-item img",La=".carousel-indicators",$a="[data-bs-slide], [data-bs-slide-to]",Ia='[data-bs-ride="carousel"]',Ma={[fa]:Re,[ga]:Ut},Pa={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},Ra={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class Ae extends ct{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=x.findOne(La,this._element),this._addEventListeners(),this._config.ride===Ui&&this.cycle()}static get Default(){return Pa}static get DefaultType(){return Ra}static get NAME(){return pa}next(){this._slide(me)}nextWhenVisible(){!document.hidden&&ce(this._element)&&this.next()}prev(){this._slide(Kt)}pause(){this._isSliding&&Pi(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){if(this._config.ride){if(this._isSliding){u.one(this._element,mn,()=>this.cycle());return}this.cycle()}}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding){u.one(this._element,mn,()=>this.to(t));return}const n=this._getItemIndex(this._getActive());if(n===t)return;const i=t>n?me:Kt;this._slide(i,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&u.on(this._element,_a,t=>this._keydown(t)),this._config.pause==="hover"&&(u.on(this._element,Ea,()=>this.pause()),u.on(this._element,ya,()=>this._maybeEnableCycle())),this._config.touch&&He.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const n of x.find(Da,this._element))u.on(n,wa,i=>i.preventDefault());const e={leftCallback:()=>this._slide(this._directionToOrder(Ut)),rightCallback:()=>this._slide(this._directionToOrder(Re)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),ba+this._config.interval))}};this._swipeHelper=new He(this._element,e)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=Ma[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=x.findOne(Xi,this._indicatorsElement);e.classList.remove(Oe),e.removeAttribute("aria-current");const n=x.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);n&&(n.classList.add(Oe),n.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const n=this._getActive(),i=t===me,r=e||Zn(this._getItems(),n,i,this._config.wrap);if(r===n)return;const o=this._getItemIndex(r),a=f=>u.trigger(this._element,f,{relatedTarget:r,direction:this._orderToDirection(t),from:this._getItemIndex(n),to:o});if(a(va).defaultPrevented||!n||!r)return;const d=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=r;const c=i?Sa:Ta,g=i?ka:Oa;r.classList.add(g),ye(r),n.classList.add(c),r.classList.add(c);const v=()=>{r.classList.remove(c,g),r.classList.add(Oe),n.classList.remove(Oe,g,c),this._isSliding=!1,a(mn)};this._queueCallback(v,n,this._isAnimated()),d&&this.cycle()}_isAnimated(){return this._element.classList.contains(Ca)}_getActive(){return x.findOne(Na,this._element)}_getItems(){return x.find(Gi,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return nt()?t===Ut?Kt:me:t===Ut?me:Kt}_orderToDirection(t){return nt()?t===Kt?Ut:Re:t===Kt?Re:Ut}static jQueryInterface(t){return this.each(function(){const e=Ae.getOrCreateInstance(this,t);if(typeof t=="number"){e.to(t);return}if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(document,xa,$a,function(s){const t=x.getElementFromSelector(this);if(!t||!t.classList.contains(Ui))return;s.preventDefault();const e=Ae.getOrCreateInstance(t),n=this.getAttribute("data-bs-slide-to");if(n){e.to(n),e._maybeEnableCycle();return}if(bt.getDataAttribute(this,"slide")==="next"){e.next(),e._maybeEnableCycle();return}e.prev(),e._maybeEnableCycle()});u.on(window,Aa,()=>{const s=x.find(Ia);for(const t of s)Ae.getOrCreateInstance(t)});it(Ae);const Ba="collapse",Fa="bs.collapse",xe=`.${Fa}`,Va=".data-api",Wa=`show${xe}`,ja=`shown${xe}`,Ha=`hide${xe}`,za=`hidden${xe}`,Ka=`click${xe}${Va}`,fn="show",Jt="collapse",Ne="collapsing",qa="collapsed",Ya=`:scope .${Jt} .${Jt}`,Ua="collapse-horizontal",Xa="width",Ga="height",Qa=".collapse.show, .collapse.collapsing",Dn='[data-bs-toggle="collapse"]',Ja={parent:null,toggle:!0},Za={parent:"(null|element)",toggle:"boolean"};class ve extends ct{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const n=x.find(Dn);for(const i of n){const r=x.getSelectorFromElement(i),o=x.find(r).filter(a=>a===this._element);r!==null&&o.length&&this._triggerArray.push(i)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return Ja}static get DefaultType(){return Za}static get NAME(){return Ba}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(Qa).filter(a=>a!==this._element).map(a=>ve.getOrCreateInstance(a,{toggle:!1}))),t.length&&t[0]._isTransitioning||u.trigger(this._element,Wa).defaultPrevented)return;for(const a of t)a.hide();const n=this._getDimension();this._element.classList.remove(Jt),this._element.classList.add(Ne),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=()=>{this._isTransitioning=!1,this._element.classList.remove(Ne),this._element.classList.add(Jt,fn),this._element.style[n]="",u.trigger(this._element,ja)},o=`scroll${n[0].toUpperCase()+n.slice(1)}`;this._queueCallback(i,this._element,!0),this._element.style[n]=`${this._element[o]}px`}hide(){if(this._isTransitioning||!this._isShown()||u.trigger(this._element,Ha).defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,ye(this._element),this._element.classList.add(Ne),this._element.classList.remove(Jt,fn);for(const i of this._triggerArray){const r=x.getElementFromSelector(i);r&&!this._isShown(r)&&this._addAriaAndCollapsedClass([i],!1)}this._isTransitioning=!0;const n=()=>{this._isTransitioning=!1,this._element.classList.remove(Ne),this._element.classList.add(Jt),u.trigger(this._element,za)};this._element.style[e]="",this._queueCallback(n,this._element,!0)}_isShown(t=this._element){return t.classList.contains(fn)}_configAfterMerge(t){return t.toggle=!!t.toggle,t.parent=Ct(t.parent),t}_getDimension(){return this._element.classList.contains(Ua)?Xa:Ga}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(Dn);for(const e of t){const n=x.getElementFromSelector(e);n&&this._addAriaAndCollapsedClass([e],this._isShown(n))}}_getFirstLevelChildren(t){const e=x.find(Ya,this._config.parent);return x.find(t,this._config.parent).filter(n=>!e.includes(n))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const n of t)n.classList.toggle(qa,!e),n.setAttribute("aria-expanded",e)}static jQueryInterface(t){const e={};return typeof t=="string"&&/show|hide/.test(t)&&(e.toggle=!1),this.each(function(){const n=ve.getOrCreateInstance(this,e);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t]()}})}}u.on(document,Ka,Dn,function(s){(s.target.tagName==="A"||s.delegateTarget&&s.delegateTarget.tagName==="A")&&s.preventDefault();for(const t of x.getMultipleElementsFromSelector(this))ve.getOrCreateInstance(t,{toggle:!1}).toggle()});it(ve);const Ds="dropdown",tl="bs.dropdown",Wt=`.${tl}`,es=".data-api",el="Escape",Ls="Tab",nl="ArrowUp",$s="ArrowDown",sl=2,il=`hide${Wt}`,rl=`hidden${Wt}`,ol=`show${Wt}`,al=`shown${Wt}`,Qi=`click${Wt}${es}`,Ji=`keydown${Wt}${es}`,ll=`keyup${Wt}${es}`,Xt="show",cl="dropup",dl="dropend",hl="dropstart",ul="dropup-center",pl="dropdown-center",Pt='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',ml=`${Pt}.${Xt}`,Be=".dropdown-menu",fl=".navbar",gl=".navbar-nav",bl=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",vl=nt()?"top-end":"top-start",_l=nt()?"top-start":"top-end",El=nt()?"bottom-end":"bottom-start",yl=nt()?"bottom-start":"bottom-end",wl=nt()?"left-start":"right-start",Al=nt()?"right-start":"left-start",xl="top",Cl="bottom",Tl={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},Sl={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class pt extends ct{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=x.next(this._element,Be)[0]||x.prev(this._element,Be)[0]||x.findOne(Be,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return Tl}static get DefaultType(){return Sl}static get NAME(){return Ds}toggle(){return this._isShown()?this.hide():this.show()}show(){if(Tt(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!u.trigger(this._element,ol,t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(gl))for(const n of[].concat(...document.body.children))u.on(n,"mouseover",je);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Xt),this._element.classList.add(Xt),u.trigger(this._element,al,t)}}hide(){if(Tt(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){if(!u.trigger(this._element,il,t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const n of[].concat(...document.body.children))u.off(n,"mouseover",je);this._popper&&this._popper.destroy(),this._menu.classList.remove(Xt),this._element.classList.remove(Xt),this._element.setAttribute("aria-expanded","false"),bt.removeDataAttribute(this._menu,"popper"),u.trigger(this._element,rl,t)}}_getConfig(t){if(t=super._getConfig(t),typeof t.reference=="object"&&!gt(t.reference)&&typeof t.reference.getBoundingClientRect!="function")throw new TypeError(`${Ds.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(typeof Ii>"u")throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let t=this._element;this._config.reference==="parent"?t=this._parent:gt(this._config.reference)?t=Ct(this._config.reference):typeof this._config.reference=="object"&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=Jn(t,this._menu,e)}_isShown(){return this._menu.classList.contains(Xt)}_getPlacement(){const t=this._parent;if(t.classList.contains(dl))return wl;if(t.classList.contains(hl))return Al;if(t.classList.contains(ul))return xl;if(t.classList.contains(pl))return Cl;const e=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return t.classList.contains(cl)?e?_l:vl:e?yl:El}_detectNavbar(){return this._element.closest(fl)!==null}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(bt.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,...X(this._config.popperConfig,[t])}}_selectMenuItem({key:t,target:e}){const n=x.find(bl,this._menu).filter(i=>ce(i));n.length&&Zn(n,e,t===$s,!n.includes(e)).focus()}static jQueryInterface(t){return this.each(function(){const e=pt.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}static clearMenus(t){if(t.button===sl||t.type==="keyup"&&t.key!==Ls)return;const e=x.find(ml);for(const n of e){const i=pt.getInstance(n);if(!i||i._config.autoClose===!1)continue;const r=t.composedPath(),o=r.includes(i._menu);if(r.includes(i._element)||i._config.autoClose==="inside"&&!o||i._config.autoClose==="outside"&&o||i._menu.contains(t.target)&&(t.type==="keyup"&&t.key===Ls||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const a={relatedTarget:i._element};t.type==="click"&&(a.clickEvent=t),i._completeHide(a)}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),n=t.key===el,i=[nl,$s].includes(t.key);if(!i&&!n||e&&!n)return;t.preventDefault();const r=this.matches(Pt)?this:x.prev(this,Pt)[0]||x.next(this,Pt)[0]||x.findOne(Pt,t.delegateTarget.parentNode),o=pt.getOrCreateInstance(r);if(i){t.stopPropagation(),o.show(),o._selectMenuItem(t);return}o._isShown()&&(t.stopPropagation(),o.hide(),r.focus())}}u.on(document,Ji,Pt,pt.dataApiKeydownHandler);u.on(document,Ji,Be,pt.dataApiKeydownHandler);u.on(document,Qi,pt.clearMenus);u.on(document,ll,pt.clearMenus);u.on(document,Qi,Pt,function(s){s.preventDefault(),pt.getOrCreateInstance(this).toggle()});it(pt);const Zi="backdrop",kl="fade",Is="show",Ms=`mousedown.bs.${Zi}`,Ol={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},Nl={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class tr extends we{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return Ol}static get DefaultType(){return Nl}static get NAME(){return Zi}show(t){if(!this._config.isVisible){X(t);return}this._append();const e=this._getElement();this._config.isAnimated&&ye(e),e.classList.add(Is),this._emulateAnimation(()=>{X(t)})}hide(t){if(!this._config.isVisible){X(t);return}this._getElement().classList.remove(Is),this._emulateAnimation(()=>{this.dispose(),X(t)})}dispose(){this._isAppended&&(u.off(this._element,Ms),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add(kl),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=Ct(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),u.on(t,Ms,()=>{X(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(t){Fi(t,this._getElement(),this._config.isAnimated)}}const Dl="focustrap",Ll="bs.focustrap",ze=`.${Ll}`,$l=`focusin${ze}`,Il=`keydown.tab${ze}`,Ml="Tab",Pl="forward",Ps="backward",Rl={autofocus:!0,trapElement:null},Bl={autofocus:"boolean",trapElement:"element"};class er extends we{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return Rl}static get DefaultType(){return Bl}static get NAME(){return Dl}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),u.off(document,ze),u.on(document,$l,t=>this._handleFocusin(t)),u.on(document,Il,t=>this._handleKeydown(t)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,u.off(document,ze))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const n=x.focusableChildren(e);n.length===0?e.focus():this._lastTabNavDirection===Ps?n[n.length-1].focus():n[0].focus()}_handleKeydown(t){t.key===Ml&&(this._lastTabNavDirection=t.shiftKey?Ps:Pl)}}const Rs=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",Bs=".sticky-top",De="padding-right",Fs="margin-right";class Ln{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,De,e=>e+t),this._setElementAttributes(Rs,De,e=>e+t),this._setElementAttributes(Bs,Fs,e=>e-t)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,De),this._resetElementAttributes(Rs,De),this._resetElementAttributes(Bs,Fs)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,n){const i=this.getWidth(),r=o=>{if(o!==this._element&&window.innerWidth>o.clientWidth+i)return;this._saveInitialAttribute(o,e);const a=window.getComputedStyle(o).getPropertyValue(e);o.style.setProperty(e,`${n(Number.parseFloat(a))}px`)};this._applyManipulationCallback(t,r)}_saveInitialAttribute(t,e){const n=t.style.getPropertyValue(e);n&&bt.setDataAttribute(t,e,n)}_resetElementAttributes(t,e){const n=i=>{const r=bt.getDataAttribute(i,e);if(r===null){i.style.removeProperty(e);return}bt.removeDataAttribute(i,e),i.style.setProperty(e,r)};this._applyManipulationCallback(t,n)}_applyManipulationCallback(t,e){if(gt(t)){e(t);return}for(const n of x.find(t,this._element))e(n)}}const Fl="modal",Vl="bs.modal",st=`.${Vl}`,Wl=".data-api",jl="Escape",Hl=`hide${st}`,zl=`hidePrevented${st}`,nr=`hidden${st}`,sr=`show${st}`,Kl=`shown${st}`,ql=`resize${st}`,Yl=`click.dismiss${st}`,Ul=`mousedown.dismiss${st}`,Xl=`keydown.dismiss${st}`,Gl=`click${st}${Wl}`,Vs="modal-open",Ql="fade",Ws="show",gn="modal-static",Jl=".modal.show",Zl=".modal-dialog",tc=".modal-body",ec='[data-bs-toggle="modal"]',nc={backdrop:!0,focus:!0,keyboard:!0},sc={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class re extends ct{constructor(t,e){super(t,e),this._dialog=x.findOne(Zl,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new Ln,this._addEventListeners()}static get Default(){return nc}static get DefaultType(){return sc}static get NAME(){return Fl}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||u.trigger(this._element,sr,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(Vs),this._adjustDialog(),this._backdrop.show(()=>this._showElement(t)))}hide(){!this._isShown||this._isTransitioning||u.trigger(this._element,Hl).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(Ws),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){u.off(window,st),u.off(this._dialog,st),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new tr({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new er({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=x.findOne(tc,this._dialog);e&&(e.scrollTop=0),ye(this._element),this._element.classList.add(Ws);const n=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,u.trigger(this._element,Kl,{relatedTarget:t})};this._queueCallback(n,this._dialog,this._isAnimated())}_addEventListeners(){u.on(this._element,Xl,t=>{if(t.key===jl){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),u.on(window,ql,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),u.on(this._element,Ul,t=>{u.one(this._element,Yl,e=>{if(!(this._element!==t.target||this._element!==e.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(Vs),this._resetAdjustments(),this._scrollBar.reset(),u.trigger(this._element,nr)})}_isAnimated(){return this._element.classList.contains(Ql)}_triggerBackdropTransition(){if(u.trigger(this._element,zl).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,n=this._element.style.overflowY;n==="hidden"||this._element.classList.contains(gn)||(e||(this._element.style.overflowY="hidden"),this._element.classList.add(gn),this._queueCallback(()=>{this._element.classList.remove(gn),this._queueCallback(()=>{this._element.style.overflowY=n},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),n=e>0;if(n&&!t){const i=nt()?"paddingLeft":"paddingRight";this._element.style[i]=`${e}px`}if(!n&&t){const i=nt()?"paddingRight":"paddingLeft";this._element.style[i]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each(function(){const n=re.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t](e)}})}}u.on(document,Gl,ec,function(s){const t=x.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&s.preventDefault(),u.one(t,sr,i=>{i.defaultPrevented||u.one(t,nr,()=>{ce(this)&&this.focus()})});const e=x.findOne(Jl);e&&re.getInstance(e).hide(),re.getOrCreateInstance(t).toggle(this)});Qe(re);it(re);const ic="offcanvas",rc="bs.offcanvas",Et=`.${rc}`,ir=".data-api",oc=`load${Et}${ir}`,ac="Escape",js="show",Hs="showing",zs="hiding",lc="offcanvas-backdrop",rr=".offcanvas.show",cc=`show${Et}`,dc=`shown${Et}`,hc=`hide${Et}`,Ks=`hidePrevented${Et}`,or=`hidden${Et}`,uc=`resize${Et}`,pc=`click${Et}${ir}`,mc=`keydown.dismiss${Et}`,fc='[data-bs-toggle="offcanvas"]',gc={backdrop:!0,keyboard:!0,scroll:!1},bc={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class St extends ct{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return gc}static get DefaultType(){return bc}static get NAME(){return ic}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown||u.trigger(this._element,cc,{relatedTarget:t}).defaultPrevented)return;this._isShown=!0,this._backdrop.show(),this._config.scroll||new Ln().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(Hs);const n=()=>{(!this._config.scroll||this._config.backdrop)&&this._focustrap.activate(),this._element.classList.add(js),this._element.classList.remove(Hs),u.trigger(this._element,dc,{relatedTarget:t})};this._queueCallback(n,this._element,!0)}hide(){if(!this._isShown||u.trigger(this._element,hc).defaultPrevented)return;this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(zs),this._backdrop.hide();const e=()=>{this._element.classList.remove(js,zs),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new Ln().reset(),u.trigger(this._element,or)};this._queueCallback(e,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=()=>{if(this._config.backdrop==="static"){u.trigger(this._element,Ks);return}this.hide()},e=!!this._config.backdrop;return new tr({className:lc,isVisible:e,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:e?t:null})}_initializeFocusTrap(){return new er({trapElement:this._element})}_addEventListeners(){u.on(this._element,mc,t=>{if(t.key===ac){if(this._config.keyboard){this.hide();return}u.trigger(this._element,Ks)}})}static jQueryInterface(t){return this.each(function(){const e=St.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}u.on(document,pc,fc,function(s){const t=x.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&s.preventDefault(),Tt(this))return;u.one(t,or,()=>{ce(this)&&this.focus()});const e=x.findOne(rr);e&&e!==t&&St.getInstance(e).hide(),St.getOrCreateInstance(t).toggle(this)});u.on(window,oc,()=>{for(const s of x.find(rr))St.getOrCreateInstance(s).show()});u.on(window,uc,()=>{for(const s of x.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(s).position!=="fixed"&&St.getOrCreateInstance(s).hide()});Qe(St);it(St);const vc=/^aria-[\w-]*$/i,ar={"*":["class","dir","id","lang","role",vc],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},_c=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Ec=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,yc=(s,t)=>{const e=s.nodeName.toLowerCase();return t.includes(e)?_c.has(e)?!!Ec.test(s.nodeValue):!0:t.filter(n=>n instanceof RegExp).some(n=>n.test(e))};function wc(s,t,e){if(!s.length)return s;if(e&&typeof e=="function")return e(s);const i=new window.DOMParser().parseFromString(s,"text/html"),r=[].concat(...i.body.querySelectorAll("*"));for(const o of r){const a=o.nodeName.toLowerCase();if(!Object.keys(t).includes(a)){o.remove();continue}const l=[].concat(...o.attributes),d=[].concat(t["*"]||[],t[a]||[]);for(const c of l)yc(c,d)||o.removeAttribute(c.nodeName)}return i.body.innerHTML}const Ac="TemplateFactory",xc={allowList:ar,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},Cc={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},Tc={entry:"(string|element|function|null)",selector:"(string|element)"};class Sc extends we{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return xc}static get DefaultType(){return Cc}static get NAME(){return Ac}getContent(){return Object.values(this._config.content).map(t=>this._resolvePossibleFunction(t)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[i,r]of Object.entries(this._config.content))this._setContent(t,r,i);const e=t.children[0],n=this._resolvePossibleFunction(this._config.extraClass);return n&&e.classList.add(...n.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,n]of Object.entries(t))super._typeCheckConfig({selector:e,entry:n},Tc)}_setContent(t,e,n){const i=x.findOne(n,t);if(i){if(e=this._resolvePossibleFunction(e),!e){i.remove();return}if(gt(e)){this._putElementInTemplate(Ct(e),i);return}if(this._config.html){i.innerHTML=this._maybeSanitize(e);return}i.textContent=e}}_maybeSanitize(t){return this._config.sanitize?wc(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return X(t,[this])}_putElementInTemplate(t,e){if(this._config.html){e.innerHTML="",e.append(t);return}e.textContent=t.textContent}}const kc="tooltip",Oc=new Set(["sanitize","allowList","sanitizeFn"]),bn="fade",Nc="modal",Le="show",Dc=".tooltip-inner",qs=`.${Nc}`,Ys="hide.bs.modal",fe="hover",vn="focus",Lc="click",$c="manual",Ic="hide",Mc="hidden",Pc="show",Rc="shown",Bc="inserted",Fc="click",Vc="focusin",Wc="focusout",jc="mouseenter",Hc="mouseleave",zc={AUTO:"auto",TOP:"top",RIGHT:nt()?"left":"right",BOTTOM:"bottom",LEFT:nt()?"right":"left"},Kc={allowList:ar,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},qc={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class he extends ct{constructor(t,e){if(typeof Ii>"u")throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return Kc}static get DefaultType(){return qc}static get NAME(){return kc}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){if(this._isEnabled){if(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()){this._leave();return}this._enter()}}dispose(){clearTimeout(this._timeout),u.off(this._element.closest(qs),Ys,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!(this._isWithContent()&&this._isEnabled))return;const t=u.trigger(this._element,this.constructor.eventName(Pc)),n=(Ri(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!n)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:r}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(r.append(i),u.trigger(this._element,this.constructor.eventName(Bc))),this._popper=this._createPopper(i),i.classList.add(Le),"ontouchstart"in document.documentElement)for(const a of[].concat(...document.body.children))u.on(a,"mouseover",je);const o=()=>{u.trigger(this._element,this.constructor.eventName(Rc)),this._isHovered===!1&&this._leave(),this._isHovered=!1};this._queueCallback(o,this.tip,this._isAnimated())}hide(){if(!this._isShown()||u.trigger(this._element,this.constructor.eventName(Ic)).defaultPrevented)return;if(this._getTipElement().classList.remove(Le),"ontouchstart"in document.documentElement)for(const i of[].concat(...document.body.children))u.off(i,"mouseover",je);this._activeTrigger[Lc]=!1,this._activeTrigger[vn]=!1,this._activeTrigger[fe]=!1,this._isHovered=null;const n=()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),u.trigger(this._element,this.constructor.eventName(Mc)))};this._queueCallback(n,this.tip,this._isAnimated())}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(bn,Le),e.classList.add(`bs-${this.constructor.NAME}-auto`);const n=Lo(this.constructor.NAME).toString();return e.setAttribute("id",n),this._isAnimated()&&e.classList.add(bn),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new Sc({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[Dc]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(bn)}_isShown(){return this.tip&&this.tip.classList.contains(Le)}_createPopper(t){const e=X(this._config.placement,[this,t,this._element]),n=zc[e.toUpperCase()];return Jn(this._element,t,this._getPopperConfig(n))}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_resolvePossibleFunction(t){return X(t,[this._element])}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:n=>{this._getTipElement().setAttribute("data-popper-placement",n.state.placement)}}]};return{...e,...X(this._config.popperConfig,[e])}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if(e==="click")u.on(this._element,this.constructor.eventName(Fc),this._config.selector,n=>{this._initializeOnDelegatedTarget(n).toggle()});else if(e!==$c){const n=e===fe?this.constructor.eventName(jc):this.constructor.eventName(Vc),i=e===fe?this.constructor.eventName(Hc):this.constructor.eventName(Wc);u.on(this._element,n,this._config.selector,r=>{const o=this._initializeOnDelegatedTarget(r);o._activeTrigger[r.type==="focusin"?vn:fe]=!0,o._enter()}),u.on(this._element,i,this._config.selector,r=>{const o=this._initializeOnDelegatedTarget(r);o._activeTrigger[r.type==="focusout"?vn:fe]=o._element.contains(r.relatedTarget),o._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},u.on(this._element.closest(qs),Ys,this._hideModalHandler)}_fixTitle(){const t=this._element.getAttribute("title");t&&(!this._element.getAttribute("aria-label")&&!this._element.textContent.trim()&&this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"))}_enter(){if(this._isShown()||this._isHovered){this._isHovered=!0;return}this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show)}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=bt.getDataAttributes(this._element);for(const n of Object.keys(e))Oc.has(n)&&delete e[n];return t={...e,...typeof t=="object"&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=t.container===!1?document.body:Ct(t.container),typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),typeof t.title=="number"&&(t.title=t.title.toString()),typeof t.content=="number"&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const[e,n]of Object.entries(this._config))this.constructor.Default[e]!==n&&(t[e]=n);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(t){return this.each(function(){const e=he.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}it(he);const Yc="popover",Uc=".popover-header",Xc=".popover-body",Gc={...he.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},Qc={...he.DefaultType,content:"(null|string|element|function)"};class ns extends he{static get Default(){return Gc}static get DefaultType(){return Qc}static get NAME(){return Yc}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[Uc]:this._getTitle(),[Xc]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each(function(){const e=ns.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}it(ns);const Jc="scrollspy",Zc="bs.scrollspy",ss=`.${Zc}`,td=".data-api",ed=`activate${ss}`,Us=`click${ss}`,nd=`load${ss}${td}`,sd="dropdown-item",qt="active",id='[data-bs-spy="scroll"]',_n="[href]",rd=".nav, .list-group",Xs=".nav-link",od=".nav-item",ad=".list-group-item",ld=`${Xs}, ${od} > ${Xs}, ${ad}`,cd=".dropdown",dd=".dropdown-toggle",hd={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},ud={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class tn extends ct{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return hd}static get DefaultType(){return ud}static get NAME(){return Jc}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(t){return t.target=Ct(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,typeof t.threshold=="string"&&(t.threshold=t.threshold.split(",").map(e=>Number.parseFloat(e))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(u.off(this._config.target,Us),u.on(this._config.target,Us,_n,t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const n=this._rootElement||window,i=e.offsetTop-this._element.offsetTop;if(n.scrollTo){n.scrollTo({top:i,behavior:"smooth"});return}n.scrollTop=i}}))}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(e=>this._observerCallback(e),t)}_observerCallback(t){const e=o=>this._targetLinks.get(`#${o.target.id}`),n=o=>{this._previousScrollData.visibleEntryTop=o.target.offsetTop,this._process(e(o))},i=(this._rootElement||document.documentElement).scrollTop,r=i>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=i;for(const o of t){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(o));continue}const a=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(r&&a){if(n(o),!i)return;continue}!r&&!a&&n(o)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=x.find(_n,this._config.target);for(const e of t){if(!e.hash||Tt(e))continue;const n=x.findOne(decodeURI(e.hash),this._element);ce(n)&&(this._targetLinks.set(decodeURI(e.hash),e),this._observableSections.set(e.hash,n))}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(qt),this._activateParents(t),u.trigger(this._element,ed,{relatedTarget:t}))}_activateParents(t){if(t.classList.contains(sd)){x.findOne(dd,t.closest(cd)).classList.add(qt);return}for(const e of x.parents(t,rd))for(const n of x.prev(e,ld))n.classList.add(qt)}_clearActiveClass(t){t.classList.remove(qt);const e=x.find(`${_n}.${qt}`,t);for(const n of e)n.classList.remove(qt)}static jQueryInterface(t){return this.each(function(){const e=tn.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(window,nd,()=>{for(const s of x.find(id))tn.getOrCreateInstance(s)});it(tn);const pd="tab",md="bs.tab",jt=`.${md}`,fd=`hide${jt}`,gd=`hidden${jt}`,bd=`show${jt}`,vd=`shown${jt}`,_d=`click${jt}`,Ed=`keydown${jt}`,yd=`load${jt}`,wd="ArrowLeft",Gs="ArrowRight",Ad="ArrowUp",Qs="ArrowDown",En="Home",Js="End",Rt="active",Zs="fade",yn="show",xd="dropdown",lr=".dropdown-toggle",Cd=".dropdown-menu",wn=`:not(${lr})`,Td='.list-group, .nav, [role="tablist"]',Sd=".nav-item, .list-group-item",kd=`.nav-link${wn}, .list-group-item${wn}, [role="tab"]${wn}`,cr='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',An=`${kd}, ${cr}`,Od=`.${Rt}[data-bs-toggle="tab"], .${Rt}[data-bs-toggle="pill"], .${Rt}[data-bs-toggle="list"]`;class oe extends ct{constructor(t){super(t),this._parent=this._element.closest(Td),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),u.on(this._element,Ed,e=>this._keydown(e)))}static get NAME(){return pd}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),n=e?u.trigger(e,fd,{relatedTarget:t}):null;u.trigger(t,bd,{relatedTarget:e}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(e,t),this._activate(t,e))}_activate(t,e){if(!t)return;t.classList.add(Rt),this._activate(x.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.add(yn);return}t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),u.trigger(t,vd,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(Zs))}_deactivate(t,e){if(!t)return;t.classList.remove(Rt),t.blur(),this._deactivate(x.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.remove(yn);return}t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),u.trigger(t,gd,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(Zs))}_keydown(t){if(![wd,Gs,Ad,Qs,En,Js].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=this._getChildren().filter(i=>!Tt(i));let n;if([En,Js].includes(t.key))n=e[t.key===En?0:e.length-1];else{const i=[Gs,Qs].includes(t.key);n=Zn(e,t.target,i,!0)}n&&(n.focus({preventScroll:!0}),oe.getOrCreateInstance(n).show())}_getChildren(){return x.find(An,this._parent)}_getActiveElem(){return this._getChildren().find(t=>this._elemIsActive(t))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const n of e)this._setInitialAttributesOnChild(n)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),n=this._getOuterElement(t);t.setAttribute("aria-selected",e),n!==t&&this._setAttributeIfNotExists(n,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){const e=x.getElementFromSelector(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,e){const n=this._getOuterElement(t);if(!n.classList.contains(xd))return;const i=(r,o)=>{const a=x.findOne(r,n);a&&a.classList.toggle(o,e)};i(lr,Rt),i(Cd,yn),n.setAttribute("aria-expanded",e)}_setAttributeIfNotExists(t,e,n){t.hasAttribute(e)||t.setAttribute(e,n)}_elemIsActive(t){return t.classList.contains(Rt)}_getInnerElement(t){return t.matches(An)?t:x.findOne(An,t)}_getOuterElement(t){return t.closest(Sd)||t}static jQueryInterface(t){return this.each(function(){const e=oe.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(document,_d,cr,function(s){["A","AREA"].includes(this.tagName)&&s.preventDefault(),!Tt(this)&&oe.getOrCreateInstance(this).show()});u.on(window,yd,()=>{for(const s of x.find(Od))oe.getOrCreateInstance(s)});it(oe);const Nd="toast",Dd="bs.toast",Dt=`.${Dd}`,Ld=`mouseover${Dt}`,$d=`mouseout${Dt}`,Id=`focusin${Dt}`,Md=`focusout${Dt}`,Pd=`hide${Dt}`,Rd=`hidden${Dt}`,Bd=`show${Dt}`,Fd=`shown${Dt}`,Vd="fade",ti="hide",$e="show",Ie="showing",Wd={animation:"boolean",autohide:"boolean",delay:"number"},jd={animation:!0,autohide:!0,delay:5e3};class en extends ct{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return jd}static get DefaultType(){return Wd}static get NAME(){return Nd}show(){if(u.trigger(this._element,Bd).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(Vd);const e=()=>{this._element.classList.remove(Ie),u.trigger(this._element,Fd),this._maybeScheduleHide()};this._element.classList.remove(ti),ye(this._element),this._element.classList.add($e,Ie),this._queueCallback(e,this._element,this._config.animation)}hide(){if(!this.isShown()||u.trigger(this._element,Pd).defaultPrevented)return;const e=()=>{this._element.classList.add(ti),this._element.classList.remove(Ie,$e),u.trigger(this._element,Rd)};this._element.classList.add(Ie),this._queueCallback(e,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove($e),super.dispose()}isShown(){return this._element.classList.contains($e)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=e;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=e;break}}if(e){this._clearTimeout();return}const n=t.relatedTarget;this._element===n||this._element.contains(n)||this._maybeScheduleHide()}_setListeners(){u.on(this._element,Ld,t=>this._onInteraction(t,!0)),u.on(this._element,$d,t=>this._onInteraction(t,!1)),u.on(this._element,Id,t=>this._onInteraction(t,!0)),u.on(this._element,Md,t=>this._onInteraction(t,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each(function(){const e=en.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}Qe(en);it(en);var ei={},Hd=function(s,t,e,n,i){var r=new Worker(ei[t]||(ei[t]=URL.createObjectURL(new Blob([s+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return r.onmessage=function(o){var a=o.data,l=a.$e$;if(l){var d=new Error(l[0]);d.code=l[1],d.stack=l[2],i(d,null)}else i(null,a)},r.postMessage(e,n),r},H=Uint8Array,G=Uint16Array,nn=Int32Array,sn=new H([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),rn=new H([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),$n=new H([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),dr=function(s,t){for(var e=new G(31),n=0;n<31;++n)e[n]=t+=1<<s[n-1];for(var i=new nn(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)i[r]=r-e[n]<<5|n;return{b:e,r:i}},hr=dr(sn,2),zd=hr.b,Ke=hr.r;zd[28]=258,Ke[258]=28;var Kd=dr(rn,0),In=Kd.r,qe=new G(32768);for(var B=0;B<32768;++B){var At=(B&43690)>>1|(B&21845)<<1;At=(At&52428)>>2|(At&13107)<<2,At=(At&61680)>>4|(At&3855)<<4,qe[B]=((At&65280)>>8|(At&255)<<8)>>1}var Zt=function(s,t,e){for(var n=s.length,i=0,r=new G(t);i<n;++i)s[i]&&++r[s[i]-1];var o=new G(t);for(i=1;i<t;++i)o[i]=o[i-1]+r[i-1]<<1;var a;if(e){a=new G(1<<t);var l=15-t;for(i=0;i<n;++i)if(s[i])for(var d=i<<4|s[i],c=t-s[i],g=o[s[i]-1]++<<c,v=g|(1<<c)-1;g<=v;++g)a[qe[g]>>l]=d}else for(a=new G(n),i=0;i<n;++i)s[i]&&(a[i]=qe[o[s[i]-1]++]>>15-s[i]);return a},kt=new H(288);for(var B=0;B<144;++B)kt[B]=8;for(var B=144;B<256;++B)kt[B]=9;for(var B=256;B<280;++B)kt[B]=7;for(var B=280;B<288;++B)kt[B]=8;var _e=new H(32);for(var B=0;B<32;++B)_e[B]=5;var ur=Zt(kt,9,0),pr=Zt(_e,5,0),is=function(s){return(s+7)/8|0},rs=function(s,t,e){return(t==null||t<0)&&(t=0),(e==null||e>s.length)&&(e=s.length),new H(s.subarray(t,e))},qd=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ae=function(s,t,e){var n=new Error(t||qd[s]);if(n.code=s,Error.captureStackTrace&&Error.captureStackTrace(n,ae),!e)throw n;return n},ht=function(s,t,e){e<<=t&7;var n=t/8|0;s[n]|=e,s[n+1]|=e>>8},Gt=function(s,t,e){e<<=t&7;var n=t/8|0;s[n]|=e,s[n+1]|=e>>8,s[n+2]|=e>>16},Fe=function(s,t){for(var e=[],n=0;n<s.length;++n)s[n]&&e.push({s:n,f:s[n]});var i=e.length,r=e.slice();if(!i)return{t:as,l:0};if(i==1){var o=new H(e[0].s+1);return o[e[0].s]=1,{t:o,l:1}}e.sort(function(T,k){return T.f-k.f}),e.push({s:-1,f:25001});var a=e[0],l=e[1],d=0,c=1,g=2;for(e[0]={s:-1,f:a.f+l.f,l:a,r:l};c!=i-1;)a=e[e[d].f<e[g].f?d++:g++],l=e[d!=c&&e[d].f<e[g].f?d++:g++],e[c++]={s:-1,f:a.f+l.f,l:a,r:l};for(var v=r[0].s,n=1;n<i;++n)r[n].s>v&&(v=r[n].s);var f=new G(v+1),_=Ye(e[c-1],f,0);if(_>t){var n=0,p=0,b=_-t,E=1<<b;for(r.sort(function(k,O){return f[O.s]-f[k.s]||k.f-O.f});n<i;++n){var A=r[n].s;if(f[A]>t)p+=E-(1<<_-f[A]),f[A]=t;else break}for(p>>=b;p>0;){var C=r[n].s;f[C]<t?p-=1<<t-f[C]++-1:++n}for(;n>=0&&p;--n){var m=r[n].s;f[m]==t&&(--f[m],++p)}_=t}return{t:new H(f),l:_}},Ye=function(s,t,e){return s.s==-1?Math.max(Ye(s.l,t,e+1),Ye(s.r,t,e+1)):t[s.s]=e},Mn=function(s){for(var t=s.length;t&&!s[--t];);for(var e=new G(++t),n=0,i=s[0],r=1,o=function(l){e[n++]=l},a=1;a<=t;++a)if(s[a]==i&&a!=t)++r;else{if(!i&&r>2){for(;r>138;r-=138)o(32754);r>2&&(o(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(o(i),--r;r>6;r-=6)o(8304);r>2&&(o(r-3<<5|8208),r=0)}for(;r--;)o(i);r=1,i=s[a]}return{c:e.subarray(0,n),n:t}},Qt=function(s,t){for(var e=0,n=0;n<t.length;++n)e+=s[n]*t[n];return e},os=function(s,t,e){var n=e.length,i=is(t+2);s[i]=n&255,s[i+1]=n>>8,s[i+2]=s[i]^255,s[i+3]=s[i+1]^255;for(var r=0;r<n;++r)s[i+r+4]=e[r];return(i+4+n)*8},Pn=function(s,t,e,n,i,r,o,a,l,d,c){ht(t,c++,e),++i[256];for(var g=Fe(i,15),v=g.t,f=g.l,_=Fe(r,15),p=_.t,b=_.l,E=Mn(v),A=E.c,C=E.n,m=Mn(p),T=m.c,k=m.n,O=new G(19),S=0;S<A.length;++S)++O[A[S]&31];for(var S=0;S<T.length;++S)++O[T[S]&31];for(var y=Fe(O,7),N=y.t,I=y.l,L=19;L>4&&!N[$n[L-1]];--L);var M=d+5<<3,P=Qt(i,kt)+Qt(r,_e)+o,F=Qt(i,v)+Qt(r,p)+o+14+3*L+Qt(O,N)+2*O[16]+3*O[17]+7*O[18];if(l>=0&&M<=P&&M<=F)return os(t,c,s.subarray(l,l+d));var $,D,z,K;if(ht(t,c,1+(F<P)),c+=2,F<P){$=Zt(v,f,0),D=v,z=Zt(p,b,0),K=p;var yt=Zt(N,I,0);ht(t,c,C-257),ht(t,c+5,k-1),ht(t,c+10,L-4),c+=14;for(var S=0;S<L;++S)ht(t,c+3*S,N[$n[S]]);c+=3*L;for(var U=[A,T],ot=0;ot<2;++ot)for(var at=U[ot],S=0;S<at.length;++S){var W=at[S]&31;ht(t,c,yt[W]),c+=N[W],W>15&&(ht(t,c,at[S]>>5&127),c+=at[S]>>12)}}else $=ur,D=kt,z=pr,K=_e;for(var S=0;S<a;++S){var R=n[S];if(R>255){var W=R>>18&31;Gt(t,c,$[W+257]),c+=D[W+257],W>7&&(ht(t,c,R>>23&31),c+=sn[W]);var tt=R&31;Gt(t,c,z[tt]),c+=K[tt],tt>3&&(Gt(t,c,R>>5&8191),c+=rn[tt])}else Gt(t,c,$[R]),c+=D[R]}return Gt(t,c,$[256]),c+D[256]},mr=new nn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),as=new H(0),fr=function(s,t,e,n,i,r){var o=r.z||s.length,a=new H(n+o+5*(1+Math.ceil(o/7e3))+i),l=a.subarray(n,a.length-i),d=r.l,c=(r.r||0)&7;if(t){c&&(l[0]=r.r>>3);for(var g=mr[t-1],v=g>>13,f=g&8191,_=(1<<e)-1,p=r.p||new G(32768),b=r.h||new G(_+1),E=Math.ceil(e/3),A=2*E,C=function(pe){return(s[pe]^s[pe+1]<<E^s[pe+2]<<A)&_},m=new nn(25e3),T=new G(288),k=new G(32),O=0,S=0,y=r.i||0,N=0,I=r.w||0,L=0;y+2<o;++y){var M=C(y),P=y&32767,F=b[M];if(p[P]=F,b[M]=P,I<=y){var $=o-y;if((O>7e3||N>24576)&&($>423||!d)){c=Pn(s,l,0,m,T,k,S,N,L,y-L,c),N=O=S=0,L=y;for(var D=0;D<286;++D)T[D]=0;for(var D=0;D<30;++D)k[D]=0}var z=2,K=0,yt=f,U=P-F&32767;if($>2&&M==C(y-U))for(var ot=Math.min(v,$)-1,at=Math.min(32767,y),W=Math.min(258,$);U<=at&&--yt&&P!=F;){if(s[y+z]==s[y+z-U]){for(var R=0;R<W&&s[y+R]==s[y+R-U];++R);if(R>z){if(z=R,K=U,R>ot)break;for(var tt=Math.min(U,R-2),Lt=0,D=0;D<tt;++D){var lt=y-U+D&32767,ue=p[lt],Ce=lt-ue&32767;Ce>Lt&&(Lt=Ce,F=lt)}}}P=F,F=p[P],U+=P-F&32767}if(K){m[N++]=268435456|Ke[z]<<18|In[K];var Ht=Ke[z]&31,Te=In[K]&31;S+=sn[Ht]+rn[Te],++T[257+Ht],++k[Te],I=y+z,++O}else m[N++]=s[y],++T[s[y]]}}for(y=Math.max(y,I);y<o;++y)m[N++]=s[y],++T[s[y]];c=Pn(s,l,d,m,T,k,S,N,L,y-L,c),d||(r.r=c&7|l[c/8|0]<<3,c-=7,r.h=b,r.p=p,r.i=y,r.w=I)}else{for(var y=r.w||0;y<o+d;y+=65535){var zt=y+65535;zt>=o&&(l[c/8|0]=d,zt=o),c=os(l,c+1,s.subarray(y,zt))}r.i=o}return rs(a,0,n+is(c)+i)},Yd=function(){for(var s=new Int32Array(256),t=0;t<256;++t){for(var e=t,n=9;--n;)e=(e&1&&-306674912)^e>>>1;s[t]=e}return s}(),Ud=function(){var s=-1;return{p:function(t){for(var e=s,n=0;n<t.length;++n)e=Yd[e&255^t[n]]^e>>>8;s=e},d:function(){return~s}}},gr=function(s,t,e,n,i){if(!i&&(i={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),o=new H(r.length+s.length);o.set(r),o.set(s,r.length),s=o,i.w=r.length}return fr(s,t.level==null?6:t.level,t.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(s.length)))*1.5):20:12+t.mem,e,n,i)},ls=function(s,t){var e={};for(var n in s)e[n]=s[n];for(var n in t)e[n]=t[n];return e},ni=function(s,t,e){for(var n=s(),i=s.toString(),r=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<n.length;++o){var a=n[o],l=r[o];if(typeof a=="function"){t+=";"+l+"=";var d=a.toString();if(a.prototype)if(d.indexOf("[native code]")!=-1){var c=d.indexOf(" ",8)+1;t+=d.slice(c,d.indexOf("(",c))}else{t+=d;for(var g in a.prototype)t+=";"+l+".prototype."+g+"="+a.prototype[g].toString()}else t+=d}else e[l]=a}return t},Me=[],Xd=function(s){var t=[];for(var e in s)s[e].buffer&&t.push((s[e]=new s[e].constructor(s[e])).buffer);return t},Gd=function(s,t,e,n){if(!Me[e]){for(var i="",r={},o=s.length-1,a=0;a<o;++a)i=ni(s[a],i,r);Me[e]={c:ni(s[o],i,r),e:r}}var l=ls({},Me[e].e);return Hd(Me[e].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",e,l,Xd(l),n)},Qd=function(){return[H,G,nn,sn,rn,$n,Ke,In,ur,kt,pr,_e,qe,mr,as,Zt,ht,Gt,Fe,Ye,Mn,Qt,os,Pn,is,rs,fr,gr,cs,br]},br=function(s){return postMessage(s,[s.buffer])},Jd=function(s,t,e,n,i,r){var o=Gd(e,n,i,function(a,l){o.terminate(),r(a,l)});return o.postMessage([s,t],t.consume?[s.buffer]:[]),function(){o.terminate()}},j=function(s,t,e){for(;e;++t)s[t]=e,e>>>=8};function Zd(s,t,e){return e||(e=t,t={}),typeof e!="function"&&ae(7),Jd(s,t,[Qd],function(n){return br(cs(n.data[0],n.data[1]))},0,e)}function cs(s,t){return gr(s,t||{},0,0)}var vr=function(s,t,e,n){for(var i in s){var r=s[i],o=t+i,a=n;Array.isArray(r)&&(a=ls(n,r[1]),r=r[0]),r instanceof H?e[o]=[r,a]:(e[o+="/"]=[new H(0),a],vr(r,o,e,n))}},si=typeof TextEncoder<"u"&&new TextEncoder,th=typeof TextDecoder<"u"&&new TextDecoder,eh=0;try{th.decode(as,{stream:!0}),eh=1}catch{}function Rn(s,t){var e;if(si)return si.encode(s);for(var n=s.length,i=new H(s.length+(s.length>>1)),r=0,o=function(d){i[r++]=d},e=0;e<n;++e){if(r+5>i.length){var a=new H(r+8+(n-e<<1));a.set(i),i=a}var l=s.charCodeAt(e);l<128||t?o(l):l<2048?(o(192|l>>6),o(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|s.charCodeAt(++e)&1023,o(240|l>>18),o(128|l>>12&63),o(128|l>>6&63),o(128|l&63)):(o(224|l>>12),o(128|l>>6&63),o(128|l&63))}return rs(i,0,r)}var Bn=function(s){var t=0;if(s)for(var e in s){var n=s[e].length;n>65535&&ae(9),t+=n+4}return t},ii=function(s,t,e,n,i,r,o,a){var l=n.length,d=e.extra,c=a&&a.length,g=Bn(d);j(s,t,o!=null?33639248:67324752),t+=4,o!=null&&(s[t++]=20,s[t++]=e.os),s[t]=20,t+=2,s[t++]=e.flag<<1|(r<0&&8),s[t++]=i&&8,s[t++]=e.compression&255,s[t++]=e.compression>>8;var v=new Date(e.mtime==null?Date.now():e.mtime),f=v.getFullYear()-1980;if((f<0||f>119)&&ae(10),j(s,t,f<<25|v.getMonth()+1<<21|v.getDate()<<16|v.getHours()<<11|v.getMinutes()<<5|v.getSeconds()>>1),t+=4,r!=-1&&(j(s,t,e.crc),j(s,t+4,r<0?-r-2:r),j(s,t+8,e.size)),j(s,t+12,l),j(s,t+14,g),t+=16,o!=null&&(j(s,t,c),j(s,t+6,e.attrs),j(s,t+10,o),t+=14),s.set(n,t),t+=l,g)for(var _ in d){var p=d[_],b=p.length;j(s,t,+_),j(s,t+2,b),s.set(p,t+4),t+=4+b}return c&&(s.set(a,t),t+=c),t},nh=function(s,t,e,n,i){j(s,t,101010256),j(s,t+8,e),j(s,t+10,e),j(s,t+12,n),j(s,t+16,i)};function sh(s,t,e){e||(e=t,t={}),typeof e!="function"&&ae(7);var n={};vr(s,"",n,t);var i=Object.keys(n),r=i.length,o=0,a=0,l=r,d=new Array(r),c=[],g=function(){for(var b=0;b<c.length;++b)c[b]()},v=function(b,E){ri(function(){e(b,E)})};ri(function(){v=e});var f=function(){var b=new H(a+22),E=o,A=a-o;a=0;for(var C=0;C<l;++C){var m=d[C];try{var T=m.c.length;ii(b,a,m,m.f,m.u,T);var k=30+m.f.length+Bn(m.extra),O=a+k;b.set(m.c,O),ii(b,o,m,m.f,m.u,T,a,m.m),o+=16+k+(m.m?m.m.length:0),a=O+T}catch(S){return v(S,null)}}nh(b,o,d.length,A,E),v(null,b)};r||f();for(var _=function(b){var E=i[b],A=n[E],C=A[0],m=A[1],T=Ud(),k=C.length;T.p(C);var O=Rn(E),S=O.length,y=m.comment,N=y&&Rn(y),I=N&&N.length,L=Bn(m.extra),M=m.level==0?0:8,P=function(F,$){if(F)g(),v(F,null);else{var D=$.length;d[b]=ls(m,{size:k,crc:T.d(),c:$,f:O,m:N,u:S!=E.length||N&&y.length!=I,compression:M}),o+=30+S+L+D,a+=76+2*(S+L)+(I||0)+D,--r||f()}};if(S>65535&&P(ae(11,0,1),null),!M)P(null,C);else if(k<16e4)try{P(null,cs(C,m))}catch(F){P(F,null)}else c.push(Zd(C,m,P))},p=0;p<l;++p)_(p);return g}var ri=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(s){s()},ih=Object.defineProperty,rh=(s,t,e)=>t in s?ih(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,h=(s,t,e)=>rh(s,typeof t!="symbol"?t+"":t,e);const oh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},_r=s=>(typeof s!="string"&&(s=`${s}`),s.replace(/[&<>"']/g,t=>oh[t]));function ft(s){const t=typeof s;return s!=null&&(t==="object"||t==="function")}function ah(s){if(typeof s!="object"||s===null||Object.prototype.toString.call(s)!=="[object Object]")return!1;const t=Object.getPrototypeOf(s);if(t===null)return!0;const e=Object.prototype.hasOwnProperty.call(t,"constructor")&&t.constructor;return typeof e=="function"&&e instanceof e&&Function.prototype.call(e)===Function.prototype.call(s)}function Mt(s){return s!=null&&typeof s.valueOf()=="string"}function lh(s,t){return t.reduce((e,n)=>(s!=null&&s.hasOwnProperty(n)&&(e[n]=s[n]),e),{})}const xn={};function _t(s="$lodash$"){xn[s]||(xn[s]=0);const t=++xn[s];return s==="$lodash$"?`${t}`:`${s}${t}`}class on{constructor(t,e){h(this,"documentElement"),this.documentElement=this.createElement(e),this.documentElement.setAttribute("xmlns",t)}createElement(t){return new an({nodeName:t})}createTextNode(t){return new Er(t)}toString(){return this.documentElement.toString()}}h(on,"Node",{Create:s=>{switch(s.type){case"XML":return new an(s);case"TEXT":return new Er(s.nodeValue);default:return null}}});class Er{constructor(t){h(this,"nodeValue"),this.nodeValue=t}toJSON(){return{nodeValue:this.nodeValue,type:"TEXT"}}toString(){return _r(this.nodeValue)}}class an{constructor(t){if(h(this,"nodeName",""),h(this,"children"),h(this,"nodeValue"),h(this,"attributes"),h(this,"firstChild"),this.nodeName=t.nodeName,this.children=[],this.nodeValue=t.nodeValue||"",this.attributes={},t.children)for(let e=0,n=t.children.length;e<n;e++)this.appendChild(on.Node.Create(t.children[e]));if(t.attributes)for(const e in t.attributes)t.attributes.hasOwnProperty(e)&&this.setAttribute(e,t.attributes[e])}toString(){let t=`<${this.nodeName}`;for(const n in this.attributes)this.attributes.hasOwnProperty(n)&&(t=`${t} ${n}="${_r(this.attributes[n])}"`);let e="";for(let n=0,i=this.children.length;n<i;n++)e+=this.children[n].toString();return e?t+=`>${e}</${this.nodeName}>`:t+="/>",t}toJSON(){const t=[];for(let e=0,n=this.children.length;e<n;e++)t.push(this.children[e].toJSON());return{nodeName:this.nodeName,children:t,nodeValue:this.nodeValue,attributes:this.attributes,type:"XML"}}setAttribute(t,e){if(e===null){delete this.attributes[t],delete this[t];return}this.attributes[t]=e,this[t]=e}appendChild(t){this.children.push(t),this.firstChild=this.children[0]}cloneNode(t){return new an(this.toJSON())}}const Ve=class It{static uniqueId(t){return It._idSpaces[t]||(It._idSpaces[t]=1),It._idSpaces[t]++}static createXmlDoc(t,e){return new on(t||null,e)}static createElement(t,e,n){const i=t.createElement(e);n=n||[];let r=n.length;for(;r--;)i.setAttribute(n[r][0],n[r][1]);return i}static setAttributesOnDoc(t,e){for(let[n,i]of Object.entries(e)){if(ah(i))if(i.v!==null&&i.v!==void 0)switch(i.type){case Boolean:i=i.v?"1":"0";break}else i=null;i!=null&&t.setAttribute(n,i)}}static positionToLetterRef(t,e){let n=1,i,r=t,o="";const a="ABCDEFGHIJKLMNOPQRSTUVWXYZ";if(It.LETTER_REFS[t])return It.LETTER_REFS[t].concat(e);for(;r>0;)r-=Math.pow(26,n-1),i=r%Math.pow(26,n),r-=i,i=i/Math.pow(26,n-1),o=a.charAt(i)+o,n+=1;return It.LETTER_REFS[t]=o,o.concat(String(e))}};h(Ve,"_idSpaces",{}),h(Ve,"LETTER_REFS",{}),h(Ve,"schemas",{worksheet:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",sharedStrings:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",stylesheet:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",relationships:"http://schemas.openxmlformats.org/officeDocument/2006/relationships",relationshipPackage:"http://schemas.openxmlformats.org/package/2006/relationships",contentTypes:"http://schemas.openxmlformats.org/package/2006/content-types",spreadsheetml:"http://schemas.openxmlformats.org/spreadsheetml/2006/main",markupCompat:"http://schemas.openxmlformats.org/markup-compatibility/2006",x14ac:"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac",officeDocument:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",package:"http://schemas.openxmlformats.org/package/2006/relationships",table:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/table",spreadsheetDrawing:"http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",drawing:"http://schemas.openxmlformats.org/drawingml/2006/main",drawingRelationship:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",image:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",chart:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",hyperlink:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink"});let w=Ve;const xt={};class Fn{constructor(){h(this,"relations",{}),h(this,"lastId",1),_t("rId")}importData(t){this.relations=t.relations,this.lastId=t.lastId}exportData(){return{relations:this.relations,lastId:this.lastId}}addRelation(t,e){return this.relations[t.id]={id:_t("rId"),schema:w.schemas[e],object:t},this.relations[t.id].id}getRelationshipId(t){return this.relations[t.id]?this.relations[t.id].id:null}toXML(){const t=w.createXmlDoc(w.schemas.relationshipPackage,"Relationships"),e=t.documentElement;for(const[n,i]of Object.entries(this.relations)){const r=w.createElement(t,"Relationship",[["Id",i.id],["Type",i.schema],["Target",i.object.target||xt[n]]]);i.object.targetMode&&r.setAttribute("TargetMode",i.object.targetMode),e.appendChild(r)}return t}}class ch{constructor(){h(this,"state",null),h(this,"xSplit",null),h(this,"ySplit",null),h(this,"activePane","bottomRight"),h(this,"topLeftCell",null),h(this,"_freezePane")}freezePane(t,e,n){this._freezePane={xSplit:t,ySplit:e,cell:n}}exportXML(t){const e=t.createElement("pane");return this.state!==null&&(e.setAttribute("xSplit",this._freezePane.xSplit),e.setAttribute("ySplit",this._freezePane.ySplit),e.setAttribute("topLeftCell",this._freezePane.cell),e.setAttribute("activePane","bottomRight"),e.setAttribute("state","frozen")),e}}class oi{constructor(){h(this,"strings",{}),h(this,"stringArray",[]),h(this,"id",_t("SharedStrings"))}addString(t){return this.strings[t]=this.stringArray.length,this.stringArray[this.stringArray.length]=t,this.strings[t]}exportData(){return this.strings}toXML(){const t=w.createXmlDoc(w.schemas.spreadsheetml,"sst"),e=t.documentElement;this.stringArray.reverse();let n=this.stringArray.length;e.setAttribute("count",n),e.setAttribute("uniqueCount",n);const i=t.createElement("si"),r=t.createElement("t");r.appendChild(t.createTextNode("--placeholder--")),i.appendChild(r);const o=this.stringArray;for(;n--;){const a=i.cloneNode(!0);typeof o[n]=="string"&&o[n].match(/\s+/)&&a.firstChild.setAttribute("xml:space","preserve"),a.firstChild.firstChild.nodeValue=o[n],e.appendChild(a)}return t}}class dh{constructor(t){h(this,"pane"),h(this,"showZeros",null),h(this,"defaultGridColor",null),h(this,"colorId",null),h(this,"rightToLeft",null),h(this,"showFormulas",null),h(this,"showGridLines",null),h(this,"showOutlineSymbols",null),h(this,"showRowColHeaders",null),h(this,"showRuler",null),h(this,"showWhiteSpace",null),h(this,"tabSelected",null),h(this,"topLeftCell",null),h(this,"viewType",null),h(this,"windowProtection",null),h(this,"zoomScale",null),h(this,"zoomScaleNormal",null),h(this,"zoomScalePageLayoutView",null),h(this,"zoomScaleSheetLayoutView",null);const e=t||{};this.pane=e.pane||new ch}freezePane(t,e,n){this.pane.state="frozen",this.pane.xSplit=t,this.pane.ySplit=e,this.pane.topLeftCell=n}exportXML(t){const e=t.createElement("sheetViews"),n=t.createElement("sheetView");return w.setAttributesOnDoc(n,{workbookViewId:0,showZeros:{v:this.showZeros,type:Boolean},defaultGridColor:{v:this.defaultGridColor,type:Boolean},colorId:this.colorId,rightToLeft:{v:this.rightToLeft,type:Boolean},showFormulas:{v:this.showFormulas,type:Boolean},showGridLines:{v:this.showGridLines,type:Boolean},showOutlineSymbols:{v:this.showOutlineSymbols,type:Boolean},showRowColHeaders:{v:this.showRowColHeaders,type:Boolean},showRuler:{v:this.showRuler,type:Boolean},showWhiteSpace:{v:this.showWhiteSpace,type:Boolean},tabSelected:{v:this.tabSelected,type:Boolean},viewType:this.viewType,windowProtection:{v:this.windowProtection,type:Boolean},zoomScale:{v:this.zoomScale,type:Boolean},zoomScaleNormal:this.zoomScaleNormal,zoomScalePageLayoutView:this.zoomScalePageLayoutView,zoomScaleSheetLayoutView:this.zoomScaleSheetLayoutView}),n.appendChild(this.pane.exportXML(t)),e.appendChild(n),e}}class ai{constructor(){h(this,"id",_t("StyleSheet")),h(this,"cellStyles",[{name:"Normal",xfId:"0",builtinId:"0"}]),h(this,"defaultTableStyle",!1),h(this,"differentialStyles",[{}]),h(this,"masterCellFormats",[{numFmtId:0,fontId:0,fillId:0,borderId:0,xfid:0}]),h(this,"masterCellStyles",[{numFmtId:0,fontId:0,fillId:0,borderId:0}]),h(this,"fonts",[{}]),h(this,"numberFormatters",[]),h(this,"fills",[{},{type:"pattern",patternType:"gray125",fgColor:"FF333333",bgColor:"FF333333"}]),h(this,"borders",[{top:{},left:{},right:{},bottom:{},diagonal:{}}]),h(this,"tableStyles",[])}createSimpleFormatter(t){const e={id:this.masterCellFormats.length};switch(t){case"date":e.numFmtId=14;break}return this.masterCellFormats.push(e),e}createFill(t){const e=this.fills.length,n=t;return n.id=e,this.fills.push(n),n}createNumberFormatter(t){const e={id:this.numberFormatters.length+100,formatCode:t};return this.numberFormatters.push(e),e}createFormat(t){const e={id:this.masterCellFormats.length};if(t.protection&&(e.protection=t.protection),t.font&&ft(t.font))e.fontId=this.createFontStyle(t.font).id;else if(t.font){if(Number.isNaN(Number.parseInt(t.font,10)))throw new Error("Passing a non-numeric font id is not supported");e.fontId=t.font}if(t.format&&Mt(t.format))e.numFmtId=this.createNumberFormatter(t.format).id;else if(t.format){if(Number.isNaN(Number.parseInt(t.format,10)))throw new Error("Invalid number formatter id");e.numFmtId=t.format}if(t.border&&ft(t.border))e.borderId=this.createBorderFormatter(t.border).id;else if(t.border){if(Number.isNaN(Number.parseInt(t.border,10)))throw new Error("Passing a non-numeric border id is not supported");e.borderId=t.border}if(t.fill&&ft(t.fill))e.fillId=this.createFill(t.fill).id;else if(t.fill){if(Number.isNaN(Number.parseInt(t.fill,10)))throw new Error("Passing a non-numeric fill id is not supported");e.fillId=t.fill}return t.alignment&&ft(t.alignment)&&(e.alignment=lh(t.alignment,["horizontal","justifyLastLine","readingOrder","relativeIndent","shrinkToFit","textRotation","vertical","wrapText"])),this.masterCellFormats.push(e),e}createDifferentialStyle(t){const e=this.differentialStyles.length,n={id:e};return t.font&&ft(t.font)&&(n.font=t.font),t.border&&ft(t.border)&&(n.border=Object.assign({top:{},left:{},right:{},bottom:{},diagonal:{}},t.border)),t.fill&&ft(t.fill)&&(n.fill=t.fill),t.alignment&&ft(t.alignment)&&(n.alignment=t.alignment),t.format&&Mt(t.format)&&(n.numFmt=t.format),this.differentialStyles[e]=n,n}createTableStyle(t){this.tableStyles.push(t)}createBorderFormatter(t){return t={top:{},left:{},right:{},bottom:{},diagonal:{},id:this.borders.length,...t},this.borders.push(t),t}createFontStyle(t){const e={id:this.fonts.length};return t.bold&&(e.bold=!0),t.italic&&(e.italic=!0),t.superscript&&(e.vertAlign="superscript"),t.subscript&&(e.vertAlign="subscript"),t.underline&&(typeof t.underline=="string"&&["double","singleAccounting","doubleAccounting"].includes(t.underline)?e.underline=t.underline:e.underline=!0),t.strike&&(e.strike=!0),t.outline&&(e.outline=!0),t.shadow&&(e.shadow=!0),t.size&&(e.size=t.size),t.color&&(e.color=t.color),t.fontName&&(e.fontName=t.fontName),this.fonts.push(e),e}exportBorders(t){const e=t.createElement("borders");e.setAttribute("count",this.borders.length);for(let n=0,i=this.borders.length;n<i;n++)e.appendChild(this.exportBorder(t,this.borders[n]));return e}exportBorder(t,e){const n=t.createElement("border"),i=r=>{const o=t.createElement(r);return e[r].style&&o.setAttribute("style",e[r].style),e[r].color&&o.appendChild(this.exportColor(t,e[r].color)),o};return n.appendChild(i("left")),n.appendChild(i("right")),n.appendChild(i("top")),n.appendChild(i("bottom")),n.appendChild(i("diagonal")),n}exportColor(t,e){const n=t.createElement("color");return Mt(e)?(n.setAttribute("rgb",e),n):(e.tint!==void 0&&n.setAttribute("tint",e.tint),e.auto!==void 0&&n.setAttribute("auto",String(!!e.auto)),e.theme!==void 0&&n.setAttribute("theme",e.theme),n)}exportMasterCellFormats(t){const e=w.createElement(t,"cellXfs",[["count",this.masterCellFormats.length]]);for(let n=0,i=this.masterCellFormats.length;n<i;n++){const r=this.masterCellFormats[n];e.appendChild(this.exportCellFormatElement(t,r))}return e}exportMasterCellStyles(t){const e=w.createElement(t,"cellStyleXfs",[["count",this.masterCellStyles.length]]);for(let n=0,i=this.masterCellStyles.length;n<i;n++){const r=this.masterCellStyles[n];e.appendChild(this.exportCellFormatElement(t,r))}return e}exportCellFormatElement(t,e){const n=t.createElement("xf"),i=["applyAlignment","applyBorder","applyFill","applyFont","applyNumberFormat","applyProtection","borderId","fillId","fontId","numFmtId","pivotButton","quotePrefix","xfId"],r=Object.keys(e).filter(a=>i.indexOf(a)!==-1);if(e.alignment){const a=e.alignment;n.appendChild(this.exportAlignment(t,a))}e.protection&&(n.appendChild(this.exportProtection(t,e.protection)),n.setAttribute("applyProtection","1"));let o=r.length;for(;o--;)n.setAttribute(r[o],e[r[o]]);return e.fillId&&n.setAttribute("applyFill","1"),e.fontId&&n.setAttribute("applyFont","1"),e.borderId&&n.setAttribute("applyBorder","1"),e.alignment&&n.setAttribute("applyAlignment","1"),e.numFmtId&&n.setAttribute("applyNumberFormat","1"),e.numFmtId!==void 0&&e.xfId===void 0&&n.setAttribute("xfId","0"),n}exportAlignment(t,e){const n=t.createElement("alignment"),i=Object.keys(e);for(let r=0,o=i.length;r<o;r++)n.setAttribute(i[r],e[i[r]]);return n}exportFonts(t){const e=t.createElement("fonts");e.setAttribute("count",String(this.fonts.length));for(let n=0,i=this.fonts.length;n<i;n++){const r=this.fonts[n];e.appendChild(this.exportFont(t,r))}return e}exportFont(t,e){const n=t.createElement("font");if(e.size){const i=t.createElement("sz");i.setAttribute("val",e.size),n.appendChild(i)}if(e.fontName){const i=t.createElement("name");i.setAttribute("val",e.fontName),n.appendChild(i)}if(e.bold&&n.appendChild(t.createElement("b")),e.italic&&n.appendChild(t.createElement("i")),e.vertAlign){const i=t.createElement("vertAlign");i.setAttribute("val",e.vertAlign),n.appendChild(i)}if(e.underline){const i=t.createElement("u");e.underline!==!0&&i.setAttribute("val",e.underline),n.appendChild(i)}return e.strike&&n.appendChild(t.createElement("strike")),e.shadow&&n.appendChild(t.createElement("shadow")),e.outline&&n.appendChild(t.createElement("outline")),e.color&&n.appendChild(this.exportColor(t,e.color)),n}exportFills(t){const e=t.createElement("fills");e.setAttribute("count",String(this.fills.length));for(let n=0,i=this.fills.length;n<i;n++){const r=this.fills[n];e.appendChild(this.exportFill(t,r))}return e}exportFill(t,e){let n;const i=t.createElement("fill");return e.type==="pattern"?(n=this.exportPatternFill(t,e),i.appendChild(n)):e.type==="gradient"&&(n=this.exportGradientFill(t,e),i.appendChild(n)),i}exportGradientFill(t,e){const n=t.createElement("gradientFill");e.degree?n.setAttribute("degree",e.degree):e.left&&(n.setAttribute("left",e.left),n.setAttribute("right",e.right),n.setAttribute("top",e.top),n.setAttribute("bottom",e.bottom));const i=t.createElement("stop");i.setAttribute("position",e.start.pureAt||0);const r=t.createElement("color");typeof e.start=="string"||e.start.color?r.setAttribute("rgb",e.start.color||e.start):e.start.theme&&r.setAttribute("theme",e.start.theme);const o=t.createElement("stop"),a=t.createElement("color");return o.setAttribute("position",e.end.pureAt||1),typeof e.start=="string"||e.end.color?a.setAttribute("rgb",e.end.color||e.end):e.end.theme&&a.setAttribute("theme",e.end.theme),i.appendChild(r),o.appendChild(a),n.appendChild(i),n.appendChild(o),n}exportPatternFill(t,e){const n=w.createElement(t,"patternFill",[["patternType",e.patternType]]);e.bgColor||(e.bgColor="FFFFFFFF"),e.fgColor||(e.fgColor="FFFFFFFF");const i=t.createElement("bgColor");Mt(e.bgColor)?i.setAttribute("rgb",e.bgColor):e.bgColor.theme?i.setAttribute("theme",e.bgColor.theme):i.setAttribute("rgb",e.bgColor.rbg);const r=t.createElement("fgColor");return Mt(e.fgColor)?r.setAttribute("rgb",e.fgColor):e.fgColor.theme?r.setAttribute("theme",e.fgColor.theme):r.setAttribute("rgb",e.fgColor.rbg),n.appendChild(r),n.appendChild(i),n}exportNumberFormatters(t){const e=t.createElement("numFmts");e.setAttribute("count",String(this.numberFormatters.length));for(let n=0,i=this.numberFormatters.length;n<i;n++){const r=this.numberFormatters[n];e.appendChild(this.exportNumberFormatter(t,r))}return e}exportNumberFormatter(t,e){const n=t.createElement("numFmt");return n.setAttribute("numFmtId",e.id),n.setAttribute("formatCode",e.formatCode),n}exportCellStyles(t){const e=t.createElement("cellStyles");e.setAttribute("count",String(this.cellStyles.length));for(let n=0,i=this.cellStyles.length;n<i;n++){const r=this.cellStyles[n];delete r.id;const o=w.createElement(t,"cellStyle");e.appendChild(o);const a=Object.keys(r);let l=a.length;for(;l--;)o.setAttribute(a[l],r[a[l]])}return e}exportDifferentialStyles(t){const e=t.createElement("dxfs");e.setAttribute("count",String(this.differentialStyles.length));for(let n=0,i=this.differentialStyles.length;n<i;n++){const r=this.differentialStyles[n];e.appendChild(this.exportDFX(t,r))}return e}exportDFX(t,e){const n=t.createElement("dxf");return e.font&&n.appendChild(this.exportFont(t,e.font)),e.fill&&n.appendChild(this.exportFill(t,e.fill)),e.border&&n.appendChild(this.exportBorder(t,e.border)),e.numFmt&&n.appendChild(this.exportNumberFormatter(t,e.numFmt)),e.alignment&&n.appendChild(this.exportAlignment(t,e.alignment)),n}exportTableStyles(t){const e=t.createElement("tableStyles");e.setAttribute("count",String(this.tableStyles.length)),this.defaultTableStyle&&e.setAttribute("defaultTableStyle",String(this.defaultTableStyle));for(let n=0,i=this.tableStyles.length;n<i;n++)e.appendChild(this.exportTableStyle(t,this.tableStyles[n]));return e}exportTableStyle(t,e){const n=t.createElement("tableStyle");n.setAttribute("name",e.name),n.setAttribute("pivot",String(0));let i=0;return Object.entries(e).forEach(([r,o])=>{if(r==="name")return;i++;const a=t.createElement("tableStyleElement");a.setAttribute("type",r),a.setAttribute("dxfId",o),n.appendChild(a)}),n.setAttribute("count",String(i)),n}exportProtection(t,e){const n=t.createElement("protection");for(const i in e)e.hasOwn(i)&&n.setAttribute(i,e[i]);return n}toXML(){const t=w.createXmlDoc(w.schemas.spreadsheetml,"styleSheet"),e=t.documentElement;return e.appendChild(this.exportNumberFormatters(t)),e.appendChild(this.exportFonts(t)),e.appendChild(this.exportFills(t)),e.appendChild(this.exportBorders(t)),e.appendChild(this.exportMasterCellStyles(t)),e.appendChild(this.exportMasterCellFormats(t)),e.appendChild(this.exportCellStyles(t)),e.appendChild(this.exportDifferentialStyles(t)),this.tableStyles.length&&e.appendChild(this.exportTableStyles(t)),t}}class ds{constructor(t){h(this,"name",""),h(this,"id",""),h(this,"tableId",""),h(this,"displayName",""),h(this,"dataCellStyle",null),h(this,"dataDfxId",null),h(this,"headerRowBorderDxfId",null),h(this,"headerRowCellStyle",null),h(this,"headerRowCount",1),h(this,"headerRowDxfId",null),h(this,"insertRow",!1),h(this,"insertRowShift",!1),h(this,"ref",null),h(this,"tableBorderDxfId",null),h(this,"totalsRowBorderDxfId",null),h(this,"totalsRowCellStyle",null),h(this,"totalsRowCount",0),h(this,"totalsRowDxfId",null),h(this,"tableColumns",[]),h(this,"autoFilter",null),h(this,"sortState",null),h(this,"styleInfo",{}),this.initialize(t)}initialize(t){this.displayName=_t("Table"),this.name=this.displayName,this.id=this.name,this.tableId=this.id.replace("Table",""),Object.assign(this,t)}setReferenceRange(t,e){this.ref=[t,e]}setTableColumns(t){t.forEach(e=>{this.addTableColumn(e)})}addTableColumn(t){if(Mt(t)&&(t={name:t}),!t.name)throw new Error("Invalid argument for addTableColumn - minimum requirement is a name property");this.tableColumns.push(t)}setSortState(t){this.sortState=t}toXML(){const t=w.createXmlDoc(w.schemas.spreadsheetml,"table"),e=t.documentElement;e.setAttribute("id",this.tableId),e.setAttribute("name",this.name),e.setAttribute("displayName",this.displayName);const n=this.ref[0],i=this.ref[1];if(e.setAttribute("ref",`${w.positionToLetterRef(n[0],n[1])}:${w.positionToLetterRef(i[0],i[1])}`),e.setAttribute("totalsRowCount",this.totalsRowCount),e.setAttribute("headerRowCount",this.headerRowCount),this.headerRowDxfId&&e.setAttribute("headerRowDxfId",this.headerRowDxfId),this.headerRowBorderDxfId&&e.setAttribute("headerRowBorderDxfId",this.headerRowBorderDxfId),!this.ref)throw new Error("Needs at least a reference range");return this.autoFilter||this.addAutoFilter(this.ref[0],this.ref[1]),e.appendChild(this.exportAutoFilter(t)),e.appendChild(this.exportTableColumns(t)),e.appendChild(this.exportTableStyleInfo(t)),t}exportTableColumns(t){const e=t.createElement("tableColumns");e.setAttribute("count",this.tableColumns.length);const n=this.tableColumns;for(let i=0,r=n.length;i<r;i++){const o=n[i],a=t.createElement("tableColumn");a.setAttribute("id",String(i+1)),a.setAttribute("name",o.name),e.appendChild(a),o.totalsRowFunction&&a.setAttribute("totalsRowFunction",o.totalsRowFunction),o.totalsRowLabel&&a.setAttribute("totalsRowLabel",o.totalsRowLabel)}return e}exportAutoFilter(t){const e=t.createElement("autoFilter"),n=this.autoFilter[0],i=this.autoFilter[1];return e.setAttribute("ref",`${w.positionToLetterRef(n[0],n[1])}:${w.positionToLetterRef(i[0],i[1]-this.totalsRowCount)}`),e}exportTableStyleInfo(t){const e=this.styleInfo,n=t.createElement("tableStyleInfo");return n.setAttribute("name",e.themeStyle),n.setAttribute("showFirstColumn",e.showFirstColumn?"1":"0"),n.setAttribute("showLastColumn",e.showLastColumn?"1":"0"),n.setAttribute("showColumnStripes",e.showColumnStripes?"1":"0"),n.setAttribute("showRowStripes",e.showRowStripes?"1":"0"),n}addAutoFilter(t,e){this.autoFilter=[t,e]}}class hh{constructor(t){h(this,"name",""),h(this,"id",_t("Worksheet")),h(this,"_timezoneOffset"),h(this,"relations",null),h(this,"columnFormats",[]),h(this,"data",[]),h(this,"mergedCells",[]),h(this,"columns",[]),h(this,"sheetProtection",!1),h(this,"_headers",[]),h(this,"_footers",[]),h(this,"_tables",[]),h(this,"_drawings",[]),h(this,"_orientation"),h(this,"_margin"),h(this,"_rowInstructions",{}),h(this,"_freezePane",{}),h(this,"sharedStrings",null),h(this,"hyperlinks",[]),h(this,"sheetView"),h(this,"showZeros",null),this._timezoneOffset=new Date().getTimezoneOffset()*60*1e3,this.sheetView=t.sheetView||new dh,this.initialize(t)}initialize(t){t=t||{},this.name=t.name,this.id=_t("Worksheet"),this._timezoneOffset=new Date().getTimezoneOffset()*60*1e3,t.columns&&this.setColumns(t.columns),this.relations=new Fn}exportData(){return{relations:this.relations.exportData(),columnFormats:this.columnFormats,data:this.data,columns:this.columns,mergedCells:this.mergedCells,_headers:this._headers,_footers:this._footers,_tables:this._tables,_rowInstructions:this._rowInstructions,_freezePane:this._freezePane,name:this.name,id:this.id}}importData(t){this.relations.importData(t.relations),delete t.relations,Object.assign(this,t)}setSharedStringCollection(t){this.sharedStrings=t}addTable(t){this._tables.push(t),this.relations.addRelation(t,"table")}addDrawings(t){this._drawings.push(t),this.relations.addRelation(t,"drawingRelationship")}setRowInstructions(t,e){this._rowInstructions[t]=e}setHeader(t){if(!Array.isArray(t))throw"Invalid argument type - setHeader expects an array of three instructions";this._headers=t}setFooter(t){if(!Array.isArray(t))throw"Invalid argument type - setFooter expects an array of three instructions";this._footers=t}compilePageDetailPackage(t){return t=t||"",["&L",this.compilePageDetailPiece(t[0]||""),"&C",this.compilePageDetailPiece(t[1]||""),"&R",this.compilePageDetailPiece(t[2]||"")].join("")}compilePageDetailPiece(t){if(Mt(t))return'&"-,Regular"'.concat(t);if(ft(t)&&!Array.isArray(t)){let e="";if(t.font||t.bold){const n=t.bold?"Bold":"Regular";e+=`&"${t.font||"-"}`,e+=`,${n}"`}else e+='&"-,Regular"';return t.underline&&(e+="&U"),t.fontSize&&(e+=`&${t.fontSize}`),e+=t.text,e}if(Array.isArray(t))return t.reduce((e,n)=>e.concat(this.compilePageDetailPiece(n)),"")}exportHeader(t){const e=t.createElement("oddHeader");return e.appendChild(t.createTextNode(this.compilePageDetailPackage(this._headers))),e}exportFooter(t){const e=t.createElement("oddFooter");return e.appendChild(t.createTextNode(this.compilePageDetailPackage(this._footers))),e}_buildCache(t){const e=t.createElement("c"),n=t.createElement("v");n.appendChild(t.createTextNode("--temp--")),e.appendChild(n);const i=t.createElement("c"),r=t.createElement("f");r.appendChild(t.createTextNode("--temp--")),i.appendChild(r);const o=t.createElement("c");o.setAttribute("t","s");const a=t.createElement("v");return a.appendChild(t.createTextNode("--temp--")),o.appendChild(a),{number:e,date:e,string:o,formula:i}}collectSharedStrings(){const t=this.data,e={};for(let n=0,i=t.length;n<i;n++){const r=t[n],o=r.length;for(let a=0;a<o;a++){let l=r[a];const d=(l==null?void 0:l.metadata)||{};l&&typeof l=="object"&&(l=l.value),d.type||typeof l=="number"&&(d.type="number"),(d.type==="text"||!d.type)&&typeof e[l]>"u"&&(e[l]=!0)}}return Object.keys(e)}toXML(){var t,e,n;const i=this.data,r=this.columns||[],o=w.createXmlDoc(w.schemas.spreadsheetml,"worksheet"),a=o.documentElement;let l,d,c;a.setAttribute("xmlns:r",w.schemas.relationships),a.setAttribute("xmlns:mc",w.schemas.markupCompat);let g=0;const v=w.createElement(o,"sheetData"),f=this._buildCache(o);for(c=0,d=i.length;c<d;c++){const _=i[c],p=_.length;g=p>g?p:g;const b=o.createElement("row");for(let E=0;E<p;E++){r[E]=r[E]||{};let A=_[E],C;const m=(A==null?void 0:A.metadata)||{};switch(A&&typeof A=="object"&&(A=A.value),m.type||typeof A=="number"&&(m.type="number"),m.type){case"number":C=f.number.cloneNode(!0),C.firstChild.firstChild.nodeValue=A;break;case"date":C=f.date.cloneNode(!0),A instanceof Date&&(A=A.getTime()),C.firstChild.firstChild.nodeValue=25569+(A-this._timezoneOffset)/(60*60*24*1e3);break;case"formula":C=f.formula.cloneNode(!0),C.firstChild.firstChild.nodeValue=A;break;case"text":default:{let T;typeof((t=this.sharedStrings)==null?void 0:t.strings[A])<"u"?T=this.sharedStrings.strings[A]:T=(e=this.sharedStrings)==null?void 0:e.addString(A),C=f.string.cloneNode(!0),C.firstChild.firstChild.nodeValue=T;break}}m.style?C.setAttribute("s",m.style):((n=this._rowInstructions[c])==null?void 0:n.style)!==void 0&&C.setAttribute("s",this._rowInstructions[c].style),C.setAttribute("r",w.positionToLetterRef(E+1,String(c+1))),b.appendChild(C)}if(b.setAttribute("r",c+1),this._rowInstructions[c]){const E=this._rowInstructions[c];E.height!==void 0&&(b.setAttribute("customHeight","1"),b.setAttribute("ht",E.height)),E.style!==void 0&&(b.setAttribute("customFormat","1"),b.setAttribute("s",E.style))}v.appendChild(b)}if(g!==0?a.appendChild(w.createElement(o,"dimension",[["ref",`${w.positionToLetterRef(1,1)}:${w.positionToLetterRef(g,String(i.length))}`]])):a.appendChild(w.createElement(o,"dimension",[["ref",w.positionToLetterRef(1,1)]])),a.appendChild(this.sheetView.exportXML(o)),this.columns.length&&a.appendChild(this.exportColumns(o)),a.appendChild(v),this.sheetProtection&&a.appendChild(this.sheetProtection.exportXML(o)),this.hyperlinks.length>0){const _=o.createElement("hyperlinks"),p=this.hyperlinks;for(l=0,d=p.length;l<d;l++){const b=o.createElement("hyperlink"),E=p[l];b.setAttribute("ref",String(E.cell)),E.id=w.uniqueId("hyperlink"),this.relations.addRelation({id:E.id,target:E.location,targetMode:E.targetMode||"External"},"hyperlink"),b.setAttribute("r:id",this.relations.getRelationshipId(E)),_.appendChild(b)}a.appendChild(_)}if(this.mergedCells.length>0){const _=o.createElement("mergeCells");for(l=0,d=this.mergedCells.length;l<d;l++){const p=o.createElement("mergeCell");p.setAttribute("ref",`${this.mergedCells[l][0]}:${this.mergedCells[l][1]}`),_.appendChild(p)}a.appendChild(_)}if(this.exportPageSettings(o,a),this._headers.length>0||this._footers.length>0){const _=o.createElement("headerFooter");this._headers.length>0&&_.appendChild(this.exportHeader(o)),this._footers.length>0&&_.appendChild(this.exportFooter(o)),a.appendChild(_)}for(l=0,d=this._drawings.length;l<d;l++){const _=o.createElement("drawing");_.setAttribute("r:id",this.relations.getRelationshipId(this._drawings[l])),a.appendChild(_)}if(this._tables.length>0){const _=o.createElement("tableParts");for(_.setAttribute("count",this._tables.length),l=0,d=this._tables.length;l<d;l++){const p=o.createElement("tablePart");p.setAttribute("r:id",this.relations.getRelationshipId(this._tables[l])),_.appendChild(p)}a.appendChild(_)}return o}exportColumns(t){const e=w.createElement(t,"cols");for(let n=0,i=this.columns.length;n<i;n++){const r=this.columns[n],o=w.createElement(t,"col",[["min",r.min||n+1],["max",r.max||n+1]]);r.hidden&&o.setAttribute("hidden",String(1)),r.bestFit&&o.setAttribute("bestFit",String(1)),(r.customWidth||r.width)&&o.setAttribute("customWidth",String(1)),r.width?o.setAttribute("width",r.width):o.setAttribute("width",String(9.140625)),e.appendChild(o)}return e}exportPageSettings(t,e){if(this._margin){let n=.7;const i=this._margin.left?this._margin.left:n,r=this._margin.right?this._margin.right:n,o=this._margin.top?this._margin.top:n,a=this._margin.bottom?this._margin.bottom:n;n=.3;const l=this._margin.header?this._margin.header:n,d=this._margin.footer?this._margin.footer:n;e.appendChild(w.createElement(t,"pageMargins",[["top",o],["bottom",a],["left",i],["right",r],["header",l],["footer",d]]))}this._orientation&&e.appendChild(w.createElement(t,"pageSetup",[["orientation",this._orientation]]))}setPageOrientation(t){this._orientation=t}setPageMargin(t){this._margin=t}setColumns(t){this.columns=t}setData(t){this.data=t}mergeCells(t,e){this.mergedCells.push([t,e])}freezePane(t,e,n){this.sheetView.freezePane(t,e,n)}setColumnFormats(t){this.columnFormats=t}}class yr{constructor(){h(this,"id",_t("Workbook")),h(this,"styleSheet",new ai),h(this,"sharedStrings",new oi),h(this,"relations",new Fn),h(this,"worksheets",[]),h(this,"tables",[]),h(this,"drawings",[]),h(this,"media",{}),h(this,"printTitles"),this.initialize()}initialize(){this.id=_t("Workbook"),this.styleSheet=new ai,this.sharedStrings=new oi,this.relations=new Fn,this.relations.addRelation(this.styleSheet,"stylesheet"),this.relations.addRelation(this.sharedStrings,"sharedStrings")}createWorksheet(t){return t=Object.assign({},{name:"Sheet ".concat(String(this.worksheets.length+1))},t),new hh(t)}getStyleSheet(){return this.styleSheet}addTable(t){this.tables.push(t)}addDrawings(t){this.drawings.push(t)}setPrintTitleTop(t,e){this.printTitles==null&&(this.printTitles={}),this.printTitles[t]==null&&(this.printTitles[t]={}),this.printTitles[t].top=e}setPrintTitleLeft(t,e){this.printTitles==null&&(this.printTitles={}),this.printTitles[t]==null&&(this.printTitles[t]={}),this.printTitles[t].left=String.fromCharCode(64+e)}addMedia(t,e,n,i){const r=e.split("."),o=r[r.length-1];if(!i)switch(o.toLowerCase()){case"jpeg":case"jpg":i="image/jpeg";break;case"png":i="image/png";break;case"gif":i="image/gif";break;default:i=null;break}return this.media[e]||(this.media[e]={id:e,data:n,fileName:e,contentType:i,extension:o}),this.media[e]}addWorksheet(t){this.relations.addRelation(t,"worksheet"),t.setSharedStringCollection(this.sharedStrings),this.worksheets.push(t)}createContentTypes(){const t=w.createXmlDoc(w.schemas.contentTypes,"Types"),e=t.documentElement;let n,i;e.appendChild(w.createElement(t,"Default",[["Extension","rels"],["ContentType","application/vnd.openxmlformats-package.relationships+xml"]])),e.appendChild(w.createElement(t,"Default",[["Extension","xml"],["ContentType","application/xml"]]));const r={};for(const o in this.media)this.media.hasOwn(o)&&(r[this.media[o].extension]=this.media[o].contentType);for(const o in r)r.hasOwn(o)&&e.appendChild(w.createElement(t,"Default",[["Extension",o],["ContentType",r[o]]]));for(e.appendChild(w.createElement(t,"Override",[["PartName","/xl/workbook.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"]])),e.appendChild(w.createElement(t,"Override",[["PartName","/xl/sharedStrings.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"]])),e.appendChild(w.createElement(t,"Override",[["PartName","/xl/styles.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"]])),n=0,i=this.worksheets.length;n<i;n++)e.appendChild(w.createElement(t,"Override",[["PartName",`/xl/worksheets/sheet${n+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"]]));for(n=0,i=this.tables.length;n<i;n++)e.appendChild(w.createElement(t,"Override",[["PartName",`/xl/tables/table${n+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"]]));for(n=0,i=this.drawings.length;n<i;n++)e.appendChild(w.createElement(t,"Override",[["PartName",`/xl/drawings/drawing${n+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.drawing+xml"]]));return t}toXML(){const t=w.createXmlDoc(w.schemas.spreadsheetml,"workbook"),e=t.documentElement;e.setAttribute("xmlns:r",w.schemas.relationships);const n=31,i=w.createElement(t,"sheets");for(let a=0,l=this.worksheets.length;a<l;a++){const d=t.createElement("sheet");typeof console<"u"&&this.worksheets[a].name.length>n&&console.log(`Microsoft Excel requires work sheet names to be less than ${n+1} characters long, work sheet name "${this.worksheets[a].name}" is ${this.worksheets[a].name.length} characters long`),d.setAttribute("name",this.worksheets[a].name),d.setAttribute("sheetId",a+1),d.setAttribute("r:id",this.relations.getRelationshipId(this.worksheets[a])),i.appendChild(d)}e.appendChild(i);const r=w.createElement(t,"definedNames");let o=0;for(const a in this.printTitles){if(!this.printTitles.hasOwn(a))continue;const l=this.printTitles[a],d=t.createElement("definedName");d.setAttribute("name","_xlnm.Print_Titles"),d.setAttribute("localSheetId",o++);let c="";l.top&&(c+=`${a}!$1:$${l.top}`,l.left&&(c+=",")),l.left&&(c+=`${a}!$A:$${l.left}`),d.appendChild(t.createTextNode(c)),r.appendChild(d)}return e.appendChild(r),t}createWorkbookRelationship(){const t=w.createXmlDoc(w.schemas.relationshipPackage,"Relationships");return t.documentElement.appendChild(w.createElement(t,"Relationship",[["Id","rId1"],["Type",w.schemas.officeDocument],["Target","xl/workbook.xml"]])),t}_generateCorePaths(t){let e,n;for(xt[this.styleSheet.id]="styles.xml",xt[this.sharedStrings.id]="sharedStrings.xml",xt[this.id]="/xl/workbook.xml",e=0,n=this.tables.length;e<n;e++)t[`/xl/tables/table${e+1}.xml`]=this.tables[e].toXML(),xt[this.tables[e].id]=`/xl/tables/table${e+1}.xml`;for(const i in this.media)if(this.media.hasOwn(i)){const r=this.media[i];t[`/xl/media/${i}`]=r.data,xt[i]=`/xl/media/${i}`}for(e=0,n=this.drawings.length;e<n;e++)t[`/xl/drawings/drawing${e+1}.xml`]=this.drawings[e].toXML(),xt[this.drawings[e].id]=`/xl/drawings/drawing${e+1}.xml`,t[`/xl/drawings/_rels/drawing${e+1}.xml.rels`]=this.drawings[e].relations.toXML()}_prepareFilesForPackaging(t){Object.assign(t,{"/[Content_Types].xml":this.createContentTypes(),"/_rels/.rels":this.createWorkbookRelationship(),"/xl/styles.xml":this.styleSheet.toXML(),"/xl/workbook.xml":this.toXML(),"/xl/sharedStrings.xml":this.sharedStrings.toXML(),"/xl/_rels/workbook.xml.rels":this.relations.toXML()});for(const[e,n]of Object.entries(t))if(e.indexOf(".xml")!==-1||e.indexOf(".rels")!==-1){n instanceof on?t[e]=n.toString():t[e]=n.xml||new window.XMLSerializer().serializeToString(n);let i=t[e].replace(/xmlns=""/g,"");i=i.replace(/NS[\d]+:/g,""),i=i.replace(/xmlns:NS[\d]+=""/g,""),t[e]=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
${i}`}}generateFiles(){return new Promise(t=>{const e={};this._generateCorePaths(e);for(let n=0,i=this.worksheets.length;n<i;n++)e[`/xl/worksheets/sheet${n+1}.xml`]=this.worksheets[n].toXML(),xt[this.worksheets[n].id]=`worksheets/sheet${n+1}.xml`,e[`/xl/worksheets/_rels/sheet${n+1}.xml.rels`]=this.worksheets[n].relations.toXML();return this._prepareFilesForPackaging(e),t(e)})}}function dt(){return new yr}function uh(s,t,e){const n={};return new Promise((i,r)=>{s.generateFiles().then(o=>{for(const[a,l]of Object.entries(o))n[a.substr(1)]=Rn(l);return sh(n,(e==null?void 0:e.zipOptions)||{},(a,l)=>{if(a){r(a);return}{const d=(e==null?void 0:e.fileFormat)??"xlsx";let c=e==null?void 0:e.mimeType;c===void 0&&(c=d==="xls"?"application/vnd.ms-excel":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),i(new Blob([l],{type:c}))}})})})}function rt(s,t,e){const n=t.match(/.*\.xls$/)?"xls":"xlsx";return uh(s,"Blob",{...e,fileFormat:n}).then(i=>{ph(t,i)})}function ph(s,t){const e=document.createElement("a"),n=URL.createObjectURL(t);e&&document&&(e.textContent="download",e.href=n,e.setAttribute("download",s),e.style.visibility="hidden",document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(n))}let wr=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=new yr,n=e.createWorksheet({name:"Artists"});n.setData(t),e.addWorksheet(n),rt(e,"Artist WB.xlsx")}},mh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"});e.mergeCells("A1","C1");const r=[[{value:"Merged Header",metadata:{style:t.getStyleSheet().createFormat({alignment:{horizontal:"center"},font:{bold:!0,color:"FF2b995d",size:13}}).id}}],["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]];e.setData(r),e.setColumns([{width:30},{width:20,hidden:!0},{width:10}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},fh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=dt(),n=e.createWorksheet({name:"Album List"}),i=e.getStyleSheet().createFormat({font:{italic:!0,underline:!0}});n.setRowInstructions(1,{height:40,style:i.id}),n.setData(t),e.addWorksheet(n),rt(e,"Artist WB.xlsx")}},gh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet(),i="FFFF0000",r=n.createFormat({font:{bold:!0,color:i},border:{bottom:{color:i,style:"thin"},top:{color:i,style:"thin"},left:{color:i,style:"thin"},right:{color:i,style:"dotted"}}}),o=n.createFormat({font:{bold:!0,color:{theme:3}}}),a=[[{value:"Artist",metadata:{style:r.id}},{value:"Album",metadata:{style:o.id}},{value:"Price",metadata:{style:o.id}}],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]];e.setData(a),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},bh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet().createFormat({format:"$#,##0.00"}),i=t.getStyleSheet().createSimpleFormatter("date"),r=[["Artist","Album","Price","Date Modified"],["Buckethead","Albino Slug",{value:8.99,metadata:{style:n.id}},{value:new Date(2024,1,1),metadata:{type:"date",style:i.id}}],["Buckethead","Electric Tears",{value:13.99,metadata:{style:n.id}},{value:new Date(2024,1,2),metadata:{type:"date",style:i.id}}],["Buckethead","Colma",{value:11.34,metadata:{style:n.id}},{value:new Date(2024,1,3),metadata:{type:"date",style:i.id}}],["Crystal Method","Vegas",{value:10.54,metadata:{style:n.id}},{value:new Date(2024,1,4),metadata:{type:"date",style:i.id}}],["Crystal Method","Tweekend",{value:10.64,metadata:{style:n.id}},{value:new Date(2024,1,5),metadata:{type:"date",style:i.id}}],["Crystal Method","Divided By Night",{value:8.99,metadata:{style:n.id}},{value:new Date(2024,1,6),metadata:{type:"date",style:i.id}}]];e.setData(r),e.setColumns([{width:15},{width:15},{width:15},{width:15}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},vh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet().createFormat({alignment:{horizontal:"center"}}),i=[[{value:"Artist",metadata:{style:n.id}},{value:"Album",metadata:{style:n.id}},{value:"Price",metadata:{style:n.id}}],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]];e.setData(i),e.setColumns([{width:30},{width:30},{width:30}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},_h=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet(),r=n.createFormat({font:{bold:!0,color:"FF0000FF"},fill:{type:"pattern",patternType:"solid",fgColor:"FF00FF00"}}),o=n.createFormat({font:{color:"FFFFFFFF"},fill:{type:"gradient",degree:180,start:"FF92D050",end:{pureAt:.8,color:"FF0070C0"}}}),a=[[{value:"Artist",metadata:{style:r.id}},{value:"Album",metadata:{style:r.id}},{value:"Price",metadata:{style:r.id}}],[{value:"Buckethead",metadata:{style:o.id}},"Albino Slug",8.99],[{value:"Buckethead",metadata:{style:o.id}},"Electric Tears",13.99],[{value:"Buckethead",metadata:{style:o.id}},"Colma",11.34],[{value:"Crystal Method",metadata:{style:o.id}},"Vegas",10.54],[{value:"Crystal Method",metadata:{style:o.id}},"Tweekend",10.64],[{value:"Crystal Method",metadata:{style:o.id}},"Divided By Night",8.99]];e.setData(a),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},Eh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=dt(),e=t.createWorksheet({name:"Album List"}),n=[[{value:"Artist"},{value:"Album"},{value:"Price"},{value:"Quantity"},{value:"Total"}],["Buckethead","Albino Slug",8.99,5,{value:"C2+D2",metadata:{type:"formula"}}],["Buckethead","Electric Tears",13.99,7,{value:"C3+D3",metadata:{type:"formula"}}],["Buckethead","Colma",11.34,9,{value:"C4+D4",metadata:{type:"formula"}}],["Crystal Method","Vegas",10.54,3,{value:"C5+D5",metadata:{type:"formula"}}],["Crystal Method","Tweekend",10.64,1,{value:"C6+D6",metadata:{type:"formula"}}],["Crystal Method","Divided By Night",8.99,56,{value:"C7+D7",metadata:{type:"formula"}}]];e.setData(n),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),rt(t,"Artist WB.xlsx")}},yh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=dt(),n=e.createWorksheet({name:"Album List"}),i=new ds;i.styleInfo.themeStyle="TableStyleDark2",i.setReferenceRange([1,1],[3,t.length]),i.setTableColumns(["Artist","Album","Price"]),n.setData(t),e.addWorksheet(n),n.addTable(i),e.addTable(i),rt(e,"Artist WB.xlsx")}},wh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=dt(),n=e.createWorksheet({name:"Album List"}),i=e.getStyleSheet(),r=i.createDifferentialStyle({font:{italic:!0}});i.createTableStyle({name:"SlightlyOffColorBlue",wholeTable:r.id,headerRow:i.createDifferentialStyle({alignment:{horizontal:"center"}}).id});const o=new ds;o.styleInfo.themeStyle="SlightlyOffColorBlue",o.setReferenceRange([1,1],[3,t.length]),o.setTableColumns(["Artist","Album","Price"]),n.setData(t),e.addWorksheet(n),n.addTable(o),e.addTable(o),rt(e,"Artist WB.xlsx")}},Ah=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=new ds,e=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99],["Highest Price","test",{value:`SUBTOTAL(104,${t.name}[Price])`,metadata:{type:"formula"}}]],n=dt(),i=n.createWorksheet({name:"Album List"});t.styleInfo.themeStyle="TableStyleDark2",t.setReferenceRange([1,1],[3,e.length]),t.totalsRowCount=1,t.setTableColumns([{name:"Artist",totalsRowLabel:"Highest Price"},{name:"Album",totalsRowLabel:"test"},{name:"Price",totalsRowFunction:"max"}]),i.setData(e),n.addWorksheet(i),i.addTable(t),n.addTable(t),rt(n,"Artist WB.xlsx")}},xh=class{constructor(){V(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.startProcess.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.startProcess.bind(this))}startProcess(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=dt(),n=e.createWorksheet({name:"Album List"});n.setData(t),n.setHeader(["This will be on the left",["In the middle ",{text:"I shall be",bold:!0}],{text:"Right, underlined and size of 16",font:16,underline:!0}]),n.setFooter(["Date of print: &D &T","&A","Page &P of &N"]),e.addWorksheet(n),rt(e,"Artist WB.xlsx")}};class Ch{}const Cn=[{name:"getting-started",view:"/src/getting-started.html",viewModel:Ch,title:"Getting Started"},{name:"examples",view:"/src/examples/example01.html",viewModel:wr,title:"Examples"},{name:"documentation",href:"https://ghiscoding.gitbook.io/excel-builder-vanilla/",title:"📘 Documentation"}],li=[{name:"References",routes:[{name:"documentation",href:"https://ghiscoding.gitbook.io/excel-builder-vanilla/",title:"📘 Documentation"}]},{name:"Examples",routes:[{name:"example01",view:"/src/examples/example01.html",viewModel:wr,title:"01- Create Worksheet"},{name:"example02",view:"/src/examples/example02.html",viewModel:mh,title:"02- Sizing/Collapsing Columns"},{name:"example03",view:"/src/examples/example03.html",viewModel:fh,title:"03- Setting row information"},{name:"example04",view:"/src/examples/example04.html",viewModel:gh,title:"04- Fonts and Colors"},{name:"example05",view:"/src/examples/example05.html",viewModel:bh,title:"05- Number, Date, etc Formatting"},{name:"example06",view:"/src/examples/example06.html",viewModel:vh,title:"06- Alignment"},{name:"example07",view:"/src/examples/example07.html",viewModel:_h,title:"07- Backgroud Fillers"},{name:"example08",view:"/src/examples/example08.html",viewModel:Eh,title:"08- Formulas"},{name:"example09",view:"/src/examples/example09.html",viewModel:yh,title:"09- Tables"},{name:"example10",view:"/src/examples/example10.html",viewModel:wh,title:"10- Theming Tables"},{name:"example11",view:"/src/examples/example11.html",viewModel:Ah,title:"11- Theming Summaries"},{name:"example12",view:"/src/examples/example12.html",viewModel:xh,title:"12- Worksheet Headers/Footers"}]}],Th=Object.assign({"/src/examples/example-standalone-iife.html":kr,"/src/examples/example01.html":Or,"/src/examples/example02.html":Nr,"/src/examples/example03.html":Dr,"/src/examples/example04.html":Lr,"/src/examples/example05.html":$r,"/src/examples/example06.html":Ir,"/src/examples/example07.html":Mr,"/src/examples/example08.html":Pr,"/src/examples/example09.html":Rr,"/src/examples/example10.html":Br,"/src/examples/example11.html":Fr,"/src/examples/example12.html":Vr,"/src/getting-started.html":Wr,"/src/main.html":ci});class Sh{constructor(){V(this,"loading",!0);V(this,"currentModel");V(this,"currentRouter");V(this,"defaultRouteName","getting-started");V(this,"stateBangChar","#/");V(this,"baseUrl",window.location.origin+window.location.pathname);V(this,"viewModelObj",{})}async init(){const t=window.location;document.querySelector("#app").innerHTML=ci;let e=t.hash.replace(this.stateBangChar,"");(!e||e==="/"||e==="#")&&(e=this.defaultRouteName),this.createRouteLinks(),this.loadRoute(e),Array.from(document.querySelectorAll(".panel-wm-left a.nav-link,.navbar-nav a.nav-link")).forEach(n=>{n.id&&e.includes(n.id)&&n.classList.add("active")}),window.onpopstate=()=>{const i=window.location.hash.replace(this.stateBangChar,"");this.removeAllActiveLinks();const r=document.querySelector(`#${i}`);r&&(r.scrollIntoView(),r.classList.add("active")),this.loadRoute(i||this.defaultRouteName,!1)}}createRouteLinks(){var t,e,n;for(const i of Cn){const r=document.createElement("li");r.className="nav-item";const o=document.createElement("a");o.id=i.name,o.className="nav-link",o.textContent=i.title,r.appendChild(o),o.addEventListener("click",this.clickEventListener.bind(this)),(t=document.querySelector(".navbar-nav"))==null||t.appendChild(r)}for(const i of li){const r=document.createElement("li");r.className="m-1";const o=document.createElement("p");o.className="navbar-vertical-label mb-1",o.textContent=i.name,r.appendChild(o),(e=document.querySelector(".nav-pills"))==null||e.appendChild(r);for(const a of i.routes){const l=document.createElement("li");l.className="nav-item";const d=document.createElement("a");d.id=a.name,d.className="nav-link",d.textContent=a.title,d.addEventListener("click",this.clickEventListener.bind(this)),l.appendChild(d),(n=document.querySelector(".nav-pills"))==null||n.appendChild(l)}}}async loadRoute(t,e=!0){var r;const n=document.querySelector(".panel-wm-content");n.textContent="",n.classList.add("cloak");let i=Cn.find(o=>o.name===t);if((i==null?void 0:i.name)==="examples"){const o=document.querySelector(".nav-pills .nav-item a.nav-link:not([href])");o==null||o.classList.add("active")}else for(const o of li){const a=o.routes.find(l=>l.name===t);a&&(i=a)}if(this.currentModel&&this.unmountCurrentVM(this.currentModel,this.currentRouter),i!=null&&i.view){this.currentRouter=i,document.querySelector(".panel-wm-content").innerHTML=Th[i.view];const o=new i.viewModel;this.currentModel=o,window[i.name]=(r=o.mount)==null?void 0:r.call(o),window.onbeforeunload=()=>{var a;n.classList.add("cloak"),(a=o.unmount)==null||a.call(o),this.removeAllActiveLinks(!0),this.unmountAll(),i!=null&&i.name&&delete window[i.name]}}e&&window.history.pushState({},t,`${this.baseUrl}${this.stateBangChar}${t}`),document.title=`Excel-Builder-Vanilla · ${t}`,n.classList.remove("cloak")}async clickEventListener(t){const e=t.target,n=Cn.find(i=>i.name===e.id);if(n!=null&&n.href){window.open(n.href,"_blank");return}this.removeAllActiveLinks(),e.classList.toggle("active"),this.loadRoute(e.id)}removeAllActiveLinks(t=!1){document.querySelectorAll(".panel-wm-left a.nav-link,.navbar-nav a.nav-link").forEach(e=>{e.classList.remove("active"),t&&e.removeEventListener("click",this.clickEventListener.bind(this))})}unmountCurrentVM(t,e){var n;(n=t.unmount)==null||n.call(t),e&&delete window[e.name]}unmountAll(){for(const t of Object.keys(this.viewModelObj)){const e=this.viewModelObj[t];if(typeof(e==null?void 0:e.unmount)=="function"){e==null||e.unmount();for(const n of Object.keys(e))e[n]=null}window[t]=null,this.viewModelObj[t]=null,delete window[t],delete this.viewModelObj[t]}}}const kh=new Sh;kh.init();
