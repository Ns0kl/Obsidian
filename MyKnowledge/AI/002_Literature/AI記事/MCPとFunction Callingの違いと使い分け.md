---
title: "MCPとFunction Callingの違いと使い分け"
source: "https://qiita.com/ssc-yshikeda/items/d946d6576f8de60fa81f"
author:
  - "[[ssc-yshikeda]]"
published: 2026-03-25
created: 2026-08-13
description: "はじめに LLMに外部ツールやデータを使わせる方法として、Function Calling と MCP（Model Context Protocol） という2つのアプローチがあります。 「MCPが出たからFunction Callingは古い？」と思われがちですが、両者..."
tags:
  - "clippings"
---
## はじめに

LLMに外部ツールやデータを使わせる方法として、 **Function Calling** と **MCP（Model Context Protocol）** という2つのアプローチがあります。

「MCPが出たからFunction Callingは古い？」と思われがちですが、両者は **競合ではなく補完関係** にあります。

- **Function Calling** — LLM APIに組み込まれた「関数呼び出し生成」機能（各社が独自実装）
- **MCP** — LLMと外部ツール/データの接続を **標準化するオープンプロトコル**

本記事では、両者の違いを整理し、MCPの3つの主機能（Tools / Resources / Prompts）の使い分けまで解説します。

## Function Callingとは

LLMが「どの関数を、どんな引数で呼ぶべきか」をJSON形式で返す機能です。OpenAI・Anthropic・Googleが各社独自に実装しています。

**重要なポイント**: モデルは関数を **実行しません** 。呼び出すべき関数名と引数を「提案」するだけで、実際の関数の処理実行は開発者の責任です。

### 基本フロー (天気を取得する関数get\_weatherを定義した場合)

```text
1. [ユーザーの質問 + ツール定義] → LLM APIに送信
2. LLMが判断 → 「get_weatherをlocation="Tokyo"で呼んで」と返す
3. 開発者が実際にget_weatherを実行
4. 実行結果をLLMに返す
5. LLMが結果を元に最終回答を生成
```

### コード例（OpenAI）

```python
from openai import OpenAI
import json

client = OpenAI()

# ツール定義（JSON Schemaで記述）
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "The city name to get the weather for"}
                },
                "required": ["location"],
                "additionalProperties": False
            },
            "strict": True
        },
    }
]

# ステップ1: ツール付きでリクエスト
response = client.chat.completions.create(
    model="gpt-5.4",
    tools=tools,
    messages=[{"role": "user", "content": "東京の天気は？"}],
)

# ステップ2: tool_callsを処理して関数を実行
for tool_call in response.choices[0].message.tool_calls or []:
    args = json.loads(tool_call.function.arguments)  # ← JSON文字列をパース
    result = get_weather(args["location"])  # 開発者が実装する
```

---

## MCPとは

MCP（Model Context Protocol）は、Anthropicが提唱し、現在はLinux Foundation傘下の **AAIF（Agentic AI Foundation）** が管理する **オープンソースの標準プロトコル** です。「AIアプリと外部ツール/データソースの接続方法を統一しよう」という発想で、Microsoftの **LSP（Language Server Protocol）** と近いです。

### アーキテクチャ

```text
MCP Host（Claude Desktop, VS Code等のAIアプリ）
  ├── MCP Client 1 ─── MCP Server A（ファイルシステム）
  ├── MCP Client 2 ─── MCP Server B（データベース）
  └── MCP Client 3 ─── MCP Server C（外部API）
```

| 参加者 | 役割 |
| --- | --- |
| **MCP Host** | AIアプリケーション。MCPクライアントを管理 |
| **MCP Client** | MCPサーバーとの接続を維持（JSON-RPC 2.0で通信） |
| **MCP Server** | ツール・リソース・プロンプトを提供 |

### トランスポート

メッセージを流す通信の方式が2種類あります。

| 方式 | 用途 | 通信方法 |
| --- | --- | --- |
| **stdio** | ローカル通信 | サブプロセスとして起動、stdin/stdoutで通信 |
| **Streamable HTTP** | リモート通信 | HTTP POST + GET（オプショナルSSE）、OAuth 2.1認証対応 |

