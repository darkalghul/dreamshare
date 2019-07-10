"use strict";
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const del = require("del");
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const htmlreplace = require("gulp-html-replace");

// Gulp task to minify CSS files
gulp.task("styles", function() {
  return (
    gulp
      .src("./scss/**/*.scss")
      // Compile SASS files
      .pipe(
        sass({
          outputStyle: "nested",
          precision: 10,
          includePaths: ["."],
          onError: console.error.bind(console, "Sass error:")
        })
      )
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer())
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest("./dist/css"))
  );
});

// Gulp task to minify CSS files
gulp.task("styles", function() {
  return (
    gulp
      .src("./css/main.css")
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer())
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest("./dist/css"))
  );
});

// Gulp task to minify JavaScript files
gulp.task("scripts", function() {
  return (
    gulp
      .src("./js/main.js")
      // Minify the file
      .pipe(uglify())
      // Output
      .pipe(gulp.dest("./dist/js"))
  );
});

// Gulp task to minify HTML files
gulp.task("pages", function() {
  return gulp
    .src(["./*.html"])
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest("./dist"));
});

// Clean output directory
gulp.task("clean", () => del(["dist"]));

// Gulp task to minify all files
gulp.task(
  "default",
  // () => {
  //   return gulp.parallel("clean", "styles", "scripts", "pages");
  // }
  gulp.series("clean", "styles", "scripts", "pages")
);