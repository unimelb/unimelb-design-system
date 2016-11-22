require('dotenv').config();

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var WEB_SERVER_HOST = process.env.WEB_SERVER_HOST || 'localhost';
var WEB_SERVER_PORT = process.env.WEB_SERVER_PORT || 7000;
var ASSET_SERVER_PORT = process.env.ASSET_SERVER_PORT || 7001;

/**
 * Webpack dev server
 * - run webpack with hot module replacement
 * - proxy requests to Rails app
 */
var devServer = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '**': 'http://' + WEB_SERVER_HOST + ':' + WEB_SERVER_PORT
  },
  stats: {
    colors: true,
    version: false,
    chunks: false,
    children: false
  }
});

// Start server
devServer.listen(ASSET_SERVER_PORT, WEB_SERVER_HOST, function (err) {
  if (err) console.error(err);
  console.log('=> 🔥  Webpack development server listening at http://' + WEB_SERVER_HOST + ':' + ASSET_SERVER_PORT);
});
