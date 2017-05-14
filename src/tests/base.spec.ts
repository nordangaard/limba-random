import { randomFunc, Base, WordType } from '../lib/base';


describe('main method', () => {

  describe('RandomFunction', () => {
    let randFunc: Function;
    beforeEach(() => {
      randFunc = randomFunc(1,2,3);
    });

    it('Returns the correct type', () => {
      const loadedRandFn = randFunc;
      expect(typeof loadedRandFn).toBe('function');
    });

    it('Returns the correct array-element', () => {
      const result = randFunc(0.4);
      expect(result).toBe(2);
    });

  });

  describe('BaseClass', () => {
    let base: Base;
    beforeEach(() => {
      base = new Base([]);
    });

    it('hasNext(): Returns false on ratio being sub-50', () => {
      base = new Base([
        new Base([])
      ]);

      expect(base.hasNext(0.49)).toBe(false);
    });

    it('hasNext(): Returns false on no items', () => {
      expect(base.hasNext(0.55)).toBe(false);
    });

    it('hasNext(): Returns true on having items and ratio >= 0.5', () => {
      base = new Base([
        new Base([])
      ]);

      expect(base.hasNext(0.55)).toBe(true);
    });

    it('next(): Returns the right random continuable based on ratio', () => {
      const type = new Base([]);
      const secondType = new Base([]);
      base = new Base([type, secondType]);

      expect(base.next(0.4)).toBe(type);
    });

  });

  describe('WordTypeClass', () => {
    let wordType: WordType;
    const props = ['options', '_name'];

    beforeEach(() => {
      wordType = new WordType('Noun', []);
    });

    it('is an instance of base', () => {
      expect(wordType).toBeInstanceOf(Base);
    });

    it('has the correct properties / methods', () => {
      props.forEach(val => {
        expect(wordType).toHaveProperty(val);
      });
    });

    it('has the correct name set', () => {
      expect(wordType.name).toEqual('Noun');
    });

    it('to have no additional words', () => {
      expect(wordType.hasNext(0.5)).toEqual(false);
    });

    describe('WithChildren', () => {
      let typeWithChildren: WordType;

      beforeEach(() => {
        typeWithChildren = new WordType('Verb', [
          new WordType('Noun', [])
        ]);
      });

      it('to have an additional word', () => {
        expect(typeWithChildren.hasNext(0.5)).toEqual(true);
      });

      it('to not have additionals if ratio is sub 0.5', () => {
        expect(typeWithChildren.hasNext(0.49)).toEqual(false);
      });

      it('to have an additional word with correct', () => {
        const child = typeWithChildren.next(0.5);
        expect(child).toBeInstanceOf(WordType);
      });

    });

  });
  
});


