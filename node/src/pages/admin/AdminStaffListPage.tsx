import { AdminStaffPageHeader } from "../../components/admin/staff/AdminStaffPageHeader";
import AdminStaffTable from "../../components/admin/staff/AdminStaffTable";

const STAFFS = [
  {
    id: 1,
    name: "西 怜奈",
    email: "reina.n@example.com",
  },
  {
    id: 2,
    name: "山田 太郎",
    email: "taro.y@example.com",
  },
  {
    id: 3,
    name: "佐藤 花子",
    email: "hanako.s@example.com",
  },
];

export default function AdminStaffListPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section>
        <AdminStaffPageHeader staffCount={STAFFS.length} />

        <div className="mt-8">
          <AdminStaffTable staffs={STAFFS} />
        </div>
      </section>
    </main>
  );
}
