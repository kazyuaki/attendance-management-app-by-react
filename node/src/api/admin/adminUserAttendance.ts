import { adminApi } from "../../api/http";
import type { AdminUserAttendanceResponse } from "../../types/adminUserAttendance";

export const fetchAdminUserAttendanceList = async (
    userId: number,
    month: string,
): Promise<AdminUserAttendanceResponse> => {
    const response = await adminApi.get<AdminUserAttendanceResponse>(
        `/users/${userId}/get-user-attendance-list`,
        {
            params: { month },
        }
    );

    return response.data;
};
