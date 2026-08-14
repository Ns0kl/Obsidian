---
title: "初めてのAzure OpenAI Service！基本操作"
source: "https://qiita.com/TND_AYN/items/526c553735ba2f664c5a"
author:
  - "[[TND_AYN]]"
published: 2025-08-26
created: 2026-08-14
description: "Azure OpenAI Serviceを使ってみたいけれど、Azure自体に触れたことがない方も多いのではないでしょうか？ この記事では、Azure OpenAI Service（以下、AOAI）の概要から、リソース作成、モデルのデプロイ、チャットアプリ開発までの基本操作..."
tags:
  - "clippings"
---
Azure OpenAI Serviceを使ってみたいけれど、Azure自体に触れたことがない方も多いのではないでしょうか？  
この記事では、Azure OpenAI Service（以下、AOAI）の概要から、リソース作成、モデルのデプロイ、チャットアプリ開発までの基本操作をわかりやすく解説します。

※本記事の内容は、2024/11/21時点の仕様です。

## Azure OpenAI Serviceとは？

Azure OpenAI Serviceは、Microsoftのクラウドプラットフォーム「Azure」上で提供される、OpenAIの高度な言語モデル（GPT-4o、GPT-4.5など）を企業向けに最適化したマネージドサービスです。

OpenAIとMicrosoftのパートナーシップにより、最新のAIモデルを活用したチャットボットや業務支援ツールの開発が可能です。

## 利用に必要な条件

Azure OpenAI Service（以降、AOAI）を利用するには、以下の準備が必要です。

- Azure アカウント
- Azure サブスクリプション
- サブスクリプションに対する権限（「共同作成者」または「所有者」）

## Azure OpenAI Serviceの作成方法

今回はAOAIで簡単なチャットボットを作成する手順をご紹介します。  
（前章の利用条件を満たしている前提で記載しています）

**＜AOAIリソース作成～デプロイまでの流れ＞**

1. AOAIリソース作成
2. GPTモデルのデプロイ

## ①AOAI リソース作成

(1)Azure Portal( [https://portal.azure.com](https://portal.azure.com/) )へアクセスします。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/efd19ae8-83c5-4daf-91de-d6589000fe86.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Fefd19ae8-83c5-4daf-91de-d6589000fe86.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=d066a3729a0c30c06bd08d9bd9975d9d)

(2)画面上部の検索バーで「Azure OpenAI」と検索し、候補に出てきた「Azure OpenAI」をクリックします。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/e3d0665f-b10c-4cb2-8887-3c39a81500a5.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Fe3d0665f-b10c-4cb2-8887-3c39a81500a5.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=11534edd472f76842fc43e47e59453a8)

(3)リソース管理画面に遷移しますので、左上の\[作成\]をクリックします。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/fe0b9ec4-d6a6-4164-915d-2444b0627246.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Ffe0b9ec4-d6a6-4164-915d-2444b0627246.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b3cd3b7029ea0f55f0b8c547778dc301)

(4)AOAIの作成画面に遷移しますので、まず「基本設定」の設定値を入力し、\[次へ\]をクリックします。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/10bdcaa2-9729-43b0-8150-65dc3c350a31.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2F10bdcaa2-9729-43b0-8150-65dc3c350a31.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=501a7ba044312b8dd2dae57e109a17d1)

| 設定項目 | 概要 |
| --- | --- |
| サブスクリプション | 利用可能なサブスクリプションを指定します。   ※このサブスクリプションに対して課金が発生します。 |
| リソースグループ | コスト管理や一括操作などの複数リソースを管理するためのグループです。 |
| リージョン | 利用可能なリージョンを指定します。 |
| 名前 | リソースにつける名前を設定します。   ここで設定した名前がそのままエンドポイントのURLにも使用されます。 |

