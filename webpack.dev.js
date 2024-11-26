const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const outputFile = "[name]";
const assetFile = "[name]";

module.exports = () =>
  merge(common({ outputFile, assetFile }), {
    mode: "development",
    devtool: "source-map", // ソースマップを有効化
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
