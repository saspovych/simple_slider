const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));


gulp.task('sass', function () {
	return gulp.src('style/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('style/'));
});

gulp.watch('style/style.scss', gulp.series('sass'));