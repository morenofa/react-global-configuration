"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.get = get;
exports.serialize = serialize;
exports.setEnvironment = setEnvironment;

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _deepFreeze = _interopRequireDefault(require("deep-freeze"));

var _serializeJavascript = _interopRequireDefault(require("serialize-javascript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var configuration = null;
var setOptions = {};
var currentEnvironment = null;
var validOptions = ['freeze', 'assign', 'environment'];
var booleanOptions = ['freeze', 'assign'];
var stringOptions = ['environment'];
var persistentOptions = ['freeze'];
var debugEnv = ['development', 'test'];

function set(newConfiguration) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (configuration && setOptions.freeze !== false) {
    throw new Error('react-global-configuration - Configuration is already set, the initial call should have \'freeze\' set to false to allow for this behaviour (e.g. in testing');
  }

  if (configuration == null) {
    configuration = {};
  }

  if (options) {
    for (var option in options) {
      //Check if is a valid option
      if (validOptions.indexOf(option) !== -1) {
        //Check value of option
        var value = options[option];

        if (stringOptions.indexOf(option) !== -1 && typeof value !== 'string') {
          throw new Error("react-global-configuration - Unexpected value type for ".concat(option, " : ").concat(_typeof(value), ", string expected"));
        }

        if (booleanOptions.indexOf(option) !== -1 && typeof value !== 'boolean') {
          throw new Error("react-global-configuration - Unexpected value type for ".concat(option, " : ").concat(_typeof(value), ", boolean expected"));
        }

        if (persistentOptions.indexOf(option) !== -1) {
          setOptions[option] = value;
        }
      } else {
        throw new Error("react-global-configuration - Unrecognised option '".concat(option, "' passed to set"));
      }
    }
  }

  var env = options.environment !== undefined ? options.environment : 'global';

  if (options.assign) {
    configuration[env] = (0, _objectAssign["default"])(getEnvironmentConfiguration(env), newConfiguration);
  } else {
    configuration[env] = newConfiguration;
  }

  if (setOptions.freeze !== false && Object.freeze && Object.getOwnPropertyNames) {
    configuration = (0, _deepFreeze["default"])(configuration);
  } else if (!Object.freeze || !Object.getOwnPropertyNames) {
    sayWarning('react-global-configuration - Could not call freeze as native functions arent\'t available');
  }
}

function get(key) {
  var fallbackValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!configuration) {
    sayWarning('react-global-configuration - Configuration has not been set.');
  }

  var value = fetchFromObject(getEnvironmentConfiguration(), key);

  if (currentEnvironment) {
    var config = getEnvironmentConfiguration(currentEnvironment);
    var envValue = fetchFromObject(config !== null ? config : {}, key);
    value = envValue !== undefined ? envValue : value;
  } //Fix to return null values


  if (value !== undefined) {
    return value;
  }

  if (key !== undefined) {
    value = fallbackValue;
  } else {
    sayWarning("react-global-configuration - There is no value with the key: ".concat(key));
    value = getEnvironmentConfiguration();
  }

  return value;
}

function serialize(env) {
  var configuration = getEnvironmentConfiguration(env);
  return (0, _serializeJavascript["default"])(configuration);
}

function setEnvironment(env) {
  if (env === undefined) {
    throw new Error('react-global-configuration - You have to define an environment');
  }

  if (env !== null && typeof env !== 'string') {
    throw new Error('react-global-configuration - Unexpected environment value, null or string expected');
  }

  return currentEnvironment = env;
}
/* **************************** */

/* Helpers
/* **************************** */


function getEnvironmentConfiguration(env) {
  env = env !== undefined ? env : 'global';
  return configuration && configuration[env] !== undefined ? configuration[env] : null;
}

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
  if (debugEnv.indexOf(process.env.NODE_ENV)) {
    void 0;
  }
}