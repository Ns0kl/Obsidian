---
title: "【入門】Random Forest と Isolation Forest とは"
source: "https://hogetech.info/ml/algorithm/forest"
author:
  - "[[ほげほげテクノロジー - IT 技術学習サイト]]"
published: 2022-07-10
created: 2026-08-11
description: "Random Forest (ランダムフォレスト) Random Forest (ランダムフォレスト) とは、値を回帰(予測)、分類するアルゴリズムです。 Isolation Forest (分離フォレスト) Isolation Fores..."
tags:
  - "clippings"
---
![](https://hogetech.info/wp-content/uploads/2022/07/beb696158d384441ea46728c4350ba69.png)

フォレスト (木 = 学習器の集まり)

![](https://hogetech.info/wp-content/uploads/2022/07/vCAeubNoJ3LRk4q6UniO1657431121-1657431232-2.gif)

Isolation Forest の学習器を作成

## 初めに

本記事は Random Forest と [Isolation](https://hogetech.info/database/acid#isolation "Isolation") Forest について記載しています。

[機械学習](#) に関連する他の記事は以下をご覧ください。

機械学習、人工知能

■機械学習のアルゴリズム

- [k-means クラスタリング (k-means法)](https://hogetech.info/machine-learning/algorithm/kmeans)
- [KNN (k近傍法)](https://hogetech.info/machine-learning/algorithm/knn)
- [Random Forest と Isolation Forest](https://hogetech.info/machine-learning/algorithm/forest) 　←イマココ

■ディープラーニング

- [【ディープラーニング入門１】AI・機械学習・ディープラーニングとは](https://hogetech.info/machine-learning/deep-learning/dl-basic1)
- [【ディープラーニング入門２】パーセプトロン・ニューラルネットワーク](https://hogetech.info/machine-learning/deep-learning/dl-basic2)
- [【ディープラーニング入門３】バックプロパゲーション (誤差逆伝播法)](https://hogetech.info/machine-learning/deep-learning/dl-basic3)
- [【ディープラーニング入門４】学習・重み・ハイパーパラメータの最適化](https://hogetech.info/machine-learning/deep-learning/dl-basic4)
- [【ディープラーニング入門５】畳み込みニューラルネットワーク (CNN)](https://hogetech.info/machine-learning/deep-learning/dl-basic5)

## ランダムフォレストとは

ランダムフォレストとは、以下の２つのアルゴリズムを利用して、回帰(予測)、分類を行います。

- [決定木 (decision tree)](#decision-tree)
- [アンサンブル学習](#ensemble-learning)

### 決定木 (decision tree) とは

![](https://hogetech.info/wp-content/uploads/2022/07/Decision_tree_model_ja.png)

ゴルフを「する」・「しない」の２クラス (グループ) に分けた決定木

データを分割する基準は、特定のクラス (グループ) を多く含むように分割します。

![](https://hogetech.info/wp-content/uploads/2022/07/612f43071a2a0f44423b8bcb86c93e1a-2.png)

クラスは S サイズクラスと M サイズクラスの２つ

上記の場合、データを分割する基準は、「身長 > 165」の方がいいです。

データマネジメント

これは、分割後の [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") に１つのクラスが多く含まれているからです。

### アンサンブル学習の種類

アンサンブル学習は、異なるデータから学習した学習器の方が予測精度が高くなります。  
(同じ知識を持つ人だけで多数決をとると、同じ意見しか出ないので多数決の意味ない)

アンサンブル学習では、主に次の４つの手法があります。

#### バギング/ブートストラップ・アグリゲーティング

![](https://hogetech.info/wp-content/uploads/2022/07/7fb8f1c748d490339c64aa37f2515920-3.png)

#### スタッキング

スタッキングは、バギングにおける出来の悪い学習器の結果も同じ重みで評価してしまう問題を解決するものです。

![](https://hogetech.info/wp-content/uploads/2022/07/7fb8f1c748d490339c64aa37f2515920-2.png)

重要度の決め方は自由

#### バンピング

バンピングは、外れ値で学習してしまった学習器を捨てることができます。

![](https://hogetech.info/wp-content/uploads/2022/07/01e20b05948409296d32314122ce234d.png)

質の良いデータをサンプリングできた場合、良い学習器が作れる

#### ブースティング

![](https://hogetech.info/wp-content/uploads/2022/07/7fb8f1c748d490339c64aa37f2515920.png)

### ランダムフォレストのまとめ

![](https://hogetech.info/wp-content/uploads/2022/07/7fb8f1c748d490339c64aa37f2515920-4.png)

サンプリングしたデータの全特徴量のうち、一部の特徴量だけを使って学習器を作ります これは、異なるデータで学習した学習器を作るためです。(同じような学習器で予測しても同じ予測しか出力されないので多数決の意味がない)

### ランダムフォレストの分類を Python + sklearn で実装

ランダムフォレストの分類を Python の [sklearn ライブラリ](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html) で実装してみます。

利用するデータセットは以下です。

[

![](https://scikit-learn/stable/_images/sphx_glr_plot_calibration_curve_thumb.png)

](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.make_classification.html "make_classification")

#### ソースコード

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

# データセットを取得
X, y = make_classification(n_samples=1000, n_features=2, 
                        n_informative=2, n_redundant=0,
                        random_state=0, shuffle=False)

# データセットの特徴量Xと正解ラベルyを訓練データとテストデータに分ける
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, random_state=0) 
        
# ランダムフォレストで学習
clf = RandomForestClassifier(n_estimators=100, random_state=0).fit(X_train, y_train) 

print("予測精度=", clf.score(X_test, y_test)) #テスト用のデータを使って学習器の精度を測る
print("予測結果の詳細\n", clf.predict(X_test)==y_test) #予測結果の正誤を確認
```

```yaml
予測精度= 0.956
予測結果の詳細
[ True  True  True  True  True  True  True  True  True  True  True  True
(中略)
  True  True  True  True  True  True  True  True  True  True]
```

予測精度が 95.6% の学習器が作れました。

#### 学習結果を可視化

学習結果をよりわかりやすくするために、可視化してみます。

```markdown
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

# 予測の境界線をプロットし可視化
def plot_decision_boundary(model, X, y, margin=0.3): 
        _x1 = np.linspace(X[:, 0].min()-margin, X[:, 0].max()+margin, 100) # 0次元目の最小、最大の１００分割
        _x2 = np.linspace(X[:, 1].min()-margin, X[:, 1].max()+margin, 100) # 1次元目の最小、最大の１００分割
        x1, x2 = np.meshgrid(_x1, _x2)
        X_new = np.c_[x1.ravel(), x2.ravel()]
        y_pred = model.predict(X_new).reshape(x1.shape) # 予測結果
        custom_cmap = ListedColormap(['mediumblue', 'orangered']) # 色の指定
        plt.contourf(x1, x2, y_pred, alpha=0.3, cmap=custom_cmap) # 等高線で境界線を引く

# データセットを取得
X, y = make_classification(n_samples=1000, n_features=2, 
                        n_informative=2, n_redundant=0,
                        random_state=0, shuffle=False)

# データセットの特徴量Xと正解ラベルyを訓練データとテストデータに分ける
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, random_state=0) 
        
# ランダムフォレストで学習
clf = RandomForestClassifier(n_estimators=100, random_state=0).fit(X_train, y_train) 

plot_decision_boundary(clf, X, y) # 学習結果を可視化
plt.plot(X[:, 0][y==0], X[:, 1][y==0], 'bo', ms=10) # クラス0 のデータを可視化
plt.plot(X[:, 0][y==1], X[:, 1][y==1], "r^", ms=10) # クラス１ のデータを可視化
```

![](https://hogetech.info/wp-content/uploads/2022/07/95347f4980669e98437b19ef8f1c41e5-6.png)

おおよそ分類できていることがわかります。

## Isolation Forest とは

[Isolation](https://hogetech.info/database/acid#isolation "Isolation") Forest では、以下の２つのアルゴリズムを利用して異常検出を行います。

- 学習方法： [バギング](#bagging)
- 学習器： [Isolation Tree](#isolation-tree)

### Isolation Tree のアルゴリズム

[Isolation](https://hogetech.info/database/acid#isolation "Isolation") Tree のアルゴリズムは以下のとおりです。

![](https://hogetech.info/wp-content/uploads/2022/07/5c6198f332777bde6c8245d644da49ca-2.png)

1\. 分離する [データ](#) ポイントを選択

![](https://hogetech.info/wp-content/uploads/2022/07/5c6198f332777bde6c8245d644da49ca-3.png)

2\. ランダムに次元を選択 (今回は x 軸を選択)

![](https://hogetech.info/wp-content/uploads/2022/07/1802783db20269aba22a3ea93b92cabe.png)

3\. 選択した次元の最小値〜最大値の範囲をランダムに選択

今回の場合は x 軸の 9 ~ 21 の間の値をランダムに選択

![](https://hogetech.info/wp-content/uploads/2022/07/vCAeubNoJ3LRk4q6UniO1657431121-1657431232.gif)

4\. 分離するデータポイントが存在する領域を対象に、データポイントが１つ分離するまで手順２と３を繰り返す

(分離するデータポイントが存在しない領域は無視)

この領域を分割を、木構造で表したものが [Isolation](https://hogetech.info/database/acid#isolation "Isolation") Tree です。

![](https://hogetech.info/wp-content/uploads/2022/07/820aabd45e8d2549f8f78c60f073ca77-2.png)

一番上の [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") から、分離するデータポイントを持つ [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") の深さが浅いほど異常 (外れ値) であると判断します。

[Isolation](https://hogetech.info/database/acid#isolation "Isolation") Tree を通常値に適用した例 (深さが深くなる)

例として、以下の異常 (外れ値) でないはなさそうデータポイントを対象に [Isolation](https://hogetech.info/database/acid#isolation "Isolation") Tree を作成し、木が深くなることを確認します。

![](https://hogetech.info/wp-content/uploads/2022/07/234cc7c85011d7aa30670c093d9fc936-1.png)

データポイントは以下のように分割できます。

![](https://hogetech.info/wp-content/uploads/2022/07/vCAeubNoJ3LRk4q6UniO1657431121-1657432541.gif)

つまり、 [Isolation](https://hogetech.info/database/acid#isolation "Isolation") Tree の深さは６となるので、先ほど示した深さ３の例と比較して、深さが深い (つまり正常値であると判断できます)。

![](https://hogetech.info/wp-content/uploads/2022/07/68b2946214c35490fd52ed23a46ab952-1.png)

### Isolation Forest のまとめ

![](https://hogetech.info/wp-content/uploads/2022/07/55b7d252371e7e37c3a44ccf8143ac2c-1.png)

### Isolation Forest を Python + sklearn で実装

[Isolation](https://hogetech.info/database/acid#isolation "Isolation") Forest を Python の [sklearn ライブラリ](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html) で実装します。

利用するデータセットは以下です。

[

![](https://scikit-learn/stable/_images/sphx_glr_plot_classifier_comparison_thumb.png)

](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.make_moons.html "make_moons")

```markdown
from sklearn.ensemble import IsolationForest
from sklearn.datasets import make_moons

moons = make_moons(n_samples=200, noise=0.05, random_state=0) #学習データ
X_test = np.array([[1, -0.5],[2,1]]) # テスト用データ

# Isolation Forest で学習
clf = IsolationForest(n_estimators=100, random_state=0).fit(moons[0]) 

print("予測結果\n", clf.predict(X_test)) #１なら正常値、−１なら異常値
plt.plot(moons[0][:, 0], moons[0][:, 1],'o') # 学習用のデータを可視化
plt.plot(X_test[:,0], X_test[:,1], '*', ms=15) # テスト用データの可視化
```

```yaml
予測結果
 [ 1 -1]
```

![](https://hogetech.info/wp-content/uploads/2022/07/9986fb268ef719be10e46ba059323eb2.png)

下側の☆が正常値 (1)、右上の☆が異常値 (-1) と判断できていることがわかります。

### ランダムカットフォレスト (Random Cut Forest/RFC)

ランダムカットフォレストは [Isolation](https://hogetech.info/database/acid#isolation "Isolation") Forest を適用したアルゴリズムです。

次元を選択する際に分散の大きい次元を選択します。(ランダムフォレストはランダムに次元を選択)

> The Random Cut Forest (RCF, 2016) method \[2\] adapted [Isolation](https://hogetech.info/database/acid#isolation "Isolation") Forest to work on data streams with bounded memory and lightweight compute.
> 
> p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 10.0px Helvetica}  
> https:// [opensearch](https://hogetech.info/bigdata/elasticsearch "【入門】Elasticsearchとは？用途や使い方をわかりやすく解説").org/blog/odfe-updates/2019/11/real-time-anomaly-detection-in-open-distro-for- [elasticsearch](https://hogetech.info/bigdata/elasticsearch "【入門】Elasticsearchとは？用途や使い方をわかりやすく解説") /

> RRCF gives more weight to dimension with higher variance (according to SageMaker doc), while I think [isolation](https://hogetech.info/database/acid#isolation "Isolation") forest samples at random,.....
> 
> https://stackoverflow.com/questions/63115867/ [isolation](https://hogetech.info/database/acid#isolation "Isolation") -forest-vs-robust-random-cut-forest-in-outlier-detection

もっと詳しく知りたい方は以下をどうぞ

https://proceedings.mlr.press/v48/guha16.pdf

## 機械学習の関連記事

■ [機械学習](#) のアルゴリズム

- [k-means クラスタリング (k-means法)](https://hogetech.info/machine-learning/algorithm/kmeans)
- [k-NN (k近傍法)](https://hogetech.info/machine-learning/algorithm/knn)
- [Random Forest と Isolation Forest](https://hogetech.info/machine-learning/algorithm/forest) 　←イマココ

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

## 参考資料

[

![](https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmedium.com%2F%40parulsharma_8357%2Fisolation-forest-62fcb1de4cf5%23%3A%7E%3Atext%3DHow%2520is%2520isolation%2520forest%2520different%2Cwe%2520split%2520the%2520features%2520randomly.?w=160&h=90)

](https://medium.com/@parulsharma_8357/isolation-forest-62fcb1de4cf5#:~:text=How%20is%20isolation%20forest%20different,we%20split%20the%20features%20randomly. "Just a moment...")
![](https://www.youtube.com/watch?v=0WcrBe017-w)
![](https://www.youtube.com/watch?v=irTbuevXauk)
[

![](https://scikit-learn/stable/_images/sphx_glr_plot_calibration_multiclass_thumb.png)

](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html "RandomForestClassifier")[

![](https://scikit-learn/stable/_images/sphx_glr_plot_isolation_forest_thumb.png)

](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html "IsolationForest")

+1