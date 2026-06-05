// src/types/userAttendance.ts

// ユーザー勤怠情報の型定義
export type UserAttendance = {
  id: number;
  date: string;
  clockIn: string;
  clockOut: string;
  breakTime: string;
  totalTime: string;
};