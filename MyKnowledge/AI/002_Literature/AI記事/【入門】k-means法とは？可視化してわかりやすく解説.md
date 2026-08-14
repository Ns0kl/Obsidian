---
title: "【入門】k-means法とは？可視化してわかりやすく解説"
source: "https://hogetech.info/ml/algorithm/kmeans"
author:
  - "[[ほげほげテクノロジー - IT 技術学習サイト]]"
published: 2022-07-03
created: 2026-08-11
description: "k-means クラスタリング(k-means法) k-means クラスタリング (k-means法) とは、データを k 個にグループ分け (クラスタリング) するアルゴリズムです。k = 3 個にグループ分け (クラスタリング)初めに..."
tags:
  - "clippings"
---
![](https://hogetech.info/wp-content/uploads/2022/07/QAEkFw55qTncYQ4sjebD1656823582-1656826876-1.gif)

k = 3 個にグループ分け (クラスタリング)

## 初めに

本記事は [機械学習](#) で利用するアルゴリズムの k-means法について記載しています。

その他の記事は以下をご覧ください。

■機械学習のアルゴリズム

機械学習、人工知能

- [k-means クラスタリング (k-means法)](https://hogetech.info/machine-learning/algorithm/kmeans) 　←イマココ
- [KNN (k近傍法)](https://hogetech.info/machine-learning/algorithm/knn)
- [Random Forest と Isolation Forest](https://hogetech.info/machine-learning/algorithm/forest)

■ディープラーニング

- [【ディープラーニング入門１】AI・機械学習・ディープラーニングとは](https://hogetech.info/machine-learning/deep-learning/dl-basic1)
- [【ディープラーニング入門２】パーセプトロン・ニューラルネットワーク](https://hogetech.info/machine-learning/deep-learning/dl-basic2)
- [【ディープラーニング入門３】バックプロパゲーション (誤差逆伝播法)](https://hogetech.info/machine-learning/deep-learning/dl-basic3)
- [【ディープラーニング入門４】学習・重み・ハイパーパラメータの最適化](https://hogetech.info/machine-learning/deep-learning/dl-basic4)
- [【ディープラーニング入門５】畳み込みニューラルネットワーク (CNN)](https://hogetech.info/machine-learning/deep-learning/dl-basic5)

![ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装](https://m.media-amazon.com/images/I/513J77QZHgL._SL160_.jpg)

ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装

[ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装](https://www.amazon.co.jp/dp/4873117585?tag=api0e-22&linkCode=ogi&th=1&psc=1 "ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装")

オライリージャパン

[Amazonの商品レビュー・口コミを見る](https://www.amazon.co.jp/product-reviews/4873117585/?tag=api0e-22)

## k-means法のアルゴリズム

k-means法のアルゴリズムは以下のとおりです。

コンピュータサイエンス

![](https://hogetech.info/wp-content/uploads/2022/07/377f490336fba3949e301c4c9384f641.png)

1\. 各データにランダムなクラスタを割り当て

![](https://hogetech.info/wp-content/uploads/2022/07/44c23b6b15d70994d766716b66bcaf1c-2.png)

2\. クラスタごとに中心を求める

![](https://hogetech.info/wp-content/uploads/2022/07/3eac56693fa7bdd0e95cad5731ef496b.png)

3\. 各データを、クラスタ中心が最も近いクラスタに変更

![](https://hogetech.info/wp-content/uploads/2022/07/QAEkFw55qTncYQ4sjebD1656823582-1656826876.gif)

4\. 全てのデータのクラスタが変化しなくなるまで、2, 3 を繰り返す

### k-means法の欠点

k-means法では、以下のように初期値のクラスタ割り当てに結果が大きく依存します。

- 初期値によって収束する計算量が変わる (最悪の計算量は超多項式)
- 初期値によってクラスタリング結果が異なる (局所的最適解となる)

例えば以下のデータを k-means クラスタリングします。

コンピュータサイエンス

![](https://hogetech.info/wp-content/uploads/2022/07/8ca6f319b5d3acadba94ac85738f45e5.png)

以下のように初期値によって、クラスタリングの結果が異なります。  
(収束までの計算量も異なります)

![](https://hogetech.info/wp-content/uploads/2022/07/ce31eecf70c3c49bc53d6507b000f851.png)

良い初期値を利用した場合

![](https://hogetech.info/wp-content/uploads/2022/07/5c6198f332777bde6c8245d644da49ca-1.png)

悪い初期値を利用した場合

この初期値問題を改善したアルゴリズムとして、k-means++法があります。

## k-means++法

### k-means++法のアルゴリズム

ここでは、k-means++法のアルゴリズムを説明します。

統計

![](https://hogetech.info/wp-content/uploads/2022/07/377f490336fba3949e301c4c9384f641-3.png)

0\. この [データ](#) 点を例に k-means++ を説明

![](https://hogetech.info/wp-content/uploads/2022/07/62261218918aa80ab8f7bc7d006b2756-2.png)

1\. \[データ点\] からランダムに１つ選び、\[クラスタ中心\] とする

![](https://hogetech.info/wp-content/uploads/2022/07/8337ad1e7609c2d6d806bf86b419d78b.png)

2\. \[データ点\] と \[一番近いクラスタ中心\] の距離を求める

※複数の \[クラスタ中心\] が存在する場合は、一番近いものを１つ選択

![](https://hogetech.info/wp-content/uploads/2022/07/e2a5cbcda4992c300c9dabfd1c803024.png)

3\. 距離が遠いデータ点を選ぶ (確率が高い)

※各データ点が選ばれる確率は以下

$$
(データ点の距離)^2/(各データ点の距離の合計)^2
$$
  

コンピュータサイエンス

![](https://hogetech.info/wp-content/uploads/2022/07/wzAPlAoANzGl3fOCRuMZ1656851019-1656851069.gif)

4\. k 個の \[クラスタ中心\] を選ぶまで、２, 3 を繰り返す

![](https://hogetech.info/wp-content/uploads/2022/07/f3cd6ec84b47032c400f563e80cdca34.png)

5\. k-means 法で k 個のクラスタリングを行う

※ここからの手順は k-means と k-means++ で同じです。

## scikit-learn (sklearn) + matplotlib で k-means++ を実装

scikit-learn [ライブラリ](https://hogetech.info/linux/kernel/what-is-the-kernel#software "ソフトウェア") を利用して、さくっと k-means++法を実装します。

なお、可視化しないと結果がわかりにくいので、matplotlib で可視化しています。

```python
from sklearn.cluster import KMeans
import numpy as np
import matplotlib.pylab as plt

data_size = 100 #データ点の数
np.random.seed(0) #データ点の乱数を固定
max_iter = 300 #繰り返しの上限

data = np.random.rand(data_size, 2) #データ点を生成

# k-means
km = KMeans(n_clusters=3, max_iter=max_iter) #クラスター数, 繰り返し回数の最大値
clusters_sklearn = km.fit_predict(data) #各データ点がどのクラスター所属するか予測 (クラスター中心が最も近いクラスターを選択)

# 可視化処理
for i, row in enumerate(data):
    if clusters_sklearn[i] == 0: #１つ目のクラスターのデータ点
        plt.plot([row[0],km.cluster_centers_[0, 0]], [row[1],km.cluster_centers_[0, 1]], marker='o', color='blue')
    elif clusters_sklearn[i] ==1: #2つ目のクラスターのデータ点
        plt.plot([row[0],km.cluster_centers_[1, 0]], [row[1],km.cluster_centers_[1, 1]], marker='o', color='red')
    elif clusters_sklearn[i] ==2: #3つ目のクラスターのデータ点
        plt.plot([row[0],km.cluster_centers_[2, 0]], [row[1],km.cluster_centers_[2, 1]], marker='o', color='green')

# 各クラスター中心点
plt.plot(km.cluster_centers_[0, 0], km.cluster_centers_[0, 1], marker='*', color='orange', markersize=15)
plt.plot(km.cluster_centers_[1, 0], km.cluster_centers_[1, 1], marker='*', color='orange', markersize=15)
plt.plot(km.cluster_centers_[2, 0], km.cluster_centers_[2, 1], marker='*', color='orange', markersize=15)
plt.show()
```

実行結果は以下のとおりです。

## 機械学習の関連記事

■ [機械学習](#) のアルゴリズム

機械学習、人工知能

- [k-means クラスタリング (k-means法)](https://hogetech.info/machine-learning/algorithm/kmeans) 　←イマココ
- [KNN (k近傍法)](https://hogetech.info/machine-learning/algorithm/knn)
- [Random Forest と Isolation Forest](https://hogetech.info/machine-learning/algorithm/forest)

■ディープラーニング

- [【ディープラーニング入門１】AI・機械学習・ディープラーニングとは](https://hogetech.info/machine-learning/deep-learning/dl-basic1)
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

## 参考サイト

[

![](https://scikit-learn/stable/_images/sphx_glr_plot_bisect_kmeans_thumb.png)

](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html "KMeans")

+2