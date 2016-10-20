// @flow

type RectConfig = {
  top?: number,
  left?: number,
  width?: number,
  height?: number,
};

type Point = {
  x: number,
  y: number,
};

export class Rect {
  static get zero(): Rect {
    return new Rect();
  }

  top: number;
  left: number;
  width: number;
  height: number;

  constructor({top = 0, left = 0, width = 0, height = 0}: RectConfig = {}) {
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
  }

  get center(): Point {
    return {
      x: this.left + (this.width / 2),
      y: this.top + (this.height / 2),
    };
  }
}

export function getRectForNode(node: Element): Rect {
  if (!(node instanceof Element)) {
    return new Rect({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  const rect = node.getBoundingClientRect();

  return new Rect({
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  });
}
