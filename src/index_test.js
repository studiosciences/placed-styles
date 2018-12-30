import chai from 'chai';
import { placeTypes, placeStyles, placeCSS } from './index.js';

var assert = chai.assert;

describe('placeTypes', function() {
  it('should return the correct types of data', function() {
    assert.typeOf(placeTypes, 'Object');
    assert.typeOf(placeTypes.any, 'function');
    assert.typeOf(placeTypes.except, 'function');
    assert.typeOf(placeTypes.except(['grid']), 'function');
  });
});
