---
title: "【2026年版】Obsidianの使い方完全ガイド｜Markdown記法から実践ワークフローまで"
source: "https://and-and.dev/blog/obsidian-guide-2026/"
author:
  - "[[電脳狐影]]"
published: 2026-02-17
created: 2026-08-11
description: "Obsidianの使い方を基本操作からMarkdown記法、プラグイン、Git連携まで図解付きで解説。完全無料で使えるローカル保存型メモアプリの始め方と、エンジニア・フリーランス向け実践ワークフローを紹介。"
tags:
  - "clippings"
---
4,000件以上の開発メモがEvernoteの中で朽ちていた。あるエンジニアがObsidianに移行した動機はそれだった。「書いたメモが二度と見つからない」問題を、Obsidianの双方向リンクとグラフビューが根本から解決する。

ローカルファイルだから動作は軽く、Markdownだからgrepもdiffも効く。基本アプリは個人・商用とも **無料** 。2,700を超えるコミュニティプラグインで拡張も自在だ。

この記事では、Obsidianの導入から独自のMarkdown記法、グラフビュー、Canvas、プラグインまで、スクリーンショット付きで解説する。 **特にエンジニア・フリーランスが実務で活かすためのGit連携やプラグイン構成に重点を置いた** 。

この記事はこんな人におすすめ

- メモアプリを探しているエンジニア・フリーランス
- Notion・Evernoteの重さやデータ所有権に不満がある方
- Markdownベースのナレッジ管理に興味がある方
- Obsidianを入れたものの使いこなせていない方

## Obsidianとは：ローカルファーストの無料メモアプリ

**Obsidian** は、カナダのDynalist社が開発したMarkdownベースのナレッジ管理アプリだ。macOS・Windows・Linux・iOS・Androidに対応する。

最大の特徴は **ローカルファースト** 。ノートはすべてプレーンテキスト（`.md` ファイル）としてPC上に保存される。Notionのようなクラウドサービスと違い、インターネット接続は不要。飛行機の中でも、山奥のキャンプ場でも、いつでもメモにアクセスできる。

### 「Obsidian」という名前の由来

