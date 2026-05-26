// src/types/adminAttendance.ts

// 管理者用の勤怠一覧の型定義
export type AdminAttendance = {
  id: number;
  user_name: string;
  clock_in: string | null;
  clock_out: string | null;
  break_time: string;
  total_time: string;
};

// 管理者用の勤怠詳細(休憩）の型定義
export type AdminAttendanceBreakTime = {
  id: number;
  break_in: string;
  break_out: string | null;
};

// 管理者用の勤怠詳細の型定義
export type AdminAttendanceDetail = {
  id: number;
  user_name: string;
  work_date_value: string;
  work_date: string;
  clock_in: string | null;
  clock_out: string | null;
  note: string;
  break_times: AdminAttendanceBreakTime[];
};
