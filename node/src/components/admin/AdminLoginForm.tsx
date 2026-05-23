import AdminInputField from "./AdminInputField";
import AdminSubmitButton from "./AdminSubmitButton";
import { useState } from "react";
import { adminLogin } from "../../api/admin/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";


/* 管理者ログインフォーム */
export default function AdminLoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  console.log("submit発火");
    try {
      const response = await adminLogin({
        email,
        password,
      });
      console.log("ログイン成功:", response);
      navigate("/admin/attendances");
    } catch (error) {
      console.error("ログイン失敗:", error);

      if (axios.isAxiosError(error)) {
        console.error("Axiosエラー:", error.response?.data);
      }
    }
  }
  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}>
      <AdminInputField
        label="メールアドレス"
        type="email"
        placeholder="admin@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AdminInputField
        label="パスワード"
        type="password"
        placeholder="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <AdminSubmitButton>ログイン</AdminSubmitButton>
    </form>
  );
}
