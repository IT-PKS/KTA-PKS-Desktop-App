/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import pkg from './src/package.json';

const distDir = path.join(__dirname, 'src', 'dist');

export default {
  externals: Object.keys(pkg.dependencies || {}),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['react-app', { flow: false, typescript: true }]],
            },
          },
        ],
      },
    ],
  },
  output: {
    path: distDir,
    filename: 'bundle.js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    plugins: [
      new TsConfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      }),
    ],
  },
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
};
