/**
 * Webpack config for dev electron main process
 */

import webpack from 'webpack';
import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config.base';
import path from 'path';

const distDir = path.join(__dirname, 'src', 'dist');

export default merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'electron-main',
  entry: [path.join(__dirname, 'src', 'core', 'main.dev.ts')],
  output: {
    path: distDir,
    filename: 'core.main.dev.js',
  },
  plugins: [
    new FilterWarningsPlugin({
      exclude: /Critical dependency: the request of a dependency is an expression/,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
});
