var webpack = require('webpack');
var path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({fallback: 'style-loader', use : 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'}),
    exclude: ['node_modules']
});

let libraryName = 'be5-react';
let outputFile;

if (env.min) {
    outputFile = libraryName + '.min.js';
}else{
    outputFile = libraryName + '.js';
}

let config = {
    entry: [
        './src/scripts/be5/main.js',
        './src/sass/styles.scss'
    ],
    output: {
        publicPath: './',
        path: path.join(__dirname, 'build'),
        filename: outputFile
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            favicon: './src/images/favicon.ico',
            template: './src/template.html',
            files: {
                css: ['style.css'],
                js: ['bundle.js'],
            }
        })
    ]
};

if (env.min) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;