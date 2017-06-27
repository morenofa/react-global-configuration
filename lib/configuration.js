import objectAssign from 'object-assign';
import deepFreeze from 'deep-freeze';
import serializeJs from 'serialize-javascript';


let configuration = null;
let setOptions = {};
const validOptions = [ 'freeze', 'assign' ];
const persistentOptions = [ 'freeze' ];

export function set(newConfiguration, newOptions = {}) {

    if (configuration && setOptions.freeze !== false) {
        throw new Error('react-global-configuration - Configuration is already set, the initial call should have \'freeze\' set to false to allow for this behaviour (e.g. in testing');
    }

    if (newOptions) {
        for (let newOption in newOptions) {
            //Check if is a valid option
            if (!validOptions.indexOf(newOptions)) {
                throw new Error(`react-global-configuration - Unrecognised option '${newOption}' passed to set`);
            } else {
                //Check value of option
                const value = newOptions[ newOption ];
                if (typeof value !== 'boolean') {
					throw new Error(`react-global-configuration - Unexpected value type for ${newOption} : ${(typeof value)}, boolean expected`);
                }

                if (persistentOptions.indexOf(newOption) !== -1) {
                    setOptions[ newOption ] = value;
                }
            }
        }
    }

    if (newOptions.assign) {
        configuration = objectAssign(configuration, newConfiguration);
    } else {
        configuration = newConfiguration;
    }

    if (setOptions.freeze !== false && Object.freeze && Object.getOwnPropertyNames) {
        configuration = deepFreeze(configuration);
    } else if (!Object.freeze || !Object.getOwnPropertyNames) {
        sayWarning('react-global-configuration - Could not call freeze as native functions arent\'t available');
    }
}

export function get(key, fallbackValue) {
	if (!configuration) {
		sayWarning('react-global-configuration - Configuration has not been set.');
	}

	if (fallbackValue === undefined) {
        fallbackValue = null;
    }

	let value = configuration[key];

	//Fix to return null values
	if (value !== undefined) {
        return value;
    }

    if (key !== undefined) {
        value = fallbackValue;
    } else {
        sayWarning(`react-global-configuration - There is no value with the key: ${key}`);

        value = configuration;
    }

	return value;
}

export function serialize() {
    return serializeJs(configuration);
}

/* **************************** */
/* Helpers
/* **************************** */

function sayWarning(text) {
	if (process.env.NODE_ENV === 'development') {
		console.warn(text);
	}
}