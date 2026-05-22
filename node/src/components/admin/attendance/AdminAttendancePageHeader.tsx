type Props = {
  dateLabel: string;
};

/* 勤怠一覧ページのヘッダー */
export default function AdminAttendancePageHeader({ dateLabel }: Props) {
  return (
    <div>
      <p className="text-base font-semibold tracking-wide text-indigo-600">
        Attendance
      </p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900">勤怠一覧</h1>
      <p className="mt-1 text-base text-slate-500">{dateLabel}の勤怠状況</p>
    </div>
  );
}
