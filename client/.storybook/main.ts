const path = require('path');

module.exports = {
  stories: [path.resolve('../client/src/components/**/*.stories.tsx')],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async config => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
              },
              'ts-loader',
            ],
          },
          {
            test: /\.(png|jpg|svg)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
          src: path.resolve('src'),
        },
      },
    };
  },
};
