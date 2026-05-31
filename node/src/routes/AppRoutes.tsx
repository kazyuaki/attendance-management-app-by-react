// routes/AppRoutes.tsx
import {  Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";


/* アプリ全体のルーティングを定義するコンポーネント */
export default function AppRoutes() {
  return (
    <Routes>
      {/* 管理者ルート */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  );
}
