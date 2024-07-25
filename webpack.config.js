/* eslint-disable no-undef */
const Dotenv = require('dotenv-webpack'); 
const path = require('path');
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
  entry: './src/index.js', 
  output: {
    filename: 'main.js',  
    path: path.resolve(__dirname, './dist'), 
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
    new Dotenv(),

],
    mode: 'development', 
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    watch: true
};