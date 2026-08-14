---
title: "【深層学習】Attention機構の理論と実装に入門する | 機械学習と情報技術"
source: "https://disassemble-channel.com/deep-learning-attention/"
author:
published: 2022-12-01
created: 2026-08-12
description:
tags:
  - "clippings"
---
## 【深層学習】Attention機構の理論と実装に入門する

Attention機構は、入力データに対して「注目すべき箇所」を動的に特定する仕組みです。2017年のTransformer論文「Attention Is All You Need」で注目を集め、現在では自然言語処理(NLP)、画像認識、音声処理など、深層学習のあらゆる分野で利用されています。

機械学習、人工知能

本記事では、Attention機構の基本であるQuery(Q)、Key(K)、Value(V)の概念から、Scaled Dot-Product AttentionとMulti-Head Attentionの [数学](#) 的定式化とPyTorchでの実装を解説します。

本記事の内容

- Attention機構のQuery, Key, Valueの概念
- Scaled Dot-Product Attentionの数学的定義
- Multi-Head Attentionの構造
- Self-Attentionの仕組み
- PyTorchでの実装

## 前提知識

この記事を読む前に、以下の概念を押さえておくと理解が深まります。

- ニューラルネットワークの基礎
- 行列演算（行列積、softmax関数）

## Attentionの基本概念

### Query, Key, Valueの直感

Attentionは「検索」に例えるとわかりやすいです。

- **Query (Q)**: 「何を探しているか」（検索クエリ）
- **Key (K)**: 「各要素の見出し」（検索対象のインデックス）
- **Value (V)**: 「各要素の内容」（検索対象の値）

QueryとKeyの類似度を計算し、類似度が高いKeyに対応するValueを重み付き平均で取得します。

## Scaled Dot-Product Attention


最も基本的なAttentionの定式化です。

$$
\text{Attention}(\bm{Q}, \bm{K}, \bm{V}) = \text{softmax}\left(\frac{\bm{Q}\bm{K}^T}{\sqrt{d_k}}\right)\bm{V}
$$

ここで、

- $\bm{Q} \in \mathbb{R}^{n \times d_k}$: Queryの行列（ $n$ はクエリ数）
- $\bm{K} \in \mathbb{R}^{m \times d_k}$: Keyの行列（ $m$ は要素数）
- $\bm{V} \in \mathbb{R}^{m \times d_v}$: Valueの行列
- $d_k$: Keyの次元数

### なぜ dk\\sqrt{d\_k} で割るのか

$\bm{Q}\bm{K}^T$ の各要素は、 $d_k$ 個の要素の内積です。 $Q$, $K$ の各要素が平均0、分散1に従うとき、内積の分散は $d_k$ になります。

$$
\text{Var}(\bm{q}^T\bm{k}) = d_k
$$

$d_k$ が大きいと内積の値が大きくなり、softmaxが飽和して勾配が消失します。 $\sqrt{d_k}$ で割ることで分散を1に正規化し、学習を安定させます。

教育用教材、資料

### Attention重みの計算過程

$$
\bm{A} = \frac{\bm{Q}\bm{K}^T}{\sqrt{d_k}} \in \mathbb{R}^{n \times m}
$$



$$
\bm{W} = \text{softmax}(\bm{A}) \in \mathbb{R}^{n \times m}
$$

$$
\text{Output} = \bm{W}\bm{V} \in \mathbb{R}^{n \times d_v}
$$

$\bm{W}$ の各行は確率分布（和が1）になっており、各Queryが各Valueにどれだけ「注目」しているかを表します。

## Multi-Head Attention

1つのAttentionだけでは、複数の異なる観点での「注目」を同時に学習できません。Multi-Head Attentionは、複数のAttentionヘッドを並列に計算し、結果を連結します。

教育用教材、資料

$$
\text{MultiHead}(\bm{Q}, \bm{K}, \bm{V}) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)\bm{W}^O
$$

