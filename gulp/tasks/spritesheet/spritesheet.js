//==================================================================================
//	Dependencies
//==================================================================================
import gulp from 'gulp';
import fs from 'fs';
import del from 'del';
import extract from 'string-extract-class-names';
import svg_store from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import path from 'path';
import rename from 'gulp-rename';
import cheerio from 'gulp-cheerio';

//==================================================================================
//
//	Spritesheets Task
//
//==================================================================================
//==================================================================================
//	Paths
//==================================================================================
let iconsSVGSrc = 'int-src/images/sprites/**/*.svg'; // Source Of Images to be sprited
let iconsSVGPath = 'int-src/images/sprites/'; // Folder holding sprite items
let iconsSVGDest  = 'int-dist/assets/images/sprites/'; // Destination for sprite sheet

//==================================================================================
//	SVG Spritsheets
//==================================================================================
gulp.task("svgSprites", function() {
    // Return task
    return gulp.src(iconsSVGSrc)
        // Run SVG Min
        .pipe(svgmin(function(file) {
            let prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    mergePaths: false, // To enable fill coloring
                    cleanUpIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        
        // Run SVG Store
        .pipe(svg_store())
        
        // Use cheerio to remove update fill attributes
        .pipe(cheerio({
            run: function($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))

        // Rename the generated file
        .pipe(rename({ base: "symbols" }))

        // Save out the generated file
        .pipe(gulp.dest(iconsSVGDest)); 
});

//==================================================================================
//	Sprites Task
//==================================================================================
gulp.task("sprites", gulp.series(
    "svgSprites"
))