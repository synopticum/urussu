const path = require('path');
module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      src: path.resolve('src'),
      lodash: path.resolve('node_modules', 'lodash-es'),
    },
  },
};
