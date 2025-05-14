const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    main: ["/src/js/main.js", "./src/scss/style.scss"],
  },
  output: {
    //出力先
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: {
    jquery: "jQuery",
  },
  module: {
    rules: [
      {
        // JS用のローダー
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        // SASS 用のローダー
        // 対象となる拡張子を指定
        test: /\.scss$/i,
        // どのローダーを噛ませるのかを指定（下から実行されていく。）
        use: [
          // CSSを別ファイルに分けられるプラグイン
          MiniCssExtractPlugin.loader,
          // CSSファイルをJavaScriptでimportできるようにするローダー
          "css-loader",
          // ベンダープレフィックスが必要なものに自動的に付与
          "postcss-loader",
          // SASSからCSSへのコンパイルに使用
          // "sass-loader",
          // 以下の書き方だとソースマップのファイル名は壊れる
          {
            loader: "sass-loader",
            options: {
              api: "modern-compiler",
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          // CSSを直接headタグ内に記述する
          "style-loader",
          // CSSファイルをJavaScriptでimportできるようにするローダー
          "css-loader",
          // ベンダープレフィックスが必要なものに自動的に付与
          "postcss-loader",
        ],
      },
      //Asset Modules
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
    ],
  },
  //プラグインの設定（plugins プロパティの配列に追加）
  plugins: [
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        // エントリーポイント名に応じて異なるファイル名を出力する
        return pathData.chunk.name === "main"
          ? "css/style.css"
          : "css/[name].css";
      },
    }),
  ],
  //圧縮（minify）の設定
  optimization: {
    //minimize: true,  //モードに関わらず常に圧縮を有効にする場合は指定
    minimizer: [
      `...`, //JavaScript の圧縮を有効に（デフォルトの圧縮の設定を適用）
      new CssMinimizerPlugin({
        parallel: true, //ビルド速度を向上
      }),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 0,
      minChunks: 2,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name: "vendors", // vendor.js として出力
        },
        utility: {
          test: /[\\/]src[\\/]js[\\/]/,
          priority: -5,
          reuseExistingChunk: true,
          name: "utility",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@scss": path.resolve(__dirname, "src/scss"),
      "@js": path.resolve(__dirname, "src/js"),
      "@img": path.resolve(__dirname, "src/img"),
    },
  },
};
