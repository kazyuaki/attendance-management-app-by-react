// src/components/admin/attendanceDetail/AdminAttendanceTimeRow.tsx

type Props = {
  label: string;
  start: string;
  end: string;
  onStartChange?: (value: string) => void;
  onEndChange?: (value: string) => void;
  onStartBlur?: () => void;
  onEndBlur?: () => void;
};

/* 勤怠詳細の出勤・退勤時間を表示するコンポーネント */
export default function AdminAttendanceTimeRow({
  label,
  start,
  end,
  onStartChange,
  onEndChange,
  onStartBlur,
  onEndBlur,
}: Props) {
  return (
    <div className="flex items-center border-b border-gray-100 px-8 py-5">
      <p className="w-40 text-lg font-medium text-gray-400">{label}</p>
      <div className="flex items-center gap-3">
        <input
          type="time"
          value={start}
          onChange={(e) => onStartChange?.(e.target.value)}
          onBlur={onStartBlur}
          className="w-32 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-800 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <span className="text-gray-400">〜</span>
        <input
          type="time"
          value={end}
          onChange={(e) => onEndChange?.(e.target.value)}
          onBlur={onEndBlur}
          className="w-32 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-800 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}
