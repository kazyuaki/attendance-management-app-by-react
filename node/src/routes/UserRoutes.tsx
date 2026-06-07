import { Route, Routes } from "react-router-dom";
import UserAttendanceClockPage from "../pages/user/UserAttendanceClockPage";
import UserAttendanceListPage from "../pages/user/UserAttendanceListPage";
import UserProtectedRoute from "./UserProtectedRoute";
import UserRegisterPage from "../pages/user/UserRegisterPage";
import EmailVerifyPage from "../pages/user/EmailVerifyPage";
import UserLoginPage from "../pages/user/UserLoginPage";
import UserGuestLayout from "../components/layouts/UserGuestLayout";
import UserAttendanceDetailPage from "../pages/user/UserAttendanceDetailPage";

export default function UserRoutes() {
  return (
    <Routes>
      {/* 未認証 */}
      <Route element={<UserGuestLayout />}>
        <Route path="/register" element={<UserRegisterPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/email/verify" element={<EmailVerifyPage />} />
      </Route>

      {/* 認証後 */}
      <Route element={<UserProtectedRoute />}>
        <Route path="/attendance" element={<UserAttendanceClockPage />} />
        <Route path="/attendances" element={<UserAttendanceListPage />} />
        <Route path="/attendance/:id" element={<UserAttendanceDetailPage />} />
      </Route>
    </Routes>
  );
}
