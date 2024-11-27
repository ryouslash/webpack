const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ outputFile, assetFile }) => ({
  entry: { app: "./src/js/app.js", sub: "./src/js/sub.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `js/${outputFile}.js`,
    chunkFilename: `js/${outputFile}.js`,
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
          filename: `img/${assetFile}[ext]`,
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
    // CSSを別ファイルに分離するプラグイン
    new MiniCssExtractPlugin({
      filename: `css/${outputFile}.css`,
    }),
    // JavaScriptの文法チェックを行なってくれるプラグイン
    new ESLintWebpackPlugin({
      extensions: ["js"], // ESLint を適用するファイルの拡張子
      fix: true, // 自動修正を有効化
    }),
    // ProvidePluginで定義された名前空間のプラグインが適用される（よく使うモジュールを登録）※eslintのglobalsに登録が必要
    new ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
    }),
    // JavaScript、CSSファイルを自動的にHTML内で読み込んでくれるプラグイン（ビルド後のファイルにWordPressタグを記載してく際は要削除。）
    // index.html
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      chunks: ["app"],
      // HTMLファイルもminify対象に含める（ビルド時のみ）
      ...(process.env.NODE_ENV === "production" && {
        minify: {
          collapseWhitespace: true, // 空白を削除
          removeComments: true, // コメントを削除
          removeRedundantAttributes: true, // 要素のデフォルト属性（冗長な属性）を削除
          removeScriptTypeAttributes: true, // <script> タグの type="text/javascript" を削除
          removeStyleLinkTypeAttributes: true, //<style> タグの type="text/css" を削除
          useShortDoctype: true, // ドキュメントのDOCTYPEを短縮形に変換
        },
      }),
    }),
    // about.html
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "about.html",
      inject: "body",
      chunks: ["sub"],
      // HTMLファイルもminify対象に含める（ビルド時のみ）
      ...(process.env.NODE_ENV === "production" && {
        minify: {
          collapseWhitespace: true, // 空白を削除
          removeComments: true, // コメントを削除
          removeRedundantAttributes: true, // 要素のデフォルト属性（冗長な属性）を削除
          removeScriptTypeAttributes: true, // <script> タグの type="text/javascript" を削除
          removeStyleLinkTypeAttributes: true, //<style> タグの type="text/css" を削除
          useShortDoctype: true, // ドキュメントのDOCTYPEを短縮形に変換
        },
      }),
    }),
  ],
  optimization: {
    // node_modules配下のモジュールは全て分割する
    splitChunks: {
      chunks: "all",
      minSize: 0,
      cacheGroups: {
        // サードパーティ製のライブラリ
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: false,
      },
    },
  },
  resolve: {
    alias: {
      "@scss": path.resolve(__dirname, "src/scss"),
      "@img": path.resolve(__dirname, "src/img"),
    },
  },
});
