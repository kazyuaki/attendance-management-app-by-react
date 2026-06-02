import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const sanctumApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const userApi = axios.create({
  baseURL: `${API_BASE_URL}/api/user`,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});

export const adminApi = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});

export const userAttendanceApi = axios.create({
  baseURL: `${API_BASE_URL}/api/user/attendance`,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});
