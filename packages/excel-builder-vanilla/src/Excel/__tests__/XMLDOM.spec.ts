import { describe, expect, it } from 'vitest';

import { XMLDOM, XMLNode } from '../XMLDOM.js';

describe('basic DOM simulator for web workers', () => {
  describe('XMLDOM', () => {
    const nodeName = 'arbitraryNodeName';
    const ns = 'arbitraryNS';
    it('has a documentElement', () => {
      const d = new XMLDOM(ns, nodeName);
      expect(d.documentElement).toBeTruthy();
    });

    it('will have a properly named root node', () => {
      const d = new XMLDOM(ns, nodeName);
      expect(d.documentElement.nodeName).toEqual(nodeName);
    });

    it('will have the correct namespace', () => {
      const d = new XMLDOM(ns, nodeName);
      expect((d.documentElement as any).xmlns).toEqual(ns);
    });

    it('will have the appropriate content', () => {
      const d = new XMLDOM(ns, nodeName);

      const foo = d.createElement('foo');
      foo.setAttribute('france', 'silly');
      foo.setAttribute('britain', 'port');
      const bar = d.createElement('bar');
      bar.setAttribute('georgia', 'peaches');
      const baz = d.createElement('baz');
      foo.appendChild(bar);
      d.documentElement.appendChild(foo);
      d.documentElement.appendChild(baz);

      expect(d.toString()).toEqual(
        '<arbitraryNodeName xmlns="arbitraryNS"><foo france="silly" britain="port"><bar georgia="peaches"/></foo><baz/></arbitraryNodeName>',
      );
    });

    it('returns null for unknown type in XMLDOM.Node.Create', () => {
      const result = XMLDOM.Node.Create({ type: 'UNKNOWN' });
      expect(result).toBeNull();
    });

    it('restores attributes when cloning XML nodes', () => {
      const node = XMLDOM.Node.Create({ type: 'XML', nodeName: 'item', attributes: { id: 'sample' } });
      expect(node?.toString()).toBe('<item id="sample"/>');
    });

    it('rejects markup in element and attribute names at serialization', () => {
      const doc = new XMLDOM(ns, nodeName);
      expect(() => doc.createElement('item/><evil').toString()).toThrow('Unsafe XML name');
      const node = doc.createElement('item');
      node.setAttribute('id"/><evil name', 'injected');
      expect(() => node.toString()).toThrow('Unsafe XML name');
      node.attributes = { 'direct injection="': 'value' };
      expect(() => node.toString()).toThrow('Unsafe XML name');
      expect(() => doc.createElement('').toString()).toThrow('Unsafe XML name');
    });

    it.each(['__proto__', 'constructor', 'attributes', 'nodeName', 'toString', 'children', 'appendChild'])(
      'rejects attribute %s before it can overwrite node internals',
      name => {
        const node = new XMLNode({ nodeName: 'item' });
        expect(() => node.setAttribute(name, { polluted: true })).toThrow('Reserved XML attribute');
        expect(() => node.setAttribute(name, null)).toThrow('Reserved XML attribute');
        expect(Object.getPrototypeOf(node)).toBe(XMLNode.prototype);
        expect(Object.getPrototypeOf(node.attributes)).toBe(Object.prototype);
        expect(node.toString()).toBe('<item/>');
      },
    );

    it('preserves Unicode names, namespaced attributes, and attribute aliases', () => {
      const node = new XMLNode({ nodeName: 'étiquette' });
      node.setAttribute('r:id', 'one');
      node.setAttribute('r:id', 'two');
      expect((node as any)['r:id']).toBe('two');
      expect(node.toString()).toBe('<étiquette r:id="two"/>');
      node.setAttribute('r:id', null);
      expect((node as any)['r:id']).toBeUndefined();
      expect(node.toString()).toBe('<étiquette/>');
    });
  });

  describe('XMLDOM.XMLNode', () => {
    const nodeName = 'arbitraryNodeName';
    const ns = 'arbitraryNS';

    it('will clone properly', () => {
      const d = new XMLDOM(ns, nodeName);
      const foo = d.createElement('foo');
      const bar = d.createElement('bar');

      foo.appendChild(bar);

      const baz = foo.cloneNode(true);
      bar.setAttribute('joy', true);

      expect((baz as any).joy).toEqual(undefined);
    });
  });
});
