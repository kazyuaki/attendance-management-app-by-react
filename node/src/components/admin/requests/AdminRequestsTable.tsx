// src/components/admin/requests/AdminRequestsTable.tsx

import { ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";
import { ADMIN_REQUEST_STATUS_LABEL } from "../../../constants/adminRequest";
import type { AdminRequest } from "../../../types/adminRequest";

const tableColumns = [
  "状態",
  "申請者",
  "区分",
  "対象日",
  "申請理由",
  "申請日時",
  "",
];

type Props = {
  requests: AdminRequest[];
};

/**
 * 申請の一覧を表示するテーブルコンポーネント
 *
 * @param requests - 表示する申請の配列
 */
export function AdminRequestsTable({ requests }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            {tableColumns.map((column) => (
              <th
                key={column}
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {requests.map((request) => {
            const isPending = request.status === "pending";

            return (
              <tr
                key={request.id}
                className="group transition hover:bg-slate-50/80"
              >
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                      isPending
                        ? "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                        : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    }`}
                  >
                    {isPending ? (
                      <Clock3 className="h-3.5 w-3.5" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    )}
                    {ADMIN_REQUEST_STATUS_LABEL[request.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                      {request.userName.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-900">
                      {request.userName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-600">
                  {request.type}
                </td>
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {request.targetDate}
                </td>
                <td className="px-6 py-4 text-slate-600">{request.reason}</td>
                <td className="px-6 py-4 text-slate-600">
                  {request.requestedAt}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100"
                  >
                    詳細
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
