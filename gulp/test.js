/**
 * Gulp Task: test
 * Purpose: run all the tests
 */

import gulp from 'gulp';
import mocha from 'gulp-mocha';
import debug from 'gulp-debug';

gulp.task('test', () => {
    return (
        gulp
            .src([ 'test/**/*.test.*' ])
            .pipe(debug({ title: 'TEST' }))
            .pipe(mocha())
    );
});
