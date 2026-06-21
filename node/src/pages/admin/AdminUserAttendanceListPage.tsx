import AdminUserAttendancePageHeader from "../../components/admin/userAttendance/AdminUserAttendancePageHeader";
import AdminMonthNavigation from "../../components/admin/userAttendance/AdminMonthNavigation";
import AdminUserAttendanceTable from "../../components/admin/userAttendance/AdminUserAttendanceTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAdminUserAttendanceList } from "../../api/admin/adminUserAttendance";
import type { AdminUserAttendance } from "../../types/adminUserAttendance";

/* スタッフ別月次勤怠一覧ページ */
export default function AdminUserAttendanceListPage() {
  const formatYearMonth = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

  const [month, setMonth] = useState(() => formatYearMonth(new Date()));

  const formattedMonth = month.replace("-", "年") + "月";

  const onPrevMonth = () => {
    const date = new Date(`${month}-01`);
    date.setMonth(date.getMonth() - 1);
    setMonth(formatYearMonth(date));
  };
  const onNextMonth = () => {
    const date = new Date(`${month}-01`);
    date.setMonth(date.getMonth() + 1);
    setMonth(formatYearMonth(date));
  };
  const onChangeMonth = (month: string) => {
    setMonth(month);
    console.log(month);
  };

  const { id } = useParams();

  const [userName, setUserName] = useState("");
  const [attendances, setAttendances] = useState<AdminUserAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* ユーザー勤怠情報の取得 */
  useEffect(() => {
    if (!id) return;

    const getUserAttendance = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAdminUserAttendanceList(Number(id), month);
        setUserName(data.user.name);
        setAttendances(data.attendances);
      } catch (error) {
        console.error("ユーザー勤怠情報の取得に失敗:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserAttendance();
  }, [id, month]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-start justify-between">
        <AdminUserAttendancePageHeader
          userName={userName}
          month={formattedMonth}
        />

        <AdminMonthNavigation
          month={month}
          onPrev={onPrevMonth}
          onNext={onNextMonth}
          onChangeMonth={onChangeMonth}
        />
      </div>
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-lg font-semibold text-slate-500">読み込み中...</p>
        </div>
      ) : (
        <AdminUserAttendanceTable attendances={attendances} />
      )}
    </main>
  );
}
