import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const staff = [
  { name: "山田 太郎", initial: "山" },
  { name: "西 怜奈", initial: "西" },
  { name: "増田 一世", initial: "増" },
  { name: "山本 敬吉", initial: "山" },
  { name: "秋田 朋美", initial: "秋" },
];

/* 管理者用の勤怠一覧ページ */
export default function AdminAttendanceListPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* ページヘッダー */}
      <div className="mb-8 flex items-start justify-between">
        {/* タイトル */}
        <div>
          <p className="text-base font-semibold tracking-wide text-indigo-600">
            Attendance
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">勤怠一覧</h1>
          <p className="mt-1 text-base text-slate-500">
            2026年6月1日（月）の勤怠状況
          </p>
        </div>

        {/* 日付ナビゲーション */}
        <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-md">
          <button className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100">
            <ChevronLeft className="h-5 w-5" />
            前日
          </button>
          <div className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-base font-bold text-white shadow-md shadow-indigo-500/20">
            <CalendarDays className="h-5 w-5" />
            2026/06/01
          </div>
          <button className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100">
            翌日
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 勤怠テーブル */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        <table className="w-full text-left text-base">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                スタッフ名
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                出勤
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                退勤
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                休憩
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                合計
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {staff.map((person) => (
              <tr
                key={person.name}
                className="group transition hover:bg-slate-50/70"
              >
                {/* スタッフ名 + アバター */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                      {person.initial}
                    </div>
                    <span className="font-semibold text-slate-900">
                      {person.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-700">09:00</td>
                <td className="px-6 py-4 font-medium text-slate-700">18:00</td>
                <td className="px-6 py-4 text-slate-500">1:00</td>
                <td className="px-6 py-4 font-bold text-slate-900">8:00</td>
                <td className="px-6 py-4">
                  <button className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100">
                    詳細 →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
