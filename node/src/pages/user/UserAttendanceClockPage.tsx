import { useEffect, useState } from "react";

/**
 * 勤怠打刻ページ
 */
export default function UserAttendanceClockPage() {
	const [currentTime, setCurrentTime] = useState("");

	// 現在時刻を更新するための副作用
	useEffect(() => {
		const updateTime = () => {
			const now = new Date();

			setCurrentTime(
				now.toLocaleTimeString("ja-JP", {
					hour: "2-digit",
					minute: "2-digit",
				})
			);
		};

		updateTime();

		const timer = setInterval(updateTime, 1000);

		return () => clearInterval(timer);
	}, []);

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradiant-to-br from-slate-50 via-slate-100 to-slate-200 px-6 py-10">
      <section
        className="w-full max-w-2xl rounded-3xl bg-white p-16 text-center shadow-xl"
        ring-1
        ring-slate-200
      >
        <div className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
          勤務外
        </div>

        <p className="mt-8 text-2xl font-bold text-slate-800">
          {new Date().toLocaleDateString("ja-JP", {
						year: "numeric",
						month: "long",
						day: "numeric",
						weekday: "short",
					})}
        </p>

				<p className="mt-4 text-7xl font-black tracking-tight textslate-950">
					{currentTime}
				</p>

				<button className="mt-10 rounded-2xl bg-emerald-600 px-16 py-4 text-lg font-bold text-white
					shadow-lg shadow-emerald-600/50 transition-colors hover:bg-emerald-700">
					出勤
				</button>
      </section>
    </main>
  );
}
