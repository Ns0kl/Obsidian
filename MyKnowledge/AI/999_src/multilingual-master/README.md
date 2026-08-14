# 多言語環境

# コンテナ立上
docker-compose up -d 


# GitHub
# 新規リポジトリ作成
# 手順1: GitHubで新しいリポジトリ作成
# 手順2: Clone URL をコピー
# 手順3: ローカルの任意のディレクトリ
        git clone (Clone URL)
# 手順4: add したい フォルダ・ファイルを配置
# 手順5: ファーストコミット/リモートブランチ(main)へのpush
        ```
        git add .
        git commit -m "first commit Comment"
        git puah origin main
        ```

# キャッシュ削除
docker builder prune -f