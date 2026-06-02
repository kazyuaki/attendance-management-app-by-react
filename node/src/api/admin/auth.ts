// api/src/admin/auth.ts
/**
 * 管理者認証API関数を定義するモジュール
 * このモジュールでは、管理者のログインと認証されたユーザー情報の取得に関連する関数を提供します。
 */
import { adminApi, sanctumApi } from "../../api/http";

export type AdminLoginParams = {
  email: string;
  password: string;
};

/**
 * 管理者ログイン関数
 * @param params - 管理者のログイン情報（メールアドレスとパスワード）
 * @returns ログイン成功時のレスポンスデータ
 */
export const adminLogin = async (params: AdminLoginParams) => {
  // CSRF Cookie取得
  await sanctumApi.get("/sanctum/csrf-cookie");
  // 管理者ログインAPI実行
  const response = await adminApi.post("/login", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

/**
 * 認証された管理者ユーザーの情報を取得する関数
 * @returns 認証された管理者ユーザーの情報
 */
export const getAdminUser = async () => {
  const response = await adminApi.get("/user");
  return response.data;
};

/**
 * 管理者ログアウト関数
 * @returns ログアウト成功時のレスポンスデータ
 */
export const adminLogout = async () => {
  const response = await adminApi.post("/logout", {});

  return response.data;
};
