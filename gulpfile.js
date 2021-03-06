var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
gulp.task('configure-app',function(){
var appContants = require('./appconstants.json');
var replace = require('gulp-replace');
	return gulp.src(['./www/app/**','./www/js/**','./config.xml','./package.json','./admin/generateapk.bat','!./gulpfile.js'],{ base: "./" })
	.pipe(replace('@APPNAME@',appContants.APPNAME))
	.pipe(replace('@TECHNOLOGY@',appContants.TECHNOLOGY))
	.pipe(replace('@PRIMARYCOLOR@',appContants.PRIMARYCOLOR))
	.pipe(replace('@BADGECOLOR@',appContants.BADGECOLOR))
	.pipe(replace('@PACKAGE@',appContants.PACKAGE))
	.pipe(replace('@DATAFILENAME@',appContants.DATAFILENAME))
	
	.pipe(gulp.dest("."));
});
