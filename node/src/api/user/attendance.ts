// src/api/user/attendance.ts

import { userAttendanceApi } from "../../api/http";
import type { UserAttendanceDetailResponse, UserAttendanceResponse } from "../../types/userAttendance";

// 勤怠情報の型定義
type TodayAttendanceBreakTime = {
  id: number;
  break_in: string;
  break_out: string | null;
};

// 今日の勤怠情報の型定義
export type TodayAttendance = {
  id: number;
  clock_in: string;
  clock_out: string | null;
  break_times: TodayAttendanceBreakTime[];
};

// APIレスポンスの型定義
type TodayAttendanceResponse = {
  attendance: TodayAttendance | null;
};

/**
 * 今日の勤怠情報を取得するAPI
 */
export const getTodayAttendance = async () => {
  const response = await userAttendanceApi.get<TodayAttendanceResponse>(
    "/get-today-attendance",
  );

  return response.data.attendance;
};

/**
 * 出勤時間打刻API
 */
export const clockIn = async () => {
  const response = await userAttendanceApi.post("/clock-in");

  return response.data;
};

/**
 * 退勤時間打刻API
 */
export const clockOut = async () => {
  const response = await userAttendanceApi.post("/clock-out");

  return response.data;
};

/**
 * 休憩開始時間打刻API
 */
export const breakIn = async () => {
  const response = await userAttendanceApi.post("/break-in");

  return response.data;
};

/**
 * 休憩終了時間打刻API
 */
export const breakOut = async () => {
  const response = await userAttendanceApi.post("/break-out");

  return response.data;
};

/**
 * 勤怠一覧取得API
 * @param month
 * @returns
 */
export const fetchUserAttendances = async (month: string) => {
  const response = await userAttendanceApi.get<{
    attendances: UserAttendanceResponse[];
  }>("get-user-attendance-list", {
    params: { month },
  });

  return response.data.attendances;
};

/**
 * 勤怠詳細取得API
 * @param id 
 * @returns 
 */
export const fetchUserAttendanceDetail = async (id: string) => {
  const response = await userAttendanceApi.get<UserAttendanceDetailResponse>(
    `get-user-attendance-detail/${id}`
  )
  return response.data.attendance;
}
