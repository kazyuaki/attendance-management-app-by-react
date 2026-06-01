import { useEffect, useState } from "react";

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

/**
 * 勤怠打刻ページ
 */
export default function UserAttendanceClockPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [status, setStatus] = useState<AttendanceStatus>("off");

  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<string | null>(null);
  const [breakEndTime, setBreakEndTime] = useState<string | null>(null);

  // 時刻取得関数
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 現在時刻を更新するための副作用
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setCurrentTime(
        now.toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    setClockInTime(getCurrentTime());
    setStatus("working");
  };

  const handleClockOut = () => {
    setClockOutTime(getCurrentTime());
    setStatus("finished");
  };

  const handleBreakStart = () => {
    setBreakStartTime(getCurrentTime());
    setStatus("break");
  };

  const handleBreakEnd = () => {
    setBreakEndTime(getCurrentTime());
    setStatus("working");
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 px-6 py-10">
      <section className="w-full max-w-2xl rounded-3xl bg-white p-16 text-center shadow-xl ring-1 ring-slate-200">
        <div
          className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${statusStyleMap[status]}`}
        >
          {statusLabelMap[status]}
        </div>

        <p className="mt-8 text-2xl font-bold text-slate-800">
          {new Date().toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
          })}
        </p>

        <p className="mt-4 text-7xl font-black tracking-tight text-slate-950">
          {currentTime}
        </p>

        {status === "off" && (
          <button
            className="mt-10 rounded-2xl bg-emerald-600 px-16 py-4 text-lg font-bold text-white
					shadow-lg shadow-emerald-600/50 transition-colors hover:bg-emerald-700"
            onClick={handleClockIn}
          >
            出勤
          </button>
        )}
        {status === "working" && (
          <div className="mt-10 flex justify-center gap-4">
            <button
              className="rounded-2xl bg-red-500 px-16 py-4 text-lg font-bold text-white
							shadow-lg shadow-red-500/50 transition-colors hover:bg-red-600"
              onClick={handleClockOut}
            >
              退勤
            </button>
            <button
              className="rounded-2xl bg-yellow-500 px-16 py-4 text-lg font-bold text-white
							shadow-lg shadow-yellow-500/50 transition-colors hover:bg-yellow-600"
              onClick={handleBreakStart}
            >
              休憩開始
            </button>
          </div>
        )}
        {status === "break" && (
          <button
            className="mt-10 rounded-2xl bg-emerald-600 px-16 py-4 text-lg font-bold text-white
						shadow-lg shadow-emerald-600/50 transition-colors hover:bg-emerald-700"
            onClick={handleBreakEnd}
          >
            休憩終了
          </button>
        )}
        {status === "finished" && (
          <p className="mt-10 text-xl font-semibold text-slate-700">
            お疲れ様でした！
            <br />
            本日の勤務時間: 8時間
          </p>
        )}
        <div className="mt-8 space-y-2 text-sm font-medium text-slate-600">
          {clockInTime && <p>出勤時刻：{clockInTime}</p>}
          {breakStartTime && <p>休憩開始：{breakStartTime}</p>}
          {breakEndTime && <p>休憩終了：{breakEndTime}</p>}
          {clockOutTime && <p>退勤時刻：{clockOutTime}</p>}
        </div>
      </section>
    </main>
  );
}
