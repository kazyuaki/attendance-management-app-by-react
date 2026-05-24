import {  ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  date: string;
  onPrev: () => void;
  onNext: () => void;
  onChangeDate: (date: string) => void;
};

/* 日付ナビゲーション */
export default function AdminDateNavigation({
  date,
  onPrev,
  onNext,
  onChangeDate,
}: Props) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-md">
      <button
        className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100"
        onClick={onPrev}
      >
        <ChevronLeft className="h-5 w-5" />
        前日
      </button>
      <input 
        type="date"
        value={date}
        onChange={(e) => onChangeDate(e.target.value)}
        className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100"
        onClick={onNext}
      >
        翌日
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
