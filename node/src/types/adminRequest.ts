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
