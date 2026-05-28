import { CheckCircle2, Clock3 } from "lucide-react";
import { ADMIN_REQUEST_STATUS_LABEL } from "../../../constants/adminRequest";
import { AdminRequestsSummaryCard } from "./AdminRequestsSummaryCard";

type Props = {
  pendingCount: number;
  approvedCount: number;
};

export function AdminRequestsPageHeader({
  pendingCount,
  approvedCount,
}: Props) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
          Requests
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">申請一覧</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:w-[360px]">
        <AdminRequestsSummaryCard
          label={ADMIN_REQUEST_STATUS_LABEL.pending}
          count={pendingCount}
          icon={Clock3}
          iconClassName="text-amber-700"
        />
        <AdminRequestsSummaryCard
          label={ADMIN_REQUEST_STATUS_LABEL.approved}
          count={approvedCount}
          icon={CheckCircle2}
          iconClassName="text-emerald-700"
        />
      </div>
    </div>
  );
}
