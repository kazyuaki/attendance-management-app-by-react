import { useParams } from "react-router-dom";
import type { AdminRequestDetail } from "../../types/adminRequest";
import { getAdminRequestDetail } from "../../api/admin/adminRequest";
import { useEffect, useState } from "react";
import AdminRequestDetailCard from "../../components/admin/requestDetail/AdminRequestDetailCard";

/** 管理者用 申請詳細ページ*/
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
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-12">
        <p className="text-base font-semibold tracking-wide text-indigo-600">
          Request Detail
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          {request.userName}さんの申請詳細
        </h1>
      </div>
      <AdminRequestDetailCard request={request} />
    </main>
  );
}
