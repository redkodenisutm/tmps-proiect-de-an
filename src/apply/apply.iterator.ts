import { Apply } from "@prisma/client";

interface IQuickApplyIterator {
  hasNext: () => boolean;
  first: () => Apply;
  next: () => Apply;
  each: (callback: (apply: Apply) => void) => void;
}

class QuickApplyIterator implements IQuickApplyIterator {
  private index: number;
  private elements: Apply[];

  constructor(elements: Apply[]) {
    this.elements = elements.filter((elem) => !elem.cvId);
    this.index = 0;
  }

  public hasNext() {
    return this.index < this.elements.length;
  }

  public first() {
    this.index = 0;
    return this.elements[this.index];
  }

  public next() {
    if (this.index < this.elements.length) {
      return this.elements[++this.index];
    } else {
      return null;
    }
  }

  public each(callback) {
    for (let i = this.first(); this.hasNext(); i = this.next()) {
      callback(i);
    }
  }
}

export default QuickApplyIterator;
