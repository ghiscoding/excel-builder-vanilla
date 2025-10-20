import { describe, expect, it } from 'vitest';

import { Util } from '../../Util';
import { TwoCellAnchor } from '../TwoCellAnchor';

describe('TwoCellAnchor', () => {
  it('should set from and to positions and offsets via constructor', () => {
    const anchor = new TwoCellAnchor({
      from: { x: 1, y: 2, xOff: true, yOff: false, width: 10, height: 20 },
      to: { x: 3, y: 4, xOff: false, yOff: true, width: 30, height: 40 },
    });
    expect(anchor.from.x).toBe(1);
    expect(anchor.from.y).toBe(2);
    expect(anchor.from.xOff).toBe(true);
    expect(anchor.from.yOff).toBe(false);
    expect(anchor.to.x).toBe(3);
    expect(anchor.to.y).toBe(4);
    expect(anchor.to.xOff).toBe(false);
    expect(anchor.to.yOff).toBe(true);
  });

  it('should set from and to via setFrom and setTo', () => {
    const anchor = new TwoCellAnchor({
      from: { x: 0, y: 0, width: 1, height: 1 },
      to: { x: 0, y: 0, width: 1, height: 1 },
    });
    anchor.setFrom(5, 6, true, false);
    anchor.setTo(7, 8, false, true);
    expect(anchor.from.x).toBe(5);
    expect(anchor.from.y).toBe(6);
    expect(anchor.from.xOff).toBe(true);
    expect(anchor.from.yOff).toBe(false);
    expect(anchor.to.x).toBe(7);
    expect(anchor.to.y).toBe(8);
    expect(anchor.to.xOff).toBe(false);
    expect(anchor.to.yOff).toBe(true);
  });

  it('should create correct XML structure in toXML', () => {
    // Minimal mock for XMLDOM and Util
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
    // Patch Util.createElement to use our mock
    const origCreateElement = Util.createElement;
    Util.createElement = (doc: any, name: string) => doc.createElement(name);
    const anchor = new TwoCellAnchor({
      from: { x: 1, y: 2, xOff: true, yOff: false, width: 10, height: 20 },
      to: { x: 3, y: 4, xOff: false, yOff: true, width: 30, height: 40 },
    });
    const xml = anchor.toXML(xmlDoc as any, { nodeName: 'content' });
    expect(xml.nodeName).toBe('xdr:twoCellAnchor');
    expect(xml.children.length).toBeGreaterThan(0);
    // Restore Util.createElement
    Util.createElement = origCreateElement;
  });
});
