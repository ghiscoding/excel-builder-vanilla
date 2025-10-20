import { describe, expect, it } from 'vitest';

import { Util } from '../../Util';
import { OneCellAnchor } from '../OneCellAnchor';

describe('OneCellAnchor', () => {
  it('should set xOff and yOff when provided', () => {
    const anchor = new OneCellAnchor({ x: 1, y: 2, xOff: true, yOff: false, width: 10, height: 20 });
    expect(anchor.xOff).toBe(true);
    expect(anchor.yOff).toBe(false);
  });

  it('should not set xOff and yOff when not provided', () => {
    const anchor = new OneCellAnchor({ x: 1, y: 2, width: 10, height: 20 });
    expect(anchor.xOff).toBeNull();
    expect(anchor.yOff).toBeNull();
  });

  it('should set xOff and yOff via setPos', () => {
    const anchor = new OneCellAnchor({ x: 1, y: 2, width: 10, height: 20 });
    anchor.setPos(3, 4, false, true);
    expect(anchor.xOff).toBe(false);
    expect(anchor.yOff).toBe(true);
  });

  it('should set and get position and dimensions correctly', () => {
    const anchor = new OneCellAnchor({ x: 5, y: 6, width: 100, height: 200 });
    expect(anchor.x).toBe(5);
    expect(anchor.y).toBe(6);
    expect(anchor.width).toBe(100);
    expect(anchor.height).toBe(200);
    anchor.setPos(7, 8, true, false);
    expect(anchor.x).toBe(7);
    expect(anchor.y).toBe(8);
    expect(anchor.xOff).toBe(true);
    expect(anchor.yOff).toBe(false);
    anchor.setDimensions(300, 400);
    expect(anchor.width).toBe(300);
    expect(anchor.height).toBe(400);
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
    const anchor = new OneCellAnchor({ x: 2, y: 3, xOff: true, yOff: false, width: 50, height: 60 });
    const xml = anchor.toXML(xmlDoc as any, {});
    // Check structure
    expect(xml.nodeName).toBe('xdr:oneCellAnchor');
    expect(xml.children.length).toBeGreaterThan(0);
    // Restore Util.createElement
    Util.createElement = origCreateElement;
  });
});
