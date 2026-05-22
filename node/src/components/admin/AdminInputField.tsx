// components/admin/AdminInputField.tsx
type Props = {
  label: string;
  type: "email" | "password" | "text";
  placeholder?: string;
  autoComplete?: string;
};

/* 管理者ログインフォームの入力フィールド */
export default function AdminInputField({
  label,
  type,
  placeholder,
  autoComplete,
}: Props) {
  return (
    <div>
      <label className="mb-1.5 block text-base font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
}
