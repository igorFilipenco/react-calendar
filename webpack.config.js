const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//Настройка логов
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

  entry: [
    'webpack-dev-server/client?http://localhost:3100', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/app/index' // Your appʼs entry point
  ],

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/assets/", // string
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot-loader/webpack', 'babel-loader'],
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      use: [
             'style-loader',
             'css-loader',
             'sass-loader'
      ]
    },

    ],
  },

  devtool: "source-map"
  ,

  devServer: {
    port: 9000,
    host: "localhost",
    stats: 'errors-only',
    contentBase: path.join(__dirname, 'public'),
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin('./css/[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
        warnings: false,
        }
    })
  ],
}
