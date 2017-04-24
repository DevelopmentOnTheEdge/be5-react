var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var gutil = require('gulp-util');

var paths = {
  scripts: ['src/*.js', 'src/scripts/**/*.js', 'src/**/*.jsx'],
  lib: 'src/lib/**/*',
  images: 'src/images/**/*',
  icons: 'src/icons/**/*',
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
  return gulp.src(paths.images, { base: 'src/' }).pipe(gulp.dest('dist'));
});

gulp.task('icons', function() {
  return gulp.src(paths.icons).pipe(gulp.dest('dist/icons'));
});

gulp.task('lib', function() {
  return gulp.src(paths.lib).pipe(gulp.dest('dist/lib'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts, { base: 'src/' }).pipe(wrap(babel(babelParams))).pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
  return gulp.src(paths.html).pipe(gulp.dest('dist'));
});

gulp.task('default', ['css', 'sass', 'images', 'icons', 'lib', 'scripts', 'html']);

gulp.task('watch', function() {
  watching = true;
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.lib, ['lib']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.icons, ['icons']);
  gulp.watch(paths.html, ['html']);
});

var watching = false;

//Wrap a stream in an error-handler (needed until Gulp 4).
function wrap(stream) {
  stream.on('error', function(error) {
  gutil.log(gutil.colors.red(error.message));
  gutil.log(error.stack);
  if (watching) {
   gutil.log(gutil.colors.yellow('[aborting]'));
   stream.end();
  } else {
   gutil.log(gutil.colors.yellow('[exiting]'));
   process.exit(1);
  }
  });
  return stream;
}

