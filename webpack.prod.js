const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const outputFile = "[name]";
const assetFile = "[name]";

module.exports = () =>
  merge(common({ outputFile, assetFile }), {
    mode: "production",
    plugins: [
      // 出力ディレクトリをビルドの度にクリーンしてくれるプラグイン（ビルド後のファイルにWordPressタグを記載してく際は要削除。）
      new CleanWebpackPlugin(),
    ],
  });
