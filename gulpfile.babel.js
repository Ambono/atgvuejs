//==================================================================================
//	Dependencies
//==================================================================================
import gulp from 'gulp';
import dir from 'require-dir';
import argv from 'minimist';

//==================================================================================
//
//	Main Gulp File
//  Each Task Defined Within Gulp/Tasks
//
//==================================================================================

// Check if production
let args = (process.argv.slice(2));
let isProduction = (args.includes("--prod"));

//==================================================================================
//  Import Tasks
//==================================================================================
dir("./gulp", {recurse: true});

//==================================================================================
//  Production Task
//  To Run Production Type "npm run prod"
//==================================================================================

//==================================================================================
//  Docs Task
//==================================================================================
gulp.task("docs", gulp.series(
    "jsdoc"  
));


//==================================================================================
//  Development Task
//==================================================================================
gulp.task("dev", gulp.series(
    "clean",
    "sprites",
    gulp.parallel( 
        "assemble", 
        "sass", 
        "scripts", 
        "fonts", 
        "imagemin",
        "videos",
        "mock"
    ),
    gulp.parallel(
        "favicons"
    ),
    gulp.parallel(
        "browserSync", 
        "watch"
    )
));

//==================================================================================
//  Docs Task
//==================================================================================
gulp.task("servedocs", gulp.series(
    "docs",
    gulp.parallel(
        "docsWatch",
        "docsBrowserSync"
    )
));

//==================================================================================
//  Default Task
//==================================================================================
gulp.task("default", gulp.series(
    "dev"
));