/**
 * Webpack config for dev electron main process
 */

const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.config.base');

const env = process.env.NODE_ENV;

const developmentConfig = {
  target: 'electron-main',
  entry: {
    main: [path.normalize(`${__dirname}/app/main/main.ts`)],
  },
  output: { filename: '[name].js' },
  devtool: 'eval-source-map',
  externals: [nodeExternals()],
};

const productionConfig = {
  target: 'electron-main',
  entry: {
    main: [path.normalize(`${__dirname}/app/main/main.ts`)],
  },
  output: { filename: '[name].js' },
};

module.exports = merge.smart(
  baseConfig,
  env === 'production' ? productionConfig : developmentConfig,
);
