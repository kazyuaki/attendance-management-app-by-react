import { Link } from "react-router-dom";
import type { AdminAttendance } from "../../../types/adminAttendance";

type Props = {
  attendance: AdminAttendance;
};

/* 勤怠テーブルの1行 */
export default function AdminAttendanceRow({ attendance }: Props) {
  const initial = attendance.user_name.charAt(0); // 名前の頭文字を取得
  return (
    <tr className="group transition hover:bg-slate-50/70">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
            {initial}
          </div>
          <span className="font-semibold text-slate-900">
            {attendance.user_name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 font-medium text-slate-700">
        {attendance.clock_in}
      </td>
      <td className="px-6 py-4 font-medium text-slate-700">
        {attendance.clock_out ?? "-"}
      </td>
      <td className="px-6 py-4 text-slate-500">{attendance.break_time}</td>
      <td className="px-6 py-4 font-bold text-slate-900">
        {attendance.total_time}
      </td>
      <td className="px-6 py-4">
        <Link
          to={`/admin/attendances/${attendance.id}`}
          className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
        >
          詳細 →
        </Link>
      </td>
    </tr>
  );
}
