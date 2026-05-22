// components/admin/AdminLoginCard.tsx
import AdminLoginForm from "./AdminLoginForm";
import AdminLoginHeader from "./AdminLoginHeader";


/* 管理者ログインカード */
export default function AdminLoginCard() {
  return (
    <div className="rounded-2xl bg-white px-12 py-12 shadow-2xl">
      <AdminLoginHeader />
      <AdminLoginForm />
    </div>
  );
}
