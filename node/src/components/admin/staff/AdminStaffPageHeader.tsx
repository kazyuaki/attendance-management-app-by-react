import { Search, Users } from "lucide-react";

type Props = {
  staffCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

/** 管理者用スタッフ一覧ページヘッダーコンポーネント */
export default function AdminStaffPageHeader({
  staffCount,
  searchTerm,
  onSearchChange,
}: Props) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
          Staff
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">スタッフ一覧</h1>
      </div>

      <div className="flex justify-between gap-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:w-44">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">
              登録スタッフ数
            </span>
            <Users className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-950">
            {staffCount}
            <span className="ml-1 text-lg font-semibold text-slate-500">
              名
            </span>
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 ">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-slate-500 ">
              スタッフ検索
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 " />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="名前・メールアドレスで検索"
                className="w-96 rounded-xl border border-slate-200
                px-3 pl-12 pr-4 shadow-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
