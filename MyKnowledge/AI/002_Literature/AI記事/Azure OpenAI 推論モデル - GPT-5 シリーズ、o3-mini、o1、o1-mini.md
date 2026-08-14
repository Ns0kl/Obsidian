---
title: "Azure OpenAI 推論モデル - GPT-5 シリーズ、o3-mini、o1、o1-mini"
source: "https://learn.microsoft.com/ja-jp/azure/foundry/openai/how-to/reasoning?tabs=csharp%2Cgpt-5"
author:
  - "[[alvinashcraft]]"
published:
created: 2026-08-14
description: "Azure の OpenAI の高度な GPT-5 シリーズ、o3-mini、o1、o1-mini の推論モデルを使用する方法について説明します。"
tags:
  - "clippings"
---
## Azure OpenAI 推論モデル

Azure OpenAI 推論モデルは、集中力と能力を高め、推論と問題解決のタスクに取り組むために設計されています。 これらのモデルでは、ユーザーの要求の処理と理解に多くの時間が費やされ、以前のイテレーションと比較して、科学、コーディング、数学などの分野で非常に強力になります。

**推論モデルの主な機能:**

- 複雑なコード生成: 開発者をサポートするためにアルゴリズムを生成し、高度なコーディング タスクを処理できます。
- 高度な問題解決: 包括的なブレーンストーミング セッションや多面的な課題への対処に最適です。
- 複雑なドキュメント比較: コントラクト、ケース ファイル、または法的ドキュメントを分析して微妙な違いを特定するのに最適です。
- 命令のフォローとワークフロー管理: 短いコンテキストを必要とするワークフローの管理に特に効果的です。

## 前提 条件

- デプロイされた Azure OpenAI 推論モデル。
- REST の例を使用する場合:
	- Azure CLIをインストールします。 詳細については、「 Azure CLI を参照してください。
		- `az login` でサインインし、ベアラー トークンを生成し、 `AZURE_OPENAI_AUTH_TOKEN` 環境変数に格納します。
		```azurecli
		az account get-access-token --resource https://cognitiveservices.azure.com --query accessToken -o tsv
		```

## 使用