$$
\text{head}_i = \text{Attention}(\bm{Q}\bm{W}_i^Q, \bm{K}\bm{W}_i^K, \bm{V}\bm{W}_i^V)
$$

- $\bm{W}_i^Q \in \mathbb{R}^{d_{\text{model}} \times d_k}$
- $\bm{W}_i^K \in \mathbb{R}^{d_{\text{model}} \times d_k}$
- $\bm{W}_i^V \in \mathbb{R}^{d_{\text{model}} \times d_v}$
- $\bm{W}^O \in \mathbb{R}^{hd_v \times d_{\text{model}}}$

各ヘッドは異なる射影を学習し、異なる関係性（構文的、意味的など）を捉えることができます。


## Self-Attention

Self-Attentionは、Q, K, Vが全て同じ入力から生成される場合です。入力系列の各要素が、系列内の他の全ての要素との関連度を計算します。

入力 $\bm{X} \in \mathbb{R}^{n \times d_{\text{model}}}$ に対して、

$$
\bm{Q} = \bm{X}\bm{W}^Q, \quad \bm{K} = \bm{X}\bm{W}^K, \quad \bm{V} = \bm{X}\bm{W}^V
$$


これにより、「文中の各単語が他のどの単語に関連しているか」を学習できます。

教育用教材、資料

## PyTorchでの実装

```python
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import matplotlib.pyplot as plt

torch.manual_seed(42)

# --- Scaled Dot-Product Attention ---
class ScaledDotProductAttention(nn.Module):
    def __init__(self):
        super().__init__()

    def forward(self, Q, K, V, mask=None):
        d_k = Q.size(-1)
        scores = Q @ K.transpose(-2, -1) / (d_k ** 0.5)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        attn_weights = F.softmax(scores, dim=-1)
        output = attn_weights @ V
        return output, attn_weights

# --- Multi-Head Attention ---
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        assert d_model % n_heads == 0
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads

        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

        self.attention = ScaledDotProductAttention()

    def forward(self, Q, K, V, mask=None):
        batch_size = Q.size(0)

        # 線形射影
        Q = self.W_q(Q).view(batch_size, -1, self.n_heads, self.d_k).transpose(1, 2)
        K = self.W_k(K).view(batch_size, -1, self.n_heads, self.d_k).transpose(1, 2)
        V = self.W_v(V).view(batch_size, -1, self.n_heads, self.d_k).transpose(1, 2)

        # Attention
        output, attn_weights = self.attention(Q, K, V, mask)

        # ヘッドの連結
        output = output.transpose(1, 2).contiguous().view(batch_size, -1, self.d_model)
        output = self.W_o(output)

        return output, attn_weights

# --- 動作確認 ---
d_model = 64
n_heads = 8
seq_len = 10
batch_size = 2

mha = MultiHeadAttention(d_model, n_heads)
x = torch.randn(batch_size, seq_len, d_model)

# Self-Attention: Q=K=V=x
output, attn_weights = mha(x, x, x)

print(f"入力: {x.shape}")
print(f"出力: {output.shape}")
print(f"Attention重み: {attn_weights.shape}")

# --- Attention重みの可視化 ---
fig, axes = plt.subplots(2, 4, figsize=(16, 8))
for i in range(8):
    ax = axes[i // 4, i % 4]
    w = attn_weights[0, i].detach().numpy()
    im = ax.imshow(w, cmap='Blues', vmin=0, vmax=0.3)
    ax.set_title(f'Head {i+1}')
    ax.set_xlabel('Key')
    ax.set_ylabel('Query')

plt.suptitle('Multi-Head Attention Weights', fontsize=14)
plt.tight_layout()
plt.show()
```

各ヘッドが異なるAttentionパターンを学習していることが可視化で確認できます。あるヘッドは近くの要素に注目し、別のヘッドは遠くの要素に注目するなど、多様な関係性を捉えています。

教育用教材、資料

## まとめ

本記事では、Attention機構の理論と実装について解説しました。

