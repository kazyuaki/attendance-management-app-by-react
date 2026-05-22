import AdminAttendancePageHeader from "../../components/admin/attendance/AdminAttendancePageHeader";
import AdminDateNavigation from "../../components/admin/attendance/AdminDateNavigation";
import AdminAttendanceTable from "../../components/admin/attendance/AdminAttendanceTable";

const STAFF_LIST = [
  { name: "山田 太郎", initial: "山" },
  { name: "西 怜奈", initial: "西" },
  { name: "増田 一世", initial: "増" },
  { name: "山本 敬吉", initial: "山" },
  { name: "秋田 朋美", initial: "秋" },
];

const DISPLAY_DATE = "2026/06/01";
const DISPLAY_DATE_LABEL = "2026年6月1日（月）";

/* 管理者用の勤怠一覧ページ */
export default function AdminAttendanceListPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-start justify-between">
        <AdminAttendancePageHeader dateLabel={DISPLAY_DATE_LABEL} />
        <AdminDateNavigation date={DISPLAY_DATE} />
      </div>
      <AdminAttendanceTable staff={STAFF_LIST} />
    </main>
  );
}
