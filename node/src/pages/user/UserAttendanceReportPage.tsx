import { useEffect, useState } from "react";
import type { AttendanceReport } from "../../types/userAttendance";
import { getAttendanceReport } from "../../api/user/attendance";
import toast from "react-hot-toast";

/** ユーザー用の勤怠レポートページ */
export default function UserAttendanceReportPage() {
  const [report, setReport] = useState<AttendanceReport | null>(null);

  useEffect(() => {
		const fetchReport = async () => {
			try {
				const data = await getAttendanceReport();
				setReport(data);
			} catch (error) {
				console.error("勤怠レポート取得に失敗しました:", error)
				toast.error("勤怠レポート取得に失敗しました。")
			}
    };
    fetchReport();
  }, []);

  if (!report) {
    return <main className="mx-auto max-w-6xl px-6 py-10">読み込み中...</main>;
	}
	

	const reports = report.monthly_reports;
  const startMonth = reports[0]?.month;
  const endMonth =
    reports[report.monthly_reports.length - 1]?.month;

  const formatMonth = (month: string) => {
    const [year, monthNumber] = month.split("-");
    return `${year}年${Number(monthNumber)}月`;
  };

  const period =
    startMonth && endMonth
      ? `${formatMonth(startMonth)} ～ ${formatMonth(endMonth)}`
      : "";

  const summaryCard = [
    { label: "総労働時間", value: report.summary.total_work_time },
    { label: "総残業時間", value: report.summary.total_overtime },
    { label: "平均労働時間 / 日", value: report.summary.average_work_time },
  ];

  const alertCards = [
    { label: "遅刻回数", value: `${report.alerts.late_count}` },
    { label: "早退回数", value: `${report.alerts.early_leave_count}` },
    { label: "残業労働日数", value: `${report.alerts.overtime_days}` },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
          Attendance Report
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          マイ勤怠レポート
        </h1>
        <p className="mt-3 text-sm font-medium text-slate-500">
          {period}の勤務データから勤務状況を集計しています。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-bold text-slate-900">基本サマリー</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {summaryCard.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
            >
              <p className="text-sm font-semibold text-slate-500">
                {card.label}
              </p>
              <p className="mt-3 text-2xl font-bold text-slate-950">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          月次推移（過去6ヶ月）
        </h2>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
          <table className="w-full table-fixed">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm font-bold text-slate-500">
                <th className="px-6 py-4">月</th>
                <th className="px-6 py-4">労働時間</th>
                <th className="px-6 py-4">残業時間</th>
              </tr>
            </thead>
            <tbody>
              {report.monthly_reports.map((monthlyReport) => (
                <tr
                  key={monthlyReport.month}
                  className="border-t border-slate-100 font-semibold text-slate-800"
                >
                  <td className="px-6 py-4">{monthlyReport.month}</td>
                  <td className="px-6 py-4">{monthlyReport.work_time}</td>
                  <td className="px-6 py-4">{monthlyReport.overtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-slate-900">
          異常検知
        </h2>
        <p className="mb-4 text-sm font-medium text-slate-500">
          遅刻・早退・残業など、注意が必要な勤怠情報を集計しています。
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {alertCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
            >
              <p className="text-sm font-semibold text-slate-500">
                {card.label}
              </p>
              <p className="mt-3 text-2xl font-bold text-slate-950">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
