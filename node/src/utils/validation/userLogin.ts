// src/utils/validation/userLogin.ts

export type UserLoginErrors = {
  email?: string[];
  password?: string[];
};

/* ユーザーログインフォームのバリデーション */
export const validateUserLoginForm = (
  email: string,
  password: string,
): UserLoginErrors => {
  const errors: UserLoginErrors = {};

  if (!email) {
    errors.email = ["メールアドレスは必須です。"];
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = ["有効なメールアドレスを入力してください。"];
  } else if (email.length > 100) {
    errors.email = ["メールアドレスは100文字以内でなければなりません。"];
  }

  if (!password) {
    errors.password = ["パスワードは必須です。"];
  } else if (password.length < 8) {
    errors.password = ["パスワードは8文字以上でなければなりません。"];
  } else if (password.length > 32) {
    errors.password = ["パスワードは32文字以内でなければなりません。"];
  } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errors.password = [
      "パスワードは大文字と小文字を両方含める必要があります。",
    ];
  } else if (!/\d/.test(password)) {
    errors.password = ["パスワードは数字を含める必要があります。"];
  }

  return errors;
};
