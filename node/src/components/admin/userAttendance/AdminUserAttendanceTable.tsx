// components/admin/userAttendance/AdminUserAttendanceTable.tsx

type Attendance = {
  id: number;
  date: string;
  clockIn: string;
  clockOut: string;
  breakTime: string;
  totalTime: string;
};

type Props = {
  attendances: Attendance[];
};

const COLUMNS = ["日付", "出勤", "退勤", "休憩時間", "実働時間"];

/* スタッフ別月次勤怠一覧のテーブル */
export default function AdminUserAttendanceTable({ attendances }: Props) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      <table className="w-full text-left text-base">
        <thead>
          <tr className="border-b border-slate-100">
            {COLUMNS.map((column) => (
              <th
                key={column}
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                {column}
              </th>
            ))}
            <th className="px-6 py-4" />
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {attendances.map((attendance) => (
            <tr
              key={attendance.id}
              className="group transition hover:bg-slate-50/70"
            >
              <td className="px-6 py-4 font-semibold text-slate-900">
                {attendance.date}
              </td>

              <td className="px-6 py-4 text-slate-700">{attendance.clockIn}</td>

              <td className="px-6 py-4 text-slate-700">
                {attendance.clockOut}
              </td>

              <td className="px-6 py-4 text-slate-700">
                {attendance.breakTime}
              </td>

              <td className="px-6 py-4 text-slate-700">
                {attendance.totalTime}
              </td>

              <td className="px-6 py-4">
                <button className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100">
                  詳細 →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {attendances.length === 0 && (
        <div className="flex h-64 items-center justify-center">
          <p className="text-lg font-semibold text-slate-500">
            勤怠情報がありません
          </p>
        </div>
      )}
    </div>
  );
}
