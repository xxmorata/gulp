const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const browsersync = require("browser-sync").create();
// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });
  done();
}
// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}
// CSS task
function css() {
  return gulp
    .src("dev/scss/**/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest("dist/css"))
    .pipe(browsersync.stream());
}
// Watch files
function watchFiles() {
  gulp.watch("./dev/scss/**/*.scss", css);
  gulp.watch("dist/*.html", browserSyncReload);
}
gulp.task("css", css);
gulp.task("watchFiles", watchFiles);
gulp.task("browserSync", browserSync);
gulp.task(
  "default",
  gulp.series(gulp.parallel("css"), "browserSync", "watchFiles")
);
