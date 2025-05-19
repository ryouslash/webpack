const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map", // ソースマップを有効化

  watch: true, // watch モードを有効化
  watchOptions: {
    ignored: /node_modules/, // 無視するファイルやディレクトリ
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // 配信ディレクトリ
    },
    port: 8080, // 任意のポート
    open: true, // ブラウザ自動オープン
    hot: true, // HMR（ホットリロード）
    watchFiles: ["src/**/*"], // 監視対象を拡張してもOK
  },
});
