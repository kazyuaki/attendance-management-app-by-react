// UserRequestTableRow.tsx
import { Link } from "react-router-dom";
import type { UserAttendanceEditRequest } from "../../../types/userAttendance";
import UserRequestStatusBadge from "./UserRequestStatusBadge";

type Props = {
  request: UserAttendanceEditRequest;
};

/** ユーザー勤怠修正申請一覧のテーブル行 */
export default function UserRequestTableRow({ request }: Props) {
  return (
    <tr className="transition hover:bg-slate-50">
      <td className="px-6 py-4 font-medium text-slate-700">
        {request.targetDate}
      </td>
      <td className="px-6 py-4 text-slate-600">
        {request.clockIn}〜{request.clockOut}
      </td>
      <td className="max-w-[280px] truncate px-6 py-4 text-slate-600">
        {request.note}
      </td>
      <td className="px-6 py-4 text-slate-600">{request.requestedAt}</td>
      <td className="px-6 py-4">
        <UserRequestStatusBadge status={request.status} />
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
  );
}
