import AdminInputField from "./AdminInputField";
import AdminSubmitButton from "./AdminSubmitButton";

/* 管理者ログインフォーム */
export default function AdminLoginForm() {
  return (
    <form className="space-y-6">
      <AdminInputField
        label="メールアドレス"
        type="email"
        placeholder="admin@example.com"
        autoComplete="email"
      />

      <AdminInputField
        label="パスワード"
        type="password"
        placeholder="password"
        autoComplete="current-password"
      />

      <AdminSubmitButton>ログイン</AdminSubmitButton>
    </form>
  );
}
