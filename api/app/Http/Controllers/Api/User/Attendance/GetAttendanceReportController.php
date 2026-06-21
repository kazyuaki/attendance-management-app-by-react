<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GetAttendanceReportController extends Controller
{
    /**
     * ユーザー勤怠レポートを取得する
     */
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

        $startMonth = Carbon::now()->subMonths(5)->startOfMonth();
        $endMonth = Carbon::now()->endOfMonth();

        $attendances = Attendance::query()
            ->with('breakTimes')
            ->where('user_id', $user->id)
            ->whereBetween('work_date', [
                $startMonth->toDateString(),
                $endMonth->toDateString(),
            ])
            ->get();
        
        // 取得済みの勤怠データを、月ごとのレポート形式に変換
        $monthlyReports = collect(range(0, 5))->map(function ($index) use ($startMonth, $attendances) {
            $month = $startMonth->copy()->addMonths($index);
            // 勤務日と対象月の年月を比較し、同じ月の勤怠のみを取得
            $monthAttendances = $attendances->filter(function ($attendance) use ($month) {
                return Carbon::parse($attendance->work_date)->format('Y-m') === $month->format('Y-m');
            });

            // 総労働時間(休憩を差し引いた)
            $totalWorkMinutes = $monthAttendances->sum(
                fn($attendance) => $this->getWorkMinutes($attendance)
            );

            return [
                'month' => $month->format('Y-m'),
                'work_time' => $this->formatMinutes($totalWorkMinutes),
                'overtime' => $this->formatMinutes(max(0, $totalWorkMinutes - (120 * 60))),
            ];
        });

        // 総労働時間を「◯分」に整形
        $totalWorkMinutes = $monthlyReports->sum(function ($report) {
            [$hours, $minutes] = sscanf($report['work_time'], '%dh %dm');
            return ($hours * 60) + $minutes;
        });

        return response()->json([
            'summary' => [
                'total_work_time' => $this->formatMinutes($totalWorkMinutes),
                'total_overtime' => $this->formatMinutes(
                    $monthlyReports->sum(function ($report) {
                        [$hours, $minutes] = sscanf($report['overtime'], '%dh %dm');
                        return ($hours * 60) + $minutes;
                    })
                ),
                'average_work_time' => $this->formatMinutes(
                    $attendances->whereNotNull('clock_out')->count() > 0
                        ? intdiv($totalWorkMinutes, $attendances->whereNotNull('clock_out')->count())
                        : 0
                ),
            ],
            'monthly_reports' => $monthlyReports->values(),
            'alerts' => [
                'late_count' => $attendances->filter(fn ($attendance) => $attendance->clock_in && Carbon::parse($attendance->clock_in)->format('H:i') > '09:00')->count(),
                'early_leave_count' => $attendances->filter(fn ($attendance) => $attendance->clock_out && Carbon::parse($attendance->clock_out)->format('H:i') < '18:00')->count(),
                'overtime_days' => $attendances
                    ->filter(fn ($attendance) => $this->getWorkMinutes($attendance) > 8 * 60)
                    ->count(),
            ],
        ]);
    }

    /**
     * 分を「◯h ◯m」形式の文字列に変換する
     */
    private function formatMinutes(int $minutes): string
    {
        $hours = intdiv($minutes, 60);
        $remainingMinutes = $minutes % 60;

        return "{$hours}h {$remainingMinutes}m";
    }

    /**
     * 勤怠の実働時間（分）を取得する
     *
     * - 出勤・退勤時刻の差分を勤務時間とする
     * - 休憩時間を差し引いて実働時間を算出する
     * - 出勤または退勤時刻が未登録の場合は 0 を返す
     */
    private function getWorkMinutes(Attendance $attendance): int
    {
        if(! $attendance->clock_in || ! $attendance->clock_out) {
            return 0;
        }

        $workMinutes = Carbon::parse($attendance->clock_in)
            ->diffInMinutes(Carbon::parse($attendance->clock_out));
        $breakMinutes = $attendance->breakTimes->sum(function ($breakTime) {
            if(! $breakTime->break_in || ! $breakTime->break_out) {
                return 0;
            }
        
            return Carbon::parse($breakTime->break_in)
                ->diffInMinutes(Carbon::parse($breakTime->break_out));
        });

        return $workMinutes - $breakMinutes;
    }
}
