/**
 * Gulp Task: build
 * Purpose: compile all the es6 into exports that don't require a transform
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import debug from 'gulp-debug';
import stripDebug from 'gulp-strip-debug';

gulp.task('build', () => {
    return (
        gulp
            .src([ 'lib/**/*.*' ])
            .pipe(debug({ title: 'BUILD' }))
            .pipe(babel())
            .pipe(stripDebug())
            .pipe(gulp.dest('build'))
    );
});
