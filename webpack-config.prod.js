'use strict';
var webpack = require('webpack');
const merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackCommon = require('./webpack-config.base');

const prodConfig = merge(webpackCommon, {
  output: {
    sourceMapFilename: '[name]-bundle.map',
    devtool: 'source-map'

  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false
    }),
    new HtmlWebpackPlugin({
      template: './index.jade',
      inject: 'body'
    })
  ]
});

// var util = require('util');
// console.log(util.inspect(prodConfig, false, null));
module.exports = prodConfig;

