const CONTINUE_RATIO: number = 0.5;

interface Continuable {
  options: Array<Continuable>;
  hasNext: (ratio: number) => boolean;
  next: (ratio: number) => Continuable;
}

export class Base implements Continuable {
  public options: Array<Continuable>;
  constructor(continueableArray: Array<Continuable>) {
    this.options = continueableArray;
  }

  hasNext(ratio: number): boolean {
     return (this.options.length > 0 && ratio >= CONTINUE_RATIO);
  }

  next(ratio: number): Continuable {
    return randomFunc<Continuable>(...this.options)(ratio);
  }
}

export class WordType extends Base {
  private _name: String;

  constructor(name: String, items: Array<Continuable>) {
    super(items);
    this._name = name;
  }

  get name(): String {
    return this._name;
  }
}

export function randomFunc<T>(...items: Array<T>): Function {
  return (ratio: number) : T => {
    return items[Math.floor(ratio * items.length)];
  };
};
