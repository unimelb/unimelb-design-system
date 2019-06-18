require('dotenv').config();

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var ip = require('ip');

var config = require('./webpack.config.js');

var WEB_SERVER_PORT = process.env.WEB_SERVER_PORT;
var ASSET_SERVER_PORT = process.env.ASSET_SERVER_PORT;

/**
 * Webpack dev server
 * - run webpack with hot module replacement
 * - proxy requests to Rails app
 */
var devServer = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true, // enable hot module replacement
  overlay: true, // show overlay in browser on compiler error or warning
  clientLogLevel: 'warning', // reduce browser console output
  stats: 'minimal', // reduce terminal output,

  // Proxy unhandled requests to rack server
  proxy: {
    '**': { target: `http://localhost:${WEB_SERVER_PORT}` }
  },

  // Work around security restriction
  // https://github.com/webpack/webpack-dev-server/issues/897
  disableHostCheck: true,
  headers: { 'Access-Control-Allow-Origin': '*' }
});

// Listen for all incoming requests (both current IP and `localhost`)
devServer.listen(ASSET_SERVER_PORT, '0.0.0.0', function(err) {
  if (err) console.error(err);
  console.log(`=> 🔥  Webpack development server listening at http://${ip.address()}:${ASSET_SERVER_PORT}`);
});
