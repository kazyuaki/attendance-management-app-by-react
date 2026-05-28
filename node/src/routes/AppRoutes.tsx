// routes/AppRoutes.tsx
import { Navigate, Routes, Route } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminAttendanceListPage from "../pages/admin/AdminAttendanceListPage";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminAttendanceDetailPage from "../pages/admin/AdminAttendanceDetailPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminRequestListPage from "../pages/admin/AdminRequestListPage";

/* アプリ全体のルーティングを定義するコンポーネント */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/attendances" element={<AdminAttendanceListPage />} />
        <Route path="/admin/attendances/:id" element={<AdminAttendanceDetailPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/requests" element={<AdminRequestListPage />} />
        <Route path="/admin/*" element={<Navigate to="/admin/attendances" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
