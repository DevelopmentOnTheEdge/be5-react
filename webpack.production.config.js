var webpack = require('webpack');
var path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({fallback: 'style-loader', use : 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'}),
    exclude: ['node_modules']
});

let fileName = 'static/[name].js';
let outPath = 'dist/uncompressed';
if (env.min) {
    fileName = 'static/[name].min.js';
    outPath = 'dist/compressed';
}else if (env.lib) {
    fileName = 'static/[name].js';
    outPath = 'dist/lib';
}

let config = {
    entry: {
        be5: './src/scripts/be5/main.js'
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, outPath),
        filename: fileName,
        library:  '[name]',
        libraryTarget: 'umd'
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
            filename: 'static/style.css',
            allChunks: true
        }),
        //new BundleAnalyzerPlugin(),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['be5'],
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
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }));
}

if (env.lib) {
  config.entry.be5 = './src/scripts/be5/index.js';
  config.externals = [
    'react',
    'react-dom',
    'underscore',
    'classnames'
  ];
}

module.exports = config;