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

// 管理者用の申請詳細の型定義
export type AdminRequestDetail = {
  id: number;
  type: string;
  status: AdminRequestStatus;
  userName: string;
  targetDate: string;
  clockIn: string | null;
  clockOut: string | null;
  breakTimes: AdminRequestBreakTime[];
  reason: string;
  requestedAt: string;
  updatedAt: string;
};

// 管理者用の申請詳細休憩の型定義;
export type AdminRequestBreakTime = {
  id: number;
  breakIn: string | null;
  breakOut: string | null;
};

// 管理者用の申請詳細レスポンス型
export type AdminRequestDetailResponse = {
  id: number;
  status: AdminRequestStatus;
  user_name: string;
  target_date: string;
  clock_in: string | null;
  clock_out: string | null;
  break_times: AdminRequestBreakTimeResponse[];
  note: string;
  created_at: string;
  updated_at: string;
};

// 管理者用の申請詳細レスポンス型
export type AdminRequestBreakTimeResponse = {
  id: number;
  break_in: string | null;
  break_out: string | null;
};