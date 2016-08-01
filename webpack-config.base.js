var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/index', './style/main.scss']
  },
  output: {
    path: path.join(__dirname, 'build'),
    libraryTarget: 'umd',
    filename: '[name]-[chunkhash]-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-es2015-function-name']
        }
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!!postcss-loader!sass-loader")
      },
      {
        test: /\.json?$/,
        exclude: /node_modules/,
        loader: 'json'
      },
      {
        test: /jade?$/,
        loader: 'jade-loader',
        exclude: /node_modules/,
        query: {pretty: true}
      }
    ]
  },
  postcss: [
    autoprefixer({browsers: ['last 3 versions']})
  ],
  plugins: [
    new ExtractTextPlugin("[name]-[chunkhash]-styles.css"),
    new HtmlWebpackPlugin({
      template: './index.jade',
      minify: false,
      inject: 'body'
    })
  ]
};

