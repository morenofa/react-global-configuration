"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _configuration = require("./configuration");

var _default = {
  get: _configuration.get,
  set: _configuration.set,
  serialize: _configuration.serialize,
  setEnvironment: _configuration.setEnvironment
};
exports["default"] = _default;