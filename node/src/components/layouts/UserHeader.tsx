// components/layouts/AdminHeader.tsx
import { LogOut } from "lucide-react";
import { Link, useLocation,  } from "react-router-dom";

/* 管理者用のヘッダーコンポーネント */
export default function UserHeader() {
//   const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

//   const handleLogout = async () => {
//     try {
//       await adminLogout();
//       navigate("/admin/login");
//     } catch (error) {
//       console.error("ログアウト失敗:", error);
//     }
//   };

  const navLinkClass = (path: string) => {
    const isActive = location.pathname.startsWith(path);

    return `
      rounded-lg px-4 py-2 text-lg font-medium transition-colors
      ${
        isActive
          ? "bg-white/10 text-white"
          : "text-emerald-50/80 hover:bg-white/10 hover:text-white"
      }
    `;
  };

  return (
    <header className="sticky top-0 z-50 bg-emerald-900 text-white shadow-lg shadow-slate-900/30">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* ロゴ */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-white"
            >
              <path
                fillRule="evenodd"
                d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.705-3.078Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-wide text-white">
            KAZUTECH
          </span>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-600/20 px-2.5 py-0.5 text-sm font-semibold tracking-widest text-emerald-200">
            USER
          </span>
        </div>

        {/* ナビゲーション */}
        {/* ログイン画面以外で表示 */}
        {!isLoginPage && (
          <nav>
            <ul className="flex items-center gap-1">
              <li>
                <Link to="/attendances" className={navLinkClass("/attendance")}>
                  打刻
                </Link>
              </li>
              <li>
                <Link to="attendances" className={navLinkClass("/attendances")}>
                  勤怠一覧
                </Link>
              </li>
              <li>
                <Link to="/request" className={navLinkClass("/request")}>
                  申請
                </Link>
              </li>
              <li className="ml-3">
                <button className="flex items-center gap-2 rounded-lg border border-emerald-300/40 px-5 py-2 text-lg font-medium text-emerald-50/80 transition-colors hover:border-emerald-100 hover:text-white">
                  <LogOut className="h-5 w-5" />
                  ログアウト
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
