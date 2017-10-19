// test
import test from 'ava';
import {alternativeValues, mainValues} from 'test/helpers/dataTypes';

// src
import * as utils from 'src/utils';

test('if areIterablesEqual returns false when objects are different sizes', (t) => {
  const objectA = new Map();
  const objectB = new Map().set('foo', 'bar');
  const comparator = (a, b) => {
    return a === b;
  };

  t.false(utils.areIterablesEqual(objectA, objectB, comparator));
});

test('if areIterablesEqual returns false when objects have different keys', (t) => {
  const objectA = new Map().set('foo', 'bar');
  const objectB = new Map().set('bar', 'baz');
  const comparator = (a, b) => {
    return a === b;
  };

  t.false(utils.areIterablesEqual(objectA, objectB, comparator));
});

test('if areIterablesEqual returns false when objects have different values', (t) => {
  const objectA = new Map().set('foo', 'bar');
  const objectB = new Map().set('foo', 'baz');
  const comparator = (a, b) => {
    return (
      a.length === b.length &&
      a.every((value, index) => {
        return b[index] === value;
      })
    );
  };

  t.false(utils.areIterablesEqual(objectA, objectB, comparator));
});

test('if areIterablesEqual returns true when objects have the same size, keys, and values', (t) => {
  const objectA = new Map().set('foo', 'bar');
  const objectB = new Map().set('foo', 'bar');
  const comparator = (a, b) => {
    return (
      a.length === b.length &&
      a.every((value, index) => {
        return b[index] === value;
      })
    );
  };

  t.true(utils.areIterablesEqual(objectA, objectB, comparator));
});

test('if createIsStrictlyEqual will return true when strictly equal, false otherwise', (t) => {
  Object.keys(mainValues).forEach((key) => {
    t[key !== 'nan'](utils.createIsStrictlyEqual()(mainValues[key], mainValues[key]), `${key} - true`);

    if (alternativeValues.hasOwnProperty(key)) {
      t.false(utils.createIsStrictlyEqual()(mainValues[key], alternativeValues[key]), `${key} - false`);
    }
  });
});

test('if toPairs will convert the map into {keys: [], values: []} pairs', (t) => {
  const map = new Map().set('foo', 'bar').set('bar', 'baz');

  const result = utils.toPairs(map);

  t.deepEqual(result, {
    keys: ['foo', 'bar'],
    values: ['bar', 'baz']
  });
});

test('if toPairs will convert the set into {keys: [], values: []} pairs', (t) => {
  const set = new Set().add('foo').add('bar');

  const result = utils.toPairs(set);

  t.deepEqual(result, {
    keys: ['foo', 'bar'],
    values: ['foo', 'bar']
  });
});
