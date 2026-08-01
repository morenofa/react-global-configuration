const globals = require('globals');

module.exports = [
    {
        ignores: [
            'build/**',
            'coverage/**',
            'node_modules/**'
        ]
    },
    {
        files: [
            'gulp/**/*.js',
            'gulpfile.js',
            'lib/**/*.js',
            'test/**/*.js'
        ],
        languageOptions: {
            ecmaVersion: 2015,
            sourceType: 'module',
            globals: {
                ...globals.mocha,
                ...globals.node
            }
        },
        rules: {
            quotes: [ 'error', 'single' ],
            complexity: [ 'warn', 6 ],
            'default-case': 'error',
            'no-else-return': 'error',
            'no-new': 'off',
            'no-self-compare': 'error',
            'no-void': 'error',
            radix: 'error',
            'wrap-iife': 'error',
            strict: 'error',
            'no-use-before-define': [ 'error', { functions: false } ],
            indent: [ 'error', 4 ],
            'consistent-this': [ 'error', 'self' ],
            'func-names': [ 'error', 'always' ],
            'func-style': [ 'warn', 'declaration' ],
            'no-multiple-empty-lines': [ 'warn', { max: 1, maxBOF: 0, maxEOF: 0 } ],
            'no-nested-ternary': 'error',
            'operator-assignment': [ 'error', 'always' ],
            'padded-blocks': [ 'error', 'never' ],
            'space-before-function-paren': [ 'error', 'never' ],
            'keyword-spacing': [ 'error', { before: true, after: true } ],
            'space-before-blocks': [ 'error', 'always' ],
            'array-bracket-spacing': [ 'error', 'always' ],
            'object-curly-spacing': [ 'error', 'always' ],
            'space-in-parens': [ 'error', 'never' ],
            'wrap-regex': 'error',
            'max-depth': [ 'warn', 4 ],
            'max-len': [ 'warn', { code: 120 } ],
            'max-params': [ 'warn', 4 ],
            'max-statements': [ 'warn', 12 ],
            'no-bitwise': 'error',
            'no-var': 'error'
        }
    }
];
