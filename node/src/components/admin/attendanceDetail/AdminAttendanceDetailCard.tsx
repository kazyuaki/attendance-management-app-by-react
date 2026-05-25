// src/components/admin/attendanceDetail/AdminAttendancDetailCard.tsx

import { useState } from "react";
import AdminAttendanceBreakRow from "./AdminAttendanceBreakRow";
import AdminAttendanceTimeRow from "./AdminAttendanceTimeRow";
import { updateAdminAttendance } from "../../../api/admin/adminAttendance";
import { useNavigate } from "react-router-dom";

type Attendance = {
  id: number;
  user_name: string;
  work_date_value: string;
  work_date: string;
  clock_in: string | null;
  clock_out: string | null;
  note: string;
  break_times: {
    id: number;
    break_in: string;
    break_out: string | null;
  }[];
};

type Props = {
  attendance: Attendance;
};

/* 勤怠詳細の基本情報を表示するコンポーネント */
export default function AdminAttendanceDetailCard({ attendance }: Props) {
  const navigate = useNavigate();
  const [clockIn, setClockIn] = useState(attendance.clock_in ?? "");
  const [clockOut, setClockOut] = useState(attendance.clock_out ?? "");
  const [note, setNote] = useState(attendance.note ?? "");
  const [breakTimes, setBreakTimes] = useState(
    attendance.break_times.map((breakTime) => ({
      breakIn: breakTime.break_in,
      breakOut: breakTime.break_out ?? "",
    })),
  );

  /* 休憩時間の変更をハンドルする関数 */
  const handleBreakTimeChange = (
    index: number,
    field: "breakIn" | "breakOut",
    value: string,
  ) => {
    setBreakTimes((prev) =>
      prev.map((breakTime, currentIndex) =>
        currentIndex === index ? { ...breakTime, [field]: value } : breakTime,
      ),
    );
  };

  /* 勤怠情報を保存する関数 */
  const handleSave = async () => {
    await updateAdminAttendance(String(attendance.id), {
      clock_in: clockIn,
      clock_out: clockOut,
      break_times: breakTimes.map((breakTime) => ({
        break_in: breakTime.breakIn,
        break_out: breakTime.breakOut || null,
      })),

      note,
    });
    navigate(`/admin/attendances?date=${attendance.work_date_value}`); // 保存後に同じ日付の勤怠一覧ページに遷移
  };

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
        <AdminAttendanceTimeRow
          label="勤務時間"
          start={clockIn}
          end={clockOut}
          onStartChange={setClockIn}
          onEndChange={setClockOut}
        />

        {/* 休憩時間 */}
        {breakTimes.map((breakTime, index) => (
          <AdminAttendanceBreakRow
            key={index}
            label={`休憩${index === 0 ? "" : index + 1}`}
            breakIn={breakTime.breakIn}
            breakOut={breakTime.breakOut}
            onBreakInChange={(value) =>
              handleBreakTimeChange(index, "breakIn", value)
            }
            onBreakOutChange={(value) =>
              handleBreakTimeChange(index, "breakOut", value)
            }
          />
        ))}

        {/* 備考 */}
        <div className="flex items-start px-8 py-5">
          <p className="w-40 pt-1 text-lg font-medium text-gray-400">備考</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-800 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            rows={4}
          />
        </div>
      </div>

      {/* ボタン */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-lg font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
        >
          修正
        </button>
      </div>
    </div>
  );
}
