var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  minifyCSS = require('gulp-minify-css');

gulp.task('lint', function() {
  gulp.src(['js/var.js', 'js/helpers.js', 'js/create.js',  'js/loadjson.js', 'js/preloader.js', 'js/playlist.js', 'js/video.js', 'js/getslides.js', 'js/setslide.js', 'js/setsize.js', 'js/loadimages.js', 'js/sliderclickevent.js', 'js/setcontent.js', 'js/config.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  gulp.src(['js/var.js', 'js/helpers.js', 'js/create.js',  'js/loadjson.js', 'js/preloader.js', 'js/playlist.js', 'js/video.js', 'js/getslides.js', 'js/setslide.js', 'js/setsize.js', 'js/loadimages.js', 'js/sliderclickevent.js', 'js/setcontent.js', 'js/config.js'])
    .pipe(concat('slideme.dev.js'))
    .pipe(gulp.dest('build'))
    .pipe(rename('slideme.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('minify-css', function() {
  gulp.src(['css/video-js.css', 'css/slidemecss.css'])
  .pipe(minifyCSS({keepBreaks:false}))
  .pipe(concat('slidemecss.min.css'))
  .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch(['js/var.js', 'js/helpers.js', 'js/create.js',  'js/loadjson.js', 'js/preloader.js', 'js/playlist.js', 'js/video.js', 'js/getslides.js', 'js/setslide.js', 'js/setsize.js', 'js/loadimages.js', 'js/sliderclickevent.js', 'js/setcontent.js', 'js/config.js', 'css/video-js.css', 'css/slidemecss.css'], ['lint', 'scripts', 'minify-css']);
});

gulp.task('default', ['lint', 'scripts', 'minify-css', 'watch']);