## CSS 設計：ベースとして基本は FLOCSS を採用（各フォルダの意味は以下の通り。）

### foundation

リセット系 CSS やベース CSS、変数やブレイクポイントなどを設定しているファイル類。

### layout

header、footer などレイアウトに関連するもの。例）l-header、l-footer

### object ＞ component

2 ページ以上で共通のコンポーネント要素を格納。 例）c-button、c-title

### object ＞ project

2 ページ以上で共通のプロジェクト要素を格納。 例）p-gnav、p-postList

### object ＞ utility

utility 要素。

### pages > ページ名 > project

各ページでしか使わないプロジェクト要素を格納。クラス名は「p-ページ名-プロジェクト名」とする。 例）p-top-about、p-about-profile

### templates > テンプレート名 > project

固定ページ、投稿、カスタム投稿のテンプレートファイルでしか使わないプロジェクト要素を格納。

各固定ページの固有スタイルは pages > ページ名で管理するが、テンプレート全体で変更したい箇所がある場合はこちらに記述する。（ページヘッダーなど、基本は object ＞ component、object ＞ project で対応。）

クラス名の付け方は以下の通り。

- 投稿ページ「p-single-プロジェクト名」
- 投稿アーカイブ「p-archive-プロジェクト名」（Date、Category、Tag、Author を分けない場合）、「p-タクソノミー名-archive-プロジェクト名」（Date、Category、Tag、Author を分ける場合）
- 固定ページ「p-page-プロジェクト名」
- アーカイブページ「p-archive-プロジェクト名」（タクソノミー毎に分ける場合は、「p-タクソノミー名-archive-プロジェクト名」）
- Blog Posts Index ページ「p-index-プロジェクト名」
- カスタム投稿ページ「p-single-カスタム投稿名-プロジェクト名」
- カスタム投稿アーカイブページ「p-archive-カスタム投稿名-プロジェクト名」
  ※「p-archve-work-work」（カスタム投稿「work」アーカイブテンプレート内の実績セクションの場合） などになる場合は、2 回繰り返さず「p-archive-work」で OK。
- カスタムタクソノミーアーカイブページ「p-カスタムタクソノミー名-archive-カスタム投稿名-プロジェクト名」
  ※カスタムタクソノミーが 1 つの場合は、「p-taxonomy-archive-カスタム投稿名-プロジェクト名」で OK。

## ファイルを複製して別プロジェクトで使用する方法

yarn.lock と node_modules を削除して、yarn install をインストールして使って下さい。
