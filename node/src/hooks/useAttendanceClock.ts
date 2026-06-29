import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  clockIn,
  clockOut,
  breakIn,
  breakOut,
  getTodayAttendance,
  type TodayAttendance,
} from "../api/user/attendance";
import { calculateWorkDuration, formatTime } from "../utils/attendance";

export type AttendanceStatus = "off" | "working" | "break" | "finished";

// APIから取得した時刻文字列をDateオブジェクトに変換する関数
function createDateFromTime(time: string) {
  const [hoursString, minutesString, secondsString = "0"] = time.split(":");
  const hours = Number(hoursString);
  const minutes = Number(minutesString);
  const seconds = Number(secondsString);
  const date = new Date();

  date.setHours(hours, minutes, seconds, 0);

  return date;
}

// 勤怠情報から現在のステータスを判定する関数
function getStatusFromAttendance(
  attendance: TodayAttendance,
): AttendanceStatus {
  if (attendance.clock_out) {
    return "finished";
  }

  const latestBreak = attendance.break_times.at(-1);

  if (latestBreak && !latestBreak.break_out) {
    return "break";
  }

  return "working";
}

const showAttendanceErrorToast = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string") {
      toast.error(message);
      return;
    }
  }

  toast.error(fallbackMessage);
};

/**
 * 勤怠打刻ページ用のカスタムフック
 * - 当日の勤怠情報取得
 * - 現在時刻の更新
 * - 出勤・退勤・休憩打刻
 * - 勤務ステータス管理
 */
export function useAttendanceClock() {
  const [currentTime, setCurrentTime] = useState("");
  const [status, setStatus] = useState<AttendanceStatus>("off");
  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  const [breakEndTime, setBreakEndTime] = useState<Date | null>(null);
  const [workDuration, setWorkDuration] = useState<string | null>(null);

  useEffect(() => {
    const initializeAttendance = async () => {
      try {
        setStatus("off");
        setClockInTime(null);
        setClockOutTime(null);
        setBreakStartTime(null);
        setBreakEndTime(null);
        setWorkDuration(null);

        const attendance = await getTodayAttendance();

        if (!attendance) {
          return;
        }

        setClockInTime(createDateFromTime(attendance.clock_in));

        const latestBreak = attendance.break_times.at(-1);

        if (latestBreak) {
          setBreakStartTime(createDateFromTime(latestBreak.break_in));

          if (latestBreak.break_out) {
            setBreakEndTime(createDateFromTime(latestBreak.break_out));
          }
        }

        if (attendance.clock_out) {
          setClockOutTime(createDateFromTime(attendance.clock_out));
        }

        setStatus(getStatusFromAttendance(attendance));
      } catch (error) {
        console.error("Failed to load attendance status:", error);
      } finally {
        setIsReady(true);
      }
    };

    void initializeAttendance();

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(formatTime(now));
    };

    updateTime();

    const timer = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const handleClockIn = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await clockIn();
      setClockInTime(new Date());
      setStatus("working");
    } catch (error) {
      console.error("Clock-in failed:", error);
      showAttendanceErrorToast(
        error,
        "出勤の打刻に失敗しました。再度お試しください。",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClockOut = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await clockOut();

      const now = new Date();
      setClockOutTime(now);

      if (clockInTime) {
        const duration = calculateWorkDuration(
          clockInTime,
          now,
          breakStartTime,
          breakEndTime,
        );

        setWorkDuration(duration);
      }

      setStatus("finished");
    } catch (error) {
      console.error("Clock-out failed:", error);
      showAttendanceErrorToast(error, "退勤の打刻に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBreakStart = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await breakIn();

      setBreakStartTime(new Date());
      setBreakEndTime(null);
      setStatus("break");
    } catch (error) {
      console.error("Failed to start break:", error);
      showAttendanceErrorToast(error, "休憩開始の打刻に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBreakEnd = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await breakOut();

      setBreakEndTime(new Date());
      setStatus("working");
    } catch (error) {
      console.error("Failed to end break:", error);
      showAttendanceErrorToast(error, "休憩終了の打刻に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentTime,
    status,
    isReady,
    isSubmitting,
    clockInTime,
    clockOutTime,
    breakStartTime,
    breakEndTime,
    workDuration,
    handleClockIn,
    handleClockOut,
    handleBreakStart,
    handleBreakEnd,
  };
}