---

## Function Calling vs MCP — 何が違うのか

### 一言でいうと

> **Function Calling** = LLMに「どの関数を呼ぶか」を判断させる機能  
> **MCP** = ツール提供を標準化する **プロトコル**

レイヤーが異なるため、実際にはMCPの内部でFunction Callingが使われています。

### 比較表

| 観点 | Function Calling | MCP |
| --- | --- | --- |
| 何をするか | LLMが関数名+引数を生成 | ツール提供を標準プロトコルで統一 |
| 標準化 | プロバイダー固有 | **ベンダー中立のオープン規格** |
| ツール管理 | 各アプリが個別に定義 | MCPサーバーに集約 |
| ツール発見 | 静的（開発時に定義） | **動的（実行時にサーバーから取得）** |
| 実装コスト | **低い（数行で統合可）** | やや高い（サーバー/クライアント構築が必要） |

### M × N 問題 vs M + N 問題

Function Callingの最大の課題は **M × N 問題** です。

**Function Calling**: 5つのアプリ × 10個のツール = **50個** の統合が必要

```text
App A ──┬── Tool 1    各アプリがそれぞれのツールに
App B ──┼── Tool 2    対して個別に統合コードを書く
App C ──┼── Tool 3
App D ──┼── ...
App E ──┘── Tool 10
```

**MCP**: 5つのクライアント + 10個のサーバー（1ツール1サーバーとするなら） = **15個** の実装で済む

```text
App A ──┐              ┌── Server 1
App B ──┤              ├── Server 2
App C ──┤── MCP規格 　──├── Server 3
App D ──┤              ├── ...
App E ──┘              └── Server 10
```

MCPサーバーを1度作れば、Claude Desktop・VS Code・Cursor等どのクライアントからでも使えます。

### 両者の併用

MCPとFunction Callingは排他的ではありません。実際、MCPクライアントがサーバーからツール一覧を取得し、それをFunction Calling形式に変換してLLM APIに渡すのが一般的なパターンです。

```python
# MCPサーバーのツール → Function Calling形式に変換
mcp_tools = await session.list_tools()
fc_tools = [
    {
        "type": "function",
        "function": {
            "name": t.name,
            "description": t.description,
            "parameters": t.inputSchema,
        },
    }
    for t in mcp_tools.tools
]

# そのままOpenAI APIのtoolsに渡せる
response = client.chat.completions.create(model="gpt-5.4", tools=fc_tools, ...)
```

---

## MCPの3つのプリミティブ

MCPは **Tools** だけではありません。 **Resources** と **Prompts** を加えた3つの主機能を提供しています。それぞれ「誰が制御するか」が異なるのがポイントです。

### 比較表

| 項目 | Tools | Resources | Prompts |
| --- | --- | --- | --- |
| 役割 | アクションの実行 | 読み取り専用データの提供 | プロンプトテンプレート |
| **制御主体** | **LLM** （自動判断） | **アプリ** （プログラムが決定） | **ユーザー** （明示的に選択） |
| 典型的なUI | LLMが自律的に呼び出し | `@` メンションで選択 | `/` スラッシュコマンド |

### Tools — LLMが自動で呼ぶアクション

LLMが「この関数を呼ぶべきだ」と自律的に判断して実行するもの。Function Callingのツールと同じ概念です。

**使いどころ**: API呼び出し、DB操作、計算など **副作用を伴う操作**

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("weather")

@mcp.tool()
async def get_weather(location: str) -> str:
    """Get the current weather for a given location."""
    return f"Weather in {location}: 22°C, sunny"
```

### Resources — 読み取り専用のコンテキスト

ファイル、設定情報、DBスキーマなど、LLMに **参照させたいデータ** を公開する仕組み。各リソースはURI（ `file:///...`, `config://...` 等）で識別されます。

**使いどころ**: LLMに背景情報やコンテキストを渡したい場面

```python
# 静的リソース
@mcp.resource("config://settings")
def get_settings() -> str:
    return json.dumps({"theme": "dark", "language": "en"})

# 動的リソース（テンプレート）
@mcp.resource("weather://{city}/current")
def get_weather_data(city: str) -> str:
    return json.dumps({"city": city, "temperature": 22})
```

