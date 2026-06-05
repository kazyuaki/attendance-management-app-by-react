// src/user/attendanceList/UserAtteandanceListRow.tsx
import { Link } from "react-router-dom";
import type { UserAttendance } from "../../../types/userAttendance";

type Props = {
  attendance: UserAttendance;
};

/* ユーザー勤怠一覧の1行 */
export default function UserAttendanceListRow({ attendance }: Props) {
  return (
    <tr className="transition hover:bg-slate-50">
      <td className="px-6 py-4 font-medium text-slate-700">
        {attendance.date}
      </td>

      <td className="px-6 py-4 text-slate-600">{attendance.clockIn || "-"}</td>

      <td className="px-6 py-4 text-slate-600">{attendance.clockOut || "-"}</td>

      <td className="px-6 py-4 text-slate-600">
        {attendance.breakTime || "-"}
      </td>

      <td className="px-6 py-4 font-medium text-slate-700">
        {attendance.totalTime || "-"}
      </td>

      <td className="px-6 py-4">
        <Link
          to={`/attendance/${attendance.id}`}
          className="font-semibold text-indigo-600 transition hover:text-indigo-800 hover:underline"
        >
          詳細
        </Link>
      </td>
    </tr>
  );
}
