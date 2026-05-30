import AdminAttendancePageHeader from "../../components/admin/attendance/AdminAttendancePageHeader";
import AdminDateNavigation from "../../components/admin/attendance/AdminDateNavigation";
import AdminAttendanceTable from "../../components/admin/attendance/AdminAttendanceTable";
import { useEffect, useState } from "react";
import type { AdminAttendance } from "../../types/adminAttendance";
import { fetchAdminAttendances } from "../../api/admin/adminAttendance";
import { useSearchParams } from "react-router-dom";

// 日付を日本語表記のラベルに変換する関数
const formatDateLabel = (date: string): string => {
  const targetDate = new Date(date);
  return targetDate.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
};

/* 管理者用の勤怠一覧ページ */
export default function AdminAttendanceListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentDate = searchParams.get("date") || "2026-06-01"; // デフォルトの日付を設定

  const [attendances, setAttendances] = useState<AdminAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // コンポーネントの初回レンダリング時に勤怠情報を取得するための副作用
  useEffect(() => {
    const getAttendances = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAdminAttendances(currentDate);
        setAttendances(data);
        console.log("勤怠情報を取得しました:", data);
      } catch (error) {
        console.error("勤怠情報の取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAttendances();
  }, [currentDate]);

  // 日付を前日または翌日に変更する関数
  const changeDate = (days: number) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + days);

    const nextDate = date.toISOString().split("T")[0]; // YYYY-MM-DD形式に変換
    setSearchParams({ date: nextDate });
  };

  const handleChangeDate = (date: string) => {
    setSearchParams({ date });
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-start justify-between">
        <AdminAttendancePageHeader dateLabel={formatDateLabel(currentDate)} />
        <AdminDateNavigation
          date={currentDate}
          onPrev={() => changeDate(-1)}
          onNext={() => changeDate(1)}
          onChangeDate={handleChangeDate}
        />
      </div>
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-lg font-semibold text-slate-500">読み込み中...</p>
        </div>
      ) : (
        <AdminAttendanceTable attendances={attendances} date={currentDate} />
      )}
    </main>
  );
}
