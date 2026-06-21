// src/utils/userAttendanceValidation.ts

type BreakTimeInput = {
  break_in: string | null;
  break_out: string | null;
};

export type UserAttendanceValidationErrors = {
  clock_in?: string;
  clock_out?: string;
  note?: string;
  break_times?: {
    break_in?: string;
    break_out?: string;
  }[];
};

type Params = {
  clockIn: string | null;
  clockOut: string;
  note: string;
  breakTimes: BreakTimeInput[];
};

/**
 * ユーザー勤怠詳細画面バリデーション
 */
export const validateUserAttendanceEditRequest = ({
  clockIn,
  clockOut,
  note,
  breakTimes,
}: Params): UserAttendanceValidationErrors => {
  const errors: UserAttendanceValidationErrors = {};
  const breakTimeErrors: UserAttendanceValidationErrors["break_times"] = [];

  if (!clockIn) {
    errors.clock_in = "出勤時間は必須です。";
  }

  if (!clockOut) {
    errors.clock_out = "退勤時間は必須です。";
  }

  if (clockIn && clockOut && clockOut < clockIn) {
    errors.clock_out = "退勤時間は出勤時間以降でなければなりません。";
  }

  breakTimes.forEach((breakTime, index) => {
    const rowError: {
      break_in?: string;
      break_out?: string;
    } = {};

    if (!breakTime.break_in) {
      rowError.break_in = "休憩開始時間は必須です。";
    }

    if (breakTime.break_in && clockIn && breakTime.break_in < clockIn) {
      rowError.break_in = "休憩開始時間は出勤時間以降でなければなりません。";
    }

    if (breakTime.break_in && clockOut && breakTime.break_in >= clockOut) {
      rowError.break_in = "休憩開始時間は退勤時間より前でなければなりません。";
    }

    if (
      breakTime.break_out &&
      breakTime.break_in &&
      breakTime.break_out <= breakTime.break_in
    ) {
      rowError.break_out =
        "休憩終了時間は休憩開始時間より後でなければなりません。";
    }

    if (breakTime.break_out && clockOut && breakTime.break_out >= clockOut) {
      rowError.break_out = "休憩終了時間は退勤時間より前でなければなりません。";
    }

    breakTimeErrors[index] = rowError;
  });

  if (breakTimeErrors.some((error) => error.break_in || error.break_out)) {
    errors.break_times = breakTimeErrors;
  }

  if (!note.trim()) {
    errors.note = "備考を記入してください。";
  }

  if (note.length > 255) {
    errors.note = "備考は255文字以内で入力してください。";
  }

  return errors;
};
