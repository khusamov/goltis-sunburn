
"use strict";

const gulp = require('gulp');
const jade = require('gulp-jade');
//const notify = require('gulp-notify');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const src = require('gulp-add-src');
const uglify = require('gulp-uglify');

gulp.task('default', ['watch', 'browserSync']);

/**
 * Специальные задачи.
 */

gulp.task('watch', none => {
	gulp.watch('app/index.jade', ['index.jade']);
	gulp.watch('app/index.js', ['js']);
});

gulp.task('browserSync', none => {
	browserSync({
		server: {
			baseDir: "build"
		},
		port: 8080,
		open: true,
		notify: false
	});
});

/**
 * Прикладные задачи.
 */

gulp.task('index.jade', none => {
	return gulp.src('app/index.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('build'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('js', none => {
	return gulp.src('app/index.js')
		.pipe(babel({
			presets: ['es2016']
		}))
		.pipe(src.prepend('lib/jQuery-Timer-Plugin/jquery.timer.js'))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build'))
		.pipe(browserSync.reload({
			stream: true
		}));
});