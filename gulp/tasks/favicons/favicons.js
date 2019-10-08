//==================================================================================
//	Dependencies
//==================================================================================
import gulp from 'gulp';
import favicons from 'gulp-favicons';

import { options } from "../../../favicon.config";

//==================================================================================
//
//	Favicons Task
//
//==================================================================================

// Check if production
const isProduction = process.env.NODE_ENV === "production";

//==================================================================================
//  Paths
//==================================================================================
const faviconsSrc = "int-src/images/favicons/favicon.png";
const faviconsDest = "./int-dist/assets/images/favicons";

//==================================================================================
//  Generate Favicons
//==================================================================================
gulp.task("favicons", function(complete) {
    // If not production skip
    // if(!isProduction) {
    //     complete()
    // }

    // Return gulp
    return gulp.src(faviconsSrc)
    // Run favicons
    .pipe(favicons(options))
    // Output the compiled favicons
    .pipe(gulp.dest(faviconsDest));
    
});