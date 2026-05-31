// src/types/adminUserAttendance.ts

// 管理者用のユーザー勤怠情報の型定義
export type AdminUser = {
  id: number;
  name: string;
  email: string;
};

export type BreakTime = {
  id: number;
  attendance_id: number;
  break_in: string;
  break_out: string | null;
}

// 管理者用のユーザー勤怠情報の型定義
export type AdminUserAttendance = {
  id: number;
  user_name: string;
  work_date: string;
  clock_in: string | null;
  clock_out: string | null;
  break_times: BreakTime[];
  total_time: string;
};

// 管理者用のユーザー勤怠情報のレスポンスの型定義
export type AdminUserAttendanceResponse = {
  user: AdminUser;
  attendances: AdminUserAttendance[];
};