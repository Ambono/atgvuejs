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
const htmlPath = "int-src/html/**/*.hbs";
const sassPath = "int-src/scss/**/*.scss";
const jsPath = "int-src/js/**/*.js";
const imagesPath = ["int-src/images/**/*", "!int-src/images/sprites/**/*"];
const fontsPath = "int-src/fonts/**/*";
const styleGuidePath = "int-src/docs/styleguide/**/*";
const spritesPath = ["int-src/images/sprites/**/*.png", "int-src/images/sprites/**/*.svg"];

//==================================================================================
//  Watch Task
//==================================================================================
gulp.task("watch", function(complete){

    // Check For Production Mode 
    if(!isProduction){

        // Watch HTML
        gulp.watch(htmlPath, gulp.series("assemble", "reloadBrowser"));

        // Watch CSS
        gulp.watch(sassPath, gulp.series("sass", "reloadBrowser"));

        // Watch Images
        gulp.watch(imagesPath, gulp.series("imagemin", "reloadBrowser"));

        // Watch Fonts
        gulp.watch(fontsPath, gulp.series("fonts", "reloadBrowser"));

        // Watch Scripts 
        gulp.watch(jsPath, gulp.series("scripts", "reloadBrowser"));

        // Watch Sprites (also causes styleguide and sass to fire as expected)
        gulp.watch(spritesPath, gulp.series("sprites"));

    }
    else{
        complete();
    };

});