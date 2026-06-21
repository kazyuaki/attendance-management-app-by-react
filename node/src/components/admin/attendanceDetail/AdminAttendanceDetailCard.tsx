// src/components/admin/attendanceDetail/AdminAttendancDetailCard.tsx

import AdminAttendanceBreakRow from "./AdminAttendanceBreakRow";
import AdminAttendanceTimeRow from "./AdminAttendanceTimeRow";
import toast from "react-hot-toast";
import { useState } from "react";
import { updateAdminAttendance } from "../../../api/admin/adminAttendance";
import { useNavigate } from "react-router-dom";
import type { AdminAttendanceDetail } from "../../../types/adminAttendance";
import axios from "axios";

type Props = {
  attendance: AdminAttendanceDetail;
};

/* 勤怠詳細の基本情報を表示するコンポーネント */
export default function AdminAttendanceDetailCard({ attendance }: Props) {
  const navigate = useNavigate();
  const [clockIn, setClockIn] = useState(attendance.clock_in ?? "");
  const [clockOut, setClockOut] = useState(attendance.clock_out ?? "");
  const [note, setNote] = useState(attendance.note ?? "");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [breakTimes, setBreakTimes] = useState(
    attendance.break_times.map((breakTime) => ({
      id: breakTime.id,
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

  /* 出勤時間のフォーカスアウト時にバリデーション */
  const handleStartBlur = () => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!clockIn) {
        newErrors.clock_in = ["出勤時間は必須です"];
      } else {
        delete newErrors.clock_in;
      }
      return newErrors;
    });
  };

  /* 退勤時間のフォーカスアウト時にバリデーション */
  const handleEndBlur = () => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!clockOut) {
        newErrors.clock_out = ["退勤時間は必須です"];
      } else {
        delete newErrors.clock_out;
      }
      return newErrors;
    });
  };

  /* 入力必須エラーの有無を判定 */
  const hasRequiredInputError =
    !clockIn || !clockOut || breakTimes.some((breakTime) => !breakTime.breakIn);

  /** 休暇扱いにする関数 */
  const handleSetHoliday = () => {
    setClockIn("00:00");
    setClockOut("00:00");
    setBreakTimes([]);
    setNote("休暇のため");
    setErrors({});
  };

  /* 勤怠情報を保存する関数 */
  const handleSave = async () => {
    setErrors({});
    try {
      await updateAdminAttendance(String(attendance.id), {
        clock_in: clockIn,
        clock_out: clockOut,
        break_times: breakTimes.map((breakTime) => ({
          break_in: breakTime.breakIn,
          break_out: breakTime.breakOut || null,
        })),
        note,
      });
      toast.success("勤怠情報を更新しました。");

      navigate(`/admin/attendances?date=${attendance.work_date_value}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("入力にエラーがあります。");
        return;
      }
      console.error("勤怠情報の更新に失敗しました:", error);
      toast.error("勤怠情報の更新に失敗しました。");
    }
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
          onStartBlur={handleStartBlur}
          onEndBlur={handleEndBlur}
        />
        {errors.clock_in && (
          <div className="flex px-8 pt-1">
            <div className="w-40" />
            <p className="px-8 pt-1 text-sm text-red-500">
              {errors.clock_in[0]}
            </p>
          </div>
        )}
        {errors.clock_out && (
          <div className="flex px-8 pt-1">
            <div className="w-40" />
            <p className="px-8 pt-1 text-sm text-red-500">
              {errors.clock_out[0]}
            </p>
          </div>
        )}

        {/* 休憩時間 */}
        {breakTimes.map((breakTime, index) => (
          <div key={breakTime.id}>
            <AdminAttendanceBreakRow
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
            {errors[`break_times.${index}.break_in`] ? (
              <div className="flex px-8 pt-1">
                <div className="w-40" />
                <p className="px-8 pt-1 text-sm text-red-500">
                  {errors[`break_times.${index}.break_in`][0]}
                </p>
              </div>
            ) : (
              !breakTime.breakIn && (
                <div className="flex px-8 pt-1">
                  <div className="w-40" />

                  <p className="px-8 pt-1 text-sm text-red-500">
                    休憩開始時間は必須です
                  </p>
                </div>
              )
            )}
            {errors[`break_times.${index}.break_out`] && (
              <div className="flex px-8 pt-1">
                <div className="w-40" />
                <p className="px-8 pt-1 text-sm text-red-500">
                  {errors[`break_times.${index}.break_out`][0]}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* 備考 */}
        <div className="flex items-start px-8 py-5">
          <p className="w-40 pt-1 text-lg font-medium text-gray-400">備考</p>
          <div className="w-full">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-800 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              rows={4}
            />
            {errors.note && (
              <p className="px-8 pt-1 text-sm text-red-500">{errors.note[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* ボタン */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleSave}
          disabled={hasRequiredInputError}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-lg font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          修正
        </button>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-lg font-semibold text-slate-600 transition hover:bg-slate-50"
          onClick={handleSetHoliday}
        >
          休暇扱いにする
        </button>
      </div>
    </div>
  );
}
