/* eslint-disable no-undef */
const Dotenv = require('dotenv-webpack'); 
// import Dotenv from 'dotenv-webpack';
const path = require('path');
// import path from 'path'; 
const webpack = require('webpack'); 
// import webpack from 'webpack'; 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
// import HtmlWebpackPlugin from 'html-webpack-plugin'; 

module.exports = {
  entry: './public/index.mjs', 
  output: {
    filename: 'main.js',  
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './public/index.html',
    }),
    new Dotenv()
],
resolve: {
  extensions: ['.js', '.mjs'],
}, 

    mode: 'development', 
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],

        },
        {
          test: /\.(js|mjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
    watch: true
};