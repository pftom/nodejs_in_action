const help = require('gulp-help');
const gulp = help(require('gulp'));
const sourceMaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

gulp.task('default', 'the default task', () => {
  return gulp
    .src('app/*.jsx')
    .pipe(sourceMaps.init())
    .pipe(babel({
      presets: ['es2015', 'react'],
    }))
    .pipe(concat('all.js'))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.watch('app/*.jsx', () => {
  gulp.start('default');
})
