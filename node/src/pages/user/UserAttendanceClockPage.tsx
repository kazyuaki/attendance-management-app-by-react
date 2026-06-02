import { useEffect, useState } from "react";
import axios from "axios";
import {
  clockIn,
  getTodayAttendance,
  type TodayAttendance,
} from "../../api/user/attendance";
import {
  formatDate,
  formatTime,
  calculateWorkDuration,
} from "../../utils/attendance";
import toast from "react-hot-toast";

type AttendanceStatus = "off" | "working" | "break" | "finished";

const statusLabelMap = {
  off: "勤務外",
  working: "出勤中",
  break: "休憩中",
  finished: "退勤済",
};

const statusStyleMap = {
  off: "bg-slate-100 text-slate-700",
  working: "bg-emerald-100 text-emerald-700",
  break: "bg-amber-100 text-amber-700",
  finished: "bg-slate-100 text-slate-700",
};

type ActionButtonProps = {
  label: string;
  onClick: () => void;
  className: string;
};

// 汎用的なアクションボタンコンポーネント
function ActionButton({ label, onClick, className }: ActionButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}
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
function getStatusFromAttendance(attendance: TodayAttendance): AttendanceStatus {
  if (attendance.clock_out) {
    return "finished";
  }

  const latestBreak = attendance.break_times.at(-1);

  if (latestBreak && !latestBreak.break_out) {
    return "break";
  }

  return "working";
}

/**
 * 勤怠打刻ページ
 */
export default function UserAttendanceClockPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [status, setStatus] = useState<AttendanceStatus>("off");
  const [isReady, setIsReady] = useState(false);

  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  const [breakEndTime, setBreakEndTime] = useState<Date | null>(null);
  const [workDuration, setWorkDuration] = useState<string | null>(null);

  // 現在時刻を更新するための副作用
  useEffect(() => {
    const initializeAttendance = async () => {
      try {
        const attendance = await getTodayAttendance();

        if (!attendance) {
          setIsReady(true);
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

    initializeAttendance();

    const updateTime = () => {
      const now = new Date();

      setCurrentTime(formatTime(now));
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // 出勤ボタンを押したときの処理
  const handleClockIn = async () => {
    try {
      const response = await clockIn();
      console.log("Clock-in successful:", response);

      setClockInTime(new Date());
      setStatus("working");
    } catch (error) {
      console.error("Clock-in failed:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (typeof message === "string") {
          toast.error(message);
          return;
        }
      }

      toast.error("出勤の打刻に失敗しました。再度お試しください。");
    }
  };

  // 退勤ボタンを押したときの処理
  const handleClockOut = () => {
    const now = new Date();

    setClockOutTime(now);

    // 勤務時間の計算
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
  };

  // 休憩開始ボタンを押したときの処理
  const handleBreakStart = () => {
    setBreakStartTime(new Date());
    setStatus("break");
  };

  // 休憩終了ボタンを押したときの処理
  const handleBreakEnd = () => {
    setBreakEndTime(new Date());
    setStatus("working");
  };

  // 現在のステータスに応じたアクションエリアをレンダリングする関数
  const renderActionArea = () => {
    switch (status) {
      case "off":
        return (
          <ActionButton
            label="出勤"
            onClick={handleClockIn}
            className="mt-10 rounded-2xl bg-emerald-600 px-16 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-600/50 transition-colors hover:bg-emerald-700"
          />
        );
      case "working":
        return (
          <div className="mt-10 flex justify-center gap-4">
            <ActionButton
              label="退勤"
              onClick={handleClockOut}
              className="rounded-2xl bg-red-500 px-16 py-4 text-lg font-bold text-white shadow-lg shadow-red-500/50 transition-colors hover:bg-red-600"
            />
            <ActionButton
              label="休憩開始"
              onClick={handleBreakStart}
              className="rounded-2xl bg-yellow-500 px-16 py-4 text-lg font-bold text-white shadow-lg shadow-yellow-500/50 transition-colors hover:bg-yellow-600"
            />
          </div>
        );
      case "break":
        return (
          <ActionButton
            label="休憩終了"
            onClick={handleBreakEnd}
            className="mt-10 rounded-2xl bg-emerald-600 px-16 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-600/50 transition-colors hover:bg-emerald-700"
          />
        );
      case "finished":
        return (
          <p className="mt-10 text-xl font-semibold text-slate-700">
            お疲れ様でした！
            <br />
            本日の勤務時間: {workDuration}
          </p>
        );
      default:
        return null;
    }
  };

  // 打刻ログを表示するための配列
  const attendanceLogs = [
    clockInTime ? `出勤時刻：${formatTime(clockInTime)}` : null,
    breakStartTime ? `休憩開始：${formatTime(breakStartTime)}` : null,
    breakEndTime ? `休憩終了：${formatTime(breakEndTime)}` : null,
    clockOutTime ? `退勤時刻：${formatTime(clockOutTime)}` : null,
  ].filter((log): log is string => log !== null);

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-linear-to-br from-slate-50 via-slate-100 to-slate-200 px-6 py-10">
      <section className="w-full max-w-2xl rounded-3xl bg-white p-16 text-center shadow-xl ring-1 ring-slate-200">
        <div
          className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${statusStyleMap[status]}`}
        >
          {statusLabelMap[status]}
        </div>

        <p className="mt-8 text-2xl font-bold text-slate-800">
          {formatDate(new Date())}
        </p>

        <p className="mt-4 text-7xl font-black tracking-tight text-slate-950">
          {currentTime}
        </p>

        {isReady ? renderActionArea() : null}

        <div className="mt-8 space-y-2 text-sm font-medium text-slate-600">
          {attendanceLogs.map((log, index) => (
            <p key={`${log}-${index}`}>{log}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
