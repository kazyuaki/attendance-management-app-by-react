import { adminApi } from "../../api/http";
import type { AdminUserAttendanceResponse } from "../../types/AdminUserAttendance";

export const fetchAdminUserAttendanceList = async (
    userId: number,
): Promise<AdminUserAttendanceResponse> => {
    const response = await adminApi.get<AdminUserAttendanceResponse>(
        `/users/${userId}/get-user-attendance-list`,
    );

    return response.data;
};

