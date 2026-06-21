import AdminStaffPageHeader from "../../components/admin/staff/AdminStaffPageHeader";
import AdminStaffTable from "../../components/admin/staff/AdminStaffTable";
import { useEffect, useMemo, useState } from "react";
import { getAdminUsers } from "../../api/admin/adminUser";
import type { AdminUser } from "../../types/adminUser";

/* スタッフ一覧ページ */
export default function AdminStaffListPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filterdUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      return (
        keyword.length === 0 ||
        [user.name, user.email].some((value) =>
          value.toLowerCase().includes(keyword),
        )
      );
    });
  }, [users, searchTerm]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const users = await getAdminUsers();
        setUsers(users);
      } catch (error) {
        console.error("スタッフ情報の取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section>
        <AdminStaffPageHeader
          staffCount={users.length}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="mt-8">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-lg font-semibold text-slate-500">
                読み込み中...
              </p>
            </div>
          ) : (
            <AdminStaffTable staffs={filterdUsers} />
          )}
        </div>
      </section>
    </main>
  );
}
