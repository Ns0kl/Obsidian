---
title: "RAG (検索拡張生成) の仕組みをわかりやすく解説"
source: "https://hogetech.info/ml/rag"
author:
  - "[[ほげほげテクノロジー - IT 技術学習サイト]]"
published: 2024-08-03
created: 2026-08-11
description: "RAG (Retrieval-Augmented Generation) RAG とは、データベースの検索結果を元に、LLM (生成 AI) が回答を生成する技術です。※生成 AI はテキスト/画像/音声などを生成、LLM は生成 AI の..."
tags:
  - "clippings"
---
RAG (Retrieval-Augmented Generation) RAG とは、データベースの検索結果を元に、LLM (生成 AI) が回答を生成する技術です。

[※生成 AI はテキスト/画像/音声などを生成、LLM は生成 AI の中でテキスト生成に特化したもの](https://www.nec-solutioninnovators.co.jp/sp/contents/column/20240229_llm.html)

![](https://hogetech.info/wp-content/uploads/2024/07/612f43071a2a0f44423b8bcb86c93e1a-6.png)

RAG の データベース には、 ベクトルデータベース がよく利用されます。

LLM に直接質問しない理由は、LLM が答えを知らなかったり、事実とは異なる嘘の情報を生成する (ハルシネーションと呼ぶ) 場合があるからです。

![](https://hogetech.info/wp-content/uploads/2024/08/01e20b05948409296d32314122ce234d-13.png)

![](https://hogetech.info/wp-content/uploads/2024/08/deb17bd5bd307fcd49379fd7617489d9-14.png)

そこで、 [データベース](https://hogetech.info/database/what-is-the-database "データベース") から関連情報を取得し、この情報を元に回答を生成します。

データマネジメント

<table><thead><tr><th colspan="4">RAG (検索拡張生成)</th></tr></thead><tbody><tr><td><p><a href="https://hogetech.info/bigdata/elasticsearch"><img src="https://hogetech.info/wp-content/uploads/2024/08/612f43071a2a0f44423b8bcb86c93e1a-3.png" width="200"><br>Elasticsearch</a></p></td><td width="25%"><p><a href="https://hogetech.info/ml/algorithm/knn"><img src="https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-5.png"> KNN</a></p></td><td><p><a href="https://hogetech.info/database/vector"><img src="https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-3.png" width="200"><br>ベクトルデータベース</a></p></td><td><p><a href="https://hogetech.info/ml/rag"><img src="https://hogetech.info/wp-content/uploads/2024/08/01e20b05948409296d32314122ce234d-4.png" width="200"><br>RAG</a></p></td></tr></tbody></table>

<table><thead><tr><th colspan="5">ディープラーニング</th></tr></thead><tbody><tr><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic1"><img src="https://hogetech.info/wp-content/uploads/2022/03/612f43071a2a0f44423b8bcb86c93e1a-9.png"><br>DeepLearning</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic2"><img src="https://hogetech.info/wp-content/uploads/2023/10/612f43071a2a0f44423b8bcb86c93e1a-1.png" width="180"><br>NeuralNetwork</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic3"><img src="https://hogetech.info/wp-content/uploads/2022/03/tree-forwradmode-1-1024x583.png" width="180"><br>誤差逆伝播法</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic4"><img src="https://hogetech.info/wp-content/uploads/2022/03/matplot003-12-2.gif" width="180"><br>アルゴリズム</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic5"><img src="https://hogetech.info/wp-content/uploads/2022/03/479089b78010423b5702baaaa414bf52-4.png" width="180"><br>CNN</a></p></td></tr></tbody></table>

![ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装](https://m.media-amazon.com/images/I/513J77QZHgL._SL160_.jpg)

ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装

[ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装](https://www.amazon.co.jp/dp/4873117585?tag=api0e-22&linkCode=ogi&th=1&psc=1 "ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装")

オライリージャパン

[Amazonの商品レビュー・口コミを見る](https://www.amazon.co.jp/product-reviews/4873117585/?tag=api0e-22)

## RAG の構成

RAG は主に以下の２つから構成されます。

- [データベース](https://hogetech.info/database/what-is-the-database "データベース") ([セマンティック検索](https://hogetech.info/database/elasticsearch#semantic "セマンティック検索") をするために、 [ベクトルデータベース](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") を使うことが多い)
- LLM (大規模言語モデル)
![](https://hogetech.info/wp-content/uploads/2024/08/01e20b05948409296d32314122ce234d.png)

[ベクトルデータベース](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") は、関連性の高いデータを検索することが得意とします。

そのため、通常のキーワード検索ではヒットしないようなドキュメントを検索できます。

![](https://hogetech.info/wp-content/uploads/2024/08/7bbefb8f231d232d8ec6a01c33469eec-7.png)

#### ベクトルデータベースの種類

[ベクトルデータベース](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") には、 [Elasticsearch](https://hogetech.info/bigdata/elasticsearch "【入門】Elasticsearchとは？用途や使い方をわかりやすく解説"), [OpenSearch](https://hogetech.info/bigdata/elasticsearch "【入門】Elasticsearchとは？用途や使い方をわかりやすく解説"), Pinecone, redis, pgvector などが存在します。

データマネジメント

![](https://hogetech.info/wp-content/uploads/2024/08/b5d634c30847f11a291ecf8d95ac5150.png)

一例として、 [OpenSearch](https://hogetech.info/bigdata/elasticsearch "【入門】Elasticsearchとは？用途や使い方をわかりやすく解説") で [ベクトルデータベース](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") を構築する記事を執筆しています。

![](https://hogetech.info/wp-content/uploads/2024/08/b5d634c30847f11a291ecf8d95ac5150-1.png)

### LLM (大規模言語モデル) とは

![](https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920.png)

![](https://hogetech.info/wp-content/uploads/2024/07/figure0001.png)

[https://www.intellilink.co.jp/column/ai/2022/072800.aspx](https://www.intellilink.co.jp/column/ai/2022/072800.aspx)

- 「吾輩」の後には、「助詞」が来る確立が高い。
- 「吾輩は」の後には「犬」よりも「猫」が来る確立が高い

このようにして、言語モデルを利用すると確率的に文章を生成できます。

※ [LLM は自然言語処理に特化した生成 AI](https://www.nec-solutioninnovators.co.jp/sp/contents/column/20240229_llm.html) です。  
※ LLM におけるパラメータとは、重みとバイアスのことです。詳しくは以下をご覧ください。

![](https://hogetech.info/wp-content/uploads/2022/03/180f7c81f390ed5436611bf6b95e482c-e1646062802797-320x180.png)

言語モデルは、パラメータ数や学習 [データ](#) セットを増やすことで性能が向上することがわかってきたため、大規模化しました。

#### LLM の種類

LLM には、GPT-4, Claude, Demini, Command R などが存在します。

![](https://hogetech.info/wp-content/uploads/2024/08/1802783db20269aba22a3ea93b92cabe.png)

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

## RAG の種類

RAG の種類には、以下の２つがあります。

- Naive RAG
- Advanced RAG

今まで紹介してきたものは Naive RAG と呼ばれます。

![](https://hogetech.info/wp-content/uploads/2024/08/b992e3e93fc582dfe739dc9235fa101c-1.png)

このままでは、期待する品質の回答を生成できない場合があります。

そこで、品質を改善するために Naive RAG に工夫を加えたものを Advanced RAG と呼びます。

![](https://hogetech.info/wp-content/uploads/2024/08/7d90b81ae27a13938e211e1ed1f9a2dc-1.png)

今回は検索の前処理と後処理に LLM を利用した方法を紹介します。  
(前処理と後処理に LLM を使わず、ぼくの考えた最強の [プログラム](https://hogetech.info/linux/kernel/what-is-the-kernel#software "ソフトウェア") を使っても OK です。)

### 検索前処理：クエリ拡張

これにより、 [ベクトルデータベース](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") から多様な検索結果を取得できます。

なお、クエリ拡張も LLM を利用して行います。

![](https://hogetech.info/wp-content/uploads/2024/08/8da89575c9b3441c9971d7a8cbab1c3e-3.png)

クエリ拡張の例は以下のとおりです。

![](https://hogetech.info/wp-content/uploads/2024/08/24aa47e44b2759e379912654b85a5873.png)

「hogetech とはどんな人ですか」というクエリから、以下のクエリを生成できました。

- hogetech/ホゲテック 経歴 プロフィール
- hogetech 人物 業績/活動内容 -企業
- hogetech インタビュー/メディア掲載

### 検索後処理：関連度の評価

[ベクトルデータベース](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") で検索したドキュメントと、ユーザーの質問の関連度を評価します。

これは、関連性の低い [データ](#) を、回答生成に使うと回答の品質が低下するからです。

![](https://hogetech.info/wp-content/uploads/2024/08/df292ad6b3fa1d41cf98b96a04be1b8e-2.png)

検索の後処理を LLM で行う一例は以下のとおりです。

![](https://hogetech.info/wp-content/uploads/2024/08/d4067aad3ca0daf57bb2057ce32863ba.png)

![](https://hogetech.info/wp-content/uploads/2024/08/5ec316ccf95962076b791b2061b9fd73.png)

## 最後に

### 関連記事

<table><thead><tr><th colspan="4">RAG (検索拡張生成)</th></tr></thead><tbody><tr><td><p><a href="https://hogetech.info/bigdata/elasticsearch"><img src="https://hogetech.info/wp-content/uploads/2024/08/612f43071a2a0f44423b8bcb86c93e1a-3.png" width="200"><br>Elasticsearch</a></p></td><td width="25%"><p><a href="https://hogetech.info/ml/algorithm/knn"><img src="https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-5.png"> KNN</a></p></td><td><p><a href="https://hogetech.info/database/vector"><img src="https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-3.png" width="200"><br>ベクトルデータベース</a></p></td><td><p><a href="https://hogetech.info/ml/rag"><img src="https://hogetech.info/wp-content/uploads/2024/08/01e20b05948409296d32314122ce234d-4.png" width="200"><br>RAG</a></p></td></tr></tbody></table>

<table><thead><tr><th colspan="5">ディープラーニング</th></tr></thead><tbody><tr><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic1"><img src="https://hogetech.info/wp-content/uploads/2022/03/612f43071a2a0f44423b8bcb86c93e1a-9.png"><br>DeepLearning</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic2"><img src="https://hogetech.info/wp-content/uploads/2023/10/612f43071a2a0f44423b8bcb86c93e1a-1.png" width="180"><br>NeuralNetwork</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic3"><img src="https://hogetech.info/wp-content/uploads/2022/03/tree-forwradmode-1-1024x583.png" width="180"><br>誤差逆伝播法</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic4"><img src="https://hogetech.info/wp-content/uploads/2022/03/matplot003-12-2.gif" width="180"><br>アルゴリズム</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic5"><img src="https://hogetech.info/wp-content/uploads/2022/03/479089b78010423b5702baaaa414bf52-4.png" width="180"><br>CNN</a></p></td></tr></tbody></table>

0