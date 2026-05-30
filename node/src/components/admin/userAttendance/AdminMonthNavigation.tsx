// components/admin/userAttendance/AdminUserAttendancePageHeader.tsx

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  month: string;
  onPrev: () => void;
  onNext: () => void;
  onChangeMonth: (month: string) => void;
};

/* スタッフ別月次勤怠一覧ページの月ナビゲーション */
export default function AdminMonthNavigation({
  month,
  onPrev,
  onNext,
  onChangeMonth,
}: Props) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-md">
      <button
        className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100"
        onClick={onPrev}
      >
        <ChevronLeft className="h-5 w-5" />
        前月
      </button>
      <input
        type="month"
        value={month}
        onChange={(e) => onChangeMonth(e.target.value)}
        className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100"
        onClick={onNext}
      >
        翌月
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}