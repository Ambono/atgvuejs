//==================================================================================
//	Dependencies
//==================================================================================
import gulp from "gulp";
import path from 'path';
import webpack from 'webpack';

import { config } from "../../../webpack.config";

//==================================================================================
//
//	Scripts Task
//  This task will only fire when in production mode as we will use the dev server 
//  for development purposes
//
//==================================================================================

// Check if production
const isProduction = process.env.NODE_ENV === "production";

//==================================================================================
//	Compile Scripts
//==================================================================================
gulp.task("scripts", () => {
    // Return a promise
    return new Promise((resolve) => {
        // If this is development mode
        // if(!isProduction) {
        //     // Resolve
        //     resolve();
        // }

        // Initiate webpack
        webpack(config, (error, stats) => {
            // If there is an error
            if(error) {
                // Log the error
                console.log("Webpack" + error);
            }
            // Resolve
            resolve();
        });
    });
});