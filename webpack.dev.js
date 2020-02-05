const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.common.js');

module.exports = {
  ...webpackConfig,
  mode: 'development',
  devtool: 'inline-cheap-source-map',

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8080,
    inline: true,
    stats: 'minimal',
    watchContentBase: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
