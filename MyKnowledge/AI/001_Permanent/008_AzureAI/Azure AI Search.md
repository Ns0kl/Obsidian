# Azure AI Search

## 概要
[Azure AI Search](https://www.ai-souken.com/article/azure-ai-search-overview) は、Microsoftが提供するクラウドベースの検索プラットフォームです。大規模言語モデルとエンタープライズデータを組み合わせて、豊かな検索エクスペリエンスと生成AIアプリケーションを構築できます。

Azure AI Searchにおけるベクトル検索は、テキスト・画像・音声などのコンテンツを数値ベクトル（埋め込み）に変換し、 **ベクトル同士の類似性に基づいて情報を検索する機能** です。従来のキーワード検索が文字列の一致に依存するのに対し、ベクトル検索はコンテンツの「意味」や「コンテキスト」を理解したマッチングを実現します。

## 主要ポイント
## Azure AI Searchのエージェント検索（Agentic Retrieval）

Azure AI Searchには、2025年にパブリックプレビューとして追加された\*\*エージェント検索（Agentic Retrieval）\*\*があります。これは、LLM（大規模言語モデル）を活用して複雑なクエリを分解・並列実行するマルチクエリパイプラインで、RAGアプリケーションやエージェント間ワークフローに最適化されています。

### エージェント検索の仕組み

[エージェント検索](https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview) は、以下の流れで動作します。

- **クエリ分解**  
	LLM（gpt-4o、gpt-4.1、gpt-5シリーズに対応）が、ユーザーの質問とチャット履歴を分析し、複雑な質問を焦点を絞ったサブクエリに分解します。
- **並列実行**  
	分解されたサブクエリがすべて同時に実行されます。各サブクエリはキーワード検索・ベクトル検索・ハイブリッド検索に対応し、セマンティックランカーで結果がリランキングされます。
- **結果統合**  
	すべてのサブクエリの結果を統合し、グラウンディングデータ・ソース参照・実行計画の3パートからなるレスポンスを返します。

たとえば「ビーチ近くのホテルで空港送迎があり、ベジタリアンレストランまで徒歩圏内の場所を探して」という複合的な質問でも、エージェント検索はこれを複数のサブクエリに分解し、それぞれの条件に合致する結果を統合して返すことができます。

### Knowledge BaseとFoundry Agent Service

エージェント検索の中核となるのが\*\*Knowledge Base（ナレッジベース） **と** Knowledge Source（ナレッジソース）\*\*の概念です。

Knowledge Sourceは検索インデックスやBlob Storage、SharePointなどのデータソースをラップするオブジェクトで、Knowledge Baseに紐付けることでエージェント検索のパイプラインに組み込まれます。

Knowledge Baseは [Foundry Agent Service](https://azure.microsoft.com/en-us/products/ai-foundry/agent-service) と連携でき、AIエージェントにベクトル検索の結果をナレッジとして提供します。Foundry IQ（パブリックプレビュー）を使えば、RAGワークフローを動的な推論プロセスとして一元化し、応答品質を向上させることも可能です。

### MCP（Model Context Protocol）対応

エージェント検索のKnowledge Baseは、MCP（Model Context Protocol）サーバーとしても機能します。MCPはAIアプリケーションが外部データソースやツールに接続するためのオープンプロトコルで、Foundry Agent ServiceのほかGitHub CopilotやClaudeなどのMCP対応クライアントから呼び出せます。

Knowledge Baseがknowledge\_base\_retrieveツールを公開し、MCP互換クライアントがこのツールを呼び出すことで、エージェントアーキテクチャにAzure AI Searchの検索機能をシームレスに統合できます。


## 関連ノート
[[Vector Search]]
## 学習メモ
[[Azure AI Searchのベクトル検索の手順を解説！]]
