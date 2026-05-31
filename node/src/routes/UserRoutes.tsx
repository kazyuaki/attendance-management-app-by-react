import { Route, Routes } from "react-router-dom";
import UserAttendanceClockPage from "../pages/user/UserAttendanceClockPage";
import UserProtectedRoute from "./UserProtectedRoute";

export default function UserRoutes() {
  return (
    <Routes>
      {/* <Route path="/login" element={<UserLoginPag />} />


      <Route path="/register" element={<UserRegisterPage />} /> */}

      <Route element={<UserProtectedRoute />}> 
        <Route path="/attendance" element={<UserAttendanceClockPage />} />
      </Route> 
    </Routes>
  );
}
