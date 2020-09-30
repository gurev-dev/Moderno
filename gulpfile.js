
let gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp');




gulp.task('sass', function () {

	return gulp.src('app/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }))// or expanded
		.pipe(rename({ suffix: '.min' }))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 8 versions ']
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
	return gulp.src('app/*.html')
		.pipe(browserSync.reload({ stream: true }))
});
gulp.task('js', function () {
	return gulp.src('app/**/*.js')
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "app/"
		},
		notify: false,
	});
});

gulp.task('script-min', function () {
	return gulp.src([
		'app/js/main.js',
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
});

gulp.task('script', function () {
	return gulp.src([
		'node_modules/slick-carousel/slick/slick.js',
		'node_modules/mixitup/dist/mixitup.js',
		'node_modules/rateyo/src/jquery.rateyo.js',
		'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
		'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
});

gulp.task('style', function () {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/slick-carousel/slick/slick.css',
		'node_modules/rateyo/src/jquery.rateyo.css',
		'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
		'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
		'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
	])
		.pipe(concat('libs.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('app/css'))
});

gulp.task('imagemin', function () {
	return gulp.src('#src/**/*.{jpg,png,svg,gif,ico,webp}')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 3,  //0 or 7
			svgoPlugins: [{ removeViewBox: false }]
		}))
		.pipe(gulp.dest('app/images/'))
});
gulp.task('webp', function () {
	return gulp.src('#src/**/*.{jpg,png,gif,svg,ico}')
		.pipe(webp({
			quality: 70
		}))
		.pipe(gulp.dest('app/images/'))
});


gulp.task('ttf2woff', function () {
	return gulp.src(['#src/**/*.ttf'])
		.pipe(ttf2woff())
		.pipe(gulp.dest('app/fonts/'));
});
gulp.task('ttf2woff2', function () {
	return gulp.src(['#src/**/*.ttf'])
		.pipe(ttf2woff2())
		.pipe(gulp.dest('app/fonts/'));
});


gulp.task('watch', function () {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
	gulp.watch('app/*.html', gulp.parallel('html'));
	gulp.watch('app/js/*.js', gulp.parallel('js'));
	gulp.watch('app/js/main.js', gulp.parallel('script-min'));
	gulp.watch('#src/**/*.{jpg,png,svg,gif,ico,webp}', gulp.parallel('imagemin'));
	gulp.watch('#src/**/*.{jpg,png,gif,svg,ico}', gulp.parallel('webp'));
});

gulp.task('default', gulp.parallel('script-min', 'script', 'style', 'sass', 'ttf2woff', 'ttf2woff2', 'imagemin', 'webp', 'browser-sync', 'watch',))