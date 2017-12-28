const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.src('public/index.jsx')
  .pipe(babel({
    presets: ['env'],
  }))
