require('dotenv').config();

var fs = require('fs');
var path = require('path');
var ip = require('ip');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var TARGETS_PATH = path.resolve(__dirname, 'targets');
var ASSET_SERVER_URL = `http://${ip.address()}:${process.env.ASSET_SERVER_PORT}/`;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  context: TARGETS_PATH,
  devtool: isDev && 'eval-cheap-module-source-map',
  entry: fs.readdirSync(TARGETS_PATH).reduce(addEntry, {}),
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: '[name].js',
    publicPath: isDev ? ASSET_SERVER_URL : `${process.env.CDNURL}/${process.env.VERSION}/`
  },
  resolve: {
    extensions: ['.js', '.es6', '.json', '*'],
    alias: {
      components: path.resolve(__dirname, 'components'),
      shared: path.resolve(__dirname, 'shared'),
      targets: path.resolve(__dirname, 'targets'),
      utils: path.resolve(__dirname, 'utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|woff|ttf|otf|eot|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name]-[sha1:hash:5].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: { sourceMap: isDev }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                autoprefixer: false, // handled by postcss-cssnext
                importLoaders: 1, // one more loader in the chain
                minimize: !isDev,
                sourceMap: isDev
              }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: isDev }
            }
          ]
        })
      },
      {
        test: /\.es6?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'CDNURL',
      'MAPBOXSTYLE',
      'MAPBOXTOKEN'
    ]),
    new ExtractTextPlugin({
      allChunks: true,
      filename: '[name].css',
      disable: isDev
    })
  ].concat(isDev ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ] : [
    new webpack.optimize.UglifyJsPlugin()
  ])
};


/**
 * Add an entry for the given directory.
 * @param {Object} entries - the entries so far (reduce)
 * @param {String} dir - the name of the directory to process
 * @return {Object} - the `entries` object that includes the new entry
 */
function addEntry(entries, dir) {
  var dirPath = path.join(TARGETS_PATH, dir);

  // Add entries for directories only
  if (fs.lstatSync(dirPath).isDirectory()) {
    // Build the entry's targets array
    var targets = isDev ? [`webpack-dev-server/client?${ASSET_SERVER_URL}`, 'webpack/hot/dev-server'] : [];
    addTarget(targets, dirPath, 'index.js');
    addTarget(targets, dirPath, 'index.es6');
    addTarget(targets, dirPath, 'index.css');

    // Add the entry
    entries[dir] = targets;
  }

  return entries;
}

/**
 * Add a target to a given array.
 * @param {Array} targets
 * @param {String} dirPath
 * @param {String} file - the file to add as target
 */
function addTarget(targets, dirPath, file) {
  var filePath = path.join(dirPath, file);

  try {
    // Check that the file exists
    fs.lstatSync(filePath).isFile();
  } catch (e) {
    // If file doesn't exist, skip it
    return;
  }

  // If file exists, add it as a target
  targets.push(filePath);
}
