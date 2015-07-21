var gulp = require('gulp');
var zip = require('gulp-zip');
var git = require('git-rev');
var moment = require('moment');

function getUserHome() {
    // via http://stackoverflow.com/a/9081436/2857873
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

gulp.task('zip-overwrite', function () {
    return gulp.src('pack/**/*')
        .pipe(zip('00Lotus-Texture-Pack.zip'))
        .pipe(gulp.dest(getUserHome() + '/AppData/Roaming/.minecraft/resourcepacks'));
});

gulp.task('zip', function () {
    git.short(function (revision) {
        var date = moment().format('YYYY.MM.DD-hh.mm.ss');
        return gulp.src('pack/**/*')
            .pipe(zip('Lotus-Texture-Pack-' + revision + '-' + date + '.zip'))
            .pipe(gulp.dest('./build'));
    });
});

gulp.task('zip-copy', function () {
    git.short(function (revision) {
        var date = moment().format('YYYY.MM.DD-hh.mm.ss');
        return gulp.src('pack/**/*')
            .pipe(zip('Lotus-Texture-Pack-' + revision + '-' + date + '.zip'))
            .pipe(gulp.dest(getUserHome() + '/AppData/Roaming/.minecraft/resourcepacks'));
    });
});

gulp.task('zip-copy-short', function () {
    var date = moment().format('YYYY.MM.DD-hh.mm.ss');
    return gulp.src('pack/**/*')
        .pipe(zip('00-' + date + '.zip'))
        .pipe(gulp.dest(getUserHome() + '/AppData/Roaming/.minecraft/resourcepacks'));
});

gulp.task('zip-watch', function () {
    return gulp.watch('pack/**/*')
        .pipe(zip('00Lotus-Texture-Pack.zip'))
        .pipe(gulp.dest(getUserHome() + '/AppData/Roaming/.minecraft/resourcepacks'));
});
