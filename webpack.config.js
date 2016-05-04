/*eslint no-process-env:0*/

'use strict';

const join = require('path').join;
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const conf = require('./conf');

const config = {
  entry: {
    app: './src/index.js'
  },

  output: {
    path: join(__dirname, 'public'),
    publicPath: conf.get('env') !== 'production' ?
      'http://localhost:10010/' :
      'http://static.getstarboard.xyz/',
    filename: conf.get('env') !== 'production' ?
      'bundle.js' :
      '[name]-[hash].js',
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
        exclude: /node_modules|shared/,
        loader: 'babel?presets[]=es2015&presets[]=react',
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
      'process.env.NODE_ENV': JSON.stringify(conf.get('env')),
      'MIXPANEL_TOKEN': JSON.stringify(conf.get('mixpanel.token')),
    }),
    new AssetsPlugin({
      prettyPrint: true,
    }),
  ]
};

if (conf.get('env') === 'production') {
  config.plugins.push(
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

module.exports = config;
