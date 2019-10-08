// Karma configuration
// Generated on Sun May 20 2018 19:34:42 GMT+0000 (GMT)

const { VueLoaderPlugin } = require('vue-loader')

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: ['./tests/**/*.test.html', './tests/**/*.test.js'],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './tests/**/*.test.html': ['html2js'],
      './tests/**/*.test.js': ['webpack'] 
    },
    

    webpack: {
      mode: "development",
      output: { path: '_karma_webpack_', publicPath: '_karma_webpack_' },

      module: {
          rules: [
              {
                  test: /\.js$/,
                  exclude: /(node_modules | bower_components)/,
                  loader: 'babel-loader'
              },
              {
                  test: /\.vue$/,
                  loader: 'vue-loader',
                  options: {
                      // Vue loader options 
                  }
              }
          ]
      },

      plugins: [
        new VueLoaderPlugin()
      ],

      devtool:'source-map',

      resolve: {
          alias: {
              'vue$': 'vue/dist/vue'
          }
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    // repoorter options
    mochaReporter: {
      colors: {
        success: 'green',
        info: 'bgBlue',
        warning: 'yellow',
        error: 'bgRed'
      }
    },



    // Specify coverrage reports
    coverageReporter: {
      reporters: [
        // {'type': 'text'}, // Commented out for the moment
        {'type': 'html', 
          dir: 'int-dist/tests/coverage', 
          subdir: function(browser) {
            // Ensure name consistency
            return browser.toLowerCase().split(/[ /-]/)[0];
          }
        }
      ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'Safari'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}