import AdminInputField from "./AdminInputField";
import AdminSubmitButton from "./AdminSubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { adminLogin } from "../../api/admin/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

type LoginErrors = {
  email?: string[];
  password?: string[];
};

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
  const validateLoginForm = () => {
    const newErrors: LoginErrors = {};

    if (!email) {
      newErrors.email = ["メールアドレスは必須です。"];
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = ["有効なメールアドレスを入力してください。"];
    }

    if (!password) {
      newErrors.password = ["パスワードは必須です。"];
    } else if (password.length < 8) {
      newErrors.password = ["パスワードは8文字以上でなければなりません。"];
    }

    return newErrors;
  };

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
        placeholder="admin@example.com"
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
          placeholder="password"
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
