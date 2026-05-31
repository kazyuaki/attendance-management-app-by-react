// src/api/user/auth.ts

import axios from "axios";

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
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,
  });

  const response = await axios.post(
    "http://localhost:8000/api/user/register",
    params,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

/**
 * 認証メールの再送信を行う関数
 * @returns 再送信成功時のレスポンスデータ
 */
export const resendVerificationEmail = async () => {
  const response = await axios.post(
    "http://localhost:8000/api/user/email/verification-notification",
    {},
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
      },
    },
  );
  return response.data;
};

/**
 * ログインを行う関数
 * @param email - ユーザーのメールアドレス
 * @param password - ユーザーのパスワード
 * @returns ログイン成功時のレスポンスデータ
 */
export const userLogin = async (email: string, password: string) => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,
  });

  return await axios.post(
    "http://localhost:8000/api/user/login",
    { email, password },
    {
      withCredentials: true,
    },
  );
};

/**
 * ログインユーザーの情報を取得する関数
 * @returns ログインユーザーの情報
 */
export const getUser = async () => {
  const response = await axios.get("http://localhost:8000/api/user/me", {
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });
  return response.data;
};

/**
 * ログアウトを行う関数
 */
export const userLogout = async () => {
  await axios.post(
    "http://localhost:8000/api/user/logout",
    {},
    {
      withCredentials: true,
    },
  );
};
