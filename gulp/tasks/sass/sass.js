//==================================================================================
//	Dependencies
//==================================================================================
import gulp from 'gulp';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';

//==================================================================================
//
//	SASS Task
//
//==================================================================================

// Check if production
const isProduction = process.env.NODE_ENV === "production";

//==================================================================================
//	Paths
//==================================================================================
const sassMain = "int-src/scss/app.scss"; // Main Sass File
const sassDest = "int-dist/assets/css"; // Sass Destination

// Set options for processors
const processors = [
    // Aset options for autoprefixer
    autoprefixer({
        "browsers": ["last 2 versions", "ie >= 11", "ios >= 9"]
    })
];

//==================================================================================
//	Compile Sass
//==================================================================================
gulp.task("sass", function(done) {

    // Compile Sass
    return gulp.src(sassMain)

    // If development initiate sourcemaps
    .pipe(gulpif(!isProduction, sourcemaps.init()))

    // Concat all files into a single file
    .pipe(concat("app.css"))
    
    // Compile Sass & If production compress the code
    .pipe(gulpif(isProduction, sass({ outputStyle: 'compressed' }), sass())
    .on("error", sass.logError))
    
    // Run Post CSS    
    .pipe(postcss(processors))

    // If development write sourcemaps
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    
    // Output CSS
    .pipe(gulp.dest(sassDest));

});