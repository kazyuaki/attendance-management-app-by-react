// src/types/adminAttendance.ts

export type AdminAttendance = {
  id: number;
  user_name: string;
  clock_in: string | null;
  clock_out: string | null;
  break_time: string;
  total_time: string;
};
