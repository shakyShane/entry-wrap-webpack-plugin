var assert = require('assert');
var fs = require('fs');
var bundle = fs.readFileSync('./dist/bundle.js', 'utf8');
assert.equal(bundle.indexOf('require(["jquery"], function (jQuery) {'), 0);
assert.equal(bundle.length-2, bundle.lastIndexOf('})'));
