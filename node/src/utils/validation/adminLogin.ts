// utils/validation/adminLogin.ts

export type LoginErrors = {
  email?: string[];
  password?: string[];
};

/* 管理者ログインフォームのバリデーション */
export const validateAdminLoginForm = (
  email: string,
  password: string,
): LoginErrors => {
  const errors: LoginErrors = {};

  if (!email) {
    errors.email = ["メールアドレスは必須です。"];
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = ["有効なメールアドレスを入力してください。"];
  }

  if (!password) {
    errors.password = ["パスワードは必須です。"];
  } else if (password.length < 8) {
    errors.password = ["パスワードは8文字以上でなければなりません。"];
  }

  return errors;
};
