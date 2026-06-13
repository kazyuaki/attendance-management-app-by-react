// src/components/admin/requestDetai/AdminRequestBreakRow.tsx

type Props = {
  label: string;
  beforeBreakIn: string;
  beforeBreakOut: string;
  afterBreakIn: string;
  afterBreakOut: string;
};

/** 申請詳細の休憩時間を表示するコンポーネント */
export default function AdminRequestBreakRow({
  label,
  beforeBreakIn,
  beforeBreakOut,
  afterBreakIn,
  afterBreakOut,
}: Props) {
  return (
    <div className="flex items-center border-b border-gray-100 px-8 py-5">
      <p className="w-40 text-lg font-medium text-gray-400">{label}</p>

      <div className="flex gap-16">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">修正前</p>
          <p className="text-lg font-semibold text-gray-800">
            {beforeBreakIn}〜{beforeBreakOut}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">修正後</p>
          <p className="text-lg font-semibold text-ray-800">
            {afterBreakIn}〜{afterBreakOut}
          </p>
        </div>
      </div>
    </div>
  );
}
