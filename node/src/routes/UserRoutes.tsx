import { Route, Routes } from "react-router-dom";
import UserAttendanceClockPage from "../pages/user/UserAttendanceClockPage";
import UserProtectedRoute from "./UserProtectedRoute";
import UserRegisterPage from "../pages/user/UserRegisterPage";
import EmailVerifyPage from "../pages/user/EmailVerifyPage";

export default function UserRoutes() {
  return (
    <Routes>
      {/* <Route path="/login" element={<UserLoginPag />} /> */}

      <Route element={<UserProtectedRoute />}>
        <Route path="/register" element={<UserRegisterPage />} />
        <Route path="/email/verify" element={<EmailVerifyPage />} />
      </Route>

      <Route element={<UserProtectedRoute />}>
        <Route path="/attendance" element={<UserAttendanceClockPage />} />
      </Route>
    </Routes>
  );
}
