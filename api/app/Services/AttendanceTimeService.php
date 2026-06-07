<?php

namespace App\Services;

use App\Models\Attendance;
use Carbon\Carbon;

class AttendanceTimeService
{
    /**
     * 休憩時間の合計分数を計算
     */
    public function calculateBreakMinutes(Attendance $attendance): int
    {
        return $attendance->breakTimes->sum(function ($breakTime) {
            if (! $breakTime->break_out) {
                return 0;
            }

            return Carbon::parse($breakTime->break_in)
                ->diffInMinutes(Carbon::parse($breakTime->break_out));
        });
    }

    /**
     * 実働時間の合計分数を計算
     */
    public function calculateTotalMinutes(Attendance $attendance, int $breakMinutes): int
    {
        if (! $attendance->clock_out) {
            return 0;
        }

        $breakMinutes = $this->calculateBreakMinutes($attendance);

        return Carbon::parse($attendance->clock_in)
            ->diffInMinutes(Carbon::parse($attendance->clock_out)) - $breakMinutes;
    }

    /**
     * 分数を H:mm 形式に変換
     */
    public function formatMinutes(int $minutes): string
    {
        $hours = floor($minutes / 60);
        $remainingMinutes = $minutes % 60;

        return sprintf('%d:%02d', $hours, $remainingMinutes);
    }
}
