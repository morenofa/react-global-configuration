'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _configuration = require('./configuration');

var _clear = require('./clear');

var _clear2 = _interopRequireDefault(_clear);

exports['default'] = {
	get: _configuration.get,
	set: _configuration.set,
	clear: _clear2['default']
};
module.exports = exports['default'];