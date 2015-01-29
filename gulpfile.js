var gulp = require('gulp'),
	jade = require('gulp-jade');
	copy = require('gulp-copy');

gulp.task('templates', function() {
	var YOUR_LOCALS = {};
	gulp.src("./views/*.jade")
		.pipe(jade({ locals: YOUR_LOCALS, pretty: true }))
		.pipe(gulp.dest('./public/'));
});

gulp.task('styles', function() {
	gulp.src('css/*.css')
		.pipe(copy('public/'));
});

gulp.task('default', ['templates', 'styles']);