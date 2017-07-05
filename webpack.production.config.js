var webpack = require('webpack');
var path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({fallback: 'style-loader', use : 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'}),
    exclude: ['node_modules']
});

let fileName = '[name].js';
let outPath = 'build';
if (env.min) {
    fileName = '[name].min.js';
    outPath = 'build/min';
}

let config = {
    entry: {
        be5: './src/scripts/be5/main.js'
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, outPath),
        filename: fileName,
        library:  '[name]'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            favicon: './src/images/favicon.ico',
            template: './src/template.html',
            files: {
                css: ['style.css'],
                js: ['bundle.js'],
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            minChunks: 2,
        })
    ]
};

if (env.min) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }));
}

module.exports = config;