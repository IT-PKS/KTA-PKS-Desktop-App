/**
 * Builds the DLL for development electron renderer process
 */

import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config.base';
import pkg from './package.json';

const dependencies = pkg.dependencies;
const distDir = path.join(__dirname, 'src', 'dist', 'dll');

export default merge(baseConfig, {
  mode: 'development',
  context: process.cwd(),
  devtool: 'eval',
  target: 'electron-renderer',
  entry: {
    renderer: Object.keys(dependencies || {}).filter((dependency) => {
      const excludes = [];
      return !excludes.includes(dependency);
    }),
  },
  output: {
    library: 'renderer',
    path: distDir,
    filename: '[name].dev.dll.js',
    libraryTarget: 'var',
  },
  externals: [/^electron/],
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
      // Other
      {
        test: /\.(html|txt)(\?.*)?$/,
        loader: 'raw-loader',
      },
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(distDir, '[name].json'),
      name: '[name]',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: path.resolve(process.cwd(), 'src'),
        output: {
          path: path.resolve(process.cwd(), 'dll'),
        },
      },
    }),
  ],
});
