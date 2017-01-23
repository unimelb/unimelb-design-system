require('dotenv').config();

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var WEB_SERVER_HOST = process.env.WEB_SERVER_HOST;
var WEB_SERVER_PORT = process.env.WEB_SERVER_PORT;
var ASSET_SERVER_PORT = process.env.ASSET_SERVER_PORT;

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
    '**': {
      target: 'http://' + WEB_SERVER_HOST + ':' + WEB_SERVER_PORT,
      secure: false
    }
  },
  stats: {
    colors: true,
    version: false,
    chunks: false,
    children: false
  }
});

// Bind server to all incoming requests on port (0.0.0.0)
devServer.listen(ASSET_SERVER_PORT, '0.0.0.0', function(err) {
  if (err) console.error(err);
  console.log('=> 🔥  Webpack development server listening at http://' + WEB_SERVER_HOST + ':' + ASSET_SERVER_PORT);
});
