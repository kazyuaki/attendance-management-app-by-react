import { useEffect, useState } from "react";
import { fetchUserAttendanceEditRequests } from "../../api/user/attendance";
import type {
  UserAttendanceEditRequest,
} from "../../types/userAttendance";
import UserRequestTable from "../../components/user/requestList/UserRequestTable";


/** ユーザー勤怠修正申請一覧ページ */
export default function UserRequestListPage() {
  const [requests, setRequests] = useState<UserAttendanceEditRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRequests = async () => {
      try {
        setIsLoading(true);

        const data = await fetchUserAttendanceEditRequests();
        setRequests(data);
      } catch (error) {
        console.error("申請一覧取得失敗", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRequests();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section>
        <div className="mb-8">
          <p className="text-base font-semibold tracking-wide text-emerald-600">
            Requests
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">申請一覧</h1>
        </div>

        <UserRequestTable requests={requests} />
      </section>
    </main>
  );
}
