// src/pages/admin/AdminAttendanceDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminAttendanceDetailCard from "../../components/admin/attendanceDetail/AdminAttendanceDetailCard";
import { getAdminAttendanceDetail } from "../../api/admin/adminAttendance";

type AttendanceDetail = {
  id: number;
  user_name: string;
  work_date_value: string;
  work_date: string;
  clock_in: string | null;
  clock_out: string | null;
  note: string;
  break_times: {
    id: number;
    break_in: string;
    break_out: string | null;
  }[];
};

/* 管理者用の勤怠詳細ページ */
export default function AdminAttendanceDetailPage() {
  const { id } = useParams();
  const [attendance, setAttendance] = useState<AttendanceDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchAttendanceDetail = async () => {
      try {
        const data = await getAdminAttendanceDetail(id);
        setAttendance(data);
        console.log("勤怠詳細を取得しました:", data);
      } catch (error) {
        console.error("勤怠詳細の取得に失敗しました:", error);
      }
    };

    fetchAttendanceDetail();
  }, [id]);
  if (!attendance) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-gray-500">読み込み中...</p>
      </main>
    );
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
