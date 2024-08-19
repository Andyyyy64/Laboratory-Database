# ベースイメージとしてnode.jsを使用
FROM node:16

# コンテナ内のディレクトリを指定
WORKDIR /app

# package.json と package-lock.json（もしあれば）をコンテナにコピーします
# これにより、依存関係のインストールを行います
COPY package*.json ./

# 開発環境用の依存関係をインストールします
RUN npm install

# コードをコンテナにコピー
COPY . .

CMD ["npm", "run", "dev"]

# このアプリケーションがリッスンするポートを公開します
EXPOSE 3000
