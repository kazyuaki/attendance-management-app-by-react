// src/components/admin/requests/AdminRequestsFilter.tsx

import { Search } from "lucide-react";
import { ADMIN_REQUEST_STATUS_TABS } from "../../../constants/adminRequest";
import type { AdminRequestStatus } from "../../../types/adminRequest";

type Props = {
  activeTab: AdminRequestStatus;
  searchTerm: string;
  onTabChange: (tab: AdminRequestStatus) => void;
  onSearchChange: (term: string) => void;
};

/**
 * 申請のフィルタリングと検索を行うコンポーネント
 *
 * @param activeTab - 現在選択されているタブの値
 * @param searchTerm - 現在の検索キーワード
 * @param onTabChange - タブが変更されたときのコールバック関数
 * @param onSearchChange - 検索キーワードが変更されたときのコールバック関数
 */
export function AdminRequestsFilter({
  activeTab,
  searchTerm,
  onTabChange,
  onSearchChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="inline-flex rounded-xl bg-slate-100 p-1">
        {ADMIN_REQUEST_STATUS_TABS.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange(tab.value)}
              className={`rounded-lg px-5 py-2.5 text-sm font-bold transition ${
                isActive
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <label className="relative block w-full sm:w-80">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="名前・理由で検索"
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </label>
    </div>
  );
}
