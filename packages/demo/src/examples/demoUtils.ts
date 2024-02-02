export const MimeType = {
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export function buildHtmlTable(originalData: any[]) {
  const tableElm = document.createElement('table');
  tableElm.className = 'table';
  const theadElm = document.createElement('thead');
  const tbodyElm = document.createElement('tbody');
  tableElm.appendChild(theadElm);
  tableElm.appendChild(tbodyElm);

  originalData.forEach((data, rowIdx) => {
    const trElm = document.createElement('tr');

    for (const headerTitle of data) {
      let cellElm: HTMLTableCellElement;
      if (rowIdx === 0) {
        cellElm = document.createElement('th');
        cellElm.setAttribute('scope', 'col');
      } else {
        cellElm = document.createElement('td');
      }
      cellElm.textContent = headerTitle as string;
      trElm.appendChild(cellElm);
      if (rowIdx === 0) {
        theadElm.appendChild(trElm);
      } else {
        tbodyElm.appendChild(trElm);
      }
    }
  });

  return tableElm;
}

export function downloader(options: { filename: string; blob: Blob; data: any[] }) {
  // when using IE/Edge, then use different download call
  if (typeof (navigator as any).msSaveOrOpenBlob === 'function') {
    (navigator as any).msSaveOrOpenBlob(options.blob, options.filename);
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
