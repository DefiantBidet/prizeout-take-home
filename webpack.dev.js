const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
      contentBase: './dist',
      historyApiFallback: true,
      disableHostCheck: true,
      // host:'local',
      hot: true,
      port: 8169
  },
});
