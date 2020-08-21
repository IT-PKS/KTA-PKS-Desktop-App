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
const rules = [
  // Fonts
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 1000, // if less than 10 kb, add base64 encoded image to css
        name: 'assets/[hash].[ext]', // if more than 10 kb move to this folder in build using file-loader
      },
    },
  },
  // Common Image Formats
  {
    test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/,
    use: {
      loader: 'url-loader',
    },
  },
];

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
  module: {
    rules,
  },
};

const productionConfig = {
  target: 'electron-renderer',
  entry,
  output: {
    ...output,
    publicPath: '../',
  },
  module: {
    rules,
  },
};

module.exports = merge.smart(
  baseConfig,
  env === 'production' ? productionConfig : developmentConfig,
);
