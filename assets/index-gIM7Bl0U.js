var br=Object.defineProperty;var vr=(s,t,e)=>t in s?br(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var P=(s,t,e)=>(vr(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const _r=`<!DOCTYPE html>
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

        new window.ExcelBuilder.ExcelBuilder().createFile(artistWorkbook, { type: 'blob' }).then((excelBlob) => {
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
`,Er=`<div class="example01">
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
`,yr=`<div class="example02">
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
`,wr=`<div class="example03">
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
`,xr=`<div class="example04">
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
`,Ar=`<div class="example05">
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
        currency.
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
              <td class="text-end">$8.99</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Electric Tears</td>
              <td class="text-end">$13.99</td>
            </tr>
            <tr>
              <td>Buckethead</td>
              <td>Colma</td>
              <td class="text-end">$11.34</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Vegas</td>
              <td class="text-end">$10.54</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Tweekend</td>
              <td class="text-end">$10.64</td>
            </tr>
            <tr>
              <td>Crystal Method</td>
              <td>Divided By Night</td>
              <td class="text-end">$8.99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
`,Cr=`<div class="example06">
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
`,Tr=`<div class="example07">
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
`,Sr=`<div class="example08">
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
`,kr=`<div class="example09">
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
`,Or=`<div class="example10">
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
`,Nr=`<div class="example11">
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
`,Dr=`<div class="example12">
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
`,Lr=`<div class="row mb-2">
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
      <a href="https://github.com/ghiscoding/excel-builder-vanilla/blob/main/packages/demo/src/examples/example-standalone.html"
        >examples/example-standalone.html</a
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
`,ti=`<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
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
`;var Y="top",J="bottom",Z="right",U="left",je="auto",ie=[Y,J,Z,U],Bt="start",Qt="end",ei="clippingParents",Ln="viewport",Yt="popper",ni="reference",_n=ie.reduce(function(s,t){return s.concat([t+"-"+Bt,t+"-"+Qt])},[]),In=[].concat(ie,[je]).reduce(function(s,t){return s.concat([t,t+"-"+Bt,t+"-"+Qt])},[]),si="beforeRead",ii="read",ri="afterRead",oi="beforeMain",ai="main",li="afterMain",ci="beforeWrite",di="write",hi="afterWrite",ui=[si,ii,ri,oi,ai,li,ci,di,hi];function pt(s){return s?(s.nodeName||"").toLowerCase():null}function tt(s){if(s==null)return window;if(s.toString()!=="[object Window]"){var t=s.ownerDocument;return t&&t.defaultView||window}return s}function Ft(s){var t=tt(s).Element;return s instanceof t||s instanceof Element}function nt(s){var t=tt(s).HTMLElement;return s instanceof t||s instanceof HTMLElement}function $n(s){if(typeof ShadowRoot>"u")return!1;var t=tt(s).ShadowRoot;return s instanceof t||s instanceof ShadowRoot}function Ir(s){var t=s.state;Object.keys(t.elements).forEach(function(e){var n=t.styles[e]||{},i=t.attributes[e]||{},r=t.elements[e];!nt(r)||!pt(r)||(Object.assign(r.style,n),Object.keys(i).forEach(function(o){var a=i[o];a===!1?r.removeAttribute(o):r.setAttribute(o,a===!0?"":a)}))})}function $r(s){var t=s.state,e={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,e.popper),t.styles=e,t.elements.arrow&&Object.assign(t.elements.arrow.style,e.arrow),function(){Object.keys(t.elements).forEach(function(n){var i=t.elements[n],r=t.attributes[n]||{},o=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:e[n]),a=o.reduce(function(l,d){return l[d]="",l},{});!nt(i)||!pt(i)||(Object.assign(i.style,a),Object.keys(r).forEach(function(l){i.removeAttribute(l)}))})}}const Mn={name:"applyStyles",enabled:!0,phase:"write",fn:Ir,effect:$r,requires:["computeStyles"]};function ht(s){return s.split("-")[0]}var Rt=Math.max,Re=Math.min,Jt=Math.round;function En(){var s=navigator.userAgentData;return s!=null&&s.brands&&Array.isArray(s.brands)?s.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function pi(){return!/^((?!chrome|android).)*safari/i.test(En())}function Zt(s,t,e){t===void 0&&(t=!1),e===void 0&&(e=!1);var n=s.getBoundingClientRect(),i=1,r=1;t&&nt(s)&&(i=s.offsetWidth>0&&Jt(n.width)/s.offsetWidth||1,r=s.offsetHeight>0&&Jt(n.height)/s.offsetHeight||1);var o=Ft(s)?tt(s):window,a=o.visualViewport,l=!pi()&&e,d=(n.left+(l&&a?a.offsetLeft:0))/i,c=(n.top+(l&&a?a.offsetTop:0))/r,p=n.width/i,g=n.height/r;return{width:p,height:g,top:c,right:d+p,bottom:c+g,left:d,x:d,y:c}}function Pn(s){var t=Zt(s),e=s.offsetWidth,n=s.offsetHeight;return Math.abs(t.width-e)<=1&&(e=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:s.offsetLeft,y:s.offsetTop,width:e,height:n}}function mi(s,t){var e=t.getRootNode&&t.getRootNode();if(s.contains(t))return!0;if(e&&$n(e)){var n=t;do{if(n&&s.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function vt(s){return tt(s).getComputedStyle(s)}function Mr(s){return["table","td","th"].indexOf(pt(s))>=0}function kt(s){return((Ft(s)?s.ownerDocument:s.document)||window.document).documentElement}function He(s){return pt(s)==="html"?s:s.assignedSlot||s.parentNode||($n(s)?s.host:null)||kt(s)}function ls(s){return!nt(s)||vt(s).position==="fixed"?null:s.offsetParent}function Pr(s){var t=/firefox/i.test(En()),e=/Trident/i.test(En());if(e&&nt(s)){var n=vt(s);if(n.position==="fixed")return null}var i=He(s);for($n(i)&&(i=i.host);nt(i)&&["html","body"].indexOf(pt(i))<0;){var r=vt(i);if(r.transform!=="none"||r.perspective!=="none"||r.contain==="paint"||["transform","perspective"].indexOf(r.willChange)!==-1||t&&r.willChange==="filter"||t&&r.filter&&r.filter!=="none")return i;i=i.parentNode}return null}function ve(s){for(var t=tt(s),e=ls(s);e&&Mr(e)&&vt(e).position==="static";)e=ls(e);return e&&(pt(e)==="html"||pt(e)==="body"&&vt(e).position==="static")?t:e||Pr(s)||t}function Rn(s){return["top","bottom"].indexOf(s)>=0?"x":"y"}function me(s,t,e){return Rt(s,Re(t,e))}function Rr(s,t,e){var n=me(s,t,e);return n>e?e:n}function fi(){return{top:0,right:0,bottom:0,left:0}}function gi(s){return Object.assign({},fi(),s)}function bi(s,t){return t.reduce(function(e,n){return e[n]=s,e},{})}var Br=function(t,e){return t=typeof t=="function"?t(Object.assign({},e.rects,{placement:e.placement})):t,gi(typeof t!="number"?t:bi(t,ie))};function Fr(s){var t,e=s.state,n=s.name,i=s.options,r=e.elements.arrow,o=e.modifiersData.popperOffsets,a=ht(e.placement),l=Rn(a),d=[U,Z].indexOf(a)>=0,c=d?"height":"width";if(!(!r||!o)){var p=Br(i.padding,e),g=Pn(r),f=l==="y"?Y:U,b=l==="y"?J:Z,m=e.rects.reference[c]+e.rects.reference[l]-o[l]-e.rects.popper[c],_=o[l]-e.rects.reference[l],E=ve(r),A=E?l==="y"?E.clientHeight||0:E.clientWidth||0:0,S=m/2-_/2,v=p[f],T=A-g[c]-p[b],k=A/2-g[c]/2+S,O=me(v,k,T),C=l;e.modifiersData[n]=(t={},t[C]=O,t.centerOffset=O-k,t)}}function Vr(s){var t=s.state,e=s.options,n=e.element,i=n===void 0?"[data-popper-arrow]":n;i!=null&&(typeof i=="string"&&(i=t.elements.popper.querySelector(i),!i)||mi(t.elements.popper,i)&&(t.elements.arrow=i))}const vi={name:"arrow",enabled:!0,phase:"main",fn:Fr,effect:Vr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function te(s){return s.split("-")[1]}var Wr={top:"auto",right:"auto",bottom:"auto",left:"auto"};function jr(s,t){var e=s.x,n=s.y,i=t.devicePixelRatio||1;return{x:Jt(e*i)/i||0,y:Jt(n*i)/i||0}}function cs(s){var t,e=s.popper,n=s.popperRect,i=s.placement,r=s.variation,o=s.offsets,a=s.position,l=s.gpuAcceleration,d=s.adaptive,c=s.roundOffsets,p=s.isFixed,g=o.x,f=g===void 0?0:g,b=o.y,m=b===void 0?0:b,_=typeof c=="function"?c({x:f,y:m}):{x:f,y:m};f=_.x,m=_.y;var E=o.hasOwnProperty("x"),A=o.hasOwnProperty("y"),S=U,v=Y,T=window;if(d){var k=ve(e),O="clientHeight",C="clientWidth";if(k===tt(e)&&(k=kt(e),vt(k).position!=="static"&&a==="absolute"&&(O="scrollHeight",C="scrollWidth")),k=k,i===Y||(i===U||i===Z)&&r===Qt){v=J;var w=p&&k===T&&T.visualViewport?T.visualViewport.height:k[O];m-=w-n.height,m*=l?1:-1}if(i===U||(i===Y||i===J)&&r===Qt){S=Z;var N=p&&k===T&&T.visualViewport?T.visualViewport.width:k[C];f-=N-n.width,f*=l?1:-1}}var R=Object.assign({position:a},d&&Wr),L=c===!0?jr({x:f,y:m},tt(e)):{x:f,y:m};if(f=L.x,m=L.y,l){var F;return Object.assign({},R,(F={},F[v]=A?"0":"",F[S]=E?"0":"",F.transform=(T.devicePixelRatio||1)<=1?"translate("+f+"px, "+m+"px)":"translate3d("+f+"px, "+m+"px, 0)",F))}return Object.assign({},R,(t={},t[v]=A?m+"px":"",t[S]=E?f+"px":"",t.transform="",t))}function Hr(s){var t=s.state,e=s.options,n=e.gpuAcceleration,i=n===void 0?!0:n,r=e.adaptive,o=r===void 0?!0:r,a=e.roundOffsets,l=a===void 0?!0:a,d={placement:ht(t.placement),variation:te(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,cs(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:o,roundOffsets:l})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,cs(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Bn={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Hr,data:{}};var Te={passive:!0};function zr(s){var t=s.state,e=s.instance,n=s.options,i=n.scroll,r=i===void 0?!0:i,o=n.resize,a=o===void 0?!0:o,l=tt(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return r&&d.forEach(function(c){c.addEventListener("scroll",e.update,Te)}),a&&l.addEventListener("resize",e.update,Te),function(){r&&d.forEach(function(c){c.removeEventListener("scroll",e.update,Te)}),a&&l.removeEventListener("resize",e.update,Te)}}const Fn={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:zr,data:{}};var qr={left:"right",right:"left",bottom:"top",top:"bottom"};function Ie(s){return s.replace(/left|right|bottom|top/g,function(t){return qr[t]})}var Kr={start:"end",end:"start"};function ds(s){return s.replace(/start|end/g,function(t){return Kr[t]})}function Vn(s){var t=tt(s),e=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:e,scrollTop:n}}function Wn(s){return Zt(kt(s)).left+Vn(s).scrollLeft}function Yr(s,t){var e=tt(s),n=kt(s),i=e.visualViewport,r=n.clientWidth,o=n.clientHeight,a=0,l=0;if(i){r=i.width,o=i.height;var d=pi();(d||!d&&t==="fixed")&&(a=i.offsetLeft,l=i.offsetTop)}return{width:r,height:o,x:a+Wn(s),y:l}}function Ur(s){var t,e=kt(s),n=Vn(s),i=(t=s.ownerDocument)==null?void 0:t.body,r=Rt(e.scrollWidth,e.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),o=Rt(e.scrollHeight,e.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),a=-n.scrollLeft+Wn(s),l=-n.scrollTop;return vt(i||e).direction==="rtl"&&(a+=Rt(e.clientWidth,i?i.clientWidth:0)-r),{width:r,height:o,x:a,y:l}}function jn(s){var t=vt(s),e=t.overflow,n=t.overflowX,i=t.overflowY;return/auto|scroll|overlay|hidden/.test(e+i+n)}function _i(s){return["html","body","#document"].indexOf(pt(s))>=0?s.ownerDocument.body:nt(s)&&jn(s)?s:_i(He(s))}function fe(s,t){var e;t===void 0&&(t=[]);var n=_i(s),i=n===((e=s.ownerDocument)==null?void 0:e.body),r=tt(n),o=i?[r].concat(r.visualViewport||[],jn(n)?n:[]):n,a=t.concat(o);return i?a:a.concat(fe(He(o)))}function yn(s){return Object.assign({},s,{left:s.x,top:s.y,right:s.x+s.width,bottom:s.y+s.height})}function Xr(s,t){var e=Zt(s,!1,t==="fixed");return e.top=e.top+s.clientTop,e.left=e.left+s.clientLeft,e.bottom=e.top+s.clientHeight,e.right=e.left+s.clientWidth,e.width=s.clientWidth,e.height=s.clientHeight,e.x=e.left,e.y=e.top,e}function hs(s,t,e){return t===Ln?yn(Yr(s,e)):Ft(t)?Xr(t,e):yn(Ur(kt(s)))}function Gr(s){var t=fe(He(s)),e=["absolute","fixed"].indexOf(vt(s).position)>=0,n=e&&nt(s)?ve(s):s;return Ft(n)?t.filter(function(i){return Ft(i)&&mi(i,n)&&pt(i)!=="body"}):[]}function Qr(s,t,e,n){var i=t==="clippingParents"?Gr(s):[].concat(t),r=[].concat(i,[e]),o=r[0],a=r.reduce(function(l,d){var c=hs(s,d,n);return l.top=Rt(c.top,l.top),l.right=Re(c.right,l.right),l.bottom=Re(c.bottom,l.bottom),l.left=Rt(c.left,l.left),l},hs(s,o,n));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Ei(s){var t=s.reference,e=s.element,n=s.placement,i=n?ht(n):null,r=n?te(n):null,o=t.x+t.width/2-e.width/2,a=t.y+t.height/2-e.height/2,l;switch(i){case Y:l={x:o,y:t.y-e.height};break;case J:l={x:o,y:t.y+t.height};break;case Z:l={x:t.x+t.width,y:a};break;case U:l={x:t.x-e.width,y:a};break;default:l={x:t.x,y:t.y}}var d=i?Rn(i):null;if(d!=null){var c=d==="y"?"height":"width";switch(r){case Bt:l[d]=l[d]-(t[c]/2-e[c]/2);break;case Qt:l[d]=l[d]+(t[c]/2-e[c]/2);break}}return l}function ee(s,t){t===void 0&&(t={});var e=t,n=e.placement,i=n===void 0?s.placement:n,r=e.strategy,o=r===void 0?s.strategy:r,a=e.boundary,l=a===void 0?ei:a,d=e.rootBoundary,c=d===void 0?Ln:d,p=e.elementContext,g=p===void 0?Yt:p,f=e.altBoundary,b=f===void 0?!1:f,m=e.padding,_=m===void 0?0:m,E=gi(typeof _!="number"?_:bi(_,ie)),A=g===Yt?ni:Yt,S=s.rects.popper,v=s.elements[b?A:g],T=Qr(Ft(v)?v:v.contextElement||kt(s.elements.popper),l,c,o),k=Zt(s.elements.reference),O=Ei({reference:k,element:S,strategy:"absolute",placement:i}),C=yn(Object.assign({},S,O)),w=g===Yt?C:k,N={top:T.top-w.top+E.top,bottom:w.bottom-T.bottom+E.bottom,left:T.left-w.left+E.left,right:w.right-T.right+E.right},R=s.modifiersData.offset;if(g===Yt&&R){var L=R[i];Object.keys(N).forEach(function(F){var V=[Z,J].indexOf(F)>=0?1:-1,W=[Y,J].indexOf(F)>=0?"y":"x";N[F]+=L[W]*V})}return N}function Jr(s,t){t===void 0&&(t={});var e=t,n=e.placement,i=e.boundary,r=e.rootBoundary,o=e.padding,a=e.flipVariations,l=e.allowedAutoPlacements,d=l===void 0?In:l,c=te(n),p=c?a?_n:_n.filter(function(b){return te(b)===c}):ie,g=p.filter(function(b){return d.indexOf(b)>=0});g.length===0&&(g=p);var f=g.reduce(function(b,m){return b[m]=ee(s,{placement:m,boundary:i,rootBoundary:r,padding:o})[ht(m)],b},{});return Object.keys(f).sort(function(b,m){return f[b]-f[m]})}function Zr(s){if(ht(s)===je)return[];var t=Ie(s);return[ds(s),t,ds(t)]}function to(s){var t=s.state,e=s.options,n=s.name;if(!t.modifiersData[n]._skip){for(var i=e.mainAxis,r=i===void 0?!0:i,o=e.altAxis,a=o===void 0?!0:o,l=e.fallbackPlacements,d=e.padding,c=e.boundary,p=e.rootBoundary,g=e.altBoundary,f=e.flipVariations,b=f===void 0?!0:f,m=e.allowedAutoPlacements,_=t.options.placement,E=ht(_),A=E===_,S=l||(A||!b?[Ie(_)]:Zr(_)),v=[_].concat(S).reduce(function(j,I){return j.concat(ht(I)===je?Jr(t,{placement:I,boundary:c,rootBoundary:p,padding:d,flipVariations:b,allowedAutoPlacements:m}):I)},[]),T=t.rects.reference,k=t.rects.popper,O=new Map,C=!0,w=v[0],N=0;N<v.length;N++){var R=v[N],L=ht(R),F=te(R)===Bt,V=[Y,J].indexOf(L)>=0,W=V?"width":"height",M=ee(t,{placement:R,boundary:c,rootBoundary:p,altBoundary:g,padding:d}),D=V?F?Z:U:F?J:Y;T[W]>k[W]&&(D=Ie(D));var q=Ie(D),K=[];if(r&&K.push(M[L]<=0),a&&K.push(M[D]<=0,M[q]<=0),K.every(function(j){return j})){w=R,C=!1;break}O.set(R,K)}if(C)for(var yt=b?3:1,X=function(I){var et=v.find(function(Dt){var ct=O.get(Dt);if(ct)return ct.slice(0,I).every(function(le){return le})});if(et)return w=et,"break"},at=yt;at>0;at--){var lt=X(at);if(lt==="break")break}t.placement!==w&&(t.modifiersData[n]._skip=!0,t.placement=w,t.reset=!0)}}const yi={name:"flip",enabled:!0,phase:"main",fn:to,requiresIfExists:["offset"],data:{_skip:!1}};function us(s,t,e){return e===void 0&&(e={x:0,y:0}),{top:s.top-t.height-e.y,right:s.right-t.width+e.x,bottom:s.bottom-t.height+e.y,left:s.left-t.width-e.x}}function ps(s){return[Y,Z,J,U].some(function(t){return s[t]>=0})}function eo(s){var t=s.state,e=s.name,n=t.rects.reference,i=t.rects.popper,r=t.modifiersData.preventOverflow,o=ee(t,{elementContext:"reference"}),a=ee(t,{altBoundary:!0}),l=us(o,n),d=us(a,i,r),c=ps(l),p=ps(d);t.modifiersData[e]={referenceClippingOffsets:l,popperEscapeOffsets:d,isReferenceHidden:c,hasPopperEscaped:p},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":p})}const wi={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:eo};function no(s,t,e){var n=ht(s),i=[U,Y].indexOf(n)>=0?-1:1,r=typeof e=="function"?e(Object.assign({},t,{placement:s})):e,o=r[0],a=r[1];return o=o||0,a=(a||0)*i,[U,Z].indexOf(n)>=0?{x:a,y:o}:{x:o,y:a}}function so(s){var t=s.state,e=s.options,n=s.name,i=e.offset,r=i===void 0?[0,0]:i,o=In.reduce(function(c,p){return c[p]=no(p,t.rects,r),c},{}),a=o[t.placement],l=a.x,d=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=d),t.modifiersData[n]=o}const xi={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:so};function io(s){var t=s.state,e=s.name;t.modifiersData[e]=Ei({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Hn={name:"popperOffsets",enabled:!0,phase:"read",fn:io,data:{}};function ro(s){return s==="x"?"y":"x"}function oo(s){var t=s.state,e=s.options,n=s.name,i=e.mainAxis,r=i===void 0?!0:i,o=e.altAxis,a=o===void 0?!1:o,l=e.boundary,d=e.rootBoundary,c=e.altBoundary,p=e.padding,g=e.tether,f=g===void 0?!0:g,b=e.tetherOffset,m=b===void 0?0:b,_=ee(t,{boundary:l,rootBoundary:d,padding:p,altBoundary:c}),E=ht(t.placement),A=te(t.placement),S=!A,v=Rn(E),T=ro(v),k=t.modifiersData.popperOffsets,O=t.rects.reference,C=t.rects.popper,w=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,N=typeof w=="number"?{mainAxis:w,altAxis:w}:Object.assign({mainAxis:0,altAxis:0},w),R=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,L={x:0,y:0};if(k){if(r){var F,V=v==="y"?Y:U,W=v==="y"?J:Z,M=v==="y"?"height":"width",D=k[v],q=D+_[V],K=D-_[W],yt=f?-C[M]/2:0,X=A===Bt?O[M]:C[M],at=A===Bt?-C[M]:-O[M],lt=t.elements.arrow,j=f&&lt?Pn(lt):{width:0,height:0},I=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:fi(),et=I[V],Dt=I[W],ct=me(0,O[M],j[M]),le=S?O[M]/2-yt-ct-et-N.mainAxis:X-ct-et-N.mainAxis,xe=S?-O[M]/2+yt+ct+Dt+N.mainAxis:at+ct+Dt+N.mainAxis,Ht=t.elements.arrow&&ve(t.elements.arrow),Ae=Ht?v==="y"?Ht.clientTop||0:Ht.clientLeft||0:0,zt=(F=R==null?void 0:R[v])!=null?F:0,ce=D+le-zt-Ae,mr=D+xe-zt,ts=me(f?Re(q,ce):q,D,f?Rt(K,mr):K);k[v]=ts,L[v]=ts-D}if(a){var es,fr=v==="x"?Y:U,gr=v==="x"?J:Z,Lt=k[T],Ce=T==="y"?"height":"width",ns=Lt+_[fr],ss=Lt-_[gr],Ze=[Y,U].indexOf(E)!==-1,is=(es=R==null?void 0:R[T])!=null?es:0,rs=Ze?ns:Lt-O[Ce]-C[Ce]-is+N.altAxis,os=Ze?Lt+O[Ce]+C[Ce]-is-N.altAxis:ss,as=f&&Ze?Rr(rs,Lt,os):me(f?rs:ns,Lt,f?os:ss);k[T]=as,L[T]=as-Lt}t.modifiersData[n]=L}}const Ai={name:"preventOverflow",enabled:!0,phase:"main",fn:oo,requiresIfExists:["offset"]};function ao(s){return{scrollLeft:s.scrollLeft,scrollTop:s.scrollTop}}function lo(s){return s===tt(s)||!nt(s)?Vn(s):ao(s)}function co(s){var t=s.getBoundingClientRect(),e=Jt(t.width)/s.offsetWidth||1,n=Jt(t.height)/s.offsetHeight||1;return e!==1||n!==1}function ho(s,t,e){e===void 0&&(e=!1);var n=nt(t),i=nt(t)&&co(t),r=kt(t),o=Zt(s,i,e),a={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(n||!n&&!e)&&((pt(t)!=="body"||jn(r))&&(a=lo(t)),nt(t)?(l=Zt(t,!0),l.x+=t.clientLeft,l.y+=t.clientTop):r&&(l.x=Wn(r))),{x:o.left+a.scrollLeft-l.x,y:o.top+a.scrollTop-l.y,width:o.width,height:o.height}}function uo(s){var t=new Map,e=new Set,n=[];s.forEach(function(r){t.set(r.name,r)});function i(r){e.add(r.name);var o=[].concat(r.requires||[],r.requiresIfExists||[]);o.forEach(function(a){if(!e.has(a)){var l=t.get(a);l&&i(l)}}),n.push(r)}return s.forEach(function(r){e.has(r.name)||i(r)}),n}function po(s){var t=uo(s);return ui.reduce(function(e,n){return e.concat(t.filter(function(i){return i.phase===n}))},[])}function mo(s){var t;return function(){return t||(t=new Promise(function(e){Promise.resolve().then(function(){t=void 0,e(s())})})),t}}function fo(s){var t=s.reduce(function(e,n){var i=e[n.name];return e[n.name]=i?Object.assign({},i,n,{options:Object.assign({},i.options,n.options),data:Object.assign({},i.data,n.data)}):n,e},{});return Object.keys(t).map(function(e){return t[e]})}var ms={placement:"bottom",modifiers:[],strategy:"absolute"};function fs(){for(var s=arguments.length,t=new Array(s),e=0;e<s;e++)t[e]=arguments[e];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function ze(s){s===void 0&&(s={});var t=s,e=t.defaultModifiers,n=e===void 0?[]:e,i=t.defaultOptions,r=i===void 0?ms:i;return function(a,l,d){d===void 0&&(d=r);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},ms,r),modifiersData:{},elements:{reference:a,popper:l},attributes:{},styles:{}},p=[],g=!1,f={state:c,setOptions:function(E){var A=typeof E=="function"?E(c.options):E;m(),c.options=Object.assign({},r,c.options,A),c.scrollParents={reference:Ft(a)?fe(a):a.contextElement?fe(a.contextElement):[],popper:fe(l)};var S=po(fo([].concat(n,c.options.modifiers)));return c.orderedModifiers=S.filter(function(v){return v.enabled}),b(),f.update()},forceUpdate:function(){if(!g){var E=c.elements,A=E.reference,S=E.popper;if(fs(A,S)){c.rects={reference:ho(A,ve(S),c.options.strategy==="fixed"),popper:Pn(S)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function(N){return c.modifiersData[N.name]=Object.assign({},N.data)});for(var v=0;v<c.orderedModifiers.length;v++){if(c.reset===!0){c.reset=!1,v=-1;continue}var T=c.orderedModifiers[v],k=T.fn,O=T.options,C=O===void 0?{}:O,w=T.name;typeof k=="function"&&(c=k({state:c,options:C,name:w,instance:f})||c)}}}},update:mo(function(){return new Promise(function(_){f.forceUpdate(),_(c)})}),destroy:function(){m(),g=!0}};if(!fs(a,l))return f;f.setOptions(d).then(function(_){!g&&d.onFirstUpdate&&d.onFirstUpdate(_)});function b(){c.orderedModifiers.forEach(function(_){var E=_.name,A=_.options,S=A===void 0?{}:A,v=_.effect;if(typeof v=="function"){var T=v({state:c,name:E,instance:f,options:S}),k=function(){};p.push(T||k)}})}function m(){p.forEach(function(_){return _()}),p=[]}return f}}var go=ze(),bo=[Fn,Hn,Bn,Mn],vo=ze({defaultModifiers:bo}),_o=[Fn,Hn,Bn,Mn,xi,yi,Ai,vi,wi],zn=ze({defaultModifiers:_o});const Ci=Object.freeze(Object.defineProperty({__proto__:null,afterMain:li,afterRead:ri,afterWrite:hi,applyStyles:Mn,arrow:vi,auto:je,basePlacements:ie,beforeMain:oi,beforeRead:si,beforeWrite:ci,bottom:J,clippingParents:ei,computeStyles:Bn,createPopper:zn,createPopperBase:go,createPopperLite:vo,detectOverflow:ee,end:Qt,eventListeners:Fn,flip:yi,hide:wi,left:U,main:ai,modifierPhases:ui,offset:xi,placements:In,popper:Yt,popperGenerator:ze,popperOffsets:Hn,preventOverflow:Ai,read:ii,reference:ni,right:Z,start:Bt,top:Y,variationPlacements:_n,viewport:Ln,write:di},Symbol.toStringTag,{value:"Module"}));/*!
  * Bootstrap v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */const wt=new Map,tn={set(s,t,e){wt.has(s)||wt.set(s,new Map);const n=wt.get(s);if(!n.has(t)&&n.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);return}n.set(t,e)},get(s,t){return wt.has(s)&&wt.get(s).get(t)||null},remove(s,t){if(!wt.has(s))return;const e=wt.get(s);e.delete(t),e.size===0&&wt.delete(s)}},Eo=1e6,yo=1e3,wn="transitionend",Ti=s=>(s&&window.CSS&&window.CSS.escape&&(s=s.replace(/#([^\s"#']+)/g,(t,e)=>`#${CSS.escape(e)}`)),s),wo=s=>s==null?`${s}`:Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(),xo=s=>{do s+=Math.floor(Math.random()*Eo);while(document.getElementById(s));return s},Ao=s=>{if(!s)return 0;let{transitionDuration:t,transitionDelay:e}=window.getComputedStyle(s);const n=Number.parseFloat(t),i=Number.parseFloat(e);return!n&&!i?0:(t=t.split(",")[0],e=e.split(",")[0],(Number.parseFloat(t)+Number.parseFloat(e))*yo)},Si=s=>{s.dispatchEvent(new Event(wn))},gt=s=>!s||typeof s!="object"?!1:(typeof s.jquery<"u"&&(s=s[0]),typeof s.nodeType<"u"),Ct=s=>gt(s)?s.jquery?s[0]:s:typeof s=="string"&&s.length>0?document.querySelector(Ti(s)):null,re=s=>{if(!gt(s)||s.getClientRects().length===0)return!1;const t=getComputedStyle(s).getPropertyValue("visibility")==="visible",e=s.closest("details:not([open])");if(!e)return t;if(e!==s){const n=s.closest("summary");if(n&&n.parentNode!==e||n===null)return!1}return t},Tt=s=>!s||s.nodeType!==Node.ELEMENT_NODE||s.classList.contains("disabled")?!0:typeof s.disabled<"u"?s.disabled:s.hasAttribute("disabled")&&s.getAttribute("disabled")!=="false",ki=s=>{if(!document.documentElement.attachShadow)return null;if(typeof s.getRootNode=="function"){const t=s.getRootNode();return t instanceof ShadowRoot?t:null}return s instanceof ShadowRoot?s:s.parentNode?ki(s.parentNode):null},Be=()=>{},_e=s=>{s.offsetHeight},Oi=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,en=[],Co=s=>{document.readyState==="loading"?(en.length||document.addEventListener("DOMContentLoaded",()=>{for(const t of en)t()}),en.push(s)):s()},st=()=>document.documentElement.dir==="rtl",rt=s=>{Co(()=>{const t=Oi();if(t){const e=s.NAME,n=t.fn[e];t.fn[e]=s.jQueryInterface,t.fn[e].Constructor=s,t.fn[e].noConflict=()=>(t.fn[e]=n,s.jQueryInterface)}})},G=(s,t=[],e=s)=>typeof s=="function"?s(...t):e,Ni=(s,t,e=!0)=>{if(!e){G(s);return}const i=Ao(t)+5;let r=!1;const o=({target:a})=>{a===t&&(r=!0,t.removeEventListener(wn,o),G(s))};t.addEventListener(wn,o),setTimeout(()=>{r||Si(t)},i)},qn=(s,t,e,n)=>{const i=s.length;let r=s.indexOf(t);return r===-1?!e&&n?s[i-1]:s[0]:(r+=e?1:-1,n&&(r=(r+i)%i),s[Math.max(0,Math.min(r,i-1))])},To=/[^.]*(?=\..*)\.|.*/,So=/\..*/,ko=/::\d+$/,nn={};let gs=1;const Di={mouseenter:"mouseover",mouseleave:"mouseout"},Oo=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function Li(s,t){return t&&`${t}::${gs++}`||s.uidEvent||gs++}function Ii(s){const t=Li(s);return s.uidEvent=t,nn[t]=nn[t]||{},nn[t]}function No(s,t){return function e(n){return Kn(n,{delegateTarget:s}),e.oneOff&&u.off(s,n.type,t),t.apply(s,[n])}}function Do(s,t,e){return function n(i){const r=s.querySelectorAll(t);for(let{target:o}=i;o&&o!==this;o=o.parentNode)for(const a of r)if(a===o)return Kn(i,{delegateTarget:o}),n.oneOff&&u.off(s,i.type,t,e),e.apply(o,[i])}}function $i(s,t,e=null){return Object.values(s).find(n=>n.callable===t&&n.delegationSelector===e)}function Mi(s,t,e){const n=typeof t=="string",i=n?e:t||e;let r=Pi(s);return Oo.has(r)||(r=s),[n,i,r]}function bs(s,t,e,n,i){if(typeof t!="string"||!s)return;let[r,o,a]=Mi(t,e,n);t in Di&&(o=(b=>function(m){if(!m.relatedTarget||m.relatedTarget!==m.delegateTarget&&!m.delegateTarget.contains(m.relatedTarget))return b.call(this,m)})(o));const l=Ii(s),d=l[a]||(l[a]={}),c=$i(d,o,r?e:null);if(c){c.oneOff=c.oneOff&&i;return}const p=Li(o,t.replace(To,"")),g=r?Do(s,e,o):No(s,o);g.delegationSelector=r?e:null,g.callable=o,g.oneOff=i,g.uidEvent=p,d[p]=g,s.addEventListener(a,g,r)}function xn(s,t,e,n,i){const r=$i(t[e],n,i);r&&(s.removeEventListener(e,r,!!i),delete t[e][r.uidEvent])}function Lo(s,t,e,n){const i=t[e]||{};for(const[r,o]of Object.entries(i))r.includes(n)&&xn(s,t,e,o.callable,o.delegationSelector)}function Pi(s){return s=s.replace(So,""),Di[s]||s}const u={on(s,t,e,n){bs(s,t,e,n,!1)},one(s,t,e,n){bs(s,t,e,n,!0)},off(s,t,e,n){if(typeof t!="string"||!s)return;const[i,r,o]=Mi(t,e,n),a=o!==t,l=Ii(s),d=l[o]||{},c=t.startsWith(".");if(typeof r<"u"){if(!Object.keys(d).length)return;xn(s,l,o,r,i?e:null);return}if(c)for(const p of Object.keys(l))Lo(s,l,p,t.slice(1));for(const[p,g]of Object.entries(d)){const f=p.replace(ko,"");(!a||t.includes(f))&&xn(s,l,o,g.callable,g.delegationSelector)}},trigger(s,t,e){if(typeof t!="string"||!s)return null;const n=Oi(),i=Pi(t),r=t!==i;let o=null,a=!0,l=!0,d=!1;r&&n&&(o=n.Event(t,e),n(s).trigger(o),a=!o.isPropagationStopped(),l=!o.isImmediatePropagationStopped(),d=o.isDefaultPrevented());const c=Kn(new Event(t,{bubbles:a,cancelable:!0}),e);return d&&c.preventDefault(),l&&s.dispatchEvent(c),c.defaultPrevented&&o&&o.preventDefault(),c}};function Kn(s,t={}){for(const[e,n]of Object.entries(t))try{s[e]=n}catch{Object.defineProperty(s,e,{configurable:!0,get(){return n}})}return s}function vs(s){if(s==="true")return!0;if(s==="false")return!1;if(s===Number(s).toString())return Number(s);if(s===""||s==="null")return null;if(typeof s!="string")return s;try{return JSON.parse(decodeURIComponent(s))}catch{return s}}function sn(s){return s.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}const bt={setDataAttribute(s,t,e){s.setAttribute(`data-bs-${sn(t)}`,e)},removeDataAttribute(s,t){s.removeAttribute(`data-bs-${sn(t)}`)},getDataAttributes(s){if(!s)return{};const t={},e=Object.keys(s.dataset).filter(n=>n.startsWith("bs")&&!n.startsWith("bsConfig"));for(const n of e){let i=n.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),t[i]=vs(s.dataset[n])}return t},getDataAttribute(s,t){return vs(s.getAttribute(`data-bs-${sn(t)}`))}};class Ee{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const n=gt(e)?bt.getDataAttribute(e,"config"):{};return{...this.constructor.Default,...typeof n=="object"?n:{},...gt(e)?bt.getDataAttributes(e):{},...typeof t=="object"?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const[n,i]of Object.entries(e)){const r=t[n],o=gt(r)?"element":wo(r);if(!new RegExp(i).test(o))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`)}}}const Io="5.3.2";class dt extends Ee{constructor(t,e){super(),t=Ct(t),t&&(this._element=t,this._config=this._getConfig(e),tn.set(this._element,this.constructor.DATA_KEY,this))}dispose(){tn.remove(this._element,this.constructor.DATA_KEY),u.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,n=!0){Ni(t,e,n)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return tn.get(Ct(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,typeof e=="object"?e:null)}static get VERSION(){return Io}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}}const rn=s=>{let t=s.getAttribute("data-bs-target");if(!t||t==="#"){let e=s.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;e.includes("#")&&!e.startsWith("#")&&(e=`#${e.split("#")[1]}`),t=e&&e!=="#"?Ti(e.trim()):null}return t},x={find(s,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,s))},findOne(s,t=document.documentElement){return Element.prototype.querySelector.call(t,s)},children(s,t){return[].concat(...s.children).filter(e=>e.matches(t))},parents(s,t){const e=[];let n=s.parentNode.closest(t);for(;n;)e.push(n),n=n.parentNode.closest(t);return e},prev(s,t){let e=s.previousElementSibling;for(;e;){if(e.matches(t))return[e];e=e.previousElementSibling}return[]},next(s,t){let e=s.nextElementSibling;for(;e;){if(e.matches(t))return[e];e=e.nextElementSibling}return[]},focusableChildren(s){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(e=>`${e}:not([tabindex^="-"])`).join(",");return this.find(t,s).filter(e=>!Tt(e)&&re(e))},getSelectorFromElement(s){const t=rn(s);return t&&x.findOne(t)?t:null},getElementFromSelector(s){const t=rn(s);return t?x.findOne(t):null},getMultipleElementsFromSelector(s){const t=rn(s);return t?x.find(t):[]}},qe=(s,t="hide")=>{const e=`click.dismiss${s.EVENT_KEY}`,n=s.NAME;u.on(document,e,`[data-bs-dismiss="${n}"]`,function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),Tt(this))return;const r=x.getElementFromSelector(this)||this.closest(`.${n}`);s.getOrCreateInstance(r)[t]()})},$o="alert",Mo="bs.alert",Ri=`.${Mo}`,Po=`close${Ri}`,Ro=`closed${Ri}`,Bo="fade",Fo="show";class Ke extends dt{static get NAME(){return $o}close(){if(u.trigger(this._element,Po).defaultPrevented)return;this._element.classList.remove(Fo);const e=this._element.classList.contains(Bo);this._queueCallback(()=>this._destroyElement(),this._element,e)}_destroyElement(){this._element.remove(),u.trigger(this._element,Ro),this.dispose()}static jQueryInterface(t){return this.each(function(){const e=Ke.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}qe(Ke,"close");rt(Ke);const Vo="button",Wo="bs.button",jo=`.${Wo}`,Ho=".data-api",zo="active",_s='[data-bs-toggle="button"]',qo=`click${jo}${Ho}`;class Ye extends dt{static get NAME(){return Vo}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle(zo))}static jQueryInterface(t){return this.each(function(){const e=Ye.getOrCreateInstance(this);t==="toggle"&&e[t]()})}}u.on(document,qo,_s,s=>{s.preventDefault();const t=s.target.closest(_s);Ye.getOrCreateInstance(t).toggle()});rt(Ye);const Ko="swipe",oe=".bs.swipe",Yo=`touchstart${oe}`,Uo=`touchmove${oe}`,Xo=`touchend${oe}`,Go=`pointerdown${oe}`,Qo=`pointerup${oe}`,Jo="touch",Zo="pen",ta="pointer-event",ea=40,na={endCallback:null,leftCallback:null,rightCallback:null},sa={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class Fe extends Ee{constructor(t,e){super(),this._element=t,!(!t||!Fe.isSupported())&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return na}static get DefaultType(){return sa}static get NAME(){return Ko}dispose(){u.off(this._element,oe)}_start(t){if(!this._supportPointerEvents){this._deltaX=t.touches[0].clientX;return}this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX)}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),G(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=ea)return;const e=t/this._deltaX;this._deltaX=0,e&&G(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(u.on(this._element,Go,t=>this._start(t)),u.on(this._element,Qo,t=>this._end(t)),this._element.classList.add(ta)):(u.on(this._element,Yo,t=>this._start(t)),u.on(this._element,Uo,t=>this._move(t)),u.on(this._element,Xo,t=>this._end(t)))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&(t.pointerType===Zo||t.pointerType===Jo)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const ia="carousel",ra="bs.carousel",Ot=`.${ra}`,Bi=".data-api",oa="ArrowLeft",aa="ArrowRight",la=500,de="next",qt="prev",Ut="left",$e="right",ca=`slide${Ot}`,on=`slid${Ot}`,da=`keydown${Ot}`,ha=`mouseenter${Ot}`,ua=`mouseleave${Ot}`,pa=`dragstart${Ot}`,ma=`load${Ot}${Bi}`,fa=`click${Ot}${Bi}`,Fi="carousel",Se="active",ga="slide",ba="carousel-item-end",va="carousel-item-start",_a="carousel-item-next",Ea="carousel-item-prev",Vi=".active",Wi=".carousel-item",ya=Vi+Wi,wa=".carousel-item img",xa=".carousel-indicators",Aa="[data-bs-slide], [data-bs-slide-to]",Ca='[data-bs-ride="carousel"]',Ta={[oa]:$e,[aa]:Ut},Sa={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},ka={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class ye extends dt{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=x.findOne(xa,this._element),this._addEventListeners(),this._config.ride===Fi&&this.cycle()}static get Default(){return Sa}static get DefaultType(){return ka}static get NAME(){return ia}next(){this._slide(de)}nextWhenVisible(){!document.hidden&&re(this._element)&&this.next()}prev(){this._slide(qt)}pause(){this._isSliding&&Si(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){if(this._config.ride){if(this._isSliding){u.one(this._element,on,()=>this.cycle());return}this.cycle()}}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding){u.one(this._element,on,()=>this.to(t));return}const n=this._getItemIndex(this._getActive());if(n===t)return;const i=t>n?de:qt;this._slide(i,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&u.on(this._element,da,t=>this._keydown(t)),this._config.pause==="hover"&&(u.on(this._element,ha,()=>this.pause()),u.on(this._element,ua,()=>this._maybeEnableCycle())),this._config.touch&&Fe.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const n of x.find(wa,this._element))u.on(n,pa,i=>i.preventDefault());const e={leftCallback:()=>this._slide(this._directionToOrder(Ut)),rightCallback:()=>this._slide(this._directionToOrder($e)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),la+this._config.interval))}};this._swipeHelper=new Fe(this._element,e)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=Ta[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=x.findOne(Vi,this._indicatorsElement);e.classList.remove(Se),e.removeAttribute("aria-current");const n=x.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);n&&(n.classList.add(Se),n.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const n=this._getActive(),i=t===de,r=e||qn(this._getItems(),n,i,this._config.wrap);if(r===n)return;const o=this._getItemIndex(r),a=f=>u.trigger(this._element,f,{relatedTarget:r,direction:this._orderToDirection(t),from:this._getItemIndex(n),to:o});if(a(ca).defaultPrevented||!n||!r)return;const d=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=r;const c=i?va:ba,p=i?_a:Ea;r.classList.add(p),_e(r),n.classList.add(c),r.classList.add(c);const g=()=>{r.classList.remove(c,p),r.classList.add(Se),n.classList.remove(Se,p,c),this._isSliding=!1,a(on)};this._queueCallback(g,n,this._isAnimated()),d&&this.cycle()}_isAnimated(){return this._element.classList.contains(ga)}_getActive(){return x.findOne(ya,this._element)}_getItems(){return x.find(Wi,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return st()?t===Ut?qt:de:t===Ut?de:qt}_orderToDirection(t){return st()?t===qt?Ut:$e:t===qt?$e:Ut}static jQueryInterface(t){return this.each(function(){const e=ye.getOrCreateInstance(this,t);if(typeof t=="number"){e.to(t);return}if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(document,fa,Aa,function(s){const t=x.getElementFromSelector(this);if(!t||!t.classList.contains(Fi))return;s.preventDefault();const e=ye.getOrCreateInstance(t),n=this.getAttribute("data-bs-slide-to");if(n){e.to(n),e._maybeEnableCycle();return}if(bt.getDataAttribute(this,"slide")==="next"){e.next(),e._maybeEnableCycle();return}e.prev(),e._maybeEnableCycle()});u.on(window,ma,()=>{const s=x.find(Ca);for(const t of s)ye.getOrCreateInstance(t)});rt(ye);const Oa="collapse",Na="bs.collapse",we=`.${Na}`,Da=".data-api",La=`show${we}`,Ia=`shown${we}`,$a=`hide${we}`,Ma=`hidden${we}`,Pa=`click${we}${Da}`,an="show",Gt="collapse",ke="collapsing",Ra="collapsed",Ba=`:scope .${Gt} .${Gt}`,Fa="collapse-horizontal",Va="width",Wa="height",ja=".collapse.show, .collapse.collapsing",An='[data-bs-toggle="collapse"]',Ha={parent:null,toggle:!0},za={parent:"(null|element)",toggle:"boolean"};class be extends dt{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const n=x.find(An);for(const i of n){const r=x.getSelectorFromElement(i),o=x.find(r).filter(a=>a===this._element);r!==null&&o.length&&this._triggerArray.push(i)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return Ha}static get DefaultType(){return za}static get NAME(){return Oa}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(ja).filter(a=>a!==this._element).map(a=>be.getOrCreateInstance(a,{toggle:!1}))),t.length&&t[0]._isTransitioning||u.trigger(this._element,La).defaultPrevented)return;for(const a of t)a.hide();const n=this._getDimension();this._element.classList.remove(Gt),this._element.classList.add(ke),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=()=>{this._isTransitioning=!1,this._element.classList.remove(ke),this._element.classList.add(Gt,an),this._element.style[n]="",u.trigger(this._element,Ia)},o=`scroll${n[0].toUpperCase()+n.slice(1)}`;this._queueCallback(i,this._element,!0),this._element.style[n]=`${this._element[o]}px`}hide(){if(this._isTransitioning||!this._isShown()||u.trigger(this._element,$a).defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,_e(this._element),this._element.classList.add(ke),this._element.classList.remove(Gt,an);for(const i of this._triggerArray){const r=x.getElementFromSelector(i);r&&!this._isShown(r)&&this._addAriaAndCollapsedClass([i],!1)}this._isTransitioning=!0;const n=()=>{this._isTransitioning=!1,this._element.classList.remove(ke),this._element.classList.add(Gt),u.trigger(this._element,Ma)};this._element.style[e]="",this._queueCallback(n,this._element,!0)}_isShown(t=this._element){return t.classList.contains(an)}_configAfterMerge(t){return t.toggle=!!t.toggle,t.parent=Ct(t.parent),t}_getDimension(){return this._element.classList.contains(Fa)?Va:Wa}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(An);for(const e of t){const n=x.getElementFromSelector(e);n&&this._addAriaAndCollapsedClass([e],this._isShown(n))}}_getFirstLevelChildren(t){const e=x.find(Ba,this._config.parent);return x.find(t,this._config.parent).filter(n=>!e.includes(n))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const n of t)n.classList.toggle(Ra,!e),n.setAttribute("aria-expanded",e)}static jQueryInterface(t){const e={};return typeof t=="string"&&/show|hide/.test(t)&&(e.toggle=!1),this.each(function(){const n=be.getOrCreateInstance(this,e);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t]()}})}}u.on(document,Pa,An,function(s){(s.target.tagName==="A"||s.delegateTarget&&s.delegateTarget.tagName==="A")&&s.preventDefault();for(const t of x.getMultipleElementsFromSelector(this))be.getOrCreateInstance(t,{toggle:!1}).toggle()});rt(be);const Es="dropdown",qa="bs.dropdown",Wt=`.${qa}`,Yn=".data-api",Ka="Escape",ys="Tab",Ya="ArrowUp",ws="ArrowDown",Ua=2,Xa=`hide${Wt}`,Ga=`hidden${Wt}`,Qa=`show${Wt}`,Ja=`shown${Wt}`,ji=`click${Wt}${Yn}`,Hi=`keydown${Wt}${Yn}`,Za=`keyup${Wt}${Yn}`,Xt="show",tl="dropup",el="dropend",nl="dropstart",sl="dropup-center",il="dropdown-center",Mt='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',rl=`${Mt}.${Xt}`,Me=".dropdown-menu",ol=".navbar",al=".navbar-nav",ll=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",cl=st()?"top-end":"top-start",dl=st()?"top-start":"top-end",hl=st()?"bottom-end":"bottom-start",ul=st()?"bottom-start":"bottom-end",pl=st()?"left-start":"right-start",ml=st()?"right-start":"left-start",fl="top",gl="bottom",bl={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},vl={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class ut extends dt{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=x.next(this._element,Me)[0]||x.prev(this._element,Me)[0]||x.findOne(Me,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return bl}static get DefaultType(){return vl}static get NAME(){return Es}toggle(){return this._isShown()?this.hide():this.show()}show(){if(Tt(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!u.trigger(this._element,Qa,t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(al))for(const n of[].concat(...document.body.children))u.on(n,"mouseover",Be);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Xt),this._element.classList.add(Xt),u.trigger(this._element,Ja,t)}}hide(){if(Tt(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){if(!u.trigger(this._element,Xa,t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const n of[].concat(...document.body.children))u.off(n,"mouseover",Be);this._popper&&this._popper.destroy(),this._menu.classList.remove(Xt),this._element.classList.remove(Xt),this._element.setAttribute("aria-expanded","false"),bt.removeDataAttribute(this._menu,"popper"),u.trigger(this._element,Ga,t)}}_getConfig(t){if(t=super._getConfig(t),typeof t.reference=="object"&&!gt(t.reference)&&typeof t.reference.getBoundingClientRect!="function")throw new TypeError(`${Es.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(typeof Ci>"u")throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let t=this._element;this._config.reference==="parent"?t=this._parent:gt(this._config.reference)?t=Ct(this._config.reference):typeof this._config.reference=="object"&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=zn(t,this._menu,e)}_isShown(){return this._menu.classList.contains(Xt)}_getPlacement(){const t=this._parent;if(t.classList.contains(el))return pl;if(t.classList.contains(nl))return ml;if(t.classList.contains(sl))return fl;if(t.classList.contains(il))return gl;const e=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return t.classList.contains(tl)?e?dl:cl:e?ul:hl}_detectNavbar(){return this._element.closest(ol)!==null}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(bt.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,...G(this._config.popperConfig,[t])}}_selectMenuItem({key:t,target:e}){const n=x.find(ll,this._menu).filter(i=>re(i));n.length&&qn(n,e,t===ws,!n.includes(e)).focus()}static jQueryInterface(t){return this.each(function(){const e=ut.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}static clearMenus(t){if(t.button===Ua||t.type==="keyup"&&t.key!==ys)return;const e=x.find(rl);for(const n of e){const i=ut.getInstance(n);if(!i||i._config.autoClose===!1)continue;const r=t.composedPath(),o=r.includes(i._menu);if(r.includes(i._element)||i._config.autoClose==="inside"&&!o||i._config.autoClose==="outside"&&o||i._menu.contains(t.target)&&(t.type==="keyup"&&t.key===ys||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const a={relatedTarget:i._element};t.type==="click"&&(a.clickEvent=t),i._completeHide(a)}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),n=t.key===Ka,i=[Ya,ws].includes(t.key);if(!i&&!n||e&&!n)return;t.preventDefault();const r=this.matches(Mt)?this:x.prev(this,Mt)[0]||x.next(this,Mt)[0]||x.findOne(Mt,t.delegateTarget.parentNode),o=ut.getOrCreateInstance(r);if(i){t.stopPropagation(),o.show(),o._selectMenuItem(t);return}o._isShown()&&(t.stopPropagation(),o.hide(),r.focus())}}u.on(document,Hi,Mt,ut.dataApiKeydownHandler);u.on(document,Hi,Me,ut.dataApiKeydownHandler);u.on(document,ji,ut.clearMenus);u.on(document,Za,ut.clearMenus);u.on(document,ji,Mt,function(s){s.preventDefault(),ut.getOrCreateInstance(this).toggle()});rt(ut);const zi="backdrop",_l="fade",xs="show",As=`mousedown.bs.${zi}`,El={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},yl={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class qi extends Ee{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return El}static get DefaultType(){return yl}static get NAME(){return zi}show(t){if(!this._config.isVisible){G(t);return}this._append();const e=this._getElement();this._config.isAnimated&&_e(e),e.classList.add(xs),this._emulateAnimation(()=>{G(t)})}hide(t){if(!this._config.isVisible){G(t);return}this._getElement().classList.remove(xs),this._emulateAnimation(()=>{this.dispose(),G(t)})}dispose(){this._isAppended&&(u.off(this._element,As),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add(_l),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=Ct(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),u.on(t,As,()=>{G(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(t){Ni(t,this._getElement(),this._config.isAnimated)}}const wl="focustrap",xl="bs.focustrap",Ve=`.${xl}`,Al=`focusin${Ve}`,Cl=`keydown.tab${Ve}`,Tl="Tab",Sl="forward",Cs="backward",kl={autofocus:!0,trapElement:null},Ol={autofocus:"boolean",trapElement:"element"};class Ki extends Ee{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return kl}static get DefaultType(){return Ol}static get NAME(){return wl}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),u.off(document,Ve),u.on(document,Al,t=>this._handleFocusin(t)),u.on(document,Cl,t=>this._handleKeydown(t)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,u.off(document,Ve))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const n=x.focusableChildren(e);n.length===0?e.focus():this._lastTabNavDirection===Cs?n[n.length-1].focus():n[0].focus()}_handleKeydown(t){t.key===Tl&&(this._lastTabNavDirection=t.shiftKey?Cs:Sl)}}const Ts=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",Ss=".sticky-top",Oe="padding-right",ks="margin-right";class Cn{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,Oe,e=>e+t),this._setElementAttributes(Ts,Oe,e=>e+t),this._setElementAttributes(Ss,ks,e=>e-t)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,Oe),this._resetElementAttributes(Ts,Oe),this._resetElementAttributes(Ss,ks)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,n){const i=this.getWidth(),r=o=>{if(o!==this._element&&window.innerWidth>o.clientWidth+i)return;this._saveInitialAttribute(o,e);const a=window.getComputedStyle(o).getPropertyValue(e);o.style.setProperty(e,`${n(Number.parseFloat(a))}px`)};this._applyManipulationCallback(t,r)}_saveInitialAttribute(t,e){const n=t.style.getPropertyValue(e);n&&bt.setDataAttribute(t,e,n)}_resetElementAttributes(t,e){const n=i=>{const r=bt.getDataAttribute(i,e);if(r===null){i.style.removeProperty(e);return}bt.removeDataAttribute(i,e),i.style.setProperty(e,r)};this._applyManipulationCallback(t,n)}_applyManipulationCallback(t,e){if(gt(t)){e(t);return}for(const n of x.find(t,this._element))e(n)}}const Nl="modal",Dl="bs.modal",it=`.${Dl}`,Ll=".data-api",Il="Escape",$l=`hide${it}`,Ml=`hidePrevented${it}`,Yi=`hidden${it}`,Ui=`show${it}`,Pl=`shown${it}`,Rl=`resize${it}`,Bl=`click.dismiss${it}`,Fl=`mousedown.dismiss${it}`,Vl=`keydown.dismiss${it}`,Wl=`click${it}${Ll}`,Os="modal-open",jl="fade",Ns="show",ln="modal-static",Hl=".modal.show",zl=".modal-dialog",ql=".modal-body",Kl='[data-bs-toggle="modal"]',Yl={backdrop:!0,focus:!0,keyboard:!0},Ul={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class ne extends dt{constructor(t,e){super(t,e),this._dialog=x.findOne(zl,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new Cn,this._addEventListeners()}static get Default(){return Yl}static get DefaultType(){return Ul}static get NAME(){return Nl}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||u.trigger(this._element,Ui,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(Os),this._adjustDialog(),this._backdrop.show(()=>this._showElement(t)))}hide(){!this._isShown||this._isTransitioning||u.trigger(this._element,$l).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(Ns),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){u.off(window,it),u.off(this._dialog,it),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new qi({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new Ki({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=x.findOne(ql,this._dialog);e&&(e.scrollTop=0),_e(this._element),this._element.classList.add(Ns);const n=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,u.trigger(this._element,Pl,{relatedTarget:t})};this._queueCallback(n,this._dialog,this._isAnimated())}_addEventListeners(){u.on(this._element,Vl,t=>{if(t.key===Il){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),u.on(window,Rl,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),u.on(this._element,Fl,t=>{u.one(this._element,Bl,e=>{if(!(this._element!==t.target||this._element!==e.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(Os),this._resetAdjustments(),this._scrollBar.reset(),u.trigger(this._element,Yi)})}_isAnimated(){return this._element.classList.contains(jl)}_triggerBackdropTransition(){if(u.trigger(this._element,Ml).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,n=this._element.style.overflowY;n==="hidden"||this._element.classList.contains(ln)||(e||(this._element.style.overflowY="hidden"),this._element.classList.add(ln),this._queueCallback(()=>{this._element.classList.remove(ln),this._queueCallback(()=>{this._element.style.overflowY=n},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),n=e>0;if(n&&!t){const i=st()?"paddingLeft":"paddingRight";this._element.style[i]=`${e}px`}if(!n&&t){const i=st()?"paddingRight":"paddingLeft";this._element.style[i]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each(function(){const n=ne.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof n[t]>"u")throw new TypeError(`No method named "${t}"`);n[t](e)}})}}u.on(document,Wl,Kl,function(s){const t=x.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&s.preventDefault(),u.one(t,Ui,i=>{i.defaultPrevented||u.one(t,Yi,()=>{re(this)&&this.focus()})});const e=x.findOne(Hl);e&&ne.getInstance(e).hide(),ne.getOrCreateInstance(t).toggle(this)});qe(ne);rt(ne);const Xl="offcanvas",Gl="bs.offcanvas",Et=`.${Gl}`,Xi=".data-api",Ql=`load${Et}${Xi}`,Jl="Escape",Ds="show",Ls="showing",Is="hiding",Zl="offcanvas-backdrop",Gi=".offcanvas.show",tc=`show${Et}`,ec=`shown${Et}`,nc=`hide${Et}`,$s=`hidePrevented${Et}`,Qi=`hidden${Et}`,sc=`resize${Et}`,ic=`click${Et}${Xi}`,rc=`keydown.dismiss${Et}`,oc='[data-bs-toggle="offcanvas"]',ac={backdrop:!0,keyboard:!0,scroll:!1},lc={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class St extends dt{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return ac}static get DefaultType(){return lc}static get NAME(){return Xl}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown||u.trigger(this._element,tc,{relatedTarget:t}).defaultPrevented)return;this._isShown=!0,this._backdrop.show(),this._config.scroll||new Cn().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(Ls);const n=()=>{(!this._config.scroll||this._config.backdrop)&&this._focustrap.activate(),this._element.classList.add(Ds),this._element.classList.remove(Ls),u.trigger(this._element,ec,{relatedTarget:t})};this._queueCallback(n,this._element,!0)}hide(){if(!this._isShown||u.trigger(this._element,nc).defaultPrevented)return;this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(Is),this._backdrop.hide();const e=()=>{this._element.classList.remove(Ds,Is),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new Cn().reset(),u.trigger(this._element,Qi)};this._queueCallback(e,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=()=>{if(this._config.backdrop==="static"){u.trigger(this._element,$s);return}this.hide()},e=!!this._config.backdrop;return new qi({className:Zl,isVisible:e,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:e?t:null})}_initializeFocusTrap(){return new Ki({trapElement:this._element})}_addEventListeners(){u.on(this._element,rc,t=>{if(t.key===Jl){if(this._config.keyboard){this.hide();return}u.trigger(this._element,$s)}})}static jQueryInterface(t){return this.each(function(){const e=St.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}u.on(document,ic,oc,function(s){const t=x.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&s.preventDefault(),Tt(this))return;u.one(t,Qi,()=>{re(this)&&this.focus()});const e=x.findOne(Gi);e&&e!==t&&St.getInstance(e).hide(),St.getOrCreateInstance(t).toggle(this)});u.on(window,Ql,()=>{for(const s of x.find(Gi))St.getOrCreateInstance(s).show()});u.on(window,sc,()=>{for(const s of x.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(s).position!=="fixed"&&St.getOrCreateInstance(s).hide()});qe(St);rt(St);const cc=/^aria-[\w-]*$/i,Ji={"*":["class","dir","id","lang","role",cc],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},dc=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),hc=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,uc=(s,t)=>{const e=s.nodeName.toLowerCase();return t.includes(e)?dc.has(e)?!!hc.test(s.nodeValue):!0:t.filter(n=>n instanceof RegExp).some(n=>n.test(e))};function pc(s,t,e){if(!s.length)return s;if(e&&typeof e=="function")return e(s);const i=new window.DOMParser().parseFromString(s,"text/html"),r=[].concat(...i.body.querySelectorAll("*"));for(const o of r){const a=o.nodeName.toLowerCase();if(!Object.keys(t).includes(a)){o.remove();continue}const l=[].concat(...o.attributes),d=[].concat(t["*"]||[],t[a]||[]);for(const c of l)uc(c,d)||o.removeAttribute(c.nodeName)}return i.body.innerHTML}const mc="TemplateFactory",fc={allowList:Ji,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},gc={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},bc={entry:"(string|element|function|null)",selector:"(string|element)"};class vc extends Ee{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return fc}static get DefaultType(){return gc}static get NAME(){return mc}getContent(){return Object.values(this._config.content).map(t=>this._resolvePossibleFunction(t)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[i,r]of Object.entries(this._config.content))this._setContent(t,r,i);const e=t.children[0],n=this._resolvePossibleFunction(this._config.extraClass);return n&&e.classList.add(...n.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,n]of Object.entries(t))super._typeCheckConfig({selector:e,entry:n},bc)}_setContent(t,e,n){const i=x.findOne(n,t);if(i){if(e=this._resolvePossibleFunction(e),!e){i.remove();return}if(gt(e)){this._putElementInTemplate(Ct(e),i);return}if(this._config.html){i.innerHTML=this._maybeSanitize(e);return}i.textContent=e}}_maybeSanitize(t){return this._config.sanitize?pc(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return G(t,[this])}_putElementInTemplate(t,e){if(this._config.html){e.innerHTML="",e.append(t);return}e.textContent=t.textContent}}const _c="tooltip",Ec=new Set(["sanitize","allowList","sanitizeFn"]),cn="fade",yc="modal",Ne="show",wc=".tooltip-inner",Ms=`.${yc}`,Ps="hide.bs.modal",he="hover",dn="focus",xc="click",Ac="manual",Cc="hide",Tc="hidden",Sc="show",kc="shown",Oc="inserted",Nc="click",Dc="focusin",Lc="focusout",Ic="mouseenter",$c="mouseleave",Mc={AUTO:"auto",TOP:"top",RIGHT:st()?"left":"right",BOTTOM:"bottom",LEFT:st()?"right":"left"},Pc={allowList:Ji,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},Rc={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class ae extends dt{constructor(t,e){if(typeof Ci>"u")throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return Pc}static get DefaultType(){return Rc}static get NAME(){return _c}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){if(this._isEnabled){if(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()){this._leave();return}this._enter()}}dispose(){clearTimeout(this._timeout),u.off(this._element.closest(Ms),Ps,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!(this._isWithContent()&&this._isEnabled))return;const t=u.trigger(this._element,this.constructor.eventName(Sc)),n=(ki(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!n)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:r}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(r.append(i),u.trigger(this._element,this.constructor.eventName(Oc))),this._popper=this._createPopper(i),i.classList.add(Ne),"ontouchstart"in document.documentElement)for(const a of[].concat(...document.body.children))u.on(a,"mouseover",Be);const o=()=>{u.trigger(this._element,this.constructor.eventName(kc)),this._isHovered===!1&&this._leave(),this._isHovered=!1};this._queueCallback(o,this.tip,this._isAnimated())}hide(){if(!this._isShown()||u.trigger(this._element,this.constructor.eventName(Cc)).defaultPrevented)return;if(this._getTipElement().classList.remove(Ne),"ontouchstart"in document.documentElement)for(const i of[].concat(...document.body.children))u.off(i,"mouseover",Be);this._activeTrigger[xc]=!1,this._activeTrigger[dn]=!1,this._activeTrigger[he]=!1,this._isHovered=null;const n=()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),u.trigger(this._element,this.constructor.eventName(Tc)))};this._queueCallback(n,this.tip,this._isAnimated())}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(cn,Ne),e.classList.add(`bs-${this.constructor.NAME}-auto`);const n=xo(this.constructor.NAME).toString();return e.setAttribute("id",n),this._isAnimated()&&e.classList.add(cn),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new vc({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[wc]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(cn)}_isShown(){return this.tip&&this.tip.classList.contains(Ne)}_createPopper(t){const e=G(this._config.placement,[this,t,this._element]),n=Mc[e.toUpperCase()];return zn(this._element,t,this._getPopperConfig(n))}_getOffset(){const{offset:t}=this._config;return typeof t=="string"?t.split(",").map(e=>Number.parseInt(e,10)):typeof t=="function"?e=>t(e,this._element):t}_resolvePossibleFunction(t){return G(t,[this._element])}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:n=>{this._getTipElement().setAttribute("data-popper-placement",n.state.placement)}}]};return{...e,...G(this._config.popperConfig,[e])}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if(e==="click")u.on(this._element,this.constructor.eventName(Nc),this._config.selector,n=>{this._initializeOnDelegatedTarget(n).toggle()});else if(e!==Ac){const n=e===he?this.constructor.eventName(Ic):this.constructor.eventName(Dc),i=e===he?this.constructor.eventName($c):this.constructor.eventName(Lc);u.on(this._element,n,this._config.selector,r=>{const o=this._initializeOnDelegatedTarget(r);o._activeTrigger[r.type==="focusin"?dn:he]=!0,o._enter()}),u.on(this._element,i,this._config.selector,r=>{const o=this._initializeOnDelegatedTarget(r);o._activeTrigger[r.type==="focusout"?dn:he]=o._element.contains(r.relatedTarget),o._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},u.on(this._element.closest(Ms),Ps,this._hideModalHandler)}_fixTitle(){const t=this._element.getAttribute("title");t&&(!this._element.getAttribute("aria-label")&&!this._element.textContent.trim()&&this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"))}_enter(){if(this._isShown()||this._isHovered){this._isHovered=!0;return}this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show)}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=bt.getDataAttributes(this._element);for(const n of Object.keys(e))Ec.has(n)&&delete e[n];return t={...e,...typeof t=="object"&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=t.container===!1?document.body:Ct(t.container),typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),typeof t.title=="number"&&(t.title=t.title.toString()),typeof t.content=="number"&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const[e,n]of Object.entries(this._config))this.constructor.Default[e]!==n&&(t[e]=n);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(t){return this.each(function(){const e=ae.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}rt(ae);const Bc="popover",Fc=".popover-header",Vc=".popover-body",Wc={...ae.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},jc={...ae.DefaultType,content:"(null|string|element|function)"};class Un extends ae{static get Default(){return Wc}static get DefaultType(){return jc}static get NAME(){return Bc}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[Fc]:this._getTitle(),[Vc]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each(function(){const e=Un.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t]()}})}}rt(Un);const Hc="scrollspy",zc="bs.scrollspy",Xn=`.${zc}`,qc=".data-api",Kc=`activate${Xn}`,Rs=`click${Xn}`,Yc=`load${Xn}${qc}`,Uc="dropdown-item",Kt="active",Xc='[data-bs-spy="scroll"]',hn="[href]",Gc=".nav, .list-group",Bs=".nav-link",Qc=".nav-item",Jc=".list-group-item",Zc=`${Bs}, ${Qc} > ${Bs}, ${Jc}`,td=".dropdown",ed=".dropdown-toggle",nd={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},sd={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class Ue extends dt{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return nd}static get DefaultType(){return sd}static get NAME(){return Hc}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(t){return t.target=Ct(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,typeof t.threshold=="string"&&(t.threshold=t.threshold.split(",").map(e=>Number.parseFloat(e))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(u.off(this._config.target,Rs),u.on(this._config.target,Rs,hn,t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const n=this._rootElement||window,i=e.offsetTop-this._element.offsetTop;if(n.scrollTo){n.scrollTo({top:i,behavior:"smooth"});return}n.scrollTop=i}}))}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(e=>this._observerCallback(e),t)}_observerCallback(t){const e=o=>this._targetLinks.get(`#${o.target.id}`),n=o=>{this._previousScrollData.visibleEntryTop=o.target.offsetTop,this._process(e(o))},i=(this._rootElement||document.documentElement).scrollTop,r=i>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=i;for(const o of t){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(o));continue}const a=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(r&&a){if(n(o),!i)return;continue}!r&&!a&&n(o)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=x.find(hn,this._config.target);for(const e of t){if(!e.hash||Tt(e))continue;const n=x.findOne(decodeURI(e.hash),this._element);re(n)&&(this._targetLinks.set(decodeURI(e.hash),e),this._observableSections.set(e.hash,n))}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(Kt),this._activateParents(t),u.trigger(this._element,Kc,{relatedTarget:t}))}_activateParents(t){if(t.classList.contains(Uc)){x.findOne(ed,t.closest(td)).classList.add(Kt);return}for(const e of x.parents(t,Gc))for(const n of x.prev(e,Zc))n.classList.add(Kt)}_clearActiveClass(t){t.classList.remove(Kt);const e=x.find(`${hn}.${Kt}`,t);for(const n of e)n.classList.remove(Kt)}static jQueryInterface(t){return this.each(function(){const e=Ue.getOrCreateInstance(this,t);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(window,Yc,()=>{for(const s of x.find(Xc))Ue.getOrCreateInstance(s)});rt(Ue);const id="tab",rd="bs.tab",jt=`.${rd}`,od=`hide${jt}`,ad=`hidden${jt}`,ld=`show${jt}`,cd=`shown${jt}`,dd=`click${jt}`,hd=`keydown${jt}`,ud=`load${jt}`,pd="ArrowLeft",Fs="ArrowRight",md="ArrowUp",Vs="ArrowDown",un="Home",Ws="End",Pt="active",js="fade",pn="show",fd="dropdown",Zi=".dropdown-toggle",gd=".dropdown-menu",mn=`:not(${Zi})`,bd='.list-group, .nav, [role="tablist"]',vd=".nav-item, .list-group-item",_d=`.nav-link${mn}, .list-group-item${mn}, [role="tab"]${mn}`,tr='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',fn=`${_d}, ${tr}`,Ed=`.${Pt}[data-bs-toggle="tab"], .${Pt}[data-bs-toggle="pill"], .${Pt}[data-bs-toggle="list"]`;class se extends dt{constructor(t){super(t),this._parent=this._element.closest(bd),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),u.on(this._element,hd,e=>this._keydown(e)))}static get NAME(){return id}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),n=e?u.trigger(e,od,{relatedTarget:t}):null;u.trigger(t,ld,{relatedTarget:e}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(e,t),this._activate(t,e))}_activate(t,e){if(!t)return;t.classList.add(Pt),this._activate(x.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.add(pn);return}t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),u.trigger(t,cd,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(js))}_deactivate(t,e){if(!t)return;t.classList.remove(Pt),t.blur(),this._deactivate(x.getElementFromSelector(t));const n=()=>{if(t.getAttribute("role")!=="tab"){t.classList.remove(pn);return}t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),u.trigger(t,ad,{relatedTarget:e})};this._queueCallback(n,t,t.classList.contains(js))}_keydown(t){if(![pd,Fs,md,Vs,un,Ws].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=this._getChildren().filter(i=>!Tt(i));let n;if([un,Ws].includes(t.key))n=e[t.key===un?0:e.length-1];else{const i=[Fs,Vs].includes(t.key);n=qn(e,t.target,i,!0)}n&&(n.focus({preventScroll:!0}),se.getOrCreateInstance(n).show())}_getChildren(){return x.find(fn,this._parent)}_getActiveElem(){return this._getChildren().find(t=>this._elemIsActive(t))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const n of e)this._setInitialAttributesOnChild(n)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),n=this._getOuterElement(t);t.setAttribute("aria-selected",e),n!==t&&this._setAttributeIfNotExists(n,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){const e=x.getElementFromSelector(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,e){const n=this._getOuterElement(t);if(!n.classList.contains(fd))return;const i=(r,o)=>{const a=x.findOne(r,n);a&&a.classList.toggle(o,e)};i(Zi,Pt),i(gd,pn),n.setAttribute("aria-expanded",e)}_setAttributeIfNotExists(t,e,n){t.hasAttribute(e)||t.setAttribute(e,n)}_elemIsActive(t){return t.classList.contains(Pt)}_getInnerElement(t){return t.matches(fn)?t:x.findOne(fn,t)}_getOuterElement(t){return t.closest(vd)||t}static jQueryInterface(t){return this.each(function(){const e=se.getOrCreateInstance(this);if(typeof t=="string"){if(e[t]===void 0||t.startsWith("_")||t==="constructor")throw new TypeError(`No method named "${t}"`);e[t]()}})}}u.on(document,dd,tr,function(s){["A","AREA"].includes(this.tagName)&&s.preventDefault(),!Tt(this)&&se.getOrCreateInstance(this).show()});u.on(window,ud,()=>{for(const s of x.find(Ed))se.getOrCreateInstance(s)});rt(se);const yd="toast",wd="bs.toast",Nt=`.${wd}`,xd=`mouseover${Nt}`,Ad=`mouseout${Nt}`,Cd=`focusin${Nt}`,Td=`focusout${Nt}`,Sd=`hide${Nt}`,kd=`hidden${Nt}`,Od=`show${Nt}`,Nd=`shown${Nt}`,Dd="fade",Hs="hide",De="show",Le="showing",Ld={animation:"boolean",autohide:"boolean",delay:"number"},Id={animation:!0,autohide:!0,delay:5e3};class Xe extends dt{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return Id}static get DefaultType(){return Ld}static get NAME(){return yd}show(){if(u.trigger(this._element,Od).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(Dd);const e=()=>{this._element.classList.remove(Le),u.trigger(this._element,Nd),this._maybeScheduleHide()};this._element.classList.remove(Hs),_e(this._element),this._element.classList.add(De,Le),this._queueCallback(e,this._element,this._config.animation)}hide(){if(!this.isShown()||u.trigger(this._element,Sd).defaultPrevented)return;const e=()=>{this._element.classList.add(Hs),this._element.classList.remove(Le,De),u.trigger(this._element,kd)};this._element.classList.add(Le),this._queueCallback(e,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(De),super.dispose()}isShown(){return this._element.classList.contains(De)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=e;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=e;break}}if(e){this._clearTimeout();return}const n=t.relatedTarget;this._element===n||this._element.contains(n)||this._maybeScheduleHide()}_setListeners(){u.on(this._element,xd,t=>this._onInteraction(t,!0)),u.on(this._element,Ad,t=>this._onInteraction(t,!1)),u.on(this._element,Cd,t=>this._onInteraction(t,!0)),u.on(this._element,Td,t=>this._onInteraction(t,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each(function(){const e=Xe.getOrCreateInstance(this,t);if(typeof t=="string"){if(typeof e[t]>"u")throw new TypeError(`No method named "${t}"`);e[t](this)}})}}qe(Xe);rt(Xe);var z=Uint8Array,Q=Uint16Array,Gn=Int32Array,Qn=new z([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Jn=new z([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),zs=new z([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),er=function(s,t){for(var e=new Q(31),n=0;n<31;++n)e[n]=t+=1<<s[n-1];for(var i=new Gn(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)i[r]=r-e[n]<<5|n;return{b:e,r:i}},nr=er(Qn,2),$d=nr.b,Tn=nr.r;$d[28]=258,Tn[258]=28;var Md=er(Jn,0),qs=Md.r,Sn=new Q(32768);for(var $=0;$<32768;++$){var xt=($&43690)>>1|($&21845)<<1;xt=(xt&52428)>>2|(xt&13107)<<2,xt=(xt&61680)>>4|(xt&3855)<<4,Sn[$]=((xt&65280)>>8|(xt&255)<<8)>>1}var ge=function(s,t,e){for(var n=s.length,i=0,r=new Q(t);i<n;++i)s[i]&&++r[s[i]-1];var o=new Q(t);for(i=1;i<t;++i)o[i]=o[i-1]+r[i-1]<<1;var a;if(e){a=new Q(1<<t);var l=15-t;for(i=0;i<n;++i)if(s[i])for(var d=i<<4|s[i],c=t-s[i],p=o[s[i]-1]++<<c,g=p|(1<<c)-1;p<=g;++p)a[Sn[p]>>l]=d}else for(a=new Q(n),i=0;i<n;++i)s[i]&&(a[i]=Sn[o[s[i]-1]++]>>15-s[i]);return a},Vt=new z(288);for(var $=0;$<144;++$)Vt[$]=8;for(var $=144;$<256;++$)Vt[$]=9;for(var $=256;$<280;++$)Vt[$]=7;for(var $=280;$<288;++$)Vt[$]=8;var We=new z(32);for(var $=0;$<32;++$)We[$]=5;var Pd=ge(Vt,9,0),Rd=ge(We,5,0),sr=function(s){return(s+7)/8|0},ir=function(s,t,e){return(t==null||t<0)&&(t=0),(e==null||e>s.length)&&(e=s.length),new z(s.subarray(t,e))},Bd=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Ge=function(s,t,e){var n=new Error(t||Bd[s]);if(n.code=s,Error.captureStackTrace&&Error.captureStackTrace(n,Ge),!e)throw n;return n},mt=function(s,t,e){e<<=t&7;var n=t/8|0;s[n]|=e,s[n+1]|=e>>8},ue=function(s,t,e){e<<=t&7;var n=t/8|0;s[n]|=e,s[n+1]|=e>>8,s[n+2]|=e>>16},gn=function(s,t){for(var e=[],n=0;n<s.length;++n)s[n]&&e.push({s:n,f:s[n]});var i=e.length,r=e.slice();if(!i)return{t:or,l:0};if(i==1){var o=new z(e[0].s+1);return o[e[0].s]=1,{t:o,l:1}}e.sort(function(T,k){return T.f-k.f}),e.push({s:-1,f:25001});var a=e[0],l=e[1],d=0,c=1,p=2;for(e[0]={s:-1,f:a.f+l.f,l:a,r:l};c!=i-1;)a=e[e[d].f<e[p].f?d++:p++],l=e[d!=c&&e[d].f<e[p].f?d++:p++],e[c++]={s:-1,f:a.f+l.f,l:a,r:l};for(var g=r[0].s,n=1;n<i;++n)r[n].s>g&&(g=r[n].s);var f=new Q(g+1),b=kn(e[c-1],f,0);if(b>t){var n=0,m=0,_=b-t,E=1<<_;for(r.sort(function(k,O){return f[O.s]-f[k.s]||k.f-O.f});n<i;++n){var A=r[n].s;if(f[A]>t)m+=E-(1<<b-f[A]),f[A]=t;else break}for(m>>=_;m>0;){var S=r[n].s;f[S]<t?m-=1<<t-f[S]++-1:++n}for(;n>=0&&m;--n){var v=r[n].s;f[v]==t&&(--f[v],++m)}b=t}return{t:new z(f),l:b}},kn=function(s,t,e){return s.s==-1?Math.max(kn(s.l,t,e+1),kn(s.r,t,e+1)):t[s.s]=e},Ks=function(s){for(var t=s.length;t&&!s[--t];);for(var e=new Q(++t),n=0,i=s[0],r=1,o=function(l){e[n++]=l},a=1;a<=t;++a)if(s[a]==i&&a!=t)++r;else{if(!i&&r>2){for(;r>138;r-=138)o(32754);r>2&&(o(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(o(i),--r;r>6;r-=6)o(8304);r>2&&(o(r-3<<5|8208),r=0)}for(;r--;)o(i);r=1,i=s[a]}return{c:e.subarray(0,n),n:t}},pe=function(s,t){for(var e=0,n=0;n<t.length;++n)e+=s[n]*t[n];return e},rr=function(s,t,e){var n=e.length,i=sr(t+2);s[i]=n&255,s[i+1]=n>>8,s[i+2]=s[i]^255,s[i+3]=s[i+1]^255;for(var r=0;r<n;++r)s[i+r+4]=e[r];return(i+4+n)*8},Ys=function(s,t,e,n,i,r,o,a,l,d,c){mt(t,c++,e),++i[256];for(var p=gn(i,15),g=p.t,f=p.l,b=gn(r,15),m=b.t,_=b.l,E=Ks(g),A=E.c,S=E.n,v=Ks(m),T=v.c,k=v.n,O=new Q(19),C=0;C<A.length;++C)++O[A[C]&31];for(var C=0;C<T.length;++C)++O[T[C]&31];for(var w=gn(O,7),N=w.t,R=w.l,L=19;L>4&&!N[zs[L-1]];--L);var F=d+5<<3,V=pe(i,Vt)+pe(r,We)+o,W=pe(i,g)+pe(r,m)+o+14+3*L+pe(O,N)+2*O[16]+3*O[17]+7*O[18];if(l>=0&&F<=V&&F<=W)return rr(t,c,s.subarray(l,l+d));var M,D,q,K;if(mt(t,c,1+(W<V)),c+=2,W<V){M=ge(g,f,0),D=g,q=ge(m,_,0),K=m;var yt=ge(N,R,0);mt(t,c,S-257),mt(t,c+5,k-1),mt(t,c+10,L-4),c+=14;for(var C=0;C<L;++C)mt(t,c+3*C,N[zs[C]]);c+=3*L;for(var X=[A,T],at=0;at<2;++at)for(var lt=X[at],C=0;C<lt.length;++C){var j=lt[C]&31;mt(t,c,yt[j]),c+=N[j],j>15&&(mt(t,c,lt[C]>>5&127),c+=lt[C]>>12)}}else M=Pd,D=Vt,q=Rd,K=We;for(var C=0;C<a;++C){var I=n[C];if(I>255){var j=I>>18&31;ue(t,c,M[j+257]),c+=D[j+257],j>7&&(mt(t,c,I>>23&31),c+=Qn[j]);var et=I&31;ue(t,c,q[et]),c+=K[et],et>3&&(ue(t,c,I>>5&8191),c+=Jn[et])}else ue(t,c,M[I]),c+=D[I]}return ue(t,c,M[256]),c+D[256]},Fd=new Gn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),or=new z(0),Vd=function(s,t,e,n,i,r){var o=r.z||s.length,a=new z(n+o+5*(1+Math.ceil(o/7e3))+i),l=a.subarray(n,a.length-i),d=r.l,c=(r.r||0)&7;if(t){c&&(l[0]=r.r>>3);for(var p=Fd[t-1],g=p>>13,f=p&8191,b=(1<<e)-1,m=r.p||new Q(32768),_=r.h||new Q(b+1),E=Math.ceil(e/3),A=2*E,S=function(ce){return(s[ce]^s[ce+1]<<E^s[ce+2]<<A)&b},v=new Gn(25e3),T=new Q(288),k=new Q(32),O=0,C=0,w=r.i||0,N=0,R=r.w||0,L=0;w+2<o;++w){var F=S(w),V=w&32767,W=_[F];if(m[V]=W,_[F]=V,R<=w){var M=o-w;if((O>7e3||N>24576)&&(M>423||!d)){c=Ys(s,l,0,v,T,k,C,N,L,w-L,c),N=O=C=0,L=w;for(var D=0;D<286;++D)T[D]=0;for(var D=0;D<30;++D)k[D]=0}var q=2,K=0,yt=f,X=V-W&32767;if(M>2&&F==S(w-X))for(var at=Math.min(g,M)-1,lt=Math.min(32767,w),j=Math.min(258,M);X<=lt&&--yt&&V!=W;){if(s[w+q]==s[w+q-X]){for(var I=0;I<j&&s[w+I]==s[w+I-X];++I);if(I>q){if(q=I,K=X,I>at)break;for(var et=Math.min(X,I-2),Dt=0,D=0;D<et;++D){var ct=w-X+D&32767,le=m[ct],xe=ct-le&32767;xe>Dt&&(Dt=xe,W=ct)}}}V=W,W=m[V],X+=V-W&32767}if(K){v[N++]=268435456|Tn[q]<<18|qs[K];var Ht=Tn[q]&31,Ae=qs[K]&31;C+=Qn[Ht]+Jn[Ae],++T[257+Ht],++k[Ae],R=w+q,++O}else v[N++]=s[w],++T[s[w]]}}for(w=Math.max(w,R);w<o;++w)v[N++]=s[w],++T[s[w]];c=Ys(s,l,d,v,T,k,C,N,L,w-L,c),d||(r.r=c&7|l[c/8|0]<<3,c-=7,r.h=_,r.p=m,r.i=w,r.w=R)}else{for(var w=r.w||0;w<o+d;w+=65535){var zt=w+65535;zt>=o&&(l[c/8|0]=d,zt=o),c=rr(l,c+1,s.subarray(w,zt))}r.i=o}return ir(a,0,n+sr(c)+i)},Wd=function(){for(var s=new Int32Array(256),t=0;t<256;++t){for(var e=t,n=9;--n;)e=(e&1&&-306674912)^e>>>1;s[t]=e}return s}(),jd=function(){var s=-1;return{p:function(t){for(var e=s,n=0;n<t.length;++n)e=Wd[e&255^t[n]]^e>>>8;s=e},d:function(){return~s}}},Hd=function(s,t,e,n,i){if(!i&&(i={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),o=new z(r.length+s.length);o.set(r),o.set(s,r.length),s=o,i.w=r.length}return Vd(s,t.level==null?6:t.level,t.mem==null?Math.ceil(Math.max(8,Math.min(13,Math.log(s.length)))*1.5):12+t.mem,e,n,i)},ar=function(s,t){var e={};for(var n in s)e[n]=s[n];for(var n in t)e[n]=t[n];return e},H=function(s,t,e){for(;e;++t)s[t]=e,e>>>=8};function zd(s,t){return Hd(s,t||{},0,0)}var lr=function(s,t,e,n){for(var i in s){var r=s[i],o=t+i,a=n;Array.isArray(r)&&(a=ar(n,r[1]),r=r[0]),r instanceof z?e[o]=[r,a]:(e[o+="/"]=[new z(0),a],lr(r,o,e,n))}},Us=typeof TextEncoder<"u"&&new TextEncoder,qd=typeof TextDecoder<"u"&&new TextDecoder,Kd=0;try{qd.decode(or,{stream:!0}),Kd=1}catch{}function On(s,t){if(t){for(var e=new z(s.length),n=0;n<s.length;++n)e[n]=s.charCodeAt(n);return e}if(Us)return Us.encode(s);for(var i=s.length,r=new z(s.length+(s.length>>1)),o=0,a=function(c){r[o++]=c},n=0;n<i;++n){if(o+5>r.length){var l=new z(o+8+(i-n<<1));l.set(r),r=l}var d=s.charCodeAt(n);d<128||t?a(d):d<2048?(a(192|d>>6),a(128|d&63)):d>55295&&d<57344?(d=65536+(d&1047552)|s.charCodeAt(++n)&1023,a(240|d>>18),a(128|d>>12&63),a(128|d>>6&63),a(128|d&63)):(a(224|d>>12),a(128|d>>6&63),a(128|d&63))}return ir(r,0,o)}var Nn=function(s){var t=0;if(s)for(var e in s){var n=s[e].length;n>65535&&Ge(9),t+=n+4}return t},Xs=function(s,t,e,n,i,r,o,a){var l=n.length,d=e.extra,c=a&&a.length,p=Nn(d);H(s,t,o!=null?33639248:67324752),t+=4,o!=null&&(s[t++]=20,s[t++]=e.os),s[t]=20,t+=2,s[t++]=e.flag<<1|(r<0&&8),s[t++]=i&&8,s[t++]=e.compression&255,s[t++]=e.compression>>8;var g=new Date(e.mtime==null?Date.now():e.mtime),f=g.getFullYear()-1980;if((f<0||f>119)&&Ge(10),H(s,t,f<<25|g.getMonth()+1<<21|g.getDate()<<16|g.getHours()<<11|g.getMinutes()<<5|g.getSeconds()>>1),t+=4,r!=-1&&(H(s,t,e.crc),H(s,t+4,r<0?-r-2:r),H(s,t+8,e.size)),H(s,t+12,l),H(s,t+14,p),t+=16,o!=null&&(H(s,t,c),H(s,t+6,e.attrs),H(s,t+10,o),t+=14),s.set(n,t),t+=l,p)for(var b in d){var m=d[b],_=m.length;H(s,t,+b),H(s,t+2,_),s.set(m,t+4),t+=4+_}return c&&(s.set(a,t),t+=c),t},Yd=function(s,t,e,n,i){H(s,t,101010256),H(s,t+8,e),H(s,t+10,e),H(s,t+12,n),H(s,t+16,i)};function Gs(s,t){t||(t={});var e={},n=[];lr(s,"",e,t);var i=0,r=0;for(var o in e){var a=e[o],l=a[0],d=a[1],c=d.level==0?0:8,p=On(o),g=p.length,f=d.comment,b=f&&On(f),m=b&&b.length,_=Nn(d.extra);g>65535&&Ge(11);var E=c?zd(l,d):l,A=E.length,S=jd();S.p(l),n.push(ar(d,{size:l.length,crc:S.d(),c:E,f:p,m:b,u:g!=o.length||b&&f.length!=m,o:i,compression:c})),i+=30+g+_+A,r+=76+2*(g+_)+(m||0)+A}for(var v=new z(r+22),T=i,k=r-i,O=0;O<n.length;++O){var p=n[O];Xs(v,p.o,p,p.f,p.u,p.c.length);var C=30+p.f.length+Nn(p.extra);v.set(p.c,p.o+C),Xs(v,i,p,p.f,p.u,p.c.length,p.o,p.m),i+=16+C+(p.m?p.m.length:0)}return Yd(v,i,n.length,k,T),v}var Ud=Object.defineProperty,Xd=(s,t,e)=>t in s?Ud(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,h=(s,t,e)=>(Xd(s,typeof t!="symbol"?t+"":t,e),e);const Gd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},cr=s=>(typeof s!="string"&&(s=`${s}`),s.replace(/[&<>"']/g,t=>Gd[t]));function ft(s){const t=typeof s;return s!=null&&(t==="object"||t==="function")}function Qd(s){if(typeof s!="object"||s===null||Object.prototype.toString.call(s)!=="[object Object]")return!1;const t=Object.getPrototypeOf(s);if(t===null)return!0;const e=Object.prototype.hasOwnProperty.call(t,"constructor")&&t.constructor;return typeof e=="function"&&e instanceof e&&Function.prototype.call(e)===Function.prototype.call(s)}function $t(s){return s!=null&&typeof s.valueOf()=="string"}function Jd(s,t){return t.reduce((e,n)=>(s!=null&&s.hasOwnProperty(n)&&(e[n]=s[n]),e),{})}const bn={};function _t(s="$lodash$"){bn[s]||(bn[s]=0);const t=++bn[s];return s==="$lodash$"?`${t}`:`${s}${t}`}class Qe{constructor(t,e){h(this,"documentElement"),this.documentElement=this.createElement(e),this.documentElement.setAttribute("xmlns",t)}createElement(t){return new Je({nodeName:t})}createTextNode(t){return new dr(t)}toString(){return this.documentElement.toString()}}h(Qe,"Node",{Create:s=>{switch(s.type){case"XML":return new Je(s);case"TEXT":return new dr(s.nodeValue);default:return null}}});class dr{constructor(t){h(this,"nodeValue"),this.nodeValue=t}toJSON(){return{nodeValue:this.nodeValue,type:"TEXT"}}toString(){return cr(this.nodeValue)}}class Je{constructor(t){if(h(this,"nodeName",""),h(this,"children"),h(this,"nodeValue"),h(this,"attributes"),h(this,"firstChild"),this.nodeName=t.nodeName,this.children=[],this.nodeValue=t.nodeValue||"",this.attributes={},t.children)for(let e=0,n=t.children.length;e<n;e++)this.appendChild(Qe.Node.Create(t.children[e]));if(t.attributes)for(const e in t.attributes)t.attributes.hasOwnProperty(e)&&this.setAttribute(e,t.attributes[e])}toString(){let t=`<${this.nodeName}`;for(const n in this.attributes)this.attributes.hasOwnProperty(n)&&(t=`${t} ${n}="${cr(this.attributes[n])}"`);let e="";for(let n=0,i=this.children.length;n<i;n++)e+=this.children[n].toString();return e?t+=`>${e}</${this.nodeName}>`:t+="/>",t}toJSON(){const t=[];for(let e=0,n=this.children.length;e<n;e++)t.push(this.children[e].toJSON());return{nodeName:this.nodeName,children:t,nodeValue:this.nodeValue,attributes:this.attributes,type:"XML"}}setAttribute(t,e){if(e===null){delete this.attributes[t],delete this[t];return}this.attributes[t]=e,this[t]=e}appendChild(t){this.children.push(t),this.firstChild=this.children[0]}cloneNode(t){return new Je(this.toJSON())}}const Pe=class It{static uniqueId(t){return It._idSpaces[t]||(It._idSpaces[t]=1),It._idSpaces[t]++}static createXmlDoc(t,e){return new Qe(t||null,e)}static createElement(t,e,n){const i=t.createElement(e);n=n||[];let r=n.length;for(;r--;)i.setAttribute(n[r][0],n[r][1]);return i}static setAttributesOnDoc(t,e){for(let[n,i]of Object.entries(e)){if(Qd(i))if(i.v!==null&&i.v!==void 0)switch(i.type){case Boolean:i=i.v?"1":"0";break}else i=null;i!=null&&t.setAttribute(n,i)}}static positionToLetterRef(t,e){let n=1,i,r=t,o="";const a="ABCDEFGHIJKLMNOPQRSTUVWXYZ";if(It.LETTER_REFS[t])return It.LETTER_REFS[t].concat(e);for(;r>0;)r-=Math.pow(26,n-1),i=r%Math.pow(26,n),r-=i,i=i/Math.pow(26,n-1),o=a.charAt(i)+o,n+=1;return It.LETTER_REFS[t]=o,o.concat(String(e))}};h(Pe,"_idSpaces",{}),h(Pe,"LETTER_REFS",{}),h(Pe,"schemas",{worksheet:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",sharedStrings:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",stylesheet:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",relationships:"http://schemas.openxmlformats.org/officeDocument/2006/relationships",relationshipPackage:"http://schemas.openxmlformats.org/package/2006/relationships",contentTypes:"http://schemas.openxmlformats.org/package/2006/content-types",spreadsheetml:"http://schemas.openxmlformats.org/spreadsheetml/2006/main",markupCompat:"http://schemas.openxmlformats.org/markup-compatibility/2006",x14ac:"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac",officeDocument:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",package:"http://schemas.openxmlformats.org/package/2006/relationships",table:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/table",spreadsheetDrawing:"http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",drawing:"http://schemas.openxmlformats.org/drawingml/2006/main",drawingRelationship:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",image:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",chart:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",hyperlink:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink"});let y=Pe;const At={};class Dn{constructor(){h(this,"relations",{}),h(this,"lastId",1),_t("rId")}importData(t){this.relations=t.relations,this.lastId=t.lastId}exportData(){return{relations:this.relations,lastId:this.lastId}}addRelation(t,e){return this.relations[t.id]={id:_t("rId"),schema:y.schemas[e],object:t},this.relations[t.id].id}getRelationshipId(t){return this.relations[t.id]?this.relations[t.id].id:null}toXML(){const t=y.createXmlDoc(y.schemas.relationshipPackage,"Relationships"),e=t.documentElement;for(const[n,i]of Object.entries(this.relations)){const r=y.createElement(t,"Relationship",[["Id",i.id],["Type",i.schema],["Target",i.object.target||At[n]]]);i.object.targetMode&&r.setAttribute("TargetMode",i.object.targetMode),e.appendChild(r)}return t}}class Zd{constructor(){h(this,"state",null),h(this,"xSplit",null),h(this,"ySplit",null),h(this,"activePane","bottomRight"),h(this,"topLeftCell",null),h(this,"_freezePane")}freezePane(t,e,n){this._freezePane={xSplit:t,ySplit:e,cell:n}}exportXML(t){const e=t.createElement("pane");return this.state!==null&&(e.setAttribute("xSplit",this._freezePane.xSplit),e.setAttribute("ySplit",this._freezePane.ySplit),e.setAttribute("topLeftCell",this._freezePane.cell),e.setAttribute("activePane","bottomRight"),e.setAttribute("state","frozen")),e}}class Qs{constructor(){h(this,"strings",{}),h(this,"stringArray",[]),h(this,"id",_t("SharedStrings"))}addString(t){return this.strings[t]=this.stringArray.length,this.stringArray[this.stringArray.length]=t,this.strings[t]}exportData(){return this.strings}toXML(){const t=y.createXmlDoc(y.schemas.spreadsheetml,"sst"),e=t.documentElement;this.stringArray.reverse();let n=this.stringArray.length;e.setAttribute("count",n),e.setAttribute("uniqueCount",n);const i=t.createElement("si"),r=t.createElement("t");r.appendChild(t.createTextNode("--placeholder--")),i.appendChild(r);const o=this.stringArray;for(;n--;){const a=i.cloneNode(!0);a.firstChild.firstChild.nodeValue=o[n],e.appendChild(a)}return t}}class th{constructor(t){h(this,"pane"),h(this,"showZeros",null),h(this,"defaultGridColor",null),h(this,"colorId",null),h(this,"rightToLeft",null),h(this,"showFormulas",null),h(this,"showGridLines",null),h(this,"showOutlineSymbols",null),h(this,"showRowColHeaders",null),h(this,"showRuler",null),h(this,"showWhiteSpace",null),h(this,"tabSelected",null),h(this,"topLeftCell",null),h(this,"viewType",null),h(this,"windowProtection",null),h(this,"zoomScale",null),h(this,"zoomScaleNormal",null),h(this,"zoomScalePageLayoutView",null),h(this,"zoomScaleSheetLayoutView",null);const e=t||{};this.pane=e.pane||new Zd}freezePane(t,e,n){this.pane.state="frozen",this.pane.xSplit=t,this.pane.ySplit=e,this.pane.topLeftCell=n}exportXML(t){const e=t.createElement("sheetViews"),n=t.createElement("sheetView");return y.setAttributesOnDoc(n,{workbookViewId:0,showZeros:{v:this.showZeros,type:Boolean},defaultGridColor:{v:this.defaultGridColor,type:Boolean},colorId:this.colorId,rightToLeft:{v:this.rightToLeft,type:Boolean},showFormulas:{v:this.showFormulas,type:Boolean},showGridLines:{v:this.showGridLines,type:Boolean},showOutlineSymbols:{v:this.showOutlineSymbols,type:Boolean},showRowColHeaders:{v:this.showRowColHeaders,type:Boolean},showRuler:{v:this.showRuler,type:Boolean},showWhiteSpace:{v:this.showWhiteSpace,type:Boolean},tabSelected:{v:this.tabSelected,type:Boolean},viewType:this.viewType,windowProtection:{v:this.windowProtection,type:Boolean},zoomScale:{v:this.zoomScale,type:Boolean},zoomScaleNormal:this.zoomScaleNormal,zoomScalePageLayoutView:this.zoomScalePageLayoutView,zoomScaleSheetLayoutView:this.zoomScaleSheetLayoutView}),n.appendChild(this.pane.exportXML(t)),e.appendChild(n),e}}class Js{constructor(){h(this,"id",_t("StyleSheet")),h(this,"cellStyles",[{name:"Normal",xfId:"0",builtinId:"0"}]),h(this,"defaultTableStyle",!1),h(this,"differentialStyles",[{}]),h(this,"masterCellFormats",[{numFmtId:0,fontId:0,fillId:0,borderId:0,xfid:0}]),h(this,"masterCellStyles",[{numFmtId:0,fontId:0,fillId:0,borderId:0}]),h(this,"fonts",[{}]),h(this,"numberFormatters",[]),h(this,"fills",[{},{type:"pattern",patternType:"gray125",fgColor:"FF333333",bgColor:"FF333333"}]),h(this,"borders",[{top:{},left:{},right:{},bottom:{},diagonal:{}}]),h(this,"tableStyles",[])}createSimpleFormatter(t){const e={id:this.masterCellFormats.length};switch(t){case"date":e.numFmtId=14;break}return this.masterCellFormats.push(e),e}createFill(t){const e=this.fills.length,n=t;return n.id=e,this.fills.push(n),n}createNumberFormatter(t){const e={id:this.numberFormatters.length+100,formatCode:t};return this.numberFormatters.push(e),e}createFormat(t){const e={id:this.masterCellFormats.length};if(t.protection&&(e.protection=t.protection),t.font&&ft(t.font))e.fontId=this.createFontStyle(t.font).id;else if(t.font){if(Number.isNaN(parseInt(t.font,10)))throw new Error("Passing a non-numeric font id is not supported");e.fontId=t.font}if(t.format&&$t(t.format))e.numFmtId=this.createNumberFormatter(t.format).id;else if(t.format){if(Number.isNaN(parseInt(t.format,10)))throw new Error("Invalid number formatter id");e.numFmtId=t.format}if(t.border&&ft(t.border))e.borderId=this.createBorderFormatter(t.border).id;else if(t.border){if(Number.isNaN(parseInt(t.border,10)))throw new Error("Passing a non-numeric border id is not supported");e.borderId=t.border}if(t.fill&&ft(t.fill))e.fillId=this.createFill(t.fill).id;else if(t.fill){if(Number.isNaN(parseInt(t.fill,10)))throw new Error("Passing a non-numeric fill id is not supported");e.fillId=t.fill}return t.alignment&&ft(t.alignment)&&(e.alignment=Jd(t.alignment,["horizontal","justifyLastLine","readingOrder","relativeIndent","shrinkToFit","textRotation","vertical","wrapText"])),this.masterCellFormats.push(e),e}createDifferentialStyle(t){const e=this.differentialStyles.length,n={id:e};return t.font&&ft(t.font)&&(n.font=t.font),t.border&&ft(t.border)&&(n.border=Object.assign({top:{},left:{},right:{},bottom:{},diagonal:{}},t.border)),t.fill&&ft(t.fill)&&(n.fill=t.fill),t.alignment&&ft(t.alignment)&&(n.alignment=t.alignment),t.format&&$t(t.format)&&(n.numFmt=t.format),this.differentialStyles[e]=n,n}createTableStyle(t){this.tableStyles.push(t)}createBorderFormatter(t){return t={top:{},left:{},right:{},bottom:{},diagonal:{},id:this.borders.length,...t},this.borders.push(t),t}createFontStyle(t){const e={id:this.fonts.length};return t.bold&&(e.bold=!0),t.italic&&(e.italic=!0),t.superscript&&(e.vertAlign="superscript"),t.subscript&&(e.vertAlign="subscript"),t.underline&&(typeof t.underline=="string"&&["double","singleAccounting","doubleAccounting"].includes(t.underline)?e.underline=t.underline:e.underline=!0),t.strike&&(e.strike=!0),t.outline&&(e.outline=!0),t.shadow&&(e.shadow=!0),t.size&&(e.size=t.size),t.color&&(e.color=t.color),t.fontName&&(e.fontName=t.fontName),this.fonts.push(e),e}exportBorders(t){const e=t.createElement("borders");e.setAttribute("count",this.borders.length);for(let n=0,i=this.borders.length;n<i;n++)e.appendChild(this.exportBorder(t,this.borders[n]));return e}exportBorder(t,e){const n=t.createElement("border"),i=r=>{const o=t.createElement(r);return e[r].style&&o.setAttribute("style",e[r].style),e[r].color&&o.appendChild(this.exportColor(t,e[r].color)),o};return n.appendChild(i("left")),n.appendChild(i("right")),n.appendChild(i("top")),n.appendChild(i("bottom")),n.appendChild(i("diagonal")),n}exportColor(t,e){const n=t.createElement("color");return $t(e)?(n.setAttribute("rgb",e),n):(e.tint!==void 0&&n.setAttribute("tint",e.tint),e.auto!==void 0&&n.setAttribute("auto",String(!!e.auto)),e.theme!==void 0&&n.setAttribute("theme",e.theme),n)}exportMasterCellFormats(t){const e=y.createElement(t,"cellXfs",[["count",this.masterCellFormats.length]]);for(let n=0,i=this.masterCellFormats.length;n<i;n++){const r=this.masterCellFormats[n];e.appendChild(this.exportCellFormatElement(t,r))}return e}exportMasterCellStyles(t){const e=y.createElement(t,"cellStyleXfs",[["count",this.masterCellStyles.length]]);for(let n=0,i=this.masterCellStyles.length;n<i;n++){const r=this.masterCellStyles[n];e.appendChild(this.exportCellFormatElement(t,r))}return e}exportCellFormatElement(t,e){const n=t.createElement("xf"),i=["applyAlignment","applyBorder","applyFill","applyFont","applyNumberFormat","applyProtection","borderId","fillId","fontId","numFmtId","pivotButton","quotePrefix","xfId"],r=Object.keys(e).filter(a=>i.indexOf(a)!==-1);if(e.alignment){const a=e.alignment;n.appendChild(this.exportAlignment(t,a))}e.protection&&(n.appendChild(this.exportProtection(t,e.protection)),n.setAttribute("applyProtection","1"));let o=r.length;for(;o--;)n.setAttribute(r[o],e[r[o]]);return e.fillId&&n.setAttribute("applyFill","1"),e.fontId&&n.setAttribute("applyFont","1"),e.borderId&&n.setAttribute("applyBorder","1"),e.alignment&&n.setAttribute("applyAlignment","1"),e.numFmtId&&n.setAttribute("applyNumberFormat","1"),e.numFmtId!==void 0&&e.xfId===void 0&&n.setAttribute("xfId","0"),n}exportAlignment(t,e){const n=t.createElement("alignment"),i=Object.keys(e);for(let r=0,o=i.length;r<o;r++)n.setAttribute(i[r],e[i[r]]);return n}exportFonts(t){const e=t.createElement("fonts");e.setAttribute("count",String(this.fonts.length));for(let n=0,i=this.fonts.length;n<i;n++){const r=this.fonts[n];e.appendChild(this.exportFont(t,r))}return e}exportFont(t,e){const n=t.createElement("font");if(e.size){const i=t.createElement("sz");i.setAttribute("val",e.size),n.appendChild(i)}if(e.fontName){const i=t.createElement("name");i.setAttribute("val",e.fontName),n.appendChild(i)}if(e.bold&&n.appendChild(t.createElement("b")),e.italic&&n.appendChild(t.createElement("i")),e.vertAlign){const i=t.createElement("vertAlign");i.setAttribute("val",e.vertAlign),n.appendChild(i)}if(e.underline){const i=t.createElement("u");e.underline!==!0&&i.setAttribute("val",e.underline),n.appendChild(i)}return e.strike&&n.appendChild(t.createElement("strike")),e.shadow&&n.appendChild(t.createElement("shadow")),e.outline&&n.appendChild(t.createElement("outline")),e.color&&n.appendChild(this.exportColor(t,e.color)),n}exportFills(t){const e=t.createElement("fills");e.setAttribute("count",String(this.fills.length));for(let n=0,i=this.fills.length;n<i;n++){const r=this.fills[n];e.appendChild(this.exportFill(t,r))}return e}exportFill(t,e){let n;const i=t.createElement("fill");return e.type==="pattern"?(n=this.exportPatternFill(t,e),i.appendChild(n)):e.type==="gradient"&&(n=this.exportGradientFill(t,e),i.appendChild(n)),i}exportGradientFill(t,e){const n=t.createElement("gradientFill");e.degree?n.setAttribute("degree",e.degree):e.left&&(n.setAttribute("left",e.left),n.setAttribute("right",e.right),n.setAttribute("top",e.top),n.setAttribute("bottom",e.bottom));const i=t.createElement("stop");i.setAttribute("position",e.start.pureAt||0);const r=t.createElement("color");typeof e.start=="string"||e.start.color?r.setAttribute("rgb",e.start.color||e.start):e.start.theme&&r.setAttribute("theme",e.start.theme);const o=t.createElement("stop"),a=t.createElement("color");return o.setAttribute("position",e.end.pureAt||1),typeof e.start=="string"||e.end.color?a.setAttribute("rgb",e.end.color||e.end):e.end.theme&&a.setAttribute("theme",e.end.theme),i.appendChild(r),o.appendChild(a),n.appendChild(i),n.appendChild(o),n}exportPatternFill(t,e){const n=y.createElement(t,"patternFill",[["patternType",e.patternType]]);e.bgColor||(e.bgColor="FFFFFFFF"),e.fgColor||(e.fgColor="FFFFFFFF");const i=t.createElement("bgColor");$t(e.bgColor)?i.setAttribute("rgb",e.bgColor):e.bgColor.theme?i.setAttribute("theme",e.bgColor.theme):i.setAttribute("rgb",e.bgColor.rbg);const r=t.createElement("fgColor");return $t(e.fgColor)?r.setAttribute("rgb",e.fgColor):e.fgColor.theme?r.setAttribute("theme",e.fgColor.theme):r.setAttribute("rgb",e.fgColor.rbg),n.appendChild(r),n.appendChild(i),n}exportNumberFormatters(t){const e=t.createElement("numFmts");e.setAttribute("count",String(this.numberFormatters.length));for(let n=0,i=this.numberFormatters.length;n<i;n++){const r=this.numberFormatters[n];e.appendChild(this.exportNumberFormatter(t,r))}return e}exportNumberFormatter(t,e){const n=t.createElement("numFmt");return n.setAttribute("numFmtId",e.id),n.setAttribute("formatCode",e.formatCode),n}exportCellStyles(t){const e=t.createElement("cellStyles");e.setAttribute("count",String(this.cellStyles.length));for(let n=0,i=this.cellStyles.length;n<i;n++){const r=this.cellStyles[n];delete r.id;const o=y.createElement(t,"cellStyle");e.appendChild(o);const a=Object.keys(r);let l=a.length;for(;l--;)o.setAttribute(a[l],r[a[l]])}return e}exportDifferentialStyles(t){const e=t.createElement("dxfs");e.setAttribute("count",String(this.differentialStyles.length));for(let n=0,i=this.differentialStyles.length;n<i;n++){const r=this.differentialStyles[n];e.appendChild(this.exportDFX(t,r))}return e}exportDFX(t,e){const n=t.createElement("dxf");return e.font&&n.appendChild(this.exportFont(t,e.font)),e.fill&&n.appendChild(this.exportFill(t,e.fill)),e.border&&n.appendChild(this.exportBorder(t,e.border)),e.numFmt&&n.appendChild(this.exportNumberFormatter(t,e.numFmt)),e.alignment&&n.appendChild(this.exportAlignment(t,e.alignment)),n}exportTableStyles(t){const e=t.createElement("tableStyles");e.setAttribute("count",String(this.tableStyles.length)),this.defaultTableStyle&&e.setAttribute("defaultTableStyle",String(this.defaultTableStyle));for(let n=0,i=this.tableStyles.length;n<i;n++)e.appendChild(this.exportTableStyle(t,this.tableStyles[n]));return e}exportTableStyle(t,e){const n=t.createElement("tableStyle");n.setAttribute("name",e.name),n.setAttribute("pivot",String(0));let i=0;return Object.entries(e).forEach(([r,o])=>{if(r==="name")return;i++;const a=t.createElement("tableStyleElement");a.setAttribute("type",r),a.setAttribute("dxfId",o),n.appendChild(a)}),n.setAttribute("count",String(i)),n}exportProtection(t,e){const n=t.createElement("protection");for(const i in e)e.hasOwn(i)&&n.setAttribute(i,e[i]);return n}toXML(){const t=y.createXmlDoc(y.schemas.spreadsheetml,"styleSheet"),e=t.documentElement;return e.appendChild(this.exportNumberFormatters(t)),e.appendChild(this.exportFonts(t)),e.appendChild(this.exportFills(t)),e.appendChild(this.exportBorders(t)),e.appendChild(this.exportMasterCellStyles(t)),e.appendChild(this.exportMasterCellFormats(t)),e.appendChild(this.exportCellStyles(t)),e.appendChild(this.exportDifferentialStyles(t)),this.tableStyles.length&&e.appendChild(this.exportTableStyles(t)),t}}class Zn{constructor(t){h(this,"name",""),h(this,"id",""),h(this,"tableId",""),h(this,"displayName",""),h(this,"dataCellStyle",null),h(this,"dataDfxId",null),h(this,"headerRowBorderDxfId",null),h(this,"headerRowCellStyle",null),h(this,"headerRowCount",1),h(this,"headerRowDxfId",null),h(this,"insertRow",!1),h(this,"insertRowShift",!1),h(this,"ref",null),h(this,"tableBorderDxfId",null),h(this,"totalsRowBorderDxfId",null),h(this,"totalsRowCellStyle",null),h(this,"totalsRowCount",0),h(this,"totalsRowDxfId",null),h(this,"tableColumns",[]),h(this,"autoFilter",null),h(this,"sortState",null),h(this,"styleInfo",{}),this.initialize(t)}initialize(t){this.displayName=_t("Table"),this.name=this.displayName,this.id=this.name,this.tableId=this.id.replace("Table",""),Object.assign(this,t)}setReferenceRange(t,e){this.ref=[t,e]}setTableColumns(t){t.forEach(e=>{this.addTableColumn(e)})}addTableColumn(t){if($t(t)&&(t={name:t}),!t.name)throw new Error("Invalid argument for addTableColumn - minimum requirement is a name property");this.tableColumns.push(t)}setSortState(t){this.sortState=t}toXML(){const t=y.createXmlDoc(y.schemas.spreadsheetml,"table"),e=t.documentElement;e.setAttribute("id",this.tableId),e.setAttribute("name",this.name),e.setAttribute("displayName",this.displayName);const n=this.ref[0],i=this.ref[1];if(e.setAttribute("ref",`${y.positionToLetterRef(n[0],n[1])}:${y.positionToLetterRef(i[0],i[1])}`),e.setAttribute("totalsRowCount",this.totalsRowCount),e.setAttribute("headerRowCount",this.headerRowCount),this.headerRowDxfId&&e.setAttribute("headerRowDxfId",this.headerRowDxfId),this.headerRowBorderDxfId&&e.setAttribute("headerRowBorderDxfId",this.headerRowBorderDxfId),!this.ref)throw new Error("Needs at least a reference range");return this.autoFilter||this.addAutoFilter(this.ref[0],this.ref[1]),e.appendChild(this.exportAutoFilter(t)),e.appendChild(this.exportTableColumns(t)),e.appendChild(this.exportTableStyleInfo(t)),t}exportTableColumns(t){const e=t.createElement("tableColumns");e.setAttribute("count",this.tableColumns.length);const n=this.tableColumns;for(let i=0,r=n.length;i<r;i++){const o=n[i],a=t.createElement("tableColumn");a.setAttribute("id",String(i+1)),a.setAttribute("name",o.name),e.appendChild(a),o.totalsRowFunction&&a.setAttribute("totalsRowFunction",o.totalsRowFunction),o.totalsRowLabel&&a.setAttribute("totalsRowLabel",o.totalsRowLabel)}return e}exportAutoFilter(t){const e=t.createElement("autoFilter"),n=this.autoFilter[0],i=this.autoFilter[1];return e.setAttribute("ref",`${y.positionToLetterRef(n[0],n[1])}:${y.positionToLetterRef(i[0],i[1]-this.totalsRowCount)}`),e}exportTableStyleInfo(t){const e=this.styleInfo,n=t.createElement("tableStyleInfo");return n.setAttribute("name",e.themeStyle),n.setAttribute("showFirstColumn",e.showFirstColumn?"1":"0"),n.setAttribute("showLastColumn",e.showLastColumn?"1":"0"),n.setAttribute("showColumnStripes",e.showColumnStripes?"1":"0"),n.setAttribute("showRowStripes",e.showRowStripes?"1":"0"),n}addAutoFilter(t,e){this.autoFilter=[t,e]}}class eh{constructor(t){h(this,"name",""),h(this,"id",_t("Worksheet")),h(this,"_timezoneOffset"),h(this,"relations",null),h(this,"columnFormats",[]),h(this,"data",[]),h(this,"mergedCells",[]),h(this,"columns",[]),h(this,"sheetProtection",!1),h(this,"_headers",[]),h(this,"_footers",[]),h(this,"_tables",[]),h(this,"_drawings",[]),h(this,"_orientation"),h(this,"_margin"),h(this,"_rowInstructions",{}),h(this,"_freezePane",{}),h(this,"sharedStrings",null),h(this,"hyperlinks",[]),h(this,"sheetView"),h(this,"showZeros",null),this._timezoneOffset=new Date().getTimezoneOffset()*60*1e3,this.sheetView=t.sheetView||new th,this.initialize(t)}initialize(t){t=t||{},this.name=t.name,this.id=_t("Worksheet"),this._timezoneOffset=new Date().getTimezoneOffset()*60*1e3,t.columns&&this.setColumns(t.columns),this.relations=new Dn}exportData(){return{relations:this.relations.exportData(),columnFormats:this.columnFormats,data:this.data,columns:this.columns,mergedCells:this.mergedCells,_headers:this._headers,_footers:this._footers,_tables:this._tables,_rowInstructions:this._rowInstructions,_freezePane:this._freezePane,name:this.name,id:this.id}}importData(t){this.relations.importData(t.relations),delete t.relations,Object.assign(this,t)}setSharedStringCollection(t){this.sharedStrings=t}addTable(t){this._tables.push(t),this.relations.addRelation(t,"table")}addDrawings(t){this._drawings.push(t),this.relations.addRelation(t,"drawingRelationship")}setRowInstructions(t,e){this._rowInstructions[t]=e}setHeader(t){if(!Array.isArray(t))throw"Invalid argument type - setHeader expects an array of three instructions";this._headers=t}setFooter(t){if(!Array.isArray(t))throw"Invalid argument type - setFooter expects an array of three instructions";this._footers=t}compilePageDetailPackage(t){return t=t||"",["&L",this.compilePageDetailPiece(t[0]||""),"&C",this.compilePageDetailPiece(t[1]||""),"&R",this.compilePageDetailPiece(t[2]||"")].join("")}compilePageDetailPiece(t){if($t(t))return'&"-,Regular"'.concat(t);if(ft(t)&&!Array.isArray(t)){let e="";if(t.font||t.bold){const n=t.bold?"Bold":"Regular";e+=`&"${t.font||"-"}`,e+=`,${n}"`}else e+='&"-,Regular"';return t.underline&&(e+="&U"),t.fontSize&&(e+=`&${t.fontSize}`),e+=t.text,e}if(Array.isArray(t))return t.reduce((e,n)=>e.concat(this.compilePageDetailPiece(n)),"")}exportHeader(t){const e=t.createElement("oddHeader");return e.appendChild(t.createTextNode(this.compilePageDetailPackage(this._headers))),e}exportFooter(t){const e=t.createElement("oddFooter");return e.appendChild(t.createTextNode(this.compilePageDetailPackage(this._footers))),e}_buildCache(t){const e=t.createElement("c"),n=t.createElement("v");n.appendChild(t.createTextNode("--temp--")),e.appendChild(n);const i=t.createElement("c"),r=t.createElement("f");r.appendChild(t.createTextNode("--temp--")),i.appendChild(r);const o=t.createElement("c");o.setAttribute("t","s");const a=t.createElement("v");return a.appendChild(t.createTextNode("--temp--")),o.appendChild(a),{number:e,date:e,string:o,formula:i}}collectSharedStrings(){const t=this.data,e={};for(let n=0,i=t.length;n<i;n++){const r=t[n],o=r.length;for(let a=0;a<o;a++){let l=r[a];const d=(l==null?void 0:l.metadata)||{};l&&typeof l=="object"&&(l=l.value),d.type||typeof l=="number"&&(d.type="number"),(d.type==="text"||!d.type)&&typeof e[l]>"u"&&(e[l]=!0)}}return Object.keys(e)}toXML(){var t,e,n;const i=this.data,r=this.columns||[],o=y.createXmlDoc(y.schemas.spreadsheetml,"worksheet"),a=o.documentElement;let l,d,c;a.setAttribute("xmlns:r",y.schemas.relationships),a.setAttribute("xmlns:mc",y.schemas.markupCompat);let p=0;const g=y.createElement(o,"sheetData"),f=this._buildCache(o);for(c=0,d=i.length;c<d;c++){const b=i[c],m=b.length;p=m>p?m:p;const _=o.createElement("row");for(let E=0;E<m;E++){r[E]=r[E]||{};let A=b[E],S;const v=(A==null?void 0:A.metadata)||{};switch(A&&typeof A=="object"&&(A=A.value),v.type||typeof A=="number"&&(v.type="number"),v.type){case"number":S=f.number.cloneNode(!0),S.firstChild.firstChild.nodeValue=A;break;case"date":S=f.date.cloneNode(!0),S.firstChild.firstChild.nodeValue=25569+(A-this._timezoneOffset)/(60*60*24*1e3);break;case"formula":S=f.formula.cloneNode(!0),S.firstChild.firstChild.nodeValue=A;break;case"text":default:{let T;typeof((t=this.sharedStrings)==null?void 0:t.strings[A])<"u"?T=this.sharedStrings.strings[A]:T=(e=this.sharedStrings)==null?void 0:e.addString(A),S=f.string.cloneNode(!0),S.firstChild.firstChild.nodeValue=T;break}}v.style?S.setAttribute("s",v.style):((n=this._rowInstructions[c])==null?void 0:n.style)!==void 0&&S.setAttribute("s",this._rowInstructions[c].style),S.setAttribute("r",y.positionToLetterRef(E+1,String(c+1))),_.appendChild(S)}if(_.setAttribute("r",c+1),this._rowInstructions[c]){const E=this._rowInstructions[c];E.height!==void 0&&(_.setAttribute("customHeight","1"),_.setAttribute("ht",E.height)),E.style!==void 0&&(_.setAttribute("customFormat","1"),_.setAttribute("s",E.style))}g.appendChild(_)}if(p!==0?a.appendChild(y.createElement(o,"dimension",[["ref",`${y.positionToLetterRef(1,1)}:${y.positionToLetterRef(p,String(i.length))}`]])):a.appendChild(y.createElement(o,"dimension",[["ref",y.positionToLetterRef(1,1)]])),a.appendChild(this.sheetView.exportXML(o)),this.columns.length&&a.appendChild(this.exportColumns(o)),a.appendChild(g),this.sheetProtection&&a.appendChild(this.sheetProtection.exportXML(o)),this.hyperlinks.length>0){const b=o.createElement("hyperlinks"),m=this.hyperlinks;for(l=0,d=m.length;l<d;l++){const _=o.createElement("hyperlink"),E=m[l];_.setAttribute("ref",String(E.cell)),E.id=y.uniqueId("hyperlink"),this.relations.addRelation({id:E.id,target:E.location,targetMode:E.targetMode||"External"},"hyperlink"),_.setAttribute("r:id",this.relations.getRelationshipId(E)),b.appendChild(_)}a.appendChild(b)}if(this.mergedCells.length>0){const b=o.createElement("mergeCells");for(l=0,d=this.mergedCells.length;l<d;l++){const m=o.createElement("mergeCell");m.setAttribute("ref",`${this.mergedCells[l][0]}:${this.mergedCells[l][1]}`),b.appendChild(m)}a.appendChild(b)}if(this.exportPageSettings(o,a),this._headers.length>0||this._footers.length>0){const b=o.createElement("headerFooter");this._headers.length>0&&b.appendChild(this.exportHeader(o)),this._footers.length>0&&b.appendChild(this.exportFooter(o)),a.appendChild(b)}for(l=0,d=this._drawings.length;l<d;l++){const b=o.createElement("drawing");b.setAttribute("r:id",this.relations.getRelationshipId(this._drawings[l])),a.appendChild(b)}if(this._tables.length>0){const b=o.createElement("tableParts");for(b.setAttribute("count",this._tables.length),l=0,d=this._tables.length;l<d;l++){const m=o.createElement("tablePart");m.setAttribute("r:id",this.relations.getRelationshipId(this._tables[l])),b.appendChild(m)}a.appendChild(b)}return o}exportColumns(t){const e=y.createElement(t,"cols");for(let n=0,i=this.columns.length;n<i;n++){const r=this.columns[n],o=y.createElement(t,"col",[["min",r.min||n+1],["max",r.max||n+1]]);r.hidden&&o.setAttribute("hidden",String(1)),r.bestFit&&o.setAttribute("bestFit",String(1)),(r.customWidth||r.width)&&o.setAttribute("customWidth",String(1)),r.width?o.setAttribute("width",r.width):o.setAttribute("width",String(9.140625)),e.appendChild(o)}return e}exportPageSettings(t,e){if(this._margin){let n=.7;const i=this._margin.left?this._margin.left:n,r=this._margin.right?this._margin.right:n,o=this._margin.top?this._margin.top:n,a=this._margin.bottom?this._margin.bottom:n;n=.3;const l=this._margin.header?this._margin.header:n,d=this._margin.footer?this._margin.footer:n;e.appendChild(y.createElement(t,"pageMargins",[["top",o],["bottom",a],["left",i],["right",r],["header",l],["footer",d]]))}this._orientation&&e.appendChild(y.createElement(t,"pageSetup",[["orientation",this._orientation]]))}setPageOrientation(t){this._orientation=t}setPageMargin(t){this._margin=t}setColumns(t){this.columns=t}setData(t){this.data=t}mergeCells(t,e){this.mergedCells.push([t,e])}freezePane(t,e,n){this.sheetView.freezePane(t,e,n)}setColumnFormats(t){this.columnFormats=t}}class hr{constructor(){h(this,"id",_t("Workbook")),h(this,"styleSheet",new Js),h(this,"sharedStrings",new Qs),h(this,"relations",new Dn),h(this,"worksheets",[]),h(this,"tables",[]),h(this,"drawings",[]),h(this,"media",{}),h(this,"printTitles"),this.initialize()}initialize(){this.id=_t("Workbook"),this.styleSheet=new Js,this.sharedStrings=new Qs,this.relations=new Dn,this.relations.addRelation(this.styleSheet,"stylesheet"),this.relations.addRelation(this.sharedStrings,"sharedStrings")}createWorksheet(t){return t=Object.assign({},{name:"Sheet ".concat(String(this.worksheets.length+1))},t),new eh(t)}getStyleSheet(){return this.styleSheet}addTable(t){this.tables.push(t)}addDrawings(t){this.drawings.push(t)}setPrintTitleTop(t,e){this.printTitles==null&&(this.printTitles={}),this.printTitles[t]==null&&(this.printTitles[t]={}),this.printTitles[t].top=e}setPrintTitleLeft(t,e){this.printTitles==null&&(this.printTitles={}),this.printTitles[t]==null&&(this.printTitles[t]={}),this.printTitles[t].left=String.fromCharCode(64+e)}addMedia(t,e,n,i){const r=e.split("."),o=r[r.length-1];if(!i)switch(o.toLowerCase()){case"jpeg":case"jpg":i="image/jpeg";break;case"png":i="image/png";break;case"gif":i="image/gif";break;default:i=null;break}return this.media[e]||(this.media[e]={id:e,data:n,fileName:e,contentType:i,extension:o}),this.media[e]}addWorksheet(t){this.relations.addRelation(t,"worksheet"),t.setSharedStringCollection(this.sharedStrings),this.worksheets.push(t)}createContentTypes(){const t=y.createXmlDoc(y.schemas.contentTypes,"Types"),e=t.documentElement;let n,i;e.appendChild(y.createElement(t,"Default",[["Extension","rels"],["ContentType","application/vnd.openxmlformats-package.relationships+xml"]])),e.appendChild(y.createElement(t,"Default",[["Extension","xml"],["ContentType","application/xml"]]));const r={};for(const o in this.media)this.media.hasOwn(o)&&(r[this.media[o].extension]=this.media[o].contentType);for(const o in r)r.hasOwn(o)&&e.appendChild(y.createElement(t,"Default",[["Extension",o],["ContentType",r[o]]]));for(e.appendChild(y.createElement(t,"Override",[["PartName","/xl/workbook.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"]])),e.appendChild(y.createElement(t,"Override",[["PartName","/xl/sharedStrings.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"]])),e.appendChild(y.createElement(t,"Override",[["PartName","/xl/styles.xml"],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"]])),n=0,i=this.worksheets.length;n<i;n++)e.appendChild(y.createElement(t,"Override",[["PartName",`/xl/worksheets/sheet${n+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"]]));for(n=0,i=this.tables.length;n<i;n++)e.appendChild(y.createElement(t,"Override",[["PartName",`/xl/tables/table${n+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"]]));for(n=0,i=this.drawings.length;n<i;n++)e.appendChild(y.createElement(t,"Override",[["PartName",`/xl/drawings/drawing${n+1}.xml`],["ContentType","application/vnd.openxmlformats-officedocument.drawing+xml"]]));return t}toXML(){const t=y.createXmlDoc(y.schemas.spreadsheetml,"workbook"),e=t.documentElement;e.setAttribute("xmlns:r",y.schemas.relationships);const n=31,i=y.createElement(t,"sheets");for(let a=0,l=this.worksheets.length;a<l;a++){const d=t.createElement("sheet");typeof console<"u"&&this.worksheets[a].name.length>n&&console.log(`Microsoft Excel requires work sheet names to be less than ${n+1} characters long, work sheet name "${this.worksheets[a].name}" is ${this.worksheets[a].name.length} characters long`),d.setAttribute("name",this.worksheets[a].name),d.setAttribute("sheetId",a+1),d.setAttribute("r:id",this.relations.getRelationshipId(this.worksheets[a])),i.appendChild(d)}e.appendChild(i);const r=y.createElement(t,"definedNames");let o=0;for(const a in this.printTitles){if(!this.printTitles.hasOwn(a))continue;const l=this.printTitles[a],d=t.createElement("definedName");d.setAttribute("name","_xlnm.Print_Titles"),d.setAttribute("localSheetId",o++);let c="";l.top&&(c+=`${a}!$1:$${l.top}`,l.left&&(c+=",")),l.left&&(c+=`${a}!$A:$${l.left}`),d.appendChild(t.createTextNode(c)),r.appendChild(d)}return e.appendChild(r),t}createWorkbookRelationship(){const t=y.createXmlDoc(y.schemas.relationshipPackage,"Relationships");return t.documentElement.appendChild(y.createElement(t,"Relationship",[["Id","rId1"],["Type",y.schemas.officeDocument],["Target","xl/workbook.xml"]])),t}_generateCorePaths(t){let e,n;for(At[this.styleSheet.id]="styles.xml",At[this.sharedStrings.id]="sharedStrings.xml",At[this.id]="/xl/workbook.xml",e=0,n=this.tables.length;e<n;e++)t[`/xl/tables/table${e+1}.xml`]=this.tables[e].toXML(),At[this.tables[e].id]=`/xl/tables/table${e+1}.xml`;for(const i in this.media)if(this.media.hasOwn(i)){const r=this.media[i];t[`/xl/media/${i}`]=r.data,At[i]=`/xl/media/${i}`}for(e=0,n=this.drawings.length;e<n;e++)t[`/xl/drawings/drawing${e+1}.xml`]=this.drawings[e].toXML(),At[this.drawings[e].id]=`/xl/drawings/drawing${e+1}.xml`,t[`/xl/drawings/_rels/drawing${e+1}.xml.rels`]=this.drawings[e].relations.toXML()}_prepareFilesForPackaging(t){Object.assign(t,{"/[Content_Types].xml":this.createContentTypes(),"/_rels/.rels":this.createWorkbookRelationship(),"/xl/styles.xml":this.styleSheet.toXML(),"/xl/workbook.xml":this.toXML(),"/xl/sharedStrings.xml":this.sharedStrings.toXML(),"/xl/_rels/workbook.xml.rels":this.relations.toXML()});for(const[e,n]of Object.entries(t))if(e.indexOf(".xml")!==-1||e.indexOf(".rels")!==-1){n instanceof Qe?t[e]=n.toString():t[e]=n.xml||new window.XMLSerializer().serializeToString(n);let i=t[e].replace(/xmlns=""/g,"");i=i.replace(/NS[\d]+:/g,""),i=i.replace(/xmlns:NS[\d]+=""/g,""),t[e]=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
${i}`}}generateFiles(){return new Promise(t=>{const e={};this._generateCorePaths(e);for(let n=0,i=this.worksheets.length;n<i;n++)e[`/xl/worksheets/sheet${n+1}.xml`]=this.worksheets[n].toXML(),At[this.worksheets[n].id]=`worksheets/sheet${n+1}.xml`,e[`/xl/worksheets/_rels/sheet${n+1}.xml.rels`]=this.worksheets[n].relations.toXML();return this._prepareFilesForPackaging(e),t(e)})}}class B{constructor(){h(this,"config",{forceUIThread:!1})}createWorkbook(){return new hr}createFile(t,e,n){const i={};return t.generateFiles().then(r=>{for(const[o,a]of Object.entries(r))i[o.substr(1)]=On(a);switch(e){case"Uint8Array":return Gs(i,n);case"Blob":default:return new Blob([Gs(i,n)],{type:"base64"})}})}}function ur(s){const t=document.createElement("table");t.className="table";const e=document.createElement("thead"),n=document.createElement("tbody");return t.appendChild(e),t.appendChild(n),s.forEach((i,r)=>{const o=document.createElement("tr");for(const a of i){let l;r===0?(l=document.createElement("th"),l.setAttribute("scope","col")):l=document.createElement("td"),l.textContent=a,o.appendChild(l),r===0?e.appendChild(o):n.appendChild(o)}}),t}function ot(s){if(typeof navigator.msSaveOrOpenBlob=="function")navigator.msSaveOrOpenBlob(s.blob,s.filename);else{const t=document.createElement("a"),e=URL.createObjectURL(s.blob);t&&document&&(t.textContent="download",t.href=e,t.setAttribute("download",s.filename),t.style.visibility="hidden",document.body.appendChild(t),t.click(),document.body.removeChild(t))}}let pr=class{constructor(){P(this,"exportBtnElm");P(this,"originalData",[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]])}mount(){document.querySelector(".table-container").appendChild(ur(this.originalData)),this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=new hr,e=t.createWorksheet({name:"Artists"});e.setData(this.originalData),t.addWorksheet(e),new B().createFile(t).then(n=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:n,data:e.data})})}},nh=class{constructor(){P(this,"exportBtnElm");P(this,"originalData",[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]])}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=new B().createWorkbook(),e=t.createWorksheet({name:"Album List"});e.setData(this.originalData),e.setColumns([{width:30},{width:20,hidden:!0},{width:10}]),t.addWorksheet(e),new B().createFile(t).then(n=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:n,data:e.data})})}},sh=class{constructor(){P(this,"exportBtnElm");P(this,"originalData",[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]])}mount(){document.querySelector(".table-container").appendChild(ur(this.originalData)),this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=new B().createWorkbook(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet().createFormat({font:{italic:!0,underline:!0}});e.setRowInstructions(1,{height:40,style:n.id}),e.setData(this.originalData),t.addWorksheet(e),new B().createFile(t).then(i=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:i,data:e.data})})}},ih=class{constructor(){P(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=new B().createWorkbook(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet(),i="FFFF0000",r=n.createFormat({font:{bold:!0,color:i},border:{bottom:{color:i,style:"thin"},top:{color:i,style:"thin"},left:{color:i,style:"thin"},right:{color:i,style:"dotted"}}}),o=n.createFormat({font:{bold:!0,color:{theme:3}}}),a=[[{value:"Artist",metadata:{style:r.id}},{value:"Album",metadata:{style:o.id}},{value:"Price",metadata:{style:o.id}}],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]];e.setData(a),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),new B().createFile(t).then(l=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:l,data:e.data})})}},rh=class{constructor(){P(this,"exportBtnElm");P(this,"originalData",[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]])}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=new B().createWorkbook(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet().createFormat({format:"$#,##0.00"}),i=[["Artist","Album","Price"],["Buckethead","Albino Slug",{value:8.99,metadata:{style:n.id}}],["Buckethead","Electric Tears",{value:13.99,metadata:{style:n.id}}],["Buckethead","Colma",{value:11.34,metadata:{style:n.id}}],["Crystal Method","Vegas",{value:10.54,metadata:{style:n.id}}],["Crystal Method","Tweekend",{value:10.64,metadata:{style:n.id}}],["Crystal Method","Divided By Night",{value:8.99,metadata:{style:n.id}}]];e.setData(i),t.addWorksheet(e),new B().createFile(t).then(r=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:r,data:e.data})})}},oh=class{constructor(){P(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=new B().createWorkbook(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet().createFormat({alignment:{horizontal:"center"}}),i=[[{value:"Artist",metadata:{style:n.id}},{value:"Album",metadata:{style:n.id}},{value:"Price",metadata:{style:n.id}}],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]];e.setData(i),e.setColumns([{width:30},{width:30},{width:30}]),t.addWorksheet(e),new B().createFile(t).then(r=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:r,data:e.data})})}},ah=class{constructor(){P(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=new B().createWorkbook(),e=t.createWorksheet({name:"Album List"}),n=t.getStyleSheet(),r=n.createFormat({font:{bold:!0,color:"FF0000FF"},fill:{type:"pattern",patternType:"solid",fgColor:"FF00FF00"}}),o=n.createFormat({font:{color:"FFFFFFFF"},fill:{type:"gradient",degree:180,start:"FF92D050",end:{pureAt:.8,color:"FF0070C0"}}}),a=[[{value:"Artist",metadata:{style:r.id}},{value:"Album",metadata:{style:r.id}},{value:"Price",metadata:{style:r.id}}],[{value:"Buckethead",metadata:{style:o.id}},"Albino Slug",8.99],[{value:"Buckethead",metadata:{style:o.id}},"Electric Tears",13.99],[{value:"Buckethead",metadata:{style:o.id}},"Colma",11.34],[{value:"Crystal Method",metadata:{style:o.id}},"Vegas",10.54],[{value:"Crystal Method",metadata:{style:o.id}},"Tweekend",10.64],[{value:"Crystal Method",metadata:{style:o.id}},"Divided By Night",8.99]];e.setData(a),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),new B().createFile(t).then(l=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:l,data:e.data})})}},lh=class{constructor(){P(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=new B().createWorkbook(),e=t.createWorksheet({name:"Album List"}),n=[[{value:"Artist"},{value:"Album"},{value:"Price"},{value:"Quantity"},{value:"Total"}],["Buckethead","Albino Slug",8.99,5,{value:"C2+D2",metadata:{type:"formula"}}],["Buckethead","Electric Tears",13.99,7,{value:"C3+D3",metadata:{type:"formula"}}],["Buckethead","Colma",11.34,9,{value:"C4+D4",metadata:{type:"formula"}}],["Crystal Method","Vegas",10.54,3,{value:"C5+D5",metadata:{type:"formula"}}],["Crystal Method","Tweekend",10.64,1,{value:"C6+D6",metadata:{type:"formula"}}],["Crystal Method","Divided By Night",8.99,56,{value:"C7+D7",metadata:{type:"formula"}}]];e.setData(n),e.setColumns([{width:30},{width:20},{width:10}]),t.addWorksheet(e),new B().createFile(t).then(i=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:i,data:e.data})})}},ch=class{constructor(){P(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=new B().createWorkbook(),n=e.createWorksheet({name:"Album List"}),i=new Zn;i.styleInfo.themeStyle="TableStyleDark2",i.setReferenceRange([1,1],[3,t.length]),i.setTableColumns(["Artist","Album","Price"]),n.setData(t),e.addWorksheet(n),n.addTable(i),e.addTable(i),new B().createFile(e).then(r=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:r,data:n.data})})}},dh=class{constructor(){P(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=new B().createWorkbook(),n=e.createWorksheet({name:"Album List"}),i=e.getStyleSheet(),r=i.createDifferentialStyle({font:{italic:!0}});i.createTableStyle({name:"SlightlyOffColorBlue",wholeTable:r.id,headerRow:i.createDifferentialStyle({alignment:{horizontal:"center"}}).id});const o=new Zn;o.styleInfo.themeStyle="SlightlyOffColorBlue",o.setReferenceRange([1,1],[3,t.length]),o.setTableColumns(["Artist","Album","Price"]),n.setData(t),e.addWorksheet(n),n.addTable(o),e.addTable(o),new B().createFile(e).then(a=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:a,data:n.data})})}},hh=class{constructor(){P(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=new Zn,e=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99],["Highest Price","test",{value:`SUBTOTAL(104,${t.name}[Price])`,metadata:{type:"formula"}}]],n=new B().createWorkbook(),i=n.createWorksheet({name:"Album List"});t.styleInfo.themeStyle="TableStyleDark2",t.setReferenceRange([1,1],[3,e.length]),t.totalsRowCount=1,t.setTableColumns([{name:"Artist",totalsRowLabel:"Highest Price"},{name:"Album",totalsRowLabel:"test"},{name:"Price",totalsRowFunction:"max"}]),i.setData(e),n.addWorksheet(i),i.addTable(t),n.addTable(t),new B().createFile(n).then(r=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:r,data:i.data})})}},uh=class{constructor(){P(this,"exportBtnElm")}mount(){this.exportBtnElm=document.querySelector("#export"),this.exportBtnElm.addEventListener("click",this.createExcelStruct.bind(this))}unmount(){this.exportBtnElm.removeEventListener("click",this.createExcelStruct.bind(this))}createExcelStruct(){const t=[["Artist","Album","Price"],["Buckethead","Albino Slug",8.99],["Buckethead","Electric Tears",13.99],["Buckethead","Colma",11.34],["Crystal Method","Vegas",10.54],["Crystal Method","Tweekend",10.64],["Crystal Method","Divided By Night",8.99]],e=new B().createWorkbook(),n=e.createWorksheet({name:"Album List"});n.setData(t),n.setHeader(["This will be on the left",["In the middle ",{text:"I shall be",bold:!0}],{text:"Right, underlined and size of 16",font:16,underline:!0}]),n.setFooter(["Date of print: &D &T","&A","Page &P of &N"]),e.addWorksheet(n),new B().createFile(e).then(i=>{ot({...{filename:"Artist WB.xlsx",format:"xlsx"},blob:i,data:n.data})})}};class ph{}const vn=[{name:"getting-started",view:"/src/getting-started.html",viewModel:ph,title:"Getting Started"},{name:"examples",view:"/src/examples/example01.html",viewModel:pr,title:"Examples"},{name:"documentation",href:"https://ghiscoding.gitbook.io/excel-builder-vanilla/",title:"Documentation"}],Zs=[{name:"References",routes:[{name:"documentation",href:"https://ghiscoding.gitbook.io/excel-builder-vanilla/",title:"Documentation"}]},{name:"Examples",routes:[{name:"example01",view:"/src/examples/example01.html",viewModel:pr,title:"01- Create Worksheet"},{name:"example02",view:"/src/examples/example02.html",viewModel:nh,title:"02- Sizing/Collapsing Columns"},{name:"example03",view:"/src/examples/example03.html",viewModel:sh,title:"03- Setting row information"},{name:"example04",view:"/src/examples/example04.html",viewModel:ih,title:"04- Fonts and Colors"},{name:"example05",view:"/src/examples/example05.html",viewModel:rh,title:"05- Number, Date, etc Formatting"},{name:"example06",view:"/src/examples/example06.html",viewModel:oh,title:"06- Alignment"},{name:"example07",view:"/src/examples/example07.html",viewModel:ah,title:"07- Backgroud Fillers"},{name:"example08",view:"/src/examples/example08.html",viewModel:lh,title:"08- Formulas"},{name:"example09",view:"/src/examples/example09.html",viewModel:ch,title:"09- Tables"},{name:"example10",view:"/src/examples/example10.html",viewModel:dh,title:"10- Theming Tables"},{name:"example11",view:"/src/examples/example11.html",viewModel:hh,title:"11- Theming Summaries"},{name:"example12",view:"/src/examples/example12.html",viewModel:uh,title:"12- Worksheet Headers/Footers"}]}],mh=Object.assign({"/src/examples/example-standalone.html":_r,"/src/examples/example01.html":Er,"/src/examples/example02.html":yr,"/src/examples/example03.html":wr,"/src/examples/example04.html":xr,"/src/examples/example05.html":Ar,"/src/examples/example06.html":Cr,"/src/examples/example07.html":Tr,"/src/examples/example08.html":Sr,"/src/examples/example09.html":kr,"/src/examples/example10.html":Or,"/src/examples/example11.html":Nr,"/src/examples/example12.html":Dr,"/src/getting-started.html":Lr,"/src/main.html":ti});class fh{constructor(){P(this,"loading",!0);P(this,"currentModel");P(this,"currentRouter");P(this,"defaultRouteName","getting-started");P(this,"stateBangChar","#/");P(this,"baseUrl",window.location.origin+window.location.pathname);P(this,"viewModelObj",{})}async init(){const t=window.location;document.querySelector("#app").innerHTML=ti;let e=t.hash.replace(this.stateBangChar,"");(!e||e==="/"||e==="#")&&(e=this.defaultRouteName),this.createRouteLinks(),this.loadRoute(e),Array.from(document.querySelectorAll(".panel-wm-left a.nav-link,.navbar-nav a.nav-link")).forEach(n=>{n.id&&e.includes(n.id)&&n.classList.add("active")}),window.onpopstate=()=>{const i=window.location.hash.replace(this.stateBangChar,"");this.removeAllActiveLinks();const r=document.querySelector(`#${i}`);r&&(r.scrollIntoView(),r.classList.add("active")),this.loadRoute(i||this.defaultRouteName,!1)}}createRouteLinks(){var t,e,n;for(const i of vn){const r=document.createElement("li");r.className="nav-item";const o=document.createElement("a");o.id=i.name,o.className="nav-link",o.textContent=i.title,r.appendChild(o),o.addEventListener("click",this.clickEventListener.bind(this)),(t=document.querySelector(".navbar-nav"))==null||t.appendChild(r)}for(const i of Zs){const r=document.createElement("li");r.className="m-1";const o=document.createElement("p");o.className="navbar-vertical-label mb-1",o.textContent=i.name,r.appendChild(o),(e=document.querySelector(".nav-pills"))==null||e.appendChild(r);for(const a of i.routes){const l=document.createElement("li");l.className="nav-item";const d=document.createElement("a");d.id=a.name,d.className="nav-link",d.textContent=a.title,d.addEventListener("click",this.clickEventListener.bind(this)),l.appendChild(d),(n=document.querySelector(".nav-pills"))==null||n.appendChild(l)}}}async loadRoute(t,e=!0){var r;const n=document.querySelector(".panel-wm-content");n.textContent="",n.classList.add("cloak");let i=vn.find(o=>o.name===t);if((i==null?void 0:i.name)==="examples"){const o=document.querySelector(".nav-pills .nav-item a.nav-link:not([href])");o==null||o.classList.add("active")}else for(const o of Zs){const a=o.routes.find(l=>l.name===t);a&&(i=a)}if(this.currentModel&&this.unmountCurrentVM(this.currentModel,this.currentRouter),i!=null&&i.view){this.currentRouter=i,document.querySelector(".panel-wm-content").innerHTML=mh[i.view];const o=new i.viewModel;this.currentModel=o,window[i.name]=(r=o.mount)==null?void 0:r.call(o),window.onbeforeunload=()=>{var a;n.classList.add("cloak"),(a=o.unmount)==null||a.call(o),this.removeAllActiveLinks(!0),this.unmountAll(),i!=null&&i.name&&delete window[i.name]}}e&&window.history.pushState({},t,`${this.baseUrl}${this.stateBangChar}${t}`),document.title=`Excel-Builder-Vanilla · ${t}`,n.classList.remove("cloak")}async clickEventListener(t){const e=t.target,n=vn.find(i=>i.name===e.id);if(n!=null&&n.href){window.open(n.href,"_blank");return}this.removeAllActiveLinks(),e.classList.toggle("active"),this.loadRoute(e.id)}removeAllActiveLinks(t=!1){document.querySelectorAll(".panel-wm-left a.nav-link,.navbar-nav a.nav-link").forEach(e=>{e.classList.remove("active"),t&&e.removeEventListener("click",this.clickEventListener.bind(this))})}unmountCurrentVM(t,e){var n;(n=t.unmount)==null||n.call(t),e&&delete window[e.name]}unmountAll(){for(const t of Object.keys(this.viewModelObj)){const e=this.viewModelObj[t];if(typeof(e==null?void 0:e.unmount)=="function"){e==null||e.unmount();for(const n of Object.keys(e))e[n]=null}window[t]=null,this.viewModelObj[t]=null,delete window[t],delete this.viewModelObj[t]}}}const gh=new fh;gh.init();
