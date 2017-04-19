var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var runSequence = require('run-sequence')
var pug = require('gulp-pug2')


var path = {
	view: './src/pug/**/*.pug',
	style: './src/css/**/*.scss',
	script: './src/js/**/*.js'
}

gulp.task('pug', function () {
	return gulp.src('./src/pug/index.pug')
			.pipe(pug({ title: 'Wijmo & Vue2'}))
			.pipe(gulp.dest('./dist'))
})

gulp.task('script:vendor', function () {
	return gulp.src([
			//  Vue 2
			'src/js/vendors/vue.min.js',

			// Wijmo
			'src/js/vendors/wijmo.min.js',
			'src/js/vendors/wijmo.chart.min.js',
			'src/js/vendors/wijmo.grid.min.js',
			'src/js/vendors/wijmo.gauge.min.js',
			'src/js/vendors/wijmo.input.min.js',

			// Wijmo/Vue2 interop
			'src/js/vendors/wijmo.vue2.min.js'
		])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./dist/js'))
})

gulp.task('script:main', function () {
	return browserify({entries: './src/js/app.js', debug: true})
			.transform("babelify", { presets: ["es2015"] })
			.bundle()
			.pipe(source('app.js'))
			.pipe(gulp.dest('./dist/js'))
})

gulp.task('style', function () {
	return gulp.src('./src/css/app.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('./dist/css'))
})

gulp.task('build', function (callback) {
	runSequence(['script:vendor', 'script:main', 'style', 'pug']
		, callback)
})

gulp.task('watch', ['build'], function () {
	gulp.watch(path.view, ['pug'])
	gulp.watch(path.style, ['style'])
	gulp.watch(path.script, ['script:main'])
})

gulp.task('default', ['build', 'watch'])