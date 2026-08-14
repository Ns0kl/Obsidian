---
title: "【MLflow】基本的な使い方 ~機械学習のライフサイクル管理~"
source: "https://tech.nkhn37.net/mlflow-basic/"
author:
  - "[[ホッシー]]"
published: 2023-12-16
created: 2026-08-13
description: "機械学習のライフサイクル管理をするためのMLflowの基本的な使い方を解説します。MNISTの手書き画像分類を例にしてプログラムでパラメータや実験結果、モデルを記録する方法やMLflow UIを使って結果を確認・管理する方法についても紹介します。"
tags:
  - "clippings"
---
[MLflow](https://tech.nkhn37.net/category/python/data-analysis/mlflow/)

![【MLflow】基本的な使い方 ~機械学習のライフサイクル管理~](https://tech.nkhn37.net/wp-content/uploads/2023/12/%E3%80%90MLflow%E3%80%91%E5%9F%BA%E6%9C%AC%E7%9A%84%E3%81%AA%E4%BD%BF%E3%81%84%E6%96%B9-%E6%A9%9F%E6%A2%B0%E5%AD%A6%E7%BF%92%E3%81%AE%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E7%AE%A1%E7%90%86.jpg)

naoki-hn

機械学習ライフサイクル管理のための MLflow の基本的な使い方を解説します。

## MLflow を使った機械学習のライフサイクル管理

MLflowとは、機械学習のライフサイクルを管理するためのオープンソースのプラットフォームです。MLflow は、データサイエンティストやエンジニアが機械学習のプロジェクトを効率的に実行できるように設計されています。

MLflow の主な機能は以下のようなものがあります。

| 機能 | 概要 |
| --- | --- |
| MLflow Tracking | 実験のパラメータ、コード、メトリクス、結果を記録する機能です。ユーザーは異なる実験結果を比較し、最適なモデルを選択できます。 |
| MLflow Projects | プロジェクトの構造や依存関係を定義するための形式です。これによりコード、データ、環境設定を一元管理して、再現性と共有の容易さを向上させます。 |
| MLflow Models | 異なる機械学習フレームワークからのモデルを一つの標準フォーマットで保存、再利用、共有するための機能です。これにより、異なる環境へのモデルのデプロイが容易になります。 |
| MLflow Model Registry | モデルのバージョン管理、ライフサイクルのステージング、注釈の付与などができる中央リポジトリ。モデルの使用状況を追跡して運用環境での利用を管理する |

MLflow は上記のような機能により、機械学習プロジェクトの管理、実行、デプロイメントの効率を大幅に向上させることができます。

この記事では MLflow の基本的な使い方を説明します。

### MLflow の環境準備

MLflow の環境準備方法ついて説明します。

#### MLflow のインストール

MLflow を使用する場合にはインストールが必要です。以下のように pip でインストールしてください。

pip install mlflow

pip install mlflow

```
pip install mlflow
```

#### MLflow サーバーの実行

MLflow サーバーを実行して利用します。リモートサーバーを立てる方法やローカルで実行する方法がありますが、この記事では MLflow の使い方を紹介するのが主目的であるため、ローカルで実行する方法を紹介します。

実行する python プログラムがあるフォルダで以下のコマンドを実行してください。

mlflow ui

mlflow ui

```
mlflow ui
```

【実行結果】

\>mlflow ui

INFO:waitress:Serving on http://127.0.0.1:5000

【実行結果】 >mlflow ui INFO:waitress:Serving on http://127.0.0.1:5000

```
【実行結果】
>mlflow ui
INFO:waitress:Serving on http://127.0.0.1:5000
```

実行するとサーバーのURLが表示されます。 `http://127.0.0.1:5000` または `http://localhost:5000/` で MLflow UI にアクセスできます。

MLflow UI は、機械学習の実行結果を Web ブラウザ上で管理するインターフェースです。これにより、異なる実験結果を視覚的に比較し、効果的な分析が可能になります。

### MLflow の使用方法

MLflow の使用方法を簡単な例を使って紹介します。今回は、MNIST という手書き画像データ分類を例にします。なお、分類手法は CNN（Convolutional Neural Network：畳み込みニューラルネットワーク）で、実装フレームワークとしては Tensorflow / Keras を使用します。

CNN に関する説明はこの記事ではしません。CNN による画像分類の説明は「 [CNN（畳み込みニューラルネットワーク）による画像分類の基本](https://tech.nkhn37.net/tensorflow-keras-cnn-basic-mnist/) 」を参考にしてください。

MLflow を使用した実装例の全体は以下のようになります。ポイントとなる部分の詳細を以降で説明していきます。

```python
import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist
import mlflow
import mlflow.keras

def main():

"""メイン関数"""

\# ===== MLflowの実験設定
mlflow.set\_experiment("mnist\_cnn\_classification")

\# ===== MNIST(エムニスト)データの読込
(train\_imgs, train\_labels), (test\_imgs, test\_labels) = mnist.load\_data()
train\_imgs = train\_imgs.reshape((60000, 28, 28, 1))
test\_imgs = test\_imgs.reshape((10000, 28, 28, 1))

\# 訓練データの一部(20%)を評価データとして使う
idx = int(train\_imgs.shape\[0\] \* 0.2)
train\_imgs, val\_imgs = train\_imgs\[idx:\], train\_imgs\[:idx\]
train\_labels, val\_labels = train\_labels\[idx:\], train\_labels\[:idx\]

\# ===== CNNモデルの構築
\# MNIST画像は28×28でチャンネルは1
inputs = keras.Input(shape=(28, 28, 1))

\# 前処理0~1へ正規化
x = layers.Rescaling(1.0 / 255)(inputs)

\# 畳み込み層とプーリング層の定義
x = layers.Conv2D(32, kernel\_size=3, activation="relu")(x)
x = layers.MaxPooling2D(pool\_size=2)(x)
x = layers.Conv2D(64, kernel\_size=3, activation="relu")(x)
x = layers.MaxPooling2D(pool\_size=2)(x)
x = layers.Conv2D(128, kernel\_size=3, activation="relu")(x)
x = layers.MaxPooling2D(pool\_size=2)(x)

\# 平坦化する
x = layers.Flatten()(x)

\# ドロップアウトを設定
x = layers.Dropout(0.5)(x)

\# 分類のために10のノードに接続
outputs = layers.Dense(10, activation="softmax")(x)

\# モデルの作成
model = keras.Model(inputs=inputs, outputs=outputs)

\# モデル構成の表示
print(model.summary())

\# # モデルの画像保存

\# keras.utils.plot\_model(model, "mnist\_cnn\_classifier.png", show\_shapes=True)

\# モデルのパラメータ設定
model\_optimizer = "adam"
model\_loss = "sparse\_categorical\_crossentropy"

\# 実行パラメータ設定
num\_epochs = 5
batch\_size = 32
with mlflow.start\_run():

\# モデルパラメータを記録
mlflow.log\_param("optimizer", model\_optimizer)
mlflow.log\_param("loss", model\_loss)

\# 実行パラメータを登録
mlflow.log\_param("num\_epochs", num\_epochs)
mlflow.log\_param("batch\_size", batch\_size)

\# ===== オプティマイザ、損失関数、指標を設定してコンパイル
model.compile(
optimizer=model\_optimizer,
loss=model\_loss,
metrics=\["accuracy"\],
)

\# ===== fitを使ったモデルの訓練
history = model.fit(
train\_imgs,
train\_labels,
epochs=num\_epochs,
batch\_size=batch\_size,
validation\_data=(val\_imgs, val\_labels),
)

\# ===== MLflowにトレーニングのメトリクスを記録
for epoch in range(num\_epochs):
mlflow.log\_metric(
"loss", history.history\["loss"\]\[epoch\], step=epoch
)
mlflow.log\_metric(
"accuracy", history.history\["accuracy"\]\[epoch\], step=epoch
)
mlflow.log\_metric(
"val\_loss", history.history\["val\_loss"\]\[epoch\], step=epoch
)
mlflow.log\_metric(
"val\_accuracy",
history.history\["val\_accuracy"\]\[epoch\],
step=epoch,
)

\# ===== evaluateを使ったテストデータでの評価
result = model.evaluate(test\_imgs, test\_labels)
print(result)

\# ===== predictを使って予測結果を表示
pred = model.predict(test\_imgs)
print(f"予測: {np.argmax(pred\[0\])}, 正解: {test\_labels\[0\]}")

\# ===== MLflowにモデルを記録
\# モデルを保存する
mlflow.keras.log\_model(model, "model")

if \_\_name\_\_ == "\_\_main\_\_":
main()


```

#### 実装の詳細説明

上記で紹介したプログラムについて MLflow の実装に関わる部分をピックアップして詳細を説明していきます。

##### インポート

import mlflow
import mlflow.keras
import mlflow import mlflow.keras

```
import mlflow
import mlflow.keras
```

MLflow を利用するためにインポートしている部分です。 `mlflow.keras` は、後述するモデルの保存の際に使用するためにインポートしています。

##### MLFlow の実験設定

\# ===== MLflowの実験設定

mlflow.set\_experiment("mnist\_cnn\_classification")

\# ===== MLflowの実験設定 mlflow.set\_experiment("mnist\_cnn\_classification")

```
# ===== MLflowの実験設定
mlflow.set_experiment("mnist_cnn_classification")
```

MLFlow を実行する際に今回のプログラムがどういった実験 (Experiment) であるか設定します。設定は `mlflow.set_experiment` に実験名を文字列で指定します。

このコードは省略することも可能ですが、省略した場合、MLflow は当該プログラムを “Default” 実験として記録します。ただし、複数の実験を行うことが通常だと思いますので、後々で識別をするために実験設定をしておくことを推奨します。

##### MLflow の実行とパラメータ記録

\# モデルのパラメータ設定

model\_optimizer = "adam"

model\_loss = "sparse\_categorical\_crossentropy"

\# 実行パラメータ設定

num\_epochs = 5

batch\_size = 32

with mlflow.start\_run():

\# モデルパラメータを記録

mlflow.log\_param("optimizer", model\_optimizer)

mlflow.log\_param("loss", model\_loss)

\# 実行パラメータを登録

mlflow.log\_param("num\_epochs", num\_epochs)

mlflow.log\_param("batch\_size", batch\_size)

\# モデルのパラメータ設定 model\_optimizer = "adam" model\_loss = "sparse\_categorical\_crossentropy" # 実行パラメータ設定 num\_epochs = 5 batch\_size = 32 with mlflow.start\_run(): # モデルパラメータを記録 mlflow.log\_param("optimizer", model\_optimizer) mlflow.log\_param("loss", model\_loss) # 実行パラメータを登録 mlflow.log\_param("num\_epochs", num\_epochs) mlflow.log\_param("batch\_size", batch\_size)

```
# モデルのパラメータ設定
model_optimizer = "adam"
model_loss = "sparse_categorical_crossentropy"
# 実行パラメータ設定
num_epochs = 5
batch_size = 32

with mlflow.start_run():
    # モデルパラメータを記録
    mlflow.log_param("optimizer", model_optimizer)
    mlflow.log_param("loss", model_loss)
    # 実行パラメータを登録
    mlflow.log_param("num_epochs", num_epochs)
    mlflow.log_param("batch_size", batch_size)
```

上記は、記録するモデルや実行のパラメータを設定して、MLflow を実行している部分です。今回は、オプティマイザーとして `"adam"` 、損失関数はクロスエントロピー `"sparse_categorical_crossentropy"` を使用しています。また、エポック数は 5、バッチサイズは 32 としています。

MLflow は、 `mlflow.start_run()` を実行して起動し、実験を開始します。 `start_run` を実行すると MLflow は、当該実行が一意になるような Run Name を付与し、後述する MLflow UI で区別することができます。もし、明示的に Run Name を指定したい場合は `mlflow.start_run(run_name="My_Run_Name")` のように `run_name` 引数に指定してください。

上記例では `start_run` を `with` 句を使用して、その中に実験の内容を記載しています。なお、 `with` 句を使わずに以下のように使うことも可能です。

mlflow.start\_run()

\# 実験のコードを記載

mlflow.end\_run()

mlflow.start\_run() # 実験のコードを記載 mlflow.end\_run()

```
mlflow.start_run()

# 実験のコードを記載

mlflow.end_run()
```

`with` 句を使わない場合は `mlflow.end_run()` で実験を明示的に終了し、リソースを適切に開放する必要があります。基本的には `with` 句を使うのが良いでしょう。

MLflow にパラメータを記録するには、 `mlflow.log_param("optimizer", model_optimizer)` のように `mlflow.log_param` を使用します。第 1 引数にパラメータ名、第 2 引数に記録する値を指定します。

モデルパラメータを探索する場合には、値を変えつつ `log_param` でしっかり記録をしておきます。これにより、どのパラメータで実験した結果がどういった結果となったが後で確認しやすくなります。

##### MLflow にトレーニングのメトリクスを記録

\# (省略：モデルのコンパイル、トレーニング実行)

\# ===== MLflowにトレーニングのメトリクスを記録

for epoch in range(num\_epochs):

mlflow.log\_metric(

"loss", history.history\["loss"\]\[epoch\], step=epoch

)

mlflow.log\_metric(

"accuracy", history.history\["accuracy"\]\[epoch\], step=epoch

)

mlflow.log\_metric(

"val\_loss", history.history\["val\_loss"\]\[epoch\], step=epoch

)

mlflow.log\_metric(

"val\_accuracy",

history.history\["val\_accuracy"\]\[epoch\],

step=epoch,

)

\# (省略：モデルのコンパイル、トレーニング実行) # ===== MLflowにトレーニングのメトリクスを記録 for epoch in range(num\_epochs): mlflow.log\_metric( "loss", history.history\["loss"\]\[epoch\], step=epoch ) mlflow.log\_metric( "accuracy", history.history\["accuracy"\]\[epoch\], step=epoch ) mlflow.log\_metric( "val\_loss", history.history\["val\_loss"\]\[epoch\], step=epoch ) mlflow.log\_metric( "val\_accuracy", history.history\["val\_accuracy"\]\[epoch\], step=epoch, )

```
# (省略：モデルのコンパイル、トレーニング実行)

# ===== MLflowにトレーニングのメトリクスを記録
for epoch in range(num_epochs):
    mlflow.log_metric(
        "loss", history.history["loss"][epoch], step=epoch
    )
    mlflow.log_metric(
        "accuracy", history.history["accuracy"][epoch], step=epoch
    )
    mlflow.log_metric(
        "val_loss", history.history["val_loss"][epoch], step=epoch
    )
    mlflow.log_metric(
        "val_accuracy",
        history.history["val_accuracy"][epoch],
        step=epoch,
    )
```

モデルのコンパイルやトレーニングの実行をしたら、結果のメトリクスを記録します。

メトリクスの記録には `mlflow.log_metric` を使用します。上記例は `for` 文で各エポックにおけるメトリクスの値を記録するように記載しています。第 1 引数にメトリクス名、第 2 引数に値を指定してます。 `step` 引数にエポックの数値を指定することでどのエポックにおけるメトリクスかを指定しています。

##### モデルを記録

\# (省略：モデルの評価や予測）

\# ===== MLflowにモデルを記録

\# モデルを保存する

mlflow.keras.log\_model(model, "model")

\# (省略：モデルの評価や予測） # ===== MLflowにモデルを記録 # モデルを保存する mlflow.keras.log\_model(model, "model")

```
# (省略：モデルの評価や予測）

# ===== MLflowにモデルを記録
# モデルを保存する
mlflow.keras.log_model(model, "model")
```

テストデータでのモデルの評価や予測を行った後に、最後に MLflow にモデルを記録しています。モデルの記録には `mlflow.keras.log_model` を使用します。これにより実行時のモデルを記録し、バージョン管理や他者との共有などに使うことができます。

なお、モデルの記録のための関数は、scikit-learn のモデルの場合は `mlflow.sklearn.log_model` 、Pytorch の場合は `mlflow.pytorch.log_model` のように用意されていますので、適切な関数を調べて使用しましょう。

#### MLflow UI を使った結果確認・管理

プログラム実行後は MLflow UI を使って実行結果の確認等の各種管理ができます。

MLflow UI は上記でも説明した通り「 `mlflow ui` 」でサーバを起動したうえで `http://127.0.0.1:5000` または `http://localhost:5000/` にアクセスします。

MLflow UI にアクセスすると以下のような画面が表示されます。

![](https://tech.nkhn37.net/wp-content/uploads/2023/12/image-4.png)

画面左側の Experiments の部分には、実験が表示されています。プログラムの説明で `mlflow.set_experiment` にて指定した「mnist\_cnn\_classification」という実験が表示されます。なお、 `mlflow.set_experiment` を省略した場合は、Default に実験が記録されます。

![](https://tech.nkhn37.net/wp-content/uploads/2023/12/image-3.png)

Experiments にて mnist\_cnn\_classification を選択したときには、以下のように実験した記録が表示されます。各行がプログラムの 1 回の実行結果だと思ってください。

![](https://tech.nkhn37.net/wp-content/uploads/2023/12/image-5.png)

Run Name には、一意になるように MLFlow が値を設定します。今回上記サンプルコードを実行した 1 回目は「gifted-chimp-416」、2 回目で `epoch` 数を 100 にして再実行した結果が「indecisive-zebra-710」という Run Name で実行されました。

1 回目の実行結果をクリックした画面を一部抜粋したのが以下になります。

![](https://tech.nkhn37.net/wp-content/uploads/2023/12/image-10.png)

設定したパラメータ情報やメトリックスが表示されていることが分かります。また、登録したモデルは Artifacts の部分に表示されます。

なお、メトリックスの部分のリンクをクリックすると以下のようにグラフを確認することが可能です。

![](https://tech.nkhn37.net/wp-content/uploads/2023/12/image-11.png)

プログラムでは matplotlib などの可視化ライブラリを使ってグラフ化するところを、MLflow UI に任せてしまうことが可能です。

MLflow UI は、他にも実験間の比較をするなど、様々な機能が使えますが今回は概要の紹介にとどめたいと思います。

#### MLflow におけるリポジトリ (mlruns)

MLflow について紹介してきましたが、MLflow の各種情報が記録されるリポジトリについて簡単に紹介しておきます。

MLflow を使った実行を行うと実行フォルダに「mlruns」というフォルダが生成されることが分かるかと思います。このフォルダが、MLflow のリポジトリとなっていて、各実験データやメタデータ、モデルデータなどを蓄積しています。

mlruns の具体的な構成としては以下のようになります。なお、バージョンによりフォルダ構成が異なる場合があるのでご注意ください。

mlruns/

│

├── 0/ # 実験ID 0

│ ├── meta.yaml # 実験0のメタデータ

│ ├── 1234567890abcdef/ # 実行ID

│ │ ├── meta.yaml # 実行のメタデータ

│ │ ├── params/ # パラメータ

│ │ ├── metrics/ # メトリクス

│ │ ├── tags/ # タグ

│ │ └── artifacts/ # アーティファクト

│ └──...

├── 1/ # 実験ID 1

│ └──...

├──.trash/ # 削除された実験・実行のデータ

│ └──...

└── models/ # モデルレジストリデータ

├── MyModelName/ # 登録されたモデル名

│ ├── 1/ # モデルのバージョン1

│ │ ├── artifacts/ # バージョン1のアーティファクト

│ │ └── meta.yaml # バージョン1のメタデータ

│ └── 2/ # モデルのバージョン2

│ ├── artifacts/ # バージョン2のアーティファクト

│ └── meta.yaml # バージョン2のメタデータ

└──...

mlruns/ │ ├── 0/ # 実験ID 0 │ ├── meta.yaml # 実験0のメタデータ │ ├── 1234567890abcdef/ # 実行ID │ │ ├── meta.yaml # 実行のメタデータ │ │ ├── params/ # パラメータ │ │ ├── metrics/ # メトリクス │ │ ├── tags/ # タグ │ │ └── artifacts/ # アーティファクト │ └──... ├── 1/ # 実験ID 1 │ └──... ├──.trash/ # 削除された実験・実行のデータ │ └──... └── models/ # モデルレジストリデータ ├── MyModelName/ # 登録されたモデル名 │ ├── 1/ # モデルのバージョン1 │ │ ├── artifacts/ # バージョン1のアーティファクト │ │ └── meta.yaml # バージョン1のメタデータ │ └── 2/ # モデルのバージョン2 │ ├── artifacts/ # バージョン2のアーティファクト │ └── meta.yaml # バージョン2のメタデータ └──...

```
mlruns/
│
├── 0/                          # 実験ID 0
│   ├── meta.yaml               # 実験0のメタデータ
│   ├── 1234567890abcdef/       # 実行ID
│   │   ├── meta.yaml           # 実行のメタデータ
│   │   ├── params/             # パラメータ
│   │   ├── metrics/            # メトリクス
│   │   ├── tags/               # タグ
│   │   └── artifacts/          # アーティファクト
│   └── ...
├── 1/                          # 実験ID 1
│   └── ...
├── .trash/                     # 削除された実験・実行のデータ
│   └── ...
└── models/                     # モデルレジストリデータ
    ├── MyModelName/            # 登録されたモデル名
    │   ├── 1/                  # モデルのバージョン1
    │   │   ├── artifacts/      # バージョン1のアーティファクト
    │   │   └── meta.yaml       # バージョン1のメタデータ
    │   └── 2/                  # モデルのバージョン2
    │       ├── artifacts/      # バージョン2のアーティファクト
    │       └── meta.yaml       # バージョン2のメタデータ
    └── ...
```

個々のフォルダの説明は省略しますが、このように MLflow のデータが管理されていることを把握しておいてもらえればと思います。

基本的には実行する Python プログラム配置フォルダに mlruns フォルダがあれば問題ありませんが、異なるフォルダ内にあるリポジトリを使ってプログラムを実行する場合には `mlflow.set_tracking_uri()` で mlruns フォルダのパスを指定します。

`set_tracking_uri` を使えば共有フォルダに mlruns を配置しておいて、複数人で共有してリポジトリを使用するといったことも可能です。

<iframe sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" width="680" height="345" frameborder="0" allow="attribution-reporting; run-ad-auction" src="https://googleads.g.doubleclick.net/pagead/ads?gdpr=0&amp;client=ca-pub-9478001176347002&amp;output=html&amp;h=280&amp;slotname=5321591437&amp;adk=702407396&amp;adf=2267038659&amp;pi=t.ma~as.5321591437&amp;abgtt=6&amp;w=680&amp;fwrn=4&amp;fwrnh=0&amp;lmt=1786591923&amp;rafmt=1&amp;armr=3&amp;format=680x280&amp;url=https%3A%2F%2Ftech.nkhn37.net%2Fmlflow-basic%2F&amp;fwr=0&amp;rpe=1&amp;resp_fmts=3&amp;asro=0&amp;aimartd=4&amp;aieuf=1&amp;aicrs=1&amp;uach=WyJXaW5kb3dzIiwiMTUuMC4wIiwieDg2IiwiIiwiMTUxLjAuNDEyOS43MiIsbnVsbCwwLG51bGwsIjY0IixbWyJOb3Q9QT9CcmFuZCIsIjk5LjAuMC4wIl0sWyJNaWNyb3NvZnQgRWRnZSIsIjE1MS4wLjQxMjkuNzIiXSxbIkNocm9taXVtIiwiMTUxLjAuNzkyMi43NiJdXSwwXQ..&amp;dt=1786594744653&amp;bpp=2&amp;bdt=422&amp;idt=72&amp;shv=r20260811&amp;mjsv=m202608070101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;cookie=ID%3De8b14810b6b60569%3AT%3D1786594744%3ART%3D1786594744%3AS%3DALNI_May7XsYdChNnHMchhMJI7Ls_s-xNQ&amp;gpic=UID%3D000014dd0ab77fa2%3AT%3D1786594744%3ART%3D1786594744%3AS%3DALNI_MZBI1EQQsM08BVc577OJDOuahWw0A&amp;eo_id_str=ID%3Dc4c00e844f868ea9%3AT%3D1786594744%3ART%3D1786594744%3AS%3DAA-AfjbeyjTF7YhhcUKPWZPnOZs3&amp;prev_fmts=0x0%2C300x250%2C300x250%2C1005x274&amp;nras=2&amp;correlator=814875763269&amp;frm=20&amp;pv=1&amp;rplot=4&amp;u_tz=540&amp;u_his=2&amp;u_h=1080&amp;u_w=1920&amp;u_ah=1032&amp;u_aw=1920&amp;u_cd=24&amp;u_sd=1&amp;dmc=16&amp;adx=389&amp;ady=13710&amp;biw=1897&amp;bih=914&amp;scr_x=0&amp;scr_y=10067&amp;eid=95396667%2C95397129%2C95397679&amp;oid=2&amp;psts=AOrYGsmH7Eb796gZe9poL8HjQ6385d-ev2tzUdZzw1BuNLrWfFrDJob7N3M-Jr-U5Ah_kUJObwlUBWqtXZmHLhG3V4khrKsmKYPqZk4yuJExtZhNeBE%2CAOrYGsmg3t0fAmKPqxg657GmRYnXgGfry45vwrucDMnx01R1esui1nY6hg5FAB78v9VlhegTCVVn4H1-O_4ezFHL4kIcAd7IbogX8t6Vp-Ni0g%2CAOrYGsmUV99-8nE0udI1_ek-91Ej4R6WDhF9_65H4uoEDSawqepk824E8pjhw7WdHUvUzt52D9NRTxSi__Z_geYejaDYAqFaAyzjOk0eMmj28fdmfST7tZFTJZh_9UET8jyN2rkm&amp;pvsid=5558251384116586&amp;tmod=1368300479&amp;uas=1&amp;nvt=1&amp;ref=https%3A%2F%2Fwww.bing.com%2F&amp;fc=1920&amp;brdim=0%2C0%2C0%2C0%2C1920%2C0%2C1920%2C1032%2C1912%2C914&amp;vis=1&amp;rsz=%7C%7CeEbr%7C&amp;abl=CS&amp;pfx=0&amp;cms=2&amp;fu=128&amp;bc=31&amp;bz=1&amp;ifi=2&amp;uci=a!2&amp;btvi=3&amp;fsb=1&amp;dtd=18103" title="Advertisement" aria-label="Advertisement"></iframe>

## まとめ

機械学習ライフサイクル管理のための MLflow の基本的な使い方を解説しました。

MLflow は、機械学習のライフサイクルを管理するためのオープンソースのプラットフォームで、データサイエンティストやエンジニアが機械学習のプロジェクトを効率的に実行できるようになります。

この記事では、MNIST の手書き画像分類を例にして基本的な使い方を紹介してきました。プログラムでパラメータや実験結果、モデルを記録する方法や MLflow UI を使って結果を確認・管理する方法についても紹介しています。

MLflow は、機械学習プロジェクトのライフサイクル管理を容易にしてくれるツールですので、是非使い方を覚えて色々試してもらうと良いかなと思います。

MLflow の公式ドキュメントは [こちら](https://mlflow.org/docs/latest/index.html) を参照してください。

ソースコード

上記で紹介しているソースコードについては [GitHub](https://github.com/nkhn37/python-tech-sample-source/tree/main/python-data-analysis/mlflow) にて公開しています。参考にしていただければと思います。

あわせて読みたい

 [![【Python Tech】プログラミングガイド](https://tech.nkhn37.net/wp-content/uploads/2024/08/Python-Tech-Python%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%82%AC%E3%82%A4%E3%83%89_new1-640x360.jpg) ![【Python Tech】プログラミングガイド](https://tech.nkhn37.net/wp-content/uploads/2024/08/Python-Tech-Python%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%82%AC%E3%82%A4%E3%83%89_new1-640x360.jpg)

【Python Tech】プログラミングガイド](https://tech.nkhn37.net/python-tech-summary-page/)

<iframe sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" width="680" height="408" frameborder="0" allow="attribution-reporting; run-ad-auction" src="https://googleads.g.doubleclick.net/pagead/ads?gdpr=0&amp;client=ca-pub-9478001176347002&amp;output=html&amp;h=408&amp;slotname=2568481107&amp;adk=3993818732&amp;adf=655128413&amp;pi=t.ma~as.2568481107&amp;abgtt=6&amp;w=680&amp;cr_col=4&amp;cr_row=2&amp;fwrn=2&amp;lmt=1786591923&amp;rafmt=9&amp;format=680x408&amp;url=https%3A%2F%2Ftech.nkhn37.net%2Fmlflow-basic%2F&amp;crui=image_stacked&amp;fwr=0&amp;asro=0&amp;aimartd=4&amp;aieuf=1&amp;aicrs=1&amp;uach=WyJXaW5kb3dzIiwiMTUuMC4wIiwieDg2IiwiIiwiMTUxLjAuNDEyOS43MiIsbnVsbCwwLG51bGwsIjY0IixbWyJOb3Q9QT9CcmFuZCIsIjk5LjAuMC4wIl0sWyJNaWNyb3NvZnQgRWRnZSIsIjE1MS4wLjQxMjkuNzIiXSxbIkNocm9taXVtIiwiMTUxLjAuNzkyMi43NiJdXSwwXQ..&amp;dt=1786594744655&amp;bpp=1&amp;bdt=425&amp;idt=73&amp;shv=r20260811&amp;mjsv=m202608070101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;cookie=ID%3De8b14810b6b60569%3AT%3D1786594744%3ART%3D1786594744%3AS%3DALNI_May7XsYdChNnHMchhMJI7Ls_s-xNQ&amp;gpic=UID%3D000014dd0ab77fa2%3AT%3D1786594744%3ART%3D1786594744%3AS%3DALNI_MZBI1EQQsM08BVc577OJDOuahWw0A&amp;eo_id_str=ID%3Dc4c00e844f868ea9%3AT%3D1786594744%3ART%3D1786594744%3AS%3DAA-AfjbeyjTF7YhhcUKPWZPnOZs3&amp;prev_fmts=0x0%2C300x250%2C300x250%2C1005x274%2C680x280&amp;nras=2&amp;correlator=814875763269&amp;frm=20&amp;pv=1&amp;u_tz=540&amp;u_his=2&amp;u_h=1080&amp;u_w=1920&amp;u_ah=1032&amp;u_aw=1920&amp;u_cd=24&amp;u_sd=1&amp;dmc=16&amp;adx=389&amp;ady=14995&amp;biw=1897&amp;bih=914&amp;scr_x=0&amp;scr_y=11398&amp;eid=95396667%2C95397129%2C95397679&amp;oid=2&amp;psts=AOrYGsmH7Eb796gZe9poL8HjQ6385d-ev2tzUdZzw1BuNLrWfFrDJob7N3M-Jr-U5Ah_kUJObwlUBWqtXZmHLhG3V4khrKsmKYPqZk4yuJExtZhNeBE%2CAOrYGsmg3t0fAmKPqxg657GmRYnXgGfry45vwrucDMnx01R1esui1nY6hg5FAB78v9VlhegTCVVn4H1-O_4ezFHL4kIcAd7IbogX8t6Vp-Ni0g%2CAOrYGsmUV99-8nE0udI1_ek-91Ej4R6WDhF9_65H4uoEDSawqepk824E8pjhw7WdHUvUzt52D9NRTxSi__Z_geYejaDYAqFaAyzjOk0eMmj28fdmfST7tZFTJZh_9UET8jyN2rkm%2CAOrYGskVfFCM2bCgla79kt67NiDy0zf518jmzAQFCHNoFqL-IIwq9PVjFLLdXvWYlLCOc-BEB50fUyCdYoJRNw73LX0NB3AnGn70c8xScVS5B1nhqA&amp;pvsid=5558251384116586&amp;tmod=1368300479&amp;uas=1&amp;nvt=1&amp;ref=https%3A%2F%2Fwww.bing.com%2F&amp;fc=1920&amp;brdim=0%2C0%2C0%2C0%2C1920%2C0%2C1920%2C1032%2C1912%2C914&amp;vis=1&amp;rsz=%7C%7CeEbr%7C&amp;abl=CS&amp;pfx=0&amp;fu=128&amp;bc=31&amp;bz=1&amp;ifi=3&amp;uci=a!3&amp;btvi=4&amp;fsb=1&amp;dtd=18608" title="Advertisement" aria-label="Advertisement"></iframe>