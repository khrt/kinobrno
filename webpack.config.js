var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
  entry: ['whatwg-fetch', './src/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node-modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/index.html' }
    ])
  ]
};
