// src/user/attendanceList/UserAttendanceListTable.tsx

import { Link } from "react-router-dom";
import type { UserAttendance } from "../../../types/userAttendance";
import UserAttendanceListRow from "./UserAttendanceListRow";
import { formatDateToIso, getWeekStartDate } from "../../../utils/attendance";

type Props = {
  attendances: UserAttendance[];
};

const COLUMNS = ["日付", "出勤", "退勤", "休憩時間", "実働時間", "詳細"];

/* ユーザー勤怠一覧テーブル */
export default function UserAttendanceListTable({ attendances }: Props) {
  const sortedAttendances = [...attendances].sort((a, b) =>
    a.work_date_value.localeCompare(b.work_date_value),
  );

  const tableRows = sortedAttendances.map((attendance, index) => {
    const weekStartKey = formatDateToIso(
      getWeekStartDate(attendance.work_date_value),
    );
    const previousWeekStartKey =
      index > 0
        ? formatDateToIso(
            getWeekStartDate(sortedAttendances[index - 1].work_date_value),
          )
        : "";
    const isFirstWeekRow = index > 0 && weekStartKey !== previousWeekStartKey;

    return (
      <UserAttendanceListRow
        key={attendance.id}
        attendance={attendance}
        isWeekStart={isFirstWeekRow}
      />
    );
  });

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

          <tbody className="divide-y divide-slate-100">{tableRows}</tbody>
        </table>
      </div>
    </>
  );
}