Resourcesは `subscribe` で変更を購読できるのも特徴です。ファイルが更新されたらリアルタイムに通知を受け取れます。

### Prompts — ユーザーが選ぶテンプレート

再利用可能なプロンプトテンプレート。スラッシュコマンド（ `/code_review` 等）のような形でユーザーが明示的に選択して使います。

**使いどころ**: コードレビュー、コミットメッセージ生成など **定型ワークフロー**

```python
@mcp.prompt(title="Code Review")
def review_code(code: str) -> str:
    return f"Please review this code:\n\n{code}"

# リソースを埋め込んだ複合プロンプトも可能
@mcp.prompt(title="Debug Assistant")
def debug_error(error: str) -> list[base.Message]:
    return [
        base.UserMessage("I'm seeing this error:"),
        base.UserMessage(error),
        base.AssistantMessage("I'll help debug that. What have you tried?"),
    ]
```

### 3つの機能の連携例

データベースサーバーを例にすると、3つを組み合わせて使い分けます。

| プリミティブ | 用途 | 例 |
| --- | --- | --- |
| **Tools** | クエリの実行 | `SELECT`, `INSERT` |
| **Resources** | スキーマの参照 | テーブル定義、カラム情報 |
| **Prompts** | 操作テンプレート | few-shot examples付きクエリ生成 |

---

## クライアント対応状況

Resources / Prompts を使う場合は、ターゲットクライアントの対応状況を確認してください。

| クライアント | Tools | Resources | Prompts |
| --- | --- | --- | --- |
| VS Code (Copilot) | ○ | ○ | ○ |
| Claude Code | ○ | ○ | ○ |
| Claude Desktop | ○ | ○ | ○ |
| Cursor | ○ | × | ○ |
| Gemini CLI | ○ | × | ○ |
| ChatGPT | ○ | × | × |
| 表は以下より作成 |  |  |  |
| [https://modelcontextprotocol.io/clients](https://modelcontextprotocol.io/clients) |  |  |  |

Toolsは全クライアントが対応していますが、Resources / Promptsは対応してないのもあります。「Tools以外の機能が活用されにくい」と言われる主な理由です。

---

## 使い分けガイド

以下のフローチャートで、どちらを選ぶか判断できます。

### Function Calling vs MCP

<iframe src="https://qiita.com/embed-contents/mermaid#qiita-embed-content__80e1c744e469a719cdebb1766b955966" frameborder="0"></iframe>

### Tools vs Resources vs Prompts

<iframe src="https://qiita.com/embed-contents/mermaid#qiita-embed-content__1d23f533633d2d4f7066fb7f42858f12" frameborder="0"></iframe>

## まとめ

Function CallingとMCPは「API機能」と「プロトコル」というレイヤーの異なる技術であり、対立するものではなく **併用するもの** です。MCPの最大の価値は「M × N → M + N」の統合コスト削減にあり、一度作ったMCPサーバーはClaude Desktop、Cursor、VS Codeなど、どのクライアントからでも再利用できます。

MCPにはTools・Resources・Promptsの3つの主機能があり、制御主体（LLM / アプリ / ユーザー）に応じて使い分けることが重要です。

まずは小規模なプロトタイプをFunction Callingで素早く構築し、ツール数や連携先が増えてきた段階でMCPへ移行するのもありでしょう。

---

## 参考リンク

- [OpenAI Function Calling Guide](https://developers.openai.com/api/docs/guides/function-calling)
- [Anthropic Tool Use Overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [Google Gemini Function Calling](https://ai.google.dev/gemini-api/docs/function-calling)
- [MCP公式 Introduction](https://modelcontextprotocol.io/introduction)
- [MCP公式 Tools](https://modelcontextprotocol.io/docs/concepts/tools)
- [MCP公式 Resources](https://modelcontextprotocol.io/docs/concepts/resources)
- [MCP公式 Prompts](https://modelcontextprotocol.io/docs/concepts/prompts)
- [MCP公式 クライアント対応状況](https://modelcontextprotocol.io/clients)

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