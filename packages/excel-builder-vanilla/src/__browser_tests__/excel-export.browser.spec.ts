/// <reference types="vite/client" />

import { strFromU8, unzipSync } from 'fflate';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createExcelFile, createWorkbook } from '../factory.js';
import { createExcelFileStream } from '../streaming.js';

interface DemoExample {
  mount(): void;
  unmount(): void;
}

type DemoConstructor = new () => DemoExample;

interface Download {
  anchor: HTMLAnchorElement;
  file?: Blob;
}

interface ExportContract {
  filename: string;
  sheetNames: string[];
  text?: string[];
  paths?: string[];
}

const demoModules = import.meta.glob('../../../demo/src/examples/example*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, DemoConstructor>;
const demoTemplates = import.meta.glob('../../../demo/src/examples/example*.html', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const exportContracts: Record<string, ExportContract> = {
  'example01:export': { filename: 'Artist WB.xlsx', sheetNames: ['Artists'], text: ['Artist', 'Buckethead'] },
  'example02:export': { filename: 'Artist WB.xlsx', sheetNames: ['Album List'], text: ['Buckethead'] },
  'example03:export': { filename: 'Artist WB.xlsx', sheetNames: ['Album List'], text: ['Electric Tears'] },
  'example04:export': { filename: 'Artist WB.xlsx', sheetNames: ['Album List'], text: ['Crystal Method'] },
  'example05:export': { filename: 'Artist WB.xlsx', sheetNames: ['Album List'], text: ['Date Modified'] },
  'example06:export': { filename: 'Artist WB.xlsx', sheetNames: ['Album List'], text: ['Buckethead'] },
  'example07:export': { filename: 'Artist WB.xlsx', sheetNames: ['Album List'], text: ['Buckethead'] },
  'example08:export': { filename: 'Artist WB.xlsx', sheetNames: ['Album List'], text: ['Quantity', 'C2*D2'] },
  'example09:export': {
    filename: 'Artist WB.xlsx',
    sheetNames: ['Album List'],
    text: ['TableStyleDark2'],
    paths: ['xl/tables/table1.xml'],
  },
  'example10:export': {
    filename: 'Artist WB.xlsx',
    sheetNames: ['Album List'],
    text: ['SlightlyOffColorBlue'],
    paths: ['xl/tables/table1.xml'],
  },
  'example11:export': {
    filename: 'Artist WB.xlsx',
    sheetNames: ['Album List'],
    text: ['Highest Price', 'SUBTOTAL'],
    paths: ['xl/tables/table1.xml'],
  },
  'example12:export': {
    filename: 'Artist WB.xlsx',
    sheetNames: ['Album List'],
    text: ['This will be on the left', 'Page &amp;P of &amp;N'],
  },
  'example13:export': {
    filename: 'Fruits.xlsx',
    sheetNames: ['TestSheet'],
    text: ['Buckethead'],
    paths: ['xl/drawings/drawing1.xml', 'xl/media/logo.png', 'xl/tables/table1.xml'],
  },
  'example14:export': {
    filename: 'Fruits.xlsx',
    sheetNames: ['Berry List'],
    paths: ['xl/drawings/drawing1.xml', 'xl/media/strawberry.jpg'],
  },
  'example15:export': { filename: 'LargeArtistWB.xlsx', sheetNames: ['Artists'], text: ['Artist 0'] },
  'example16:export': {
    filename: 'Artist WB - Streaming Features.xlsx',
    sheetNames: ['Album List'],
    text: ['Merged Header', 'C3*D3'],
  },
  'example17:export': {
    filename: 'Fruits-Streaming.xlsx',
    sheetNames: ['TestSheet'],
    text: ['Buckethead'],
    paths: ['xl/drawings/drawing1.xml', 'xl/media/logo.png', 'xl/tables/table1.xml'],
  },
  'example18:export-chart': {
    filename: 'Multiple-Charts.xlsx',
    sheetNames: [
      'Column',
      'Bar',
      'Line',
      'Pie',
      'Doughnut',
      'Scatter',
      'Column Stacked',
      'Bar Stacked',
      'Line Stacked',
      'Column % Stacked',
      'Bar % Stacked',
      'Line % Stacked',
    ],
    text: ['Q1', 'Y vs X'],
    paths: ['xl/charts/chart1.xml', 'xl/drawings/drawing1.xml'],
  },
  'example19:export-custom-function': {
    filename: 'Workbook-Custom-Functions-Excel.xlsx',
    sheetNames: ['Sales'],
    text: ['CUSTOMSUM', 'SAFEAVERAGE', 'TaxRate'],
  },
  'example19:export-portable-values': {
    filename: 'Workbook-Custom-Functions-Portable.xlsx',
    sheetNames: ['Sales'],
    text: ['Total', 'Average', 'Tax'],
  },
};

function waitForDownload(timeoutMs = 60_000) {
  return new Promise<Download>((resolve, reject) => {
    const originalClick = HTMLAnchorElement.prototype.click;
    const originalCreateObjectURL = URL.createObjectURL;
    const blobsByUrl = new Map<string, Blob>();
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error(`Timed out waiting for download after ${timeoutMs}ms.`));
    }, timeoutMs);
    const cleanup = () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('unhandledrejection', onRejection);
      HTMLAnchorElement.prototype.click = originalClick;
      URL.createObjectURL = originalCreateObjectURL;
    };
    URL.createObjectURL = value => {
      const url = originalCreateObjectURL.call(URL, value);
      if (value instanceof Blob) blobsByUrl.set(url, value);
      return url;
    };
    HTMLAnchorElement.prototype.click = function () {
      if (this.download) {
        const file = blobsByUrl.get(this.href);
        cleanup();
        resolve({ anchor: this, file });
        return;
      }
      originalClick.call(this);
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      cleanup();
      reject(event.reason);
    };
    window.addEventListener('unhandledrejection', onRejection);
  });
}

