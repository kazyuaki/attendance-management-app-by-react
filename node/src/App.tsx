// src/App.tsx
import AdminHeader from "./components/layouts/AdminHeader";
import AppRoutes from "./routes/AppRoutes";

/* アプリ全体のルートコンポーネント */
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <AppRoutes />
    </div>
  );
}
