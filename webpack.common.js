module.exports = {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components|public\/)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}]],
          plugins: ['syntax-dynamic-import']
        }
      }]
    },
    {
      test: /\.html$/,
      use: 'raw-loader'
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader?importLoaders=1'],
      exclude: ['node_modules']
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "file-loader"
    },
    {
      test: /\.(woff|woff2)$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader?prefix=font/&limit=5000"
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader?limit=10000&mimetype=application/octet-stream"
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    },
    {
      test: /\.(jpg|jpeg|gif|png)$/,
      exclude: /node_modules/,
      loader:'url-loader?limit=6024&name=images/[name].[ext]'
    }
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "react-virtualized": "react-virtualized",
    underscore: '_',
    jquery: 'jQuery',
    datatables: "DataTables",
    moment: "moment",
  }
};