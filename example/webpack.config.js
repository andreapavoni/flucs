var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './src/app.js',
  output: {
    path: __dirname,
    filename: './build/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loader: 'babel',
        exclude: /(node_modules)/
      }
    ]
  },
};
