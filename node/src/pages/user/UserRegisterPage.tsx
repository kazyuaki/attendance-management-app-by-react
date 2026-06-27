import { useState } from "react";
import { userRegister } from "../../api/user/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type FormState = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (name: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await userRegister({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirmation,
      });
      toast.success("登録しました。メールを確認してください。");
      navigate("/email/verify");
    } catch {
      const message = "登録に失敗しました。入力内容を確認してください。";
      toast.error(message);
      setError(message);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-teal-50 via-white to-emerald-100 px-6 py-10">
      <form
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
          <div key={field.name} className="mx-auto mb-4 w-[90%]">
            <label
              htmlFor={field.name}
              className="block text-sm font-semibold text-slate-700"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        ))}
        {error && <p className="mx-auto mb-4 w-[90%] text-red-500">{error}</p>}

        <div className="mx-auto w-[90%] mb-6 text-sm text-slate-500">
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-base font-bold text-white shadow-lg shadow-emerald-600/30 transition-colors hover:bg-emerald-700 focus:outline-none"
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
