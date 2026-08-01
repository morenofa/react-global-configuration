# Change Log

## [v1.4.2](https://github.com/morenofa/react-global-configuration/tree/v1.4.2) (2026-08-01)
[Full Changelog](https://github.com/morenofa/react-global-configuration/compare/v1.4.1...v1.4.2)

**Implemented enhancements:**

- Added Node.js 22.23.2 development configuration and declared Node.js 22 as the minimum supported runtime.
- Replaced Travis CI with GitHub Actions, including automated linting, tests, coverage uploads to Codecov, and updated action runtimes.
- Updated Babel, Gulp, Mocha, NYC, Chai, Cross-env, and `serialize-javascript` dependencies.
- Migrated linting to ESLint 9 with a flat configuration while preserving the existing Gulp scripts.
- Replaced the unmaintained `deep-freeze` dependency with an internal circular-reference-safe deep freeze implementation.
- Removed the `yargs` test-only dependency in favor of native argument parsing.
- Added regression tests for deep freezing, disabled freezing, and circular configurations.

## [v1.4.1](https://github.com/morenofa/react-global-configuration/tree/v1.4.1) (2020-12-13)
[Full Changelog](https://github.com/morenofa/react-global-configuration/compare/v1.4.0...v1.4.1)

**Fixed bugs:**

- Fixed vulnerability with `serialize-javascript` package

## [v1.4.0](https://github.com/morenofa/react-global-configuration/tree/v1.4.0) (2019-10-02)
[Full Changelog](https://github.com/morenofa/react-global-configuration/compare/v1.3.0...v1.4.0)

**Implemented enhancements:**

- Added functionality to handle configurations per environment.
- Update dependencies.
- Add coverage report.

## [v1.3.0](https://github.com/morenofa/react-global-configuration/tree/v1.3.0) (2018-08-14)
[Full Changelog](https://github.com/morenofa/react-global-configuration/compare/v1.2.1...v1.3.0)

**Implemented enhancements:**

- Added functionality to get objects/arrays.
- Added functionality to get nested object/array value.

## [v1.2.1](https://github.com/morenofa/react-global-configuration/tree/v1.2.1) (2018-01-22)
[Full Changelog](https://github.com/morenofa/react-global-configuration/compare/v1.2.0...v1.2.1)

**Implemented enhancements:**

- Update Travis-CI

## [v1.2.0](https://github.com/morenofa/react-global-configuration/tree/v1.2.0) (2017-07-04)
[Full Changelog](https://github.com/morenofa/react-global-configuration/compare/v1.1.1...v1.2.0)

**Implemented enhancements:**

- Added serialize function to pass data easily configuration to client side.

## [v1.1.0](https://github.com/morenofa/react-global-configuration/tree/v1.1.0) (2017-05-31)
[Full Changelog](https://github.com/morenofa/react-global-configuration/compare/v1.0.1...v1.1.0)

**Implemented enhancements:**

- Added default values if the setting with the specified key don't exist.


## [v1.0.2](https://github.com/morenofa/react-global-configuration/tree/v1.0.2) (2017-05-22)
[Full Changelog](https://github.com/morenofa/react-global-configuration/compare/v1.0.1...v1.0.2)

**Fixed bugs:**

- False configuration values don't work [\#1](https://github.com/morenofa/react-global-configuration/issues/1) ([kennu](https://github.com/kennu))

**Closed issues:**

- When setting more than one configuration value the second one gets an object [\#2](https://github.com/morenofa/react-global-configuration/issues/2)
