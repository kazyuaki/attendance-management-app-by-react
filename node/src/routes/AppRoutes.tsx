// routes/AppRoutes.tsx
import { Navigate, Routes, Route } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminAttendanceListPage from "../pages/admin/AdminAttendanceListPage";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminAttendanceDetailPage from "../pages/admin/AdminAttendanceDetailPage";
import AdminRequestListPage from "../pages/admin/AdminRequestListPage";
import AdminStaffListPage from "../pages/admin/AdminStaffListPage";
import AdminUserAttendanceListPage from "../pages/admin/AdminUserAttendanceListPage";

/* アプリ全体のルーティングを定義するコンポーネント */
export default function AppRoutes() {
  return (
    <Routes>
      {/* 管理者系ルート */}
      {/* 未認証 */}
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* 認証済み */}
      <Route element={<AdminProtectedRoute />}>
        <Route
          path="/admin/*"
          element={<Navigate to="/admin/attendances" replace />}
        />
        {/* 一覧 */}
        <Route
          path="/admin/attendances"
          element={<AdminAttendanceListPage />}
        />
        {/* 詳細 */}
        <Route
          path="/admin/attendances/:id"
          element={<AdminAttendanceDetailPage />}
        />
        {/* スタッフ一覧 */}
        <Route path="/admin/users" element={<AdminStaffListPage />} />
        {/* スタッフ別月次勤怠一覧 */}
        <Route
          path="/admin/users/:id/attendances"
          element={<AdminUserAttendanceListPage />}
        />
        {/* 申請一覧 */}
        <Route path="/admin/requests" element={<AdminRequestListPage />} />
      </Route>
      {/* 存在しないパスはログイン画面へリダイレクト */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
