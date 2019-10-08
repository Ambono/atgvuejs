//==================================================================================
//	Dependencies
//==================================================================================
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

//==================================================================================
//
//	Image Minification Task
//
//==================================================================================

//==================================================================================
//	Paths
//==================================================================================
const ImagesSRC = ["int-src/images/**/*", "!int-src/images/sprites/**/*"]; // Source Of Images
const ImagesDest = "int-dist/assets/images/"; // Destination For Images

//==================================================================================
//	Image Minification
//==================================================================================
gulp.task("imagemin", function() {

    // Minify Images
    return gulp.src(ImagesSRC)
    
    // Call minify
    .pipe(imagemin(
        // Fire Extension calls of imagemin plugin
        [imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()], 
        
        // Log verbose
        {verbose: true}
    ))

    // Output compressed images
    .pipe(gulp.dest(ImagesDest))

});