async function expectValidXlsx(file: Blob) {
  expect(file.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  const files = unzipSync(new Uint8Array(await file.arrayBuffer()));
  const contentTypes = files['[Content_Types].xml'];
  const workbook = files['xl/workbook.xml'];
  const worksheet = files['xl/worksheets/sheet1.xml'];

  expect(contentTypes).toBeInstanceOf(Uint8Array);
  expect(workbook).toBeInstanceOf(Uint8Array);
  expect(worksheet).toBeInstanceOf(Uint8Array);
  expect(strFromU8(contentTypes)).toContain('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml');
  expect(strFromU8(workbook)).toContain('<workbook');
  expect(strFromU8(worksheet)).toContain('<worksheet');
}

async function expectExportContract(file: Blob, contract: ExportContract) {
  await expectValidXlsx(file);
  const files = unzipSync(new Uint8Array(await file.arrayBuffer()));
  const xml = Object.entries(files)
    .filter(([path]) => path.endsWith('.xml'))
    .map(([, content]) => strFromU8(content))
    .join('\n');

  for (const sheetName of contract.sheetNames) expect(xml).toContain(`name="${sheetName}"`);
  for (const text of contract.text ?? []) expect(xml).toContain(text);
  for (const path of contract.paths ?? []) expect(files[path]).toBeInstanceOf(Uint8Array);
}

function normalizeXmlSnapshot(content: string) {
  return content
    .replace(/\brId\d+\b/gu, 'rId0')
    .replace(/<v>[-+]?\d+(?:\.\d+)?(?:e[-+]?\d+)?<\/v>/gu, '<v>0</v>')
    .replace(/<c[^>]*>.*?<\/c>/gsu, match => match.replace(/<v>[-+]?\d+(?:\.\d+)?(?:e[-+]?\d+)?<\/v>/gu, '<v>0</v>'));
}

async function getXmlSnapshot(file: Blob) {
  const files = unzipSync(new Uint8Array(await file.arrayBuffer()));
  return Object.entries(files)
    .filter(([path]) => path.endsWith('.xml') || path.endsWith('.rels'))
    .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
    .map(([path, content]) => ({ path, content: normalizeXmlSnapshot(strFromU8(content)) }));
}

describe('Excel exports in a real browser', () => {
  const originalRandom = Math.random;

  beforeEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
    vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(0);

    let seed = 123_456_789;
    Math.random = () => {
      seed = (seed * 1_103_515_245 + 12_345) % 2 ** 31;
      return seed / 2 ** 31;
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Math.random = originalRandom;
  });

  it('creates an XLSX Blob containing the workbook and cell data', async () => {
    const workbook = createWorkbook();
    const worksheet = workbook.createWorksheet({ name: 'Artists' });
    worksheet.setData([
      ['Artist', 'Album'],
      ['Buckethead', 'Electric Tears'],
    ]);
    workbook.addWorksheet(worksheet);

    const file = await createExcelFile(workbook);
    await expectValidXlsx(file);
    const files = unzipSync(new Uint8Array(await file.arrayBuffer()));
    expect(strFromU8(files['xl/workbook.xml'])).toContain('Artists');
    expect(strFromU8(files['xl/sharedStrings.xml'])).toContain('Buckethead');
    expect(strFromU8(files['xl/sharedStrings.xml'])).toContain('Electric Tears');
  });

  it('reads a streaming XLSX export using the browser stream API', async () => {
    const workbook = createWorkbook();
    const worksheet = workbook.createWorksheet({ name: 'Artists' });
    worksheet.setData([['Artist'], ['Buckethead']]);
    workbook.addWorksheet(worksheet);

    const reader = (createExcelFileStream(workbook) as ReadableStream<Uint8Array>).getReader();
    const firstChunk = await reader.read();

    expect(firstChunk.done).toBe(false);
    expect(firstChunk.value).toBeInstanceOf(Uint8Array);
  });

  it('normalizes relationship IDs and cell values before snapshotting', () => {
    const xml = '<worksheet><c r="A1" s="2"><v>123.45</v></c><sheet r:id="rId21"/></worksheet>';

    expect(normalizeXmlSnapshot(xml)).toBe('<worksheet><c r="A1" s="2"><v>0</v></c><sheet r:id="rId0"/></worksheet>');
  });

  for (const [modulePath, Demo] of Object.entries(demoModules).sort(([a], [b]) => a.localeCompare(b))) {
    const templatePath = modulePath.replace(/\.ts$/u, '.html');
    const exampleName = modulePath.match(/example\d+/u)?.[0] ?? modulePath;

    it(`${exampleName} generates a valid XLSX from each export button`, async () => {
      document.body.innerHTML = demoTemplates[templatePath];
      const demo = new Demo();
      demo.mount();

      const exportButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('button[id^="export"]'));
      expect(exportButtons.length).toBeGreaterThan(0);

      for (const button of exportButtons) {
        const contract = exportContracts[`${exampleName}:${button.id}`];
        expect(contract).toBeDefined();
        const download = waitForDownload();
        button.click();
        const { anchor, file } = await download;

        expect(anchor.download).toBe(contract?.filename);
        expect(anchor.href).toMatch(/^blob:/u);
        expect(file).toBeInstanceOf(Blob);
        if (!file) throw new Error(`Expected ${exampleName} to create an XLSX Blob.`);
        if (!contract) throw new Error(`Missing export contract for ${exampleName}:${button.id}.`);
        await expectExportContract(file, contract);
        expect(await getXmlSnapshot(file)).toMatchSnapshot(`${exampleName}-${button.id}`);
      }

      demo.unmount();
    });
  }
});
