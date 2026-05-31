import type { ReactNode } from "react";
import UserHeader from "./UserHeader";


type Props = {
  children: ReactNode;
};

/* 管理者用のレイアウトコンポーネント */
export default function UserLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-100">
      <UserHeader />

      <main>{children}</main>
    </div>
  );
}
