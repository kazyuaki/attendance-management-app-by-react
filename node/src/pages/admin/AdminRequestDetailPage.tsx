import { useNavigate, useParams } from "react-router-dom";
import type { AdminRequestDetail } from "../../types/adminRequest";
import { approveAdminRequest, getAdminRequestDetail } from "../../api/admin/adminRequest";
import { useEffect, useState } from "react";
import AdminRequestDetailCard from "../../components/admin/requestDetail/AdminRequestDetailCard";
import toast from "react-hot-toast";

/** 管理者用 申請詳細ページ*/
export default function AdminRequestDetailPage() {
  const { id } = useParams();

  const [request, setRequest] = useState<AdminRequestDetail | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequest = async () => {
      if (!id) return;

      const data = await getAdminRequestDetail(Number(id));
      setRequest(data);
    };
    fetchRequest();
  }, [id]);

  // 承認処理
  const handleApprove = async () => {
    try {
      if (!request) return
      await approveAdminRequest(request.id);

      toast.success("申請を承認しました。");
      navigate("/admin/requests");
    } catch (error) {
      console.error("申請承認に失敗しました", error);

      toast.error("申請承認に失敗しました。");
    }
  };

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
      <AdminRequestDetailCard
        request={request}
        onApprove={handleApprove}
      />
    </main>
  );
}
