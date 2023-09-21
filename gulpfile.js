const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;

const style = () => {
  return gulp
    .src("src/static/scss/style.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("src/build/css"));
};

const js = async () => {
  gulp
    .src("src/static/js/**/*.js", { allowEmpty: true })
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("src/build/js"));
};

const watch = () => {
  gulp.watch("src/static/scss/**/*.scss").on("change", gulp.parallel(style));
  gulp.watch("src/static/js/**/*.js").on("change", gulp.parallel(js));
};

exports.watch = watch;
exports.style = style;
exports.js = js;
exports.build = gulp.series(style, js);

exports.default = gulp.parallel(watch);
