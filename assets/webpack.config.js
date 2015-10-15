require('dotenv').load("../");
var ASSETS_URL = "http://"+process.env.WEB_SERVER_HOST+":"+process.env.ASSET_SERVER_PORT;
var WEBPACK_URL = "http://"+process.env.WEB_SERVER_HOST+":"+process.env.WEBPACK_SERVER_PORT;

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

// Webpack plugins
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Configuration
var TARGETS = path.join(__dirname, "targets");
var BUILD   = path.join(__dirname, "build");

// Entry
var entry = parseTargets(TARGETS, {});

// Output
var output = {
  path: BUILD,
  // Template based on keys in entry above
  // Generate hashed names for production
  filename: "[name].js"
};

// Plugins
var plugins = [
  new ExtractTextPlugin("[name].css", {
    allChunks: true
  })
];

if (process.env.DEVELOPMENT === "true") {
  output.publicPath = ASSETS_URL + "/assets/";
  
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NoErrorsPlugin());
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
}

module.exports = {
  context: TARGETS,
  entry: entry,
  output: output,
  plugins: plugins,
  module: {
    preLoaders: [
      {
        test: /\.js$/, // include .js files
        exclude: /node_modules|vendor/, // exclude any and all files in the node_modules folder
        loader: "jshint-loader"
      }
    ],
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg|woff|ttf|otf|eot|ico)/,
        loader: "file-loader?name=[path][name].[ext]"
      },
      {
        test: /\.es6?$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?-minimize!autoprefixer-loader!sass-loader")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?-minimize!autoprefixer-loader")
      },
      {
        test: /(isotope-layout|imagesloaded)/,
        loader: 'imports?define=>false&this=>window'
      }
    ]
  },
  jshint: {
    eqnull: true,
    failOnHint: false
  }
};

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

function isFile(file) {
  return fs.lstatSync(file).isFile();
}

function createEntries(root, entries, dir) {
  var dirPath = path.join(root, dir);
  if (isDirectory(dirPath)) {
    var target = (process.env.DEVELOPMENT === "true") ? ['webpack-dev-server/client?' + WEBPACK_URL, 'webpack/hot/dev-server'] : [];
    var file = path.join(dirPath, "target.js");
    try {
      isFile(file);
    } catch (e) {
      // If target.js is not found, look into the sub-folders
      return parseTargets(dirPath, entries);
    }
    target.push(file);
    entries[dir] = target;
  }
  return entries;
}

function parseTargets(root, entries) {
  return fs.readdirSync(root).reduce(createEntries.bind(null, root), entries);
}
