// src/hooks/useAdminAttendanceDetail.ts

import { useEffect, useState } from "react";
import type { AdminAttendanceDetail } from "../types/adminAttendance";
import { getAdminAttendanceDetail } from "../api/admin/adminAttendance";

/* 勤怠詳細を取得するカスタムフック */
export const useAdminAttendanceDetail = (id?: string) => {
    const [attendance, setAttendance] = useState<AdminAttendanceDetail | null>(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAttendanceDetail = async () => {
      try {
        const data = await getAdminAttendanceDetail(id);
        setAttendance(data);
        console.log("勤怠詳細を取得しました:", data);
      } catch (error) {
        console.error("勤怠詳細の取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceDetail();
  }, [id]);
    
    return { attendance, loading };
 };