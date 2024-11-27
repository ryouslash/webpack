const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const outputFile = "[name].[chunkhash]";
const assetFile = "[name].[contenthash]";

module.exports = () =>
  merge(common({ outputFile, assetFile }), {
    mode: "production",
    plugins: [
      // 出力ディレクトリをビルドの度にクリーンしてくれるプラグイン
      new CleanWebpackPlugin(),
    ],
  });
