const webpack = require('webpack');
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2
const loaders = require('./webpack.common').loaders;
const externals = require('./webpack.common').externals;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
        chunkFilename : 'static/be5-[name]-[id].js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders
    },
    plugins: [
        //new BundleAnalyzerPlugin(),
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
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru/),
    ],
    externals: externals
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
    'beanexplorer-react',
    'bootstrap',
    'bundle-loader',
    'brace',
    'classnames',
    'datatables',
    'jquery',
    'moment',
    'react',
    'react-ace',
    'react-addons-css-transition-group',
    'react-addons-transition-group',
    'react-alert',
    'react-ckeditor-component',
    'react-codemirror',
    'react-datetime',
    'react-dom',
    'react-numeric-input',
    'react-select',
    'react-virtualized',
    'react-virtualized-select',
    'react-codemirror',
    'reactstrap',
    'tether',
    'underscore',
  ];
}

module.exports = config;