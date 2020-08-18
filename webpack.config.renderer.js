/* tslint:disable no-console */
/**
 * Build config for development core renderer process that uses
 * Hot-Module-Replacement
 *
 * https://webpack.js.org/concepts/hot-module-replacement/
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config.base');

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV;
const entry = {
  main: [path.normalize(`${__dirname}/app/index.tsx`)],
};
const output = {
  chunkFilename: 'renderer.[id].chunk.js',
  filename: 'renderer.[name].js',
};

const developmentConfig = {
  target: 'electron-renderer',
  entry,
  output: {
    ...output,
    publicPath: `http://localhost:${port}/`,
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(path.normalize(`${__dirname}/app/dist/dll/renderer.json`)),
      sourceType: 'var',
    }),
    new webpack.NamedModulesPlugin(),
  ],
};

const productionConfig = {
  target: 'electron-renderer',
  entry,
  output: {
    ...output,
    publicPath: '/',
  },
};

module.exports = merge.smart(
  baseConfig,
  env === 'production' ? productionConfig : developmentConfig,
);
