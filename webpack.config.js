/*eslint no-process-env:0*/

'use strict';

const join = require('path').join;
const webpack = require('webpack');
const config = require('config');

const NODE_ENV = process.env.NODE_ENV || 'development';

const conf = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: join(__dirname, 'public'),
  },

  devtool: 'source-map',

  resolve: {
    alias: {
      svg: join(__dirname, 'src/svg'),
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file',
      },
      {
        test: /\.svg$/,
        loader: 'babel?presets[]=es2015&presets[]=react!svg-react',
      },
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'MIXPANEL_TOKEN': JSON.stringify(config.get('mixpanel.token')),
    })
  ]
};

if (NODE_ENV === 'production') {
  conf.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = conf;
