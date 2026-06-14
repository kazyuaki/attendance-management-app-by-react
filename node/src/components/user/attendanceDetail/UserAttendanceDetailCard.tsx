// src/components/user/attendanceDetail/UserAttendanceDetailCard.tsx
import axios from "axios";
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

type ValidationErrors = {
  clock_in?: string;
  clock_out?: string;
  note?: string;
  break_times?: {
    break_in?: string;
    break_out?: string;
  }[];
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
  const [errors, setErrors] = useState<ValidationErrors>({});
  const navigate = useNavigate();
  const isRejected = !!attendance.rejected_reason;
  const isFormDisabled = attendance.is_attendance_edit_requested && !isRejected;

  const validate = (): ValidationErrors => {
    const errors: ValidationErrors = {};
    const breakTimeErrors: ValidationErrors["break_times"] = [];

    if (!clockIn) {
      errors.clock_in = "出勤時間は必須です。";
    }

    if (!clockOut) {
      errors.clock_out = "退勤時間は必須です。";
    }

    if (clockIn && clockOut && clockOut <= clockIn) {
      errors.clock_out = "退勤時間は出勤時間より後でなければなりません。";
    }

    breakTimes.forEach((breakTime, index) => {
      const rowError: {
        break_in?: string;
        break_out?: string;
      } = {};

      if (!breakTime.break_in) {
        rowError.break_in = "休憩開始時間は必須です。";
      }

      if (breakTime.break_in && clockIn && breakTime.break_in <= clockIn) {
        rowError.break_in =
          "休憩開始時間は出勤時間より後でなければなりません。";
      }

      if (breakTime.break_in && clockOut && breakTime.break_in >= clockOut) {
        rowError.break_in =
          "休憩開始時間は退勤時間より前でなければなりません。";
      }

      if (
        breakTime.break_out &&
        breakTime.break_in &&
        breakTime.break_out <= breakTime.break_in
      ) {
        rowError.break_out =
          "休憩終了時間は休憩開始時間より後でなければなりません。";
      }

      if (breakTime.break_out && clockOut && breakTime.break_out >= clockOut) {
        rowError.break_out =
          "休憩終了時間は退勤時間より前でなければなりません。";
      }
      breakTimeErrors[index] = rowError;
    });

    if (breakTimeErrors.some((error) => error.break_in || error.break_out)) {
      errors.break_times = breakTimeErrors;
    }

    if (!note.trim()) {
      errors.note = "備考を記入してください。";
    }

    if (note.length > 255) {
      errors.note = "備考は255文字以内で入力してください。";
    }
    return errors;
  };

  /** 勤怠修正ボタン送信 */
  const handleSubmit = async () => {
    const validationErrors = validate();

    if (
      validationErrors.clock_in ||
      validationErrors.clock_out ||
      validationErrors.note ||
      validationErrors.break_times
    ) {
      setErrors(validationErrors);

      toast.error("入力内容を確認してください。");

      return;
    }

    setErrors({});

    try {
      await storeAttendanceEditRequest(attendance.id, {
        clock_in: clockIn,
        clock_out: clockOut,
        note,
        break_times: breakTimes,
      });
      toast.success(
        isRejected ? "修正申請を再送信しました。" : "修正申請を送信しました。",
      );
      navigate("/attendances");
    } catch (error) {
      console.error("修正申請に失敗しました:", error);

      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error(
          error.response.data.message ??
            "承認待ちの申請があるため、修正できません。",
        );
        return;
      }

      toast.error("修正申請に失敗しました.");
    }
  };

  // 休憩修正
  const handleBreakTimeChange = (
    index: number,
    field: "break_in" | "break_out",
    value: string,
  ) => {
    setBreakTimes((prev) =>
      prev.map((breakTime, currentIndex) =>
        currentIndex === index ? { ...breakTime, [field]: value } : breakTime,
      ),
    );
  };

  /* 入力必須エラーの有無を判定 */
  const hasRequiredInputError =
    !clockIn ||
    !clockOut ||
    breakTimes.some((breakTime) => !breakTime.break_in);
  const rejectedReason = attendance.rejected_reason;

  return (
    <div className="space-y-6">
      {rejectedReason && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-6 py-4 text-rose-800">
          <p className="text-sm font-bold">差し戻し理由</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
            {rejectedReason}
          </p>
        </div>
      )}

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
          start={clockIn ?? ""}
          end={clockOut}
          onStartChange={setClockIn}
          onEndChange={setClockOut}
          disabled={isFormDisabled}
        />
        {errors.clock_in && (
          <div className="flex px-8 pt-1">
            <div className="w-40" />
            <p className="px-8 pt-1 text-sm text-red-500">{errors.clock_in}</p>
          </div>
        )}
        {errors.clock_out && (
          <div className="flex px-8 pt-1">
            <div className="w-40" />
            <p className="px-8 pt-1 text-sm text-red-500">{errors.clock_out}</p>
          </div>
        )}
        {/* 休憩時間 */}
        {breakTimes.map((breakTime, index) => (
          <div key={index}>
            <UserAttendanceBreakRow
              label={`休憩${index === 0 ? "" : index + 1}`}
              breakIn={breakTime.break_in ?? ""}
              breakOut={breakTime.break_out ?? ""}
              onBreakInChange={(value) =>
                handleBreakTimeChange(index, "break_in", value)
              }
              onBreakOutChange={(value) =>
                handleBreakTimeChange(index, "break_out", value)
              }
              disabled={isFormDisabled}
            />
            {errors.break_times?.[index]?.break_in && (
              <div className="flex px-8 pt-1">
                <div className="w-40" />
                <p className="px-8 pt-1 text-sm text-red-500">
                  {errors.break_times[index].break_in}
                </p>
              </div>
            )}
            {errors.break_times?.[index]?.break_out && (
              <div className="flex px-8 pt-1">
                <div className="w-40" />
                <p className="px-8 pt-1 text-sm text-red-500">
                  {errors.break_times[index].break_out}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* 備考 */}
        <div className="flex items-start px-8 py-5">
          <p className="w-40 pt-1 text-lg font-medium text-gray-400">備考</p>
          <div className="w-full">
            <p className="mb-2 text-sm text-gray-500">
              ※申請理由と詳細を記入してください
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={isFormDisabled}
              placeholder={`例）通院のため早退
          退勤時刻 18:15 → 16:00`}
              className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-800 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              rows={4}
            />
            {errors.note && (
              <p className="px-8 pt-1 text-sm text-red-500">{errors.note}</p>
            )}
          </div>
        </div>
      </div>

      {/* ボタン */}
      <div className="flex flex-col items-end gap-3">
        <button
          onClick={handleSubmit}
          disabled={hasRequiredInputError || isFormDisabled}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-lg font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          {isRejected ? "再申請" : "修正申請"}
        </button>
        {isFormDisabled && (
          <p className="text-sm font-semibold text-red-500">
            承認申請済みのため修正できません
          </p>
        )}
      </div>
    </div>
  );
}
