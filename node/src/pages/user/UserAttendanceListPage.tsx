import { useSearchParams } from "react-router-dom";
import UserAttendanceListPageHeader from "../../components/user/attendanceList/UserAttendanceListPageHeader";
import UserMonthNavigation from "../../components/user/attendanceList/UserMonthNavigation";
import UserAttendanceListTable from "../../components/user/attendanceList/UserAttendanceListTable";
import type { UserAttendance } from "../../types/userAttendance";
import { fetchUserAttendances } from "../../api/user/attendance";
import { useEffect, useState } from "react";

const formatMonthLabel = (month: string) => {
  const [year, monthNumber] = month.split("-");

  return `${year}年${Number(monthNumber)}月`;
};

/** ユーザー勤怠一覧ページ */
export default function UserAttendanceListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMonth = searchParams.get("month") || "2026-06";
  const [attendances, setAttendances] = useState<UserAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const changeMonth = (amount: number) => {
    const date = new Date(`${currentMonth}-01`);
    date.setMonth(date.getMonth() + amount);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    setSearchParams({ month: `${year}-${month}` });
  };

  const handleChangeMonth = (month: string) => {
    if (!month) return;

    setSearchParams({ month });
  };

  useEffect(() => {
    const getAttendances = async () => {
      try {
        setIsLoading(true);

        const data = await fetchUserAttendances(currentMonth);

        console.log(data);

        setAttendances(data);
      } catch (error) {
        console.error("勤怠一覧取得失敗", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAttendances();
  },[currentMonth]);

if (isLoading) {
  return (
    <div className="flex h-64 items-center justify-center">
      <p>読み込み中...</p>
    </div>
  );
}

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <UserAttendanceListPageHeader
            monthLabel={formatMonthLabel(currentMonth)}
          />

          <UserMonthNavigation
            month={currentMonth}
            onPrev={() => changeMonth(-1)}
            onNext={() => changeMonth(1)}
            onChangeMonth={handleChangeMonth}
          />
        </div>

        <UserAttendanceListTable attendances={attendances} />
      </section>
    </main>
  );
}
