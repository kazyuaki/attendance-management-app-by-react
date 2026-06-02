// src/api/admin/adminAttendance.ts

import { adminApi } from "../../api/http";
import type {
  AdminAttendance,
  AdminAttendanceDetail,
} from "../../types/adminAttendance";

type AttendanceResponse = {
  data: AdminAttendance[];
};

/**
 * 指定された日付の管理者の勤怠情報を取得する関数
 * @param date - 取得したい勤怠情報の日付（YYYY-MM-DD形式）
 * @returns 管理者の勤怠情報の配列
 */
export const fetchAdminAttendances = async (
  date: string,
): Promise<AdminAttendance[]> => {
  const response = await adminApi.get<AttendanceResponse>(
    "/get-attendance-list",
    {
      params: { date },
    },
  );
  return response.data.data;
};

/**
 * 指定された勤怠IDの勤怠詳細情報を取得する関数
 * @param id - 取得したい勤怠のID
 * @returns 勤怠の詳細情報
 */
export const getAdminAttendanceDetail = async (
  id: string,
): Promise<AdminAttendanceDetail> => {
  const response = await adminApi.get<AdminAttendanceDetail>(
    `/get-attendance-detail/${id}`,
  );
  return response.data;
};

/**
 * 勤怠更新のためのペイロードの型定義
 */
export type UpdateAdminAttendancePayload = {
  clock_in: string;
  clock_out: string;
  break_times: {
    break_in: string;
    break_out: string | null;
  }[];
  note: string | null;
};

/**
 * 指定された勤怠IDの勤怠情報を更新する関数
 * @param attendanceId - 更新したい勤怠のID
 * @param payload - 更新する勤怠情報の内容
 * @returns 更新後の勤怠情報
 */
export const updateAdminAttendance = async (
  attendanceId: string,
  payload: UpdateAdminAttendancePayload,
) => {
  const response = await adminApi.put(`/attendances/${attendanceId}`, payload);

  return response.data;
};
