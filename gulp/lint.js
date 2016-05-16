/**
 * Gulp Task: lint
 * Purpose: lint all the js
 */

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import debug from 'gulp-debug';

gulp.task('lint', () => {
    return (
        gulp
            .src([ 'test/**/*', 'lib/**/*', 'gulp/**/*' ])
            .pipe(debug({ title: 'TEST' }))
            .pipe(eslint())
            .pipe(eslint.failOnError())
    );
});
