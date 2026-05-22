// components/admin/AdminSubmitButton.tsx
type Props = {
  children: React.ReactNode;
};

export default function AdminSubmitButton({ children }: Props) {
  return (
    <button
      type="submit"
      className="mt-2 w-full rounded-xl bg-indigo-600 py-3 text-base font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:translate-y-0"
    >
      {children}
    </button>
  );
}
