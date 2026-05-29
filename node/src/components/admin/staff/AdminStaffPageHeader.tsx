import { Users } from "lucide-react";

type Props = {
  staffCount: number;
};

export default function AdminStaffPageHeader({ staffCount }: Props) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
          Staff
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          スタッフ一覧
        </h1>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:w-44">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500">
            登録スタッフ数
          </span>
          <Users className="h-5 w-5 text-indigo-600" />
        </div>
        <p className="mt-3 text-3xl font-bold text-slate-950">
          {staffCount}
          <span className="ml-1 text-lg font-semibold text-slate-500">名</span>
        </p>
      </div>
    </div>
  );
}
