---
title: "【深層学習】RNN、LSTM、GRUまとめ（仕組み、ちょっとだけ数式）"
source: "https://qiita.com/nakamin/items/e96542d4e69feb56bc73"
author:
  - "[[nakamin]]"
published: 2025-01-05
created: 2026-08-12
description: "こんにちは。Qiitaで記事初投稿となります！ 最近扱っているモデルであるRNN、LSTM、GRUについて理解を深めたい..！ということで、自分の勉強がてらに深層学習の仕組みから各モデルの特徴までまとめていきたいと思います！ アウトライン 深層学習とは ※既知の方はどう..."
tags:
  - "clippings"
---
この記事は最終更新日から1年以上が経過しています。

- [ニューラルネットワーク](https://qiita.com/tags/%e3%83%8b%e3%83%a5%e3%83%bc%e3%83%a9%e3%83%ab%e3%83%8d%e3%83%83%e3%83%88%e3%83%af%e3%83%bc%e3%82%af)
- [深層学習](https://qiita.com/tags/%e6%b7%b1%e5%b1%a4%e5%ad%a6%e7%bf%92)
- [RNN](https://qiita.com/tags/rnn)
- [LSTM](https://qiita.com/tags/lstm)
- [GRU](https://qiita.com/tags/gru)

17

最終更新日 投稿日 2025年01月05日

こんにちは。Qiitaで記事初投稿となります！  
最近扱っているモデルであるRNN、LSTM、GRUについて理解を深めたい..！ということで、自分の勉強がてらに深層学習の仕組みから各モデルの特徴までまとめていきたいと思います！

## アウトライン

1. 深層学習とは ※既知の方はどうぞ飛ばしてください！
2. RNN
3. LSTM
4. GRU

## 1\. 深層学習とは

まず、モデルの中身に入る前に、大前提となる **深層学習** の仕組みについて簡単におさらいします。  
[![ai_study_kikaigakusyu.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/8d3988ea-f220-92b7-eda1-5d45cf1ba3c2.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F8d3988ea-f220-92b7-eda1-5d45cf1ba3c2.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=ae5f4fe9d9464633b0374a7f716a09d3)

深層学習は機械学習の一種です。  
機械学習は、機械が大量のデータを学習し、判断・処理の精度を上げることを目指す手法です。一般的に、データを **最もよく説明できる関数（数式）** を探索するよう指示して、その探索を機械に任せるイメージです。

対して、深層学習は多層構造のネットワークを通じて、機械が重要な特徴・指標を自ら判断したうえで学習を行い、判断・処理の精度を上げることを目指す手法です。これにより、複雑なデータのパターンをより効果的に捉えることが可能になります。  
例えば、従来の機械学習では、画像認識で「犬」を判別する場合、「耳の形状」「鼻のサイズ」といった特徴を手作業で定義する必要がありましたが、深層学習ではそれを自動的に見つけ出し、より高い精度で分類を行ってくれます。

ここでいう「深層」とは、関数を何重にも積み重ねて「層（layer）」で表現をすることに由来しています。つまり、深層学習で関数を積み重ねることによって複雑な関数を表現できるようになるということです。

例えば、深層学習の層構造を $f^{\left(n\right)} \left(. . . f^{\left(2\right)} \left(f^{\left(1\right)} \left(x\right)\right) . . .\right)$ のように表現されるとします（例： $f_{2} \left(x\right) = f \left(f \left(x\right)\right)$ ）。  
この関数 $f^{\left(i\right)}$ について、最もシンプルな関数である1次関数を重ねたところで、結局1次関数に変わりありません。深層学習においては、1次関数以外の関数が必要になります。  
ちなみに、1次関数はグラフが真っ直ぐになるので線形であると言い、それ以外の関数を非線形であると言います。ここから、層を表す関数は非線形であることが必要になるということが分かると思います。  
このような非線形関数を **活性化関数 $\varphi$** と呼び、深層学習では $f^{\left(i\right)} \left(z\right) = \varphi \left(a_{1} z_{1} + a_{2} z_{2} + . . . + a_{m} z_{m} + b\right)$ の形で表されます。活性化関数にはいろいろな種類がありますが、ここではその説明は省略して、深層学習の数学にもちょっとだけ触れたいと思います。

## 深層学習の中身

[![IMG_0337.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/f2a2e7be-21a3-004c-6449-8ec26eb689cf.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2Ff2a2e7be-21a3-004c-6449-8ec26eb689cf.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b01684d77712cef7b6bb83c8b0876364)

この図は、3層構造の多層ニューラルネットワークを示したものです（一般的に重みがリンクしていない入力層はカウントされません）。  
図のように、入力層 → 中間層（隠れ層） → 出力層と順番に情報を伝達していき、入力されたものが何であるのかを考え、答えを出力することが基本的な学習の流れです。この入力が与えられたときに各層を順番に計算していき、出力までの計算を行うことを **順伝播** といいます。

では、前の層からその次の層へ情報を伝達する際、図中の「線」と「丸」はどのような動きをしているのでしょうか。  
なお、この線と丸にはいろいろな呼び方がありますが、ここではそれぞれ **ノード** と **シナプス** と呼ぶこととします。

## 線形変換

[![ニューラルネットワーク 線形変換.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/e85c6f6f-edf9-29fb-3233-770b48da4a1f.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2Fe85c6f6f-edf9-29fb-3233-770b48da4a1f.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=72958cee3922d612d09d314140d2d648)

この図には、2つの層があり、ノードとノードを接続するシナプス（線）が書かれています。シナプスの上には、両端のノード間の結合重みを表しています。

入力層のノードが持つ値は、結合重みと掛け合わされ、出力層のノードに伝わります。出力層の 1 つのノードには、複数のノードから計算結果が伝わってくるので、これらを全部足し合わせることになります。  
具体的には以下のような計算をしていることになります。

- $u_{11} = w_{11} h_{01} + w_{12} h_{02} + w_{13} h_{03} + b_{1}$
- $u_{12} = w_{21} h_{01} + w_{22} h_{02} + w_{23} h_{03} + b_{2}$

これが、 **線形変換** 、つまり **重みを掛ける操作** のことを指します。

さて、何気なく **重み** という言葉を使っていましたが、 **重み** とは、各ノードが持っている値で、「どれだけこの情報が重要であるか」を表します。  
例えば、白ワインか赤ワインかを見分けなければいけない状況において、「年数」「アルコール度数」「色合い」という3つの情報が直前のノードから得られたとします。「色合い」という情報があればすぐに種類を判断できますが、それ以外の情報では二者を見分けることはできません（大体のワインは色で赤/白を見分けられるはず..）。この場合「色合い」という情報の重みを大きくすることで、より精度高く赤か白かを見分けることが可能になります。

## 非線形変換

隠れ層では、一つ前の層に線形変換を適用した結果を受け取り、そこへさらに **非線形変換** を適用したものを出力します。  
[![ニューラルネットワーク 非線形変換.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/325f7cce-e722-4c02-810a-921ba73036ff.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F325f7cce-e722-4c02-810a-921ba73036ff.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=a8b705ef16f350efbbf4a9ab99cf2028)

この図では、各層において線形変換のあとに非線形変換を施していることが分かります。  
ここで、非線形変換をする際に使われる **活性化関数** とは一体何なのでしょうか。  
それは、 **「その情報を次に伝達すべきか否かを判断するフィルター」** のようなものをイメージしてください。  
例えば、一般的な活性化関数の一つであるReLU（Rectified Linear Unit）関数は、入力が負の場合には出力は0、正の場合には入力をそのまま出力する関数です。

ニューラルネットワークは人間の神経細胞を模して設計されており、活性化関数は入力信号を肯定するもの、否定するものと考えられます。つまり、データを入力して活性化関数に通すと、それが白ワインであるとされる閾値を超えた途端、入力信号が肯定されます。このことをニューラルネットワークの文脈ではよく「発火」するといいます（正直呼び方に慣れないですが、閾値を超えた場合に信号が伝達される感じです）。

このように、各層において、線形変換に続いて非線形変換を施し、層を積み重ねて作られるニューラルネットワーク全体としても **非線形性** を持つことができるようにしています。

## 目的関数の最適化

この後、「実際に答えと照らし合わせて、正解であったかどうか」「不正解の場合、どこを修正すれば正解に近づけるのか（どのノードの重みをどう変更するべきか）」を学習していきます。  
ここで、 **損失関数（目的関数）** とは、「AIの予測と正解がどれくらい違っていたか」を求めるための関数です。損失関数の出力結果は損失と呼ばれ、この損失を最小化（最適化）するパラメータの調整方法に **「勾配降下法」** が用いられます。

[![IMG_0268.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/d10e9654-88ce-2088-a769-b1b7f76dc4f3.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2Fd10e9654-88ce-2088-a769-b1b7f76dc4f3.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=9a7063fea3f2a6afcbdf047cd1ba835a)

図にも示しているように、分類問題の場合、損失関数として **交差エントロピー** が、回帰問題の場合、 **平均二乗誤差** がよく使われます。ここでは、計算の分かりやすさの面から、回帰問題を考えていきます。平均二乗誤差とは、個々の実測値と予測値の差の二乗を平均した値であり、これをできるだけ小さくすることを目指します。

勾配降下法の内容も簡単に触れたいと思います。  
[![IMG_0271.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/1adf637f-b6fb-fe95-cdd1-c6238c5fe3b7.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F1adf637f-b6fb-fe95-cdd1-c6238c5fe3b7.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=d1b609449649a7d4f515819a551c7f49)

この図においては、パラメータ $w$ を変化させた際の目的関数 $L$ の変化を二次関数で表しています。  
初期値4に対する接線の傾き（勾配）が5で正の場合、負の方向に $w$ を変化させていくと、最小値に近づいていくことが分かります。どのように近づけていけるかというと、現在の $w$ から傾きを引いていくと逆方向への動きが実現できます。反対に、傾きが負の時は、更新量を足せば正の方向に変化できますね。  
この傾きが正と負の2パターンの動きは次の式で表せます。  
$$
更 新 後 の w = 更 新 前 の w - w の 更 新 量
$$

この時、更新する幅は **学習率** というもので調整していきます。  
つまり、学習率と勾配の積を更新量としてパラメータを変化させることで、目的関数 $L$ を最小にする $w$ へと徐々に近づけることができます。  
これを繰り返していき、重みを調整することで、この損失をいかに小さくするかが学習の根幹となります。

ニューラルネットワークの構造に先ほどのパラメータの更新を落とし込むとこのようになります。  
[![IMG_0272.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/38fb3db6-e1ec-e7ae-57e2-55fbce18b6f4.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F38fb3db6-e1ec-e7ae-57e2-55fbce18b6f4.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=92a7bfe6555e0ec1b40e603528dcb2ae)

例えば、 $w_{2}$ についての $L$ の勾配は、 $\frac{\partial L}{\partial w_{2}}$ であり、これは合成関数の偏微分なので連鎖律を用いて $\frac{\partial L}{\partial y} \cdot \frac{\partial y}{\partial w_{2}}$ のように展開できます。 **2つの偏微分の積** ですね。

同様に、 $w_{1}$ に関しては、 $\frac{\partial L}{\partial w_{1}}$ であり、連鎖律を用いて $\frac{\partial L}{\partial y} \cdot \frac{\partial y}{\partial h} \cdot \frac{\partial h}{\partial u} \cdot \frac{\partial u}{\partial w_{1}}$ と表されます。  
この計算は、層ごとに独立しており、前の層や中間結果が **再計算される** ことになります。  
つまり、損失関数 $L$ が $w_{1}$ に影響を与える経路をすべてたどる必要があるということです。

1. 損失関数 $L$ は最終出力 $y$ に依存している → $\frac{\partial L}{\partial y}$
2. $y$ は隠れ層の出力 $h$ に依存している → $\frac{\partial y}{\partial h}$
3. $h$ は隠れ層の入力 $u$ に依存している → $\frac{\partial h}{\partial u}$
4. $u$ は $w_{1}$ に依存している → $\frac{\partial u}{\partial W_{1}}$

このように、各勾配を計算するたびにすべての依存関係を一から追跡し、同じ中間結果（例 h,u,y）を再計算する必要があります。

今まで見てきた方法は、損失関数 $L$ に対して、パラメータ $w_{1}$ 、 $w_{2}$ 、 $b_{1}$ 、 $b_{2}$ を、 **直接微分する方法** でした。  
これは、層ごとに個別に微分しており、膨大な計算コストがかかってしまいます。

このようなやり方では、多層ニューラルネットワークでは現実的ではないため、損失関数が出力した結果を利用して、出力層側から入力層側へと逆方向に伝達していく方法がよく知られています。  
これを、 **逆伝播（バックプロパゲーション）** と呼びます。どのような計算がされているかを見ていきましょう。

## 逆伝播（バックプロパゲーション）

この図は、先ほどまで見ていた3層のニューラルネットワークを別の書き方で表したものです。新しい入力 $x$ が与えられたときに、線形変換、非線形変換を施されていき目的関数の値 $l$ を計算している **順伝播** の様子が分かると思います。図中の丸いノードは変数を表し、四角いノードは関数を表しています。  
次にやりたいことは、 **パラメータの更新** ですね。各パラメータ $w_{1}$ 、 $w_{2}$ 、 $b_{1}$ 、 $b_{2}$ に記載の数式はパラメータの更新式です。学習率は決まった値だとして、目的関数の偏微分の値（例えば、 $\frac{\partial L}{\partial w_{1}}$ ）が求まれば計算できます。

[![IMG_0281.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/3b39024f-821f-6f83-64b2-5d0187438ab8.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F3b39024f-821f-6f83-64b2-5d0187438ab8.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=044557a895f834ac6534be364ee1a036)

ここでは、 $w_{1}$ と $w_{2}$ の更新量を考えてみましょう。  
最初に $w_{2}$ の目的関数に対する偏微分の計算です。  
[![IMG_0282.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/1330801e-752b-8b01-e314-cff9210234e7.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F1330801e-752b-8b01-e314-cff9210234e7.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=794d807a98b9d41b6f91b2d0c422970f)  
次に、 $w_{1}$ の目的関数に対する偏微分の計算です。  
[![IMG_0283.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/c65d636b-a5fd-89c0-7e9a-4c8a20b77bf4.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2Fc65d636b-a5fd-89c0-7e9a-4c8a20b77bf4.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=24c4adf200def09200dfc096ec771281)

ここで注目することは、必要な目的関数の勾配は、 **各パラメータ（ $w_{1}$ または $w_{2}$ ）のノードより先の部分（出力側）にある関数の勾配をかけ合わせれば計算できる** ということです。  
例えば、 $w_{2}$ の偏微分値 $\frac{\partial L}{\partial w_{2}}$ は $\frac{\partial L}{\partial y} \cdot \frac{\partial y}{\partial w_{2}}$ ですが、これは $w_{2}$ のノードより先の2つの関数の勾配です。

つまり、順伝播とは逆向きに、各関数における入力についての勾配を求めて、掛け合わせていけば、パラメータについての目的関数の勾配が計算できます。このアルゴリズムを **誤差逆伝播法** と呼びます。  
これで深層学習の仕組みについては終了です！

## 2\. RNN

お待たせしました。ここから **RNN（再帰型ニューラルネットワーク）** の説明をしていきます。  
今まで見てきた通常のニューラルネットワークでは、ある層の出力は次の層の入力に利用されるのみでした。  
対して、RNNは、過去の情報を利用して現在および将来の入力に対するネットワークの性能を向上させる構造を持っています。

## 仕組み

RNNの隠れ層において、再帰的に出現する同じのネットワーク構造のことをセル（cell）と呼びます。この図は1つの時刻における計算フローを示しています。

[![IMG_0315.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/99048aef-e85b-dd65-0228-4f55b3f735f7.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F99048aef-e85b-dd65-0228-4f55b3f735f7.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=febaebeccf2582806145b0be8a85b82b)

流れとしては以下の3ステップです。

1. **隠れ層の更新**  
	$$
	h_{t} = f \left(U x_{t} + W h_{t - 1}\right)
	$$
	  
	前の時刻 $t - 1$ での隠れ層の状態 $h_{t - 1}$ と現在の時刻 $t$ の入力データを $x_{t}$ を組み合わせ、活性化関数 $f$ を適用することで、次の隠れ層の状態 $h_{t}$ を計算します。  
	なお、時刻 $t$ の入力 $x_{t}$ には重み行列 $U$ をかけ、入力データを隠れ層用の情報に変換し、前の時刻の隠れ層の状態 $h_{t - 1}$ にも重み行列 $W$ をかけ、過去の情報を反映しています。
2. **出力層の線形変換**  
	$$
	o_{t} = V h_{t}
	$$
	  
	隠れ層の状態 $h_{t}$ を重み行列 $V$ を用いて線形変換し、出力層の中間値 $o_{t}$ を計算します。  
	隠れ層の情報を出力用の次元に変換する役割を果たしておりますが、この時点ではまだ最終的な出力形式（確率や実数値）にはなっていません。
3. **活性化関数の適用**  
	$$
	\hat{y}_{t} = g \left(o_{t}\right)
	$$
	  
	出力層の中間値 $o_{t}$ に活性化関数 $g$ を適用し、予測値 $\hat{y}_{t}$ を得ます。  
	活性化関数 $g$ はタスクに併せて出力の形式を変えることが役割です。例えば、分類タスクの場合はソフトマックス関数を、回帰タスクの場合は恒等関数（何も変換しない関数）を適用してそのまま実数値を出力します。

このように隠れ層の状態 $h_{t}$ を更新しながら、入力データを逐次処理しています。

次のこの図では、RNNが時系列データ $x_{1} , x_{2} , . . . , x_{t}$ をどのように処理するかを示しています。  
ここから、時刻 $t$ ごとの隠れ層状態 $h_{t}$ が入力 $x_{t}$ と過去の状態 $h_{t - 1}$ に依存していること、時刻ごとの出力 $\hat{y}_{t}$ はどれぞれの $h_{t}$ を基に計算されていることが分かります。

[![IMG_0316.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/5c69c958-0354-2cc7-6f13-7072a5885bb9.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F5c69c958-0354-2cc7-6f13-7072a5885bb9.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=1908319938796ef73c58c8a81aa90ad7)

RNNは誤差の逆伝播計算を行うとき、層をさかのぼるにしたがって誤差が急速に小さくなり学習が進行できないという **勾配消失問題** を抱えています。これは、活性化関数を微分することによって得られる緩やかな傾きや同じ重みを何度も掛け算することによって引き起こされます。  
また、誤差が大きくなりすぎてしまい学習が不安定になる **勾配爆発** という問題も存在します。

## 3\. LSTM

**LSTM（Long Short-Term Memory）** は、RNNの一種であり、長期的な依存関係を学習できるモデルです。過去の情報を長期間覚えておくことが得意なモデルなので、例えば、長い文章で冒頭話題になった内容を後半で再び使う場合に、「話題を覚えておく力」を活用して、文章の意味をより正確に理解できます。

RNNが抱える「長期記憶の消失問題」を改善するために、 **記憶セル** と **ゲート機構** が導入されています。  
[![IMG_0317.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/ec2b6dcc-c539-9ea3-bbd8-a0f7621aab79.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2Fec2b6dcc-c539-9ea3-bbd8-a0f7621aab79.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=0b1ae0bd5f6c198e6dbb9240c8221fbe)

この図はLSTMの全体構造を示したものです。LSTMはRNNを拡張したモデルでありますが、いくつかの重要な違いがあります。

- **ゲート機構**  
	LSTMでは、再帰予測を繰り返す中で、長期間にわたる不要な記憶を少しずつ消去し、必要な情報を保持する仕組みを **「ゲート機構」** によって実現しています。ゲートが分かりづらい場合、伝達される情報の量を調整する出入り口をイメージしてください。  
	[![travel_kinzoku_tanchi.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/d597386d-4a88-02bd-6b99-356396eb5131.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2Fd597386d-4a88-02bd-6b99-356396eb5131.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b2146e3eb1224e4ad30795c79e69d01c)

ゲート機構には以下の3種類があります

1. **忘却ゲート** ：長期記憶 $c_{t - 1}$ のどの情報を忘れるかを調整
2. **入力ゲート** ：入力 $x_{t}$ と過去の状態 $h_{t - 1}$ を受け取り、新しい情報をどれだけ記憶するかを決定
3. **出力ゲート** ：更新された長期記憶 $c_{t}$ から、次の隠れ状態 $h_{t}$ にどの情報を出力するかを調整
- **長期記憶 $c_{t}$**  
	RNNでは短期的な記憶として隠れ状態 $h_{t}$ がありましたが、LSTMではこれに加えて、長期間の情報を保持するための **セル状態 $c_{t}$** を導入しています。
- **活性化関数の役割**  
	RNNでは、過去の情報と現在の情報を非線形に組み合わせるために活性化関数tanhが使われていました。LSTMでは、 $\sigma$ と $t a n h$ を併用されています。
1. **シグモイド関数（ $\sigma$ ）**  
	忘却ゲート、入力ゲート、出力ゲートで、 **情報を保持・消去・出力する割合を調整** 。座標点(0, 0.5)を基点として点対称となるS字型の滑らかな曲線で、0～1の間の値を取る。
2. **双曲線正接関数（ $t a n h$ ）**  
	**新しい情報を生成したり、セル状態をスケーリングする際に使用** 。座標点（0, 0）を基点として点対称となるS字型の滑らかな曲線で、-1～1の間の値を取る。
  
では、その仕組みを順を追って見ていきましょう。

## 仕組み

１． **忘却ゲートの計算**  
忘却ゲートの出力 $f_{t}$ が計算される様子を示しています。  
[![IMG_0319.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/17280ae3-286f-ef4b-7308-fba0478e7392.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F17280ae3-286f-ef4b-7308-fba0478e7392.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=6f3abffb2175971bf30d9ae98c6a2986)

$$
f_{t} = \sigma \left(W_{f} x_{t} + U_{f} h_{t - 1} + b_{f}\right)
$$

忘却ゲートはこれまでの「記憶」（セル状態） $c_{t - 1}$ からどの情報を忘れるかを決める **忘却率 $f_{t}$** を出力します。  
例えば、記憶セルのデータを全て消去する必要がある場合は忘却ゲートから出力される数値は0、全て残しておく場合は1が出力されます。このデータの **忘れる度合い** に応じて、0から1までの出力がされます。「記憶の取捨選択」ですね。  
  
２． **入力ゲートの計算**  
2枚の図を使って新しい情報を記憶するシグモイド層（入力ゲート）の計算と、候補となる新しい記憶を生成するtanh層のプロセスを示します。

**①どれだけ新しい情報を追加するかを決める入力率 $i_{t}$ を出力**

[![IMG_0320.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/78670c70-a0d8-5709-2eef-8755c18c7615.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F78670c70-a0d8-5709-2eef-8755c18c7615.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=c9c2cd0ed2adf4893441d69fc8eb185f)

$$
i_{t} = \sigma \left(W_{i} x_{t} + U_{i} h_{t - 1} + b_{i}\right)
$$
  
  
**②入力ゲートの値の分だけ、記憶セルに保存するための新しい情報として $\overset{\sim}{c_{t}}$ を作成**  
[![IMG_0332.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/6315d8dc-6701-048b-e330-b54b785a28a4.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F6315d8dc-6701-048b-e330-b54b785a28a4.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=45326694c54b61ef6f7495d29405cb7e)

$$
\overset{\sim}{c}_{t} = tanh \left(W_{c} x_{t} + U_{c} h_{t - 1} + b_{c}\right)
$$
  
  
３． **セル状態の更新**  
この図では、忘却ゲートと入力ゲートの出力を使ってセル状態 $c_{t}$ を更新する様子を示しています。

[![IMG_0322.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/7ad44888-6bab-d4a8-4df7-ad9cbd9928c3.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F7ad44888-6bab-d4a8-4df7-ad9cbd9928c3.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=70e4b77faa04d0c67ff98dfb6fe84f84)

長期記憶をどれぐらい忘れるかと、短期記憶を新たにどれぐらい覚えるかを更新します。

$$
c_{t} = f_{t} \circ c_{t - 1} + i_{t} \circ \overset{\sim}{c_{t}}
$$

- $c_{t}$: 更新されたセル状態（出力ゲートへ渡される）
- $f_{t} \circ c_{t - 1}$ ：忘却ゲート出力で調整。前ステップまでため込んでおいた長期記憶をどのぐらいステップ $t$ で保持し、残りを廃棄するかを調整する **忘れる記憶**
- $i_{t} \circ \overset{\sim}{c_{t}}$: 入力ゲートで調整した入力値。長期記憶と短期記憶をどのぐらいセルに保持するかという **覚える記憶**
- $\circ$ ：要素ごとの積

４． **出力ゲートの計算**  
2枚の図を使って、出力ゲート $o_{t}$ の計算と隠れ状態 $h_{t}$ の更新についてのプロセスを示します。

**①情報をどの程度出力するかを決定する出力 $o_{t}$ を計算**  
[![IMG_0323.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/9f624d5d-5ae1-be41-dd4b-a229af9aac7f.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F9f624d5d-5ae1-be41-dd4b-a229af9aac7f.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=03d1e476787566819f7ae2212eb92d17)

$$
o_{t} = \sigma \left(W_{o} x_{t} + U_{o} h_{t - 1} + b_{o}\right)
$$
  
  
**②出力ゲートの出力値 $o_{t}$ を用いて、次の時間ステップや隠れ層に渡される短期的な記憶である $h_{t}$ を予測**

[![IMG_0326.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/d7ecd40d-c162-441b-119e-e28424e728e5.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2Fd7ecd40d-c162-441b-119e-e28424e728e5.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=34ad95b20d7bc3e4e1b718949cc0aa1a)

$$
h_{t} = o_{t} \circ tanh \left(c_{t}\right)
$$

今まで見てきた流れをざっくり表すと以下のとおりです。

1. 忘却ゲートで不要な記憶を捨てる
2. 入力ゲートで新しい情報を追加する
3. セル状態を更新して「記憶」を保持する
4. 出力ゲートで次の時刻へ渡す隠れ状態を決定する

LSTMは、RNNが抱える課題を解決するための重要なステップであり、特に長期的な依存関係を扱う多くのタスクで大きな成果を上げています。その一方で、計算量や学習速度の課題も存在しています。  
次に、LSTMを簡素化したモデルで、より高速に学習できる **GRU（Gated Recurrent Unit）** を見ていきましょう。

## 4\. GRU

この図は **GRU（Gated Recurrent Unit）** の全体構造を示したものです。  
[![IMG_0327.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/76475366-9568-b289-86da-c373aa7f6bc2.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F76475366-9568-b289-86da-c373aa7f6bc2.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=7f31f998b02b5e272d15985bfe30b3eb)

GRUはLSTMの簡易版とされ、計算効率化・軽量化を狙った構造となっています。LSTMと同等以上の精度を保ちながら、以下のような改良により効率を向上させています。

1. **LSTMの「入力ゲート」と「忘却ゲート」を統合して「更新ゲート」とする**
	- 更新ゲート $z_{t}$ ：過去の情報をどれだけ残し、新しい情報にどれだけ置き換えるかを制御
2. **リセットゲートを導入し、不要な過去情報を除去する仕組みを簡素化**
	- リセットゲート $r_{t}$ ：過去の情報をどれだけ無視するかを制御
3. **長期記憶セル $c_{t}$ を廃止し、隠れ状態 $h_{t}$ だけに記憶を集約**

では、その仕組みを見ていきましょう。

## 仕組み

１． **リセットゲートの計算**  
リセットゲートは、 **前時刻の情報をどれだけ忘れるか** を決定します。  
[![IMG_0329.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/e93aec52-3009-7d93-cdb6-7c5f77557a23.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2Fe93aec52-3009-7d93-cdb6-7c5f77557a23.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=68c1ffae96bf777f5d204101f6925f29)

この値 $r_{t}$ は過去の状態をリセットする際に使用されます。

$$
r_{t} = \sigma \left(W_{r} x_{t} + U_{r} h_{t - 1} + b_{r}\right)
$$

なお、LSTMの忘却ゲートと同じく「前フレームの潜在状態 $h^{\left(t - 1\right)}$ をどれだけ忘れるか（どれくらいメモリ上から除去するか）」の役割を担当しています。  
  
２. **更新ゲートの計算**  
更新ゲートは、 **入力データ $x_{t}$ と前時刻の隠れ状態 $h_{t - 1}$ を用いて、新たに記憶する情報の割合 $z^{\left(t\right)}$ を計算** します。  
[![IMG_0328.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/b2e9cbbd-79aa-81ee-dcb2-8d9d1fe80b35.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2Fb2e9cbbd-79aa-81ee-dcb2-8d9d1fe80b35.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=7b86e2d4f49930c75811b65e785f41eb)

$$
z_{t} = \sigma \left(W_{z} x_{t} + U_{z} h_{t - 1} + b_{z}\right)
$$
  
  
３． **候補隠れ状態の計算**  
リセットゲート $r_{t}$ の影響を受けた前時刻の状態を用いて、新しい「候補隠れ状態」 $\overset{\sim}{h}_{t}$ を計算します。  
[![IMG_0330.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/467df54b-99cc-599b-90fc-cef8dac66741.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2F467df54b-99cc-599b-90fc-cef8dac66741.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=43167847e5d134335225256fd25163f2)

これにより、過去の情報の選別が行われます。

$$
\overset{\sim}{h}_{t} = tanh \left(W_{h} x_{t} + r_{t} \circ \left(U_{h} h_{t - 1}\right) + b_{h}\right)
$$
  
  
４． **隠れ状態の更新**  
**更新ゲート $z_{t}$ を用いて、過去の状態 $h_{t - 1}$ と新しい候補隠れ状態 $\overset{\sim}{h}_{t}$ を加重平均し、次の隠れ状態 $h_{t}$ を決定** します。  
[![IMG_0331.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3830602/d43c43bb-e059-735e-1608-041419b0ce7d.jpeg)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3830602%2Fd43c43bb-e059-735e-1608-041419b0ce7d.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=defeadeb1fa5072eb1cf0cf4eb09fda4)

この加重平均により、新しい情報と過去の情報のバランスが調整されます。

$$
h_{t} = z_{t} \circ h_{t - 1} + \left(1 - z_{t}\right) \circ \overset{\sim}{h}_{t}
$$
  
  
今まで見てきた流れをざっくり表すと以下のとおりです。

1. 更新ゲートで「過去の情報をどれだけ保持するか」を決める
2. リセットゲートで「過去の情報をどれだけ無視するか」を決める
3. 候補状態を生成し、更新ゲートを使って新しい隠れ状態を決定する

GRUは、RNNのシンプルさを保ちながら、長期依存関係を学習できる優れたモデルです。更新ゲートとリセットゲートによる効率的な構造により、LSTMに匹敵する性能を持ちながらも、計算負荷が軽く、実用的な場面で頻繁に使用されます。  
ただし、学習対象のデータによっては、どちらのモデルも精度に差が出るので、状況によって適切な方を選ぶことが重要です。

以上の内容をまとめると以下のとおりです。

| 特徴 | LSTM | GRU |
| --- | --- | --- |
| **構造の複雑さ** | 複雑（3つのゲート構造：入力、出力、忘却） | シンプル（2つのゲート構造：更新、リセット） |
| **パラメータ数** | 多い | 少ない |
| **計算効率** | 比較的低い | 高い |
| **モデルの性能** | 長期依存関係の学習に適している | 多くのタスクでLSTMに匹敵 |
| **実用性** | 計算リソースが十分な場合に選択される | リソース制約下での選択肢 |
| **実用例** | 自然言語処理（NLP）：文章生成、機械翻訳   音声認識：長時間の音声データの処理 | 時系列データ：気象データ予測、株価予測   モバイルデバイス：リソース制約下でのアプリケーション（例：チャットボット） |

---

以上です。読んでいただきありがとうございました。

## 参考記事

以下のサイトを参考にさせていただきました。

- [Chainerチュートリアル: ニューラルネットワーク基礎](https://tutorials.chainer.org/ja/13_Basics_of_Neural_Networks.html)
- [TechSword: 深層学習の紹介](https://techsword.co.jp/column/introduce-deep-learning)
- [CVMLエキスパートガイド カテゴリー: RNN](https://cvml-expertguide.net/category/terms/dl/rnn/)

[0](#comments)

コメント一覧へ移動

X（Twitter）でシェアする

Facebookでシェアする

はてなブックマークに追加する

新規登録して、もっと便利にQiitaを使ってみよう

1. あなたにマッチした記事をお届けします
2. 便利な情報をあとで効率的に読み返せます
3. ダークテーマを利用できます
[ログインすると使える機能について](https://help.qiita.com/ja/articles/qiita-login-user)