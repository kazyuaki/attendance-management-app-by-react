import { Outlet } from "react-router-dom";
import UserLayout from "../components/layouts/UserLayout";

export default function UserProtectedRoute() {
  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );
}