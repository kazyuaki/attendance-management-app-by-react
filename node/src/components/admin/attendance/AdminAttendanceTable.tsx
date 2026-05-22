import AdminAttendanceRow from "./AdminAttendanceRow";

type Staff = {
  name: string;
  initial: string;
};

type Props = {
  staff: Staff[];
};

const COLUMNS = ["スタッフ名", "出勤", "退勤", "休憩", "合計"];

/* 勤怠テーブル */
export default function AdminAttendanceTable({ staff }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      <table className="w-full text-left text-base">
        <thead>
          <tr className="border-b border-slate-100">
            {COLUMNS.map((col) => (
              <th
                key={col}
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                {col}
              </th>
            ))}
            <th className="px-6 py-4" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {staff.map((person) => (
            <AdminAttendanceRow key={person.name} {...person} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
