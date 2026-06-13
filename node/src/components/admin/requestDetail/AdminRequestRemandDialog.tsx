// src/components/admin/requestDetail/AdminRequestRemandDialog.tsx

type Props = {
  rejectedReason: string;
  onChangeRejectedReason: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

/** 差し戻し理由記入ダイアログ */
export default function AdminRequestRemandDialog({
  rejectedReason,
  onChangeRejectedReason,
  onClose,
  onSubmit,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          差し戻し理由
        </h2>

        <textarea
          value={rejectedReason}
          onChange={(e) => onChangeRejectedReason(e.target.value)}
          rows={5}
          className="w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
          placeholder="差し戻し理由を入力してください"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-600 hover:bg-gray-50"
          >
            キャンセル
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!rejectedReason.trim()}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            差し戻す
          </button>
        </div>
      </div>
    </div>
  );
}
