//==================================================================================
//	Dependencies
//==================================================================================
import gulp from 'gulp';
import browserSync from 'browser-sync';

//==================================================================================
//
//	Watch Task
//
//==================================================================================

// Check if production
const isProduction = process.env.NODE_ENV === "production";

//==================================================================================
//	Paths
//==================================================================================
const jsPath = "int-dist/assets/js/**/*.js";

//==================================================================================
//  Watch Task
//==================================================================================
gulp.task("docsWatch", function(complete){

    // Check For Production Mode 
    if(!isProduction){

        // Watch Scripts 
        gulp.watch(jsPath, gulp.series("jsdoc", "docsReloadBrowser"));

    }
    else{
        complete();
    };

});