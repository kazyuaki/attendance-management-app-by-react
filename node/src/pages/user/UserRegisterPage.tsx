import { useState } from "react";
import { userRegister } from "../../api/user/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type ValidationErrors = Partial<
  Record<keyof FormState | "password_confirmation", string[]>
>;

type TouchedState = Partial<Record<keyof FormState, boolean>>;

const initialFormState: FormState = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const inputFields = [
  {
    name: "name",
    label: "お名前",
    type: "text",
    placeholder: "田中 一郎",
  },
  {
    name: "email",
    label: "メールアドレス",
    type: "email",
    placeholder: "tanaka@attendance.com",
  },
  {
    name: "password",
    label: "パスワード",
    type: "password",
    placeholder: "Password123",
  },
  {
    name: "passwordConfirmation",
    label: "パスワード確認",
    type: "password",
    placeholder: "Password123",
  },
] as const;

/**
 *  会員登録ページ
 *  - ユーザー登録フォームを実装
 *  - フォーム送信時にuserRegister関数を呼び出してAPIに登録リクエストを送る
 *  - 登録成功後はメール認証画面にリダイレクトする
 */
export default function UserRegisterPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [touched, setTouched] = useState<TouchedState>({});
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );
  const navigate = useNavigate();

  // 入力内容変更時に、該当項目のAPIバリデーションエラーをクリア
  const handleChange = (name: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationErrors((prev) => ({
      ...prev,
      [name]: undefined,
      ...(name === "passwordConfirmation"
        ? { password: undefined, password_confirmation: undefined }
        : {}),
    }));
  };

  // 入力欄からフォーカスが外れた後にバリデーションメッセージを表示するための状態を更新
  const handleBlur = (name: keyof FormState) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 必須入力とメール形式のみ、送信前にチェックしてボタンを制御する
  const validationMessages: Partial<Record<keyof FormState, string>> = {
    name: !form.name.trim() ? "お名前を入力してください。" : "",
    email: !form.email.trim()
      ? "メールアドレスを入力してください。"
      : !emailRegex.test(form.email)
        ? "メールアドレスの形式で入力してください。"
        : "",
    password: !form.password.trim() ? "パスワードを入力してください。" : "",
    passwordConfirmation: !form.passwordConfirmation.trim()
      ? "パスワード確認を入力してください。"
      : "",
  };

  // 送信前チェックにエラーがある場合は登録ボタンを非活性にする
  const isSubmitDisabled = Object.values(validationMessages).some(Boolean);

  // 登録処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await userRegister({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirmation,
      });
      toast.success("登録しました。メールを確認してください。");
      navigate("/email/verify");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setValidationErrors(error.response.data.errors ?? {});

        toast.error("入力内容を確認してください。");

        return;
      }
      toast.error("登録に失敗しました。入力内容を確認してください。");
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-teal-50 via-white to-emerald-100 px-6 py-10">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-3xl bg-white p-12 shadow-xl ring-1 ring-slate-200"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          ユーザー登録
        </h1>
        <p className="mx-auto w-[90%] mt-2 mb-4 text-sm text-slate-500">
          勤怠管理システムをご利用いただくためのアカウントを作成します
        </p>

        {inputFields.map((field) => (
          <div key={field.name} className="mx-auto mb-6 w-[90%]">
            <label
              htmlFor={field.name}
              className="block text-sm font-semibold text-slate-700"
            >
              {field.label}
            </label>
            <div className="relative">
              <input
                id={field.name}
                type={
                  field.name === "password" ||
                  field.name === "passwordConfirmation"
                    ? showPassword
                      ? "text"
                      : "password"
                    : field.type
                }
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                onBlur={() => handleBlur(field.name)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
              />
              {(field.name === "password" ||
                field.name === "passwordConfirmation") && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
            {touched[field.name] && validationMessages[field.name] && (
              <p className="mt-1 text-sm text-red-500">
                {validationMessages[field.name]}
              </p>
            )}
            {validationErrors[field.name]?.map((message) => (
              <p key={message} className="mt-1 text-sm text-red-500">
                {message}
              </p>
            ))}
            {field.name === "passwordConfirmation" &&
              validationErrors.password_confirmation?.map((message) => (
                <p key={message} className="mt-1 text-sm text-red-500">
                  {message}
                </p>
              ))}
          </div>
        ))}

        <div className="mx-auto w-[90%] mb-6 text-sm text-slate-500">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full rounded-xl px-4 py-3 text-base font-bold text-white shadow-lg transition-colors focus:outline-none ${
              isSubmitDisabled
                ? "cursor-not-allowed bg-slate-300"
                : "bg-emerald-600 shadow-emerald-600/30 hover:bg-emerald-700"
            }`}
          >
            登録
          </button>
        </div>
        <div className="text-center text-sm text-slate-500">
          すでにアカウントをお持ちの方は{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-600 hover:underline"
          >
            ログイン
          </Link>
        </div>
      </form>
    </main>
  );
}
