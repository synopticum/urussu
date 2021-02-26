require('dotenv').config();
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';

const config = {
  name: 'server',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.ts',
  target: 'node',
  performance: {
    hints: false,
  },
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin(Object.keys(process.env).filter(x => x !== 'API_URL')),
  ],
  externals: nodeExternals(),
  output: {
    path: path.resolve(path.join('.', 'dist')),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          'ts-loader',
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        common: {
          minChunks: 2,
          name: 'common',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      src: path.resolve('src'),
    },
  },
  resolveLoader: {
    modules: ['node_modules', 'src/loaders'],
  },
};

export default config;
