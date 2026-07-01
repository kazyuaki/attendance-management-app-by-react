import type { UserAttendanceEditRequest } from "../../../types/userAttendance";
import UserRequestTableRow from "./UserRequestTableRow";

type Props = {
  requests: UserAttendanceEditRequest[];
};

const COLUMNS = ["対象日", "申請時間", "理由", "申請日時", "状態", "詳細"];

/** 勤怠修正申請一覧テーブル */
export default function UserRequestTable({ requests }: Props) {
  if (requests.length === 0) {
    return (
      <div className="rounded-2xl bg-white px-6 py-12 text-center text-slate-500 shadow-sm ring-1 ring-slate-100">
        申請はありません
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      <table className="w-full min-w-[860px] text-left text-base">
        <thead>
          <tr className="border-b border-slate-100">
            {COLUMNS.map((column) => (
              <th
                key={column}
                className="px-6 py-4 text-sm font-bold text-slate-500"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {requests.map((request) => (
            <UserRequestTableRow key={request.id} request={request} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
