// src/user/attendanceList/UserAttendanceListTable.tsx

import { Link } from "react-router-dom";
import type { UserAttendance } from "../../../types/userAttendance";
import UserAttendanceListRow from "./UserAttendanceListRow";

type Props = {
  attendances: UserAttendance[];
};

const COLUMNS = ["日付", "出勤", "退勤", "休憩時間", "実働時間", "詳細"];

/* ユーザー勤怠一覧テーブル */
export default function UserAttendanceListTable({ attendances }: Props) {
  return (
    <>
      <div className="mb-6 flex justify-end">
        <Link
          to="/attendance-report"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          勤怠レポートを見る
        </Link>
      </div>
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        <table className="w-full min-w-[760px] text-center text-base">
          <thead>
            <tr className="border-b border-slate-100">
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  className="px-6 py-4 text-sm font-bold text-slate-500"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {attendances.map((attendance) => (
              <UserAttendanceListRow
                key={attendance.id}
                attendance={attendance}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