これらのモデルは現在、チャット入力候補 API を使用する他のモデルと [同じパラメーター セットをサポートしていません](#api--feature-support) 。

### チャット補完 API

```c#
using Azure.Identity;
using OpenAI;
using OpenAI.Chat;
using System.ClientModel.Primitives;

#pragma warning disable OPENAI001 //currently required for token based authentication

BearerTokenPolicy tokenPolicy = new(
    new DefaultAzureCredential(),
    "https://ai.azure.com/.default");

ChatClient client = new(
    model: "o4-mini",
    authenticationPolicy: tokenPolicy,
    options: new OpenAIClientOptions()
    {

        Endpoint = new Uri("https://YOUR-RESOURCE-NAME.openai.azure.com/openai/v1")
    }
);

ChatCompletionOptions options = new ChatCompletionOptions
{
    MaxOutputTokenCount = 100000
};

ChatCompletion completion = client.CompleteChat(
         new DeveloperChatMessage("You are a helpful assistant"),
         new UserChatMessage("Tell me about the bitter lesson")
    );

Console.WriteLine($"[ASSISTANT]: {completion.Content[0].Text}");
```

## 推論作業

### 開発者メッセージ

開発者メッセージ (`"role": "developer"`) は、機能的にはシステム メッセージと同じです。

前のコード例に開発者メッセージを追加すると、次のようになります。

- [C#](#tabpanel_2_csharp)
- [Python](#tabpanel_2_python)
- [REST](#tabpanel_2_REST)
- [出力](#tabpanel_2_output)

```csharp
using Azure.Identity;
using OpenAI;
using OpenAI.Chat;
using System.ClientModel.Primitives;

#pragma warning disable OPENAI001 //currently required for token based authentication

BearerTokenPolicy tokenPolicy = new(
    new DefaultAzureCredential(),
    "https://ai.azure.com/.default");

ChatClient client = new(
    model: "o4-mini",
    authenticationPolicy: tokenPolicy,
    options: new OpenAIClientOptions()
    {

        Endpoint = new Uri("https://YOUR-RESOURCE-NAME.openai.azure.com/openai/v1")
    }
);

ChatCompletionOptions options = new ChatCompletionOptions
{
    ReasoningEffortLevel = ChatReasoningEffortLevel.Low,
    MaxOutputTokenCount = 100000
};

ChatCompletion completion = client.CompleteChat(
         new DeveloperChatMessage("You are a helpful assistant"),
         new UserChatMessage("Tell me about the bitter lesson")
    );

Console.WriteLine($"[ASSISTANT]: {completion.Content[0].Text}");
```

## 推論の概要

[Responses API](https://learn.microsoft.com/ja-jp/azure/foundry/openai/how-to/responses) で最新の推論モデルを使用する場合は、推論の概要パラメーターを使用して、モデルの思考推論チェーンの概要を受け取ることができます。

- [C#](#tabpanel_3_csharp)
- [Python](#tabpanel_3_python)
- [REST](#tabpanel_3_REST)
- [出力](#tabpanel_3_output)

```csharp
using OpenAI;
using OpenAI.Responses;
using System.ClientModel.Primitives;
using Azure.Identity;

#pragma warning disable OPENAI001 //currently required for token based authentication

BearerTokenPolicy tokenPolicy = new(
    new DefaultAzureCredential(),
    "https://ai.azure.com/.default");

OpenAIResponseClient client = new(
    model: "o4-mini",
    authenticationPolicy: tokenPolicy,
    options: new OpenAIClientOptions()
    {
        Endpoint = new Uri("https://YOUR-RESOURCE-NAME.openai.azure.com/openai/v1")
    }
);

OpenAIResponse response = await client.CreateResponseAsync(
    userInputText: "What's the optimal strategy to win at poker?",
    new ResponseCreationOptions()
    {
        ReasoningOptions = new ResponseReasoningOptions()
        {
            ReasoningEffortLevel = ResponseReasoningEffortLevel.High,
            ReasoningSummaryVerbosity = ResponseReasoningSummaryVerbosity.Auto,
        },
    });

// Get the reasoning summary from the first OutputItem (ReasoningResponseItem)
Console.WriteLine("=== Reasoning Summary ===");
foreach (var item in response.OutputItems)
{
    if (item is ReasoningResponseItem reasoningItem)
    {
        foreach (var summaryPart in reasoningItem.SummaryParts)
        {
            if (summaryPart is ReasoningSummaryTextPart textPart)
            {
                Console.WriteLine(textPart.Text);
            }
        }
    }
}

Console.WriteLine("\n=== Assistant Response ===");
// Get the assistant's output
Console.WriteLine(response.GetOutputText());
```

## Pythonラーク

GPT-5 シリーズ推論モデルには、 `custom_tool` と呼ばれる新しい `lark_tool` を呼び出す機能があります。 このツールは、 [Pythonラーク](https://github.com/lark-parser/lark) に基づいており、モデル出力のより柔軟な制約に使用できます。

### レスポンスAPI

JSON

```json
{
  "model": "gpt-5-2025-08-07",
  "input": "please calculate the area of a circle with radius equal to the number of 'r's in strawberry",
  "tools": [
    {
      "type": "custom",
      "name": "lark_tool",
      "format": {
        "type": "grammar",
        "syntax": "lark",
        "definition": "start: QUESTION NEWLINE ANSWER\nQUESTION: /[^\\n?]{1,200}\\?/\nNEWLINE: /\\n/\nANSWER: /[^\\n!]{1,200}!/"
      }
    }
  ],
  "tool_choice": "required"
}
```

**Microsoft Entra ID:**

Python

```python
from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), "https://ai.azure.com/.default"
)

client = OpenAI(  
  base_url = "https://YOUR-RESOURCE-NAME.openai.azure.com/openai/v1/",  
  api_key=token_provider,
)

response = client.responses.create(  
    model="gpt-5",  # replace with your model deployment name  
    tools=[  
        {  
            "type": "custom",
            "name": "lark_tool",
            "format": {
                "type": "grammar",
                "syntax": "lark",
                "definition": "start: QUESTION NEWLINE ANSWER\nQUESTION: /[^\\n?]{1,200}\\?/\nNEWLINE: /\\n/\nANSWER: /[^\\n!]{1,200}!/"
            }
        }  
    ],  
    input=[{"role": "user", "content": "Please calculate the area of a circle with radius equal to the number of 'r's in strawberry"}],  
)  

print(response.model_dump_json(indent=2))
```

**API キー:**

Python

```python
import os
from openai import OpenAI

client = OpenAI(  
  base_url = "https://YOUR-RESOURCE-NAME.openai.azure.com/openai/v1/",
  api_key=os.getenv("AZURE_OPENAI_API_KEY")  
)

response = client.responses.create(  
    model="gpt-5",  # replace with your model deployment name  
    tools=[  
        {  
            "type": "custom",
            "name": "lark_tool",
            "format": {
                "type": "grammar",
                "syntax": "lark",
                "definition": "start: QUESTION NEWLINE ANSWER\nQUESTION: /[^\\n?]{1,200}\\?/\nNEWLINE: /\\n/\nANSWER: /[^\\n!]{1,200}!/"
            }
        }  
    ],  
    input=[{"role": "user", "content": "Please calculate the area of a circle with radius equal to the number of 'r's in strawberry"}],  
)  

print(response.model_dump_json(indent=2))
```

**出力**:

JSON

```json
{
  "id": "resp_689a0cf927408190b8875915747667ad01c936c6ffb9d0d3",
  "created_at": 1754926332.0,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "metadata": {},
  "model": "gpt-5",
  "object": "response",
  "output": [
    {
      "id": "rs_689a0cfd1c888190a2a67057f471b5cc01c936c6ffb9d0d3",
      "summary": [],
      "type": "reasoning",
      "encrypted_content": null,
      "status": null
    },
    {
      "id": "msg_689a0d00e60c81908964e5e9b2d6eeb501c936c6ffb9d0d3",
      "content": [
        {
          "annotations": [],
          "text": ""strawberry" has 3 r's, so the radius is 3.\nArea = πr<sup>2</sup> = π × 3<sup>2</sup> = 9π ≈ 28.27 square units.",
          "type": "output_text",
          "logprobs": null
        }
      ],
      "role": "assistant",
      "status": "completed",
      "type": "message"
    }
  ],
  "parallel_tool_calls": true,
  "temperature": 1.0,
  "tool_choice": "auto",
  "tools": [
    {
      "name": "lark_tool",
      "parameters": null,
      "strict": null,
      "type": "custom",
      "description": null,
      "format": {
        "type": "grammar",
        "definition": "start: QUESTION NEWLINE ANSWER\nQUESTION: /[^\\n?]{1,200}\\?/\nNEWLINE: /\\n/\nANSWER: /[^\\n!]{1,200}!/",
        "syntax": "lark"
      }
    }
  ],
  "top_p": 1.0,
  "background": false,
  "max_output_tokens": null,
  "max_tool_calls": null,
  "previous_response_id": null,
  "prompt": null,
  "prompt_cache_key": null,
  "reasoning": {
    "effort": "medium",
    "generate_summary": null,
    "summary": null
  },
  "safety_identifier": null,
  "service_tier": "default",
  "status": "completed",
  "text": {
    "format": {
      "type": "text"
    }
  },
  "top_logprobs": null,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 139,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens": 240,
    "output_tokens_details": {
      "reasoning_tokens": 192
    },
    "total_tokens": 379
  },
  "user": null,
  "content_filters": null,
  "store": true
}
```

### チャットの完了

JSON

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Which one is larger, 42 or 0?"
    }
  ],
  "tools": [
    {
      "type": "custom",
      "name": "custom_tool",
      "custom": {
        "name": "lark_tool",
        "format": {
          "type": "grammar",
          "grammar": {
            "syntax": "lark",
            "definition": "start: QUESTION NEWLINE ANSWER\nQUESTION: /[^\\n?]{1,200}\\?/\nNEWLINE: /\\n/\nANSWER: /[^\\n!]{1,200}!/"
          }
        }
      }
    }
  ],
  "tool_choice": "required",
  "model": "gpt-5-2025-08-07"
}
```

## 可用性

### リージョンの可用性

| モデル | 地域 | 制限付きアクセス |
| --- | --- | --- |
| `gpt-5.6-sol` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 クォータレベルに応じて、 [クォータ](https://learn.microsoft.com/ja-jp/azure/foundry/openai/quotas-limits) 要求が必要です。 レベル 5 と階層 6 のサブスクリプションには、既定でクォータがあります。 |
| `gpt-5.6-terra` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 クォータレベルに応じて、 [クォータ](https://learn.microsoft.com/ja-jp/azure/foundry/openai/quotas-limits) 要求が必要です。 レベル 5 と階層 6 のサブスクリプションには、既定でクォータがあります。 |
| `gpt-5.6-luna` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 クォータレベルに応じて、 [クォータ](https://learn.microsoft.com/ja-jp/azure/foundry/openai/quotas-limits) 要求が必要です。 レベル 5 と階層 6 のサブスクリプションには、既定でクォータがあります。 |
| `gpt-chat-latest` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 |
| `gpt-5.5` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 クォータレベルに応じて、 [クォータ](https://learn.microsoft.com/ja-jp/azure/foundry/openai/quotas-limits) 要求が必要です。 レベル 5 と階層 6 のサブスクリプションには、既定でクォータがあります。 |
| `gpt-5.4-mini` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 |
| `gpt-5.4-nano` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 |
| `gpt-5.4-pro` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `gpt-5.4` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `gpt-5.3-codex` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `gpt-5.2-codex` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `gpt-5.2` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `gpt-5.1-codex-max` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `gpt-5.1` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `gpt-5.1-chat` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 |
| `gpt-5.1-codex` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `gpt-5.1-codex-mini` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 |
| `gpt-5-pro` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `gpt-5-codex` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `gpt-5` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `gpt-5-mini` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 |
| `gpt-5-nano` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 |
| `o3-pro` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `codex-mini` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | アクセス要求は必要ありません。 |
| `o4-mini` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `o3` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `o3-mini` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |
| `o1` | [モデルの可用性](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability?pivots=standard) | このモデルでは、アクセスが制限されなくなりました。 |

## API と機能のサポート

入力と出力の制限は、使用可能なコンテキスト予算を共有し、加法的ではありません。 詳細と GPT-5.5 の計算例については、「 [モデル トークンの制限](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure?pivots=azure-openai#understand-model-token-limits) と [応答 API トークンの予算](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure?pivots=azure-openai#responses-api-token-budget) について」を参照してください。

- [GPT-5 推論モデル](#tabpanel_4_gpt-5)
- [O シリーズ推論モデル](#tabpanel_4_o-series)

| **機能** | **gpt-5.6-sol**, **2026-06-25** | **gpt-5.6-terra** 、 **2026-06-25** | **gpt-5.6-luna**, **2026-06-25** | **gpt-5.5** 、 **2026-04-24** | **gpt-5.4-nano** 、 **2026-03-17** | **gpt-5.4-mini** 、 **2026-03-17** | **gpt-5.4-pro** | **gpt-5.4** 、 **2026-03-05** | **gpt-5.3-codex**, **2026-02-24** | **gpt-5.2-codex,2026-01-14** | **gpt-5.2** 、 **2025-12-11** | **gpt-5.1-codex-max** 、 **2025-12-04** | **gpt-5.1** 、 **2025-11-13** | **gpt-5.1-chat, 2025年11月13日** | **gpt-5.1-codex** 、 **2025-11-13** | **gpt-5.1-codex-mini**, **2025-11-13** | **gpt-5-pro** 、 **2025-10-06** | **gpt-5-codex**, **2025-09-011** | **gpt-5** 、 **2025-08-07** | **gpt-5-mini** 、 **2025-08-07** | **gpt-5-nano** 、 **2025-08-07** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **[開発者メッセージ](#developer-messages)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **[構造化された出力](https://learn.microsoft.com/ja-jp/azure/foundry/openai/how-to/structured-outputs)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |
| **[コンテキスト ウィンドウ](https://learn.microsoft.com/ja-jp/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure#o-series-models)** | 1,050,000      入力：   922,000   出力：   128,000 | 1,050,000      入力：   922,000   出力：   128,000 | 1,050,000      入力：   922,000   出力：   128,000 | 1,050,000      入力：   922,000   出力：   128,000 | 400,000      入力: 272,000   出力: 128,000 | 400,000      入力: 272,000   出力: 128,000 | 1,050,000      入力：   922,000   出力：   128,000 | 1,050,000      入力：   922,000   出力：   128,000 | 400,000      入力: 272,000   出力: 128,000 | 400,000      入力: 272,000   出力: 128,000 | 400,000      入力: 272,000   出力: 128,000 | 400,000      入力: 272,000   出力: 128,000 | 400,000      入力: 272,000   出力: 128,000 | 128,000      入力: 111,616   出力: 16,384 | 400,000      入力: 272,000   出力: 128,000 | 400,000      入力: 272,000   出力: 128,000 | 400,000      入力: 272,000   出力: 128,000 | 400,000      入力: 272,000   出力: 128,000 | 400,000      入力: 272,000   出力: 128,000 | 400,000      入力: 272,000   出力: 128,000 | 400,000      入力: 272,000   出力: 128,000 |
| **[推論作業](#reasoning-effort)** <sup>7</sup> | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ <sup>6</sup> | ✅ <sup>4</sup> | ✅ | ✅ | ✅ | ✅ <sup>5</sup> | ✅ | ✅ | ✅ | ✅ |
| **[画像入力](https://learn.microsoft.com/ja-jp/azure/foundry/openai/how-to/gpt-with-vision)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| チャット完了 API | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | \- | ✅ | \- | \- | ✅ | \- | ✅ | ✅ | \- | \- | \- | \- | ✅ | ✅ | ✅ |
| レスポンスAPI | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |
| 関数/ツール | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |
| 並列ツール呼び出し <sup>1</sup> | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | \- | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | \- | ✅ | ✅ | ✅ | ✅ |
| `max_completion_tokens` <sup>2</sup> | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | \- | ✅ | \- | \- | ✅ | \- | ✅ | ✅ | \- | \- | \- | \- | ✅ | ✅ | ✅ |
| システム メッセージ <sup>3</sup> | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| [推論の概要](#reasoning-summary) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ストリーミング | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | \- | ✅ | ✅ | ✅ | ✅ |  |  |  |

<sup>1 並列</sup> ツール呼び出しは、 `reasoning_effort` が `minimal` に設定されている時はサポートされていません。  
  
<sup>2</sup> 理由モデルは、Chat Completions API を使用する場合にのみ、 `max_completion_tokens` パラメーターで動作します。 Responses API で `max_output_tokens` を使用します。  
  
<sup>3</sup> 最新の推論モデルでは、移行を容易にするシステム メッセージがサポートされています。 開発者メッセージとシステム メッセージの両方を同じ API 要求で使用しないでください。  
  
<sup>4</sup> `gpt-5.1` `reasoning_effort` の既定値は `none` です。 以前の推論モデルから `gpt-5.1` にアップグレードするときは、reasoning\_effortを実行する場合は、reasoning\_effort レベルを明示的に渡すようにコードを更新する必要がある場合があることに注意してください。  
  
<sup>5</sup> `gpt-5-pro` は `reasoning_effort` `high` のみをサポートします。これは、モデルに明示的に渡されない場合でも既定値です。  
  
<sup>6</sup> `gpt-5.1-codex-max` は、推論作業を設定できる最高レベルの `reasoning_effort` の新しい `xhigh` レベルのサポートを追加します。  
  
<sup>7</sup> `gpt-5.6` 、 `gpt-5.5` 、 `gpt-5.4` 、 `gpt-5.2` 、 `gpt-5.1` 、 `gpt-5.1-codex` 、 `gpt-5.1-codex-max` 、および `gpt-5.1-codex-mini` は、 `'None'` パラメーターの値として `reasoning_effort` をサポートします。 これらのモデルを使用して、推論せずに応答を生成するには、 `reasoning_effort='None'` 設定します。 この設定により、速度が向上する可能性があります。

### 新しい GPT-5 推論機能

| 機能 | 説明 |
| --- | --- |
| `reasoning_effort` | `max` は、 `gpt-5.6` および Responses API でのみサポートされます   `xhigh` は、 `gpt-5.6` 、 `gpt-5.5` 、 `gpt-5.4` 、および `gpt-5.1-codex-max` でのみサポートされています   `minimal` は、元の GPT-5 推論モデルでのみサポートされています。 `minimal` `gpt-5.1` 以上ではサポートされていません <sup>*</sup>      **オプション**: `none` 、 `minimal` 、 `low` 、 `medium` 、 `high` 、 `xhigh` |
| `verbosity` | モデルの出力の簡潔さをきめ細かく制御できる新しいパラメーター。      **Options:**`low` 、 `medium` 、 `high` 。 |
| `preamble` | GPT-5 シリーズ推論モデルには、関数/ツール呼び出しを実行する前に、追加の時間 *を "思考"* する機能があります。      この計画が行われると、モデルは、 `preamble` オブジェクトと呼ばれる新しいオブジェクトを介して、モデル応答の計画手順に関する分析情報を提供できます。      モデル応答でのプリアンブルの生成は保証されませんが、 `instructions` パラメーターを使用して、「各関数呼び出しの前に広範囲に計画する必要があります。」といったコンテンツを渡すことでモデルを促すことができます。 関数を呼び出す前に、常にプランをユーザーに出力します" |
| **許可されているツール** | `tool_choice` では、1 つではなく、複数のツールを指定できます。 |
| **カスタム ツールの種類** | 生テキスト (json 以外) の出力を有効にします |
| [`lark_tool`](#python-lark) | モデルの応答をより柔軟に制限するために、 [Pythonラーク](https://github.com/lark-parser/lark) の機能の一部を使用できます。 |

<sup>*</sup> `gpt-5-codex` また、 `reasoning_effort` `minimal` もサポートしていません。

詳細については、OpenAI の [GPT-5 プロンプト クックブック ガイド](https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide) とその [GPT-5 機能ガイド](https://platform.openai.com/docs/guides/latest-model) も読むことをお勧めします。

### サポートされていません

推論モデルでは、現在サポートされていないのは次のとおりです。

- `temperature` 、 `top_p` 、 `presence_penalty` 、、 `frequency_penalty` 、 `logprobs` 、 `top_logprobs` 、 `logit_bias` 、 `max_tokens`

## Markdown の出力

既定では、 `o3-mini` モデルと `o1` モデルは、マークダウンの書式設定を含む出力の生成を試みません。 この動作が望ましくない一般的なユース ケースは、モデルでマークダウン コード ブロック内に含まれるコードを出力する場合です。 モデルがマークダウンの書式設定なしで出力を生成すると、構文の強調表示や対話型プレイグラウンド エクスペリエンスのコピー可能なコード ブロックなどの機能が失われます。 この新しい既定の動作をオーバーライドし、モデルの応答にマークダウンを含めることを推奨するには、開発者メッセージの先頭に文字列 `Formatting re-enabled` を追加します。

開発者メッセージの先頭に `Formatting re-enabled` を追加しても、モデルがその応答にマークダウン書式を含めるという保証はありません。これは可能性を高めるだけです。 内部テストから、 `Formatting re-enabled` は `o1` よりも `o3-mini` モデルではそれ自体の効果が低いことがわかりました。

`Formatting re-enabled` のパフォーマンスを向上させるために、開発者メッセージの先頭をさらに拡張すると、多くの場合、必要な出力が生成されます。 開発者メッセージの先頭に `Formatting re-enabled` を追加するだけでなく、次の例のように、よりわかりやすい初期命令を追加することもできます。

- `Formatting re-enabled - please enclose code blocks with appropriate markdown tags.`
- `Formatting re-enabled - code output should be wrapped in markdown.`

予想される出力によっては、最初の開発者メッセージをさらにカスタマイズして、特定のユース ケースをターゲットにする必要がある場合があります。

**注:** 作成者は AI の支援の下、この記事を作成しました。 [詳細情報](https://learn.microsoft.com/principles-for-ai-generated-content)