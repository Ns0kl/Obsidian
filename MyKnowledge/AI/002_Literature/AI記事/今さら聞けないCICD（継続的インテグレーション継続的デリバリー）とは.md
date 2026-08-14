---
title: "今さら聞けないCI/CD（継続的インテグレーション/継続的デリバリー）とは"
source: "https://qiita.com/shinkai_/items/13e76a5641d9ec9a41d2"
author:
  - "[[shinkai_]]"
published: 2023-06-18
created: 2026-08-13
description: "はじめに ここ数年で一般的になってきたソフトウェア開発のプロセスである「CI/CD」ですが、なんとなく知ってはいるけどちゃんと理解しているわけではない・・・という方もいるかと思います。 今回はCI/CDの特徴と、その重要性についてわかりやすく説明したいと思います。 CI..."
tags:
  - "clippings"
---
この記事は最終更新日から3年以上が経過しています。

[お題は不問！Qiita Engineer Festa 2023で記事投稿！](https://qiita.com/official-events/4f3daca63fb78f16df0b)

- [継続的デリバリー](https://qiita.com/tags/%e7%b6%99%e7%b6%9a%e7%9a%84%e3%83%87%e3%83%aa%e3%83%90%e3%83%aa%e3%83%bc)
- [初心者](https://qiita.com/tags/%e5%88%9d%e5%bf%83%e8%80%85)
- [初心者向け](https://qiita.com/tags/%e5%88%9d%e5%bf%83%e8%80%85%e5%90%91%e3%81%91)
- [継続的インテグレーション](https://qiita.com/tags/%e7%b6%99%e7%b6%9a%e7%9a%84%e3%82%a4%e3%83%b3%e3%83%86%e3%82%b0%e3%83%ac%e3%83%bc%e3%82%b7%e3%83%a7%e3%83%b3)
- [CICD](https://qiita.com/tags/cicd)

107

最終更新日 投稿日 2023年06月18日

## はじめに

ここ数年で一般的になってきたソフトウェア開発のプロセスである「 **CI/CD** 」ですが、なんとなく知ってはいるけどちゃんと理解しているわけではない・・・という方もいるかと思います。  
今回はCI/CDの特徴と、その重要性についてわかりやすく説明したいと思います。

## CI/CDとは

CI/CDとは「Continuous Integration（継続的インテグレーション）/ Continuous Delivery（継続的デリバリー）」の略称です。  
CI/CDは、ソフトウェアのマージからリリースまでの自動化された一連のプロセスを指します。

今までの開発では変更のマージやビルド、テスト、デプロイとリリースを手動でやっていました。  
それらを自動化することで、ソフトウェア開発が効率化され、品質が上がり、リリース速度の向上を期待できます。

**マージをCIの範囲に含めるか**  
変更のマージはバージョン管理システム（リポジトリ）自体の機能であり、CIの対象から除外する考え方もありますが、今回はマージ処理も自動化された継続的インテグレーションの一部として説明します。

## CI（継続的インテグレーション）とは

CI（継続的インテグレーション）は、変更のマージ、ビルド、およびテストを自動化することを指します。  
自動化されたビルドとテストにより、開発者は手動での作業やテストの重複を省くことができ、効率的な開発プロセスを実現します。  
具体的な手順としては、開発者がコードをリポジトリにコミットすると変更がマージされ、CIサーバー（もしくはCIのクラウドサービス）が自動的にビルドを実行し、コンパイルエラーやビルドの問題を検出します。  
その後、自動化されたテストスイート（テストの目的や対象ごとに複数のテストケースをまとめたもの）が実行され、テストの結果がレポートされます。

## CD（継続的デリバリー）とは

CD（継続的デリバリー）は、CIを含む概念であり、変更のマージからリリースまでを自動化することを指します。

まず、開発者がコミットしたコードが自動的にマージ、ビルド、テストされ、リリースの準備ができた状態に保たれます。  
そして、人による操作をトリガーとして自動的にデプロイとリリースが行われます。

**継続的デリバリーと継続的デプロイメント**  
一般的にCI/CDのCDは継続的デリバリーのことを指しますが、CDは継続的デリバリーと継続的デプロイメントの両方を表す言葉として使われています。

継続的デリバリーではデプロイとリリースのトリガーは手動ですが、継続的デプロイメントでは手動によるトリガーを必要とせず、自動的に本番環境にリリースされます。

## CI/CDのイメージ

図にするとこうなります。CDはCIを含んだ概念です。

[![CICD_____.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1203022/5f5cd89d-1f5b-ced8-4493-6938609c65b3.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F1203022%2F5f5cd89d-1f5b-ced8-4493-6938609c65b3.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=28db69ccc0994b42fc04e2a893ead4b1)

※参考までに  
下記図のように、CDをデプロイとリリースだけに絞って説明しているサイトもあります。  
どちらかが間違いということではなく、CIはマージ～テストまでに重きを置いた概念で、CDはデプロイ～リリースに重きを置いた概念であることには変わはありません。

[![CICD___.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1203022/f1f4984b-bd19-798b-089c-e4a347ad583a.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F1203022%2Ff1f4984b-bd19-798b-089c-e4a347ad583a.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=a30df8c2ab7c128d86bb3e11f4566ec6)

**この章のまとめ**  
CI（継続的インテグレーション）は、変更のマージ、ビルド、およびテストを自動化すること。  
CD（継続的デリバリー）は、CIで行う変更のマージ、ビルド、およびテストに追加してデプロイとリリースを自動化すること。

CDは人の操作をトリガーとしてデプロイとリリースが行われる。

ややこしいことに、CDは継続的デリバリーと継続的デプロイメントの両方を表す言葉。

## CI/CDのメリット

CI/CDのメリットを紹介します。  
デメリットはコストがかかることと、テストとリリースを行う頻度が少ないシステムの場合にメリットを享受できないことくらいなので、今回はメリットのみ説明します。  
もし、実際にCI/CDを導入してデメリットを感じた方がいらっしゃったらコメントで教えてください。

## 作業の簡素化

今まで手動で行っていた作業が自動化されることで、アプリケーションを作成してからリリースするまでの作業が圧倒的に簡素化されます。

## ヒューマンエラーの減少

通常コード変更時のマージ、ビルド、テスト、デプロイ、リリースには様々な手順が存在します。  
手順が多い分、ヒューマンエラー（人間が思い違いや確認不足によって起こすミスや事故）が発生する可能性が常にありました。  
CI/CDを導入することで、そもそも手作業が減るため、ヒューマンエラーが減少します。

## リリース速度の向上

以前までのリリース作業は手順も多く、手順の確認として事前にリリースのリハーサルを行うこともあるほどでした。  
CI/CDを導入することで、変更したコードのコミットによって自動的にビルド、テスト、デプロイされるため、リリースまでの時間が大幅に短縮されます。

## バグの早期発見

コミットのたびにテストが実行されるため、バグを早期に発見して対処できます。  
通常、後工程になればなるほど手戻りが大きくなり、バグの影響は大きくなります。

**この章のまとめ**  
CI/CDを導入することで、作業が簡素化されてリリース速度の向上やヒューマンエラーの減少が見込める。  
コミットのたびにテストが実行されるため、バグの早期発見も期待できる。

## 代表的なCI/CDツール

様々な会社がCI/CDツール（サービス）を提供しています。

## オンプレミス型のCI/CDツール

- Jenkins
- Concourse CI
- Drone

## クラウド型のCI/CDツール

- GitLab
- Travis CI
- CircleCI
- Wercker
- AWS CodeBuild
- Azure Pipelines
- GCP Cloud Build

## さいごに

アジャイル開発の台頭とともに、ソフトウェア開発の世界はますます迅速さと効率性を求められるようになりました。  
その中で、CI/CDは現代の開発プロセスにおいて重要な役割を果たしています。

**最近よく聞くけど今さら聞けない技術用語** について、いくつか記事を書いています。  
良かったらそちらもご覧ください。

<iframe src="https://qiita.com/embed-contents/link-card#qiita-embed-content__a80e0f661e7c94e7d68a18fd42df3a69" frameborder="0" height="113"></iframe>

<iframe src="https://qiita.com/embed-contents/link-card#qiita-embed-content__87f7ad728a10ec29addeec19882f49c2" frameborder="0" height="113"></iframe>

<iframe src="https://qiita.com/embed-contents/link-card#qiita-embed-content__0b2b1c048ff44bbd2395e5b92e6581d4" frameborder="0" height="113"></iframe>

<iframe src="https://qiita.com/embed-contents/link-card#qiita-embed-content__1de586332667ec41e83001906b772e4d" frameborder="0" height="113"></iframe>

<iframe src="https://qiita.com/embed-contents/link-card#qiita-embed-content__18a0cf2beedb1119e414da04dab00417" frameborder="0" height="113"></iframe>

## 参考

[AWS - 継続的デリバリーとは?](https://aws.amazon.com/jp/devops/continuous-delivery/)

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