- Attentionは Query-Key-Value の枠組みで、入力の重要な部分に動的に注目する機構
- Scaled Dot-Product Attentionは $\sqrt{d_k}$ でスケーリングすることでsoftmaxの飽和を防ぐ
- Multi-Head Attentionは複数の射影を並列に計算し、異なる観点からの関係性を捉える
- Self-Attentionは系列内の各要素間の関連度を学習し、Transformerの基盤となっている

次のステップとして、以下の記事も参考にしてください。

- [PyTorchで独自(カスタム)レイヤーを実装する方法を解説](https://disassemble-channel.com/pytorch-custom-layer/)

関連タグ:

<iframe sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" frameborder="0" allow="attribution-reporting; run-ad-auction" src="https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-6300171891834787&amp;output=html&amp;adk=1812271804&amp;adf=3025194257&amp;abgtt=7&amp;lmt=1786523092&amp;plat=2%3A16777216%2C9%3A32776%2C16%3A8388608%2C17%3A32%2C24%3A32%2C25%3A32%2C30%3A1081344%2C32%3A32%2C41%3A32%2C42%3A32%2C43%3A32%2C44%3A32&amp;format=0x0&amp;url=https%3A%2F%2Fdisassemble-channel.com%2Fdeep-learning-attention%2F&amp;host=ca-host-pub-2644536267352236&amp;pra=5&amp;asro=0&amp;aimartd=4&amp;aieuf=1&amp;aicrs=1&amp;uach=WyJXaW5kb3dzIiwiMTUuMC4wIiwieDg2IiwiIiwiMTUxLjAuNDEyOS43MiIsbnVsbCwwLG51bGwsIjY0IixbWyJOb3Q9QT9CcmFuZCIsIjk5LjAuMC4wIl0sWyJNaWNyb3NvZnQgRWRnZSIsIjE1MS4wLjQxMjkuNzIiXSxbIkNocm9taXVtIiwiMTUxLjAuNzkyMi43NiJdXSwwXQ..&amp;dt=1786523092460&amp;bpp=49&amp;bdt=324&amp;idt=236&amp;shv=r20260811&amp;mjsv=m202608070101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;cookie=ID%3D8c8828ca3e84299d%3AT%3D1786523070%3ART%3D1786523070%3AS%3DALNI_MbLtI3_GNiOGD2qcSFvbWlwuCABWA&amp;gpic=UID%3D0000151c2b93807f%3AT%3D1786523070%3ART%3D1786523070%3AS%3DALNI_MZjKPINYNO4MWKHBF1nNpZ7l2yCaw&amp;eo_id_str=ID%3De0ece619fc120fda%3AT%3D1786523070%3ART%3D1786523070%3AS%3DAA-AfjYSd7Tkb2WCpubNum7MIK8U&amp;nras=1&amp;correlator=3262338644927&amp;frm=20&amp;pv=2&amp;u_tz=540&amp;u_his=2&amp;u_h=1080&amp;u_w=1920&amp;u_ah=1032&amp;u_aw=1920&amp;u_cd=24&amp;u_sd=1&amp;dmc=16&amp;adx=-12245933&amp;ady=-12245933&amp;biw=1897&amp;bih=914&amp;scr_x=0&amp;scr_y=0&amp;eid=95396139%2C95397133%2C122880349&amp;oid=2&amp;pvsid=6325254568019506&amp;tmod=639348745&amp;uas=0&amp;nvt=1&amp;fsapi=1&amp;ref=https%3A%2F%2Fwww.bing.com%2F&amp;fc=1920&amp;brdim=0%2C0%2C0%2C0%2C1920%2C0%2C1920%2C1032%2C1912%2C914&amp;vis=1&amp;rsz=%7C%7Cs%7C&amp;abl=NS&amp;fu=32768&amp;bc=31&amp;plas=221x721_l%7C249x721_r&amp;bz=1&amp;pgls=CAEQBBoHMS4xODUuMA..&amp;ifi=1&amp;uci=a!1&amp;fsb=1&amp;dtd=268" title="Advertisement" aria-label="Advertisement"></iframe>