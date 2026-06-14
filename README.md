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

## 主な機能

### 一般ユーザー

- 会員登録・ログイン・ログアウト
- メール認証
- 出勤・退勤打刻
- 休憩開始・休憩終了打刻
- 月次勤怠一覧の確認
- 勤怠詳細の確認
- 勤務時間・休憩時間・備考の修正申請
- 修正申請一覧の確認
- 差し戻し理由の確認
- 差し戻し後の再申請

### 管理者

- 管理者ログイン・ログアウト
- 日別勤怠一覧の確認
- 勤怠詳細の確認・更新
- スタッフ一覧の確認
- スタッフ別の月次勤怠一覧の確認
- 申請一覧の確認
- 申請詳細の確認
- 勤怠修正申請の承認
- 勤怠修正申請の差し戻し

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

※ React 側の依存パッケージは `node` コンテナ起動時に `npm install` が実行されます。

### アクセスURL

| サービス                    | URL                   |
| --------------------------- | --------------------- |
| フロントエンド（React）     | http://localhost:5173 |
| バックエンド（Laravel API） | http://localhost:8000 |
| phpMyAdmin                  | http://localhost:8080 |
| MailHog                     | http://localhost:8025 |

### 画面URL

| 画面             | URL                         |
| ---------------- | --------------------------- |
| ユーザーログイン | http://localhost:5173/login |
| ユーザー申請一覧 | http://localhost:5173/request |
| 管理者ログイン   | http://localhost:5173/admin/login |
| 管理者申請一覧   | http://localhost:5173/admin/requests |

### テスト用ログイン情報

#### 一般ユーザー

| 名前        | メールアドレス          | パスワード  |
| ----------- | ----------------------- | ----------- |
| 山田 太郎   | yamada@attendance.com   | Password123 |
| 佐藤 花子   | sato@attendance.com     | Password123 |
| 鈴木 一郎   | suzuki@attendance.com   | Password123 |

#### 管理者

| 名前    | メールアドレス     | パスワード |
| ------- | ------------------ | ---------- |
| 管理者A | adminA@attendance.com | PasswordA123 |
| 管理者B | adminB@attendance.com | PasswordB123 |

## よく使うコマンド

### Docker

```bash
docker compose up -d
docker compose down
```

### バックエンド

```bash
docker compose exec php php artisan migrate:fresh --seed
docker compose exec php php artisan test
```

### フロントエンド

```bash
docker compose exec node npm run lint
docker compose exec node npm run build
```

## 納品方法

GitHub リポジトリ共有
