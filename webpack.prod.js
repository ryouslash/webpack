const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const outputFile = "[name].[chunkhash]";
const assetFile = "[name].[contenthash]";

module.exports = () =>
  merge(common({ outputFile, assetFile }), {
    mode: "production",
    plugins: [
      // JavaScript、CSSファイルを自動的にHTML内で読み込んでくれるプラグイン
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        // filename: "",
        // chunk: [""],
        inject: "body", // 分割
      }),
    ],
  });
