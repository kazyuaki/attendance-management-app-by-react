// components/admin/AdminLoginHeader.tsx

import AdminShieldIcon from "./AdminShieldIcon";

export default function AdminLoginHeader() {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      {/* シールドアイコン */}
      <AdminShieldIcon />

      {/* バッジ */}
      <span className="inline-block rounded-full bg-indigo-50 px-3 py-0.5 text-sm font-bold tracking-widest text-indigo-600">
        ADMIN PORTAL
      </span>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
        管理者ログイン
      </h1>
      <p className="mt-1 text-base text-slate-500">
        アカウント情報を入力してください
      </p>
    </div>
  );
}
