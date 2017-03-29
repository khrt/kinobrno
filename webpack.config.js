var webpack = require('webpack')

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
  }
};
