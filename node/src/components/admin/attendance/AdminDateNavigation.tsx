import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  date: string;
};

/* 日付ナビゲーション */
export default function AdminDateNavigation({ date }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-md">
      <button className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100">
        <ChevronLeft className="h-5 w-5" />
        前日
      </button>
      <div className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-base font-bold text-white shadow-md shadow-indigo-500/20">
        <CalendarDays className="h-5 w-5" />
        {date}
      </div>
      <button className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100">
        翌日
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
