//==================================================================================
//	Dependencies
//==================================================================================
import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import { config as webpackConfig } from '../../../webpack.config';

//==================================================================================
//
//	Server Task
//
//==================================================================================

// Check if production
const isProduction = process.env.NODE_ENV === "production";

// Assign instance of browserSync
const docsBrowserSyncInst = browserSync;

//==================================================================================
//	BrowserSync Task
//==================================================================================
gulp.task("docsBrowserSync", function(complete){

    // Check If Development Mode Is Active 
    if(!isProduction){
        
        // Create A New Instance Of BrowserSync
        docsBrowserSyncInst.create();

        // Create bundler
        const bundler = webpack(webpackConfig);

        // Set Up Server 
        docsBrowserSyncInst.init({
            // Set Folder To Load As Server Root
            server: "./int-dist/", // Root Of Server
            baseDir: "./int-dist/docs/", // Base Directory
            open: false, // Prevents browser from opening automatically
            online: false, // Run In Offline Mode (Stops IP Detection),
            port: 8080,
            middleware: [
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
gulp.task("docsReloadBrowser", gulp.parallel(function reloadBrowserTask(complete){
    docsBrowserSyncInst.reload();
    complete();
}));