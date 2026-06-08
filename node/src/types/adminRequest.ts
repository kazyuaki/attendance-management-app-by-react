// src/types/adminRequest.ts

export type AdminRequestStatus = "pending" | "approved";

// 管理者用の申請の型定義
export type AdminRequest = {
  id: number;
  type: string;
  status: AdminRequestStatus;
  userName: string;
  targetDate: string;
  reason: string;
  requestedAt: string;
  updatedAt: string;
};

// 管理者用の申請のレスポンス型定義
export type AdminRequestResponse = {
  id: number;
  status: AdminRequestStatus;
  user_name: string;
  target_date: string;
  note: string;
  created_at: string;
  updated_at: string;
};
