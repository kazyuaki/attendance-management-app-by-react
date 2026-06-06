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