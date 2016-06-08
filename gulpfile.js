const gulp = require('gulp');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('default', () => {
	gulp.src('src/drag.js')
				.pipe(babel({
					presets: ['es2015']
				}))
				.pipe(uglify())
				.pipe(rename({
					suffix: '.min'
				}))
				.pipe(gulp.dest('dist'));
	gulp.src('demo.js')
				.pipe(babel({
					presets: ['es2015']
				}))
				.pipe(uglify())
				.pipe(rename({
					suffix: '.min'
				}))
				.pipe(gulp.dest('./'));
	return;
});