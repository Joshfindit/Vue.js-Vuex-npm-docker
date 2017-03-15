const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');


const config = {
  entry: [
    './main.js'
  ],
  output: {
    path: 'dist',
    filename: 'build.js'
  },
  devServer: {
//    hot: true,
    host: '0.0.0.0',
    port: process.env.EXTERNAL_PORT
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: 'index.html'
      }
    )
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
}


module.exports = config;
