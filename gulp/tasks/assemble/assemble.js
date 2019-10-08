//==================================================================================
//	Dependencies
//==================================================================================
import gulp from 'gulp';
import Handlebars from 'handlebars';
import assemble from 'assemble';
import rename from 'gulp-rename';
import hipsum from 'hipsum';
import gulpif from 'gulp-if';

//==================================================================================
//
//	Assemble Tasks
//
//==================================================================================

// Register Handlebars Helpers
const hipsumHelper = hipsum();
Handlebars.registerHelper('filler', hipsumHelper);

// Initiate Assemble
const app = assemble();

// Add handlebars helpers
app.helpers(require('assemble-handlebars-helpers'));

// Check if production
const isProduction = process.env.NODE_ENV === "production";

//==================================================================================
//	Paths
//==================================================================================
const HBSLayouts = "int-src/html/layouts/**/*.hbs"; // Location Of Layout Files
const HBSPages = "int-src/html/pages/**/*.hbs"; // Location Of Pages
const HBSData = "int-src/html/layouts/**/*.json"; // Loacation Of Data
const HBSPartials = "int-src/html/partials/**/*.hbs"; // Location Of Partials
const HBSDestination = "int-dist"; // Destination For Compiled Files

//==================================================================================
//	Assemble Prep Task
//==================================================================================
gulp.task("assemblePrep", function(done) {
    
    // Define Handlebars layouts
    app.layouts(HBSLayouts);

    // Define Handlebars data files 
    app.data(HBSData);

    // Define Handlebars Pages
    app.pages(HBSPages);

    // Define HandleBars Partials
    app.partials(HBSPartials);
    
    // Return 
    done();
});

//==================================================================================
//	Assemble Main Task
//==================================================================================
gulp.task("assemble", gulp.series("assemblePrep", function assembleTask() {

    // Compile to Html
    return app.toStream("pages")
    
    // Flatten the files
    .pipe(app.renderFile({"flatten": true}))
    
    // Rename the file from .hbs to .html
    .pipe(rename({extname: ".html"}))
    .on("error", console.log)

    // Output the compiled code
    .pipe(app.dest(HBSDestination));

}));