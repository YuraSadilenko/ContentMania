var gulp = require("gulp"),
	sass = require("gulp-sass"),
	browserSync = require("browser-sync"),
	plumber = require("gulp-plumber"),
	rename = require("gulp-rename");
	autoprefixer = require("gulp-autoprefixer");
	imagemin = require('gulp-imagemin');

gulp.task("sass", function() {
  gulp
    .src("src/sass/main.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(rename("style.css"))
    .pipe(
      autoprefixer({
        browsers: ["last 20 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", ["sass", "browser"], function() {
	gulp.watch("src/sass/**/*.scss", ["sass"]);
	gulp.watch("src/index.html", browserSync.reload);
});

gulp.task("browser", function() {
	browserSync({
		server: { baseDir: "src" },
		notify: false
	});
});

gulp.task("build", function() {
	gulp.src(["src/css/*.css"]).pipe(gulp.dest("dist/css"));
	gulp.src(["src/css/*.*"]).pipe(gulp.dest("dist/css"));
	gulp.src(["src/img/*.*"]).pipe(gulp.dest("dist/img"));
	gulp.src(["src/img/svg/*.*"]).pipe(gulp.dest("dist/img/svg"));
	gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

gulp.task('compress', function() {
  gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});