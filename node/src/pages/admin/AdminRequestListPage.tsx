import { useEffect, useMemo, useState } from "react";
import { getAdminRequests } from "../../api/admin/adminRequest";
import { AdminRequestsEmptyState } from "../../components/admin/requests/AdminRequestsEmptyState";
import { AdminRequestsFilter } from "../../components/admin/requests/AdminRequestsFilter";
import { AdminRequestsPageHeader } from "../../components/admin/requests/AdminRequestsPageHeader";
import { AdminRequestsTable } from "../../components/admin/requests/AdminRequestsTable";
import type {
  AdminRequest,
  AdminRequestStatus,
} from "../../types/adminRequest";

/* 管理者用の申請一覧ページ */
export default function AdminRequestListPage() {
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [activeTab, setActiveTab] = useState<AdminRequestStatus>("pending");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAdminRequests();
        setRequests(data);
      } catch (error) {
        console.error("申請一覧の取得に失敗しました:", error);
      }
    };

    fetchRequests();
  }, []);

  // ステータスごとの申請数をカウント
  const pendingCount = requests.filter(
    (request) => request.status === "pending",
  ).length;
  const approvedCount = requests.filter(
    (request) => request.status === "approved",
  ).length;
  const rejectedCount = requests.filter(
    (request) => request.status === "rejected",
  ).length;

  // タブと検索キーワードに基づいて申請をフィルタリング
  const filteredRequests = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus = request.status === activeTab;
      const matchesKeyword =
        keyword.length === 0 ||
        [request.userName, request.type, request.reason, request.targetDate].some(
          (value) => value.toLowerCase().includes(keyword),
        );

      return matchesStatus && matchesKeyword;
    });
  }, [activeTab, requests, searchTerm]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section>
        <AdminRequestsPageHeader
          pendingCount={pendingCount}
          approvedCount={approvedCount}
          rejectedCount={rejectedCount}
        />

        <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
          <AdminRequestsFilter
            activeTab={activeTab}
            searchTerm={searchTerm}
            onTabChange={setActiveTab}
            onSearchChange={setSearchTerm}
          />

          <AdminRequestsTable requests={filteredRequests} />

          {filteredRequests.length === 0 && <AdminRequestsEmptyState />}
        </div>
      </section>
    </main>
  );
}
