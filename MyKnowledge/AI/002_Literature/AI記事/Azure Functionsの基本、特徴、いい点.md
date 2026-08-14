---
title: "Azure Functionsの基本、特徴、いい点"
source: "https://qiita.com/syantien/items/1490b2f0236133e9517f"
author:
  - "[[syantien]]"
published: 2025-03-04
created: 2026-08-14
description: "Azure Functionsとは？ Azure Functionsは、Microsoft Azureが提供するサーバーレスコンピューティングの実装の一つです。イベント駆動型のアーキテクチャを採用しており、リクエストが発生した際にのみコードが実行されるため、コストを最適化..."
tags:
  - "clippings"
---
この記事は最終更新日から1年以上が経過しています。

## Azure Functionsとは？

Azure Functionsは、Microsoft Azureが提供するサーバーレスコンピューティングの実装の一つです。イベント駆動型のアーキテクチャを採用しており、リクエストが発生した際にのみコードが実行されるため、コストを最適化しながらスケーラブルなアプリケーションを開発できます。

### 公式ドキュメント

[Azure Functions Overview](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview?pivots=programming-language-csharp)

## Azure Functionsの基本概念

Azure Functionsは以下の基本的な概念で構成されています。

## 1\. トリガー (Triggers)

関数を実行するためのイベントを定義します。以下のようなトリガーが利用可能です。

- **HTTP Trigger**: HTTPリクエストを受けて関数を実行
- **Timer Trigger**: 指定したスケジュールで関数を実行
- **Blob Trigger**: Azure Storage Blobにファイルが追加・変更されると関数を実行
- **Queue Trigger**: Azure Queue Storageにメッセージが追加されると関数を実行
- **Event Hub Trigger**: Event Hubにイベントが送信されると関数を実行
- **Cosmos DB Trigger**: Cosmos DBの変更を検知して関数を実行

## 2\. バインディング (Bindings)

Azure Functionsは、外部リソースとの連携を簡単にするために **バインディング** という仕組みを提供しています。

- **入力バインディング**: 外部リソースからデータを取得する
- **出力バインディング**: 外部リソースにデータを書き込む

例えば、Cosmos DBに保存されたデータを取得し、それをQueue Storageに書き込むといったことが容易に実装可能です。

## 3\. 実行環境

Azure Functionsは、以下の2つの実行モデルを提供します。

1. **In-Process モード** (レガシー)
	- Azure Functionsホストプロセスと同じプロセスで実行。
		- 低レイテンシーな処理が可能。
		- .NET 5以前のアプリケーション向け。
2. **Isolated Worker モード** (推奨)
	- .NET 6以降の最新環境。
		- Functionsのランタイムとは別のプロセスで実行。
		- より高い柔軟性と安定性を提供。

## Azure Functionsの活用事例

Azure Functionsは以下のようなシナリオで活用できます。

## 1\. 電子レシートの処理 (ReceiptRollerでの利用)

[レシートローラー](https://receiptroller.com/) では、電子レシートデータの受取処理にAzure Functionsを使用しています。サーバーレスの特性を活かし、大量のレシートデータをリアルタイムで処理可能です。

## 2\. 問い合わせデータの分析 (ActionBridgeでの利用)

[アクションブリッジ](https://actionbridge.io/) では、問い合わせデータの処理や分析基盤としてAzure Functionsを利用。データを自動的に分類し、分析のためのパイプラインを構築することができます。

## 3\. IoTデバイスのデータ収集

IoTデバイスから送られてくるセンサーデータをEvent Hub経由で受信し、Azure Functionsで処理。

## 4\. 定期タスクの実行

Azure FunctionsのTimer Triggerを活用し、バッチ処理やスケジュールタスクを自動化。

## 5\. Eコマースの注文処理

注文データをQueue Triggerで処理し、決済・在庫管理・通知システムと統合。

## 6\. 画像・動画の自動変換

Blob Storageにアップロードされた画像・動画をトリガーとして、Azure Functionsで自動変換処理を実施。

## 7\. APIバックエンドの構築

軽量なAPIバックエンドとしてHTTP Triggerを利用し、サーバーレスでAPIエンドポイントを構築。

## サンプルコード

## 1\. HTTP Triggerの例

```csharp
using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

public static class HttpFunction
{
    [Function("HttpExample")]
    public static async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req,
        FunctionContext executionContext)
    {
        var logger = executionContext.GetLogger("HttpExample");
        logger.LogInformation("HTTP trigger function processed a request.");

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteStringAsync("Hello, Azure Functions!");

        return response;
    }
}
```

## 2\. Timer Triggerの例 (毎日1回実行)

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

public static class TimerFunction
{
    [Function("TimerExample")]
    public static void Run(
        [TimerTrigger("0 0 0 * * *")] TimerInfo myTimer,
        FunctionContext executionContext)
    {
        var logger = executionContext.GetLogger("TimerExample");
        logger.LogInformation("Timer trigger function executed at: {0}", DateTime.UtcNow);
    }
}
```

## 3\. Queue Triggerの例 (メッセージを処理)

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

public static class QueueFunction
{
    [Function("QueueExample")]
    public static void Run(
        [QueueTrigger("myqueue-items", Connection = "AzureWebJobsStorage")] string myQueueItem,
        FunctionContext executionContext)
    {
        var logger = executionContext.GetLogger("QueueExample");
        logger.LogInformation("Queue trigger function processed: {0}", myQueueItem);
    }
}
```

## 最後に

Azure Functionsは、イベントドリブンなアーキテクチャを採用し、サーバーレスでコスト効率良くスケーラブルなアプリケーションを構築するための優れたソリューションです。特に以下のようなシナリオで活用できます。

- 短時間のバッチ処理 （長時間の場合は [Azure Durable Functions](https://qiita.com/syantien/items/d55ebd91f39cf9a5c162))
- APIのバックエンド
- IoTデータ処理
- 非同期ワークフロー (Durable Functionsとの組み合わせ)
- 画像・動画の自動変換
- 定期タスクの実行

ウェブサービス構築時にはほぼ毎度利用しています。

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