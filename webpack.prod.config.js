'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'stage-1', 'react'],
        }
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.css?$/,
          loaders: ['style', 'raw'],
          include: __dirname
      },
      { test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url',
        query: {limit: 10240}
      }
    ]
  }
};
