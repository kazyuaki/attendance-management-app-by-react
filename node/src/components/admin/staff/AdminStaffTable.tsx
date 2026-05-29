// src/components/admin/staff/AdminStaffRow.tsx

import AdminStaffRow from "./AdminStaffRow";

type Staff = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  staffs: Staff[];
};

export default function AdminStaffTable({ staffs }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      <table className="w-full text-left text-base">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              名前
            </th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              メールアドレス
            </th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              月次勤怠
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {staffs.map((staff) => (
            <AdminStaffRow
              key={staff.id}
              name={staff.name}
              email={staff.email}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
