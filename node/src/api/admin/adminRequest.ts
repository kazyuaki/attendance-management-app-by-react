import { adminApi } from "../http";
import type { AdminRequest, AdminRequestResponse } from "../../types/adminRequest";

export const getAdminRequests = async (): Promise<AdminRequest[]> => {
    const response = await adminApi.get<AdminRequestResponse[]>(
      "get-admin-request-list",
    );

    return response.data.map((request) => ({
      id: request.id,
      type: "勤怠修正",
      status: request.status,
      userName: request.user_name,
      targetDate: request.target_date,
      reason: request.note,
      requestedAt: request.created_at,
      updatedAt: request.updated_at,
    }));
}