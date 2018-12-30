import { assert } from 'chai';
import { placeTypes, placeStyles, placeCSS } from './index.js';

describe('placeTypes', function() {
  it('should return the correct types of data', function() {
    assert.typeOf(placeTypes, 'Object');
    assert.typeOf(placeTypes.any, 'function');
    assert.typeOf(placeTypes.except, 'function');
    assert.typeOf(placeTypes.except(['grid']), 'function');
  });
});

describe('placeStyles', function() {
  it('merge display', function() {
    assert.strictEqual(
      placeStyles({ displayOutside: 'inline' }, { displayOutside: 'block' })
        .display,
      'block inline'
    );

    assert.strictEqual(
      placeStyles({ displayOutside: 'inline' }, { displayInside: 'flex' })
        .display,
      'flex inline'
    );
  });
});
