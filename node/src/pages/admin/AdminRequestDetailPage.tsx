import { useParams } from "react-router-dom";
import type { AdminRequestDetail } from "../../types/adminRequest";
import { getAdminRequestDetail } from "../../api/admin/adminRequest";
import { useEffect, useState } from "react";

export default function AdminRequestDetailPage() {
  const { id } = useParams();

  const [request, setRequest] = useState<AdminRequestDetail | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      if (!id) return;

      const data = await getAdminRequestDetail(Number(id));
      setRequest(data);
    };
    fetchRequest();
  }, [id]);

  if (!request) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h1>申請詳細</h1>
      <p>申請者：{request.userName}</p>
      <p>対象日：{request.targetDate}</p>
      <p>出勤：{request.clockIn}</p>
      <p>退勤：{request.clockOut}</p>
      {request.breakTimes.map((breakTime) => (
        <div key={breakTime.id}>
          <p>
            {breakTime.breakIn} ～ {breakTime.breakOut}
          </p>
        </div>
      ))}
      <p>理由：{request.reason}</p>
    </div>
  );
}
