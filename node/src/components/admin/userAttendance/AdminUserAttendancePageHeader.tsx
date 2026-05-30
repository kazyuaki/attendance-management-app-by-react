// components/admin/userAttendance/AdminUserAttendancePageHeader.tsx

type Props = {
  userName: string;
  month: string;
};

/* スタッフ別月次勤怠一覧ページのヘッダー */
export default function AdminUserAttendancePageHeader({
  userName,
  month,
}: Props) {
  return (
    <div>
      <p className="text-base font-semibold tracking-wide text-indigo-600">
        Staff Attendance
      </p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900">勤怠一覧</h1>
      <p className="mt-1 text-base text-slate-500">{month}</p>

      <p className="text-base text-slate-500">{userName}さんの勤怠状況</p>
    </div>
  );
}
