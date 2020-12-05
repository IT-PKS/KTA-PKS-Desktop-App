const path = require('path');
const webpack = require('webpack');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  optimization: {
    minimize: false
  },
  externals: {
    sqlite3: 'commonjs sqlite3',
    typeorm: 'commonjs typeorm'
  },
  output: {
    path: path.normalize(`${__dirname}/app/dist`),
    filename: 'bundle.js',
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      'kta-ui-components': `${__dirname}/app/components/base/index.ts`,
      'client': `${__dirname}/app/client`,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsConfigPathsPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: "./app/database/kta-pks.sql", to: "./app/database/kta-pks.sql" }
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  module: {
    rules: [{
      test: /\.(j|t)s(x)?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },],
  },
};