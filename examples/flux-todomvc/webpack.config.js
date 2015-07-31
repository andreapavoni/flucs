var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './js/app.js',
  output: {
    path: __dirname,
    filename: './js/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'jsx-loader',
        exclude: /(node_modules)/
      }
    ]
  },
};
