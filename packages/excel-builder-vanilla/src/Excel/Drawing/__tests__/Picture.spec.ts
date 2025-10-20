import { describe, expect, it } from 'vitest';

import { Util } from '../../Util';
import { Picture } from '../Picture';

describe('Picture', () => {
  it('should initialize with unique ids and default values', () => {
    const pic = new Picture();
    expect(typeof pic.id).toBe('string');
    expect(typeof pic.pictureId).toBe('string');
    expect(pic.fill).toEqual({});
    expect(pic.mediaData).toBeNull();
    expect(pic.description).toBe('');
  });

  it('should set media, description, fill type, and fill config', () => {
    const pic = new Picture();
    const media = { fileName: 'img.png', rId: 'rId1', id: '1', data: '', contentType: 'image/png', extension: 'png' };
    pic.setMedia(media);
    expect(pic.mediaData).toBe(media);
    pic.setDescription('desc');
    expect(pic.description).toBe('desc');
    pic.setFillType('solid');
    expect(pic.fill.type).toBe('solid');
    pic.setFillConfig({ color: 'red', opacity: 0.5 });
    expect(pic.fill.color).toBe('red');
    expect(pic.fill.opacity).toBe(0.5);
  });

  it('should get media type and data', () => {
    const pic = new Picture();
    const media = { fileName: 'img.png', rId: 'rId1', id: '2', data: '', contentType: 'image/png', extension: 'png' };
    pic.setMedia(media);
    expect(pic.getMediaType()).toBe('image');
    expect(pic.getMediaData()).toBe(media);
  });

  it('should set relationship id on mediaData', () => {
    const pic = new Picture();
    const media = { fileName: 'img.png', rId: '', id: '3', data: '', contentType: 'image/png', extension: 'png' };
    pic.setMedia(media);
    pic.setRelationshipId('rId2');
    expect(pic.mediaData!.rId).toBe('rId2');
  });

  it('should create correct XML structure in toXML', () => {
    // Minimal mock for XMLDOM, Util, and anchor
    const xmlDoc = {
      createElement: (nodeName: string) => ({
        nodeName,
        children: [] as any[],
        appendChild(child: any) {
          (this.children as any[]).push(child);
        },
        setAttribute() {},
        toString() {
          return `<${nodeName}/>`;
        },
      }),
      createTextNode: (text: string) => ({ text }),
    };
    const origCreateElement = Util.createElement;
    Util.createElement = (doc: any, name: string, attrs?: any) => doc.createElement(name);
    const pic = new Picture();
    pic.anchor = { toXML: (doc: any, node: any) => ({ nodeName: 'anchored', children: [node] }) } as any;
    pic.setMedia({ fileName: 'img.png', rId: 'rId1', id: '4', data: '', contentType: 'image/png', extension: 'png' });
    pic.setDescription('desc');
    const xml = pic.toXML(xmlDoc as any);
    expect(xml.nodeName).toBe('anchored');
    expect(xml.children[0].nodeName).toBe('xdr:pic');
    Util.createElement = origCreateElement;
  });
});
