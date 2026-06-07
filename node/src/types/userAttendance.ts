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
};

// ユーザー勤怠詳細情報のレスポンス型定義
export type UserAttendanceDetailResponse = {
  attendance: UserAttendanceDetail;
};
