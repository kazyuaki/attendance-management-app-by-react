// src/components/user/attendanceDetail/UserAttendanceBreakRow.tsx

type Props = {
  label: string;
  breakIn: string;
  breakOut: string;
};

export default function UserAttendanceBreakRow({
  label,
  breakIn,
  breakOut,
}: Props) {
  return (
    <div className="flex items-center border-b border-gray-100 px-8 py-5">
      <p className="w-40 text-lg font-medium text-gray-400">{label}</p>

      <div className="flex items-center gap-3">
        <input
          type="time"
          defaultValue={breakIn}
          className="w-32 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-800 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        <span className="text-gray-400">〜</span>

        <input
          type="time"
          defaultValue={breakOut}
          className="w-32 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-800 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}
