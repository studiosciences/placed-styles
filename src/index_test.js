import chai from 'chai';
import { placeTypes, placeStyles, placeCSS } from './index.js';

var assert = chai.assert;

assert.typeOf(placeTypes, 'Object');
assert.typeOf(placeTypes.any, 'function');
assert.typeOf(placeTypes.except, 'function');
assert.typeOf(placeTypes.except(['grid']), 'function');
