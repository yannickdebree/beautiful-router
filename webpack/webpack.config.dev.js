const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  watch: true,
  entry: path.resolve(__dirname, "../src/main.ts"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  output: {
    filename: "beautiful-router.min.js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [new MinifyPlugin()],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: true,
      }),
    ],
  },
};
