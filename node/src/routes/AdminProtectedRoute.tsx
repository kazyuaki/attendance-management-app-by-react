import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAdminUser } from "../api/admin/auth";
import AdminLayout from "../components/layouts/AdminLayout";

export default function AdminProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated ] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const fetchAdminUser = async () => {
      try {
        await getAdminUser();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    fetchAdminUser();
  }, []);

  // 認証状態がまだ確認されていない場合はローディング表示
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // 認証されていない場合はログインページへリダイレクト
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // 認証されている場合は子コンポーネントを表示
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
