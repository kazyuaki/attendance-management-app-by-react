// src/components/admin/requestDetail/AdminRequestDetailCard.tsx

import { useState } from "react";
import type { AdminRequestDetail } from "../../../types/adminRequest";
import AdminRequestBreakRow from "./AdminRequestBreakRow";
import AdminRequestTimeRow from "./AdminRequestTimeRow";
import AdminRequestRemandDialog from "./AdminRequestRemandDialog";

type Props = {
  request: AdminRequestDetail;
  onApprove: () => void;
  onRemand: (rejectedReason: string) => void;
};

/** 管理者用 申請詳細カード */
export default function AdminRequestDetailCard({
  request,
  onApprove,
  onRemand,
}: Props) {
  const [isRemandDialogOpen, setIsRemandDialogOpen] = useState(false);
  const [rejectedReason, setRejectedReason] = useState("");
  const isProcessed = request.status !== "pending";
  const processedMessage =
    request.status === "approved"
      ? "この申請は承認済みです。再度承認または差し戻しはできません。"
      : "この申請は差し戻し済みです。再度承認または差し戻しはできません。";
  
  const handleCloseRemandDialog = () => {
    setIsRemandDialogOpen(false);
    setRejectedReason("");
  };

  const handleSubmitRemand = () => {
    const trimmedReason = rejectedReason.trim();

    if (!trimmedReason) return;

    onRemand(trimmedReason);
    setIsRemandDialogOpen(false);
    setRejectedReason("");
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        {/* セクションヘッダー */}
        <div className="border-b border-gray-100 bg-gray-50/60 px-8 py-4">
          <h2 className="text-lg font-semibold uppercase tracking-widest text-gray-400">
            申請詳細
          </h2>
        </div>

        {/* 名前 */}
        <div className="flex items-center border-b border-gray-100 px-8 py-5">
          <p className="w-40 text-lg font-font-medium  text-gray-400">名前</p>
          <p>{request.userName} </p>
        </div>

        {/* 日付 */}
        <div className="flex items-center border-b border-gray-100 px-8 py-5">
          <p className="w-40 text-lg font-font-medium text-gray-400">対象日</p>
          <p className="text-lg font-semibold text-gray-800">
            {request.targetDate}
          </p>
        </div>

        {/* 出勤・退勤 */}
        <AdminRequestTimeRow
          label="勤務時間"
          beforeStart={request.before.clockIn ?? ""}
          beforeEnd={request.before.clockOut ?? ""}
          afterStart={request.after.clockIn ?? ""}
          afterEnd={request.after.clockOut ?? ""}
        />

        {/* 休憩時間 */}
        {request.after.breakTimes.map((breakTime, index) => {
          const beforeBreakTime = request.before.breakTimes[index];
          return (
            <AdminRequestBreakRow
              key={index}
              label={`休憩${index + 1}`}
              beforeBreakIn={beforeBreakTime?.breakIn ?? ""}
              beforeBreakOut={beforeBreakTime?.breakOut ?? ""}
              afterBreakIn={breakTime.breakIn ?? ""}
              afterBreakOut={breakTime.breakOut ?? ""}
            />
          );
        })}

        {/* 備考 */}
        <div className="flex items-start px-8 py-5">
          <p className="w-40 pt-1 text-lg font-medium text-gray-400">備考</p>
          <div className="w-full">
            <p>{request.reason}</p>
          </div>
        </div>

        {/* ボタン */}
        <div className="border-t border-gray-100 px-8 py-5">
          {isProcessed ? (
            <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
              {processedMessage}
            </p>
          ) : (
            <div className="flex justify-end gap-4 border-gray-100">
              <button
                onClick={() => setIsRemandDialogOpen(true)}
                className="rounded-lg border border-red-300 px-5 py-2 text-lg font-semibold text-red-600 shadow-sm transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95"
              >
                差し戻し
              </button>
              <button
                onClick={onApprove}
                className="rounded-lg bg-blue-600 px-5 py-2 text-lg font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
              >
                承認
              </button>
            </div>
          )}
        </div>
      </div>
      {isRemandDialogOpen && (
        <AdminRequestRemandDialog
          rejectedReason={rejectedReason}
          onChangeRejectedReason={setRejectedReason}
          onClose={handleCloseRemandDialog}
          onSubmit={handleSubmitRemand}
        />
      )}
    </div>
  );
}
