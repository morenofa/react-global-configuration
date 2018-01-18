'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _configuration = require('./configuration');

exports['default'] = {
	get: _configuration.get,
	set: _configuration.set,
	serialize: _configuration.serialize
};
module.exports = exports['default'];