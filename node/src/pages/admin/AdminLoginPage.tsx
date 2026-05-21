export default function AdminLoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 px-4 py-12">
      <div className="w-full max-w-sm">
        {/* カード */}
        <div className="rounded-2xl bg-white px-8 py-10 shadow-2xl">
          {/* ヘッダー */}
          <div className="mb-8 flex flex-col items-center text-center">
            {/* シールドアイコン */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.705-3.078Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* バッジ */}
            <span className="inline-block rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-bold tracking-widest text-indigo-600">
              ADMIN PORTAL
            </span>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
              管理者ログイン
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              アカウント情報を入力してください
            </p>
          </div>

          {/* フォーム */}
          <form className="space-y-5">
            {/* メールアドレス */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                メールアドレス
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* パスワード */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                パスワード
              </label>
              <input
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* ログインボタン */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:translate-y-0"
            >
              ログイン
            </button>
          </form>
        </div>

        {/* フッター */}
        <p className="mt-6 text-center text-xs text-slate-500">
          © 2025 KAZUTECH — 管理者専用ページ
        </p>
      </div>
    </main>
  );
}
