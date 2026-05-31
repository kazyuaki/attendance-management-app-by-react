// src/routes/UserProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import UserLayout from "../components/layouts/UserLayout";
import { getUser } from "../api/user/auth";
import { useEffect, useState } from "react";

/**
 * ユーザープロテクトルートコンポーネント
 * - ログインしているユーザーのみがアクセスできるルートを定義
 * - getUser関数を使用してユーザーの認証状態を確認し、認証されていない場合はログインページにリダイレクトする
 * - 認証されている場合は子コンポーネントを表示する
 */
export default function UserProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // コンポーネントのマウント時にユーザーの認証状態を確認
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, []);

  // 認証状態がまだ確認されていない場合はローディング表示
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // 認証されていない場合はログインページへリダイレクト
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );
}
