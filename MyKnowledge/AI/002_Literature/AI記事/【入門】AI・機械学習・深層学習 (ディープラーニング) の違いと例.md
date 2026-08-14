---
title: "【入門】AI・機械学習・深層学習 (ディープラーニング) の違いと例"
source: "https://hogetech.info/ml/dl/type"
author:
  - "[[ほげほげテクノロジー - IT 技術学習サイト]]"
published: 2022-03-28
created: 2026-08-11
description: "「AI」と「機械学習」と「深層学習 (ディープラーニング)」は、以下のような関係です。以降では、それぞれの違いの詳細を説明します。AI と機械学習と深層学習 (ディープラーニング) の違い「AI」と「機械学習」と「深層学習 (ディープラーニ..."
tags:
  - "clippings"
---
「AI」と「 [機械学習](#) 」と「深層学習 (ディープラーニング)」は、以下のような関係です。

機械学習、人工知能

![](https://hogetech.info/wp-content/uploads/2022/03/612f43071a2a0f44423b8bcb86c93e1a-9.png)

以降では、それぞれの違いの詳細を説明します。

<table><thead><tr><th colspan="5">ディープラーニング</th></tr></thead><tbody><tr><td width="20%"></td><td width="20%"></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic3"><img src="https://hogetech.info/wp-content/uploads/2022/03/tree-forwradmode-1-1024x583.png" width="180"><br>誤差逆伝播法</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic4"><img src="https://hogetech.info/wp-content/uploads/2022/03/matplot003-12-2.gif" width="180"><br>アルゴリズム</a></p></td><td width="20%"></td></tr></tbody></table>

![ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装](https://m.media-amazon.com/images/I/513J77QZHgL._SL160_.jpg)

ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装

[ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装](https://www.amazon.co.jp/dp/4873117585?tag=api0e-22&linkCode=ogi&th=1&psc=1 "ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装")

オライリージャパン

[Amazonの商品レビュー・口コミを見る](https://www.amazon.co.jp/product-reviews/4873117585/?tag=api0e-22)

## AI と機械学習と深層学習 (ディープラーニング) の違い

「AI」と「機械学習」と「深層学習 (ディープラーニング)」は以下のような違いがあります。

機械学習、人工知能

|  | AI | 機械学習 | 深層学習(ディープラーニング) |
| --- | --- | --- | --- |
| **特徴量** | 人が考える | 人が考える | コンピュータが見つける |
| **識別ルール** | 人が考える | コンピュータが見つける | コンピュータが見つける |

例えば、写真の人に適切な T シャツのサイズを提案する場合を考えます。

|  | AI | 機械学習 (深層学習を除く) | 深層学習(ディープラーニング) |
| --- | --- | --- | --- |
| **特徴量** | **人が** 「身長」で分類すると考える | **人が** 「身長」で分類すると考える | **機械が** 「身長」で分類できそうだと自動で学習 |
| **識別ルール** | ****人が**** 165cm を境に「S サイズ」と「M サイズ」を分類する [プログラム](https://hogetech.info/linux/kernel/what-is-the-kernel#software "ソフトウェア") を作る | **機械が** 165cm を境に「S サイズ」と「M サイズ」を分類できそうだと自動で学習 | **機械が** 165cm を境に「S サイズ」と「M サイズ」を分類できそうだと自動で学習 |

特徴量 = 身長、識別ルール = 165cm 以上かどうか

## AI の種類

AI には次のような種類が存在します。

機械学習、人工知能

- ゲーム AI：ゲームの敵キャラの動き等
- エキスパートシステム：ナレッジベース等 (症状を入力すると、病名が出る等)
- 機械学習

他にも様々な種類がありますが、一般的に AI というと、現在は機械学習を指します。

## 機械学習の問題とアルゴリズム

機械学習には、以下の３つの学習方法が存在します。

- 教師あり学習
- 教師なし学習
- 強化学習

| 問題 | 問題の説明 | 学習アルゴリズム |
| --- | --- | --- |
| 回帰 | [データ](#) から別のデータを推測する問題 | ・ [k-Nearest Neighbor](https://hogetech.info/ml/algorithm/knn "【入門】k-NN (k近傍法) とは？わかりやすく解説") ([k近傍法](https://hogetech.info/ml/algorithm/knn "【入門】k-NN (k近傍法) とは？わかりやすく解説"))   ・線形回帰   ・サポートベクター回帰   ・ランダムフォレスト   ・ [ニューラルネットワーク](https://hogetech.info/machine-learning/deep-learning/dl-basic2#neural_network "ニューラルネットワーク") ([MLP](https://hogetech.info/machine-learning/deep-learning/dl-basic2#mlp "多層パーセプトロン") + [恒等関数](https://hogetech.info/machine-learning/deep-learning/dl-basic2#identity "恒等関数")) |
| 分類 | データをクラス (グループ) に分類する問題 | ・ [k-Nearest Neighbor](https://hogetech.info/ml/algorithm/knn "【入門】k-NN (k近傍法) とは？わかりやすく解説") ([k近傍法](https://hogetech.info/ml/algorithm/knn "【入門】k-NN (k近傍法) とは？わかりやすく解説"))   ・サポートベクターマシン   ・ランダムフォレスト   ・ [ニューラルネットワーク](https://hogetech.info/machine-learning/deep-learning/dl-basic2#neural_network "ニューラルネットワーク") ([MLP](https://hogetech.info/machine-learning/deep-learning/dl-basic2#mlp "多層パーセプトロン") + [Softmax](https://hogetech.info/machine-learning/deep-learning/dl-basic2#softmax "softmax")) |

| 問題 | 問題の説明 | 学習アルゴリズム |
| --- | --- | --- |
| クラスタリング | データをクラス (グループ) に分類する問題 | ・k平均法 (k-means clustering)   ・ [ニューラルネットワーク](https://hogetech.info/machine-learning/deep-learning/dl-basic2#neural_network "ニューラルネットワーク") (SOM) |
| 相関ルール   (Association rule Learning) | 相関関係を探す問題   (ピザを買った人はコーラも買う確率が高い) | ・Apriori   ・Eclat   ・FP-growth |

教師なし学習は、求めていた結果となるとは限りません。

例えば、画像の数字を判定する [機械学習](#) を行うとします。

- 「教師あり学習」の「分類」：０〜９の答えがある場合、０〜９に分類します
- 「教師なし学習」の「クラスタリング」：棒っぽいもの「１，７」、丸っぽいもの「０，８」等で分類されたりされなかったりします

| 問題 | 問題の説明 | 学習アルゴリズム |
| --- | --- | --- |
| 強化学習 | 解の得点を最大にする問題です。   (囲碁では、自分が勝った手を最大得点) | ・モンテカルロ法 (Monte Carlo methods)   ・TD 学習 (temporal difference learning)   　・Q 学習   　　・ [ニューラルネットワーク](https://hogetech.info/machine-learning/deep-learning/dl-basic2#neural_network "ニューラルネットワーク") (DQN)   ・動的計画法 (dynamic programming) |

## 深層学習 (ディープラーニング)

※ここでは、「層は、特徴量の抽出を段階的に行うもの」ぐらいで理解しておいてください

> 深層学習として最も普及した手法は、（狭義には4層以上 <sup><a href="https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%83%BC%E3%83%97%E3%83%A9%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0#cite_note-asou-3">[2]</a> <a href="https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%83%BC%E3%83%97%E3%83%A9%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0#cite_note-4">[注釈 2]</a></sup> の）多層の人工 [ニューラルネットワーク](https://ja.wikipedia.org/wiki/%E3%83%8B%E3%83%A5%E3%83%BC%E3%83%A9%E3%83%AB%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF) （ディープ [ニューラルネットワーク](https://hogetech.info/machine_learning/deep_learning/dl_basic2#neural_network) 、 [英](https://ja.wikipedia.org/wiki/%E8%8B%B1%E8%AA%9E): deep neural network; DNN）による [機械学習](https://ja.wikipedia.org/wiki/%E6%A9%9F%E6%A2%B0%E5%AD%A6%E7%BF%92) 手法である <sup><a href="https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%83%BC%E3%83%97%E3%83%A9%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0#cite_note-5">[3]</a></sup> 。
> 
> https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%83%BC%E3%83%97%E3%83%A9%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0

### ディープラーニングのモデル/手法

[ニューラルネットワーク](https://hogetech.info/machine-learning/deep-learning/dl-basic2#neural_network "ニューラルネットワーク") (ディープラーニング) には、以下の種類が存在します。

| 学習アルゴリズム | 機械学習の種類 |
| --- | --- |
| [MLP](https://hogetech.info/machine-learning/deep-learning/dl-basic2#mlp "多層パーセプトロン") (Multi Layer Perceptron) | 教師あり学習 |
| [CNN](https://hogetech.info/machine-learning/deep-learning/dl-basic5 "CNN") ([Convolutional Neural Network](https://hogetech.info/machine-learning/deep-learning/dl-basic5 "CNN")) | 教師あり学習 |
| RNN (Recurrent Neural Network) | 教師あり学習 |
| SOM (Self-Organizing Maps) | 教師なし学習 |
| DQN (Deep Q-Network) | 強化学習 |

### ディープラーニングの種類とできること

![](https://hogetech.info/wp-content/uploads/2022/03/b58ab5d617abe8c76c276401d4d217fc.png)

https://jp.mathworks.com/solutions/image-video-processing/object-recognition.html  
https://jp.mathworks.com/content/dam/mathworks/mathworks-dot-com/company/events/webinar-cta/2459280\_Basics\_of\_semantic\_segmentation.pdf  
https://ai.googleblog.com/2014/11/a-picture-is-worth-thousand-coherent.html  
https://arxiv.org/pdf/1511.06434.pdf  
https://www.youtube.com/watch?v=CxanE\_W46ts  
https://pytorch.org/tutorials/intermediate/mario\_rl\_tutorial.html  
https://ja.wikipedia.org/wiki/AlphaGo

## 関連記事

ディープラーニング入門記事の続きは以下のとおりです。

- [【ディープラーニング入門１】AI・機械学習・ディープラーニングとは](https://hogetech.info/machine-learning/deep-learning/dl-basic1) 　←イマココ
- [【ディープラーニング入門２】パーセプトロン・ニューラルネットワーク](https://hogetech.info/machine-learning/deep-learning/dl-basic2)
- [【ディープラーニング入門３】バックプロパゲーション (誤差逆伝播法)](https://hogetech.info/machine-learning/deep-learning/dl-basic3)
- [【ディープラーニング入門４】学習・重み・ハイパーパラメータの最適化](https://hogetech.info/machine-learning/deep-learning/dl-basic4)
- [【ディープラーニング入門５】畳み込みニューラルネットワーク (CNN)](https://hogetech.info/machine-learning/deep-learning/dl-basic5)

---

![ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装](https://m.media-amazon.com/images/I/513J77QZHgL._SL160_.jpg)

ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装

[ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装](https://www.amazon.co.jp/dp/4873117585?tag=api0e-22&linkCode=ogi&th=1&psc=1 "ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装")

オライリージャパン

[Amazonの商品レビュー・口コミを見る](https://www.amazon.co.jp/product-reviews/4873117585/?tag=api0e-22)

+1