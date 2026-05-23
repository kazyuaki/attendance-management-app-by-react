// components/admin/AdminSubmitButton.tsx
type Props = {
  children: React.ReactNode;
  disabled?: boolean;
};

export default function AdminSubmitButton({ children, disabled }: Props) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`mt-2 w-full rounded-xl py-3 text-base font-semibold transition-all ${
        disabled
          ? "cursor-not-allowed bg-slate-300 text-slate-500"
          : "bg-indigo-600 text-white hover:-translate-y-0.5 hover:bg-indigo-700"
      }`}
    >
      {children}
    </button>
  );
}
