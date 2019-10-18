const gulp = require('gulp')

const sass = require('gulp-sass')
const csscomb = require('gulp-csscomb')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync')
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')

gulp.task('sass', function () {
  return gulp
    .src([ './assets/scss/style.scss' ])
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(csscomb())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('js', function () {
  return gulp
    .src('./assets/js/*.js')
    .pipe(plumber())
    .pipe(
      babel({
        presets: [ '@babel/env' ]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
})

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })

  gulp.watch('./assets/scss/**/**.*', gulp.series('sass')).on('change', browserSync.reload)
  gulp.watch('./assets/js/**/**.*', gulp.series('js')).on('change', browserSync.reload)
  gulp.watch('./**/*.html').on('change', browserSync.reload)
})
