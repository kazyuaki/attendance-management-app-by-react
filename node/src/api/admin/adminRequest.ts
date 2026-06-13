import { adminApi } from "../http";
import type {
  AdminRequest,
  AdminRequestDetail,
  AdminRequestDetailResponse,
  AdminRequestResponse,
} from "../../types/adminRequest";

/** 申請一覧取得API */
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
};

/** 申請詳細取得API */
export const getAdminRequestDetail = async (
  requestId: number,
): Promise<AdminRequestDetail> => {
  const response = await adminApi.get<AdminRequestDetailResponse>(
    `get-admin-request-detail/${requestId}`,
  );

  return {
    id: response.data.id,
    type: "勤怠修正",
    status: response.data.status,
    userName: response.data.user_name,
    targetDate: response.data.target_date,
    clockIn: response.data.clock_in,
    clockOut: response.data.clock_out,
    breakTimes: response.data.break_times.map((breakTime) => ({
      id: breakTime.id,
      breakIn: breakTime.break_in,
      breakOut: breakTime.break_out,
    })),
    reason: response.data.note,
    requestedAt: response.data.created_at,
    updatedAt: response.data.updated_at,
  };
};
