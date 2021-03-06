//==================================================================================
//	Dependencies
//==================================================================================
import gulp from 'gulp';

//==================================================================================
//
//	Font Task
//
//  This is used to copying font files
//  int-src/fonts -> int-dist/assets/fonts
//
//==================================================================================

//==================================================================================
//	Paths
//==================================================================================
const fontPath = "int-src/fonts/**/*";
const fontDest = "int-dist/assets/fonts";

//==================================================================================
//  Fonts Task
//==================================================================================
gulp.task("fonts", function() {
    // Move Fonts
    return gulp.src(fontPath)
    .pipe(gulp.dest(fontDest))
    
});