import { useSearchParams } from "react-router-dom";
import UserAttendanceListPageHeader from "../../components/user/attendanceList/UserAttendanceListPageHeader";
import UserMonthNavigation from "../../components/user/attendanceList/UserMonthNavigation";
import UserAttendanceListTable from "../../components/user/attendanceList/UserAttendanceListTable";
import type { UserAttendance } from "../../types/userAttendance";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

const createMonthAttendances = (month: string): UserAttendance[] => {
  const [year, monthNumber] = month.split("-").map(Number);
  const daysInMonth = new Date(year, monthNumber, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(year, monthNumber - 1, day);
    const isHoliday = date.getDay() === 0 || date.getDay() === 6;

    return {
      id: day,
      date: `${monthNumber}/${String(day).padStart(2, "0")}(${
        WEEKDAYS[date.getDay()]
      })`,
      clockIn: isHoliday ? "" : "09:00",
      clockOut: isHoliday ? "" : "18:00",
      breakTime: isHoliday ? "" : "1:00",
      totalTime: isHoliday ? "" : "8:00",
    };
  });
};

const formatMonthLabel = (month: string) => {
  const [year, monthNumber] = month.split("-");

  return `${year}年${Number(monthNumber)}月`;
};

/** ユーザー勤怠一覧ページ */
export default function UserAttendanceListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMonth = searchParams.get("month") || "2026-06";
  const attendances = createMonthAttendances(currentMonth);

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
