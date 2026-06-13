// src/components/admin/requestDetail/AdminRequestDetailCard.tsx

import type { AdminRequestDetail } from "../../../types/adminRequest";
import AdminRequestBreakRow from "./AdminRequestBreakRow";
import AdminRequestTimeRow from "./AdminRequestTimeRow";

type Props = {
  request: AdminRequestDetail;
};

/** 管理者用 申請詳細カード */
export default function AdminRequestDetailCard({ request }: Props) {
  

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
        <div className="flex justify-end gap-4 border-t border-gray-100 px-8 py-5">
          <button className="rounded-lg border border-red-300 px-5 py-2 text-lg font-semibold text-red-600 shadow-sm transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95">
            差し戻し
          </button>
          <button className="rounded-lg bg-blue-600 px-5 py-2 text-lg font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95">
            承認
          </button>
        </div>
      </div>
    </div>
  );
}
