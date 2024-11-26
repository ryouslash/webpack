const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  entry: { app: "./src/app.js", sub: "./src/sub.js" },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "js/[chunkhash].[name].js",
  },
  module: {
    rules: [
      // JS 用のローダー
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // CSS 用のローダー
      {
        // 対象となる拡張子を指定
        test: /\.(scss|sass|css)$/i,
        // どのローダーを噛ませるのかを指定（下から実行されていく。）
        use: [
          // styleタグを使ってCSS情報をHTML内に注入する処理
          // "style-loader",
          MiniCssExtractPlugin.loader,
          // CSS内でimportされているものをバンドル際に使用
          "css-loader",
          // ベンダープレフィックスが必要なものに自動的に付与
          "postcss-loader",
          // SASSからCSSへのコンパイルに使用
          "sass-loader",
        ],
      },
      // 画像用の設定（CSSで画像を使用する際、ビルド後のフォルダに画像を生成する）
      {
        // 対象となる拡張子を指定
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: "asset/resource", // 画像をアセットとして扱う
        generator: {
          filename: "img/[contenthash][ext]",
        },
      },
      // 画像用の設定（HTMLで画像を使用する際、ビルド後のフォルダに画像を生成する）
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      // フォント用の設定
      {
        // 対象となる拡張子を指定
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource", // フォントをアセットとして扱う
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    // 出力ディレクトリをビルドの度にクリーンしてくれるプラグイン
    new CleanWebpackPlugin(),
    // CSSを別ファイルに分離するプラグイン
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash].css",
    }),
    // JavaScriptの文法チェックを行なってくれるプラグイン
    new ESLintWebpackPlugin({
      extensions: ["js"], // ESLint を適用するファイルの拡張子
      fix: true, // 自動修正を有効化
    }),
    // JavaScript、CSSファイルを自動的にHTML内で読み込んでくれるプラグイン
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // filename: "",
      // chunk: [""],
      inject: "body", // 分割
    }),
  ],
};
