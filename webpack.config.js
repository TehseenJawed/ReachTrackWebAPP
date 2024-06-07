let path = require('path');
import { resolve as _resolve } from 'path';

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
      alias: {
          '@': _resolve(__dirname, 'src'),
          'pages': _resolve(__dirname, 'src/pages'),
          'utils': _resolve(__dirname, 'src/utils'),
          'redux': _resolve(__dirname, 'src/redux'),
          'components': _resolve(__dirname, 'src/components'),
      },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    filename: 'bundle.js',
    path: _resolve(__dirname, 'dist'),
  },
};
