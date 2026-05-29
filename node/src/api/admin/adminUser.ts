// src/api/admin/adminUser.ts
import axios from "axios";
import type { AdminUser } from "../../types/adminUser";

type GetAdminUsersResponse = {
  message: string;
  users: AdminUser[];
};

/**
 * 管理者ユーザーの一覧を取得する関数
 * @returns 管理者ユーザーの配列
 */
export const getAdminUsers = async (): Promise<AdminUser[]> => {
    const response = await axios.get<GetAdminUsersResponse>(
      "http://localhost:8000/api/admin/get-user-list",
    );
  return response.data.users;
}