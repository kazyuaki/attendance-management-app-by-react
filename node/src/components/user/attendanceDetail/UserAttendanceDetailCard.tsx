// src/components/user/attendanceDetail/UserAttendanceDetailCard.tsx

import UserAttendanceTimeRow from "./UserAttendanceTimeRow";
import UserAttendanceBreakRow from "./UserAttendanceBreakRow";
import type { UserAttendanceDetail } from "../../../types/userAttendance";
import { useState } from "react";
import { storeAttendanceEditRequest } from "../../../api/user/attendance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  attendance: UserAttendanceDetail;
};

/* ユーザー勤怠詳細カード */
export default function UserAttendanceDetailCard({ attendance }: Props) {
  const [clockIn, setClockIn] = useState(attendance.clock_in);
  const [clockOut, setClockOut] = useState(attendance.clock_out ?? "");
  const [note, setNote] = useState(attendance.note ?? "");
  const [breakTimes, setBreakTimes] = useState(
    attendance.break_times.map((breakTime) => ({
      break_in: breakTime.break_in,
      break_out: breakTime.break_out,
    })),
  );
  const navigate = useNavigate();

  /** 勤怠修正ボタン送信 */
  const handleSubmit = async () => {
    try {
      await storeAttendanceEditRequest(attendance.id, {
        clock_in: clockIn,
        clock_out: clockOut,
        note,
        break_times: breakTimes,
      });
      toast.success("修正申請を送信しました。")
      navigate("/attendances")
    } catch (error) {
      console.error("修正申請に失敗しました:", error);
      toast.error("修正申請に失敗しました.")
    }
  };

  // 休憩修正
  const handleBreakTimeChange = (
    index: number,
    field: "break_in" | "break_out",
    value: string,
  ) => {
    setBreakTimes((prev) => prev.map((breakTime, currentIndex) =>
      currentIndex === index 
        ? { ...breakTime, [field]: value }
        : breakTime,
    ))
  }

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
          <p className="text-lg font-semibold text-gray-800">
            {attendance.user_name}
          </p>
        </div>

        {/* 日付 */}
        <div className="flex items-center border-b border-gray-100 px-8 py-5">
          <p className="w-40 text-lg font-medium text-gray-400">日付</p>
          <p className="text-lg font-semibold text-gray-800">
            {attendance.work_date}
          </p>
        </div>

        {/* 出勤・退勤 */}
        <UserAttendanceTimeRow
          label="勤務時間"
          start={attendance.clock_in}
          end={attendance.clock_out ?? ""}
          onStartChange={setClockIn}
          onEndChange={setClockOut}
        />

        {/* 休憩時間 */}
        {attendance.break_times.map((breakTime, index) => (
          <UserAttendanceBreakRow
            key={breakTime.id}
            label={`休憩${index === 0 ? "" : index + 1}`}
            breakIn={breakTime.break_in}
            breakOut={breakTime.break_out ?? ""}
            onBreakInChange={(value) =>
              handleBreakTimeChange(index, "break_in", value)
            }
            onBreakOutChange={(value) =>
              handleBreakTimeChange(index, "break_out", value)
            }
          />
        ))}

        {/* 備考 */}
        <div className="flex items-start px-8 py-5">
          <p className="w-40 pt-1 text-lg font-medium text-gray-400">備考</p>
          <textarea
            value={attendance.note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-800 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            rows={4}
          />
        </div>
      </div>

      {/* ボタン */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-lg font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-95"
        >
          修正申請
        </button>
      </div>
    </div>
  );
}
