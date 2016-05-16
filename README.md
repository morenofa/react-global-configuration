# React global configuration

## Purpose

Provide what is essentially an explicitly set of frozen global variables which can then be required by any module that needs them.

This can be preferable to having to pass any configuration all the way through your node application, or put your configuration inside state of component. This method is  usually better than setting global variables.


## Installation

```bash
$ npm install react-global-configuration
```

## API

__set( configuration [, options] )__

```es6
import config from 'react-global-configuration';
config.set({ foo: 'bar' });
```

- __configuration__ whatever you want to be made available when subsequently importing / requiring get function `react-global-configuration`.
- __options__ object optionally containing the following
    - __options.freeze__ _default: true_ - used to prevent the [freezing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) of the configuration object.
    - __options.assign__ _default: false_ - causes the passed configuration object to have its properties [assigned](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to the existing configuration, rather than replacing it.

__get( [key] )__

```es6
import config from 'react-global-configuration';
config.get('foo');
```

- __key__ key to the setting you want to recover. If you do not put this key you recover all settings

__clear()__

```es6
import config from 'react-global-configuration';
config.clear();
```

This is a testing utility that removes the existing configuration from the require cache. By calling this, calling `config.set(configuration)` and then re-requiring any target file, that target file will then be returned from require with the new `configuration` applied.

## Example Usage

### Server Side

__server.js (initiation of server side process)__
```es6
import config from 'react-global-configuration';


import MyApplication from './app';

config.set({ foo: 'bar' });

new MyApplication();
```

### Client Side

__client.js__ (initiation of client side js, assume compiled via browserify / webpack / similar)
````js
import React from 'react';
import App from './app';
import config from 'react-global-configuration';


(function clientJS() {
    config(window.__INITIAL_CONFIG__);
    React.render(<App/>, document);
}());
````

### React 

__component.js__ (somewhere inside the client side app)
````js
import React from 'react';
import configuration from 'react-global-configuration';

const Component = React.createClass({
    render: function render() {
        return (
            <div>{ configuration.get('foo') }</div>
        );
    }
});

export default Component;
````

### Testing

__gulp/test.js__
````js
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import config from 'react-global-configuration';

config.set({ foo: 'baz' }, { freeze: false });

gulp.task('test', function gulpTest() {
    return (
        gulp
            .src([ 'app/**.test.*' ], { read: false })
            .pipe(mocha())
    );
});
````

__appLogic.test.js__
````js
import clear from 'react-global-configuration/clear';
import assert from 'assert';

describe('appLogic', () => {
    it('should return foo from configuration', () => {
        import config from 'react-global-configuration';
    
        const foos = [ 'alpha', 'beta', 'gamma' ];
        foos.forEach((foo) => {
            // This only works because `freeze: false` was set the first time set was called (in gulp/test.js).
            config.set({ foo: foo });
            const appLogic = require('./appLogic');
            assert(appLogic() === foo);
        });
    });

    afterEach(() => {
        clear();
    });
});
````

## License

<a rel="license" href="https://opensource.org/licenses/MIT">MIT</a>