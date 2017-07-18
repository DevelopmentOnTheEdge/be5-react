"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

loaders.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
    exclude: ['node_modules']
});

module.exports = {
    entry: {
        reactHotLoader: 'react-hot-loader/patch',
        be5app: './src/scripts/be5/main.js'
    },
    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        library:  '[name]'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders
    },
    devServer: {
        contentBase: "./public",
        // do not print bundle build stats
        noInfo: true,
        // enable HMR
        hot: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        port: PORT,
        host: HOST,
        proxy: {
            '/api/*' : {
                target: 'http://localhost:8100/api/',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['be5app'],
            template: './src/template.html',
            files: {
                css: ['style.css'],
                js: [ "bundle.js"],
            }
        }),
    ]
};