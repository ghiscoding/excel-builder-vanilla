import { createWorkbook, Drawings, downloadExcelFile, Picture, Positioning } from 'excel-builder-vanilla';

import strawberryUrl from '../images/strawberry.jpg?url';

// jpg/png are all valid
// import strawberryImageData from '../images/strawberry.png?base64';
// import strawberryUrl from '../images/strawberry.png?url';

import './example14.scss';

export default class Example {
  exportBtnElm!: HTMLButtonElement;

  private async fetchImageAsBase64(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`[Example14] Failed to fetch image for export: ${response.status}`);
    }

    const bytes = new Uint8Array(await response.arrayBuffer());
    const chunkSize = 0x8000;
    let binary = '';
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }
    return btoa(binary);
  }

  mount() {
    this.exportBtnElm = document.querySelector('#export') as HTMLButtonElement;
    this.exportBtnElm.addEventListener('click', this.startProcess.bind(this));
    document.querySelector<HTMLImageElement>('#pic1')!.src = strawberryUrl;
    document.querySelector<HTMLImageElement>('#pic2')!.src = strawberryUrl;
    document.querySelector<HTMLImageElement>('#pic3')!.src = strawberryUrl;
  }

  unmount() {
    // remove event listeners to avoid DOM leaks
    this.exportBtnElm.removeEventListener('click', this.startProcess.bind(this));
  }

  async startProcess() {
    const fruitWorkbook = createWorkbook();
    const berryList = fruitWorkbook.createWorksheet({ name: 'Berry List' });

    const drawings = new Drawings();
    const strawberryImageData = await this.fetchImageAsBase64(strawberryUrl);

    const picRef = fruitWorkbook.addMedia('image', 'strawberry.jpg', strawberryImageData);

    const strawberryPicture1 = new Picture();
    strawberryPicture1.createAnchor('oneCellAnchor', {});
    strawberryPicture1.createAnchor('twoCellAnchor', {
      from: {
        x: 0,
        y: 0,
      },
      to: {
        x: 3,
        y: 5,
      },
    });

    strawberryPicture1.setMedia(picRef);
    drawings.addDrawing(strawberryPicture1);

    const strawberryPicture2 = new Picture();
    strawberryPicture2.createAnchor('absoluteAnchor', {
      x: Positioning.pixelsToEMUs(300),
      y: Positioning.pixelsToEMUs(300),
      width: Positioning.pixelsToEMUs(300),
      height: Positioning.pixelsToEMUs(300),
    });

    strawberryPicture2.setMedia(picRef);
    drawings.addDrawing(strawberryPicture2);

    const strawberryPicture3 = new Picture();
    strawberryPicture3.createAnchor('oneCellAnchor', {
      x: 1,
      y: 4,
      width: Positioning.pixelsToEMUs(300),
      height: Positioning.pixelsToEMUs(300),
    });

    strawberryPicture3.setMedia(picRef);
    drawings.addDrawing(strawberryPicture3);

    berryList.addDrawings(drawings);
    fruitWorkbook.addDrawings(drawings);
    fruitWorkbook.addWorksheet(berryList);

    downloadExcelFile(fruitWorkbook, 'Fruits.xlsx');
  }
}
