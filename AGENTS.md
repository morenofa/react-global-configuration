# Agent Instructions

## Package Manager
- Use npm. Install with `npm install`; CI does not use `npm ci`.
- `package-lock.json` is ignored and is not a repository source of truth. Do not commit it.

## Commands
| Task | Command |
| --- | --- |
| Build | `npm run build` |
| Lint source, tests, and Gulp tasks | `npm run lint` |
| Build and run the full suite | `npm test` |
| Run one test | `npm run build && NODE_ENV=test ./node_modules/.bin/nyc ./node_modules/.bin/mocha test/index.test.js --grep "<test name>"` |
| Test ES-module source directly | `NODE_ENV=test ./node_modules/.bin/mocha --require @babel/register test/index.test.js --lib` |

## Source And Generated Output
- Edit `lib/`; `package.json#main` points consumers at the Babel-generated `build/index.js`.
- `build/` is tracked release output. Regenerate it with `npm run build`; never edit it by hand.
- Tests load `build/` by default. The nonstandard `--lib` flag switches `test/index.test.js` to `lib/`.
- `gulp/build.js` strips debug/console calls from generated output, so verify behavior against `build/` before release.

## Test Isolation
- Configuration is module-scoped and normally frozen after the first `set`. Tests must call the `reset` entrypoint after cases that load configuration; it clears the CommonJS cache for `configuration.js` and `index.js`.

## Commit Attribution
- AI commits must include `Co-Authored-By: <agent name and attribution byline>`.
