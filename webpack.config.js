import webpack from "webpack"
import path from "path"
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { VueLoaderPlugin } from 'vue-loader'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

// Check if production
const isProduction = process.env.NODE_ENV === "production"

export const config = {
    mode: isProduction ? "production" : "development",
    entry: isProduction ? [
        "./js/polyfill.js", 
        "./js/main.js",
    ] :
    [
        "./js/polyfill.js",
        "./js/main.js",
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client'
    ],
    output: isProduction ? {
        filename: "app.js",
        path: path.resolve(__dirname, './int-dist/assets/js/'),
        publicPath: "/assets/js"
    } : {
        filename: "app.js",
        path: path.resolve(__dirname, './int-dist/assets/js/'),
        publicPath: "/assets/js",
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },

    context: path.resolve(__dirname, './int-src'),

    plugins: isProduction ? [
        new VueLoaderPlugin(),
        new SentryWebpackPlugin({
            include: '.',
            ignoreFile: '.sentrycliignore',
            ignore: ['node_modules', 'webpack.config.js'],
            configFile: 'sentry.properties'
        })
    ] : [
            new webpack.HotModuleReplacementPlugin(),
            new SentryWebpackPlugin({
                include: '.',
                ignoreFile: '.sentrycliignore',
                ignore: ['node_modules', 'webpack.config.js'],
                configFile: 'sentry.properties'
            }),
        new VueLoaderPlugin()           
    ],

    optimization: {
        minimizer: isProduction ? [
            new UglifyJsPlugin({
              uglifyOptions: {
                compress: {
                  drop_console: true,
                }
              }
            })
        ]: []
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // Vue loader options 
                    i18n: '@kazupon/vue-i18n-loader'
                }
            },
            { test: /\.css$/, loader: "css-loader" }
        ]
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true,
         hot:true
    },

    devtool: isProduction ? "none" : 'source-map',

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue'
        }
    }
};
