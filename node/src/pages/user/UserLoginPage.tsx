import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../../api/user/auth";
import toast from "react-hot-toast";

/**
 * ログインページコンポーネント
 * - ユーザーがメールアドレスとパスワードを入力してログインできるフォームを提供
 * - フォーム送信時にuserLogin関数を呼び出してAPIにログインリクエストを送る
 * - ログイン成功後は勤怠打刻ページなどにリダイレクトする（実装は後で）
 */
export default function UserLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userLogin(email, password);
      navigate("/attendance");
      toast.success("ログインしました");
    } catch {
      setError(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
      );
      toast.error(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-teal-50 via-white to-emerald-100 px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-3xl bg-white p-12 shadow-xl ring-1 ring-slate-200"
      >
        <h1 className="mb-8 text-center text-2xl font-bold">ログイン</h1>
        <p className="mx-auto mt-2 mb-8 w-[90%] text-sm text-center text-slate-500">
          登録済みのアカウントでログインしてください
        </p>
        <div className="mx-auto mb-4 w-[90%]">
          {" "}
          <label htmlFor="email" className="mb-2 block font-bold">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="mx-auto mb-12 w-[90%]">
          <label htmlFor="password" className="mb-2 block font-bold">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="mx-auto mb-6 w-[90%] text-md text-slate-500">
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700"
          >
            ログイン
          </button>
        </div>
        <p className="mt-4 text-center text-md text-slate-500">
          アカウントをお持ちでない方は{" "}
          <Link to="/register" className="text-emerald-600 font-semibold hover:underline">
            ユーザー登録
          </Link>
        </p>
      </form>
    </main>
  );
}
