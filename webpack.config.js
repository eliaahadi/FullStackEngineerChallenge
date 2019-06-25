var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './index.js',
  output: { path: path.resolve(__dirname, 'public'), filename: 'bundle.js' },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /.css?$/,
        loader: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['jsx', '.js', '.ts', '.tsx']
  },
};