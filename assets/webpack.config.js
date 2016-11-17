require('dotenv').config();

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ASSETS_URL = 'http://'+process.env.WEB_SERVER_HOST+':'+process.env.ASSET_SERVER_PORT;
var WEBPACK_URL = 'http://'+process.env.WEB_SERVER_HOST+':'+process.env.WEBPACK_SERVER_PORT;

// Configuration
var TARGETS = path.join(__dirname, 'targets');
var BUILD   = path.join(__dirname, '..', 'build');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var isDev = process.env.NODE_ENV !== 'production';

var config = {
  context: TARGETS,
  entry: fs.readdirSync(TARGETS).reduce(createEntries, {}),
  output: {
    path: BUILD,
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'CDNURL', 'GMAPSJSAPIKEY'])
  ],
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg|woff|ttf|otf|eot|ico)/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.es6?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer&minimize!postcss-loader!sass-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer&minimize!postcss-loader')
      }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['> 1% in AU', 'last 2 versions', 'Firefox ESR', 'ie >= 9', 'iOS >= 8.4', 'Safari >= 8', 'Android >= 4.4']
    })
  ]
};

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

function isFile(file) {
  return fs.lstatSync(file).isFile();
}

function createEntries(entries, dir) {
  if (isDirectory(path.join(TARGETS, dir))) {
    var target = (isDev) ? ['webpack-dev-server/client?' + WEBPACK_URL, 'webpack/hot/dev-server'] : [];
    var file = path.join(TARGETS, dir, 'target.js');
    try {
      isFile(file);
    } catch (e) {
      return;
    }
    target.push(file);
    entries[dir] = target;
  }
  return entries;
}

// Environment-specific configuration
if (isDev) {
  config.devtool = 'source-map';
  config.output.publicPath = ASSETS_URL + '/assets/';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());

} else {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

// Export configuration
module.exports = config;
