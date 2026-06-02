// src/utils/attendance.ts

// 時刻を「HH:mm」形式でフォーマットする関数
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
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
