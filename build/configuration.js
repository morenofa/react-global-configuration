'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.set = set;
exports.get = get;
exports.serialize = serialize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var configuration = null;
var setOptions = {};
var validOptions = ['freeze', 'assign'];
var persistentOptions = ['freeze'];

function set(newConfiguration) {
    var newOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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
                    throw new Error('react-global-configuration - Unexpected value type for ' + newOption + ' : ' + typeof value + ', boolean expected');
                }

                if (persistentOptions.indexOf(newOption) !== -1) {
                    setOptions[newOption] = value;
                }
            } else {
                throw new Error('react-global-configuration - Unrecognised option \'' + newOption + '\' passed to set');
            }
        }
    }

    if (newOptions.assign) {
        configuration = (0, _objectAssign2['default'])(configuration, newConfiguration);
    } else {
        configuration = newConfiguration;
    }

    if (setOptions.freeze !== false && Object.freeze && Object.getOwnPropertyNames) {
        configuration = (0, _deepFreeze2['default'])(configuration);
    } else if (!Object.freeze || !Object.getOwnPropertyNames) {
        sayWarning('react-global-configuration - Could not call freeze as native functions arent\'t available');
    }
}

function get(key, fallbackValue) {
    if (!configuration) {
        sayWarning('react-global-configuration - Configuration has not been set.');
    }

    if (fallbackValue === undefined) {
        fallbackValue = null;
    }

    var value = fetchFromObject(configuration, key);

    //Fix to return null values
    if (value !== undefined) {
        return value;
    }

    if (key !== undefined) {
        value = fallbackValue;
    } else {
        sayWarning('react-global-configuration - There is no value with the key: ' + key);

        value = configuration;
    }

    return value;
}

function serialize() {
    return (0, _serializeJavascript2['default'])(configuration);
}

/* **************************** */
/* Helpers
/* **************************** */

function fetchFromObject(_x2, _x3) {
    var _again = true;

    _function: while (_again) {
        var obj = _x2,
            key = _x3;
        _again = false;

        key = key !== undefined ? key : '';

        if (typeof obj === 'undefined') {
            return undefined;
        }

        var index = key.indexOf('.');

        if (index > -1) {
            _x2 = obj[key.substring(0, index)];
            _x3 = key.substr(index + 1);
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