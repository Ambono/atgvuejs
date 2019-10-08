//==================================================================================
//	Dependencies
//==================================================================================
import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import historyFallback from 'connect-history-api-fallback'

import { config as webpackConfig } from '../../../webpack.config';

//==================================================================================
//
//	Server Task
//
//==================================================================================

// Check if production
const isProduction = process.env.NODE_ENV === "production";

//==================================================================================
//	BrowserSync Task
//==================================================================================
gulp.task("browserSync", function(complete){

    // Check If Development Mode Is Active 
    if(!isProduction){
        
        // Create A New Instance Of BrowserSync
        browserSync.create();

        // Create bundler
        const bundler = webpack(webpackConfig);

        // Set Up Server 
        browserSync.init({
            // Set Folder To Load As Server Root
            server: "./int-dist/", // Root Of Server
            baseDir: "./int-dist/", // Base Directory
            index: "index.html",
            port: 8080,
            open: false, // Prevents browser from opening automatically
            online: false, // Run In Offline Mode (Stops IP Detection),
            middleware: [
                historyFallback(),
                webpackDevMiddleware(bundler, { 
                    publicPath: webpackConfig.output.publicPath,
                    stats: { colors: true }
                 }),
                 webpackHotMiddleware(bundler)
            ],
        });

        // Mark as complete
        complete();
    }
    else{
        // Return Complete 
        complete();
    };

});

//==================================================================================
//	BrowserSync Reload Task
//==================================================================================
gulp.task("reloadBrowser", gulp.parallel(function reloadBrowserTask(complete){
    browserSync.reload();
    complete();
}));
