// src/user/attendanceList/UserMonthNavvigation.tsx

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  month: string;
  onPrev: () => void;
  onNext: () => void;
  onChangeMonth: (month: string) => void;
};

/* 月ナビゲーション */
export default function UserMonthNavigation({
  month,
  onPrev,
  onNext,
  onChangeMonth,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-md sm:w-auto sm:flex-row sm:items-center">
      <button
        onClick={onPrev}
        className="flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100"
      >
        <ChevronLeft className="h-5 w-5" />
        前月
      </button>

      <input
        type="month"
        value={month}
        onChange={(e) => onChangeMonth(e.target.value)}
        className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-44"
      />

      <button
        onClick={onNext}
        className="flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100"
      >
        翌月
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
