// routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminAttendanceListPage from "../pages/admin/AdminAttendanceListPage";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminAttendanceDetailPage from "../pages/admin/AdminAttendanceDetailPage";

/* アプリ全体のルーティングを定義するコンポーネント */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/attendances" element={<AdminAttendanceListPage />} />
        <Route path="/admin/attendances/:id" element={<AdminAttendanceDetailPage />} />
      </Route>

    </Routes>
  );
}