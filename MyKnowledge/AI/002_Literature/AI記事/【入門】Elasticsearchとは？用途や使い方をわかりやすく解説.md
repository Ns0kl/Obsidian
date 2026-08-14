---
title: "【入門】Elasticsearchとは？用途や使い方をわかりやすく解説"
source: "https://hogetech.info/bigdata/elasticsearch"
author:
  - "[[ほげほげテクノロジー - IT 技術学習サイト]]"
published: 2020-11-22
created: 2026-08-11
description: "Elasticsearch とは、検索エンジンです。商品検索などで使われるこの OSS について、本記事では用語や使い方をわかりやすく解説します。"
tags:
  - "clippings"
---
Elasticsearch

**Elasticsearch** とは、 [データ](#) を検索する [検索エンジン](#) です。

検索エンジン

![](https://hogetech.info/wp-content/uploads/2024/08/612f43071a2a0f44423b8bcb86c93e1a-5.png)

以下のように **ウェブサイトの商品検索** や、 **[github のソースコード検索](https://www.elastic.co/jp/customers/github)** のような検索ができます。

| 企業 | 事例 |
| --- | --- |
| ZOZOTOWN | [商品検索](https://techblog.zozo.com/entry/migrating-zozotown-search-platform) |
| GitHub, Inc. | [ソースコード検索](https://www.elastic.co/jp/customers/github) |
| 日経新聞 | [記事検索、アクセスログ検索](https://www.elastic.co/jp/customers/nikkei-1) |
| RICOH | [異常検知](https://www.elastic.co/jp/customers/ricoh) |
| Netflix | [ログイベントの検索、デプロイのトラッキング](https://www.slideshare.net/g9yuayon/elasticsearch-in-netflix) |

また、Elasticsearch 用の可視化 [ソフトウェア](https://hogetech.info/linux/kernel/what-is-the-kernel#software "ソフトウェア") である Kibana でデータの可視化もできます。

![](https://hogetech.info/wp-content/uploads/2020/11/reporting_no_zoom-optimized.gif)

[https://www.elastic.co/jp/what-is/kibana-reporting](https://www.elastic.co/jp/what-is/kibana-reporting)

<table><thead><tr><th colspan="5">Elasticsearch & OpenSearch の使い方</th></tr></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td><p><a href="https://hogetech.info/database/vector"><img src="https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-3.png"><br>ベクトル検索</a></p></td><td></td><td></td><td></td><td></td></tr></tbody></table>

<table><thead><tr><th colspan="6">学習ロードマップ</th></tr></thead><tbody><tr><td></td><td><p><a href="https://hogetech.info/network"><img src="https://hogetech.info/wp-content/uploads/2024/10/7bbefb8f231d232d8ec6a01c33469eec-1.png"><br>ネットワーク</a></p></td><td><p><a href="https://hogetech.info/database"><img src="https://hogetech.info/wp-content/uploads/2024/10/b992e3e93fc582dfe739dc9235fa101c-1.png"><br>データベース</a></p></td><td></td><td></td><td><p><a href="https://hogetech.info/security"><img src="https://hogetech.info/wp-content/uploads/2024/10/479089b78010423b5702baaaa414bf52.png"><br>セキュリティ</a></p></td></tr></tbody></table>

## 検索の種類

データを検索する方法は、主に「全文検索」と「 [セマンティック検索](https://hogetech.info/database/elasticsearch#semantic "セマンティック検索") 」があります。

| 検索の種類 | 説明 | 実現する手段 |
| --- | --- | --- |
| 全文検索 | キーワードで検索 | ・ [grep](https://hogetech.info/linux/system/basic#grep "grep") 型   ・索引 ([インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説")) 型 ※Elasticsearch はこちら |
| [セマンティック検索](https://hogetech.info/database/elasticsearch#semantic "セマンティック検索") | 文脈で検索 | [ベクトル検索](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") |

### 全文検索とは

![](https://hogetech.info/wp-content/uploads/2024/08/612f43071a2a0f44423b8bcb86c93e1a-5.png)

全文検索を実現する方法として、主に次の2種類が存在します。

検索エンジン

- [grep](https://hogetech.info/linux/system/basic#grep "grep") 型
- 索引 ([インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説")) 型

UNIX の [grep](https://hogetech.info/linux/system/basic#grep "grep") コマンドは、こちらに相当します。

![](https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-6.png)

[grep](https://hogetech.info/linux/system/basic#grep "grep") 型は、 [ファイル](https://hogetech.info/linux/kernel/storage#storage_file "ファイル") の数が増えると検索速度が大幅に低下する特徴があります。

Elasticsearch の全文検索は、こちらに相当します。

![](https://hogetech.info/wp-content/uploads/2024/10/deb17bd5bd307fcd49379fd7617489d9-2.png)

索引型は、不要な [ファイル](https://hogetech.info/linux/kernel/storage#storage_file "ファイル") をスキャンしないので、高速に検索できます。  
※索引 ([転置インデックス](https://hogetech.info/bigdata/elasticsearch-analyzer "Elasticsearch で日本語検索と Analyzer (kuromoji) の設定")) の作成方法は ([こちら１](https://hogetech.info/database/elasticsearch-analyzer) もしくは [こちら２](https://ja.wikipedia.org/wiki/%E8%BB%A2%E7%BD%AE%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9))

### セマンティック検索とは

例えば、「東京スカイツリー　観光」と検索すると、近場のランチの場所もヒットします。

![](https://hogetech.info/wp-content/uploads/2024/08/deb17bd5bd307fcd49379fd7617489d9-7.png)

[セマンティック検索](https://hogetech.info/database/elasticsearch#semantic "セマンティック検索") の実現方法の１つが [ベクトル検索](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") です。

[ベクトルデータベース](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") を利用した [ベクトル検索](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説") の詳細は、以下の記事をご覧ください。

![](https://hogetech.info/wp-content/uploads/2024/08/b5d634c30847f11a291ecf8d95ac5150-1.png)

## Elasticsearch のアーキテクチャ

Elasticsearch では、 [データ](#) を以下のように JSON 形式で持ちます。

![](https://hogetech.info/wp-content/uploads/2024/08/180f7c81f390ed5436611bf6b95e482c-1-e1724761627274.png)

データの型以外にも、色んなパラメータを設定できます ( マッピングパラメータ一覧 )

### Elasticsearch の用語

Elasticsearch は、ドキュメントを以下のように配置します。

![](https://hogetech.info/wp-content/uploads/2024/08/1802783db20269aba22a3ea93b92cabe-6.png)

[ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") には、主に次の４種類が存在します。

| [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") の種類 | 役割 |
| --- | --- |
| マスター [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") | [クラスター](https://hogetech.info/database/cluster "HA/HPC クラスターとは？シャーディング方法を解説") のメタデータなどを管理する [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス")   ・マスター [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") は [クラスター](https://hogetech.info/database/cluster "HA/HPC クラスターとは？シャーディング方法を解説") に 1 台のみ   ・それ以外は、マスター候補 [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") と呼ぶ   ・マスター候補 [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") が昇格するとマスター [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") になる |
| データ [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") | データを格納・リクエストの処理 (検索や集計などを) する [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") |
| Ingest [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") | データの変換や加工をして、データ [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") に格納する [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") |
| Coordinating [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") | リクエストを適切なデータ [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") ※にルーティングする [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") |

※正確には、データ [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") の持つ [シャード](https://hogetech.info/database/cluster#shard "シャード")  
１つの [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") に複数の役割を割り当てることも可能。 [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") の役割一覧は [こちら](https://opensearch.org/docs/latest/tuning-your-cluster/#nodes)  
最初はデータ [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") で全ての役割兼任し、スペックが足りなくなった時点で専属の役割を持つ [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") を追加すると良い

一般的に、 [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") はログの種類や、日/週/月ごとに分けます。

[シャード](https://hogetech.info/database/cluster#shard "シャード") の種類には、以下の２種類が存在します。

| [シャード](https://hogetech.info/database/cluster#shard "シャード") の種類 | 説明 |
| --- | --- |
| プライマリー [シャード](https://hogetech.info/database/cluster#shard "シャード") | 読み書きを行う [シャード](https://hogetech.info/database/cluster#shard "シャード") |
| レプリカ [シャード](https://hogetech.info/database/cluster#shard "シャード") | プライマリー [シャード](https://hogetech.info/database/cluster#shard "シャード") のコピー ([レプリケーション](https://hogetech.info/database/replication "【DB】レプリケーションの意味とは？バックアップとの違いも解説"))   読み取りの負荷分散や、 [データ](#) の [バックアップ](https://hogetech.info/database/design/backup "バックアップ/リストア/ポイントインタイムリカバリ(PITR)の解説") として利用 |

### Elasticsearch の実体

Elasticsearch は、Apache Lucene がベースとなっており、実体は以下のとおりです。

- Elasticsearch の [シャード](https://hogetech.info/database/cluster#shard "シャード") は、Lucene [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") に相当
- Lucene [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") は、複数のセグメント ([ファイル](https://hogetech.info/linux/kernel/storage#storage_file "ファイル")) から構成される
- セグメントは、複数のドキュメントを持つ
![](https://hogetech.info/wp-content/uploads/2024/08/df292ad6b3fa1d41cf98b96a04be1b8e-3.png)

[https://thoughts.t37.net/designing-the-perfect-elasticsearch-cluster-the-almost-definitive-guide-e614eabc1a87](https://thoughts.t37.net/designing-the-perfect-elasticsearch-cluster-the-almost-definitive-guide-e614eabc1a87) より。一部改変

## Elasticsearch のインストール

[Docker](https://hogetech.info/container/docker "Docker") を使った Elasticsearch のインストール方法を紹介します。

[Docker](https://hogetech.info/container/docker "Docker") を使わないインストール方法はこちら

ここでは Amazon Linux 2 でインストールする方法を紹介します。

その他の [OS](https://hogetech.info/linux/kernel/what-is-the-kernel "os") については以下のドキュメントをご覧ください。

■Elasticsearch のインストール

[

![](https://www.elastic.co/static-res/images/social_media_default.png)

](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html "Deploy an Elasticsearch cluster | Elastic Docs")

Kibana のインストール

[

![](https://static-www.elastic.co/v3/assets/bltefdd0b53724fa2ce/blt280217a63b82a734/6202d3378b1f312528798412/elastic-logo.svg)

](https://www.elastic.co/guide/jp/kibana/current/install.html "Kibanaのインストール | Kibanaユーザーガイド [5.4] | Elastic")

Java のインストール

Elasticsearch を実行するには Java 8 が必要なので、まずは Java 8 をインストールします。

sudo [yum](https://hogetech.info/linux/system/yum "Linux dnf/yum パッケージマネージャー/パッケージ管理システム") install java-1.8.0-openjdk -y

sudo [yum](https://hogetech.info/linux/system/yum "Linux dnf/yum パッケージマネージャー/パッケージ管理システム") install java-1.8.0-openjdk-devel -y

java -version

```
openjdk version "1.8.0_252"
OpenJDK Runtime Environment (build 1.8.0_252-b09)
OpenJDK 64-Bit Server VM (build 25.252-b09, mixed mode)
```

openjdk version "1.8\*\*\*\*" 以上であれば OK です。

Elasticsearch のインストール

次に Elasticsearch をインストールします。

sudo rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch

sudo vim /etc/ [yum](https://hogetech.info/linux/system/yum "Linux dnf/yum パッケージマネージャー/パッケージ管理システム").repos.d/elasticsearch.repo

```
[elasticsearch]
name=Elasticsearch repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=0
autorefresh=1
type=rpm-md
```

sudo [yum](https://hogetech.info/linux/system/yum "Linux dnf/yum パッケージマネージャー/パッケージ管理システム") install --enablerepo=elasticsearch elasticsearch -y

sudo [systemctl](https://hogetech.info/linux/system/systemd#systemctl "systemctl") start elasticsearch

[curl](https://hogetech.info/linux/command/curl "【入門】curl コマンドとは？よく使うオプション一覧と使い方") local [host](https://hogetech.info/network/osi/layer3#host "ホスト"):9200

```json
{
  "name" : "***",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "***",
  "version" : {
    "number" : "7.10.0",
    "build_flavor" : "default",
    "build_type" : "rpm",
    "build_hash" : "***",
    "build_date" : "2020-11-09T21:30:33.964949Z",
    "build_snapshot" : false,
    "lucene_version" : "8.7.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

Kibana のインストール

Kibana をインストールします。

sudo vim /etc/ [yum](https://hogetech.info/linux/system/yum "Linux dnf/yum パッケージマネージャー/パッケージ管理システム").repos.d/kibana.repo

```
[kibana-7.x]
name=Kibana repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```

sudo [yum](https://hogetech.info/linux/system/yum "Linux dnf/yum パッケージマネージャー/パッケージ管理システム") install kibana -y

sudo vim /etc/kibana/kibana.yml

server.[host](https://hogetech.info/network/osi/layer3#host "ホスト"): "0.0.0.0"

sudo [systemctl](https://hogetech.info/linux/system/systemd#systemctl "systemctl") start kibana

ブラウザから Kibana([localhost:5601](https://hogetech.info/bigdata/5601)) にアクセスします。

以下の [ページ](https://hogetech.info/linux/kernel/memory#page "ページ") が表示されれば成功です。（この記事は Kibana バージョン 7.10.0です）

![](https://hogetech.info/wp-content/uploads/2021/05/8f33a5eb8dfe40a071c55d6fee4f25b3.png)

アクセスできない場合

[

![](https://szkhaven.com/wp-content/uploads/2019/03/img_5c7bef548b7cc.png)

](https://szkhaven.com/2019/08/13/kibanats0813/ "Elastic Kibana v7.3.0でSystemctrlを用いた起動ができず再起動を繰り返す。")

### docker コンテナを作成

vim [docker-compose](https://hogetech.info/container/docker#docker_compose "docker-compose").yml

```yaml
version: '3'
services:
  elasticsearch:
    image: elasticsearch:7.12.1
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
    ports:
      - 9200:9200
  kibana:
    image: kibana:7.12.1
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
```

[docker-compose](https://hogetech.info/container/docker#docker_compose "docker-compose") up -d

これでシングル [ノード](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") の Elasticsearch コンテナが立ち上がります。

### Elasticsearch にアクセス

[curl](https://hogetech.info/linux/command/curl "【入門】curl コマンドとは？よく使うオプション一覧と使い方") local [host](https://hogetech.info/network/osi/layer3#host "ホスト"):9200

```json
{
  "name" : "123456789abc",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "1234567890abcdefghijkl",
  "version" : {
    "number" : "7.12.1",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "1234567891456789123456789",
    "build_date" : "2021-04-20T20:56:39.040728659Z",
    "build_snapshot" : false,
    "lucene_version" : "8.8.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

起動に成功している場合は、上記のような結果が返ってきます。

※ 「 [curl](https://hogetech.info/linux/command/curl "【入門】curl コマンドとは？よく使うオプション一覧と使い方"): (56) Recv failure: Connection reset by peer」が返ってくる場合は初期化処理が完了するまでお待ちください。

### Kibana にアクセス

Kibana コンテナにアクセスするために、ブラウザで [http://localhost:5601](http://localhost:5601/) を開きます。

![](https://hogetech.info/wp-content/uploads/2021/05/8f33a5eb8dfe40a071c55d6fee4f25b3.png)

Kibana は、Dev Tools を使うことで、 [REST API](https://hogetech.info/network/restapi "REST API") 経由で Elasticsearch を操作できます。

![](https://hogetech.info/wp-content/uploads/2020/11/ada12c35bf4664c24656ba341c00cc43-2048x1021.png)

Dev Tools の開き方（kibana 7.10.0 の場合）

以降では、Dev Tools で [REST API](https://hogetech.info/network/restapi "REST API") を実行し、Elasticsearch を操作する方法を解説します。

## REST API の使い方 (操作方法)

Elasticsearch は [REST API](https://hogetech.info/network/restapi "REST API") を利用してデータを操作します。

### CRUD 操作

まずは、基本操作である [CRUD](https://hogetech.info/database/sql#crud "CRUD") 操作 (読み書き更新削除) を紹介します。

| [REST API](https://hogetech.info/network/restapi "REST API") | 説明 | 対応する [CRUD](https://hogetech.info/database/sql#crud "CRUD") |
| --- | --- | --- |
| [Index API](#create) | [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") にドキュメントを追加 | Create |
| [Get API](#read) | [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") のドキュメントを取得 | Read |
| [Index API](#create)   [Update API](#update) | [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") のドキュメントを更新 | Update |
| [Delete API](#delete) | [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") のドキュメントを削除 | Delete |

```coffeescript
PUT /<インデックス名>/_doc/<ドキュメント ID>
{
 "フィールドのキー":"フィールドの値"
}
```

```bash
PUT /test/_doc/1
{
  "date":"2020-11-01T12:10:30+0900",
  "Tweet":"ツイッターをはじめました。",
  "User ID":"hoge"
}
```

![](https://hogetech.info/wp-content/uploads/2022/10/4e3fa1d3d3019a9f8dd837d007df2720.png)

右上の三角ボタンで実行します。

[curl](https://hogetech.info/linux/command/curl "【入門】curl コマンドとは？よく使うオプション一覧と使い方") で [REST API](https://hogetech.info/network/restapi "REST API") を実行する場合

[curl](https://hogetech.info/linux/command/curl "【入門】curl コマンドとは？よく使うオプション一覧と使い方") local [host](https://hogetech.info/network/osi/layer3#host "ホスト"):9200/test/\_doc/1?pretty -XPUT -H "Content-Type: application/json" -d '

```python
{
  "date":"2020-11-01T12:10:30+0900",
  "Tweet":"ツイッターをはじめました。",
  "User ID":"hoge"
}'
```

補足　データストリームへドキュメントを追加する場合

データストリームとは、複数の [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") を１つにまとめたものです。

データストリームの詳細は以下のドキュメントに記載がございます。

[

![](https://www.elastic.co/static-res/images/social_media_default.png)

](https://www.elastic.co/guide/en/elasticsearch/reference/current/data-streams.html "Data streams | Elastic Docs")

データストリームにドキュメントを追加するためには、以下の [REST API](https://hogetech.info/network/restapi "REST API") を利用します。

```python
PUT /tweet/_create/1
{
  "date":"2020-11-01T12:10:30+0900",
  "Tweet":"ツイッターをはじめました。",
  "User ID":"hoge"
}
```

```xml
GET /<インデックス名>/_doc/<ドキュメントID>
```

GET /test/\_doc/1

```python
{
  (中略)
  "_source" : {
    "date" : "2020-11-01T12:10:30+0900",
    "Tweet" : "ツイッターをはじめました。",
    "User ID" : "hoge"
  }
}
```

[curl](https://hogetech.info/linux/command/curl "【入門】curl コマンドとは？よく使うオプション一覧と使い方") で [REST API](https://hogetech.info/network/restapi "REST API") を実行する場合

```python
{
  (中略)
  "_source" : {
    "date" : "2020-11-01T12:10:30+0900",
    "Tweet" : "ツイッターをはじめました。",
    "User ID" : "hoge"
  }
}
```

なお、 [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") 作成で利用した [Index API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html) でも更新可能です。

|  | Update API | Index API |
| --- | --- | --- |
| 説明 | スクリプトでフィールドを上書き | 既にドキュメントがある場合は上書き |
| 用途 | 一部のフィールドだけ更新したい時   更新処理を自分で書きたい時 | ドキュメントを上書きしたい時 |

##### 一部のフィールドを更新

```coffeescript
POST /<インデックス名>/_update/<ドキュメント ID>
{
  "doc": {
    "更新するフィールドのキー":"値"
  }
}
```

具体的な使用例は、以下のとおりです。

```bash
POST /test/_update/1
{
  "doc": {
    "Tweet":"フィールドを更新したよ。"
  }
}
```

GET /test/\_doc/1

```python
"_version" : 2
"_source" : {
  "date" : "2020-11-01T12:10:30+0900",
  "Tweet" : "フィールドを更新したよ。",
  "User ID" : "hoge"
}
```

"Tweet" フィールドの値が更新され、\_version が 2 に変化していることがわかります。

##### 全てのフィールドを更新 (ドキュメントの上書き)

```coffeescript
PUT /<インデックス名>/_doc/<ドキュメント ID>
{
 "フィールドのキー":"フィールドの値"
}
```

具体的な使用例は、以下のとおりです。

```bash
PUT /test/_doc/1
{
  "Tweet":"ドキュメントを置き換えたよ"
}
```

GET /test/\_doc/1

```python
"_version" : 3,
"_source" : {
  "Tweet" : "ドキュメントを置き換えたよ"
}
```

以下の３つが確認できます。

- Tweet フィールドが上書き
- date, User ID フィールドが消える (上書きしたドキュメントに存在しないので)
- \_version が 3 に変化

[curl](https://hogetech.info/linux/command/curl "【入門】curl コマンドとは？よく使うオプション一覧と使い方") で [REST API](https://hogetech.info/network/restapi "REST API") を実行する場合

[curl](https://hogetech.info/linux/command/curl "【入門】curl コマンドとは？よく使うオプション一覧と使い方") local [host](https://hogetech.info/network/osi/layer3#host "ホスト"):9200/test/\_doc/1?pretty -XPOST -H "Content-Type: application/json" -d '

```python
{
  "date":"2020-11-01T12:10:30+0900",
  "Tweet":"ドキュメントを更新したよ。",
  "User ID":"hoge"
}'
```

```python
{
(中略)
  "_version" : 2,
  "_source" : {
    "date" : "2020/11/01 09:00 JST",
    "Tweet" : "ドキュメントを更新したよ。",
    "User ID" : "hoge"
  }
```

"Tweet" フィールドの値が更新され、\_version が２に変化していることがわかります。

POST \<index>/\_update/<\_id> を使う場合

```bash
POST /test/_update/1
{
  "doc": {
    "Tweet":"ドキュメントを一部更新したよ。"
  }
}
```

```python
{
(中略)
  "_source" : {
    "date" : "2020-11-01T12:10:30+0900",
    "Tweet" : "ドキュメントを一部更新したよ。",
    "User ID" : "hoge"
  }
```

```sql
DELETE /<インデックス名>/_doc/<ドキュメント ID>
```

DELETE /test/\_doc/1

GET /test/\_doc/1

```json
{
  "_index" : "test",
  "_type" : "_doc",
  "_id" : "1",
  "found" : false
}
```

found" が false となりました。("\_source" のフィールドが削除されました。)

[curl](https://hogetech.info/linux/command/curl "【入門】curl コマンドとは？よく使うオプション一覧と使い方") で [REST API](https://hogetech.info/network/restapi "REST API") を実行する場合

```json
{
  "_index" : "test",
  "_type" : "_doc",
  "_id" : "1",
  "found" : false
}
```

"found" が false となりました。("\_source" のフィールドが削除されました。)

```python
POST /_bulk
{ "アクション名" : { "_index" : "インデックス名", "_id" : "ドキュメント ID" } }
{ "アクション名" : { "_index" : "インデックス名", "_id" : "ドキュメント ID" } }
```

Bulk API では、1回のリクエストで今まで紹介した [CRUD](https://hogetech.info/database/sql#crud "CRUD") 処理を複数回実行できます。

```python
POST /_bulk
{ "index" : { "_index" : "test", "_id" : "1" } }
{ "フィールド名" : "フィールドの値を置き換え" }
{ "delete" : { "_index" : "test", "_id" : "2" } }
{ "create" : { "_index" : "test", "_id" : "3" } }
{ "フィールド名" : "フィールドの値を作成" }
{ "update" : { "_index" : "test", "_id" : "3" } }
{ "doc" : {"フィールドのキー" : "フィールドの値を更新"} }
```

| アクション名 | 説明 | クエリの 2 行目 |
| --- | --- | --- |
| Create | [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") が存在しない場合、ドキュメントを作成 | フィールド名が必要 |
| Index | [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") のドキュメントを全て更新 (置き換え) | フィールド名が必要 |
| Update | [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") のドキュメントを一部更新 | doc が必要 |
| Delete | [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") のドキュメントを削除 | 不要 |

```
GET /test/_search
```

```python
{
  "_index": "test",
  "_id": "3",
  "_score": 1,
  "_source": {
    "フィールドのキー": "フィールドの値を更新"
  }
},
{
  "_index": "test",
  "_id": "1",
  "_score": 1,
  "_source": {
    "フィールドのキー": "フィールドの値を置き換え"
  }
}
```

なお、GET test/\_search の意味は、この下で解説します。

[curl](https://hogetech.info/linux/command/curl "【入門】curl コマンドとは？よく使うオプション一覧と使い方") で [REST API](https://hogetech.info/network/restapi "REST API") を実行する場合

Bulk API で操作する内容を記載した json [ファイル](https://hogetech.info/linux/kernel/storage#storage_file "ファイル") を作成します。

```json
{ "index" : { "_index" : "test", "_id" : "1" } }
{ "field1" : "value1" }
{ "delete" : { "_index" : "test", "_id" : "2" } }
{ "create" : { "_index" : "test", "_id" : "3" } }
{ "field1" : "value3" }
{ "update" : {"_id" : "1", "_index" : "test"} }
{ "doc" : {"field2" : "value2"} }
```

[curl](https://hogetech.info/linux/command/curl "【入門】curl コマンドとは？よく使うオプション一覧と使い方") local [host](https://hogetech.info/network/osi/layer3#host "ホスト"):9200/\_bulk?pretty -XPOST --data-binary @bulk.json -H "Content-Type: application/json"

### 検索クエリ

Elasticsearch では、search API を利用して [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") にあるドキュメントを検索します。

search API でよく利用するクエリグループは、次の 4 つです。

| クエリグループ | クエリ | 説明 |
| --- | --- | --- |
| [Full text](https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html) | [match](#match), [match\_phrase](#match-phrase) | 全文検索。([転置インデックス](https://hogetech.info/bigdata/elasticsearch-analyzer "Elasticsearch で日本語検索と Analyzer (kuromoji) の設定") で検索) |
| [Term-level](https://www.elastic.co/guide/en/elasticsearch/reference/current/term-level-queries.html) | [term](#term), [terms](#terms), [wildcard](#wildcard), [range](#range) | 完全一致検索 ([転置インデックス](https://hogetech.info/bigdata/elasticsearch-analyzer "Elasticsearch で日本語検索と Analyzer (kuromoji) の設定") は使わない) |
| [Compound](https://www.elastic.co/guide/en/elasticsearch/reference/current/compound-queries.html) | [bool](#bool) | 複合検索 (他のクエリを組み合わせる) |
| [Vector](https://www.elastic.co/guide/en/elasticsearch/reference/current/vector-queries.html) | [knn](https://hogetech.info/database/vector#knn-index) ([こちらの記事](https://hogetech.info/database/vector#knn-index) で解説) | [セマンティック検索](https://hogetech.info/database/elasticsearch#semantic "セマンティック検索") ([ベクトル検索](https://hogetech.info/database/vector "ベクトルデータベースの作り方や使い方、仕組みをわかりやすく解説")) |

クエリ一覧は [こちら](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) (左側にある Query DSL)。

今回は、以下の [データ](#) を使用して、search API を解説します。

```python
POST /_bulk
{ "index" : { "_index" : "demo_search", "_id" : "1" } }
{ "text" : "This is Elasticsearch test.", "num" : 1 }
{ "index" : { "_index" : "demo_search", "_id" : "2" } }
{ "text" : "Elasticsearch is search engine.", "num" : 2 }
{ "index" : { "_index" : "demo_search", "_id" : "3" } }
{ "text" : "This is a pen.", "num" : 3 }
```

#### クエリなし (条件なし検索)

まずは、検索条件を指定せずに search API でドキュメントを検索してみます。

GET /demo\_search/\_search

```python
"hits" : [
  {
    "_index" : "demo_search",
    "_type" : "_doc",
    "_id" : "1",
    "_score" : 1.0,
    "_source" : {
      "text" : "This is Elasticsearch test.",
      "num" : 1
    }
  },
  {
    "_index" : "demo_search",
    "_type" : "_doc",
    "_id" : "2",
    "_score" : 1.0,
    "_source" : {
      "text" : "Elasticsearch is search engine.",
      "num" : 2
    }
  },
  {
    "_index" : "demo_search",
    "_type" : "_doc",
    "_id" : "3",
    "_score" : 1.0,
    "_source" : {
      "text" : "This is a pen.",
      "num" : 3
    }
  }
]
```

作成した３つのドキュメントがすべて検索できています。

#### Full text (全文検索)

Full text クエリは、 [転置インデックス](https://hogetech.info/bigdata/elasticsearch-analyzer "Elasticsearch で日本語検索と Analyzer (kuromoji) の設定") で全文検索を行います。

そのため、検索するフィールドには、 [転置インデックス](https://hogetech.info/bigdata/elasticsearch-analyzer "Elasticsearch で日本語検索と Analyzer (kuromoji) の設定") を利用可能な [text 型](https://www.elastic.co/guide/en/elasticsearch/reference/current/text.html) を主に使います。

Full text クエリとして、match と match\_phrase クエリを紹介します。

```python
GET /demo_search/_search
{
  "query":{
    "match": {
      "text" : "engine"
    } 
  }
}
```

```python
(中略)
        "_source": {
          "text": "Elasticsearch is search engine."
```

「engine」を含むドキュメントが検索できました。

また、match クエリでは、AND 検索や OR 検索もできます。

```python
GET /demo_search/_search
{
  "query":{
    "match": {
      "text": {
        "query": "Elasticsearch engine",
        "operator":"AND" 
      }
    } 
  }
}
```

```python
(中略)
        "_source" : {
          "text" : "Elasticsearch is search engine."
```

\[Elasticsearch\] と \[engine\] の両方を含むドキュメントが検索できました。

```python
GET /demo_search/_search
{
  "query":{
    "match_phrase": {
      "text": "Elasticsearch test"
    } 
  }
}
```

```python
"hits" : [
    (省略)
    "_source" : {
      "text" : "This is Elasticsearch test."
    }
  }
```

語順が「Elasticsearch test」であるドキュメントを検索できました。

クエリの語順が一致しない場合

```python
GET /demo_search/_search
{
  "query":{
    "match_phrase": {
      "text":{
        "query": "test Elasticsearch"
      }
    } 
  }
}
```

```python
"hits" : [ ]
```

語順が違うのでヒットしないことが確認できます。

#### Term-level (完全一致検索)

Term-level クエリは、完全一致検索を行います。

そのため、 [転置インデックス](https://hogetech.info/bigdata/elasticsearch-analyzer "Elasticsearch で日本語検索と Analyzer (kuromoji) の設定") ではなく、そのまま内容を格納した [keyword 型](https://www.elastic.co/guide/en/elasticsearch/reference/current/keyword.html) を主に使います。

Term-level クエリとして、term, terms, wildcard, range クエリを紹介します。

```python
GET /demo_search/_search
{
  "query":{
    "term": {
      "text.keyword": "This is Elasticsearch test."
    } 
  }
}
```

```python
"_source" : {
  "text" : "This is Elasticsearch test."
```

完全一致しているドキュメントが検索できました。

match クエリとの違い

term は完全一致検索なので、単語一致で検索できません。(match を使ってください。)

```python
GET /demo_search/_search
{
  "query":{
    "term": {
      "text.keyword": "Elasticsearch"
    } 
  }
}
```

```python
"hits" : [ ]
```

"Elasticsearch" は "This is Elasticsearch test." と完全一致でないので検索にヒットしない。

単語検索をしたい場合は、match クエリを利用しましょう。

```python
GET /demo_search/_search
{
  "query":{
    "match": {
      "text": "Elasticsearch"
    } 
  }
}
```

```python
{
  "_index": "demo_search",
  "_id": "2",
  "_score": 0.2876821,
  "_source": {
    "text": "Elasticsearch is search engine.",
    "num": 2
  }
},
{
  "_index": "demo_search",
  "_id": "1",
  "_score": 0.2876821,
  "_source": {
    "text": "This is Elasticsearch test.",
    "num": 1
  }
}
```

```python
GET /demo_search/_search
{
  "query":{
    "terms": {
      "text.keyword":["This is Elasticsearch test.","This is a pen."]
    } 
  }
}
```

```python
"_source" : {
          "text" : "This is Elasticsearch test."
        }
        (中略)
        "_source" : {
          "text" : "This is a pen."
        }
```

```python
GET /demo_search/_search
{
  "query":{
    "wildcard": {
      "text" : "eng*"
    } 
  }
}
```

```python
"_source": {
  "text": "Elasticsearch is search engine.",
  "num": 2
}
```

```python
GET /demo_search/_search
{
  "query":{
    "range": {
      "num":{
        "gte": "1",
        "lte": "2"
      }
    } 
  }
}
```

```python
"hits" : [
  {
    "_index" : "demo_search",
    "_type" : "_doc",
    "_id" : "1",
    "_score" : 1.0,
    "_source" : {
      "text" : "This is Elasticsearch test.",
      "num" : 1
    }
  },
  {
    "_index" : "demo_search",
    "_type" : "_doc",
    "_id" : "2",
    "_score" : 1.0,
    "_source" : {
      "text" : "Elasticsearch is search engine.",
      "num" : 2
    }
  }
```

num フィールドの値が１以上、２以下のドキュメントを検索できました。

#### Compound (複合検索)

Compound クエリは、今まで紹介したような他のクエリを組み合わせることができます。

Compound クエリとして、bool クエリを紹介します。

bool クエリには、以下の４種類のクエリが存在します。

| bool クエリの種類 | 説明 |
| --- | --- |
| [must クエリ](#must) | AND 条件 |
| [should クエリ](#should) | OR 条件 |
| [must\_not クエリ](#must_not) | NOT 条件 |
| [filter クエリ](#filter) | フィルタリング |

```python
GET /demo_search/_search
{
  "query":{
    "bool": {
      "must":[
        {"match":{"text":"Elasticsearch"}},
        {"range":{"num":{"lte":"1"}}}
      ]
    } 
  }
}
```

```python
"_source" : {
  "text" : "This is Elasticsearch test.",
  "num" : 1
}
```

「text = "Elasticsearch" を含む」AND「num = 1以下」のドキュメントを検索できています。

```python
GET /demo_search/_search
{
  "query":{
    "bool": {
      "should":[
        {"match":{"text":"engine"}},
        {"range":{"num":{"gte":"2"}}}
      ]
    } 
  }
}
```

```python
{
  "_index": "demo_search",
  "_id": "2",
  "_score": 1.287682,
  "_source": {
    "text": "Elasticsearch is search engine.",
    "num": 2
  }
},
{
  "_index": "demo_search",
  "_id": "3",
  "_score": 1,
  "_source": {
    "text": "This is a pen.",
    "num": 3
  }
}
```

「text = "engine" を含む」OR「num = 2以上」のドキュメントを検索できています。

なお、両方の条件を満たすドキュメントのほうが "\_score" の値が高くなります。

```python
GET /demo_search/_search
{
  "query":{
    "bool": {
      "must_not":[
        {"match":{"text":"Elasticsearch"}}
      ]
    } 
  }
}
```

```python
"hits" : [
  {
    "_index" : "demo_search",
    "_type" : "_doc",
    "_id" : "3",
    "_score" : 0.0,
    "_source" : {
      "text" : "This is a pen.",
      "num" : 3
    }
  }
```

\[Elasticsearch\] を含まないドキュメントが検索できました。

match と全く一致してないので、当然 "\_score" は 0 のドキュメントです。

```python
GET /demo_search/_search
{
  "query":{
    "bool": {
      "must": [
        {"match":{"text":"Elasticsearch"}}
      ], 
      "filter":[
        {"range":{"num":{"lte":"1"}}}
      ]
    } 
  }
}
```

```python
"_source" : {
  "text" : "This is Elasticsearch test.",
  "num" : 1
}
```

\[Elasticsearch is [search engine](#).\] は match 条件に一致しますが、"num" = 2 のため、検索結果から除外されています。

### 検索結果を集計 (Aggregations)

検索クエリ (search API) は、検索結果を集計できます。

集計 (Aggregations) には、主に次の 3 種類が存在します。

- [Metrics aggregations (計算)](#metrics)
- [Bucket aggregations (分類)](#buckets)
- [Pipeline aggregations (多段集計)](#pipeline)

以下の "demo\_agg" [インデックス](https://hogetech.info/database/design/index "[データベース]インデックスの意味やメリットとデメリットを解説") を利用して、Aggregations の動きを確認します。

```python
POST /_bulk
{ "index" : { "_index" : "demo_agg", "_id" : "1" } }
{ "text" : "This is Elasticsearch test.", "num" : 1 }
{ "index" : { "_index" : "demo_agg", "_id" : "2" } }
{ "text" : "Elasticsearch is search engine.", "num" : 2 }
{ "index" : { "_index" : "demo_agg", "_id" : "3" } }
{ "text" : "This is a pen.", "num" : 3 }
```

Metrics aggregations では、以下のような集計ができます。

| Metrics aggregations の種類 | 説明 |
| --- | --- |
| [Avg aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-avg-aggregation.html) | 平均を取得する |
| [Sum aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-sum-aggregation.html) | 合計値を取得する |
| [Max aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-max-aggregation.html) | 最大値を取得する |
| [Min aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-min-aggregation.html) | 最小値を取得する |
| [Stats aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-stats-aggregation.html) | 上記全部の値を取得する |
| [Cardinary aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html) | 異なる値の数を取得する   ※\[1,2,3,2\]の場合は1,2,3 の３種類 |

Metrics aggregations の一覧は [こちら](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics.html) (左のナビゲーションペインから確認してください)

ここでは、Avg aggregation を利用してみます。

```python
GET demo_agg/_search
{
  "size": 0,
  "aggs": {
    "集計の名前": {
      "avg": {
        "field":"num"
      }
    }
  }
}
```

```python
"aggregations" : {
  "集計の名前" : {
    "value" : 2.0
  }
}
```

"num" フィールドの値は \[1, 2, 3, 2\] なので、平均の 2.0 を正しく計算できています。

Buckets aggregations では、以下のような分類ができます。

| Buckets aggregations の種類 | 説明 |
| --- | --- |
| [Range aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-range-aggregation.html) | 指定した範囲ごとにバケットを作成   (0~99円, 100~1000円 等) |
| [Histogram aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-histogram-aggregation.html) | 指定した等間隔でバケットを作成   (100円ごと等) |
| [IP range aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-iprange-aggregation.html) | [IP アドレス](https://hogetech.info/network/osi/layer3#ip-address "IP アドレス") の範囲ごとにバケットを作成   (192.168.0.0/24, 192.168.1.0/24 ごと等) |
| [Geo-distance aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geodistance-aggregation.html) | 距離ごとにバケットを作成   (指定した位置から 99km まで、100km~300km 等) |

Buckets aggregations の一覧は [こちら](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket.html) (左のナビゲーションペインより)

ここでは、 [Range aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-range-aggregation.html) と [Histogram aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-histogram-aggregation.html) を利用してみます。

```python
GET demo_agg/_search
{
  "size": 0,
  "aggs": {
    "バケットの名前": {
      "range": {
        "field":"num",
        "ranges": [
          {
            "from": 0, 
            "to":2
          },
          {
            "from": 2
          }
        ]
      }
    }
  }
}
```

```python
"aggregations" : {
  "バケットの名前" : {
    "buckets" : [
      {
        "key" : "0.0-2.0",
        "from" : 0.0,
        "to" : 2.0,
        "doc_count" : 1
      },
      {
        "key" : "2.0-*",
        "from" : 2.0,
        "doc_count" : 3
      }
    ]
  }
```

次の結果が確認できます。

- num の値が \[0 以上 ~ 2 未満\] を格納するバケットに、１つのドキュメント (num = \[1\])
- num の値が \[2 以上\] を格納するバケットに、３つのドキュメント (num = \[2, 3, 2\])
![](https://hogetech.info/wp-content/uploads/2022/06/1920px-UsaccHistogram.svg_.png)

1000 間隔でバケットを分けたヒストグラムの例

```python
GET demo_agg/_search
{
  "size": 0,
  "aggs": {
    "バケットの名前": {
      "histogram": {
        "field":"num",
        "interval": 1
      }
    }
  }
}
```

```python
"aggregations" : {
  "バケットの名前" : {
    "buckets" : [
      {
        "key" : 1.0,
        "doc_count" : 1
      },
      {
        "key" : 2.0,
        "doc_count" : 2
      },
      {
        "key" : 3.0,
        "doc_count" : 1
      }
    ]
```

num の値が 1 ごとにバケットが作成されていることがわかります。

```python
POST /demo_agg/_search
{
  "size": 0,
  "aggs": {
    "１段目の名前": {
      "range": {
        "field": "num",
        "ranges": [
          {
            "from": 1,
            "to":2
          },
          {
            "from": 2
          }
        ]
      },
      "aggs": {
        "2段目の名前": {
          "sum": {
            "field": "num"
          }
        }
      }
    }
  }
}
```

```yaml
"１段目の名前": {
  "buckets": [
    {
      "key": "1.0-2.0",
      "from": 1,
      "to": 2,
      "doc_count": 1,
      "2段目の名前": {
        "value": 1
      }
    },
    {
      "key": "2.0-*",
      "from": 2,
      "doc_count": 2,
      "2段目の名前": {
        "value": 5
```

以下のように 1 段目のバケットの内容を使って、2 段目で処理できています。

- 1段目の [Range Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-range-aggregation.html) で、\[0 以上 ~ 1未満\] と \[2 以上\] の 2 つのバケットを作成
- 2段目の [Sum Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-sum-aggregation.html) で、1 段目のバケットの合計をそれぞれ計算  
	※\[0 以上 ~ 1未満\] は 1, \[2 以上\] は 2 +3 = 5

## 関連記事

<table><thead><tr><th colspan="5">Elasticsearch & OpenSearch の使い方</th></tr></thead><tbody><tr><td><p><a href="https://hogetech.info/database/elasticsearch"><img src="https://hogetech.info/wp-content/uploads/2024/08/612f43071a2a0f44423b8bcb86c93e1a-3.png"><br>Elasticsearch</a></p></td><td><p><a href="https://hogetech.info/database/elasticsearch-mapping"><img src="https://hogetech.info/wp-content/uploads/2024/08/1802783db20269aba22a3ea93b92cabe-3.png"><br><small>設定/mapping</small></a></p></td><td><p><a href="https://hogetech.info/database/elasticsearch-analyzer"><img src="https://hogetech.info/wp-content/uploads/2024/08/7bbefb8f231d232d8ec6a01c33469eec-4.png"><br>Analyzer</a></p></td><td><p><a href="https://hogetech.info/search-technology/bm25"><img src="https://hogetech.info/wp-content/uploads/2025/03/40e3078c472ee171d679268e4eda7e8b.png"><br>BM25</a></p></td><td><p><a href="https://hogetech.info/database/elasticsearch-datastruct"><img src="https://hogetech.info/wp-content/uploads/2024/08/b992e3e93fc582dfe739dc9235fa101c-3.png"><br>データ構造</a></p></td></tr><tr><td><p><a href="https://hogetech.info/database/vector"><img src="https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-3.png"><br>ベクトル検索</a></p></td><td><p><a href="https://hogetech.info/ml/rag"><img src="https://hogetech.info/wp-content/uploads/2024/08/01e20b05948409296d32314122ce234d-4.png"><br>RAG</a></p></td><td></td><td></td><td></td></tr></tbody></table>

<table><thead><tr><th colspan="4">RAG (検索拡張生成)</th></tr></thead><tbody><tr><td><p><a href="https://hogetech.info/bigdata/elasticsearch"><img src="https://hogetech.info/wp-content/uploads/2024/08/612f43071a2a0f44423b8bcb86c93e1a-3.png" width="200"><br>Elasticsearch</a></p></td><td width="25%"><p><a href="https://hogetech.info/ml/algorithm/knn"><img src="https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-5.png"> KNN</a></p></td><td><p><a href="https://hogetech.info/database/vector"><img src="https://hogetech.info/wp-content/uploads/2024/08/7fb8f1c748d490339c64aa37f2515920-3.png" width="200"><br>ベクトルデータベース</a></p></td><td><p><a href="https://hogetech.info/ml/rag"><img src="https://hogetech.info/wp-content/uploads/2024/08/01e20b05948409296d32314122ce234d-4.png" width="200"><br>RAG</a></p></td></tr></tbody></table>

<table><thead><tr><th colspan="6">学習ロードマップ</th></tr></thead><tbody><tr><td><p><a href="https://hogetech.info/linux"><img src="https://hogetech.info/wp-content/uploads/2024/10/deb17bd5bd307fcd49379fd7617489d9-3.png"><br>Linux</a></p></td><td><p><a href="https://hogetech.info/network"><img src="https://hogetech.info/wp-content/uploads/2024/10/7bbefb8f231d232d8ec6a01c33469eec-1.png"><br>ネットワーク</a></p></td><td><p><a href="https://hogetech.info/database"><img src="https://hogetech.info/wp-content/uploads/2024/10/b992e3e93fc582dfe739dc9235fa101c-1.png"><br>データベース</a></p></td><td></td><td><p><a href="https://hogetech.info/ml"><img src="https://hogetech.info/wp-content/uploads/2024/10/5620f8b95d8dc21a55807a504975eb0a-1.png"><br>機械学習</a></p></td><td><p><a href="https://hogetech.info/security"><img src="https://hogetech.info/wp-content/uploads/2024/10/479089b78010423b5702baaaa414bf52.png"><br>セキュリティ</a></p></td></tr></tbody></table>

### 参考文献

公式ドキュメント

[

![](https://www.elastic.co/static-res/images/social_media_default.png)

](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html "Elastic fundamentals | Elastic Docs")

+4