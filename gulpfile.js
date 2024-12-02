const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

// Пути к SCSS и CSS
const paths = {
  scss: "src/scss/**/*.scss", // Все файлы .scss в папке src/scss
  sass: "src/sass/**/*.sass", // Все файлы .sass в папке src/scss,
  css: "dist/css", // Папка для выходных файлов
};

// Задача для компиляции SCSS
gulp.task("scss", function () {
  return gulp
    .src(paths.scss) // Берём файлы SCSS
    .pipe(sass().on("error", sass.logError)) // Компилируем в CSS и обрабатываем ошибки
    .pipe(cleanCSS()) // Минифицируем CSS
    .pipe(gulp.dest(paths.css)); // Кладём CSS в папку dist/css
});

// Задача для компиляции SASS
gulp.task("sass", function () {
  return gulp
    .src(paths.sass) // Берём файлы SCSS
    .pipe(sass({ indentedSyntax: true }).on("error", sass.logError)) // Компилируем в CSS и обрабатываем ошибки
    .pipe(cleanCSS()) // Минифицируем CSS
    .pipe(gulp.dest(paths.css)); // Кладём CSS в папку dist/css
});

// Задача для отслеживания изменений
gulp.task("watch", function () {
  gulp.watch(paths.scss, gulp.series("scss")); // При изменении SCSS запускаем задачу scss
  gulp.watch(paths.sass, gulp.series("sass")); // Отслеживаем Sass
});

gulp.task("serve", function () {
  browserSync.init({
    server: "./dist",
  });

  gulp.watch(paths.scss, gulp.series("scss")).on("change", browserSync.reload);
});

// Задача по умолчанию
gulp.task("default", gulp.series("scss", "watch"));