(5)「ネットワーク設定」を任意の設定値に設定します。今回は「インターネットを含むすべてのネットワークがこのリソースにアクセスできます。」を選択し、\[次へ\]をクリックします。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/d5ec5415-cf43-4876-aab8-6ab01dfc8976.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Fd5ec5415-cf43-4876-aab8-6ab01dfc8976.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=131b3716493966de7c439fee7ac9eb43)

**＜ネットワークの設定値＞**  
・インターネットを含むすべてのネットワークがこのリソースにアクセスできます：ネットワーク制御なし  
・Selected networks, configure network security for your Azure AI services resource.：特定のネットワークからのみアクセス可能  
・無効になっています：パブリックインターネットを含む、すべての直接的なネットワークアクセスが完全にブロックされます

(6)「タグ」設定を任意で設定し、\[次へ\]をクリックします。  
※タグ：リソースに対してタグ設定を付けることができます。コスト管理や環境分類などで活用できます。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/dcaf6250-fa86-44b8-b851-0b85bc6a4174.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Fdcaf6250-fa86-44b8-b851-0b85bc6a4174.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=aa4ba604dd354498a2e55914ab1749c7)

(7)設定項目のレビュー画面が表示されますので、問題なければ\[作成\]をクリックします。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/fc794335-8448-4a87-97a8-d5b1a064d3e3.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Ffc794335-8448-4a87-97a8-d5b1a064d3e3.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=f0ab14ad99295aeb0daa846fb707acd0)

(8)しばらくするとリソース作成（デプロイ）が完了します。\[リソースに移動\]をクリックします。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/b7e88db1-38dd-40c8-b933-2624fb755316.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Fb7e88db1-38dd-40c8-b933-2624fb755316.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=620f90aa049d28c4c4100e584ba37a70)

## ②GPTモデルのデプロイ

次はChatGPTのAPIを利用するために、モデルのデプロイを行います。

(1)前項で作成した\[リソース名\]をクリックします。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/ec3735b2-b3e7-4c19-9cb3-d356358662bc.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Fec3735b2-b3e7-4c19-9cb3-d356358662bc.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=bb4a8b91700d415fb21a61815c34c50a)

(2)\[Go to Azure AI Foundry portal\]をクリックします。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/bd4c6ccf-a94a-445e-825b-c1c2f0656dc4.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Fbd4c6ccf-a94a-445e-825b-c1c2f0656dc4.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=2c5bce7d904f2070a81e02d4cc2c49b8)

(3)Azure AI Foundryの画面に遷移します。  
ここからモデルデプロイの管理やチャットアプリの開発を行いますので、  
\[+新しいデプロイを作成\] > \[基本モデルから\]の順にクリックします。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/dc06ae02-8747-4273-9205-d7819883a77c.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Fdc06ae02-8747-4273-9205-d7819883a77c.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b21b9170df8a9872020b5ee84ad8f308)

(4)利用するChatGPTモデルを選択し、\[確認\]をクリックします。  
利用するモデルにより、コストが異なります。高性能になるほど高コストになりますので、ご注意ください。  
※右上の「モデルカタログ」から各モデルのコストが確認できます。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/621310c2-bd32-44b1-94c9-1bcc09f11f13.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2F621310c2-bd32-44b1-94c9-1bcc09f11f13.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=8897caf60e0ac05cb55e501329a1cf3d)

(5)「デプロイ名」、「デプロイの種類（モデルにより種類は異なります）」を設定し、\[デプロイ\]をクリックします。  
※デプロイの種類：AIモデルをどのようにデプロイするかのオプションです。今回はコストも抑えたいので、Standardを選択しています。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/d800524a-f2a2-4a64-81eb-fa2cae299561.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Fd800524a-f2a2-4a64-81eb-fa2cae299561.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=560e6d044224ee0d80fd452477863688)

(6)「チャット プレイグラウンド」の画面になれば、モデルのデプロイは完了です。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/c714fbba-f84d-4296-bb2d-8136f432af6d.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Fc714fbba-f84d-4296-bb2d-8136f432af6d.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=20c23094310498cf09d9c423cf3d98c7)

