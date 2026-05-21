import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

/* 管理者用のヘッダーコンポーネント */
export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg shadow-slate-900/30">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* ロゴ */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4.5 w-4.5 text-white"
            >
              <path
                fillRule="evenodd"
                d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.705-3.078Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-wide text-white">
            KAZUTECH
          </span>
          <span className="rounded-full bg-indigo-600/20 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-indigo-400 border border-indigo-500/30">
            ADMIN
          </span>
        </div>

        {/* ナビゲーション */}
        <nav>
          <ul className="flex items-center gap-1">
            <li>
              <Link
                to="/admin/attendance"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                勤怠一覧
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                スタッフ一覧
              </Link>
            </li>
            <li>
              <Link
                to="/admin/requests"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                申請一覧
              </Link>
            </li>
            <li className="ml-3">
              <button className="flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-400 hover:text-white">
                <LogOut className="h-4 w-4" />
                ログアウト
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
