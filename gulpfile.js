var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  minifycss = require('gulp-minify-css'),
  shell = require('gulp-shell'),
  wrap = require("gulp-wrap");

gulp.task('lint', function() {
  gulp.src(['js/var.js', 'js/helpers.js', 'js/preloader.js', 'js/create.js',  'js/loadjson.js', 'js/playlist.js', 'js/video.js', 'js/getslides.js', 'js/setslide.js', 'js/setsize.js', 'js/loadimages.js', 'js/sliderclickevent.js', 'js/embed.js', 'js/setcontent.js', 'js/fullscreen.js', 'js/config.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  gulp.src(['js/var.js', 'js/helpers.js', 'js/preloader.js', 'js/create.js',  'js/loadjson.js', 'js/playlist.js', 'js/video.js', 'js/getslides.js', 'js/setslide.js', 'js/setsize.js', 'js/loadimages.js', 'js/sliderclickevent.js', 'js/embed.js', 'js/setcontent.js', 'js/fullscreen.js', 'js/config.js'])
    .pipe(concat('slideme.dev.js'))
    .pipe(wrap('var slideMe;\n(function(){\n<%= contents %>\n})();'))
    .pipe(gulp.dest('build'))
    .pipe(rename('slideme.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build'));

});

gulp.task('minify-css', function() {
  gulp.src(['css/video-js.css', 'css/slidemecss.css'])
  .pipe(minifycss({keepBreaks:false}))
  .pipe(concat('slidemecss.min.css'))
  .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch(['js/var.js', 'js/helpers.js', 'js/preloader.js', 'js/create.js',  'js/loadjson.js', 'js/playlist.js', 'js/video.js', 'js/getslides.js', 'js/setslide.js', 'js/setsize.js', 'js/loadimages.js', 'js/embed.js', 'js/sliderclickevent.js', 'js/setcontent.js', 'js/fullscreen.js', 'js/config.js', 'css/video-js.css', 'css/slidemecss.css'], ['lint', 'scripts', 'minify-css']);
});

gulp.task('http-server', shell.task([
  'http-server -o'
]))

gulp.task('default', ['lint', 'scripts', 'minify-css', 'watch', 'http-server']);
