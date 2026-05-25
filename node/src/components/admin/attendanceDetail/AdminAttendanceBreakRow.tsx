// src/components/admin/attendanceDetail/AdminAttendanceBreakRow.tsx

type Props = {
  label: string;
  breakIn: string;
  breakOut: string;
  onBreakInChange?: (value: string) => void;
  onBreakOutChange?: (value: string) => void;
};

/* 勤怠詳細の休憩時間を表示するコンポーネント */
export default function AdminAttendanceBreakRow({
  label,
  breakIn,
  breakOut,
  onBreakInChange,
  onBreakOutChange,
}: Props) {
  return (
    <div className="flex items-center border-b border-gray-100 px-8 py-5">
      <p className="w-40 text-lg font-medium text-gray-400">{label}</p>
      <div className="flex items-center gap-3">
        <input
          type="time"
          value={breakIn}
          onChange={(e) => onBreakInChange?.(e.target.value)}
          className="w-32 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-800 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <span className="text-gray-400">〜</span>
        <input
          type="time"
          value={breakOut}
          onChange={(e) => onBreakOutChange?.(e.target.value)}
          className="w-32 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-800 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}
