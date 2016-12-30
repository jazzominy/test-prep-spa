var gulp = require("gulp");
var gUtil = require("gulp-util");
var inject = require("gulp-inject");
var mainBowerFiles = require('main-bower-files');
var angularFilesort = require('gulp-angular-filesort');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task("concat:js",function(){
    var files = ["ui/index.module.js",
                 "ui/index.config.js",
                 "ui/auth/auth.module.js",
                 "ui/services/service.module.js",
                 "ui/main/main.module.js",
                 "ui/components/navbar/navbar.module.js",
                 "ui/components/question-form/question-form.module.js",
                 "ui/components/question-panel/question-panel.module.js"];
    var result = gulp.src(files, {read: true})
                    .pipe(concat("test-prep.min.js",{newLine: '\n'}))
                    .pipe(gulp.dest("./ui"))
                    .on("error",gUtil.log);

    return result;
});

//Concat, uglify and put the build js to dist folder
gulp.task("uglify", ["concat:js"], function(){
    return gulp.src("./ui/test-prep.min.js")
    .pipe(uglify())
    .pipe(gulp.dest("./ui/dist"));
});

//Injects project .js files without minification
gulp.task("inject",function(){
    var bowerSrc = gulp.src(mainBowerFiles(),{base: 'ui/bower_components',read: false});
    var jsSources = gulp.src(['./ui/**/*.js', "!./ui/bower_components/**/*.*"], {read: true})
    .pipe(angularFilesort());//To sort angular files as per dependencies
    var cssSources = gulp.src(["./ui/bower_components/**/bootstrap.min.css", "./ui/styles/*.css"], {read: false});

    return gulp.src("./ui/index.html")
    .pipe(inject(cssSources,{relative: true}))
    .pipe(inject(bowerSrc,{name:"bower",relative: true}))
    .pipe(inject(jsSources,{relative: true}))
    .pipe(gulp.dest("./ui"))
    .on("error",gUtil.log);
});

//Injects project .js files with minification
gulp.task("inject:min",["concat:js"],function(){
    var bowerSrc = gulp.src(mainBowerFiles(),{base: 'ui/bower_components',read: false});
    var jsSources = gulp.src(['./ui/test-prep.min.js'], {read: false});
    var cssSources = gulp.src(["./ui/bower_components/**/bootstrap.min.css", "./ui/styles/*.css"], {read: false});

    return gulp.src("./ui/index.html")
    .pipe(inject(cssSources,{relative: true}))
    .pipe(inject(bowerSrc,{name:"bower",relative: true}))
    .pipe(inject(jsSources,{relative: true}))
    .pipe(gulp.dest("./ui"))
    .on("error",gUtil.log);
});

gulp.task("default",["inject:min"])
