import { htmlEscape } from '../utilities/escape.js';

type XMLNodeOption = {
  attributes?: {
    [key: string]: any;
  };
  children?: XMLNode[];
  nodeName: string;
  nodeValue?: string;
  type?: string;
};

// Block markup delimiters; this is not a full XML Name grammar check.
function assertSafeXMLName(name: string) {
  if (!name || /[ <>&"'=/\p{Cc}]/u.test(name)) {
    throw new Error(`Unsafe XML name: ${name}`);
  }
}

export class XMLDOM {
  static readonly declaration = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
  documentElement: XMLNode;

  /** Creates a lightweight XML document with a namespaced root element. */
  constructor(ns: string | null, rootNodeName: string) {
    this.documentElement = this.createElement(rootNodeName);
    this.documentElement.setAttribute('xmlns', ns);
  }

  /** Creates an empty element node in this document. */
  createElement(name: string) {
    return new XMLNode({
      nodeName: name,
    });
  }

  /** Creates a text node that will be escaped when serialized. */
  createTextNode(text: string) {
    return new TextNode(text);
  }

  /** Serializes the document root and its descendants to XML. */
  toString() {
    return this.documentElement.toString();
  }

  static Node = {
    Create: (config: any) => {
      switch (config.type) {
        case 'XML':
          return new XMLNode(config);
        case 'TEXT':
          return new TextNode(config.nodeValue);
        default:
          return null;
      }
    },
  };
}

class TextNode {
  nodeValue: any;

  constructor(text: string) {
    this.nodeValue = text;
  }

  toJSON() {
    return {
      nodeValue: this.nodeValue,
      type: 'TEXT',
    };
  }

  toString() {
    return htmlEscape(this.nodeValue);
  }
}

export class XMLNode {
  readonly nodeName: string;
  readonly children: XMLNode[];
  nodeValue: string;
  attributes: { [key: string]: any };
  firstChild?: XMLNode;

  /** Creates an XML element from its name, attributes, and child nodes. */
  constructor(config: XMLNodeOption) {
    this.nodeName = config.nodeName;
    this.children = [];
    this.nodeValue = config.nodeValue || '';
    this.attributes = {};

    if (config.children) {
      for (let i = 0, l = config.children.length; i < l; i++) {
        this.appendChild(XMLDOM.Node.Create(config.children[i]));
      }
    }

    if (config.attributes) {
      for (const [attr, value] of Object.entries(config.attributes)) {
        this.setAttribute(attr, value);
      }
    }
  }

  /** Serializes this element, its attributes, and children to XML. */
  toString() {
    assertSafeXMLName(this.nodeName);
    let string = `<${this.nodeName}`;
    for (const attr in this.attributes) {
      if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
        assertSafeXMLName(attr);
        string = `${string} ${attr}="${htmlEscape(this.attributes[attr])}"`;
      }
    }

    let childContent = '';
    for (let i = 0, l = this.children.length; i < l; i++) {
      childContent += this.children[i].toString();
    }

    if (childContent) {
      string += `>${childContent}</${this.nodeName}>`;
    } else {
      string += '/>';
    }

    return string;
  }

  /** Converts this node and its descendants to the serializable node format. */
  toJSON() {
    const children: any[] = [];
    for (let i = 0, l = this.children.length; i < l; i++) {
      children.push(this.children[i].toJSON());
    }
    return {
      nodeName: this.nodeName,
      children: children,
      nodeValue: this.nodeValue,
      attributes: this.attributes,
      type: 'XML',
    };
  }

  /** Sets an attribute, or removes it when the value is `null`. */
  setAttribute(name: string, val: any) {
    if (name in this && !Object.prototype.hasOwnProperty.call(this.attributes, name)) {
      throw new Error(`Reserved XML attribute: ${name}`);
    }
    if (val === null) {
      delete this.attributes[name];
      delete (this as any)[name];
      return;
    }
    this.attributes[name] = val;
    (this as any)[name] = val;
  }

  /** Appends a child node and updates the first-child reference. */
  appendChild(child: any) {
    this.children.push(child);
    this.firstChild = this.children[0];
  }

  /** Creates a copy of this node and its descendants. */
  cloneNode(_deep?: boolean) {
    return new XMLNode(this.toJSON());
  }
}
