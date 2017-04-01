var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');

var paths = {
  scripts: ['src/*.js', 'src/scripts/**/*.js', 'src/**/*.jsx'],
  lib: 'src/lib/**/*',
  css: 'src/css/**/*.css',
  sass: 'src/scss/**/*.scss',
  html: 'src/*.html'
};

var babelParams = {
    presets: ['react', 'es2015']
};

gulp.task('css', function() {
  return gulp.src(paths.css).pipe(gulp.dest('dist/css'));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function() {
  return gulp.src(['src/css/images/**/*', 'src/images/**/*'], { base: 'src/' }).pipe(gulp.dest('dist'));
});

gulp.task('icons', function() {
  return gulp.src('src/icons/**/*').pipe(gulp.dest('dist/icons'));
});

gulp.task('lib', function() {
  return gulp.src(paths.lib).pipe(gulp.dest('dist/lib'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts, { base: 'src/' }).pipe(babel(babelParams)).pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
  return gulp.src(paths.html).pipe(gulp.dest('dist'));
});

gulp.task('default', ['css', 'sass', 'images', 'icons', 'lib', 'scripts', 'html']);

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.lib, ['lib']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);
});