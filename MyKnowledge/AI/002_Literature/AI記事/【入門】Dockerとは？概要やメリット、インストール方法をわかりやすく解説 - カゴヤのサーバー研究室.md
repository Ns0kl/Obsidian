---
title: "【入門】Dockerとは？概要やメリット、インストール方法をわかりやすく解説 - カゴヤのサーバー研究室"
source: "https://www.kagoya.jp/howto/cloud/container/docker/"
author:
  - "[[小泉 健太郎]]"
published: 2025-03-28
created: 2026-08-13
description: "Dockerは従来の仮想化にかわって、様々な開発環境で使われている技術です。非常に扱いやすく利便性の高い技術であることから、Dockerの利用は今後も広がっていくでしょう。この記事ではDockerとは何かといった基本からメリット、インストール方法、基本的なコマンドまで解説しています。Dockerをこれから使い始めようと検討している方は、この記事を参考にして下さい。"
tags:
  - "clippings"
---
![Dockerとは](https://www.kagoya.jp/howto/wp-content/uploads/dockertoha.jpg)

Dockerは従来の仮想化にかわって、様々な開発環境で使われている技術です。非常に扱いやすく利便性の高い技術であることから、Dockerの利用は今後も広がっていくでしょう。

この記事ではDockerとは何かといった基本からメリット、インストール方法、基本的なコマンドまで解説しています。Dockerをこれから使い始めようと検討している方は、この記事を参考にして下さい。

## Dockerとは？をわかりやすく解説

Dockerとは、軽量で高速に動作するコンテナ型仮想環境用のプラットフォームです。Dockerを使うことで、1台のサーバー上で様々なアプリケーションを手軽に仮想化・実行できるようになります。

### Dockerの仕組み/従来の仮想化との違い

![Dockerの図解](https://kagoya.jp/howto/wp-content/uploads/whatdocker.png)

従来の仮想化では仮想マシンごとに1つのゲストOSをインストールし、あたかも1台の独立したサーバーのように利用していました。一方でDockerではホストOSのカーネルを共有して利用することで、従来の仮想化と違いゲストOSを必要としません。その分だけDockerは軽快に動作するのが特徴です。

従来の仮想化では、仮想マシンはOSを起動する必要があるため、仮想マシンの作成から起動まで数分程度の時間がかかります。一方でDockerのコンテナ型仮想環境は、ほんの数秒で起動できるのです。

### Dockerにできること

Dockerを使うことで、以下のようなことを実現できます。

- 1台のサーバー上に複数のアプリケーション実行環境（Dockerコンテナ）を作成・利用できる。※サーバーの有効活用や、サーバー機の節約が可能
- アプリケーション実行環境（Dockerコンテナ）の他サーバーなどへの移転、他ユーザーとの共有※Dockerコンテナの移転や共有は複雑で手間のかかる操作を必要とせず、簡単に実行可能
- Dockerコンテナでアプリケーションの開発環境を作成し、インターネット上で他エンジニアと簡単に共有できる

※日額20円のVPS「 **[KAGOYA CLOUD VPS](https://www.kagoya.jp/vps/?argument=vqHX23Xs&dmai=a627ca98183f8b)** 」では、テンプレートを使って簡単にDockerを始められます。以下記事で詳細を解説しているので、興味があればあわせてご覧ください。

![Docker を使って コンテナ仮想化を体験する](https://www.kagoya.jp/howto/wp-content/uploads/202103d_main.jpg)

Docker を使って コンテナ仮想化を体験する

[Docker を使って コンテナ仮想化を体験する](https://www.kagoya.jp/howto/cloud/container/docker-template/)

カゴヤのVPSでは CentOS や Ubuntu、Windows などのOSに加え、必要なパッケージがインストール済みのテンプレートも用意されています。テンプレートを使うことで、面倒で複雑な環境構築作業を大幅に削減することが可能です。利用目的に合わせた環境を簡単に素早く構築できるため、学習や開発・テストなど、やりたいことをすぐに始められます。また日額料金で使い始めることができるので、少しだけ環境…

### Docker利用のメリット

- 手軽かつスピーディに―アプリケーションの実行環境を確保できる
- 処理速度が速い(CPUやメモリーの使用量を節約できる)
- アプリケーション実行環境の移転が簡単

これらのメリットから、以下のような用途での利用に適しています。

- 他エンジニアと開発環境の共有
- 複数OSでアプリケーションの動作確認
- バージョン管理システム

次の項から、Dockerを実際に使うための知識（インストール方法やコマンド）を紹介します。

## Dockerのインストール方法

DockerはLinuxの各種ディストリビューションをはじめ、Windows※やMac環境でも利用可能です。ここでは、Ubuntu24.04にDockerをインストールする方法を紹介します。

※参考：Windows＋WSL2でDocker環境を用意しよう

![Windows＋WSL2でDocker環境を用意しよう](https://www.kagoya.jp/howto/wp-content/uploads/202203b_catch-1.jpg)

Windows＋WSL2でDocker環境を用意しよう

[Windows＋WSL2でDocker環境を用意しよう](https://www.kagoya.jp/howto/cloud/container/wsl2_docker/)

Web開発の現場をはじめとして、Dockerが使われる機会が増えています。手軽に使えるDockerのテスト環境・開発環境を調達したい、と考えている方は多いでしょう。 Windowsでは「WSL2」の登場により、Docker環境を簡単に確保できるようになりました。この記事では、WSL2とは何かといった概要と、Windows＋WSL2でDocker環境を用意する方法について紹介します。 ※KAGOYA…

今回利用したDockerのインストール環境は以下の通りです。

| **サービス提供元** | カゴヤ・ジャパン |
| --- | --- |
| **プラン名** | [KAGOYA CLOUD VPS](https://www.kagoya.jp/vps/?argument=vqHX23Xs&dmai=a5fc24dd1276c2) |
| **CPU** | 2コア |
| **メモリー** | 2GB |
| **ストレージ** | NVMe SSD 200GB |
| **OSテンプレート** | Ubuntu24.04 |
| **料金** | 日額28円（税込）/月額770円（税込） |

まず、パッケージリストを更新・インストールします。

```
sudo apt update
sudo apt install -y ca-certificates curl gnupg
```

Dockerのソフトが安全なものであることを確認するためにDockerのGPGキーを追加します。

```
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

公式のDockerリポジトリを追加します。

```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

再度、パッケージリストを更新します。

```
sudo apt update
```

これでインストール準備が整いました。Dockerのインストールを行います。

```
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

この手順で、Dockerのインストールが完了しました。

### sudo権限なしでDockerを実行できるようにする手順

この状態では、sudo権限がないとDockerが使えません。sudo権限なしでDockerを実行できるようにするため、ユーザーをdockerグループに追加します。

```
sudo usermod -aG docker $USER
```

上記変更を反映させます。

```
su - ${USER}
```

その後、一度ログアウトして再ログインすると、sudoなしで docker コマンドが使えるようになります。

### インストールしたDockerの動作確認を行う手順

Dockerのインストールが正常に完了したか確認しましょう。以下コマンドでバージョンが表示されれば、Dockerが正常にインストールされたことを確認できます。

```
docker -v
```

Dockerが正常にインストールされている場合は、Dockerのバージョンが表示されます。

引き続き、以下コマンドで動作確認を行いましょう。

```
sudo docker run hello-world
```
![Dockerが正常にインストールされている時の表示](https://www.kagoya.jp/howto/wp-content/uploads/dockerinstallubuntu24.png)

Dockerが正常にインストールされている時の表示

正常にDockerがインストールで来ている場合は、上記のように「Hello from Docker!」からはじまる文章が表示されます。

## Dockerの主要コマンドを理解しよう！

### コマンドを使う前に知っておきたいDockerの基本知識

Dockerコマンドを使って操作する場合は、あらかじめDockerに関する基本的な知識が必要です。以下、Dockerの操作に必要となる基本的な事項をみていきましょう。

#### Dockerコンテナ

Dockerコンテナとは、Dockerによって構築されるアプリケーションの実行環境（仮想環境）のことです。Dockerコンテナは独立した環境として存在し、他のDockerコンテナやホストとなる環境に影響することはありません。

DockerコンテナはホストOSのカーネルを共有することから、従来の仮想化マシンと違いゲストOSを必要とせず、軽量で軽快な動作が可能です。Dockerでは専用コマンドでDockerコンテナを作成し、目的のアプリケーションを動作させます。

#### Dockerイメージ

Dockerイメージとは、Dockerコンテナの動作環境についてまとめたテンプレートファイルです。Dockerイメージには、Dockerコンテナに使われるアプリケーションから、アプリケーション実行用のコマンド、メタデータまで含まれます。

Dockerコンテナを作成するためには、Dockerイメージが必要です。静的なDockerイメージを専用コマンドで実行することで、Dockerコンテナが起動されアプリケーションの実行環境として使える状態になります。

![Dockerイメージの図解](https://www.kagoya.jp/howto/wp-content/uploads/771705034484f7b4a1011e890042244d.png)

Dockerイメージの図解

#### Dockerfile

Dockerfileは、Dockerイメージを作るための設計図にあたるテキストファイルです。Dockerfileには、Dockerコンテナの設計内容がコマンド形式でまとめられています。

Dockerfileを専用コマンドにて組み立てる（buildする）ことで、Dockerイメージが作成されるのです。そうしてDockerイメージを実行する（runする）ことによって、Dockerコンテナが作成されます。

![Dockerfileのイメージ図](https://www.kagoya.jp/howto/wp-content/uploads/dff24b52bb9b10e6041ac5cfa9d79e9c-1.png)

Dockerfileのイメージ図

#### Dockerレジストリ（Docker Hub）

Dockerレジストリとは、Dockerイメージを保存・共有する場所のことです。ユーザーはDockerレジストリ上にDockerイメージを保存したり、他ユーザーが作成したDockerイメージを取得して使ったりできます。

またDocker公式のDockerレジストリとして、よく使われているのが「Docker Hub」です。Docker Hubでは、様々なアプリケーションの公式Dockerイメージが公開されています。ユーザーはそれら公式イメージを利用することで、Docker上で簡単にアプリケーションの実行環境を構築できるのです。

### 目的別・基本コマンドのまとめ

Dockerの各コマンドは、Linux全体のルールに基づいて命名されているため理解しやすいでしょう。ここではDockerの基本的なコマンドを、目的別にみていきます。

なお以下記事では、より具体的な使用例と共にDockerでよく使うコマンドをまとめているので、興味があればあわせてご参照ください。

![【入門】よく使う「Docker コマンド」一覧まとめ](https://www.kagoya.jp/howto/wp-content/uploads/dockercommand_catch.jpg)

【入門】よく使う「Docker コマンド」一覧まとめ

[【入門】よく使う「Docker コマンド」一覧まとめ](https://www.kagoya.jp/howto/cloud/container/dockercommand/)

Dockerを利用する場合、非常に簡単なコマンドで様々な操作を行うことができます。各コマンドを、より便利に使えるオプションの数も少なくありません。その一方で、コマンドの種類が多いことから「どんなコマンドを使えばよいか」分からなくなることも多いでしょう。 この記事では、特によく使われるDockerコマンドを、簡単な使用例と一緒にまとめています。ここで紹介したコマンドだけでも、Dockerの基本的な操…

#### （1）コンテナ操作用

共通ルール:　docker container + コマンド名 + （コンテナ名など）

| 目的 | コマンド名 | 実行例 |
| --- | --- | --- |
| コンテナの起動 | start | docker container start （コンテナ名） |
| コンテナの停止（より安全な方法） | stop | docker container stop （コンテナ名） |
| コンテナの停止（強制的に停止する方法） | kill | docker container kill （コンテナ名） |
| コンテナの削除 | rm | docker container rm （コンテナ名） |
| コンテナの再起動 | restart | docker container restart （コンテナ名） |
| コンテナの一覧を表示 | ls | docker container ls -a \[注\] |
| Dockerイメージからコンテナを生成 | run | docker container run （イメージ名） |

\[注\] 「-a」とは全て（all）を意味し、この場合は起動中だけでなく停止中のコンテナも一覧表示する指示内容です。

#### （2）Dockerイメージの管理/Dockerレジストリ（Docker hub）の利用

共通ルール:　docker image + コマンド名 + （イメージ名など）

| 目的 | コマンド名 | 実行例 |
| --- | --- | --- |
| Dockerイメージ（最新版）を   「Docker Hub」からダウンロード | pull | docker image pull （イメージ名） |
| Dockerイメージの一覧を表示 | ls | docker image ls |
| Dockerイメージの削除 | rm | docker image rm （イメージ名） |
| Dockerイメージを   「Docker Hub」へアップロード | push | docker image push （イメージ名） |

#### （3）DockerfileからDockerイメージの作成

Dockerfileをもとに、Dockerイメージを作成（build）する際のコマンドは以下の通りです。

```
docker image build [オプション] Dockerfileのパス
```

Dockerfileはテキストファイルなので、以下の通りviエディタ※で作成できます。

```
vi Dockerfile
```

**※vi エディタの使い方**  
キーボードの「i」キーで編集できる入力モードになります。矢印キーで編集したい箇所にカーソルを移動して編集していきます。編集が完了したら「Esc」キーで入力モードを終了し、「:wq」入力し「Enter」キーで編集内容を保存できます。

Dockerfileの書式例は以下の通りです。

```
FROM centos
RUN yum -y install httpd
EXPOSE 80
CMD [ここにコマンドを記述する]
```

各項目の意味は以下の通りです。

| 目的 | 命令   **（instruction）** | 実行例 |
| --- | --- | --- |
| Dockerイメージの指定 | FROM | FROM centos など |
| 実行内容の指定 | RUN | RUN yum -y install httpd など |
| docker run 時に実行するコマンドの指定 | CMD | CMD \[ここにコマンドを記述する\] |
| 公開するポートの指定 | EXPOSE | EXPOSE 80 など |

その他、詳細な情報については以下公式リファレンスが参考になります。

【参考情報】 [Dockerfile リファレンス（公式）](http://docs.docker.jp/engine/reference/builder.html)

#### （4）その他、役立つコマンド

| 目的 | コマンド名 | 実行例 |
| --- | --- | --- |
| Dockerのバージョンを表示 | version | docker version |
| Dockerイメージの検索 | search | docker search （イメージ名） |

## まとめ

Dockerとは従来の仮想化技術より軽快に動作する、コンテナ型仮想環境用のプラットフォームです。昨今ではさまざまな開発環境でDockerが利用されています。

Dockerを使えば、1台のサーバー上に複数のアプリケーション実行環境（開発環境）を構築可能です。開発環境の共有や移転が簡単になるのも、Dockerを使うメリットです。Windows＋Linuxのように、複数OSでアプリケーションの動作を確認したり共有したりする際も、Dockerの利用が適しています。