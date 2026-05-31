import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminAttendanceListPage from "../pages/admin/AdminAttendanceListPage";
import AdminAttendanceDetailPage from "../pages/admin/AdminAttendanceDetailPage";
import AdminStaffListPage from "../pages/admin/AdminStaffListPage";
import AdminUserAttendanceListPage from "../pages/admin/AdminUserAttendanceListPage";
import AdminRequestListPage from "../pages/admin/AdminRequestListPage";

export default function AdminRoutes() {
  return (
      <Routes>
    	{/* 未認証 */}
      <Route path="/login" element={<AdminLoginPage />} />

			{/* 認証後 */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/attendances" element={<AdminAttendanceListPage />} />
        <Route
          path="/attendances/:id"
          element={<AdminAttendanceDetailPage />}
        />
        <Route path="/users" element={<AdminStaffListPage />} />
        <Route
          path="/users/:id/attendances"
          element={<AdminUserAttendanceListPage />}
        />
        <Route path="/requests" element={<AdminRequestListPage />} />
      </Route>
    </Routes>
  );
}
