// components/admin/userAttendance/AdminUserAttendanceTable.tsx

import { useNavigate } from "react-router-dom";
import type { AdminUserAttendance } from "../../../types/adminUserAttendance";
import {
  formatAttendanceListDate,
  formatAttendanceTime,
} from "../../../utils/attendance";

type Props = {
  attendances: AdminUserAttendance[];
};

const COLUMNS = ["日付", "出勤", "退勤", "休憩時間", "実働時間"];

/* スタッフ別月次勤怠一覧のテーブル */
export default function AdminUserAttendanceTable({ attendances }: Props) {
  const navigate = useNavigate();
  const handleNavigate = (attendanceId: number) => {
    navigate(`/admin/attendances/${attendanceId}`);
  };

  // 休憩時間の計算
  const calculateBreakTime = (attendance: AdminUserAttendance): string => {
    const totalMinutes = attendance.break_times.reduce((sum, breakTime) => {
      if (!breakTime.break_out) return sum;

      const breakIn = new Date(`2026-01-01T${breakTime.break_in}`);

      const breakOut = new Date(`2026-01-01T${breakTime.break_out}`);

      return sum + (breakOut.getTime() - breakIn.getTime()) / 1000 / 60;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  // 実働時間の計算
  const calculateTotalTime = (attendance: AdminUserAttendance): string => {
    if (!attendance.clock_in || !attendance.clock_out) return "0:00";

    const clockIn = new Date(`2026-01-01T${attendance.clock_in}`);
    const clockOut = new Date(`2026-01-01T${attendance.clock_out}`);

    const totalMinutes =
      (clockOut.getTime() - clockIn.getTime()) / 1000 / 60 -
      attendance.break_times.reduce((sum, breakTime) => {
        if (!breakTime.break_out) return sum;

        const breakIn = new Date(`2026-01-01T${breakTime.break_in}`);
        const breakOut = new Date(`2026-01-01T${breakTime.break_out}`);

        return sum + (breakOut.getTime() - breakIn.getTime()) / 1000 / 60;
      }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  }

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
                {formatAttendanceListDate(attendance.work_date)}
              </td>

              <td className="px-6 py-4 text-slate-700">
                {formatAttendanceTime(attendance.clock_in)}
              </td>

              <td className="px-6 py-4 text-slate-700">
                {formatAttendanceTime(attendance.clock_out)}
              </td>

              <td className="px-6 py-4 text-slate-700">
                {calculateBreakTime(attendance)}
              </td>

              <td className="px-6 py-4 text-slate-700">
                {calculateTotalTime(attendance)}
              </td>

              <td className="px-6 py-4">
                <button
                  className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
                  onClick={() => handleNavigate(attendance.id)}
                >
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
