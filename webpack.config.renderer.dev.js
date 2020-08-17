/* tslint:disable no-console */
/**
 * Build config for development core renderer process that uses
 * Hot-Module-Replacement
 *
 * https://webpack.js.org/concepts/hot-module-replacement/
 */

import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { spawn, execSync } from 'child_process';
import baseConfig from './webpack.config.base';

const port = process.env.PORT || 4040;
const publicPath = `http://localhost:${port}/dist`;
const distDir = path.join(__dirname, 'src', 'dist');
const dllDir = path.join(distDir, 'dll');
const manifest = path.resolve(dllDir, 'renderer.json');

const baseEntry = [require.resolve('react-hot-loader/patch')];

export default merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'electron-renderer',
  entry: {
    main: [...baseEntry, path.join(__dirname, 'src', 'index.tsx')],
  },
  output: {
    chunkFilename: '[id].chunk.js',
    filename: '[name].bundle.js',
    publicPath: `${publicPath}/`,
  },
  externals: [],
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
  module: {
    rules: [
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/,
        use: 'url-loader',
      },
      // Raw file loader
      {
        test: /\.(html|txt)(\?.*)?$/,
        loader: 'raw-loader',
      },
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifest),
      sourceType: 'var',
    }),
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.NamedModulesPlugin(),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
});
