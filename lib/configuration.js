import objectAssign from 'object-assign';
import deepFreeze from 'deep-freeze';
import serializeJs from 'serialize-javascript';


let configuration = null;
let setOptions = {};
let currentEnvironment = null;
const validOptions = [ 'freeze', 'assign', 'environment' ];
const booleanOptions = [ 'freeze', 'assign' ];
const stringOptions = [ 'environment' ];
const persistentOptions = [ 'freeze' ];
const debugEnv = ['development', 'test'];

export function set(newConfiguration, options = {}) {

    if (configuration && setOptions.freeze !== false) {
        throw new Error('react-global-configuration - Configuration is already set, the initial call should have \'freeze\' set to false to allow for this behaviour (e.g. in testing');
    }

    if (configuration == null) {
        configuration = {};
    }

    if (options) {
        for (let option in options) {
            //Check if is a valid option
            if (validOptions.indexOf(option) !== -1) {
                //Check value of option
                const value = options[option];

                if (stringOptions.indexOf(option) !== -1 && typeof value !== 'string') {
                    throw new Error(`react-global-configuration - Unexpected value type for ${option} : ${(typeof value)}, string expected`);
                }

                if (booleanOptions.indexOf(option) !== -1 && typeof value !== 'boolean') {
                    throw new Error(`react-global-configuration - Unexpected value type for ${option} : ${(typeof value)}, boolean expected`);
                }

                if (persistentOptions.indexOf(option) !== -1) {
                    setOptions[option] = value;
                }
            } else {
                throw new Error(`react-global-configuration - Unrecognised option '${option}' passed to set`);
            }
        }
    }

    const env = (options.environment !== undefined) ? options.environment : 'global';

    if (options.assign) {
        configuration[env] = objectAssign(getEnvironmentConfiguration(env), newConfiguration);
    } else {
        configuration[env] = newConfiguration;
    }

    if (setOptions.freeze !== false && Object.freeze && Object.getOwnPropertyNames) {
        configuration = deepFreeze(configuration);
    } else if (!Object.freeze || !Object.getOwnPropertyNames) {
        sayWarning('react-global-configuration - Could not call freeze as native functions arent\'t available');
    }
}

export function get(key, fallbackValue = null) {
	if (!configuration) {
        sayWarning('react-global-configuration - Configuration has not been set.');
	}

    let value = fetchFromObject(getEnvironmentConfiguration(), key);

    if (currentEnvironment) {
        const config = getEnvironmentConfiguration(currentEnvironment);
        const envValue = fetchFromObject((config !== null) ? config : {}, key);

        value = (envValue !== undefined) ? envValue : value;
    }

	//Fix to return null values
	if (value !== undefined) {
        return value;
    }

    if (key !== undefined) {
        value = fallbackValue;
    } else {
        sayWarning(`react-global-configuration - There is no value with the key: ${key}`);

        value = getEnvironmentConfiguration();
    }

	return value;
}

export function serialize(env) {
    const configuration = getEnvironmentConfiguration(env);

    return serializeJs(configuration);
}

export function setEnvironment(env) {
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
    env = (env !== undefined) ? env : 'global';

    return (configuration && configuration[env] !== undefined) ? configuration[env] : null;
}

function fetchFromObject(obj, key) {
    key = (key !== undefined) ? key : '';

    if(typeof obj === 'undefined') {
        return undefined;
    }

    let index = key.indexOf('.');

    if(index > -1) {
        return fetchFromObject(obj[key.substring(0, index)], key.substr(index + 1));
    }

    return obj[key];
}

function sayWarning(text) {
	if (debugEnv.indexOf(process.env.NODE_ENV)) {
		console.warn(text);
	}
}