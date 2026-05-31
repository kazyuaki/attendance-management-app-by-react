import { useState } from "react";
import { userRegister } from "../../api/user/auth";
import { useNavigate } from "react-router-dom";

/**
 *  会員登録ページ
 *  - ユーザー登録フォームを実装
 *  - フォーム送信時にuserRegister関数を呼び出してAPIに登録リクエストを送る
 *  - 登録成功後はログインページなどにリダイレクトする（実装は後で）
 */
export default function UserRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await userRegister({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    
		navigate("/email/verify"); 
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
        <div className="mx-auto w-[90%] mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-slate-700"
          >
            お名前
          </label>
          <input
            id="name"
            type="text"
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="mx-auto w-[90%] mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-700"
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="mx-auto w-[90%] mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-700"
          >
            パスワード
          </label>
          <input
            id="password"
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="mx-auto w-[90%] mb-4">
          <label
            htmlFor="passwordConfirmation"
            className="block text-sm font-semibold text-slate-700"
          >
            パスワード確認
          </label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="パスワード確認"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="mx-auto w-[90%] mb-6 text-sm text-slate-500">
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-base font-bold text-white shadow-lg shadow-emerald-600/30 transition-colors hover:bg-emerald-700 focus:outline-none"
          >
            登録
					</button>
        </div>
        {/* 登録成功後のリダイレクトやエラーメッセージ表示などはここに追加 */}
      </form>
    </main>
  );
}
