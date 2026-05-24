// src/api/admin/adminAttendance.ts

import axios from 'axios';
import type { AdminAttendance } from '../../types/adminAttendance';

type AttendanceResponse = {
  data: AdminAttendance[];
}

/**
 * 指定された日付の管理者の勤怠情報を取得する関数
 * @param date - 取得したい勤怠情報の日付（YYYY-MM-DD形式）
 * @returns 管理者の勤怠情報の配列
 */
export const fetchAdminAttendances = async (
	date: string
): Promise<AdminAttendance[]> => {
	const response = await axios.get<AttendanceResponse>(
    "http://localhost:8000/api/admin/get-attendance-list",
    {
      params: { date },
      withCredentials: true,
    },
  );
	return response.data.data;
}