// routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminAttendanceListPage from "../pages/admin/AdminAttendanceListPage";

/* アプリ全体のルーティングを定義するコンポーネント */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/attendance" element={<AdminAttendanceListPage />} />
    </Routes>
  );
}