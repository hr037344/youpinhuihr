//gulp的插件;

//1.http插件；（服务器插件）
//gulp connect;

const gulp=require("gulp");
//gulp服务器插件；
const connect=require("gulp-connect");
const proxy=require("http-proxy-middleware");
//gulp合并插件；
const concat = require("gulp-concat");
//压缩插件;
var uglify=require("gulp-uglify");
//babel 插件;编译ES6=>ES5
var babel=require("gulp-babel");
//css插件; 可以该用 gulp-sass + node-sass  创建在dev分支上
var cleanCss=require("gulp-clean-css");
//sass编译插件;
var sass=require("gulp-sass-china");
// gulp.task('connect', function() {
//     connect.server({  
//         port:8888,
//         root:"dist/",
//         livereload:true,
//         middleware:function(connect , opt){
//             var Proxy = require('gulp-connect-proxy');
//             opt.route = '/proxy';
//             var proxy = new Proxy(opt);
//             return [proxy];
//         }
//     })
//   });


gulp.task("connect",()=>{
    connect.server({
        port:"8000",
        root:"dist/",
        livereload:true,
        middleware:function(){
        return[
            proxy("/api",{//代理服务器
                target:"http://localhost:3000",
                pathRewrite:{
                    '^/api':'/',
                }
            })
        ]
        }
    })
})

  //如何发起端口请求：
  //localhost:8888/proxy/目标;

   
gulp.task("html",()=>{
    return  gulp.src(["./src/pages/*.html"])
    .pipe(gulp.dest("./dist/"))
    .pipe(connect.reload());
})
gulp.task("image", ()=>{
    return gulp.src("./src/image/*")
    .pipe(gulp.dest("dist/image"))
    .pipe(connect.reload());;
})

gulp.task("js", ()=>{
    return gulp.src("./src/scripts/*.js","!js/jquery.js")
    .pipe(gulp.dest("./dist/scripts"))
    .pipe(connect.reload())
    .pipe(uglify())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    // 合并文件
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/scripts"));
})


// gulp.task("watch",()=>{
//     // gulp.watch("*.html","!index.html"["html","css"]);
//     // gulp.watch("css/*.css",["html","css"]);
//     // gulp.watch("js/*.js",["html","js"]);
//     // gulp.watch("*.html",["html","sass"]);
//     // gulp.watch("sass/*.scss",["html","sass"]);
//     // gulp.watch("js/*.js",["html","sass","js"]);
//     // gulp.watch("./src/pages/*.html",["html"]);
// })
gulp.task("watch",()=>{
    gulp.watch("./src/pages/*.html",["html"]);
    gulp.watch("./src/sass/*.scss",["sass"]);
})

gulp.task("default",["watch","connect"]);

// script 转存指令;


// gulp.task("css", ()=>{
//     return gulp.src(["./src/styles/*.css"])
//            .pipe(cleanCss())
//            .pipe(gulp.dest("./dist/css"))
// })

gulp.task("sass", () =>{
    return gulp.src(["./src/sass/*.scss"])
           .pipe(sass().on("error",sass.logError))
           .pipe(gulp.dest("./dist/css"))
})


// 编译 ? es6 => es5;

// gulp.task("es6",()=>{
//     return gulp.src("js/*.js")
//     .pipe(babel({
//         presets: ['@babel/env']
//     }))
//     .pipe(gulp.dest("dist/js"));
// })

gulp.task("uglyjs" , ()=>{
    // 需求和实现出现了冲突,应该怎么做?
    return gulp.src("./dist/scripts/*.js")
    .pipe(uglyfly())
    .pipe(gulp.dest("./dist/minjs"))
})

gulp.task("build",["js","uglyjs"])
