import AdminHeader from "./components/layouts/AdminHeader";
import AdminLoginPage from "./pages/admin/AdminLoginPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <AdminLoginPage />
    </div>
  );
}
