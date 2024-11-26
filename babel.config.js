module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          // 対応させたいブラウザのバージョンを指定
          targets: [
            "last 1 version",
            "> 1%",
            "maintained node versions",
            "not dead",
          ],
          // 必要なポリフィル（新しい JavaScript 機能を古い環境で動作させるためのコード）を自動的にインポート
          useBuiltIns: "usage",
          corejs: 3,
        },
      ],
    ],
  };
};
