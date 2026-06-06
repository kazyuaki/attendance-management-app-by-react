// src/components/user/attendanceList/UserAttendance.tsx

type Props = {
  monthLabel: string;
};

/* 勤怠一覧ページのヘッダー */
export default function UserAttendanceListPageHeader({ monthLabel }: Props) {
  return (
    <div className="mb-8">
      <p className="text-base font-semibold tracking-wide text-emerald-600">
        Attendance
      </p>

      <h1 className="mt-1 text-3xl font-bold text-slate-900">勤怠一覧</h1>

      <p className="mt-1 text-base text-slate-500">{monthLabel}の勤怠一覧</p>
    </div>
  );
}
