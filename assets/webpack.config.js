require('dotenv').load("../");
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

// Webpack plugins
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Configuration
var TARGETS = path.join(__dirname, "targets");
var BUILD   = path.join(__dirname, "build");

// Plugins
var plugins = [
  new ExtractTextPlugin("[name].css", {
    allChunks: true
  })
];
if (process.env.DEVELOPMENT === "true") {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NoErrorsPlugin());
};

// Configure webpack output
var output = {
  path: BUILD,
  // Template based on keys in entry above
  // Generate hashed names for production
  filename: "[name].js"
};
if (process.env.DEVELOPMENT === "true") {
  output.publicPath = "http://localhost:"+process.env.ASSETS_DEVELOPMENT_PORT+"/assets/";
};

module.exports = {
  context: TARGETS,
  entry: fs.readdirSync(TARGETS).reduce(createEntries, {}),
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
        test: /\.coffee$/,
        loader: "coffee-loader"
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        // Crazy shiz for Compass
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "../node_modules/compass-mixins/lib"))
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!cssnext-loader")
      }
    ]
  },
  // Plugin specific-configuration
  cssnext: {
    map: false
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

function createEntries(entries, dir) {
  if (isDirectory(path.join(TARGETS, dir))) {
    var target = (process.env.DEVELOPMENT === "true") ? ['webpack-dev-server/client?http://localhost:5002', 'webpack/hot/dev-server'] : [];
    var file = path.join(TARGETS, dir, "target.js");
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
