// src/types/userAttendance.ts

// ユーザー勤怠情報の型定義
export type UserAttendance = {
  id: number;
  work_date: string;
  clockIn: string;
  clockOut: string | null;
  breakTime: string;
  totalTime: string;
};

// ユーザー勤怠情報のレスポンス型定義
export type UserAttendanceResponse = {
  id: number;
  work_date: string;
  clockIn: string;
  clockOut: string | null;
  breakTime: string;
  totalTime: string;
};

// ユーザー勤怠詳細の休憩情報型定義
export type UserAttendanceDetailBreakTime = {
  id: number;
  break_in: string;
  break_out: string | null;
};

// ユーザー勤怠詳細情報の型定義
export type UserAttendanceDetail = {
  id: number;
  user_name: string;
  work_date: string;
  clock_in: string;
  clock_out: string;
  note: string;
  break_times: UserAttendanceDetailBreakTime[];
  is_pending_request: boolean;
};

// ユーザー勤怠詳細情報のレスポンス型定義
export type UserAttendanceDetailResponse = {
  attendance: UserAttendanceDetail;
};

// 修正申請の休憩時間情報型定義
export type AttendanceEditRequestBreakTime = {
  break_in: string;
  break_out: string | null;
};

// 修正申請登録リクエストの型定義
export type StoreAttendanceEditRequestPayload = {
  clock_in: string;
  clock_out: string;
  note: string;
  break_times: AttendanceEditRequestBreakTime[];
};

// ユーザー勤怠修正申請のステータス型定義
export type UserAttendanceEditRequestStatus = "pending" | "approved";

// ユーザー勤怠修正申請一覧の型定義
export type UserAttendanceEditRequest = {
  id: number;
  attendanceId: number;
  status: UserAttendanceEditRequestStatus;
  targetDate: string;
  clockIn: string;
  clockOut: string;
  note: string;
  requestedAt: string;
  updatedAt: string;
};

// ユーザー勤怠修正申請一覧のレスポンス型定義
export type UserAttendanceEditRequestResponse = {
  id: number;
  attendance_id: number;
  status: UserAttendanceEditRequestStatus;
  target_date: string;
  clock_in: string;
  clock_out: string;
  note: string;
  created_at: string;
  updated_at: string;
};
