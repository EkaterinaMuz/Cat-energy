const gulp = require("gulp");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const del = require("del");
const deploy = require('gulp-gh-pages');
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

// Imagemin
const imgoptimmize = () => {
  return gulp.src('source/img/**/*.{jpg, png, svg}')
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.mozjpeg({progressive: true}),
    imagemin.svgo()

]))
  .pipe(gulp.dest('build/img'))
}

exports.imgoptimmize = imgoptimmize


// Styles

const styles = () => {
  return gulp.src("source/sass/style.sass")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  return (
    gulp.watch("source/sass/**/*.sass", gulp.series("styles")),
    gulp.watch(["source/*.html"], gulp.series('html', sync.reload)),
    gulp.watch(["source/js/*.js"], gulp.series('js', sync.reload))

  )
}

exports.watcher= watcher

// Clean

const clean = () => {
  return del('build')
}

exports.clean = clean


// js

const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(gulp.dest('build/js'))
}
exports.scripts = scripts

// Copy

const copy = () => {
  return gulp.src([
    'source/fonts/**/*.{woff, woff2}',
    'source/img/**',
    'source/js/**',
    'source/**/*.html',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
}

exports.copy = copy;


// Build

const build = gulp.series(
  clean,
  imgoptimmize,
  scripts,
  copy,
  styles
)

exports.build = build

exports.default = gulp.series(
  build, server, watcher
);


// Deploy

gulp.task('deploy', function () {
  return gulp.src("./build/**")
    .pipe(deploy())
});

