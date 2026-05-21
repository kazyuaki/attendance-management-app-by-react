import type { ReactNode } from "react";
import AdminHeader from "./AdminHeader";

type Props = {
  children: ReactNode;
};

/* 管理者用のレイアウトコンポーネント */
export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-100">
      <AdminHeader />

      <main>{children}</main>
    </div>
  );
}
