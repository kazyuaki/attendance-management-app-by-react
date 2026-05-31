import axios from "axios";
import type { AdminUserAttendanceResponse } from "../../types/AdminUserAttendance";

export const fetchAdminUserAttendanceList = async(
    userId: number
): Promise<AdminUserAttendanceResponse> => {
    const response = await axios.get<AdminUserAttendanceResponse>(
        `http://localhost:8000/api/admin/users/${userId}/get-user-attendance-list`,
    );

    return response.data;
};

