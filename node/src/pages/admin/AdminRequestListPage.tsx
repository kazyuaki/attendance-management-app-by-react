import { useMemo, useState } from "react";
import { AdminRequestsEmptyState } from "../../components/admin/requests/AdminRequestsEmptyState";
import { AdminRequestsFilter } from "../../components/admin/requests/AdminRequestsFilter";
import { AdminRequestsPageHeader } from "../../components/admin/requests/AdminRequestsPageHeader";
import { AdminRequestsTable } from "../../components/admin/requests/AdminRequestsTable";
import type {
  AdminRequest,
  AdminRequestStatus,
} from "../../types/adminRequest";

const REQUESTS: AdminRequest[] = [
  {
    id: 1,
    type: "勤怠修正",
    status: "pending",
    userName: "西 怜奈",
    targetDate: "2023/06/01",
    reason: "遅延のため",
    requestedAt: "2023/08/02 09:12",
    updatedAt: "2023/08/02 09:12",
  },
  {
    id: 2,
    type: "勤怠修正",
    status: "approved",
    userName: "山田 太郎",
    targetDate: "2023/06/05",
    reason: "打刻漏れ",
    requestedAt: "2023/08/03 18:41",
    updatedAt: "2023/08/04 10:20",
  },
  {
    id: 3,
    type: "休憩修正",
    status: "pending",
    userName: "佐藤 花子",
    targetDate: "2023/06/08",
    reason: "休憩時間の入力間違い",
    requestedAt: "2023/08/05 13:05",
    updatedAt: "2023/08/05 13:05",
  },
];

/* 管理者用の申請一覧ページ */
export default function AdminRequestListPage() {
  const [activeTab, setActiveTab] = useState<AdminRequestStatus>("pending");
  const [searchTerm, setSearchTerm] = useState("");

  // ステータスごとの申請数をカウント
  const pendingCount = REQUESTS.filter(
    (request) => request.status === "pending",
  ).length;
  const approvedCount = REQUESTS.filter(
    (request) => request.status === "approved",
  ).length;

  // タブと検索キーワードに基づいて申請をフィルタリング
  const filteredRequests = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return REQUESTS.filter((request) => {
      const matchesStatus = request.status === activeTab;
      const matchesKeyword =
        keyword.length === 0 ||
        [request.userName, request.type, request.reason, request.targetDate].some(
          (value) => value.toLowerCase().includes(keyword),
        );

      return matchesStatus && matchesKeyword;
    });
  }, [activeTab, searchTerm]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section>
        <AdminRequestsPageHeader
          pendingCount={pendingCount}
          approvedCount={approvedCount}
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
