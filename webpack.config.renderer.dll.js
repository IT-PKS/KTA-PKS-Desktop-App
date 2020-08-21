/**
 * Builds the DLL for development electron renderer process
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const pkg = require('./package.json');

const dependencies = pkg.dependencies;
const distDir = path.normalize(`${__dirname}/app/dist/dll`);

const dllConfig = {
  context: process.cwd(),
  devtool: 'eval',
  target: 'electron-renderer',
  entry: {
    renderer: Object.keys(dependencies || {}).filter(dependency => {
      const excludes = [];
      return !excludes.includes(dependency);
    }),
  },
  output: {
    library: 'renderer',
    path: distDir,
    filename: '[name].dll.js',
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
};

module.exports = merge.smart(baseConfig, dllConfig);
