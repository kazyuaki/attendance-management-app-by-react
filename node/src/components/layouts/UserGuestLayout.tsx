// components/layouts/UserGuestLayout.tsx
import { Link, Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";

export default function UserGuestLayout() {
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  );
}
