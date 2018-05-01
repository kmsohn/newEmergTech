var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

//SCSS -> CSS, autoprefixer
gulp.task('sass', () => {
    gulp.src('./src/sass/main.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

//Scripts -> uglify, rename with .min.js
gulp.task('scripts', () => {
    gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/js'))
});

//Images -> minify
gulp.task('images', () => {
    gulp.src('./src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/images'))
});
     
//Watch for changes
gulp.task('watch', () => {
    gulp.watch('./src/sass/main.scss', ['sass'] )
    gulp.watch('./src/js/*.js', ['scripts'])
    gulp.watch('./src/images/images/*', ['images'])
    gulp.watch("./index.html").on('change', browserSync.reload);
    gulp.watch("./src/sass/main.scss").on('change', browserSync.reload);
});

//Server & watching scss/html files
gulp.task('browserSync', ['sass'], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

//calling all tasks at once
gulp.task('default', ['sass', 'scripts', 'images', 'watch', 'browserSync']);