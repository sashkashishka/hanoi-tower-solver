const webpackConfig = require('./webpack.common.js');

module.exports = {
  ...webpackConfig,
  mode: 'production',
  devtool: 'cheap-module-source-map',
};
