const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const outputFile = "[name]";
const assetFile = "[name]";

module.exports = () =>
  merge(common({ outputFile, assetFile }), {
    mode: "development",
    devtool: "source-map", // ソースマップを有効化
    devServer: {
      open: true,
      static: "./dist",
      watchFiles: {
        paths: ["src"], // 監視対象のパス
        options: {
          ignored: /node_modules/, // 無視するファイルやディレクトリ
        },
      },
    },
  });
