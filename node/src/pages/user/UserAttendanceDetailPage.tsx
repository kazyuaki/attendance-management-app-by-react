import UserAttendanceDetailCard from "../../components/user/attendanceDetail/UserAttendanceDetailCard";

/* ユーザー用の勤怠詳細ページ */
export default function UserAttendanceDetailPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-12">
        <p className="text-base font-semibold tracking-wide text-emerald-600">
          Attendance Detail
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">勤怠詳細</h1>
      </div>

      <UserAttendanceDetailCard />
    </main>
  );
}
