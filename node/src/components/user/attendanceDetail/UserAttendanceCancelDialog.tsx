// src/components/user/attendanceDetail/UserAttendnceCancelDialog.tsx

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function UserAttendanceCancelDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
	if (!open) return null;

	return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-800">
          申請を取り下げますか？
        </h2>

        <p className="mt-3 text-gray-600">
          取り下げた申請は承認対象から除外されます。
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            キャンセル
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
          >
            取り下げる
          </button>
        </div>
      </div>
    </div>
  );
}
