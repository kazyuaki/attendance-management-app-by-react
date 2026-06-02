// src/api/user/auth.ts

import { sanctumApi, userApi } from "../../api/http";

type RegisterParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

/**
 * 会員登録を行う関数
 * @param params - 会員登録に必要なパラメータ
 * @returns 登録成功時のレスポンスデータ
 */
export const userRegister = async (params: RegisterParams) => {
  await sanctumApi.get("/sanctum/csrf-cookie");

  const response = await userApi.post("/register", params);
  return response.data;
};

/**
 * 認証メールの再送信を行う関数
 * @returns 再送信成功時のレスポンスデータ
 */
export const resendVerificationEmail = async () => {
  const response = await userApi.post("/email/verification-notification", {});
  return response.data;
};

/**
 * ログインを行う関数
 * @param email - ユーザーのメールアドレス
 * @param password - ユーザーのパスワード
 * @returns ログイン成功時のレスポンスデータ
 */
export const userLogin = async (email: string, password: string) => {
  await sanctumApi.get("/sanctum/csrf-cookie");

  return await userApi.post("/login", { email, password });
};

/**
 * ログインユーザーの情報を取得する関数
 * @returns ログインユーザーの情報
 */
export const getUser = async () => {
  const response = await userApi.get("/me");
  return response.data;
};

/**
 * ログアウトを行う関数
 */
export const userLogout = async () => {
  await userApi.post("/logout", {});
};
