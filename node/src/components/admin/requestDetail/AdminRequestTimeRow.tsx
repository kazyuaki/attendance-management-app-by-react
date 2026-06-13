// src/components/admin/requestDetail/AdminRequestTimeRow.tsx

type Props = {
  label: string;
  beforeStart: string;
  beforeEnd: string;
  afterStart: string;
  afterEnd: string;
};

/** 申請詳細の出勤・退勤時間を表示するコンポーネント */
export default function AdminRequestTimeRow({
  label,
  beforeStart,
  beforeEnd,
  afterStart,
  afterEnd,
}: Props) {
  return (
    <div className="flex items-center border-b border-gray-100 px-8 py-5">
      <p className="w-40 text-lg font-medium text-gray-400">{label}</p>

      <div className="flex gap-16">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">修正前</p>
          <p className="text-lg font-semibold text-gray-800">
            {beforeStart}〜{beforeEnd}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">修正後</p>
          <p className="text-lg font-semibold text-gray-800">
            {afterStart}〜{afterEnd}
          </p>
        </div>
      </div>
    </div>
  );
}
