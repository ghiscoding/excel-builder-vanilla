import { htmlEscape } from '../lodash-utils';

type XMLNodeOption = {
  attributes?: {
    [key: string]: any;
  };
  children?: XMLNode[];
  nodeName: string;
  nodeValue?: string;
  type?: string;
};

export class XMLDOM {
  documentElement: XMLNode;

  constructor(ns: string | null, rootNodeName: string) {
    this.documentElement = this.createElement(rootNodeName);
    this.documentElement.setAttribute('xmlns', ns);
  }

  createElement(name: string) {
    return new XMLNode({
      nodeName: name,
    });
  }

  createTextNode(text: string) {
    return new TextNode(text);
  }

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
  nodeName = '';
  children: XMLNode[];
  nodeValue: string;
  attributes: { [key: string]: any };
  firstChild?: XMLNode;

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
      for (const attr in config.attributes) {
        if (config.attributes.hasOwnProperty(attr)) {
          this.setAttribute(attr, config.attributes[attr]);
        }
      }
    }
  }

  toString() {
    let string = `<${this.nodeName}`;
    for (const attr in this.attributes) {
      if (this.attributes.hasOwnProperty(attr)) {
        string = `${string} ${attr}=\"${htmlEscape(this.attributes[attr])}\"`;
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

  setAttribute(name: string, val: any) {
    if (val === null) {
      delete this.attributes[name];
      delete (this as any)[name];
      return;
    }
    this.attributes[name] = val;
    (this as any)[name] = val;
  }

  appendChild(child: any) {
    this.children.push(child);
    this.firstChild = this.children[0];
  }

  cloneNode(_deep?: boolean) {
    return new XMLNode(this.toJSON());
  }
}
