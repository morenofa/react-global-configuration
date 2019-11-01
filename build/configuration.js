'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.set = set;
exports.get = get;
exports.serialize = serialize;
exports.setEnvironment = setEnvironment;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var configuration = null;
var setOptions = {};
var currentEnvironment = null;
var validOptions = ['freeze', 'assign', 'environment'];
var booleanOptions = ['freeze', 'assign'];
var stringOptions = ['environment'];
var persistentOptions = ['freeze'];

function set(newConfiguration) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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
                    throw new Error('react-global-configuration - Unexpected value type for ' + option + ' : ' + typeof value + ', string expected');
                }

                if (booleanOptions.indexOf(option) !== -1 && typeof value !== 'boolean') {
                    throw new Error('react-global-configuration - Unexpected value type for ' + option + ' : ' + typeof value + ', boolean expected');
                }

                if (persistentOptions.indexOf(option) !== -1) {
                    setOptions[option] = value;
                }
            } else {
                throw new Error('react-global-configuration - Unrecognised option \'' + option + '\' passed to set');
            }
        }
    }

    var env = options.environment !== undefined ? options.environment : 'global';

    if (options.assign) {
        configuration[env] = (0, _objectAssign2['default'])(getEnvironmentConfiguration(env), newConfiguration);
    } else {
        configuration[env] = newConfiguration;
    }

    if (setOptions.freeze !== false && Object.freeze && Object.getOwnPropertyNames) {
        configuration = (0, _deepFreeze2['default'])(configuration);
    } else if (!Object.freeze || !Object.getOwnPropertyNames) {
        sayWarning('react-global-configuration - Could not call freeze as native functions arent\'t available');
    }
}

function get(key) {
    var fallbackValue = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    if (!configuration) {
        sayWarning('react-global-configuration - Configuration has not been set.');
    }

    var value = fetchFromObject(getEnvironmentConfiguration(), key);

    if (currentEnvironment) {
        var config = getEnvironmentConfiguration(currentEnvironment);
        var envValue = fetchFromObject(config !== null ? config : {}, key);

        value = envValue !== undefined ? envValue : value;
    }

    //Fix to return null values
    if (value !== undefined) {
        return value;
    }

    if (key !== undefined) {
        value = fallbackValue;
    } else {
        sayWarning('react-global-configuration - There is no value with the key: ' + key);

        value = getEnvironmentConfiguration();
    }

    return value;
}

function serialize(env) {
    var configuration = getEnvironmentConfiguration(env);

    return (0, _serializeJavascript2['default'])(configuration);
}

function setEnvironment(env) {
    return currentEnvironment = env;
}

/* **************************** */
/* Helpers
/* **************************** */

function getEnvironmentConfiguration(env) {
    env = env !== undefined ? env : 'global';

    return configuration && configuration[env] !== undefined ? configuration[env] : null;
}

function fetchFromObject(_x3, _x4) {
    var _again = true;

    _function: while (_again) {
        var obj = _x3,
            key = _x4;
        _again = false;

        key = key !== undefined ? key : '';

        if (typeof obj === 'undefined') {
            return undefined;
        }

        var index = key.indexOf('.');

        if (index > -1) {
            _x3 = obj[key.substring(0, index)];
            _x4 = key.substr(index + 1);
            _again = true;
            index = undefined;
            continue _function;
        }

        return obj[key];
    }
}

function sayWarning(text) {
    if (process.env.NODE_ENV === 'development') {
        void 0;
    }
}