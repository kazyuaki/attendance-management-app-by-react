// src/components/admin/staff/AdminStaffRow.tsx

type Props = {
  name: string;
  email: string;
};

export default function AdminStaffRow({ name, email }: Props) {
  const initial = name.charAt(0);
  return (
    <tr className="group transition hover:bg-slate-50/70">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
            {initial}
          </div>
          <span className="font-semibold text-slate-900">{name}</span>
        </div>
      </td>
      <td className="px-6 py-4 font-medium text-slate-700">{email}</td>
      <td className="px-6 py-4">
        <button className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100">
          詳細 →
        </button>
      </td>
    </tr>
  );
}
