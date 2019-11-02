"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.get = get;
exports.serialize = serialize;

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _deepFreeze = _interopRequireDefault(require("deep-freeze"));

var _serializeJavascript = _interopRequireDefault(require("serialize-javascript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var configuration = null;
var setOptions = {};
var validOptions = ['freeze', 'assign'];
var persistentOptions = ['freeze'];

function set(newConfiguration) {
  var newOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (configuration && setOptions.freeze !== false) {
    throw new Error('react-global-configuration - Configuration is already set, the initial call should have \'freeze\' set to false to allow for this behaviour (e.g. in testing');
  }

  if (newOptions) {
    for (var newOption in newOptions) {
      //Check if is a valid option
      if (validOptions.indexOf(newOption) !== -1) {
        //Check value of option
        var value = newOptions[newOption];

        if (typeof value !== 'boolean') {
          throw new Error("react-global-configuration - Unexpected value type for ".concat(newOption, " : ").concat(_typeof(value), ", boolean expected"));
        }

        if (persistentOptions.indexOf(newOption) !== -1) {
          setOptions[newOption] = value;
        }
      } else {
        throw new Error("react-global-configuration - Unrecognised option '".concat(newOption, "' passed to set"));
      }
    }
  }

  if (newOptions.assign) {
    configuration = (0, _objectAssign["default"])(configuration, newConfiguration);
  } else {
    configuration = newConfiguration;
  }

  if (setOptions.freeze !== false && Object.freeze && Object.getOwnPropertyNames) {
    configuration = (0, _deepFreeze["default"])(configuration);
  } else if (!Object.freeze || !Object.getOwnPropertyNames) {
    sayWarning('react-global-configuration - Could not call freeze as native functions arent\'t available');
  }
}

function get(key, fallbackValue) {
  if (!configuration) {
    throw new Error('react-global-configuration - Configuration has not been set.');
  }

  if (fallbackValue === undefined) {
    fallbackValue = null;
  }

  var value = fetchFromObject(configuration, key); //Fix to return null values

  if (value !== undefined) {
    return value;
  }

  if (key !== undefined) {
    value = fallbackValue;
  } else {
    sayWarning("react-global-configuration - There is no value with the key: ".concat(key));
    value = configuration;
  }

  return value;
}

function serialize() {
  return (0, _serializeJavascript["default"])(configuration);
}
/* **************************** */

/* Helpers
/* **************************** */


function fetchFromObject(obj, key) {
  key = key !== undefined ? key : '';

  if (typeof obj === 'undefined') {
    return undefined;
  }

  var index = key.indexOf('.');

  if (index > -1) {
    return fetchFromObject(obj[key.substring(0, index)], key.substr(index + 1));
  }

  return obj[key];
}

function sayWarning(text) {
  if (process.env.NODE_ENV === 'development') {
    void 0;
  }
}