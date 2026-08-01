"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reset;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function reset() {
  if (require && require.cache) {
    delete require.cache[_path["default"].join(__dirname, 'configuration.js')];
    delete require.cache[_path["default"].join(__dirname, 'index.js')];
  } else {
    void 0;
  }
}