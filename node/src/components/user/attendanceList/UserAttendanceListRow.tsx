// src/user/attendanceList/UserAtteandanceListRow.tsx
import { Link } from "react-router-dom";
import type { UserAttendance } from "../../../types/userAttendance";
import { formatAttendanceTime } from "../../../utils/attendance";

type Props = {
  attendance: UserAttendance;
  isWeekStart?: boolean;
};

/* ユーザー勤怠一覧の1行 */
export default function UserAttendanceListRow({
  attendance,
  isWeekStart = false,
}: Props) {
  return (
    <tr
      className={`transition hover:bg-slate-50 ${
        isWeekStart ? "border-t-4 border-t-emerald-100" : ""
      }`}
    >
      <td className="px-6 py-4 font-medium text-slate-700">
        {attendance.work_date}
      </td>

      <td className="px-6 py-4 text-slate-600">
        {formatAttendanceTime(attendance.clockIn)}
      </td>

      <td className="px-6 py-4 text-slate-600">
        {formatAttendanceTime(attendance.clockOut)}
      </td>

      <td className="px-6 py-4 text-slate-600">
        {attendance.breakTime || "-"}
      </td>

      <td className="px-6 py-4 font-medium text-slate-700">
        {attendance.totalTime || "-"}
      </td>

      <td className="px-6 py-4">
        <Link
          to={`/attendance/${attendance.id}`}
          className="font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
        >
          詳細
        </Link>
      </td>
    </tr>
  );
}
