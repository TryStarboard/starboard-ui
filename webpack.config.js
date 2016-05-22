/*eslint no-process-env:0*/

'use strict';

const join = require('path').join;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const conf = require('./conf');

const config = {
  entry: {
    app: './src/index.js'
  },

  output: {
    path: join(__dirname, 'public'),
    publicPath: conf.get('env') !== 'production' ?
      '/' :
      'https://www.getstarboard.xyz/',
    filename: conf.get('env') !== 'production' ?
      '[name].js' :
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
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: conf.get('env') !== 'production' ?
          [
            'transform-object-rest-spread',
          ] :
          [
            'transform-object-rest-spread',
            'transform-react-constant-elements',
            'transform-react-inline-elements',
          ]
        }
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file',
      },
      {
        test: /\.svg$/,
        loader: 'babel?presets[]=es2015&presets[]=react!svg-react',
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
    ]
  },

  sassLoader: {
    outputStyle: conf.get('env') !== 'production' ? 'expanded' : 'compressed',
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
    new ExtractTextPlugin(conf.get('env') !== 'production' ?
      '[name].css' :
      '[name]-[contenthash].css'),
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
