"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var jsminify = require("gulp-uglify");
var babel = require("gulp-babel");
var pump = require('pump');
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var server = require("browser-sync").create();
var run = require("run-sequence");
var concat = require("gulp-concat");
var gutil = require("gulp-util");
var ftp = require("vinyl-ftp");

gulp.task("sass", function () {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src([
    "source/img/**/icon-*.svg",
    "source/img/**/logo-*.svg"
  ])
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("source"))
    .pipe(server.stream());
});

gulp.task("libs-clean", function () {
  return del("source/js/libs/libs.min.js");
});

gulp.task("libs-js", ["libs-clean"], function () {
  return gulp.src("source/js/libs/*.js")
    .pipe(concat("libs.js"))
    .pipe(jsminify("libs.js"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("source/js/libs"))
});

gulp.task("js-clean", function () {
  return del("source/js/app/*.min.js");
});

gulp.task("js-compress", ["js-clean"], function (cb) {
  pump([
    gulp.src("source/js/*.js"),
    babel({
      presets: ['env']
    }),
    jsminify(),
    rename({ suffix: ".min" }),
    gulp.dest("source/js/app")
  ],
    cb
  );
});

gulp.task("imagemin", function () {
  return gulp.src("source/img/**/*.{png,jpg,jpeg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("dist/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
});

gulp.task("serve", ["sass", "html", "js-compress"], function () {
  server.init({
    server: "source",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["sass"]);
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/js/*.js", ["js-compress"]);
  gulp.watch("source/js/libs/*.js", ["libs-js"]);
});

gulp.task("copy", ["sass", "sprite", "html", "js-compress", "libs-js"], function () {
  return gulp.src([
    "source/*.html",
    "source/css/**/*.css",
    "source/fonts/**/*.{woff,woff2,ttf,svg,eot}",
    "source/img/**",
    "source/js/app/*.min.js",
    "source/js/libs/libs.min.js",
    "source/phpmailer/**/*",
    "source/favicon.ico"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("dist"));
});


gulp.task("clean", function () {
  return del("dist");
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    done
  );
});

gulp.task('deploy', function () {

  var conn = ftp.create({
    host: 'anatoly-dolgov.ru',
    user: 'avylando@anatoly-dolgov.ru',
    password: '***',
    parallel: 10,
    log: gutil.log
  });

  var globs = [
    // 'src/**',
    'dist/css/**/*',
    'dist/js/**/*',
    'dist/fonts/**',
    'dist/img/**/*',
    'dist/index.html',
    'dist/index-en.html',
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src(globs, { base: 'dist', buffer: false })
    .pipe(conn.newer('/public_html')) // only upload newer files
    .pipe(conn.dest('/public_html'));

});
