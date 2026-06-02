// src/api/user/attendance.ts

import { userAttendanceApi } from "../../api/http";

type TodayAttendanceBreakTime = {
  id: number;
  break_in: string;
  break_out: string | null;
};

export type TodayAttendance = {
  id: number;
  clock_in: string;
  clock_out: string | null;
  break_times: TodayAttendanceBreakTime[];
};

type TodayAttendanceResponse = {
  attendance: TodayAttendance | null;
};

export const getTodayAttendance = async () => {
  const response = await userAttendanceApi.get<TodayAttendanceResponse>("/today");

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
export const startBreak = async () => {
  const response = await userAttendanceApi.post("/break-in");

  return response.data;
};

/**
 * 休憩終了時間打刻API
 */
export const endBreak = async () => {
  const response = await userAttendanceApi.post("/break-out");

  return response.data;
};