const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components|public\/)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['@babel/env', {modules: false}]]
        }
      }]
    },
    {
      test: /\.html$/,
      use: 'raw-loader'
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',

        {
          loader: 'css-loader',
          options: {
            importLoaders: '1'
          }
        }
      ],
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "file-loader"
    },
    {
      test: /\.(woff|woff2)$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader",
      options: {prefix: 'font', limit: 5000}
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader",
      options: {limit:"10000",mimetype:"application/octet-stream"}
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader",
      options: {limit:"10000",mimetype:"image/svg+xml"}
    },
    {
      test: /\.(jpg|jpeg|gif|png)$/,
      exclude: /node_modules/,
      loader:'url-loader',
      options: {limit:"6024",name:"images/[name].[ext]"}
    }
  ],
  externals: {
    //react: "React",
    //"react-dom": "ReactDOM",
    underscore: '_',
    jquery: 'jQuery',
    datatables: "DataTables",
    moment: "moment",
  }
};