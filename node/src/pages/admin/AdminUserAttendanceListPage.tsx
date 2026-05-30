import AdminUserAttendancePageHeader from "../../components/admin/userAttendance/AdminUserAttendancePageHeader";
import AdminMonthNavigation from "../../components/admin/userAttendance/AdminMonthNavigation";
import AdminUserAttendanceRow from "../../components/admin/userAttendance/AdminUserAttendanceTable";

const ATTENDANCES = [
  {
    id: 1,
    date: "06/01(木)",
    clockIn: "09:00",
    clockOut: "18:00",
    breakTime: "1:00",
    totalTime: "8:00",
  },
  {
    id: 2,
    date: "06/02(金)",
    clockIn: "09:30",
    clockOut: "18:30",
    breakTime: "1:00",
    totalTime: "8:00",
  },
];

/* スタッフ別月次勤怠一覧ページ */
export default function AdminUserAttendanceListPage() {
	const month = "2026-06";
	const userName = "山田太郎";
	const formattedMonth = month.replace("-", "年") + "月";

  const onPrevMonth = () => [];
  const onNextMonth = () => [];
  const onChangeMonth = (month: string) => {
    console.log(month);
  };
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-start justify-between">
        <AdminUserAttendancePageHeader userName={userName} month={formattedMonth} />

        <AdminMonthNavigation
          month={month}
          onPrev={onPrevMonth}
          onNext={onNextMonth}
          onChangeMonth={onChangeMonth}
        />
      </div>
      <AdminUserAttendanceRow attendances={ATTENDANCES} />
    </main>
  );
}
