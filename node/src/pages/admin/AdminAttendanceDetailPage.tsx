// src/pages/admin/AdminAttendanceDetailPage.tsx

import AdminAttendanceDetailCard from "../../components/admin/attendanceDetail/AdminAttendanceDetailCard";

const attendance = {
  userName: "西 怜奈",
  year: "2026年",
  date: "6月1日",
  clockIn: "09:00",
  clockOut: "20:00",
  breaks: [
    { start: "12:00", end: "13:00" },
    { start: "", end: "" },
  ],

  note: "",
};

export default function AdminAttendanceDetailPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-12 text-2xl font-bold text-gray-900">
        {attendance.userName}さんの勤怠詳細
      </h1>
      <AdminAttendanceDetailCard attendance={attendance} />
    </main>
  );
}
