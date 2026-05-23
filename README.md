# 勤怠管理アプリ

## サービス概要

ある企業が開発した独自の勤怠管理アプリです。  
ユーザーの勤怠管理を目的としたWebアプリケーションです。

## 制作の目的

ユーザーの出勤・退勤・休憩・勤怠修正申請などを管理し、管理者が勤怠状況を確認・承認できる仕組みを構築します。

## ターゲットユーザー

社会人全般

## 対応ブラウザ

- Google Chrome 最新版
- Firefox 最新版
- Safari 最新版

## 作業範囲

- 設計
- コーディング
- テスト

## 使用技術

### バックエンド

- PHP 8.3
- Laravel 13
- Laravel Sanctum（API認証）
- Laravel Fortify（認証機能）

### フロントエンド

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- Axios

### インフラ・開発環境

- Docker
- Nginx
- MySQL 8.0
- phpMyAdmin
- MailHog

### その他

- GitHub

## 開発環境

ローカル環境は Docker を使用して構築します。

### 環境構築手順

1. リポジトリをクローン

```bash
git clone <リポジトリURL>
cd attendance-management-app-by-react
```

2. 環境変数ファイルを作成

```bash
cp api/.env.example api/.env
```

3. Docker コンテナを起動

```bash
docker compose up -d
```

4. Composer パッケージをインストール

```bash
docker compose exec php composer install
```

5. アプリケーションキーを生成

```bash
docker compose exec php php artisan key:generate
```

6. マイグレーション・シーダーを実行

```bash
docker compose exec php php artisan migrate --seed
```

### アクセスURL

| サービス                    | URL                   |
| --------------------------- | --------------------- |
| フロントエンド（React）     | http://localhost:5173 |
| バックエンド（Laravel API） | http://localhost:8000 |
| phpMyAdmin                  | http://localhost:8080 |
| MailHog                     | http://localhost:8025 |

## 納品方法

GitHub リポジトリ共有
