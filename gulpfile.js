var gulp = require('gulp');
var util = require('gulp-util');

var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var BUILD_DIR = './dist';

gulp.task('default', ['background', 'content', 'sidebar']);
gulp.task('watch', ['watch-background', 'watch-content', 'watch-sidebar']);

tasksFor('background');
tasksFor('content');
tasksFor('sidebar');

function tasksFor(name) {
    var options = {
        entries: ['./src/' + name + '/main.js'],
        debug: true
    };

    gulp.task(name, function () {
        var b = browserify(options);
        configure(b);
        return bundle(b);
    });

    gulp.task('watch-' + name, function () {
        var watchifyOptions = Object.assign({}, options, {
            cache: {},
            packageCache: {}
        });

        var w = watchify(browserify(watchifyOptions));
        configure(w);

        w.on('update', function () {
            bundle(w)
        });
        w.on('log', util.log.bind(util, name + '.js'));

        bundle(w);
    });

    function configure(b) {
        b.transform(babelify.configure({
            "presets": ["es2015", "react"],
            "plugins": ["transform-class-properties", "transform-object-rest-spread"]
        }));
    }

    function bundle(b) {
        return b.bundle()
            .on('error', function (err) {
                util.log(err.message);
            })
            .pipe(source(name + '.js'))
            .pipe(buffer())
            .pipe(gulp.dest(BUILD_DIR + '/src'));
    }
}