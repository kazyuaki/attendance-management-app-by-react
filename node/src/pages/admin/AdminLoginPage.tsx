// pages/admin/AdminLoginPage.tsx
import AdminLoginCard from "../../components/admin/AdminLoginCard";

/* 管理者ログインページ */
export default function AdminLoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 px-4 py-12">
      <div className="w-full max-w-md">
        <AdminLoginCard />
        <p className="mt-6 text-center text-sm text-slate-500">
          © 2025 KAZUTECH — 管理者専用ページ
        </p>
      </div>
    </main>
  );
}
