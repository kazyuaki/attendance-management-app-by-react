import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserAttendanceEditRequests } from "../../api/user/attendance";
import type {
  UserAttendanceEditRequest,
  UserAttendanceEditRequestStatus,
} from "../../types/userAttendance";

const STATUS_LABEL: Record<UserAttendanceEditRequestStatus, string> = {
  pending: "承認待ち",
  approved: "承認済み",
  rejected: "差し戻し",
};

const STATUS_CLASS: Record<UserAttendanceEditRequestStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};

const COLUMNS = ["対象日", "申請時間", "理由", "申請日時", "状態", "詳細"];

/** ユーザー勤怠修正申請一覧ページ */
export default function UserRequestListPage() {
  const [requests, setRequests] = useState<UserAttendanceEditRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRequests = async () => {
      try {
        setIsLoading(true);

        const data = await fetchUserAttendanceEditRequests();
        setRequests(data);
      } catch (error) {
        console.error("申請一覧取得失敗", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRequests();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section>
        <div className="mb-8">
          <p className="text-base font-semibold tracking-wide text-emerald-600">
            Requests
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">申請一覧</h1>
        </div>

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
                <tr key={request.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {request.targetDate}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {request.clockIn}〜{request.clockOut}
                  </td>
                  <td className="max-w-[280px] truncate px-6 py-4 text-slate-600">
                    {request.note}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {request.requestedAt}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${STATUS_CLASS[request.status]}`}
                    >
                      {STATUS_LABEL[request.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/attendance/${request.attendanceId}`}
                      className="font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {requests.length === 0 && (
            <div className="px-6 py-12 text-center text-slate-500">
              申請はありません
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