## ③チャットプレイグラウンドでChatGPTアプリを開発する

コードを書いてモデルを利用することも可能ですが、GUIベースの開発環境がAOAIには用意されています。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/ce94efba-4827-408f-a80b-3a00acb624e5.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2Fce94efba-4827-408f-a80b-3a00acb624e5.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=f63e8c5ea4e4923f3abd4ab3297cd5ad)

まず、左側の「セットアップ」ですが、大きく分けて下記の設定ができます。  
① システムメッセージ  
② データの追加  
③ パラメーター

**① システムメッセージ**  
GPTにどのような役割を持たせるか指示するプロンプトを設定できます。  
ここの指示文（システムプロンプト）をGPTのとおりに振る舞います。

**② データの追加**  
データを追加すると、GPTが回答をする前に、追加されたデータベースから必要な情報を検索し、それをもとに回答してくれます。  
データはAzure Blob StorageなどのDBを参照することや、直接ファイルをアップロードすることができます。

社内のデータと接続することによって、会社独自のChatGPTを作成することができます。

**③ パラメーター**  
GPTの細かいカスタマイズが可能です。

| 項目 | 内容 |
| --- | --- |
| 過去のメッセージを含む | AIが回答を生成する際に考慮する会話履歴の量 |
| 応答速度 | AIが生成する応答の最大トークン数（単語や文字の断片数） |
| 温度 | AIの創造性と予測可能性のバランスを調整。   設定値を上げると決定論的な応答が増え、   下げると創造的な応答が増える。 |
| 上位P | AIが次の単語を選ぶ際に考慮する選択肢の範囲 |
| シーケンスの停止 | 特定の文字列に達したら、AIの応答生成を停止させる機能 |
| 頻度のペナルティ | 同じ語句や表現の繰り返しを減らすための設定。   設定値が0の場合、繰り返しに対するペナルティはなし |
| プレゼンスのペナルティ | 新しいトピックや概念の導入を調整する設定。   設定値が0の場合、新しい内容の導入に対するペナルティはなし |

デフォルト値は一般的な設定値に調整されているようですので、まずは設定値は変えずに  
用途や出力結果に合わせて調整いくのがよいでしょう。

画面右側は「チャットセッション」になっています。  
一般的なチャットボットと同様に、メッセージを送信してみます。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3988403/1012e748-48ad-41d1-aeff-822e81ddd549.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3988403%2F1012e748-48ad-41d1-aeff-822e81ddd549.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=f468f5b489de5c47fb614613c2ef3f20)

システムプロンプトで「関西弁で回答して」と指示しているので、しっかり関西弁で犬の種類を教えてくれました。

## ④チャットアプリケーションのデプロイ

ここまで設定したChatGPTアプリは、Webアプリとして公開することが可能です。

公開することができるのはサブスクリプションの「所有者」となります。  
今回その手順は割愛しますが、Webアプリとして利用することにより、  
他ユーザーへChatGPTアプリを展開することができます。

## まとめ

今回はAOAIの基本的な作成方法から、モデルのデプロイ、チャットプレイグラウンドの使い方までご紹介しました。  
GUIベースの開発環境を使うことで、とても簡単に生成AIアプリケーションを作成できました。

## 最後に

テンダでは、「こんなプロジェクトに挑戦したい」「こんなチームで働きたい」「理想のチームを創りたい」と願う仲間を求めています。  
カジュアル面談も随時受付中です。ぜひ一度お話ししましょう！

[募集職種一覧](https://hrmos.co/pages/tenda/jobs "募集職種一覧")  
[カジュアル面談の申込](https://hrmos.co/pages/tenda/jobs/031002/apply "カジュアル面談の申込")  
[テンダで働く人や社風について](https://note.com/tenda_recruit "テンダで働く人や社風について")  
[テンダのMicrosoftサービス](https://mssp.tenda.co.jp/ "テンダのMicrosoftサービス")

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