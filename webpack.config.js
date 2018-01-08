const webpack = require("webpack");
const DashboardPlugin = require("webpack-dashboard/plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app"
  },
  output: {
    path: __dirname + "/dist",
    filename: "app.min.js"
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 2,
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            },
            "sass-loader"
          ]
        })
      }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css"),

    new DashboardPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  target: "electron-renderer"
};
