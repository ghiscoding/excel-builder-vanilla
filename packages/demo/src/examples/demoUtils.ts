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
