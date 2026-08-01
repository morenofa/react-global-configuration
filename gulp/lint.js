/**
 * Gulp Task: lint
 * Purpose: lint all the js
 */

import gulp from 'gulp';
import eslint from 'gulp-eslint-new';
import debug from 'gulp-debug';

gulp.task('lint', () => {
    return (
        gulp
            .src([ 'test/**/*', 'lib/**/*', 'gulp/**/*', 'gulpfile.js' ])
            .pipe(debug({ title: 'TEST' }))
            .pipe(eslint())
            .pipe(eslint.failOnError())
    );
});
