/**
 * Gulp Task: test
 * Purpose: run all the tests
 */

import gulp from 'gulp';
import shell from "gulp-shell";

gulp.task('test', shell.task([
    'cross-env NODE_ENV=test nyc mocha test/**/*.test.*',
]));
