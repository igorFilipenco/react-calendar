const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].bundle.css');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

//logs config
const stats = {
	assets: true
	, children: false
	, chunks: false
	, hash: false
	, modules: false
	, publicPath: false
	, timings: true
	, version: false
	, warnings: true
	, colors: {
		green: '\u001b[32m'
	}
};

module.exports = {

  context: path.resolve(__dirname, 'src/app'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015',"stage-0","react"] }
      }],
      include: path.join(__dirname, 'src'),

    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: "style-loader",
        loader: "css-loader!sass-loader",
      }),
    },

    ],
  },

  devtool: "source-map",

  devServer: {
    port: 9000,
    host: "localhost",
    stats: 'errors-only',
    contentBase: __dirname + '/src',
  },

  plugins: [
    new HtmlWebpackPlugin({
        title: 'react-calendar',
//        filename: 'index.html',
        template: 'index.html'

    }),
    extractCSS,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
        warnings: false,
        }
    }),
  ],
}
