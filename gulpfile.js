var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  minifycss = require('gulp-minify-css'),
  shell = require('gulp-shell'),
  stripDebug = require('gulp-strip-debug'),
  wrap = require("gulp-wrap");

gulp.task('lint', function() {
  gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  gulp.src(['js/var.js', 'js/helpers.js', 'js/addPreloader.js', 'js/createDOM.js',  'js/loadJson.js', 'js/playList.js', 'js/ads.js', 'js/fireVideJs.js', 'js/getSlides.js', 'js/setNewSlide.js', 'js/setSize.js', 'js/loadImages.js', 'js/sliderClickEvent.js', 'js/embed.js', 'js/setContent.js', 'js/fullScreen.js', 'js/setWistia.js',  'js/config.js'])
    .pipe(concat('letSlide.dev.js'))
    .pipe(wrap('var letSlide;var slideMe = letSlide;\n(function(){\n<%= contents %>\n})();'))
    .pipe(gulp.dest('build'))
    .pipe(rename('letSlide.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('build'));

});

gulp.task('minify-css', function() {
  gulp.src(['css/video-js.css', 'css/letSlide.css'])
  .pipe(minifycss({keepBreaks:false}))
  .pipe(concat('letSlidecss.min.css'))
  .pipe(gulp.dest('build'));
});

gulp.task('minify-css-videojs', function() {
  gulp.src(['css/video-js.css'])
  .pipe(minifycss({keepBreaks:false}))
  .pipe(concat('video-js.min.css'))
  .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch(['js/*.js', 'css/*.css'], ['lint', 'scripts', 'minify-css']);
});

gulp.task('http-server', shell.task([
  'http-server -o'
]));

gulp.task('default', ['lint', 'scripts', 'minify-css', 'minify-css-videojs', 'watch', 'http-server']);
