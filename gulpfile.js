const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

// Пути к SCSS и CSS
const paths = {
  scss: "src/scss/**/*.scss", // Все файлы .scss в папке src/scss
  sass: "src/sass/**/*.sass", // Все файлы .sass в папке src/scss,
  css: "dist/css", // Папка для выходных файлов
  html: ["*.html", "!dist/**/*.html"],
};

// Задача для компиляции SCSS
gulp.task("scss", function () {
  return gulp
    .src(paths.scss) // Берём файлы SCSS
    .pipe(sass().on("error", sass.logError)) // Компилируем в CSS и обрабатываем ошибки
    .pipe(cleanCSS()) // Минифицируем CSS
    .pipe(gulp.dest(paths.css)) // Кладём CSS в папку dist/css
    .pipe(browserSync.stream()); // Обновляем браузер
});

// Задача для компиляции SASS
gulp.task("sass", function () {
  return gulp
    .src(paths.sass) // Берём файлы SCSS
    .pipe(sass({ indentedSyntax: true }).on("error", sass.logError)) // Компилируем в CSS и обрабатываем ошибки
    .pipe(cleanCSS()) // Минифицируем CSS
    .pipe(gulp.dest(paths.css)) // Кладём CSS в папку dist/css
    .pipe(browserSync.stream()); // Обновляем браузер
});

// Копирование HTML-файлов в папку dist
gulp.task("copy-html", function () {
  return gulp.src(paths.html).pipe(gulp.dest("dist"));
});

// Задача для отслеживания изменений
gulp.task("watch", function () {
  gulp.watch(paths.scss, gulp.series("scss")); // При изменении SCSS запускаем задачу scss
  gulp.watch(paths.sass, gulp.series("sass")); // Отслеживаем Sass
  gulp
    .watch(paths.html)
    .on("change", gulp.series("copy-html", browserSync.reload)); // Отслеживаем HTML
});

gulp.task("serve", function () {
  browserSync.init({
    server: "./dist",
    host: "192.168.0.107", // Указывает слушать все адреса
    port: 6000, // Выберите любой свободный порт
    open: false, // Отключает автоматическое открытие браузера
    notify: false,
  });

  console.log("Server started at http://localhost:6000");
  // gulp.watch(paths.scss, gulp.series("scss")).on("change", browserSync.reload);
  // gulp.watch(paths.sass, gulp.series("sass")).on("change", browserSync.reload) // эти две строки оптимизированы из-за .pipe(browserSync.stream())
  // Отслеживаем изменения файлов
  gulp.watch(paths.scss, gulp.series("scss"));
  gulp.watch(paths.sass, gulp.series("sass"));
  gulp
    .watch(paths.html)
    .on("change", gulp.series("copy-html", browserSync.reload));
});

// Задача по умолчанию
gulp.task(
  "default",
  gulp.series("copy-html", "scss", "sass", "serve", "watch")
);
