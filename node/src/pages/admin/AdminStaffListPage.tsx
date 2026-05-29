import AdminStaffPageHeader  from "../../components/admin/staff/AdminStaffPageHeader";
import AdminStaffTable from "../../components/admin/staff/AdminStaffTable";
import { useEffect, useState } from "react";
import { getAdminUsers } from "../../api/admin/adminUser";
import type { AdminUser } from "../../types/adminUser";


export default function AdminStaffListPage() {
	const [staffs, setStaffs] = useState<AdminUser[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchStaffs = async () => {
			try {
				setIsLoading(true);
				const users = await getAdminUsers();
				setStaffs(users);
			} catch (error) {
				console.error("スタッフ情報の取得に失敗しました:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchStaffs();
	}, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section>
        <AdminStaffPageHeader staffCount={staffs.length} />

        <div className="mt-8">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-lg font-semibold text-slate-500">読み込み中...</p>
            </div>
          ) : (
            <AdminStaffTable staffs={staffs} />
          )}
        </div>
      </section>
    </main>
  );
}
