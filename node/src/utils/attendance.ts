// src/utils/attendance.ts

// 時刻を「HH:mm」形式でフォーマットする関数
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// APIの「HH:mm:ss」形式を画面表示用の「HH:mm」に整える
export const formatAttendanceTime = (time: string | null): string => {
  if (!time) {
    return "-";
  }

  const [hours, minutes] = time.split(":");

  if (!hours || !minutes) {
    return time;
  }

  return `${hours}:${minutes}`;
};

  // 日付を「YYYY年MM月DD日（曜日）」形式でフォーマットする関数
export const formatDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

// 月次勤怠一覧の日付を「M/DD(曜)」形式で表示する
export const formatAttendanceListDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) {
    return dateString;
  }

  const date = new Date(year, month - 1, day);

  return `${month}/${String(day).padStart(2, "0")}(${
    WEEKDAYS[date.getDay()]
  })`;
};
  
export const calculateWorkDuration = (
    clockIn: Date,
    clockOut: Date,
    breakStart: Date | null,
    breakEnd: Date | null,
  ): string => {
    const workMs = clockOut.getTime() - clockIn.getTime();
    const breakMs =
      breakStart && breakEnd ? breakEnd.getTime() - breakStart.getTime() : 0;

    const actualWorkMs = workMs - breakMs;

    const hours = Math.floor(actualWorkMs / (1000 * 60 * 60));
    const minutes = Math.floor((actualWorkMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}時間${minutes}分`;
  };
