// src/components/admin/requests/AdminRequestsSummaryCard.tsx
import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  count: number;
  icon: LucideIcon;
  iconClassName?: string;
};

/**
 * 申請の概要を表示するカードコンポーネント
 *
 * @param label - カードのタイトル
 * @param count - 申請の数
 * @param icon - アイコンコンポーネント（LucideIcon）
 * @param iconClassName - アイコンの追加クラス名（オプション）
 */
export function AdminRequestsSummaryCard({
  label,
  count,
  icon: Icon,
  iconClassName,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500">{label}</span>
        <Icon className={`h-5 w-5 ${iconClassName}`} />
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-950">{count}</p>
    </div>
  );
}
