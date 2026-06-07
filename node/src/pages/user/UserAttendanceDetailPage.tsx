import { useParams } from "react-router-dom";
import UserAttendanceDetailCard from "../../components/user/attendanceDetail/UserAttendanceDetailCard";
import { useEffect, useState } from "react";
import type { UserAttendanceDetail } from "../../types/userAttendance";
import { fetchUserAttendanceDetail } from "../../api/user/attendance";

/* ユーザー用の勤怠詳細ページ */
export default function UserAttendanceDetailPage() {
  const { id } = useParams();
  const [attendance, setAttendance] = useState<UserAttendanceDetail | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAttendanceDetail = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchUserAttendanceDetail(id);

        setAttendance(data);
      } catch (error) {
        console.error("勤怠詳細の取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAttendanceDetail();
  }, [id]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-slate-500">読み込み中...</p>
      </main>
    );
  }
  if (!attendance) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-red-500">
          勤怠情報が見つかりませんでした。
        </p>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-12">
        <p className="text-base font-semibold tracking-wide text-emerald-600">
          Attendance Detail
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">勤怠詳細</h1>
      </div>

      <UserAttendanceDetailCard attendance={attendance} />
    </main>
  );
}
