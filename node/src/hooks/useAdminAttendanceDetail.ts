// src/hooks/useAdminAttendanceDetail.ts

import { useEffect, useState } from "react";
import type { AdminAttendanceDetail } from "../types/adminAttendance";
import { getAdminAttendanceDetail } from "../api/admin/adminAttendance";

/* 勤怠詳細を取得するカスタムフック */
export const useAdminAttendanceDetail = (id?: string) => {
  const [attendance, setAttendance] = useState<AdminAttendanceDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchAttendanceDetail = async () => {
      try {
        const data = await getAdminAttendanceDetail(id);
        if (!cancelled) {
          setAttendance(data);
          console.log("勤怠詳細を取得しました:", data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("勤怠詳細の取得に失敗しました:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAttendanceDetail();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { attendance, loading };
};
