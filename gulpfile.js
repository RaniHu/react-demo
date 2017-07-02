// 引入组件
var gulp = require('gulp'); 
var sass = require('gulp-sass');                            //编译sass
var clean = require('gulp-clean');                          //清理文件
var minifycss = require('gulp-minify-css');     	        //css压缩
var concat = require('gulp-concat');                        //文件合并
var uglify = require('gulp-uglify');                    	//js压缩
var rename = require('gulp-rename');	                    //重命名
var del  = require('del');                                  //删除
var runSequence = require('run-sequence');                  //顺序执行


// 编译Sass
gulp.task('sass', function () {
    return gulp.src('./src/sass/*.scss')                    //将src/sass下所以.scss文件编译成css
        .pipe(sass())                               
        .on('error', sass.logError)                         // 错误信息
        .pipe(gulp.dest('./src/css'))                       //编译好的css文件输出到src/css中
})

//合并压缩css
gulp.task('minifycss', ['clean'],function () {

    return gulp.src('./src/css/*.css')
        .pipe(concat('styles.css'))    	                    //合并src/css下所有编译好的css到styles.css
        .pipe(minifycss())                                  //执行压缩
        .pipe(gulp.dest('./dist/css'));                     //将压缩完成的css文件输出到dist/css中

});



// 清理
gulp.task('clean', function () {
    return gulp.src(['./dist/css/*.css'], {read: false})
      .pipe(clean());
});

// gulp.task('clean',function(){
//   return del(['./dist/css/*.css']);
// })

//监视文件变化
gulp.task('watch', function () {
    gulp.watch('./src/sass/*.scss', ['sass']);
    gulp.watch('./src/css/*.css',['minifycss']);
});

//默认任务
gulp.task('default',['watch']);


//默认任务
// gulp.task('default', ['clean', 'watch'],function(){
//     gulp.start('minifycss');
// });

//按顺序执行
// gulp.task("build", sequence(
//     //清除文件
//     ['clean'],
//     //版本替换
//     ['watch'],
//     //压缩文件
//     ['minifycss']
// ));



