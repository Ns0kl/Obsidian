---
title: "【入門】k-NN (k近傍法) とは？わかりやすく解説"
source: "https://hogetech.info/ml/algorithm/knn"
author:
  - "[[ほげほげテクノロジー - IT 技術学習サイト]]"
published: 2022-07-05
created: 2026-08-11
description: "k-NN (k近傍法) アルゴリズム k-NN (k近傍法) アルゴリズム とは、近い k 個データを使って予測するアルゴリズムです。主に分類問題 (グループ分け) の予測に使われます。(回帰問題でも使えます)予測したいデータ (赤) の近..."
tags:
  - "clippings"
---
主に [分類問題](https://hogetech.info/ml/dl/type#supervised "教師あり") (グループ分け) の予測に使われます。([回帰問題](https://hogetech.info/ml/dl/type#supervised "教師あり") でも使えます)

![](https://hogetech.info/wp-content/uploads/2024/08/01e20b05948409296d32314122ce234d-7.png)

予測したいデータ (赤) の近くにある k=3 のデータで多数決を取り、青色のグループと推測します

何を持って "近い" とするかは、さまざまな距離の測り方があります。

![](https://hogetech.info/wp-content/uploads/2024/08/01e20b05948409296d32314122ce234d-6.png)

絶対値に強く影響を受け、C の方が近くなります 緯度、経度を例にすると、地理的距離が近い方が近くなります

![](https://hogetech.info/wp-content/uploads/2024/08/deb17bd5bd307fcd49379fd7617489d9-6.png)

カテゴリで分ける傾向にあり、B の方が近くなります 緯度、経度を例にすると、方角が近い方が近くなります。

<table><thead><tr><th colspan="4">機械学習のアルゴリズム</th></tr></thead><tbody><tr><td width="25%"></td><td width="25%"></td><td width="25%"><p><a href="https://hogetech.info/ml/algorithm/forest"><img src="https://hogetech.info/wp-content/uploads/2022/07/vCAeubNoJ3LRk4q6UniO1657431121-1657431232.gif"> ランダムフォレスト</a></p></td><td width="25%"></td></tr></tbody></table>

<table><thead><tr><th colspan="4">RAG (検索拡張生成)</th></tr></thead><tbody><tr><td></td><td width="25%"></td><td><p><a href="https://hogetech.info/database/vector"><img src="https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-3.png" width="200"><br>ベクトルデータベース</a></p></td><td></td></tr></tbody></table>

## k-NN のアルゴリズム

k-NN のアルゴリズムは以下のとおりです。

![](https://hogetech.info/wp-content/uploads/2022/07/d39022c1e10a06a6609c4fca27aeb997.png)

k = 3 の場合

1\. 予測するデータから近い順に、k個のデータを選択

予測するデータ = ☆マーク

2\. 選択したデータのクラスで多数決を取る

オレンジ：２、青：１なので  
☆のクラスはオレンジと推測

## sklearn で k-NN を実装

ここからは実際に k-NN アルゴリズムで学習して分類機を作成し、予測を行います。

なお、利用するデータセットは以下のとおりです。(２クラス、569人分、30次元のデータ)

| Classes | 2 |
| --- | --- |
| Samples per class | 212(M),357(B) |
| Samples total | 569 |
| Dimensionality | 30 |
| Features | real, positive |

[https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load\_breast\_cancer.html](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html)

### データセットの確認

k-NN アルゴリズムを利用する前に、今回のデータセットを確認します。

データの散布がわかりやすいように、30次元のうち2次元分を可視化してみます。  
(30次元を図にするのは不可能なので)

```markdown
import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer

cancer = load_breast_cancer() #データセットを取得
print(cancer.feature_names) #各次元を確認
print(cancer.target) # 正解ラベル
plt.scatter(cancer.data[:, 0][cancer.target == 0], cancer.data[:, 1][cancer.target == 0]) #0次元目を可視化
plt.scatter(cancer.data[:, 0][cancer.target == 1], cancer.data[:, 1][cancer.target == 1]) #1次元目を可視化
```

```yaml
['mean radius' 'mean texture' 'mean perimeter' 'mean area'
(中略)
 'worst concave points' 'worst symmetry' 'worst fractal dimension']

[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
(中略)
 1 1 1 1 1 1 1 0 0 0 0 0 0 1]
```

以下の内容が確認できました。

- cancer.data：30次元のデータが569人分存在
- cancer.feature\_names：30次元の各次元の名前
- cancer.target：正解ラベル (どちらのクラスか)
![](https://hogetech.info/wp-content/uploads/2022/07/44c23b6b15d70994d766716b66bcaf1c-3.png)

569 人分のデータを最初の2次元だけ可視化

### python + sklearn で実装

sklearn を利用して、k = 3 で k-NN を利用した分類機を作成します。

```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_breast_cancer

cancer = load_breast_cancer() #特徴量と正解ラベルを持つデータセットを取得
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, stratify=cancer.target, random_state=0) # 特徴量Xと正解ラベルyを訓練データとテストデータに分ける
clf = KNeighborsClassifier(n_neighbors=3).fit(X_train, y_train) # 訓練データを用いて k-NN アルゴリズムで学習し、分類機を作成
clf.predict(X_test) # 分類機を使って、テストデータを予測する
print(clf.predict(X_test) == y_test) # 予測がどれだけ正解しているか、正解ラベルを使って確認
print("予測精度=", clf.score(X_test, y_test)) # 予測精度
```

```yaml
[False  True  True  True  True  True  True  True  True  True  True  True
(中略)
  True False  True  True  True  True  True  True  True  True  True]
予測精度= 0.916083916083916
```

k-NN アルゴリズムを利用して、予測精度が 91% の分類機が作成できました。

## 最後に

### 関連記事

<table><thead><tr><th colspan="4">機械学習のアルゴリズム</th></tr></thead><tbody><tr><td width="25%"><p><a href="https://hogetech.info/programming/python/matplotlib"><img src="https://hogetech.info/wp-content/uploads/2022/07/QAEkFw55qTncYQ4sjebD1656823582-1656826876-1.gif"> k-means</a></p></td><td width="25%"><p><a href="https://hogetech.info/ml/algorithm/knn"><img src="https://hogetech.info/wp-content/uploads/2022/07/3ce436f04ca45fafceefeb757daa9c7b.png"> KNN</a></p></td><td width="25%"><p><a href="https://hogetech.info/ml/algorithm/forest"><img src="https://hogetech.info/wp-content/uploads/2022/07/vCAeubNoJ3LRk4q6UniO1657431121-1657431232.gif"> ランダムフォレスト</a></p></td><td width="25%"></td></tr></tbody></table>

<table><thead><tr><th colspan="4">RAG (検索拡張生成)</th></tr></thead><tbody><tr><td><p><a href="https://hogetech.info/bigdata/elasticsearch"><img src="https://hogetech.info/wp-content/uploads/2024/08/612f43071a2a0f44423b8bcb86c93e1a-3.png" width="200"><br>Elasticsearch</a></p></td><td width="25%"><p><a href="https://hogetech.info/ml/algorithm/knn"><img src="https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-5.png"> KNN</a></p></td><td><p><a href="https://hogetech.info/database/vector"><img src="https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-3.png" width="200"><br>ベクトルデータベース</a></p></td><td><p><a href="https://hogetech.info/ml/rag"><img src="https://hogetech.info/wp-content/uploads/2024/08/01e20b05948409296d32314122ce234d-4.png" width="200"><br>RAG</a></p></td></tr></tbody></table>

<table><thead><tr><th colspan="5">ディープラーニング</th></tr></thead><tbody><tr><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic1"><img src="https://hogetech.info/wp-content/uploads/2022/03/612f43071a2a0f44423b8bcb86c93e1a-9.png"><br>DeepLearning</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic2"><img src="https://hogetech.info/wp-content/uploads/2023/10/612f43071a2a0f44423b8bcb86c93e1a-1.png" width="180"><br>NeuralNetwork</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic3"><img src="https://hogetech.info/wp-content/uploads/2022/03/tree-forwradmode-1-1024x583.png" width="180"><br>誤差逆伝播法</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic4"><img src="https://hogetech.info/wp-content/uploads/2022/03/matplot003-12-2.gif" width="180"><br>アルゴリズム</a></p></td><td width="20%"><p><a href="https://hogetech.info/deep-learning/dl-basic5"><img src="https://hogetech.info/wp-content/uploads/2022/03/479089b78010423b5702baaaa414bf52-4.png" width="180"><br>CNN</a></p></td></tr></tbody></table>

![ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装](https://m.media-amazon.com/images/I/513J77QZHgL._SL160_.jpg)

ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装

[ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装](https://www.amazon.co.jp/dp/4873117585?tag=api0e-22&linkCode=ogi&th=1&psc=1 "ゼロから作るDeep Learning ―Pythonで学ぶディープラーニングの理論と実装")

オライリージャパン

[Amazonの商品レビュー・口コミを見る](https://www.amazon.co.jp/product-reviews/4873117585/?tag=api0e-22)