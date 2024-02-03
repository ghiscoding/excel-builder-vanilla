import { describe, expect, it } from 'vitest';
import { XMLDOM } from '../XMLDOM';

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
