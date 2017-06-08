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
    }, {
      test: /bootstrap-sass\/assets\/javascripts\//,
      loader: 'imports?jQuery=jquery',
    }, {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
    }, {
        test: /\.jpg$/,
        loader: "file-loader"
    },  {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
    },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }

    ],
  },

  watch: true,
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
