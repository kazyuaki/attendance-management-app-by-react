// src/components/user/attendanceDetail/UserAttendanceDetailCard.tsx

import UserAttendanceTimeRow from "./UserAttendanceTimeRow";
import UserAttendanceBreakRow from "./UserAttendanceBreakRow";
import type { UserAttendanceDetail } from "../../../types/userAttendance";

type Props = {
  attendance: UserAttendanceDetail;
}

/* ユーザー勤怠詳細カード */
export default function UserAttendanceDetailCard({ attendance }: Props) {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        {/* セクションヘッダー */}
        <div className="border-b border-gray-100 bg-gray-50/60 px-8 py-4">
          <h2 className="text-lg font-semibold uppercase tracking-widest text-gray-400">
            勤怠詳細
          </h2>
        </div>

        {/* 名前 */}
        <div className="flex items-center border-b border-gray-100 px-8 py-5">
          <p className="w-40 text-lg font-medium text-gray-400">名前</p>
          <p className="text-lg font-semibold text-gray-800">{attendance.user_name}</p>
        </div>

        {/* 日付 */}
        <div className="flex items-center border-b border-gray-100 px-8 py-5">
          <p className="w-40 text-lg font-medium text-gray-400">日付</p>
          <p className="text-lg font-semibold text-gray-800">{attendance.work_date}</p>
        </div>

        {/* 出勤・退勤 */}
        <UserAttendanceTimeRow
          label="勤務時間"
          start={attendance.clock_in}
          end={attendance.clock_out ?? ""}
        />

        {/* 休憩時間 */}
        {attendance.break_times.map((breakTime, index) => (
          <UserAttendanceBreakRow
            key={breakTime.id}
            label={`休憩${index === 0 ? "" : index + 1}`}
            breakIn={breakTime.break_in}
            breakOut={breakTime.break_out ?? ""}
          />
        ))}

        {/* 備考 */}
        <div className="flex items-start px-8 py-5">
          <p className="w-40 pt-1 text-lg font-medium text-gray-400">備考</p>
          <textarea
            defaultValue={attendance.note}
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-800 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            rows={4}
          />
        </div>
      </div>

      {/* ボタン */}
      <div className="flex justify-end">
        <button className="rounded-lg bg-emerald-600 px-5 py-2.5 text-lg font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-95">
          修正申請
        </button>
      </div>
    </div>
  );
}
