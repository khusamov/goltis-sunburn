
"use strict";

const gulp = require('gulp');
const jade = require('gulp-jade');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const src = require('gulp-add-src');
const uglify = require('gulp-uglify');

gulp.task('default', ['build', 'watch', 'browserSync']);

/**
 * Специальные задачи.
 */

gulp.task('watch', none => {
	gulp.watch('app/index.jade', ['index.jade']);
	gulp.watch('app/index.js', ['js']);
	gulp.watch('app/sounds/*.*', ['sounds']);
	gulp.watch('app/css/*.*', ['css']);
});

gulp.task('browserSync', none => {
	browserSync({
		server: {
			baseDir: "www"
		},
		port: 8080,
		open: true,
		notify: false
	});
});

/**
 * Прикладные задачи.
 */

gulp.task('build', ['index.jade', 'js', 'sounds', 'css']);

gulp.task('index.jade', none => {
	return gulp.src('app/index.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('www'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('js', none => {
	return gulp.src('app/index.js')
		.pipe(babel({
			presets: ['es2016']
		}))
		.pipe(src.prepend([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/notifyjs/dist/notify.js',
			'lib/jQuery-Timer-Plugin/jquery.timer.js'
		]))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('www'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('sounds', none => {
	return gulp.src('app/sounds/*.*')
		.pipe(gulp.dest('www/sounds'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('css', none => {
	return gulp.src('app/css/*.*')
		.pipe(gulp.dest('www/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});