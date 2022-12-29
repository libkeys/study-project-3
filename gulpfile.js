const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync')
const concat = require('gulp-concat')
const minify = require('gulp-minify')
const del = require('del')

function scss() {
    return gulp
        .src('dev/scss/**/*.scss')
        .pipe(sass())
        .pipe(
            autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
                cascade: true
            })
        )
        .pipe(cssnano())
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(browserSync.reload({ stream: true }))
}

function scss2() {
    return gulp
        .src('dev/scss2/**/*.scss')
        .pipe(sass())
        .pipe(
            autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
                cascade: true
            })
        )
        .pipe(cssnano())
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(browserSync.reload({ stream: true }))
}

function js() {
    return gulp
        .src('dev/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(minify())
        .pipe(gulp.dest('public/javascripts'))
        .pipe(browserSync.reload({ stream: true }))
}

function fonts() {
    return gulp
        .src('dev/fonts/**/**')
        .pipe(gulp.dest('public/fonts'))
}

function images() {
    return gulp
        .src('dev/images/**/**')
        .pipe(gulp.dest('public/images'))
        .pipe(browserSync.reload({ stream: true }))
}

function clean() {
    return del(__dirname + '/public/')
}

function browserSyncFunction() {
    browserSync({
        server: {
            baseDir: __dirname + '/'
        },
        notify: false
    })
}

function watchFiles() {
    gulp.watch(['./dev/scss/**/*.scss'], scss)
    gulp.watch(['./dev/js/**/*.js'], js)
    gulp.watch(['.**/*.html'], htmlCopyDev)
    gulp.watch(['./dev/images/**/**'], images)
    gulp.watch(['./dev/scss2/**/*.scss'], scss2)
}

function htmlCopy() {
    return gulp
        .src('**/*.html')
        .pipe(gulp.dest('views'))
}

function htmlCopyDev(){
    return gulp
        .src('**/*.html')
        .pipe(gulp.dest('public/html'))
        .pipe(browserSync.reload({ stream: true }))
}

let build = gulp.series(gulp.parallel(scss, browserSyncFunction))
let watch = gulp.parallel(build, watchFiles, browserSyncFunction)

// let start = gulp.series(gulp.parallel(scss, js, images, fonts, watchFiles, browserSyncFunction))
let start = gulp.series(clean, gulp.parallel(scss, scss2,js, images, fonts, htmlCopyDev, watchFiles, browserSyncFunction))
let startBackend = gulp.series(clean, gulp.parallel(scss, scss2, js, images, fonts, watchFiles))

exports.scss2 = scss2
exports.htmlCopyDev = htmlCopyDev
exports.htmlCopy = htmlCopy
exports.execute = startBackend
exports.clean = clean
exports.fonts = fonts
exports.images = images
exports.start = start
exports.js = js
exports.build = build
exports.watch = watch
exports.default = start