なぜ「Obsidian（黒曜石）」なのか。共同創業者のErica Xuが [公式フォーラムで由来を明かしている](https://forum.obsidian.md/t/why-is-obsidian-named-so/4837) 。

> 「生の不安定な思考が溶岩（lava）だとしたら、Obsidianはまさに…Obsidian（黒曜石）だ。それはあなたの結晶化された、そして美しい知識である。」

**混沌とした思考を、構造化された美しい知識へ変える** 。それがこのアプリの根本思想だ。創業者たちはMinecraftのファンでもあり、ゲーム内で黒曜石が最も硬いブロックの一つであることも命名に影響した。「知識の耐久性」を暗に示している。

### 設計思想：「File over App」

ObsidianのCEO、Steph Angoが掲げる [「File over App」](https://stephango.com/file-over-app) というフィロソフィーが、このアプリの設計判断のすべてを貫いている。

> 「2060年代のコンピュータであなたの文章を読めるようにしたいなら、1960年代のコンピュータでも読める形式であることが重要だ。」

アプリは消えても、ファイルは残る。だからプレーンテキストのMarkdownを選んだ。だからローカル保存にこだわった。Obsidianは [公式サイト](https://obsidian.md/about) で5つの原則を「不変のもの（set in stone）」として掲げている。

1. **Accessible（アクセシブル）**: 基本機能は全ユーザーに無料提供
2. **Durable（耐久性）**: オープンなファイル形式でロックインを防ぐ
3. **Private（プライバシー）**: データはデバイスに保存。Obsidian側からはアクセス不能
4. **Customizable（カスタマイズ可能）**: プラグインとCSSで自由に拡張
5. **Independent（独立）**: VCからの資金調達なし。ユーザーに100%支えられている

VCに依存しないということは、「ユーザーのデータを収益化する」「ロックインを強化する」といったインセンティブが構造的に存在しないことを意味する。この点が、長期的にデータを預ける先としてObsidianを信頼できる根拠になっている。

NotionからObsidianに移行したあるユーザーは「データを取り戻すための第一歩だった」と [語っている](https://www.xda-developers.com/replacing-notion-with-obsidian-as-main-note-taking-app-here-how-it-went/) 。クラウドサービスの停止やサーバー障害によるデータ消失リスクがないという安心感は、長期的にナレッジを蓄積するうえで決定的だ。

![Obsidianの全体画面](https://and-and.dev/images/blog/obsidian-guide/obsidian-full-ui.png)

サイドバー、エディタ、グラフビューを同時表示した様子。ダークテーマが標準

### ローカルファイルの強み

Obsidianが生成するのは **ただのMarkdownファイル** だ。これが意味することは大きい。

- **grep可能**: ターミナルから全文検索できる
- **diff可能**: Gitで変更履歴を追える
- **可搬性**: Obsidianを辞めても、VS CodeやTyporaなどMarkdown対応エディタでそのまま開ける
- **スクリプト連携**: PythonやNode.jsから自由に処理できる

EvernoteやNotionの独自形式と違い、 **ツールの将来性に対する不安がない** 。Evernoteから移行した [あるSEブロガー](https://www.aruse.net/entry/2023/10/22/202954) は「マークダウン形式でローカルに保存されているので、いつでも別のアプリで開ける」という可搬性に安心感を覚えたと書いている。

なお、VS Codeでもmarkdownは書けるが、Obsidianの価値はそこではない。VS Codeは **コードを書くためのエディタ** 、Obsidianは **知識をつなげるためのツール** だ。バックリンク、グラフビュー、Canvasといった「つながりの可視化」はVS Codeにはない。両者は競合ではなく、併用する関係にある。

### 料金体系

| プラン | 料金 | 内容 |
| --- | --- | --- |
| **基本利用** | **無料** | 個人利用は完全無料。商用も基本アプリは無料で利用可能 |
| Obsidian Sync | 月額$4〜 | デバイス間のエンドツーエンド暗号化同期 |
| Obsidian Publish | 月額$8〜 | ノートをWebサイトとして公開 |

基本利用だけで十分実用的だ。同期はiCloudやGit（後述）で代替できるため、有料プランが必要になる場面は限られる。

※ 価格はUSドル建て。地域により別途税が加算される場合がある。最新の料金は [公式サイト](https://obsidian.md/pricing) を確認してほしい。

## インストールとVault作成

### ダウンロード

[obsidian.md](https://obsidian.md/) から対応OS版をダウンロードしてインストールする。macOSはHomebrew（ `brew install --cask obsidian` ）でも導入できる。

### Vault（保管庫）の作成

起動後、最初に表示されるのがVault作成画面だ。

![ObsidianのVault作成画面](https://and-and.dev/images/blog/obsidian-guide/obsidian-vault-creation.png)

初回起動時のVault作成画面（v1.11.7）。日本語UIに対応

**Vault** はObsidianにおける「作業フォルダ」のことだ。1つのVault = 1つのフォルダで、その中に作成したMarkdownファイルがすべて格納される。

**おすすめの運用方法**:

- 仕事用と個人用でVaultを分ける
- 1つのVaultに全部入れて、フォルダとタグで整理する（こちらが多数派）

Vaultの設定（テーマ、プラグイン、ショートカット等）はVaultごとに独立する。「仕事用はシンプルに、個人用はカスタマイズ満載」といった使い分けも可能だ。

最初のVaultの場所

iCloudやDropbox内にVaultを作成すると、追加費用なしでiPhoneやiPadと同期できる。macOSなら `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/` 配下がiCloud同期の標準パスだ。

## 基本操作

Obsidianの操作はシンプルだ。

- **新規ノート**: `Cmd/Ctrl + N`
- **クイックスイッチャー**: `Cmd/Ctrl + O` （ファイル名で瞬時に移動）
- **コマンドパレット**: `Cmd/Ctrl + P` （全機能を検索実行）
- **サイドバー切替**: `Cmd/Ctrl + B`

コマンドパレットはVS Codeと同じ操作感で、エンジニアなら直感的に使える。「Obsidianの操作を覚えること」はほぼ「ショートカットを数個覚えること」に等しい。

## Markdown記法ガイド：Obsidian独自拡張まで

Obsidianのノートは **Markdown** で書く。標準的なMarkdownに加え、Obsidian独自の拡張記法がいくつかある。ここでは基本から独自拡張まで順に紹介する。

Markdownに慣れている方は **[内部リンク](#%E5%86%85%E9%83%A8%E3%83%AA%E3%83%B3%E3%82%AFobsidian%E3%81%AE%E6%A0%B8%E5%BF%83%E6%A9%9F%E8%83%BD)** まで飛ばしてOKだ。

### 基本記法

```markdown
# 見出し1
## 見出し2
### 見出し3

**太字** / *斜体* / ~~取り消し線~~ / ==ハイライト==

- 箇条書き
- ネスト可能
  - インデントで階層化

1. 番号付きリスト
2. 自動で番号が振られる

- [x] 完了タスク
- [ ] 未完了タスク

> 引用文。複数行にまたがることも可能。

[リンクテキスト](https://example.com)

---（水平線）
```

`==ハイライト==` はObsidian独自の拡張記法だ。標準Markdownにはない。

### テーブル

```markdown
| レイヤー | 技術 |
|---------|------|
| フロントエンド | React 19 + TypeScript |
| バックエンド | Node.js + Hono |
| データベース | PostgreSQL |
```

パイプ `|` で列を区切り、ハイフン `-` でヘッダーと本体を分ける。Live Previewモード（編集中にリアルタイムで整形結果が表示されるモード）ではそのままテーブルとして表示される。

![Obsidianのエディタ画面](https://and-and.dev/images/blog/obsidian-guide/obsidian-editor-table.png)

テーブルがLive Previewでそのまま整形される。技術スタックの一覧管理に便利

### 内部リンク：Obsidianの核心機能

Obsidianで最も重要な記法が **内部リンク** （Wikilinks）だ。

```markdown
[[ノート名]]
[[ノート名|表示テキスト]]
[[ノート名#見出し]]
```

`[[` を入力した時点で候補がポップアップ表示され、既存ノートから選択できる。

![Obsidianの内部リンク候補](https://and-and.dev/images/blog/obsidian-guide/obsidian-internal-link.png)

\[\[を打つだけでリンク候補が表示される。ノート間を自然に接続できる

内部リンクの真価は **バックリンク** にある。ノートAからノートBにリンクすると、ノートBの「バックリンク」パネルにノートAが自動で表示される。この双方向のつながりが、Obsidianを単なるメモアプリではなく **ナレッジベース** にしている理由だ。

ライフハッカーで紹介されたレビューでは「メモが書きっぱなしで終わらず、実際に活かせる知識へと育っていく」と [評価されている](https://www.lifehacker.jp/article/2509-matome-obsidian/) 。書けば書くほどノート間のネットワークが密になり、過去の知識が自然と再浮上する仕組みだ。

### 埋め込み（Embed）

`!`を先頭に付けると、リンク先のノート内容がその場に展開される。

```markdown
![[ノート名]]           <!-- ノート全体を埋め込み -->
![[ノート名#見出し]]     <!-- 特定セクションだけ埋め込み -->
![[画像.png]]           <!-- 画像を埋め込み -->
![[document.pdf#page=3]] <!-- PDFの特定ページ -->
```

元のノートを更新すると、埋め込み先も自動で反映される。「単一の情報源（Single Source of Truth）」をメモの世界で実現する機能だ。

### Callout（吹き出し）

情報ボックスを簡単に作れる独自記法。

```markdown
> [!info] 情報
> 補足説明に使います。

> [!tip] ヒント
> 実用的なアドバイスを伝えるときに。

> [!warning] 注意
> 気をつけるべきポイントを強調。
```

他にも `danger` （危険）、 `example` （例）、 `quote` （引用）など多数のタイプがある。

![ObsidianのCallout表示](https://and-and.dev/images/blog/obsidian-guide/obsidian-callouts.png)

Calloutは種類ごとに色とアイコンが自動で変わる。文書の視認性が格段に上がる

`[!tip]+` のように `+` を付けるとデフォルト展開、 `-` を付けるとデフォルト折りたたみになる。長い注釈をコンパクトに収めたいときに使える。

### コードブロック

プログラミング言語を指定するとシンタックスハイライトが適用される。

```markdown
\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
\`\`\`
```
![Obsidianのコードハイライト](https://and-and.dev/images/blog/obsidian-guide/obsidian-code-highlight.png)

TypeScriptの型ガードやUtility Typesもきれいにハイライトされる

対応言語は数百に及ぶ。エンジニアの技術メモに最適な環境だ。

### Mermaid図

コードブロック内でMermaidを使うと、フローチャートやシーケンス図を描画できる。

```markdown
\`\`\`mermaid
gitGraph
    commit id: "init"
    branch develop
    commit id: "feat: auth"
    branch feature/api
    commit id: "feat: endpoints"
    checkout develop
    merge feature/api
    checkout main
    merge develop tag: "v1.0.0"
\`\`\`
```
![ObsidianでのMermaid図](https://and-and.dev/images/blog/obsidian-guide/obsidian-mermaid.png)

Mermaid記法のソースコードと、レンダリングされたGitブランチ図。Live Previewではリアルタイムに描画される

フローチャート（ `graph` ）、シーケンス図（ `sequenceDiagram` ）、ER図（ `erDiagram` ）、ガントチャート（ `gantt` ）など、Mermaid公式の全記法に対応している。外部ツールを使わずに図を作れるのは大きい。

### その他の便利な記法

```markdown
<!-- タグ -->
#プロジェクト #開発/フロントエンド   <!-- 階層タグ対応 -->

<!-- 脚注 -->
これは脚注付きの文章[^1]。
[^1]: 脚注の内容がここに入る。

<!-- 数式（LaTeX） -->
$E = mc^2$                          <!-- インライン数式 -->
$$\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n$$  <!-- ブロック数式 -->

<!-- コメント（非表示） -->
%%この文は表示されない。下書きメモに便利%%
```

タグは `#親タグ/子タグ` の形式で階層管理できる。プロジェクト別・技術別の整理に効果的だ。

## グラフビュー：ノート間の関係を可視化する

グラフビューはObsidianの象徴的な機能だ。Vault内のすべてのノートとリンク関係を **ネットワーク図** として描画する。

![Obsidianのグラフビュー](https://and-and.dev/images/blog/obsidian-guide/obsidian-graph-view.png)

グラフビューでVault全体の構造を俯瞰。リンクが多いノートほど大きく表示される

正直なところ、少ないノート数ではグラフビューの真価は見えにくい。だが **ノートが100を超えたあたりから景色が変わる** 。思いもよらなかったノート同士のつながりが可視化され、アイデアの発見装置として機能し始める。

グラフビューの実用的な使い方:

- **孤立ノートの発見**: どこからもリンクされていないノートを特定し、既存の知識体系に組み込む
- **ハブノートの確認**: リンクが集中するノートは「核となる概念」。目次やMOC（Map of Content）として整備する価値がある
- **フィルタリング**: タグやフォルダでフィルタし、特定テーマのサブグラフだけ表示できる

## デイリーノート：日次の記録と振り返り

コア機能として組み込まれている **デイリーノート** は、日付をタイトルにしたノートを自動生成する機能だ。

![Obsidianのデイリーノート](https://and-and.dev/images/blog/obsidian-guide/obsidian-daily-note.png)

デイリーノートの実例。タスク管理・開発メモ・振り返りを1つのノートに集約

Zennに投稿された記事では、新卒エンジニアが「複雑なロジックについてまとめた表を見ることで、口頭やチャットだけでは認識がズレがちな内容も一発で理解できた」と [報告している](https://zenn.dev/flinters_blog/articles/97dc0c22eed93b) 。デイリーノートに開発ログを残し、内部リンクで関連するプロジェクトノートに接続する。この習慣がミスの防止と知識の定着に直結する。

**テンプレートと組み合わせると強力** 。Templaterプラグイン（後述）を使えば、毎日同じフォーマットのノートが自動生成される。

```markdown
## {{date}}

### 今日やること
- [ ]

### メモ

### 振り返り
```

## Canvas：無限ホワイトボード

**Canvas** はObsidian 1.1で追加されたビジュアルツールだ。ノート・画像・PDF・Webページを自由に配置し、矢印でつなげる **無限ホワイトボード** として機能する。

![ObsidianのCanvas](https://and-and.dev/images/blog/obsidian-guide/obsidian-canvas.png)

Canvasでプロジェクトの全体像を可視化。各カードは既存ノートへのリンク

Canvasの用途は幅広い。

- **プロジェクトの全体設計**: アーキテクチャ図をノートカードで構成
- **ブレインストーミング**: アイデアをカードで並べ、関連性を矢印で整理
- **学習マップ**: 技術トピック間の依存関係を可視化

Canvasファイル（`.canvas` ）の実体はJSONで、Gitでの差分管理も可能だ。

## プラグインで拡張する

Obsidianのコミュニティプラグインは **2,700以上** 。設定画面からワンクリックで導入できる。

![Obsidianのプラグイン一覧](https://and-and.dev/images/blog/obsidian-guide/obsidian-community-plugins.png)

コミュニティプラグインは2,700以上。Excalidraw、Templater、Dataviewが人気上位

### エンジニアにおすすめのプラグイン

| プラグイン | 用途 | DL数 |
| --- | --- | --- |
| **Dataview** | SQLライクなクエリでノートをDB的に操作 | 370万+ |
| **Templater** | JavaScript対応の高度なテンプレートエンジン | 370万+ |
| **Excalidraw** | 手書き風ホワイトボード | 540万+ |
| **Git** | 自動commit & push、差分表示 | 210万+ |
| **Kanban** | カンバンボードでタスク管理 | 210万+ |
| **Tasks** | 期限・優先度付きのタスク管理 | 310万+ |
| **Calendar** | デイリーノートのカレンダー表示 | — |
| **Advanced Tables** | テーブル編集を強化（Tab移動、ソート等） | 260万+ |

### Git連携：エンジニアの本領

**Obsidian Gitプラグイン** はエンジニアにとって特に価値が高い。VaultをGitリポジトリとして管理し、自動commit & pushを設定できる。

![Obsidian Gitプラグイン](https://and-and.dev/images/blog/obsidian-guide/obsidian-git-plugin.png)

Gitプラグインの差分ビュー。ファイルの変更履歴がObsidian内で確認できる

Obsidian Gitプラグインを使えば、VaultをGitHubに自動commit & pushでき、5分おきの自動同期も設定可能だ。 [Zennの解説記事](https://zenn.dev/harieshokunin/articles/5a827bee5d2355) でも紹介されているとおり、Obsidian Syncの月額$4を払わなくても、Gitを使えば **無料でデバイス間同期** が実現する。Gitは行単位の変更追跡だからファイル競合にも強い。Git管理と併せてAIコーディングエージェントを導入すると開発速度が劇的に変わる。詳しくは [Claude Code vs Codex 徹底比較](https://and-and.dev/blog/claude-code-vs-codex-2026) を参照してほしい。

設定手順:

1. プラグインをインストール
2. VaultをGitリポジトリとして初期化（ `git init` ）
3. GitHubにリモートリポジトリを作成してpush
4. プラグイン設定で自動backup間隔を設定（推奨: 5〜10分）

Git連携のメリット

メモの変更履歴がコミットログとして残るため、「あの時のメモに戻したい」がいつでも可能。エンジニアのワークフローにシームレスに統合できる。

## Notion・Evernoteからの移行

### Obsidian vs Notion

| 比較項目 | Obsidian | Notion |
| --- | --- | --- |
| **データ保存** | ローカル（Markdown） | クラウド（独自形式） |
| **オフライン** | 完全対応 | 一部対応（制限あり） |
| **動作速度** | 高速 | 大量データ時にレスポンスが低下する場合がある |
| **共同編集** | 非対応（Publishで共有は可能） | リアルタイム共同編集 |
| **カスタマイズ** | プラグイン・CSS完全自由 | ブロック単位の構成 |
| **料金** | 基本無料 | 無料プランに制限あり |

[ライフハッカーの記事](https://www.lifehacker.jp/article/2505-switched-from-notion-to-obsidian/) では、長年Notionを使用したユーザーが「使い込むほど動作が重くなった」ことを理由にObsidianへ切り替えた事例が紹介されている。一方、チームでのリアルタイム共同編集が必須ならNotionに軍配が上がる。

**判断基準はシンプル**:

- **個人の知識管理・長期蓄積** → Obsidian
- **チームのプロジェクト管理・共同作業** → Notion

### Notionからの移行

NotionにはMarkdownエクスポート機能がある。

1. Notionの設定 → 「エクスポート」 → 「Markdown & CSV」形式を選択
2. ダウンロードしたZIPを展開
3. Obsidianの設定 → 「Importer」プラグインを有効化し、Notion形式でインポート

Notionのデータベースは完全には再現されないが、テキスト部分はMarkdownとして読める形で変換される。まずは一部のページで試してみることをおすすめする。

### Evernoteからの移行

Evernoteからの移行は公式のインポーターツールが用意されている。

1. Evernoteからノートを `.enex` 形式でエクスポート
2. Obsidianの設定 → 「Importer」プラグインを有効化
3. `.enex` ファイルを指定してインポート

画像や添付ファイルも含めてMarkdownに変換される。数千件のノートでも数分で完了する。

## Obsidianを最大限に活用するコツ

実際にObsidianを使い込んでいるユーザーの知見をもとに、活用のコツをまとめる。

**1\. リンクファーストで書く** ノートを書くときは「このメモは何と関連するか」を常に意識する。 `[[` を積極的に使い、孤立ノートを作らない。バックリンクのネットワークが密になるほど、Obsidianの価値は指数関数的に上がる。

**2\. MOC（Map of Content）を作る** 特定テーマのリンクを集約した「目次ノート」を作る。たとえば `[[TypeScript]]` というMOCノートに、型ガード・Utility Types・設定ファイルなどのリンクをまとめる。グラフビューで「ハブ」として機能する。

**3\. デイリーノートを起点にする** 朝デイリーノートを開き、今日のタスクを書く。作業中にメモを取ったら内部リンクで関連ノートに接続。振り返り欄で1日を締める。何ヶ月もこの習慣を続けたユーザーが [Obsidianフォーラム](https://forum.obsidian.md/t/my-complete-obsidian-workflow-to-manage-my-life/64522) で「Obsidianが依存していたツールの半分をゆっくりと置き換えた」と報告している。

**4\. 完璧を求めない** 最初から整理されたVaultを目指す必要はない。まず書く。リンクする。整理は後からでいい。Obsidianのグラフビューが、構造化すべきタイミングを教えてくれる。

## まとめ

Obsidianは「メモアプリ」という枠を超えた **パーソナルナレッジベース** だ。

- **ローカルファースト**: データの完全な所有権。オフラインでも動作
- **Markdown**: 普遍的なフォーマット。ツールに依存しない
- **双方向リンク**: 書くほどつながる。知識が勝手に育つ
- **拡張性**: 2,700以上のプラグインで何にでもなる
- **無料**: 個人も商用も基本機能は完全無料

ローカルのMarkdownファイルという「当たり前」の形式を選んだことで、Obsidianは10年後も使い続けられるツールになっている。クラウドサービスの興亡に左右されない、自分だけのナレッジベースを構築しよう。

まだ試していないなら、 [obsidian.md](https://obsidian.md/) から無料でダウンロードして、今日のタスクリストを1つ書いてみてほしい。5分あればVaultの作成からノートの作成まで完了する。

開発効率をさらに上げたいなら、 [フリーランスにおすすめのAIツール10選](https://and-and.dev/blog/freelance-ai-tools-2026) も参考にしてほしい。Obsidianでナレッジを整理しつつ、AIツールで作業を加速する。この組み合わせがフリーランスエンジニアの生産性を引き上げる。フリーランスとしてのキャリア設計全体像は [未経験からフリーランスエンジニアになるロードマップ](https://and-and.dev/blog/freelance-engineer-roadmap) で解説している。

---

※ 本記事の情報は2026年2月時点のものです。料金・機能・プラグイン数等は変更される場合があります。最新情報は各公式サイトをご確認ください。

※ Obsidianは Dynalist Inc. の商標です。Notion、Evernote、VS Code、GitHub、その他記載の製品名・サービス名は、各社の商標または登録商標です。