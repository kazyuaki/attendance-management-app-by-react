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

  const data = response.data;

  return {
    id: data.id,
    type: "勤怠修正",
    status: data.status,
    userName: data.user_name,
    targetDate: data.target_date,

    before: {
      clockIn: data.before.clock_in,
      clockOut: data.before.clock_out,
      breakTimes: data.before.break_times.map((breakTime) => ({
        id: breakTime.id,
        breakIn: breakTime.break_in,
        breakOut: breakTime.break_out,
      })),
    },

    after: {
      clockIn: data.after.clock_in,
      clockOut: data.after.clock_out,
      breakTimes: data.after.break_times.map((breakTime) => ({
        id: breakTime.id,
        breakIn: breakTime.break_in,
        breakOut: breakTime.break_out,
      })),
    },

    reason: data.note,
    requestedAt: data.created_at,
    updatedAt: data.updated_at,
  };
};
