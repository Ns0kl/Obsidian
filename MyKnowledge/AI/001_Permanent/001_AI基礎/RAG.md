# RAG

## 概要
- RAG (Retrieval-Augmented Generation) RAG とは、データベースの検索結果を元に、LLM (生成 AI) が回答を生成する技術です。
- [※生成 AI はテキスト/画像/音声などを生成、LLM は生成 AI の中でテキスト生成に特化したもの](https://www.nec-solutioninnovators.co.jp/sp/contents/column/20240229_llm.html)

![](https://hogetech.info/wp-content/uploads/2024/07/612f43071a2a0f44423b8bcb86c93e1a-6.png)

RAG の データベース には、 ベクトルデータベース がよく利用されます。

LLM に直接質問しない理由は、LLM が答えを知らなかったり、事実とは異なる嘘の情報を生成する (ハルシネーションと呼ぶ) 場合があるからです。

![](https://hogetech.info/wp-content/uploads/2024/08/01e20b05948409296d32314122ce234d-13.png)

![](https://hogetech.info/wp-content/uploads/2024/08/deb17bd5bd307fcd49379fd7617489d9-14.png)

そこで、 [データベース](https://hogetech.info/database/what-is-the-database "データベース") から関連情報を取得し、この情報を元に回答を生成します。

## なぜ重要か

## 重要ポイント
- ### RAG の構成
RAG は主に以下の２つから構成されます。

- [データベース](https://hogetech.info/database/what-is-the-database "データベース") ([セマンティック検索](https://hogetech.info/database/elasticsearch#semantic "セマンティック検索") をするために、 [ベクトルデータベース](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") を使うことが多い)
- LLM (大規模言語モデル)
![](https://hogetech.info/wp-content/uploads/2024/08/01e20b05948409296d32314122ce234d.png)

[ベクトルデータベース](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") は、関連性の高いデータを検索することが得意とします。

そのため、通常のキーワード検索ではヒットしないようなドキュメントを検索できます。

![](https://hogetech.info/wp-content/uploads/2024/08/7bbefb8f231d232d8ec6a01c33469eec-7.png)


## RAG のメリットについて

RAG を利用することで、以下の２点が実現できます。

- LLM が知らない (学習していない) 情報を回答できる
- ハルシネーションを抑制できる

### RAG を使わない場合

LLM が知らない情報を質問すると、求めている回答が得られません。

![](https://hogetech.info/wp-content/uploads/2024/07/01e20b05948409296d32314122ce234d-6.png)

![](https://hogetech.info/wp-content/uploads/2024/07/2d1e43d8c2c294ec8a486118ee01f5f4.png)

LLM は知らない情報を答えられていません。

### RAG を使う場合

冒頭で説明したとおり、RAG を使うと以下の利点があります。

- LLM が知らない (学習していない) 情報を回答できる
- ハルシネーションを抑制できる

#### LLM が知らない情報を回答

LLM が知らない情報でも、 [データベース](https://hogetech.info/database/what-is-the-database "データベース") から検索した情報を元に、LLM が回答を生成します。

![](https://hogetech.info/wp-content/uploads/2024/09/8da89575c9b3441c9971d7a8cbab1c3e.png)

ユーザーの質問を以下のように書き換えて、LLM に渡します。

- \<excerpts> に、 [ベクトルデータベース](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") で検索したドキュメントの内容
- \<question> に、LLM への質問
![](https://hogetech.info/wp-content/uploads/2024/07/c505200f78f52ab98cc5766f79390fc4.png)

LLM が知らない情報でも、 [ベクトルデータベース](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") で検索したドキュメントを元に、回答を生成できました。

#### ハルシネーションを抑制

![](https://hogetech.info/wp-content/uploads/2024/07/2af69a3f7b5d15bc7d4fd486dbba8079.png)

知らないことは知らないと言えました。(嘘の文章を作成しません。)
## 関連
[[LLM]]
[[Azure AI Search]]


## 参考資料
[[【入門】Elasticsearchとは？用途や使い方をわかりやすく解説]]
[[ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説]]
[[RAG (検索拡張生成) の仕組みをわかりやすく解説]]
[[LLM（大規模言語モデル）とは？生成AIとの違いや仕組みを解説  NECソリューションイノベータ]]
