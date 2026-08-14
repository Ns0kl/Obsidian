---
title: "Azure Functionsの概要"
source: "https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-overview"
author:
  - "[[ggailey777]]"
published:
created: 2026-08-14
description: "Azure Functionsを使用して、追加のコードを記述せずに堅牢なサーバーレス アプリを構築する方法について説明します。"
tags:
  - "clippings"
---
## Azure Functionsとは

Azure Functionsは、より少ないコードを使用しながら、インフラストラクチャを減らし、コストを削減しながら、堅牢なアプリを構築できるサーバーレス ソリューションです。 サーバーのデプロイと保守について心配する代わりに、クラウド インフラストラクチャを使用して、アプリケーションの実行を維持するために必要なすべての up-to-date リソースを提供できます。

最も重要なコードに焦点を当て、最も生産性の高い言語で、残りのコードAzure Functions処理します。 サポートされている言語の一覧については、Azure Functions の サポートされている言語を参照してください。

## シナリオ

Functions には、追加のコードを記述することなく、関数を他のサービスに接続する、イベントドリブン [トリガーとバインド](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-triggers-bindings) の包括的なセットが用意されています。

次の一覧には、Functions を使用する一般的な統合シナリオが含まれています。

| もし...したいのであれば | それから... |
| --- | --- |
| [ファイルのアップロードを処理する](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scenarios#process-file-uploads) | BLOB ストレージでファイルがアップロードされたり変更されたりしたときにコードを実行します。 |
| [データをリアルタイムで処理する](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scenarios#real-time-stream-and-event-processing) | イベント ストリームと IoT ソース ストリームからストレージへの途中でデータをキャプチャして変換します。 |
| [AI 推論を実行する](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scenarios#machine-learning-and-ai) | キューからテキストをプルし、分析と分類のためにさまざまな AI サービスに提示します。 |
| [スケジュールされたタスクを実行する](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scenarios#run-scheduled-tasks) | 定義済みの時間間隔でデータ クリーンアップ コードを実行します。 |
| [スケーラブルな Web API を構築する](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scenarios#build-a-scalable-web-api) | HTTP トリガーを使用して、Web アプリケーション用の一連の REST エンドポイントを実装します。 |
| [サーバーレス ワークフローを作成する](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scenarios#build-a-serverless-workflow) | Durable Functionsを使用して、一連の関数からイベント ドリブン ワークフローを作成します。 |
| [データベースの変更に対処する](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scenarios#respond-to-database-changes) | データベースでドキュメントが作成または更新されたときにカスタム ロジックを実行します。 |
| [信頼性の高いメッセージ システムを作成する](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scenarios#create-reliable-message-systems) | Azure Queue Storage、Service Bus、または Event Hubs を使用してメッセージ キューを処理します。 |

これらのシナリオでは、最新式のアーキテクチャ パターンを使用してイベント駆動型システムを構築できます。 詳細については、「 [Azure Functions シナリオ](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scenarios) を参照してください。

## 開発ライフサイクル

Functions では、アプリ開発のあらゆる段階でサポートされます。

1. **C#、Java、JavaScript、PowerShell、Python、Go** の [Code](https://learn.microsoft.com/ja-jp/azure/azure-functions/supported-languages) 、Rust などの言語には [custom ハンドラー](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-custom-handlers) を使用します。
2. **develop and debug** [Visual Studio、Visual Studio Code、Maven、その他のツール](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-develop-local) を使用してローカルに実行します。
3. Azure にデプロイするには、 **CLI、CI/CD パイプライン、または IDE** を使用します。
4. **Monitor** のパフォーマンスを監視し、組み込みの [Azure MonitorとApplication Insights](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-monitoring) との統合を使用して問題を診断します。

## ホスティング オプション

Functions には、ビジネス ニーズとアプリケーション ワークロードにさまざまな [ホスティング オプション](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scale) が用意されています。

| ホスティング オプション | 説明 |
| --- | --- |
| [Flex 従量課金プラン](https://learn.microsoft.com/ja-jp/azure/azure-functions/flex-consumption-plan) | **推奨。** イベントドリブンの迅速なスケーリング、仮想ネットワーク統合、従量課金制。 |
| [プレミアムプラン](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-premium-plan) | 最速の応答時間、無制限の実行時間、および仮想ネットワーク統合のための常時稼働インスタンス。 |
| [専用プラン](https://learn.microsoft.com/ja-jp/azure/azure-functions/dedicated-plan) | 予測可能なスケーリングとコストを使用して、既存の App Service プランで関数を実行します。 |
| [コンテナー アプリ](https://learn.microsoft.com/ja-jp/azure/container-apps/functions-overview) | 完全にカスタマイズされたコンテナー化された関数アプリをマイクロサービスと共にAzure Container Appsにデプロイします。 |
| [消費プラン](https://learn.microsoft.com/ja-jp/azure/azure-functions/consumption-plan) | 従来のサーバーレス プラン (Windowsのみ)。 新しいアプリには Flex 従量課金プランを使用します。 |

詳細な比較については、「 [Azure Functions ホスティング オプション](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scale) を参照してください。

## 関連するコンテンツ

- [Azure Functions 利用シナリオ](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-scenarios)
- [Azure Functions を始める](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-get-started)

---

## その他のリソース

トレーニング

モジュール

[Azure Functions の概要 - Training](https://learn.microsoft.com/ja-jp/training/modules/intro-azure-functions/?source=recommendations)

Azure Functions を使用して、サーバーレス コンピューティング リソースをクラウドベース ソリューションに簡単に統合する方法を学習します。 このモジュールでは、Functions のしくみ、Azure のコンピューティング ニーズに Functions を使用する利点を紹介して、このサービスのいくつかの主要なユース ケースについて説明します。

認定資格

[Microsoft Certified: Azure Developer Associate - Certifications](https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/?source=recommendations)

Build end-to-end solutions in Microsoft Azure to create Azure Functions, implement and manage web apps, develop solutions utilizing Azure storage, and more.