require('dotenv').load("../");
var http = require("http");
var path = require('path');
var express = require("express");
var httpProxy = require('http-proxy');
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

// Configuration
var BUILD   = path.join(__dirname, "build");

// Default ENV
var DEVELOPMENT_PORT = process.env.ASSETS_DEVELOPMENT_PORT || 5001;
var WEBPACK_PORT     = process.env.ASSETS_WEBPACK_PORT || "5002";
var PROXY_URL = process.env.ASSETS_PROXY_URL || "http://localhost:5000";

// Webpack middleware
var webpackMiddleware = webpackDevMiddleware(webpack(webpackConfig), {
  noInfo: true,
  publicPath: "/assets/"
});

// Calling app proxy
var proxy = httpProxy.createProxyServer();
var proxyTarget = PROXY_URL;

// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Oh noes, we tried to proxy through to '+proxyTarget+req.url+" and failed.");
});


// Express app
var app = express();

// Tell Express to use the webpackMiddleware
app.use(webpackMiddleware);

// Set CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Check each request and proxies misses through to Calling app
app.get("*", function(req, res, next) {
  // Check if a file exists in the webpack bundle
  console.log(webpackMiddleware.fileSystem);

  try {
    // Throws if path doesn't exist
    webpackMiddleware.fileSystem.readFileSync(__dirname + '/build'+req.url);


  } catch (e) {
    console.log("Proxying to "+proxyTarget+req.url);
    // Proxy through to Calling app if doesn't exist
    proxy.web(req, res, {
      target: proxyTarget
    });
    return;
  }
});

// Boot the server
var port = DEVELOPMENT_PORT;
var server = http.Server(app);
server.listen(port, function() {
  console.log("Listening at http://localhost:" + DEVELOPMENT_PORT + "/");
});

// User the webpack-dev-server specifically for hot-loading
var devServer = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: BUILD,
  hot: true,
  quiet: false,
  noInfo: false,
  publicPath: "/assets/",
  historyApiFallback: true,
  stats: { colors: true }
});

// Needs to be on 8080 as the websocket expects that
devServer.listen(WEBPACK_PORT, "localhost", function() {});
