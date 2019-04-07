const path = require('path');

const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const targetEnv = process.env.TARGET_ENV || 'firefox';
const isProduction = process.env.NODE_ENV === 'production';

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      TARGET_ENV: JSON.stringify(targetEnv)
    },
    global: {}
  }),
  isProduction ? new LodashModuleReplacementPlugin({shorthands: true}) : null
];
plugins = plugins.filter(Boolean);

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    background: './src/background/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist', targetEnv, 'src'),
    chunkFilename: '[name]/script.js'
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        default: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.json']
  },
  devtool: false,
  plugins
};
