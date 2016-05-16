'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = reset;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function reset() {
    if (require && require.cache) {
        delete require.cache[_path2['default'].join(__dirname, 'configuration.js')];
        delete require.cache[_path2['default'].join(__dirname, 'index.js')];
    } else {
        void 0;
    }
}

module.exports = exports['default'];