### React

## ビルド
docker-compose build

## Reactアプリ構築
docker-compose run --rm react-app sh -c "npm install -g create-react-app && create-react-app reactapp"

## コンテナ起動
    docker-compose up -d

## GitHub
## 新規リポジトリ作成
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