import type { UserAttendanceEditRequestStatus } from "../../../types/userAttendance";

type Props = {
  status: UserAttendanceEditRequestStatus;
};

const STATUS_LABEL: Record<UserAttendanceEditRequestStatus, string> = {
  pending: "承認待ち",

  approved: "承認済み",

  rejected: "差し戻し",

  cancelled: "取り下げ",
};

const STATUS_CLASS: Record<UserAttendanceEditRequestStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",

  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",

  rejected: "bg-rose-50 text-rose-700 ring-rose-200",

  cancelled: "bg-slate-100 text-slate-600 ring-slate-200",
};

/** 勤怠修正申請ステータスバッジ */

export default function UserRequestStatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
