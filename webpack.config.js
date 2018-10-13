const path = require("path");
const HtmlTemplatePlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "main.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /.js$/, exclude: /node_modules/, loader: "babel-loader" },
    ],
  },
  // plugins: [new HtmlTemplatePlugin()],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true
  }
};
