// переменные
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



// конвектор
gulp.task('sass', function () {
	//повторение            поиск файла
	return gulp.src('app/**/*.scss')
		//что нужно с ней делать       сжатие
		.pipe(sass({ outputStyle: 'compressed' }))// or expanded
		//              переименуем
		.pipe(rename({ suffix: '.min' }))
		// autoprefix
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 8 versions ']
		}))
		//             куда залить
		.pipe(gulp.dest('app/css'))
		//                   обновление    
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
	return gulp.src('app/*.html')   //обновление html
		.pipe(browserSync.reload({ stream: true }))
});
gulp.task('js', function () {
	return gulp.src('app/*.js')     //обновление js
		.pipe(browserSync.reload({ stream: true }))
});

// перезагрузка
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "app/"
		},
		notify: false,
	});
});

// обьеденяем js плагины в один .min 
gulp.task('script', function () {
	return gulp.src([
		// путь к плагину
		'node_modules/slick-carousel/slick/slick.js',
		'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		// выход файла
		.pipe(gulp.dest('app/js'))
});

// обьеденяем css плагины в один .min 
gulp.task('style', function () {
	return gulp.src([
		// путь к плагину
		'node_modules/normalize.css/normalize.css',
		'node_modules/slick-carousel/slick/slick.css',
		'node_modules/magnific-popup/dist/magnific-popup.css'
	])
		.pipe(concat('libs.min.css'))
		.pipe(cssmin())
		// выход файла
		.pipe(gulp.dest('app/css'))
});

//конвектор img
gulp.task('imagemin', function () {
	return gulp.src('#src/**/*.{jpg,png,svg,gif,ico,webp}')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 3,  //0 or 7
			svgoPlugins: [{ removeViewBox: false }]
		}))
		.pipe(gulp.dest('app/images/'))
		.pipe(browserSync.reload({ stream: true }))
});
gulp.task('webp', function () {
	return gulp.src('#src/**/*.{jpg,png,gif,svg,ico}')
		.pipe(webp({
			quality: 70
		}))
		.pipe(gulp.dest('app/images/'))
});


// конвектор шрифтов
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


// отслеживание файлов
gulp.task('watch', function () {
	// метод:    за кем следить           запуск плагина
	gulp.watch('app/scss/style.scss', gulp.parallel('sass'))
	gulp.watch('app/*.html', gulp.parallel('html'))
	gulp.watch('app/js/*.js', gulp.parallel('js'))
	gulp.watch('#src/**/*.{jpg,png,svg,gif,ico,webp}', gulp.parallel('imagemin'))
	gulp.watch('#src/**/*.+(jpg,png,gif,svg,ico)', gulp.parallel('webp'))
});

//работа плагинов одновременно по дефолту 
gulp.task('default', gulp.parallel('style', 'script', 'sass', 'browser-sync', 'ttf2woff', 'ttf2woff2', 'imagemin', 'webp', 'watch',))