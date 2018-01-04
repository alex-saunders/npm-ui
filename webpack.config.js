const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = { 
  entry: {
    app: './src/app'
  },  
  output: {
    path: __dirname + '/dist',
    filename: 'app.min.js'
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        loader: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: []
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin(),
    new DashboardPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  target: 'electron-renderer'
}