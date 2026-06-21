// src/api/user/attendance.ts

import { userAttendanceApi } from "../../api/http";
import type {
  AttendanceReport,
  StoreAttendanceEditRequestPayload,
  UserAttendanceDetailResponse,
  UserAttendanceEditRequest,
  UserAttendanceEditRequestResponse,
  UserAttendanceResponse,
} from "../../types/userAttendance";

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

type AttendanceActionResponse = Record<string, unknown>;

/**
 * 今日の勤怠情報を取得するAPI
 */
export const getTodayAttendance = async (): Promise<TodayAttendance | null> => {
  const response = await userAttendanceApi.get<TodayAttendanceResponse>(
    "/get-today-attendance",
  );

  return response.data.attendance;
};

/**
 * 出勤時間打刻API
 */
export const clockIn = async (): Promise<AttendanceActionResponse> => {
  const response =
    await userAttendanceApi.post<AttendanceActionResponse>("/clock-in");

  return response.data;
};

/**
 * 退勤時間打刻API
 */
export const clockOut = async (): Promise<AttendanceActionResponse> => {
  const response =
    await userAttendanceApi.post<AttendanceActionResponse>("/clock-out");

  return response.data;
};

/**
 * 休憩開始時間打刻API
 */
export const breakIn = async (): Promise<AttendanceActionResponse> => {
  const response =
    await userAttendanceApi.post<AttendanceActionResponse>("/break-in");

  return response.data;
};

/**
 * 休憩終了時間打刻API
 */
export const breakOut = async (): Promise<AttendanceActionResponse> => {
  const response =
    await userAttendanceApi.post<AttendanceActionResponse>("/break-out");

  return response.data;
};

/**
 * 勤怠一覧取得API
 * @param month
 * @returns
 */
export const fetchUserAttendances = async (
  month: string,
): Promise<UserAttendanceResponse[]> => {
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
export const fetchUserAttendanceDetail = async (
  id: string,
): Promise<UserAttendanceDetailResponse["attendance"]> => {
  const response = await userAttendanceApi.get<UserAttendanceDetailResponse>(
    `get-user-attendance-detail/${id}`,
  );
  return response.data.attendance;
};

/**
 * 勤怠レポート取得API
 * 
 * @returns 
 */
export const getAttendanceReport = async (): Promise<AttendanceReport> => {
  const response = await userAttendanceApi.get<AttendanceReport>("/get-attendance-report");

  return response.data;
};

/**
 * 勤怠修正申請API
 * @param attendanceId
 * @param payload
 * @returns
 */
export const storeAttendanceEditRequest = async (
  attendanceId: number,
  payload: StoreAttendanceEditRequestPayload,
): Promise<AttendanceActionResponse> => {
  const response = await userAttendanceApi.post<AttendanceActionResponse>(
    `/${attendanceId}/edit-request`,
    payload,
  );
  return response.data;
};

/**
 * 勤怠修正申請取り下げAPI
 *
 * @param attendanceEditRequestId
 * @returns
 */
export const cancelAttendanceEditRequest = async (
  attendanceEditRequestId: number,
): Promise<AttendanceActionResponse> => {
  const response = await userAttendanceApi.post<AttendanceActionResponse>(
    `edit-requests/${attendanceEditRequestId}/cancel`,
  );
  return response.data;
};

/**
 * 勤怠修正申請一覧取得API
 * @returns
 */
export const fetchUserAttendanceEditRequests = async (): Promise<
  UserAttendanceEditRequest[]
> => {
  const response = await userAttendanceApi.get<{
    requests: UserAttendanceEditRequestResponse[];
  }>("/edit-requests");

  return response.data.requests.map((request) => ({
    id: request.id,
    attendanceId: request.attendance_id,
    status: request.status,
    targetDate: request.target_date,
    clockIn: request.clock_in,
    clockOut: request.clock_out,
    note: request.note,
    requestedAt: request.created_at,
    updatedAt: request.updated_at,
  }));
};
