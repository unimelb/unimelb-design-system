require('dotenv').config();

var http = require("http");
var path = require('path');
var express = require("express");
var httpProxy = require('http-proxy');
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

var WEB_SERVER_HOST = process.env.WEB_SERVER_HOST || 'localhost';
var WEB_SERVER_PORT = process.env.WEB_SERVER_PORT || 7000;
var ASSET_SERVER_PORT = process.env.ASSETS_SERVER_PORT || 7001;
var WEBPACK_SERVER_PORT = process.env.WEBPACK_SERVER_PORT || 7002;


// Rails app proxy
var proxy = httpProxy.createProxyServer();
var proxyTarget = 'http://' + WEB_SERVER_HOST + ':' + WEB_SERVER_PORT;
proxy.on('error', function (err, req, res) {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Tried to proxy to ' + proxyTarget + req.url + " and failed.");
});


/**
 * Express server
 * - serve compiled assets from ouput folder with the help of webpack-dev-middleware
 * - proxy requests for other assets to Rails app
 */
var app = express();

// Set up and use webpack-dev-middleware
app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  lazy: false, // run webpack in watch mode for fast incremental builds
  noInfo: true
}));

// Set CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Listen for every asset request and proxy misses through to Rails app
app.get("*", function(req, res, next) {
  try {
    // Check if a file exists in the webpack bundle (throws if path doesn't exist)
    webpackMiddleware.fileSystem.readFileSync(path.join(webpackConfig.output.path, req.url));
  } catch (e) {
    // console.log("Proxying to " + proxyTarget + req.url);
    proxy.web(req, res, { target: proxyTarget });
  }
});

// Start server
app.listen(ASSET_SERVER_PORT, function() {
  console.log('=> Express proxy server listening at http://' + WEB_SERVER_HOST + ':' + ASSET_SERVER_PORT);
});


/**
 * Webpack dev server
 * - for hot module replacement
 */
var devServer = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    version: false,
    chunks: false,
    children: false
  }
});

// Start server
devServer.listen(WEBPACK_SERVER_PORT, WEB_SERVER_HOST, function (err) {
  if (err) console.error(err);
  console.log('=> 🔥  Webpack development server listening at http://' + WEB_SERVER_HOST + ':' + WEBPACK_SERVER_PORT);
});
