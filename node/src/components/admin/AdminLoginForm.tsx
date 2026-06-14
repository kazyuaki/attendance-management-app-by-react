// components/admin/AdminLoginForm.tsx

import AdminInputField from "./AdminInputField";
import AdminSubmitButton from "./AdminSubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { adminLogin } from "../../api/admin/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { validateAdminLoginForm } from "../../utils/validation/adminLogin";

/* 管理者ログインフォーム */
export default function AdminLoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // フロントエンドでのバリデーション
  const validateLoginForm = () => validateAdminLoginForm(email, password);

  // フォームの送信ボタンを無効化する条件
  const isDisabled =
    !email ||
    !password ||
    Object.keys(validateLoginForm()).length > 0 ||
    isSubmitting;

  // フォーム送信処理
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    setAuthError(null);
    console.log("submit発火");

    const validationErrors = validateLoginForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await adminLogin({
        email,
        password,
      });
      toast.success("ログインしました。");
      console.log("ログイン成功:", response);
      navigate("/admin/attendances");
    } catch (error) {
      console.error("ログイン失敗:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          setErrors(error.response.data.errors);
          return;
        }
        if (error.response?.status === 401) {
          setAuthError("メールアドレスまたはパスワードが正しくありません。");
          return;
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <AdminInputField
        label="メールアドレス"
        type="email"
        placeholder="adminA@attendance.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => {
          setTouched((prev) => ({ ...prev, email: true }));
          setErrors(validateLoginForm());
        }}
      />
      {touched.email && errors.email && (
        <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
      )}
      {authError && <p className="mt-1 text-sm text-red-500">{authError}</p>}
      <div className="relative">
        <AdminInputField
          label="パスワード"
          type={showPassword ? "text" : "password"}
          placeholder="PasswordA123"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => {
            setTouched((prev) => ({ ...prev, password: true }));
            setErrors(validateLoginForm());
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-11 text-slate-500 hover:text-slate-700 focus:outline-none"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {touched.password && errors.password && (
        <p className="mt-1 text-sm text-red-500">{errors.password[0]}</p>
      )}
      <AdminSubmitButton disabled={isDisabled}>ログイン</AdminSubmitButton>
    </form>
  );
}
