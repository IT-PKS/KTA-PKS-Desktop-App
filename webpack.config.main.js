/**
 * Webpack config for dev electron main process
 */

const merge = require('webpack-merge');
const path = require('path');
const omit = require('lodash/omit');
const baseConfig = require('./webpack.config.base');

const env = process.env.NODE_ENV;

const developmentConfig = {
  target: 'electron-main',
  entry: {
    main: [path.normalize(`${__dirname}/app/main/main.ts`)],
  },
  output: { filename: '[name].js' },
  devtool: 'eval-source-map',
};

const productionConfig = omit(developmentConfig, 'devtool');

module.exports = merge.smart(
  baseConfig,
  env === 'production' ? productionConfig : developmentConfig,
);
