const webpack = require('webpack');
const path = require('path');
const rules = require('./webpack.common').rules;
const externals = require('./webpack.common').externals;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


rules.push({
    test: /\.scss$/,
    use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {localIdentName: '[local]___[hash:base64:5]'}
        },
        {
            loader: 'sass-loader',
            options: {outputStyle: 'expanded'}
        }
    ],
    exclude: [/node_modules/]
});
// ExtractTextPlugin.extract({fallback: 'style-loader', use : 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'}),


module.exports = env => {
    const fileName = env.min ? 'static/[name].min.js' : 'static/[name].js';
    const outPath = env.min ? 'dist/compressed' : 'dist/uncompressed';
    const plugins =  [
        //new BundleAnalyzerPlugin(),
        new WebpackCleanupPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/style.css',
            chunkFilename: 'static/[id].css'
        }),
        new OptimizeCssAssetsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            context: __dirname
        }),
        new HtmlWebpackPlugin({
            chunks: ['be5-react'],
            template: './src/template.html',
            files: {
                css: ['style.css'],
                js: ['bundle.js'],
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru/),
    ];
    if(env.min) {
        plugins.push(new webpack.optimize.UglifyJsPlugin());
        plugins.push(new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }));

    }

    return {
        mode: "production",
        entry: {
            'be5-react': ['babel-polyfill', './src/scripts/be5/main.js']
        },
        output: {
            publicPath: './',
            path: path.join(__dirname, outPath),
            filename: fileName,
            library: '[name]',
            chunkFilename: 'static/be5-[name]-[id].js',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        devtool: 'inline-source-map',
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules
        },
        plugins: plugins,
        externals: externals,
    }
};
