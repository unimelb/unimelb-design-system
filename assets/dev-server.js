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
  disableHostCheck: true, // https://github.com/webpack/webpack-dev-server/issues/897
  overlay: true, // show overlay in browser on compiler error or warning
  clientLogLevel: 'warning', // reduce webpack browser console output
  stats: 'minimal', // reduce terminal output,
  proxy: { // proxy unhandled requests to rack server
    '**': {
      target: `http://127.0.0.1:${WEB_SERVER_PORT}`
    }
  }
});

// Listen for all incoming requests (both current IP and `localhost`)
devServer.listen(ASSET_SERVER_PORT, '0.0.0.0', function(err) {
  if (err) console.error(err);
  console.log(`=> 🔥  Webpack development server listening at http://${ip.address()}:${ASSET_SERVER_PORT}`);
});
