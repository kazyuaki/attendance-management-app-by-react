// src/pages/admin/AdminAttendanceDetailPage.tsx
import { useParams } from "react-router-dom";
import AdminAttendanceDetailCard from "../../components/admin/attendanceDetail/AdminAttendanceDetailCard";
import { useAdminAttendanceDetail } from "../../hooks/useAdminAttendanceDetail";

/* 管理者用の勤怠詳細ページ */
export default function AdminAttendanceDetailPage() {
  const { id } = useParams();

  const { attendance, loading } = useAdminAttendanceDetail(id);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-gray-500">読み込み中...</p>
      </main>
    );
  }

  if (!attendance) { 
    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-red-500">勤怠情報が見つかりませんでした。</p>
      </main>
    )
  }
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-12 text-2xl font-bold text-gray-900">
        {attendance.user_name}さんの勤怠詳細
      </h1>
      <AdminAttendanceDetailCard attendance={attendance} />
    </main>
  );
}
