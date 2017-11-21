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
        new webpack.ProvidePlugin({
          React: "React", react: "React", "window.react": "React", "window.React": "React",
        }),
    ],
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      "react-virtualized" : "react-virtualized",
      underscore : '_',
      jquery: 'jQuery',
      datatables : "DataTables",
      moment : "moment",
    }
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
  config.externals = {
    'beanexplorer-react':'beanexplorer-react',
    'bootstrap':'bootstrap',
    'bundle-loader':'bundle-loader',
    'brace':'brace',
    'classnames':'classnames',
    'datatables':'DataTables',
    'jquery':'jQuery',
    'moment':'moment',
    'react':'React',
    'react-ace':'react-ace',
    'react-addons-css-transition-group':'react-addons-css-transition-group',
    'react-addons-transition-group':'react-addons-transition-group',
    'react-alert':'react-alert',
    'react-ckeditor-component':'react-ckeditor-component',
    'react-codemirror':'react-codemirror',
    'react-datetime':'react-datetime',
    'react-dom': 'ReactDOM',
    'react-numeric-input':'react-numeric-input',
    'react-select':'react-select',
    'react-virtualized':'react-virtualized',
    'react-virtualized-select':'react-virtualized-select',
    'reactstrap':'reactstrap',
    'tether':'tether',
    'underscore':'_',
  };
}

module.exports = config;